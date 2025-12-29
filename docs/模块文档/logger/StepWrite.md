模块定位

一句话：提供日志写入落盘（AD ActiveX/Node fs）的实现与写入队列管理，不负责日志生成与过滤策略。

适用环境：Both

稳定程度：稳定

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/logger/steps/step_write.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
StepWrite	Object	-	-	Both	可能写文件/创建目录/删除/重命名	在构建合并产物中作为全局变量使用（未确认：merge规则）
executeWriteStep	Function	logEntries:Array, moduleName:string, config?:Object	Object	Both	写文件/入队列	返回{success,message,written,timestamp}
getQueueStatus	Function	-	Object	Both	读取内部状态	队列长度/错误计数等
clearWriteQueue	Function	-	void	Both	清空队列	丢弃未写入请求
DEFAULT_WRITE_CONFIG	Object	-	Object	Both	无	默认写入配置

最小使用示例：3~10 行，能跑

```js
// Node环境：StepWrite在构建产物中可用时
var r = StepWrite.executeWriteStep([{ timestamp: Date.now(), level: "INFO", message: "hi" }], "Demo");
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/logger/steps/step_write.js：内部实现文件系统写入（ActiveXObject 或 require('fs')）

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- ActiveXObject("Scripting.FileSystemObject")：AD环境真实写文件/建目录/删改文件
- require('fs')/require('path')：Node环境真实写文件（当存在require时）
- console / uiInfo：用于诊断（部分分支）

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不应直接从UI事件里绕过日志系统调用（容易破坏队列与轮转策略）

运行行为

初始化时做什么

- 初始化DEFAULT_WRITE_CONFIG与writeState（队列/错误计数等）

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 文件系统：默认 `DEFAULT_WRITE_CONFIG.logDirectory`
- console / uiInfo：诊断输出（可选）

副作用：创建对象、修改全局、注册事件、写文件等

- 创建目录、创建/写入文件、重命名/删除文件（轮转/原子写入分支）
- 维护写入队列（writeQueue）

数据结构与约定

关键对象结构（字段表）

字段	类型	说明
DEFAULT_WRITE_CONFIG.logDirectory	string	默认日志目录（当前为硬编码绝对路径）
writeState.writeQueue	Array	写入队列
executeWriteStep()返回	Object	{success,message,written,timestamp}

关键常量/枚举

- DEFAULT_WRITE_CONFIG（含maxFileSize/maxFileCount/atomicWrite等）

错误码/异常策略

- 以返回值success/message表达写入结果；内部异常捕获后返回失败

与其他模块的协作

上游谁调用我

- LoggerModule.flush（通过executeWriteStep或StepWrite.executeWriteStep）
- global-events.js 的保存/输出按钮（通过LoggerModuleIndex.flush间接触发）

我调用谁

- ActiveXObject 或 require('fs')（取决于环境）

调用链路图（文字即可）

- LoggerModule.error/info/... -> 缓存 -> flush -> StepWrite.executeWriteStep -> 文件系统

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/tests/complete-module-test.js（包含StepWrite实现片段）

如何在 Node 跑

- 未确认：step_write.js 无 module.exports（线索：AD21_JS_Project/src/modules/logger/steps/step_write.js 关键词：module.exports 不存在）

如何在 AD 验证

- 点击UI“保存日志/输出日志”按钮，观察 `logs/` 输出与memLog诊断（参见AD21_JS_Project/src/core/global-events.js 关键词：btnSaveLogClick）

产出报告在哪里（reports/logs）

- AD21_JS_Project/logs（实际目录受DEFAULT_WRITE_CONFIG影响）

已知问题与 TODO

已知坑点（必须可复现）

- DEFAULT_WRITE_CONFIG.logDirectory 硬编码为 `D:\\!Work\\AD21_JS_Project\\logs`，与当前仓库路径可能不一致（线索：AD21_JS_Project/src/modules/logger/steps/step_write.js 关键词：logDirectory）

TODO（按优先级）

- 将logDirectory改为可配置且默认相对项目目录（未确认：构建/运行时如何传入）

变更记录

- 未确认：缺少历史记录（线索：AD21_JS_Project/.git）

