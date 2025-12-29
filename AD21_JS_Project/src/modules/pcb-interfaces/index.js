/**
 * PCB Interfaces Module - 主入口文件
 * 
 * 提供PCB对象接口封装的统一入口
 * 包含所有核心组件和封装器的导出
 * 
 * IIFE模块架构说明
 * 
 * 1. 本模块使用IIFE模式封装对象：var ModuleName = (function(){...})();
 * 2. 构建后所有模块变量在同一作用域，可直接引用
 * 3. 不处理模块间依赖，需构建到一个文件中使用
 * 4. 通过window导出，确保AD环境可访问
 * 5. 依赖的模块必须在当前模块之前加载（通过merge-order.json控制）
 * 
 * @author AD21 PCB Interface Module
 * @version 1.0.0
 */

// 简化的日志系统（用于测试）
var SimpleLogger = {
    debug: function(msg) { 
        if (typeof console !== "undefined" && console.log) {
            console.log("[DEBUG] " + msg); 
        }
    },
    info: function(msg) { 
        if (typeof console !== "undefined" && console.log) {
            console.log("[INFO] " + msg); 
        }
    },
    warn: function(msg) { 
        if (typeof console !== "undefined" && console.log) {
            console.log("[WARN] " + msg); 
        }
    },
    error: function(msg) { 
        if (typeof console !== "undefined" && console.log) {
            console.log("[ERROR] " + msg); 
        }
    }
};

// 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
var logger = SimpleLogger;

// 核心组件 - 直接引用（构建后自动可访问）
// BasePCBWrapper, PCBMockSystem, PCBObjectFactory, PCBObjectManager, PCBObjectPool

// 计算器 - 直接引用（构建后自动可访问）
// GeometryCalculator

// 封装器 - 直接引用（构建后自动可访问）
// ArcWrapper, PadWrapper, TrackWrapper, ViaWrapper

/**
 * PCBInterfaces主模块
 */
var PCBInterfaces = (function(){
    
    var moduleInstance = null;
    var isInitialized = false;
    
    /**
     * 初始化PCB接口模块
     * @param {Object} options 配置选项
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.logger 日志器实例
     * @param {number} options.maxPoolSize 对象池最大大小
     */
    function initialize(options) {
        logger.debug("[PCBInterfaces][initialize] START - params: " + JSON.stringify(options));
        
        try {
            options = options || {};
            
            // 初始化Mock系统
            if (PCBMockSystem && PCBMockSystem.initialize) {
                PCBMockSystem.initialize();
            }
            
            // 初始化对象工厂
            if (PCBObjectFactory && PCBObjectFactory.initialize) {
                PCBObjectFactory.initialize();
            }
            
            // 初始化对象池
            if (PCBObjectPool && PCBObjectPool.initialize) {
                PCBObjectPool.initialize();
            }
            
            // 注册所有封装器到工厂
            registerWrappers();
            
            isInitialized = true;
            
            logger.info("[PCBInterfaces][initialize] SUCCESS - PCB Interface Module initialized");
            return true;
            
        } catch (error) {
            logger.error("[PCBInterfaces][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 注册所有封装器到对象工厂
     */
    function registerWrappers() {
        logger.debug("[PCBInterfaces][registerWrappers] START");
        
        try {
            // 注册设计对象封装器
            if (PCBObjectFactory && PCBObjectFactory.registerWrapperConstructor) {
                PCBObjectFactory.registerWrapperConstructor("Arc", ArcWrapper);
                PCBObjectFactory.registerWrapperConstructor("Pad", PadWrapper);
                PCBObjectFactory.registerWrapperConstructor("Track", TrackWrapper);
                PCBObjectFactory.registerWrapperConstructor("Via", ViaWrapper);
            }
            
            logger.debug("[PCBInterfaces][registerWrappers] SUCCESS - All wrappers registered");
            
        } catch (error) {
            logger.error("[PCBInterfaces][registerWrappers] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 创建封装对象
     * @param {string} objectType 对象类型
     * @param {Object} options 配置选项
     * @returns {Object} 封装对象实例
     */
    function createWrapper(objectType, options) {
        logger.debug("[PCBInterfaces][createWrapper] START - params: " + JSON.stringify({
            objectType: objectType,
            options: options
        }));
        
        try {
            if (!isInitialized) {
                throw new Error("PCBInterfaces module not initialized. Call initialize() first.");
            }
            
            // 验证对象类型
            if (!PCBObjectFactory.isObjectTypeSupported(objectType)) {
                throw new Error("Invalid object type: " + objectType);
            }
            
            // 准备选项
            options = options || {};
            options.isMock = options.enableMock || false;
            options.mockType = options.isMock ? objectType : null;
            
            var wrapper = PCBObjectFactory.createWrapper(options.nativeObject, options);
            
            logger.debug("[PCBInterfaces][createWrapper] SUCCESS - wrapper created for " + objectType);
            return wrapper;
            
        } catch (error) {
            logger.error("[PCBInterfaces][createWrapper] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 从迭代器批量创建封装对象
     * @param {Object} iterator AD迭代器对象
     * @param {string} objectType 对象类型
     * @param {Object} options 配置选项
     * @returns {Array} 封装对象数组
     */
    function createFromIterator(iterator, objectType, options) {
        logger.debug("[PCBInterfaces][createFromIterator] START - params: " + JSON.stringify({
            objectType: objectType,
            options: options
        }));
        
        try {
            if (!isInitialized) {
                throw new Error("PCBInterfaces module not initialized. Call initialize() first.");
            }
            
            var wrappers = PCBObjectFactory.createFromIterator(iterator, objectType, options);
            
            logger.debug("[PCBInterfaces][createFromIterator] SUCCESS - created " + wrappers.length + " wrappers");
            return wrappers;
            
        } catch (error) {
            logger.error("[PCBInterfaces][createFromIterator] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 创建Mock对象
     * @param {string} objectType 对象类型
     * @param {Object} mockData Mock数据
     * @returns {Object} 封装的Mock对象实例
     */
    function createMock(objectType, mockData) {
        logger.debug("[PCBInterfaces][createMock] START - params: " + JSON.stringify({
            objectType: objectType,
            mockData: mockData
        }));
        
        try {
            if (!isInitialized) {
                throw new Error("PCBInterfaces module not initialized. Call initialize() first.");
            }
            
            // 创建原生Mock对象
            var nativeMockObject = PCBMockSystem.createMockObject(objectType, mockData);
            
            // 创建封装对象
            var wrapper = PCBObjectFactory.createWrapper(nativeMockObject, {
                isMock: true,
                mockType: objectType,
                mockData: mockData
            });
            
            logger.debug("[PCBInterfaces][createMock] SUCCESS - wrapped mock created for " + objectType);
            return wrapper;
            
        } catch (error) {
            logger.error("[PCBInterfaces][createMock] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 获取对象池
     * @param {string} poolType 池类型（native, wrapped, modified）
     * @returns {Object} 对象池实例
     */
    function getObjectPool(poolType) {
        logger.debug("[PCBInterfaces][getObjectPool] START - params: " + JSON.stringify({
            poolType: poolType
        }));
        
        try {
            if (!isInitialized) {
                throw new Error("PCBInterfaces module not initialized. Call initialize() first.");
            }
            
            var pool = PCBObjectPool.getAllPoolObjects(poolType);
            
            logger.debug("[PCBInterfaces][getObjectPool] SUCCESS - pool retrieved: " + poolType);
            return pool;
            
        } catch (error) {
            logger.error("[PCBInterfaces][getObjectPool] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 获取模块统计信息
     * @returns {Object} 统计信息
     */
    function getStatistics() {
        logger.debug("[PCBInterfaces][getStatistics] START");
        
        try {
            if (!isInitialized) {
                throw new Error("PCBInterfaces module not initialized. Call initialize() first.");
            }
            
            var stats = {
                initialized: isInitialized,
                factory: PCBObjectFactory.getFactoryStatistics(),
                pools: PCBObjectPool.getPoolStatistics(),
                mockSystem: PCBMockSystem.getMockStatistics()
            };
            
            logger.debug("[PCBInterfaces][getStatistics] SUCCESS - stats: " + JSON.stringify(stats));
            return stats;
            
        } catch (error) {
            logger.error("[PCBInterfaces][getStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 清理模块资源
     */
    function cleanup() {
        logger.debug("[PCBInterfaces][cleanup] START");
        
        try {
            // 清理对象池
            if (PCBObjectPool && PCBObjectPool.clearAllPools) {
                PCBObjectPool.clearAllPools();
            }
            
            // 重置Mock系统
            if (PCBMockSystem && PCBMockSystem.clearAllMockObjects) {
                PCBMockSystem.clearAllMockObjects();
            }
            
            // 重置工厂
            if (PCBObjectFactory && PCBObjectFactory.resetFactoryStatistics) {
                PCBObjectFactory.resetFactoryStatistics();
            }
            
            isInitialized = false;
            moduleInstance = null;
            
            logger.info("[PCBInterfaces][cleanup] SUCCESS - PCB Interface Module cleaned up");
            
        } catch (error) {
            logger.error("[PCBInterfaces][cleanup] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 检查模块是否已初始化
     * @returns {boolean} 是否已初始化
     */
    function isReady() {
        return isInitialized;
    }
    
    /**
     * 获取支持的封装器类型
     * @returns {Array} 支持的类型数组
     */
    function getSupportedTypes() {
        logger.debug("[PCBInterfaces][getSupportedTypes] START");
        
        try {
            var types = PCBObjectFactory.getSupportedObjectTypes();
            
            logger.debug("[PCBInterfaces][getSupportedTypes] SUCCESS - types: " + JSON.stringify(types));
            return types;
            
        } catch (error) {
            logger.error("[PCBInterfaces][getSupportedTypes] ERROR - " + error.message);
            throw error;
        }
    }
    
    // 公共接口
    return {
        initialize: initialize,
        createWrapper: createWrapper,
        createFromIterator: createFromIterator,
        createMock: createMock,
        getObjectPool: getObjectPool,
        getStatistics: getStatistics,
        cleanup: cleanup,
        isReady: isReady,
        getSupportedTypes: getSupportedTypes,
        
        // 直接访问核心组件（高级用法）
        BasePCBWrapper: BasePCBWrapper,
        PCBMockSystem: PCBMockSystem,
        PCBObjectFactory: PCBObjectFactory,
        PCBObjectPool: PCBObjectPool,
        StackMap: (typeof StackMap !== "undefined" ? StackMap : null),
        GeometryCalculator: GeometryCalculator,
        
        // 直接访问封装器（高级用法）
        ArcWrapper: ArcWrapper,
        PadWrapper: PadWrapper,
        TrackWrapper: TrackWrapper,
        ViaWrapper: ViaWrapper
    };
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.PCBInterfaces = PCBInterfaces;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PCBInterfaces;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PCBInterfaces = PCBInterfaces;
    }
})();
