# AGENTS.md

## 项目定位
AD21_JS_Project：Altium Designer(AD21) 脚本工程（ES3 风格）+ 构建合并产物（dist）+ 浏览器侧平台（Mock/工具）。

本仓库采用“模块即接口”的工程化约束：模块对外仅通过导出面（Export Surface）暴露能力。

### 平台划分
- AD21 JS：运行于 AD，入口为 `dist/*`，严格 ES3 约束。
- 浏览器平台：用于 Mock/辅助工具与调试，不作为 AD 运行入口。

---

## 关键硬约束（MUST）

### 1) AD 运行只认 dist 入口（且必须 GB2312）
- AD 侧运行入口固定为：
  - `dist/Main.PrjScr`
  - `dist/main.dfm`
  - `dist/main.js`
- `dist/main.js` **必须是 GB2312 编码**（UTF8 版本不被 AD 运行入口支持）。
- `dist/main.dfm` 与 `dist/Main.PrjScr` 也必须是 GB2312 编码。

### 2) 禁止手改 dist（除非调试分支）
- 日常改动必须发生在 `src/`。
- 每次修正代码 **必须先构建** 生成 `dist/` 产物，再在 AD 中验证（否则改动不会生效）。
- 除非明确在“调试分支”做临时验证，否则禁止直接编辑 `dist/*`。
  
### 2.1) 构建产物限定（三文件）
- 构建脚本只产出：`dist/main.js`、`dist/main.dfm`、`dist/Main.PrjScr`（均为 GB2312）。
- `main.dfm` 来源固定为 `ui/main.dfm`（唯一指定入口），其他 DFM 仅作备用。
- `Main.PrjScr` 来源固定为 `ui/Main.PrjScr`（AD 生成）。

### 3) 依赖顺序必须同步 merge-order.json + 更新说明
- 新增模块或模块依赖发生变化时：
  - 必须同步更新 `merge-order.json`
  - 必须同步更新对应说明文件/文档（避免“文档与构建顺序不一致”导致未定义/覆盖）

### 4) ES3 约束（AD 环境）
- 仅使用 `var` / `function`，禁止 `let/const`、箭头函数、class、模板字符串、Promise/async 等。
- 任何可能引发 AD 不兼容的语法必须在构建前消除。

### 5) 日志与错误输出（AD UI）
- AD 侧优先输出到 UI 控制台（`memLog/UILogger`）。
- fatal 情况可降级使用 `ShowMessage`，但避免常规信息弹窗轰炸。

---

## 常用入口

### 构建
- 构建脚本：`build/build.js`（或 `npm run build`）
- 构建顺序：`merge-order.json`
- 构建前置：依赖检测（`scripts/dependency-builder.js`）
- 产物输出：`dist/main.js`、`dist/main.dfm`、`dist/Main.PrjScr`（GB2312）

### 浏览器侧
- 仅用于辅助工具与 Mock 调试，不作为 AD 运行入口。
- 允许使用现代语法与构建链，但产物不得回流替换 `dist/main.js`。
- 调试日志输出到浏览器控制台，避免影响 AD 侧日志规范。

### 对接口径整合包
- 生成命令：`npm run exports-index`
- 产物位置：
  - `reports/exports-index.json`
  - `reports/exports-index.tsv`
- 人类汇总：`docs/当前文档/对接资源包.md`

---

## 文档规范（MUST）
- 模块文档必须遵守“模块文档规范 v1”，统一放在：`docs/当前文档/模块文档/**`
- 机器索引：`docs/当前文档/模块索引.md` 必须与模块文档同步更新
- `docs/历史文档/**` 仅留档，不作为当前事实源

---

## 文档定位流程（排错用，Checklist）
当 AD 侧出现“参数无效/未实现/属性不可读”等问题时，按以下清单排查并修复：
- [ ] 锁定导致问题的 API 所属对象：查看 `reports/error-batch-*.json` 和 `reports/ui-log-*.json`，确认 objectId/objectIdString 与具体异常提示。
- [ ] 在源码中定位触发点：用 `rg` 搜索对应读写方法（例如 `GetState_*` / `*OnLayer` / `Mode` / `StartLayer` 等），锁定实际调用路径。
- [ ] 在文档树中核实可用性：到 `参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/**` 查接口说明，确认接口层级、是否标注 “not implemented”、是否有前置条件（如 `Mode` 约束）、`StartLayer/StopLayer` 是否返回对象而非数值。
- [ ] 将文档约束编码进读取逻辑：仅在“接口存在 + 条件满足”时调用，必要时用 `GetState_*` 替代索引属性，避免错误参数。
- [ ] 增加精简的 debug 记录（限量输出）用于回归验证。
- [ ] 构建产物并复测：`npm --prefix AD21_JS_Project run build`，再跑一键验证确认 `COMPACT_SUMMARY` 的 `errors` 为 0。

---

## 近期实现要点（摘要）
- PCB API 调用严格以文档树为准：`参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/**`。
- AD 一键验证已打通：PING/COMMAND/BOARD_SUMMARY/UPLOAD_REPORT/FINAL_SUMMARY；BOARD_SUMMARY 计数已可用。
- BOARD_SUMMARY 计数路径：PrimitiveCounter -> GetPrimitiveCount -> BoardIterator_Create（按 IPCB_Board 示例兜底）。
- JSON 解析统一走 `JsonUtil` + `__adJsonParse` 例外点；宿主全局用 `全局符号桥` + `__adGetHostGlobal`。
