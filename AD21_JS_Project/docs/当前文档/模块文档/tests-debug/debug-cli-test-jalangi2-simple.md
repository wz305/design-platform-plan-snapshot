模块定位

一句话：提供一个“最小 Jalangi2 语义分析跑通”脚本，用于快速验证 analyzers/runner 能否加载并运行；不负责覆盖真实违规场景或生成完整报告矩阵。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/debug/cli/test-jalangi2-simple.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | `require` analyzers/runner；控制台输出；可能写 `debug/reports` | 脚本式 smoke test（未使用 `module.exports`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\debug\\cli\\test-jalangi2-simple.js
dir .\\debug\\reports\\ | select -First 5
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/debug/jalangi/*`：加载 analyzers/runner（未确认具体列表：线索关键词 `require('../jalangi')`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node：`require`/`process`/`console`。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议被其它脚本当库引用：它是“跑通验证”脚本，执行即产生输出/可能写文件。

运行行为

初始化时做什么

- 加载 Jalangi2 相关模块并执行一次最小分析（以文件内容为准；未确认：需要进一步核对脚本主体逻辑）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台输出测试过程。
- 可能写入 `debug/reports/`（未确认：查找关键词 `writeFileSync`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 依赖 analyzers 可能注册全局状态（未确认）。

数据结构与约定

- 未新增关键数据结构（未确认：以脚本主体为准）。

与其他模块的协作

上游谁调用我

- 人工运行：用于快速 smoke test。

我调用谁

- Jalangi2 analyzers/runner。

调用链路图（文字即可）

- `test-jalangi2-simple.js` → `require(analyzers/runner)` → 初始化并执行一次最小分析 → 输出结果。

测试与验证

关联测试脚本（路径）

- 本文件自身即为验证入口。

如何在 Node 跑

- `node debug/cli/test-jalangi2-simple.js`

如何在 AD 验证

- 不适用。

产出报告在哪里（reports/logs）

- 未确认：可能在 `debug/reports/`（线索：运行后检查 `debug/reports` 的新增文件）。

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：需要补充脚本实际写文件路径与命令行参数（线索：打开 `debug/cli/test-jalangi2-simple.js`，搜索 `writeFileSync`/`process.argv`）。

TODO（按优先级）

- 补齐“导出表/副作用/产物路径”的已确认信息（待进一步精读源码）。

变更记录

- 未确认：`debug/cli/test-jalangi2-simple.js` 当前未纳入 git 跟踪（`git status` 显示 `?? debug/`，`git log -- debug/cli/test-jalangi2-simple.js` 无记录）。

