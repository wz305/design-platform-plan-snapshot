模块定位

一句话：对“构建产物主入口（main_utf8.js）”做一次端到端语义链路演示（Stage 1-7 串联），用于验证分析器/解释器/执行计划器是否能跑通；不负责修复代码或写回变更。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/analyzer/demo-check-main.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| `checkMainFile` | function | `()` | `void` | Node | 读项目文件；控制台输出；可能调用 analyzer 各阶段 | 当 `require.main === module` 时会自动执行（关键词：`if (require.main === module) { checkMainFile(); }`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\analyzer\\demo-check-main.js
node -e "require('./analyzer/demo-check-main').checkMainFile()"
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/analyzer/semantic/semantic-analyzer.js`：Stage 语义分析（线索：本文件顶部 `require("./semantic/semantic-analyzer")`）。
- `AD21_JS_Project/analyzer/interpretation/interpreter.js`：Stage 6 解释/规则引擎（线索：`require("./interpretation/interpreter")`）。
- `AD21_JS_Project/analyzer/execution/action-planner.js`：Stage 7 执行计划器（线索：`require("./execution/action-planner")`）。
- （隐式）读取目标文件：`dist/main_utf8.js`（未确认具体读取点；线索：在 `checkMainFile` 中搜索 `main_utf8.js`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`console`；脚本主体依赖 analyzer 子模块在 Node 环境可运行。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在生产代码中依赖它：它是“演示/验证脚本”，包含大量控制台输出与演示数据。

运行行为

初始化时做什么

- 若作为主进程运行（`require.main === module`），立即执行 `checkMainFile()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅写控制台（含大量 emoji/图标字符输出）。

副作用：创建对象、修改全局、注册事件、写文件等

- 无写文件逻辑（从尾部可见仅 `console.log/console.error`；未确认：子模块内部可能写报告，需以各子模块文档为准）。

数据结构与约定

关键对象结构（字段表）

- 以 analyzer 各阶段输出对象为主（例如 Stage5 facts、Stage6 interpretation、Stage7 plan）；本脚本只做串联与展示（未确认字段全集：线索关键词 `plan.steps`、`safety.recommendations`）。

关键常量/枚举

- 无新增常量；仅用于展示风险/类型图标（`getRiskIcon/getTypeIcon`）。

错误码/异常策略

- 以 `try/catch` 捕获并 `console.error` 打印 `error.message/error.stack`。

与其他模块的协作

上游谁调用我

- 人工运行；或被更高层脚本/文档引用（未确认）。

我调用谁

- SemanticAnalyzer → Interpreter → ActionPlanner。

调用链路图（文字即可）

- `demo-check-main.js` → Stage 1-4（由 SemanticAnalyzer 内部组织）→ Stage 5（def-use/依赖事实）→ Stage 6（Interpreter rules）→ Stage 7（ActionPlanner 生成计划/风险评估）。

测试与验证

关联测试脚本（路径）

- 本文件本身为演示入口。
- Stage 相关单测：`AD21_JS_Project/analyzer/tests/*.js`（例如 `analyzer/tests/semantic-test.js`）。

如何在 Node 跑

- `node analyzer/demo-check-main.js`

如何在 AD 验证

- 不适用：该脚本依赖 Node 运行时与 analyzer 子模块。

产出报告在哪里（reports/logs）

- 本脚本不写报告文件（未确认：子模块可能写 `analyzer/reports/`）。

已知问题与 TODO

已知坑点（必须可复现）

- 控制台输出使用 `String.prototype.repeat`（关键词：`"=" .repeat(60)` 出现在同域其他脚本；本脚本是否也用未确认）：若运行环境过旧可能失败（Node 一般可用）。

TODO（按优先级）

- 明确“目标入口文件路径”与“读取/分析入口”在文档中（未确认：需要进一步定位 `main_utf8.js` 的读取点）。

变更记录

- 未确认：`analyzer/demo-check-main.js` 当前未纳入 git 跟踪（`git status` 显示 `??`，`git log -- analyzer/demo-check-main.js` 无记录）。

