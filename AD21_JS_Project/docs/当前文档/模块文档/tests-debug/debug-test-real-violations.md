模块定位

一句话：提供一段“包含典型 AD API 违规用法”的可执行代码，用于 Jalangi2 规则/追踪器验证；不负责测试 runner 本身与报告聚合。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/test-real-violations.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| `TestRealViolations_Click` | function | `(Sender)` | `void` | Node | `console.log`；调用 `PCBServer()` 并制造多类违规 | 通过 `module.exports = { TestRealViolations_Click }` 导出（关键词：`module.exports`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node -e "const t=require('./debug/test-real-violations'); t.TestRealViolations_Click(null)"
node .\\debug\\cli\\test-real-violations.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/runtime/ad-mock.js`：提供 `PCBServer()`（本文件通过 `require('./runtime/ad-mock.js')` 加载）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：通过 `require` 加载 mock。
- 控制台：输出每个违规测试点的执行结果。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在生产代码中引用：该文件故意包含违规用法（例如传错参数、写错属性类型、删除必需字段等）。

运行行为

初始化时做什么

- 加载时 `require('./runtime/ad-mock.js')`，从而触发 mock 的自动初始化（副作用：见 `ad-mock.js` 的 `initializeADMock();`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 写 `console.log`；不直接写文件。

副作用：创建对象、修改全局、注册事件、写文件等

- 通过 `PCBServer().PCBObjectFactory(...)` 创建 mock 对象，并调用 `board.AddPCBObject(...)`，触发 mock 侧的违规检测输出（线索：`ad-mock.js` 关键词 `检测到违规`）。

数据结构与约定

关键对象结构（字段表）

- 未定义新的数据结构；主要使用 `PCBServer()` 返回对象与 mock PCB 对象属性（如 `X/Y/Width/I_ObjectAddress`）。

关键常量/枚举

- 使用字面量 `1/2/3/999` 作为对象类型（线索：`PCBObjectFactory(999, 0, 0)`），对应 mock 常量 `eTrackObject/ePadObject/eViaObject` 等（未确认：数值映射是否与 AD 一致）。

错误码/异常策略

- 以 `try/catch + console.log` 为主；错误不抛出到调用方（多数被捕获并继续后续测试）。

与其他模块的协作

上游谁调用我

- `AD21_JS_Project/debug/cli/test-real-violations.js` 作为 Jalangi2 runner 调用该文件（线索：`runAnalysis('../test-real-violations.js', 'TestRealViolations_Click', ...)`）。

我调用谁

- `debug/runtime/ad-mock.js`（通过 `require`）。

调用链路图（文字即可）

- `debug/cli/test-real-violations.js` → `SemanticAnalysisRunner.runAnalysis(..)` → 加载 `debug/test-real-violations.js` → 执行 `TestRealViolations_Click` → 触发 mock 违规/追踪逻辑。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/cli/test-real-violations.js`
- `AD21_JS_Project/debug/cli/test-real-violations-direct.js`（同类目的，但直接执行违规并手动读取统计）

如何在 Node 跑

- `node -e \"require('./debug/test-real-violations').TestRealViolations_Click(null)\"`
- 或使用配套 runner：`node debug/cli/test-real-violations.js`

如何在 AD 验证

- 未确认：该文件依赖 Node `require` 与 debug runtime mock，非 AD JScript 侧入口。

产出报告在哪里（reports/logs）

- 本文件不写报告；由 runner（如 `debug/cli/test-real-violations.js`）写入 `debug/reports/*.json`。

已知问题与 TODO

已知坑点（必须可复现）

- 迭代器测试段落包含 `BoardIterator_Create()` 的调用方式疑似不一致：同文件注释“缺少参数/正确创建”但实际两次都无参（线索：关键词 `var iterator = BoardIterator_Create();`）。

TODO（按优先级）

- 把每条“预期违规点”整理成结构化清单，供规则文件回归测试（未实现；线索：可基于本文件分段注释 `测试1/测试2/...`）。

变更记录

- 未确认：`debug/test-real-violations.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/test-real-violations.js` 无记录）。

