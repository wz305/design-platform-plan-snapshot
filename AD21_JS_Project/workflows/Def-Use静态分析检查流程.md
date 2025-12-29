# 🧠 Def-Use 静态分析工作流（方案一：拼接级 Program）

> 本工作流定义 **Def-Use 静态分析器在 AD / ES3 项目中的唯一正确运行方式**。
> 分析目标不是"源码文件本身"，而是 **按 merge 顺序拼接后的运行时语义**。

---

## 🎯 一、核心设计原则（必须写在文档最前）

```md
Def-Use 静态分析不以"文件"为作用域边界，
而以 merge-order.json 定义的拼接顺序，
构建一个"虚拟单一 Program"进行分析。

所有 var / function 定义视为全局定义，
所有引用在拼接顺序合法的前提下视为合法引用。
```

---

## 🔁 二、整体工作流总览（新）

```
配置验证
  ↓
读取 merge-order.json
  ↓
解析源文件列表（有序）
  ↓
构建虚拟 Program AST
  ↓
全局 Def 收集（按顺序）
  ↓
全局 Use 解析
  ↓
Def-Use 关联
  ↓
报告生成（保留文件归属）
```

---

## 🔍 三、阶段一：配置与顺序验证（更新）

### 1️⃣ 验证 merge-order.json（替代 main）

```bash
node -e "
const fs = require('fs');
const path = require('path');

const mergePath = path.join(__dirname, '../config/merge-order.json');
if (!fs.existsSync(mergePath)) {
  console.error('❌ 缺少 merge-order.json');
  process.exit(1);
}

const order = JSON.parse(fs.readFileSync(mergePath, 'utf8'));
if (!Array.isArray(order) || order.length === 0) {
  console.error('❌ merge-order.json 为空或非法');
  process.exit(1);
}

console.log('✅ merge-order.json 加载成功');
console.log('📦 拼接顺序:');
order.forEach((f, i) => console.log(`  ${i+1}. ${f}`));
"
```

### 2️⃣ 校验文件存在性与大小（沿用）

* **只校验 merge-order.json 中出现的文件**
* 禁止 dist / main / 构建产物

---

## 🧱 四、阶段二：构建「虚拟 Program」

> ⚠️ 这是方案一的核心阶段

### 设计说明（写入文档）

```md
虚拟 Program 是仅用于静态分析的抽象结构，
并不生成实际 JS 文件。

其语义等价于：
merge-order.json 中的所有文件
按顺序拼接后的一次性执行结果。
```

---

### 3️⃣ AST 解析（逐文件）

```text
for file in merge-order:
  parse AST(file)
  attach meta:
    - sourceFile
    - orderIndex
```

* 使用 `acorn`（ES3 / ES5）
* **禁止单文件独立分析**

---

### 4️⃣ Program 拼接模型（逻辑）

```text
VirtualProgram
 ├─ AST(ObjectManager.js)
 ├─ AST(ObjectFactory.js)
 ├─ AST(ObjectModule.js)
 └─ ...
```

⚠️ 注意：
**不是 AST 合并为一个节点，而是顺序遍历**

---

## 🧮 五、阶段三：全局 Def 收集（一次扫描）

### 5️⃣ 定义收集规则（必须写清）

```md
以下语法节点视为"全局定义"：
- VariableDeclaration (var)
- FunctionDeclaration
- FunctionExpression 赋值给 var
- IIFE 返回值赋值给 var
```

#### 示例

```js
var ObjectManager = (function(){})();
```

→ 定义：

```json
{
  "name": "ObjectManager",
  "definedIn": "ObjectManager.js",
  "order": 1,
  "nodeType": "IIFE"
}
```

---

### 6️⃣ 构建全局符号表

```json
GlobalSymbolTable = {
  ObjectManager: { definedIn, order, node },
  ObjectFactory: { ... }
}
```

* **后定义覆盖前定义（记录 warning）**
* 不因文件不同而分表

---

## 🔗 六、阶段四：全局 Use 解析

### 7️⃣ 使用收集规则

```md
以下情况视为"使用"：
- Identifier 出现在表达式中
- 成员访问 ObjectManager.xxx
- 作为参数、返回值、条件
```

### ❗ 特殊规则（非常重要）

```md
_getDependency("X") 视为：
- 对符号 X 的一次"逻辑使用"
- 不要求 AST 层面存在 Identifier
```

---

### 8️⃣ Use → Def 绑定规则

```text
Use(symbol X in file F at order i):

if GlobalSymbolTable[X] exists
   and definition.order < i
      → 合法引用
else
      → undefined-variable
```

📌 这一步 **完全依赖 merge 顺序**

---

## 📊 七、阶段五：报告生成（更新重点）

### 9️⃣ 每个符号输出三类信息

```json
{
  "symbol": "ObjectManager",
  "definedIn": "ObjectManager.js",
  "usedIn": [
    "ObjectModule.js",
    "RuleEngine.js"
  ],
  "unused": false
}
```

---

### 🔍 未定义警告示例

```json
{
  "type": "undefined-variable",
  "symbol": "FooManager",
  "usedIn": "BarModule.js",
  "order": 5,
  "severity": "error",
  "message": "FooManager 在 merge-order 中未被定义"
}
```

---

### ⚠️ 顺序违规警告（新增）

```json
{
  "type": "order-violation",
  "symbol": "ObjectFactory",
  "usedIn": "ObjectModule.js",
  "definedIn": "ObjectFactory.js",
  "severity": "error",
  "message": "使用发生在定义之前，请调整 merge-order.json"
}
```

---

## 🧪 八、阶段六：集成规则（简化）

### ❌ 移除的阶段

* ❌ main.js / dist 单文件分析
* ❌ 构建产物 AST 分析
* ❌ 文件级作用域 Def-Use

### ✅ 唯一分析入口

```bash
node scripts/defuse-runner.js merge
```

---

## 🧾 九、必须新增的文档声明（强烈建议）

在 `.clinerules/workflows/Def-Use静态分析检查流程.md` 中加入：

```md
⚠️ 注意事项

1. Def-Use 分析结果以 merge-order.json 为唯一语义依据
2. 不存在"文件未定义但运行时可用"的情况
3. 所有 var / function 均视为全局
4. 调整模块顺序是解决依赖问题的首选方式
```

---

## 🎯 十、一句话总结（给未来的你 / Cline）

> **这是一个"构建期模块、运行期全局"的系统，
> Def-Use 必须分析"拼接后的世界"，而不是"文件的世界"。**

---

## 🚀 使用指南

### 基本用法

```bash
# 运行虚拟Program分析
node scripts/defuse-runner.js merge

# 验证merge-order.json配置
node scripts/defuse-runner.js validate

# 显示帮助信息
node scripts/defuse-runner.js help
```

### 集成到构建流程

```bash
# 在build-with-test.bat中集成
node scripts/defuse-runner.js merge
```

### 报告文件

分析完成后，报告将保存到：
- `reports/defuse-virtual-program-report.json`

### 报告内容结构

```json
{
  "analysisType": "virtual-program",
  "timestamp": "2024-xx-xx...",
  "mergeOrder": [...],
  "globalSymbols": {...},
  "summary": {
    "totalSymbols": 0,
    "totalDefinitions": 0,
    "totalUsages": 0,
    "unusedDefinitions": 0,
    "undefinedUsages": 0,
    "orderViolations": 0,
    "issues": 0
  },
  "issues": [...]
}
```

---

## 🔧 技术实现细节

### 虚拟Program构建流程

1. **顺序解析**：按merge-order.json顺序解析每个文件的AST
2. **元数据附加**：为每个AST节点附加文件路径和顺序信息
3. **全局符号表**：维护跨文件的符号定义表
4. **三遍扫描**：
   - 第一遍：收集所有全局定义
   - 第二遍：分析所有使用情况
   - 第三遍：检查未使用定义

### 关键算法

#### 顺序违规检测

```js
function checkOrderViolation(usage, definition) {
    return definition.order > usage.order;
}
```

#### 逻辑使用检测

```js
function detectLogicalUsage(node) {
    if (node.type === 'CallExpression' && 
        node.callee.name === '_getDependency' &&
        node.arguments[0].type === 'Literal') {
        return node.arguments[0].value;
    }
    return null;
}
```

---

## 📋 检查清单

在运行Def-Use分析前，请确认：

- [ ] `config/merge-order.json` 存在且格式正确
- [ ] 所有引用的文件都存在
- [ ] 文件大小不超过50KB限制
- [ ] 项目使用ES3兼容语法
- [ ] 没有使用ES5+特性（如let、const、箭头函数等）

---

## 🎯 成功标准

分析成功的标志：

1. ✅ 所有文件解析成功
2. ✅ 全局符号表构建完成
3. ✅ 没有顺序违规错误
4. ✅ 没有未定义变量错误
5. ✅ 报告成功生成

---

## 🔄 故障排除

### 常见问题

**Q: 分析失败，提示文件不存在**
A: 检查merge-order.json中的文件路径是否正确

**Q: 出现大量顺序违规**
A: 调整merge-order.json中的文件顺序

**Q: AST解析错误**
A: 检查文件语法是否符合ES3标准

**Q: 内存不足**
A: 检查是否有文件超过50KB限制

---

## 📚 相关文档

- `01-核心开发规则.md` - AD环境开发约束
- `03-模块架构规则.md` - 模块设计规范
- `config/merge-order.json` - 文件合并顺序配置
- `config/defuse-config.json` - 分析器配置
