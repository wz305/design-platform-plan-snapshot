/**
 * IIFE模块架构说明
 * 
 * 1. 本模块使用IIFE模式封装对象：var ModuleName = (function(){...})();
 * 2. 构建后所有模块变量在同一作用域，可直接引用
 * 3. 不处理模块间依赖，需构建到一个文件中使用
 * 4. 通过window导出，确保AD环境可访问
 * 5. 依赖的模块必须在当前模块之前加载（通过merge-order.json控制）
 */

/**
 * LoggerModule 模块入口
 * 
 * 使用纯大IIFE模式导出LoggerModule接口
 * ES3/JScript 5.8 兼容
 */

var LoggerModuleIndex = (function() {
    
    // 依赖引用（直接使用，构建后自动可访问）
    
    // 私有变量
    var _instances = {};           // 存储Logger实例
    var _defaultInstance = null;    // 默认Logger实例
    var _moduleConfig = {           // 模块配置
        autoCreateDefault: true,
        defaultModuleName: "DefaultLogger"
    };
    
    // 私有函数
    
    /**
     * 创建默认Logger实例（单例模式）
     * @returns {Object} Logger实例 - 始终返回同一个实例
     */
    function _createDefaultInstance() {
        // 单例模式：检查实例是否已存在
        if (!_defaultInstance) {
            // 实例不存在时创建新实例
            var options = {
                moduleName: _moduleConfig.defaultModuleName,
                autoInit: true,
                level: 15,  // ALL
                threshold: 50,
                enabled: true
            };
            
            _defaultInstance = LoggerModule.create(options);
            
            // 确保实例创建成功
            if (_defaultInstance) {
                // 初始化实例
                if (typeof _defaultInstance.init === "function") {
                    _defaultInstance.init();
                }
                
                // 存储到实例列表中
                _instances[_moduleConfig.defaultModuleName] = _defaultInstance;
                
                // 添加实例标识用于调试
                _defaultInstance._isDefaultInstance = true;
                _defaultInstance._instanceId = "default_" + new Date().getTime();
                
                // 调试日志
                if (typeof console !== "undefined" && console.log) {
                    console.log("创建默认Logger实例:", {
                        instanceId: _defaultInstance._instanceId,
                        moduleName: _moduleConfig.defaultModuleName,
                        timestamp: new Date().toLocaleString()
                    });
                }
            } else {
                // 实例创建失败
                if (typeof console !== "undefined" && console.log) {
                    console.log("默认Logger实例创建失败");
                }
                return null;
            }
        } else {
            // 调试日志：返回已存在的实例（单例模式验证）
            if (typeof console !== "undefined" && console.log) {
                console.log("返回已存在的默认Logger实例（单例模式）:", {
                    instanceId: _defaultInstance._instanceId || "unknown",
                    moduleName: _moduleConfig.defaultModuleName,
                    cacheSize: (_defaultInstance && typeof _defaultInstance.getCount === "function") ? _defaultInstance.getCount() : 0,
                    timestamp: new Date().toLocaleString()
                });
            }
        }
        
        // 始终返回同一个实例 - 单例模式核心
        return _defaultInstance;
    }
    
    /**
     * 获取或创建Logger实例
     * @param {string} moduleName 模块名称
     * @param {Object} options 配置选项
     * @returns {Object} Logger实例
     */
    function _getOrCreateInstance(moduleName, options) {
        var instanceName = moduleName || _moduleConfig.defaultModuleName;
        
        // 如果实例已存在，直接返回
        if (_instances[instanceName]) {
            return _instances[instanceName];
        }
        
        // 创建新实例
        var instanceOptions = options || {};
        instanceOptions.moduleName = instanceName;
        
        var instance = LoggerModule.create(instanceOptions);
        
        // 初始化实例
        if (instance && typeof instance.init === "function") {
            instance.init();
        }
        
        // 确保moduleName属性正确设置
        if (instance) {
            instance.moduleName = instanceName;
        }
        
        // 存储实例
        _instances[instanceName] = instance;
        
        return instance;
    }
    
    /**
     * 验证Logger实例
     * @param {Object} instance Logger实例
     * @returns {boolean} 是否有效
     */
    function _validateInstance(instance) {
        return instance && 
               typeof instance === "object" &&
               typeof instance.error === "function" &&
               typeof instance.warn === "function" &&
               typeof instance.info === "function" &&
               typeof instance.debug === "function";
    }
    
    /**
     * 安全调用Logger方法
     * @param {Object} instance Logger实例
     * @param {string} methodName 方法名
     * @param {Array} args 参数数组
     */
    function _safeCall(instance, methodName, args) {
        try {
            if (_validateInstance(instance) && typeof instance[methodName] === "function") {
                instance[methodName].apply(instance, args);
            }
        } catch (e) {
            // 静默处理错误
        }
    }
    
    // 公共API - 实例管理
    
    /**
     * 创建Logger实例
     * @param {Object|string} options 配置选项或模块名称
     * @returns {Object} Logger实例
     */
    function create(options) {
        // 支持字符串参数作为模块名
        if (typeof options === "string") {
            options = {moduleName: options};
        }
        
        var instance = LoggerModule.create(options);
        
        // 确保moduleName属性正确设置
        if (instance) {
            if (options && options.moduleName) {
                instance.moduleName = options.moduleName;
            } else if (instance.data && instance.data.config && instance.data.config.moduleName) {
                instance.moduleName = instance.data.config.moduleName;
            } else {
                instance.moduleName = "LoggerModule";
            }
        }
        
        return instance;
    }
    
    /**
     * 初始化Logger实例
     * @param {Object} instance Logger实例
     * @returns {boolean} 是否成功
     */
    function init(instance) {
        if (!instance) {
            return false;
        }
        
        try {
            if (typeof instance.init === "function") {
                return instance.init();
            }
            return false;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 运行Logger实例
     * @param {Object} instance Logger实例
     * @param {*} data 运行数据
     * @returns {Object} 运行结果
     */
    function run(instance, data) {
        if (!instance) {
            return {success: false, message: "实例无效"};
        }
        
        try {
            if (typeof instance.run === "function") {
                return instance.run(data);
            }
            return {success: false, message: "run方法不存在"};
        } catch (e) {
            return {success: false, message: "运行异常: " + e.message};
        }
    }
    
    /**
     * 销毁Logger实例
     * @param {Object} instance Logger实例
     * @returns {boolean} 是否成功
     */
    function destroy(instance) {
        if (!instance) {
            return false;
        }
        
        try {
            if (typeof instance.destroy === "function") {
                var result = instance.destroy();
                
                // 从实例列表中移除
                for (var name in _instances) {
                    if (_instances[name] === instance) {
                        delete _instances[name];
                        break;
                    }
                }
                
                // 如果是默认实例，清空引用
                if (_defaultInstance === instance) {
                    _defaultInstance = null;
                }
                
                return result;
            }
            return false;
        } catch (e) {
            return false;
        }
    }
    
    // 公共API - 便捷方法
    
    /**
     * 获取指定模块的Logger实例
     * @param {string} moduleName 模块名称
     * @param {Object} options 配置选项
     * @returns {Object} Logger实例
     */
    function getLogger(moduleName, options) {
        return _getOrCreateInstance(moduleName, options);
    }
    
    /**
     * 获取默认Logger实例
     * @returns {Object} 默认Logger实例
     */
    function getDefaultLogger() {
        if (_moduleConfig.autoCreateDefault) {
            var instance = _createDefaultInstance();
            
            // 调试日志：验证单例
            if (typeof console !== "undefined" && console.log) {
                console.log("getDefaultLogger返回实例:", {
                    instanceId: (instance && instance._instanceId) ? instance._instanceId : "unknown",
                    isDefaultInstance: (instance && instance._isDefaultInstance) ? true : false,
                    cacheSize: (instance && typeof instance.getCount === "function") ? instance.getCount() : 0,
                    timestamp: new Date().toLocaleString()
                });
            }
            
            return instance;
        }
        return _defaultInstance;
    }
    
    /**
     * 记录错误日志（使用默认实例）
     * @param {string} message 错误消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function error(message, context, fileName, functionName) {
        var instance = getDefaultLogger();
        if (instance) {
            _safeCall(instance, "error", [message, context, fileName, functionName]);
        }
    }
    
    /**
     * 记录警告日志（使用默认实例）
     * @param {string} message 警告消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function warn(message, context, fileName, functionName) {
        var instance = getDefaultLogger();
        if (instance) {
            _safeCall(instance, "warn", [message, context, fileName, functionName]);
        }
    }
    
    /**
     * 记录信息日志（使用默认实例）
     * @param {string} message 信息消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function info(message, context, fileName, functionName) {
        var instance = getDefaultLogger();
        if (instance) {
            _safeCall(instance, "info", [message, context, fileName, functionName]);
        }
    }
    
    /**
     * 记录调试日志（使用默认实例）
     * @param {string} message 调试消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function debug(message, context, fileName, functionName) {
        var instance = getDefaultLogger();
        if (instance) {
            _safeCall(instance, "debug", [message, context, fileName, functionName]);
        }
    }
    
    // 公共API - 配置管理
    
    /**
     * 配置模块
     * @param {Object} config 模块配置
     */
    function configure(config) {
        if (config && typeof config === "object") {
            for (var key in config) {
                if (config.hasOwnProperty(key)) {
                    _moduleConfig[key] = config[key];
                }
            }
        }
    }
    
    /**
     * 获取模块配置
     * @returns {Object} 模块配置
     */
    function getConfiguration() {
        var config = {};
        for (var key in _moduleConfig) {
            if (_moduleConfig.hasOwnProperty(key)) {
                config[key] = _moduleConfig[key];
            }
        }
        return config;
    }
    
    /**
     * 设置默认日志级别
     * @param {number} level 日志级别
     */
    function setDefaultLevel(level) {
        var instance = getDefaultLogger();
        if (instance && typeof instance.setLevel === "function") {
            instance.setLevel(level);
        }
    }
    
    /**
     * 设置默认写入阈值
     * @param {number} threshold 阈值
     */
    function setDefaultThreshold(threshold) {
        var instance = getDefaultLogger();
        if (instance && typeof instance.setThreshold === "function") {
            instance.setThreshold(threshold);
        }
    }
    
    /**
     * 启用/禁用默认日志
     * @param {boolean} enabled 是否启用
     */
    function setDefaultEnabled(enabled) {
        var instance = getDefaultLogger();
        if (instance && typeof instance.setEnabled === "function") {
            instance.setEnabled(enabled);
        }
    }
    
    // 公共API - 状态查询
    
    /**
     * 获取默认实例统计信息
     * @returns {Object} 统计信息
     */
    function getStats() {
        var instance = getDefaultLogger();
        if (instance && typeof instance.getStats === "function") {
            return instance.getStats();
        }
        return {};
    }
    
    /**
     * 获取默认实例缓存数量
     * @returns {number} 缓存数量
     */
    function getCount() {
        var instance = getDefaultLogger();
        if (instance && typeof instance.getCount === "function") {
            return instance.getCount();
        }
        return 0;
    }
    
    /**
     * 强制写入默认实例缓存
     * @returns {boolean} 是否成功
     */
    function flush() {
        try {
            var instance = getDefaultLogger();
            if (instance && typeof instance.flush === "function") {
                var result = instance.flush();
                
                // 增强错误处理和诊断
                if (result === false) {
                    // 尝试诊断失败原因
                    var cacheCount = instance.getCount ? instance.getCount() : 0;
                    var stats = instance.getStats ? instance.getStats() : {};
                    
                    // 如果缓存为空，返回true（没有内容需要写入）
                    if (cacheCount === 0) {
                        return true;
                    }
                    
                    // 记录详细的失败信息
                    if (typeof console !== "undefined" && console.log) {
                        console.log("flush失败诊断:", {
                            cacheCount: cacheCount,
                            stats: stats,
                            instanceType: typeof instance,
                            hasFlush: typeof instance.flush === "function"
                        });
                    }
                }
                
                return result;
            }
            
            // 如果没有实例或flush方法，返回false
            if (typeof console !== "undefined" && console.log) {
                console.log("flush失败: 无效实例或方法", {
                    hasInstance: !!instance,
                    hasFlushMethod: instance && typeof instance.flush === "function"
                });
            }
            
            return false;
        } catch (e) {
            // 异常处理
            if (typeof console !== "undefined" && console.log) {
                console.log("flush异常:", e.message);
            }
            return false;
        }
    }
    
    /**
     * 清空默认实例缓存
     * @returns {boolean} 是否成功
     */
    function clear() {
        var instance = getDefaultLogger();
        if (instance && typeof instance.clear === "function") {
            return instance.clear();
        }
        return false;
    }
    
    /**
     * 获取所有实例信息
     * @returns {Object} 实例信息
     */
    function getInstances() {
        var instances = {};
        for (var name in _instances) {
            if (_instances.hasOwnProperty(name)) {
                var instance = _instances[name];
                instances[name] = {
                    moduleName: name,
                    initialized: instance.state ? instance.state.initialized : false,
                    stats: (typeof instance.getStats === "function") ? instance.getStats() : {}
                };
            }
        }
        return instances;
    }
    
    // 公共API - 批量操作
    
    /**
     * 批量操作所有实例
     * @param {string} operation 操作名称
     * @param {*} args 操作参数
     * @returns {Object} 操作结果
     */
    function batchOperation(operation, args) {
        var results = {
            success: 0,
            failed: 0,
            total: 0,
            details: {}
        };
        
        for (var name in _instances) {
            if (_instances.hasOwnProperty(name)) {
                results.total++;
                var instance = _instances[name];
                
                try {
                    if (typeof instance[operation] === "function") {
                        var result = instance[operation].apply(instance, args);
                        results.details[name] = {success: true, result: result};
                        results.success++;
                    } else {
                        results.details[name] = {success: false, error: "方法不存在"};
                        results.failed++;
                    }
                } catch (e) {
                    results.details[name] = {success: false, error: e.message};
                    results.failed++;
                }
            }
        }
        
        return results;
    }
    
    /**
     * 刷新所有实例缓存
     * @returns {Object} 操作结果
     */
    function flushAll() {
        return batchOperation("flush", []);
    }
    
    /**
     * 清空所有实例缓存
     * @returns {Object} 操作结果
     */
    function clearAll() {
        return batchOperation("clear", []);
    }
    
    /**
     * 销毁所有实例
     * @returns {Object} 操作结果
     */
    function destroyAll() {
        var results = flushAll();
        
        // 清空实例列表
        for (var name in _instances) {
            if (_instances.hasOwnProperty(name)) {
                var instance = _instances[name];
                if (typeof instance.destroy === "function") {
                    try {
                        instance.destroy();
                    } catch (e) {
                        // 静默处理
                    }
                }
            }
        }
        
        _instances = {};
        _defaultInstance = null;
        
        return results;
    }
    
    /**
     * 获取全局统计信息
     * @returns {Object} 全局统计信息
     */
    function getGlobalStats() {
        var globalStats = {
            totalInstances: 0,
            totalLogs: 0,
            totalCacheSize: 0,
            instances: {}
        };
        
        for (var name in _instances) {
            if (_instances.hasOwnProperty(name)) {
                var instance = _instances[name];
                var stats = {};
                
                if (typeof instance.getStats === "function") {
                    stats = instance.getStats();
                }
                
                globalStats.instances[name] = {
                    moduleName: name,
                    stats: stats,
                    cacheSize: (typeof instance.getCount === "function") ? instance.getCount() : 0
                };
                
                globalStats.totalInstances++;
                globalStats.totalLogs += (stats.totalLogs || 0);
                globalStats.totalCacheSize += globalStats.instances[name].cacheSize;
            }
        }
        
        return globalStats;
    }
    
    // 导出接口
    
    return {
        // 生命周期方法
        create: create,
        init: init,
        run: run,
        destroy: destroy,
        
        // 实例管理
        getLogger: getLogger,
        getDefaultLogger: getDefaultLogger,
        getInstances: getInstances,
        
        // 便捷日志方法（使用默认实例）
        error: error,
        warn: warn,
        info: info,
        debug: debug,
        
        // 配置管理
        configure: configure,
        getConfiguration: getConfiguration,
        setDefaultLevel: setDefaultLevel,
        setDefaultThreshold: setDefaultThreshold,
        setDefaultEnabled: setDefaultEnabled,
        
        // 状态查询
        getStats: getStats,
        getCount: getCount,
        flush: flush,
        clear: clear,
        
        // 批量操作
        flushAll: flushAll,
        clearAll: clearAll,
        destroyAll: destroyAll,
        batchOperation: batchOperation,
        
        // 全局统计
        getGlobalStats: getGlobalStats,
        
        // 工具方法
        isHealthy: function() {
            var instance = getDefaultLogger();
            if (instance && typeof instance.isHealthy === "function") {
                return instance.isHealthy();
            }
            return false;
        },
        
        getInfo: function() {
            return {
                name: "LoggerModule",
                version: "1.0.0",
                description: "AD21 JS Project Logger Module",
                author: "AD21 JS Project Team"
            };
        }
    };
    
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.LoggerModuleIndex = LoggerModuleIndex;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = LoggerModuleIndex;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.LoggerModuleIndex = LoggerModuleIndex;
    }
})();
