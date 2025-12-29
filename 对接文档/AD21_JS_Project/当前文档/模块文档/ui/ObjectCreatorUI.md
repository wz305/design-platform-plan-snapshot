模块定位

一句话：负责对象创建窗体（ObjectCreatorForm）的核心交互逻辑（参数读取/校验/状态更新/调用ObjectModule创建Mock对象）；不负责DFM事件函数的入口（由`src/core/global-events.js`承接）。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/core/ObjectCreatorUI.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ObjectCreatorUI	object	-	-	AD	注册全局变量`ObjectCreatorUI`	纯大IIFE导出
ObjectCreatorUI.create	function	(options)	{controller, config}	AD	初始化内部_controller	读取/写入UI控件（全局变量）
ObjectCreatorUI.initialize	function	()	void	AD	调用`ObjectModule.initialize`、写UI日志	依赖`ObjectModule`存在
ObjectCreatorUI.showWindow	function	()	void	AD	调用`ObjectCreatorForm.Show()`	依赖DFM窗体
ObjectCreatorUI.hideWindow	function	()	void	AD	调用`ObjectCreatorForm.Hide()`	依赖DFM窗体
ObjectCreatorUI.handleObjectTypeChange	function	(newType)	void	AD	切换参数组显示	依赖`grpTrack/grpPad/grpVia/grpArc`等控件
ObjectCreatorUI.handleSetOrigin	function	(x,y)	void	AD	更新坐标/状态；可调用`PositionManager_GLOBAL.setOrigin`	PositionManager_GLOBAL来源需确认
ObjectCreatorUI.handleCreateObject	function	(x,y,atOrigin)	{success, object?|error?}	AD	调用`ObjectModule.createMock`创建对象；写UI日志	创建对象仅为Mock（见代码）
ObjectCreatorUI.handleReset	function	()	void	AD	重置控件值/状态	大量写UI控件
ObjectCreatorUI.controller	function	()	_controller	AD	无	对外暴露内部控制器引用

最小使用示例：3~10 行，能跑

（AD/JScript；要求`ObjectCreatorForm`已加载，且`ObjectModule`可用）

```js
ObjectCreatorUI.initialize();
ObjectCreatorUI.showWindow();
ObjectCreatorUI.handleObjectTypeChange("Track");
var r = ObjectCreatorUI.handleCreateObject(0, 0, true);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/src/modules/object-module/index.js`：通过全局变量`ObjectModule`创建/管理PCB对象（此处用`createMock`）
- `AD21_JS_Project/src/modules/object-creator/core/PositionManager.js`：通过全局变量`PositionManager_GLOBAL`设置原点/配置网格（未确认其注入方式）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- DFM窗体对象：`ObjectCreatorForm`（`AD21_JS_Project/ui/object-creator.dfm`）
- DFM控件全局变量（部分）：`cmbObjectType/edtX/edtY/lblStatus/lblPositionInfo/grpTrack/...`（来源同上DFM，关键词：控件名）
- UI调试输出：`uiInfo/uiWarn/uiError/uiDebug`（`AD21_JS_Project/src/core/global-events.js`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议在Node侧执行：依赖DFM控件全局变量与AD窗体对象。

运行行为

初始化时做什么

- `initialize()`：调用`ObjectModule.initialize({enableLogging,...})`并将引用存到`_controller.ObjectModule`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI输出：通过`uiInfo/uiWarn/uiError/uiDebug`写入`memLog`（主窗体）。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改UI控件：例如`lblStatus.Caption/Font.Color`、`lblPositionInfo.Caption`、`grp*.Visible`、`edt*.Text`等。
- 可能修改位置管理器：`PositionManager_GLOBAL.setOrigin`（线索：`AD21_JS_Project/ui/core/ObjectCreatorUI.js`关键词：`PositionManager_GLOBAL`）。
- 创建对象：调用`ObjectModule.createMock(objectType, mockData)`返回封装对象（当前实现为Mock路径）。

数据结构与约定

关键对象结构（字段表）

- `_controller`（由`_initializeController()`创建）包含：
  - `currentObjectType: "Track"|"Pad"|"Via"|"Arc"`
  - `currentPosition: {x:number, y:number}`
  - `isGridSnapEnabled: boolean`
  - `gridSize: number`
  - `ObjectModule: any|null`
  - `getCurrentParameters(): object`（从控件读取参数）
  - `validateParameters(): {valid:boolean, errors:string[]}`
  - `updateStatus(message,isError): void`（写`lblStatus`）
  - `updatePositionInfo(): void`（写`lblPositionInfo`）

关键常量/枚举

- 对象类型字符串：`Track/Pad/Via/Arc`（来自`ui/object-creator.dfm`下拉框Items）。

错误码/异常策略

- 失败时调用`uiError(...)`并返回`{success:false, error:<message>}`；部分函数会继续`throw`（如`showWindow`）。

与其他模块的协作

上游谁调用我

- `UIModule.showObjectCreatorWindow()`会调用`ObjectCreatorUI.showWindow()`。
- `UIEventManager`会调用`handleObjectTypeChange/handleSetOrigin/handleCreateObject/handleReset`（但其事件入口通常是全局函数，见`src/core/global-events.js`“ObjectCreatorForm DFM事件处理函数”段落）。

我调用谁

- `ObjectModule.initialize/createMock`
- 可选：`PositionManager_GLOBAL.setOrigin`
- UI日志函数：`uiInfo/uiWarn/uiError/uiDebug`

调用链路图（文字即可）

- DFM按钮（ObjectCreatorForm）→ `src/core/global-events.js`（如`btnCreateClick`）→ `UIEventManager.handleCreateClick` → `ObjectCreatorUI.handleCreateObject` → `ObjectModule.createMock` → 返回封装对象（PCB mock wrapper）

测试与验证

关联测试脚本（路径）

- 未确认：当前缺少覆盖“DFM控件交互 + ObjectModule.createMock”的自动化测试脚本。

如何在 Node 跑

- 不建议：强依赖AD窗体与控件全局变量。

如何在 AD 验证

- 加载`dist/Main.PrjScr`后打开对象创建窗体（主窗体按钮或`ObjectCreatorWindow.show()`）。
- 在ObjectCreatorForm内填写参数并点击“创建对象/在原点创建”，观察`lblStatus`与`memLog`输出。

产出报告在哪里（reports/logs）

- UI日志：`memLog`（主窗体Memo控件）

已知问题与 TODO

已知坑点（必须可复现）

- `PositionManager_GLOBAL`的来源未在本模块内定义，可能依赖构建时全局导出命名（线索：`AD21_JS_Project/dist/main_utf8.js`全局导出列表含`PositionManager_GLOBAL`，关键词：`PositionManager_GLOBAL`）。
- 当前创建路径使用`ObjectModule.createMock`，并非真实AD PCB对象创建（若希望创建真实对象需另行接入AD API，未确认现状）。

TODO（按优先级）

- 补齐“真实AD对象创建”路径：从Mock切换到调用AD的PCB对象系统（未确认需求/接口）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 iife

