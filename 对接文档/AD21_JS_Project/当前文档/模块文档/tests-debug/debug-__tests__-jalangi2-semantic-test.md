模块定位

一句话：端到端集成测试 Jalangi2 语义溯源系统（值历史/期望引擎/违规追踪/语义报告）；不负责导出可复用的 Node 模块接口。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `debug/__tests__/jalangi2-semantic-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| （无） | - | - | - | Node | 加载分析器/写报告/`process.exit` | 本文件未设置 `module.exports`；定义了局部变量 `Jalangi2SemanticTest` 但不对外导出 |

最小使用示例：3~10 行，能跑

```bash
# Node
node debug/__tests__/jalangi2-semantic-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `debug/jalangi/analyzers/value-history.js`：值历史追踪器（脚本启动时 `require`）。
- `debug/jalangi/analyzers/expectation-engine.js`：期望/契约引擎。
- `debug/jalangi/analyzers/violation-tracer.js`：违规追踪与因果链。
- `debug/jalangi/analyzers/semantic-reporter.js`：语义报告生成。
- `debug/jalangi/run-semantic-analysis.js`：语义分析 runner。
- `debug/test-functions.js`：默认测试脚本（`testConfig.testScript`）。
- `debug/jalangi/rules/ad-function-expects.json`：期望规则文件（`testConfig.rulesFile`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 内置：`fs`、`path`（写报告时使用，线索：`fs.writeFileSync(testConfig.outputFile, ...)`）。
- 报告输出：`debug/reports/jalangi2-semantic-test-report.json`（默认）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从业务代码 `require("debug/__tests__/jalangi2-semantic-test.js")`：它会在顶层加载多个分析器，且 CLI 模式会 `process.exit(...)`。

运行行为

初始化时做什么

- 顶层立即 `require` 多个分析器模块；任一加载失败会 `process.exit(1)`（线索：顶层 `try { require(...); } catch { process.exit(1); }`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印测试进度与用例结果；包含部分乱码日志文本（线索：`console.log("[Jalangi2SemanticTest] 豬玖ｯ...")`）。
- 文件：写 JSON 报告到 `debug/reports/jalangi2-semantic-test-report.json`（会确保目录存在，线索：`fs.existsSync(reportDir)` / `fs.mkdirSync(reportDir, { recursive: true })`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 加载并注册/初始化 Jalangi2 分析器（具体副作用由各 analyzer 模块决定）。
- CLI 模式结束时 `process.exit(success ? 0 : 1)`。

数据结构与约定

关键对象结构（字段表）

- `testConfig`（脚本内固定）：
  - `testScript`：`debug/test-functions.js`
  - `entryFunction`：`TestButton_Click`
  - `rulesFile`：`debug/jalangi/rules/ad-function-expects.json`
  - `outputFile`：`debug/reports/jalangi2-semantic-test-report.json`
- 报告对象 `report`：未确认（由脚本内部 `generateReport` 逻辑构造并 JSON 序列化；以实际输出文件为准）。

关键常量/枚举

- 无。

错误码/异常策略

- 依赖加载失败：`process.exit(1)`。
- 主流程：`main()` 返回 `true/false`，CLI 用 `process.exit(success ? 0 : 1)` 反映结果。

与其他模块的协作

上游谁调用我

- 人工/CI：回归 Jalangi2 语义溯源系统的集成能力。

我调用谁

- Jalangi2 analyzers + runner（见依赖列表）。

调用链路图（文字即可）

- CLI → 加载 analyzers → 运行测试用例集合（值历史/期望/违规/报告/集成静态分析）→ 生成 JSON 报告 → 写入 `debug/reports/` → 退出码。

测试与验证

关联测试脚本（路径）

- `debug/__tests__/jalangi2-semantic-test.js`（自身）

如何在 Node 跑

- `node debug/__tests__/jalangi2-semantic-test.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- `debug/reports/jalangi2-semantic-test-report.json`

已知问题与 TODO

已知坑点（必须可复现）

- 脚本不导出 `module.exports`，无法作为库复用；只能通过 CLI 运行采集结果。

TODO（按优先级）

- 增加 `module.exports = Jalangi2SemanticTest`，并将“顶层 require + process.exit”改为 `if (require.main === module)`。
- 统一控制台输出编码，避免乱码影响对接。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

