模块定位

一句话：整合 ESLint 语言门禁、AST 解析与顶层语义扫描，提供文件/批量/项目级语义分析与报告生成，不负责代码修改与自动修复。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/semantic-analyzer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
SemanticAnalyzer	Object	-	-	Node	console输出	模块导出对象
analyzeFile	Function	filePath:string	Promise<Object>	Node	读文件/console输出	对单文件执行 ESLint->AST->TopLevel 扫描（Stage 1~3）
analyzeFiles	Function	filePaths:Array	Promise<Object>	Node	读文件/console输出	对多个文件执行分析并汇总
analyzeProject	Function	filePaths:Array	Promise<Object>	Node	读文件/console输出	项目级汇总：依赖、索引、调用图、Def-Use（Stage 4/5）
generateReport	Function	stageResult:Object	reportText:string	Node	无	将分析结果格式化为文本报告
generateBatchReport	Function	batchResult:Object	reportText:string	Node	无	将批量结果格式化为文本报告
generateProjectReport	Function	projectResult:Object	reportText:string	Node	无	将项目结果格式化为文本报告

最小使用示例：3~10 行，能跑

```js
// Node 环境
var SemanticAnalyzer = require("./analyzer/semantic/semantic-analyzer");
SemanticAnalyzer.analyzeFile("AD21_JS_Project/src/core/module-accessor.js").then(function(r){ console.log(r.success); });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/eslint/eslint-runner.js：Stage 1 语言门禁（validateFile）
- AD21_JS_Project/analyzer/ast/parser.js：Stage 2 AST 解析（parseFile）
- AD21_JS_Project/analyzer/semantic/top-level-scanner.js：Stage 3 顶层符号扫描（scanTopLevelSymbols）
- AD21_JS_Project/analyzer/semantic/symbol-types.js：符号/诊断结构与常量（SymbolTypes）
- AD21_JS_Project/analyzer/semantic/dependency-analyzer.js：Stage 4 依赖/调用关系分析
- AD21_JS_Project/analyzer/semantic/project-index.js：Stage 4 工程符号表/冲突检测
- AD21_JS_Project/analyzer/semantic/call-graph.js：Stage 4/5 调用图构建与分析
- AD21_JS_Project/analyzer/semantic/def-use-analyzer.js：Stage 5 Def-Use 分析与影响查询
- Node 内置：fs/path：项目目录/文件存在性检查与摘要输出

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node + ESLint + acorn（由下游模块 require）
- console：大量进度输出（关键词：`Stage 1/2/3`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载（大量 Node 依赖与 async/await）。

运行行为

初始化时做什么

- 无显式初始化；运行时按需调用各 Stage 组件。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：打印每个阶段进度与汇总
- 文件：本模块本身不写文件（报告为字符串返回）；如需落盘由上游脚本负责（未确认：是否存在其它调用方写入）

副作用：创建对象、修改全局、注册事件、写文件等

- 读取待分析源码文件
- 触发 ESLintRunner 初始化 ESLint 实例（间接副作用）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
analysisResult	Object	analyzeFile 返回：{success,filePath,stages,symbols,diagnostics,summary}
diagnostic	Object	标准化诊断：{severity,filePath,line,column,message,rule,source}
projectResult	Object	analyzeProject 汇总：含 dependencyGraph/callGraphs/defUseAnalysis（关键词：`Stage 4/5`）

关键常量/枚举

- 诊断规则来自 SymbolTypes.DiagnosticRule（线索：`AD21_JS_Project/analyzer/semantic/symbol-types.js`）

错误码/异常策略

- 遇到 ESLint/AST 失败：`success=false` 并提前返回（不抛出到调用方；关键词：`跳过后续分析`）。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic-workflow.js（`analyze-project`）
- demo/test 脚本：`AD21_JS_Project/analyzer/demo-semantic-analysis.js`、`AD21_JS_Project/analyzer/tests/*.js`

我调用谁

- ESLintRunner -> ASTParser -> TopLevelScanner -> (DependencyAnalyzer/ProjectIndex/CallGraph/DefUseAnalyzer)

调用链路图（文字即可）

- 文件列表 -> SemanticAnalyzer.analyzeProject -> Stage1 ESLintRunner -> Stage2 ASTParser -> Stage3 TopLevelScanner -> Stage4/5 分析器 -> report生成

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/semantic-test.js
- AD21_JS_Project/analyzer/tests/integration-test.js
- AD21_JS_Project/analyzer/demo-semantic-analysis.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/semantic-test.js`
- `node AD21_JS_Project/analyzer/demo-semantic-analysis.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 本模块返回字符串报告；落盘通常在 `AD21_JS_Project/analyzer/reports/`（由上游工具写入，未确认：具体调用点）

已知问题与 TODO

已知坑点（必须可复现）

- `analyzeProject` 内部会合并调用图时使用 `Map/Object.assign/Array.find` 等特性（Node 可用；若需要兼容更老 Node 需确认版本；线索：`AD21_JS_Project/analyzer/semantic/semantic-analyzer.js` 关键词：`new Map`）。

TODO（按优先级）

- 未确认：Stage 4/5 各子分析器的错误传播策略是否需要统一为 diagnostics（线索：`AD21_JS_Project/analyzer/semantic/semantic-analyzer.js` 关键词：`success`）。

变更记录

- 2025-12-17	语义系统1.0
- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

