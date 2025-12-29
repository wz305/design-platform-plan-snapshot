模块定位

一句话：定义日志模块的常量、数据结构模板与基础校验工具，不负责日志写入与输出。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/types.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
LoggerTypes	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
LOG_LEVELS	Object	-	Object	Both	无	位掩码：NONE/ERROR/WARN/INFO/DEBUG/ALL
LEVEL_NAMES	Object	-	Object	Both	无	数字->名称映射
LEVEL_DESCRIPTIONS	Object	-	Object	Both	无	数字->中文描述映射
DEFAULT_CONFIG	Object	-	Object	Both	无	Logger默认配置模板
LOG_ENTRY_TEMPLATE	Object	-	Object	Both	无	日志条目模板
STATS_TEMPLATE	Object	-	Object	Both	无	统计模板
INSTANCE_DATA_TEMPLATE	Object	-	Object	Both	无	实例数据模板
ERROR_CODES	Object	-	Object	Both	无	错误码
ERROR_MESSAGES	Object	-	Object	Both	无	错误码->消息
isValidLogLevel	Function	level:number	boolean	Both	无	校验level范围
getLevelName	Function	level:number	string	Both	无	数字->名称
getLevelDescription	Function	level:number	string	Both	无	数字->中文描述
isLevelEnabled	Function	currentLevel:number, checkLevel:number	boolean	Both	无	位运算判断
getErrorMessage	Function	errorCode:number	string	Both	无	错误码->消息
createDefaultConfig	Function	overrides?:Object	Object	Both	无	复制DEFAULT_CONFIG并覆盖
createStats	Function	-	Object	Both	无	复制STATS_TEMPLATE
createLogEntry	Function	-	Object	Both	无	复制LOG_ENTRY_TEMPLATE
createInstanceData	Function	-	Object	Both	无	初始化config/cache/stats

最小使用示例：3~10 行，能跑

```js
// Node 或 AD（取决于加载方式）
var LoggerTypes = (typeof require !== "undefined")
  ? require("../src/modules/logger/types.js")
  : LoggerTypes;
var cfg = LoggerTypes.createDefaultConfig({ threshold: 1 });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/types.js：无显式依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- window/module.exports/global：用于导出（取决于环境）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应在此模块中引入UI/文件系统写入（本模块只定义数据与校验）

运行行为

初始化时做什么

- 仅初始化常量与模板对象，并导出到不同宿主（window/module.exports/global）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 无

副作用：创建对象、修改全局、注册事件、写文件等

- 注册全局/模块导出（window/module.exports/global）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
LoggerTypes.DEFAULT_CONFIG	Object	默认logger配置（level/threshold/maxCacheSize等）
LoggerTypes.LOG_ENTRY_TEMPLATE	Object	日志条目结构模板
LoggerTypes.STATS_TEMPLATE	Object	统计结构模板
LoggerTypes.ERROR_CODES	Object	错误码集合

关键常量/枚举

- LOG_LEVELS（位掩码）

错误码/异常策略

- 本模块不抛出自定义错误码，仅提供ERROR_CODES/ERROR_MESSAGES映射

与其他模块的协作

上游谁调用我

- LoggerModule（读取LOG_LEVELS/DEFAULT_CONFIG等）
- LoggerModuleIndex/UILoggerModule（配置默认level/threshold等）

我调用谁

- 无

调用链路图（文字即可）

- 业务模块 -> LoggerModule -> LoggerTypes(常量/模板/校验)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- node AD21_JS_Project/tests/module-dependency-test.js

如何在 AD 验证

- 在AD加载构建产物后检查 `LoggerTypes.LOG_LEVELS.ALL` 是否存在

产出报告在哪里（reports/logs）

- AD21_JS_Project/reports/module-dependency-test-report.json

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：部分环境中若未加载JSON polyfill，其他模块的JSON.stringify可能失败（线索：dist/main_utf8.js 关键词：json2.js）

TODO（按优先级）

- 未确认：ERROR_CODES中是否还有未使用/待补全的错误码（线索：AD21_JS_Project/src/modules/logger/types.js 关键词：ERROR_CODES）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

