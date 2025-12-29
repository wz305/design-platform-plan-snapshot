模块定位

一句话：负责对象创建窗体（TObjectCreatorForm）的控件布局与按钮事件入口声明；不负责事件处理逻辑（由`src/core/global-events.js`与`UIEventManager/ObjectCreatorUI`协作完成）。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/object-creator.dfm`（构建后拷贝到：`AD21_JS_Project/dist/object-creator.dfm`，线索：`AD21_JS_Project/dist/build-report.json`关键词：`ui\\object-creator.dfm`）

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
ObjectCreatorForm	DFM窗体对象	-	-	AD	创建控件树	窗体类：`TObjectCreatorForm`
cmbObjectType	TComboBox控件	-	-	AD	提供对象类型选择	Items：`Track/Pad/Via/Arc`
edtX/edtY	TEdit控件	-	-	AD	输入坐标	用于位置与原点设置
chkGridSnap	TCheckBox控件	-	-	AD	网格对齐开关	事件绑定未确认（DFM未见OnClick）
edtGridSize	TEdit控件	-	-	AD	网格大小输入	事件绑定未确认（DFM未见OnChange）
btnSetOrigin	OnClick事件	(Sender)	void	AD	设为原点	绑定函数名：`btnSetOriginClick`
btnValidate	OnClick事件	(Sender)	void	AD	验证参数	绑定函数名：`btnValidateClick`
btnCreate	OnClick事件	(Sender)	void	AD	创建对象	绑定函数名：`btnCreateClick`
btnCreateAtOrigin	OnClick事件	(Sender)	void	AD	在原点创建	绑定函数名：`btnCreateAtOriginClick`
btnReset	OnClick事件	(Sender)	void	AD	重置表单	绑定函数名：`btnResetClick`
btnCancel	OnClick事件	(Sender)	void	AD	取消/关闭	绑定函数名：`btnCancelClick`
lblStatus/lblPositionInfo	TLabel控件	-	-	AD	状态显示	由`ObjectCreatorUI`写入

最小使用示例：3~10 行，能跑

（AD侧：通过`ObjectCreatorUI.showWindow()`或主窗体按钮打开；此处无“代码调用”场景）

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/src/core/global-events.js`：DFM中OnClick绑定的全局函数实现（关键词：`function btnCreateClick`等）。
- `AD21_JS_Project/ui/core/UIEventManager.js`：全局函数通常转调到此模块的`handle*`方法（关键词：`handleCreateClick`等）。
- `AD21_JS_Project/ui/core/ObjectCreatorUI.js`：承载实际UI逻辑与对象创建（关键词：`handleCreateObject`）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- `ObjectModule`：对象创建最终调用的模块（由`ObjectCreatorUI.initialize()`初始化）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- DFM文件不是JS模块；不要在Node侧`require`。

运行行为

初始化时做什么

- 由AD加载DFM创建控件树并建立全局控件引用（控件名见DFM）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 本窗体不直接写日志；事件处理函数与`ObjectCreatorUI`会写入`memLog`与更新`lblStatus`等控件。

副作用：创建对象、修改全局、注册事件、写文件等

- 控件创建与事件入口声明；对象创建副作用由下游模块承担（`ObjectModule.createMock`）。

数据结构与约定

关键对象结构（字段表）

- 无（DFM仅声明控件树与事件绑定）

关键常量/枚举

- 对象类型列表：`Track/Pad/Via/Arc`

错误码/异常策略

- 无（错误由事件处理函数与`ObjectCreatorUI`决定）

与其他模块的协作

上游谁调用我

- 主窗体按钮 `btnCreateObjectClick`（`ui/main.dfm`）→ `src/core/global-events.js` → `showObjectCreatorWindow()` → 显示本窗体（间接）。

我调用谁

- DFM通过OnClick调用`src/core/global-events.js`对应全局函数。

调用链路图（文字即可）

- 用户点击“创建对象” → `btnCreateClick`（global-events）→ `UIEventManager.handleCreateClick` → `ObjectCreatorUI.handleCreateObject` → `ObjectModule.createMock`

测试与验证

关联测试脚本（路径）

- AD侧手工验证：打开窗体并点击各按钮观察`memLog`与`lblStatus`变化。

如何在 Node 跑

- 不适用

如何在 AD 验证

- 打开窗体后：
  - 点击“验证参数”应在`lblStatus`显示验证结果并在`memLog`输出；
  - 点击“创建对象/在原点创建”应调用Mock创建并输出日志；
  - 点击“重置”应恢复默认值；
  - 点击“取消”应关闭窗体。

产出报告在哪里（reports/logs）

- UI日志：`memLog`

已知问题与 TODO

已知坑点（必须可复现）

- DFM未看到`cmbObjectType`的OnChange、`chkGridSnap`的OnClick、`edtGridSize`的OnChange绑定（线索：`AD21_JS_Project/ui/object-creator.dfm`关键词：`OnClick` / `OnChange`）。因此类型切换/网格设置相关全局函数是否会被触发：未确认。

TODO（按优先级）

- 补齐DFM事件绑定：将`cmbObjectType`绑定到`cmbObjectTypeChange`、`chkGridSnap`绑定到`chkGridSnapClick`、`edtGridSize`绑定到`edtGridSizeChange`（对应全局函数在`src/core/global-events.js`已存在）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-13 1
- 2025-12-10 ‘’

