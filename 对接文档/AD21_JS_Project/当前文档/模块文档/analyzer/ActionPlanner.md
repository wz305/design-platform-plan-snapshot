模块定位

一句话：Execution 层计划生成器，负责把 Stage 6 InterpretationResult 映射为 ExecutionPlan（步骤/风险/统计），不负责真正对代码打补丁或执行改动。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/execution/action-planner.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ActionPlanner	Object	-	-	Node	console输出	主导出对象（module.exports）
ActionPlanner.createPlan	Function	interpretationResult:Object, options?:Object	ExecutionPlan	Node	console输出	核心：Actions→Steps + 风险汇总 + validateExecutionPlan
ActionPlanner.simulatePlan	Function	plan:ExecutionPlan	simulation:Object	Node	console输出	逐步骤估算耗时/潜在问题/影响范围
ActionPlanner.getPlanStatistics	Function	plan:ExecutionPlan	stats:Object	Node	无	从 plan.statistics/riskSummary 派生视图
ActionPlanner.checkExecutionSafety	Function	plan:ExecutionPlan	safety:Object	Node	无	基于 blockers/highRisk/irreversible 产出安全评估

最小使用示例：3~10 行，能跑

```js
// Node 环境
var ActionPlanner = require("./analyzer/execution/action-planner");
var plan = ActionPlanner.createPlan({ actions: [], warnings: [], errors: [] }, { mode: "dry-run" });
console.log(plan.meta.id, plan.steps.length);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/execution/plan-types.js：ExecutionPlan/ExecutionStep 工厂与校验（关键词：`createExecutionPlan` / `validateExecutionPlan`）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 仅 Node 控制台：大量 `console.log`（关键词：`开始规划ExecutionPlan` / `模拟执行`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载。

运行行为

初始化时做什么

- 无显式初始化；按调用创建计划对象。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：createPlan/simulatePlan 输出过程日志。

副作用：创建对象、修改全局、注册事件、写文件等

- createPlan 会构造并返回 ExecutionPlan；不会写文件。
- validateExecutionPlan 失败会抛异常（关键词：`throw new Error(\"Invalid execution plan\"...)`）。

数据结构与约定

关键对象结构（字段表）

- 输入 `interpretationResult.actions[]`：元素期望包含
  - `action`（如 `safe-remove`/`define-variable`）
  - `symbol`
  - `risk`（low/medium/high/critical）
  - `confidence`
  - `evidence`（可选；本模块读取 `file/line/column/originalCode/dependencies`）
- 输出 `ExecutionPlan.steps[]`：由 PlanTypes.createExecutionStep 创建

关键常量/枚举

- PlanTypes.StepType：`remove-symbol|define-variable|remove-usage|add-comment|rename-symbol`
- PlanTypes.RiskLevel：`low|medium|high|critical`

错误码/异常策略

- `createPlan()`：plan 校验失败直接抛出 Error；上游需捕获。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic-workflow.js：`generate-plan`/`simulate-plan` 命令
- AD21_JS_Project/analyzer/demo-full-build-check.js：Stage1-7 演示中用于生成执行计划
- AD21_JS_Project/analyzer/demo-execution-planner.js：ExecutionPlanner 演示脚本

我调用谁

- PlanTypes：createExecutionStep/createExecutionPlan/validateExecutionPlan 等

调用链路图（文字即可）

- Stage6 InterpretationResult → ActionPlanner.createPlan → ExecutionPlan（dry-run/simulate/execute 计划容器）

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/execution/__tests__/planner-basic.test.js

如何在 Node 跑

- `node analyzer/execution/__tests__/planner-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 本模块不写报告；上游脚本可能写 `analyzer/reports/*`。

已知问题与 TODO

已知坑点（必须可复现）

- `requiresApproval` 的判定来自 action.risk（high/critical），而 errors/warnings 被转换为 ADD_COMMENT step 后风险可能被重新映射（定位：`_convertIssuesToSteps` / `_mapRiskLevel`）。

TODO（按优先级）

- 未确认：补充对 `rename-symbol` 等 action 的 evidence/rollback 信息，当前 rollback 结构主要由 PlanTypes 默认值提供。

变更记录

- 2025-12-17 语义系统1.0

