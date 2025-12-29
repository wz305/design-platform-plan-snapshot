模块定位

一句话：提供系统级状态管理与协调入口，不负责具体子模块加载与持久化。

适用环境：AD

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/core/core.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
Core	Function	userOptions?:Object	coreInstance:Object	AD	注册到window	构造函数形式调用
Core.create	Function	options?:Object	coreInstance:Object	AD	可能创建Logger实例	静态工厂方法
Core.version	String	-	string	AD	无	模块版本
Core.defaultOptions	Object	-	Object	AD	无	默认配置

最小使用示例：3~10 行，能跑

```js
// AD环境
var core = Core.create({ enableLogging: false });
var info = core.getInfo();
core.run();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/base/index.js：使用BaseModule.create提供生命周期

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- window（仅用于导出）
- Logger（可选：存在时创建Logger实例）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不提供module.exports，避免在Node中直接require（仅window导出）

运行行为

初始化时做什么

- 创建BaseModule实例并初始化systemState
- enableLogging=true且存在Logger时创建Logger实例

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅通过可选logger输出（如果已注入）

副作用：创建对象、修改全局、注册事件、写文件等

- window.Core赋值
- 可能创建Logger实例（依赖Logger存在）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
coreInstance.systemState	Object	系统状态（initialized/modulesLoaded等）
coreInstance.state	Object	BaseModule状态
coreInstance.context	Object	计时上下文

关键常量/枚举

- defaultOptions（moduleName/autoInit/enableLogging/systemConfig）

错误码/异常策略

- 直接throw Error；systemState.errorCount自增

与其他模块的协作

上游谁调用我

- 初始化脚本或主入口（未确认：入口文件未在此模块中定义）

我调用谁

- BaseModule.create
- Logger.create（可选）

调用链路图（文字即可）

- 上游入口 -> Core.create -> BaseModule.create -> Core._performInitialization

测试与验证

关联测试脚本（路径）

- 未确认：未找到 tests/ 或 debug/ 目录中直接测试脚本（线索：analyzer/构建文件语义总览分析报告.md 关键词：Core）

如何在 Node 跑

- 不适用：该模块未导出到module.exports（仅window导出）

如何在 AD 验证

- 在AD加载构建产物后调用Core.create并观察systemState变化

产出报告在哪里（reports/logs）

- 未确认：无固定报告输出

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：Logger未定义时静默降级，仅记录warning到systemState（参见AD21_JS_Project/src/core/core.js关键词：Logger.create）

TODO（按优先级）

- 未确认：是否需要提供module.exports以支持Node测试

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）
