模块定位

一句话：提供全局日志生成/显示开关与性能统计，不负责日志写入与具体UI控件绑定。

适用环境：AD

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/log-controller/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
GlobalLogController	Object	-	-	AD	创建全局变量（构建产物中）	源码未显式window/module.exports导出（未确认：构建注入）
setGenerationLevel	Function	level:string, enabled:boolean	boolean	AD	修改内部开关/可能uiInfo输出	生成级：是否创建日志
isGenerationEnabled	Function	level:string	boolean	AD	更新统计/可能触发自动优化	生成级检查
getGenerationSwitches	Function	level?:string	Object|boolean	AD	无	获取生成级开关
setDisplayLevel	Function	level:string, enabled:boolean	boolean	AD	修改内部开关/可能uiInfo输出	显示级：是否输出UI
isDisplayEnabled	Function	level:string	boolean	AD	更新统计	显示级检查
getDisplaySwitches	Function	level?:string	Object|boolean	AD	无	获取显示级开关
enableAllLevels	Function	-	void	AD	修改开关/可能uiInfo输出	全部开启
disableAllLevels	Function	-	void	AD	修改开关/可能uiInfo输出	全部关闭
enableProductionMode	Function	-	void	AD	修改开关/可能uiInfo输出	仅ERROR
enableDebugMode	Function	-	void	AD	修改开关/可能uiInfo输出	DEBUG+INFO+ERROR
getStats	Function	-	Object	AD	无	性能统计（generated/filtered/displayed）
resetStats	Function	-	void	AD	清空统计	并清理processedLogs
processLogStats	Function	level:string, message:string, moduleName:string, functionName:string, wasGenerated:boolean, wasFiltered:boolean, wasDisplayed:boolean	Object	AD	更新统计/processedLogs	统一统计入口
cleanupProcessedLogs	Function	-	void	AD	清理processedLogs	防内存增长
outputDebugInfo	Function	level:string, message:string, context:any, moduleName?:string, functionName?:string	void	AD	写memLog或调用uiDebug	诊断输出
getDetailedStatus	Function	-	Object	AD	无	包含开关/统计/性能信息
outputSystemDiagnostics	Function	-	void	AD	批量输出诊断	调用outputDebugInfo
configure	Function	config:Object	void	AD	修改模块配置	enableStats/enableAutoOptimization等
getConfiguration	Function	-	Object	AD	无	模块配置

最小使用示例：3~10 行，能跑

```js
// AD环境（构建产物中全局可见时）
GlobalLogController.enableProductionMode();
var s = GlobalLogController.getStats();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/log-controller/index.js：无显式依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- uiInfo/uiWarn/uiDebug：可选（用于状态变更与诊断输出）
- memLog.Lines.Add：备用输出（当uiDebug不可用）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接写文件（由StepWrite负责）

运行行为

初始化时做什么

- 初始化生成级/显示级开关与统计对象

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- uiDebug/uiInfo/uiWarn（若存在）
- memLog（备用）

副作用：创建对象、修改全局、注册事件、写文件等

- 修改内部开关与统计；生成logId并维护_processedLogs（用于去重统计）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_generationSwitches	Object\t{debug/info/warn/error:boolean}
_displaySwitches	Object\t{debug/info/warn/error:boolean}
_stats	Object\t{generated/filtered/displayed}
_moduleConfig	Object\tenableStats/enableAutoOptimization/maxDebugPerSecond等

关键常量/枚举

- level字符串：debug/info/warn/error

错误码/异常策略

- 多数内部异常静默处理；对外API返回boolean或Object

与其他模块的协作

上游谁调用我

- LoggerModule（生成/显示开关与统计）
- global-events.js（UI开关与模式按钮）

我调用谁

- ui* 或 memLog（可选输出）

调用链路图（文字即可）

- UI开关 -> global-events.js -> GlobalLogController.setGenerationLevel/setDisplayLevel

测试与验证

关联测试脚本（路径）

- 未确认：src/modules/log-controller/index.js 无 module.exports；Node侧测试可能依赖构建产物（线索：AD21_JS_Project/tests/comprehensive-module-test.js）

如何在 Node 跑

- 不适用：缺少module.exports（未确认：是否通过bundle测试）

如何在 AD 验证

- 点击UI日志开关/模式按钮，观察memLog输出与统计（参见AD21_JS_Project/src/core/global-events.js 关键词：chkGenDebugClick/btnProdModeClick）

产出报告在哪里（reports/logs）

- 无（仅统计/控制）

已知问题与 TODO

已知坑点（必须可复现）

- outputDebugInfo依赖uiDebug或memLog；两者都不存在时会静默无输出（线索：AD21_JS_Project/src/modules/log-controller/index.js 关键词：uiDebug / memLog）

TODO（按优先级）

- 明确导出策略（window/module.exports）以便Node侧可测试（未确认：项目预期）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

