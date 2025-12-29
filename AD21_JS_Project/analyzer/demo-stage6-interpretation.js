/**
 * Stage 6 Interpretation Demo
 * 演示：语义分析 → 解释层 → 工程建议的完整闭环
 * 
 * 这个脚本展示了Stage 6的核心价值：
 * 1. Stage 5提供语义事实
 * 2. Stage 6基于事实生成工程建议
 * 3. AI可以消费这些建议进行自动化操作
 */

var SemanticAnalyzer = require("./semantic/semantic-analyzer");
var Interpreter = require("./interpretation/interpreter");

/**
 * 演示数据：包含典型代码问题的文件
 */
var demoFiles = [
  "tests/test-files/valid-iife-module.js",
  "tests/test-files/multiple-modules.js"
];

/**
 * 主演示函数
 */
function demonstrateStage6() {
  console.log("🚀 Stage 6 Interpretation 完整演示");
  console.log("=".repeat(50));
  
  // 第一步：执行完整的语义分析（Stage 1-5）
  console.log("📊 Step 1: 执行完整语义分析 (Stage 1-5)");
  var analysisResult = SemanticAnalyzer.analyzeProject(demoFiles);
  
  if (!analysisResult.success) {
    console.log("❌ 语义分析失败:", analysisResult.error);
    return;
  }
  
  console.log("✅ 语义分析完成");
  console.log("   分析文件数:", analysisResult.summary.totalFiles);
  console.log("   模块数量:", analysisResult.summary.modules);
  console.log("   函数数量:", analysisResult.summary.functions);
  
  // 第二步：提取Stage 5 Facts
  console.log("\n🧠 Step 2: 提取 Stage 5 Facts");
  var stage5Facts = analysisResult.stages && analysisResult.stages.stage5;
  var stage4Meta = analysisResult.stages && analysisResult.stages.stage4;
  
  if (!stage5Facts) {
    console.log("❌ Stage 5 Facts 不存在");
    return;
  }
  
  console.log("✅ Stage 5 Facts 提取完成");
  console.log("   定义点总数:", stage5Facts.definitionCount || 0);
  console.log("   使用点总数:", stage5Facts.useCount || 0);
  console.log("   未使用定义:", stage5Facts.unusedDefinitions || 0);
  console.log("   未定义使用:", stage5Facts.undefinedUses || 0);
  
  // 第三步：应用Stage 6 Interpretation
  console.log("\n🎯 Step 3: 应用 Stage 6 Interpretation");
  var interpretationResult = Interpreter.interpret(stage5Facts, stage4Meta);
  
  console.log("✅ Interpretation 完成");
  console.log("   应用规则数:", interpretationResult.meta.ruleCount);
  console.log("   生成动作数:", interpretationResult.actions.length);
  console.log("   生成警告数:", interpretationResult.warnings.length);
  console.log("   生成错误数:", interpretationResult.errors.length);
  
  // 第四步：展示详细结果
  console.log("\n📋 Step 4: 详细分析结果");
  displayDetailedResults(interpretationResult);
  
  // 第五步：统计分析
  console.log("\n📈 Step 5: 统计分析");
  var stats = Interpreter.getStatistics(interpretationResult);
  displayStatistics(stats);
  
  // 第六步：AI友好输出
  console.log("\n🤖 Step 6: AI友好输出");
  displayAIOutput(interpretationResult);
  
  // 第七步：风险评估
  console.log("\n⚠️ Step 7: 风险评估");
  var hasBlocking = Interpreter.hasBlockingIssues(interpretationResult);
  console.log("   阻断性问题:", hasBlocking ? "是" : "否");
  console.log("   建议操作:", hasBlocking ? "先修复阻断性问题" : "可以安全重构");
  
  console.log("\n🎉 Stage 6 演示完成！");
  console.log("🔄 完整闭环: 语义事实 → 智能解释 → 工程建议");
}

/**
 * 展示详细结果
 */
function displayDetailedResults(result) {
  // Actions (推荐操作)
  if (result.actions.length > 0) {
    console.log("\n🔧 推荐操作 (Actions):");
    result.actions.forEach(function(action, index) {
      console.log("   " + (index + 1) + ". " + action.action.toUpperCase() + " - " + action.symbol);
      console.log("      风险级别:", action.risk);
      console.log("      置信度:", action.confidence);
      console.log("      理由:", action.reason);
    });
  }
  
  // Warnings (警告)
  if (result.warnings.length > 0) {
    console.log("\n⚠️ 警告 (Warnings):");
    result.warnings.forEach(function(warning, index) {
      console.log("   " + (index + 1) + ". " + warning.type + " - " + warning.symbol);
      console.log("      风险级别:", warning.risk);
      console.log("      理由:", warning.reason);
    });
  }
  
  // Errors (错误)
  if (result.errors.length > 0) {
    console.log("\n❌ 错误 (Errors):");
    result.errors.forEach(function(error, index) {
      console.log("   " + (index + 1) + ". " + error.type + " - " + error.symbol);
      console.log("      位置:", error.location || "未知");
      console.log("      风险级别:", error.risk);
      console.log("      理由:", error.reason);
      
      if (error.suggestions && error.suggestions.length > 0) {
        console.log("      修复建议:");
        error.suggestions.forEach(function(suggestion) {
          console.log("        - " + suggestion.description);
        });
      }
    });
  }
}

/**
 * 展示统计分析
 */
function displayStatistics(stats) {
  console.log("📊 统计概览:");
  console.log("   总操作数:", stats.totalActions);
  console.log("   总警告数:", stats.totalWarnings);
  console.log("   总错误数:", stats.totalErrors);
  console.log("   关键问题:", stats.criticalIssues);
  console.log("   规则应用:", stats.ruleCount);
  console.log("   生成时间:", new Date(stats.generatedAt).toLocaleTimeString());
}

/**
 * 展示AI友好输出
 */
function displayAIOutput(result) {
  console.log("🤖 AI可消费的Action Contract:");
  
  var allActions = result.actions.map(function(action) {
    return {
      action: action.action,
      symbol: action.symbol,
      risk: action.risk,
      confidence: action.confidence,
      reason: action.reason,
      evidence: action.evidence
    };
  });
  
  if (allActions.length > 0) {
    console.log("   Actions JSON:");
    console.log("   " + JSON.stringify(allActions, null, 2));
  } else {
    console.log("   无可执行的AI操作");
  }
  
  // 展示错误修复建议
  var fixSuggestions = [];
  result.errors.forEach(function(error) {
    if (error.suggestions) {
      fixSuggestions = fixSuggestions.concat(error.suggestions);
    }
  });
  
  if (fixSuggestions.length > 0) {
    console.log("\n🔧 AI修复建议:");
    fixSuggestions.forEach(function(suggestion, index) {
      console.log("   " + (index + 1) + ". " + suggestion.action + ": " + suggestion.description);
    });
  }
}

/**
 * 演示特定场景
 */
function demonstrateScenarios() {
  console.log("\n🎬 场景演示");
  console.log("=".repeat(30));
  
  // 场景1：高置信度未使用符号
  console.log("\n📝 场景1: 高置信度未使用符号");
  var highConfidenceFacts = {
    unusedSymbols: [
      {
        name: "deadCode",
        confidence: "high",
        line: 5,
        type: "VariableDeclaration",
        reason: "No uses found in any execution path"
      }
    ],
    undefinedUses: []
  };
  
  var result1 = Interpreter.interpret(highConfidenceFacts, {});
  console.log("   结果:", result1.actions.length, "个safe-remove动作");
  
  // 场景2：未定义使用
  console.log("\n💥 场景2: 未定义使用");
  var undefinedUseFacts = {
    unusedSymbols: [],
    undefinedUses: [
      {
        name: "mysteryVar",
        line: 10,
        type: "read",
        context: "variable"
      }
    ]
  };
  
  var result2 = Interpreter.interpret(undefinedUseFacts, {});
  console.log("   结果:", result2.errors.length, "个critical错误");
  
  // 场景3：跨模块影响
  console.log("\n🌐 场景3: 跨模块符号");
  var crossModuleFacts = {
    unusedSymbols: [
      {
        name: "publicAPI",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      }
    ],
    undefinedUses: []
  };
  
  var crossModuleMeta = {
    moduleMap: {
      "publicAPI": "external"
    },
    exports: ["publicAPI"]
  };
  
  var result3 = Interpreter.interpret(crossModuleFacts, crossModuleMeta);
  console.log("   结果:", result3.warnings.length, "个跨模块警告");
}

// 主执行入口
if (require.main === module) {
  demonstrateStage6();
  demonstrateScenarios();
}

module.exports = {
  demonstrateStage6: demonstrateStage6,
  demonstrateScenarios: demonstrateScenarios
};
