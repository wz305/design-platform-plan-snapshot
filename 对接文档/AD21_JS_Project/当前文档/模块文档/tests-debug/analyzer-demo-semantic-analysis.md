模块定位

一句话：演示 `SemanticAnalyzer` 对多种输入（IIFE/DFM/非法结构/批量文件）的分析效果并打印报告；不负责提供稳定 API 或长期产物落盘。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/demo-semantic-analysis.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `demonstrateSemanticAnalysis` | Function | `()` | `Promise<void>` | Node | 写临时文件/控制台输出 | `module.exports = { demonstrateSemanticAnalysis }` |

最小使用示例：3~10 行，能跑

```js
// Node
const { demonstrateSemanticAnalysis } = require("./analyzer/demo-semantic-analysis");
demonstrateSemanticAnalysis().catch(console.error);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/semantic-analyzer.js`：演示目标模块，提供 `analyzeFile/analyzeFiles/generateReport/generateBatchReport`。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`（在函数内部 `require`）。
- 会在当前工作目录创建并删除若干临时文件（见“运行行为”）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议下游依赖此脚本的日志/输出格式：其控制台输出包含乱码文本与装饰字符（需按实际字符集运行环境确认）。

运行行为

初始化时做什么

- `require()` 时仅定义函数与导出；当 `require.main === module` 会直接执行演示函数。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：大量 `console.log`，且包含明显乱码段落（线索：文件顶部注释与 `console.log("汽汽汽...")`）。
- 文件：创建并删除临时脚本文件（默认在 CWD）：
  - `temp-valid-iife.js`
  - `temp-dfm-function.js`
  - `temp-illegal.js`
  - `ModuleA.js` / `ModuleB.js` / `EventHandler.js`（批量测试用）

副作用：创建对象、修改全局、注册事件、写文件等

- 会 `fs.writeFileSync` 写入临时文件，并在各测试结束 `fs.unlinkSync` 删除。
- 无持久化报告文件输出（只打印到控制台）。

数据结构与约定

关键对象结构（字段表）

- 依赖的 `SemanticAnalyzer.analyzeFile()` 返回对象结构：未确认（建议以 `analyzer/semantic/semantic-analyzer.js` 及其导出文档为准）。

关键常量/枚举

- 无。

错误码/异常策略

- `try/catch` 捕获每个演示段落的异常并打印 `error.message`。

与其他模块的协作

上游谁调用我

- 人工：`node analyzer/demo-semantic-analysis.js`。

我调用谁

- `SemanticAnalyzer.analyzeFile()`、`SemanticAnalyzer.analyzeFiles()`、`SemanticAnalyzer.generateReport()`、`SemanticAnalyzer.generateBatchReport()`。

调用链路图（文字即可）

- CLI → `demonstrateSemanticAnalysis()` → 写临时文件 → `SemanticAnalyzer.*` → 输出到控制台 → 删除临时文件。

测试与验证

关联测试脚本（路径）

- `analyzer/demo-semantic-analysis.js`（自身即演示入口）
- 更系统的测试请参考：`analyzer/tests/semantic-test.js`（Stage 3 全量测试，另有独立文档）。

如何在 Node 跑

- `node analyzer/demo-semantic-analysis.js`

如何在 AD 验证

- 不适用（Node 脚本）。

产出报告在哪里（reports/logs）

- 无（仅控制台输出；临时文件会删除）。

已知问题与 TODO

已知坑点（必须可复现）

- 控制台输出包含乱码，可能影响可读性与下游解析（线索：文件头注释与大量非 UTF-8 可见字符输出）。

TODO（按优先级）

- 将示例输出改为 UTF-8 可读文本，并将临时文件输出目录参数化。
- 允许输出 JSON 报告到 `analyzer/reports/` 便于对接。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上，`git status --porcelain`）。

