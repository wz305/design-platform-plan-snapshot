# AGENTS.md

## 总览
本工作区包含多个子项目与运行环境。默认以子项目内的 `AGENTS.md` 为第一优先级。

## 子项目入口
- AD21 脚本工程：`AD21_JS_Project/`  
  该项目有单独的规则与约束，请优先阅读：`AD21_JS_Project/AGENTS.md`

## 运行环境
- AD 环境：由 `AD21_JS_Project/dist/*` 作为入口加载（详见子项目 AGENTS）
- 浏览器环境：由 `AD21_JS_Project/web-mock/` 提供本地服务与 UI（`/status`、`/diagnostics`）

## 规则
- 若子项目存在 `AGENTS.md`，以子项目规则为准。
- 跨项目/根目录操作需明确说明目标路径与预期影响范围。
