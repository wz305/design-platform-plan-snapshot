模块定位

一句话：从 AST 中扫描顶层符号（IIFE 模块、DFM 全局函数、顶层函数/变量等）并输出诊断信息，不负责跨文件依赖与调用图推导。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/semantic/top-level-scanner.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
TopLevelScanner	Object	-	-	Node	无	模块导出对象
scanTopLevelSymbols	Function	ast:Object, filePath:string	Object	Node	无	返回 {filePath,symbols,diagnostics,summary}
scanFiles	Function	fileScanResults:Array	Object	Node	无	对多个 parseResult 进行扫描并汇总
isIIFEModule	Function	ast:Object	boolean	Node	无	判断是否 IIFE 模块（线索：关键词 `IIFE`）
isDFMFunction	Function	node:Object	boolean	Node	无	判断是否 DFM 全局函数
isTopLevelFunction	Function	node:Object	boolean	Node	无	判断是否顶层 FunctionDeclaration
formatScanResult	Function	result:Object	string	Node	无	格式化扫描结果文本

最小使用示例：3~10 行，能跑

```js
var ASTParser = require("./analyzer/ast/parser");
var TopLevelScanner = require("./analyzer/semantic/top-level-scanner");
var r = ASTParser.parseFile("AD21_JS_Project/src/core/global-events.js");
console.log(TopLevelScanner.scanTopLevelSymbols(r.ast, r.filePath).summary.totalSymbols);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式外部依赖（输入为 acorn AST）；与 ASTParser/语义分析器通过数据结构耦合

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 不依赖文件系统；仅处理传入 AST。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把它当作“跨文件依赖分析器”；跨模块依赖应由 DependencyAnalyzer 负责。

运行行为

初始化时做什么

- 无初始化；纯函数式扫描。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；可由上游选择输出 formatScanResult 的文本。

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
symbol	Object	扫描产物：{name,kind,scope,range,metadata?}（未确认：完整字段以实现为准，线索：`symbols.push`）
diagnostic	Object	{severity,filePath,line,column,message,rule}

关键常量/枚举

- 未确认：诊断 rule 名称列表（线索：`AD21_JS_Project/analyzer/semantic/top-level-scanner.js` 关键词：`rule:`）

错误码/异常策略

- 以 diagnostics 的形式返回，不抛出异常为主（未确认：特定输入是否会 throw）。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic/semantic-analyzer.js（Stage 3）

我调用谁

- 无

调用链路图（文字即可）

- ASTParser.parseFile -> TopLevelScanner.scanTopLevelSymbols -> (symbols/diagnostics) -> SemanticAnalyzer 汇总

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/semantic-test.js
- AD21_JS_Project/analyzer/tests/test-files/valid-iife-module.js
- AD21_JS_Project/analyzer/tests/test-files/valid-dfm-function.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/semantic-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- 无直接产出；由上游工具写入 `AD21_JS_Project/analyzer/reports/`（未确认：具体脚本）。

已知问题与 TODO

已知坑点（必须可复现）

- 对“DFM 事件函数”的识别依赖命名/结构启发式（未确认：规则边界；线索：`isDFMFunction` 实现）。

TODO（按优先级）

- 未确认：是否需要导出“符号冲突检测”能力（当前由 ProjectIndex 承担）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

