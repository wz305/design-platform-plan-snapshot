模块定位

一句话：提供 Jalangi2 语义溯源分析的 Node CLI 门面，负责加载 analyzers/runner、解析参数并输出报告；不负责具体规则实现与 analyzer 内部算法。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/jalangi2-semantic.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | `require` Jalangi2 analyzers；读 rules json；写报告文件；`process.exit` | 脚本式 CLI（线索：关键词 `process.exit`、`output: \"debug/reports/...\"`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\cli\\jalangi2-semantic.js --help
node .\\debug\\cli\\jalangi2-semantic.js validate
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/jalangi/analyzers/value-history.js`：值历史追踪（CLI 会 `require`）。
- `AD21_JS_Project/debug/jalangi/analyzers/expectation-engine.js`：期望/规则引擎。
- `AD21_JS_Project/debug/jalangi/analyzers/violation-tracer.js`：违规追踪器。
- `AD21_JS_Project/debug/jalangi/analyzers/semantic-reporter.js`：报告生成。
- `AD21_JS_Project/debug/jalangi/run-semantic-analysis.js`：核心 runner（线索：关键词 `run-semantic-analysis.js`）。
- 可选：`AD21_JS_Project/debug/test-functions.js`（加载测试入口；线索：关键词 `test-functions.js`）。
- 规则文件默认值：`debug/jalangi/rules/ad-function-expects.json`（线索：关键词 `rules:`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`fs/path/process`。
- 输出目录：默认 `debug/reports/`（线索：关键词 `output: \"debug/reports/jalangi2-semantic-report.json\"`）。
- 可选：`analyzer/reports/capability-index-v1-interface.js`（能力查询接口，若存在则 `global.CapabilityQuery = require(...)`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把它当成库模块：它是 CLI runner，包含 argv 解析与退出流程。

运行行为

初始化时做什么

- `loadJalangi2Dependencies()`：按顺序 `require` analyzers 与 runner，若缺失则返回失败并输出日志。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：`[Jalangi2 Semantic] ...`。
- 文件：默认写 `debug/reports/jalangi2-semantic-report.json`（写入发生点需在后续核对 runner/CLI 具体实现；线索：关键词 `options.output` 与 `writeFileSync`，未确认本文件是否直接写）。

副作用：创建对象、修改全局、注册事件、写文件等

- 可能注入 `global.CapabilityQuery`（若 capability interface 存在）。
- 依赖 analyzers 可能在加载时注册全局钩子/状态（未确认；线索：`debug/jalangi/analyzers/*`）。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| `options` | `script/entry/rules/output/traceDepth/confidence/...` | CLI 参数解析结果 | `jalangi2-semantic.js` 关键词 `parseArguments` |

关键常量/枚举

- 默认规则：`debug/jalangi/rules/ad-function-expects.json`
- 默认输出：`debug/reports/jalangi2-semantic-report.json`

错误码/异常策略

- 以 `process.exit(1)` 表达失败（例如初始化失败）；其余通过 console 输出提示。

与其他模块的协作

上游谁调用我

- 人工 CLI 调用：`node debug/cli/jalangi2-semantic.js ...`。

我调用谁

- Jalangi2 analyzers 与 runner；可选 capability query。

调用链路图（文字即可）

- `jalangi2-semantic.js` → `loadJalangi2Dependencies()` → `SemanticAnalysisRunner.initialize({ rulesFile })` → `SemanticAnalysisRunner.runAnalysis(script, entry, ...)` → 写报告到 `debug/reports/`（未确认：写入点在 runner 还是 CLI）。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/__tests__/jalangi2-semantic-test.js`（存在测试文件；是否可直接运行未确认）
- `AD21_JS_Project/debug/cli/test-real-violations.js`（更偏“真实违规回归”）

如何在 Node 跑

- `node debug/cli/jalangi2-semantic.js validate`
- `node debug/cli/jalangi2-semantic.js demo`（未确认：是否实现该命令；线索：关键词 `options.demo`）

如何在 AD 验证

- 不适用：该文件依赖 Node 运行时。

产出报告在哪里（reports/logs）

- 默认：`debug/reports/jalangi2-semantic-report.json`（以及 CLI 其他子命令可能写入的文件；未确认完整列表）。

已知问题与 TODO

已知坑点（必须可复现）

- 依赖文件缺失会直接失败并提示“模块不存在”（可复现：删除/移动 `debug/jalangi/analyzers/value-history.js` 后运行）。

TODO（按优先级）

- 将 `--help` 输出与实际支持命令对齐（未确认：文件后半部分对命令的实现完整性；线索：关键词 `options.demo/test/validate`）。

变更记录

- 未确认：`debug/cli/jalangi2-semantic.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/jalangi2-semantic.js` 无记录）。

