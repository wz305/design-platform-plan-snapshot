模块定位

一句话：为 Execution Planner（Stage 6+）做一次端到端“验证演示”，输出验证报告与执行计划产物；不负责修复代码、也不负责作为库的稳定 API。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/demo-execution-validation.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `ExecutionValidator` | Object | - | - | Node | 写文件/控制台输出 | `module.exports = ExecutionValidator`（对象上还暴露多个 `_` 私有方法） |
| `ExecutionValidator.runValidation` | Function | `()` | `Promise<Report>` | Node | 写文件/控制台输出 | 直接运行时会执行并在失败时 `process.exit(1)`（见“运行行为”） |

最小使用示例：3~10 行，能跑

```js
// Node
const ExecutionValidator = require("./analyzer/demo-execution-validation");

ExecutionValidator.runValidation()
  .then((report) => console.log("overall:", report.insights.overallStatus))
  .catch((e) => console.error(e));
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/eslint/eslint-runner.js`：Stage 1（ESLint 门禁）相关验证步骤使用。
- `analyzer/semantic/semantic-analyzer.js`：对真实文件做语义分析验证。
- `analyzer/interpretation/interpreter.js`：解释层（Stage 6）验证。
- `analyzer/execution/action-planner.js`：生成执行计划（Execution Planner）验证。
- `config/merge-order.json`：构建路径验证中读取（关键词：`merge-order.json` / `_testBuildPath`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 输出目录：`analyzer/reports/`、`analyzer/reports/execution-plans/`（会 `mkdirSync(..., { recursive: true })`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把此脚本当作稳定库 API：导出的 `ExecutionValidator` 包含大量 `_` 前缀“私有实现”，后续可能变更。

运行行为

初始化时做什么

- `require()` 时仅定义对象与函数；当 `require.main === module` 才会自动启动验证流程。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：大量 `console.log/console.error`（关键词：`开始Execution Planner验证测试`）。
- 文件：
  - `analyzer/reports/execution-planner-validation-report.json`（关键词：`execution-planner-validation-report.json`）
  - `analyzer/reports/execution-planner-validation-report.md`
  - `analyzer/reports/execution-plans/<basename>-execution-plan.json`

副作用：创建对象、修改全局、注册事件、写文件等

- 写文件、创建目录（`fs.mkdirSync`、`fs.writeFileSync`）。
- 作为 CLI 运行失败时会 `process.exit(1)`（关键词：`require.main === module` / `process.exit(1)`）。

数据结构与约定

关键对象结构（字段表）

- `Report`（由 `_generateValidationReport()` 生成，字段需以实际运行产物为准）：
  - `summary.totalTests/passedTests/failedTests`
  - `details.testResults[]`
  - `details.executionPlans[]`
  - `meta.generatedAt`
  - `insights.successRate/overallStatus/recommendations[]`
  - 未确认：完整字段以输出文件为准（路径：`analyzer/reports/execution-planner-validation-report.json`）。

关键常量/枚举

- 未确认：无独立常量导出；依赖的 Planner/Interpreter 内部有枚举（线索：`analyzer/execution/plan-types.js`）。

错误码/异常策略

- 以抛异常/返回对象 `status` 为主；CLI 模式下捕获异常并打印堆栈后 `process.exit(1)`。

与其他模块的协作

上游谁调用我

- 人工/CI：直接 `node analyzer/demo-execution-validation.js`。

我调用谁

- ESLintRunner → SemanticAnalyzer → Interpreter → ActionPlanner（按验证步骤调用）。

调用链路图（文字即可）

- CLI/脚本 → `ExecutionValidator.runValidation()` → `_testRealFileAnalysis()` → `SemanticAnalyzer` / `Interpreter` / `ActionPlanner` → 写报告与计划到 `analyzer/reports/`。

测试与验证

关联测试脚本（路径）

- `analyzer/demo-execution-validation.js`（自身即测试入口）

如何在 Node 跑

- `node analyzer/demo-execution-validation.js`

如何在 AD 验证

- 不适用（Node 脚本，依赖 `fs/path`）。

产出报告在哪里（reports/logs）

- `analyzer/reports/execution-planner-validation-report.json`
- `analyzer/reports/execution-planner-validation-report.md`
- `analyzer/reports/execution-plans/*.json`

已知问题与 TODO

已知坑点（必须可复现）

- 终端输出包含乱码/符号（如 `??`），与控制台字符集有关（线索：文件内 `console.log("?? ...")`）。

TODO（按优先级）

- 把“私有方法”从导出对象上隐藏（当前 `_xxx` 方法仍可被外部访问）。
- 将报告/计划输出路径做成可配置参数（当前部分路径写死在脚本内）。

变更记录

- 未确认：仓库内该文件可能未纳入 git 跟踪（线索：`git status --porcelain` 出现 `?? debug/`、`?? docs/…`；对本文件 `git log` 可能为空）。
