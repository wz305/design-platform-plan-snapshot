模块定位

一句话：提供几何/电气计算工具集合（距离、角度、包围盒、面积、阻抗等），不负责读取/写入AD对象。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/pcb-interfaces/calculators/GeometryCalculator.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
GeometryCalculator	Object	-	-	AD	注册到window	仅 `window.GeometryCalculator`，无 module.exports/global
calculateDistance	Function	x1:number,y1:number,x2:number,y2:number	number	AD	console输出	-
calculateAngle	Function	x1:number,y1:number,x2:number,y2:number	number	AD	console输出	-
calculateMidPoint	Function	x1:number,y1:number,x2:number,y2:number	Object	AD	console输出	返回 `{x,y}`
polarToCartesian	Function	centerX:number,centerY:number,radius:number,angle:number	Object	AD	console输出	返回 `{x,y}`
calculateArcLength	Function	radius:number,startAngle:number,endAngle:number	number	AD	console输出	-
calculateCircleBoundingBox	Function	centerX:number,centerY:number,radius:number	Object	AD	console输出	返回 `{x1,y1,x2,y2}`
calculateRectBoundingBox	Function	x:number,y:number,width:number,height:number	Object	AD	console输出	返回 `{x1,y1,x2,y2}`
calculateTrackBoundingBox	Function	x1:number,y1:number,x2:number,y2:number,width:number	Object	AD	console输出	-
calculateCircleArea	Function	radius:number	number	AD	console输出	-
calculatePadArea	Function	sizeX:number,sizeY:number,shape:string	number	AD	console输出	shape支持Rect/Round/Octagonal/RoundedRect
isPointInCircle	Function	x:number,y:number,centerX:number,centerY:number,radius:number	boolean	AD	console输出	-
isPointOnLine	Function	x:number,y:number,x1:number,y1:number,x2:number,y2:number,tolerance:number	boolean	AD	console输出	-
isPointOnArc	Function	x:number,y:number,centerX:number,centerY:number,radius:number,startAngle:number,endAngle:number,tolerance:number	boolean	AD	console输出	-
isPointInPad	Function	x:number,y:number,padX:number,padY:number,sizeX:number,sizeY:number,shape:string,rotation:number	boolean	AD	console输出	包含旋转处理
rotatePoint	Function	x:number,y:number,centerX:number,centerY:number,angle:number	Object	AD	console输出	-
extendLine	Function	x1:number,y1:number,x2:number,y2:number,extension:number	Object	AD	console输出	-
doBoundingBoxesIntersect	Function	box1:Object,box2:Object	boolean	AD	console输出	-
calculateTrackResistance	Function	length:number,width:number,thickness:number	number	AD	console输出	简化模型
calculateTrackCapacitance	Function	length:number,width:number,layer:Object	number	AD	console输出	简化模型
calculateTrackImpedance	Function	width:number,thickness:number,layer:Object	number	AD	console输出	简化模型
calculateViaResistance	Function	size:number,holeSize:number,startLayer:Object,endLayer:Object	number	AD	console输出	简化模型
calculateViaCapacitance	Function	size:number,holeSize:number,startLayer:Object,endLayer:Object	number	AD	console输出	简化模型
calculateViaInductance	Function	size:number,holeSize:number,startLayer:Object,endLayer:Object	number	AD	console输出	简化模型
calculateViaImpedance	Function	size:number,holeSize:number	number	AD	console输出	简化模型
calculateViaAspectRatio	Function	startLayer:Object,endLayer:Object,holeSize:number	number	AD	console输出	简化模型

最小使用示例：3~10 行，能跑

```js
// AD环境：确保 window.GeometryCalculator 已加载
var d = GeometryCalculator.calculateDistance(0, 0, 3, 4);
var box = GeometryCalculator.calculateRectBoundingBox(0, 0, 10, 20);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/pcb-interfaces/calculators/GeometryCalculator.js：无显式模块依赖

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- Math（几何计算）
- console（SimpleLogger输出）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应依赖具体Wrapper或AD原生对象（保持纯计算器）

运行行为

初始化时做什么

- 无初始化过程（纯静态方法集合）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- console.log（每个方法都会debug输出输入与结果）

副作用：创建对象、修改全局、注册事件、写文件等

- 无（除console输出）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
box	Object	包围盒结构：`{x1,y1,x2,y2}`
point	Object	点结构：`{x,y}`

关键常量/枚举

- shape（PadArea/PointInPad）：Rect/Round/Octagonal/RoundedRect

错误码/异常策略

- 发生错误时 `throw error`（并写logger.error到console）

与其他模块的协作

上游谁调用我

- TrackWrapper/ArcWrapper/PadWrapper/ViaWrapper（用于几何/电气计算）

我调用谁

- 无

调用链路图（文字即可）

- Wrapper.getBoundingBox/getArea/... → GeometryCalculator.calculate*

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/module-dependency-test.js（仅加载检查）

如何在 Node 跑

- 未确认：该文件无 `module.exports`，`require()` 会返回空对象 `{}`；若需Node使用应通过合并构建产物或补齐导出。

如何在 AD 验证

- 直接在AD脚本控制台调用几个静态函数，观察 console/memLog 输出（console在AD是否可见未确认）

产出报告在哪里（reports/logs）

- 无

已知问题与 TODO

已知坑点（必须可复现）

- Node侧导出缺失：`module.exports` 未定义（线索：`src/modules/pcb-interfaces/calculators/GeometryCalculator.js` 文件底部仅 `window.GeometryCalculator = ...`）。

TODO（按优先级）

- P1：补齐 Node 导出（`module.exports = GeometryCalculator`），并在AD侧保持window导出。
- P2：允许关闭debug日志（避免大量console输出影响性能）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 3
- 2025-12-14 iife
- 2025-12-10 ‘’

