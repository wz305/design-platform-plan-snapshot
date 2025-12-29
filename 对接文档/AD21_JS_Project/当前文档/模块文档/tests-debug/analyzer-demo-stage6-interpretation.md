模块定位

一句话：演示 Stage 6 Interpretation 的“语义事实→工程建议”闭环输出；不负责生成执行计划、不负责写入报告文件。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/demo-stage6-interpretation.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `demonstrateStage6` | Function | `()` | `void` | Node | 控制台输出 | 主演示：跑 `SemanticAnalyzer.analyzeProject` 后调用 `Interpreter.interpret` 并打印结果 |
| `demonstrateScenarios` | Function | `()` | `void` | Node | 控制台输出 | 补充场景演示（高置信度未使用/未定义使用/跨模块影响） |

最小使用示例：3~10 行，能跑

```js
// Node
const { demonstrateStage6 } = require("./analyzer/demo-stage6-interpretation");
demonstrateStage6();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/semantic-analyzer.js`：提供 `analyzeProject()` 以产生 Stage 5 Facts（线索：`SemanticAnalyzer.analyzeProject(demoFiles)`）。
- `analyzer/interpretation/interpreter.js`：Stage 6 解释器，生成 actions/warnings/errors（线索：`Interpreter.interpret(stage5Facts, stage4Meta)`）。
- `tests/test-files/*`：演示输入文件（线索：`demoFiles = ["tests/test-files/valid-iife-module.js", ...]`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 环境；无 `fs/path` 写文件行为。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把该脚本当作“规则/行动契约”的权威定义；真正的契约来自 `analyzer/interpretation/interpretation-types.js` 与 `Interpreter`（另有模块文档）。

运行行为

初始化时做什么

- `require()` 时仅定义函数；当 `require.main === module` 会自动执行 `demonstrateStage6()` 与 `demonstrateScenarios()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出分析摘要、actions/warnings/errors 及风险评估。

副作用：创建对象、修改全局、注册事件、写文件等

- 无写文件；但会读取演示文件并进行语义分析（取决于 `SemanticAnalyzer` 的内部行为）。

数据结构与约定

关键对象结构（字段表）

- `interpretationResult`（由 `Interpreter.interpret()` 返回）：
  - `actions[]` / `warnings[]` / `errors[]`
  - `meta.ruleCount`
  - 未确认：字段细节以 `analyzer/interpretation/interpretation-types.js` 为准。

关键常量/枚举

- 无。

错误码/异常策略

- 演示中遇到失败通常只 `console.log` 并 `return`（线索：`if (!analysisResult.success) { ... return; }`）。

与其他模块的协作

上游谁调用我

- 人工：`node analyzer/demo-stage6-interpretation.js`

我调用谁

- `SemanticAnalyzer.analyzeProject()` → `Interpreter.interpret()` → `Interpreter.getStatistics()` / `Interpreter.hasBlockingIssues()`。

调用链路图（文字即可）

- CLI → `demonstrateStage6()` → Stage1-5 分析（`SemanticAnalyzer`）→ Stage6 解释（`Interpreter`）→ 控制台输出建议与风险评估。

测试与验证

关联测试脚本（路径）

- `analyzer/demo-stage6-interpretation.js`（自身）
- 更严格闭环测试：`analyzer/test-stage6-closed-loop.js`（另有独立文档）

如何在 Node 跑

- `node analyzer/demo-stage6-interpretation.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无（仅控制台）。

已知问题与 TODO

已知坑点（必须可复现）

- 依赖 `tests/test-files/*` 路径存在；路径不对会导致分析失败（线索：`demoFiles`）。

TODO（按优先级）

- 增加可选 `--files` 参数，避免硬编码 `demoFiles`。
- 增加 JSON 输出选项，便于对接其它系统。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

