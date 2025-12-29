模块定位

一句话：一份“自动生成的合并包测试文件”，在 Node 环境自动运行自检并导出 `PCBInterfaces`（并附加若干模块引用到 `module.exports.*`）；不负责作为源码开发入口。

适用环境：Both

稳定程度：临时

入口与导出

入口文件（路径）

- `tests/complete-module-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `module.exports` | Object | - | - | Both | 控制台输出 | 主要导出为 `PCBInterfaces`（线索：文件内 `module.exports = PCBInterfaces;`），随后追加 `module.exports.BaseModule` 等属性 |
| `module.exports.PCBInterfaces` | Object | - | - | Both | - | 未确认：文件内未显式设置该别名；实际主导出对象即 `PCBInterfaces` |
| `module.exports.BaseModule` | Object | - | - | Both | - | “简化导出”段追加（关键词：`// === 简化导出 ===`） |
| `module.exports.LoggerTypes` | Object | - | - | Both | - | 同上 |
| `module.exports.LoggerTools` | Object | - | - | Both | - | 同上 |
| `module.exports.StepFormat` | Object | - | - | Both | - | 同上 |
| `module.exports.StepWrite` | Object | - | - | Both | - | 同上 |
| `module.exports.LoggerModule` | Object | - | - | Both | - | 同上（文件中重复赋值两次） |
| `module.exports.ModuleName` | * | - | - | Both | - | 未确认：`ModuleName` 来源不明且重复赋值两次（线索：关键词 `ModuleName`） |

最小使用示例：3~10 行，能跑

```bash
# Node（注意：会自动在控制台运行自检）
node tests/complete-module-test.js
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 这是“合并产物式测试文件”，内部包含大量模块实现的拼接代码（需以文件内容为准，不建议逐一依赖）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：当 `typeof window === "undefined"` 时会自动运行 `runAutoTest()` 并打印模块可用性检查结果（关键词：`// Node.js环境自动运行`）。
- AD：若在 AD/JScript 环境，行为取决于 `window` 是否存在与内部 `window.*` 导出逻辑。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从业务代码 `require("tests/complete-module-test.js")` 当作模块入口：它会在 Node 环境自动执行自检并打印大量日志。

运行行为

初始化时做什么

- Node 环境：自动运行 `runAutoTest()`（只输出控制台，不写文件）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：输出各模块是否“可用”的布尔值，并做一次简单的模块间调用测试。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改 `module.exports`：先导出 `PCBInterfaces`，再追加若干属性导出。

数据结构与约定

关键对象结构（字段表）

- `module.exports`：以 `PCBInterfaces` 对象为基底，额外挂载多个模块引用属性（见导出表）。

关键常量/枚举

- 无（该文件本身为聚合产物）。

错误码/异常策略

- 自检通过/失败只打印到控制台，不抛异常也不设退出码（线索：`runAutoTest()` 内 `try/catch`）。

与其他模块的协作

上游谁调用我

- 人工/CI：快速确认合并包在 Node 下能加载并完成基础自检。

我调用谁

- 无显式依赖（代码已内嵌）；但自检会引用 `BaseModule/LoggerTypes/...` 等全局变量。

调用链路图（文字即可）

- Node 运行 → 自动自检 → 打印模块可用性 → 结束。

测试与验证

关联测试脚本（路径）

- `tests/complete-module-test.js`（自身）

如何在 Node 跑

- `node tests/complete-module-test.js`

如何在 AD 验证

- 未确认：该文件为测试合并包，AD 环境加载方式与实际构建产物/脚本加载方式不同；如需 AD 验证请以 `dist/main_utf8.js` 的加载链路为准。

产出报告在哪里（reports/logs）

- 无（仅控制台）。

已知问题与 TODO

已知坑点（必须可复现）

- `module.exports.ModuleName` 重复赋值且来源不明，可能导致对接端误解（线索：`ModuleName` 出现两次）。

TODO（按优先级）

- 明确最终导出 surface：避免重复 `module.exports.LoggerModule` / `ModuleName`。
- 将自动执行自检改为 `if (require.main === module)`（避免被 `require` 时自动输出）。

变更记录

- 未确认：可能未纳入 git 跟踪（线索同上）。

