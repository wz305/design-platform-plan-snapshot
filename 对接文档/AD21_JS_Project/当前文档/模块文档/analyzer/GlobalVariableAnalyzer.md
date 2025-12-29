模块定位

一句话：全局变量来源分析工具，负责从构建产物（dist/*）与源文件（merge-order.json 列表）提取 `var` 声明并生成报告，不负责修复提取逻辑或改写源码。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/global-variable-analyzer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
GlobalVariableAnalyzer	Object	-	-	Node	读写文件/console输出	主导出对象（module.exports）
GlobalVariableAnalyzer.runAnalysis	Function	-	report:Object	Node	读 dist/config 写 analyzer/reports 输出 console	完整流程：built→source→report→save

最小使用示例：3~10 行，能跑

```js
// Node 环境（建议在仓库根目录运行）
var Analyzer = require("./analyzer/global-variable-analyzer");
var report = Analyzer.runAnalysis();
console.log(report.summary.totalVariables);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/ast/parser.js：用于解析临时 JS 文件并得到 AST（关键词：`ASTParser.parseFile`）
- Node 内置：fs/path：读取 dist/config，创建临时文件与写报告

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- `AD21_JS_Project/dist/main_utf8.js` / `AD21_JS_Project/dist/main.js`：构建产物输入（关键词：`builtFiles`）
- `AD21_JS_Project/config/merge-order.json`：源文件列表输入（关键词：`mergeOrder`）
- 写入：
  - `AD21_JS_Project/analyzer/reports/global-variable-analysis.json`
  - `AD21_JS_Project/analyzer/reports/global-variable-analysis.md`
- 临时目录：对每个被解析文件在其目录下创建 `temp/` 并写入 `*.temp.js`（关键词：`path.join(path.dirname(filePath), \"temp\")`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中运行（依赖 Node fs/path/require）。

运行行为

初始化时做什么

- 无；被 require 时仅定义对象与函数。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出分析进度、统计与报告保存路径。
- 文件：写入 `analyzer/reports/global-variable-analysis.(json|md)`。

副作用：创建对象、修改全局、注册事件、写文件等

- 读/写文件；创建并删除临时文件；可能创建 `temp/` 目录（不会主动清理目录本身）。

数据结构与约定

关键对象结构（字段表）

- report.summary：`{ totalFiles, totalVariables, numberVariables, otherVariables, topContributors[] }`
- report.variableCategories：`{ numbers: {}, strings: {}, functions: {}, others: {} }`
- 变量条目：`{ name, type, line, depth, filePath }`（来自 `_extractGlobalVariables`）

关键常量/枚举

- 数字变量判定：正则 `/^\\d+$/`（关键词：`numberVars`/`numberKeys`）

错误码/异常策略

- 内部对单文件分析失败会 `console.log` 并继续其他文件（关键词：`try { ... } catch (error) { ... continue }`）。
- `require.main === module` 入口：失败会 `process.exit(1)`。

与其他模块的协作

上游谁调用我

- 可直接作为 CLI 脚本运行：`node analyzer/global-variable-analyzer.js`（关键词：`require.main === module`）
- 也可被其他分析脚本 require 调用（导出对象）。

我调用谁

- ASTParser.parseFile（通过临时文件解析）

调用链路图（文字即可）

- dist/main*.js + config/merge-order.json → GlobalVariableAnalyzer.runAnalysis → analyzer/reports/global-variable-analysis.*

测试与验证

关联测试脚本（路径）

- 未提供专用 test；可参考 analyzer/tests 或 demo 脚本作为手动验证入口（未确认）。

如何在 Node 跑

- `node analyzer/global-variable-analyzer.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/global-variable-analysis.json`
- `AD21_JS_Project/analyzer/reports/global-variable-analysis.md`

已知问题与 TODO

已知坑点（必须可复现）

- 临时目录创建在每个被解析文件的同级目录下（`temp/`），可能污染源目录（定位：`analyzer/global-variable-analyzer.js`，关键词：`path.dirname(filePath)`）。

TODO（按优先级）

- 未确认：将临时文件统一放到 `analyzer/temp/`，并提供清理命令/选项。

变更记录

- 2025-12-17 语义系统1.0

