/**
 * ModuleAccessor - 统一的模块访问器
 * 
 * 提供跨环境的统一模块访问接口
 * 按照优先级顺序获取模块：直接变量 > window > module.exports > global
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Module Accessor
 * @version 1.0.0
 */

var ModuleAccessor = (function(){
    
    // 私有变量
    var _cache = {};  // 模块缓存
    var _config = {
        enableCache: true,
        enableLogging: true
    };
    
    // 简化的日志系统
    var _logger = {
        debug: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ModuleAccessor][DEBUG] " + msg); 
            }
        },
        info: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ModuleAccessor][INFO] " + msg); 
            }
        },
        warn: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ModuleAccessor][WARN] " + msg); 
            }
        },
        error: function(msg) { 
            if (_config.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ModuleAccessor][ERROR] " + msg); 
            }
        }
    };
    
    /**
     * 获取直接变量引用
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function _getDirectVariable(moduleName) {
        try {
            switch (moduleName) {
                case "BaseModule": return (typeof BaseModule !== "undefined") ? BaseModule : null;
                case "CoreModule": return (typeof CoreModule !== "undefined") ? CoreModule : null;
                case "LogController": return (typeof LogController !== "undefined") ? LogController : null;
                case "LoggerModule": return (typeof LoggerModule !== "undefined") ? LoggerModule : null;
                case "LoggerModuleIndex": return (typeof LoggerModuleIndex !== "undefined") ? LoggerModuleIndex : null;
                case "UILoggerModule": return (typeof UILoggerModule !== "undefined") ? UILoggerModule : null;
                case "ObjectFactory": return (typeof ObjectFactory !== "undefined") ? ObjectFactory : null;
                case "ObjectManager": return (typeof ObjectManager !== "undefined") ? ObjectManager : null;
                case "MockSystem": return (typeof MockSystem !== "undefined") ? MockSystem : null;
                case "PCBObjectWrapper": return (typeof PCBObjectWrapper !== "undefined") ? PCBObjectWrapper : null;
                case "GeometryWrapper": return (typeof GeometryWrapper !== "undefined") ? GeometryWrapper : null;
                case "ObjectModule": return (typeof ObjectModule !== "undefined") ? ObjectModule : null;
                case "BasePCBWrapper": return (typeof BasePCBWrapper !== "undefined") ? BasePCBWrapper : null;
                case "PCBMockSystem": return (typeof PCBMockSystem !== "undefined") ? PCBMockSystem : null;
                case "PCBObjectFactory": return (typeof PCBObjectFactory !== "undefined") ? PCBObjectFactory : null;
                case "PCBObjectManager": return (typeof PCBObjectManager !== "undefined") ? PCBObjectManager : null;
                case "PCBObjectPool": return (typeof PCBObjectPool !== "undefined") ? PCBObjectPool : null;
                case "StackMap": return (typeof StackMap !== "undefined") ? StackMap : null;
                case "GeometryCalculator": return (typeof GeometryCalculator !== "undefined") ? GeometryCalculator : null;
                case "ArcWrapper": return (typeof ArcWrapper !== "undefined") ? ArcWrapper : null;
                case "PadWrapper": return (typeof PadWrapper !== "undefined") ? PadWrapper : null;
                case "TrackWrapper": return (typeof TrackWrapper !== "undefined") ? TrackWrapper : null;
                case "ViaWrapper": return (typeof ViaWrapper !== "undefined") ? ViaWrapper : null;
                case "PCBInterfaces": return (typeof PCBInterfaces !== "undefined") ? PCBInterfaces : null;
                case "PositionManager": return (typeof PositionManager !== "undefined") ? PositionManager : null;
                case "ObjectCreator": return (typeof ObjectCreator !== "undefined") ? ObjectCreator : null;
                case "ObjectCreatorModule": return (typeof ObjectCreatorModule !== "undefined") ? ObjectCreatorModule : null;
                case "GlobalEvents": return (typeof GlobalEvents !== "undefined") ? GlobalEvents : null;
                default: return null;
            }
        } catch (e) {
            _logger.error("_getDirectVariable failed for " + moduleName + ": " + e.message);
            return null;
        }
    }
    
    /**
     * 获取window对象中的模块
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function _getWindowModule(moduleName) {
        try {
            if (typeof window !== "undefined" && window && typeof window[moduleName] !== "undefined") {
                return window[moduleName];
            }
            return null;
        } catch (e) {
            _logger.error("_getWindowModule failed for " + moduleName + ": " + e.message);
            return null;
        }
    }
    
    /**
     * 获取module.exports中的模块
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function _getModuleExports(moduleName) {
        try {
            if (typeof module !== "undefined" && module.exports && typeof module.exports[moduleName] !== "undefined") {
                return module.exports[moduleName];
            }
            return null;
        } catch (e) {
            _logger.error("_getModuleExports failed for " + moduleName + ": " + e.message);
            return null;
        }
    }
    
    /**
     * 获取global对象中的模块
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function _getGlobalModule(moduleName) {
        try {
            if (typeof global !== "undefined" && global && typeof global[moduleName] !== "undefined") {
                return global[moduleName];
            }
            return null;
        } catch (e) {
            _logger.error("_getGlobalModule failed for " + moduleName + ": " + e.message);
            return null;
        }
    }
    
    /**
     * 按优先级顺序获取模块引用
     * 优先级：1.直接变量 > 2.window > 3.module.exports > 4.global
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function _getModuleByPriority(moduleName) {
        // 1. 优先：直接检查全局变量（已知模块名）
        var module = _getDirectVariable(moduleName);
        if (module !== null) {
            _logger.debug("Found " + moduleName + " via direct variable");
            return module;
        }
        
        // 2. 其次：window对象（浏览器或jsdom测试环境）
        module = _getWindowModule(moduleName);
        if (module !== null) {
            _logger.debug("Found " + moduleName + " via window object");
            return module;
        }
        
        // 3. 再次：module.exports（标准Node.js模块）
        module = _getModuleExports(moduleName);
        if (module !== null) {
            _logger.debug("Found " + moduleName + " via module.exports");
            return module;
        }
        
        // 4. 最后：global对象（Node.js全局）
        module = _getGlobalModule(moduleName);
        if (module !== null) {
            _logger.debug("Found " + moduleName + " via global object");
            return module;
        }
        
        _logger.warn("Module " + moduleName + " not found in any location");
        return null;
    }
    
    /**
     * 验证模块是否有效
     * @param {*} module 模块引用
     * @returns {boolean} 是否有效
     */
    function _validateModule(module) {
        return module !== null && 
               module !== undefined && 
               typeof module === "object";
    }
    
    // 公共接口
    
    /**
     * 获取模块引用
     * @param {string} moduleName 模块名称
     * @returns {*} 模块引用或null
     */
    function getModule(moduleName) {
        if (!moduleName || typeof moduleName !== "string") {
            _logger.error("Invalid module name: " + moduleName);
            return null;
        }
        
        // 检查缓存
        if (_config.enableCache && _cache.hasOwnProperty(moduleName)) {
            return _cache[moduleName];
        }
        
        // 按优先级获取模块
        var module = _getModuleByPriority(moduleName);
        
        // 验证模块
        if (_validateModule(module)) {
            // 缓存模块
            if (_config.enableCache) {
                _cache[moduleName] = module;
            }
            _logger.info("Successfully loaded module: " + moduleName);
            return module;
        }
        
        _logger.error("Failed to load module: " + moduleName);
        return null;
    }
    
    /**
     * 检查模块是否可用
     * @param {string} moduleName 模块名称
     * @returns {boolean} 是否可用
     */
    function isModuleAvailable(moduleName) {
        var module = getModule(moduleName);
        return _validateModule(module);
    }
    
    /**
     * 清除模块缓存
     * @param {string} moduleName 模块名称（可选，不提供则清除所有）
     */
    function clearCache(moduleName) {
        if (moduleName && typeof moduleName === "string") {
            delete _cache[moduleName];
            _logger.debug("Cleared cache for module: " + moduleName);
        } else {
            _cache = {};
            _logger.debug("Cleared all module cache");
        }
    }
    
    /**
     * 获取缓存统计信息
     * @returns {Object} 缓存统计
     */
    function getCacheStats() {
        var stats = {
            cacheEnabled: _config.enableCache,
            cacheSize: 0,
            cachedModules: []
        };
        
        if (_config.enableCache) {
            for (var key in _cache) {
                if (_cache.hasOwnProperty(key)) {
                    stats.cacheSize++;
                    stats.cachedModules.push(key);
                }
            }
        }
        
        return stats;
    }
    
    /**
     * 配置模块访问器
     * @param {Object} config 配置选项
     */
    function configure(config) {
        if (!config || typeof config !== "object") {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                _config[key] = config[key];
            }
        }
        
        _logger.info("ModuleAccessor configured: " + JSON.stringify(_config));
    }
    
    /**
     * 获取当前配置
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
     * 获取所有可用的模块列表
     * @returns {Array} 可用模块名称列表
     */
    function getAvailableModules() {
        var availableModules = [];
        
        // 检查常见的模块名称
        var commonModules = [
            "BaseModule", "CoreModule", "LogController",
            "LoggerModule", "LoggerModuleIndex", "UILoggerModule",
            "ObjectFactory", "ObjectManager", "MockSystem", "PCBObjectWrapper", "GeometryWrapper",
            "ObjectModule",
            "BasePCBWrapper", "PCBMockSystem", "PCBObjectFactory", "PCBObjectManager", "PCBObjectPool", "StackMap",
            "GeometryCalculator", "ArcWrapper", "PadWrapper", "TrackWrapper", "ViaWrapper",
            "PCBInterfaces",
            "PositionManager", "ObjectCreator", "ObjectCreatorModule",
            "GlobalEvents"
        ];
        
        for (var i = 0; i < commonModules.length; i++) {
            var moduleName = commonModules[i];
            if (isModuleAvailable(moduleName)) {
                availableModules.push(moduleName);
            }
        }
        
        return availableModules;
    }
    
    /**
     * 获取模块访问器统计信息
     * @returns {Object} 统计信息
     */
    function getStatistics() {
        return {
            configuration: getConfiguration(),
            cacheStats: getCacheStats(),
            availableModules: getAvailableModules()
        };
    }
    
    // 导出接口
    return {
        // 核心功能
        getModule: getModule,
        isModuleAvailable: isModuleAvailable,
        
        // 缓存管理
        clearCache: clearCache,
        getCacheStats: getCacheStats,
        
        // 配置管理
        configure: configure,
        getConfiguration: getConfiguration,
        
        // 查询功能
        getAvailableModules: getAvailableModules,
        getStatistics: getStatistics
    };
    
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.ModuleAccessor = ModuleAccessor;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ModuleAccessor;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.ModuleAccessor = ModuleAccessor;
    }
})();
