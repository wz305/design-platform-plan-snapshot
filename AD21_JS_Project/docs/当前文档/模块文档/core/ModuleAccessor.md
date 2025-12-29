模块定位

一句话：提供跨环境获取模块引用的统一入口与缓存机制，不负责模块初始化与生命周期管理。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/core/module-accessor.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ModuleAccessor	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
getModule	Function	moduleName:string	module|nil	Both	eval/console日志/缓存	按优先级查找模块
isModuleAvailable	Function	moduleName:string	boolean	Both	eval/console日志/缓存	内部调用getModule
clearCache	Function	moduleName?:string	void	Both	清理缓存	不传则清空全部缓存
getCacheStats	Function	-	Object	Both	无	返回缓存统计
configure	Function	config:Object	void	Both	修改内部配置	影响日志与缓存行为
getConfiguration	Function	-	Object	Both	无	返回当前配置
getAvailableModules	Function	-	Array	Both	eval/console日志/缓存	扫描常见模块名
getStatistics	Function	-	Object	Both	无	包含配置/缓存/可用模块

最小使用示例：3~10 行，能跑

```js
// Node或AD中均可
var module = ModuleAccessor.getModule("PCBInterfaces");
if (module) {
  var types = module.getSupportedTypes();
}
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/core/module-accessor.js：无显式模块依赖，内部使用eval/全局对象

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- window/module.exports/global：按优先级读取模块
- console.log：可选日志输出

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应依赖任何业务模块；仅做模块访问，不负责初始化/运行

运行行为

初始化时做什么

- 无显式初始化；首次调用时按配置缓存

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console.log（当enableLogging为true）

副作用：创建对象、修改全局、注册事件、写文件等

- 写入内部缓存
- 读取window/module.exports/global（仅访问，不修改）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
_config	Object	enableCache/enableLogging
_cache	Object	模块缓存（键=模块名）

关键常量/枚举

- 无（配置见_config）

错误码/异常策略

- 抛出Error或记录日志；返回null/false表示不可用

与其他模块的协作

上游谁调用我

- ObjectModule等通过ModuleAccessor查询依赖

我调用谁

- 无直接调用；通过eval/window/module.exports/global读取引用

调用链路图（文字即可）

- 上游模块 -> ModuleAccessor.getModule -> 直接变量/window/module.exports/global

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/complete-module-test.js
- AD21_JS_Project/tests/comprehensive-module-test.js

如何在 Node 跑

- node AD21_JS_Project/tests/complete-module-test.js

如何在 AD 验证

- 在AD加载构建产物后调用ModuleAccessor.getModule("Core")（未确认：加载方式依赖项目脚本配置）

产出报告在哪里（reports/logs）

- AD21_JS_Project/reports/test-results.json
- AD21_JS_Project/reports/module-dependency-test-report.json

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：在未定义全局变量时eval返回null，依赖模块未加载会被认为不可用（参见AD21_JS_Project/src/core/module-accessor.js关键词：_getDirectVariable）

TODO（按优先级）

- 未确认：是否需要白名单限制可访问模块（线索：AD21_JS_Project/src/core/module-accessor.js关键词：commonModules）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）
