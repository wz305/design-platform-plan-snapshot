/**
 * ES3 工程语义操作系统 - 集成测试
 * 测试完整的语义分析器功能
 * 
 * @author ES3 工程语义操作系统
 */

var SemanticAnalyzer = require("../semantic/semantic-analyzer");
var path = require("path");

/**
 * 集成测试套件
 */
var IntegrationTest = (function(){
    
    /**
     * 测试结果统计
     */
    var _testResults = {
        total: 0,
        passed: 0,
        failed: 0,
        errors: []
    };
    
    /**
     * 断言函数
     */
    function assert(condition, message) {
        _testResults.total++;
        if (condition) {
            _testResults.passed++;
            console.log("✅ " + message);
        } else {
            _testResults.failed++;
            var error = "❌ " + message;
            console.log(error);
            _testResults.errors.push(error);
        }
    }
    
    /**
     * 获取测试文件列表
     */
    function getTestFiles() {
        return [
            "tests/test-files/valid-iife-module.js",
            "tests/test-files/valid-dfm-function.js",
            "tests/test-files/another-dfm-function.js",
            "tests/test-files/illegal-expression.js",
            "tests/test-files/illegal-control-flow.js",
            "tests/test-files/illegal-variable.js",
            "tests/test-files/illegal-function.js",
            "tests/test-files/empty-file.js",
            "tests/test-files/mixed-content.js",
            "tests/test-files/multiple-modules.js"
        ];
    }
    
    /**
     * 测试单个文件分析
     */
    async function testSingleFileAnalysis() {
        console.log("\n🧪 测试单个文件分析...");
        
        // 测试合法IIFE模块
        var validModuleResult = await SemanticAnalyzer.analyzeFile("tests/test-files/valid-iife-module.js");
        assert(validModuleResult.success, "合法IIFE模块应该分析成功");
        if (validModuleResult.success) {
            assert(validModuleResult.symbols.length === 1, "应该识别出1个符号");
            if (validModuleResult.symbols.length > 0) {
                assert(validModuleResult.symbols[0].kind === "module", "符号种类应该是module");
            }
            assert(validModuleResult.summary.totalSymbols === 1, "统计应该正确");
        }
        
        // 测试合法DFM函数
        var validDFMResult = await SemanticAnalyzer.analyzeFile("tests/test-files/another-dfm-function.js");
        assert(validDFMResult.success, "合法DFM函数应该分析成功");
        if (validDFMResult.success) {
            assert(validDFMResult.symbols.length === 1, "应该识别出1个符号");
            if (validDFMResult.symbols.length > 0) {
                assert(validDFMResult.symbols[0].kind === "execution-entry", "符号种类应该是execution-entry");
            }
        }
        
        // 测试非法结构
        var illegalResult = await SemanticAnalyzer.analyzeFile("tests/test-files/illegal-expression.js");
        assert(!illegalResult.success, "非法结构应该分析失败");
        assert(illegalResult.summary.errorCount > 0, "应该有错误诊断");
        
        console.log("   单个文件分析测试完成");
    }
    
    /**
     * 测试批量文件分析
     */
    async function testBatchFileAnalysis() {
        console.log("\n🧪 测试批量文件分析...");
        
        var testFiles = getTestFiles();
        var batchResult = await SemanticAnalyzer.analyzeFiles(testFiles);
        
        assert(batchResult.results.length === testFiles.length, "应该分析所有文件");
        assert(batchResult.summary.totalFiles === testFiles.length, "文件统计应该正确");
        assert(batchResult.summary.totalSymbols > 0, "应该识别出符号");
        assert(batchResult.summary.totalDiagnostics > 0, "应该有诊断信息");
        assert(batchResult.summary.totalErrors > 0, "应该有错误信息"); // 因为有非法文件
        
        // 检查具体统计
        var moduleCount = 0;
        var dfmCount = 0;
        for (var i = 0; i < batchResult.results.length; i++) {
            var result = batchResult.results[i];
            if (result.success) {
                for (var j = 0; j < result.symbols.length; j++) {
                    var symbol = result.symbols[j];
                    if (symbol.kind === "module") {
                        moduleCount++;
                    } else if (symbol.kind === "execution-entry") {
                        dfmCount++;
                    }
                }
            }
        }
        
        assert(moduleCount >= 3, "应该识别出至少3个模块"); // valid-iife, mixed-content, multiple-modules (actually 4)
        assert(dfmCount >= 2, "应该识别出至少2个DFM函数"); // valid-dfm, another-dfm
        
        console.log("   批量文件分析测试完成");
    }
    
    /**
     * 测试报告生成
     */
    async function testReportGeneration() {
        console.log("\n🧪 测试报告生成...");
        
        // 测试单个文件报告
        var singleResult = await SemanticAnalyzer.analyzeFile("tests/test-files/valid-iife-module.js");
        var singleReport = SemanticAnalyzer.generateReport(singleResult);
        
        assert(typeof singleReport === "string", "报告应该是字符串");
        assert(singleReport.length > 0, "报告不应该为空");
        assert(singleReport.indexOf("语义分析报告") >= 0, "报告应该包含标题");
        assert(singleReport.indexOf("发现的符号") >= 0, "报告应该包含符号信息");
        
        // 测试批量分析报告
        var testFiles = [
            "tests/test-files/valid-iife-module.js",
            "tests/test-files/valid-dfm-function.js"
        ];
        var batchResult = await SemanticAnalyzer.analyzeFiles(testFiles);
        var batchReport = SemanticAnalyzer.generateBatchReport(batchResult);
        
        assert(typeof batchReport === "string", "批量报告应该是字符串");
        assert(batchReport.indexOf("批量语义分析报告") >= 0, "批量报告应该包含标题");
        assert(batchReport.indexOf("总体统计") >= 0, "批量报告应该包含统计信息");
        
        console.log("   报告生成测试完成");
    }
    
    /**
     * 测试错误处理
     */
    async function testErrorHandling() {
        console.log("\n🧪 测试错误处理...");
        
        // 测试不存在的文件
        var nonExistentResult = await SemanticAnalyzer.analyzeFile("non-existent-file.js");
        assert(!nonExistentResult.success, "不存在的文件应该分析失败");
        // ESLint失败时，errorCount可能在eslintResult中
        var hasErrors = nonExistentResult.summary.errorCount > 0 || 
                       (nonExistentResult.stages.eslint && nonExistentResult.stages.eslint.errorCount > 0);
        assert(hasErrors, "应该有错误统计");
        
        // 测试包含不存在文件的批量分析
        var batchWithNonExistent = await SemanticAnalyzer.analyzeFiles([
            "tests/test-files/valid-iife-module.js",
            "non-existent-file.js"
        ]);
        
        assert(!batchWithNonExistent.success, "包含不存在文件的批量分析应该失败");
        assert(batchWithNonExistent.summary.failureCount > 0, "应该有失败统计");
        
        console.log("   错误处理测试完成");
    }
    
    /**
     * 运行所有集成测试
     */
    async function runAllTests() {
        console.log("🚀 开始运行ES3语义系统集成测试...\n");
        
        try {
            await testSingleFileAnalysis();
            await testBatchFileAnalysis();
            await testReportGeneration();
            await testErrorHandling();
            
            console.log("\n📊 测试结果统计:");
            console.log("   总计: " + _testResults.total);
            console.log("   通过: " + _testResults.passed);
            console.log("   失败: " + _testResults.failed);
            
            if (_testResults.failed > 0) {
                console.log("\n❌ 失败的测试:");
                for (var i = 0; i < _testResults.errors.length; i++) {
                    console.log("   " + _testResults.errors[i]);
                }
            } else {
                console.log("\n🎉 所有测试通过！ES3语义系统集成功能正常");
            }
            
            return _testResults.failed === 0;
            
        } catch (error) {
            console.log("💥 测试运行失败: " + error.message);
            return false;
        }
    }
    
    // 公共接口
    return {
        runAllTests: runAllTests,
        testSingleFileAnalysis: testSingleFileAnalysis,
        testBatchFileAnalysis: testBatchFileAnalysis,
        testReportGeneration: testReportGeneration,
        testErrorHandling: testErrorHandling
    };
    
})();

// 如果直接运行此文件，执行测试
if (require.main === module) {
    IntegrationTest.runAllTests();
}

module.exports = IntegrationTest;
