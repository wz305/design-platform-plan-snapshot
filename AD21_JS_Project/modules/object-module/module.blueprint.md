# ObjectModule 模块蓝图

## 📋 模块概述

**模块名称**: ObjectModule  
**模块类型**: 核心对象管理模块  
**创建日期**: 2025-12-13  
**版本**: 1.0.0  
**作者**: Cline AI Assistant  

### 🎯 核心功能
- 统一的PCB对象创建和管理
- Mock系统支持离线开发
- 几何计算和位置管理
- 对象生命周期管理
- 批量操作和性能优化

### 🏗️ 架构设计
```
ObjectModule (主入口)
├── Core (核心模块)
│   ├── ObjectFactory.js (对象工厂)
│   ├── ObjectManager.js (对象管理器)
│   └── MockSystem.js (Mock系统)
├── Wrappers (封装器)
│   ├── PCBObjectWrapper.js (PCB对象封装)
│   └── GeometryWrapper.js (几何计算封装)
└── index.js (主入口文件)
```

## 🔧 技术规范

### ✅ ES3兼容性
- **变量声明**: 仅使用 `var`
- **函数定义**: 仅使用 `function` 声明
- **循环**: 仅使用传统 `for` 循环
- **字符串**: 仅使用双引号
- **对象**: 仅使用字面量 `{}` `[]`

### 🚫 AD环境约束
- 禁止使用 `this` 作为全局变量
- 禁止使用 `window` 对象
- 禁止使用 ES5+ 语法和方法
- 禁止使用 `require/import`
- 禁止使用 `new Function()`
- 禁止使用 `Promise/async`

### 📝 日志规范
- **格式**: `[ModuleName][fileName][functionName] message`
- **级别**: debug、info、warn、error
- **上下文**: 包含参数和结果信息
- **错误处理**: 完整的try-catch和错误记录

## 🎯 核心组件

### 1. ObjectFactory (对象工厂)
**职责**: 统一的对象创建接口
**核心方法**:
- `createObject(type, options)` - 创建PCB对象
- `createMock(type, options)` - 创建Mock对象
- `createFromIterator(iterator, options)` - 从迭代器创建
- `createBatch(creations)` - 批量创建

**特性**:
- 支持多种PCB对象类型
- Mock模式支持
- 批量创建优化
- 完整的统计和验证

### 2. ObjectManager (对象管理器)
**职责**: 对象生命周期和位置管理
**核心方法**:
- `registerObject(object)` - 注册对象
- `getObject(objectId)` - 获取对象
- `getObjectsByType(type)` - 按类型获取
- `checkPositionConflict(position, excludeId)` - 冲突检测

**特性**:
- 位置索引系统
- 类型索引系统
- 自动清理机制
- 冲突检测算法

### 3. MockSystem (Mock系统)
**职责**: 离线开发和测试支持
**核心方法**:
- `createMockObject(type, options)` - 创建Mock对象
- `createMockFromTemplate(templateName, options)` - 从模板创建
- `registerMockTemplate(name, template)` - 注册模板

**特性**:
- 默认Mock模板
- 自定义模板支持
- 批量Mock创建
- 验证机制

### 4. PCBObjectWrapper (PCB对象封装)
**职责**: PCB对象的统一封装
**核心方法**:
- `getProperty(propertyName)` - 获取属性
- `setProperty(propertyName, value)` - 设置属性
- `getPosition()` - 获取位置
- `getBoundingBox()` - 获取边界框

**特性**:
- 属性缓存机制
- 位置管理
- 边界框计算
- 缓存刷新

### 5. GeometryWrapper (几何计算封装)
**职责**: 几何计算和空间分析
**核心方法**:
- `getCenter()` - 获取中心点
- `getLength()` - 获取长度
- `getArea()` - 获取面积
- `intersects(other)` - 相交检测

**特性**:
- 缓存计算结果
- 精度控制
- 静态计算方法
- 空间分析

## 📊 API接口

### 主入口接口
```javascript
var ObjectModule = (function(){
    return {
        // 初始化和配置
        initialize: function(config) {},
        configure: function(options) {},
        
        // 对象创建
        createObject: function(type, options) {},
        createMock: function(type, options) {},
        createBatch: function(creations) {},
        
        // 对象管理
        getObject: function(objectId) {},
        getAllObjects: function() {},
        getObjectsByType: function(type) {},
        
        // Mock系统
        enableMockMode: function() {},
        disableMockMode: function() {},
        registerMockTemplate: function(name, template) {},
        
        // 几何计算
        calculateDistance: function(pos1, pos2) {},
        calculateAngle: function(pos1, pos2, pos3) {},
        
        // 统计和工具
        getStatistics: function() {},
        clearCache: function() {},
        
        // 生命周期
        reset: function() {},
        destroy: function() {}
    };
})();
```

## 🔄 工作流程

### 1. 初始化流程
```javascript
// 1. 初始化模块
ObjectModule.initialize({
    mockMode: false,
    enableCache: true,
    logLevel: "debug"
});

// 2. 配置选项
ObjectModule.configure({
    autoCleanup: true,
    conflictDetection: true
});
```

### 2. 对象创建流程
```javascript
// 1. 创建单个对象
var track = ObjectModule.createObject("Track", {
    startX: 0, startY: 0,
    endX: 100, endY: 0,
    width: 0.1
});

// 2. 批量创建
var objects = ObjectModule.createBatch([
    {type: "Track", options: {...}},
    {type: "Pad", options: {...}},
    {type: "Via", options: {...}}
]);
```

### 3. Mock模式流程
```javascript
// 1. 启用Mock模式
ObjectModule.enableMockMode();

// 2. 创建Mock对象
var mockTrack = ObjectModule.createMock("Track", {
    startX: 0, startY: 0,
    endX: 50, endY: 50
});

// 3. 使用自定义模板
ObjectModule.registerMockTemplate("CustomTrack", {
    type: "Track",
    defaultProperties: {
        width: 0.2,
        layer: "TopLayer"
    }
});
```

## 📈 性能特性

### 缓存机制
- **属性缓存**: 避免重复的属性访问
- **几何缓存**: 缓存计算结果
- **位置索引**: 快速空间查询
- **类型索引**: 快速类型过滤

### 批量操作
- **批量创建**: 减少初始化开销
- **批量验证**: 统一验证处理
- **批量清理**: 高效资源回收

### 内存管理
- **自动清理**: 定期清理无效对象
- **引用计数**: 避免内存泄漏
- **池化技术**: 对象重用机制

## 🧪 测试策略

### 单元测试
- **ObjectFactory**: 创建逻辑测试
- **ObjectManager**: 管理功能测试
- **MockSystem**: Mock功能测试
- **PCBObjectWrapper**: 封装功能测试
- **GeometryWrapper**: 计算功能测试

### 集成测试
- **模块协作**: 组件间协作测试
- **数据流**: 端到端数据流测试
- **性能**: 批量操作性能测试

### 兼容性测试
- **ES3兼容**: 语法兼容性验证
- **AD环境**: AD环境运行测试
- **浏览器**: 浏览器环境测试

## 📋 配置选项

### 默认配置
```javascript
var defaultConfig = {
    // Mock模式
    mockMode: false,
    
    // 缓存设置
    enableCache: true,
    cacheSize: 1000,
    
    // 日志设置
    logLevel: "info",
    enableDebugLog: false,
    
    // 性能设置
    autoCleanup: true,
    cleanupInterval: 60000,
    
    // 验证设置
    enableValidation: true,
    strictMode: false,
    
    // 几何计算
    geometryPrecision: 6,
    enableGeometryCache: true
};
```

## 🔗 依赖关系

### 内部依赖
- **LoggerModule**: 日志记录
- **StatsModule**: 统计功能（可选）

### 外部依赖
- **AD PCB API**: PCB对象访问
- **JSON2**: JSON序列化支持

## 🚀 使用示例

### 基础使用
```javascript
// 初始化
ObjectModule.initialize();

// 创建对象
var track = ObjectModule.createObject("Track", {
    startX: 0, startY: 0,
    endX: 100, endY: 0,
    width: 0.1
});

// 获取对象
var retrieved = ObjectModule.getObject(track.getId());

// 几何计算
var length = track.getLength();
var center = track.getCenter();
```

### 高级使用
```javascript
// 批量创建
var objects = ObjectModule.createBatch([
    {type: "Track", options: {startX: 0, startY: 0, endX: 50, endY: 0}},
    {type: "Pad", options: {x: 25, y: 0, size: 1}},
    {type: "Via", options: {x: 50, y: 0, size: 0.8}}
]);

// 位置查询
var nearbyObjects = ObjectModule.getObjectsInArea({
    x: 20, y: -10,
    width: 20, height: 20
});

// 冲突检测
var conflicts = ObjectModule.checkPositionConflict({x: 25, y: 0});
```

## 📊 统计信息

### 可获取的统计
```javascript
var stats = ObjectModule.getStatistics();
// 返回:
// {
//     totalObjects: 150,
//     objectsByType: {Track: 80, Pad: 50, Via: 20},
//     mockObjects: 30,
//     cacheHits: 1250,
//     cacheMisses: 150,
//     conflicts: 5,
//     lastCleanup: "2025-12-13T19:57:00.000Z"
// }
```

## 🔧 维护指南

### 扩展新对象类型
1. 在ObjectFactory中添加创建逻辑
2. 在MockSystem中添加Mock模板
3. 创建对应的封装器（如需要）
4. 添加相应的测试用例

### 性能优化
1. 调整缓存大小和策略
2. 优化批量操作逻辑
3. 调整清理间隔
4. 监控内存使用

### 调试技巧
1. 启用详细日志记录
2. 使用统计信息监控
3. 检查缓存命中率
4. 验证对象生命周期

## 📝 更新日志

### v1.0.0 (2025-12-13)
- ✅ 初始版本发布
- ✅ 完整的对象创建和管理功能
- ✅ Mock系统支持
- ✅ 几何计算封装
- ✅ ES3兼容性保证
- ✅ AD环境适配

## 🎯 路线图

### v1.1.0 (计划中)
- 🔄 性能优化
- 🔄 更多几何计算方法
- 🔄 高级查询接口
- 🔄 事件系统

### v1.2.0 (计划中)
- 🔄 序列化支持
- 🔄 导入导出功能
- 🔄 版本兼容性
- 🔄 插件系统

---

## ⚠️ 重要提醒

### AD环境约束
- 严格遵循ES3语法规范
- 禁止使用现代JavaScript特性
- 确保在AD环境中稳定运行
- 注意内存使用和性能

### 最佳实践
- 始终检查返回值的有效性
- 合理使用缓存机制
- 及时清理不需要的对象
- 监控模块统计信息

### 故障排除
- 检查日志输出定位问题
- 验证对象创建参数
- 确认模块初始化状态
- 检查内存使用情况

---

**模块创建完成** ✅  
**状态**: 已实现  
**测试**: 待验证  
**文档**: 已完成  
**部署**: 待构建测试
