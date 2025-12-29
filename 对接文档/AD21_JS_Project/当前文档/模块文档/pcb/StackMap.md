模块定位

一句话：规范层名 <-> AD 层ID 映射，提供 Top/Mid/Bottom/Multi 的最小对照。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/core/StackMap.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
StackMap	Object	-	-	Both	注册到window/module.exports/global	支持 exportModule
initFromBoard	Function	boardRef:Object	Object	Both	初始化映射	失败时 fallback Top/Bottom/Multi
getLayerId	Function	name:string	number|null	Both	无	不支持则返回null
getNormalizedLayerName	Function	adLayerId:number	string|null	Both	无	-
getAllNormalizedLayers	Function	-	Array	Both	无	按层序返回
isSupportedLayerName	Function	name:string	boolean	Both	无	-

最小使用示例：3~10 行，能跑

```js
var board = PCBServer().GetCurrentPCBBoard();
StackMap.initFromBoard(board);
var topId = StackMap.getLayerId("TopLayer");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无显式模块依赖（可选使用 UILoggerModule/memLog/ShowMessage）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- boardRef.LayerStack.FirstLayer/NextLayer（未确认）
- 全局常量 eTopLayer/eBottomLayer/eMultiLayer（若存在）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不负责创建/修改 LayerStack，仅做映射

运行行为

初始化时做什么

- initFromBoard(): 读取 LayerStack，按层序映射 MidLayer1..N，并补齐 Top/Bottom/Multi

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 仅在 fallback 时输出 warn 日志

副作用：创建对象、修改全局、注册事件、写文件等

- 无

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
normalizedToLayerId	Object	规范层名到 layerId
layerIdToNormalized	Object	layerId 到规范层名
ordered	Array	规范层名顺序

关键常量/枚举

- 规范层名：TopLayer/BottomLayer/MidLayerN/MultiLayer

错误码/异常策略

- 不抛异常；失败返回 {ok:false, error:...}

与其他模块的协作

上游谁调用我

- global-events 的 board.summary 采集
- Wrapper.toSpec/applySpec（通过 StackMap.getLayerId/Name）

我调用谁

- 无

调用链路图（文字即可）

- initFromBoard → LayerStack.FirstLayer/NextLayer → 生成映射 → fallback补齐

测试与验证

关联测试脚本（路径）

- 暂无（依赖 AD LayerStack）

如何在 Node 跑

- 可在 debug/runtime/ad-mock.js 环境中手动调用

如何在 AD 验证

- 调用 StackMap.initFromBoard(PCBServer().GetCurrentPCBBoard())

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- LayerStack API 字段名未确认（FirstLayer/NextLayer/LayerID 依赖文档与实际AD）

TODO（按优先级）

- P1：补充 LayerStack 的真实 API 证据与层序策略

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-29 新增 StackMap
