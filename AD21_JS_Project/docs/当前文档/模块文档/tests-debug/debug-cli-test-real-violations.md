模块定位

一句话：使用 Jalangi2 语义分析 runner 对“真实违规样例代码”进行离线分析，并输出报告；不负责提供违规样例（由 `debug/test-real-violations.js` 提供）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/test-real-violations.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | 读取规则；运行分析；写 `debug/reports/*.json` | 脚本式 runner（关键词：`fs.writeFileSync`、`../reports/real-violation-test-report.json`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\cli\\test-real-violations.js
type .\\debug\\reports\\real-violation-test-report.json | Select-Object -First 1
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/jalangi/analyzers/value-history.js`（加载）。
- `AD21_JS_Project/debug/jalangi/analyzers/expectation-engine.js`（加载）。
- `AD21_JS_Project/debug/jalangi/analyzers/violation-tracer.js`（加载）。
- `AD21_JS_Project/debug/jalangi/analyzers/semantic-reporter.js`（加载）。
- `AD21_JS_Project/debug/jalangi/run-semantic-analysis.js`（提供 `SemanticAnalysisRunner`）。
- `AD21_JS_Project/debug/test-real-violations.js`（作为被分析脚本，路径在 runner 调用中：`'../test-real-violations.js'`）。
- 规则文件：`debug/jalangi/rules/ad-function-expects.json`（通过 `rulesFile`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`fs/process/console`。
- 写文件：`debug/reports/real-violation-test-report.json`（相对路径 `../reports/...`，从 `debug/cli` 出发）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议被 `require` 当库：该文件会立即运行分析并写报告。

运行行为

初始化时做什么

- 加载 analyzers 与 runner，并调用 `SemanticAnalysisRunner.initialize({ rulesFile })`；失败则 `process.exit(1)`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台输出分析过程与检测结果摘要。
- 报告文件：`debug/reports/real-violation-test-report.json`（由本脚本 `fs.writeFileSync` 写入）。

副作用：创建对象、修改全局、注册事件、写文件等

- 写入报告文件到 `debug/reports/`。
- 运行分析时会加载并执行被测脚本（`debug/test-real-violations.js`），进而触发 `ad-mock.js` 的全局注入/自动初始化（间接副作用）。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| `result.semanticReport` | `violations[]/recommendations[]/statistics` | runner 返回的语义报告结构 | `test-real-violations.js` 中打印这些字段（关键词：`result.semanticReport`） |

关键常量/枚举

- 默认规则文件：`../jalangi/rules/ad-function-expects.json`
- 默认报告路径：`../reports/real-violation-test-report.json`

错误码/异常策略

- 初始化失败：`process.exit(1)`；写报告失败：`console.log` 提示但不中断。

与其他模块的协作

上游谁调用我

- 人工运行，或由更高层 CI/脚本调用（未确认）。

我调用谁

- Jalangi2 analyzers/runner 与 `debug/test-real-violations.js`。

调用链路图（文字即可）

- `debug/cli/test-real-violations.js` → `SemanticAnalysisRunner.initialize(rulesFile)` → `SemanticAnalysisRunner.runAnalysis('../test-real-violations.js', 'TestRealViolations_Click')` → `fs.writeFileSync('../reports/real-violation-test-report.json', ...)`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/test-real-violations.js`（被分析对象）
- `AD21_JS_Project/debug/cli/test-real-violations-direct.js`（同主题，直接执行违规并手动读取统计）

如何在 Node 跑

- `node debug/cli/test-real-violations.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/debug/reports/real-violation-test-report.json`

已知问题与 TODO

已知坑点（必须可复现）

- 报告路径使用相对路径 `../reports/...`，要求运行 cwd 不影响写入位置（此处不是 `path.join(__dirname, ...)`；可复现：从不同 cwd 启动可能写到不同相对位置）。

TODO（按优先级）

- 将报告路径改为基于 `__dirname` 的绝对路径，避免 cwd 影响（未实现；线索：关键词 `var reportPath = '../reports/real-violation-test-report.json';`）。

变更记录

- 未确认：`debug/cli/test-real-violations.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/test-real-violations.js` 无记录）。

