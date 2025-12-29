/**
 * Unused Symbol Rule
 * 定海神针规则 #1: 未使用符号处理
 * 
 * 规则逻辑：
 * - 高置信度未使用符号 → safe-remove 建议
 * - 中等置信度未使用符号 → 警告
 * - 入口函数即使未使用也不建议删除
 */

/**
 * 应用未使用符号规则
 * @param {RuleContext} ctx - 规则上下文
 * @param {InterpretationResult} result - 解释结果
 */
exports.apply = function (ctx, result) {
  var unused = ctx.getUnusedSymbols();

  for (var i = 0; i < unused.length; i++) {
    var sym = unused[i];
    var symbolName = sym.name;
    var confidence = sym.confidence || "low";
    
    // 检查是否为入口函数
    var isEntry = ctx.isEntryFunction(symbolName);
    
    // 检查使用次数
    var useCount = ctx.getUseCount(symbolName);
    
    if (confidence === "high" && !isEntry) {
      // 高置信度且非入口函数 → 安全删除建议
      result.actions.push({
        action: "safe-remove",
        symbol: symbolName,
        risk: "low",
        confidence: "high",
        reason: "Symbol defined but never used with high confidence, safe to remove",
        evidence: [sym]
      });
    } else if (confidence === "medium" && !isEntry) {
      // 中等置信度 → 警告
      result.warnings.push({
        type: "unused-symbol-medium",
        symbol: symbolName,
        risk: "medium",
        reason: "Symbol appears to be unused but confidence is medium, please verify before removal",
        evidence: [sym]
      });
    } else if (isEntry) {
      // 入口函数 → 特殊处理
      result.warnings.push({
        type: "unused-entry-point",
        symbol: symbolName,
        risk: "low",
        reason: "Entry point function appears unused, but may be called externally (e.g., DFM functions)",
        evidence: [sym]
      });
    } else if (confidence === "low") {
      // 低置信度 → 仅记录
      result.warnings.push({
        type: "unused-symbol-low",
        symbol: symbolName,
        risk: "low",
        reason: "Symbol may be unused but confidence is low, requires manual investigation",
        evidence: [sym]
      });
    }
  }
};

// 规则元信息
exports.name = "unused-symbol.rule";
exports.description = "Handles unused symbols with confidence-based recommendations";
exports.version = "1.0.0";
