模块定位

一句话：读取能力索引（capability-index-v1），执行查询用例并输出验证报告（JSON+Markdown），用于判断能力索引是否可用。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/capability-query-validator.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
CapabilityQueryValidator	Object	-	-	Node	读写文件/console输出	能力查询验证器对象
runValidation	Function	-	report:Object	Node	读 analyzer/reports/capability-index-v1.json、写 analyzer/reports/capability-query-validation.*	主入口：执行验证并落盘

最小使用示例：3~10 行，能跑

```js
var CapabilityQueryValidator = require("./analyzer/capability-query-validator");
var r = CapabilityQueryValidator.runValidation();
console.log(r.summary && r.summary.successRate);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 输入依赖：`AD21_JS_Project/analyzer/reports/capability-index-v1.json`（通过 `__dirname` 定位）
- Node 内置：fs/path：读写报告文件

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 需要先生成 capability-index-v1（通常由 CapabilityIndexBuilder 产生）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境运行（Node-only）。

运行行为

初始化时做什么

- 无初始化；runValidation 读取索引并跑用例。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console：打印成功率/结论
- 文件（固定到 analyzer/reports，使用 `__dirname`）：
  - `AD21_JS_Project/analyzer/reports/capability-query-validation.json`
  - `AD21_JS_Project/analyzer/reports/capability-query-validation.md`

副作用：创建对象、修改全局、注册事件、写文件等

- 写入验证报告到 analyzer/reports

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
validationReport	Object	{meta,summary,testResults,conclusions}
summary	Object	{totalTests,passedTests,failedTests,successRate}

关键常量/枚举

- 生产就绪阈值：successRate >= 90（线索：conclusions 生成逻辑）

错误码/异常策略

- 直接运行异常：打印 stack 并 `process.exit(1)`（`require.main === module` 分支）。

与其他模块的协作

上游谁调用我

- SemanticWorkflow.validate-capability

我调用谁

- 内部查询接口（来自 capability-index-v1.json 的 facts/query）

调用链路图（文字即可）

- capability-index-v1.json -> runValidation -> 写 capability-query-validation.*

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/test-query-apis.js

如何在 Node 跑

- `node AD21_JS_Project/analyzer/capability-query-validator.js`

如何在 AD 验证

- 不适用（Node-only）。

产出报告在哪里（reports/logs）

- `AD21_JS_Project/analyzer/reports/capability-query-validation.md`
- `AD21_JS_Project/analyzer/reports/capability-query-validation.json`

已知问题与 TODO

已知坑点（必须可复现）

- capability-index-v1.json 不存在会失败（线索：`readFileSync(indexPath`）。

TODO（按优先级）

- 将验证用例清单抽成可配置数据。

变更记录

- 2025-12-17	语义系统1.0（该文件 git 历史不足 5 条）

