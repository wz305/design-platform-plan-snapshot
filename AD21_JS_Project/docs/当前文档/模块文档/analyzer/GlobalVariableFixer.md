模块定位

一句话：全局变量提取修复分析工具，负责验证“1359个数字变量是否为误报”并输出对比/建议报告，不负责直接改写其它模块代码（仅生成报告）。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/global-variable-fixer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
GlobalVariableFixer	Object	-	-	Node	读写文件/console输出	主导出对象（module.exports）
GlobalVariableFixer.fixGlobalVariables	Function	-	report:Object	Node	读 dist 写 analyzer/reports 输出 console	对比“当前方法 vs 正确作用域分析”并生成报告

最小使用示例：3~10 行，能跑

```js
// Node 环境（建议在仓库根目录运行）
var Fixer = require("./analyzer/global-variable-fixer");
var report = Fixer.fixGlobalVariables();
console.log(report.comparison.improvementRate);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/ast/parser.js：解析构建文件临时副本（关键词：`ASTParser.parseFile`）
- Node 内置：fs/path：读 dist，写 reports，创建临时目录

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 输入：`AD21_JS_Project/dist/main_utf8.js`
- 临时目录：`AD21_JS_Project/analyzer/temp/`（关键词：`path.join(__dirname, \"temp\")`）
- 输出：
  - `AD21_JS_Project/analyzer/reports/global-variable-fix.json`
  - `AD21_JS_Project/analyzer/reports/global-variable-fix.md`

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中运行（依赖 Node fs/path/require）。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出对比统计与结论（包含“确认：1359个数字变量是误报”路径）。
- 文件：写入 `analyzer/reports/global-variable-fix.(json|md)`。

副作用：创建对象、修改全局、注册事件、写文件等

- 创建临时文件 `analyzer/temp/build-analysis*.js`（执行后会尝试删除，但目录保留）。
- 写报告文件。

数据结构与约定

关键对象结构（字段表）

- report.problemAnalysis：当前方法提取的变量概览与“问题区域”统计
- report.correctExtraction：按作用域分析后的 globals/functionScoped/blockScoped + numericVariables
- report.comparison：`currentMethodCount`/`correctMethodCount`/`falsePositives[]`/`improvementRate`
- report.recommendations[]：修复建议与结论

关键常量/枚举

- 数字变量判定：`/^\\d+$/`
- 作用域判断：使用 traverse 时携带 `inFunction` + `parentType === \"Program\"`（关键词：`_isGlobalVariable`）

错误码/异常策略

- `require.main === module` 入口：失败会 `process.exit(1)`。
- 内部遇到解析失败会输出 console 并返回不完整结果（未确认：是否会导致下游误判）。

与其他模块的协作

上游谁调用我

- 可作为脚本运行：`node analyzer/global-variable-fixer.js`

我调用谁

- ASTParser.parseFile

调用链路图（文字即可）

- dist/main_utf8.js → GlobalVariableFixer.fixGlobalVariables → analyzer/reports/global-variable-fix.*

测试与验证

关联测试脚本（路径）

- 未提供专用 test；建议作为手动分析脚本运行验证。

如何在 Node 跑

- `node analyzer/global-variable-fixer.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/global-variable-fix.json`
- `AD21_JS_Project/analyzer/reports/global-variable-fix.md`

已知问题与 TODO

已知坑点（必须可复现）

- 报告结论包含“0 个数字命名全局变量”的判断逻辑依赖当前实现的作用域分析；若 ASTParser 行为改变可能影响结论（定位：`analyzer/global-variable-fixer.js`，关键词：`numericVariables.length === 0`）。

TODO（按优先级）

- 未确认：把“修复后的提取逻辑”落到真正的符号提取/能力索引构建流程中（可能关联 `analyzer/capability-index-builder.js`）。

变更记录

- 2025-12-17 语义系统1.0

