// ==========================================================
// Jalangi2 Semantic Analysis Test - 完整语义溯源测试
// 测试值历史、期望引擎、违规追踪、语义报告的集成
// 严格遵循ES3语法规范
// ==========================================================

console.log("[Jalangi2SemanticTest] 开始加载模块...");

// 加载所有必要的模块
try {
    require('../jalangi/analyzers/value-history.js');
    console.log("[Jalangi2SemanticTest] ✓ ValueHistoryTracker加载完成");
    
    require('../jalangi/analyzers/expectation-engine.js');
    console.log("[Jalangi2SemanticTest] ✓ ExpectationEngine加载完成");
    
    require('../jalangi/analyzers/violation-tracer.js');
    console.log("[Jalangi2SemanticTest] ✓ ViolationTracer加载完成");
    
    require('../jalangi/analyzers/semantic-reporter.js');
    console.log("[Jalangi2SemanticTest] ✓ SemanticReporter加载完成");
    
    require('../jalangi/run-semantic-analysis.js');
    console.log("[Jalangi2SemanticTest] ✓ SemanticAnalysisRunner加载完成");
    
} catch (error) {
    console.log("[Jalangi2SemanticTest] ✗ 模块加载失败: " + error.message);
    process.exit(1);
}

var Jalangi2SemanticTest = (function(){
    
    // ==========================================================
    // 测试配置
    // ==========================================================
    var testConfig = {
        testScript: "debug/test-functions.js",
        entryFunction: "TestButton_Click",
        rulesFile: "debug/jalangi/rules/ad-function-expects.json",
        outputFile: "debug/reports/jalangi2-semantic-test-report.json",
        verbose: true
    };
    
    // ==========================================================
    // 测试用例
    // ==========================================================
    var testCases = [
        {
            name: "基础功能验证",
            description: "测试值历史、期望引擎、违规追踪的基本功能",
            test: function() {
                return testBasicFunctionality();
            }
        },
        {
            name: "AD API期望违规检测",
            description: "测试AD API调用时的期望违规检测",
            test: function() {
                return testADAPIViolations();
            }
        },
        {
            name: "类型安全违规检测",
            description: "测试类型不匹配、类型转换等安全问题",
            test: function() {
                return testTypeSafetyViolations();
            }
        },
        {
            name: "违规溯源能力",
            description: "测试因果溯源链的构建和根本原因分析",
            test: function() {
                return testViolationTracing();
            }
        },
        {
            name: "语义报告生成",
            description: "测试语义报告的生成和集成能力",
            test: function() {
                return testSemanticReporting();
            }
        },
        {
            name: "集成静态分析",
            description: "测试与现有语义系统的集成",
            test: function() {
                return testStaticAnalysisIntegration();
            }
        }
    ];
    
    // ==========================================================
    // 测试执行器
    // ==========================================================
    
    /**
     * 运行所有测试
     * @return {Object} 测试结果
     */
    function runAllTests() {
        console.log("[Jalangi2SemanticTest] 开始运行Jalangi2语义分析测试");
        console.log("[Jalangi2SemanticTest] 测试用例数量: " + testCases.length);
        
        var startTime = new Date().getTime();
        var results = [];
        var passedTests = 0;
        var failedTests = 0;
        
        for (var i = 0; i < testCases.length; i++) {
            var testCase = testCases[i];
            console.log("[Jalangi2SemanticTest] 执行测试: " + testCase.name);
            
            try {
                var result = testCase.test();
                results.push({
                    name: testCase.name,
                    description: testCase.description,
                    success: result.success,
                    result: result,
                    error: result.error || null
                });
                
                if (result.success) {
                    passedTests++;
                } else {
                    failedTests++;
                }
                
                if (testConfig.verbose) {
                    console.log("[Jalangi2SemanticTest] " + (result.success ? "✓" : "✗") + " " + testCase.name + ": " + (result.message || (result.success ? "通过" : "失败")));
                }
                
            } catch (error) {
                console.log("[Jalangi2SemanticTest] ✗ 测试异常: " + testCase.name + " - " + error.message);
                results.push({
                    name: testCase.name,
                    description: testCase.description,
                    success: false,
                    error: error.message,
                    result: null
                });
                failedTests++;
            }
        }
        
        var endTime = new Date().getTime();
        var duration = endTime - startTime;
        
        var summary = {
            totalTests: testCases.length,
            passedTests: passedTests,
            failedTests: failedTests,
            successRate: (passedTests / testCases.length * 100).toFixed(1) + "%",
            duration: duration
        };
        
        console.log("[Jalangi2SemanticTest] === 测试总结 ===");
        console.log("[Jalangi2SemanticTest] 总计: " + testCases.length + ", 通过: " + passedTests + ", 失败: " + failedTests);
        console.log("[Jalangi2SemanticTest] 成功率: " + summary.successRate);
        console.log("[Jalangi2SemanticTest] 耗时: " + duration + "ms");
        
        // 生成测试报告
        generateTestReport(results, summary);
        
        return {
            success: failedTests === 0,
            summary: summary,
            results: results
        };
    }
    
    // ==========================================================
    // 具体测试实现
    // ==========================================================
    
    /**
     * 测试基础功能
     * @return {Object} 测试结果
     */
    function testBasicFunctionality() {
        try {
            console.log("[Jalangi2SemanticTest] 测试基础功能...");
            
            // 初始化语义分析器
            if (!global.SemanticAnalysisRunner) {
                return {
                    success: false,
                    error: "SemanticAnalysisRunner不可用"
                };
            }
            
            var initResult = global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            if (!initResult) {
                return {
                    success: false,
                    error: "语义分析器初始化失败"
                };
            }
            
            // 检查分析器状态
            var status = global.SemanticAnalysisRunner.getAnalyzerStatus();
            var allAnalyzersAvailable = status.analyzers.valueTracker && 
                                       status.analyzers.expectationEngine && 
                                       status.analyzers.violationTracer && 
                                       status.analyzers.semanticReporter;
            
            return {
                success: allAnalyzersAvailable,
                message: "基础功能" + (allAnalyzersAvailable ? "完整" : "部分") + "可用"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 测试AD API期望违规检测
     * @return {Object} 测试结果
     */
    function testADAPIViolations() {
        try {
            console.log("[Jalangi2SemanticTest] 测试AD API期望违规检测...");
            
            // 初始化语义分析器
            global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            // 模拟违规的AD API调用
            var violationScript = createViolationTestScript();
            var result = global.SemanticAnalysisRunner.runAnalysis(
                testConfig.testScript,
                "TestViolationButton_Click",
                { verbose: false }
            );
            
            // 检查是否检测到违规
            var violationsDetected = false;
            if (result.semanticReport && result.semanticReport.violations) {
                violationsDetected = result.semanticReport.violations.length > 0;
            }
            
            return {
                success: result.success,
                violationsDetected: violationsDetected,
                violationCount: violationsDetected ? result.semanticReport.violations.length : 0,
                message: violationsDetected ? "检测到 " + result.semanticReport.violations.length + " 个违规" : "未检测到违规"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 测试类型安全违规检测
     * @return {Object} 测试结果
     */
    function testTypeSafetyViolations() {
        try {
            console.log("[Jalangi2SemanticTest] 测试类型安全违规检测...");
            
            // 初始化语义分析器
            global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            // 模拟类型不匹配的脚本
            var typeSafetyScript = createTypeSafetyTestScript();
            var result = global.SemanticAnalysisRunner.runAnalysis(
                typeSafetyScript,
                "TestTypeSafetyFunction",
                { verbose: false }
            );
            
            // 检查是否检测到类型违规
            var typeViolationsDetected = false;
            if (result.semanticReport && result.semanticReport.violations) {
                for (var i = 0; i < result.semanticReport.violations.length; i++) {
                    var violation = result.semanticReport.violations[i];
                    if (violation.type.indexOf("TYPE_MISMATCH") > -1) {
                        typeViolationsDetected = true;
                        break;
                    }
                }
            }
            
            return {
                success: result.success,
                typeViolationsDetected: typeViolationsDetected,
                message: typeViolationsDetected ? "检测到类型安全违规" : "未检测到类型安全问题"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 测试违规溯源能力
     * @return {Object} 测试结果
     */
    function testViolationTracing() {
        try {
            console.log("[Jalangi2SemanticTest] 测试违规溯源能力...");
            
            // 初始化语义分析器
            global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            // 模拟复杂违规场景的脚本
            var tracingScript = createComplexViolationTestScript();
            var result = global.SemanticAnalysisRunner.runAnalysis(
                tracingScript,
                "TestComplexViolationButton_Click",
                { verbose: false }
            );
            
            // 检查溯源链质量
            var tracingQuality = false;
            if (result.semanticReport && result.semanticReport.violations) {
                for (var i = 0; i < result.semanticReport.violations.length; i++) {
                    var violation = result.semanticReport.violations[i];
                    if (violation.rootCause && violation.rootCause.causalChain && violation.rootCause.causalChain.length > 2) {
                        tracingQuality = true;
                        break;
                    }
                }
            }
            
            return {
                success: result.success,
                tracingQuality: tracingQuality,
                message: tracingQuality ? "溯源链质量良好" : "溯源链需要改进"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 测试语义报告生成
     * @return {Object} 测试结果
     */
    function testSemanticReporting() {
        try {
            console.log("[Jalangi2SemanticTest] 测试语义报告生成...");
            
            // 初始化语义分析器
            global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            // 模拟多违规场景的脚本
            var reportingScript = createReportingTestScript();
            var result = global.SemanticAnalysisRunner.runAnalysis(
                reportingScript,
                "TestReportingButton_Click",
                { verbose: false }
            );
            
            // 检查报告质量
            var reportQuality = false;
            if (result.semanticReport) {
                var report = result.semanticReport;
                reportQuality = report.metadata && 
                              report.execution && 
                              report.violations && 
                              report.analysis && 
                              report.recommendations;
            }
            
            return {
                success: result.success,
                reportQuality: reportQuality,
                message: reportQuality ? "语义报告完整" : "语义报告不完整"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 测试与静态分析的集成
     * @return {Object} 测试结果
     */
    function testStaticAnalysisIntegration() {
        try {
            console.log("[Jalangi2SemanticTest] 测试静态分析集成...");
            
            // 初始化语义分析器
            global.SemanticAnalysisRunner.initialize({
                rulesFile: testConfig.rulesFile
            });
            
            // 模拟包含静态分析场景的脚本
            var integrationScript = createIntegrationTestScript();
            var result = global.SemanticAnalysisRunner.runAnalysis(
                integrationScript,
                "TestIntegrationButton_Click",
                { verbose: false }
            );
            
            // 检查集成效果
            var integrationWorking = false;
            if (result.semanticReport && result.semanticReport.analysis) {
                var analysis = result.semanticReport.analysis;
                integrationWorking = analysis.staticAnalysis && analysis.staticAnalysis !== null;
            }
            
            return {
                success: result.success,
                integrationWorking: integrationWorking,
                message: integrationWorking ? "静态分析集成正常" : "静态分析集成失败"
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // ==========================================================
    // 测试脚本生成器
    // ==========================================================
    
    /**
     * 创建违规测试脚本
     * @return {String} 脚本内容
     */
    function createViolationTestScript() {
        return '// 违规测试脚本\n' +
            'function TestViolationButton_Click(Sender) {\n' +
            '    var board = PCBServer().GetCurrentPCBBoard();\n' +
            '    var obj = PCBServer().PCBObjectFactory(1, 0, 0); // 创建track\n' +
            '    obj.X = "invalid_string"; // 类型错误：字符串赋值给坐标\n' +
            '    board.AddPCBObject(obj); // 应该检测到类型违规\n' +
            '}\n';
    }
    
    /**
     * 创建类型安全测试脚本
     * @return {String} 脚本内容
     */
    function createTypeSafetyTestScript() {
        return '// 类型安全测试脚本\n' +
            'function TestTypeSafetyFunction(Sender) {\n' +
            '    var num = 42;\n' +
            '    var str = "invalid_number"; // 类型转换错误\n' +
            '    var obj = PCBServer().PCBObjectFactory(3, 0, 0);\n' +
            '    obj.X = str; // 将字符串赋值给坐标属性\n' +
            '    board.AddPCBObject(obj); // 应该检测到类型安全违规\n' +
            '}\n';
    }
    
    /**
     * 创建复杂违规测试脚本
     * @return {String} 脚本内容
     */
    function createComplexViolationTestScript() {
        return '// 复杂违规测试脚本\n' +
            'function TestComplexViolationButton_Click(Sender) {\n' +
            '    var board = PCBServer().GetCurrentPCBBoard();\n' +
            '    var factory = PCBServer().PCBObjectFactory;\n' +
            '    var obj1 = factory(1, 0, 0); // 有效对象\n' +
            '    obj1.X = 1000;\n' +
            '    obj1.Y = "string"; // 第一次类型错误\n' +
            '    \n' +
            '    var obj2 = factory(1, 0, 0);\n' +
            '    obj2.X = obj1.X; // 传递错误类型\n' +
            '    obj2.Y = 2000;\n' +
            '    \n' +
            '    var obj3 = factory(1, 0, 0);\n' +
            '    obj3.X = "another_invalid"; // 第二次类型错误\n' +
            '    obj3.Y = 3000;\n' +
            '    \n' +
            '    board.AddPCBObject(obj1); // 第一次添加（可能检测到）\n' +
            '    board.AddPCBObject(obj2); // 第二次添加（应该检测到）\n' +
            '    board.AddPCBObject(obj3); // 第三次添加（应该检测到）\n' +
            '}\n';
    }
    
    /**
     * 创建报告测试脚本
     * @return {String} 脚本内容
     */
    function createReportingTestScript() {
        return '// 报告测试脚本\n' +
            'function TestReportingButton_Click(Sender) {\n' +
            '    var board = PCBServer().GetCurrentPCBBoard();\n' +
            '    var obj = PCBServer().PCBObjectFactory(1, 0, 0);\n' +
            '    obj.I_ObjectAddress = undefined; // 缺少必需属性\n' +
            '    board.AddPCBObject(obj); // 应该检测到属性缺失违规\n' +
            '    var invalidObj = { Type: "invalid" };\n' +
            '    invalidObj.I_ObjectAddress = 123;\n' +
            '    board.AddPCBObject(invalidObj); // 应该检测到对象类型错误\n' +
            '}\n';
    }
    
    /**
     * 创建集成测试脚本
     * @return {String} 脚本内容
     */
    function createIntegrationTestScript() {
        return '// 集成测试脚本\n' +
            'function TestIntegrationButton_Click(Sender) {\n' +
            '    var board = PCBServer().GetCurrentPCBBoard();\n' +
            '    // 模拟需要静态分析验证的场景\n' +
            '    var result = SomeComplexOperation(); // 应该被静态分析捕获\n' +
            '    board.AddPCBObject(result);\n' +
            '}\n' +
            '\n' +
            '// 这个函数应该被静态分析标记为问题\n' +
            'function SomeComplexOperation() {\n' +
            '    return { complex: true, error: "Complex operation detected" };\n' +
            '}\n';
    }
    
    // ==========================================================
    // 报告生成
    // ==========================================================
    
    /**
     * 生成测试报告
     * @param {Array} results - 测试结果
     * @param {Object} summary - 测试总结
     */
    function generateTestReport(results, summary) {
        try {
            var report = {
                metadata: {
                    timestamp: new Date().toISOString(),
                    testName: "Jalangi2 Semantic Analysis Test",
                    version: "1.0"
                },
                
                summary: summary,
                
                results: results,
                
                environment: {
                    nodeVersion: process.version,
                    platform: process.platform,
                    jalangi2Available: typeof J$ !== "undefined"
                }
            };
            
            // 保存报告
            if (typeof require !== "undefined") {
                var fs = require("fs");
                var path = require("path");
                
                var reportDir = path.dirname(testConfig.outputFile);
                if (!fs.existsSync(reportDir)) {
                    fs.mkdirSync(reportDir, { recursive: true });
                }
                
                fs.writeFileSync(testConfig.outputFile, JSON.stringify(report, null, 2), "utf8");
                console.log("[Jalangi2SemanticTest] 测试报告已保存: " + testConfig.outputFile);
            }
            
            return report;
            
        } catch (error) {
            console.log("[Jalangi2SemanticTest] 生成报告失败: " + error.message);
            return null;
        }
    }
    
    // ==========================================================
    // 主函数
    // ==========================================================
    
    /**
     * 主测试函数
     */
    function main() {
        console.log("[Jalangi2SemanticTest] 开始Jalangi2语义分析测试");
        
        try {
            // 加载依赖
            if (typeof ValueHistoryTracker === "undefined" ||
                typeof ExpectationEngine === "undefined" ||
                typeof ViolationTracer === "undefined" ||
                typeof SemanticReporter === "undefined" ||
                typeof SemanticAnalysisRunner === "undefined") {
                console.log("[Jalangi2SemanticTest] 错误: 缺少必要的分析器模块");
                return false;
            }
            
            // 运行测试
            var testResult = runAllTests();
            
            if (testResult.success) {
                console.log("[Jalangi2SemanticTest] ✓ 所有测试通过");
                return true;
            } else {
                console.log("[Jalangi2SemanticTest] ✗ 部分测试失败");
                return false;
            }
            
        } catch (error) {
            console.log("[Jalangi2SemanticTest] 测试执行异常: " + error.message);
            return false;
        }
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 主函数
        main: main,
        
        // 测试执行
        runAllTests: runAllTests,
        
        // 工具方法
        createTestScripts: function() {
            return {
                violationTest: createViolationTestScript(),
                typeSafetyTest: createTypeSafetyTestScript(),
                tracingTest: createComplexViolationTestScript(),
                reportingTest: createReportingTestScript(),
                integrationTest: createIntegrationTestScript()
            };
        }
    };
    
})();

// 如果直接运行此脚本
if (typeof require !== "undefined" && require.main === module) {
    var success = Jalangi2SemanticTest.main();
    process.exit(success ? 0 : 1);
}

console.log("[Jalangi2SemanticTest] jalangi2-semantic-test.js 加载完成");
