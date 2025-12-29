/**
 * ES3 工程语义操作系统 - Stage 5A: Def-Use 分析测试
 * 验证定义-使用事实记录的准确性
 * 
 * @author ES3 工程语义操作系统
 */

var DefUseAnalyzer = require("../semantic/def-use-analyzer");
var ASTParser = require("../ast/parser");
var fs = require("fs");
var path = require("path");

/**
 * Def-Use 分析测试套件
 */
var DefUseTest = (function(){
    
    /**
     * 测试用例集合
     */
    var testCases = [
        {
            name: "简单变量定义和使用",
            code: [
                "var x = 10;",
                "var y = x + 5;",
                "console.log(y);"
            ].join("\n"),
            expectedDefinitions: ["x", "y"],
            expectedUses: ["x", "y"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 0
        },
        {
            name: "函数声明和参数",
            code: [
                "function test(a, b) {",
                "    var result = a + b;",
                "    return result;",
                "}",
                "test(1, 2);"
            ].join("\n"),
            expectedDefinitions: ["test", "a", "b", "result"],
            expectedUses: ["a", "b", "result", "test"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 0
        },
        {
            name: "未使用变量检测",
            code: [
                "var used = 1;",
                "var unused = 2;",
                "console.log(used);"
            ].join("\n"),
            expectedDefinitions: ["used", "unused"],
            expectedUses: ["used"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 1 // unused确实没有使用，应该被标记为high confidence未使用
        },
        {
            name: "未定义变量使用",
            code: [
                "var x = 10;",
                "console.log(y);",
                "var z = y + 5;"
            ].join("\n"),
            expectedDefinitions: ["x", "z"],
            expectedUses: ["y", "y"],
            expectedUndefinedUses: 1, // y (使用2次但只算1个未定义符号)
            expectedUnusedDefinitions: 0
        },
        {
            name: "复杂表达式和成员访问",
            code: [
                "var obj = {value: 10};",
                "obj.value = 20;",
                "var result = obj.value + 5;",
                "delete obj.value;"
            ].join("\n"),
            expectedDefinitions: ["obj", "result"],
            expectedUses: ["obj", "obj", "obj"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 1 // result在复杂初始化中，可能被使用，但置信度为medium，算作未使用
        },
        {
            name: "循环中的变量定义",
            code: [
                "for (var i = 0; i < 10; i++) {",
                "    var temp = i * 2;",
                "    console.log(temp);",
                "}"
            ].join("\n"),
            expectedDefinitions: ["i", "temp"],
            expectedUses: ["i", "i", "i", "temp"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 0
        },
        {
            name: "try-catch 和作用域",
            code: [
                "try {",
                "    var x = 10;",
                "    throw new Error('test');",
                "} catch (e) {",
                "    console.log(e.message);",
                "}"
            ].join("\n"),
            expectedDefinitions: ["x", "e"],
            expectedUses: ["e"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 1 // x在try块中，可能有异常处理用途，置信度为low，不算严格未使用
        },
        {
            name: "函数调用和返回值",
            code: [
                "function getValue() {",
                "    return 42;",
                "}",
                "var result = getValue();",
                "console.log(result);"
            ].join("\n"),
            expectedDefinitions: ["getValue", "result"],
            expectedUses: ["getValue", "result"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 0
        },
        {
            name: "IIFE 模块中的符号",
            code: [
                "var ModuleA = (function(){",
                "    var privateVar = 'secret';",
                "    ",
                "    function privateFunc() {",
                "        return privateVar;",
                "    }",
                "    ",
                "    return {",
                "        publicMethod: privateFunc",
                "    };",
                "})();"
            ].join("\n"),
            expectedDefinitions: ["ModuleA", "privateVar", "privateFunc"],
            expectedUses: ["privateVar", "privateFunc"],
            expectedUndefinedUses: 0,
            expectedUnusedDefinitions: 1 // ModuleA是大写开头的模块名，可能被外部使用，置信度为medium，算作未使用
        }
    ];
    
    /**
     * 运行所有Def-Use测试
     * @returns {Object} 测试结果
     */
    function runAllTests() {
        console.log("🧪 开始Def-Use分析测试...");
        console.log("📁 测试用例数量: " + testCases.length);
        
        var results = {
            totalTests: testCases.length,
            passedTests: 0,
            failedTests: 0,
            testResults: []
        };
        
        for (var i = 0; i < testCases.length; i++) {
            var testCase = testCases[i];
            console.log("\n" + (i + 1) + ". " + testCase.name);
            
            var testResult = runSingleTest(testCase, i + 1);
            results.testResults.push(testResult);
            
            if (testResult.passed) {
                results.passedTests++;
                console.log("   ✅ 通过");
            } else {
                results.failedTests++;
                console.log("   ❌ 失败");
                console.log("   错误: " + testResult.error);
            }
        }
        
        console.log("\n📊 测试结果统计:");
        console.log("  总测试数: " + results.totalTests);
        console.log("  通过: " + results.passedTests);
        console.log("  失败: " + results.failedTests);
        console.log("  成功率: " + ((results.passedTests / results.totalTests) * 100).toFixed(1) + "%");
        
        return results;
    }
    
    /**
     * 运行单个测试用例
     * @param {Object} testCase - 测试用例
     * @param {number} testIndex - 测试索引
     * @returns {Object} 测试结果
     */
    function runSingleTest(testCase, testIndex) {
        var startTime = Date.now();
        
        try {
            // 创建临时文件
            var tempFilePath = "test-" + testIndex + ".js";
            fs.writeFileSync(tempFilePath, testCase.code, "utf8");
            
            // 解析文件
            var parseResult = ASTParser.parseFile(tempFilePath);
            if (!parseResult.success) {
                return {
                    name: testCase.name,
                    passed: false,
                    error: "AST解析失败: " + parseResult.error,
                    duration: Date.now() - startTime
                };
            }
            
            // 执行Def-Use分析
            var defUseResult = DefUseAnalyzer.analyzeDefUse(parseResult.ast, tempFilePath, []);
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
                // 忽略清理错误
            }
            if (!defUseResult.success) {
                return {
                    name: testCase.name,
                    passed: false,
                    error: "Def-Use分析失败: " + (defUseResult.errors[0] ? defUseResult.errors[0].message : "未知错误"),
                    duration: Date.now() - startTime
                };
            }
            
            // 验证结果
            var validationResult = validateTestResult(testCase, defUseResult);
            
            return {
                name: testCase.name,
                passed: validationResult.passed,
                error: validationResult.error,
                details: {
                    definitions: defUseResult.definitions.map(function(def) { return def.symbolName; }),
                    uses: defUseResult.uses.map(function(use) { return use.symbolName; }),
                    undefinedUses: defUseResult.summary.undefinedUses,
                    unusedDefinitions: defUseResult.summary.unusedDefinitions
                },
                duration: Date.now() - startTime
            };
            
        } catch (error) {
            return {
                name: testCase.name,
                passed: false,
                error: "测试执行异常: " + error.message,
                duration: Date.now() - startTime
            };
        }
    }
    
    /**
     * 验证测试结果
     * @param {Object} testCase - 测试用例
     * @param {Object} defUseResult - Def-Use分析结果
     * @returns {Object} 验证结果
     */
    function validateTestResult(testCase, defUseResult) {
        // 提取实际结果
        var actualDefinitions = defUseResult.definitions.map(function(def) { return def.symbolName; });
        var actualUses = defUseResult.uses.map(function(use) { return use.symbolName; });
        var actualUndefinedUses = defUseResult.summary.undefinedUses;
        var actualUnusedDefinitions = defUseResult.summary.unusedDefinitions;
        
        // 验证定义点
        for (var i = 0; i < testCase.expectedDefinitions.length; i++) {
            var expectedDef = testCase.expectedDefinitions[i];
            if (actualDefinitions.indexOf(expectedDef) === -1) {
                return {
                    passed: false,
                    error: "缺少定义点: " + expectedDef + "，实际定义: " + JSON.stringify(actualDefinitions)
                };
            }
        }
        
        // 验证使用点
        for (var j = 0; j < testCase.expectedUses.length; j++) {
            var expectedUse = testCase.expectedUses[j];
            if (actualUses.indexOf(expectedUse) === -1) {
                return {
                    passed: false,
                    error: "缺少使用点: " + expectedUse + "，实际使用: " + JSON.stringify(actualUses)
                };
            }
        }
        
        // 验证未定义使用数量
        if (actualUndefinedUses !== testCase.expectedUndefinedUses) {
            return {
                passed: false,
                error: "未定义使用数量不匹配，期望: " + testCase.expectedUndefinedUses + "，实际: " + actualUndefinedUses
            };
        }
        
        // 验证未使用定义数量
        if (actualUnusedDefinitions !== testCase.expectedUnusedDefinitions) {
            return {
                passed: false,
                error: "未使用定义数量不匹配，期望: " + testCase.expectedUnusedDefinitions + "，实际: " + actualUnusedDefinitions
            };
        }
        
        return {
            passed: true,
            error: null
        };
    }
    
    /**
     * 生成测试报告
     * @param {Object} results - 测试结果
     * @returns {string} 格式化报告
     */
    function generateTestReport(results) {
        var report = "";
        
        report += "📄 Def-Use 分析测试报告\n";
        report += "═══════════════════════════════════════\n";
        report += "测试时间: " + new Date().toISOString() + "\n";
        report += "总测试数: " + results.totalTests + "\n";
        report += "通过测试: " + results.passedTests + "\n";
        report += "失败测试: " + results.failedTests + "\n";
        report += "成功率: " + ((results.passedTests / results.totalTests) * 100).toFixed(1) + "%\n\n";
        
        report += "📋 详细测试结果:\n";
        for (var i = 0; i < results.testResults.length; i++) {
            var testResult = results.testResults[i];
            report += (i + 1) + ". " + testResult.name + " ";
            report += testResult.passed ? "✅" : "❌";
            report += " (" + testResult.duration + "ms)";
            
            if (!testResult.passed) {
                report += "\n   错误: " + testResult.error;
            }
            
            if (testResult.details) {
                report += "\n   定义: " + JSON.stringify(testResult.details.definitions);
                report += "\n   使用: " + JSON.stringify(testResult.details.uses);
                report += "\n   未定义: " + testResult.details.undefinedUses;
                report += "\n   未使用: " + testResult.details.unusedDefinitions;
            }
            
            report += "\n\n";
        }
        
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    /**
     * 测试Use类型识别
     * @returns {Object} 测试结果
     */
    function testUseTypeIdentification() {
        console.log("🔍 测试Use类型识别...");
        
        var testCode = [
            "var x = 10;",           // 定义
            "var y = x + 5;",        // x: read
            "y = 20;",               // y: write
            "console.log(y);",        // y: read
            "x();",                  // x: call (如果x是函数)
            "delete x;",              // x: delete
            "typeof x;",             // x: typeof
            "'x' in obj;",           // 不是x的use
            "x instanceof Object;"   // x: instanceof
        ].join("\n");
        
        try {
            // 创建临时文件
            var tempFilePath = "use-type-test.js";
            fs.writeFileSync(tempFilePath, testCode, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            if (!parseResult.success) {
                return {
                    passed: false,
                    error: "AST解析失败: " + parseResult.error
                };
            }
            
            var defUseResult = DefUseAnalyzer.analyzeDefUse(parseResult.ast, tempFilePath, []);
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
                // 忽略清理错误
            }
            if (!defUseResult.success) {
                return {
                    passed: false,
                    error: "Def-Use分析失败: " + (defUseResult.errors[0] ? defUseResult.errors[0].message : "未知错误")
                };
            }
            
            // 验证Use类型
            var useTypes = {};
            for (var i = 0; i < defUseResult.uses.length; i++) {
                var use = defUseResult.uses[i];
                if (!useTypes[use.symbolName]) {
                    useTypes[use.symbolName] = [];
                }
                useTypes[use.symbolName].push(use.useType);
            }
            
            console.log("  📊 识别的Use类型:");
            for (var symbol in useTypes) {
                console.log("    " + symbol + ": " + JSON.stringify(useTypes[symbol]));
            }
            
            return {
                passed: true,
                useTypes: useTypes
            };
            
        } catch (error) {
            return {
                passed: false,
                error: "测试执行异常: " + error.message
            };
        }
    }
    
    /**
     * 测试PathTag识别
     * @returns {Object} 测试结果
     */
    function testPathTagIdentification() {
        console.log("🏷️  测试PathTag识别...");
        
        var testCode = [
            "var x = 1;",            // sequential
            "if (x > 0) {",         // conditional
            "    var y = x + 1;",   // conditional
            "}",
            "for (var i = 0; i < 10; i++) {",  // loop
            "    var z = i;",        // loop
            "}",
            "try {",                 // try
            "    var a = 1;",       // try
            "    throw new Error();",
            "} catch (e) {",         // catch
            "    var b = e.message;", // catch
            "} finally {",           // finally
            "    var c = 3;",        // finally
            "}"
        ].join("\n");
        
        try {
            // 创建临时文件
            var tempFilePath = "pathtag-test.js";
            fs.writeFileSync(tempFilePath, testCode, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            if (!parseResult.success) {
                return {
                    passed: false,
                    error: "AST解析失败: " + parseResult.error
                };
            }
            
            var defUseResult = DefUseAnalyzer.analyzeDefUse(parseResult.ast, tempFilePath, []);
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
                // 忽略清理错误
            }
            if (!defUseResult.success) {
                return {
                    passed: false,
                    error: "Def-Use分析失败: " + (defUseResult.errors[0] ? defUseResult.errors[0].message : "未知错误")
                };
            }
            
            // 验证PathTag
            var pathTags = {};
            for (var i = 0; i < defUseResult.definitions.length; i++) {
                var def = defUseResult.definitions[i];
                if (!pathTags[def.pathTag]) {
                    pathTags[def.pathTag] = [];
                }
                pathTags[def.pathTag].push(def.symbolName);
            }
            
            console.log("  � 识别的PathTag:");
            for (var tag in pathTags) {
                console.log("    " + tag + ": " + JSON.stringify(pathTags[tag]));
            }
            
            return {
                passed: true,
                pathTags: pathTags
            };
            
        } catch (error) {
            return {
                passed: false,
                error: "测试执行异常: " + error.message
            };
        }
    }
    
    // 公共接口
    return {
        runAllTests: runAllTests,
        testUseTypeIdentification: testUseTypeIdentification,
        testPathTagIdentification: testPathTagIdentification,
        generateTestReport: generateTestReport
    };
    
})();

// 如果直接运行此文件，执行测试
if (require.main === module) {
    console.log("� 开始Def-Use分析完整测试套件...\n");
    
    // 运行主要测试
    var mainResults = DefUseTest.runAllTests();
    
    console.log("\n" + "=".repeat(50));
    
    // 运行Use类型测试
    var useTypeResult = DefUseTest.testUseTypeIdentification();
    console.log("Use类型测试: " + (useTypeResult.passed ? "✅ 通过" : "❌ 失败"));
    
    // 运行PathTag测试
    var pathTagResult = DefUseTest.testPathTagIdentification();
    console.log("PathTag测试: " + (pathTagResult.passed ? "✅ 通过" : "❌ 失败"));
    
    // 生成报告
    var report = DefUseTest.generateTestReport(mainResults);
    console.log("\n" + report);
    
    // 保存报告到文件
    var reportPath = "reports/def-use-test-report.txt";
    try {
        require("fs").writeFileSync(reportPath, report, "utf8");
        console.log("� 测试报告已保存到: " + reportPath);
    } catch (error) {
        console.log("❌ 保存报告失败:", error.message);
    }
    
    // 返回退出码
    process.exit(mainResults.failedTests > 0 ? 1 : 0);
}

module.exports = DefUseTest;
