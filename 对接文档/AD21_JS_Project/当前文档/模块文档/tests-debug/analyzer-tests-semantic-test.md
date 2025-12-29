模块定位

一句话：Stage 3 顶层语义识别回归测试，验证 IIFE/DFM/非法顶层结构识别、符号/诊断校验与批量扫描；不负责 Stage 4+ 的依赖与解释。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/tests/semantic-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `SemanticTest` | Object | - | - | Node | 写测试文件/控制台输出 | `module.exports = SemanticTest` |
| `SemanticTest.runAllTests` | Function | `()` | `Promise<boolean>` | Node | 写测试文件/控制台输出 | 运行 Stage 3 全套测试并汇总 |
| `SemanticTest.createSemanticTestFiles` | Function | `()` | `string[]` | Node | 写文件 | 在 `analyzer/tests/test-files/` 写入测试样例 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/tests/semantic-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/eslint/eslint-runner.js`：与 Stage 3 集成测试中用于门禁验证（线索：`testIntegration()`）。
- `analyzer/ast/parser.js`：解析测试文件。
- `analyzer/semantic/top-level-scanner.js`：Stage 3 顶层扫描核心能力（`scanTopLevelSymbols/scanFiles`）。
- `analyzer/semantic/symbol-types.js`：符号与诊断结构验证（`validateSymbol/validateDiagnostic`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 会创建目录与写入测试文件：`analyzer/tests/test-files/`（关键词：`fs.mkdirSync(testDir, { recursive: true })` / `fs.writeFileSync(...)`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把该脚本当作 `SymbolTypes` 或扫描结果的权威定义；应以对应模块为准。

运行行为

初始化时做什么

- `require()` 时仅定义测试套件；当 `require.main === module` 会自动执行 `SemanticTest.runAllTests()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出每条断言与最终统计。
- 文件：写入多个测试样例（不会自动删除）：`analyzer/tests/test-files/valid-iife-module.js`、`illegal-expression.js` 等（共 10 个）。

副作用：创建对象、修改全局、注册事件、写文件等

- 写入测试样例文件；多次运行会覆盖/累积。

数据结构与约定

关键对象结构（字段表）

- `_testResults`：`{ total, passed, failed, errors[] }`（内部统计）。

关键常量/枚举

- 无（使用 `SymbolTypes.SymbolKind` 等由依赖模块提供）。

错误码/异常策略

- 断言失败记录到 `_testResults.errors`；`runAllTests()` 捕获异常并返回 `false`。

与其他模块的协作

上游谁调用我

- 人工/CI：回归 Stage 3 顶层语义识别。

我调用谁

- `TopLevelScanner` / `SymbolTypes` / `ESLintRunner` / `ASTParser`。

调用链路图（文字即可）

- CLI → 写测试样例 → ESLint/AST 解析 → TopLevelScanner 扫描 → SymbolTypes 校验 → 控制台汇总。

测试与验证

关联测试脚本（路径）

- `analyzer/tests/semantic-test.js`（自身）

如何在 Node 跑

- `node analyzer/tests/semantic-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无固定报告文件（仅控制台；测试文件写入到 `analyzer/tests/test-files/`）。

已知问题与 TODO

已知坑点（必须可复现）

- 写入测试文件目录为相对路径；在非项目根目录运行可能导致输出位置不符合预期。

TODO（按优先级）

- 增加清理逻辑或输出目录参数化。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

