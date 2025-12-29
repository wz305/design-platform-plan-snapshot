模块定位

一句话：Stage 5A（Def-Use）分析的回归测试套件，验证定义/使用/未使用/未定义使用等核心事实是否准确；不负责执行 Stage 6/7 的解释与计划。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/tests/def-use-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `DefUseTest` | Object | - | - | Node | 写临时文件/写报告/控制台输出 | `module.exports = DefUseTest` |
| `DefUseTest.runAllTests` | Function | `()` | `MainResults` | Node | 写临时文件/控制台输出 | 运行用例并返回通过/失败统计 |
| `DefUseTest.generateTestReport` | Function | `(mainResults)` | `string` | Node | 无 | 生成文本报告 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/tests/def-use-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/def-use-analyzer.js`：被测模块（`analyzeDefUse` 等）。
- `analyzer/ast/parser.js`：解析临时用例代码写成的文件。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 会在运行时创建并写入临时 JS 文件（线索：`fs.writeFileSync(tempFilePath, ...)`；具体路径以脚本实现为准）。
- 会输出报告：`reports/def-use-test-report.txt`（关键词：`def-use-test-report.txt`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议将该测试脚本作为“库”调用；它在 CLI 模式会 `process.exit(...)`。

运行行为

初始化时做什么

- `require()` 时仅定义测试套件；当 `require.main === module` 会：
  - 执行主测试
  - 执行 `UseType` 与 `PathTag` 两个附加测试
  - 生成并写入 `reports/def-use-test-report.txt`
  - 以失败用例数决定退出码（`process.exit(mainResults.failedTests > 0 ? 1 : 0)`）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印用例执行过程与最终报告文本。
- 文件：`reports/def-use-test-report.txt`；以及若干临时用例文件（路径未确认，线索：`tempFilePath` / `fs.writeFileSync`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 写文件与可能的临时目录创建（取决于脚本内部用例实现）。
- `process.exit(...)`（仅 CLI 模式）。

数据结构与约定

关键对象结构（字段表）

- `MainResults`（由 `runAllTests()` 返回，字段以运行输出为准）：
  - `totalTests/passedTests/failedTests`
  - 可能包含用例详情数组与错误列表（未确认：需运行产物核对）。

关键常量/枚举

- 无。

错误码/异常策略

- 以“统计失败并输出文本报告”为主；CLI 模式通过退出码反映失败。

与其他模块的协作

上游谁调用我

- 人工/CI：回归 Stage 5A Def-Use 分析。

我调用谁

- `ASTParser.parseFile()` → `DefUseAnalyzer.analyzeDefUse()` → 多个查询/断言逻辑。

调用链路图（文字即可）

- CLI → 生成用例文件 → AST 解析 → Def-Use 分析 → 断言统计 → 写入 `reports/def-use-test-report.txt` → 退出码。

测试与验证

关联测试脚本（路径）

- `analyzer/tests/def-use-test.js`（自身）
- 查询 API 验证：`analyzer/test-query-apis.js`（另有独立文档）

如何在 Node 跑

- `node analyzer/tests/def-use-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- `reports/def-use-test-report.txt`

已知问题与 TODO

已知坑点（必须可复现）

- 运行后会落盘报告与临时文件；如果在只读目录运行会失败（可通过切换工作目录复现）。

TODO（按优先级）

- 增加 `--out`/`--tmp-dir` 参数，避免写死到 `reports/` 或当前目录。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

