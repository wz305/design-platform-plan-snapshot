模块定位

一句话：语义系统 CLI 门面与调度器，负责命令行解析/能力索引加载/分析与计划生成，不负责自动执行代码改动（v1 声明）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic-workflow.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
SemanticWorkflow	Object	-	-	Node	读写文件/console输出	CLI 主控制器对象（同时可被 require 调用）
main	Function	-	void	Node	process.exit/console输出	读取 process.argv 并派发命令
showHelp	Function	-	void	Node	console输出	打印命令帮助
parseOptions	Function	args:Array	options:Object	Node	无	解析 `--key value` 风格参数
executeCommand	Function	command:string, options:Object	result:Object	Node	读文件/console输出	分派到各命令处理函数
loadCapabilityQuery	Function	options:Object	query:Object	Node	读取 `reports/capability-index-v1.json`	加载能力索引并构建查询接口
listModules	Function	options:Object	result:Object	Node	读取能力索引	列出模块/可调用对象/全局变量
listMethods	Function	options:Object	result:Object	Node	读取能力索引	列出指定模块方法
checkCallable	Function	options:Object	result:Object	Node	读取能力索引	检查对象可调用性
canAccess	Function	options:Object	result:Object	Node	读取能力索引	检查从对象到目标的访问存在性（简化）
predictImpact	Function	options:Object	result:Object	Node	读取能力索引	预测对符号进行动作的风险（基于索引事实）
generatePlan	Function	options:Object	result:Object	Node	调用 ActionPlanner/Interpreter	生成 ExecutionPlan（以 dry-run 为主）
simulatePlan	Function	options:Object	result:Object	Node	无/console输出	对计划做模拟（内部构造 mockPlan）
validateCapability	Function	options:Object	result:Object	Node	写 analyzer/reports/*	运行 CapabilityQueryValidator
analyzeProject	Function	options:Object	result:Object	Node	读目录/console输出	扫描目录下 `.js` 并调用 SemanticAnalyzer.analyzeProject
scanJSFiles	Function	dir:string	files:Array	Node	读目录	递归收集 `.js` 文件
outputResult	Function	result:Object, options:Object	void	Node	可能写 options.output	按 json/markdown 输出结果
formatMarkdown	Function	result:Object, options:Object	markdown:string	Node	无	将结果对象格式化为 Markdown

最小使用示例：3~10 行，能跑

```js
// Node 环境
var SemanticWorkflow = require("./analyzer/semantic-workflow");
SemanticWorkflow.executeCommand("list-modules", { format: "json", facts: "reports/capability-index-v1.json" });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/capability-index-builder.js：生成/读取能力索引的前置工具（错误提示与链路）
- AD21_JS_Project/analyzer/capability-query-validator.js：验证能力索引可查询性（validate-capability）
- AD21_JS_Project/analyzer/semantic/semantic-analyzer.js：项目语义分析（analyze-project）
- AD21_JS_Project/analyzer/execution/action-planner.js：把解释结果映射为 ExecutionPlan（generate-plan/simulate-plan）
- AD21_JS_Project/analyzer/interpretation/interpreter.js：Stage 6 解释引擎（generate-plan）
- Node 内置：fs/path/process/console：CLI 与文件 I/O

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- `reports/capability-index-v1.json`：默认能力索引输入（可用 `--facts` 覆盖；关键词：`factsPath`）
- Node 运行环境：`process.argv`、`process.exit`

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（依赖 Node `require`/`fs`/`process`）。

运行行为

初始化时做什么

- 无显式初始化；按命令路径惰性加载能力索引/分析器组件。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：大量进度与结果输出
- 文件：当传入 `--output <file>` 时写入结果（关键词：`outputResult`）

副作用：创建对象、修改全局、注册事件、写文件等

- 读 `reports/capability-index-v1.json`（默认）
- 可写 `options.output` 指定的输出文件

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
options	Object	CLI 参数解析结果（format/output/facts/verbose + 命令特定字段）
result	Object	命令输出统一结构：{command, success, data} 或 {command, success:false, error}

关键常量/枚举

- `--format json|markdown`：输出格式（关键词：`formatMarkdown`）

错误码/异常策略

- 直接抛错并在 `main()` 捕获：打印 stack 后 `process.exit(1)`（关键词：`执行失败`）。

与其他模块的协作

上游谁调用我

- 人/CI：`node AD21_JS_Project/analyzer/semantic-workflow.js <command> ...`

我调用谁

- 能力索引：CapabilityIndexBuilder/CapabilityQueryValidator
- 语义分析：SemanticAnalyzer
- 解释与计划：Interpreter → ActionPlanner

调用链路图（文字即可）

- CLI 命令 -> SemanticWorkflow.executeCommand -> (CapabilityIndexBuilder/Validator | SemanticAnalyzer | Interpreter -> ActionPlanner) -> outputResult

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/test-query-apis.js
- AD21_JS_Project/analyzer/test-stage5-integration.js
- AD21_JS_Project/analyzer/test-stage6-closed-loop.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/semantic-workflow.js list-modules`
- `node AD21_JS_Project/analyzer/semantic-workflow.js validate-capability`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 由下游脚本生成：`AD21_JS_Project/analyzer/reports/*.md|*.json`（例如 capability-query-validation）

已知问题与 TODO

已知坑点（必须可复现）

- 默认 `--facts` 指向 `reports/capability-index-v1.json`，若未先运行能力索引构建会报错（线索：`AD21_JS_Project/analyzer/semantic-workflow.js` 关键词：`能力索引文件不存在`）。

TODO（按优先级）

- 未确认：`can-access`/`predict-impact` 的权限与风险规则是否需要引入跨模块依赖分析（线索：`AD21_JS_Project/analyzer/semantic-workflow.js` 关键词：`risk`）。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

