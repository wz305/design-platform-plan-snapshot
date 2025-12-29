模块定位

一句话：负责提供“对象创建窗口”的二次封装（初始化/显示/隐藏/状态查询）；不负责真正的窗体绘制与事件处理。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/object-creator.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ObjectCreatorWindow	object	-	-	AD	注册全局变量`ObjectCreatorWindow`	纯大IIFE导出
ObjectCreatorWindow.create	function	(options)	{config, initialized}	AD	缓存配置	不启动UI，仅记录配置
ObjectCreatorWindow.initialize	function	()	void	AD	调用`UIModule.initializeUI`、写UI日志	失败时`throw`
ObjectCreatorWindow.show	function	()	void	AD	必要时先initialize；调用`UIModule.showObjectCreatorWindow`	打开对象创建窗体
ObjectCreatorWindow.hide	function	()	void	AD	调用`UIModule.hideObjectCreatorWindow`	隐藏对象创建窗体（若存在）
ObjectCreatorWindow.isInitialized	function	()	boolean	AD	无	返回内部状态
ObjectCreatorWindow.getStatus	function	()	object	AD	读取`UIModule.getStatus`	包含`uiModuleAvailable/uiModuleStatus`

最小使用示例：3~10 行，能跑

（AD/JScript）

```js
ObjectCreatorWindow.initialize();
ObjectCreatorWindow.show();
var s = ObjectCreatorWindow.getStatus();
ObjectCreatorWindow.hide();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/ui/index.js`：通过`UIModule`完成初始化/显示/隐藏

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- UI调试输出函数：`uiInfo/uiError/uiDebug`（来源：`AD21_JS_Project/src/core/global-events.js`）
- 对象创建窗体：`ObjectCreatorForm`（来源：`AD21_JS_Project/ui/object-creator.dfm`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议在Node侧调用：依赖`UIModule`与DFM全局对象。

运行行为

初始化时做什么

- 调用`UIModule.initializeUI()`并将`_initialized=true`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI输出：`uiInfo/uiError/uiDebug`（通常写入`memLog`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改模块内状态：`_initialized`。
- 触发下游窗口显示/隐藏：`UIModule.showObjectCreatorWindow/hideObjectCreatorWindow`。

数据结构与约定

关键对象结构（字段表）

- `getStatus()`返回：
  - `initialized: boolean`
  - `uiModuleAvailable: boolean`
  - `uiModuleStatus: object|null`

关键常量/枚举

- 无

错误码/异常策略

- `initialize/show`失败会`uiError(...)`并`throw`异常。

与其他模块的协作

上游谁调用我

- `src/core/global-events.js`中的`showObjectCreatorWindow()`可能作为入口（关键词：`showObjectCreatorWindow`）。

我调用谁

- `UIModule`（`initializeUI/showObjectCreatorWindow/hideObjectCreatorWindow/getStatus`）。

调用链路图（文字即可）

- DFM按钮（主窗体）→ `btnCreateObjectClick`（`src/core/global-events.js`）→ `showObjectCreatorWindow()`（同文件）→ `ObjectCreatorWindow.show()` → `UIModule.showObjectCreatorWindow()` → `ObjectCreatorUI.showWindow()` → `ObjectCreatorForm.Show()`

测试与验证

关联测试脚本（路径）

- 未确认：当前缺少专门针对该模块的Node测试脚本（线索：`AD21_JS_Project/tests/`）。

如何在 Node 跑

- 不建议：依赖DFM与UI全局函数。

如何在 AD 验证

- 加载`dist/Main.PrjScr`后调用：在AD脚本控制台执行`ObjectCreatorWindow.show()`，应弹出对象创建窗体。

产出报告在哪里（reports/logs）

- UI日志：`memLog`（主窗体Memo控件）。

已知问题与 TODO

已知坑点（必须可复现）

- 仅依赖`UIModule`，并不直接验证`ObjectCreatorUI/ObjectModule`是否可用；若下游缺失会在`show()`阶段抛错（线索：`AD21_JS_Project/ui/index.js`关键词：`ObjectCreatorUI不可用`）。

TODO（按优先级）

- 增加“可用性自检”API：例如在`initialize()`阶段检查`ObjectCreatorUI/ObjectModule`并输出可诊断信息（未确认需求优先级）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 iife
- 2025-12-13 1

