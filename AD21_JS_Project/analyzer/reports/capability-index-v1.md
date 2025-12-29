# Capability Index v1.0 - Stage 5.5

## 🎯 系统能力边界声明

### ✅ 系统承诺的能力

- 静态可达性分析
- 符号存在性检查
- 方法签名推断
- 模块依赖分析
- 作用域边界识别

### ❌ 系统不承诺的能力

- 运行时值状态推断
- AD内部对象生命周期模拟
- 参数值合法性验证
- 动态执行路径分析
- 内存使用情况预测

## 📋 可查询事实

- **模块数量**: 32
- **可调用对象**: 51
- **全局符号**: 83

## 🔍 查询接口

- `isObjectCallable`
- `listMethods`
- `canAccess`
- `getGlobalSymbols`
- `getMethodSignature`
- `getModuleDependencies`

## 🏗️ 模块能力详情

### ModuleAccessor

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### BaseModule

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### Core

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### GlobalLogController

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### LoggerTypes

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### LoggerTools

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### StepFormat

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### StepWrite

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### LoggerModule

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 9

### LoggerModuleIndex

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### UILoggerModule

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ObjectFactory

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ObjectManager

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### MockSystem

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBObjectWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### GeometryWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ObjectModule

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 8

### BasePCBWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBMockSystem

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBObjectFactory

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBObjectManager

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBObjectPool

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### GeometryCalculator

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ArcWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PadWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### TrackWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ViaWrapper

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### PCBInterfaces

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 8

### PositionManager

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ObjectCreator

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 8

### ObjectCreatorModule

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

### ObjectCreatorWindow

**类型**: module
**访问**: global
**可调用**: true
**方法数量**: 5

