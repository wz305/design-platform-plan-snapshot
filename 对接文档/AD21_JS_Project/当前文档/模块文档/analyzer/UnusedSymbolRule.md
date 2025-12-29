模块定位

一句话：Stage 6 规则（#1），负责把 Stage 5 的“未使用符号”facts 转为删除建议（actions）或告警（warnings），不负责真正修改代码。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/rules/unused-symbol.rule.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
apply	Function	ctx:RuleContext, result:InterpretationResult	void	Node	写 result.actions/warnings	按 confidence/entryPoint/useCount 产出建议
name	String	-	string	Node	无	固定为 `unused-symbol.rule`
description	String	-	string	Node	无	规则说明
version	String	-	string	Node	无	规则版本

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Rule = require("./analyzer/interpretation/rules/unused-symbol.rule");
Rule.apply({ getUnusedSymbols: function(){ return [{ name: "x", confidence: "high" }]; }, isEntryFunction: function(){return false;}, getUseCount: function(){return 0;} }, { actions: [], warnings: [] });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- （隐式）AD21_JS_Project/analyzer/interpretation/rule-context.js：期望 ctx 提供 `getUnusedSymbols/isEntryFunction/getUseCount`
- Stage 6 结果结构：期望 result 具备 `actions[]` / `warnings[]`

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无（纯内存规则）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（Node exports）。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；不输出 UI；只向 result 数组 push。

副作用：创建对象、修改全局、注册事件、写文件等

- `result.actions.push(...)`：当 `confidence === "high" && !isEntry` → `safe-remove`
- `result.warnings.push(...)`：medium/low/entryPoint 场景产生不同 warning.type（关键词：`unused-entry-point` / `unused-symbol-medium` / `unused-symbol-low`）

数据结构与约定

关键对象结构（字段表）

- 输入：`ctx.getUnusedSymbols()` 返回 `[{name, confidence?, line?, type?}, ...]`
- 输出：Action（`action: "safe-remove"`）或 Warning（`type: ...`）

关键常量/枚举

- `confidence`：`high|medium|low`
- `risk`：`low|medium`（此规则不产出 high/critical）

错误码/异常策略

- 本规则不捕获异常；由上游 `Interpreter` 捕获并转为 `rule-execution-error` warning。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/interpretation/interpreter.js：rules 序列第 1 个

我调用谁

- `ctx.isEntryFunction(symbolName)` / `ctx.getUseCount(symbolName)`

调用链路图（文字即可）

- Stage5 Facts → RuleContext → UnusedSymbolRule.apply → InterpretationResult.actions/warnings

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js（用例：`testUnusedSymbolRule`）

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- 入口函数（meta.entryPoints 命中）即使 high confidence 也不会产生 `safe-remove`，而是 warning（关键词：`unused-entry-point`）。

TODO（按优先级）

- 未确认：把 `useCount` 融入风险/建议（当前仅计算但不作为决策门槛；关键词：`var useCount = ctx.getUseCount`）。

变更记录

- 2025-12-17 语义系统1.0

