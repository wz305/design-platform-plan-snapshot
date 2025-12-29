模块定位

一句话：数字变量追踪工具，负责在构建产物与构建脚本中查找“数字变量/数字索引”相关模式并输出追踪报告，不负责修改构建脚本或修复符号提取器。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/digital-variable-tracer.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
DigitalVariableTracer	Object	-	-	Node	读写文件/console输出	主导出对象（module.exports）
DigitalVariableTracer.runTrace	Function	-	report:Object	Node	读 dist/build/scripts 写 analyzer/reports 输出 console	分析数字变量声明/连续区间/构建脚本模式

最小使用示例：3~10 行，能跑

```js
// Node 环境（建议在仓库根目录运行）
var Tracer = require("./analyzer/digital-variable-tracer");
var report = Tracer.runTrace();
console.log(report.summary.totalNumberVariables);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- Node 内置：fs/path：读 dist/build/scripts，写报告文件

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 输入：
  - `AD21_JS_Project/dist/main_utf8.js` / `AD21_JS_Project/dist/main.js`
  - `AD21_JS_Project/build/build.js`（关键词：`globalVars`/`window[`）
  - `AD21_JS_Project/scripts/build-integrator.js`（如果存在；关键词：`scripts/build-integrator.js`）
  - `AD21_JS_Project/src/**/*.js`（模式扫描；关键词：`src/**/*.js`）
- 输出：
  - `AD21_JS_Project/analyzer/reports/digital-variable-trace.json`
  - `AD21_JS_Project/analyzer/reports/digital-variable-trace.md`

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境运行。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：打印分析进度、连续组统计、脚本扫描结果等。
- 文件：写入 `analyzer/reports/digital-variable-trace.(json|md)`（关键词：`_saveTraceReport`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 读/写文件；不会修改源码。

数据结构与约定

关键对象结构（字段表）

- report.builtAnalysis[]：每个构建文件的 `{ totalNumberVars, numberVarLines[], consecutiveGroups[] }`
- report.scriptAnalysis：对 `build/build.js` 的片段定位（含 `globalExportCode[]`）
- report.patternAnalysis[]：模式匹配结果（文件+命中数）
- report.summary：汇总与结论字段（由 `_generateTraceReport` 生成）

关键常量/枚举

- 数字变量声明匹配：`/var\\s+(\\d+)(\\s*=|;)/`
- 连续组判定：对数字排序后检查 `n[i] === n[i-1] + 1`

错误码/异常策略

- `require.main === module` 入口：失败会 `process.exit(1)`。
- 单文件读取/分析失败：输出 console 并继续。

与其他模块的协作

上游谁调用我

- 可作为脚本运行：`node analyzer/digital-variable-tracer.js`

我调用谁

- 无（直接用正则扫描文本）。

调用链路图（文字即可）

- dist + build/scripts + src → DigitalVariableTracer.runTrace → analyzer/reports/digital-variable-trace.*

测试与验证

关联测试脚本（路径）

- 未提供专用 test；作为手动分析脚本使用。

如何在 Node 跑

- `node analyzer/digital-variable-tracer.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/digital-variable-trace.json`
- `AD21_JS_Project/analyzer/reports/digital-variable-trace.md`

已知问题与 TODO

已知坑点（必须可复现）

- `build/build.js` 路径是硬编码 `build/build.js`；若仓库结构调整会导致脚本分析为空（定位：`analyzer/digital-variable-tracer.js`，关键词：`var scriptPath = \"build/build.js\"`）。

TODO（按优先级）

- 未确认：把“数字索引误报”与符号提取器的 AST 处理关联起来（可能需要结合 `analyzer/global-variable-fixer.js` 的结论）。

变更记录

- 2025-12-17 语义系统1.0

