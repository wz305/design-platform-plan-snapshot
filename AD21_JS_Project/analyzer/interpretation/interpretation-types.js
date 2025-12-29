/**
 * Interpretation Types
 * Stage 6 的核心数据结构定义
 * 
 * 这是 Stage 6 的"宪法"，保持极度克制
 */

/**
 * InterpretationResult
 * Stage 6 的唯一正式输出
 */
var InterpretationResult = {
  actions: [],     // 推荐动作（给 AI / 人 / 工具）
  warnings: [],    // 软性提醒
  errors: [],      // 硬性阻断
  meta: {
    ruleCount: 0,
    generatedAt: 0
  }
};

/**
 * ActionContract（最小版）
 */
var ActionContract = {
  action: "",          // e.g. "safe-remove"
  symbol: "",          // 符号名
  risk: "none",        // none | low | medium | high | critical
  confidence: "low",   // high | medium | low
  reason: "",          // 人类 & AI 都能读懂
  evidence: []         // Facts 片段（可追溯）
};

module.exports = {
  InterpretationResult: InterpretationResult,
  ActionContract: ActionContract
};
