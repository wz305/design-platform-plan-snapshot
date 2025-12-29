模块定位

一句话：提供基于SimpleLogger的简化版全局UI事件处理，不负责完整的日志控制与复杂UI联动。

适用环境：AD

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/core/simple-global-events.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
HandleError	Function	error:Error|string, context:string	void	AD	输出SimpleLogError/ShowMessage	统一错误处理
SafeExecute	Function	func:Function, errorContext:string, fallbackValue:any	any	AD	调用HandleError	安全执行包装
btnOutputLogClick	Function	Sender:Object	void	AD	flush日志/UI提示	按钮事件
btnGenerateLogClick	Function	Sender:Object	void	AD	生成日志/UI提示	按钮事件
btnClearDisplayClick	Function	Sender:Object	void	AD	flush日志/UI提示	按钮事件
btnSaveLogClick	Function	Sender:Object	void	AD	flush日志/UI提示	按钮事件
InitializeSimpleLoggerUI	Function	-	void	AD	配置SimpleLoggerIndex	初始化UI日志配置

最小使用示例：3~10 行，能跑

```js
// AD环境（需要SimpleLoggerIndex与SimpleLog*）
InitializeSimpleLoggerUI();
btnGenerateLogClick(null);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/core/simple-global-events.js：全局函数集合，依赖SimpleLogger全局对象

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- SimpleLoggerIndex.getDefault/ configure
- SimpleLog/ SimpleLogDebug/ SimpleLogInfo/ SimpleLogWarn/ SimpleLogError
- ShowMessage（可选）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在Node中require此文件；为AD UI事件使用

运行行为

初始化时做什么

- InitializeSimpleLoggerUI配置SimpleLoggerIndex（level/threshold/autoTime）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- SimpleLogger输出通道（依赖SimpleLogger实现）
- ShowMessage（弹窗提示）

副作用：创建对象、修改全局、注册事件、写文件等

- 修改SimpleLoggerIndex全局配置
- flush触发日志输出（具体输出目标由SimpleLogger实现决定）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
SimpleLoggerIndex	Object	日志索引（提供getDefault/configure）
logger.getCacheCount	Function	缓存数量
logger.getTotalCount	Function	总数量

关键常量/枚举

- level=15（ALL级别）

错误码/异常策略

- SafeExecute捕获异常并调用HandleError，返回fallbackValue

与其他模块的协作

上游谁调用我

- AD DFM按钮事件

我调用谁

- SimpleLoggerIndex与SimpleLog*函数

调用链路图（文字即可）

- DFM事件 -> simple-global-events.js -> SimpleLogger

测试与验证

关联测试脚本（路径）

- 未确认：未找到 tests/ 或 debug/ 目录中的直接测试脚本

如何在 Node 跑

- 不适用：依赖AD UI与SimpleLogger全局对象

如何在 AD 验证

- 在AD触发按钮事件，观察SimpleLogger输出与ShowMessage提示

产出报告在哪里（reports/logs）

- 未确认：输出位置由SimpleLogger实现决定（线索：SimpleLoggerIndex）

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：SimpleLoggerIndex未初始化时会抛异常（参见AD21_JS_Project/src/core/simple-global-events.js关键词：SimpleLoggerIndex.getDefault）

TODO（按优先级）

- 未确认：补充SimpleLogger实现的文档与测试入口

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）
