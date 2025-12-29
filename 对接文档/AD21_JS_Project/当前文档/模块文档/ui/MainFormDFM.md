模块定位

一句话：负责AD侧主窗体（TMainForm）的UI布局与事件入口声明；不负责事件处理逻辑（由`src/core/global-events.js`实现）。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/ui/main.dfm`（构建后拷贝到：`AD21_JS_Project/dist/main.dfm`，线索：`AD21_JS_Project/dist/build-report.json`关键词：`ui\\main.dfm`）

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
MainForm	DFM窗体对象	-	-	AD	创建UI控件树	窗体类：`TMainForm`
memLog	TMemo控件	-	-	AD	作为统一UI日志输出通道	关键词：`object memLog: TMemo`
btnOutputLog	OnClick事件	(Sender)	void	AD	触发日志输出	绑定函数名：`btnOutputLogClick`
btnGenerateLog	OnClick事件	(Sender)	void	AD	生成测试日志	绑定函数名：`btnGenerateLogClick`
btnClearDisplay	OnClick事件	(Sender)	void	AD	清空memLog	绑定函数名：`btnClearDisplayClick`
btnSaveLog	OnClick事件	(Sender)	void	AD	触发日志保存	绑定函数名：`btnSaveLogClick`
btnEnvironmentProbe	OnClick事件	(Sender)	void	AD	触发环境探测	绑定函数名：`btnEnvironmentProbeClick`
btnDebugStatus	OnClick事件	(Sender)	void	AD	调试状态检查	绑定函数名：`btnDebugStatusClick`
btnLogStats	OnClick事件	(Sender)	void	AD	显示日志统计	绑定函数名：`btnLogStatsClick`
btnCreateObject	OnClick事件	(Sender)	void	AD	打开对象创建窗体	绑定函数名：`btnCreateObjectClick`
btnRefreshStatus	OnClick事件	(Sender)	void	AD	刷新模块状态	绑定函数名：`btnRefreshStatusClick`
btnObjectStats	OnClick事件	(Sender)	void	AD	显示对象统计	绑定函数名：`btnObjectStatsClick`
btnClearCache	OnClick事件	(Sender)	void	AD	清空模块缓存	绑定函数名：`btnClearCacheClick`
chkGen* / chkUI*	OnClick事件	(Sender)	void	AD	切换GlobalLogController生成/显示开关	绑定函数名：`chkGenDebugClick`等
btnDevMode/btnProdMode/btnDebugMode/btnSilentMode	OnClick事件	(Sender)	void	AD	快捷切换日志模式	绑定函数名：`btnDevModeClick`等

最小使用示例：3~10 行，能跑

（AD侧：通过加载`Main.PrjScr`显示主窗体，用户交互触发事件；此处无“代码调用”场景）

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- `AD21_JS_Project/src/core/global-events.js`：DFM中所有OnClick绑定的函数均在此文件定义（关键词：`function btnOutputLogClick`等）。

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- `memLog`：全局可访问Memo控件，作为UI日志输出通道（`uiWrite/uiInfo/...`均依赖它）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- DFM文件不是JS模块；不要在Node侧`require`。

运行行为

初始化时做什么

- 由AD加载DFM创建控件树并建立全局控件引用（控件名见DFM）。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 主窗体本身不写日志；事件处理函数会写入`memLog`与/或触发文件日志（见`src/core/global-events.js`与logger域文档）。

副作用：创建对象、修改全局、注册事件、写文件等

- 控件创建：`memLog`、按钮、复选框等。
- 事件触发的副作用由`global-events.js`负责（例如写文件、调用PCB/日志模块）。

数据结构与约定

关键对象结构（字段表）

- 无（DFM仅声明控件树与事件绑定）

关键常量/枚举

- 无

错误码/异常策略

- 无（错误由事件处理函数决定）

与其他模块的协作

上游谁调用我

- `dist/Main.PrjScr`指定`UIFile=main.dfm`（线索：`AD21_JS_Project/dist/Main.PrjScr`关键词：`UIFile=`）。

我调用谁

- DFM通过事件绑定“调用”`src/core/global-events.js`中的全局函数（函数名同OnClick字段）。

调用链路图（文字即可）

- 用户点击按钮 → DFM OnClick → `src/core/global-events.js`对应函数 → Logger/PCB/UI等模块

测试与验证

关联测试脚本（路径）

- AD侧手工验证：加载工程后点击各按钮观察`memLog`输出与日志文件落点（若启用）。

如何在 Node 跑

- 不适用

如何在 AD 验证

- 加载`dist/Main.PrjScr`，主窗体应出现；点击“生成日志/输出日志/日志统计/创建对象”等按钮应有可见效果（`memLog`输出或弹出子窗体）。

产出报告在哪里（reports/logs）

- UI日志：`memLog`
- 文件日志（若使用LoggerModuleIndex.flush触发）：默认目录可能是`D:\\!Work\\AD21_JS_Project\\logs`（见`StepWrite`文档）

已知问题与 TODO

已知坑点（必须可复现）

- `Caption`中多处出现`'??????'`（疑似编码问题）：需要确认DFM文件编码或字体设置（线索：`AD21_JS_Project/ui/main.dfm`关键词：`Caption = '??????'`）。

TODO（按优先级）

- 修复DFM文本编码，确保按钮/标签中文可读（未确认当前AD加载时是否会自动转码）。

变更记录

最近 5 条即可（日期 + 简述）

- 2025-12-13 1
