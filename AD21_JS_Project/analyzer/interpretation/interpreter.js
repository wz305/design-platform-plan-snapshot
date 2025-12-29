/**
 * Interpreter
 * Stage 6 解释引擎主入口
 * 
 * 这是语义分析到工程建议的核心桥梁
 * interpret() 永远返回 InterpretationResult
 */

var RuleContext = require("./rule-context");
var types = require("./interpretation-types");

// 规则导入
var unusedRule = require("./rules/unused-symbol.rule");
var undefinedRule = require("./rules/undefined-use.rule");
var crossModuleRule = require("./rules/cross-module-impact.rule");

/**
 * 解释 Stage 5 Facts，生成工程建议
 * @param {Object} stage5Facts - Stage 5 输出的Facts
 * @param {Object} stage4Meta - Stage 4 的元数据（可选）
 * @returns {Object} InterpretationResult
 */
function interpret(stage5Facts, stage4Meta) {
  // 创建规则上下文
  var ctx = new RuleContext(stage5Facts, stage4Meta);
  
  // 初始化结果结构
  var result = {
    actions: [],
    warnings: [],
    errors: [],
    meta: {
      ruleCount: 0,
      generatedAt: Date.now()
    }
  };

  // 定义规则序列
  var rules = [
    unusedRule,
    undefinedRule,
    crossModuleRule
  ];

  // 依次应用所有规则
  for (var i = 0; i < rules.length; i++) {
    try {
      rules[i].apply(ctx, result);
      result.meta.ruleCount++;
    } catch (error) {
      // 规则执行错误不应该中断整个解释过程
      result.warnings.push({
        type: "rule-execution-error",
        ruleName: rules[i].name || "unknown",
        message: error.message,
        risk: "low"
      });
    }
  }

  return result;
}

/**
 * 获取规则统计信息
 * @param {Object} interpretationResult - 解释结果
 * @returns {Object} 统计信息
 */
function getStatistics(interpretationResult) {
  if (!interpretationResult) {
    return {
      totalActions: 0,
      totalWarnings: 0,
      totalErrors: 0,
      criticalIssues: 0
    };
  }

  var criticalIssues = 0;
  
  // 统计critical级别的错误
  for (var i = 0; i < interpretationResult.errors.length; i++) {
    if (interpretationResult.errors[i].risk === "critical") {
      criticalIssues++;
    }
  }

  return {
    totalActions: interpretationResult.actions.length,
    totalWarnings: interpretationResult.warnings.length,
    totalErrors: interpretationResult.errors.length,
    criticalIssues: criticalIssues,
    ruleCount: interpretationResult.meta.ruleCount,
    generatedAt: interpretationResult.meta.generatedAt
  };
}

/**
 * 检查是否有阻断性问题
 * @param {Object} interpretationResult - 解释结果
 * @returns {boolean} 是否有阻断性问题
 */
function hasBlockingIssues(interpretationResult) {
  if (!interpretationResult || !interpretationResult.errors) {
    return false;
  }

  for (var i = 0; i < interpretationResult.errors.length; i++) {
    var error = interpretationResult.errors[i];
    if (error.risk === "critical" || error.risk === "high") {
      return true;
    }
  }
  return false;
}

module.exports = {
  interpret: interpret,
  getStatistics: getStatistics,
  hasBlockingIssues: hasBlockingIssues
};
