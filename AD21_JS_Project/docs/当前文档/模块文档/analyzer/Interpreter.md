模块定位

一句话：Stage 6 解释引擎主入口，负责把 Stage 5 Facts（+可选 Stage 4 元数据）转换为 InterpretationResult，不负责生成可执行改动计划（由 Execution/ActionPlanner 负责）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/interpreter.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
interpret	Function	stage5Facts:Object, stage4Meta?:Object	InterpretationResult	Node	无（仅内存计算）	依次应用规则：unused/undefined/cross-module
getStatistics	Function	interpretationResult:Object	stats:Object	Node	无	统计 actions/warnings/errors/criticalIssues/ruleCount
hasBlockingIssues	Function	interpretationResult:Object	boolean	Node	无	检查 errors[].risk 是否为 critical/high

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Interpreter = require("./analyzer/interpretation/interpreter");
var result = Interpreter.interpret({ unusedSymbols: [], undefinedUses: [] }, { entryPoints: [] });
console.log(result.actions.length, result.errors.length);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/interpretation/rule-context.js：为规则提供统一的数据读取入口（ctx）
- AD21_JS_Project/analyzer/interpretation/interpretation-types.js：Stage6 核心数据结构定义（导入但当前文件未直接使用；关键词：`types`）
- AD21_JS_Project/analyzer/interpretation/rules/unused-symbol.rule.js：未使用符号规则
- AD21_JS_Project/analyzer/interpretation/rules/undefined-use.rule.js：未定义使用规则
- AD21_JS_Project/analyzer/interpretation/rules/cross-module-impact.rule.js：跨模块影响规则

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无（纯内存解释）；输入数据结构来自 Stage 5 输出（关键词：`unusedSymbols` / `undefinedUses` / `defUseAnalysis`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（依赖 Node `require`）。

运行行为

初始化时做什么

- 加载规则模块并构建 rules 列表（关键词：`var rules = [...]`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；不直接输出 UI；仅返回结果对象。

副作用：创建对象、修改全局、注册事件、写文件等

- 无显式副作用；规则执行异常会被捕获并写入 `result.warnings[]`（关键词：`rule-execution-error`）。

数据结构与约定

关键对象结构（字段表）

- `stage5Facts.unusedSymbols[]`：至少包含 `name`/`confidence`（参见 `analyzer/interpretation/__tests__/interpretation-basic.test.js`）
- `stage5Facts.undefinedUses[]`：至少包含 `name`/`line`/`type`/`context`
- `stage4Meta.entryPoints[]`：入口函数名列表（避免误删 DFM 入口）
- `stage4Meta.exports[]`、`stage4Meta.moduleMap`、`stage4Meta.moduleGraph`：供跨模块规则评估（未提供则降级）

关键常量/枚举

- 风险枚举：字符串 `"low"|"medium"|"high"|"critical"`（由规则产出）

错误码/异常策略

- `interpret()` 内部规则异常：不抛出，转为 warning（低风险）并继续执行下一条规则。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic-workflow.js：`generate-plan` 命令调用 Stage 6（关键词：`Interpreter`）
- AD21_JS_Project/analyzer/demo-stage6-interpretation.js：演示脚本（Stage6）
- AD21_JS_Project/analyzer/demo-full-build-check.js：全链路演示（Stage1-7）

我调用谁

- `RuleContext`（构建 ctx）
- 三个规则模块的 `apply(ctx, result)`

调用链路图（文字即可）

- Stage5 Facts → `Interpreter.interpret` → (RuleContext) → rules.apply → InterpretationResult → (交给 ActionPlanner 生成 ExecutionPlan)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js
- AD21_JS_Project/analyzer/test-stage6-closed-loop.js（闭环脚本，偏集成）

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供（本模块依赖 Node `require`，不应在 AD 内运行）。

产出报告在哪里（reports/logs）

- 本模块不直接产出报告；上游脚本可能写入 `analyzer/reports/*`。

已知问题与 TODO

已知坑点（必须可复现）

- `interpretation-types.js` 当前被 require 但未在本文件直接使用（关键词：`var types = require("./interpretation-types");`）。

TODO（按优先级）

- 未确认：将 `InterpretationResult`/`ActionContract` 真正用于返回结构校验（路径：`analyzer/interpretation/interpreter.js`，关键词：`types`）。

变更记录

- 2025-12-17 语义系统1.0

