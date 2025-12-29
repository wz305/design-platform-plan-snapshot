/**
 * ES3 工程语义操作系统 - 语义分析测试
 * 测试 Stage 3: 顶层语义识别功能
 * 
 * @author ES3 工程语义操作系统
 */

var ESLintRunner = require("../eslint/eslint-runner");
var ASTParser = require("../ast/parser");
var TopLevelScanner = require("../semantic/top-level-scanner");
var SymbolTypes = require("../semantic/symbol-types");
var fs = require("fs");
var path = require("path");

/**
 * 语义分析测试套件
 */
var SemanticTest = (function(){
    
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
     * 创建语义分析测试文件
     */
    function createSemanticTestFiles() {
        var testDir = "analyzer/tests/test-files";
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }
        
        // 合法的IIFE模块
        var validIIFEModule = 'var TestModule = (function(){\n' +
            '    var _private = "private";\n' +
            '    \n' +
            '    function doSomething() {\n' +
            '        return "test";\n' +
            '    }\n' +
            '    \n' +
            '    return {\n' +
            '        doSomething: doSomething\n' +
            '    };\n' +
            '})();';
        
        // 合法的DFM函数
        var validDFMFunction = 'function OnButtonClick(Sender) {\n' +
            '    // 按钮点击事件处理\n' +
            '    var result = "clicked";\n' +
            '    return result;\n' +
            '}';
        
        // 另一个合法的DFM函数
        var anotherDFMFunction = 'function Button1Click(Sender) {\n' +
            '    // 按钮1点击事件\n' +
            '    console.log("Button1 clicked");\n' +
            '}';
        
        // 非法顶层：表达式语句
        var illegalExpression = 'console.log("顶层表达式语句");';
        
        // 非法顶层：控制流语句
        var illegalControlFlow = 'if (true) {\n' +
            '    console.log("顶层if语句");\n' +
            '}';
        
        // 非法顶层：非IIFE变量声明
        var illegalVariable = 'var x = 1;';
        
        // 非法顶层：非DFM函数
        var illegalFunction = 'function helperFunction() {\n' +
            '    return "helper";\n' +
            '}';
        
        // 空文件
        var emptyFile = '// 只包含注释的文件\n' +
            '// 没有实际的代码';
        
        // 混合内容：合法IIFE + 非法语句
        var mixedContent = 'var MixedModule = (function(){\n' +
            '    return { test: true };\n' +
            '})();\n' +
            '\n' +
            'console.log("非法的顶层表达式");';
        
        // 多个模块（应该报错）
        var multipleModules = 'var Module1 = (function(){\n' +
            '    return { name: "module1" };\n' +
            '})();\n' +
            '\n' +
            'var Module2 = (function(){\n' +
            '    return { name: "module2" };\n' +
            '})();';
        
        fs.writeFileSync(path.join(testDir, "valid-iife-module.js"), validIIFEModule);
        fs.writeFileSync(path.join(testDir, "valid-dfm-function.js"), validDFMFunction);
        fs.writeFileSync(path.join(testDir, "another-dfm-function.js"), anotherDFMFunction);
        fs.writeFileSync(path.join(testDir, "illegal-expression.js"), illegalExpression);
        fs.writeFileSync(path.join(testDir, "illegal-control-flow.js"), illegalControlFlow);
        fs.writeFileSync(path.join(testDir, "illegal-variable.js"), illegalVariable);
        fs.writeFileSync(path.join(testDir, "illegal-function.js"), illegalFunction);
        fs.writeFileSync(path.join(testDir, "empty-file.js"), emptyFile);
        fs.writeFileSync(path.join(testDir, "mixed-content.js"), mixedContent);
        fs.writeFileSync(path.join(testDir, "multiple-modules.js"), multipleModules);
        
        return [
            path.join(testDir, "valid-iife-module.js"),
            path.join(testDir, "valid-dfm-function.js"),
            path.join(testDir, "another-dfm-function.js"),
            path.join(testDir, "illegal-expression.js"),
            path.join(testDir, "illegal-control-flow.js"),
            path.join(testDir, "illegal-variable.js"),
            path.join(testDir, "illegal-function.js"),
            path.join(testDir, "empty-file.js"),
            path.join(testDir, "mixed-content.js"),
            path.join(testDir, "multiple-modules.js")
        ];
    }
    
    /**
     * 测试IIFE模块识别
     */
    function testIIFEModuleRecognition() {
        console.log("\n🧪 测试IIFE模块识别...");
        
        var testFiles = createSemanticTestFiles();
        
        // 测试合法IIFE模块
        var validParseResult = ASTParser.parseFile(testFiles[0]);
        assert(validParseResult.success, "合法IIFE模块应该能成功解析");
        
        var scanResult = TopLevelScanner.scanTopLevelSymbols(validParseResult.ast, testFiles[0]);
        assert(scanResult.success, "合法IIFE模块应该能成功扫描");
        assert(scanResult.symbols.length === 1, "应该识别出1个符号");
        assert(scanResult.symbols[0].kind === "module", "符号种类应该是module");
        assert(scanResult.symbols[0].name === "TestModule", "模块名应该是TestModule");
        assert(scanResult.diagnostics.length === 0, "不应该有诊断信息");
        
        // 测试IIFE识别逻辑
        var ast = validParseResult.ast;
        var varDecl = ast.body[0];
        assert(TopLevelScanner.isIIFEModule(varDecl), "应该识别为IIFE模块");
        assert(!TopLevelScanner.isDFMFunction(varDecl), "不应该识别为DFM函数");
        
        console.log("   IIFE模块识别测试完成");
    }
    
    /**
     * 测试DFM函数识别
     */
    function testDFMFunctionRecognition() {
        console.log("\n🧪 测试DFM函数识别...");
        
        var testFiles = createSemanticTestFiles();
        
        // 测试OnButtonClick
        var dfmParseResult = ASTParser.parseFile(testFiles[1]);
        assert(dfmParseResult.success, "合法DFM函数应该能成功解析");
        
        var dfmScanResult = TopLevelScanner.scanTopLevelSymbols(dfmParseResult.ast, testFiles[1]);
        assert(dfmScanResult.success, "合法DFM函数应该能成功扫描");
        assert(dfmScanResult.symbols.length === 1, "应该识别出1个符号");
        assert(dfmScanResult.symbols[0].kind === "execution-entry", "符号种类应该是execution-entry");
        assert(dfmScanResult.symbols[0].name === "OnButtonClick", "函数名应该是OnButtonClick");
        
        // 测试Button1Click
        var anotherDFMResult = ASTParser.parseFile(testFiles[2]);
        var anotherDFMScan = TopLevelScanner.scanTopLevelSymbols(anotherDFMResult.ast, testFiles[2]);
        assert(anotherDFMScan.symbols[0].name === "Button1Click", "应该识别Button1Click");
        
        // 测试DFM识别逻辑
        var ast = dfmParseResult.ast;
        var funcDecl = ast.body[0];
        assert(TopLevelScanner.isDFMFunction(funcDecl), "应该识别为DFM函数");
        assert(!TopLevelScanner.isIIFEModule(funcDecl), "不应该识别为IIFE模块");
        
        console.log("   DFM函数识别测试完成");
    }
    
    /**
     * 测试非法结构检测
     */
    function testIllegalStructureDetection() {
        console.log("\n🧪 测试非法结构检测...");
        
        var testFiles = createSemanticTestFiles();
        
        // 测试非法表达式语句
        var exprParseResult = ASTParser.parseFile(testFiles[3]);
        var exprScanResult = TopLevelScanner.scanTopLevelSymbols(exprParseResult.ast, testFiles[3]);
        assert(exprScanResult.symbols.length === 0, "不应该识别出符号");
        assert(exprScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        assert(exprScanResult.diagnostics[0].severity === "error", "应该是错误级别");
        
        // 测试非法控制流语句
        var controlParseResult = ASTParser.parseFile(testFiles[4]);
        var controlScanResult = TopLevelScanner.scanTopLevelSymbols(controlParseResult.ast, testFiles[4]);
        assert(controlScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        assert(controlScanResult.diagnostics[0].message.indexOf("顶层不允许存在控制流语句") >= 0, "错误信息应该正确");
        
        // 测试非法变量声明
        var varParseResult = ASTParser.parseFile(testFiles[5]);
        var varScanResult = TopLevelScanner.scanTopLevelSymbols(varParseResult.ast, testFiles[5]);
        assert(varScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        assert(varScanResult.diagnostics[0].message.indexOf("顶层变量声明必须为IIFE模块格式") >= 0, "错误信息应该正确");
        
        // 测试非法函数声明
        var funcParseResult = ASTParser.parseFile(testFiles[6]);
        var funcScanResult = TopLevelScanner.scanTopLevelSymbols(funcParseResult.ast, testFiles[6]);
        assert(funcScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        assert(funcScanResult.diagnostics[0].message.indexOf("顶层函数必须符合DFM命名规则") >= 0, "错误信息应该正确");
        
        console.log("   非法结构检测测试完成");
    }
    
    /**
     * 测试文件约束验证
     */
    function testFileConstraints() {
        console.log("\n🧪 测试文件约束验证...");
        
        var testFiles = createSemanticTestFiles();
        
        // 测试空文件
        var emptyParseResult = ASTParser.parseFile(testFiles[7]);
        var emptyScanResult = TopLevelScanner.scanTopLevelSymbols(emptyParseResult.ast, testFiles[7]);
        assert(emptyScanResult.diagnostics.length === 1, "空文件应该有警告");
        assert(emptyScanResult.diagnostics[0].severity === "warning", "应该是警告级别");
        assert(emptyScanResult.diagnostics[0].message.indexOf("文件为空或只包含注释") >= 0, "警告信息应该正确");
        
        // 测试多模块文件
        var multiParseResult = ASTParser.parseFile(testFiles[9]);
        var multiScanResult = TopLevelScanner.scanTopLevelSymbols(multiParseResult.ast, testFiles[9]);
        assert(multiScanResult.symbols.length === 2, "应该识别出2个模块符号");
        assert(multiScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        assert(multiScanResult.diagnostics[0].message.indexOf("一个文件不允许定义多个模块") >= 0, "错误信息应该正确");
        
        // 测试混合内容
        var mixedParseResult = ASTParser.parseFile(testFiles[8]);
        var mixedScanResult = TopLevelScanner.scanTopLevelSymbols(mixedParseResult.ast, testFiles[8]);
        assert(mixedScanResult.symbols.length === 1, "应该识别出1个模块符号");
        assert(mixedScanResult.diagnostics.length === 1, "应该有1个诊断信息");
        
        console.log("   文件约束验证测试完成");
    }
    
    /**
     * 测试符号类型验证
     */
    function testSymbolValidation() {
        console.log("\n🧪 测试符号类型验证...");
        
        // 测试创建有效符号
        var validModule = SymbolTypes.createModuleSymbol("TestModule", "test.js");
        var moduleValidation = SymbolTypes.validateSymbol(validModule);
        assert(moduleValidation.valid, "有效的模块符号应该通过验证");
        
        var validDFM = SymbolTypes.createExecutionEntrySymbol("OnClick", "test.js");
        var dfmValidation = SymbolTypes.validateSymbol(validDFM);
        assert(dfmValidation.valid, "有效的DFM符号应该通过验证");
        
        // 测试创建无效符号
        var invalidSymbol = { name: "test" }; // 缺少必需字段
        var invalidValidation = SymbolTypes.validateSymbol(invalidSymbol);
        assert(!invalidValidation.valid, "无效符号应该验证失败");
        assert(invalidValidation.issues.length > 0, "应该有具体的错误信息");
        
        // 测试诊断信息验证
        var validDiagnostic = SymbolTypes.createErrorDiagnostic("test.js", "测试错误", "TEST_RULE");
        var diagValidation = SymbolTypes.validateDiagnostic(validDiagnostic);
        assert(diagValidation.valid, "有效的诊断信息应该通过验证");
        
        // 测试符号描述
        var moduleDesc = SymbolTypes.getSymbolDescription(validModule);
        assert(moduleDesc.indexOf("模块") >= 0, "模块描述应该正确");
        
        var dfmDesc = SymbolTypes.getSymbolDescription(validDFM);
        assert(dfmDesc.indexOf("执行入口") >= 0, "DFM描述应该正确");
        
        console.log("   符号类型验证测试完成");
    }
    
    /**
     * 测试批量扫描功能
     */
    function testBatchScanning() {
        console.log("\n🧪 测试批量扫描功能...");
        
        var testFiles = createSemanticTestFiles();
        
        // 解析所有文件
        var parseResults = ASTParser.parseFiles(testFiles);
        assert(parseResults.results.length === testFiles.length, "应该解析所有文件");
        
        // 批量扫描
        var batchResult = TopLevelScanner.scanFiles(parseResults.results);
        assert(batchResult.results.length === testFiles.length, "应该扫描所有文件");
        assert(batchResult.summary.totalFiles === testFiles.length, "文件统计应该正确");
        assert(batchResult.summary.totalSymbols > 0, "应该识别出符号");
        assert(batchResult.summary.totalDiagnostics > 0, "应该有诊断信息");
        
        console.log("   批量扫描测试完成");
    }
    
    /**
     * 测试集成功能
     */
    async function testIntegration() {
        console.log("\n🧪 测试集成功能...");
        
        var testFiles = createSemanticTestFiles();
        
        // 测试完整的分析流程
        for (var i = 0; i < testFiles.length; i++) {
            var filePath = testFiles[i];
            
            // 1. ESLint检查
            var eslintResult = await ESLintRunner.validateFile(filePath);
            
            // 2. AST解析
            var parseResult = ASTParser.parseFile(filePath);
            
            // 3. 语义扫描
            var scanResult = TopLevelScanner.scanTopLevelSymbols(parseResult.ast, filePath);
            
            // 4. 验证结果一致性
            if (eslintResult.success && parseResult.success) {
                assert(scanResult.success, "ESLint和解析都成功时，语义扫描也应该成功");
            }
            
            // 5. 验证符号结构
            for (var j = 0; j < scanResult.symbols.length; j++) {
                var symbol = scanResult.symbols[j];
                var symbolValidation = SymbolTypes.validateSymbol(symbol);
                assert(symbolValidation.valid, "识别的符号应该是有效的");
            }
            
            // 6. 验证诊断信息
            for (var k = 0; k < scanResult.diagnostics.length; k++) {
                var diagnostic = scanResult.diagnostics[k];
                var diagValidation = SymbolTypes.validateDiagnostic(diagnostic);
                assert(diagValidation.valid, "诊断信息应该是有效的");
            }
        }
        
        console.log("   集成功能测试完成");
    }
    
    /**
     * 运行所有语义分析测试
     */
    async function runAllTests() {
        console.log("🚀 开始运行ES3语义操作系统 Stage 3 测试...\n");
        
        try {
            testIIFEModuleRecognition();
            testDFMFunctionRecognition();
            testIllegalStructureDetection();
            testFileConstraints();
            testSymbolValidation();
            testBatchScanning();
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
                console.log("\n🎉 所有测试通过！ES3语义操作系统 Stage 3 功能正常");
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
        createSemanticTestFiles: createSemanticTestFiles,
        testIIFEModuleRecognition: testIIFEModuleRecognition,
        testDFMFunctionRecognition: testDFMFunctionRecognition,
        testIllegalStructureDetection: testIllegalStructureDetection,
        testFileConstraints: testFileConstraints,
        testSymbolValidation: testSymbolValidation,
        testBatchScanning: testBatchScanning,
        testIntegration: testIntegration
    };
    
})();

// 如果直接运行此文件，执行测试
if (require.main === module) {
    SemanticTest.runAllTests();
}

module.exports = SemanticTest;
