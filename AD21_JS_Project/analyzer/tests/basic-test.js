/**
 * ES3 工程语义操作系统 - 基础测试
 * 测试 Stage 1-2 的核心功能：ESLint 门禁和 AST 解析
 * 
 * @author ES3 工程语义操作系统
 */

var ESLintRunner = require("../eslint/eslint-runner");
var ASTParser = require("../ast/parser");
var fs = require("fs");
var path = require("path");

/**
 * 基础测试套件
 */
var BasicTest = (function(){
    
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
     * 创建测试用的 ES3 文件
     */
    function createTestFiles() {
        var testDir = "analyzer/tests/test-files";
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }
        
        // 合法的 ES3 IIFE 模块
        var validES3Module = 'var ValidModule = (function(){\n' +
            '    var _private = "private";\n' +
            '    \n' +
            '    function doSomething() {\n' +
            '        return "valid";\n' +
            '    }\n' +
            '    \n' +
            '    return {\n' +
            '        doSomething: doSomething\n' +
            '    };\n' +
            '})();';
        
        // 非法的 ES5+ 代码
        var invalidES5Code = 'var InvalidModule = () => {\n' +
            '    const private = "private";\n' +
            '    let public = "public";\n' +
            '    return private + public;\n' +
            '};';
        
        // 语法错误的代码
        var syntaxError = 'var SyntaxErrorModule = (function(){\n' +
            '    var broken = \n' +  // 故意的语法错误
            '    return {};\n' +
            '})();';
        
        // DFM 执行函数
        var dfmFunction = 'function OnButtonClick(Sender) {\n' +
            '    // DFM 入口函数\n' +
            '    var result = "clicked";\n' +
            '    return result;\n' +
            '}';
        
        fs.writeFileSync(path.join(testDir, "valid-es3-module.js"), validES3Module);
        fs.writeFileSync(path.join(testDir, "invalid-es5-code.js"), invalidES5Code);
        fs.writeFileSync(path.join(testDir, "syntax-error.js"), syntaxError);
        fs.writeFileSync(path.join(testDir, "dfm-function.js"), dfmFunction);
        
        return [
            path.join(testDir, "valid-es3-module.js"),
            path.join(testDir, "invalid-es5-code.js"),
            path.join(testDir, "syntax-error.js"),
            path.join(testDir, "dfm-function.js")
        ];
    }
    
    /**
     * 测试 ESLint 功能
     */
    async function testESLint() {
        console.log("\n🧪 测试 ESLint 功能...");
        
        var testFiles = createTestFiles();
        
        // 测试合法 ES3 文件
        var validResult = await ESLintRunner.validateFile(testFiles[0]);
        assert(validResult.success, "合法的 ES3 模块应该通过 ESLint 检查");
        
        // 测试非法 ES5 文件
        var invalidResult = await ESLintRunner.validateFile(testFiles[1]);
        assert(!invalidResult.success, "非法的 ES5 代码应该被 ESLint 拒绝");
        assert(invalidResult.errorCount > 0, "应该报告具体的 ESLint 错误");
        
        // 测试语法错误文件
        var syntaxResult = await ESLintRunner.validateFile(testFiles[2]);
        assert(!syntaxResult.success, "语法错误应该被检测到");
        
        // 测试 DFM 函数（应该通过）
        var dfmResult = await ESLintRunner.validateFile(testFiles[3]);
        assert(dfmResult.success, "DFM 函数应该通过 ESLint 检查");
        
        // 测试批量验证
        var batchResult = await ESLintRunner.validateFiles(testFiles);
        assert(batchResult.results.length === 4, "批量验证应该返回所有文件的结果");
        assert(batchResult.summary.totalFiles === 4, "批量验证统计应该正确");
        
        console.log("   ESLint 测试完成");
    }
    
    /**
     * 测试 AST 解析功能
     */
    function testASTParser() {
        console.log("\n🧪 测试 AST 解析功能...");
        
        var testFiles = createTestFiles();
        
        // 测试合法文件解析
        var validParseResult = ASTParser.parseFile(testFiles[0]);
        assert(validParseResult.success, "合法的 ES3 文件应该能成功解析为 AST");
        assert(validParseResult.ast.type === "Program", "AST 根节点应该是 Program");
        assert(validParseResult.ast.body.length > 0, "AST 应该包含顶层节点");
        
        // 测试 AST 验证
        var validationResult = ASTParser.validateAST(validParseResult.ast);
        assert(validationResult.valid, "合法的 AST 应该通过验证");
        
        // 测试文件信息获取
        var fileInfo = ASTParser.getFileInfo(validParseResult);
        assert(fileInfo !== null, "应该能获取文件信息");
        assert(fileInfo.hasIIFEModules, "应该检测到 IIFE 模块");
        assert(!fileInfo.hasTopLevelFunctions, "不应该有顶层函数");
        
        // 测试语法错误文件
        var errorParseResult = ASTParser.parseFile(testFiles[2]);
        assert(!errorParseResult.success, "语法错误的文件应该解析失败");
        assert(errorParseResult.error, "应该报告具体的解析错误");
        
        // 测试批量解析
        var batchParseResult = ASTParser.parseFiles(testFiles);
        assert(batchParseResult.results.length === 4, "批量解析应该返回所有文件的结果");
        assert(batchParseResult.summary.totalFiles === 4, "批量解析统计应该正确");
        
        console.log("   AST 解析测试完成");
    }
    
    /**
     * 测试集成功能
     */
    async function testIntegration() {
        console.log("\n🧪 测试集成功能...");
        
        var testFiles = createTestFiles();
        
        // 测试语言门禁功能
        var passesGate1 = await ESLintRunner.passesLanguageGate(testFiles[0]);
        assert(passesGate1, "合法文件应该通过语言门禁");
        
        var passesGate2 = await ESLintRunner.passesLanguageGate(testFiles[1]);
        assert(!passesGate2, "非法文件不应该通过语言门禁");
        
        // 测试错误格式化
        var invalidResult = await ESLintRunner.validateFile(testFiles[1]);
        var formattedError = ESLintRunner.formatErrors(invalidResult);
        assert(formattedError.indexOf("❌") === 0, "错误信息应该以 ❌ 开头");
        assert(formattedError.indexOf(testFiles[1]) > 0, "错误信息应该包含文件路径");
        
        console.log("   集成功能测试完成");
    }
    
    /**
     * 运行所有测试
     */
    async function runAllTests() {
        console.log("🚀 开始运行 ES3 工程语义操作系统基础测试...\n");
        
        try {
            await testESLint();
            testASTParser();
            await testIntegration();
            
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
                console.log("\n🎉 所有测试通过！ES3 工程语义操作系统基础功能正常");
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
        createTestFiles: createTestFiles
    };
    
})();

// 如果直接运行此文件，执行测试
if (require.main === module) {
    BasicTest.runAllTests();
}

module.exports = BasicTest;
