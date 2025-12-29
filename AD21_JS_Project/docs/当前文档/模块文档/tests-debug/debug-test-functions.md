模块定位

一句话：提供一组可被 debug/语义分析调用的“测试入口函数”，用于模拟 UI 按钮点击与业务流程；不负责真实 UI/DFM 绑定与 AD 环境集成。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/test-functions.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| `TestButton_Click` | function | `(Sender)` | `void` | Node | `console.log`；调用 `PCBServer()` 创建/遍历对象 | 通过 `global.TestButton_Click = ...` 暴露（关键词：`global.TestButton_Click`） |
| `TestModuleSystem` | function | `(Sender)` | `void` | Node | `console.log`；尝试调用 `LoggerModule/ObjectModule` | 通过 `global.TestModuleSystem = ...` 暴露（关键词：`global.TestModuleSystem`） |
| `TestBusinessFlow` | function | `(Sender)` | `void` | Node | `console.log`；PCB 操作 + Logger 记录 | 通过 `global.TestBusinessFlow = ...` 暴露（关键词：`global.TestBusinessFlow`） |
| `getAvailableTestFunctions` | function | `()` | `string[]` | Node | 无 | 用于列出可用测试入口（关键词：`getAvailableTestFunctions`） |
| `isTestFunctionAvailable` | function | `(functionName)` | `boolean` | Node | 无 | 用于查询函数是否存在 |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node -e "require('./debug/runtime/ad-mock'); require('./debug/test-functions'); TestButton_Click({I_ObjectAddress:123})"
node -e "require('./debug/runtime/ad-mock'); require('./debug/test-functions'); console.log(getAvailableTestFunctions())"
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/runtime/ad-mock.js`：需要 `PCBServer()` 与 Mock Board/Iterator（本文件未显式 `require`，但调用了 `PCBServer()`；线索：关键词 `PCBServer().GetCurrentPCBBoard()`）。
- （可选）`LoggerModule/ObjectModule`：仅在存在时调用（线索：关键词 `typeof LoggerModule !== \"undefined\"`、`typeof ObjectModule !== \"undefined\"`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 全局：将测试函数挂到 `global`（关键词：`if (typeof global !== \"undefined\") { global.TestButton_Click = ... }`）。
- 控制台：通过 `console.log` 输出测试进度。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把这些函数当作生产 API：它们是 debug 测试入口，行为会直接制造“对象创建/遍历”等副作用。

运行行为

初始化时做什么

- 定义函数并立刻导出到 `global/this`；文件末尾输出 `[Test Functions] ... 加载完成`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 写 `console.log`。

副作用：创建对象、修改全局、注册事件、写文件等

- 全局污染：`global.TestButton_Click/...`、`global.getAvailableTestFunctions/...`。
- 运行时可能创建 Mock PCB 对象并添加到 Mock Board（依赖 `PCBServer().GetCurrentPCBBoard().AddPCBObject`）。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段/方法 | 说明 | 线索 |
|---|---|---|---|
| `Sender` | `I_ObjectAddress` | 测试函数会打印该字段 | `TestButton_Click` 内关键词：`Sender.I_ObjectAddress` |

关键常量/枚举

- 依赖 `ad-mock.js` 中的对象类型常量（例如 `eViaObject/eTrackObject`），但本文件用数字字面量调用 `PCBObjectFactory(3, ...)`（线索：`PCBObjectFactory(3, 0, 0)`）。

错误码/异常策略

- 以 `try/catch + console.log` 为主；未使用统一错误码。

与其他模块的协作

上游谁调用我

- `debug/cli/semantic-debug.js` 会尝试加载 `debug/test-functions.js`（线索：关键词 `testFunctionsPath`）。
- Jalangi2 语义分析 runner 可能把这些作为 `--entry` 入口函数（未确认：取决于 runner 对入口函数的解析；线索：`debug/cli/*` 的 `--entry`）。

我调用谁

- 运行时调用 `PCBServer()`（来自 `debug/runtime/ad-mock.js`）与可选的 `LoggerModule/ObjectModule`。

调用链路图（文字即可）

- `debug/cli/semantic-debug.js` → `require(debug/runtime/ad-mock.js)` → `require(debug/test-functions.js)` → 入口函数（如 `TestButton_Click`）→ `PCBServer().GetCurrentPCBBoard()` → `AddPCBObject/BoardIterator_Create`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/cli/semantic-debug.js`（加载本文件作为可选测试入口）。

如何在 Node 跑

- 需要先加载 `debug/runtime/ad-mock.js` 以提供 `PCBServer()`：示例见“最小使用示例”。

如何在 AD 验证

- 未确认：该文件为 Node debug 使用，未看到 DFM/PrjScr 直接绑定（线索：搜索 `TestButton_Click` 是否出现在 `dist/main.dfm`）。

产出报告在哪里（reports/logs）

- 不写文件报告；仅控制台输出（日志若启用 LoggerModule，则可能写 UI/文件，取决于 Logger 配置）。

已知问题与 TODO

已知坑点（必须可复现）

- 对 `LoggerModule/ObjectModule` 的调用假设其 API 存在：例如 `LoggerModule.getLogger`、`ObjectModule.createObject`（若与实际导出不一致会失败）。

TODO（按优先级）

- 增加 `module.exports`（Node 侧显式导出），减少对 `global` 污染（未实现；线索：当前仅 `global.* = ...`）。

变更记录

- 未确认：`debug/test-functions.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/test-functions.js` 无记录）。

