模块定位

一句话：端到端集成测试 `SemanticAnalyzer` 的单文件/批量分析、报告生成与错误处理；不负责覆盖 Stage 6/7 的解释与执行计划。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/tests/integration-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `IntegrationTest` | Object | - | - | Node | 控制台输出 | `module.exports = IntegrationTest` |
| `IntegrationTest.runAllTests` | Function | `()` | `Promise<boolean>` | Node | 控制台输出 | 主入口，运行单文件/批量/报告/错误处理四类测试 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/tests/integration-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/semantic-analyzer.js`：被测分析器（`analyzeFile/analyzeFiles/generateProjectReport` 等）。
- `tests/test-files/*`：测试数据文件集（硬编码在 `getTestFiles()`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 环境；未见写文件逻辑。
- 依赖测试文件路径存在：`tests/test-files/valid-iife-module.js` 等（关键词：`getTestFiles()`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议在业务代码中 `require` 并调用该测试套件；它是测试用脚本。

运行行为

初始化时做什么

- `require()` 时仅定义测试套件；当 `require.main === module` 会自动执行 `IntegrationTest.runAllTests()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出断言通过/失败与汇总统计。

副作用：创建对象、修改全局、注册事件、写文件等

- 无写文件；但会读取测试文件并运行语义分析（由 `SemanticAnalyzer` 决定内部副作用）。

数据结构与约定

关键对象结构（字段表）

- `_testResults`：`{ total, passed, failed, errors[] }`（内部统计）。

关键常量/枚举

- 无。

错误码/异常策略

- 使用内部 `assert()` 统计失败；`runAllTests()` 捕获异常并返回 `false`。

与其他模块的协作

上游谁调用我

- 人工/CI：端到端回归 `SemanticAnalyzer` 基础流程。

我调用谁

- `SemanticAnalyzer.analyzeFile()`、`SemanticAnalyzer.analyzeFiles()` 等。

调用链路图（文字即可）

- CLI → 读取 `tests/test-files/*` → 语义分析（单文件/批量）→ 输出汇总。

测试与验证

关联测试脚本（路径）

- `analyzer/tests/integration-test.js`（自身）

如何在 Node 跑

- `node analyzer/tests/integration-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无固定报告文件（仅控制台）。

已知问题与 TODO

已知坑点（必须可复现）

- 测试依赖 `tests/test-files/` 目录下样例齐全；缺失会导致失败（线索：`getTestFiles()`）。

TODO（按优先级）

- 为失败用例输出更结构化的 JSON 报告，便于自动化采集。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

