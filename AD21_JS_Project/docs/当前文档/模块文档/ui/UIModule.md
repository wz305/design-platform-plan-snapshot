模块定位

一句话：负责初始化UI子模块并提供“显示/隐藏对象创建窗口”的门面；不负责实现具体窗体逻辑与DFM事件分发细节。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/index.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
UIModule	object	-	-	AD	注册全局变量`UIModule`	纯大IIFE导出
UIModule.createObjectCreatorUI	function	(options)	{controller, config}	AD	读取/依赖`ObjectCreatorUI`	直接转调`ObjectCreatorUI.create`
UIModule.initializeUI	function	()	boolean(未显式返回)	AD	调用`ObjectCreatorUI.initialize`、标记初始化、调用`UIEventManager.bindEvents`	会调用`uiInfo/uiError`
UIModule.showObjectCreatorWindow	function	()	void	AD	必要时先初始化；调用`ObjectCreatorUI.showWindow`	会打开`ObjectCreatorForm`（DFM窗体）
UIModule.hideObjectCreatorWindow	function	()	void	AD	调用`ObjectCreatorUI.hideWindow`	会隐藏`ObjectCreatorForm`（若存在）
UIModule.isInitialized	function	()	boolean	AD	无	仅返回内部状态
UIModule.getStatus	function	()	object	AD	可能调用`UIEventManager.isEventsBound`	返回依赖可用性与事件状态
UIModule.ObjectCreatorUI	object	-	-	AD	无	直接暴露全局变量引用（构建后需先加载`ObjectCreatorUI`）
UIModule.UIEventManager	object	-	-	AD	无	直接暴露全局变量引用（构建后需先加载`UIEventManager`）

最小使用示例：3~10 行，能跑

（AD/JScript，需已加载`dist/main_utf8.js`与相关DFM）

```js
// 初始化UI子系统
UIModule.initializeUI();
// 打开对象创建窗口
UIModule.showObjectCreatorWindow();
// 读取状态
var st = UIModule.getStatus();
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/ui/core/ObjectCreatorUI.js`：窗口显示/隐藏与对象创建逻辑
- `AD21_JS_Project/ui/core/UIEventManager.js`：事件“绑定状态”门面（实际DFM事件由全局函数承接）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- UI调试输出函数：`uiInfo/uiError/uiDebug`（来源：`AD21_JS_Project/src/core/global-events.js`，关键词：`function uiInfo`）
- DFM窗体全局对象：`ObjectCreatorForm`（来源：`AD21_JS_Project/ui/object-creator.dfm`，关键词：`object ObjectCreatorForm`）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不建议在Node环境`require('ui/index.js')`后直接调用：该模块依赖DFM控件与`uiInfo`全局函数（Node侧通常不存在）。

运行行为

初始化时做什么

- `initializeUI()`：输出UI日志；尝试初始化`ObjectCreatorUI`；调用`UIEventManager.bindEvents()`；设置`_initialized=true`。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI输出：通过`uiInfo/uiError/uiDebug`间接写入`memLog`（见`AD21_JS_Project/src/core/global-events.js`）。

副作用：创建对象、修改全局、注册事件、写文件等

- 修改模块内状态：`_initialized`。
- 调用下游模块：`ObjectCreatorUI.initialize/showWindow/hideWindow`、`UIEventManager.bindEvents`。

数据结构与约定

关键对象结构（字段表）

- `UIModule.getStatus()`返回：
  - `initialized: boolean`
  - `objectCreatorUIAvailable: boolean`
  - `eventManagerAvailable: boolean`
  - `eventsBound: boolean`（调用`UIEventManager.isEventsBound()`，若存在）

关键常量/枚举

- 无

错误码/异常策略

- `initializeUI/showObjectCreatorWindow`在失败时会调用`uiError(...)`并`throw`原始异常。

与其他模块的协作

上游谁调用我

- `AD21_JS_Project/ui/object-creator.js`（ObjectCreatorWindow）会调用`UIModule.initializeUI/showObjectCreatorWindow/hideObjectCreatorWindow`。
- 也可由`src/core/global-events.js`间接触发（见`showObjectCreatorWindow()`全局函数）。

我调用谁

- `ObjectCreatorUI`、`UIEventManager`、`uiInfo/uiError/uiDebug`。

调用链路图（文字即可）

- DFM按钮 → `src/core/global-events.js`（全局函数）→ `ObjectCreatorWindow.show()`（可选）→ `UIModule.showObjectCreatorWindow()` → `ObjectCreatorUI.showWindow()` → `ObjectCreatorForm.Show()`

测试与验证

关联测试脚本（路径）

- 未确认：当前`tests/module-dependency-test.js`未覆盖ui域模块（线索：`AD21_JS_Project/tests/module-dependency-test.js`关键词：`moduleOrder`）。

如何在 Node 跑

- 不建议：该模块依赖DFM与UI全局函数；如需静态检查可用语义分析（见`AD21_JS_Project/analyzer/`，未在此文档展开）。

如何在 AD 验证

- 通过`AD21_JS_Project/dist/Main.PrjScr`加载工程后，在主窗体点击“创建对象”按钮（DFM事件：`btnCreateObjectClick`）应能打开对象创建窗体。

产出报告在哪里（reports/logs）

- UI日志：`memLog`（主窗体Memo控件，见`AD21_JS_Project/ui/main.dfm`关键词：`object memLog: TMemo`）

已知问题与 TODO

已知坑点（必须可复现）

- `UIEventManager.bindEvents()`仅设置标记，DFM事件仍依赖全局函数（见`AD21_JS_Project/ui/core/UIEventManager.js`关键词：`不直接绑定事件`）。

TODO（按优先级）

- 补充Node侧静态/存在性测试入口：将ui模块纳入`tests/module-dependency-test.js`或新增`tests/ui-module-test.js`（未确认需求优先级）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-14 iife

