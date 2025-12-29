模块定位

一句话：Def-Use（定义-使用）分析器，产出定义点/使用点/未使用/未定义与影响查询，不负责 AST 解析与 ESLint 门禁。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/def-use-analyzer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
DefUseAnalyzer	Object	-	-	Node	无	模块导出对象
UseType	Object	-	-	Node	无	Use 类型枚举（变量/函数调用等）
Confidence	Object	-	-	Node	无	置信度枚举（high/medium/low）
PathTag	Object	-	-	Node	无	路径标签枚举/常量（用于分类）
analyzeDefUse	Function	ast:Object, filePath:string	Object	Node	无	执行 Def-Use 分析并返回结构化结果
generateDefUseReport	Function	defUseResult:Object	string	Node	无	格式化报告
getDefs	Function	defUseResult:Object	Array	Node	无	查询定义点
getUses	Function	defUseResult:Object	Array	Node	无	查询使用点
getUnusedSymbols	Function	defUseResult:Object	Array	Node	无	查询未使用定义
getUndefinedUses	Function	defUseResult:Object	Array	Node	无	查询未定义使用
queryImpact	Function	defUseResult:Object, symbolName:string	Object	Node	无	影响评估（downstreamCount/riskLevel）

最小使用示例：3~10 行，能跑

```js
var ASTParser = require("./analyzer/ast/parser");
var DefUseAnalyzer = require("./analyzer/semantic/def-use-analyzer");
var r = ASTParser.parseFile("AD21_JS_Project/src/core/global-events.js");
var du = DefUseAnalyzer.analyzeDefUse(r.ast, r.filePath);
console.log(du.summary && du.summary.undefinedUses);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式 require；输入为 AST（acorn）与 filePath
- 与 SymbolTypes/TopLevelScanner 的符号命名与范围字段约定耦合（未确认：一致性）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 DefUseAnalyzer 内读取文件或执行 ESLint；应由上游完成。

运行行为

初始化时做什么

- 定义枚举与分析函数；无动态初始化。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；返回结果/报告字符串。

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
defUseResult	Object	{filePath,definitions,uses,summary,diagnostics?}（未确认：完整字段以实现为准）
definition	Object	{symbolName,definitionType,loc,...}
use	Object	{symbolName,useType,loc,...}
impact	Object	{definition,uses,downstreamCount,riskLevel}

关键常量/枚举

- UseType / Confidence / PathTag（详见导出表）

错误码/异常策略

- 以 diagnostics/summary 形式表达；未确认：是否会对非法 AST throw（线索：实现 try/catch 分布）。

与其他模块的协作

上游谁调用我

- SemanticAnalyzer.analyzeProject（Stage 5）
- Stage6 Interpreter 规则可能基于 Def-Use Facts（未确认：实际数据对接）

我调用谁

- 无

调用链路图（文字即可）

- AST -> DefUseAnalyzer.analyzeDefUse -> (defs/uses/summary) -> queryImpact -> Stage6/Planner

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/def-use-test.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/def-use-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 无直接产出；上游可能写入 `AD21_JS_Project/analyzer/reports/`（未确认：写入脚本）。

已知问题与 TODO

已知坑点（必须可复现）

- 文件中出现大量“乱码注释”可能影响文档阅读但不影响 Node 执行（线索：`AD21_JS_Project/analyzer/semantic/def-use-analyzer.js` 尾部注释字符集）。

TODO（按优先级）

- 对接：把 queryImpact 输出标准化为 Stage5 Facts（线索：`AD21_JS_Project/analyzer/Stage5-Facts使用约定.md`）。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

