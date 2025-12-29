模块定位

一句话：合并包式的“综合模块测试文件”，在 Node 环境自动运行自检并导出 `PCBInterfaces`，同时仅附加少量模块到 `module.exports.*`；不负责提供稳定导出契约。

适用环境：Both

稳定程度：临时

入口与导出

入口文件（路径）

- `tests/comprehensive-module-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `module.exports` | Object | - | - | Both | 控制台输出 | 主导出为 `PCBInterfaces`（线索：`module.exports = PCBInterfaces;`），随后追加少量属性 |
| `module.exports.BaseModule` | Object | - | - | Both | - | “简化导出”段追加（关键词：`// === 简化导出 ===`） |
| `module.exports.LoggerModule` | Object | - | - | Both | - | 文件中重复赋值两次（线索：`module.exports.LoggerModule = LoggerModule;` x2） |
| `module.exports.ModuleName` | * | - | - | Both | - | 未确认：来源不明且重复赋值两次（线索：关键词 `ModuleName`） |

最小使用示例：3~10 行，能跑

```bash
# Node（注意：会自动在控制台运行自检）
node tests/comprehensive-module-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 该文件为“合并产物式测试文件”，内部嵌入多模块代码；不建议作为依赖源逐一引用。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：当 `typeof window === "undefined"` 会自动执行 `runAutoTest()` 并输出可用性检查。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从业务代码 `require("tests/comprehensive-module-test.js")`：Node 环境会自动输出自检日志。

运行行为

初始化时做什么

- Node 环境自动 `runAutoTest()`（控制台输出）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印 `BaseModule/LoggerModule/ModuleName` 等可用性，以及模块调用测试结果。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改 `module.exports`：先导出 `PCBInterfaces`，再追加属性导出。

数据结构与约定

关键对象结构（字段表）

- `module.exports`：以 `PCBInterfaces` 为基底并附加少量属性（见导出表）。

关键常量/枚举

- 无。

错误码/异常策略

- 自检逻辑只打印结果，不设置退出码（线索：`runAutoTest()`）。

与其他模块的协作

上游谁调用我

- 人工/CI：快速验证合并包加载与基础可用性。

我调用谁

- 无显式依赖（代码内嵌）；自检中引用全局变量。

调用链路图（文字即可）

- Node 运行 → 自动自检 → 控制台输出 → 结束。

测试与验证

关联测试脚本（路径）

- `tests/comprehensive-module-test.js`（自身）

如何在 Node 跑

- `node tests/comprehensive-module-test.js`

如何在 AD 验证

- 未确认：该文件为测试合并包，建议以实际构建产物加载链路验证（线索：`dist/`）。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- `ModuleName` 的来源不明确且重复导出，可能污染对接端命名空间。

TODO（按优先级）

- 将自动执行自检改为 `if (require.main === module)`，避免被 `require` 时产生噪音。
- 清理重复导出项（`LoggerModule`/`ModuleName`）。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

