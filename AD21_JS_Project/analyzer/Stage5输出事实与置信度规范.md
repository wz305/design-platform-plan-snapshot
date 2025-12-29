# Stage 5 输出事实与置信度规范（v1）

> **核心原则：Stage 5 是"最后一个事实分析阶段"，只提供事实+可信度，不做任何裁决。**

---

## 📋 文档目的

本规范定义 ES3 工程语义操作系统 Stage 5（Def-Use 分析阶段）的：
- 输出事实的不可变约定
- 置信度系统的判定标准
- 与其他阶段的职责边界
- 为后续查询和解释层提供稳定基础

---

## 🎯 Stage 5 核心职责

### ✅ Stage 5 负责什么

1. **定义点收集**：识别所有符号的定义位置和类型
2. **使用点收集**：识别所有符号的使用方式和上下文
3. **Def-Use链构建**：连接定义点与相关使用点
4. **置信度标记**：为每个事实提供可信度评估
5. **统计计算**：基于事实进行汇总统计

### ❌ Stage 5 不负责什么

1. **代码质量裁决**：不判断代码"好"或"坏"
2. **自动修复建议**：不提供具体的修改建议
3. **路径敏感分析**：不进行精确的控制流分析
4. **跨文件语义推理**：不进行复杂的跨文件逻辑推理
5. **AI决策支持**：不直接为AI提供决策，只提供事实

---

## 🏷️ UnusedConfidence 置信度系统

### 置信度等级

```ts
type UnusedConfidence = "high" | "medium" | "low"
```

### 判断维度（按优先级）

#### ① Def-Use 事实完整度（最重要）

| 情况 | UnusedConfidence | 说明 |
|------|------------------|------|
| symbol 有定义，且 **0 use**，且作用域闭合 | **high** | 确定无疑的未使用 |
| symbol 有定义，仅出现在初始化或 return | **medium** | 可能在初始化中使用 |
| symbol 出现在 try / conditional / loop 中 | **low** | 可能在特殊路径中使用 |

#### ② PathTag 覆盖情况

```text
SEQUENTIAL only        → confidence ↑
CONDITIONAL present   → confidence ↓
TRY / CATCH present   → confidence ↓↓
LOOP present         → confidence ↓
```

#### ③ 符号"角色"判断

| 符号类型 | 默认倾向 | 理由 |
|----------|----------|------|
| 普通 var | neutral | 标准变量 |
| 函数参数 | low | 常被预留或用于接口 |
| catch 参数 | very low | 异常处理专用 |
| 模块导出符号 | medium | 可能被外部使用 |
| IIFE 内私有 var | high | 作用域明确 |

### UnusedFact 数据结构

```ts
UnusedFact {
  symbolId: string           // 符号唯一标识
  confidence: "high" | "medium" | "low"
  reasons: string[]         // 可解释性说明
  definition: Definition    // 定义点引用
  affectedUses: Use[]       // 相关使用点（如果有）
}
```

---

## 🔍 Def-Use 事实结构

### Definition（定义点）

```ts
Definition {
  symbolId: string
  symbolName: string
  definitionType: "VariableDeclaration" | "FunctionDeclaration" | "FunctionParameter" | "ForLoopInitializer" | "CatchParameter"
  node: ASTNode
  filePath: string
  line: number
  column: number
  confidence: "definite" | "possible" | "heuristic"
  pathTag: "sequential" | "conditional" | "loop" | "try" | "catch" | "finally"
}
```

### Use（使用点）

```ts
Use {
  symbolId: string
  symbolName: string
  useType: "read" | "write" | "call" | "return" | "member-read" | "member-write" | "delete" | "typeof" | "in" | "instanceof"
  node: ASTNode
  filePath: string
  line: number
  column: number
  confidence: "definite" | "possible" | "heuristic"
  pathTag: "sequential" | "conditional" | "loop" | "try" | "catch" | "finally"
  context: {
    isMemberProperty?: boolean
    isCallTarget?: boolean
    isAssignmentTarget?: boolean
    // 其他上下文标记
  }
}
```

### DefUseChain（定义-使用链）

```ts
DefUseChain {
  definition: Definition
  uses: Use[]
  symbolName: string
  useCount: number
  confidence: "definite" | "possible" | "heuristic"
}
```

---

## 📊 统计输出规范

### Summary（汇总统计）

```ts
Summary {
  totalDefinitions: number
  totalUses: number
  totalChains: number
  undefinedUses: number      // 未定义使用数量
  unusedDefinitions: number   // 未使用定义数量
  unusedFacts: UnusedFact[] // 详细的未使用事实（带置信度）
}
```

### 统计原则

1. **未定义使用**：只统计 DEFINITE 置信度的使用点
2. **未使用定义**：基于 UnusedConfidence，HIGH + MEDIUM 算作"严格未使用"
3. **内置对象排除**：console、Object、Array 等内置对象不参与统计
4. **成员属性排除**：obj.value 中的 value 不算作变量使用

---

## 🚫 不可变约定

### 符号识别约定

1. ** Identifier 节点**：必须排除定义上下文和特殊上下文
2. ** MemberExpression**：object 部分是使用，property 部分在 computed=false 时不算使用
3. ** AssignmentExpression**：左侧是 WRITE，右侧是 READ
4. ** CallExpression**：callee 是 CALL，arguments 是 READ

### PathTag 传播规则

1. ** IfStatement**：body 内为 CONDITIONAL
2. ** For/While/DoWhile**：body 内为 LOOP
3. ** TryStatement**：try 块内为 TRY
4. ** CatchClause**：body 内为 CATCH
5. ** FinallyClause**：body 内为 FINALLY

### 置信度传播规则

1. ** DEFINITE**：AST 明确分析，无歧义
2. ** POSSIBLE**：涉及动态特性，但有一定依据
3. ** HEURISTIC**：基于模式推断，不确定性较高

---

## 🔄 与其他阶段的职责边界

### Stage 4 vs Stage 5

| 能力 | Stage 4 | Stage 5 |
|------|----------|----------|
| 模块依赖关系 | ✅ | ❌ |
| 函数调用图 | ✅ | ❌ |
| 顶层符号识别 | ✅ | ❌ |
| 变量Def-Use | ❌ | ✅ |
| 未使用检测 | ❌ | ✅（带置信度） |
| 未定义使用 | ❌ | ✅ |

### Stage 5 vs Stage 6+

| 层级 | 职责 |
|------|------|
| Stage 5 | 事实收集 + 置信度标记 |
| Stage 6 | 查询接口 + 聚合分析 |
| Stage 7 | 解释层 + AI决策支持 |

---

## 📋 输出格式规范

### JSON Schema

```json
{
  "success": boolean,
  "filePath": string,
  "definitions": Definition[],
  "uses": Use[],
  "defUseChains": DefUseChain[],
  "summary": Summary,
  "errors": Array<{
    message: string,
    line?: number,
    column?: number
  }>
}
```

### 报告格式

1. **机器格式**：JSON，用于程序消费
2. **人类格式**：结构化文本，用于调试和审查
3. **AI格式**：通过 Stage 6 查询接口提供

---

## ⚠️ 重要约束

### 性能约束

- **单文件分析**：< 5ms
- **内存使用**：< 10MB
- **无增量分析**：Stage 5 不支持增量，由上层处理

### 兼容性约束

- **ES3语法**：只处理 ES3 合法语法
- **Node.js环境**：在 Node.js 环境运行
- **无外部依赖**：除 AST 解析器外无其他依赖

### 质量约束

- **100%测试覆盖**：所有核心功能必须有测试
- **错误处理**：所有异常必须捕获并记录
- **日志完整**：关键操作必须有日志记录

---

## 🎯 验收标准

### 功能验收

1. ✅ 9个测试用例全部通过（基于新的置信度模型）
2. ✅ 5个查询API正常工作
3. ✅ 与 semantic-analyzer.js 完全集成
4. ✅ 性能指标满足约束

### 质量验收

1. ✅ 代码符合ES3规范
2. ✅ 文档完整且一致
3. ✅ 测试覆盖率达到100%
4. ✅ 无已知内存泄漏

---

## 📝 版本历史

### v1.0 (2025-12-16)
- 初始版本定义
- 确立 Stage 5 职责边界
- 定义 UnusedConfidence 系统
- 规范输出格式和约束

---

*此规范为 Stage 5 的开发和使用提供权威指导，任何偏离都需要经过严格的评审流程。*
