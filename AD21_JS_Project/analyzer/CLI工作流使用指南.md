# 🧠 Semantic Workflow CLI v1.0 使用指南

## 🎯 概述

Semantic Workflow CLI 是一个工程级语义裁判 + 计划生成器，实现了用户要求的6步语义引导编码工作流：

1. **语义世界确认**（Capability Check）
2. **语义可达性与合法性验证**（Semantic Validation）
3. **影响预测**（Pre-Write Impact Prediction）
4. **执行计划生成**（Execution Planning）
5. **受控代码生成**（Controlled Code Writing）
6. **事后语义回归验证**（Post-Write Verification）

## 🚀 快速开始

### 1. 构建能力索引
```bash
cd analyzer
# 首先运行符号分析
node corrected-symbols-overview.js

# 然后构建能力索引
node capability-index-builder.js
```

### 2. 使用CLI查询
```bash
# 查看所有模块
node semantic-workflow.js list-modules

# 检查对象可调用性
node semantic-workflow.js check-callable --object LoggerModule

# 列出模块方法
node semantic-workflow.js list-methods --module LoggerModule
```

## 📋 命令详解

### 🔍 查询命令 (Gate + Query)

#### `list-modules`
列出所有可用的模块、可调用对象和全局变量。

```bash
node semantic-workflow.js list-modules
```

**输出示例：**
- 模块数量: 32
- 可调用对象: 51  
- 全局变量: 83

#### `check-callable`
检查指定对象是否可调用。

```bash
node semantic-workflow.js check-callable --object <对象名>
```

**参数：**
- `--object`: 要检查的对象名称

**示例：**
```bash
node semantic-workflow.js check-callable --object LoggerModule
```

#### `list-methods`
列出指定模块的所有方法。

```bash
node semantic-workflow.js list-methods --module <模块名>
```

**参数：**
- `--module`: 模块名称

**示例：**
```bash
node semantic-workflow.js list-methods --module LoggerModule
```

#### `can-access`
检查两个对象之间的访问权限。

```bash
node semantic-workflow.js can-access --from <源对象> --to <目标对象>
```

**参数：**
- `--from`: 源对象
- `--to`: 目标对象

**示例：**
```bash
node semantic-workflow.js can-access --from LoggerModule --to ObjectModule
```

#### `predict-impact`
预测对符号进行操作的影响。

```bash
node semantic-workflow.js predict-impact --symbol <符号名>
```

**参数：**
- `--symbol`: 要分析的符号名称

**示例：**
```bash
node semantic-workflow.js predict-impact --symbol LoggerModule
```

### 📋 计划生成 (Plan Generator)

#### `generate-plan`
生成执行计划。

```bash
node semantic-workflow.js generate-plan --intent <意图类型> --symbol <符号名>
```

**参数：**
- `--intent`: 操作意图类型
  - `remove-unused-symbol`: 移除未使用符号
  - `add-method-call`: 添加方法调用
  - `define-variable`: 定义变量
  - `remove-usage`: 移除使用
  - `rename-symbol`: 重命名符号
- `--symbol`: 目标符号（可选）

**示例：**
```bash
node semantic-workflow.js generate-plan --intent remove-unused-symbol --symbol testVar
```

#### `simulate-plan`
模拟执行计划。

```bash
node semantic-workflow.js simulate-plan --plan <计划ID>
```

**参数：**
- `--plan`: 计划ID

### 📊 报告命令

#### `validate-capability`
验证能力索引的完整性。

```bash
node semantic-workflow.js validate-capability
```

#### `analyze-project`
分析项目的语义结构。

```bash
node semantic-workflow.js analyze-project --path <目录路径>
```

**参数：**
- `--path`: 项目路径（默认: src）

## ⚙️ 全局选项

### `--format`
指定输出格式。

```bash
node semantic-workflow.js list-modules --format json
node semantic-workflow.js list-modules --format markdown
```

### `--output`
将结果保存到文件。

```bash
node semantic-workflow.js list-modules --output result.md
```

### `--facts`
指定事实文件路径。

```bash
node semantic-workflow.js list-modules --facts custom-capability-index.json
```

### `--verbose`
启用详细输出。

```bash
node semantic-workflow.js list-modules --verbose
```

## 🎯 6步工作流实践

### 第1步：语义世界确认
```bash
# 确认目标对象存在
node semantic-workflow.js check-callable --object YourModule
```

### 第2步：语义可达性与合法性验证
```bash
# 验证访问权限
node semantic-workflow.js can-access --from CurrentModule --to TargetModule
```

### 第3步：影响预测
```bash
# 预测操作影响
node semantic-workflow.js predict-impact --symbol TargetSymbol
```

### 第4步：执行计划生成
```bash
# 生成详细执行计划
node semantic-workflow.js generate-plan --intent remove-unused-symbol --symbol TargetSymbol
```

### 第5步：受控代码生成
*（v1版本仅生成计划，不自动执行代码）*

### 第6步：事后语义回归验证
```bash
# 验证系统完整性
node semantic-workflow.js validate-capability
```

## 📊 输出格式

### Markdown格式（默认）
人类可读的报告格式，包含：
- 命令执行状态
- 详细数据说明
- 结论和建议

### JSON格式
机器可读的结构化数据，便于：
- 程序化处理
- 数据集成
- 自动化分析

## 🔧 故障排除

### 常见错误

#### "能力索引文件不存在"
```bash
# 解决方案：先构建能力索引
node corrected-symbols-overview.js
node capability-index-builder.js
```

#### "未知命令"
```bash
# 查看帮助
node semantic-workflow.js
```

#### "缺少必需参数"
```bash
# 查看具体命令的帮助
node semantic-workflow.js <命令> --help  # 未来版本
```

## 🎉 完整示例

### 完整的符号清理工作流
```bash
# 1. 准备环境
cd analyzer
node corrected-symbols-overview.js
node capability-index-builder.js

# 2. 第1步：确认符号存在
node semantic-workflow.js check-callable --object DeadModule

# 3. 第2步：验证访问影响
node semantic-workflow.js can-access --from DeadModule --to LoggerModule

# 4. 第3步：预测移除影响
node semantic-workflow.js predict-impact --symbol DeadModule

# 5. 第4步：生成移除计划
node semantic-workflow.js generate-plan --intent remove-unused-symbol --symbol DeadModule

# 6. 第5步：模拟执行（v1版本）
node semantic-workflow.js simulate-plan --plan <生成的计划ID>

# 7. 第6步：验证系统完整性
node semantic-workflow.js validate-capability
```

## 🏆 系统能力边界

### ✅ 承诺的能力
- 静态可达性分析
- 符号存在性检查
- 方法签名推断
- 模块依赖分析
- 作用域边界识别

### ❌ 不承诺的能力
- 运行时值状态推断
- AD内部对象生命周期模拟
- 参数值合法性验证
- 动态执行路径分析
- 内存使用情况预测

## 📈 扩展性

CLI设计为可扩展架构：
- 支持新命令类型
- 支持自定义输出格式
- 支持插件式功能扩展
- 支持配置文件驱动

---

*此CLI工具实现了语义系统作为"写代码的前置门禁"的核心要求，确保所有代码修改都在语义系统允许的范围内进行。*
