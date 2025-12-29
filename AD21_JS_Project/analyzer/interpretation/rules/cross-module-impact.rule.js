/**
 * Cross Module Impact Rule
 * 定海神针规则 #3: 跨模块影响处理
 * 
 * 规则逻辑：
 * - 跨模块未使用符号 → medium 级别警告
 * - 考虑模块依赖关系
 * - 评估重构风险
 */

/**
 * 应用跨模块影响规则
 * @param {RuleContext} ctx - 规则上下文
 * @param {InterpretationResult} result - 解释结果
 */
exports.apply = function (ctx, result) {
  var unused = ctx.getUnusedSymbols();

  for (var i = 0; i < unused.length; i++) {
    var sym = unused[i];
    var symbolName = sym.name;
    
    // 检查是否跨模块
    if (ctx.isCrossModule(symbolName)) {
      // 跨模块符号需要特别小心
      var confidence = sym.confidence || "low";
      
      // 分析模块影响
      var impact = analyzeCrossModuleImpact(ctx, symbolName);
      
      if (impact.isExported) {
        // 导出的符号影响更大
        result.warnings.push({
          type: "cross-module-exported-unused",
          symbol: symbolName,
          risk: "medium",
          reason: "Exported symbol appears unused but may be used by other modules",
          evidence: [sym],
          impact: impact,
          suggestions: generateCrossModuleSuggestions(impact, true)
        });
      } else {
        // 非导出但跨模块引用的符号
        result.warnings.push({
          type: "cross-module-unused",
          symbol: symbolName,
          risk: "medium",
          reason: "Symbol may be referenced across module boundary, verify before removal",
          evidence: [sym],
          impact: impact,
          suggestions: generateCrossModuleSuggestions(impact, false)
        });
      }
    }
  }
};

/**
 * 分析跨模块影响
 * @param {RuleContext} ctx - 规则上下文
 * @param {string} symbolName - 符号名
 * @returns {Object} 影响分析结果
 */
function analyzeCrossModuleImpact(ctx, symbolName) {
  var impact = {
    symbol: symbolName,
    isExported: false,
    dependentModules: [],
    useCount: 0,
    risk: "medium"
  };
  
  // 检查使用次数
  impact.useCount = ctx.getUseCount(symbolName);
  
  // 检查是否为导出符号（基于元数据推断）
  if (ctx.meta.exports && ctx.meta.exports.indexOf(symbolName) !== -1) {
    impact.isExported = true;
    impact.risk = "high";
  }
  
  // 检查依赖模块（如果有模块图信息）
  if (ctx.meta.moduleGraph) {
    var graph = ctx.meta.moduleGraph;
    if (graph[symbolName]) {
      impact.dependentModules = graph[symbolName];
      if (impact.dependentModules.length > 0) {
        impact.risk = "high";
      }
    }
  }
  
  return impact;
}

/**
 * 生成跨模块修复建议
 * @param {Object} impact - 影响分析结果
 * @param {boolean} isExported - 是否为导出符号
 * @returns {Array} 修复建议列表
 */
function generateCrossModuleSuggestions(impact, isExported) {
  var suggestions = [];
  var symbolName = impact.symbol;
  
  if (isExported) {
    // 导出符号的特殊处理
    suggestions.push({
      action: "verify-external-usage",
      description: "Check if '" + symbolName + "' is used by external modules or runtime",
      priority: "high"
    });
    
    suggestions.push({
      action: "check-dynamic-imports",
      description: "Verify if '" + symbolName + "' is accessed via dynamic imports or reflection",
      priority: "medium"
    });
    
    if (impact.dependentModules.length > 0) {
      suggestions.push({
        action: "update-dependent-modules",
        description: "Update " + impact.dependentModules.length + " dependent modules before removal",
        priority: "high"
      });
    }
  } else {
    // 非导出符号的处理
    suggestions.push({
      action: "module-boundary-check",
      description: "Verify '" + symbolName + "' is not accessed across module boundaries",
      priority: "medium"
    });
    
    if (impact.dependentModules.length > 0) {
      suggestions.push({
        action: "refactor-module-dependencies",
        description: "Refactor dependencies in modules: " + impact.dependentModules.join(", "),
        priority: "medium"
      });
    }
  }
  
  // 通用建议
  suggestions.push({
    action: "incremental-removal",
    description: "Consider commenting out '" + symbolName + "' first to test impact",
    priority: "low"
  });
  
  return suggestions;
}

// 规则元信息
exports.name = "cross-module-impact.rule";
exports.description = "Handles cross-module symbol impact with risk assessment";
exports.version = "1.0.0";
