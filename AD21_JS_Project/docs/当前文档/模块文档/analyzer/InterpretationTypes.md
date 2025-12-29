模块定位

一句话：Stage 6 数据结构定义文件，负责给解释引擎/规则提供最小“输出契约”（InterpretationResult 与 ActionContract 形状），不负责校验或生成具体内容。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/interpretation-types.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
InterpretationResult	Object	-	-	Node	无	Stage 6 的“唯一正式输出”模板（包含 actions/warnings/errors/meta）
ActionContract	Object	-	-	Node	无	推荐动作最小结构：action/symbol/risk/confidence/reason/evidence

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Types = require("./analyzer/interpretation/interpretation-types");
console.log(Types.ActionContract.risk, Types.InterpretationResult.meta.ruleCount);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（Node 模块导出）。

运行行为

初始化时做什么

- 仅定义对象字面量并导出。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无。

副作用：创建对象、修改全局、注册事件、写文件等

- 无。

数据结构与约定

关键对象结构（字段表）

- `InterpretationResult.actions[]`：ActionContract 数组
- `InterpretationResult.warnings[]`：规则告警数组（结构由规则定义）
- `InterpretationResult.errors[]`：规则错误数组（结构由规则定义）
- `InterpretationResult.meta.ruleCount`：规则应用计数
- `InterpretationResult.meta.generatedAt`：生成时间戳（毫秒）

关键常量/枚举

- `risk`：`none|low|medium|high|critical`
- `confidence`：`high|medium|low`

错误码/异常策略

- 无（纯类型定义）。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/interpretation/interpreter.js：导入 types（当前未直接使用；关键词：`var types = ...`）

我调用谁

- 无。

调用链路图（文字即可）

- (规则/解释器) → 参考 InterpretationTypes 结构 → 输出 InterpretationResult

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js（测试结果结构）

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- 仅提供“模板/契约”，并未被解释器强制校验（定位：`analyzer/interpretation/interpreter.js`，关键词：`types`）。

TODO（按优先级）

- 为 Interpreter 增加输出结构校验/默认值填充，避免 rules 写出非契约字段（未确认）。

变更记录

- 2025-12-17 语义系统1.0

