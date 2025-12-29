模块定位

一句话：提供“创建即初始化”的极简日志实现（缓存+阈值flush），不负责文件写入与UI控件集成。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/simple-core.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
SimpleLogger	Function	options:Object	Object	Both	内部维护缓存	工厂函数，返回logger接口对象
SimpleLoggerModule	Object	-	-	Both	创建全局变量（构建产物中）	提供create(options)
SimpleLoggerModule.create	Function	options?:Object	Object	Both	创建logger实例	返回SimpleLogger(options)

最小使用示例：3~10 行，能跑

```js
var logger = SimpleLoggerModule.create({ threshold: 1 });
logger.info("hi");
logger.flush();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/simple-core.js：无显式依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- console.log：flush时输出（若存在）
- Date：时间戳

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接写memLog或文件（定位为最小实现）

运行行为

初始化时做什么

- create/options时初始化config与data.cache/totalLogs

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console.log（flush）

副作用：创建对象、修改全局、注册事件、写文件等

- 维护内存缓存，达到threshold时自动flush（输出到console）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
config	Object\t{level,threshold,enabled,autoTime,moduleName}
data	Object\t{cache:Array,lastFlushTime,totalLogs}

关键常量/枚举

- LOG_LEVELS（DEBUG/INFO/WARN/ERROR/ALL，位掩码）

错误码/异常策略

- 多数操作不抛异常；非法输入可能导致运行时错误（未做防御性校验）

与其他模块的协作

上游谁调用我

- SimpleLoggerIndex（默认实例与全局便捷函数）
- simple-global-events.js（按钮事件调用SimpleLog*）

我调用谁

- 无

调用链路图（文字即可）

- simple-global-events.js -> SimpleLogInfo -> SimpleLoggerIndex.getDefault -> SimpleLogger.flush(console)

测试与验证

关联测试脚本（路径）

- 未确认：无单独测试脚本（线索：AD21_JS_Project/src/core/simple-global-events.js 关键词：SimpleLoggerIndex）

如何在 Node 跑

- 需保证SimpleLoggerModule在当前作用域可用（未确认：是否通过bundle注入）

如何在 AD 验证

- 运行InitializeSimpleLoggerUI后点击“生成日志”按钮（simple-global-events.js）

产出报告在哪里（reports/logs）

- 无（默认仅console输出）

已知问题与 TODO

已知坑点（必须可复现）

- flush仅输出到console，不会写入memLog或文件（线索：AD21_JS_Project/src/modules/logger/simple-core.js 关键词：console.log）

TODO（按优先级）

- 明确SimpleLogger在项目中的定位：仅调试/回退方案，还是长期入口（未确认：docs/简单日志重构总结.md）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

