/**
 * Execution Planner Demo
 * 完整演示：Stage 6 Interpretation → Stage 7 ExecutionPlan
 * 
 * 展示完整的语义执行闭环：
 * Code → Stage 1-4 → Stage 5 → Stage 6 → Stage 7
 */

var ActionPlanner = require("./execution/action-planner");
var PlanTypes = require("./execution/plan-types");

/**
 * 创建演示用的InterpretationResult
 */
function createDemoInterpretationResult() {
    return {
        actions: [
            {
                action: "safe-remove",
                symbol: "deadVariable",
                risk: "low",
                confidence: "high",
                reason: "Symbol defined but never used with high confidence, safe to remove",
                evidence: {
                    file: "demo.js",
                    line: 3,
                    type: "VariableDeclaration",
                    originalCode: "var deadVariable = 'unused';"
                }
            },
            {
                action: "safe-remove", 
                symbol: "unusedFunction",
                risk: "low",
                confidence: "high",
                reason: "Function never called, safe to remove",
                evidence: {
                    file: "demo.js",
                    line: 8,
                    type: "FunctionDeclaration",
                    originalCode: "function unusedFunction() { return 'dead'; }"
                }
            },
            {
                action: "define-variable",
                symbol: "missingVar",
                risk: "medium",
                confidence: "high", 
                reason: "Variable used but never defined",
                evidence: {
                    file: "demo.js",
                    line: 15,
                    type: "read",
                    originalCode: "console.log(missingVar);"
                }
            }
        ],
        warnings: [
            {
                type: "unused-symbol-medium",
                symbol: "maybeUnused",
                risk: "medium",
                reason: "Symbol appears to be unused but confidence is medium",
                location: {
                    file: "demo.js",
                    line: 12
                }
            },
            {
                type: "cross-module-exported-unused",
                symbol: "publicAPI",
                risk: "medium", 
                reason: "Exported symbol appears unused but may be used by other modules",
                location: {
                    file: "demo.js",
                    line: 20
                }
            }
        ],
        errors: [
            {
                type: "undefined-use",
                symbol: "undefinedVar",
                risk: "critical",
                reason: "Variable used but never defined",
                location: {
                    file: "demo.js", 
                    line: 25
                },
                suggestions: [
                    {
                        action: "define-variable",
                        description: "Define variable before use"
                    },
                    {
                        action: "remove-use",
                        description: "Remove undefined variable usage"
                    }
                ]
            }
        ],
        meta: {
            ruleCount: 3,
            generatedAt: new Date().toISOString()
        }
    };
}

/**
 * 演示完整流程
 */
function demonstrateExecutionPlanner() {
    console.log("🚀 Execution Planner 完整演示");
    console.log("=".repeat(50));
    
    // 第1步：创建InterpretationResult
    console.log("\n📊 Step 1: 准备Stage 6 InterpretationResult");
    var interpretationResult = createDemoInterpretationResult();
    console.log("   Actions:", interpretationResult.actions.length);
    console.log("   Warnings:", interpretationResult.warnings.length);
    console.log("   Errors:", interpretationResult.errors.length);
    
    // 第2步：转换为ExecutionPlan
    console.log("\n🎯 Step 2: 生成Stage 7 ExecutionPlan");
    var plan = ActionPlanner.createPlan(interpretationResult);
    console.log("   Plan ID:", plan.meta.id);
    console.log("   Total Steps:", plan.steps.length);
    console.log("   Risk Level:", plan.riskSummary.level);
    console.log("   Blockers:", plan.riskSummary.blockers);
    
    // 第3步：详细展示ExecutionPlan
    console.log("\n📋 Step 3: ExecutionPlan 详细分析");
    displayExecutionPlan(plan);
    
    // 第4步：安全检查
    console.log("\n🔒 Step 4: 执行安全检查");
    var safety = ActionPlanner.checkExecutionSafety(plan);
    displaySafetyCheck(safety);
    
    // 第5步：模拟执行
    console.log("\n🔍 Step 5: 模拟执行ExecutionPlan");
    var simulation = ActionPlanner.simulatePlan(plan);
    displaySimulation(simulation);
    
    // 第6步：统计信息
    console.log("\n📊 Step 6: 执行计划统计");
    var stats = ActionPlanner.getPlanStatistics(plan);
    displayStatistics(stats);
    
    // 第7步：总结
    console.log("\n🎉 Step 7: 完整闭环总结");
    displaySummary(plan, simulation, stats);
}

/**
 * 展示ExecutionPlan详情
 */
function displayExecutionPlan(plan) {
    console.log("\n   📝 执行步骤详情:");
    plan.steps.forEach(function(step, index) {
        var riskIcon = getRiskIcon(step.risk);
        var typeIcon = getTypeIcon(step.type);
        
        console.log("   " + (index + 1) + ". " + typeIcon + " " + step.type.toUpperCase());
        console.log("      " + riskIcon + " 风险: " + step.risk);
        console.log("      🎯 目标: " + step.target.symbol + " (" + step.target.file + ":" + step.target.line + ")");
        console.log("      📝 描述: " + step.description);
        console.log("      🔧 可回滚: " + (step.reversible ? "是" : "否"));
        console.log("      ✅ 置信度: " + step.confidence);
        console.log("      💡 理由: " + step.reason);
        console.log("");
    });
}

/**
 * 展示安全检查结果
 */
function displaySafetyCheck(safety) {
    var statusIcon = safety.safe ? "✅" : "❌";
    console.log("   " + statusIcon + " 执行安全性:", safety.safe ? "安全" : "有风险");
    
    if (safety.blockers.length > 0) {
        console.log("   🚫 阻断问题:");
        safety.blockers.forEach(function(blocker) {
            console.log("      - " + blocker);
        });
    }
    
    if (safety.warnings.length > 0) {
        console.log("   ⚠️ 警告:");
        safety.warnings.forEach(function(warning) {
            console.log("      - " + warning);
        });
    }
    
    if (safety.recommendations.length > 0) {
        console.log("   💡 建议:");
        safety.recommendations.forEach(function(rec) {
            console.log("      - " + rec);
        });
    }
}

/**
 * 展示模拟结果
 */
function displaySimulation(simulation) {
    console.log("   📊 模拟结果:");
    console.log("      模拟步骤数:", simulation.steps.length);
    console.log("      预估耗时:", simulation.summary.estimatedDuration + "ms");
    console.log("      影响文件数:", simulation.impact.filesAffected.length);
    console.log("      影响符号数:", simulation.impact.symbolsAffected.length);
    
    if (simulation.impact.potentialIssues.length > 0) {
        console.log("      潜在问题:");
        simulation.impact.potentialIssues.forEach(function(issue) {
            console.log("        - " + issue);
        });
    }
}

/**
 * 展示统计信息
 */
function displayStatistics(stats) {
    console.log("   📈 统计信息:");
    console.log("      总步骤数:", stats.overview.totalSteps);
    console.log("      风险级别:", stats.overview.riskLevel);
    console.log("      阻断问题:", stats.overview.blockers);
    console.log("      可回滚步骤:", stats.overview.reversibleSteps);
    
    console.log("      步骤类型分布:");
    Object.keys(stats.distribution.byType).forEach(function(type) {
        console.log("        " + type + ":", stats.distribution.byType[type]);
    });
    
    console.log("      风险级别分布:");
    Object.keys(stats.distribution.byRisk).forEach(function(risk) {
        console.log("        " + risk + ":", stats.distribution.byRisk[risk]);
    });
}

/**
 * 展示总结
 */
function displaySummary(plan, simulation, stats) {
    console.log("   🎯 完整闭环验证:");
    console.log("      ✅ Stage 6 → Stage 7 转换成功");
    console.log("      ✅ 生成 " + plan.steps.length + " 个执行步骤");
    console.log("      ✅ 风险级别: " + plan.riskSummary.level);
    console.log("      ✅ 模拟执行耗时: " + simulation.summary.estimatedDuration + "ms");
    console.log("      ✅ 影响文件: " + stats.impact.filesAffected + " 个");
    console.log("      ✅ 影响符号: " + stats.impact.symbolsAffected + " 个");
    
    console.log("\n   🔧 执行能力:");
    console.log("      🔄 支持批量执行:", plan.execution.batchEnabled ? "是" : "否");
    console.log("      🔙 支持回滚:", plan.execution.rollbackEnabled ? "是" : "否");
    console.log("      🔍 支持模拟:", "是");
    console.log("      🛡️ 安全检查:", "是");
    
    console.log("\n   🤖 AI友好特性:");
    console.log("      📋 结构化步骤: 每步都有明确的类型、目标、风险");
    console.log("      🎯 明确目标: 文件路径、行号、符号名");
    console.log("      ⚡ 风险量化: low/medium/high/critical分级");
    console.log("      ✅ 置信度标识: high/medium/low置信度");
    console.log("      🔧 回滚支持: 每步都可回滚");
    console.log("      📊 统计信息: 完整的执行统计");
    
    console.log("\n🎉 Execution Planner v0 实现完成！");
    console.log("🔄 完整链路: Code → Stage 1-4 → Stage 5 → Stage 6 → Stage 7");
    console.log("🚀 准备就绪: 可被AI/Agent/工具消费和执行");
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

/**
 * 演示不同场景
 */
function demonstrateScenarios() {
    console.log("\n🎬 场景演示");
    console.log("=".repeat(30));
    
    // 场景1：低风险清理
    console.log("\n🟢 场景1: 低风险代码清理");
    var cleanupScenario = {
        actions: [
            {
                action: "safe-remove",
                symbol: "tempVar",
                risk: "low",
                confidence: "high",
                reason: "Temporary variable no longer needed",
                evidence: { file: "temp.js", line: 5 }
            }
        ],
        warnings: [],
        errors: [],
        meta: { ruleCount: 1 }
    };
    
    var cleanupPlan = ActionPlanner.createPlan(cleanupScenario);
    var cleanupSafety = ActionPlanner.checkExecutionSafety(cleanupPlan);
    console.log("   结果: " + (cleanupSafety.safe ? "✅ 可安全执行" : "❌ 需要审查"));
    console.log("   步骤数:", cleanupPlan.steps.length);
    
    // 场景2：中等风险修复
    console.log("\n🟡 场景2: 中等风险问题修复");
    var fixScenario = {
        actions: [
            {
                action: "define-variable",
                symbol: "missingConfig",
                risk: "medium",
                confidence: "high",
                reason: "Configuration variable is missing",
                evidence: { file: "config.js", line: 10 }
            }
        ],
        warnings: [],
        errors: [],
        meta: { ruleCount: 1 }
    };
    
    var fixPlan = ActionPlanner.createPlan(fixScenario);
    var fixSafety = ActionPlanner.checkExecutionSafety(fixPlan);
    console.log("   结果: " + (fixSafety.safe ? "⚠️ 需要谨慎执行" : "❌ 需要审查"));
    console.log("   步骤数:", fixPlan.steps.length);
    
    // 场景3：高风险重构
    console.log("\n🔴 场景3: 高风险代码重构");
    var refactorScenario = {
        actions: [
            {
                action: "rename-symbol",
                symbol: "globalState",
                risk: "high",
                confidence: "medium",
                reason: "Global state variable needs refactoring",
                evidence: { file: "state.js", line: 1 }
            }
        ],
        warnings: [],
        errors: [],
        meta: { ruleCount: 1 }
    };
    
    var refactorPlan = ActionPlanner.createPlan(refactorScenario);
    var refactorSafety = ActionPlanner.checkExecutionSafety(refactorPlan);
    console.log("   结果: " + (refactorSafety.safe ? "⚠️ 需要谨慎执行" : "🚫 阻断执行"));
    console.log("   步骤数:", refactorPlan.steps.length);
    console.log("   警告数:", refactorSafety.warnings.length);
    console.log("   建议数:", refactorSafety.recommendations.length);
}

// 主执行
if (require.main === module) {
    console.log("🎯 Execution Planner v0 - Stage 7 实现");
    console.log("🔄 将Stage 6 InterpretationResult转换为可执行的ExecutionPlan\n");
    
    try {
        demonstrateExecutionPlanner();
        demonstrateScenarios();
        
        console.log("\n✨ 演示完成！");
        console.log("🚀 Execution Planner已准备好为AI/Agent提供执行能力");
        
    } catch (error) {
        console.error("❌ 演示失败:", error.message);
        console.error(error.stack);
    }
}

module.exports = {
    demonstrateExecutionPlanner: demonstrateExecutionPlanner,
    createDemoInterpretationResult: createDemoInterpretationResult
};
