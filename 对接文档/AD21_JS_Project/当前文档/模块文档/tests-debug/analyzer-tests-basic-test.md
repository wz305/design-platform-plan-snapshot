模块定位

一句话：基础回归测试套件，覆盖 Stage 1-2（ESLint 门禁与 AST 解析）与部分集成功能；不负责生成详细语义事实与执行计划。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/tests/basic-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `BasicTest` | Object | - | - | Node | 写测试文件/控制台输出 | `module.exports = BasicTest` |
| `BasicTest.runAllTests` | Function | `()` | `Promise<boolean>` | Node | 写测试文件/控制台输出 | 运行全套测试并打印汇总 |
| `BasicTest.createTestFiles` | Function | `()` | `string[]` | Node | 写文件 | 在 `analyzer/tests/test-files/` 写入多份临时样例文件 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/tests/basic-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/eslint/eslint-runner.js`：验证 ES3/DFM 规则门禁（`validateFile/validateFiles/passesLanguageGate/formatErrors`）。
- `analyzer/ast/parser.js`：解析测试文件生成 AST（`parseFile`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 会创建目录与写入测试文件：`analyzer/tests/test-files/`（关键词：`fs.mkdirSync(testDir, { recursive: true })`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议将该测试套件作为“对外 API”；它的主要用途是回归验证。

运行行为

初始化时做什么

- `require()` 时仅定义测试套件；当 `require.main === module` 会自动执行 `BasicTest.runAllTests()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印每条断言的通过/失败，以及最终统计。
- 文件：写入多个测试样例文件（不会自动清理，需人工清理或由后续测试覆盖）。

副作用：创建对象、修改全局、注册事件、写文件等

- 写文件：`analyzer/tests/test-files/valid-es3-module.js`、`invalid-es5-code.js`、`syntax-error.js`、`dfm-function.js`。

数据结构与约定

关键对象结构（字段表）

- `_testResults`：`{ total, passed, failed, errors[] }`（仅内部使用，但会随运行输出）。

关键常量/枚举

- 无。

错误码/异常策略

- 使用内部 `assert()` 统计失败；`runAllTests()` 捕获异常并返回 `false`。

与其他模块的协作

上游谁调用我

- 人工/CI：基础回归验证 Stage 1-2。

我调用谁

- `ESLintRunner`、`ASTParser`。

调用链路图（文字即可）

- CLI → 写测试样例 → ESLintRunner 验证 → ASTParser 解析 → 输出汇总。

测试与验证

关联测试脚本（路径）

- `analyzer/tests/basic-test.js`（自身）

如何在 Node 跑

- `node analyzer/tests/basic-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无固定报告文件（仅控制台；测试文件写入到 `analyzer/tests/test-files/`）。

已知问题与 TODO

已知坑点（必须可复现）

- 测试文件不自动清理，重复运行会覆盖/累积（取决于后续测试写入策略）。

TODO（按优先级）

- 增加 `--clean` 选项或在测试结束后清理 `analyzer/tests/test-files/`。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

