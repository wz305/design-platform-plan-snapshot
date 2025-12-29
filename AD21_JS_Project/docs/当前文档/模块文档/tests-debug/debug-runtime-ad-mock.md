模块定位

一句话：提供“最小 AD API + 常量 + PCBServer” 的 Node 侧 Mock 运行时，用于 debug/语义分析脚本在非 AD 环境下跑通；不负责真实 AD 行为一致性与完整 API 覆盖。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/runtime/ad-mock.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| `initializeADMock` | function | `()` | `void` | Node | 写 `console.log`；初始化全局 Mock 状态 | 通过 `global.initializeADMock = ...` 或 `this.initializeADMock = ...` 暴露（见 `ad-mock.js` 关键词：`global.initializeADMock`） |
| `resetADMock` | function | `()` | `void` | Node | 写 `console.log`；清空/重置 Mock 状态 | 通过 `global.resetADMock = ...` 或 `this.resetADMock = ...` 暴露（见关键词：`global.resetADMock`） |
| `PCBServer` | function | `()` | `Object` | Node | 全局注入 `global.PCBServer`；返回 Mock 的 PCBServer 接口对象 | `ad-mock.js` 末尾：`global.PCBServer = PCBServer`（仅 Node） |
| `eTrackObject` 等常量 | number | — | — | Node | 全局变量污染（脚本作用域） | 例如 `eTrackObject/ePadObject/eViaObject/eArcObject`（见 `ad-mock.js` 顶部“全局常量定义”） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\runtime\\ad-mock.js
node -e "console.log(PCBServer().GetCurrentPCBBoard().FileName)"
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- （无）该文件自身不 `require()` 其他模块（见 `ad-mock.js`，未出现 `require(`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 全局：使用 `global` 注入导出（见关键词：`typeof global !== \"undefined\"`）。
- 控制台：大量 `console.log` 用于可视化 mock 行为（见关键词：`[AD Mock]`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把它当成真实 AD API 规范来源：仅为 debug/语义分析“跑通”而设计，行为可能与 AD 不一致（未确认一致性范围：见 `debug/ad-mock-table.md` 作为线索）。

运行行为

初始化时做什么

- 定义一批“AD 常量/枚举”与内部状态 `_MockState/_MockData`。
- 定义 `initializeADMock/resetADMock` 并挂到 `global`/`this`。
- 自动执行 `initializeADMock()`（副作用：加载即初始化；见关键词：`// 自动初始化`、`initializeADMock();`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅写 `console.log`（例如：`[AD Mock] 初始化完成`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 全局注入：`global.initializeADMock/global.resetADMock/global.PCBServer`。
- 自动初始化：require/load 时立即初始化 mock 状态并输出日志。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段/方法 | 说明 | 线索 |
|---|---|---|---|
| `_MockState` | `currentBoard/currentLibrary/objectCounter/iterators/preProcessActive` | Mock 运行时状态 | `ad-mock.js` 关键词：`var _MockState = {` |
| `PCBServer()` 返回对象 | `GetCurrentPCBBoard/GetCurrentPCBLibrary/PCBObjectFactory/PreProcess/SendMessageToRobots` | Mock 的 PCBServer API 子集 | `ad-mock.js` 关键词：`function PCBServer()` |
| Board 接口 | `FileName/IsLibrary/CurrentLayer/LayerStack/BoardIterator_Create/AddPCBObject/...` | Mock 的 PCB Board API 子集 | `ad-mock.js` 关键词：`function _createBoardInterface()` |

关键常量/枚举

- `eTrackObject/ePadObject/eViaObject/eArcObject`（对象类型 ID）
- `eTopLayer/eBottomLayer/eMultiLayer`（层 ID）
- `eProcessAll/eProcessFree/eProcessComponents`（预处理枚举）

错误码/异常策略

- 未形成统一错误码；以 `throw new Error(...)` 与 `console.log` 组合表达（未确认覆盖范围：搜索 `throw new Error`、`检测到违规`）。

与其他模块的协作

上游谁调用我

- debug/cli 与 debug 测试脚本：例如 `debug/cli/semantic-debug.js`、`debug/test-real-violations.js` 通过 `require('./runtime/ad-mock.js')` 或间接加载。

我调用谁

- （无）不依赖项目内其他模块。

调用链路图（文字即可）

- `debug/cli/*` → `require(debug/runtime/ad-mock.js)` → `initializeADMock()`（自动）→ `global.PCBServer` 可用 → 上层脚本调用 `PCBServer().GetCurrentPCBBoard()` / `PCBObjectFactory(...)`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/cli/semantic-debug.js`（关键词：`mockPath = ... runtime/ad-mock.js`）
- `AD21_JS_Project/debug/cli/test-real-violations-direct.js`（关键词：`require('../runtime/ad-mock.js')`）
- `AD21_JS_Project/debug/test-real-violations.js`（关键词：`require('./runtime/ad-mock.js')`）

如何在 Node 跑

- 直接运行：`node debug/runtime/ad-mock.js`
- 被动加载：在其他脚本中 `require(\"./debug/runtime/ad-mock.js\")`

如何在 AD 验证

- 未确认：该文件为 Node Mock，未看到 AD JScript 侧加载入口（线索：`dist/main_utf8.js` 是否合并该文件；关键词：`ad-mock.js`）。

产出报告在哪里（reports/logs）

- 不写报告文件；仅控制台输出。

已知问题与 TODO

已知坑点（必须可复现）

- 加载即初始化：`require(\".../ad-mock.js\")` 会立即执行 `initializeADMock()`（可能干扰测试隔离）。
- 全局污染：把导出挂到 `global`，可能与其它测试环境冲突。

TODO（按优先级）

- 提供“禁用自动初始化”的开关（例如通过环境变量/参数），避免 `require` 副作用（未实现；线索：`initializeADMock();`）。
- 输出一份稳定的 API 覆盖表并与 `debug/ad-mock-table.md` 对齐（未确认一致性）。

变更记录

- 未确认：`debug/runtime/ad-mock.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/runtime/ad-mock.js` 无记录）。

