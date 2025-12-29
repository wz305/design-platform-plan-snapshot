/**
 * RuleContext
 * 对 Stage 5 Facts 的"解释友好封装"
 * 
 * 这是扩展规则时最值钱的文件
 * 规则永远通过 context 取数据
 * 以后换 Facts 结构，也只改这里
 */

/**
 * RuleContext 构造函数
 * @param {Object} stage5Facts - Stage 5 输出的Facts
 * @param {Object} stage4Meta - Stage 4 的元数据（可选）
 */
function RuleContext(stage5Facts, stage4Meta) {
  this.facts = stage5Facts || {};
  this.meta = stage4Meta || {};
}

/**
 * 获取未使用的符号
 * @returns {Array} 未使用符号列表
 */
RuleContext.prototype.getUnusedSymbols = function () {
  return this.facts.unusedSymbols || [];
};

/**
 * 获取未定义的使用
 * @returns {Array} 未定义使用列表
 */
RuleContext.prototype.getUndefinedUses = function () {
  return this.facts.undefinedUses || [];
};

/**
 * 判断符号是否跨模块
 * @param {string} symbolName - 符号名
 * @returns {boolean} 是否跨模块
 */
RuleContext.prototype.isCrossModule = function (symbolName) {
  if (!this.meta || !this.meta.moduleMap) {
    return false;
  }
  return this.meta.moduleMap[symbolName] === "external";
};

/**
 * 获取符号的置信度
 * @param {string} symbolName - 符号名
 * @returns {string} 置信度 (high|medium|low)
 */
RuleContext.prototype.getSymbolConfidence = function (symbolName) {
  var unused = this.getUnusedSymbols();
  for (var i = 0; i < unused.length; i++) {
    if (unused[i].name === symbolName) {
      return unused[i].confidence || "low";
    }
  }
  return "low";
};

/**
 * 检查符号是否为入口函数
 * @param {string} symbolName - 符号名
 * @returns {boolean} 是否为入口函数
 */
RuleContext.prototype.isEntryFunction = function (symbolName) {
  if (!this.meta || !this.meta.entryPoints) {
    return false;
  }
  return this.meta.entryPoints.indexOf(symbolName) !== -1;
};

/**
 * 获取符号的使用次数
 * @param {string} symbolName - 符号名
 * @returns {number} 使用次数
 */
RuleContext.prototype.getUseCount = function (symbolName) {
  if (!this.facts.defUseAnalysis) {
    return 0;
  }
  
  // 遍历Def-Use分析结果查找符号使用次数
  var analysis = this.facts.defUseAnalysis;
  for (var i = 0; i < analysis.length; i++) {
    var symbolInfo = analysis[i];
    if (symbolInfo.symbol === symbolName && symbolInfo.uses) {
      return symbolInfo.uses.length;
    }
  }
  return 0;
};

module.exports = RuleContext;
