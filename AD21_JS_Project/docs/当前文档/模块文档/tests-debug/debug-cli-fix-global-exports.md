模块定位

一句话：在 Node 环境把若干 Jalangi2 语义分析器对象挂到全局（global/this），用于兼容“依赖全局变量访问”的运行方式；不负责加载这些对象或校验其正确性。

适用环境：Node

稳定程度：临时

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/fix-global-exports.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | 写 `console.log`；写 `global.*` | 该脚本为一次性修复脚本，未使用 `module.exports` |
| `global.ExpectationEngine` | object | — | — | Node | 全局注入 | 仅在 `typeof ExpectationEngine !== "undefined"` 时注入 |
| `global.ViolationTracer` | object | — | — | Node | 全局注入 | 仅在 `typeof ViolationTracer !== "undefined"` 时注入 |
| `global.SemanticReporter` | object | — | — | Node | 全局注入 | 仅在 `typeof SemanticReporter !== "undefined"` 时注入 |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node -e "require('./debug/jalangi/analyzers/expectation-engine'); require('./debug/cli/fix-global-exports')"
node -e "console.log(typeof global.ExpectationEngine)"
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- （无显式依赖）本文件不 `require` 任何模块；它假设 `ExpectationEngine/ViolationTracer/SemanticReporter` 已经在全局可见（线索：关键词 `typeof ExpectationEngine !== \"undefined\"`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node `global`：用于挂载全局变量。
- 控制台：输出修复状态（`[Fix Global Exports] ...`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在核心模块里 `require` 该脚本：它会改变全局环境，适合 CLI/debug 场景，不适合生产/库用法。

运行行为

初始化时做什么

- 立即执行：打印开始日志，尝试把 3 个对象挂到 `global`/`this`，并打印结果。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 写 `console.log`。

副作用：创建对象、修改全局、注册事件、写文件等

- 全局注入（可能覆盖同名变量）：`global.ExpectationEngine/global.ViolationTracer/global.SemanticReporter`。

数据结构与约定

关键对象结构（字段表）

- 未定义；仅转发/导出已有全局对象。

关键常量/枚举

- 无。

错误码/异常策略

- 不抛异常；以 `console.log` 输出“可用/不可用”。

与其他模块的协作

上游谁调用我

- debug/cli 与手动调试流程（未确认具体调用点：建议在 `debug/cli/jalangi2-semantic.js` 或相关文档中串联；关键词：`fix-global-exports`）。

我调用谁

- （无）只读全局符号。

调用链路图（文字即可）

- `（用户/脚本）先加载 Jalangi2 analyzers` → `node debug/cli/fix-global-exports.js` → `global.ExpectationEngine/...` 可用 → 其他脚本用全局方式访问。

测试与验证

关联测试脚本（路径）

- 未确认：仓库内未见直接引用（线索：搜索 `fix-global-exports.js`）。

如何在 Node 跑

- 见“最小使用示例”。

如何在 AD 验证

- 不适用：该脚本依赖 Node `global/require`。

产出报告在哪里（reports/logs）

- 无文件产物；仅控制台日志。

已知问题与 TODO

已知坑点（必须可复现）

- 若目标对象未提前加载，则只会输出“不可用”，不会自动 `require`（可复现：直接运行 `node debug/cli/fix-global-exports.js`）。

TODO（按优先级）

- 改为显式 `require` 目标模块并导出，减少对“预先存在全局变量”的耦合（未实现）。

变更记录

- 未确认：`debug/cli/fix-global-exports.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/fix-global-exports.js` 无记录）。

