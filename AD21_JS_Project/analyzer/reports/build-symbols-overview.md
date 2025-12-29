# 构建文件语义总览报告

## 📊 总体概览

- **生成时间**: 2025-12-16T17:05:13.796Z
- **模块数量**: 10
- **可调用对象**: 498
- **全局变量**: 1359
- **DFM函数**: 0

## 🏗️ 模块接口

### ModuleAccessor

**描述**: ModuleAccessor模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
ModuleAccessor.configuration()
```

**可用方法**:
- `configuration` (行 342)
- `cacheStats` (行 342)
- `availableModules` (行 342)
- `getModule` (行 350)
- `isModuleAvailable` (行 350)
- `clearCache` (行 350)
- `getCacheStats` (行 350)
- `configure` (行 350)
- `getConfiguration` (行 350)
- `getAvailableModules` (行 350)
- `getStatistics` (行 350)

### base

**描述**: base模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
base.onBeforeInit()
```

**可用方法**:
- `onBeforeInit` (行 51)
- `onAfterInit` (行 51)
- `onBeforeRun` (行 51)
- `onAfterRun` (行 51)
- `onBeforeDestroy` (行 51)
- `onAfterDestroy` (行 51)
- `initialized` (行 62)
- `running` (行 62)
- `destroyed` (行 62)
- `errorCount` (行 62)
- `lastError` (行 62)
- `startTime` (行 72)
- `endTime` (行 72)
- `executionTime` (行 72)
- `success` (行 106)
- `message` (行 106)
- `data` (行 106)
- `time` (行 106)
- `create` (行 337)
- `init` (行 337)
- `run` (行 337)
- `destroy` (行 337)
- `version` (行 337)
- `defaultOptions` (行 337)

### Core

**描述**: Core模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
Core.initialized()
```

**可用方法**:
- `initialized` (行 47)
- `modulesLoaded` (行 47)
- `modulesTotal` (行 47)
- `lastActivity` (行 47)
- `errorCount` (行 47)
- `warnings` (行 47)
- `name` (行 188)
- `version` (行 188)
- `state` (行 188)
- `systemState` (行 188)
- `options` (行 188)
- `healthy` (行 188)

### log-controller

**描述**: log-controller模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
log-controller.enabled()
```

**可用方法**:
- `enabled` (行 623)
- `setGenerationLevel` (行 885)
- `isGenerationEnabled` (行 885)
- `getGenerationSwitches` (行 885)
- `setDisplayLevel` (行 885)
- `isDisplayEnabled` (行 885)
- `getDisplaySwitches` (行 885)
- `enableAllLevels` (行 885)
- `disableAllLevels` (行 885)
- `enableProductionMode` (行 885)
- `enableDebugMode` (行 885)
- `getStats` (行 885)
- `resetStats` (行 885)
- `processLogStats` (行 885)
- `cleanupProcessedLogs` (行 885)
- `outputDebugInfo` (行 885)
- `getDetailedStatus` (行 885)
- `outputSystemDiagnostics` (行 885)
- `configure` (行 885)
- `getConfiguration` (行 885)

### logger

**描述**: logger模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
logger.success()
```

**可用方法**:
- `success` (行 178)
- `message` (行 178)
- `success` (行 185)
- `message` (行 185)
- `success` (行 187)
- `message` (行 187)
- `create` (行 558)
- `init` (行 558)
- `run` (行 558)
- `destroy` (行 558)
- `getLogger` (行 558)
- `getDefaultLogger` (行 558)
- `getInstances` (行 558)
- `error` (行 558)
- `warn` (行 558)
- `info` (行 558)
- `debug` (行 558)
- `configure` (行 558)
- `getConfiguration` (行 558)
- `setDefaultLevel` (行 558)
- `setDefaultThreshold` (行 558)
- `setDefaultEnabled` (行 558)
- `getStats` (行 558)
- `getCount` (行 558)
- `flush` (行 558)
- `clear` (行 558)
- `flushAll` (行 558)
- `clearAll` (行 558)
- `destroyAll` (行 558)
- `batchOperation` (行 558)
- `getGlobalStats` (行 558)
- `isHealthy` (行 558)
- `getInfo` (行 558)
- `name` (行 608)
- `version` (行 608)
- `description` (行 608)
- `author` (行 608)

### ui-logger

**描述**: ui-logger模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
ui-logger.success()
```

**可用方法**:
- `success` (行 205)
- `message` (行 205)
- `success` (行 212)
- `message` (行 212)
- `success` (行 214)
- `message` (行 214)
- `create` (行 380)
- `init` (行 380)
- `run` (行 380)
- `destroy` (行 380)
- `uiError` (行 380)
- `uiWarn` (行 380)
- `uiInfo` (行 380)
- `uiDebug` (行 380)
- `uiRaw` (行 380)
- `uiClear` (行 380)
- `configure` (行 380)
- `getConfiguration` (行 380)

### object-module

**描述**: object-module模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
object-module.module()
```

**可用方法**:
- `module` (行 727)
- `factory` (行 727)
- `manager` (行 727)
- `mockSystem` (行 727)
- `geometry` (行 727)
- `initialize` (行 779)
- `isInitialized` (行 779)
- `configure` (行 779)
- `getConfiguration` (行 779)
- `createObject` (行 779)
- `createMock` (行 779)
- `createFromIterator` (行 779)
- `createBatch` (行 779)
- `getObject` (行 779)
- `removeObject` (行 779)
- `getObjectsByType` (行 779)
- `getObjectsByPosition` (行 779)
- `getAllObjects` (行 779)
- `getObjectCount` (行 779)
- `createGeometryCalculator` (行 779)
- `calculateDistance` (行 779)
- `getSupportedTypes` (行 779)
- `isTypeSupported` (行 779)
- `getStatistics` (行 779)
- `cleanup` (行 779)
- `ObjectFactory` (行 779)
- `ObjectManager` (行 779)
- `MockSystem` (行 779)
- `PCBObjectWrapper` (行 779)
- `GeometryWrapper` (行 779)

### pcb-interfaces

**描述**: pcb-interfaces模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
pcb-interfaces.initialize()
```

**可用方法**:
- `initialize` (行 346)
- `createWrapper` (行 346)
- `createFromIterator` (行 346)
- `createMock` (行 346)
- `getObjectPool` (行 346)
- `getStatistics` (行 346)
- `cleanup` (行 346)
- `isReady` (行 346)
- `getSupportedTypes` (行 346)
- `BasePCBWrapper` (行 346)
- `PCBMockSystem` (行 346)
- `PCBObjectFactory` (行 346)
- `PCBObjectPool` (行 346)
- `GeometryCalculator` (行 346)
- `ArcWrapper` (行 346)
- `PadWrapper` (行 346)
- `TrackWrapper` (行 346)
- `ViaWrapper` (行 346)

### object-creator

**描述**: object-creator模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
object-creator.success()
```

**可用方法**:
- `success` (行 276)
- `message` (行 276)
- `success` (行 285)
- `message` (行 285)
- `success` (行 289)
- `message` (行 289)
- `create` (行 476)
- `init` (行 476)
- `run` (行 476)
- `destroy` (行 476)
- `createObject` (行 476)
- `createAtOrigin` (行 476)
- `createBatch` (行 476)
- `getSupportedTypes` (行 476)
- `validateCreateOptions` (行 476)
- `getStatistics` (行 476)
- `ObjectCreator` (行 476)
- `PositionManager` (行 476)

### ObjectCreatorWindow

**描述**: ObjectCreatorWindow模块

**使用方式**: 直接调用模块方法

**示例**:
```javascript
ObjectCreatorWindow.config()
```

**可用方法**:
- `config` (行 14)
- `initialized` (行 14)
- `initialized` (行 108)
- `uiModuleAvailable` (行 108)
- `uiModuleStatus` (行 108)
- `create` (行 116)
- `initialize` (行 116)
- `show` (行 116)
- `hide` (行 116)
- `isInitialized` (行 116)
- `getStatus` (行 116)

## 📞 可调用对象

### f

**描述**: function函数

**使用方式**: f(n)

**示例**:
```javascript
f(n)
```

### this_value

**描述**: function函数

**使用方式**: this_value()

**示例**:
```javascript
this_value()
```

### quote

**描述**: function函数

**使用方式**: quote(string)

**示例**:
```javascript
quote(string)
```

### str

**描述**: function函数

**使用方式**: str(key, holder)

**示例**:
```javascript
str(key, holder)
```

### walk

**描述**: function函数

**使用方式**: walk(holder, key)

**示例**:
```javascript
walk(holder, key)
```

### _safeEval

**描述**: function函数

**使用方式**: _safeEval(code)

**示例**:
```javascript
_safeEval(code)
```

### _checkDirectVariable

**描述**: function函数

**使用方式**: _checkDirectVariable(moduleName)

**示例**:
```javascript
_checkDirectVariable(moduleName)
```

### _getDirectVariable

**描述**: function函数

**使用方式**: _getDirectVariable(moduleName)

**示例**:
```javascript
_getDirectVariable(moduleName)
```

### _getWindowModule

**描述**: function函数

**使用方式**: _getWindowModule(moduleName)

**示例**:
```javascript
_getWindowModule(moduleName)
```

### _getModuleExports

**描述**: function函数

**使用方式**: _getModuleExports(moduleName)

**示例**:
```javascript
_getModuleExports(moduleName)
```

*... 还有 488 个函数*

## 💡 使用示例

### 使用ModuleAccessor模块

```javascript
// 使用 ModuleAccessor 模块
var result = ModuleAccessor.configuration();
console.log(result);
```

### 使用base模块

```javascript
// 使用 base 模块
var result = base.onBeforeInit();
console.log(result);
```

### 使用Core模块

```javascript
// 使用 Core 模块
var result = Core.initialized();
console.log(result);
```

### 调用f函数

```javascript
// 调用 f 函数
var result = f(param1, param2);
console.log(result);
```

### 调用this_value函数

```javascript
// 调用 this_value 函数
var result = this_value();
console.log(result);
```

### 调用quote函数

```javascript
// 调用 quote 函数
var result = quote(param1, param2);
console.log(result);
```

