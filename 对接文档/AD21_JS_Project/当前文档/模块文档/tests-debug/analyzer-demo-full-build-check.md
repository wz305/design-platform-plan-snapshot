模块定位

一句话：按 `config/merge-order.json` 的构建顺序对全量文件执行 Stage 1-7 分析并生成综合报告；不负责修复、也不保证可在 AD 环境运行。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/demo-full-build-check.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `FullBuildChecker` | Object | - | - | Node | 读写文件/控制台输出 | `module.exports = FullBuildChecker` |
| `FullBuildChecker.runFullCheck` | Function | `(options?)` | `Report` | Node | 读 `config/merge-order.json`，读源码，写报告 | 默认输出 `analyzer/reports/full-build-analysis-report.json`（未确认是否同时生成 `.md`；线索：`analyzer/demo-full-build-check.js` 关键词 `_saveReport`） |

最小使用示例：3~10 行，能跑

```js
// Node
const FullBuildChecker = require("./analyzer/demo-full-build-check");
const report = FullBuildChecker.runFullCheck();
console.log("successRate:", report.summary.overall.successRate);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `config/merge-order.json`：构建文件顺序来源（关键词：`_loadMergeOrder`）。
- `analyzer/eslint/eslint-runner.js`：Stage 1 门禁/校验。
- `analyzer/semantic/semantic-analyzer.js`：语义分析主流程。
- `analyzer/interpretation/interpreter.js`：解释层（Stage 6）。
- `analyzer/execution/action-planner.js`：执行计划生成（Stage 7/Planner）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 会读取 `mergeOrder` 中列出的源码文件路径（相对项目根目录）。
- 报告输出目录：`analyzer/reports/`（必要时创建）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把此脚本当“模块 API 稳定入口”；它以“演示/验证”优先，输出格式可能变动。

运行行为

初始化时做什么

- `require()` 时仅定义对象；当 `require.main === module` 会立即执行一次 `runFullCheck()` 并在异常时 `process.exit(1)`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：逐文件输出分析进度与汇总。
- 文件：
  - `analyzer/reports/full-build-analysis-report.json`
  - 未确认：是否同时生成 `analyzer/reports/full-build-analysis-report.md`（线索：`analyzer/demo-full-build-check.js` 搜索 `full-build-analysis-report.md`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 读 `config/merge-order.json`，读取构建路径中的每个文件源代码。
- 写报告文件、创建目录（`fs.mkdirSync`、`fs.writeFileSync`）。
- 作为 CLI 运行失败时 `process.exit(1)`（关键词：`require.main === module` / `process.exit(1)`）。

数据结构与约定

关键对象结构（字段表）

- `Report`：综合报告对象（建议以实际输出文件为准）。
  - `summary.files.totalFiles/processedFiles/failedFiles/processingTime`
  - `summary.executionPlans.totalPlans/totalSteps/riskDistribution`
  - `details.files[]`（每个文件的 stages 与 plan 摘要）
  - `meta.generatedAt`
  - 未确认：字段的完整定义需通过运行产物核对（路径：`analyzer/reports/full-build-analysis-report.json`）。

关键常量/枚举

- 未确认：内部使用的阶段/风险枚举来自分析模块（线索：`analyzer/execution/plan-types.js`）。

错误码/异常策略

- 读取/解析失败直接抛异常；CLI 模式捕获后输出堆栈并退出码 `1`。

与其他模块的协作

上游谁调用我

- 人工/CI：`node analyzer/demo-full-build-check.js`。

我调用谁

- ESLintRunner / SemanticAnalyzer / Interpreter / ActionPlanner（按顺序调用以生成 stages 与执行计划）。

调用链路图（文字即可）

- CLI → `FullBuildChecker.runFullCheck()` → `_loadMergeOrder()` → `_analyzeFilesInOrder()` → `_generateExecutionPlans()` → `_saveReport()` → 写 `analyzer/reports/*`。

测试与验证

关联测试脚本（路径）

- `analyzer/demo-full-build-check.js`（自身即测试入口）

如何在 Node 跑

- `node analyzer/demo-full-build-check.js`

如何在 AD 验证

- 不适用（Node 脚本）。

产出报告在哪里（reports/logs）

- `analyzer/reports/full-build-analysis-report.json`
- 未确认：是否同时生成 `analyzer/reports/full-build-analysis-report.md`（同上）。

已知问题与 TODO

已知坑点（必须可复现）

- 如果 `config/merge-order.json` 中的某个文件路径不存在，会导致该文件分析失败并计入 `failedFiles`（关键词：`fs.existsSync(filePath)`）。

TODO（按优先级）

- 将 `merge-order.json` 路径与输出路径参数化（当前默认写死）。
- 为输出报告 schema 增加版本号字段，便于下游消费稳定。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上，`git status --porcelain`）。
