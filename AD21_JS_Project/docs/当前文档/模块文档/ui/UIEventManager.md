模块定位

一句话：负责ObjectCreatorForm相关UI事件的处理与转发（读取控件→调用ObjectCreatorUI/PositionManager）；不负责“DFM事件如何绑定到JS函数”（当前主要依赖`src/core/global-events.js`的全局函数桥接）。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/core/UIEventManager.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
UIEventManager	object	-	-	AD	注册全局变量`UIEventManager`	纯大IIFE导出
UIEventManager.create	function	(options)	{config, eventsBound}	AD	缓存配置	不做真实事件绑定
UIEventManager.bindEvents	function	()	void	AD	仅设置`_eventsBound=true`并输出日志	代码注明“DFM事件通过全局函数处理”
UIEventManager.unbindEvents	function	()	void	AD	设置`_eventsBound=false`	不解绑DFM层面的事件
UIEventManager.isEventsBound	function	()	boolean	AD	无	仅返回状态
UIEventManager.handleObjectTypeChange	function	(Sender)	void	AD	读取`cmbObjectType.Text`并调用`ObjectCreatorUI.handleObjectTypeChange`	供全局DFM函数调用
UIEventManager.handleSetOriginClick	function	(Sender)	void	AD	读取`edtX/edtY.Text`并调用`ObjectCreatorUI.handleSetOrigin`	供全局DFM函数调用
UIEventManager.handleValidateClick	function	(Sender)	void	AD	调用`ObjectCreatorUI.controller().validateParameters/updateStatus`	供全局DFM函数调用
UIEventManager.handleCreateClick	function	(Sender)	void	AD	调用`ObjectCreatorUI.handleCreateObject(..., false)`	供全局DFM函数调用
UIEventManager.handleCreateAtOriginClick	function	(Sender)	void	AD	调用`ObjectCreatorUI.handleCreateObject(..., true)`	供全局DFM函数调用
UIEventManager.handleResetClick	function	(Sender)	void	AD	调用`ObjectCreatorUI.handleReset`	供全局DFM函数调用
UIEventManager.handleCancelClick	function	(Sender)	void	AD	调用`ObjectCreatorForm.Close()`	依赖`ObjectCreatorForm`
UIEventManager.handleGridSnapClick	function	(Sender)	void	AD	读`chkGridSnap/edtGridSize`并调用`PositionManager_GLOBAL.configureCoordinateSystem`	DFM是否绑定此事件未确认
UIEventManager.handleGridSizeChange	function	(Sender)	void	AD	读`edtGridSize`并调用`PositionManager_GLOBAL.configureCoordinateSystem`	DFM是否绑定此事件未确认
UIEventManager.handleEnvironmentProbeClick	function	(Sender)	void	AD	触发`测试_运行环境探测`或直接调用模块	供全局DFM函数调用

最小使用示例：3~10 行，能跑

（AD/JScript；模拟DFM回调时通常由全局函数调用本模块）

```js
UIEventManager.bindEvents();
// 在AD里，DFM的OnClick通常会间接调用这些handler（见global-events.js）
UIEventManager.handleResetClick(null);
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/ui/core/ObjectCreatorUI.js`：承载业务处理（参数组切换/创建对象/状态更新）
- `AD21_JS_Project/src/modules/object-creator/core/PositionManager.js`：通过`PositionManager_GLOBAL`配置网格（未确认注入方式）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- DFM控件全局变量（部分）：`cmbObjectType/edtX/edtY/chkGridSnap/edtGridSize`（来源：`AD21_JS_Project/ui/object-creator.dfm`）
- DFM窗体对象：`ObjectCreatorForm`（用于`Close()`）
- UI日志函数：`uiInfo/uiWarn/uiError/uiDebug`（来源：`AD21_JS_Project/src/core/global-events.js`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议从Node侧直接调用：强依赖DFM控件与AD窗体对象。

运行行为

初始化时做什么

- 无自动初始化；`bindEvents()`仅输出日志并设置状态位。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI输出：通过`uiInfo/uiWarn/uiError/uiDebug`写入`memLog`。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改`ObjectCreatorUI.controller()`的部分字段：`isGridSnapEnabled/gridSize`等。
- 可能修改`PositionManager_GLOBAL`配置（网格/对齐）。
- 关闭窗体：`ObjectCreatorForm.Close()`。

数据结构与约定

关键对象结构（字段表）

- `create()`返回：`{config, eventsBound}`。

关键常量/枚举

- 无

错误码/异常策略

- 各handler内部`try/catch`，失败时调用`uiError(...)`（不抛出）。

与其他模块的协作

上游谁调用我

- `src/core/global-events.js`中的ObjectCreatorForm事件处理全局函数：`btnSetOriginClick/btnValidateClick/btnCreateClick/...`（关键词：`ObjectCreatorForm DFM事件处理函数`）。

我调用谁

- `ObjectCreatorUI`（controller/handle*）
- `PositionManager_GLOBAL.configureCoordinateSystem`（可选）

调用链路图（文字即可）

- ObjectCreatorForm按钮OnClick → `src/core/global-events.js`全局函数 → `UIEventManager.handle*` → `ObjectCreatorUI.handle*` → `ObjectModule.createMock`/更新UI

测试与验证

关联测试脚本（路径）

- 未确认：缺少自动化覆盖；建议通过AD实际点击DFM按钮验证。

如何在 Node 跑

- 不建议：依赖DFM控件/窗体对象。

如何在 AD 验证

- 打开ObjectCreatorForm，点击“验证参数/创建对象/重置/取消”等按钮，确认对应handler被触发（观察`memLog`输出）。

产出报告在哪里（reports/logs）

- UI日志：`memLog`

已知问题与 TODO

已知坑点（必须可复现）

- `ui/object-creator.dfm`当前只声明了按钮`OnClick`，未看到`cmbObjectType`的`OnChange`、`chkGridSnap`的`OnClick`、`edtGridSize`的`OnChange`绑定（线索：`AD21_JS_Project/ui/object-creator.dfm`关键词：`OnClick` / `OnChange`）。因此`handleObjectTypeChange/handleGridSnapClick/handleGridSizeChange`是否会被触发：未确认。

TODO（按优先级）

- 补齐DFM事件绑定：在`ui/object-creator.dfm`中添加对应`OnChange/OnClick`指向`cmbObjectTypeChange/chkGridSnapClick/edtGridSizeChange`（全局函数已存在于`src/core/global-events.js`）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 iife
