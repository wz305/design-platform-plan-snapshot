模块定位

一句话：Stage 4 依赖关系相关能力（依赖图/调用图/循环依赖/死代码/递归等）的回归测试套件；不负责输出稳定报告 schema。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `analyzer/tests/dependency-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `DependencyTest` | Object | - | - | Node | 写临时文件/控制台输出 | `module.exports = DependencyTest` |
| `DependencyTest.runAllTests` | Function | `()` | `Promise<TestResults>` | Node | 写临时文件/控制台输出 | 主入口：依次执行 8 个 Stage 4 测试并汇总输出 |

最小使用示例：3~10 行，能跑

```bash
# Node
node analyzer/tests/dependency-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `analyzer/semantic/semantic-analyzer.js`：用于分析临时文件或项目（`analyzeFile/analyzeProject`）。
- `analyzer/semantic/dependency-analyzer.js`：被测依赖分析器（`analyzeModuleDependencies` 等）。
- `analyzer/semantic/project-index.js`：工程符号索引相关测试。
- `analyzer/semantic/call-graph.js`：调用图构建/分析测试。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`。
- 临时目录：`analyzer/tests/temp/`（关键词：`createTempFile` / `path.join(__dirname, "temp")`），会创建并写入临时 JS 文件，测试后删除。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把该测试文件当作 ES3 兼容代码示例：内部含模板字符串（`` `...` ``）与 `Array.prototype.find` 等语法/特性（线索：`var testCode = \`` / `depResult.dependencies.find(...)`）。

运行行为

初始化时做什么

- `require()` 时仅定义测试套件；当 `require.main === module` 会自动执行 `DependencyTest.runAllTests()`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出每个测试项的通过/失败与耗时统计（关键词：`printTestResults`）。
- 文件：在 `analyzer/tests/temp/` 下创建并删除临时文件（关键词：`createTempFile` / `cleanupTempFile`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 创建临时目录与写入临时文件；删除临时文件（失败时可能残留，视异常路径而定）。

数据结构与约定

关键对象结构（字段表）

- `TestResults`（返回对象，字段以脚本内为准）：
  - `total/passed/failed`
  - `details[]`：包含 `name/status/error/duration` 等（线索：`testResults.details.push(...)`）。

关键常量/枚举

- 无。

错误码/异常策略

- 单测失败通过抛异常或返回结构体体现；汇总后打印结果，不强制退出码（未看到 `process.exit`）。

与其他模块的协作

上游谁调用我

- 人工/CI：回归 Stage 4 能力。

我调用谁

- `SemanticAnalyzer` / `DependencyAnalyzer` / `ProjectIndex` / `CallGraph`。

调用链路图（文字即可）

- CLI → 写临时文件 → Stage1-4 分析 → 调用依赖/调用图/索引能力 → 清理临时文件 → 控制台汇总。

测试与验证

关联测试脚本（路径）

- `analyzer/tests/dependency-test.js`（自身）

如何在 Node 跑

- `node analyzer/tests/dependency-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 无固定报告文件（仅控制台；临时文件在 `analyzer/tests/temp/`）。

已知问题与 TODO

已知坑点（必须可复现）

- 终端输出存在乱码/符号（`??` 等），与控制台字符集相关（线索：大量 `console.log("?? ...")`）。

TODO（按优先级）

- 增加退出码（失败时返回非 0），便于 CI 使用。
- 将临时目录参数化，避免在受限环境写入失败。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

