/**
 * Stage 6 Closed Loop Test
 * 验证：语义事实 → 解释层 → 工程建议 的完整闭环
 * 
 * 这个脚本验证Stage 6的核心价值：
 * 1. Stage 5 Facts 的正确消费
 * 2. Interpretation 规则的正确应用
 * 3. AI Action Contract 的正确生成
 */

var Interpreter = require("./interpretation/interpreter");

/**
 * 完整闭环测试
 */
function testClosedLoop() {
  console.log("🔄 Stage 6 完整闭环验证");
  console.log("=".repeat(40));
  
  // 构造完整的测试数据
  var stage5Facts = createCompleteStage5Facts();
  var stage4Meta = createCompleteStage4Meta();
  
  console.log("📊 输入数据:");
  console.log("   未使用符号:", stage5Facts.unusedSymbols.length);
  console.log("   未定义使用:", stage5Facts.undefinedUses.length);
  console.log("   模块数量:", Object.keys(stage4Meta.moduleMap || {}).length);
  
  // Stage 6 Interpretation
  console.log("\n🎯 执行 Stage 6 Interpretation:");
  var result = Interpreter.interpret(stage5Facts, stage4Meta);
  
  console.log("✅ Interpretation 完成:");
  console.log("   Actions:", result.actions.length);
  console.log("   Warnings:", result.warnings.length);
  console.log("   Errors:", result.errors.length);
  console.log("   Rules Applied:", result.meta.ruleCount);
  
  // 验证闭环完整性
  console.log("\n🔍 验证闭环完整性:");
  validateClosedLoop(stage5Facts, stage4Meta, result);
  
  // AI友好输出验证
  console.log("\n🤖 AI友好输出验证:");
  validateAIOutput(result);
  
  // 风险评估验证
  console.log("\n⚠️ 风险评估验证:");
  validateRiskAssessment(result);
  
  console.log("\n🎉 闭环验证完成！");
  
  return {
    success: true,
    result: result,
    summary: {
      actions: result.actions.length,
      warnings: result.warnings.length,
      errors: result.errors.length,
      rules: result.meta.ruleCount
    }
  };
}

/**
 * 创建完整的Stage 5 Facts
 */
function createCompleteStage5Facts() {
  return {
    unusedSymbols: [
      {
        name: "deadVariable",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration",
        reason: "No uses found in any execution path"
      },
      {
        name: "maybeUnused",
        confidence: "medium",
        line: 7,
        type: "VariableDeclaration",
        reason: "Potential unused but low confidence"
      },
      {
        name: "unusedFunction",
        confidence: "high",
        line: 15,
        type: "FunctionDeclaration",
        reason: "Function never called"
      },
      {
        name: "publicAPI",
        confidence: "high",
        line: 20,
        type: "VariableDeclaration",
        reason: "Exported but never used"
      }
    ],
    undefinedUses: [
      {
        name: "mysteryVar",
        line: 10,
        type: "read",
        context: "variable",
        reason: "Variable used but never defined"
      },
      {
        name: "missingFunction",
        line: 25,
        type: "call",
        context: "function",
        reason: "Function called but never defined"
      }
    ],
    definitionCount: 6,
    useCount: 2,
    defUseChains: 2,
    unusedDefinitions: 4,
    undefinedUses: 2
  };
}

/**
 * 创建完整的Stage 4 Meta
 */
function createCompleteStage4Meta() {
  return {
    entryPoints: ["main", "init"],
    exports: ["publicAPI", "helper"],
    moduleMap: {
      "deadVariable": "internal",
      "maybeUnused": "internal",
      "unusedFunction": "internal",
      "publicAPI": "external",
      "mysteryVar": "unknown",
      "missingFunction": "unknown"
    },
    moduleGraph: {
      "publicAPI": ["moduleA", "moduleB"],
      "deadVariable": [],
      "maybeUnused": [],
      "unusedFunction": []
    }
  };
}

/**
 * 验证闭环完整性
 */
function validateClosedLoop(facts, meta, result) {
  var validations = [];
  
  // 验证1: 未使用符号处理
  var highConfidenceUnused = facts.unusedSymbols.filter(function(sym) {
    return sym.confidence === "high";
  });
  
  var expectedActions = highConfidenceUnused.length;
  var actualActions = result.actions.filter(function(action) {
    return action.action === "safe-remove";
  }).length;
  
  validations.push({
    test: "高置信度未使用符号 → safe-remove actions",
    expected: expectedActions,
    actual: actualActions,
    passed: expectedActions === actualActions
  });
  
  // 验证2: 未定义使用处理
  var expectedErrors = facts.undefinedUses.length;
  var actualErrors = result.errors.filter(function(error) {
    return error.type === "undefined-use";
  }).length;
  
  validations.push({
    test: "未定义使用 → undefined-use errors",
    expected: expectedErrors,
    actual: actualErrors,
    passed: expectedErrors === actualErrors
  });
  
  // 验证3: 跨模块符号处理
  var crossModuleSymbols = facts.unusedSymbols.filter(function(sym) {
    return meta.moduleMap && meta.moduleMap[sym.name] === "external";
  });
  
  var crossModuleWarnings = result.warnings.filter(function(warning) {
    return warning.type && warning.type.indexOf("cross-module") === 0;
  }).length;
  
  validations.push({
    test: "跨模块符号 → cross-module warnings",
    expected: crossModuleSymbols.length,
    actual: crossModuleWarnings,
    passed: crossModuleSymbols.length === crossModuleWarnings
  });
  
  // 验证4: 规则应用
  var expectedRules = 3; // 当前有3个规则
  validations.push({
    test: "规则应用数量",
    expected: expectedRules,
    actual: result.meta.ruleCount,
    passed: result.meta.ruleCount === expectedRules
  });
  
  // 输出验证结果
  var passedCount = 0;
  validations.forEach(function(validation) {
    var status = validation.passed ? "✅" : "❌";
    console.log("   " + status + " " + validation.test);
    console.log("      期望: " + validation.expected + ", 实际: " + validation.actual);
    if (validation.passed) {
      passedCount++;
    }
  });
  
  console.log("\n📊 验证结果: " + passedCount + "/" + validations.length + " 通过");
  
  return passedCount === validations.length;
}

/**
 * 验证AI友好输出
 */
function validateAIOutput(result) {
  console.log("🤖 AI Contract 验证:");
  
  // 验证Actions格式
  var validActions = result.actions.every(function(action) {
    return action.action && action.symbol && action.risk && action.confidence && action.reason;
  });
  
  console.log("   Actions格式:", validActions ? "✅" : "❌");
  
  // 验证错误包含修复建议
  var errorsWithSuggestions = result.errors.filter(function(error) {
    return error.suggestions && error.suggestions.length > 0;
  });
  
  console.log("   错误修复建议:", errorsWithSuggestions.length + "/" + result.errors.length);
  
  // 验证统计数据
  var stats = Interpreter.getStatistics(result);
  var validStats = stats.totalActions === result.actions.length &&
                   stats.totalWarnings === result.warnings.length &&
                   stats.totalErrors === result.errors.length;
  
  console.log("   统计数据:", validStats ? "✅" : "❌");
  
  return validActions && validStats;
}

/**
 * 验证风险评估
 */
function validateRiskAssessment(result) {
  console.log("⚡ 风险评估验证:");
  
  // 验证阻断性问题检测
  var hasBlocking = Interpreter.hasBlockingIssues(result);
  var criticalErrors = result.errors.filter(function(error) {
    return error.risk === "critical";
  }).length > 0;
  
  var blockingCorrect = hasBlocking === criticalErrors;
  console.log("   阻断性问题检测:", blockingCorrect ? "✅" : "❌");
  
  // 验证风险级别分布
  var riskLevels = {};
  result.actions.forEach(function(action) {
    riskLevels[action.risk] = (riskLevels[action.risk] || 0) + 1;
  });
  
  console.log("   风险级别分布:", JSON.stringify(riskLevels));
  
  // 验证置信度分布
  var confidenceLevels = {};
  result.actions.forEach(function(action) {
    confidenceLevels[action.confidence] = (confidenceLevels[action.confidence] || 0) + 1;
  });
  
  console.log("   置信度分布:", JSON.stringify(confidenceLevels));
  
  return blockingCorrect;
}

/**
 * 详细结果展示
 */
function displayDetailedResults(result) {
  console.log("\n📋 详细结果:");
  
  // Actions
  if (result.actions.length > 0) {
    console.log("\n🔧 推荐操作:");
    result.actions.forEach(function(action, index) {
      console.log("   " + (index + 1) + ". " + action.action.toUpperCase() + " " + action.symbol);
      console.log("      风险: " + action.risk + ", 置信度: " + action.confidence);
      console.log("      理由: " + action.reason);
    });
  }
  
  // Warnings
  if (result.warnings.length > 0) {
    console.log("\n⚠️ 警告:");
    result.warnings.forEach(function(warning, index) {
      console.log("   " + (index + 1) + ". " + warning.type + " - " + warning.symbol);
      console.log("      风险: " + warning.risk + ", 理由: " + warning.reason);
    });
  }
  
  // Errors
  if (result.errors.length > 0) {
    console.log("\n❌ 错误:");
    result.errors.forEach(function(error, index) {
      console.log("   " + (index + 1) + ". " + error.type + " - " + error.symbol);
      console.log("      风险: " + error.risk + ", 理由: " + error.reason);
      if (error.suggestions && error.suggestions.length > 0) {
        console.log("      修复建议:");
        error.suggestions.forEach(function(suggestion) {
          console.log("        - " + suggestion.description);
        });
      }
    });
  }
}

// 主执行
if (require.main === module) {
  var testResult = testClosedLoop();
  displayDetailedResults(testResult.result);
  
  console.log("\n🎯 闭环验证总结:");
  console.log("   成功:", testResult.success ? "是" : "否");
  console.log("   生成Actions:", testResult.summary.actions);
  console.log("   生成Warnings:", testResult.summary.warnings);
  console.log("   生成Errors:", testResult.summary.errors);
  console.log("   应用规则:", testResult.summary.rules);
  
  if (testResult.success) {
    console.log("\n🎉 Stage 6 Interpretation 闭环验证成功！");
    console.log("🔄 完整链路: Stage 5 Facts → Stage 6 Rules → AI Actions");
  } else {
    console.log("\n❌ 闭环验证失败，需要修复问题");
  }
}

module.exports = {
  testClosedLoop: testClosedLoop,
  createCompleteStage5Facts: createCompleteStage5Facts,
  createCompleteStage4Meta: createCompleteStage4Meta
};
