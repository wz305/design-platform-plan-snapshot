模块定位

一句话：最大体量的合并包式“全量模块测试文件”，在 Node 环境自动运行自检，导出 `PCBInterfaces` 并附加多模块引用到 `module.exports.*`；不负责作为稳定 SDK。

适用环境：Both

稳定程度：临时

入口与导出

入口文件（路径）

- `tests/full-module-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `module.exports` | Object | - | - | Both | 控制台输出 | 主导出为 `PCBInterfaces`（线索：`module.exports = PCBInterfaces;`），随后追加大量属性 |
| `module.exports.BaseModule` | Object | - | - | Both | - | “简化导出”段追加 |
| `module.exports.LoggerTypes` | Object | - | - | Both | - | 同上 |
| `module.exports.LoggerTools` | Object | - | - | Both | - | 同上 |
| `module.exports.StepFormat` | Object | - | - | Both | - | 同上 |
| `module.exports.StepWrite` | Object | - | - | Both | - | 同上 |
| `module.exports.LoggerModule` | Object | - | - | Both | - | 文件中重复赋值两次 |
| `module.exports.BasePCBWrapper` | Object | - | - | Both | - | 同上 |
| `module.exports.PCBMockSystem` | Object | - | - | Both | - | 同上 |
| `module.exports.PCBObjectFactory` | Object | - | - | Both | - | 同上 |
| `module.exports.PCBObjectManager` | Object | - | - | Both | - | 同上 |
| `module.exports.PCBObjectPool` | Object | - | - | Both | - | 同上 |
| `module.exports.GeometryCalculator` | Object | - | - | Both | - | 同上 |
| `module.exports.ArcWrapper` | Object | - | - | Both | - | 同上 |
| `module.exports.PadWrapper` | Object | - | - | Both | - | 同上 |
| `module.exports.TrackWrapper` | Object | - | - | Both | - | 同上 |
| `module.exports.ViaWrapper` | Object | - | - | Both | - | 同上 |
| `module.exports.ModuleName` | * | - | - | Both | - | 未确认：来源不明（线索：关键词 `ModuleName`） |

最小使用示例：3~10 行，能跑

```bash
# Node（注意：会自动在控制台运行自检）
node tests/full-module-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 该文件为“合并产物式测试文件”，内部嵌入多模块代码；其依赖等同于合并进来的模块集合。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`typeof window === "undefined"` 时自动执行 `runAutoTest()` 并输出大量“模块可用性”检查。
- AD：取决于 `window`、以及合并代码内对 `window.*` 的导出分支。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要将其当作业务入口或 SDK：它会自动运行自检并可能污染 `module.exports` 的语义（重复/不明导出）。

运行行为

初始化时做什么

- Node 环境自动执行 `runAutoTest()`（控制台输出）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印多模块可用性与一次简单的模块间调用测试。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改 `module.exports`：以 `PCBInterfaces` 为基底追加多个属性导出；部分导出重复赋值（`LoggerModule`）。

数据结构与约定

关键对象结构（字段表）

- `module.exports`：`PCBInterfaces` 对象 + 多个附加属性（见导出表）。

关键常量/枚举

- 无。

错误码/异常策略

- 自检通过/失败只打印，不设置退出码（线索：`runAutoTest()`）。

与其他模块的协作

上游谁调用我

- 人工/CI：验证全量合并包能加载并具备关键模块引用。

我调用谁

- 无显式依赖（代码内嵌）；自检中引用多个全局变量。

调用链路图（文字即可）

- Node 运行 → 自动自检 → 控制台输出 → 结束。

测试与验证

关联测试脚本（路径）

- `tests/full-module-test.js`（自身）

如何在 Node 跑

- `node tests/full-module-test.js`

如何在 AD 验证

- 未确认：建议以实际构建产物（如 `dist/` 下脚本）进行 AD 环境验证。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- 导出项存在重复与不明来源（例如 `ModuleName`、重复 `LoggerModule`），可能导致对接端混淆。

TODO（按优先级）

- 将自动自检改为 `if (require.main === module)`。
- 清理重复导出项，并明确最终 export surface（建议输出一个单一的 `exports` 清单对象）。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

