模块定位

一句话：Execution 层类型与工厂函数集合，负责定义 ExecutionPlan/ExecutionStep 的结构与创建/校验/统计工具，不负责解释语义事实或执行代码改动。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/execution/plan-types.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
StepType	Object	-	-	Node	无	步骤类型枚举（字符串）
RiskLevel	Object	-	-	Node	无	风险级别枚举（字符串）
ExecutionStep	Object	-	-	Node	无	步骤接口模板（字段形状）
ExecutionPlan	Object	-	-	Node	无	执行计划接口模板
ExecutionResult	Object	-	-	Node	无	执行结果接口模板
RiskSummary	Object	-	-	Node	无	风险摘要接口模板
createExecutionStep	Function	options:Object	step:Object	Node	无	创建带默认值的 ExecutionStep
createExecutionPlan	Function	options:Object	plan:Object	Node	无	创建计划并自动计算 statistics
createRiskSummary	Function	options?:Object	summary:Object	Node	无	创建风险摘要
calculateStatistics	Function	plan:Object	stats:Object	Node	无	统计 stepsByType/stepsByRisk/estimatedImpact
validateExecutionPlan	Function	plan:Object	{valid:boolean, errors:string[]}	Node	无	校验基本字段（type/target）
mergeExecutionPlans	Function	plans:Array	plan:Object	Node	无	合并 steps 并生成新 plan（source: merged-plans）
generateStepId	Function	-	string	Node	无	生成 `step_<timestamp>_<rand>`
generatePlanId	Function	-	string	Node	无	生成 `plan_<timestamp>_<rand>`

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Types = require("./analyzer/execution/plan-types");
var step = Types.createExecutionStep({ type: Types.StepType.ADD_COMMENT, target: { file: "a.js", line: 1 } });
console.log(step.id, step.type);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：使用 `Set` 与 `Array.from` 统计影响范围（关键词：`new Set()` / `Array.from`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（使用 ES6 `Set`）。

运行行为

初始化时做什么

- 定义枚举/模板对象与一组工厂函数。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无。

副作用：创建对象、修改全局、注册事件、写文件等

- `createExecutionPlan()` 会为 plan 自动计算 `statistics`（关键词：`plan.statistics = calculateStatistics(plan)`）。

数据结构与约定

关键对象结构（字段表）

- `ExecutionStep.target`：`{symbol,file,line,column}`
- `ExecutionStep.rollback`：`{operation,data}`（由上游填充/或留空）
- `ExecutionPlan.statistics.estimatedImpact.filesAffected/symbolsAffected`：由 Set 聚合后转换为数组

关键常量/枚举

- StepType：`REMOVE_SYMBOL|DEFINE_VARIABLE|REMOVE_USAGE|ADD_COMMENT|RENAME_SYMBOL`
- RiskLevel：`LOW|MEDIUM|HIGH|CRITICAL`

错误码/异常策略

- `validateExecutionPlan()` 不抛异常，返回 `{valid, errors}`。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/execution/action-planner.js：创建/校验计划与步骤
- AD21_JS_Project/analyzer/demo-execution-planner.js：演示脚本

我调用谁

- 无。

调用链路图（文字即可）

- ActionPlanner → PlanTypes.createExecutionStep/createExecutionPlan → ExecutionPlan.statistics/validate

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/execution/__tests__/planner-basic.test.js

如何在 Node 跑

- `node analyzer/execution/__tests__/planner-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- `validateExecutionPlan()` 要求 step.target.symbol 或 step.target.file 至少一个存在；仅有 line/column 的 step 会被判为无 target（关键词：`missing target`）。

TODO（按优先级）

- 未确认：为不同 StepType 增加更严格的 schema 校验（例如 REMOVE_SYMBOL 必须有 symbol）。

变更记录

- 2025-12-17 语义系统1.0

