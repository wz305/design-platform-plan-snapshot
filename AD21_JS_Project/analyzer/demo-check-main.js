/**
 * 演示：使用完整ES3语义系统检查main文件
 * 展示Stage 1-7的完整分析流程
 */

var SemanticAnalyzer = require("./semantic/semantic-analyzer");
var Interpreter = require("./interpretation/interpreter");
var ActionPlanner = require("./execution/action-planner");

/**
 * 主函数：完整分析流程演示
 */
function checkMainFile() {
    console.log("🎯 使用完整ES3语义系统检查main文件");
    console.log("=".repeat(50));

    try {
        // 第1步：完整语义分析 (Stage 1-5)
        console.log("\n📊 Stage 1-5: 完整语义分析");
        var analysisResult = SemanticAnalyzer.analyzeProject("../src/main.js");
        
        if (!analysisResult || !analysisResult.projectSummary) {
            console.log("❌ 语义分析失败，可能是文件不存在或解析错误");
            return;
        }
        
        console.log("   文件数:", analysisResult.projectSummary.totalFiles || 0);
        console.log("   符号数:", analysisResult.projectSummary.totalSymbols || 0);
        console.log("   分析耗时:", (analysisResult.meta && analysisResult.meta.analysisTime) || 0 + "ms");

        // 第2步：规则解释 (Stage 6)
        console.log("\n🔍 Stage 6: 规则解释");
        var interpretationResult = Interpreter.interpret(analysisResult.facts);
        console.log("   Actions:", interpretationResult.actions.length);
        console.log("   Warnings:", interpretationResult.warnings.length);
        console.log("   Errors:", interpretationResult.errors.length);

        // 如果没有actions，显示一些示例
        if (interpretationResult.actions.length === 0) {
            console.log("   💡 没有发现需要执行的actions，这说明代码质量良好");
        }

        // 第3步：执行计划 (Stage 7)
        console.log("\n🎯 Stage 7: 执行计划生成");
        var plan = ActionPlanner.createPlan(interpretationResult);
        console.log("   执行步骤数:", plan.steps.length);
        console.log("   风险级别:", plan.riskSummary.level);
        console.log("   阻断问题:", plan.riskSummary.blockers);

        // 第4步：详细分析
        if (plan.steps.length > 0) {
            console.log("\n📋 执行计划详情:");
            plan.steps.forEach(function(step, index) {
                var riskIcon = getRiskIcon(step.risk);
                var typeIcon = getTypeIcon(step.type);
                
                console.log("   " + (index + 1) + ". " + typeIcon + " " + step.type.toUpperCase());
                console.log("      " + riskIcon + " 风险: " + step.risk);
                console.log("      🎯 目标: " + step.target.symbol + " (" + step.target.file + ":" + step.target.line + ")");
                console.log("      📝 描述: " + step.description);
                console.log("      ✅ 置信度: " + step.confidence);
                console.log("      🔧 可回滚: " + (step.reversible ? "是" : "否"));
                console.log("");
            });
        }

        // 第5步：安全检查
        console.log("\n🔒 执行安全检查");
        var safety = ActionPlanner.checkExecutionSafety(plan);
        console.log("   安全性:", safety.safe ? "✅ 安全" : "❌ 有风险");
        
        if (safety.warnings.length > 0) {
            console.log("   警告:");
            safety.warnings.forEach(function(warning) {
                console.log("      - " + warning);
            });
        }
        
        if (safety.recommendations.length > 0) {
            console.log("   建议:");
            safety.recommendations.forEach(function(rec) {
                console.log("      - " + rec);
            });
        }

        // 第6步：模拟执行
        console.log("\n🔍 模拟执行");
        var simulation = ActionPlanner.simulatePlan(plan);
        console.log("   模拟步骤数:", simulation.steps.length);
        console.log("   预估耗时:", simulation.summary.estimatedDuration + "ms");
        console.log("   影响文件数:", simulation.impact.filesAffected.length);
        console.log("   影响符号数:", simulation.impact.symbolsAffected.length);

        // 第7步：统计信息
        console.log("\n📊 执行统计");
        var stats = ActionPlanner.getPlanStatistics(plan);
        console.log("   总步骤数:", stats.overview.totalSteps);
        console.log("   风险级别:", stats.overview.riskLevel);
        console.log("   可回滚步骤:", stats.overview.reversibleSteps);
        console.log("   需要确认:", stats.overview.requiresApproval);

        // 第8步：总结和建议
        console.log("\n🎉 分析完成！");
        console.log("🔄 完整链路: Code → Stage 1-4 → Stage 5 → Stage 6 → Stage 7");
        
        if (plan.steps.length === 0) {
            console.log("✅ 代码质量良好，无需执行任何操作");
        } else {
            console.log("🚀 生成了 " + plan.steps.length + " 个执行步骤，可安全执行");
            
            if (safety.safe) {
                console.log("💡 建议：可以安全执行这些操作");
            } else {
                console.log("⚠️ 建议：需要人工审查后再执行");
            }
        }

    } catch (error) {
        console.error("❌ 分析过程中出现错误:");
        console.error("   错误信息:", error.message);
        console.error("   错误位置:", error.stack);
    }
}

/**
 * 获取风险图标
 */
function getRiskIcon(risk) {
    var icons = {
        "low": "🟢",
        "medium": "🟡", 
        "high": "🟠",
        "critical": "🔴"
    };
    return icons[risk] || "⚪";
}

/**
 * 获取类型图标
 */
function getTypeIcon(type) {
    var icons = {
        "remove-symbol": "🗑️",
        "define-variable": "📝",
        "remove-usage": "🧹",
        "add-comment": "💬",
        "rename-symbol": "✏️"
    };
    return icons[type] || "⚙️";
}

// 如果直接运行此文件，执行检查
if (require.main === module) {
    checkMainFile();
}

module.exports = {
    checkMainFile: checkMainFile
};
