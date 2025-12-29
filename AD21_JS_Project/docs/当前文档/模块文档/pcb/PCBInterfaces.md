模块定位

一句话：提供“PCB对象封装体系”的统一入口与门面（初始化/创建封装/查询统计/清理），不负责实现具体封装逻辑。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
PCBInterfaces	Object	-	-	Both	注册到window/module.exports/global	主入口IIFE模块
initialize	Function	options?:Object	boolean	Both	初始化Mock/Factory/Pool并注册Wrappers	依赖全局PCBMockSystem/PCBObjectFactory/PCBObjectPool/ArcWrapper等
createWrapper	Function	objectType:string, options?:Object	wrapper:Object	Both	可能创建Mock对象/调用工厂	内部调用PCBObjectFactory.createWrapper
createFromIterator	Function	iterator:Object, objectType:string, options?:Object	Array	Both	可能遍历AD迭代器	已知问题：调用了PCBObjectFactory.createFromIterator（源码中不存在；线索见“已知问题”）
createMock	Function	objectType:string, mockData?:Object	wrapper:Object	Both	创建Mock原生对象并封装	依赖PCBMockSystem.createMockObject与PCBObjectFactory.createWrapper
getObjectPool	Function	poolType:string	Any	Both	读取对象池信息	已知问题：poolType注释与PCBObjectPool支持值不一致
getStatistics	Function	-	Object	Both	读取Factory/Pool/Mock统计	依赖对应子模块的get*Statistics
cleanup	Function	-	void	Both	清空对象池/Mock对象/重置统计	会改变全局状态（Pool/Mock/Factory统计）
isReady	Function	-	boolean	Both	无	返回内部isInitialized标志
getSupportedTypes	Function	-	Array	Both	无	返回PCBObjectFactory.getSupportedObjectTypes()
BasePCBWrapper	Any	-	-	Both	无	透传引用（依赖全局BasePCBWrapper）
PCBMockSystem	Any	-	-	Both	无	透传引用（依赖全局PCBMockSystem）
PCBObjectFactory	Any	-	-	Both	无	透传引用（依赖全局PCBObjectFactory）
PCBObjectPool	Any	-	-	Both	无	透传引用（依赖全局PCBObjectPool）
GeometryCalculator	Any	-	-	Both	无	透传引用（依赖全局GeometryCalculator）
ArcWrapper	Any	-	-	Both	无	透传引用（依赖全局ArcWrapper）
PadWrapper	Any	-	-	Both	无	透传引用（依赖全局PadWrapper）
TrackWrapper	Any	-	-	Both	无	透传引用（依赖全局TrackWrapper）
ViaWrapper	Any	-	-	Both	无	透传引用（依赖全局ViaWrapper）

最小使用示例：3~10 行，能跑

（Node 环境下只做“加载+调用纯函数/不触发AD常量”的最小示例）

```js
var PCBInterfaces = require("./src/modules/pcb-interfaces/index.js");
// 只验证导出面可用；不调用initialize（会触发AD常量依赖链）
console.log(typeof PCBInterfaces.initialize === "function");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/index.js：直接引用全局PCBMockSystem/PCBObjectFactory/PCBObjectPool/GeometryCalculator与各Wrapper

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- console.log（SimpleLogger默认输出）
- AD常量与对象体系（未确认）：eArcObject/ePadObject/...、IPCB_*原生对象、迭代器接口（线索：`src/modules/pcb-interfaces/core/PCBMockSystem.js` 关键词 `eArcObject`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要从本模块“反向访问”UI层/日志层（本模块目标是PCB封装门面，不应耦合UI控件或memLog）

运行行为

初始化时做什么

- initialize()：
  - PCBMockSystem.initialize()（若存在）
  - PCBObjectFactory.initialize()（若存在）
  - PCBObjectPool.initialize()（若存在）
  - registerWrappers()：向PCBObjectFactory注册 Arc/Pad/Track/Via 的构造器

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console（SimpleLogger）

副作用：创建对象、修改全局、注册事件、写文件等

- 修改模块内部状态 `isInitialized`
- 通过子模块可能修改全局对象池、Mock对象集合与Factory统计（cleanup/initialize路径）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
options	Object	initialize/createWrapper的配置集合（未形成统一schema，按调用点透传）
wrapper	Object	由PCBObjectFactory/Wrapper创建的封装对象（形态依赖具体Wrapper实现）

关键常量/枚举

- 未定义（依赖AD全局常量体系；线索：`src/modules/pcb-interfaces/core/PCBObjectFactory.js` 关键词 `_getObjectTypeFromId`）

错误码/异常策略

- 主要通过 `throw error` 抛出异常；日志用 `logger.debug/info/error` 输出到 console

与其他模块的协作

上游谁调用我

- tests：`AD21_JS_Project/tests/module-dependency-test.js`（加载与接口存在性检查）
- AD UI：可能由 `src/core/global-events.js` 等全局事件调用（线索：关键词 `PCBInterfaces`）

我调用谁

- PCBMockSystem / PCBObjectFactory / PCBObjectPool / (Arc|Pad|Track|Via)Wrapper / GeometryCalculator（均为全局依赖）

调用链路图（文字即可）

- initialize → (PCBMockSystem.initialize) → (PCBObjectFactory.initialize) → (PCBObjectPool.initialize) → registerWrappers
- createWrapper → PCBObjectFactory.createWrapper → (BasePCBWrapper / 具体Wrapper)
- createMock → PCBMockSystem.createMockObject → PCBObjectFactory.createWrapper

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- `node AD21_JS_Project/tests/module-dependency-test.js`（注意：该脚本只检查“模块加载/函数存在性”，不保证行为正确）

如何在 AD 验证

- 未确认：需要在AD中加载构建产物并调用 `PCBInterfaces.initialize()` 后创建封装对象（线索：`AD21_JS_Project/dist/main_utf8.js` 关键词 `PCBInterfaces`）

产出报告在哪里（reports/logs）

- 无直接报告产出；统计可通过 `PCBInterfaces.getStatistics()` 获取

已知问题与 TODO

已知坑点（必须可复现）

- `createFromIterator()` 内部调用 `PCBObjectFactory.createFromIterator`，但工厂导出为 `createWrappersFromIterator`（线索：`src/modules/pcb-interfaces/index.js` 关键词 `createFromIterator`；`src/modules/pcb-interfaces/core/PCBObjectFactory.js` 关键词 `createWrappersFromIterator`）。
- `getObjectPool(poolType)` 注释写 `native/wrapped/modified`，但 `PCBObjectPool` 的合法池名为 `nativePool/wrapped/modified`（线索：`src/modules/pcb-interfaces/core/PCBObjectPool.js` 关键词 `_validatePoolType`）。

TODO（按优先级）

- P0：修复 `createFromIterator` 调用目标（统一为 `createWrappersFromIterator` 或补齐 `createFromIterator`）。
- P0：统一对象池 poolType 命名与文档（native vs nativePool）。
- P1：允许注入 logger（替代固定 SimpleLogger），并明确日志通道策略。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 3
- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-13 1
- 2025-12-10 ‘’

