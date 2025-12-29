模块定位

一句话：Stage 6 规则（#2），负责把 Stage 5 的“未定义使用”facts 转为错误（errors）并附带修复建议，不负责真正补定义或改代码。

适用环境：Node

稳定程度：试验

入口与导出

入口文件（路径）

AD21_JS_Project/analyzer/interpretation/rules/undefined-use.rule.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
apply	Function	ctx:RuleContext, result:InterpretationResult	void	Node	写 result.errors	把 undefinedUses[] 转为 errors[]，并生成 suggestions[]
name	String	-	string	Node	无	固定为 `undefined-use.rule`
description	String	-	string	Node	无	规则说明
version	String	-	string	Node	无	规则版本

最小使用示例：3~10 行，能跑

```js
// Node 环境
var Rule = require("./analyzer/interpretation/rules/undefined-use.rule");
Rule.apply({ getUndefinedUses: function(){ return [{ name: "x", line: 1, type: "call" }]; } }, { errors: [] });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- （隐式）AD21_JS_Project/analyzer/interpretation/rule-context.js：期望 ctx 提供 `getUndefinedUses`
- 结果结构：期望 result 具备 `errors[]`

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- 无（纯内存规则）。

禁止依赖（写清楚“别从这里 require/访问什么”）

- 不要在 AD/JScript 环境中加载。

运行行为

初始化时做什么

- 无。

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 不写文件；只 push 到 `result.errors[]`。

副作用：创建对象、修改全局、注册事件、写文件等

- 对每条 `usage` 生成 error：
  - `risk`: 默认 `critical`（函数调用/未定义符号）
  - `risk`: 当 `usage.type/context === "property"` 时降为 `high`
  - `suggestions`: `define-symbol/import-function/check-spelling/check-object-structure`

数据结构与约定

关键对象结构（字段表）

- 输入：`ctx.getUndefinedUses()` 返回 `[{name, line?, type?, context?}, ...]`
- 输出：`result.errors[]` 元素包含 `{type:"undefined-use", symbol, location, risk, reason, evidence, suggestions}`

关键常量/枚举

- `usage.type/context`：`call|read|write|property`（来自 Stage 5 facts）
- `risk`：`critical|high`（由规则计算）

错误码/异常策略

- 本规则不捕获异常；由上游 Interpreter 捕获。

与其他模块的协作

上游谁调用我

- AD21_JS_Project/analyzer/interpretation/interpreter.js：rules 序列第 2 个

我调用谁

- 无（内部调用 `generateFixSuggestions`）。

调用链路图（文字即可）

- Stage5 Facts.undefinedUses → UndefinedUseRule.apply → InterpretationResult.errors (+ suggestions)

测试与验证

关联测试脚本（路径）

- AD21_JS_Project/analyzer/interpretation/__tests__/interpretation-basic.test.js（用例：`testUndefinedUseRule`）

如何在 Node 跑

- `node analyzer/interpretation/__tests__/interpretation-basic.test.js`

如何在 AD 验证

- 未提供。

产出报告在哪里（reports/logs）

- 无。

已知问题与 TODO

已知坑点（必须可复现）

- `location` 字段仅从 `usage.line` 拼接字符串（`"line X"`），不会携带 file/column（关键词：`var location = usage.line ? ...`）。

TODO（按优先级）

- 未确认：Stage 5 facts 是否包含 file/column；如有可扩展 error.location 为结构化信息（路径：`analyzer/interpretation/rules/undefined-use.rule.js`）。

变更记录

- 2025-12-17 语义系统1.0

