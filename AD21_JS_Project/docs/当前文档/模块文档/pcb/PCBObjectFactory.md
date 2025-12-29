模块定位

一句话：提供“原生对象 → Wrapper”的工厂与类型识别（基于 ObjectId 映射），不负责对象池/生命周期与UI交互。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectFactory.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
PCBObjectFactory	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
initialize	Function	-	boolean	Both	初始化类型映射	会访问AD常量（eArcObject等）
registerWrapperConstructor	Function	objectType:string, constructor:Function	boolean	Both	修改内部注册表	用于把 ArcWrapper 等注册进工厂
createWrapper	Function	nativeObject?:Object, options?:Object	wrapper:Object	Both	可能创建Mock原生对象、调用BasePCBWrapper	真实对象路径依赖 nativeObject.ObjectId 与AD常量
createWrappersFromIterator	Function	iterator:Object, options?:Object	Array	Both	遍历迭代器创建多个wrapper	要求 iterator.First/iterator.Next（代码有接口检查）
getObjectType	Function	nativeObject:Object	string	Both	类型识别	会读 nativeObject.ObjectId 并查映射
getSupportedObjectTypes	Function	-	Array	Both	无	返回工厂支持类型列表
isObjectTypeSupported	Function	objectType:string	boolean	Both	无	-
getFactoryStatistics	Function	-	Object	Both	无	返回创建统计
resetFactoryStatistics	Function	-	boolean	Both	重置统计	-
version	String	-	string	Both	无	模块版本

最小使用示例：3~10 行，能跑

（Node环境：仅示例导出存在性；真实调用需提供AD常量与BasePCBWrapper/PCBMockSystem/各Wrapper）

```js
var PCBObjectFactory = require("./src/modules/pcb-interfaces/core/PCBObjectFactory.js");
console.log(typeof PCBObjectFactory.createWrapper === "function");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectFactory.js：依赖 BasePCBWrapper（Unknown或无注册构造时回退）
- AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectFactory.js：依赖 PCBMockSystem（Mock路径缺省nativeObject时创建）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- AD常量（未确认/外部提供）：`eArcObject/ePadObject/...`（用于对象类型映射，线索：`_getObjectTypeFromId` 与 `_initializeObjectTypeMapping`）
- AD原生对象接口：`nativeObject.ObjectId` 必须存在（真实对象路径）
- logger（可选全局）：若定义 `logger.debug/info/warn/error`，会被 `_createFactoryLogger` 使用

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应耦合UI（memLog）或文件写入；应只做“识别+创建”

运行行为

初始化时做什么

- initialize() 会构建 `_objectTypeMapping`，把类型名映射到 objectId（依赖AD常量）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 若存在全局 `logger`：写到 logger；否则静默

副作用：创建对象、修改全局、注册事件、写文件等

- 修改内部 `_wrapperConstructors/_objectTypeMapping/_factoryStats`
- createWrapper(mock) 可能创建并缓存Mock对象（通过PCBMockSystem）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
options.isMock	boolean	是否走Mock路径
options.mockType	string	Mock类型名（Arc/Pad/...）
options.mockData	Object	Mock数据覆盖
options.enableCache	boolean	是否启用BasePCBWrapper缓存（透传）
nativeObject.ObjectId	number	AD对象类型ID（用于识别类型）

关键常量/枚举

- `ObjectId → Type` 映射：eArcObject→Arc，ePadObject→Pad，eTrackObject→Track，eViaObject→Via 等（线索：`_getObjectTypeFromId`）

错误码/异常策略

- 主要通过 `throw error`；同时使用 logger.warn/error 记录失败原因

与其他模块的协作

上游谁调用我

- PCBInterfaces.createWrapper/createMock
- PCBObjectManager（若作为通用工厂管理器使用；当前PCBObjectManager实际绕过工厂，直接调用各Wrapper.create）

我调用谁

- PCBMockSystem（Mock创建）
- BasePCBWrapper（回退封装/Unknown类型封装）
- 已注册的具体Wrapper构造器（ArcWrapper/PadWrapper/TrackWrapper/ViaWrapper）

调用链路图（文字即可）

- createWrapper(real) → validate nativeObject → objectType = map(ObjectId) → (registered? wrapperCtor : BasePCBWrapper.create) → wrapper.init()
- createWrapper(mock) → (nativeObject缺省? PCBMockSystem.createMockObject) → (registered? wrapperCtor : BasePCBWrapper.create) → wrapper.init()

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- `node AD21_JS_Project/tests/module-dependency-test.js`
- 若要真正执行 `initialize/createWrapper(real)`：需提供AD常量与IPC_*对象模拟（可参考 `AD21_JS_Project/debug/runtime/ad-mock.js`）

如何在 AD 验证

- 在AD中加载构建产物后：调用 `PCBObjectFactory.initialize()`，再对真实 `IPCB_*` 对象调用 `createWrapper`

产出报告在哪里（reports/logs）

- 无直接报告；统计通过 `getFactoryStatistics()`

已知问题与 TODO

已知坑点（必须可复现）

- `createWrappersFromIterator` 的迭代实现可能存在接口错误：代码检查 `typeof iterator.First !== "function"`，但又使用 `nativeObject = iterator.First` 而非 `iterator.First()`（线索：`src/modules/pcb-interfaces/core/PCBObjectFactory.js` 关键词 `createWrappersFromIterator`）。

TODO（按优先级）

- P0：修复迭代器接口调用（明确 First/Next 是方法还是属性，并统一实现）。
- P1：补齐 `createFromIterator` 的别名/兼容方法，供 PCBInterfaces 调用。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-15 ES3语义系统Stage4完成
- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-10 ‘’

