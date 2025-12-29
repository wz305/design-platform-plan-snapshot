模块定位

一句话：在 Node 环境执行“模块加载/导出规范/依赖关系/功能完整性”的基本自检，并输出 JSON 报告；不负责运行 AD 侧 UI/DFM 验证。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/tests/module-dependency-test.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

| 导出符号 | 类型 | 参数 | 返回 | 环境 | 副作用 | 备注 |
|---|---|---|---|---|---|---|
| （无） | — | — | — | Node | `require` 多个模块；读取源码文件；写 `reports/*.json` | 脚本式测试 runner（线索：`fs.writeFileSync('reports/module-dependency-test-report.json'`） |

最小使用示例：3~10 行，能跑

```powershell
cd AD21_JS_Project
node .\\tests\\module-dependency-test.js
type .\\reports\\module-dependency-test-report.json | Select-Object -First 1
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `src/modules/*`：通过 `require('../src/modules/...')` 测试 Node 侧可加载性（线索：`testModuleLoading()`）。
- `fs/path`：读取源码内容并做字符串检查（线索：`fs.readFileSync(filePath, 'utf8')`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node 文件系统：读 `src/modules/...` 多个文件；写 `reports/module-dependency-test-report.json`。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要把这个脚本当作模块 API：它是自检 runner，会打印大量控制台输出并写报告。

运行行为

初始化时做什么

- 启动时打印 `=== 开始模块依赖测试 ===` 并初始化 `testResults`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 控制台：打印每个测试点通过/失败。
- 文件：写入 `reports/module-dependency-test-report.json`（包含通过/失败统计与依赖信息）。

副作用：创建对象、修改全局、注册事件、写文件等

- 通过 `require` 加载模块可能触发模块级 IIFE 初始化（未确认：具体模块是否有副作用；线索：被 require 的各模块入口）。
- 写入报告文件到 `reports/`。

数据结构与约定

关键对象结构（字段表）

| 名称 | 字段 | 说明 | 线索 |
|---|---|---|---|
| `testResults` | `passed/failed/errors/modules/dependencies` | 聚合测试结果 | `module-dependency-test.js` 顶部定义 |
| `reportData` | `summary/modules/dependencies/timestamp` | 写入 JSON 报告的结构 | 文件末尾 `fs.writeFileSync(... JSON.stringify(reportData ...))` 附近 |

关键常量/枚举

- 模块文件列表 `moduleFiles` 与加载顺序 `moduleOrder` 在脚本内硬编码。

错误码/异常策略

- 不抛出到外部；以 `logTest(..., passed=false, error.message)` 记录错误并继续。

与其他模块的协作

上游谁调用我

- 人工运行（本地自检），或 CI（未确认：仓库是否集成到 npm scripts）。

我调用谁

- `src/modules/*` 作为被测对象。

调用链路图（文字即可）

- `node tests/module-dependency-test.js` → `testModuleLoading()`（require 核心模块）→ `testModuleStandards()`（读文件检查 IIFE/ES3/导出）→ `testDependencies()`（记录加载顺序）→ `testFunctionality()`（执行功能点，见脚本后半部）→ 写 `reports/module-dependency-test-report.json`。

测试与验证

关联测试脚本（路径）

- 本文件自身即为测试入口。

如何在 Node 跑

- `node tests/module-dependency-test.js`

如何在 AD 验证

- 不适用：脚本依赖 Node `require/fs`。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/reports/module-dependency-test-report.json`

已知问题与 TODO

已知坑点（必须可复现）

- “IIFE 检查”使用字符串匹配 `content.indexOf(' (function(){')`，对不同格式 IIFE 可能误判（线索：关键词 `hasIIFE`）。

TODO（按优先级）

- 将字符串匹配升级为 AST/ESLint 规则，减少误判（未实现）。
- 把测试覆盖扩大到 `ui/` 与 `src/core/*`（当前主要覆盖 `src/modules/*`）。

变更记录

- 未确认：`tests/module-dependency-test.js` 当前未纳入 git 跟踪（`git status` 显示 `??`，`git log -- tests/module-dependency-test.js` 无记录）。

