模块定位

一句话：ES3 语法“语言门禁”，用 ESLint + flat config 校验文件是否满足 ES3 约束，不负责 AST/语义分析与修复。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/eslint/eslint-runner.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ESLintRunner	Object	-	-	Node	初始化 ESLint 实例	模块导出对象
validateFile	Function	filePath:string	Promise<Object>	Node	读文件/运行 ESLint	返回 {success,errorCount,warningCount,messages}
validateFiles	Function	filePaths:Array	Promise<Object>	Node	读文件/运行 ESLint	逐文件串行校验并汇总
passesLanguageGate	Function	filePath:string	Promise<boolean>	Node	读文件/运行 ESLint	语义分析入口守卫
formatErrors	Function	result:Object	string	Node	无	将 ESLintRunner 结果格式化为文本

最小使用示例：3~10 行，能跑

```js
var ESLintRunner = require("./analyzer/eslint/eslint-runner");
ESLintRunner.validateFile("AD21_JS_Project/src/core/module-accessor.js").then(function(r){ console.log(r.success); });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/analyzer/eslint/eslint.config.js：ESLint flat config（overrideConfigFile 指向）
- npm: eslint：提供 `ESLint` 类（关键词：`var { ESLint } = require(\"eslint\")`）
- Node 内置：path：定位配置文件路径

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Node + 已安装依赖 `eslint`（未确认：由 package.json/lock 管理，线索：仓库依赖文件）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中使用（依赖 Node `require` 与 npm 包）。

运行行为

初始化时做什么

- 首次调用时 `_init()` 创建 ESLint 实例，并加载 `eslint.config.js`（关键词：`overrideConfigFile`）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 本模块本身不写文件；调用 ESLintRunner 的上游通常会把结果汇总到 console/报告。

副作用：创建对象、修改全局、注册事件、写文件等

- 创建并缓存 `_eslint` 单例（模块内私有变量）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
result	Object	validateFile 返回：{success,filePath,errorCount,warningCount,messages}
messages	Array	每条：{line,column,severity,message,ruleId}

关键常量/枚举

- severity：`error|warning`（由 ESLint severity 2/1 映射）

错误码/异常策略

- ESLint 执行异常：返回 `{success:false,error:<message>,messages:[]}`（不抛出）。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/semantic/semantic-analyzer.js（Stage 1）
- AD21_JS_Project/analyzer/build-symbols-overview.js（构建文件门禁）

我调用谁

- eslint（ESLint）

调用链路图（文字即可）

- 文件路径 -> ESLintRunner.validateFile -> ESLint.lintFiles -> 标准化 messages

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/tests/basic-test.js
- AD21_JS_Project/analyzer/tests/test-files/invalid-es5-code.js（用于验证“门禁”能力）

如何在 Node 跑

- `node AD21_JS_Project/analyzer/tests/basic-test.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- ESLintRunner 本身不产出报告；上游可能写入 `AD21_JS_Project/analyzer/reports/`（未确认：具体由哪个脚本落盘）。

已知问题与 TODO

已知坑点（必须可复现）

- 依赖 ESLint v9+ 的 flat config 选项 `overrideConfigFile`（线索：`AD21_JS_Project/analyzer/eslint/eslint-runner.js` 关键词：`flat config`）。

TODO（按优先级）

- 未确认：是否需要并行 lint 以提升批量性能（线索：`validateFiles` 当前串行调用 `validateFile`）。

变更记录

- 2025-12-15	ES3语义系统Stage4完成（该文件 git 历史不足 5 条）

