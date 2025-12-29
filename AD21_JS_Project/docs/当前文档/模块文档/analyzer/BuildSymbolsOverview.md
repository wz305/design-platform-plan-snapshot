模块定位

一句话：分析构建配置与构建产物，汇总“模块/函数/全局变量/DFM函数/exports/依赖”等符号信息并输出报告，不负责修复错误或生成能力索引。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/build-symbols-overview.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
BuildSymbolsOverview	Object	-	-	Node	读写文件/console输出	构建文件符号总览工具对象
runOverview	Function	options?:Object	report:Object	Node	读 config/merge-order.json、读 dist/*、写 analyzer/reports/*	主入口：执行全流程并落盘
_loadMergeOrder	Function	-	Object	Node	读文件	读取 `config/merge-order.json`
_analyzeSourceFiles	Function	filePaths:Array	Object	Node	读文件/console输出	按 merge-order 顺序分析源文件
_analyzeBuiltFiles	Function	-	Object	Node	读 dist/*/写临时文件	分析构建产物（关键词：`builtFiles`）
_saveOverviewReport	Function	report:Object, outputPath:string	void	Node	写文件	写 JSON/MD/TXT 报告

最小使用示例：3~10 行，能跑

```js
// Node 环境（建议工作目录为 AD21_JS_Project）
var BuildSymbolsOverview = require("./analyzer/build-symbols-overview");
var report = BuildSymbolsOverview.runOverview({ outputPath: "analyzer/reports/build-symbols-overview.json" });
console.log(report && report.summary && report.summary.totalModules);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/eslint/eslint-runner.js：对源文件/临时文件执行“语言门禁”
- AD21_JS_Project/analyzer/ast/parser.js：解析源文件/临时文件为 AST
- AD21_JS_Project/config/merge-order.json：构建源文件顺序（强耦合输入）
- AD21_JS_Project/dist/main_utf8.js、AD21_JS_Project/dist/main.js：构建产物（存在性检查后分析）
- Node 内置：fs/path：读写与路径处理

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 工作目录约束：默认读取 `config/merge-order.json`、`dist/*`，并写 `analyzer/reports/*`（线索：`outputPath` 默认值）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中运行（Node-only）。

运行行为

初始化时做什么

- 无初始化；`runOverview()` 驱动全流程。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出每个源文件分析进度与汇总
- 文件：默认写入 `AD21_JS_Project/analyzer/reports/`：
  - `build-symbols-overview.json`
  - `build-symbols-overview.md`
  - `build-symbols-overview.symbols.txt`（文件名未确认：线索 `listPath`）

副作用：创建对象、修改全局、注册事件、写文件等

- 可能写临时文件用于 ESLint/AST（线索：`tempFilePath`、`fs.writeFileSync(tempFilePath, sourceCode, \"utf8\")`）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
report	Object	总览报告（含 summary/files/globalSymbols/moduleInterfaces，字段以实现为准）
globalSymbols	Object	{modules,functions,variables,dfmFunctions}
moduleInterfaces	Object	按 moduleName 聚合的接口描述（来自 `_extractModuleInterface`）

关键常量/枚举

- 内部使用的“builtFiles”数组：`[\"dist/main_utf8.js\",\"dist/main.js\"]`

错误码/异常策略

- 源文件单个失败：记录为 failed 并继续；整体流程仍返回 report（线索：`results.summary.failedFiles`）。

与其他模块的协作

上游谁调用我

- 人/CI：`node AD21_JS_Project/analyzer/build-symbols-overview.js`（文件尾部示例段落，关键词：`runOverview`）
- 下游工具：CorrectedSymbolsOverview/CapabilityIndexBuilder 的输入参考（间接）

我调用谁

- ESLintRunner、ASTParser

调用链路图（文字即可）

- merge-order.json -> 分析源文件(AST+ESLint) -> 分析构建产物 -> 生成 report -> 写 analyzer/reports/*

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/demo-full-build-check.js（整体验证，未确认：是否直接依赖本模块）

如何在 Node 跑

- `node AD21_JS_Project/analyzer/build-symbols-overview.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/build-symbols-overview.md`
- `AD21_JS_Project/analyzer/reports/build-symbols-overview.json`

已知问题与 TODO

已知坑点（必须可复现）

- `runOverview` 默认 outputPath 为 `analyzer/reports/build-symbols-overview.json`，但其它辅助报告路径会基于同目录生成（线索：`_saveOverviewReport`）。

TODO（按优先级）

- 明确并固定“工作目录约束/相对路径”策略（目前混用 `analyzer/reports/*` 与相对 cwd）。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

