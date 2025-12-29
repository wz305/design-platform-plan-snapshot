模块定位

一句话：提供带缓存与阈值刷新机制的Logger实例（error/warn/info/debug），不负责UI事件绑定与模块装配顺序。

适用环境：AD

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/core.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
LoggerModule	Object	-	-	AD	注册到window	IIFE模块导出
create	Function	options?:Object	loggerInstance:Object	AD	可能写UI/文件/console	返回BaseModule实例扩展

最小使用示例：3~10 行，能跑

```js
// AD环境（依赖BaseModule已加载）
var logger = LoggerModule.create({ moduleName: "Demo", autoInit: true, threshold: 1 });
logger.info("hello", { ok: true }, "demo.js", "main");
logger.flush();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/base/index.js：使用BaseModule.create并覆写内部方法
- AD21_JS_Project/src/modules/logger/types.js：读取LOG_LEVELS（level位掩码）
- AD21_JS_Project/src/modules/logger/tools.js：依赖validateLogEntry/cleanLogEntry/estimateLogSize等（未确认：是否通过构建注入为全局函数名）
- AD21_JS_Project/src/modules/logger/steps/step_write.js：flush写入（executeWriteStep 或 StepWrite.executeWriteStep）
- AD21_JS_Project/src/modules/log-controller/index.js：生成/显示开关与统计（GlobalLogController）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- uiError/uiWarn/uiInfo/uiDebug：显示级输出（若存在）
- console.log：部分诊断输出
- JSON.stringify：context捕获（未加载polyfill时可能失败，未确认）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接依赖UI控件（按钮/复选框）；UI层应通过LoggerModuleIndex/UILoggerModule调用

运行行为

初始化时做什么

- 创建BaseModule实例并注入Logger的数据结构（data.config/cache/stats等）
- options.autoInit为true时调用baseInst.init()

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI：通过uiError/uiWarn/uiInfo/uiDebug（若存在且GlobalLogController允许显示）
- 文件：flush时通过StepWrite写入（ActiveXObject或Node fs）
- console：flush失败诊断信息（可选）

副作用：创建对象、修改全局、注册事件、写文件等

- 维护日志缓存（inst.data.cache）
- 调用GlobalLogController更新统计/开关
- flush触发文件写入（间接）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
logger.data.config	Object	配置（level/threshold/maxCacheSize等）
logger.data.cache	Array	日志条目缓存
logger.data.stats	Object	统计（totalLogs/flushCount等）
logger.moduleName	string	模块名（用于写入文件名/显示）

关键常量/枚举

- LoggerTypes.LOG_LEVELS（位掩码）

错误码/异常策略

- 以throw Error为主（初始化失败/实例无效等）；日志记录与flush过程中大量try/catch并尽量不中断

与其他模块的协作

上游谁调用我

- LoggerModuleIndex（管理实例/默认实例/便捷方法）
- UILoggerModule（UI输出同时记录到LoggerModule）
- global-events.js（按钮事件通过LoggerModuleIndex间接触发）

我调用谁

- GlobalLogController（生成/显示开关与统计）
- StepWrite（写入日志文件）

调用链路图（文字即可）

- UI/业务 -> LoggerModuleIndex.getDefaultLogger -> LoggerModule.create -> logger.info/error -> (阈值)flush -> StepWrite.executeWriteStep

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/complete-module-test.js（包含LoggerModule实现片段）
- AD21_JS_Project/tests/comprehensive-module-test.js（包含LoggerModuleIndex等综合测试片段）

如何在 Node 跑

- 不适用：src/modules/logger/core.js 未导出到module.exports（线索：AD21_JS_Project/src/modules/logger/core.js 关键词：module.exports 不存在）

如何在 AD 验证

- 调用 LoggerModule.create 并写入不同级别日志；再通过UI按钮触发flush（参见AD21_JS_Project/src/core/global-events.js 关键词：btnGenerateLogClick/btnSaveLogClick）

产出报告在哪里（reports/logs）

- AD21_JS_Project/logs（实际目录受StepWrite.DEFAULT_WRITE_CONFIG影响）

已知问题与 TODO

已知坑点（必须可复现）

- 该文件仅window导出；Node require无法直接得到LoggerModule（线索：AD21_JS_Project/src/modules/logger/core.js 关键词：window.LoggerModule）

TODO（按优先级）

- 补齐Node导出（module.exports）或统一通过构建产物测试（未确认：项目期望的测试方式）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

