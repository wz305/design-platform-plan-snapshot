模块定位

一句话：对构建产物的“全局变量提取”做误报修正（尤其是数字变量误报），生成修正版符号总览报告，不负责能力索引与查询接口生成。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/corrected-symbols-overview.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
CorrectedSymbolsOverview	Object	-	-	Node	读写文件/console输出	修正版符号总览工具对象
runCorrectedOverview	Function	-	report:Object	Node	读 ../dist/*、写 reports/*	主入口：生成修正版总览并落盘
_extractTrueGlobalVariables	Function	ast:Object	Object	Node	无	提取真正的全局变量（修正逻辑核心）
_extractGlobalCallableObjects	Function	ast:Object	Object	Node	无	提取可调用对象（函数）
_extractGlobalModules	Function	ast:Object	Object	Node	无	提取全局模块（IIFE 模块）
_saveCorrectedReport	Function	report:Object	void	Node	写 reports/*	写 JSON/MD/TXT 报告

最小使用示例：3~10 行，能跑

```js
// 建议在工作目录 AD21_JS_Project/analyzer 下运行（依赖 ../dist 路径）
var CorrectedSymbolsOverview = require("./corrected-symbols-overview");
var r = CorrectedSymbolsOverview.runCorrectedOverview();
console.log(r.summary && r.summary.totalGlobalVariables);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- Node 内置：fs/path：读写文件与临时文件
- 构建产物：`../dist/main_utf8.js`、`../dist/main.js`（从 analyzer 目录相对引用；线索：`builtFiles`）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 工作目录约束：默认写入相对 `reports/`，且读取 `../dist/*`；建议 `cd AD21_JS_Project/analyzer` 后运行。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中运行（Node-only）。

运行行为

初始化时做什么

- 无初始化；`runCorrectedOverview()` 执行分析与落盘。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出修正统计（误报移除、准确率提升）
- 文件（相对工作目录 `reports/`）：
  - `reports/corrected-symbols-overview.json`
  - `reports/corrected-symbols-overview.md`
  - `reports/corrected-symbols-overview.symbols.txt`（文件名未确认：线索 `listPath`）

副作用：创建对象、修改全局、注册事件、写文件等

- 写临时文件用于分析（线索：`tempFilePath`）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
report	Object	{summary,modules,callableObjects,globalVariables,falsePositiveFix,...}（字段以实现为准）
falsePositiveFix	Object	{falsePositivesRemoved,improvementRate,...}

关键常量/枚举

- 数字变量识别：`/^\d+$/`

错误码/异常策略

- 直接运行失败：抛错并 `process.exit(1)`（脚本尾部 `require.main === module` 分支）。

与其他模块的协作

上游谁调用我

- 人/CI：`cd AD21_JS_Project/analyzer; node corrected-symbols-overview.js`

我调用谁

- 内部 AST 提取函数（不直接依赖 SemanticAnalyzer；未确认：是否复用 BuildSymbolsOverview 产物）

调用链路图（文字即可）

- 读取 ../dist/* -> 修正提取全局变量 -> 合并符号 -> 写 reports/corrected-symbols-overview.*

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/demo-full-build-check.js
- AD21_JS_Project/analyzer/number-variable-investigator.js

如何在 Node 跑

- `cd AD21_JS_Project/analyzer; node corrected-symbols-overview.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/corrected-symbols-overview.md`
- `AD21_JS_Project/analyzer/reports/corrected-symbols-overview.json`

已知问题与 TODO

已知坑点（必须可复现）

- 输出路径使用相对 `reports/`，在不同 cwd 运行会写到不同位置（线索：`reports/corrected-symbols-overview.json`）。

TODO（按优先级）

- 统一输出路径到 `path.resolve(__dirname, 'reports/...')`。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

