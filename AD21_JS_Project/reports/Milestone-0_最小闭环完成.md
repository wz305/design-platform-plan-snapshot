# Milestone-0：最小闭环完成（AD ↔ Node ↔ Browser）
## 1. 目标
- 说明最小闭环的目标：PING/COMMAND/真实 BOARD_SUMMARY/UPLOAD_REPORT/FINAL_SUMMARY

## 2. 已完成能力清单
- 通信闭环：/ping、/api/command、/api/latest-report、SSE
- Spec0.1 一键验证入口：UI 按钮触发 测试_AD_Spec_0_1_一键验证()
- 真实 Board Summary：名称/单位/Bounds/计数（非零）
- JSON 解析例外点：__adJsonParse + JsonUtil
- 宿主全局桥接：__adGetHostGlobal + 全局符号桥（白名单）
- 构建前检查：禁止遮蔽宿主全局 + 禁止 eval（仅例外文件）
- 文档树驱动：
  - 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/01-a_id_IPCB_ServerInterface_a_IPCB_ServerInterface.md
  - 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/02-a_id_IPCB_Board_a_IPCB_Board.md
  - 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/07-a_id_IPCB_PrimitiveCounter_Interface_a_IPCB_PrimitiveCounter_Interface.md

## 3. 关键实现路径
- global-events.js 中 BOARD_SUMMARY 获取与计数 fallback 的三层路径：
  PrimitiveCounter -> board.GetPrimitiveCount -> BoardIterator_Create
- AD/JScript COM 兼容策略：不强依赖 typeof === "function"，采用“存在即调用 + try/catch”

## 4. 风险点与边界
- StackMap fallback: LayerStack API 不可用时仅保证 Top/Bottom/MultiLayer
- JSON 解析：仅本地受控环境允许例外 eval；使用正则校验后 eval
- 宿主全局遮蔽风险：main.js 合并作用域导致 var PCBServer 破坏全局

## 5. 复现步骤（一键）
- Node：运行 scripts/一键启动_最小闭环.cmd（等价：npm run mock）
- Browser：打开 http://127.0.0.1:8080/status 或 /diagnostics
- AD：点击按钮“Spec0.1 一键验证”（或运行 测试_AD_Spec_0_1_一键验证()）
- 关键日志关键字：PING/COMMAND/BOARD_SUMMARY/UPLOAD_REPORT/FINAL_SUMMARY

## 6. 附录：一次成功日志样例（简短）
[INFO] === 开始最小通信测试(HTTP) ===
[INFO] PING {"status":200,"text":"pong"}
[INFO] COMMAND mock.echo {"ok":true}
[INFO] COMMAND mock.board.summary {"ok":true}
[WARN] COMMAND mock.unknown {"ok":false}
[INFO] COMMAND {"echoOk":true,"summaryOk":true,"unknownOkFalse":true}
[INFO] BOARD_SUMMARY {"counts":{"track":242,"via":14,"pad":19,"total":275}}
[INFO] UPLOAD_REPORT {"ok":true,"status":200}
[INFO] FINAL_SUMMARY {"echoOk":true,"summaryOk":true,"unknownOkFalse":true,"hasBoardSummary":true,"uploadOk":true}
