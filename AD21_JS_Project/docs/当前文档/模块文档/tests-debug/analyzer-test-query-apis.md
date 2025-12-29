模块定位

一句话：用一段临时 JS 文件验证 `DefUseAnalyzer` 的 5 个查询 API 是否可用；不负责作为库导出任何函数。

适用环境：Node

稳定程度：临时

入口与导出

入口文件（路径）

- `analyzer/test-query-apis.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| （无） | - | - | - | Node | 写临时文件/控制台输出 | 该脚本为“顶层执行脚本”，`require()` 时也会立即执行 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/test-query-apis.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/def-use-analyzer.js`：被测 API 提供者（`getDefs/getUses/getUnusedSymbols/getUndefinedUses/queryImpact`）。
- `analyzer/ast/parser.js`：解析临时文件生成 AST（`ASTParser.parseFile()`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`。
- 临时文件：`query-api-test.js`（在当前工作目录创建并在 finally 中尝试删除）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从其他模块 `require("analyzer/test-query-apis.js")` 期望获得导出；它会直接执行并可能 `process.exit(1)`。

运行行为

初始化时做什么

- 顶层立即执行：写 `query-api-test.js` → parse → def-use analyze → 打印 5 个 API 的结果 → finally 清理临时文件。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印概览与每个 API 的结果。
- 文件：写入并删除 `query-api-test.js`（关键词：`fs.writeFileSync(testFilePath, ...)` / `fs.unlinkSync(testFilePath)`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 失败时 `process.exit(1)`（线索：`AST解析失败`、`Def-Use分析失败` 两处）。

数据结构与约定

关键对象结构（字段表）

- `defUseResult`：来自 `DefUseAnalyzer.analyzeDefUse()` 的结果对象（建议参考模块文档 `analyzer/semantic/def-use-analyzer.js`）。

关键常量/枚举

- 无。

错误码/异常策略

- 失败时通过 `console.error` 输出，并直接 `process.exit(1)`；其他异常在 `catch` 中打印 `error.message`。

与其他模块的协作

上游谁调用我

- 人工/CI：快速验证 5 个查询 API 行为。

我调用谁

- `ASTParser.parseFile()` → `DefUseAnalyzer.analyzeDefUse()` → `DefUseAnalyzer.getDefs/getUses/getUnusedSymbols/getUndefinedUses/queryImpact()`。

调用链路图（文字即可）

- CLI → 写临时文件 → AST 解析 → Def-Use 分析 → 查询 API 打印 → 删除临时文件。

测试与验证

关联测试脚本（路径）

- `analyzer/test-query-apis.js`（自身）
- 更系统的测试：`analyzer/tests/def-use-test.js`（另有独立文档）

如何在 Node 跑

- `node analyzer/test-query-apis.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无持久化报告（只控制台；临时文件会删除）。

已知问题与 TODO

已知坑点（必须可复现）

- 在“被 require”场景也会执行并写临时文件（顶层代码）；可能污染调用方工作目录。

TODO（按优先级）

- 改为 `if (require.main === module)` 才执行，避免被 `require` 时产生副作用。
- 临时文件输出目录改为 `analyzer/temp/` 或 `reports/snapshots/`。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

