模块定位

一句话：基于 AST/符号信息推导模块依赖与函数调用关系，支持循环依赖检测与依赖图/报告生成，不负责 ESLint/解析与修复。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/dependency-analyzer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
DependencyAnalyzer	Object	-	-	Node	无	模块导出对象
analyzeModuleDependencies	Function	ast:Object, filePath:string	Object	Node	无	分析 require/依赖（线索：实现关键字 `require`）
analyzeFunctionCalls	Function	ast:Object, filePath:string	Object	Node	无	提取函数调用关系
detectCircularDependencies	Function	dependencyGraph:Object	Object	Node	无	检测循环依赖并给出环
buildDependencyGraph	Function	moduleResults:Array	Object	Node	无	构建依赖图（nodes/edges）
generateDependencyReport	Function	graph:Object	string	Node	无	格式化依赖报告

最小使用示例：3~10 行，能跑

```js
var ASTParser = require("./analyzer/ast/parser");
var DependencyAnalyzer = require("./analyzer/semantic/dependency-analyzer");
var r = ASTParser.parseFile("AD21_JS_Project/analyzer/semantic/semantic-analyzer.js");
console.log(DependencyAnalyzer.analyzeFunctionCalls(r.ast, r.filePath).summary.totalCalls);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无硬依赖；输入为 AST/模块名/扫描结果（与 ASTParser、SemanticAnalyzer 的数据结构耦合）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把“ESLint/语法门禁”逻辑写进依赖分析；应由 ESLintRunner 负责。

运行行为

初始化时做什么

- 无初始化；纯分析函数。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；返回对象/报告字符串。

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
dependencyGraph	Object	{nodes:Array,edges:Array,summary:Object}（未确认：精确字段以实现为准）
circular	Object	{hasCircular:boolean,cycles:Array}

关键常量/枚举

- 无

错误码/异常策略

- 未确认：对异常 AST 的处理方式（线索：`try/catch` 使用情况）。

与其他模块的协作

上游谁调用我

- SemanticAnalyzer.analyzeProject（Stage 4）

我调用谁

- 无

调用链路图（文字即可）

- AST -> DependencyAnalyzer.analyze* -> dependencyGraph -> detectCircularDependencies

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/dependency-test.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/dependency-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 上游可能落盘到 `AD21_JS_Project/analyzer/reports/`（未确认：具体脚本与文件名）。

已知问题与 TODO

已知坑点（必须可复现）

- 依赖识别可能基于启发式（例如 require 的形态）；对动态 require/别名导入的覆盖范围未确认（线索：`AD21_JS_Project/analyzer/semantic/dependency-analyzer.js` 关键词：`require`）。

TODO（按优先级）

- 增补：对 `module.exports`/IIFE 导出关系的更精确建模（与 TopLevelScanner/ProjectIndex 协作点）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

