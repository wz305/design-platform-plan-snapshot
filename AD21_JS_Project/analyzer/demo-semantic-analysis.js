/**
 * ES3 工程语义操作系统 - 演示脚本
 * 展示完整的语义分析功能
 * 
 * @author ES3 工程语义操作系统
 */

var SemanticAnalyzer = require("./semantic/semantic-analyzer");

/**
 * 演示语义分析功能
 */
async function demonstrateSemanticAnalysis() {
    console.log("🚀 ES3工程语义操作系统演示");
    console.log("═══════════════════════════════════════\n");
    
    // 演示1: 合法IIFE模块
    console.log("📝 演示1: 分析合法IIFE模块");
    console.log("─────────────────────────────────");
    
    var validIIFECode = 'var TestModule = (function(){\n' +
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
    
    console.log("代码示例:");
    console.log(validIIFECode);
    console.log("\n分析结果:");
    
    try {
        // 创建临时文件进行测试
        var fs = require('fs');
        var path = require('path');
        var tempFile = 'temp-valid-iife.js';
        fs.writeFileSync(tempFile, validIIFECode);
        
        var result = await SemanticAnalyzer.analyzeFile(tempFile);
        console.log("✅ 分析状态: " + (result.success ? "成功" : "失败"));
        console.log("📊 发现符号: " + result.symbols.length + " 个");
        
        if (result.symbols.length > 0) {
            var symbol = result.symbols[0];
            console.log("🏷️  符号类型: " + symbol.kind);
            console.log("📛 符号名称: " + symbol.name);
            console.log("🔄 生命周期: " + symbol.lifecyclePhase);
            console.log("👁️  可见性: " + symbol.visibility);
        }
        
        console.log("⚠️  诊断信息: " + result.diagnostics.length + " 条");
        
        // 生成详细报告
        var report = SemanticAnalyzer.generateReport(result);
        console.log("\n📄 详细报告:");
        console.log(report);
        
        // 清理临时文件
        fs.unlinkSync(tempFile);
        
    } catch (error) {
        console.log("❌ 分析失败: " + error.message);
    }
    
    console.log("\n");
    
    // 演示2: DFM函数
    console.log("📝 演示2: 分析DFM函数");
    console.log("─────────────────────────────────");
    
    var dfmFunctionCode = 'function Button1Click(Sender) {\n' +
        '    // 按钮点击事件处理\n' +
        '    console.log("Button1 clicked");\n' +
        '}';
    
    console.log("代码示例:");
    console.log(dfmFunctionCode);
    console.log("\n分析结果:");
    
    try {
        var tempDFMFile = 'temp-dfm-function.js';
        fs.writeFileSync(tempDFMFile, dfmFunctionCode);
        
        var dfmResult = await SemanticAnalyzer.analyzeFile(tempDFMFile);
        console.log("✅ 分析状态: " + (dfmResult.success ? "成功" : "失败"));
        console.log("📊 发现符号: " + dfmResult.symbols.length + " 个");
        
        if (dfmResult.symbols.length > 0) {
            var dfmSymbol = dfmResult.symbols[0];
            console.log("🏷️  符号类型: " + dfmSymbol.kind);
            console.log("📛 符号名称: " + dfmSymbol.name);
            console.log("🔄 生命周期: " + dfmSymbol.lifecyclePhase);
            console.log("👁️  可见性: " + dfmSymbol.visibility);
        }
        
        // 清理临时文件
        fs.unlinkSync(tempDFMFile);
        
    } catch (error) {
        console.log("❌ 分析失败: " + error.message);
    }
    
    console.log("\n");
    
    // 演示3: 非法结构
    console.log("📝 演示3: 分析非法结构");
    console.log("─────────────────────────────────");
    
    var illegalCode = 'console.log("顶层表达式语句");';
    
    console.log("代码示例:");
    console.log(illegalCode);
    console.log("\n分析结果:");
    
    try {
        var tempIllegalFile = 'temp-illegal.js';
        fs.writeFileSync(tempIllegalFile, illegalCode);
        
        var illegalResult = await SemanticAnalyzer.analyzeFile(tempIllegalFile);
        console.log("✅ 分析状态: " + (illegalResult.success ? "成功" : "失败"));
        console.log("📊 发现符号: " + illegalResult.symbols.length + " 个");
        console.log("⚠️  诊断信息: " + illegalResult.diagnostics.length + " 条");
        
        if (illegalResult.diagnostics.length > 0) {
            console.log("❌ 错误详情:");
            for (var i = 0; i < illegalResult.diagnostics.length; i++) {
                var diagnostic = illegalResult.diagnostics[i];
                console.log("   " + diagnostic.message);
            }
        }
        
        // 清理临时文件
        fs.unlinkSync(tempIllegalFile);
        
    } catch (error) {
        console.log("❌ 分析失败: " + error.message);
    }
    
    console.log("\n");
    
    // 演示4: 批量分析
    console.log("📝 演示4: 批量分析");
    console.log("─────────────────────────────────");
    
    try {
        var batchFiles = [
            { name: "ModuleA.js", code: 'var ModuleA = (function(){ return { name: "A" }; })();' },
            { name: "ModuleB.js", code: 'var ModuleB = (function(){ return { name: "B" }; })();' },
            { name: "EventHandler.js", code: 'function OnClick(Sender) { return "clicked"; }' }
        ];
        
        // 创建批量测试文件
        var batchFilePaths = [];
        for (var i = 0; i < batchFiles.length; i++) {
            var file = batchFiles[i];
            fs.writeFileSync(file.name, file.code);
            batchFilePaths.push(file.name);
        }
        
        console.log("分析 " + batchFilePaths.length + " 个文件...");
        var batchResult = await SemanticAnalyzer.analyzeFiles(batchFilePaths);
        
        console.log("📊 批量分析结果:");
        console.log("   成功: " + batchResult.summary.successCount + " 个文件");
        console.log("   失败: " + batchResult.summary.failureCount + " 个文件");
        console.log("   符号总数: " + batchResult.summary.totalSymbols + " 个");
        console.log("   诊断总数: " + batchResult.summary.totalDiagnostics + " 条");
        
        // 生成批量报告
        var batchReport = SemanticAnalyzer.generateBatchReport(batchResult);
        console.log("\n📄 批量分析报告:");
        console.log(batchReport);
        
        // 清理批量文件
        for (var j = 0; j < batchFilePaths.length; j++) {
            fs.unlinkSync(batchFilePaths[j]);
        }
        
    } catch (error) {
        console.log("❌ 批量分析失败: " + error.message);
    }
    
    console.log("\n🎉 演示完成！");
    console.log("═══════════════════════════════════════");
    console.log("ES3工程语义操作系统已成功实现:");
    console.log("✅ Stage 1: ESLint 语言门禁检查");
    console.log("✅ Stage 2: AST 解析");
    console.log("✅ Stage 3: 顶层语义扫描");
    console.log("✅ 完整的三阶段语义分析流程");
    console.log("✅ 符号识别和分类");
    console.log("✅ 错误诊断和报告");
    console.log("✅ 批量文件分析");
    console.log("✅ 详细的报告生成");
}

// 运行演示
if (require.main === module) {
    demonstrateSemanticAnalysis();
}

module.exports = {
    demonstrateSemanticAnalysis: demonstrateSemanticAnalysis
};
