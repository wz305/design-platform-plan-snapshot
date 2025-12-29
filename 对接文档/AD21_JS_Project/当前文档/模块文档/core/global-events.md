模块定位

一句话：为AD DFM界面提供全局事件处理与UI调试输出，不负责模块装配与业务计算。

适用环境：AD

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/core/global-events.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
showErrorInUI	Function	functionName:string, error:Error, context:any	void	AD	写memLog/alert	UI错误输出
showSuccessInUI	Function	functionName:string, message:string, context:any	void	AD	写memLog	UI成功输出
checkLoggerModuleAvailability	Function	-	Object	AD	读取全局模块	检查Logger相关模块
btnOutputLogClick	Function	Sender:Object	void	AD	flush日志/UI输出	按钮事件
btnGenerateLogClick	Function	Sender:Object	void	AD	生成日志/UI输出	按钮事件
btnClearDisplayClick	Function	Sender:Object	void	AD	清空memLog	按钮事件
btnSaveLogClick	Function	Sender:Object	void	AD	flush日志/写文件(间接)	按钮事件
btnDebugStatusClick	Function	Sender:Object	void	AD	UI调试输出	按钮事件
btnLogStatsClick	Function	Sender:Object	void	AD	读取统计/UI输出	按钮事件
showObjectCreatorWindow	Function	-	void	AD	调用UIModule	显示对象创建窗口
btnCreateObjectClick	Function	Sender:Object	void	AD	调用showObjectCreatorWindow	按钮事件
btnRefreshStatusClick	Function	Sender:Object	void	AD	读取模块状态/UI输出	按钮事件
btnObjectStatsClick	Function	Sender:Object	void	AD	读取统计/UI输出	按钮事件
btnClearCacheClick	Function	Sender:Object	void	AD	清理缓存	按钮事件
btnEnvironmentProbeClick	Function	Sender:Object	void	AD	触发环境探测	按钮事件
chkGenDebugClick	Function	Sender:Object	void	AD	修改日志生成开关	复选框事件
chkGenInfoClick	Function	Sender:Object	void	AD	修改日志生成开关	复选框事件
chkGenWarnClick	Function	Sender:Object	void	AD	修改日志生成开关	复选框事件
chkGenErrorClick	Function	Sender:Object	void	AD	修改日志生成开关	复选框事件
chkUIDebugClick	Function	Sender:Object	void	AD	修改日志显示开关	复选框事件
chkUIInfoClick	Function	Sender:Object	void	AD	修改日志显示开关	复选框事件
chkUIWarnClick	Function	Sender:Object	void	AD	修改日志显示开关	复选框事件
chkUIErrorClick	Function	Sender:Object	void	AD	修改日志显示开关	复选框事件
btnDevModeClick	Function	Sender:Object	void	AD	切换日志模式	按钮事件
btnProdModeClick	Function	Sender:Object	void	AD	切换日志模式	按钮事件
btnDebugModeClick	Function	Sender:Object	void	AD	切换日志模式	按钮事件
btnSilentModeClick	Function	Sender:Object	void	AD	切换日志模式	按钮事件
updateAllSwitches	Function	enabled:boolean	void	AD	修改UI控件	更新复选框状态
updateProductionModeSwitches	Function	-	void	AD	修改UI控件	更新复选框状态
updateDebugModeSwitches	Function	-	void	AD	修改UI控件	更新复选框状态
initializeGlobalEvents	Function	-	void	AD	写memLog	全局初始化
uiWrite	Function	message:string	void	AD	写memLog	UI输出底层函数
uiDebug	Function	level:string, message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	带级别输出
uiTrace	Function	message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	TRACE输出
uiInfo	Function	message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	INFO输出
uiWarn	Function	message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	WARN输出
uiError	Function	message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	ERROR输出
uiFatal	Function	message:string, context:any, fileName?:string, functionName?:string	void	AD	写memLog	FATAL输出
测试_运行环境探测	Function	-	void	AD	运行环境探测模块	可写reports报告
debugModuleStatus	Function	-	void	AD	写memLog/读取全局	模块状态检查
debugFunctionCall	Function	functionName:string, args:Array, fileName?:string	void	AD	写memLog	函数调用跟踪
debugFunctionReturn	Function	functionName:string, result:any, fileName?:string	void	AD	写memLog	函数返回跟踪
debugFunctionError	Function	functionName:string, error:Error, fileName?:string	void	AD	写memLog	函数异常跟踪
cmbObjectTypeChange	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnSetOriginClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnValidateClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnCreateClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnCreateAtOriginClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnResetClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
btnCancelClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
chkGridSnapClick	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
edtGridSizeChange	Function	Sender:Object	void	AD	调用UIEventManager	DFM事件
cleanupGlobalEvents	Function	-	void	AD	写memLog	全局清理

最小使用示例：3~10 行，能跑

```js
// AD环境（需要memLog组件）
initializeGlobalEvents();
btnClearDisplayClick(null);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/core/global-events.js：全局函数集合，依赖全局模块注入

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- memLog（UI日志输出）
- LoggerModule/LoggerModuleIndex/UILoggerModule/GlobalLogController（日志控制与输出）
- ObjectCreatorModule/PCBInterfaces（对象与接口统计）
- UIEventManager/UIModule（UI事件与窗口）
- DFM控件变量（如chkGenDebug/chkUIDebug等）
- EM_SCROLLCARET（UI滚动常量）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在Node中require此文件；该文件为DFM直接调用入口

运行行为

初始化时做什么

- initializeGlobalEvents写入memLog提示

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- memLog.Lines.Add
- alert（showErrorInUI的备用路径）
- 日志模块flush可能写入文件（间接）

副作用：创建对象、修改全局、注册事件、写文件等

- 读取/修改UI控件Checked状态
- 调用LoggerModuleIndex.flush触发写文件
- 触发UIEventManager处理逻辑

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
checkLoggerModuleAvailability().available	boolean	是否可用
checkLoggerModuleAvailability().loggerModule	Object|null	LoggerModule引用
checkLoggerModuleAvailability().loggerIndex	Object|null	LoggerModuleIndex引用
checkLoggerModuleAvailability().uiLoggerModule	Object|null	UILoggerModule引用
checkLoggerModuleAvailability().logController	Object|null	GlobalLogController引用
checkLoggerModuleAvailability().errors	Array	错误列表

关键常量/枚举

- 日志级别字符串：debug/info/warn/error

错误码/异常策略

- 多数函数内部try/catch并调用uiError/showErrorInUI

与其他模块的协作

上游谁调用我

- AD DFM事件（按钮/复选框变更）

我调用谁

- LoggerModuleIndex/GlobalLogController
- ObjectCreatorModule/PCBInterfaces
- UIEventManager/UIModule

调用链路图（文字即可）

- DFM事件 -> global-events.js -> Logger/UI/PCB模块

测试与验证

关联测试脚本（路径）

- 未确认：未找到 tests/ 或 debug/ 目录中的直接测试脚本（线索：analyzer/Execution-Planner实际应用验证报告.md 关键词：global-events.js）

如何在 Node 跑

- 不适用：依赖AD UI组件与全局控件

如何在 AD 验证

- 在AD加载DFM后点击对应按钮，观察memLog输出与日志文件

产出报告在哪里（reports/logs）

- 日志输出到AD21_JS_Project/logs（通过LoggerModule写入，参见src/modules/logger/steps/step_write.js）

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：当memLog不可用时部分输出无反馈（参见AD21_JS_Project/src/core/global-events.js关键词：memLog）

TODO（按优先级）

- 未确认：统一UIEventManager缺失时的降级策略

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）
