# 数字变量来源追踪报告

## 📊 总体概览

- **生成时间**: 2025-12-16T17:19:27.223Z
- **构建文件数量**: 2
- **数字变量总数**: 0
- **最大连续组**: 无
- **构建脚本生成**: 是
- **发现模式**: 2 个

## 🏗️ 构建文件分析

### main_utf8.js

- **数字变量**: 0 个
- **连续组**: 0 个
- **文件大小**: 673180 bytes
- **总行数**: 21577 行

### main.js

- **数字变量**: 0 个
- **连续组**: 0 个
- **文件大小**: 687549 bytes
- **总行数**: 21577 行

## 🔧 构建脚本分析

### ⚠️ 发现数字变量生成代码

#### 全局导出代码 (第121-141行)

```javascript
        mergedContent += '    var globalVars = [\n';
        mergedContent += '        "BaseModule_GLOBAL", "Core_GLOBAL", "LOG_LEVELS_GLOBAL", "LEVEL_NAMES_GLOBAL",\n';
        mergedContent += '        "LEVEL_DESCRIPTIONS_GLOBAL", "DEFAULT_CONFIG_GLOBAL", "LOG_ENTRY_TEMPLATE_GLOBAL",\n';
        mergedContent += '        "STATS_TEMPLATE_GLOBAL", "INSTANCE_DATA_TEMPLATE_GLOBAL", "ERROR_CODES_GLOBAL",\n';
        mergedContent += '        "ERROR_MESSAGES_GLOBAL", "isValidLogLevel_GLOBAL", "getLevelName_GLOBAL",\n';
        mergedContent += '        "getLevelDescription_GLOBAL", "isLevelEnabled_GLOBAL", "getErrorMessage_GLOBAL",\n';
        mergedContent += '        "createDefaultConfig_GLOBAL", "createStats_GLOBAL", "createLogEntry_GLOBAL",\n';
        mergedContent += '        "createInstanceData_GLOBAL", "simpleStringify_GLOBAL", "safeString_GLOBAL",\n';
        mergedContent += '        "padString_GLOBAL", "truncateString_GLOBAL", "formatTimestamp_GLOBAL",\n';
        mergedContent += '        "getCurrentTime_GLOBAL", "isValidString_GLOBAL", "isValidObject_GLOBAL",\n';
        mergedContent += '        "isValidFunction_GLOBAL", "isValidNumber_GLOBAL", "isPositiveInteger_GLOBAL",\n';
        mergedContent += '        "isValidBoolean_GLOBAL", "mergeConfig_GLOBAL", "validateConfig_GLOBAL",\n';
        mergedContent += '        "estimateLogSize_GLOBAL", "validateLogEntry_GLOBAL", "cleanLogEntry_GLOBAL",\n';
        mergedContent += '        "safeExecute_GLOBAL", "createError_GLOBAL", "safeArrayLength_GLOBAL",\n';
        mergedContent += '        "safeArrayGet_GLOBAL", "clearArray_GLOBAL", "executeWriteStep_GLOBAL",\n';
        mergedContent += '        "getQueueStatus_GLOBAL", "clearWriteQueue_GLOBAL", "DEFAULT_WRITE_CONFIG_GLOBAL",\n';
        mergedContent += '        "LoggerModule_GLOBAL", "LoggerModuleIndex_GLOBAL", "UILoggerModule_GLOBAL",\n';
        mergedContent += '        "GlobalLogController_GLOBAL", "ObjectFactory_GLOBAL", "ObjectManager_GLOBAL",\n';
        mergedContent += '        "MockSystem_GLOBAL", "PCBObjectWrapper_GLOBAL", "GeometryWrapper_GLOBAL",\n';
        mergedContent += '        "ObjectModule_GLOBAL", "ObjectCreatorModule_GLOBAL", "PositionManager_GLOBAL", "PCBInterfaces_GLOBAL"\n';
        mergedContent += '    ];\n';
```

#### 数字生成相关代码片段

- 第121行: `mergedContent += '    var globalVars = [\n';`
- 第143行: `mergedContent += '    for (var i = 0; i < globalVars.length; i++) {\n';`
- 第144行: `mergedContent += '        var varName = globalVars[i];\n';`
- 第145行: `mergedContent += '        if (typeof this[varName] !== "undefined") {\n';`
- 第146行: `mergedContent += '            window[varName] = this[varName];\n';`
- 第154行: `for (var i = 0; i < fileList.length; i++) {`
- 第289行: `for (var i = 0; i < assets.length; i++) {`
- 第391行: `for (var i = 0; i < totalSteps; i++) {`
- 第624行: `for (var i = 0; i < result.errors.length; i++) {`

## 🔍 模式匹配分析

### 构建脚本全局变量导出

构建脚本中的globalVars数组可能生成数字变量

- **build.js**: 2 个匹配

### 自动索引生成

循环中可能生成数字索引变量

- **build.js**: 5 个匹配
- **build-integrator.js**: 2 个匹配

## 🎯 分析结论

### 🟡 script_generation

构建脚本可能包含数字变量生成代码

### 🟢 pattern_matches

发现2个可能的数字变量生成模式

## 💡 建议

3. **审查构建脚本**: 检查globalVars数组的内容和用途

---
*报告生成时间: 2025/12/17 01:19:27*
