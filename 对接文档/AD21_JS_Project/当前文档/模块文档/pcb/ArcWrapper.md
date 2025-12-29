模块定位

一句话：封装 IPCB_Arc（圆弧）对象，提供中心/半径/角度/线宽/层的读写与命中测试/几何计算，不负责对象类型识别与对象池管理。

适用环境：Both

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/wrappers/ArcWrapper.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ArcWrapper	Function	options?:Object	wrapper:Object	Both	注册到window/module.exports/global	导出构造函数（返回BasePCBWrapper实例扩展）
ArcWrapper.create	Function	options?:Object	wrapper:Object	Both	创建wrapper并可能init	-
ArcWrapper.getDefaultMockData	Function	-	Object	Both	无	返回默认Mock数据
ArcWrapperInstance.getCenterX/setCenterX	Function	- / value:number	number/void	Both	读写原生对象或Mock数据	set* 内部调用 `_markDirty`（基类未实现，见“已知问题”）
ArcWrapperInstance.getCenterY/setCenterY	Function	- / value:number	number/void	Both	读写属性	同上
ArcWrapperInstance.getRadius/setRadius	Function	- / value:number	number/void	Both	读写属性	-
ArcWrapperInstance.getStartAngle/setStartAngle	Function	- / value:number	number/void	Both	读写属性	-
ArcWrapperInstance.getEndAngle/setEndAngle	Function	- / value:number	number/void	Both	读写属性	-
ArcWrapperInstance.getLineWidth/setLineWidth	Function	- / value:number	number/void	Both	读写属性	-
ArcWrapperInstance.getLayer/setLayer	Function	- / value:any	any/void	Both	读写属性	-
ArcWrapperInstance.rotateAroundXY	Function	centerX:number,centerY:number,angle:number	void	Both	可能调用原生RotateAroundXY并刷新属性	高优先级API
ArcWrapperInstance.getState_StrictHitTest	Function	x:number,y:number	boolean	Both	可能调用原生GetState_StrictHitTest	高优先级API（降级到几何检测）
ArcWrapperInstance.getStartPoint/getEndPoint	Function	-	Object	Both	无	依赖GeometryCalculator（若存在）
ArcWrapperInstance.getArcLength/getBoundingBox	Function	-	number/Object	Both	无	依赖GeometryCalculator（若存在）

最小使用示例：3~10 行，能跑

```js
var ArcWrapper = require("./src/modules/pcb-interfaces/wrappers/ArcWrapper.js");
var w = ArcWrapper.create({ enableMock: true });
console.log(typeof w.getArcInfo === "function");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/wrappers/ArcWrapper.js：依赖 BasePCBWrapper（基类）
- AD21_JS_Project/src/modules/pcb-interfaces/wrappers/ArcWrapper.js：可选依赖 GeometryCalculator（极坐标转换/弧长/包围盒）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 原生对象字段：XCenter/YCenter/Radius/StartAngle/EndAngle/LineWidth/Layer
- 原生方法（可选）：RotateAroundXY/GetState_StrictHitTest

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在Wrapper里写UI控件/写文件；日志/错误应走统一通道（当前调用 baseInst.handleError，基类未实现）

运行行为

初始化时做什么

- 创建 BasePCBWrapper 实例并重写 `_extractSpecificProperties/_syncPropertiesToNative`
- 初始化阶段调用 `_extractSpecificProperties()` 读取原生对象属性到缓存（非Mock）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 未显式输出；异常处理调用 `baseInst.handleError`（未确认存在）

副作用：创建对象、修改全局、注册事件、写文件等

- set* 会改写原生对象属性（通过 setNativeProperty）并尝试标记dirty
- rotateAroundXY 可能直接调用原生方法并刷新缓存

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
mockData.centerX/centerY	number	Mock中心点（若未提供，部分getter会回退到X1/Y1或0）
mockData.radius	number	Mock半径
mockData.startAngle/endAngle	number	Mock角度（度）
mockData.lineWidth	number	Mock线宽

关键常量/枚举

- 未定义

错误码/异常策略

- 多数异常捕获后走 `baseInst.handleError(name, error)`（但基类未实现；见“已知问题”）

与其他模块的协作

上游谁调用我

- PCBObjectFactory（注册后用于 createWrapper）
- PCBObjectManager（按类型创建wrapper）

我调用谁

- BasePCBWrapper
- GeometryCalculator（若存在）

调用链路图（文字即可）

- ArcWrapper.create(options) → BasePCBWrapper.create({ objectType:"Arc", nativeObject, ... }) → (get/set/rotate/hittest/geometry)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js

如何在 Node 跑

- `node AD21_JS_Project/tests/module-dependency-test.js`（仅加载检查）

如何在 AD 验证

- 对真实IPC_Arc对象：调用 rotateAroundXY/getState_StrictHitTest/getArcLength 校验

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- ArcWrapper 使用 `baseInst.handleError` 与 `baseInst._markDirty`，但 BasePCBWrapper 未实现（线索：`src/modules/pcb-interfaces/wrappers/ArcWrapper.js` 关键词 `handleError`/`_markDirty`）。
- PCBObjectManager 对ArcWrapper.create的传参签名不一致（同 TrackWrapper）。

TODO（按优先级）

- P0：补齐基类 handleError/_markDirty 或替换为现有接口（setProperty已可标记dirty）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-13 1
- 2025-12-10 ‘’

