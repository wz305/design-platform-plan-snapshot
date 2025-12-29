模块定位

一句话：验证 `SemanticAnalyzer.analyzeProject()` 是否正确集成 Stage 5 结果并生成项目报告；不负责导出可复用函数。

适用环境：Node

稳定程度：临时

入口与导出

入口文件（路径）

- `analyzer/test-stage5-integration.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| （无） | - | - | - | Node | 写报告/控制台输出 | 顶层调用 `runTest()`，`require()` 时也会立即执行 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/test-stage5-integration.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/semantic-analyzer.js`：被测入口（`analyzeProject/generateProjectReport`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 读取测试文件：`tests/test-files/valid-iife-module.js`、`tests/test-files/multiple-modules.js`。
- 报告输出：`reports/stage5-integration-test-report.txt`（写文件失败会打印错误但不中断整体流程）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要 `require("analyzer/test-stage5-integration.js")` 期望获得导出；它会立即执行并尝试写报告。

运行行为

初始化时做什么

- 顶层立即调用 `runTest()`，并在末尾打印“Stage 5集成测试完成”。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出项目分析摘要与 Stage 5 统计（如 `totalDefinitions/totalUses/...`）。
- 文件：`reports/stage5-integration-test-report.txt`（关键词：`stage5-integration-test-report.txt`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 写报告文件（`fs.writeFileSync`）。

数据结构与约定

关键对象结构（字段表）

- `projectResult`：`SemanticAnalyzer.analyzeProject()` 返回（含 `summary` 与 `stages.stage5`）。
- `report`：`SemanticAnalyzer.generateProjectReport(projectResult)` 生成的文本报告。

关键常量/枚举

- 无。

错误码/异常策略

- 通过 `try/catch` 输出 `error.message`；写报告失败只打印错误不抛出。

与其他模块的协作

上游谁调用我

- 人工/CI：验证 Stage 5 接入是否可用。

我调用谁

- `SemanticAnalyzer.analyzeProject()` → `SemanticAnalyzer.generateProjectReport()` → `fs.writeFileSync(...)`。

调用链路图（文字即可）

- CLI → Stage1-5 项目分析 → 打印摘要 → 生成文本报告 → 写入 `reports/`。

测试与验证

关联测试脚本（路径）

- `analyzer/test-stage5-integration.js`（自身）

如何在 Node 跑

- `node analyzer/test-stage5-integration.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- `reports/stage5-integration-test-report.txt`

已知问题与 TODO

已知坑点（必须可复现）

- 作为被 `require` 的模块也会立即执行并写文件（顶层脚本式）。

TODO（按优先级）

- 改为 `if (require.main === module)` 才执行。
- 将测试文件列表与输出路径参数化。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

