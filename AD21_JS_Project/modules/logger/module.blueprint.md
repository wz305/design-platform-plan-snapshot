# Module Blueprint: LoggerModule

Created-By: Cline AI
Created-At: 2025-12-09 20:00:00
Source-Request: LoggerModule重构：基于BaseModule重新设计
Version: 0.1

---

## 1. 语义协商（Semantic Negotiation）

**需求复述**：
用户要求重构LoggerModule，基于BaseModule重新设计，解决window依赖问题，确保在AD环境中稳定运行。选择完全重构方案，无需考虑调用代码兼容性，可以重构所有相关代码。

**假设清单**：
1. 需要彻底移除所有window依赖
2. 需要基于BaseModule模板重构
3. 需要保持ES3语法兼容性
4. 需要保留日志级别、缓存、统计等核心功能
5. 需要支持debug时的值截获功能
6. 对象处理使用简单的for...in遍历

**不确定点 / 需澄清的问题**：
- 已确认：无需保持API兼容性
- 已确认：可以重构所有相关代码
- 已确认：使用简单的对象处理方式

**候选高层方案**：
- **方案A：完全重构方案**（已选择）
  - 优点：彻底解决window依赖，架构清晰，符合BaseModule标准
  - 缺点：可能破坏现有API兼容性，需要修改调用代码
- **方案B：渐进式重构方案**（已放弃）
  - 优点：保持API兼容性，风险较低，易于迁移
  - 缺点：可能保留部分历史包袱，架构不够纯粹

**当前信心分数**：9/10
**理由**：需求明确，技术约束清晰，可以设计最优架构。

---

## 2. 结构协商（Structural Negotiation）

**建议文件结构**：
```
src/modules/logger/
├── index.js          # 模块入口，揭示模块模式导出
├── core.js           # 继承BaseModule，包含所有核心逻辑
├── types.js          # 日志级别、配置等类型定义
├── tools.js          # 工具函数（格式化、验证等）
└── steps/
    ├── step_write.js # 日志写入步骤
    └── step_format.js # 日志格式化步骤
```

**每个文件职责说明**：
- **index.js**：揭示模块模式导出，提供create/init/run/destroy接口
- **core.js**：继承BaseModule，包含所有核心业务逻辑（级别判断、缓存管理、统计等）
- **types.js**：定义日志级别常量、默认配置、数据结构
- **tools.js**：提供格式化、验证、字符串处理等工具函数
- **steps/step_write.js**：负责将日志写入文件的步骤逻辑
- **steps/step_format.js**：负责日志条目格式化的步骤逻辑

**主流程草图**：
1. **create阶段**：创建Logger实例，初始化配置和状态
2. **init阶段**：设置日志级别、阈值，准备写入环境
3. **run阶段**：提供日志记录接口（error/warn/info/debug）
4. **destroy阶段**：清空缓存，释放资源

**替代结构**：
- **简化结构**：已考虑但放弃，文件过少职责不清
- **功能导向结构**：已考虑但放弃，文件过多增加复杂度

**风险提示 / 兼容性检查**：
- **风险1**：需要确保所有代码符合ES3语法
- **风险2**：需要移除所有window依赖
- **风险3**：需要重新设计配置系统
- **兼容性**：完全基于BaseModule，确保架构一致性

**结构信心分数**：9/10
**理由**：结构清晰，符合BaseModule模式，简化合理。

---

## 3. 接口协商（Interface Negotiation）

**对外 API 清单**：

**基础生命周期接口**：
```js
create(options)           // 创建Logger实例
init()                    // 初始化Logger
run(data)                 // 运行Logger（可选）
destroy()                 // 销毁Logger实例
```

**日志记录接口**：
```js
error(message, context, fileName, functionName)  // 记录错误
warn(message, context, fileName, functionName)   // 记录警告
info(message, context, fileName, functionName)   // 记录信息
debug(message, context, fileName, functionName)  // 记录调试/截获值
```

**配置管理接口**：
```js
setLevel(level)           // 设置日志级别
setThreshold(threshold)   // 设置写入阈值
setEnabled(enabled)       // 启用/禁用日志
```

**状态管理接口**：
```js
getStats()               // 获取统计信息
getCount()               // 获取缓存数量
flush()                  // 强制写入缓存
clear()                  // 清空缓存
```

**内部接口清单**：
```js
_checkLogLevel(level, config)           // 检查日志级别
_createLogEntry(level, message, context) // 创建日志条目
_addToCache(logEntry)                    // 添加到缓存
_checkThreshold()                        // 检查写入阈值
_updateStats(level)                      // 更新统计信息
_formatLogEntry(logEntry)                // 格式化日志条目
_writeLogs(logs)                         // 写入日志文件
```

**输入/输出数据结构（ES3 语义）**：
```js
// 日志条目结构
var logEntry = {
    timestamp: "2025-12-09 20:00:00",
    level: "ERROR",
    message: "错误信息",
    moduleName: "LoggerModule",
    fileName: "core.js",
    functionName: "error",
    context: {key: "value"}
};

// 统计信息结构
var stats = {
    totalLogs: 100,
    errorCount: 5,
    warnCount: 10,
    infoCount: 50,
    debugCount: 35,
    cacheSize: 20,
    lastFlushTime: 1702123080000
};
```

**错误码或异常处理策略**：
- **参数错误**：静默处理，不抛出异常
- **写入失败**：保留缓存，记录错误统计
- **配置错误**：使用默认值，记录警告日志
- **内存不足**：自动flush缓存，释放内存

**跨模块依赖清单**：
- **BaseModule**：继承基础架构（参考示例/模块模板.md）
- **无其他依赖**：完全独立，无window等外部依赖

**接口信心分数**：9/10
**理由**：接口设计简洁实用，技术实现明确，符合ES3环境要求。

---

## 4. 节点协商（Node-Level Negotiation）

### Function: create(options)
**用途**: 创建LoggerModule实例
**输入**: options - 配置对象（可选）
**输出**: LoggerModule实例
**步骤拆解**:
1. 调用BaseModule.create()创建基础实例
2. 合并Logger特定的默认配置
3. 初始化日志缓存和统计信息
4. 设置Logger特定的Hook函数
5. 返回配置好的实例

**日志点**:
- debug: "创建Logger实例，配置: {config}"

**错误处理**:
- options不是对象时使用空对象
- 配置合并失败时使用默认配置

**边界条件**:
- options为null/undefined时使用空对象
- 重复创建实例时各自独立

**依赖工具函数**:
- BaseModule.create()
- mergeConfig()

**性能考虑**:
- 实例创建应该是轻量级操作
- 避免在create时进行复杂初始化

**测试要点**:
- 测试不同options参数的处理
- 测试实例独立性
- 测试默认配置应用

**信心分数**: 9/10
**风险说明**: 低风险，主要是配置合并逻辑

---

### Function: init(inst)
**用途**: 初始化LoggerModule实例
**输入**: inst - Logger实例
**输出**: Boolean - 初始化是否成功
**步骤拆解**:
1. 调用BaseModule.init()进行基础初始化
2. 验证日志级别配置有效性
3. 初始化写入环境（检查文件路径等）
4. 设置默认的日志级别和阈值
5. 准备缓存数组

**日志点**:
- info: "Logger初始化完成，级别: {level}, 阈值: {threshold}"
- error: "初始化失败: {error}"

**错误处理**:
- 日志级别无效时使用默认级别
- 写入环境检查失败时返回false
- 其他异常时记录错误并返回false

**边界条件**:
- 重复初始化时跳过或重置
- 配置参数异常时使用默认值

**依赖工具函数**:
- BaseModule.init()
- validateLogLevel()
- checkWriteEnvironment()

**性能考虑**:
- 初始化应该快速完成
- 避免阻塞操作

**测试要点**:
- 测试各种配置参数的处理
- 测试重复初始化行为
- 测试错误情况处理

**信心分数**: 8/10
**风险说明**: 中等风险，涉及文件系统检查

---

### Function: run(inst, data)
**用途**: 执行Logger主要逻辑（可选）
**输入**: inst - Logger实例, data - 运行数据（可选）
**输出**: Object - 执行结果
**步骤拆解**:
1. 调用BaseModule.run()进行基础运行
2. 如果data存在且包含日志信息，处理这些日志
3. 检查是否需要自动flush缓存
4. 返回执行结果和统计信息

**日志点**:
- debug: "Logger运行，处理数据: {data}"
- info: "运行完成，处理日志数: {count}"

**错误处理**:
- data格式错误时跳过处理
- 运行异常时返回错误结果

**边界条件**:
- data为空时正常返回
- 实例未初始化时自动初始化

**依赖工具函数**:
- BaseModule.run()
- processLogData()

**性能考虑**:
- 批量处理日志时注意性能
- 避免长时间阻塞

**测试要点**:
- 测试不同data参数的处理
- 测试自动初始化功能
- 测试批量处理性能

**信心分数**: 7/10
**风险说明**: 中等风险，取决于具体使用场景

---

### Function: destroy(inst)
**用途**: 销毁LoggerModule实例
**输入**: inst - Logger实例
**输出**: Boolean - 销毁是否成功
**步骤拆解**:
1. 在销毁前自动flush缓存中的日志
2. 调用BaseModule.destroy()进行基础销毁
3. 清空所有内部数据和缓存
4. 释放资源引用

**日志点**:
- info: "Logger销毁，自动写入日志数: {count}"
- error: "销毁失败: {error}"

**错误处理**:
- flush失败时继续销毁过程
- 销毁异常时记录错误但继续清理

**边界条件**:
- 实例已经销毁时直接返回true
- 缓存为空时跳过flush

**依赖工具函数**:
- BaseModule.destroy()
- flush()

**性能考虑**:
- 确保所有日志都被写入
- 避免资源泄漏

**测试要点**:
- 测试自动flush功能
- 测试资源清理完整性
- 测试重复销毁行为

**信心分数**: 9/10
**风险说明**: 低风险，主要是资源清理逻辑

---

### Function: error(inst, message, context, fileName, functionName)
**用途**: 记录错误级别日志
**输入**: inst - Logger实例, message - 错误消息, context - 上下文信息, fileName - 文件名, functionName - 函数名
**输出**: 无返回值
**步骤拆解**:
1. 检查Logger实例是否已初始化和启用
2. 检查ERROR级别是否被允许记录
3. 创建错误级别的日志条目
4. 添加到缓存并更新统计
5. 检查是否需要触发写入

**日志点**:
- debug: "记录错误日志: {message}"

**错误处理**:
- 参数缺失时使用默认值
- 创建日志条目失败时静默处理
- 缓存满时自动触发写入

**边界条件**:
- Logger未初始化时自动初始化
- 日志被禁用时直接返回

**依赖工具函数**:
- _checkLogLevel()
- _createLogEntry()
- _addToCache()
- _updateStats()
- _checkThreshold()

**性能考虑**:
- 错误日志通常较少，性能影响小
- 避免在错误处理中产生新错误

**测试要点**:
- 测试各种参数组合
- 测试级别过滤功能
- 测试自动写入触发

**信心分数**: 9/10
**风险说明**: 低风险，标准日志记录逻辑

---

### Function: warn(inst, message, context, fileName, functionName)
**用途**: 记录警告级别日志
**输入**: inst - Logger实例, message - 警告消息, context - 上下文信息, fileName - 文件名, functionName - 函数名
**输出**: 无返回值
**步骤拆解**:
1. 检查Logger实例是否已初始化和启用
2. 检查WARN级别是否被允许记录
3. 创建警告级别的日志条目
4. 添加到缓存并更新统计
5. 检查是否需要触发写入

**日志点**:
- debug: "记录警告日志: {message}"

**错误处理**:
- 参数缺失时使用默认值
- 创建日志条目失败时静默处理
- 缓存满时自动触发写入

**边界条件**:
- Logger未初始化时自动初始化
- 日志被禁用时直接返回

**依赖工具函数**:
- _checkLogLevel()
- _createLogEntry()
- _addToCache()
- _updateStats()
- _checkThreshold()

**性能考虑**:
- 警告日志频率适中
- 避免在警告处理中产生新错误

**测试要点**:
- 测试各种参数组合
- 测试级别过滤功能
- 测试统计信息更新

**信心分数**: 9/10
**风险说明**: 低风险，标准日志记录逻辑

---

### Function: info(inst, message, context, fileName, functionName)
**用途**: 记录信息级别日志
**输入**: inst - Logger实例, message - 信息消息, context - 上下文信息, fileName - 文件名, functionName - 函数名
**输出**: 无返回值
**步骤拆解**:
1. 检查Logger实例是否已初始化和启用
2. 检查INFO级别是否被允许记录
3. 创建信息级别的日志条目
4. 添加到缓存并更新统计
5. 检查是否需要触发写入

**日志点**:
- debug: "记录信息日志: {message}"

**错误处理**:
- 参数缺失时使用默认值
- 创建日志条目失败时静默处理
- 缓存满时自动触发写入

**边界条件**:
- Logger未初始化时自动初始化
- 日志被禁用时直接返回

**依赖工具函数**:
- _checkLogLevel()
- _createLogEntry()
- _addToCache()
- _updateStats()
- _checkThreshold()

**性能考虑**:
- 信息日志可能较多，注意性能
- 避免在信息处理中产生新错误

**测试要点**:
- 测试各种参数组合
- 测试级别过滤功能
- 测试批量记录性能

**信心分数**: 9/10
**风险说明**: 低风险，标准日志记录逻辑

---

### Function: debug(inst, message, context, fileName, functionName)
**用途**: 记录调试级别日志，支持值截获
**输入**: inst - Logger实例, message - 调试消息, context - 上下文信息（值截获对象）, fileName - 文件名, functionName - 函数名
**输出**: 无返回值
**步骤拆解**:
1. 检查Logger实例是否已初始化和启用
2. 检查DEBUG级别是否被允许记录
3. 创建调试级别的日志条目
4. 对context进行简单字符串化处理
5. 添加到缓存并更新统计
6. 检查是否需要触发写入

**日志点**:
- debug: "记录调试日志: {message}"

**错误处理**:
- 参数缺失时使用默认值
- 对象字符串化失败时使用"[Object]"
- 缓存满时自动触发写入

**边界条件**:
- Logger未初始化时自动初始化
- 日志被禁用时直接返回
- context为复杂对象时简化处理

**依赖工具函数**:
- _checkLogLevel()
- _createLogEntry()
- _addToCache()
- _updateStats()
- _checkThreshold()
- simpleStringify() // 来自tools.js

**性能考虑**:
- 调试日志可能很多，注意性能影响
- 对象字符串化可能较慢，需要优化

**测试要点**:
- 测试各种参数组合
- 测试对象截获功能
- 测试复杂对象处理

**信心分数**: 8/10
**风险说明**: 中等风险，对象处理可能影响性能

---

### Function: setLevel(inst, level)
**用途**: 设置日志级别
**输入**: inst - Logger实例, level - 日志级别
**输出**: Boolean - 设置是否成功
**步骤拆解**:
1. 验证Logger实例有效性
2. 验证日志级别参数有效性
3. 更新实例配置中的日志级别
4. 记录配置变更日志

**日志点**:
- info: "日志级别变更: {oldLevel} -> {newLevel}"
- error: "设置日志级别失败: {error}"

**错误处理**:
- level参数无效时返回false
- 实例无效时返回false
- 使用try-catch保护更新过程

**边界条件**:
- 重复设置相同级别时正常返回
- level为null/undefined时返回false

**依赖工具函数**:
- validateLogLevel()

**性能考虑**:
- 级别设置是轻量级操作
- 避免频繁设置影响性能

**测试要点**:
- 测试各种级别参数
- 测试无效参数处理
- 测试实例状态检查

**信心分数**: 9/10
**风险说明**: 低风险，简单的配置操作

---

### Function: setThreshold(inst, threshold)
**用途**: 设置写入阈值
**输入**: inst - Logger实例, threshold - 阈值数量
**输出**: Boolean - 设置是否成功
**步骤拆解**:
1. 验证Logger实例有效性
2. 验证threshold参数（必须是正整数）
3. 更新实例配置中的阈值
4. 记录配置变更日志
5. 检查当前缓存是否需要立即写入

**日志点**:
- info: "写入阈值变更: {oldThreshold} -> {newThreshold}"
- error: "设置写入阈值失败: {error}"

**错误处理**:
- threshold不是正整数时返回false
- 实例无效时返回false
- 更新失败时恢复原值

**边界条件**:
- threshold为1时立即触发写入
- threshold过大时可能影响内存

**依赖工具函数**:
- _checkThreshold()

**性能考虑**:
- 阈值设置是轻量级操作
- 避免设置过小导致频繁写入

**测试要点**:
- 测试各种阈值参数
- 测试边界值处理
- 测试自动写入触发

**信心分数**: 9/10
**风险说明**: 低风险，简单的配置操作

---

### Function: setEnabled(inst, enabled)
**用途**: 启用/禁用日志
**输入**: inst - Logger实例, enabled - 是否启用
**输出**: Boolean - 设置是否成功
**步骤拆解**:
1. 验证Logger实例有效性
2. 验证enabled参数（必须是布尔值）
3. 更新实例配置中的启用状态
4. 记录状态变更日志
5. 如果禁用时检查是否需要清空缓存

**日志点**:
- info: "日志状态变更: {oldState} -> {newState}"
- error: "设置日志状态失败: {error}"

**错误处理**:
- enabled不是布尔值时返回false
- 实例无效时返回false
- 更新失败时恢复原值

**边界条件**:
- 重复设置相同状态时正常返回
- 禁用时可以选择清空缓存

**依赖工具函数**:
- 无

**性能考虑**:
- 状态设置是轻量级操作
- 禁用后可以减少性能开销

**测试要点**:
- 测试启用/禁用切换
- 测试参数验证
- 测试状态影响

**信心分数**: 9/10
**风险说明**: 低风险，简单的状态切换

---

### Function: getStats(inst)
**用途**: 获取统计信息
**输入**: inst - Logger实例
**输出**: Object - 统计信息对象
**步骤拆解**:
1. 验证Logger实例有效性
2. 收集所有统计信息
3. 格式化统计信息对象
4. 添加当前缓存大小等信息
5. 返回完整的统计信息

**日志点**:
- debug: "获取统计信息: {stats}"

**错误处理**:
- 实例无效时返回空对象
- 统计信息异常时返回部分信息

**边界条件**:
- 实例未初始化时返回默认统计
- 统计信息为空时返回空统计

**依赖工具函数**:
- 无

**性能考虑**:
- 统计信息收集是轻量级操作
- 避免频繁调用影响性能

**测试要点**:
- 测试各种实例状态
- 测试统计信息完整性
- 测试异常情况处理

**信心分数**: 9/10
**风险说明**: 低风险，只读操作

---

### Function: getCount(inst)
**用途**: 获取当前缓存中的日志数量
**输入**: inst - Logger实例
**输出**: Number - 日志数量
**步骤拆解**:
1. 验证Logger实例有效性
2. 获取缓存数组长度
3. 返回日志数量

**日志点**:
- debug: "获取日志数量: {count}"

**错误处理**:
- 实例无效时返回0
- 缓存异常时返回0

**边界条件**:
- 缓存为空时返回0
- 实例未初始化时返回0

**依赖工具函数**:
- 无

**性能考虑**:
- 获取数组长度是O(1)操作
- 性能影响极小

**测试要点**:
- 测试各种缓存状态
- 测试实例状态检查
- 测试返回值准确性

**信心分数**: 10/10
**风险说明**: 无风险，简单的属性访问

---

### Function: flush(inst)
**用途**: 强制写入缓存中的日志
**输入**: inst - Logger实例
**输出**: Boolean - 写入是否成功
**步骤拆解**:
1. 验证Logger实例有效性
2. 检查缓存是否为空
3. 调用写入步骤执行写入
4. 写入成功后清空缓存
5. 更新统计信息
6. 记录写入操作日志

**日志点**:
- info: "强制写入日志，数量: {count}"
- error: "强制写入失败: {error}"

**错误处理**:
- 实例无效时返回false
- 缓存为空时返回true
- 写入失败时保留缓存

**边界条件**:
- 重复flush时缓存为空
- 写入过程中发生异常

**依赖工具函数**:
- _writeLogs() // 来自step_write.js

**性能考虑**:
- flush可能涉及文件I/O，较慢
- 避免频繁flush影响性能

**测试要点**:
- 测试各种缓存状态
- 测试写入成功/失败
- 测试异常处理

**信心分数**: 8/10
**风险说明**: 中等风险，涉及文件I/O操作

---

### Function: clear(inst)
**用途**: 清空日志缓存（不写入文件）
**输入**: inst - Logger实例
**输出**: Boolean - 清空是否成功
**步骤拆解**:
1. 验证Logger实例有效性
2. 记录清空前的日志数量
3. 清空缓存数组
4. 重置相关统计信息
5. 记录清空操作日志

**日志点**:
- info: "清空日志缓存，数量: {count}"
- error: "清空缓存失败: {error}"

**错误处理**:
- 实例无效时返回false
- 清空异常时尝试重新初始化缓存

**边界条件**:
- 缓存已经为空时正常返回
- 清空后立即有新日志写入

**依赖工具函数**:
- 无

**性能考虑**:
- 清空操作是轻量级的
- 不会影响后续性能

**测试要点**:
- 测试各种缓存状态
- 测试清空操作
- 测试统计信息重置

**信心分数**: 9/10
**风险说明**: 低风险，简单的内存操作

---

## 5. 执行命令（Execution Command）

**将要修改/新增的文件（明确路径）**：
- 新增：`modules/logger/module.blueprint.md`（当前文件）
- 新增：`src/modules/logger/index.js`
- 新增：`src/modules/logger/core.js`
- 新增：`src/modules/logger/types.js`
- 新增：`src/modules/logger/tools.js`
- 新增：`src/modules/logger/steps/step_write.js`
- 新增：`src/modules/logger/steps/step_format.js`

**每个文件的具体操作清单**：
1. **module.blueprint.md**：创建完整的协商文档（当前操作）
2. **index.js**：实现揭示模块模式，导出LoggerModule接口
3. **core.js**：继承BaseModule，实现所有核心逻辑和生命周期方法
4. **types.js**：定义日志级别常量、默认配置、数据结构
5. **tools.js**：实现对象字符串化、格式化等工具函数
6. **step_write.js**：实现日志文件写入逻辑
7. **step_format.js**：实现日志条目格式化逻辑

**执行顺序（步骤）**：
1. 创建module.blueprint.md（保存协商结果）
2. 完成节点协商（设计剩余函数）
3. 创建types.js（定义基础类型）
4. 创建tools.js（实现工具函数）
5. 创建steps目录下的文件
6. 创建core.js（实现核心逻辑）
7. 创建index.js（实现模块导出）
8. 更新构建配置（如需要）

**回滚策略与备份说明**：
- 保留现有LoggerModule在参考示例目录中作为备份
- 新模块完全独立，不影响现有代码
- 如需回滚，可直接删除src/modules/logger目录

**最终信心分数**：9/10
**理由**：设计完整，架构清晰，技术方案可行。

**用户确认提示**：用户必须回复"确认执行"才能进入实现阶段。

---

## 变更记录

- Version: 0.1
- Changed-By: Cline AI
- Changed-At: 2025-12-09 20:00:00
- Change-Summary: 初始版本，完成阶段1-4协商，保存详细设计文档

---

## 备注
- 本blueprint是LoggerModule重构的完整规格文档
- 所有实现必须严格遵循ES3语法规范
- 必须基于BaseModule模板进行开发
- 禁止使用window、this等AD环境不支持的特性
- 对象处理使用简单的for...in遍历，无需复杂的深度控制
