模块定位

一句话：封装 IPCB_Track，并提供 Spec v0.1 的 toSpec/applySpec 最小互转。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/wrappers/TrackWrapper.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
TrackWrapper	Function	options?:Object	wrapper:Object	Both	注册到window/module.exports/global	构造函数（返回BasePCBWrapper实例扩展）
TrackWrapper.create	Function	options?:Object	wrapper:Object	Both	无	工厂入口
TrackWrapper.getDefaultMockData	Function	-	Object	Both	无	默认Mock数据
TrackWrapperInstance.initFromNative	Function	nativeRef:Object	boolean	Both	写入对象池	设置 nativeRef/handle/address
TrackWrapperInstance.toSpec	Function	-	Object	Both	无	spec/0.1 track
TrackWrapperInstance.applySpec	Function	specPayload:Object	Object	Both	写回原生对象	白名单字段

最小使用示例：3~10 行，能跑

```js
var TrackWrapper = require("./src/modules/pcb-interfaces/wrappers/TrackWrapper.js");
var w = TrackWrapper.create({ enableMock: true });
var spec = w.toSpec();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/core/BasePCBWrapper.js：基类
- AD21_JS_Project/src/modules/pcb-interfaces/core/PCBObjectPool.js：注册对象池
- AD21_JS_Project/src/modules/pcb-interfaces/core/StackMap.js：层名映射（可选）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- IPCB_Track Interface（未确认：参考示例/1.接口文档(处理后版本)/Scripting API/04-System_API_Low_-level_Routines/01-System_API_Low_Level_Routines_Reference/12-a_id_Functions_from_ClientProcs_unit_a_Functions_from_ClientProcs_unit.md-part188.md#IPCB_Track_Interface）
- 原生字段：X1/Y1/X2/Y2/Width/Layer/Net/I_ObjectAddress（未确认完整性，需对照接口条目补证）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接调用非白名单 methodName（遵循动作+spec）

运行行为

初始化时做什么

- 构造时若有 nativeObject：设置 handle/address 并注册 PCBObjectPool

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅在异常时写 UILogger/memLog

副作用：创建对象、修改全局、注册事件、写文件等

- initFromNative 注册对象池
- applySpec 写回原生对象

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
handle/address	number|string	来自 I_ObjectAddress/ObjectAddress（未确认）

关键常量/枚举

- eTopLayer/eBottomLayer/eMultiLayer（可选，若存在用于StackMap兜底）

错误码/异常策略

- applySpec 返回 {ok:false,error:{code,message}}

与其他模块的协作

上游谁调用我

- PCBObjectFactory/PCBInterfaces

我调用谁

- PCBObjectPool.register
- StackMap.getLayerId/getNormalizedLayerName

调用链路图（文字即可）

- initFromNative → 注册对象池 → toSpec/applySpec

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- `node tests/module-dependency-test.js`

如何在 AD 验证

- 对真实IPC_Track对象调用 toSpec/applySpec

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- Net 写入方式未确认，仅做 feature-detect

TODO（按优先级）

- P1：补充 Track.Layer/Net 的真实 API 证据

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-29 增加 initFromNative/toSpec/applySpec
