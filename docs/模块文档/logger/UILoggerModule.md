模块定位

一句话：提供面向AD界面(memLog)的UI日志输出API，并将UI输出同步写入底层LoggerModule，不负责日志过滤策略。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/ui-logger/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
UILoggerModule	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
create	Function	options?:Object	Object	Both	创建LoggerModule实例（间接）	返回LoggerModule.create结果
init	Function	instance:Object	boolean	Both	可能初始化实例	调用instance.init()
run	Function	instance:Object, data:any	Object	Both	无	调用instance.run()
destroy	Function	instance:Object	boolean	Both	移除实例缓存/可能flush	调用instance.destroy()
uiError	Function	message:string, context:any, moduleName?:string, functionName?:string	void	Both	写memLog/同时写LoggerModule	UI输出+记录
uiWarn	Function	...	void	Both	同上	UI输出+记录
uiInfo	Function	...	void	Both	同上	UI输出+记录
uiDebug	Function	...	void	Both	同上	UI输出+记录
uiRaw	Function	message:string	void	Both	写memLog	仅UI输出
uiClear	Function	-	void	Both	清空memLog	清空显示
configure	Function	config:Object	void	Both	修改模块配置	影响显示格式/行数/滚动
getConfiguration	Function	-	Object	Both	无	返回模块配置

最小使用示例：3~10 行，能跑

```js
// AD环境（需要memLog控件）
UILoggerModule.uiInfo("启动完成", { ok: true }, "boot", "main");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/core.js：通过LoggerModule.create创建底层日志实例（运行时依赖）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- memLog.Lines.Add/Delete/Clear/Count：UI输出与行数控制
- memLog.Perform(EM_SCROLLCARET, 0)：自动滚动（若可用）
- LoggerModule：记录到文件/缓存（间接）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接依赖GlobalLogController开关（由LoggerModule负责是否显示/生成）

运行行为

初始化时做什么

- 初始化_instances与_moduleConfig；首次UI输出时可能创建默认Logger实例

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- memLog（直接写入）
- 文件（通过LoggerModule实例，间接写入logs）

副作用：创建对象、修改全局、注册事件、写文件等

- 维护UI Logger实例缓存
- 控制memLog行数（超出maxDisplayLines会删除最早行）
- 触发LoggerModule写入（取决于阈值/flush）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_moduleConfig	Object\t{maxDisplayLines,autoScroll,showTimestamp,showLevel,showModule,...}
memLog.Lines	对象\tAD UI控件集合

关键常量/枚举

- maxDisplayLines（默认1000）

错误码/异常策略

- UI输出相关异常多为静默处理；不会抛出到调用方

与其他模块的协作

上游谁调用我

- global-events.js（用于UI层输出与提示）
- 业务模块（直接输出到UI并留存到底层日志）

我调用谁

- LoggerModule.create / instance.error/warn/info/debug

调用链路图（文字即可）

- 上游 -> UILoggerModule.uiInfo -> memLog输出 + LoggerModule.info -> StepWrite

测试与验证

关联测试脚本（路径）

- 未确认：没有针对memLog的自动化测试脚本（线索：AD21_JS_Project/tests 目录关键词：UILoggerModule）

如何在 Node 跑

- 可require：`require('src/modules/ui-logger/index.js')`（但无memLog时UI输出无效果）

如何在 AD 验证

- 调用UILoggerModule.uiInfo并观察memLog行数限制与自动滚动

产出报告在哪里（reports/logs）

- AD21_JS_Project/logs（由LoggerModule/StepWrite决定）

已知问题与 TODO

已知坑点（必须可复现）

- 在无memLog时UI输出被静默吞掉（线索：AD21_JS_Project/src/modules/ui-logger/index.js 关键词：memLog）

TODO（按优先级）

- 为无memLog场景提供备用输出（如console）或显式返回状态（未确认：项目需求）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

