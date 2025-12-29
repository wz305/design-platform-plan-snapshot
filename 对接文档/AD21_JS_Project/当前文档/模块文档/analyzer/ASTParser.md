模块定位

一句话：用 acorn 以 ES3 配置解析源码为 AST，并提供批量解析与 AST 结构校验，不负责语义规则推断与修复。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/ast/parser.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ASTParser	Object	-	-	Node	读文件	模块导出对象
parseFile	Function	filePath:string	Object	Node	读文件	返回 {success,ast,source,size} 或 {success:false,error,line,column}
parseFiles	Function	filePaths:Array	Object	Node	读文件	批量解析并汇总 successCount/errorCount
validateAST	Function	ast:Object	Object	Node	无	返回 {valid:boolean,issues:Array}
getFileInfo	Function	filePath:string	Object	Node	读文件	返回 {filePath,exists,size,ext}（关键词：getFileInfo）
formatParseError	Function	parseResult:Object	string	Node	无	将解析失败结果格式化为文本

最小使用示例：3~10 行，能跑

```js
var ASTParser = require("./analyzer/ast/parser");
var r = ASTParser.parseFile("AD21_JS_Project/src/core/module-accessor.js");
console.log(r.success, r.ast && r.ast.type);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- npm: acorn：提供 `acorn.parse`（配置为 `ecmaVersion:3`）
- Node 内置：fs/path：读取文件与路径信息

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node + 已安装依赖 `acorn`

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中使用（Node-only）。

运行行为

初始化时做什么

- 定义 `_ES3_OPTIONS`（ecmaVersion=3, locations/ranges=true）；无动态初始化。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；仅返回解析结果对象。

副作用：创建对象、修改全局、注册事件、写文件等

- 读取输入文件内容（utf8）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_ES3_OPTIONS	Object	acorn 解析配置（关键词：`ecmaVersion: 3`）
parseResult	Object	{success,filePath,ast,source,size} 或 {success:false,error,line,column}

关键常量/枚举

- `ecmaVersion: 3`（ES3 解析模式）

错误码/异常策略

- parse 异常：捕获并返回 `success:false`，并尽量携带 `error.loc` 的 line/column。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic/semantic-analyzer.js（Stage 2）
- AD21_JS_Project/analyzer/build-symbols-overview.js、global-variable-* 等工具脚本

我调用谁

- acorn

调用链路图（文字即可）

- 文件路径 -> fs.readFileSync -> acorn.parse(ES3_OPTIONS) -> ASTParser.parseFile 返回

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/basic-test.js
- AD21_JS_Project/analyzer/tests/test-files/syntax-error.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/basic-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- ASTParser 本身不产出报告；上游工具可能写入 `AD21_JS_Project/analyzer/reports/`。

已知问题与 TODO

已知坑点（必须可复现）

- 解析选项 `allowReturnOutsideFunction:false` 会把顶层 return 视为错误（线索：`AD21_JS_Project/analyzer/ast/parser.js` 关键词：`allowReturnOutsideFunction`）。

TODO（按优先级）

- 未确认：是否需要提供“仅验证不返回 source”的轻量模式以减少内存（线索：`parseFile` 返回 `source`）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

