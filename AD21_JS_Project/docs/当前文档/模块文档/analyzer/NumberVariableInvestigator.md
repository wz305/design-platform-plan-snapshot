模块定位

一句话：数字变量深度调查工具，负责从构建产物中枚举数组/对象访问模式等“可能导致数字变量误报”的线索并输出调查报告，不负责修复 AST 解析器或符号提取器。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/number-variable-investigator.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
NumberVariableInvestigator	Object	-	-	Node	读写文件/console输出	主导出对象（module.exports）
NumberVariableInvestigator.investigate	Function	-	report:Object	Node	读 dist 写 analyzer/reports 输出 console	调查数组访问/对象访问/可疑 var 声明等模式

最小使用示例：3~10 行，能跑

```js
// Node 环境（建议在仓库根目录运行）
var Inv = require("./analyzer/number-variable-investigator");
var report = Inv.investigate();
console.log(report.summary.arrayAccessPatterns);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- Node 内置：fs/path：读构建文件，写报告文件

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 输入：`AD21_JS_Project/dist/main_utf8.js`（关键词：`var filePath = \"dist/main_utf8.js\"`）
- 输出：
  - `AD21_JS_Project/analyzer/reports/number-variable-investigation.json`
  - `AD21_JS_Project/analyzer/reports/number-variable-investigation.md`

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境运行。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出各阶段统计（数组访问/对象访问/可疑模式等）。
- 文件：写入 `analyzer/reports/number-variable-investigation.(json|md)`（关键词：`_saveInvestigationReport`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 读/写文件；不会修改源文件。

数据结构与约定

关键对象结构（字段表）

- report.findings.builtFileInvestigation：包含
  - `arrayAccessPatterns[]`：匹配 `\\w+[(\\d+)]`
  - `objectAccessPatterns[]`：匹配 `\\w+.(\\d+)`
  - `numberReferences[]`：匹配行首 `^\\s*(\\d+)\\s*[=;]`
  - `suspiciousPatterns[]`：包含 `var` 且含数字的行
- report.summary：聚合数量与关键判断（关键词：`if (arrayAccessPatterns > 1000 && numberReferences === 0)`）

关键常量/枚举

- 数组访问匹配：`/\\w+\\[(\\d+)\\]/g`
- 对象访问匹配：`/\\w+\\.(\\d+)/g`

错误码/异常策略

- `require.main === module` 入口：失败会 `process.exit(1)`。

与其他模块的协作

上游谁调用我

- 可作为脚本运行：`node analyzer/number-variable-investigator.js`

我调用谁

- 无（基于正则扫描文本）。

调用链路图（文字即可）

- dist/main_utf8.js → NumberVariableInvestigator.investigate → analyzer/reports/number-variable-investigation.*

测试与验证

关联测试脚本（路径）

- 未提供专用 test；作为手动分析脚本使用。

如何在 Node 跑

- `node analyzer/number-variable-investigator.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/number-variable-investigation.json`
- `AD21_JS_Project/analyzer/reports/number-variable-investigation.md`

已知问题与 TODO

已知坑点（必须可复现）

- 调查仅覆盖 `dist/main_utf8.js`，不会自动切换到 `dist/main.js`（定位：`analyzer/number-variable-investigator.js`，关键词：`var filePath`）。

TODO（按优先级）

- 未确认：将调查范围扩展到 `dist/main.js`，并对比两者差异（数字索引模式是否一致）。

变更记录

- 2025-12-17 语义系统1.0

