模块定位

一句话：在 AD 环境中尽可能全面地探测可用组件/能力（ActiveX/全局对象/语言能力），并输出到 UI 日志与可选 JSON 报告。

适用环境：AD

稳定程度：试验

入口与导出

入口文件（路径）

- `AD21_JS_Project/src/环境探测/EnvironmentProbeModule.js`

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
EnvironmentProbeModule	Object	-	-	AD	写UI日志/尝试创建ActiveX	IIFE模块导出
runAll	Function	(customConfig)	report:Object	AD	创建ActiveX/写日志/可写文件	主入口
getConfig	Function	-	CONFIG:Object	AD	无	读取当前配置
setConfig	Function	(cfg:Object)	void	AD	运行探测	内部调用runAll

最小使用示例：3~10 行，能跑

```js
// 默认安全模式
EnvironmentProbeModule.runAll({
    safeMode: true,
    allowRiskyProbes: false,
    tryWriteReport: true,
    reportPath: "reports\\environment-probe-report.json"
});
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- 无硬依赖；可选使用UILoggerModule与memLog输出

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- ActiveXObject：用于实例化ProgID（若不可用，会记录失败）
- UILoggerModule/memLog/ShowMessage：输出探测摘要
- 可选文件写入：`Scripting.FileSystemObject` 或 `ADODB.Stream`

运行行为

初始化时做什么

- 无自动初始化；仅在调用`runAll`时执行探测。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- UI日志：优先`UILoggerModule`，其次`memLog`，最后`ShowMessage`
- 可选文件：`reports\\environment-probe-report.json`

副作用：创建对象、修改全局、注册事件、写文件等

- 尝试创建多个 ActiveX/COM 对象（仅实例化，不调用危险方法）
- 可选写入 JSON 报告文件

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
report.schema	String	固定为`environment-probe/v1`
report.generatedAt	String	生成时间（ISO字符串或Date.toString）
report.language	Object	语言能力检测结果
report.globals	Array	全局对象检测结果
report.progIdResults	Object	按分组的ProgID探测结果
report.reportWrite	Object	文件写入结果

关键常量/枚举

- `CONFIG.safeMode/allowRiskyProbes/tryWriteReport/reportPath`

错误码/异常策略

- 内部大量`try/catch`，失败时记录到报告并写入UI日志；不抛出。

与其他模块的协作

上游谁调用我

- `src/core/global-events.js`：函数`测试_运行环境探测`
- `ui/core/UIEventManager.js`：`handleEnvironmentProbeClick`

我调用谁

- 可选：`UILoggerModule`、`memLog`、`ShowMessage`
- ActiveX对象：`Scripting.FileSystemObject`、`ADODB.Stream`等

调用链路图（文字即可）

- MainForm按钮 → `btnEnvironmentProbeClick` → `测试_运行环境探测` → `EnvironmentProbeModule.runAll`

测试与验证

关联测试脚本（路径）

- 无（建议在AD中手工触发）

如何在 Node 跑

- 不适用：依赖AD ActiveX/DFM控件

如何在 AD 验证

- 点击主窗体“环境探测”按钮，观察`memLog/UILogger`输出与`reports\\environment-probe-report.json`

产出报告在哪里（reports/logs）

- `reports\\environment-probe-report.json`（若文件写入可用）

已知问题与 TODO

已知坑点（必须可复现）

- 未确认：部分ProgID在锁定环境中可能触发安全策略弹窗或实例化失败。

TODO（按优先级）

- 允许外部配置追加ProgID列表或禁用分组。

变更记录

- 2025-12-29 初始化环境探测模块
