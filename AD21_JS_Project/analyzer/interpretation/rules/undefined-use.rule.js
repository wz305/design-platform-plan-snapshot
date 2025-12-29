/**
 * Undefined Use Rule
 * 定海神针规则 #2: 未定义使用处理
 * 
 * 规则逻辑：
 * - 所有未定义使用 → critical 级别错误
 * - 提供符号名和位置信息
 * - 给出修复建议
 */

/**
 * 应用未定义使用规则
 * @param {RuleContext} ctx - 规则上下文
 * @param {InterpretationResult} result - 解释结果
 */
exports.apply = function (ctx, result) {
  var undef = ctx.getUndefinedUses();

  for (var i = 0; i < undef.length; i++) {
    var usage = undef[i];
    var symbolName = usage.name;
    var location = usage.line ? "line " + usage.line : "unknown location";
    
    // 根据使用类型判断严重程度
    var risk = "critical";
    var reason = "Symbol used but never defined";
    
    // 特殊处理：如果是属性访问，可能是对象属性未定义
    if (usage.type === "property" || usage.context === "property") {
      risk = "high";
      reason = "Property accessed but never defined (may be dynamic property)";
    }
    
    // 特殊处理：如果是函数调用，更严重
    if (usage.type === "call" || usage.context === "call") {
      risk = "critical";
      reason = "Function called but never defined";
    }
    
    // 生成错误报告
    result.errors.push({
      type: "undefined-use",
      symbol: symbolName,
      location: location,
      risk: risk,
      reason: reason,
      evidence: [usage],
      suggestions: generateFixSuggestions(usage)
    });
  }
};

/**
 * 生成修复建议
 * @param {Object} usage - 使用信息
 * @returns {Array} 修复建议列表
 */
function generateFixSuggestions(usage) {
  var suggestions = [];
  var symbolName = usage.name;
  
  // 基本建议：定义符号
  suggestions.push({
    action: "define-symbol",
    description: "Define the symbol '" + symbolName + "' before using it",
    priority: "high"
  });
  
  // 如果是函数调用，建议导入或定义函数
  if (usage.type === "call" || usage.context === "call") {
    suggestions.push({
      action: "import-function",
      description: "Import function '" + symbolName + "' from another module",
      priority: "high"
    });
  }
  
  // 如果是变量使用，建议检查拼写
  if (usage.type === "read" || usage.type === "write") {
    suggestions.push({
      action: "check-spelling",
      description: "Check if '" + symbolName + "' is a typo for an existing variable",
      priority: "medium"
    });
  }
  
  // 如果是属性访问，建议检查对象结构
  if (usage.type === "property" || usage.context === "property") {
    suggestions.push({
      action: "check-object-structure",
      description: "Verify the object has property '" + symbolName + "' or initialize it",
      priority: "medium"
    });
  }
  
  return suggestions;
}

// 规则元信息
exports.name = "undefined-use.rule";
exports.description = "Handles undefined symbol uses with critical error reporting";
exports.version = "1.0.0";
