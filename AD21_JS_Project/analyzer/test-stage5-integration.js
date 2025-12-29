/**
 * 测试Stage 5集成到semantic-analyzer
 * 验证完整的语义分析流程
 */

var SemanticAnalyzer = require("./semantic/semantic-analyzer");
var fs = require("fs");
var path = require("path");

console.log("🧪 开始测试Stage 5集成...\n");

// 测试文件列表
var testFiles = [
    "tests/test-files/valid-iife-module.js",
    "tests/test-files/multiple-modules.js"
];

async function runTest() {
    try {
        // 执行完整的项目级分析（包含Stage 5）
        var projectResult = await SemanticAnalyzer.analyzeProject(testFiles);
    
    if (projectResult.success) {
        console.log("✅ Stage 5集成测试成功！");
        console.log("\n📊 分析结果概览:");
        console.log("  总文件数:", projectResult.summary.totalFiles);
        console.log("  符号总数:", projectResult.summary.totalSymbols);
        console.log("  模块数量:", projectResult.summary.totalModules);
        console.log("  函数数量:", projectResult.summary.totalFunctions);
        console.log("  依赖关系:", projectResult.summary.totalDependencies);
        console.log("  调用关系:", projectResult.summary.totalCalls);
        console.log("  循环依赖:", projectResult.summary.hasCircularDependencies ? "存在" : "无");
        console.log("  死代码:", projectResult.summary.hasDeadCode ? "存在" : "无");
        console.log("  未定义使用:", projectResult.summary.hasUndefinedUses ? "存在" : "无");
        console.log("  未使用定义:", projectResult.summary.hasUnusedDefinitions ? "存在" : "无");
        
        // 验证Stage 5结果
        if (projectResult.stages.stage5) {
            var stage5 = projectResult.stages.stage5;
            console.log("\n📊 Stage 5详细结果:");
            console.log("  定义点总数:", stage5.summary.totalDefinitions);
            console.log("  使用点总数:", stage5.summary.totalUses);
            console.log("  Def-Use链总数:", stage5.summary.totalChains);
            console.log("  未定义使用:", stage5.summary.undefinedUses);
            console.log("  未使用定义:", stage5.summary.unusedDefinitions);
            console.log("  分析文件数:", stage5.defUseAnalysis.length);
        }
        
        // 生成完整报告
        console.log("\n📄 生成完整报告...");
        var report = SemanticAnalyzer.generateProjectReport(projectResult);
        
        // 保存报告
        var reportPath = "reports/stage5-integration-test-report.txt";
        try {
            fs.writeFileSync(reportPath, report, "utf8");
            console.log("✅ 报告已保存到: " + reportPath);
        } catch (error) {
            console.log("❌ 保存报告失败:", error.message);
        }
        
    } else {
        console.log("❌ Stage 5集成测试失败:", projectResult.error);
    }
    
    } catch (error) {
        console.error("❌ 测试执行异常:", error.message);
    }
}

// 运行测试
runTest().catch(function(error) {
    console.error("❌ 测试启动失败:", error.message);
});

console.log("\n🏁 Stage 5集成测试完成");
