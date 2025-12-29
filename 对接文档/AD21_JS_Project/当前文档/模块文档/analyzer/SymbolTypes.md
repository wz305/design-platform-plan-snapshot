模块定位

一句话：定义语义系统的“符号/诊断”数据模型与枚举常量，并提供创建/校验/描述工具，不负责扫描与分析流程控制。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/symbol-types.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
SymbolTypes	Object	-	-	Node	无	模块导出对象
SymbolKind	Object	-	-	Node	无	符号类型枚举
Visibility	Object	-	-	Node	无	可见性枚举
LifecyclePhase	Object	-	-	Node	无	生命周期阶段枚举
Severity	Object	-	-	Node	无	诊断严重性枚举
DiagnosticRule	Object	-	-	Node	无	诊断规则枚举/常量
createBaseSymbol	Function	params:Object	Object	Node	无	创建基础符号
createModuleSymbol	Function	name:string, meta:Object	Object	Node	无	创建模块符号
createExecutionEntrySymbol	Function	name:string, meta:Object	Object	Node	无	创建执行入口符号
createExportedMemberSymbol	Function	name:string, meta:Object	Object	Node	无	创建导出成员符号
createInternalMemberSymbol	Function	name:string, meta:Object	Object	Node	无	创建内部成员符号
createDiagnostic	Function	params:Object	Object	Node	无	创建诊断对象
createErrorDiagnostic	Function	params:Object	Object	Node	无	创建 error 诊断
createWarningDiagnostic	Function	params:Object	Object	Node	无	创建 warning 诊断
validateSymbol	Function	symbol:Object	Object	Node	无	返回 {valid,issues}
validateDiagnostic	Function	diagnostic:Object	Object	Node	无	返回 {valid,issues}
getSymbolDescription	Function	symbol:Object	string	Node	无	生成可读描述

最小使用示例：3~10 行，能跑

```js
var SymbolTypes = require("./analyzer/semantic/symbol-types");
var s = SymbolTypes.createModuleSymbol("LoggerModule", { filePath: "dist/main_utf8.js", line: 1 });
console.log(SymbolTypes.getSymbolDescription(s));
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式依赖；为语义系统其余模块提供统一数据结构

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把业务逻辑写进 SymbolTypes；应保持为纯数据模型。

运行行为

初始化时做什么

- 定义枚举常量与工厂函数；无动态初始化。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
symbol	Object	至少包含 {name,kind,visibility,scope,range?,metadata?}
diagnostic	Object	至少包含 {severity,filePath,line?,column?,message,rule}

关键常量/枚举

- SymbolKind / Visibility / Severity / DiagnosticRule（详见导出表）

错误码/异常策略

- validate* 返回 issues 数组，不抛出异常为主。

与其他模块的协作

上游谁调用我

- TopLevelScanner/ProjectIndex/DependencyAnalyzer/DefUseAnalyzer 等：构造符号与诊断

我调用谁

- 无

调用链路图（文字即可）

- 分析器 -> SymbolTypes.create* -> 统一符号结构 -> 上游汇总/报告

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/semantic-test.js（间接覆盖：扫描结果使用 SymbolTypes 结构，未确认：是否直接 assert）

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/semantic-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：各分析器是否完全遵循 SymbolTypes 的 validate 约束（线索：调用方是否使用 `validateSymbol/validateDiagnostic`）。

TODO（按优先级）

- 增补：为更多“语义事实”定义统一 schema（线索：Stage5 Facts 文档 `AD21_JS_Project/analyzer/Stage5-Facts使用约定.md`）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

