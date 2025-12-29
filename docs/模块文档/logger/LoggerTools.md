模块定位

一句话：提供ES3兼容的字符串/时间/校验/配置合并/日志条目处理工具，不负责日志输出与文件写入。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/tools.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
LoggerTools	Object	-	-	Both	未直接导出到window/module.exports	在构建合并产物中作为全局变量使用（未确认：merge规则）
simpleStringify	Function	obj:any	string	Both	无	ES3对象字符串化（非JSON）
safeString	Function	value:any	string	Both	无	安全String()转换
padString	Function	str:string, length:number, pad?:string	string	Both	无	左侧填充
truncateString	Function	str:string, maxLength:number, suffix?:string	string	Both	无	截断
formatTimestamp	Function	timestamp:Date|number	string	Both	无	格式化时间
getCurrentTime	Function	-	number	Both	无	当前毫秒时间戳
isValidString	Function	value:any	boolean	Both	无	非空字符串
isValidObject	Function	value:any	boolean	Both	无	非null对象
isValidFunction	Function	value:any	boolean	Both	无	函数
isValidNumber	Function	value:any	boolean	Both	无	有限数字
isPositiveInteger	Function	value:any	boolean	Both	无	正整数
isValidBoolean	Function	value:any	boolean	Both	无	布尔值
mergeConfig	Function	target:Object, source:Object	Object	Both	无	浅合并
validateConfig	Function	config:Object	Object	Both	无	返回{valid,errors}
estimateLogSize	Function	logEntry:Object	number	Both	无	粗估字节数
validateLogEntry	Function	logEntry:Object	boolean	Both	无	校验必需字段
cleanLogEntry	Function	logEntry:Object	Object	Both	无	移除undefined字段
safeExecute	Function	func:Function, defaultValue:any	any	Both	吞异常	静默失败返回默认值
createError	Function	code:number, message:string, details:any	Object	Both	无	错误对象结构化
safeArrayLength	Function	array:Array	number	Both	无	安全长度
safeArrayGet	Function	array:Array, index:number, defaultValue:any	any	Both	无	安全取值
clearArray	Function	array:Array	boolean	Both	可能修改array.length	清空数组

最小使用示例：3~10 行，能跑

```js
// 注意：tools.js 本身未 module.exports（需通过构建产物全局变量或自行注入）
var s = LoggerTools.safeString(null);
var ok = LoggerTools.isPositiveInteger(3);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/tools.js：无显式依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Date（时间戳）
- JSON.stringify（仅用于日志/调试场景的少量使用；多数工具不依赖）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在此模块中访问memLog/ActiveXObject/fs（保持纯工具）

运行行为

初始化时做什么

- 初始化函数集合并返回对象

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无

副作用：创建对象、修改全局、注册事件、写文件等

- clearArray会修改传入数组

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
createError()返回值	Object	{code,message,details,timestamp}
validateConfig()返回值	Object	{valid:boolean,errors:Array}

关键常量/枚举

- 无

错误码/异常策略

- safeExecute吞异常；其他函数多以返回值表达失败（如validateConfig）

与其他模块的协作

上游谁调用我

- LoggerModule（validateLogEntry/cleanLogEntry/estimateLogSize等）
- StepFormat/StepWrite（部分格式化逻辑有重复实现，未确认是否会复用LoggerTools）

我调用谁

- 无

调用链路图（文字即可）

- LoggerModule -> LoggerTools(校验/格式化/估算) -> StepWrite(写入)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js（仅验证require存在与否；与tools.js导出方式存在冲突，未确认）

如何在 Node 跑

- 未确认：直接 `require('src/modules/logger/tools.js')` 可能得不到导出（线索：AD21_JS_Project/src/modules/logger/tools.js 关键词：module.exports 不存在）

如何在 AD 验证

- 在AD加载构建产物后调用 `LoggerTools.validateLogEntry(...)`

产出报告在哪里（reports/logs）

- 未确认：无固定产出

已知问题与 TODO

已知坑点（必须可复现）

- tools.js 没有 window/module.exports 导出：在Node环境直接require不可用（线索：AD21_JS_Project/src/modules/logger/tools.js 关键词：})() 结尾无导出段）

TODO（按优先级）

- 补齐统一导出策略（window/module.exports/global）或在构建时注入（未确认：构建系统规则，线索：build/ 与 dist/）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

