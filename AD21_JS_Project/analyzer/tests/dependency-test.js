/**
 * ES3 工程语义操作系统 - Stage 4 依赖关系分析测试
 * 职责：测试依赖关系分析、调用图构建、循环依赖检测等Stage 4功能
 * 
 * @author ES3 工程语义操作系统
 */

var SemanticAnalyzer = require("../semantic/semantic-analyzer");
var DependencyAnalyzer = require("../semantic/dependency-analyzer");
var ProjectIndex = require("../semantic/project-index");
var CallGraph = require("../semantic/call-graph");
var fs = require("fs");
var path = require("path");

/**
 * Stage 4 测试套件
 */
var DependencyTest = (function(){
    
    /**
     * 运行所有Stage 4测试
     */
    async function runAllTests() {
        console.log("🚀 开始Stage 4依赖关系分析测试...\n");
        
        var testResults = {
            total: 0,
            passed: 0,
            failed: 0,
            details: []
        };
        
        // 测试1: 依赖关系分析
        await runTest("依赖关系分析", testDependencyAnalysis, testResults);
        
        // 测试2: 循环依赖检测
        await runTest("循环依赖检测", testCircularDependencyDetection, testResults);
        
        // 测试3: 工程符号表
        await runTest("工程符号表", testProjectIndex, testResults);
        
        // 测试4: 函数调用图
        await runTest("函数调用图", testCallGraph, testResults);
        
        // 测试5: 死代码检测
        await runTest("死代码检测", testDeadCodeDetection, testResults);
        
        // 测试6: 递归调用检测
        await runTest("递归调用检测", testRecursionDetection, testResults);
        
        // 测试7: 完整Stage 4分析
        await runTest("完整Stage 4分析", testCompleteStage4Analysis, testResults);
        
        // 测试8: 依赖图构建
        await runTest("依赖图构建", testDependencyGraph, testResults);
        
        // 输出测试结果
        printTestResults(testResults);
        
        return testResults;
    }
    
    /**
     * 测试依赖关系分析
     */
    async function testDependencyAnalysis() {
        var testCode = `
var LoggerModule = (function(){
    function log(message) {
        console.log(message);
    }
    return {log: log};
})();

var UIModule = (function(){
    function showMessage(msg) {
        LoggerModule.log("UI: " + msg);
    }
    
    return {showMessage: showMessage};
})();
`;
        
        var tempFile = createTempFile(testCode, "dependency-test.js");
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        
        if (!result.success) {
            throw new Error("文件分析失败: " + JSON.stringify(result.diagnostics));
        }
        
        var depResult = DependencyAnalyzer.analyzeModuleDependencies(
            result.stages.parsing.ast, 
            result.symbols
        );
        
        if (!depResult.success) {
            throw new Error("依赖分析失败");
        }
        
        // 验证依赖关系
        var expectedDependencies = [
            {source: "UIModule", target: "LoggerModule"}
        ];
        
        if (depResult.dependencies.length < expectedDependencies.length) {
            throw new Error("期望至少 " + expectedDependencies.length + " 个依赖，实际 " + depResult.dependencies.length + " 个");
        }
        
        for (var i = 0; i < expectedDependencies.length; i++) {
            var expected = expectedDependencies[i];
            var found = depResult.dependencies.find(function(dep) {
                return dep.source === expected.source && dep.target === expected.target;
            });
            
            if (!found) {
                throw new Error("缺少依赖: " + expected.source + " → " + expected.target);
            }
        }
        
        cleanupTempFile(tempFile);
        return true;
    }
    
    /**
     * 测试循环依赖检测
     */
    async function testCircularDependencyDetection() {
        var testCode = `
var ModuleA = (function(){
    var moduleB = ModuleB;
    
    function funcA() {
        moduleB.funcB();
    }
    
    return {funcA: funcA};
})();

var ModuleB = (function(){
    var moduleA = ModuleA;
    
    function funcB() {
        moduleA.funcA();
    }
    
    return {funcB: funcB};
})();
`;
        
        var tempFile = createTempFile(testCode, "circular-test.js");
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        
        if (!result.success) {
            throw new Error("文件分析失败");
        }
        
        var depResult = DependencyAnalyzer.analyzeModuleDependencies(
            result.stages.parsing.ast, 
            result.symbols
        );
        
        var circularResult = DependencyAnalyzer.detectCircularDependencies(depResult.dependencies);
        
        if (!circularResult.hasCycles) {
            throw new Error("应该检测到循环依赖");
        }
        
        if (circularResult.cycles.length === 0) {
            throw new Error("应该有循环路径");
        }
        
        var cycle = circularResult.cycles[0];
        if (cycle.path.indexOf("ModuleA") === -1 || cycle.path.indexOf("ModuleB") === -1) {
            throw new Error("循环路径应该包含ModuleA和ModuleB");
        }
        
        cleanupTempFile(tempFile);
        return true;
    }
    
    /**
     * 测试工程符号表
     */
    function testProjectIndex() {
        var index = ProjectIndex.createIndex();
        
        // 添加模块符号
        var moduleSymbol = {
            name: "TestModule",
            kind: "module",
            lifecyclePhase: "init",
            visibility: "public"
        };
        
        var addResult = ProjectIndex.addSymbol(index, moduleSymbol, "test.js");
        
        if (!addResult.success) {
            throw new Error("添加符号失败");
        }
        
        if (index.symbols.length !== 1) {
            throw new Error("应该有1个符号");
        }
        
        if (index.modules.length !== 1) {
            throw new Error("应该有1个模块");
        }
        
        // 测试符号查找
        var found = ProjectIndex.findSymbols(index, "TestModule", "module");
        if (found.length !== 1) {
            throw new Error("应该找到1个模块");
        }
        
        // 测试冲突检测
        var duplicateSymbol = {
            name: "TestModule",
            kind: "module",
            lifecyclePhase: "init",
            visibility: "public"
        };
        
        var addResult2 = ProjectIndex.addSymbol(index, duplicateSymbol, "test2.js");
        
        if (addResult2.conflicts.length === 0) {
            throw new Error("应该检测到符号冲突");
        }
        
        return true;
    }
    
    /**
     * 测试函数调用图
     */
    async function testCallGraph() {
        var testCode = `
function main() {
    helper1();
    helper2();
}

function helper1() {
    helper3();
}

function helper2() {
    helper3();
}

function helper3() {
    console.log("done");
}
`;
        
        var tempFile = createTempFile(testCode, "callgraph-test.js");
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        
        if (!result.success) {
            throw new Error("文件分析失败");
        }
        
        var callGraphResult = CallGraph.buildCallGraph(
            result.stages.parsing.ast, 
            result.symbols
        );
        
        if (!callGraphResult.success) {
            throw new Error("调用图构建失败");
        }
        
        var callGraph = callGraphResult.callGraph;
        
        if (callGraph.nodes.length !== 4) {
            throw new Error("应该有4个函数节点");
        }
        
        if (callGraph.edges.length !== 4) {
            throw new Error("应该有4条调用边");
        }
        
        // 验证入口点
        var entryPoints = callGraph.metadata.entryPoints;
        if (entryPoints.length === 0 || entryPoints[0].name !== "main") {
            throw new Error("main应该是入口点");
        }
        
        // 验证调用关系
        var mainToHelper1 = callGraph.edges.find(function(edge) {
            return edge.source === "main" && edge.target === "helper1";
        });
        
        if (!mainToHelper1) {
            throw new Error("应该有main → helper1的调用");
        }
        
        cleanupTempFile(tempFile);
        return true;
    }
    
    /**
     * 测试死代码检测
     */
    async function testDeadCodeDetection() {
        var testCode = `
function Button1Click(Sender) {
    mainFunction();
}

function mainFunction() {
    helper1();
}

function helper1() {
    console.log("helper1");
}

// 这个函数没有被调用
function deadFunction() {
    console.log("dead code");
}
`;
        
        var tempFile = createTempFile(testCode, "deadcode-test.js");
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        
        if (!result.success) {
            throw new Error("文件分析失败");
        }
        
        var callGraphResult = CallGraph.buildCallGraph(
            result.stages.parsing.ast, 
            result.symbols
        );
        
        var deadCodeResult = CallGraph.detectDeadCode(callGraphResult.callGraph);
        
        if (!deadCodeResult.success) {
            throw new Error("死代码检测失败");
        }
        
        // 应该检测到deadFunction
        var deadFunctions = deadCodeResult.deadFunctions;
        var deadFunctionFound = deadFunctions.find(function(dead) {
            return dead.function.name === "deadFunction";
        });
        
        if (!deadFunctionFound) {
            throw new Error("应该检测到deadFunction是死代码");
        }
        
        cleanupTempFile(tempFile);
        return true;
    }
    
    /**
     * 测试递归调用检测
     */
    async function testRecursionDetection() {
        var testCode = `
// 直接递归
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 间接递归
function funcA() {
    funcB();
}

function funcB() {
    funcA();
}
`;
        
        var tempFile = createTempFile(testCode, "recursion-test.js");
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        
        if (!result.success) {
            throw new Error("文件分析失败");
        }
        
        var callGraphResult = CallGraph.buildCallGraph(
            result.stages.parsing.ast, 
            result.symbols
        );
        
        var recursionResult = CallGraph.detectRecursion(callGraphResult.callGraph);
        
        if (!recursionResult.hasRecursion) {
            throw new Error("应该检测到递归调用");
        }
        
        // 应该检测到直接递归
        var directRecursion = recursionResult.recursiveCalls.find(function(rec) {
            return rec.function === "factorial";
        });
        
        if (!directRecursion) {
            throw new Error("应该检测到factorial的直接递归");
        }
        
        // 应该检测到间接递归
        if (recursionResult.cycles.length === 0) {
            throw new Error("应该检测到funcA和funcB的间接递归");
        }
        
        cleanupTempFile(tempFile);
        return true;
    }
    
    /**
     * 测试完整Stage 4分析
     */
    async function testCompleteStage4Analysis() {
        var testFiles = [
            {
                name: "module1.js",
                content: `
var Module1 = (function(){
    function doSomething() {
        console.log("Module1 working");
    }
    
    return {doSomething: doSomething};
})();
`
            },
            {
                name: "module2.js", 
                content: `
var Module2 = (function(){
    var module1 = Module1;
    
    function doWork() {
        module1.doSomething();
        helper();
    }
    
    function helper() {
        console.log("helper");
    }
    
    return {doWork: doWork};
})();
`
            },
            {
                name: "main.js",
                content: `
function Button1Click(Sender) {
    var module2 = Module2;
    module2.doWork();
}
`
            }
        ];
        
        var tempFiles = testFiles.map(function(file) {
            return createTempFile(file.content, file.name);
        });
        
        try {
            var projectResult = await SemanticAnalyzer.analyzeProject(tempFiles);
            
            if (!projectResult.success) {
                throw new Error("项目分析失败: " + projectResult.error);
            }
            
            // 验证Stage 4结果
            if (!projectResult.stages.stage4) {
                throw new Error("应该有Stage 4分析结果");
            }
            
            var stage4 = projectResult.stages.stage4;
            
            if (stage4.summary.totalModules !== 2) {
                throw new Error("应该有2个模块");
            }
            
            if (stage4.summary.totalDependencies === 0) {
                throw new Error("应该有依赖关系");
            }
            
            if (stage4.summary.totalFunctions === 0) {
                throw new Error("应该有函数");
            }
            
        } finally {
            tempFiles.forEach(cleanupTempFile);
        }
        
        return true;
    }
    
    /**
     * 测试依赖图构建
     */
    function testDependencyGraph() {
        var dependencies = [
            {source: "ModuleA", target: "ModuleB"},
            {source: "ModuleB", target: "ModuleC"},
            {source: "ModuleC", target: "ModuleD"}
        ];
        
        var graph = DependencyAnalyzer.buildDependencyGraph(dependencies);
        
        if (graph.nodes.length !== 4) {
            throw new Error("应该有4个节点");
        }
        
        if (graph.edges.length !== 3) {
            throw new Error("应该有3条边");
        }
        
        if (graph.metadata.maxDepth !== 3) {
            throw new Error("最大深度应该是3");
        }
        
        // 验证节点属性
        var moduleA = graph.nodes.find(function(node) { return node.name === "ModuleA"; });
        if (!moduleA || moduleA.dependencies.length !== 1 || moduleA.dependents.length !== 0) {
            throw new Error("ModuleA的属性不正确");
        }
        
        var moduleD = graph.nodes.find(function(node) { return node.name === "ModuleD"; });
        if (!moduleD || moduleD.dependencies.length !== 0 || moduleD.dependents.length !== 1) {
            throw new Error("ModuleD的属性不正确");
        }
        
        return true;
    }
    
    // 辅助函数：运行单个测试
    async function runTest(testName, testFunction, results) {
        results.total++;
        
        try {
            console.log("🧪 运行测试: " + testName);
            var startTime = Date.now();
            
            var result = await testFunction();
            
            var duration = Date.now() - startTime;
            console.log("  ✅ 通过 (" + duration + "ms)");
            
            results.passed++;
            results.details.push({
                name: testName,
                status: "PASSED",
                duration: duration,
                error: null
            });
            
        } catch (error) {
            console.log("  ❌ 失败: " + error.message);
            
            results.failed++;
            results.details.push({
                name: testName,
                status: "FAILED",
                duration: 0,
                error: error.message
            });
        }
        
        console.log("");
    }
    
    // 辅助函数：创建临时文件
    function createTempFile(content, filename) {
        var tempDir = path.join(__dirname, "temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        
        var tempFile = path.join(tempDir, filename);
        fs.writeFileSync(tempFile, content, "utf8");
        return tempFile;
    }
    
    // 辅助函数：清理临时文件
    function cleanupTempFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.warn("清理临时文件失败: " + filePath);
        }
    }
    
    // 辅助函数：输出测试结果
    function printTestResults(results) {
        console.log("📊 Stage 4 测试结果汇总:");
        console.log("═══════════════════════════════════════");
        console.log("总测试数: " + results.total);
        console.log("通过: " + results.passed);
        console.log("失败: " + results.failed);
        console.log("成功率: " + ((results.passed / results.total * 100).toFixed(1)) + "%");
        console.log("");
        
        // 详细结果
        console.log("📋 详细结果:");
        results.details.forEach(function(detail) {
            var status = detail.status === "PASSED" ? "✅" : "❌";
            console.log("  " + status + " " + detail.name);
            if (detail.error) {
                console.log("    错误: " + detail.error);
            }
            if (detail.duration > 0) {
                console.log("    耗时: " + detail.duration + "ms");
            }
        });
        
        console.log("═══════════════════════════════════════");
        
        if (results.failed === 0) {
            console.log("🎉 所有Stage 4测试通过！");
        } else {
            console.log("⚠️ 有 " + results.failed + " 个测试失败");
        }
    }
    
    // 公共接口
    return {
        runAllTests: runAllTests,
        testDependencyAnalysis: testDependencyAnalysis,
        testCircularDependencyDetection: testCircularDependencyDetection,
        testProjectIndex: testProjectIndex,
        testCallGraph: testCallGraph,
        testDeadCodeDetection: testDeadCodeDetection,
        testRecursionDetection: testRecursionDetection,
        testCompleteStage4Analysis: testCompleteStage4Analysis,
        testDependencyGraph: testDependencyGraph
    };
    
})();

// 如果直接运行此文件，执行测试
if (require.main === module) {
    DependencyTest.runAllTests();
}

module.exports = DependencyTest;
