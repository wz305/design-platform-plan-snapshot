模块定位

一句话：提供日志条目的格式化策略（标准/JSON/CSV/紧凑），不负责日志缓存与写入。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/steps/step_format.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
StepFormat	Object	-	-	Both	未直接导出到window/module.exports	在构建合并产物中作为全局变量使用（未确认：merge规则）
DEFAULT_FORMAT_CONFIG	Object	-	Object	Both	无	默认格式化配置
formatLogEntry	Function	logEntry:Object, config?:Object	string	Both	无	标准格式化入口
formatLogEntries	Function	logEntries:Array, config?:Object	Array	Both	无	批量格式化
formatAsJson	Function	logEntry:Object	string	Both	无	简单对象字符串化（非严格JSON）
formatAsCsv	Function	logEntry:Object	string	Both	无	CSV行
formatAsCompact	Function	logEntry:Object	string	Both	无	紧凑格式
createFormatter	Function	type:string, config?:Object	Function	Both	无	返回formatter函数

最小使用示例：3~10 行，能跑

```js
// 注意：step_format.js 本身未 module.exports（需通过构建产物全局变量或自行注入）
var fmt = StepFormat.createFormatter("standard");
var line = fmt({ timestamp: Date.now(), level: "INFO", message: "hi" });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/steps/step_format.js：内部自带safeString/padString等工具实现

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Date（formatAsCompact内使用）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应访问memLog/ActiveXObject/fs（格式化应保持纯）

运行行为

初始化时做什么

- 初始化DEFAULT_FORMAT_CONFIG与格式化函数集合

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
DEFAULT_FORMAT_CONFIG	Object	包含padding/maxLength等
logEntry.timestamp	number|Date|string	时间戳（formatTimestamp支持多类型）
logEntry.level	string	级别字符串
logEntry.message	string	消息
logEntry.context	any	上下文（会被简单序列化）

关键常量/枚举

- format type：standard/json/csv/compact

错误码/异常策略

- 非法输入返回占位字符串（如 “[Invalid Log Entry]”）或空数组

与其他模块的协作

上游谁调用我

- StepWrite（写入前格式化；但当前StepWrite优先尝试调用全局 `formatLogEntry`，未确认是否与StepFormat衔接）

我调用谁

- 无

调用链路图（文字即可）

- LoggerModule.flush -> StepWrite -> (formatLogEntry/StepFormat) -> 文件/控制台输出

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/complete-module-test.js（包含StepFormat实现片段）

如何在 Node 跑

- 未确认：step_format.js 无 module.exports（线索：AD21_JS_Project/src/modules/logger/steps/step_format.js 关键词：module.exports 不存在）

如何在 AD 验证

- 在AD加载构建产物后调用 `StepFormat.formatLogEntry(...)`

产出报告在哪里（reports/logs）

- 无（纯格式化）

已知问题与 TODO

已知坑点（必须可复现）

- StepWrite优先调用全局函数名 `formatLogEntry`，不是 `StepFormat.formatLogEntry`（线索：AD21_JS_Project/src/modules/logger/steps/step_write.js 关键词：typeof formatLogEntry）

TODO（按优先级）

- 统一格式化入口：建议StepWrite显式依赖StepFormat（未确认：构建拼接顺序/全局导出策略）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

