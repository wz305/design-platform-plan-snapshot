模块定位

一句话：从 AST/函数集合中构建调用图并做分析（入口/深度/死代码/递归/路径），不负责跨文件依赖扫描与修复建议。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/call-graph.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
CallGraph	Object	-	-	Node	无	模块导出对象
createCallGraph	Function	-	graph:Object	Node	无	创建空调用图
buildCallGraph	Function	ast:Object, filePath:string	graph:Object	Node	无	从 AST 构建节点/边
analyzeCallGraph	Function	graph:Object	void	Node	修改 graph	补充 in/outDegree、entryPoints、maxCallDepth 等
findCallPaths	Function	graph:Object, from:string, to:string	Array	Node	无	寻找调用路径
detectDeadCode	Function	graph:Object	Object	Node	无	检测不可达节点
calculateCallDepth	Function	graph:Object, entry:string	number	Node	无	计算调用深度
detectRecursion	Function	graph:Object	Object	Node	无	检测递归/环
generateCallGraphReport	Function	graph:Object	string	Node	无	格式化报告

最小使用示例：3~10 行，能跑

```js
var ASTParser = require("./analyzer/ast/parser");
var CallGraph = require("./analyzer/semantic/call-graph");
var r = ASTParser.parseFile("AD21_JS_Project/src/core/global-events.js");
var g = CallGraph.buildCallGraph(r.ast, r.filePath);
CallGraph.analyzeCallGraph(g);
console.log(g.metadata && g.metadata.maxCallDepth);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式依赖；输入为 acorn AST 与函数集合（内部遍历 AST，使用 Array.find/Object.assign 等）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把“导出/模块接口”解析塞进 CallGraph；应由 TopLevelScanner/BuildSymbolsOverview 负责。

运行行为

初始化时做什么

- createCallGraph 初始化 graph 结构与 metadata。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；返回图结构与报告字符串。

副作用：创建对象、修改全局、注册事件、写文件等

- analyzeCallGraph 会就地修改 graph（补齐统计字段）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
graph	Object	{nodes:Array,edges:Array,metadata:Object}
node	Object	{name,type,range?,inDegree,outDegree,isEntry?}
edge	Object	{source,target,type?,location?}

关键常量/枚举

- 无

错误码/异常策略

- 未确认：异常 AST 时的处理策略（线索：是否有 try/catch 包裹遍历）。

与其他模块的协作

上游谁调用我

- SemanticAnalyzer.analyzeProject（Stage 4）

我调用谁

- 无

调用链路图（文字即可）

- AST -> CallGraph.buildCallGraph -> CallGraph.analyzeCallGraph -> deadCode/recursion/path 查询

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/integration-test.js（间接覆盖）

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/integration-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 无直接产出；上游可能写入 `AD21_JS_Project/analyzer/reports/`。

已知问题与 TODO

已知坑点（必须可复现）

- 使用了 `Array.find/Object.assign`（需要现代 Node；线索：`AD21_JS_Project/analyzer/semantic/call-graph.js` 关键词：`Object.assign`）。

TODO（按优先级）

- 补充：跨文件调用（require/import）边的建模（与 DependencyAnalyzer 协作）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

