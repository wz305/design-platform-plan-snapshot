模块定位

一句话：ESLint Flat Config 配置模块，负责定义“库代码必须是 ES3、测试代码允许 ES2024”的语法门禁与全局变量白名单，不负责执行 lint（由 ESLintRunner 负责）。

适用环境：Node

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/eslint/eslint.config.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
default	Array	-	Array	Node	无	`module.exports = [ ...flatConfig ]`

最小使用示例：3~10 行，能跑

```js
// Node 环境
var config = require("./analyzer/eslint/eslint.config");
console.log(config[0].languageOptions.ecmaVersion);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无（纯配置对象）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- ESLint 运行时（外部工具）会读取该配置；本文件本身不访问外部文件。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境加载（Node 模块导出；但即使加载也无意义）。

运行行为

初始化时做什么

- 定义并导出 flat config 数组。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无。

副作用：创建对象、修改全局、注册事件、写文件等

- 无。

数据结构与约定

关键对象结构（字段表）

- config[0]：`es3-library-config`
  - `files: ["**/*.js"]`
  - `languageOptions.ecmaVersion = 3`
  - `globals`：包含 AD 常见全局（Client/PCBServer/SchServer 等）与构建后模块名（LoggerModule/ObjectModule/PCBInterfaces）
  - `rules`：强制分号、双引号，关闭 no-undef/no-unused-vars 等（交由语义分析）
- config[1]：`test-override-config`
  - `files: ["**/*.test.js", "**/tests/**/*.js"]`
  - `languageOptions.ecmaVersion = 2024`
  - `globals`：describe/it 等测试全局 + Node require/module/process 等

关键常量/枚举

- `ecmaVersion`：库代码 3；测试代码 2024。

错误码/异常策略

- 无。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/eslint/eslint-runner.js：作为 ESLint 配置输入（关键词：`eslint.config.js`）

我调用谁

- 无。

调用链路图（文字即可）

- ESLintRunner → 读取 eslint.config.js → 对指定文件集合执行 ESLint

测试与验证

关联测试脚本（路径）

- 未确认：是否有专门验证该配置的脚本；可通过运行 ESLintRunner 间接验证（线索：`analyzer/eslint/eslint-runner.js`）。

如何在 Node 跑

- 通过 ESLintRunner（示例）：`node analyzer/eslint/eslint-runner.js`（具体 CLI 以实现为准，未确认）。

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 本文件不产出报告；ESLintRunner 可能写入 `analyzer/reports/*`（未确认）。

已知问题与 TODO

已知坑点（必须可复现）

- `globals` 白名单中只列出少量模块名（LoggerModule/ObjectModule/PCBInterfaces）；若构建后全局更多，ESLint 仍可能报 no-undef（但本配置关闭了 `no-undef`，因此仅影响外部工具的静态体验）。

TODO（按优先级）

- 未确认：与能力索引/构建产物对齐全局变量白名单（如 `ModuleAccessor` 等），并在配置中保持最小必要集合。

变更记录

- 2025-12-15 ES3语义系统Stage4完成

