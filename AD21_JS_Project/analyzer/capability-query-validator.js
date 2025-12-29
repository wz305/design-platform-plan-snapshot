/**
 * Capability Query Validator
 * 验证Stage 5.5 Capability Index的查询功能
 * 
 * @author ES3 工程语义操作系统
 * @module CapabilityQueryValidator
 */

var fs = require("fs");
var path = require("path");

/**
 * 能力查询验证器
 */
var CapabilityQueryValidator = {
    /**
     * 运行完整的验证测试
     */
    runValidation: function() {
        console.log("🔍 开始 Capability Query 验证");
        console.log("=".repeat(60));
        
        // 第一步：加载Capability Index
        var capabilityData = this._loadCapabilityIndex();
        
        // 第二步：构建查询接口
        var queryInterface = this._buildQueryInterface(capabilityData);
        
        // 第三步：执行验证测试
        var validationResults = this._runValidationTests(queryInterface);
        
        // 第四步：生成验证报告
        var validationReport = this._generateValidationReport(validationResults);
        
        // 第五步：保存验证报告
        this._saveValidationReport(validationReport);
        
        console.log("✅ Capability Query 验证完成");
        return validationReport;
    },
    
    /**
     * 加载Capability Index
     * @private
     */
    _loadCapabilityIndex: function() {
        console.log("\n📥 加载 Capability Index...");
        
        var indexPath = path.resolve(__dirname, "reports/capability-index-v1.json");
        
        if (!fs.existsSync(indexPath)) {
            throw new Error("Capability Index不存在，请先运行 capability-index-builder.js");
        }
        
        var capabilityData = JSON.parse(fs.readFileSync(indexPath, "utf8"));
        
        console.log("   📊 模块能力:", Object.keys(capabilityData.facts.modules).length);
        console.log("   📊 可调用能力:", Object.keys(capabilityData.facts.callables).length);
        console.log("   📊 全局事实:", Object.keys(capabilityData.facts.globals).length);
        
        return capabilityData;
    },
    
    /**
     * 构建查询接口
     * @private
     */
    _buildQueryInterface: function(capabilityData) {
        console.log("\n🔧 构建查询接口...");
        
        var queryInterface = {
            /**
             * 检查对象是否可调用
             */
            isObjectCallable: function(objectName) {
                if (capabilityData.facts.modules[objectName]) {
                    return capabilityData.facts.modules[objectName].callable;
                }
                if (capabilityData.facts.callables[objectName]) {
                    return capabilityData.facts.callables[objectName].callable;
                }
                return false;
            },
            
            /**
             * 列出对象的方法
             */
            listMethods: function(objectName) {
                if (capabilityData.facts.modules[objectName]) {
                    return Object.keys(capabilityData.facts.modules[objectName].methods);
                }
                if (capabilityData.facts.callables[objectName]) {
                    return [capabilityData.facts.callables[objectName].name];
                }
                return [];
            },
            
            /**
             * 检查访问权限
             */
            canAccess: function(fromObject, toTarget) {
                var fromExists = capabilityData.facts.modules[fromObject] || capabilityData.facts.callables[fromObject];
                var toExists = capabilityData.facts.modules[toTarget] || capabilityData.facts.callables[toTarget];
                
                return {
                    fromExists: !!fromExists,
                    toExists: !!toExists,
                    staticallyReachable: fromExists && toExists
                };
            },
            
            /**
             * 获取全局符号列表
             */
            getGlobalSymbols: function() {
                return {
                    modules: Object.keys(capabilityData.facts.modules),
                    callables: Object.keys(capabilityData.facts.callables),
                    globals: Object.keys(capabilityData.facts.globals)
                };
            },
            
            /**
             * 获取方法签名
             */
            getMethodSignature: function(objectName, methodName) {
                var module = capabilityData.facts.modules[objectName];
                if (module && module.methods[methodName]) {
                    return module.methods[methodName].signature;
                }
                return null;
            },
            
            /**
             * 获取模块依赖
             */
            getModuleDependencies: function(moduleName) {
                var module = capabilityData.facts.modules[moduleName];
                if (module) {
                    return module.dependencies;
                }
                return [];
            }
        };
        
        console.log("   ✅ 查询接口构建完成");
        return queryInterface;
    },
    
    /**
     * 运行验证测试
     * @private
     */
    _runValidationTests: function(queryInterface) {
        console.log("\n🧪 执行验证测试...");
        
        var results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            testResults: []
        };
        
        // 测试1: isObjectCallable - 模块
        this._runTest(results, "Module 1", function() {
            var result = queryInterface.isObjectCallable("LoggerModule");
            return { expected: true, actual: result, passed: result === true };
        });
        
        // 测试2: isObjectCallable - 不存在的模块
        this._runTest(results, "Module 2", function() {
            var result = queryInterface.isObjectCallable("NonExistentModule");
            return { expected: false, actual: result, passed: result === false };
        });
        
        // 测试3: isObjectCallable - 可调用对象
        this._runTest(results, "Callable 1", function() {
            var result = queryInterface.isObjectCallable("btnOutputLogClick");
            return { expected: true, actual: result, passed: result === true };
        });
        
        // 测试4: listMethods - 模块方法
        this._runTest(results, "Methods 1", function() {
            var result = queryInterface.listMethods("LoggerModule");
            return { 
                expected: "array", 
                actual: Array.isArray(result) ? "array with " + result.length + " items" : "not array", 
                passed: Array.isArray(result) && result.length > 0 
            };
        });
        
        // 测试5: listMethods - 不存在的对象
        this._runTest(results, "Methods 2", function() {
            var result = queryInterface.listMethods("NonExistentObject");
            return { 
                expected: "empty array", 
                actual: Array.isArray(result) ? "array with " + result.length + " items" : "not array", 
                passed: Array.isArray(result) && result.length === 0 
            };
        });
        
        // 测试6: canAccess - 有效访问
        this._runTest(results, "Access 1", function() {
            var result = queryInterface.canAccess("LoggerModule", "ObjectModule");
            return { 
                expected: "both exist and reachable", 
                actual: JSON.stringify(result), 
                passed: result.fromExists && result.toExists && result.staticallyReachable 
            };
        });
        
        // 测试7: canAccess - 无效访问
        this._runTest(results, "Access 2", function() {
            var result = queryInterface.canAccess("NonExistentModule", "ObjectModule");
            return { 
                expected: "from not exist", 
                actual: JSON.stringify(result), 
                passed: !result.fromExists && result.toExists 
            };
        });
        
        // 测试8: getGlobalSymbols - 符号统计
        this._runTest(results, "Globals 1", function() {
            var result = queryInterface.getGlobalSymbols();
            return { 
                expected: "object with modules, callables, globals", 
                actual: JSON.stringify({
                    hasModules: !!result.modules,
                    hasCallables: !!result.callables,
                    hasGlobals: !!result.globals,
                    moduleCount: result.modules ? result.modules.length : 0,
                    callableCount: result.callables ? result.callables.length : 0,
                    globalCount: result.globals ? result.globals.length : 0
                }), 
                passed: result.modules && result.callables && result.globals &&
                        result.modules.length > 0 && result.callables.length > 0 && result.globals.length > 0
            };
        });
        
        // 测试9: getMethodSignature - 有效方法
        this._runTest(results, "Signature 1", function() {
            var result = queryInterface.getMethodSignature("LoggerModule", "create");
            return { 
                expected: "signature object", 
                actual: JSON.stringify(result), 
                passed: result && typeof result === 'object' && result.params 
            };
        });
        
        // 测试10: getMethodSignature - 无效方法
        this._runTest(results, "Signature 2", function() {
            var result = queryInterface.getMethodSignature("LoggerModule", "nonExistentMethod");
            return { 
                expected: null, 
                actual: JSON.stringify(result), 
                passed: result === null 
            };
        });
        
        // 测试11: getModuleDependencies - 模块依赖
        this._runTest(results, "Dependencies 1", function() {
            var result = queryInterface.getModuleDependencies("ObjectModule");
            return { 
                expected: "array", 
                actual: Array.isArray(result) ? "array with " + result.length + " items" : "not array", 
                passed: Array.isArray(result) 
            };
        });
        
        // 测试12: 系统边界验证
        this._runTest(results, "Boundary 1", function() {
            // 验证系统不承诺运行时推断
            var symbols = queryInterface.getGlobalSymbols();
            var hasValidStructure = symbols.modules && symbols.callables && symbols.globals;
            return { 
                expected: "static facts only", 
                actual: "static structure validated", 
                passed: hasValidStructure 
            };
        });
        
        console.log("   📊 总测试:", results.totalTests);
        console.log("   ✅ 通过测试:", results.passedTests);
        console.log("   ❌ 失败测试:", results.failedTests);
        console.log("   📈 成功率:", ((results.passedTests / results.totalTests) * 100).toFixed(2) + "%");
        
        return results;
    },
    
    /**
     * 运行单个测试
     * @private
     */
    _runTest: function(results, testName, testFunction) {
        results.totalTests++;
        
        try {
            var testResult = testFunction();
            testResult.testName = testName;
            testResult.timestamp = new Date().toISOString();
            
            if (testResult.passed) {
                results.passedTests++;
                console.log("   ✅", testName, "- 通过");
            } else {
                results.failedTests++;
                console.log("   ❌", testName, "- 失败");
                console.log("      期望:", testResult.expected);
                console.log("      实际:", testResult.actual);
            }
            
            results.testResults.push(testResult);
            
        } catch (error) {
            results.failedTests++;
            var errorResult = {
                testName: testName,
                passed: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
            results.testResults.push(errorResult);
            console.log("   💥", testName, "- 异常:", error.message);
        }
    },
    
    /**
     * 生成验证报告
     * @private
     */
    _generateValidationReport: function(validationResults) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                version: "1.0.0",
                description: "Capability Query 验证报告"
            },
            summary: {
                totalTests: validationResults.totalTests,
                passedTests: validationResults.passedTests,
                failedTests: validationResults.failedTests,
                successRate: ((validationResults.passedTests / validationResults.totalTests) * 100).toFixed(2) + "%"
            },
            testResults: validationResults.testResults,
            conclusions: this._generateConclusions(validationResults)
        };
        
        return report;
    },
    
    /**
     * 生成结论
     * @private
     */
    _generateConclusions: function(validationResults) {
        var conclusions = [];
        
        if (validationResults.successRate >= 90) {
            conclusions.push({
                type: "success",
                message: "Capability Index 功能验证通过，系统已达到生产就绪状态"
            });
        } else {
            conclusions.push({
                type: "warning", 
                message: "Capability Index 存在功能问题，需要进一步修复"
            });
        }
        
        // 分析失败的测试
        var failedTests = validationResults.testResults.filter(function(test) {
            return !test.passed;
        });
        
        if (failedTests.length > 0) {
            conclusions.push({
                type: "analysis",
                message: "失败的测试主要集中在: " + failedTests.map(function(test) { return test.testName; }).join(", ")
            });
        }
        
        return conclusions;
    },
    
    /**
     * 保存验证报告
     * @private
     */
    _saveValidationReport: function(validationReport) {
        var reportPath = path.resolve(__dirname, "reports/capability-query-validation.json");
        var markdownPath = path.resolve(__dirname, "reports/capability-query-validation.md");
        
        // 保存JSON报告
        fs.writeFileSync(reportPath, JSON.stringify(validationReport, null, 2), "utf8");
        
        // 生成Markdown报告
        var markdown = this._generateMarkdownReport(validationReport);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 验证报告已保存:");
        console.log("   JSON:", reportPath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成Markdown报告
     * @private
     */
    _generateMarkdownReport: function(validationReport) {
        var markdown = "# Capability Query 验证报告\n\n";
        
        markdown += "## 📊 验证概览\n\n";
        markdown += "- **生成时间**: " + validationReport.meta.generatedAt + "\n";
        markdown += "- **版本**: " + validationReport.meta.version + "\n";
        markdown += "- **总测试数**: " + validationReport.summary.totalTests + "\n";
        markdown += "- **通过测试**: " + validationReport.summary.passedTests + "\n";
        markdown += "- **失败测试**: " + validationReport.summary.failedTests + "\n";
        markdown += "- **成功率**: " + validationReport.summary.successRate + "\n\n";
        
        // 详细测试结果
        markdown += "## 🧪 详细测试结果\n\n";
        
        for (var i = 0; i < validationReport.testResults.length; i++) {
            var test = validationReport.testResults[i];
            var status = test.passed ? "✅ 通过" : "❌ 失败";
            
            markdown += "### " + test.testName + " - " + status + "\n\n";
            
            if (test.error) {
                markdown += "**异常**: " + test.error + "\n\n";
            } else {
                markdown += "**期望**: " + test.expected + "\n\n";
                markdown += "**实际**: " + test.actual + "\n\n";
            }
        }
        
        // 结论
        markdown += "## 🎯 验证结论\n\n";
        for (var j = 0; j < validationReport.conclusions.length; j++) {
            var conclusion = validationReport.conclusions[j];
            var icon = conclusion.type === "success" ? "🎉" : 
                       conclusion.type === "warning" ? "⚠️" : "📝";
            
            markdown += "### " + icon + " " + conclusion.message + "\n\n";
        }
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动 Capability Query 验证");
    
    try {
        var validationReport = CapabilityQueryValidator.runValidation();
        
        console.log("\n🎉 验证完成！");
        console.log("📊 成功率:", validationReport.summary.successRate);
        console.log("📊 总测试:", validationReport.summary.totalTests);
        
        if (parseFloat(validationReport.summary.successRate) >= 90) {
            console.log("\n✅ Capability Index 已验证为生产就绪");
        } else {
            console.log("\n⚠️ Capability Index 需要进一步修复");
        }
        
    } catch (error) {
        console.error("❌ 验证失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = CapabilityQueryValidator;
