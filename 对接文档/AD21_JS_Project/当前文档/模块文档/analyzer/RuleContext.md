模块定位

一句话：Stage 6 规则上下文适配层，负责把 Stage 5 Facts（+可选 Stage 4 元数据）封装成规则友好的查询接口，不负责执行规则或生成计划。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/rule-context.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
RuleContext	Constructor	stage5Facts?:Object, stage4Meta?:Object	ctx:Object	Node	无	规则层只应通过 ctx 读取数据
RuleContext.prototype.getUnusedSymbols	Function	-	Array	Node	无	读取 `facts.unusedSymbols`
RuleContext.prototype.getUndefinedUses	Function	-	Array	Node	无	读取 `facts.undefinedUses`
RuleContext.prototype.isCrossModule	Function	symbolName:string	boolean	Node	无	读取 `meta.moduleMap[symbolName] === \"external\"`
RuleContext.prototype.getSymbolConfidence	Function	symbolName:string	\"high\"|\"medium\"|\"low\"	Node	无	从 `unusedSymbols[]` 查 confidence（默认 low）
RuleContext.prototype.isEntryFunction	Function	symbolName:string	boolean	Node	无	读取 `meta.entryPoints[]`
RuleContext.prototype.getUseCount	Function	symbolName:string	number	Node	无	从 `facts.defUseAnalysis[]` 查 uses.length（默认 0）

最小使用示例：3~10 行，能跑

```js
// Node 环境
var RuleContext = require("./analyzer/interpretation/rule-context");
var ctx = new RuleContext({ unusedSymbols: [{ name: "x", confidence: "high" }] }, { entryPoints: [] });
console.log(ctx.getSymbolConfidence("x"), ctx.isEntryFunction("x"));
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无（纯数据封装）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 输入结构约定来自 Stage 5/Stage 4 输出（线索：`analyzer/interpretation/__tests__/interpretation-basic.test.js`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（依赖 Node `module.exports`）。

运行行为

初始化时做什么

- 构造函数把输入保存到 `this.facts` / `this.meta`（默认 `{}`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无输出。

副作用：创建对象、修改全局、注册事件、写文件等

- 无。

数据结构与约定

关键对象结构（字段表）

- `facts.unusedSymbols[]`：元素至少包含 `{ name, confidence? }`
- `facts.undefinedUses[]`：元素至少包含 `{ name, line?, type?, context? }`
- `facts.defUseAnalysis[]`：元素包含 `{ symbol, uses?:Array }`（当前只读取 `uses.length`）
- `meta.entryPoints[]`：入口符号名数组
- `meta.moduleMap`：符号名到 `"external"|"internal"` 的映射（未确认：是否只有这两种值；关键词：`moduleMap[symbolName]`)

关键常量/枚举

- `confidence`：字符串 `"high"|"medium"|"low"`（默认 `"low"`）。

错误码/异常策略

- 不抛异常；缺少字段时返回默认值（空数组/false/0/low）。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/interpretation/interpreter.js：创建 ctx 并传入规则
- 规则模块：`analyzer/interpretation/rules/*.rule.js`（通过 ctx 取数据）

我调用谁

- 无。

调用链路图（文字即可）

- Stage5 Facts + Stage4 Meta → new RuleContext → rules.apply(ctx, result)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供（Node 模块）。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- `getSymbolConfidence()` 只在 `unusedSymbols[]` 里找 confidence；如果符号只出现在其他 facts 中会返回 low（关键词：`getUnusedSymbols`）。

TODO（按优先级）

- 未确认：为 rules 增加更多查询接口（比如定位 file/line、模块依赖等），集中在 RuleContext 维护（文件：`analyzer/interpretation/rule-context.js`）。

变更记录

- 2025-12-17 语义系统1.0

