模块定位

一句话：提供一个语义 Debug 的 Node CLI 门面（debug/explain/query/validate/build），串联 AD Mock、（增强版）analysis 与可选能力索引；不负责分析器实现与规则正确性。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/semantic-debug.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | `require` 多个模块；可能 `eval` 构建产物；创建目录；`process.exit` | 脚本式 CLI，未用 `module.exports`（线索：文件中存在 `process.exit`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\cli\\semantic-debug.js --help
node .\\debug\\cli\\semantic-debug.js validate
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/runtime/ad-mock.js`：提供 `PCBServer` 与 mock 环境（线索：关键词 `mockPath = ... runtime/ad-mock.js`）。
- `AD21_JS_Project/debug/jalangi/enhanced-analysis.js` 或 `AD21_JS_Project/debug/jalangi/analysis.js`：提供 Trace/保存能力（线索：关键词 `Enhanced Analysis 已加载` / `原版Analysis 已加载（降级）`）。
- `AD21_JS_Project/debug/test-functions.js`：提供可选入口函数（线索：关键词 `testFunctionsPath`）。
- `AD21_JS_Project/build/build.js`：build 模式调用 BuildManager（线索：关键词 `BuildManager`、`build/build.js`）。
- 可选：`AD21_JS_Project/analyzer/reports/capability-index-v1-interface.js`：能力查询接口（线索：关键词 `CapabilityQuery`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`fs/path/process`；以 `process.argv` 解析参数（线索：关键词 `parseArguments`）。
- 目录：可能创建 `debug/traces/`（validate 模式会 `fs.mkdirSync(..., { recursive: true })`）。
- 动态执行：build 模式会 `eval(dist/main_utf8.js)`（线索：关键词 `eval(builtCode)`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把它当成库模块：它会解析 argv 并在末尾 `process.exit`，不适合被其他代码 `require` 当库调用。

运行行为

初始化时做什么

- `loadDependencies()`：在 Node 环境尝试 `require` mock、analysis、test-functions，并可选加载 capability query。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：大量 `[Semantic Debug] ...` 输出。
- 文件/目录：validate 模式可能创建 `debug/traces/`；debug 模式会调用 `saveTrace(options.outputFile)`（写文件行为取决于被加载的 analysis 实现，未确认写入细节；线索：关键词 `saveTrace(`）。

副作用：创建对象、修改全局、注册事件、写文件等

- `require(debug/runtime/ad-mock.js)` 会触发 mock 自动初始化与全局注入 `PCBServer`。
- build 模式执行 `eval(dist/main_utf8.js)`，可能在当前进程内引入大量全局变量（未确认具体导出；线索：`dist/main_utf8.js` 顶部导出段）。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| `options` | `command/entry/runtime/mode/outputFile/build/analyzer/...` | CLI 参数解析结果 | `semantic-debug.js` 关键词 `parseArguments` |

关键常量/枚举

- 默认输出：`debug/traces/trace.json`（线索：关键词 `outputFile: \"debug/traces/trace.json\"`）。

错误码/异常策略

- 以返回“退出码 number”并在末尾 `process.exit(exitCode)` 结束（线索：关键词 `process.exit(exitCode)`）。

与其他模块的协作

上游谁调用我

- 人工 CLI 调用：`node debug/cli/semantic-debug.js ...`。

我调用谁

- `ad-mock.js`、analysis、test-functions、build/build.js、可选 capability query。

调用链路图（文字即可）

- `semantic-debug.js` → `loadDependencies()` → `require(ad-mock.js)` → `global.PCBServer` 可用 → `debug/explain/query/validate/build` 分支 → （debug）调用 `enableTrace/saveTrace`（未确认：定义在 analysis）/（build）`BuildManager.build()` + `eval(dist/main_utf8.js)`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/cli/semantic-debug.js` 本身即为入口。

如何在 Node 跑

- `node debug/cli/semantic-debug.js --help`
- `node debug/cli/semantic-debug.js validate`
- `node debug/cli/semantic-debug.js debug --entry TestButton_Click --output debug/traces/trace.json`（未确认：`enableTrace/saveTrace` 是否存在，取决于 analysis 是否正确加载）

如何在 AD 验证

- 不适用：该文件依赖 Node `require/process/fs`。

产出报告在哪里（reports/logs）

- traces：`debug/traces/`（validate 会确保目录存在；debug 分支默认输出 `debug/traces/trace.json`）。

已知问题与 TODO

已知坑点（必须可复现）

- `saveTrace(...)`/`enableTrace(...)` 不是本文件定义，依赖外部 analysis 注入；validate 会检查 `typeof enableTrace !== \"function\"` 并报问题（可复现：缺少 analysis 文件时运行 validate）。

TODO（按优先级）

- 把 “analysis 注入的全局函数清单” 明确写到文档/接口层，避免隐式耦合（未实现；线索：`enableTrace/saveTrace`）。

变更记录

- 未确认：`debug/cli/semantic-debug.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/semantic-debug.js` 无记录）。

