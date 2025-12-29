模块定位

一句话：Stage 6 规则（#3），负责对“跨模块的未使用符号”做更保守的风险提示（warnings），不负责识别跨模块依赖的事实来源（依赖 Stage4 meta 或更上游阶段）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/rules/cross-module-impact.rule.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
apply	Function	ctx:RuleContext, result:InterpretationResult	void	Node	写 result.warnings	对 ctx.isCrossModule(symbol) 的未使用符号生成 warning + suggestions
name	String	-	string	Node	无	固定为 `cross-module-impact.rule`
description	String	-	string	Node	无	规则说明
version	String	-	string	Node	无	规则版本

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Rule = require("./analyzer/interpretation/rules/cross-module-impact.rule");
Rule.apply({ getUnusedSymbols: function(){ return [{ name: "x", confidence: "high" }]; }, isCrossModule: function(){return true;}, getUseCount: function(){return 0;}, meta: {} }, { warnings: [] });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- （隐式）RuleContext：期望 ctx 提供 `getUnusedSymbols/isCrossModule/getUseCount`，并暴露 `ctx.meta`
- Stage4 meta（可选）：`meta.exports`、`meta.moduleGraph`（用于 impact 分析；未提供则降级）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无（纯内存规则）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；只写 `result.warnings[]`。

副作用：创建对象、修改全局、注册事件、写文件等

- 当 `ctx.isCrossModule(symbolName)` 为 true：
  - 如果 `ctx.meta.exports` 包含该符号 → `type: cross-module-exported-unused`（risk: medium，impact.risk 可能为 high）
  - 否则 → `type: cross-module-unused`

数据结构与约定

关键对象结构（字段表）

- 输入：`unusedSymbols[]` 元素 `{name, confidence?}`
- 输入：`ctx.meta.exports?: string[]`
- 输入：`ctx.meta.moduleGraph?: { [symbolName]: string[] }`
- 输出 warning：包含 `{type, symbol, risk, reason, evidence, impact, suggestions}`

关键常量/枚举

- `risk`：本规则固定输出 `medium`（warning），impact 内部可能标 `high`

错误码/异常策略

- 本规则不捕获异常；由 Interpreter 捕获。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/interpretation/interpreter.js：rules 序列第 3 个

我调用谁

- `ctx.isCrossModule`、`ctx.getUseCount`

调用链路图（文字即可）

- Stage5 unusedSymbols + Stage4 meta → CrossModuleImpactRule.apply → warnings(+impact/suggestions)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js（用例：`testCrossModuleRule`）

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- “跨模块”判定完全依赖 `ctx.isCrossModule`（即 meta.moduleMap），若 Stage4 meta 缺失会导致此规则不触发（定位：`analyzer/interpretation/rule-context.js`，关键词：`moduleMap`）。

TODO（按优先级）

- 未确认：Stage 4 是否能提供更结构化的模块依赖图（moduleGraph），用于生成可定位的 dependentModules 列表。

变更记录

- 2025-12-17 语义系统1.0

