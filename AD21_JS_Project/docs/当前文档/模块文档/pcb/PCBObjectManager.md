模块定位

一句话：提供“原生对象 ↔ Wrapper”的绑定与复用管理（按I_ObjectAddress索引），不负责对象类型识别与几何计算。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectManager.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
PCBObjectManager	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
initialize	Function	factory:Object, logger?:Object	boolean	Both	写入内部_factory/_logger	必须先初始化才能createWrapper/createEmptyWrapper
createWrapper	Function	nativeObject:Object, wrapperType:string, options?:Object	wrapper:Object	Both	创建并注册wrapper到boundObjects	内部依赖各Wrapper.create（存在签名不一致风险）
createEmptyWrapper	Function	wrapperType:string, options?:Object	wrapper:Object	Both	向pendingPool加入空wrapper	标记为Mock并等待后续bind
bindToExisting	Function	wrapper:Object, nativeObject:Object	wrapper:Object	Both	从pendingPool移除并绑定原生对象	会重新init并syncFromNative
createFromExisting	Function	nativeObject:Object, wrapperType:string, options?:Object	wrapper:Object	Both	可能复用已存在wrapper	若已绑定则直接返回
getWrapper	Function	nativeObject:Object	wrapper:Object|null	Both	读取boundObjects	按 I_ObjectAddress 查找
getPendingWrappers	Function	-	Array	Both	读取pendingPool	-
getPendingPoolInfo	Function	-	Array	Both	读取pendingPool	-
destroyWrapper	Function	wrapper:Object	boolean	Both	从boundObjects/pendingPool移除并destroy	会修改缓存
clearAll	Function	-	boolean	Both	销毁并清空所有对象	强副作用：清空缓存/销毁wrapper
getStats	Function	-	Object	Both	读取统计	-
getDebugInfo	Function	-	Object	Both	读取详细列表	-
version	String	-	string	Both	无	模块版本

最小使用示例：3~10 行，能跑

（示例只展示接口形态；真实使用需提供 wrapperType 对应的 Wrapper 与原生对象）

```js
var PCBObjectManager = require("./src/modules/pcb-interfaces/core/PCBObjectManager.js");
PCBObjectManager.initialize({}, null);
console.log(PCBObjectManager.getStats().isInitialized === true);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectManager.js：运行时依赖 `TrackWrapper/ArcWrapper/PadWrapper/ViaWrapper` 全局变量

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- AD原生对象属性：`nativeObject.I_ObjectAddress`（用于生成绑定键）
- Wrapper实例必须提供 `getNativeObject()`、`destroy()`（部分路径需要）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从管理器内部直接访问 UI 控件或文件系统；本模块应仅做绑定/池管理

运行行为

初始化时做什么

- initialize(factory, logger) 保存引用到 `_factory/_logger`（但当前实现创建wrapper时并未使用factory）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 若传入 `_logger` 且提供 debug/info/warn/error：会输出日志（否则静默）

副作用：创建对象、修改全局、注册事件、写文件等

- 维护 `_boundObjects`（按地址键缓存 wrapper）与 `_pendingPool`（待绑定池）
- bindToExisting 会修改 wrapper 的 `nativeObject/isMock/options.nativeObject` 并重新 init/sync

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
nativeObject.I_ObjectAddress	Any	原生对象唯一地址（作为绑定键的一部分）
_boundObjects	Object	`{ \"addr_<I_ObjectAddress>\": wrapper }`
_pendingPool	Array	`[{ wrapper, wrapperType, createdTime, options }]`

关键常量/枚举

- wrapperType 仅允许：`track/arc/pad/via`（大小写不敏感）

错误码/异常策略

- 参数校验失败会 `throw new Error(...)`
- destroyWrapper/clearAll 遇到异常会捕获并返回 false（部分路径）

与其他模块的协作

上游谁调用我

- 未确认：可能由PCBInterfaces或UI事件层调用（线索：搜索 `PCBObjectManager`）

我调用谁

- TrackWrapper/ArcWrapper/PadWrapper/ViaWrapper（createWrapper路径）
- wrapper.init/syncFromNative/destroy（实例方法）

调用链路图（文字即可）

- createWrapper → _createWrapperByType(TrackWrapper.create/...) → _addToBoundObjects
- createEmptyWrapper → _createWrapperByType(null, ...) → pendingPool.push
- bindToExisting → pendingPool.remove → wrapper.init → wrapper.syncFromNative → _addToBoundObjects

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- `node AD21_JS_Project/tests/module-dependency-test.js`（仅模块加载检查）

如何在 AD 验证

- 在AD中对真实 `IPCB_*` 对象：调用 `createFromExisting` 并检查 `getWrapper` 是否可复用同一地址对象

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- `_createWrapperByType` 调用 `TrackWrapper.create(nativeObject, options)` 但 TrackWrapper 的 `create` 定义为 `create(options)`，其它Wrapper同样（签名不一致导致 nativeObject 丢失/包装失败；线索：`src/modules/pcb-interfaces/core/PCBObjectManager.js` 关键词 `TrackWrapper.create`；`src/modules/pcb-interfaces/wrappers/TrackWrapper.js` 关键词 `TrackWrapper.create = function(options)`）。
- initialize(factory) 保存了 _factory，但后续创建wrapper并未使用（可能是设计未完成）。

TODO（按优先级）

- P0：统一 Wrapper.create 签名（推荐：`create(options)`，并在管理器侧传 `{ nativeObject, ... }`）。
- P1：决定管理器是否应使用 PCBObjectFactory（否则移除factory参数）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-15 ES3语义系统Stage4完成
- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-13 1

