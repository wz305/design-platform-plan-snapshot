# UI调试系统使用说明

## 🎯 概述

UI调试系统是一个独立的调试工具，基于现有的 `memLog.Lines.Add()` 机制构建，用于在主日志系统不可用时提供丰富的调试信息。

## 🚀 核心功能

### 1. 调试级别函数

```javascript
// 基本调试函数
uiTrace(message, context, fileName, functionName);  // 最详细的跟踪信息
uiInfo(message, context, fileName, functionName);   // 一般信息
uiWarn(message, context, fileName, functionName);   // 警告信息
uiError(message, context, fileName, functionName);  // 错误信息
uiFatal(message, context, fileName, functionName);  // 致命错误

// 直接输出函数
uiWrite(message);  // 直接写入UI，无格式化
```

### 2. 专用调试工具

```javascript
// 模块状态检查
debugModuleStatus();

// 函数调用跟踪
debugFunctionCall(functionName, args, fileName);
debugFunctionReturn(functionName, result, fileName);
debugFunctionError(functionName, error, fileName);
```

## 📱 UI界面

新增了"调试状态"按钮，点击后会：
1. 检查所有Logger模块的可用性
2. 测试UI调试系统的各个级别
3. 显示详细的调试信息

## 🔧 使用示例

### 1. 基本使用

```javascript
// 在任何函数中使用
function myFunction(param1, param2) {
    uiInfo("函数开始执行", {param1: param1, param2: param2}, "my-file.js", "myFunction");
    
    try {
        // 业务逻辑
        var result = doSomething(param1, param2);
        uiInfo("函数执行成功", {result: result}, "my-file.js", "myFunction");
        return result;
    } catch (error) {
        uiError("函数执行失败", {error: error.message}, "my-file.js", "myFunction");
        throw error;
    }
}
```

### 2. 函数跟踪

```javascript
function complexFunction(data) {
    debugFunctionCall("complexFunction", [data], "complex-file.js");
    
    try {
        var result = processData(data);
        debugFunctionReturn("complexFunction", result, "complex-file.js");
        return result;
    } catch (error) {
        debugFunctionError("complexFunction", error, "complex-file.js");
        throw error;
    }
}
```

### 3. 模块状态检查

```javascript
// 在初始化时检查模块状态
function initializeApp() {
    uiInfo("=== 应用初始化开始 ===", null, "app.js", "initializeApp");
    
    // 检查所有模块状态
    debugModuleStatus();
    
    // 继续初始化...
    uiInfo("=== 应用初始化完成 ===", null, "app.js", "initializeApp");
}
```

## 📋 输出格式

UI调试系统使用统一的输出格式：

```
[时间戳] [级别] [函数: 函数名] [文件: 文件名] 消息内容 上下文: {序列化的上下文信息}
```

示例：
```
[2025/12/9 22:34:31] [INFO] [函数: myFunction] [文件: my-file.js] 函数执行成功 上下文: {"result":"success"}
```

## 🎨 级别说明

| 级别 | 用途 | 颜色标识 |
|------|------|----------|
| TRACE | 最详细的跟踪信息，通常只在开发时使用 | 灰色 |
| INFO | 一般信息，正常的程序流程 | 白色 |
| WARN | 警告信息，可能的问题但不影响运行 | 黄色 |
| ERROR | 错误信息，程序出现异常但可继续 | 红色 |
| FATAL | 致命错误，程序无法继续运行 | 深红色 |

## 🔍 与主日志系统的关系

1. **独立性**: UI调试系统不依赖LoggerModule，可独立工作
2. **互补性**: 主日志系统用于持久化日志，UI调试系统用于实时调试
3. **兼容性**: 两者可以同时使用，不会冲突

## 🚨 注意事项

1. **性能考虑**: UI调试系统会立即输出到界面，频繁使用可能影响性能
2. **内存使用**: 大量调试信息会占用UI内存，建议适时清空
3. **ES3兼容**: 所有代码都保持ES3兼容性，可在AD环境中正常运行

## 🛠 故障排除

### 1. 调试信息不显示
- 检查 `memLog` 对象是否可用
- 确认 `memLog.Lines.Add()` 方法是否正常工作

### 2. 模块状态检查失败
- 这是正常现象，说明主日志系统未加载
- UI调试系统仍然可以正常使用

### 3. 格式化问题
- 检查 `JSON.stringify()` 是否可用
- 上下文对象过大可能导致序列化失败

## 📝 最佳实践

1. **合理使用级别**: 根据信息重要性选择合适的调试级别
2. **提供上下文**: 尽量提供有意义的上下文信息
3. **统一命名**: 使用一致的文件名和函数名
4. **适时清理**: 定期清空UI显示区域，避免信息过载
5. **结合使用**: 与主日志系统结合使用，获得最佳调试体验

## 🔮 扩展建议

1. **添加过滤器**: 可以添加级别过滤器，只显示特定级别的信息
2. **搜索功能**: 可以添加搜索功能，快速定位特定信息
3. **导出功能**: 可以添加导出功能，将调试信息保存到文件
4. **颜色编码**: 可以根据级别使用不同颜色显示信息
