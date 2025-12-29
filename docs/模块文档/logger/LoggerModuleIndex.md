模块定位

一句话：提供Logger实例的统一入口（默认实例/命名实例/批量操作/便捷日志函数），不负责底层写入实现。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
LoggerModuleIndex	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
create	Function	options:Object|string	loggerInstance:Object	Both	可能创建实例	直接调用LoggerModule.create
getLogger	Function	moduleName?:string, options?:Object	loggerInstance:Object	Both	可能创建实例	按名字获取或创建
getDefaultLogger	Function	-	loggerInstance:Object|null	Both	可能创建默认实例/console日志	默认单例
getInstances	Function	-	Object	Both	无	返回实例信息摘要
error	Function	message:string, context?:any, fileName?:string, functionName?:string	void	Both	写日志/可能写UI/文件	默认实例
warn	Function	...	void	Both	同上	默认实例
info	Function	...	void	Both	同上	默认实例
debug	Function	...	void	Both	同上	默认实例
getStats	Function	-	Object	Both	无	默认实例统计
getCount	Function	-	number	Both	无	默认实例缓存数量
flush	Function	-	boolean	Both	写文件（间接）	默认实例flush
clear	Function	-	boolean	Both	清空缓存	默认实例clear
flushAll	Function	-	Object	Both	写文件（间接）	批量flush
clearAll	Function	-	Object	Both	清空缓存	批量clear
destroyAll	Function	-	Object	Both	销毁实例/写文件（间接）	先flushAll再destroy
batchOperation	Function	operation:string, args:Array	Object	Both	取决于operation	批量调用实例方法
configure	Function	config:Object	void	Both	修改内部配置	默认实例名/autoCreateDefault等
getConfiguration	Function	-	Object	Both	无	模块配置
setDefaultLevel	Function	level:number	void	Both	修改默认实例	间接调用instance.setLevel
setDefaultThreshold	Function	threshold:number	void	Both	修改默认实例	间接调用instance.setThreshold
setDefaultEnabled	Function	enabled:boolean	void	Both	修改默认实例	间接调用instance.setEnabled
getGlobalStats	Function	-	Object	Both	无	聚合所有实例统计

最小使用示例：3~10 行，能跑

```js
// Node：仅当LoggerModule已在同一作用域/构建产物中可见时才可用（未确认）
var idx = (typeof require !== "undefined") ? require("../src/modules/logger/index.js") : LoggerModuleIndex;
var log = idx.getLogger("Demo", { autoInit: true, threshold: 1 });
idx.info("hello", { ok: true }, "demo.js", "main");
idx.flush();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/core.js：通过LoggerModule.create创建实例（运行时依赖）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- console.log：默认实例创建/返回时会输出调试信息

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在此模块中直接写memLog/ActiveXObject（统一交给LoggerModule/UILoggerModule/StepWrite）

运行行为

初始化时做什么

- 初始化_instances/_defaultInstance/_moduleConfig

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console.log（部分单例调试输出）
- 文件/UI输出由LoggerModule实例行为决定（间接）

副作用：创建对象、修改全局、注册事件、写文件等

- 创建并缓存Logger实例（单例/多例）
- flush/flushAll会触发写文件（间接）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_instances	Object\t{[moduleName]: loggerInstance}
_moduleConfig	Object\tautoCreateDefault/defaultModuleName

关键常量/枚举

- 默认level=15（ALL），threshold=50

错误码/异常策略

- 多数API内部try/catch并静默处理（如便捷方法的_safeCall）

与其他模块的协作

上游谁调用我

- global-events.js（按钮事件调用flush/getStats等）
- 业务模块（作为统一日志入口）

我调用谁

- LoggerModule.create（创建实例）

调用链路图（文字即可）

- 上游 -> LoggerModuleIndex.getDefaultLogger -> LoggerModule.create -> logger.* -> StepWrite

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js（require LoggerModuleIndex）
- AD21_JS_Project/tests/comprehensive-module-test.js（构建产物级验证）

如何在 Node 跑

- node AD21_JS_Project/tests/module-dependency-test.js（注意：LoggerModule是否可用存在未确认点）

如何在 AD 验证

- 通过UI按钮生成日志并调用LoggerModuleIndex.flush（参见AD21_JS_Project/src/core/global-events.js）

产出报告在哪里（reports/logs）

- AD21_JS_Project/logs（由LoggerModule/StepWrite决定）

已知问题与 TODO

已知坑点（必须可复现）

- LoggerModuleIndex本身可require，但其依赖LoggerModule变量；若LoggerModule未在同一作用域可见，调用getDefaultLogger会失败（线索：AD21_JS_Project/src/modules/logger/index.js 关键词：LoggerModule.create）

TODO（按优先级）

- 明确Node侧装配方式：通过bundle测试 vs. 每文件module.exports（未确认：项目预期）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

