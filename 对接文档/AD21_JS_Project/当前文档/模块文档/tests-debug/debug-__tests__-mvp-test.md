模块定位

一句话：验证 debug 基础设施的 MVP 闭环（AD Mock + Trace + CLI + 端到端 Debug）是否能跑通；不负责提供库式导出。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `debug/__tests__/mvp-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| （无） | - | - | - | Node | 加载依赖/控制台输出/可能写 trace 文件 | 本文件不设置 `module.exports`；作为脚本运行（或被 `require`）会打印日志并加载依赖 |

最小使用示例：3~10 行，能跑

```bash
# Node
node debug/__tests__/mvp-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `debug/runtime/ad-mock.js`：提供 `PCBServer()` 与对象/迭代器 Mock（脚本会在启动阶段 `require`）。
- `debug/jalangi/analysis.js`：提供 Trace 相关全局函数（`enableTrace/disableTrace/getTrace`）与 Jalangi 分析能力（脚本会在启动阶段 `require`）。
- `debug/cli/semantic-debug.js`：CLI 集成测试与端到端 debug 流程（`parseArguments/executeValidate/executeDebug`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`（仅在部分测试中动态 `require`）。
- trace 输出文件：`debug/traces/test-trace.json`（来自脚本 `testConfig.outputFile`；由 CLI debug 流程生成并在测试中读取验证）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从业务代码 `require("debug/__tests__/mvp-test.js")`：它会执行依赖加载、打印日志并可能生成 trace 文件。

运行行为

初始化时做什么

- 顶层打印 `mvp-test.js 加载完成`。
- 若存在 `require`，尝试加载 AD Mock 与 Jalangi Analysis，并将 `TestButton_Click` 暴露到 `global`（线索：`global.TestButton_Click = TestButton_Click`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出每个测试项的 PASS/FAIL 与详细信息。
- 文件：端到端 debug 流程会尝试生成 `debug/traces/test-trace.json` 并读取校验（线索：`fs.existsSync(testConfig.outputFile)` / `JSON.parse(fs.readFileSync(...))`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改 Node 全局：`global.TestButton_Click`（用于模拟 DFM 入口）。
- 可能创建 PCB Mock 对象并调用 `board.AddPCBObject(...)`（Mock 场景）。
- 可能生成 trace 文件（通过 `debug/cli/semantic-debug.js` 的 `executeDebug`）。

数据结构与约定

关键对象结构（字段表）

- `testConfig`：
  - `mockEntry`：默认 `TestButton_Click`
  - `outputFile`：默认 `debug/traces/test-trace.json`
- trace 文件格式（由 CLI 输出，脚本只做断言）：
  - `metadata`（至少包含 `timestamp/totalTraces`）
  - `traces[]`
  - 未确认：完整 schema 以 `debug/cli/semantic-debug.js` 与 trace writer 为准。

关键常量/枚举

- 无。

错误码/异常策略

- 测试以 try/catch 包裹，失败会记录日志但不统一退出码（`main()` 捕获异常仅打印错误）。

与其他模块的协作

上游谁调用我

- 人工/CI：快速确认 debug MVP 能否跑通。

我调用谁

- `ad-mock.js`（PCBServer/BoardIterator/PCBObjectFactory 等）
- `analysis.js`（Trace 全局函数）
- `semantic-debug.js`（validate/debug CLI 流程）

调用链路图（文字即可）

- CLI → 加载 AD Mock & Jalangi → `testTraceCollection()` → `semantic-debug.executeDebug(...)` → 生成并读取 `debug/traces/test-trace.json`。

测试与验证

关联测试脚本（路径）

- `debug/__tests__/mvp-test.js`（自身）

如何在 Node 跑

- `node debug/__tests__/mvp-test.js`

如何在 AD 验证

- 不适用（Node 测试脚本；AD 只作为“被模拟的 API 语义”）。

产出报告在哪里（reports/logs）

- trace（若生成成功）：`debug/traces/test-trace.json`

已知问题与 TODO

已知坑点（必须可复现）

- 文件内存在部分乱码字符串（与编码/控制台渲染有关），例如断言消息中出现不可读字符（线索：`rg "åº”è¯¥"` in `debug/__tests__/mvp-test.js`）。

TODO（按优先级）

- 为失败用例设置明确的退出码，便于 CI 判定。
- 统一输出编码与日志格式。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

