模块定位

一句话：提供ES3/AD兼容的模块生命周期与Hook骨架，不负责具体业务逻辑与跨模块装配。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/base/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
BaseModule	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
create	Function	userOptions?:Object	instance:Object	Both	可能触发init/写memLog(Hook异常)	返回含init/run/destroy的实例
init	Function	instance:Object	boolean	Both	可能写memLog/调用logger	初始化实例并触发Hook
run	Function	instance:Object	Object|null	Both	可能写memLog/调用logger	执行主逻辑并触发Hook
destroy	Function	instance:Object	boolean	Both	可能写memLog/调用logger	销毁实例并清理Hook
version	String	-	string	Both	无	模块版本
defaultOptions	Object	-	Object	Both	无	默认配置

最小使用示例：3~10 行，能跑

```js
var base = BaseModule.create({ moduleName: "Demo", autoInit: false });
base.init();
var result = base.run();
base.destroy();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/base/index.js：无显式模块依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- memLog.Lines.Add（Hook执行失败时输出，若存在）
- Date（计时）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应依赖LoggerModule等日志模块（代码注释：避免循环依赖）

运行行为

初始化时做什么

- 合并默认配置
- 初始化state/context/hooks
- autoInit=true时执行init()

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- memLog（仅在Hook异常且memLog存在时）
- 可选logger（调用instance.logger.*）

副作用：创建对象、修改全局、注册事件、写文件等

- 创建实例对象并持有状态/Hook
- 可能写入memLog与logger

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
instance.options	Object	配置项
instance.state	Object	初始化/运行/销毁状态
instance.context	Object	计时上下文
instance.hooks	Object	生命周期Hook集合
instance.logger	Object|null	可选日志器

关键常量/枚举

- defaultOptions（moduleName/autoInit/autoTime/debugMode）

错误码/异常策略

- 直接throw Error；失败时更新instance.state.errorCount/lastError

与其他模块的协作

上游谁调用我

- LoggerModule/Core/ObjectCreatorModule等模块作为基类使用

我调用谁

- 无（仅调用实例内部Hook与logger）

调用链路图（文字即可）

- 上游模块 -> BaseModule.create -> init/run/destroy -> Hook

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js
- AD21_JS_Project/tests/complete-module-test.js
- AD21_JS_Project/tests/comprehensive-module-test.js

如何在 Node 跑

- node AD21_JS_Project/tests/module-dependency-test.js

如何在 AD 验证

- 在AD加载构建产物后运行BaseModule.create并触发init/run（未确认：具体加载脚本路径）

产出报告在哪里（reports/logs）

- 未确认：未找到固定输出报告（线索：AD21_JS_Project/reports/priority1-module-check-report.md）

已知问题与 TODO

已知坑点（必须可复现）

- Hook异常仅写memLog，不会中断调用（参见AD21_JS_Project/src/modules/base/index.js关键词：_executeHook）

TODO（按优先级）

- 未确认：是否需要对Hook执行失败提供统一错误上报通道

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）
