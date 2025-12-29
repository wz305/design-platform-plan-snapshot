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
 * UILoggerModule 模块入口
 * 
 * 专门用于UI日志显示的模块，基于LoggerModule构建
 * ES3/JScript 5.8 兼容
 */

var UILoggerModule = (function() {
    
    // 依赖引用（直接使用，构建后自动可访问）
    
    // 私有变量
    var _instances = {};           // 存储UI Logger实例
    var _defaultInstance = null;    // 默认UI Logger实例
    var _moduleConfig = {           // 模块配置
        autoCreateDefault: true,
        defaultModuleName: "UILogger",
        maxDisplayLines: 1000,      // 最大显示行数
        autoScroll: true,           // 自动滚动
        showTimestamp: true,        // 显示时间戳
        showLevel: true,            // 显示日志级别
        showModule: true            // 显示模块名
    };
    
    // 私有函数
    
    /**
     * 创建默认UI Logger实例
     * @returns {Object} UI Logger实例
     */
    function _createDefaultInstance() {
        if (!_defaultInstance) {
            var options = {
                moduleName: _moduleConfig.defaultModuleName,
                autoInit: true,
                level: 15,  // ALL
                threshold: 1,   // 立即写入UI
                enabled: true
            };
            
            _defaultInstance = LoggerModule.create(options);
            
            // 初始化实例
            if (_defaultInstance && typeof _defaultInstance.init === "function") {
                _defaultInstance.init();
            }
        }
        
        return _defaultInstance;
    }
    
    /**
     * 格式化日志消息用于UI显示
     * @param {string} level 日志级别
     * @param {string} message 日志消息
     * @param {string} moduleName 模块名
     * @param {string} functionName 函数名
     * @returns {string} 格式化后的消息
     */
    function _formatUIMessage(level, message, moduleName, functionName) {
        var parts = [];
        
        // 添加时间戳
        if (_moduleConfig.showTimestamp) {
            parts.push("[" + new Date().toLocaleString() + "]");
        }
        
        // 添加日志级别
        if (_moduleConfig.showLevel) {
            parts.push("[" + level.toUpperCase() + "]");
        }
        
        // 添加模块名
        if (_moduleConfig.showModule && moduleName) {
            parts.push("[" + moduleName + "]");
        }
        
        // 添加函数名
        if (functionName) {
            parts.push("[" + functionName + "]");
        }
        
        // 添加消息
        parts.push(message);
        
        return parts.join(" ");
    }
    
    /**
     * 安全地向UI添加日志行
     * @param {string} message 日志消息
     */
    function _safeAddToUI(message) {
        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
                // 检查最大行数限制
                if (_moduleConfig.maxDisplayLines > 0 && memLog.Lines.Count >= _moduleConfig.maxDisplayLines) {
                    // 删除最早的行
                    while (memLog.Lines.Count >= _moduleConfig.maxDisplayLines) {
                        memLog.Lines.Delete(0);
                    }
                }
                
                // 添加新行
                memLog.Lines.Add(message);
                
                // 自动滚动到底部
                if (_moduleConfig.autoScroll) {
                    try {
                        // 尝试滚动到底部（如果支持）
                        if (memLog.Perform && typeof memLog.Perform === "function") {
                            memLog.Perform(EM_SCROLLCARET, 0);
                        }
                    } catch (e) {
                        // 忽略滚动错误
                    }
                }
            }
        } catch (e) {
            // 静默处理UI更新错误
        }
    }
    
    /**
     * 获取或创建UI Logger实例
     * @param {string} moduleName 模块名称
     * @param {Object} options 配置选项
     * @returns {Object} UI Logger实例
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
        instanceOptions.threshold = 1;  // UI日志立即显示
        
        var instance = LoggerModule.create(instanceOptions);
        
        // 初始化实例
        if (instance && typeof instance.init === "function") {
            instance.init();
        }
        
        // 存储实例
        _instances[instanceName] = instance;
        
        return instance;
    }
    
    // 公共API - 实例管理
    
    /**
     * 创建UI Logger实例
     * @param {Object} options 配置选项
     * @returns {Object} UI Logger实例
     */
    function create(options) {
        return LoggerModule.create(options);
    }
    
    /**
     * 初始化UI Logger实例
     * @param {Object} instance UI Logger实例
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
     * 运行UI Logger实例
     * @param {Object} instance UI Logger实例
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
     * 销毁UI Logger实例
     * @param {Object} instance UI Logger实例
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
    
    // 公共API - UI专用日志方法
    
    /**
     * 直接在UI中显示错误日志
     * @param {string} message 错误消息
     * @param {*} context 上下文信息
     * @param {string} moduleName 模块名
     * @param {string} functionName 函数名
     */
    function uiError(message, context, moduleName, functionName) {
        var formattedMessage = _formatUIMessage("ERROR", message, moduleName, functionName);
        _safeAddToUI(formattedMessage);
        
        // 同时记录到LoggerModule
        var instance = _createDefaultInstance();
        if (instance && typeof instance.error === "function") {
            instance.error(message, context, moduleName, functionName);
        }
    }
    
    /**
     * 直接在UI中显示警告日志
     * @param {string} message 警告消息
     * @param {*} context 上下文信息
     * @param {string} moduleName 模块名
     * @param {string} functionName 函数名
     */
    function uiWarn(message, context, moduleName, functionName) {
        var formattedMessage = _formatUIMessage("WARN", message, moduleName, functionName);
        _safeAddToUI(formattedMessage);
        
        // 同时记录到LoggerModule
        var instance = _createDefaultInstance();
        if (instance && typeof instance.warn === "function") {
            instance.warn(message, context, moduleName, functionName);
        }
    }
    
    /**
     * 直接在UI中显示信息日志
     * @param {string} message 信息消息
     * @param {*} context 上下文信息
     * @param {string} moduleName 模块名
     * @param {string} functionName 函数名
     */
    function uiInfo(message, context, moduleName, functionName) {
        var formattedMessage = _formatUIMessage("INFO", message, moduleName, functionName);
        _safeAddToUI(formattedMessage);
        
        // 同时记录到LoggerModule
        var instance = _createDefaultInstance();
        if (instance && typeof instance.info === "function") {
            instance.info(message, context, moduleName, functionName);
        }
    }
    
    /**
     * 直接在UI中显示调试日志
     * @param {string} message 调试消息
     * @param {*} context 上下文信息
     * @param {string} moduleName 模块名
     * @param {string} functionName 函数名
     */
    function uiDebug(message, context, moduleName, functionName) {
        var formattedMessage = _formatUIMessage("DEBUG", message, moduleName, functionName);
        _safeAddToUI(formattedMessage);
        
        // 同时记录到LoggerModule
        var instance = _createDefaultInstance();
        if (instance && typeof instance.debug === "function") {
            instance.debug(message, context, moduleName, functionName);
        }
    }
    
    /**
     * 直接在UI中显示原始消息
     * @param {string} message 原始消息
     */
    function uiRaw(message) {
        _safeAddToUI(message);
    }
    
    /**
     * 清空UI显示
     */
    function uiClear() {
        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
                memLog.Lines.Clear();
            }
        } catch (e) {
            // 静默处理清空错误
        }
    }
    
    // 公共API - 配置管理
    
    /**
     * 配置UI Logger模块
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
    
    // 导出接口
    
    return {
        // 生命周期方法
        create: create,
        init: init,
        run: run,
        destroy: destroy,
        
        // UI专用日志方法
        uiError: uiError,
        uiWarn: uiWarn,
        uiInfo: uiInfo,
        uiDebug: uiDebug,
        uiRaw: uiRaw,
        uiClear: uiClear,
        
        // 配置管理
        configure: configure,
        getConfiguration: getConfiguration
    };
    
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.UILoggerModule = UILoggerModule;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = UILoggerModule;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.UILoggerModule = UILoggerModule;
    }
})();
