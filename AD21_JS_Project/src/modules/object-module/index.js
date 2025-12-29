/**
 * ObjectModule - 对象模块主入口文件
 * 
 * 提供统一的PCB对象创建、管理和几何计算接口
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * IIFE模块架构说明
 * 
 * 1. 本模块使用IIFE模式封装对象：var ModuleName = (function(){...})();
 * 2. 构建后所有模块变量在同一作用域，可直接引用
 * 3. 不处理模块间依赖，需构建到一个文件中使用
 * 4. 通过window导出，确保AD环境可访问
 * 5. 依赖的模块必须在当前模块之前加载（通过merge-order.json控制）
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var ObjectModule = (function(){
    
    // 依赖引用（使用模块访问器）
    // 注意：在ES3环境中，这些依赖通过ModuleAccessor统一访问
    
    // 私有变量
    var _isInitialized = false;
    var _config = {
        enableLogging: true,
        enableAutoRegistration: true,
        enablePositionManagement: true,
        enableGeometryCalculation: true,
        defaultLayer: "TopLayer",
        conflictThreshold: 10
    };
    
    var _statistics = {
        objectsCreated: 0,
        objectsManaged: 0,
        mockObjectsCreated: 0,
        geometryCalculations: 0,
        errors: 0
    };
    
    // 私有函数
    
    /**
     * 简化的日志系统
     */
    var _logger = {
        debug: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[DEBUG] " + msg); 
            }
        },
        info: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[INFO] " + msg); 
            }
        },
        warn: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[WARN] " + msg); 
            }
        },
        error: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ERROR] " + msg); 
            }
        }
    };
    
    /**
     * 获取依赖模块
     * @param {string} moduleName 模块名称
     * @returns {Object} 模块引用
     */
    function _getDependency(moduleName) {
        try {
            // 优先使用ModuleAccessor
            if (typeof ModuleAccessor !== "undefined" && ModuleAccessor.getModule) {
                var module = ModuleAccessor.getModule(moduleName);
                if (module) {
                    return module;
                }
            }
            
            //// 备用：直接访问（构建后自动可用）
            
            throw new Error("Module not found: " + moduleName);
        } catch (e) {
            if (_logger && _logger.error) {
                _logger.error("Failed to get dependency " + moduleName + ": " + e.message);
            }
            return null;
        }
    }
    
    /**
     * 更新统计信息
     * @param {string} operation 操作类型
     * @param {Object} data 相关数据
     */
    function _updateStatistics(operation, data) {
        switch (operation) {
            case "create":
                _statistics.objectsCreated++;
                if (data && data.isMock) {
                    _statistics.mockObjectsCreated++;
                }
                break;
                
            case "manage":
                _statistics.objectsManaged++;
                break;
                
            case "geometry":
                _statistics.geometryCalculations++;
                break;
                
            case "error":
                _statistics.errors++;
                break;
        }
    }
    
    /**
     * 注册默认封装器
     */
    function _registerDefaultWrappers() {
        try {
            // 获取依赖模块
            var ObjectFactory = _getDependency("ObjectFactory");
            var PCBObjectWrapper = _getDependency("PCBObjectWrapper");
            
            if (!ObjectFactory || !PCBObjectWrapper) {
                throw new Error("Required dependencies not available");
            }
            
            // 注册PCBObjectWrapper作为默认封装器
            ObjectFactory.registerWrapperConstructor("Default", PCBObjectWrapper);
            
            // 注册特定类型的封装器
            ObjectFactory.registerWrapperConstructor("Arc", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Pad", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Track", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Via", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Board", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Text", PCBObjectWrapper);
            ObjectFactory.registerWrapperConstructor("Coordinate", PCBObjectWrapper);
            
            _logger.debug("ObjectModule._registerDefaultWrappers: Default wrappers registered");
            
        } catch (error) {
            _logger.error("ObjectModule._registerDefaultWrappers: " + error.message);
            throw error;
        }
    }
    
    /**
     * 配置子模块
     */
    function _configureSubModules() {
        try {
            // 获取依赖模块
            var ObjectManager = _getDependency("ObjectManager");
            var MockSystem = _getDependency("MockSystem");
            var PCBObjectWrapper = _getDependency("PCBObjectWrapper");
            var GeometryWrapper = _getDependency("GeometryWrapper");
            
            if (!ObjectManager || !MockSystem || !PCBObjectWrapper || !GeometryWrapper) {
                throw new Error("Required dependencies not available");
            }
            
            // 配置ObjectManager
            ObjectManager.configure({
                enablePositionIndex: _config.enablePositionManagement,
                enableTypeIndex: true,
                autoCleanup: true,
                maxObjects: 10000,
                conflictThreshold: _config.conflictThreshold
            });
            
            // 配置MockSystem
            MockSystem.configure({
                enableAutoId: true,
                enableTimestamp: true,
                defaultLayer: _config.defaultLayer,
                defaultUnit: "mil"
            });
            
            // 配置PCBObjectWrapper
            PCBObjectWrapper.configure({
                enablePropertyCache: true,
                enableMethodCache: false,
                enableAutoRefresh: false,
                cacheTimeout: 30000,
                enableLogging: _config.enableLogging
            });
            
            // 配置GeometryWrapper
            GeometryWrapper.configure({
                precision: 6,
                unit: "mil",
                enableCache: true,
                cacheTimeout: 10000
            });
            
            _logger.debug("ObjectModule._configureSubModules: Sub-modules configured");
            
        } catch (error) {
            _logger.error("ObjectModule._configureSubModules: " + error.message);
            throw error;
        }
    }
    
    /**
     * 验证创建选项
     * @param {Object} options 创建选项
     * @returns {Object} 验证结果
     */
    function _validateCreateOptions(options) {
        var result = {
            valid: true,
            errors: []
        };
        
        if (!options || typeof options !== "object") {
            result.valid = false;
            result.errors.push("Options must be an object");
            return result;
        }
        
        if (!options.objectType || typeof options.objectType !== "string") {
            result.valid = false;
            result.errors.push("objectType is required and must be a string");
        }
        
        // 获取ObjectFactory模块
        var ObjectFactory = _getDependency("ObjectFactory");
        if (!ObjectFactory || !ObjectFactory.isObjectTypeSupported(options.objectType)) {
            result.valid = false;
            result.errors.push("Unsupported object type: " + options.objectType);
        }
        
        return result;
    }
    
    // 公共接口 - 模块生命周期
    
    /**
     * 初始化对象模块
     * @param {Object} config 配置选项
     * @returns {boolean} 是否成功
     */
    function initialize(config) {
        _logger.debug("[ObjectModule][initialize] START - params: " + JSON.stringify(config));
        
        try {
            // 合并配置
            if (config) {
                for (var key in config) {
                    if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                        _config[key] = config[key];
                    }
                }
            }
            
            // 配置子模块
            _configureSubModules();
            
            // 注册默认封装器
            if (_config.enableAutoRegistration) {
                _registerDefaultWrappers();
            }
            
            _isInitialized = true;
            
            _logger.info("[ObjectModule][initialize] SUCCESS - Object Module initialized");
            return true;
            
        } catch (error) {
            _logger.error("[ObjectModule][initialize] ERROR - " + error.message);
            _updateStatistics("error");
            throw error;
        }
    }
    
    /**
     * 检查模块是否已初始化
     * @returns {boolean} 是否已初始化
     */
    function isInitialized() {
        return _isInitialized;
    }
    
    /**
     * 获取模块配置
     * @returns {Object} 当前配置
     */
    function getConfiguration() {
        var result = {};
        for (var key in _config) {
            if (_config.hasOwnProperty(key)) {
                result[key] = _config[key];
            }
        }
        return result;
    }
    
    /**
     * 配置模块
     * @param {Object} config 配置选项
     */
    function configure(config) {
        if (!config) {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                _config[key] = config[key];
            }
        }
        
        // 重新配置子模块
        if (_isInitialized) {
            _configureSubModules();
        }
    }
    
    // 公共接口 - 对象创建
    
    /**
     * 创建PCB对象
     * @param {Object} nativeObject 原生对象
     * @param {Object} options 选项
     * @returns {Object} 创建的对象封装器
     */
    function createObject(nativeObject, options) {
        _logger.debug("[ObjectModule][createObject] START - params: " + JSON.stringify({
            hasNativeObject: !!nativeObject,
            options: options
        }));
        
        try {
            if (!_isInitialized) {
                throw new Error("ObjectModule not initialized. Call initialize() first.");
            }
            
            options = options || {};
            
            // 验证选项
            var validation = _validateCreateOptions(options);
            if (!validation.valid) {
                throw new Error("Validation failed: " + validation.errors.join(", "));
            }
            
            // 获取依赖模块
            var ObjectFactory = _getDependency("ObjectFactory");
            var ObjectManager = _getDependency("ObjectManager");
            
            if (!ObjectFactory || !ObjectManager) {
                throw new Error("Required dependencies not available");
            }
            
            // 创建对象
            var wrapper = ObjectFactory.createObject(nativeObject, options);
            
            // 自动注册到管理器
            if (_config.enableAutoRegistration) {
                var objectData = wrapper.getObjectData();
                ObjectManager.registerObject(wrapper.getObjectId(), {
                    objectType: objectData.objectType,
                    wrapper: wrapper,
                    position: wrapper.getPosition(),
                    properties: objectData.properties
                });
            }
            
            _updateStatistics("create", {isMock: wrapper.isMock()});
            
            _logger.debug("[ObjectModule][createObject] SUCCESS - object created: " + options.objectType);
            return wrapper;
            
        } catch (error) {
            _logger.error("[ObjectModule][createObject] ERROR - " + error.message);
            _updateStatistics("error");
            throw error;
        }
    }
    
    /**
     * 创建Mock对象
     * @param {string} objectType 对象类型
     * @param {Object} mockData Mock数据
     * @returns {Object} 创建的Mock对象封装器
     */
    function createMock(objectType, mockData) {
        _logger.debug("[ObjectModule][createMock] START - params: " + JSON.stringify({
            objectType: objectType,
            mockData: mockData
        }));
        
        try {
            if (!_isInitialized) {
                throw new Error("ObjectModule not initialized. Call initialize() first.");
            }
            
            // 获取MockSystem模块
            var MockSystem = _getDependency("MockSystem");
            if (!MockSystem) {
                throw new Error("MockSystem dependency not available");
            }
            
            // 创建Mock原生对象
            var mockNativeObject = MockSystem.createMockObject(objectType, mockData);
            
            // 创建封装器
            var wrapper = createObject(mockNativeObject, {
                objectType: objectType,
                isMock: true,
                mockData: mockData
            });
            
            _updateStatistics("create", {isMock: true});
            
            _logger.debug("[ObjectModule][createMock] SUCCESS - mock created: " + objectType);
            return wrapper;
            
        } catch (error) {
            _logger.error("[ObjectModule][createMock] ERROR - " + error.message);
            _updateStatistics("error");
            throw error;
        }
    }
    
    /**
     * 从迭代器批量创建对象
     * @param {Object} iterator 迭代器对象
     * @param {string} objectType 对象类型
     * @param {Object} options 选项
     * @returns {Array} 创建的对象数组
     */
    function createFromIterator(iterator, objectType, options) {
        _logger.debug("[ObjectModule][createFromIterator] START - params: " + JSON.stringify({
            objectType: objectType,
            options: options
        }));
        
        try {
            if (!_isInitialized) {
                throw new Error("ObjectModule not initialized. Call initialize() first.");
            }
            
            // 获取依赖模块
            var ObjectFactory = _getDependency("ObjectFactory");
            var ObjectManager = _getDependency("ObjectManager");
            
            if (!ObjectFactory || !ObjectManager) {
                throw new Error("Required dependencies not available");
            }
            
            options = options || {};
            
            // 批量创建对象
            var wrappers = ObjectFactory.createFromIterator(iterator, objectType, options);
            
            // 批量注册到管理器
            if (_config.enableAutoRegistration) {
                for (var i = 0; i < wrappers.length; i++) {
                    var wrapper = wrappers[i];
                    var objectData = wrapper.getObjectData();
                    ObjectManager.registerObject(wrapper.getObjectId(), {
                        objectType: objectData.objectType,
                        wrapper: wrapper,
                        position: wrapper.getPosition(),
                        properties: objectData.properties
                    });
                }
            }
            
            _updateStatistics("create", {isMock: false, count: wrappers.length});
            
            _logger.debug("[ObjectModule][createFromIterator] SUCCESS - created " + wrappers.length + " objects");
            return wrappers;
            
        } catch (error) {
            _logger.error("[ObjectModule][createFromIterator] ERROR - " + error.message);
            _updateStatistics("error");
            throw error;
        }
    }
    
    /**
     * 批量创建对象
     * @param {Array} objectList 对象列表
     * @returns {Object} 批量创建结果
     */
    function createBatch(objectList) {
        _logger.debug("[ObjectModule][createBatch] START - params: " + JSON.stringify({
            objectCount: objectList ? objectList.length : 0
        }));
        
        try {
            if (!_isInitialized) {
                throw new Error("ObjectModule not initialized. Call initialize() first.");
            }
            
            // 获取依赖模块
            var ObjectFactory = _getDependency("ObjectFactory");
            var ObjectManager = _getDependency("ObjectManager");
            
            if (!ObjectFactory || !ObjectManager) {
                throw new Error("Required dependencies not available");
            }
            
            // 批量创建
            var result = ObjectFactory.createBatch(objectList);
            
            // 批量注册成功的对象
            if (_config.enableAutoRegistration) {
                for (var i = 0; i < result.success.length; i++) {
                    var wrapper = result.success[i];
                    var objectData = wrapper.getObjectData();
                    ObjectManager.registerObject(wrapper.getObjectId(), {
                        objectType: objectData.objectType,
                        wrapper: wrapper,
                        position: wrapper.getPosition(),
                        properties: objectData.properties
                    });
                }
            }
            
            _updateStatistics("create", {isMock: false, count: result.successCount});
            
            _logger.debug("[ObjectModule][createBatch] SUCCESS - " + result.successCount + " created, " + result.failedCount + " failed");
            return result;
            
        } catch (error) {
            _logger.error("[ObjectModule][createBatch] ERROR - " + error.message);
            _updateStatistics("error");
            throw error;
        }
    }
    
    // 公共接口 - 对象管理
    
    /**
     * 获取对象
     * @param {string} objectId 对象ID
     * @returns {Object} 对象封装器
     */
    function getObject(objectId) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        var objectData = ObjectManager.getObject(objectId);
        return objectData ? objectData.wrapper : null;
    }
    
    /**
     * 移除对象
     * @param {string} objectId 对象ID
     * @returns {boolean} 是否成功
     */
    function removeObject(objectId) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        return ObjectManager.removeObject(objectId);
    }
    
    /**
     * 按类型获取对象
     * @param {string} objectType 对象类型
     * @returns {Array} 对象封装器数组
     */
    function getObjectsByType(objectType) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        var objectDataList = ObjectManager.getObjectsByType(objectType);
        var wrappers = [];
        
        for (var i = 0; i < objectDataList.length; i++) {
            wrappers.push(objectDataList[i].wrapper);
        }
        
        return wrappers;
    }
    
    /**
     * 按位置获取对象
     * @param {Object} position 位置对象
     * @param {number} radius 搜索半径
     * @returns {Array} 对象封装器数组
     */
    function getObjectsByPosition(position, radius) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        var objectDataList = ObjectManager.getObjectsByPosition(position, radius);
        var wrappers = [];
        
        for (var i = 0; i < objectDataList.length; i++) {
            wrappers.push(objectDataList[i].wrapper);
        }
        
        return wrappers;
    }
    
    /**
     * 获取所有对象
     * @returns {Array} 所有对象封装器
     */
    function getAllObjects() {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        var objectDataList = ObjectManager.getAllObjects();
        var wrappers = [];
        
        for (var i = 0; i < objectDataList.length; i++) {
            wrappers.push(objectDataList[i].wrapper);
        }
        
        return wrappers;
    }
    
    /**
     * 获取对象数量
     * @returns {number} 对象数量
     */
    function getObjectCount() {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        var ObjectManager = _getDependency("ObjectManager");
        return ObjectManager.getObjectCount();
    }
    
    // 公共接口 - 几何计算
    
    /**
     * 创建几何计算器
     * @param {Object} wrapper 对象封装器
     * @returns {Object} 几何计算器实例
     */
    function createGeometryCalculator(wrapper) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        if (!_config.enableGeometryCalculation) {
            throw new Error("Geometry calculation is disabled");
        }
        
        var GeometryWrapper = _getDependency("GeometryWrapper");
        _updateStatistics("geometry");
        return new GeometryWrapper(wrapper);
    }
    
    /**
     * 计算两点间距离
     * @param {Object} point1 点1 {x, y}
     * @param {Object} point2 点2 {x, y}
     * @returns {number} 距离
     */
    function calculateDistance(point1, point2) {
        if (!_isInitialized) {
            throw new Error("ObjectModule not initialized. Call initialize() first.");
        }
        
        if (!_config.enableGeometryCalculation) {
            throw new Error("Geometry calculation is disabled");
        }
        
        var GeometryWrapper = _getDependency("GeometryWrapper");
        _updateStatistics("geometry");
        return GeometryWrapper.calculateDistance(point1, point2);
    }
    
    // 公共接口 - 查询和统计
    
    /**
     * 获取支持的对象类型
     * @returns {Array} 支持的类型数组
     */
    function getSupportedTypes() {
        var ObjectFactory = _getDependency("ObjectFactory");
        return ObjectFactory.getSupportedObjectTypes();
    }
    
    /**
     * 检查对象类型是否支持
     * @param {string} objectType 对象类型
     * @returns {boolean} 是否支持
     */
    function isTypeSupported(objectType) {
        var ObjectFactory = _getDependency("ObjectFactory");
        return ObjectFactory.isObjectTypeSupported(objectType);
    }
    
    /**
     * 获取模块统计信息
     * @returns {Object} 统计信息
     */
    function getStatistics() {
        var ObjectFactory = _getDependency("ObjectFactory");
        var ObjectManager = _getDependency("ObjectManager");
        var MockSystem = _getDependency("MockSystem");
        var GeometryWrapper = _getDependency("GeometryWrapper");
        
        return {
            module: {
                initialized: _isInitialized,
                configuration: getConfiguration(),
                statistics: _statistics
            },
            factory: ObjectFactory.getFactoryStatistics(),
            manager: ObjectManager.getStatistics(),
            mockSystem: MockSystem.getMockStatistics(),
            geometry: GeometryWrapper.getStatistics()
        };
    }
    
    /**
     * 清理模块资源
     */
    function cleanup() {
        _logger.debug("[ObjectModule][cleanup] START");
        
        try {
            // 获取依赖模块
            var ObjectManager = _getDependency("ObjectManager");
            var ObjectFactory = _getDependency("ObjectFactory");
            var MockSystem = _getDependency("MockSystem");
            var GeometryWrapper = _getDependency("GeometryWrapper");
            
            // 清理子模块
            ObjectManager.cleanup();
            ObjectFactory.cleanup();
            MockSystem.cleanup();
            GeometryWrapper.clearCache();
            
            // 重置状态
            _isInitialized = false;
            _statistics = {
                objectsCreated: 0,
                objectsManaged: 0,
                mockObjectsCreated: 0,
                geometryCalculations: 0,
                errors: 0
            };
            
            _logger.info("[ObjectModule][cleanup] SUCCESS - Object Module cleaned up");
            
        } catch (error) {
            _logger.error("[ObjectModule][cleanup] ERROR - " + error.message);
            throw error;
        }
    }
    
    // 导出接口
    
    return {
        // 生命周期方法
        initialize: initialize,
        isInitialized: isInitialized,
        configure: configure,
        getConfiguration: getConfiguration,
        
        // 对象创建方法
        createObject: createObject,
        createMock: createMock,
        createFromIterator: createFromIterator,
        createBatch: createBatch,
        
        // 对象管理方法
        getObject: getObject,
        removeObject: removeObject,
        getObjectsByType: getObjectsByType,
        getObjectsByPosition: getObjectsByPosition,
        getAllObjects: getAllObjects,
        getObjectCount: getObjectCount,
        
        // 几何计算方法
        createGeometryCalculator: createGeometryCalculator,
        calculateDistance: calculateDistance,
        
        // 查询方法
        getSupportedTypes: getSupportedTypes,
        isTypeSupported: isTypeSupported,
        
        // 统计和维护
        getStatistics: getStatistics,
        cleanup: cleanup,
        
        // 直接访问核心组件（高级用法）
        ObjectFactory: function() { return _getDependency("ObjectFactory"); },
        ObjectManager: function() { return _getDependency("ObjectManager"); },
        MockSystem: function() { return _getDependency("MockSystem"); },
        PCBObjectWrapper: function() { return _getDependency("PCBObjectWrapper"); },
        GeometryWrapper: function() { return _getDependency("GeometryWrapper"); }
    };
    
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.ObjectModule = ObjectModule;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ObjectModule;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.ObjectModule = ObjectModule;
    }
})();
