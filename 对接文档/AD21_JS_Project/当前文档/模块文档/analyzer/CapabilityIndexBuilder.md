模块定位

一句话：从“修正版符号总览”构建可查询的能力事实库（capability-index-v1），并生成查询接口代码与 Markdown，不负责语义扫描与查询验证。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/capability-index-builder.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
CapabilityIndexBuilder	Object	-	-	Node	读写文件/console输出	能力索引构建器对象
buildCapabilityIndex	Function	-	Object	Node	读 reports/corrected-symbols-overview.json、写 reports/capability-index-v1.*	主入口：构建索引与查询接口并落盘

最小使用示例：3~10 行，能跑

```js
// 建议在工作目录 AD21_JS_Project/analyzer 下运行（相对 reports 路径）
var CapabilityIndexBuilder = require("./capability-index-builder");
var r = CapabilityIndexBuilder.buildCapabilityIndex();
console.log(Object.keys(r.capabilityIndex.modules || {}).length);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 输入依赖：`reports/corrected-symbols-overview.json`（由 CorrectedSymbolsOverview 生成；关键词：`correctedDataPath`）
- Node 内置：fs/path：读取输入与写入产物

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 工作目录约束：相对 `reports/` 读写（线索：`reports/capability-index-v1.json`）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境运行（Node-only）。

运行行为

初始化时做什么

- 无初始化；buildCapabilityIndex 一次性构建并落盘。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：输出统计
- 文件（相对 cwd 的 `reports/`）：
  - `reports/capability-index-v1.json`
  - `reports/capability-index-v1-interface.js`
  - `reports/capability-index-v1.md`

副作用：创建对象、修改全局、注册事件、写文件等

- 写入能力索引与查询接口代码

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
capabilityIndex	Object	能力索引（包含 modules/callables/globals 等，字段以实现为准）
queryInterface	string	生成的查询接口代码文本

关键常量/枚举

- 索引版本：v1（线索：输出文件名 `capability-index-v1.*`）

错误码/异常策略

- 输入文件缺失直接 throw：提示先运行 corrected-symbols-overview（关键词：`修正版符号数据不存在`）。

与其他模块的协作

上游谁调用我

- SemanticWorkflow CLI（默认读取 capability-index-v1 作为 facts）

我调用谁

- 无其它模块依赖（主要为 fs + 内部构建逻辑）

调用链路图（文字即可）

- corrected-symbols-overview.json -> buildCapabilityIndex -> capability-index-v1.json + interface.js + md

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/test-query-apis.js
- AD21_JS_Project/analyzer/capability-query-validator.js

如何在 Node 跑

- `cd AD21_JS_Project/analyzer; node capability-index-builder.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/capability-index-v1.md`
- `AD21_JS_Project/analyzer/reports/capability-index-v1.json`

已知问题与 TODO

已知坑点（必须可复现）

- 相对路径 `reports/...` 依赖运行时 cwd（线索：未使用 `__dirname`）。

TODO（按优先级）

- 统一输出路径到 `path.resolve(__dirname,'reports/...')`。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

