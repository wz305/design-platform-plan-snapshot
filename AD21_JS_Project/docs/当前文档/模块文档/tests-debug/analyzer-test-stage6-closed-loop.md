模块定位

一句话：构造 Stage 5/Stage 4 的模拟输入，验证 `Interpreter.interpret()` 的闭环输出（Actions/Warnings/Errors）是否符合预期；不负责运行真实项目分析、不写报告文件。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/test-stage6-closed-loop.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `testClosedLoop` | Function | `()` | `{ success, result, summary }` | Node | 控制台输出 | 主测试：构造 facts/meta 并调用 `Interpreter.interpret()` |
| `createCompleteStage5Facts` | Function | `()` | `Stage5Facts` | Node | 无 | 返回包含 `unusedSymbols/undefinedUses/...` 的模拟数据 |
| `createCompleteStage4Meta` | Function | `()` | `Stage4Meta` | Node | 无 | 返回 `moduleMap/exports/...` 的模拟元信息 |

最小使用示例：3~10 行，能跑

```js
// Node
const { testClosedLoop } = require("./analyzer/test-stage6-closed-loop");
const out = testClosedLoop();
console.log(out.summary);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/interpretation/interpreter.js`：被测核心（`Interpreter.interpret`、`getStatistics`、`hasBlockingIssues` 等在内部调用）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无写文件；仅控制台输出。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要将此脚本当作真实项目分析入口；它只用模拟数据测试 Stage 6 解释器逻辑。

运行行为

初始化时做什么

- `require()` 时仅定义函数与导出；当 `require.main === module` 会执行 `testClosedLoop()` 并打印详细结果。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出输入统计、interpretation 结果、AI 友好输出验证与风险评估。

副作用：创建对象、修改全局、注册事件、写文件等

- 无。

数据结构与约定

关键对象结构（字段表）

- `Stage5Facts`（模拟）：
  - `unusedSymbols[]`：含 `name/confidence/line/type/reason`
  - `undefinedUses[]`：含 `name/line/type/context/reason`
  - 其它统计字段：`definitionCount/useCount/defUseChains/unusedDefinitions/undefinedUses`（注意：脚本内同名字段既可能是 number 也可能被误用为 array，需运行确认）。
  - 未确认：字段一致性以 `Interpreter` 实际消费逻辑为准（线索：`analyzer/interpretation/interpreter.js` 关键词：`unusedSymbols` / `undefinedUses`）。
- `Stage4Meta`（模拟）：
  - `moduleMap`、`exports` 等。

关键常量/枚举

- 无。

错误码/异常策略

- 主要通过 `console.log` 输出验证结果；未见显式 `process.exit`。

与其他模块的协作

上游谁调用我

- 人工/CI：快速回归 Stage 6 解释器逻辑。

我调用谁

- `Interpreter.interpret()`（直接）。

调用链路图（文字即可）

- CLI → 构造模拟 Stage5/Stage4 → `Interpreter.interpret()` → 控制台输出 actions/warnings/errors → 验证 AI 输出与风险评估。

测试与验证

关联测试脚本（路径）

- `analyzer/test-stage6-closed-loop.js`（自身）

如何在 Node 跑

- `node analyzer/test-stage6-closed-loop.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无（仅控制台）。

已知问题与 TODO

已知坑点（必须可复现）

- `Stage5Facts.undefinedUses` 在脚本中既作为数组字段出现，也可能作为数字统计字段出现（线索：`createCompleteStage5Facts()` 内部字段）；需运行确认 Interpreter 的容错策略。

TODO（按优先级）

- 统一模拟数据 schema（避免字段重名/类型不一致）。
- 将期望结果断言化（当前主要靠人工读控制台输出）。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

