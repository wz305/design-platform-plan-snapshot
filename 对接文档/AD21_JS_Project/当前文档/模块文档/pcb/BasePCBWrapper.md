模块定位

一句话：提供PCB对象封装的“基类/运行时框架”（生命周期+缓存+Mock+双向同步+原生访问），不负责具体对象类型（Track/Via/Pad/Arc）的属性语义。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/BasePCBWrapper.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
BasePCBWrapper	Object	-	-	AD	注册到window	仅 `window.BasePCBWrapper`，无 module.exports/global
create	Function	userOptions?:Object	instance:Object	AD	可能autoInit；读/写原生对象属性	创建封装实例（返回含init/run/destroy与属性访问API）
init	Function	instance:Object	boolean	AD	校验nativeObject（非Mock）；一次性提取属性缓存	初始化实例并可触发Hook
run	Function	instance:Object	Object|null	AD	执行_executeMainLogic（默认无副作用）	默认实现仅返回成功结果
destroy	Function	instance:Object	boolean	AD	必要时syncToNative；清理缓存/Hook/原生引用	销毁实例
version	String	-	string	AD	无	模块版本（源码：`2.0.0`）
defaultOptions	Object	-	Object	AD	无	默认配置（enableCache/enableDirectAccess/syncMode等）

最小使用示例：3~10 行，能跑

（AD环境伪代码：需要真实 IPCB_* 原生对象）

```js
var w = BasePCBWrapper.create({ objectType: "Track", nativeObject: SomeIPCB_Track, autoInit: true });
var x1 = w.getProperty("X1");
w.setProperty("X1", x1 + 100);
w.syncToNative();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/core/BasePCBWrapper.js：无显式模块依赖（作为基类框架）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- AD原生对象体系：实例在非Mock模式下要求 `options.nativeObject` 存在，并能读写属性（例如 `ObjectId/I_ObjectAddress/V6_LayerID/V7_LayerID/LayerStack` 等）
- JSON（用于debug日志拼接与部分序列化；若AD无JSON需依赖构建产物中的polyfill，未确认；线索：`dist/main_utf8.js` 中 `json2.js`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在基类直接耦合具体对象封装器（ArcWrapper/TrackWrapper等）或UI控件/写文件逻辑

运行行为

初始化时做什么

- 合并默认配置
- 创建 state/context/hooks
- 校验：非Mock对象必须提供 nativeObject
- enableCache=true 时调用 `_extractSpecificProperties` 提取并缓存属性

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 默认不直接写UI；若 `instance.logger` 被外部注入，可能调用其 debug/info/error

副作用：创建对象、修改全局、注册事件、写文件等

- 读写 `nativeObject[propertyName]`（getProperty/setProperty、getNativeProperty/setNativeProperty/callNativeMethod）
- syncToNative 可能把缓存属性回写到原生对象（取决于子类是否重写 `_syncPropertiesToNative`）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
instance.options	Object	配置（enableCache/enableMock/enableDirectAccess/syncMode等）
instance.nativeObject	Object|null	AD原生对象引用（非Mock必须存在）
instance.cachedProperties	Object	属性缓存（enableCache开启时使用）
instance.isDirty	boolean	是否需要同步到原生对象
instance.objectType	string	对象类型标识（例如 Track/Pad/Via/Arc；由创建方指定）
instance.hooks	Object	生命周期与访问Hook集合（onBeforeInit/onAfterPropertyAccess等）

关键常量/枚举

- `syncMode`: `"auto" | "manual" | "realtime"`

错误码/异常策略

- 直接 `throw new Error(...)`；同时会累加 `state.errorCount` 并记录 `state.lastError`

与其他模块的协作

上游谁调用我

- pcb wrappers：TrackWrapper/PadWrapper/ArcWrapper/ViaWrapper（作为基类）
- tests：`AD21_JS_Project/tests/module-dependency-test.js`（仅模块加载检查）

我调用谁

- 无（子类可重写并引入GeometryCalculator等）

调用链路图（文字即可）

- Wrapper.create → BasePCBWrapper.create → (autoInit? init) → getProperty/setProperty → (syncToNative/syncFromNative)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js（仅“模块加载”层面）

如何在 Node 跑

- 未确认：该文件无 `module.exports`，`require()` 会返回空对象 `{}`（但测试脚本仅用 `typeof !== "undefined"`，并不等价于可用）。

如何在 AD 验证

- 在AD中加载构建产物后，检查 `window.BasePCBWrapper` 是否存在并能对真实IPC_*对象读写属性。

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- 多个Wrapper源码调用 `baseInst.handleError(...)` 与 `baseInst._markDirty()`，但 BasePCBWrapper 未实现这两个方法（线索：`src/modules/pcb-interfaces/wrappers/*.js` 关键词 `handleError`/`_markDirty`；`src/modules/pcb-interfaces/core/BasePCBWrapper.js` 未包含对应实现）。

TODO（按优先级）

- P0：补齐 `handleError/_markDirty` 或统一Wrapper实现改用现有API（如 setProperty 已会标记 isDirty）。
- P1：明确 Node 侧导出策略（增加 `module.exports = BasePCBWrapper` 或给出“只在合并产物使用”的规则）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-15 ES3语义系统Stage4完成
- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-13 1
- 2025-12-10 ‘’

