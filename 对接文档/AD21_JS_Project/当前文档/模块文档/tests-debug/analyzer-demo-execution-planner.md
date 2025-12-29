模块定位

一句话：演示 Stage 7 Execution Planner（ActionPlanner）如何把 Stage 6 的 InterpretationResult 转换成可执行计划并进行风险评估；不负责实际执行/写回代码。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/analyzer/demo-execution-planner.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| `demonstrateExecutionPlanner` | function | `()` | `void` | Node | 控制台输出 | 主运行时会调用（关键词：`demonstrateExecutionPlanner();`） |
| `createDemoInterpretationResult` | function | `()` | `Object` | Node | 无 | 生成演示用 InterpretationResult |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\analyzer\\demo-execution-planner.js
node -e "const m=require('./analyzer/demo-execution-planner'); console.log(Object.keys(m.createDemoInterpretationResult()))"
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/analyzer/execution/action-planner.js`：提供 `ActionPlanner.createPlan/simulatePlan/checkExecutionSafety/...`（线索：文件顶部 `require("./execution/action-planner")`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 控制台：打印计划、风险与建议。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在生产链路中直接 `require` 并运行：它是演示脚本，包含硬编码示例数据与大量输出。

运行行为

初始化时做什么

- 若作为主进程运行（`require.main === module`），会依次执行 `demonstrateExecutionPlanner()` 与 `demonstrateScenarios()`（线索：`if (require.main === module) { ... }`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅控制台输出；无文件写入逻辑。

副作用：创建对象、修改全局、注册事件、写文件等

- 无全局注入；仅在进程内创建 JS 对象并打印。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| InterpretationResult（演示） | `actions[]/warnings[]/errors[]/meta` | Stage 6 输出的抽象（演示用） | `createDemoInterpretationResult()` 返回值 |
| ExecutionPlan（由 ActionPlanner 生成） | `steps[]/meta/...` | Stage 7 输出（由 action-planner 定义） | 线索：`ActionPlanner.createPlan(...)` 返回值 |

关键常量/枚举

- 风险级别字符串：`low/medium/high/critical`（演示数据中使用）。

错误码/异常策略

- 主执行段用 `try/catch` 捕获并打印 stack。

与其他模块的协作

上游谁调用我

- 人工运行；或被文档/教程引用（未确认）。

我调用谁

- `ActionPlanner`。

调用链路图（文字即可）

- `demo-execution-planner.js` → `ActionPlanner.createPlan(InterpretationResult)` → `ActionPlanner.checkExecutionSafety(plan)` → `ActionPlanner.simulatePlan(plan)`。

测试与验证

关联测试脚本（路径）

- `AD21_JS_Project/analyzer/execution/__tests__/planner-basic.test.js`（若存在测试框架运行入口，未确认）。

如何在 Node 跑

- `node analyzer/demo-execution-planner.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无文件报告；仅控制台输出。

已知问题与 TODO

已知坑点（必须可复现）

- 演示数据中的字段与真实 Stage 6 输出是否完全一致未确认（线索：对比 `analyzer/interpretation/interpreter.js` 生成的结果结构）。

TODO（按优先级）

- 增加“从真实 Stage6 输出读取并演示”的入口，减少硬编码（未实现）。

变更记录

- 未确认：`analyzer/demo-execution-planner.js` 当前未纳入 git 跟踪（`git status` 显示 `??`，`git log -- analyzer/demo-execution-planner.js` 无记录）。

