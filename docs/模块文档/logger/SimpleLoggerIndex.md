模块定位

一句话：提供SimpleLogger的默认实例与全局便捷函数（SimpleLog*），不负责复杂日志级别控制与文件写入。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/simple-index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
SimpleLogDebug	Function	message:string	void	AD	写入默认logger缓存	全局便捷函数
SimpleLogInfo	Function	message:string	void	AD	同上	全局便捷函数
SimpleLogWarn	Function	message:string	void	AD	同上	全局便捷函数
SimpleLogError	Function	message:string	void	AD	同上	全局便捷函数
SimpleLog	Function	message:string	void	AD	同上	全局便捷函数
SimpleFlushLogs	Function	-	void	AD	flush输出（console）	全局便捷函数
SimpleLoggerIndex	Object	-	-	AD	维护默认实例与配置	揭示模块模式对象
SimpleLoggerIndex.create	Function	options?:Object	Object	AD	创建logger实例	调用SimpleLoggerModule.create
SimpleLoggerIndex.getDefault	Function	-	Object	AD	可能创建默认实例	单例
SimpleLoggerIndex.configure	Function	config:Object	void	AD	修改默认配置/可能更新默认实例	影响level/threshold/moduleName
SimpleLoggerIndex.reset	Function	-	void	AD	清空默认实例	下次调用会重建

最小使用示例：3~10 行，能跑

```js
SimpleLoggerIndex.configure({ threshold: 1, level: 15 });
SimpleLogInfo("hi");
SimpleFlushLogs();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/simple-core.js：依赖SimpleLoggerModule.create

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无（默认输出由SimpleLogger.flush中的console决定）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在此模块中引入LoggerModule/GlobalLogController（保持简化链路）

运行行为

初始化时做什么

- 初始化默认配置_simpleModuleConfig；默认实例按需创建

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 默认flush输出到console（由SimpleLogger决定）

副作用：创建对象、修改全局、注册事件、写文件等

- 在全局作用域定义SimpleLog*函数（污染全局命名空间）
- 维护_defaultSimpleLogger单例

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_simpleModuleConfig	Object\t{defaultModuleName,defaultLevel,defaultThreshold}
_defaultSimpleLogger	Object|null\t默认logger实例

关键常量/枚举

- 默认level=15（ALL），threshold=50

错误码/异常策略

- 未做统一异常处理；调用方需自行捕获（simple-global-events.js使用SafeExecute包装）

与其他模块的协作

上游谁调用我

- simple-global-events.js（按钮事件调用SimpleLog*）

我调用谁

- SimpleLoggerModule.create

调用链路图（文字即可）

- UI按钮 -> simple-global-events.js -> SimpleLogInfo -> SimpleLoggerIndex.getDefault -> logger.flush(console)

测试与验证

关联测试脚本（路径）

- 未确认：无单独测试脚本

如何在 Node 跑

- 不适用：simple-index.js 未 module.exports（线索：AD21_JS_Project/src/modules/logger/simple-index.js 关键词：module.exports 不存在）

如何在 AD 验证

- 调用InitializeSimpleLoggerUI（simple-global-events.js）后点击按钮，观察ShowMessage与console输出

产出报告在哪里（reports/logs）

- 无（默认仅console）

已知问题与 TODO

已知坑点（必须可复现）

- 全局函数名SimpleLog*可能与其他脚本冲突（线索：AD21_JS_Project/src/modules/logger/simple-index.js 关键词：function SimpleLogInfo）

TODO（按优先级）

- 评估是否需要将SimpleLoggerIndex纳入统一“模块即接口”导出表并避免全局函数污染

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

