模块定位

一句话：提供 PCB 原生对象的 Mock 创建与模板管理（便于离线/测试），不负责真实AD对象创建与板级数据来源。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/PCBMockSystem.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
PCBMockSystem	Object	-	-	Both	注册到window/module.exports/global	IIFE模块导出
createMockObject	Function	objectType:string, mockData?:Object	Object	Both	创建并缓存Mock对象	会为每个字段动态定义getter/setter（ES5风险，见“已知问题”）
getMockObject	Function	mockId:string	Object|null	Both	读取缓存	-
removeMockObject	Function	mockId:string	boolean	Both	修改缓存	-
getAllMockObjects	Function	-	Array	Both	读取缓存	-
clearAllMockObjects	Function	-	number	Both	清空缓存	返回清理数量
getMockDataTemplate	Function	objectType:string	Object|null	Both	读取模板	-
getAllMockDataTemplates	Function	-	Object	Both	读取模板	-
getMockObjectId	Function	objectType:string	number	Both	依赖AD常量	使用 eArcObject/ePadObject/...（需要外部提供）
getMockStatistics	Function	-	Object	Both	读取统计	-
initialize	Function	-	boolean	Both	初始化模板	会引用AD常量（需要外部提供）
version	String	-	string	Both	无	模块版本

最小使用示例：3~10 行，能跑

（Node 环境最小示例：不调用 initialize/createMockObject，以避免AD常量依赖）

```js
var PCBMockSystem = require("./src/modules/pcb-interfaces/core/PCBMockSystem.js");
console.log(typeof PCBMockSystem.getMockStatistics === "function");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/core/PCBMockSystem.js：内部模板依赖AD常量（eArcObject/eTopLayer等）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- AD常量（未确认/外部提供）：`eArcObject/ePadObject/eTrackObject/eViaObject/...` 与 `eTopLayer/eBottomLayer/...`（线索：`_initializeMockDataTemplates`）
- ES5 API：`Object.defineProperty`（AD JScript 5.8 是否支持未确认）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应依赖UI控件（memLog等）或写文件逻辑；本模块应保持纯Mock与内存缓存

运行行为

初始化时做什么

- initialize() 会调用 `_initializeMockDataTemplates()` 生成默认模板（会访问AD常量）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console（内部 `_createMockLogger` 的 debug/info/warn/error）

副作用：创建对象、修改全局、注册事件、写文件等

- 维护 `_mockObjects` 缓存（create/remove/clear）
- createMockObject 会对 mockObject 的每个字段执行 `Object.defineProperty`（动态属性）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
mockObject._mockId	string	自动生成ID（形如 `MOCK_1001`）
mockObject._mockType	string	类型名（Arc/Pad/Track/Via/...）
mockObject._mockData	Object	合并后的Mock数据（模板+用户覆盖）
mockObject.GetProperty	Function	propertyName:string -> any	读取_mockData字段
mockObject.SetProperty	Function	propertyName:string,value:any -> void	写入_mockData字段

关键常量/枚举

- objectType：`Arc/Pad/Track/Via/BoardOutline/SignalLayer/MechanicalLayer/DielectricLayer/InternalPlane`

错误码/异常策略

- create/get/remove 等失败时 `throw error`；日志通过 mock logger 输出到 console

与其他模块的协作

上游谁调用我

- PCBObjectFactory.createWrapper（Mock路径：`options.isMock` 或缺省 nativeObject 时）
- PCBInterfaces.createMock/initialize

我调用谁

- 无（依赖外部AD常量）

调用链路图（文字即可）

- PCBInterfaces.createMock → PCBMockSystem.createMockObject → PCBObjectFactory.createWrapper

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js（仅加载检查）
- debug/runtime：`AD21_JS_Project/debug/runtime/ad-mock.js`（可能用于提供AD常量，未确认；关键词 `eArcObject`）

如何在 Node 跑

- 若要调用 `initialize/createMockObject`：需要先提供AD常量（可参考 `debug/runtime/ad-mock.js`）。

如何在 AD 验证

- 在AD中加载构建产物后调用 `PCBMockSystem.initialize()` 与 `createMockObject`，观察是否能生成Mock对象。

产出报告在哪里（reports/logs）

- 无直接报告；统计通过 `getMockStatistics()` 获取

已知问题与 TODO

已知坑点（必须可复现）

- 使用了 `Object.defineProperty`（ES5），与文件头宣称“100%兼容JScript 5.8 (ES3)”存在冲突；在AD JScript 5.8 上可能不可用（线索：`src/modules/pcb-interfaces/core/PCBMockSystem.js` 关键词 `Object.defineProperty`）。
- initialize/createMockObject 在未提供AD常量时会在运行期抛错（ReferenceError），因为模板包含 `eArcObject/eTopLayer/...`（线索：同文件 `_initializeMockDataTemplates`）。

TODO（按优先级）

- P0：提供ES3兼容实现（避免Object.defineProperty），或在AD侧明确最低运行时要求。
- P0：明确并集中管理AD常量注入（例如由 `debug/runtime/ad-mock.js` 统一提供）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-15 ES3语义系统Stage4完成
- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-10 ‘’

