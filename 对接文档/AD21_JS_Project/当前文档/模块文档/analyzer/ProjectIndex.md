模块定位

一句话：工程级符号表（索引）与冲突检测器，支持符号添加/查询/导出报告，不负责 AST 扫描与依赖/调用图分析。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/project-index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ProjectIndex	Object	-	-	Node	无	模块导出对象
createIndex	Function	-	index:Object	Node	无	创建空索引（含 metadata/collections）
addSymbol	Function	index:Object, symbol:Object	Object	Node	修改 index	添加单符号并更新元数据/冲突
addSymbols	Function	index:Object, symbols:Array	Object	Node	修改 index	批量添加
findSymbols	Function	index:Object, query:Object	Array	Node	无	按查询过滤符号
findSymbolsByScope	Function	index:Object, scope:string	Array	Node	无	按 scope 查询
findUnusedSymbols	Function	index:Object	Array	Node	无	筛未使用符号（启发式）
findSymbolUsages	Function	index:Object, symbolName:string	Array	Node	无	查 usages（依赖符号字段）
analyzeVisibility	Function	index:Object	Object	Node	无	可见性分析
generateIndexReport	Function	index:Object	string	Node	无	生成可读报告
exportToJSON	Function	index:Object	json:Object	Node	无	导出为 JSON 结构

最小使用示例：3~10 行，能跑

```js
var ProjectIndex = require("./analyzer/semantic/project-index");
var idx = ProjectIndex.createIndex();
ProjectIndex.addSymbol(idx, { name: "Foo", kind: "function", scope: "file" });
console.log(idx.metadata.totalSymbols);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式依赖；与 SymbolTypes/TopLevelScanner 的符号字段约定耦合（未确认：字段完整性）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 ProjectIndex 中读取文件/遍历目录；输入应由上游扫描器提供。

运行行为

初始化时做什么

- createIndex 初始化 collections 与 metadata（关键词：`metadata`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；报告/JSON 由调用方决定是否落盘。

副作用：创建对象、修改全局、注册事件、写文件等

- addSymbol/addSymbols 会修改传入 index（in-place）。

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
index	Object	{symbols,modules,functions,globals,conflicts,metadata}
metadata	Object	{totalSymbols,totalModules,totalFunctions,totalGlobals,totalConflicts,lastUpdated}
conflict	Object	冲突项（name-conflict 等；线索：`detectSymbolConflicts`）

关键常量/枚举

- 无

错误码/异常策略

- 以返回值/冲突列表表达，不抛出异常为主（未确认：对非法输入的行为）。

与其他模块的协作

上游谁调用我

- SemanticAnalyzer.analyzeProject（Stage 4）

我调用谁

- 无

调用链路图（文字即可）

- TopLevelScanner.symbols -> ProjectIndex.addSymbols -> index.report/json -> 上游写报告

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/integration-test.js（间接覆盖）

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/integration-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 上游可能写入 `AD21_JS_Project/analyzer/reports/`（未确认：具体写入点）。

已知问题与 TODO

已知坑点（必须可复现）

- 冲突检测依赖符号对象的字段一致性；如果扫描器输出字段缺失可能导致误判（线索：`AD21_JS_Project/analyzer/semantic/project-index.js` 关键词：`detectSymbolConflicts`）。

TODO（按优先级）

- 增补：为 symbol.kind/scope 统一对齐 SymbolTypes（当前使用字符串常量，未确认：是否统一）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

