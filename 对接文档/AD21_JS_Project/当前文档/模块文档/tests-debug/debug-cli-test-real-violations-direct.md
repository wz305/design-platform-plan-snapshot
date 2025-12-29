模块定位

一句话：直接执行“真实违规”代码路径，并手动读取 ValueHistory/Expectation/Violation/SemanticReport 统计，验证 Jalangi2 analyzers 的运行期状态；不负责离线文件分析（那是 `SemanticAnalysisRunner.runAnalysis` 的职责）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/test-real-violations-direct.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | `require` analyzers + ad-mock；执行违规；写 `debug/reports/*.json` | 脚本式 runner（关键词：`fs.writeFileSync('../reports/direct-violation-test-report.json'`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\cli\\test-real-violations-direct.js
type .\\debug\\reports\\direct-violation-test-report.json | Select-Object -First 1
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/jalangi/analyzers/value-history.js`：提供 `ValueHistoryTracker`。
- `AD21_JS_Project/debug/jalangi/analyzers/expectation-engine.js`：提供 `ExpectationEngine`。
- `AD21_JS_Project/debug/jalangi/analyzers/violation-tracer.js`：提供 `ViolationTracer`。
- `AD21_JS_Project/debug/jalangi/analyzers/semantic-reporter.js`：提供 `SemanticReporter`。
- `AD21_JS_Project/debug/jalangi/run-semantic-analysis.js`：提供初始化接口 `SemanticAnalysisRunner.initialize(...)`（线索：关键词 `SemanticAnalysisRunner.initialize`）。
- `AD21_JS_Project/debug/runtime/ad-mock.js`：提供 `PCBServer()`（线索：关键词 `require('../runtime/ad-mock.js')`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`fs/process/console`。
- 报告文件：`debug/reports/direct-violation-test-report.json`（相对路径 `../reports/...`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议作为库引用：执行即产生全局状态变更与报告写入。

运行行为

初始化时做什么

- `require` analyzers/runner + mock。
- 调用 `SemanticAnalysisRunner.initialize({ rulesFile })`；失败即 `process.exit(1)`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出每个测试阶段与统计信息。
- 文件：写入 `debug/reports/direct-violation-test-report.json`（由本脚本 `fs.writeFileSync` 写入）。

副作用：创建对象、修改全局、注册事件、写文件等

- 执行 `TestRealViolations_Click`：调用 `PCBServer().PCBObjectFactory`/`board.AddPCBObject`，触发 mock 违规输出。
- 清空 analyzers 状态：`ValueHistoryTracker.clearHistory()`、`ExpectationEngine.clearViolations()` 等（线索：关键词 `clearHistory/clearViolations/clearTraces/clearReports`）。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| `ValueHistoryTracker.getStatistics()` | `totalObjects/totalModifications/objectTypes` | 值历史统计 | 脚本中打印（关键词 `valueStats`） |
| `ExpectationEngine.getStatistics()` | `totalViolations/errorCount/warningCount` | 期望引擎统计 | 关键词 `expectationStats` |
| `ViolationTracer.getStatistics()` | `totalTraces/averageDepth/averageConfidence` | 追踪统计 | 关键词 `violationStats` |
| `SemanticReporter.generateSemanticReport(...)` | `violations[]` | 语义报告 | 关键词 `generateSemanticReport` |

关键常量/枚举

- 规则文件：`../jalangi/rules/ad-function-expects.json`
- 报告路径：`../reports/direct-violation-test-report.json`

错误码/异常策略

- 初始化失败：`process.exit(1)`；其它错误多以 `try/catch` 捕获并继续。

与其他模块的协作

上游谁调用我

- 人工运行（用于调试/验证）。

我调用谁

- Jalangi2 analyzers/runner + `ad-mock.js`。

调用链路图（文字即可）

- `test-real-violations-direct.js` → `require(analyzers)` + `require(ad-mock)` → `SemanticAnalysisRunner.initialize(rulesFile)` → `TestRealViolations_Click()` → `SemanticReporter.generateSemanticReport(...)` → `fs.writeFileSync('../reports/direct-violation-test-report.json', ...)`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/debug/cli/test-real-violations.js`（离线分析模式）
- `AD21_JS_Project/debug/test-real-violations.js`（违规样例代码）

如何在 Node 跑

- `node debug/cli/test-real-violations-direct.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/debug/reports/direct-violation-test-report.json`

已知问题与 TODO

已知坑点（必须可复现）

- 报告路径是相对字符串，可能受运行 cwd 影响（同 `test-real-violations.js`）。

TODO（按优先级）

- 改用 `path.join(__dirname, '..', 'reports', ...)` 固定报告落点（未实现）。

变更记录

- 未确认：`debug/cli/test-real-violations-direct.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/test-real-violations-direct.js` 无记录）。

