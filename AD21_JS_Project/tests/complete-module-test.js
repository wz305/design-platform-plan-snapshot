/**
 * 自动生成的测试脚本
 * 
 * 模块加载顺序: .._src_modules_base_index.js -> .._src_modules_logger_types.js -> .._src_modules_logger_tools.js -> .._src_modules_logger_steps_step_format.js -> .._src_modules_logger_steps_step_write.js -> .._src_modules_logger_core.js -> .._src_modules_logger_index.js -> .._src_modules_object-module_index.js -> .._src_modules_pcb-interfaces_index.js
 * 生成时间: 2025/12/14 15:58:12
 */

// === 按依赖顺序加载模块 ===

// 加载模块: .._src_modules_base_index.js
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
 * BaseModule - AD ES3 模块基础架构
 * 提供标准的模块生命周期、状态管理、Hook系统
 * 100% 兼容 JScript 5.8 (ES3)
 */

var BaseModule = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _defaultOptions = {
        moduleName: "BaseModule",
        autoInit: false,
        autoTime: true,
        debugMode: false
    };
    
    // 私有工具函数
    function _mergeOptions(userOptions, defaults) {
        var result = {};
        var key;
        
        // 复制默认值
        for (key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                result[key] = defaults[key];
            }
        }
        
        // 覆盖用户值
        for (key in userOptions) {
            if (userOptions.hasOwnProperty(key)) {
                result[key] = userOptions[key];
            }
        }
        
        return result;
    }
    
    function _createHooks() {
        return {
            onBeforeInit: null,
            onAfterInit: null,
            onBeforeRun: null,
            onAfterRun: null,
            onBeforeDestroy: null,
            onAfterDestroy: null
        };
    }
    
    function _createState() {
        return {
            initialized: false,
            running: false,
            destroyed: false,
            errorCount: 0,
            lastError: null
        };
    }
    
    function _createContext() {
        return {
            startTime: null,
            endTime: null,
            executionTime: 0
        };
    }
    
    function _executeHook(hook, instance, data) {
        if (hook && typeof hook === "function") {
            try {
                return hook(instance, data);
            } catch (error) {
                // 直接输出到UI，不再静默处理
                try {
                    if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
                        memLog.Lines.Add("[BaseModule][ERROR] Hook execution failed: " + error.message);
                    }
                } catch (e) {
                    // 如果连UI输出都失败，那就真的没办法了
                }
                return null;
            }
        }
        return null;
    }
    
    // 可重写的核心方法（子模块重写这些）
    function _performInitialization(inst) {
        // 子模块重写此方法实现具体初始化
        return true;
    }
    
    function _executeMainLogic(inst) {
        // 子模块重写此方法实现主要逻辑
        return {
            success: true,
            message: "BaseModule executed successfully",
            data: null,
            time: inst.context.executionTime
        };
    }
    
    function _performDestroy(inst) {
        // 子模块重写此方法实现资源清理
        return true;
    }
    
    // 公有API函数
    function create(userOptions) {
        var options = _mergeOptions(userOptions || {}, _defaultOptions);
        
        var instance = {
            // 配置选项
            options: options,
            
            // 运行状态
            state: _createState(),
            
            // 执行上下文
            context: _createContext(),
            
            // Hook系统
            hooks: _createHooks(),
            
            // 生命周期方法
            init: function() { return init(instance); },
            run: function() { return run(instance); },
            destroy: function() { return destroy(instance); },
            
            // 内部方法引用（子模块可重写）
            _performInitialization: function() { return _performInitialization(instance); },
            _executeMainLogic: function() { return _executeMainLogic(instance); },
            _performDestroy: function() { return _performDestroy(instance); }
        };
        
        // 创建日志记录器（移除Logger依赖，避免循环依赖）
        // 注意：BaseModule不应该依赖Logger，Logger应该依赖BaseModule
        instance.logger = null;
        
        // 自动初始化
        if (options.autoInit) {
            init(instance);
        }
        
        return instance;
    }
    
    function init(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][init] Instance is required");
        }
        
        if (instance.state.initialized) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][init] Module already initialized");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeInit, instance);
            
            // 设置开始时间
            if (instance.options.autoTime) {
                instance.context.startTime = new Date();
            }
            
            // 执行具体初始化
            var initResult = instance._performInitialization();
            
            if (initResult) {
                instance.state.initialized = true;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterInit, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BaseModule][index.js][init] Module initialized successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BaseModule][index.js][init] Initialization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][init] Initialization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function run(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][run] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BaseModule][index.js][run] Module not initialized");
        }
        
        if (instance.state.running) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][run] Module already running");
            }
            return null;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeRun, instance);
            
            // 设置运行状态
            instance.state.running = true;
            
            // 设置开始时间
            if (instance.options.autoTime) {
                instance.context.startTime = new Date();
            }
            
            // 执行主要逻辑
            var result = instance._executeMainLogic();
            
            // 设置结束时间和执行时间
            if (instance.options.autoTime && instance.context.startTime) {
                instance.context.endTime = new Date();
                instance.context.executionTime = instance.context.endTime.getTime() - instance.context.startTime.getTime();
                
                if (result) {
                    result.time = instance.context.executionTime;
                }
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterRun, instance, result);
            
            if (instance.logger && instance.logger.info) {
                instance.logger.info("[BaseModule][index.js][run] Module executed successfully: " + instance.options.moduleName + " (" + instance.context.executionTime + "ms)");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][run] Execution error: " + error.message);
            }
            
            throw error;
        } finally {
            instance.state.running = false;
        }
    }
    
    function destroy(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][destroy] Instance is required");
        }
        
        if (instance.state.destroyed) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][destroy] Module already destroyed");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeDestroy, instance);
            
            // 执行具体销毁逻辑
            var destroyResult = instance._performDestroy();
            
            if (destroyResult) {
                // 清理状态
                instance.state.destroyed = true;
                instance.state.initialized = false;
                instance.state.running = false;
                
                // 清理上下文
                instance.context.startTime = null;
                instance.context.endTime = null;
                instance.context.executionTime = 0;
                
                // 清理Hook
                instance.hooks.onBeforeInit = null;
                instance.hooks.onAfterInit = null;
                instance.hooks.onBeforeRun = null;
                instance.hooks.onAfterRun = null;
                instance.hooks.onBeforeDestroy = null;
                instance.hooks.onAfterDestroy = null;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterDestroy, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BaseModule][index.js][destroy] Module destroyed successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BaseModule][index.js][destroy] Destruction failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][destroy] Destruction error: " + error.message);
            }
            
            throw error;
        }
    }
    
    // 返回模块接口
    return {
        create: create,
        init: init,
        run: run,
        destroy: destroy,
        
        // 版本信息
        version: _moduleVersion,
        
        // 默认选项（供参考）
        defaultOptions: _defaultOptions
    };
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.BaseModule = BaseModule;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = BaseModule;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.BaseModule = BaseModule;
    }
})();


// 加载模块: .._src_modules_logger_types.js
/**
 * LoggerModule 类型定义
 * 
 * 定义日志级别、默认配置、数据结构等
 * ES3/JScript 5.8 兼容
 */

var LoggerTypes = (function(){
    
    // -------------------------------------------------------------
    // 1. 日志级别常量定义
    // -------------------------------------------------------------
    
    /**
     * 日志级别位掩码定义
     * 使用位运算支持级别组合
     */
    var LOG_LEVELS = {
        NONE: 0,      // 不记录任何日志
        ERROR: 1,     // 错误级别
        WARN: 2,      // 警告级别
        INFO: 4,      // 信息级别
        DEBUG: 8,     // 调试级别
        ALL: 15       // 所有级别
    };
    
    /**
     * 日志级别名称映射
     */
    var LEVEL_NAMES = {
        1: "ERROR",
        2: "WARN", 
        4: "INFO",
        8: "DEBUG"
    };
    
    /**
     * 日志级别描述
     */
    var LEVEL_DESCRIPTIONS = {
        0: "无日志",
        1: "仅错误",
        2: "警告",
        3: "错误和警告",
        4: "信息",
        5: "错误和信息",
        6: "警告和信息",
        7: "错误、警告和信息",
        8: "调试",
        9: "错误和调试",
        10: "警告和调试",
        11: "错误、警告和调试",
        12: "信息和调试",
        13: "错误、信息和调试",
        14: "警告、信息和调试",
        15: "所有日志"
    };
    
    // -------------------------------------------------------------
    // 2. 默认配置定义
    // -------------------------------------------------------------
    
    /**
     * LoggerModule 默认配置
     */
    var DEFAULT_CONFIG = {
        moduleName: "LoggerModule",
        autoInit: true,
        autoTime: true,
        
        // 日志特定配置
        level: LOG_LEVELS.ALL,           // 默认记录所有级别
        threshold: 50,                   // 默认写入阈值
        enabled: true,                   // 默认启用日志
        
        // 格式化配置
        includeTimestamp: true,          // 包含时间戳
        includeModuleName: true,         // 包含模块名
        includeFileName: true,           // 包含文件名
        includeFunctionName: true,       // 包含函数名
        
        // 写入配置
        maxLogSize: 5120,               // 单条日志最大大小（5KB）
        maxCacheSize: 100,              // 最大缓存条数
        autoFlush: true,                // 自动flush
        
        // 调试配置
        debugMode: false,               // 调试模式
        captureEnabled: true             // 启用值截获
    };
    
    // -------------------------------------------------------------
    // 3. 数据结构定义
    // -------------------------------------------------------------
    
    /**
     * 日志条目结构模板
     */
    var LOG_ENTRY_TEMPLATE = {
        timestamp: "",                  // 时间戳字符串
        level: "",                      // 日志级别名称
        message: "",                    // 日志消息
        moduleName: "",                // 模块名称
        fileName: "",                   // 文件名称
        functionName: "",              // 函数名称
        context: null                  // 上下文信息
    };
    
    /**
     * 统计信息结构模板
     */
    var STATS_TEMPLATE = {
        totalLogs: 0,                  // 总日志数
        errorCount: 0,                 // 错误数量
        warnCount: 0,                  // 警告数量
        infoCount: 0,                  // 信息数量
        debugCount: 0,                 // 调试数量
        cacheSize: 0,                  // 当前缓存大小
        lastFlushTime: 0,              // 最后写入时间
        flushCount: 0,                 // 写入次数
        errorFlushCount: 0             // 写入失败次数
    };
    
    /**
     * Logger实例数据结构模板
     */
    var INSTANCE_DATA_TEMPLATE = {
        config: null,                  // 配置对象
        cache: null,                   // 日志缓存数组
        stats: null,                   // 统计信息对象
        initialized: false,            // 初始化状态
        lastLogTime: 0                 // 最后日志时间
    };
    
    // -------------------------------------------------------------
    // 4. 错误代码定义
    // -------------------------------------------------------------
    
    /**
     * LoggerModule 错误代码
     */
    var ERROR_CODES = {
        SUCCESS: 0,                    // 成功
        INVALID_INSTANCE: 1001,        // 无效实例
        NOT_INITIALIZED: 1002,         // 未初始化
        INVALID_LEVEL: 1003,           // 无效日志级别
        INVALID_THRESHOLD: 1004,       // 无效阈值
        WRITE_FAILED: 1005,           // 写入失败
        CACHE_FULL: 1006,             // 缓存已满
        INVALID_PARAMETER: 1007       // 无效参数
    };
    
    /**
     * 错误消息映射
     */
    var ERROR_MESSAGES = {
        1001: "Logger实例无效",
        1002: "Logger未初始化",
        1003: "无效的日志级别",
        1004: "无效的写入阈值",
        1005: "日志写入失败",
        1006: "日志缓存已满",
        1007: "参数无效"
    };
    
    // -------------------------------------------------------------
    // 5. 工具函数
    // -------------------------------------------------------------
    
    /**
     * 验证日志级别是否有效
     * @param {number} level 日志级别
     * @returns {boolean} 是否有效
     */
    function isValidLogLevel(level) {
        if (typeof level !== "number") {
            return false;
        }
        
        return level >= LOG_LEVELS.NONE && level <= LOG_LEVELS.ALL;
    }
    
    /**
     * 获取日志级别名称
     * @param {number} level 日志级别
     * @returns {string} 级别名称
     */
    function getLevelName(level) {
        return LEVEL_NAMES[level] || "UNKNOWN";
    }
    
    /**
     * 获取日志级别描述
     * @param {number} level 日志级别
     * @returns {string} 级别描述
     */
    function getLevelDescription(level) {
        return LEVEL_DESCRIPTIONS[level] || "未知级别";
    }
    
    /**
     * 检查级别是否启用
     * @param {number} currentLevel 当前级别
     * @param {number} checkLevel 检查级别
     * @returns {boolean} 是否启用
     */
    function isLevelEnabled(currentLevel, checkLevel) {
        return (currentLevel & checkLevel) === checkLevel;
    }
    
    /**
     * 获取错误消息
     * @param {number} errorCode 错误代码
     * @returns {string} 错误消息
     */
    function getErrorMessage(errorCode) {
        return ERROR_MESSAGES[errorCode] || "未知错误";
    }
    
    /**
     * 创建默认配置的副本
     * @param {Object} overrides 覆盖配置
     * @returns {Object} 配置对象
     */
    function createDefaultConfig(overrides) {
        var config = {};
        var key;
        
        // 复制默认配置
        for (key in DEFAULT_CONFIG) {
            config[key] = DEFAULT_CONFIG[key];
        }
        
        // 应用覆盖配置
        if (overrides && typeof overrides === "object") {
            for (key in overrides) {
                if (overrides.hasOwnProperty(key)) {
                    config[key] = overrides[key];
                }
            }
        }
        
        return config;
    }
    
    /**
     * 创建统计信息对象
     * @returns {Object} 统计信息对象
     */
    function createStats() {
        var stats = {};
        var key;
        
        for (key in STATS_TEMPLATE) {
            stats[key] = STATS_TEMPLATE[key];
        }
        
        return stats;
    }
    
    /**
     * 创建日志条目对象
     * @returns {Object} 日志条目对象
     */
    function createLogEntry() {
        var entry = {};
        var key;
        
        for (key in LOG_ENTRY_TEMPLATE) {
            entry[key] = LOG_ENTRY_TEMPLATE[key];
        }
        
        return entry;
    }
    
    /**
     * 创建实例数据对象
     * @returns {Object} 实例数据对象
     */
    function createInstanceData() {
        var data = {};
        var key;
        
        for (key in INSTANCE_DATA_TEMPLATE) {
            data[key] = INSTANCE_DATA_TEMPLATE[key];
        }
        
        // 初始化引用类型
        data.config = createDefaultConfig();
        data.cache = [];
        data.stats = createStats();
        
        return data;
    }
    
    // -------------------------------------------------------------
    // 6. 导出接口
    // -------------------------------------------------------------
    
    return {
        // 常量
        LOG_LEVELS: LOG_LEVELS,
        LEVEL_NAMES: LEVEL_NAMES,
        LEVEL_DESCRIPTIONS: LEVEL_DESCRIPTIONS,
        DEFAULT_CONFIG: DEFAULT_CONFIG,
        LOG_ENTRY_TEMPLATE: LOG_ENTRY_TEMPLATE,
        STATS_TEMPLATE: STATS_TEMPLATE,
        INSTANCE_DATA_TEMPLATE: INSTANCE_DATA_TEMPLATE,
        ERROR_CODES: ERROR_CODES,
        ERROR_MESSAGES: ERROR_MESSAGES,
        
        // 工具函数
        isValidLogLevel: isValidLogLevel,
        getLevelName: getLevelName,
        getLevelDescription: getLevelDescription,
        isLevelEnabled: isLevelEnabled,
        getErrorMessage: getErrorMessage,
        createDefaultConfig: createDefaultConfig,
        createStats: createStats,
        createLogEntry: createLogEntry,
        createInstanceData: createInstanceData
    };
    
})();


// 加载模块: .._src_modules_logger_tools.js
/**
 * LoggerModule 工具函数
 * 
 * 提供格式化、验证、字符串处理等工具函数
 * ES3/JScript 5.8 兼容
 */

var LoggerTools = (function(){
    
    // -------------------------------------------------------------
    // 1. 字符串处理工具
    // -------------------------------------------------------------
    
    /**
     * 简单的对象字符串化（ES3兼容）
     * 使用for...in遍历，无需复杂的深度控制
     * @param {*} obj 要字符串化的对象
     * @returns {string} 字符串化结果
     */
    function simpleStringify(obj) {
        if (obj === null || obj === undefined) {
            return "null";
        }
        
        if (typeof obj === "string") {
            return "\"" + obj + "\"";
        }
        
        if (typeof obj === "number" || typeof obj === "boolean") {
            return String(obj);
        }
        
        if (typeof obj !== "object") {
            return String(obj);
        }
        
        // 对象处理
        var result = "{";
        var first = true;
        var key;
        
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!first) {
                    result += ", ";
                }
                result += key + ":" + simpleStringify(obj[key]);
                first = false;
            }
        }
        
        result += "}";
        return result;
    }
    
    /**
     * 安全的字符串转换
     * @param {*} value 要转换的值
     * @returns {string} 转换结果
     */
    function safeString(value) {
        try {
            if (value === null || value === undefined) {
                return "";
            }
            return String(value);
        } catch (e) {
            return "[Conversion Error]";
        }
    }
    
    /**
     * 填充字符串到指定长度
     * @param {string} str 原字符串
     * @param {number} length 目标长度
     * @param {string} pad 填充字符（默认为空格）
     * @returns {string} 填充后的字符串
     */
    function padString(str, length, pad) {
        var result = safeString(str);
        var padChar = pad || " ";
        
        while (result.length < length) {
            result = padChar + result;
        }
        
        return result;
    }
    
    /**
     * 截断字符串到指定长度
     * @param {string} str 原字符串
     * @param {number} maxLength 最大长度
     * @param {string} suffix 截断后缀（默认为"..."）
     * @returns {string} 截断后的字符串
     */
    function truncateString(str, maxLength, suffix) {
        var result = safeString(str);
        var truncSuffix = suffix || "...";
        
        if (result.length <= maxLength) {
            return result;
        }
        
        return result.substring(0, maxLength - truncSuffix.length) + truncSuffix;
    }
    
    // -------------------------------------------------------------
    // 2. 时间处理工具
    // -------------------------------------------------------------
    
    /**
     * 格式化时间戳为可读字符串
     * @param {Date|number} timestamp 时间戳或Date对象
     * @returns {string} 格式化的时间字符串
     */
    function formatTimestamp(timestamp) {
        var date;
        
        if (timestamp instanceof Date) {
            date = timestamp;
        } else if (typeof timestamp === "number") {
            date = new Date(timestamp);
        } else {
            date = new Date();
        }
        
        try {
            var year = date.getFullYear();
            var month = padString(String(date.getMonth() + 1), 2, "0");
            var day = padString(String(date.getDate()), 2, "0");
            var hours = padString(String(date.getHours()), 2, "0");
            var minutes = padString(String(date.getMinutes()), 2, "0");
            var seconds = padString(String(date.getSeconds()), 2, "0");
            
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        } catch (e) {
            return "Invalid Date";
        }
    }
    
    /**
     * 获取当前时间戳
     * @returns {number} 当前时间戳（毫秒）
     */
    function getCurrentTime() {
        try {
            return new Date().getTime();
        } catch (e) {
            return 0;
        }
    }
    
    // -------------------------------------------------------------
    // 3. 验证工具
    // -------------------------------------------------------------
    
    /**
     * 验证参数是否为有效字符串
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为有效字符串
     */
    function isValidString(value) {
        return typeof value === "string" && value.length > 0;
    }
    
    /**
     * 验证参数是否为有效对象
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为有效对象
     */
    function isValidObject(value) {
        return value !== null && typeof value === "object";
    }
    
    /**
     * 验证参数是否为有效函数
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为有效函数
     */
    function isValidFunction(value) {
        return typeof value === "function";
    }
    
    /**
     * 验证参数是否为有效数字
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为有效数字
     */
    function isValidNumber(value) {
        return typeof value === "number" && !isNaN(value) && isFinite(value);
    }
    
    /**
     * 验证参数是否为正整数
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为正整数
     */
    function isPositiveInteger(value) {
        return isValidNumber(value) && value > 0 && Math.floor(value) === value;
    }
    
    /**
     * 验证参数是否为布尔值
     * @param {*} value 要验证的值
     * @returns {boolean} 是否为布尔值
     */
    function isValidBoolean(value) {
        return typeof value === "boolean";
    }
    
    // -------------------------------------------------------------
    // 4. 配置处理工具
    // -------------------------------------------------------------
    
    /**
     * 深度合并配置对象
     * @param {Object} target 目标对象
     * @param {Object} source 源对象
     * @returns {Object} 合并后的对象
     */
    function mergeConfig(target, source) {
        var result = {};
        var key;
        
        // 复制目标对象
        if (target && typeof target === "object") {
            for (key in target) {
                if (target.hasOwnProperty(key)) {
                    result[key] = target[key];
                }
            }
        }
        
        // 合并源对象
        if (source && typeof source === "object") {
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }
    
    /**
     * 验证配置对象
     * @param {Object} config 配置对象
     * @returns {Object} 验证结果 {valid: boolean, errors: Array}
     */
    function validateConfig(config) {
        var result = {
            valid: true,
            errors: []
        };
        
        if (!isValidObject(config)) {
            result.valid = false;
            result.errors.push("配置必须是对象");
            return result;
        }
        
        // 验证日志级别
        if (config.level !== undefined && !isValidNumber(config.level)) {
            result.valid = false;
            result.errors.push("日志级别必须是数字");
        }
        
        // 验证阈值
        if (config.threshold !== undefined && !isPositiveInteger(config.threshold)) {
            result.valid = false;
            result.errors.push("写入阈值必须是正整数");
        }
        
        // 验证启用状态
        if (config.enabled !== undefined && !isValidBoolean(config.enabled)) {
            result.valid = false;
            result.errors.push("启用状态必须是布尔值");
        }
        
        return result;
    }
    
    // -------------------------------------------------------------
    // 5. 日志处理工具
    // -------------------------------------------------------------
    
    /**
     * 估算日志条目大小（字节）
     * @param {Object} logEntry 日志条目
     * @returns {number} 估算大小
     */
    function estimateLogSize(logEntry) {
        if (!isValidObject(logEntry)) {
            return 0;
        }
        
        var size = 0;
        var key;
        
        for (key in logEntry) {
            if (logEntry.hasOwnProperty(key)) {
                size += safeString(logEntry[key]).length * 2; // 假设每个字符2字节
            }
        }
        
        return size;
    }
    
    /**
     * 验证日志条目
     * @param {Object} logEntry 日志条目
     * @returns {boolean} 是否有效
     */
    function validateLogEntry(logEntry) {
        if (!isValidObject(logEntry)) {
            return false;
        }
        
        // 检查必需字段
        var requiredFields = ["timestamp", "level", "message"];
        var i;
        
        for (i = 0; i < requiredFields.length; i++) {
            if (!logEntry.hasOwnProperty(requiredFields[i]) || 
                !isValidString(logEntry[requiredFields[i]])) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 清理日志条目（移除无效字段）
     * @param {Object} logEntry 日志条目
     * @returns {Object} 清理后的日志条目
     */
    function cleanLogEntry(logEntry) {
        if (!isValidObject(logEntry)) {
            return {};
        }
        
        var cleaned = {};
        var key;
        
        for (key in logEntry) {
            if (logEntry.hasOwnProperty(key)) {
                var value = logEntry[key];
                
                // 跳过undefined值
                if (value !== undefined) {
                    cleaned[key] = value;
                }
            }
        }
        
        return cleaned;
    }
    
    // -------------------------------------------------------------
    // 6. 错误处理工具
    // -------------------------------------------------------------
    
    /**
     * 安全执行函数
     * @param {Function} func 要执行的函数
     * @param {*} defaultValue 默认返回值
     * @returns {*} 执行结果或默认值
     */
    function safeExecute(func, defaultValue) {
        try {
            if (isValidFunction(func)) {
                return func();
            }
        } catch (e) {
            // 静默处理错误
        }
        
        return defaultValue;
    }
    
    /**
     * 创建错误信息对象
     * @param {number} code 错误代码
     * @param {string} message 错误消息
     * @param {*} details 错误详情
     * @returns {Object} 错误信息对象
     */
    function createError(code, message, details) {
        return {
            code: code || 0,
            message: message || "未知错误",
            details: details || null,
            timestamp: getCurrentTime()
        };
    }
    
    // -------------------------------------------------------------
    // 7. 数组处理工具
    // -------------------------------------------------------------
    
    /**
     * 安全的数组长度获取
     * @param {Array} array 数组
     * @returns {number} 数组长度
     */
    function safeArrayLength(array) {
        if (array && typeof array.length === "number") {
            return array.length;
        }
        return 0;
    }
    
    /**
     * 安全的数组元素访问
     * @param {Array} array 数组
     * @param {number} index 索引
     * @param {*} defaultValue 默认值
     * @returns {*} 数组元素或默认值
     */
    function safeArrayGet(array, index, defaultValue) {
        if (array && typeof array.length === "number" && 
            index >= 0 && index < array.length) {
            return array[index];
        }
        return defaultValue;
    }
    
    /**
     * 清空数组
     * @param {Array} array 数组
     * @returns {boolean} 是否成功
     */
    function clearArray(array) {
        try {
            if (array && typeof array.length === "number") {
                array.length = 0;
                return true;
            }
        } catch (e) {
            // 静默处理
        }
        return false;
    }
    
    // -------------------------------------------------------------
    // 8. 导出接口
    // -------------------------------------------------------------
    
    return {
        // 字符串处理工具
        simpleStringify: simpleStringify,
        safeString: safeString,
        padString: padString,
        truncateString: truncateString,
        
        // 时间处理工具
        formatTimestamp: formatTimestamp,
        getCurrentTime: getCurrentTime,
        
        // 验证工具
        isValidString: isValidString,
        isValidObject: isValidObject,
        isValidFunction: isValidFunction,
        isValidNumber: isValidNumber,
        isPositiveInteger: isPositiveInteger,
        isValidBoolean: isValidBoolean,
        
        // 配置处理工具
        mergeConfig: mergeConfig,
        validateConfig: validateConfig,
        
        // 日志处理工具
        estimateLogSize: estimateLogSize,
        validateLogEntry: validateLogEntry,
        cleanLogEntry: cleanLogEntry,
        
        // 错误处理工具
        safeExecute: safeExecute,
        createError: createError,
        
        // 数组处理工具
        safeArrayLength: safeArrayLength,
        safeArrayGet: safeArrayGet,
        clearArray: clearArray
    };
    
})();


// 加载模块: .._src_modules_logger_steps_step_format.js
/**
 * LoggerModule 日志格式化步骤
 * 
 * 负责日志条目格式化的步骤逻辑
 * ES3/JScript 5.8 兼容
 */

var StepFormat = (function(){
    
    // -------------------------------------------------------------
    // 1. 格式化配置
    // -------------------------------------------------------------
    
    /**
     * 默认格式化配置
     */
    var DEFAULT_FORMAT_CONFIG = {
        includeTimestamp: true,
        includeModuleName: true,
        includeFileName: true,
        includeFunctionName: true,
        includeContext: true,
        timestampFormat: "YYYY-MM-DD HH:mm:ss",
        levelPadding: 5,
        modulePadding: 15,
        filePadding: 20,
        functionPadding: 20,
        maxMessageLength: 200,
        maxContextLength: 500
    };
    
    // -------------------------------------------------------------
    // 2. 核心格式化函数
    // -------------------------------------------------------------
    
    /**
     * 格式化单个日志条目
     * @param {Object} logEntry 日志条目
     * @param {Object} config 格式化配置（可选）
     * @returns {string} 格式化后的日志字符串
     */
    function formatLogEntry(logEntry, config) {
        if (!logEntry || typeof logEntry !== "object") {
            return "[Invalid Log Entry]";
        }
        
        var formatConfig = mergeFormatConfig(DEFAULT_FORMAT_CONFIG, config);
        var parts = [];
        
        // 时间戳
        if (formatConfig.includeTimestamp && logEntry.timestamp) {
            parts.push("[" + formatTimestamp(logEntry.timestamp) + "]");
        }
        
        // 日志级别
        if (logEntry.level) {
            parts.push("[" + padString(logEntry.level, formatConfig.levelPadding) + "]");
        }
        
        // 模块名
        if (formatConfig.includeModuleName && logEntry.moduleName) {
            parts.push("[" + padString(truncateString(logEntry.moduleName, formatConfig.modulePadding), formatConfig.modulePadding) + "]");
        }
        
        // 文件名
        if (formatConfig.includeFileName && logEntry.fileName) {
            parts.push("[" + padString(truncateString(logEntry.fileName, formatConfig.filePadding), formatConfig.filePadding) + "]");
        }
        
        // 函数名
        if (formatConfig.includeFunctionName && logEntry.functionName) {
            parts.push("[" + padString(truncateString(logEntry.functionName, formatConfig.functionPadding), formatConfig.functionPadding) + "]");
        }
        
        // 消息
        var message = safeString(logEntry.message);
        if (message.length > formatConfig.maxMessageLength) {
            message = truncateString(message, formatConfig.maxMessageLength);
        }
        parts.push(message);
        
        // 上下文
        if (formatConfig.includeContext && logEntry.context) {
            var contextStr = formatContext(logEntry.context, formatConfig.maxContextLength);
            if (contextStr) {
                parts.push("| " + contextStr);
            }
        }
        
        return parts.join(" ");
    }
    
    /**
     * 格式化上下文信息
     * @param {*} context 上下文对象
     * @param {number} maxLength 最大长度
     * @returns {string} 格式化后的上下文字符串
     */
    function formatContext(context, maxLength) {
        if (context === null || context === undefined) {
            return "";
        }
        
        var contextStr;
        
        if (typeof context === "string") {
            contextStr = context;
        } else if (typeof context === "object") {
            contextStr = simpleStringify(context);
        } else {
            contextStr = String(context);
        }
        
        if (maxLength && contextStr.length > maxLength) {
            contextStr = truncateString(contextStr, maxLength);
        }
        
        return "ctx=" + contextStr;
    }
    
    /**
     * 批量格式化日志条目
     * @param {Array} logEntries 日志条目数组
     * @param {Object} config 格式化配置（可选）
     * @returns {Array} 格式化后的日志字符串数组
     */
    function formatLogEntries(logEntries, config) {
        if (!logEntries || typeof logEntries.length !== "number") {
            return [];
        }
        
        var formatted = [];
        var i;
        
        for (i = 0; i < logEntries.length; i++) {
            var entry = logEntries[i];
            var formattedEntry = formatLogEntry(entry, config);
            formatted.push(formattedEntry);
        }
        
        return formatted;
    }
    
    // -------------------------------------------------------------
    // 3. 特殊格式化函数
    // -------------------------------------------------------------
    
    /**
     * 格式化为JSON格式
     * @param {Object} logEntry 日志条目
     * @returns {string} JSON格式的日志字符串
     */
    function formatAsJson(logEntry) {
        if (!logEntry || typeof logEntry !== "object") {
            return "{\"error\":\"Invalid Log Entry\"}";
        }
        
        try {
            return simpleStringify(logEntry);
        } catch (e) {
            return "{\"error\":\"Format Error\"}";
        }
    }
    
    /**
     * 格式化为CSV格式
     * @param {Object} logEntry 日志条目
     * @returns {string} CSV格式的日志字符串
     */
    function formatAsCsv(logEntry) {
        if (!logEntry || typeof logEntry !== "object") {
            return "\"Invalid Log Entry\"";
        }
        
        var fields = [
            escapeCsvField(logEntry.timestamp || ""),
            escapeCsvField(logEntry.level || ""),
            escapeCsvField(logEntry.moduleName || ""),
            escapeCsvField(logEntry.fileName || ""),
            escapeCsvField(logEntry.functionName || ""),
            escapeCsvField(logEntry.message || ""),
            escapeCsvField(simpleStringify(logEntry.context))
        ];
        
        return fields.join(",");
    }
    
    /**
     * 格式化为简洁格式
     * @param {Object} logEntry 日志条目
     * @returns {string} 简洁格式的日志字符串
     */
    function formatAsCompact(logEntry) {
        if (!logEntry || typeof logEntry !== "object") {
            return "[Invalid]";
        }
        
        var parts = [];
        
        // 级别
        if (logEntry.level) {
            parts.push(logEntry.level.substring(0, 1));
        }
        
        // 消息
        if (logEntry.message) {
            parts.push(truncateString(logEntry.message, 100));
        }
        
        // 时间（简化）
        if (logEntry.timestamp) {
            var time = new Date(logEntry.timestamp);
            var timeStr = padString(String(time.getHours()), 2, "0") + ":" + 
                          padString(String(time.getMinutes()), 2, "0") + ":" + 
                          padString(String(time.getSeconds()), 2, "0");
            parts.push("(" + timeStr + ")");
        }
        
        return parts.join(" ");
    }
    
    // -------------------------------------------------------------
    // 4. 格式化工具函数
    // -------------------------------------------------------------
    
    /**
     * 合并格式化配置
     * @param {Object} defaultConfig 默认配置
     * @param {Object} userConfig 用户配置
     * @returns {Object} 合并后的配置
     */
    function mergeFormatConfig(defaultConfig, userConfig) {
        var result = {};
        var key;
        
        // 复制默认配置
        for (key in defaultConfig) {
            if (defaultConfig.hasOwnProperty(key)) {
                result[key] = defaultConfig[key];
            }
        }
        
        // 应用用户配置
        if (userConfig && typeof userConfig === "object") {
            for (key in userConfig) {
                if (userConfig.hasOwnProperty(key)) {
                    result[key] = userConfig[key];
                }
            }
        }
        
        return result;
    }
    
    /**
     * 转义CSV字段
     * @param {string} field 字段值
     * @returns {string} 转义后的字段值
     */
    function escapeCsvField(field) {
        var str = safeString(field);
        
        // 如果包含逗号、引号或换行符，需要用引号包围并转义内部引号
        if (str.indexOf(",") >= 0 || str.indexOf("\"") >= 0 || 
            str.indexOf("\n") >= 0 || str.indexOf("\r") >= 0) {
            str = str.replace(/"/g, "\"\"");
            str = "\"" + str + "\"";
        }
        
        return str;
    }
    
    /**
     * 格式化时间戳
     * @param {Date|number|string} timestamp 时间戳
     * @returns {string} 格式化的时间字符串
     */
    function formatTimestamp(timestamp) {
        try {
            var date;
            
            if (timestamp instanceof Date) {
                date = timestamp;
            } else if (typeof timestamp === "number") {
                date = new Date(timestamp);
            } else if (typeof timestamp === "string") {
                date = new Date(timestamp);
            } else {
                date = new Date();
            }
            
            var year = date.getFullYear();
            var month = padString(String(date.getMonth() + 1), 2, "0");
            var day = padString(String(date.getDate()), 2, "0");
            var hours = padString(String(date.getHours()), 2, "0");
            var minutes = padString(String(date.getMinutes()), 2, "0");
            var seconds = padString(String(date.getSeconds()), 2, "0");
            
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        } catch (e) {
            return "Invalid Date";
        }
    }
    
    /**
     * 填充字符串
     * @param {string} str 原字符串
     * @param {number} length 目标长度
     * @param {string} pad 填充字符
     * @returns {string} 填充后的字符串
     */
    function padString(str, length, pad) {
        var result = safeString(str);
        var padChar = pad || " ";
        
        while (result.length < length) {
            result = padChar + result;
        }
        
        return result;
    }
    
    /**
     * 截断字符串
     * @param {string} str 原字符串
     * @param {number} maxLength 最大长度
     * @param {string} suffix 截断后缀
     * @returns {string} 截断后的字符串
     */
    function truncateString(str, maxLength, suffix) {
        var result = safeString(str);
        var truncSuffix = suffix || "...";
        
        if (result.length <= maxLength) {
            return result;
        }
        
        return result.substring(0, maxLength - truncSuffix.length) + truncSuffix;
    }
    
    /**
     * 安全字符串转换
     * @param {*} value 要转换的值
     * @returns {string} 转换结果
     */
    function safeString(value) {
        try {
            if (value === null || value === undefined) {
                return "";
            }
            return String(value);
        } catch (e) {
            return "[Conversion Error]";
        }
    }
    
    /**
     * 简单的对象字符串化
     * @param {*} obj 要字符串化的对象
     * @returns {string} 字符串化结果
     */
    function simpleStringify(obj) {
        if (obj === null || obj === undefined) {
            return "null";
        }
        
        if (typeof obj === "string") {
            return "\"" + obj + "\"";
        }
        
        if (typeof obj === "number" || typeof obj === "boolean") {
            return String(obj);
        }
        
        if (typeof obj !== "object") {
            return String(obj);
        }
        
        // 对象处理
        var result = "{";
        var first = true;
        var key;
        
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!first) {
                    result += ", ";
                }
                result += key + ":" + simpleStringify(obj[key]);
                first = false;
            }
        }
        
        result += "}";
        return result;
    }
    
    // -------------------------------------------------------------
    // 5. 格式化器工厂
    // -------------------------------------------------------------
    
    /**
     * 创建格式化器
     * @param {string} type 格式化类型 ("standard", "json", "csv", "compact")
     * @param {Object} config 格式化配置
     * @returns {Function} 格式化函数
     */
    function createFormatter(type, config) {
        switch (type) {
            case "json":
                return function(logEntry) {
                    return formatAsJson(logEntry);
                };
            case "csv":
                return function(logEntry) {
                    return formatAsCsv(logEntry);
                };
            case "compact":
                return function(logEntry) {
                    return formatAsCompact(logEntry);
                };
            case "standard":
            default:
                return function(logEntry) {
                    return formatLogEntry(logEntry, config);
                };
        }
    }
    
    // -------------------------------------------------------------
    // 6. 导出接口
    // -------------------------------------------------------------
    
    return {
        // 核心格式化函数
        formatLogEntry: formatLogEntry,
        formatLogEntries: formatLogEntries,
        
        // 特殊格式化函数
        formatAsJson: formatAsJson,
        formatAsCsv: formatAsCsv,
        formatAsCompact: formatAsCompact,
        
        // 格式化器工厂
        createFormatter: createFormatter,
        
        // 配置
        DEFAULT_FORMAT_CONFIG: DEFAULT_FORMAT_CONFIG
    };
    
})();


// 加载模块: .._src_modules_logger_steps_step_write.js
/**
 * LoggerModule 日志写入步骤
 * 
 * 负责日志文件写入的步骤逻辑
 * ES3/JScript 5.8 兼容
 */

var StepWrite = (function(){
    
    // -------------------------------------------------------------
    // 1. 写入配置
    // -------------------------------------------------------------
    
    /**
     * 默认写入配置
     */
    var DEFAULT_WRITE_CONFIG = {
        // 文件配置 - 修复：使用绝对路径
        logDirectory: "D:\\!Work\\AD21_JS_Project\\logs",
        logFileName: "DefaultLogger",
        logFileExtension: ".log",
        maxFileSize: 1024 * 1024,        // 1MB
        maxFileCount: 10,                // 最多保留10个文件
        
        // 写入配置
        bufferSize: 8192,                // 8KB缓冲区
        flushInterval: 5000,             // 5秒自动刷新
        retryCount: 3,                   // 失败重试次数
        retryDelay: 1000,                // 重试延迟（毫秒）
        
        // 格式配置
        encoding: "UTF-8",               // 文件编码
        lineEnding: "\n",                 // 行结束符
        includeBom: false,               // 是否包含BOM
        
        // 安全配置
        backupOnWrite: true,            // 写入前备份
        validatePath: true,              // 验证路径
        atomicWrite: false               // 修复：暂时禁用原子写入，避免重命名问题
    };
    
    // -------------------------------------------------------------
    // 2. 写入状态管理
    // -------------------------------------------------------------
    
    /**
     * 写入状态对象
     */
    var writeState = {
        isWriting: false,
        lastWriteTime: 0,
        writeQueue: [],
        errorCount: 0,
        lastError: null,
        currentFile: null,
        fileHandle: null
    };
    
    // -------------------------------------------------------------
    // 3. 核心写入函数
    // -------------------------------------------------------------
    
    /**
     * 执行日志写入步骤
     * @param {Array} logEntries 日志条目数组
     * @param {string} moduleName 模块名称
     * @param {Object} config 写入配置（可选）
     * @returns {Object} 写入结果 {success: boolean, message: string, written: number}
     */
    function executeWriteStep(logEntries, moduleName, config) {
        var result = {
            success: false,
            message: "",
            written: 0,
            timestamp: getCurrentTime()
        };
        
        try {
            // 参数验证
            if (!logEntries || typeof logEntries.length !== "number") {
                result.message = "无效的日志条目数组";
                return result;
            }
            
            if (logEntries.length === 0) {
                result.success = true;
                result.message = "没有日志需要写入";
                return result;
            }
            
            var writeConfig = mergeWriteConfig(DEFAULT_WRITE_CONFIG, config);
            
            // 检查写入状态
            if (writeState.isWriting) {
                // 如果正在写入，加入队列
                writeState.writeQueue.push({
                    entries: logEntries,
                    moduleName: moduleName,
                    config: writeConfig,
                    timestamp: getCurrentTime()
                });
                result.success = true;
                result.message = "已加入写入队列";
                return result;
            }
            
            // 执行写入
            var writeResult = performWrite(logEntries, moduleName, writeConfig);
            
            result.success = writeResult.success;
            result.message = writeResult.message;
            result.written = writeResult.written;
            
            // 更新状态
            writeState.lastWriteTime = getCurrentTime();
            if (!writeResult.success) {
                writeState.errorCount++;
                writeState.lastError = writeResult.message;
            } else {
                writeState.errorCount = 0;
                writeState.lastError = null;
            }
            
            return result;
            
        } catch (e) {
            result.message = "写入步骤异常: " + e.message;
            writeState.errorCount++;
            writeState.lastError = e.message;
            return result;
        }
    }
    
    /**
     * 执行实际的写入操作
     * @param {Array} logEntries 日志条目数组
     * @param {string} moduleName 模块名称
     * @param {Object} config 写入配置
     * @returns {Object} 写入结果
     */
    function performWrite(logEntries, moduleName, config) {
        var result = {
            success: false,
            message: "",
            written: 0
        };
        
        writeState.isWriting = true;
        
        try {
            // 格式化日志条目
            var formattedLogs = formatLogEntriesForWrite(logEntries, config);
            
            // 生成文件路径
            var filePath = generateLogFilePath(moduleName, config);
            
            // 检查文件大小，必要时轮转
            if (config.maxFileSize > 0) {
                rotateLogFileIfNeeded(filePath, config);
            }
            
            // 写入文件
            var writeResult = writeToFile(formattedLogs, filePath, config);
            
            result.success = writeResult.success;
            result.message = writeResult.message;
            result.written = writeResult.written;
            
            return result;
            
        } catch (e) {
            result.message = "写入操作异常: " + e.message;
            return result;
        } finally {
            writeState.isWriting = false;
            
            // 处理队列中的写入请求
            processWriteQueue();
        }
    }
    
    /**
     * 格式化日志条目用于写入
     * @param {Array} logEntries 日志条目数组
     * @param {Object} config 写入配置
     * @returns {Array} 格式化后的日志字符串数组
     */
    function formatLogEntriesForWrite(logEntries, config) {
        var formatted = [];
        var i;
        
        for (i = 0; i < logEntries.length; i++) {
            var entry = logEntries[i];
            var formattedEntry;
            
            // 使用标准格式化
            if (typeof formatLogEntry !== "undefined") {
                formattedEntry = formatLogEntry(entry);
            } else {
                // 备用格式化
                formattedEntry = formatLogEntrySimple(entry);
            }
            
            formatted.push(formattedEntry);
        }
        
        return formatted;
    }
    
    /**
     * 简单的日志条目格式化（备用）
     * @param {Object} logEntry 日志条目
     * @returns {string} 格式化后的日志字符串
     */
    function formatLogEntrySimple(logEntry) {
        if (!logEntry || typeof logEntry !== "object") {
            return "[Invalid Log Entry]";
        }
        
        var parts = [];
        
        if (logEntry.timestamp) {
            parts.push("[" + formatTimestamp(logEntry.timestamp) + "]");
        }
        
        if (logEntry.level) {
            parts.push("[" + logEntry.level + "]");
        }
        
        if (logEntry.moduleName) {
            parts.push("[" + logEntry.moduleName + "]");
        }
        
        if (logEntry.fileName) {
            parts.push("[" + logEntry.fileName + "]");
        }
        
        if (logEntry.functionName) {
            parts.push("[" + logEntry.functionName + "]");
        }
        
        if (logEntry.message) {
            parts.push(logEntry.message);
        }
        
        if (logEntry.context) {
            parts.push("| " + simpleStringify(logEntry.context));
        }
        
        return parts.join(" ");
    }
    
    /**
     * 生成日志文件路径
     * @param {string} moduleName 模块名称
     * @param {Object} config 写入配置
     * @returns {string} 文件路径
     */
    function generateLogFilePath(moduleName, config) {
        var directory = config.logDirectory;
        var fileName = config.logFileName;
        var extension = config.logFileExtension;
        
        // 使用Windows路径分隔符
        directory = directory.replace(/\//g, "\\");
        
        // 如果指定了模块名，使用模块名作为文件名
        if (moduleName && moduleName !== "") {
            fileName = moduleName;
        }
        
        // 增强时间格式：年月日_时分秒_毫秒_随机数
        var now = new Date();
        var dateStr = now.getFullYear() + 
                     padString(String(now.getMonth() + 1), 2, "0") + 
                     padString(String(now.getDate()), 2, "0") + "_" +
                     padString(String(now.getHours()), 2, "0") +
                     padString(String(now.getMinutes()), 2, "0") +
                     padString(String(now.getSeconds()), 2, "0") + "_" +
                     padString(String(now.getMilliseconds()), 3, "0") + "_" +
                     padString(String(Math.floor(Math.random() * 10000)), 4, "0");
        
        return directory + "\\" + fileName + "_" + dateStr + extension;
    }
    
    /**
     * 检查并轮转日志文件
     * @param {string} filePath 文件路径
     * @param {Object} config 写入配置
     */
    function rotateLogFileIfNeeded(filePath, config) {
        try {
            var fileSize = getFileSize(filePath);
            
            if (fileSize > 0 && fileSize >= config.maxFileSize) {
                rotateLogFile(filePath, config);
            }
        } catch (e) {
            // 轮转失败不影响写入
        }
    }
    
    /**
     * 轮转日志文件
     * @param {string} filePath 文件路径
     * @param {Object} config 写入配置
     */
    function rotateLogFile(filePath, config) {
        var baseName = filePath.substring(0, filePath.lastIndexOf("."));
        var extension = filePath.substring(filePath.lastIndexOf("."));
        
        // 移动现有文件
        for (var i = config.maxFileCount - 1; i > 0; i--) {
            var oldFile = baseName + "." + i + extension;
            var newFile = baseName + "." + (i + 1) + extension;
            
            if (i === config.maxFileCount - 1) {
                // 删除最老的文件
                deleteFile(newFile);
            }
            
            renameFile(oldFile, newFile);
        }
        
        // 移动当前文件
        var firstBackup = baseName + ".1" + extension;
        renameFile(filePath, firstBackup);
    }
    
    /**
     * 写入文件
     * @param {Array} formattedLogs 格式化的日志数组
     * @param {string} filePath 文件路径
     * @param {Object} config 写入配置
     * @returns {Object} 写入结果
     */
    function writeToFile(formattedLogs, filePath, config) {
        var result = {
            success: false,
            message: "",
            written: 0
        };
        
        try {
            // 准备写入内容
            var content = formattedLogs.join(config.lineEnding);
            
            // 原子写入
            if (config.atomicWrite) {
                result = atomicWriteToFile(content, filePath, config);
            } else {
                result = directWriteToFile(content, filePath, config);
            }
            
            return result;
            
        } catch (e) {
            result.message = "文件写入异常: " + e.message;
            return result;
        }
    }
    
    /**
     * 原子写入文件
     * @param {string} content 写入内容
     * @param {string} filePath 目标文件路径
     * @param {Object} config 写入配置
     * @returns {Object} 写入结果
     */
    function atomicWriteToFile(content, filePath, config) {
        var result = {
            success: false,
            message: "",
            written: 0
        };
        
        try {
            // 创建临时文件
            var tempFilePath = filePath + ".tmp." + getCurrentTime();
            
            // 写入临时文件
            var tempResult = directWriteToFile(content, tempFilePath, config);
            if (!tempResult.success) {
                result.message = "临时文件写入失败: " + tempResult.message;
                return result;
            }
            
            // 重命名为目标文件
            if (renameFile(tempFilePath, filePath)) {
                result.success = true;
                result.message = "原子写入成功";
                result.written = content.length;
            } else {
                result.message = "文件重命名失败";
                // 清理临时文件
                deleteFile(tempFilePath);
            }
            
            return result;
            
        } catch (e) {
            result.message = "原子写入异常: " + e.message;
            return result;
        }
    }
    
    /**
     * 直接写入文件
     * @param {string} content 写入内容
     * @param {string} filePath 目标文件路径
     * @param {Object} config 写入配置
     * @returns {Object} 写入结果
     */
    function directWriteToFile(content, filePath, config) {
        var result = {
            success: false,
            message: "",
            written: 0
        };
        
        try {
            // 使用真实的文件系统写入
            var writeSuccess = writeToFileSystem(content, filePath, config);
            
            if (writeSuccess) {
                result.success = true;
                result.message = "文件写入成功: " + filePath;
                result.written = content.length;
            } else {
                result.message = "文件写入失败: " + filePath + " (请检查路径权限和磁盘空间)";
            }
            
            return result;
            
        } catch (e) {
            result.message = "直接写入异常: " + e.message + " (路径: " + filePath + ")";
            return result;
        }
    }
    
    // -------------------------------------------------------------
    // 4. 文件操作函数（真实实现）
    // -------------------------------------------------------------
    
    /**
     * 真实文件系统写入
     * @param {string} content 写入内容
     * @param {string} filePath 文件路径
     * @param {Object} config 写入配置
     * @returns {boolean} 是否成功
     */
    function writeToFileSystem(content, filePath, config) {
        try {
            // AD环境：使用ActiveXObject
            if (typeof ActiveXObject !== "undefined") {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                
                // 确保目录存在
                var pathParts = filePath.split("\\");
                var dirPath = "";
                for (var i = 0; i < pathParts.length - 1; i++) {
                    if (pathParts[i] !== "") {
                        dirPath += pathParts[i] + "\\";
                    }
                }
                
                if (dirPath !== "" && !fso.FolderExists(dirPath)) {
                    fso.CreateFolder(dirPath);
                }
                
                // 创建并写入文件
                var file = fso.CreateTextFile(filePath, true);
                file.Write(content);
                file.Close();
                
                return true;
            }
            // Node.js测试环境：使用fs模块
            else if (typeof require !== "undefined") {
                var fs = require("fs");
                var path = require("path");
                
                // 确保目录存在
                var dirPath = path.dirname(filePath);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }
                
                // 写入文件
                fs.writeFileSync(filePath, content, "utf8");
                return true;
            }
            // 其他环境：回退到模拟
            else {
                // 模拟写入延迟
                var startTime = getCurrentTime();
                while (getCurrentTime() - startTime < 10) {
                    // 等待10ms模拟写入时间
                }
                return true;
            }
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 获取文件大小
     * @param {string} filePath 文件路径
     * @returns {number} 文件大小（字节）
     */
    function getFileSize(filePath) {
        try {
            // AD环境：使用ActiveXObject
            if (typeof ActiveXObject !== "undefined") {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                if (!fso.FileExists(filePath)) {
                    return -1;
                }
                var file = fso.GetFile(filePath);
                return file.Size;
            }
            // Node.js测试环境：使用fs模块
            else if (typeof require !== "undefined") {
                var fs = require("fs");
                if (fs.existsSync(filePath)) {
                    var stats = fs.statSync(filePath);
                    return stats.size;
                }
                return -1;
            }
            // 其他环境：回退到模拟
            else {
                return Math.floor(Math.random() * 1024 * 1024); // 0-1MB
            }
        } catch (e) {
            return -1;
        }
    }
    
    /**
     * 重命名文件
     * @param {string} oldPath 原路径
     * @param {string} newPath 新路径
     * @returns {boolean} 是否成功
     */
    function renameFile(oldPath, newPath) {
        try {
            // AD环境：使用ActiveXObject
            if (typeof ActiveXObject !== "undefined") {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                if (fso.FileExists(oldPath)) {
                    fso.MoveFile(oldPath, newPath);
                    return true;
                }
                return false;
            }
            // Node.js测试环境：使用fs模块
            else if (typeof require !== "undefined") {
                var fs = require("fs");
                if (fs.existsSync(oldPath)) {
                    fs.renameSync(oldPath, newPath);
                    return true;
                }
                return false;
            }
            // 其他环境：回退到模拟
            else {
                return Math.random() > 0.1; // 90%成功率
            }
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 删除文件
     * @param {string} filePath 文件路径
     * @returns {boolean} 是否成功
     */
    function deleteFile(filePath) {
        try {
            // AD环境：使用ActiveXObject
            if (typeof ActiveXObject !== "undefined") {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                if (fso.FileExists(filePath)) {
                    fso.DeleteFile(filePath);
                    return true;
                }
                return false;
            }
            // Node.js测试环境：使用fs模块
            else if (typeof require !== "undefined") {
                var fs = require("fs");
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    return true;
                }
                return false;
            }
            // 其他环境：回退到模拟
            else {
                return Math.random() > 0.1; // 90%成功率
            }
        } catch (e) {
            return false;
        }
    }
    
    // -------------------------------------------------------------
    // 5. 队列处理
    // -------------------------------------------------------------
    
    /**
     * 处理写入队列
     */
    function processWriteQueue() {
        if (writeState.writeQueue.length === 0) {
            return;
        }
        
        if (writeState.isWriting) {
            return;
        }
        
        var queueItem = writeState.writeQueue.shift();
        if (queueItem) {
            performWrite(queueItem.entries, queueItem.moduleName, queueItem.config);
        }
    }
    
    /**
     * 清空写入队列
     */
    function clearWriteQueue() {
        writeState.writeQueue = [];
    }
    
    /**
     * 获取队列状态
     * @returns {Object} 队列状态信息
     */
    function getQueueStatus() {
        return {
            queueLength: writeState.writeQueue.length,
            isWriting: writeState.isWriting,
            lastWriteTime: writeState.lastWriteTime,
            errorCount: writeState.errorCount,
            lastError: writeState.lastError
        };
    }
    
    // -------------------------------------------------------------
    // 6. 工具函数
    // -------------------------------------------------------------
    
    /**
     * 合并写入配置
     * @param {Object} defaultConfig 默认配置
     * @param {Object} userConfig 用户配置
     * @returns {Object} 合并后的配置
     */
    function mergeWriteConfig(defaultConfig, userConfig) {
        var result = {};
        var key;
        
        // 复制默认配置
        for (key in defaultConfig) {
            if (defaultConfig.hasOwnProperty(key)) {
                result[key] = defaultConfig[key];
            }
        }
        
        // 应用用户配置
        if (userConfig && typeof userConfig === "object") {
            for (key in userConfig) {
                if (userConfig.hasOwnProperty(key)) {
                    result[key] = userConfig[key];
                }
            }
        }
        
        return result;
    }
    
    /**
     * 格式化时间戳
     * @param {Date|number} timestamp 时间戳
     * @returns {string} 格式化的时间字符串
     */
    function formatTimestamp(timestamp) {
        var date;
        
        if (timestamp instanceof Date) {
            date = timestamp;
        } else if (typeof timestamp === "number") {
            date = new Date(timestamp);
        } else {
            date = new Date();
        }
        
        try {
            var year = date.getFullYear();
            var month = padString(String(date.getMonth() + 1), 2, "0");
            var day = padString(String(date.getDate()), 2, "0");
            var hours = padString(String(date.getHours()), 2, "0");
            var minutes = padString(String(date.getMinutes()), 2, "0");
            var seconds = padString(String(date.getSeconds()), 2, "0");
            
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        } catch (e) {
            return "Invalid Date";
        }
    }
    
    /**
     * 填充字符串
     * @param {string} str 原字符串
     * @param {number} length 目标长度
     * @param {string} pad 填充字符
     * @returns {string} 填充后的字符串
     */
    function padString(str, length, pad) {
        var result = String(str || "");
        var padChar = pad || " ";
        
        while (result.length < length) {
            result = padChar + result;
        }
        
        return result;
    }
    
    /**
     * 获取当前时间戳
     * @returns {number} 当前时间戳（毫秒）
     */
    function getCurrentTime() {
        try {
            return new Date().getTime();
        } catch (e) {
            return 0;
        }
    }
    
    /**
     * 简单的对象字符串化
     * @param {*} obj 要字符串化的对象
     * @returns {string} 字符串化结果
     */
    function simpleStringify(obj) {
        if (obj === null || obj === undefined) {
            return "null";
        }
        
        if (typeof obj === "string") {
            return "\"" + obj + "\"";
        }
        
        if (typeof obj === "number" || typeof obj === "boolean") {
            return String(obj);
        }
        
        if (typeof obj !== "object") {
            return String(obj);
        }
        
        // 对象处理
        var result = "{";
        var first = true;
        var key;
        
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!first) {
                    result += ", ";
                }
                result += key + ":" + simpleStringify(obj[key]);
                first = false;
            }
        }
        
        result += "}";
        return result;
    }
    
    // -------------------------------------------------------------
    // 7. 导出接口
    // -------------------------------------------------------------
    
    return {
        // 核心写入函数
        executeWriteStep: executeWriteStep,
        
        // 队列管理
        getQueueStatus: getQueueStatus,
        clearWriteQueue: clearWriteQueue,
        
        // 配置
        DEFAULT_WRITE_CONFIG: DEFAULT_WRITE_CONFIG
    };
    
})();


// 加载模块: .._src_modules_logger_core.js
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
 * LoggerModule 核心逻辑
 * 
 * 继承BaseModule，实现所有核心逻辑和生命周期方法
 * ES3/JScript 5.8 兼容
 */

var LoggerModule = (function(){
    
    // -------------------------------------------------------------
    // 1. 依赖引用（直接使用，构建后自动可访问）
    // -------------------------------------------------------------
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    
    // -------------------------------------------------------------
    // 2. LoggerModule 核心实现
    // -------------------------------------------------------------
    
    /**
     * LoggerModule 默认配置
     */
    var _loggerDefaultConfig = {
        moduleName: "LoggerModule",
        autoInit: false,  // 改为false，在重写方法后再初始化
        autoTime: true,
        
        // 日志特定配置
        level: LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ALL : 15,
        threshold: 50,
        enabled: true,
        
        // 格式化配置
        includeTimestamp: true,
        includeModuleName: true,
        includeFileName: true,
        includeFunctionName: true,
        
        // 写入配置
        maxLogSize: 5120,
        maxCacheSize: 100,
        autoFlush: true,
        
        // 调试配置
        debugMode: false,
        captureEnabled: true
    };
    
    // ---------------------------------------------------------
    // 2.2 私有工具函数
    // ---------------------------------------------------------
    
    /**
     * 验证Logger实例
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否有效
     */
    function _isValidLoggerInstance(inst) {
        return inst && 
               inst.data && 
               inst.data.config && 
               inst.data.cache && 
               inst.data.stats;
    }
    
    /**
     * 检查日志级别是否启用
     * @param {Object} inst Logger实例
     * @param {number} level 日志级别
     * @returns {boolean} 是否启用
     */
    function _isLogLevelEnabled(inst, level) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        return isLevelEnabled && isLevelEnabled(inst.data.config.level, level);
    }
    
    /**
     * 创建日志条目
     * @param {Object} inst Logger实例
     * @param {number} level 日志级别
     * @param {string} message 日志消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     * @returns {Object} 日志条目
     */
    function _createLogEntry(inst, level, message, context, fileName, functionName) {
        var entry;
        
        if (createLogEntry) {
            entry = createLogEntry();
        } else {
            entry = {
                timestamp: "",
                level: "",
                message: "",
                moduleName: "",
                fileName: "",
                functionName: "",
                context: null
            };
        }
        
        // 设置基本信息
        entry.timestamp = getCurrentTime ? getCurrentTime() : new Date().getTime();
        entry.level = getLevelName ? getLevelName(level) : "UNKNOWN";
        entry.message = message || "";
        entry.moduleName = inst.data.config.moduleName || "LoggerModule";
        entry.fileName = fileName || "";
        entry.functionName = functionName || "";
        
        // 处理上下文
        if (context !== null && context !== undefined) {
            if (inst.data.config.captureEnabled && simpleStringify) {
                entry.context = simpleStringify(context);
            } else {
                entry.context = String(context);
            }
        }
        
        return entry;
    }
    
    /**
     * 添加日志到缓存
     * @param {Object} inst Logger实例
     * @param {Object} logEntry 日志条目
     * @returns {boolean} 是否成功
     */
    function _addToCache(inst, logEntry) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        try {
            // 验证日志条目
            if (validateLogEntry && !validateLogEntry(logEntry)) {
                logEntry = cleanLogEntry ? cleanLogEntry(logEntry) : logEntry;
            }
            
            // 检查缓存大小
            if (inst.data.cache.length >= inst.data.config.maxCacheSize) {
                // 自动flush
                _flushCache(inst);
            }
            
            // 添加到缓存
            inst.data.cache.push(logEntry);
            inst.data.lastLogTime = getCurrentTime ? getCurrentTime() : new Date().getTime();
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 更新统计信息
     * @param {Object} inst Logger实例
     * @param {number} level 日志级别
     */
    function _updateStats(inst, level) {
        if (!_isValidLoggerInstance(inst)) {
            return;
        }
        
        var stats = inst.data.stats;
        stats.totalLogs++;
        
        switch (level) {
            case LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ERROR : 1:
                stats.errorCount++;
                break;
            case LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.WARN : 2:
                stats.warnCount++;
                break;
            case LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.INFO : 4:
                stats.infoCount++;
                break;
            case LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.DEBUG : 8:
                stats.debugCount++;
                break;
        }
        
        stats.cacheSize = inst.data.cache.length;
    }
    
    /**
     * 检查写入阈值
     * @param {Object} inst Logger实例
     */
    function _checkThreshold(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return;
        }
        
        var config = inst.data.config;
        var cache = inst.data.cache;
        
        // 检查数量阈值
        if (cache.length >= config.threshold) {
            _flushCache(inst);
            return;
        }
        
        // 检查大小阈值
        if (estimateLogSize) {
            var totalSize = 0;
            var i;
            for (i = 0; i < cache.length; i++) {
                totalSize += estimateLogSize(cache[i]);
            }
            
            if (totalSize >= config.maxLogSize) {
                _flushCache(inst);
            }
        }
    }
    
    /**
     * 刷新缓存
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否成功
     */
    function _flushCache(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        var cache = inst.data.cache;
        if (cache.length === 0) {
            return true;
        }
        
        try {
            // 复制缓存并清空
            var logsToWrite = cache.slice();
            inst.data.cache = [];
            
            // 执行写入
            var writeResult;
            if (executeWriteStep) {
                writeResult = executeWriteStep(logsToWrite, inst.data.config.moduleName);
            } else {
                // 模拟写入成功
                writeResult = {success: true, message: "模拟写入", written: logsToWrite.length};
            }
            
            // 更新统计
            if (writeResult.success) {
                inst.data.stats.lastFlushTime = getCurrentTime ? getCurrentTime() : new Date().getTime();
                inst.data.stats.flushCount++;
            } else {
                inst.data.stats.errorFlushCount++;
                // 写入失败，恢复缓存
                for (var i = 0; i < logsToWrite.length; i++) {
                    inst.data.cache.push(logsToWrite[i]);
                }
            }
            
            return writeResult.success;
        } catch (e) {
            return false;
        }
    }
    
    // ---------------------------------------------------------
    // 2.3 重写BaseModule的内部方法
    // ---------------------------------------------------------
    
    /**
     * 执行Logger特定的初始化逻辑
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否成功
     */
    function _performInitialization(inst) {
        try {
            // 确保moduleName被正确保留
            var moduleName = inst.options && inst.options.moduleName ? inst.options.moduleName : _loggerDefaultConfig.moduleName;
            
            // 初始化Logger数据结构
            inst.data = {
                config: mergeConfig ? mergeConfig(_loggerDefaultConfig, inst.options) : _loggerDefaultConfig,
                cache: [],
                stats: createStats ? createStats() : {
                    totalLogs: 0,
                    errorCount: 0,
                    warnCount: 0,
                    infoCount: 0,
                    debugCount: 0,
                    cacheSize: 0,
                    lastFlushTime: 0,
                    flushCount: 0,
                    errorFlushCount: 0
                },
                initialized: true,
                lastLogTime: 0
            };
            
            // 强制确保moduleName正确设置
            inst.data.config.moduleName = moduleName;
            
            // 验证配置
            if (inst.data.config.level && !isValidLogLevel(inst.data.config.level)) {
                inst.data.config.level = LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ALL : 15;
            }
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 执行Logger的主要逻辑
     * @param {Object} inst Logger实例
     * @returns {Object} 执行结果
     */
    function _executeMainLogic(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return {
                success: false,
                message: "Logger实例无效",
                data: null
            };
        }
        
        try {
            // Logger的主要逻辑是处理日志记录
            // 这里可以执行一些维护任务，如自动flush等
            
            if (inst.data.config.autoFlush) {
                _checkThreshold(inst);
            }
            
            return {
                success: true,
                message: "Logger运行完成",
                data: {
                    cacheSize: inst.data.cache.length,
                    stats: inst.data.stats
                },
                time: inst.context ? inst.context.executionTime : 0
            };
        } catch (e) {
            return {
                success: false,
                message: "Logger运行异常: " + e.message,
                data: null
            };
        }
    }
    
    /**
     * 执行Logger的销毁逻辑
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否成功
     */
    function _performDestroy(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return true;
        }
        
        try {
            // 自动flush缓存
            _flushCache(inst);
            
            // 清空数据
            inst.data.cache = [];
            inst.data.stats = null;
            inst.data.config = null;
            inst.data.initialized = false;
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // ---------------------------------------------------------
    // 2.4 公共API实现
    // ---------------------------------------------------------
    
    /**
     * 记录错误日志
     * @param {Object} inst Logger实例
     * @param {string} message 错误消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function _error(inst, message, context, fileName, functionName) {
        // 性能优化：早期检查GlobalLogController生成级开关
        var globalController = GlobalLogController;
        
        var wasGenerated = false;
        var wasFiltered = false;
        var wasDisplayed = false;
        
        // 检查生成级开关
        if (globalController && typeof globalController.isGenerationEnabled === "function") {
            if (!globalController.isGenerationEnabled("error")) {
                wasFiltered = true;
                // 统一统计处理
                if (globalController && typeof globalController.processLogStats === "function") {
                    globalController.processLogStats("error", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
                }
                return;  // 早期返回，避免不必要的处理
            }
            wasGenerated = true;
        }
        
        if (!_isLogLevelEnabled(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ERROR : 1)) {
            wasFiltered = true;
            // 统一统计处理
            if (globalController && typeof globalController.processLogStats === "function") {
                globalController.processLogStats("error", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
            }
            return;
        }
        
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ERROR : 1, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
            wasDisplayed = true;
        }
        
        // 统一统计处理
        if (globalController && typeof globalController.processLogStats === "function") {
            globalController.processLogStats("error", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
        }
    }
    
    /**
     * 记录警告日志
     * @param {Object} inst Logger实例
     * @param {string} message 警告消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function _warn(inst, message, context, fileName, functionName) {
        // 性能优化：早期检查GlobalLogController生成级开关
        var globalController = GlobalLogController;
        
        var wasGenerated = false;
        var wasFiltered = false;
        var wasDisplayed = false;
        
        // 检查生成级开关
        if (globalController && typeof globalController.isGenerationEnabled === "function") {
            if (!globalController.isGenerationEnabled("warn")) {
                wasFiltered = true;
                // 统一统计处理
                if (globalController && typeof globalController.processLogStats === "function") {
                    globalController.processLogStats("warn", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
                }
                return;  // 早期返回，避免不必要的处理
            }
            wasGenerated = true;
        }
        
        if (!_isLogLevelEnabled(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.WARN : 2)) {
            wasFiltered = true;
            // 统一统计处理
            if (globalController && typeof globalController.processLogStats === "function") {
                globalController.processLogStats("warn", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
            }
            return;
        }
        
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.WARN : 2, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
            wasDisplayed = true;
        }
        
        // 统一统计处理
        if (globalController && typeof globalController.processLogStats === "function") {
            globalController.processLogStats("warn", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
        }
    }
    
    /**
     * 记录信息日志
     * @param {Object} inst Logger实例
     * @param {string} message 信息消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function _info(inst, message, context, fileName, functionName) {
        // 性能优化：早期检查GlobalLogController生成级开关
        var globalController = GlobalLogController;
        
        var wasGenerated = false;
        var wasFiltered = false;
        var wasDisplayed = false;
        
        // 检查生成级开关
        if (globalController && typeof globalController.isGenerationEnabled === "function") {
            if (!globalController.isGenerationEnabled("info")) {
                wasFiltered = true;
                // 统一统计处理
                if (globalController && typeof globalController.processLogStats === "function") {
                    globalController.processLogStats("info", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
                }
                return;  // 早期返回，避免不必要的处理
            }
            wasGenerated = true;
        }
        
        if (!_isLogLevelEnabled(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.INFO : 4)) {
            wasFiltered = true;
            // 统一统计处理
            if (globalController && typeof globalController.processLogStats === "function") {
                globalController.processLogStats("info", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
            }
            return;
        }
        
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.INFO : 4, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
            wasDisplayed = true;
        }
        
        // 统一统计处理
        if (globalController && typeof globalController.processLogStats === "function") {
            globalController.processLogStats("info", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
        }
    }
    
    /**
     * 记录调试日志
     * @param {Object} inst Logger实例
     * @param {string} message 调试消息
     * @param {*} context 上下文信息
     * @param {string} fileName 文件名
     * @param {string} functionName 函数名
     */
    function _debug(inst, message, context, fileName, functionName) {
        // 性能优化：早期检查GlobalLogController生成级开关
        var globalController = GlobalLogController;
        
        var wasGenerated = false;
        var wasFiltered = false;
        var wasDisplayed = false;
        
        // 检查生成级开关
        if (globalController && typeof globalController.isGenerationEnabled === "function") {
            if (!globalController.isGenerationEnabled("debug")) {
                wasFiltered = true;
                // 统一统计处理
                if (globalController && typeof globalController.processLogStats === "function") {
                    globalController.processLogStats("debug", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
                }
                return;  // 早期返回，避免不必要的处理
            }
            wasGenerated = true;
        }
        
        if (!_isLogLevelEnabled(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.DEBUG : 8)) {
            wasFiltered = true;
            // 统一统计处理
            if (globalController && typeof globalController.processLogStats === "function") {
                globalController.processLogStats("debug", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
            }
            return;
        }
        
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.DEBUG : 8, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
            wasDisplayed = true;
        }
        
        // 统一统计处理
        if (globalController && typeof globalController.processLogStats === "function") {
            globalController.processLogStats("debug", message, fileName, functionName, wasGenerated, wasFiltered, wasDisplayed);
        }
    }
    
    /**
     * 设置日志级别
     * @param {Object} inst Logger实例
     * @param {number} level 日志级别
     * @returns {boolean} 是否成功
     */
    function _setLevel(inst, level) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        if (!isValidLogLevel || !isValidLogLevel(level)) {
            return false;
        }
        
        var oldLevel = inst.data.config.level;
        inst.data.config.level = level;
        
        // 记录配置变更
        _info(inst, "日志级别变更: " + oldLevel + " -> " + level, null, "core.js", "setLevel");
        
        return true;
    }
    
    /**
     * 设置写入阈值
     * @param {Object} inst Logger实例
     * @param {number} threshold 阈值
     * @returns {boolean} 是否成功
     */
    function _setThreshold(inst, threshold) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        if (typeof threshold !== "number" || threshold <= 0) {
            return false;
        }
        
        var oldThreshold = inst.data.config.threshold;
        inst.data.config.threshold = threshold;
        
        // 检查是否需要立即写入
        if (inst.data.cache.length >= threshold) {
            _flushCache(inst);
        }
        
        // 记录配置变更
        _info(inst, "写入阈值变更: " + oldThreshold + " -> " + threshold, null, "core.js", "setThreshold");
        
        return true;
    }
    
    /**
     * 启用/禁用日志
     * @param {Object} inst Logger实例
     * @param {boolean} enabled 是否启用
     * @returns {boolean} 是否成功
     */
    function _setEnabled(inst, enabled) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        if (typeof enabled !== "boolean") {
            return false;
        }
        
        var oldState = inst.data.config.enabled;
        inst.data.config.enabled = enabled;
        
        // 记录状态变更
        _info(inst, "日志状态变更: " + oldState + " -> " + enabled, null, "core.js", "setEnabled");
        
        return true;
    }
    
    /**
     * 获取统计信息
     * @param {Object} inst Logger实例
     * @returns {Object} 统计信息
     */
    function _getStats(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return {};
        }
        
        var stats = {};
        var key;
        
        // 复制统计信息
        for (key in inst.data.stats) {
            if (inst.data.stats.hasOwnProperty(key)) {
                stats[key] = inst.data.stats[key];
            }
        }
        
        // 添加当前状态信息
        stats.cacheSize = inst.data.cache.length;
        stats.level = inst.data.config.level;
        stats.enabled = inst.data.config.enabled;
        stats.threshold = inst.data.config.threshold;
        
        // 添加moduleName属性
        stats.moduleName = inst.moduleName || inst.data.config.moduleName || "LoggerModule";
        
        // 添加级别描述
        if (typeof getLevelDescription !== "undefined") {
            stats.levelDescription = getLevelDescription(inst.data.config.level);
        } else if (typeof inst.getLevelName === "function") {
            stats.levelDescription = inst.getLevelName(inst.data.config.level);
        } else {
            // 使用内置级别映射
            var levelMap = {
                0: "TRACE",
                1: "DEBUG", 
                2: "INFO",
                3: "WARN",
                4: "ERROR",
                5: "FATAL"
            };
            stats.levelDescription = levelMap[inst.data.config.level] || "UNKNOWN";
        }
        
        return stats;
    }
    
    /**
     * 获取缓存数量
     * @param {Object} inst Logger实例
     * @returns {number} 缓存数量
     */
    function _getCount(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return 0;
        }
        
        return inst.data.cache.length;
    }
    
    /**
     * 强制写入缓存
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否成功
     */
    function _flush(inst) {
        return _flushCache(inst);
    }
    
    /**
     * 清空缓存
     * @param {Object} inst Logger实例
     * @returns {boolean} 是否成功
     */
    function _clear(inst) {
        if (!_isValidLoggerInstance(inst)) {
            return false;
        }
        
        var count = inst.data.cache.length;
        inst.data.cache = [];
        
        // 记录清空操作
        _info(inst, "清空日志缓存，数量: " + count, null, "core.js", "clear");
        
        return true;
    }
    
    // ---------------------------------------------------------
    // 2.5 创建Logger实例
    // ---------------------------------------------------------
    
    /**
     * 创建Logger实例
     * @param {Object} options 配置选项
     * @returns {Object} Logger实例
     */
    function create(options) {
        // 创建BaseModule实例
        var baseInst = BaseModule.create(options);
        
        // 重写内部方法
        baseInst._performInitialization = function() {
            return _performInitialization(baseInst);
        };
        
        baseInst._executeMainLogic = function() {
            return _executeMainLogic(baseInst);
        };
        
        baseInst._performDestroy = function() {
            return _performDestroy(baseInst);
        };
        
        // 如果用户要求autoInit，现在手动调用初始化
        if (options && options.autoInit) {
            // 先初始化Logger数据，再调用BaseModule的init
            _performInitialization(baseInst);
            baseInst.init();
        } else {
            // 即使没有autoInit，也要确保Logger数据被初始化
            _performInitialization(baseInst);
        }
        
        // 添加Logger特定的方法
        baseInst.error = function(message, context, fileName, functionName) {
            return _error(baseInst, message, context, fileName, functionName);
        };
        
        baseInst.warn = function(message, context, fileName, functionName) {
            return _warn(baseInst, message, context, fileName, functionName);
        };
        
        baseInst.info = function(message, context, fileName, functionName) {
            return _info(baseInst, message, context, fileName, functionName);
        };
        
        baseInst.debug = function(message, context, fileName, functionName) {
            return _debug(baseInst, message, context, fileName, functionName);
        };
        
        baseInst.setLevel = function(level) {
            return _setLevel(baseInst, level);
        };
        
        baseInst.setThreshold = function(threshold) {
            return _setThreshold(baseInst, threshold);
        };
        
        baseInst.setEnabled = function(enabled) {
            return _setEnabled(baseInst, enabled);
        };
        
        baseInst.getStats = function() {
            return _getStats(baseInst);
        };
        
        baseInst.getCount = function() {
            return _getCount(baseInst);
        };
        
        baseInst.flush = function() {
            return _flush(baseInst);
        };
        
        baseInst.clear = function() {
            return _clear(baseInst);
        };
        
        // 添加toJSON方法
        baseInst.toJSON = function() {
            if (!_isValidLoggerInstance(baseInst)) {
                return [];
            }
            
            var result = [];
            var i;
            for (i = 0; i < baseInst.data.cache.length; i++) {
                result.push(baseInst.data.cache[i]);
            }
            return result;
        };
        
        // 确保moduleName属性正确设置
        if (baseInst.data && baseInst.data.config && baseInst.data.config.moduleName) {
            baseInst.moduleName = baseInst.data.config.moduleName;
        } else if (options && options.moduleName) {
            baseInst.moduleName = options.moduleName;
        } else {
            baseInst.moduleName = "LoggerModule";
        }
        
        // 添加isHealthy方法
        baseInst.isHealthy = function() {
            return _isValidLoggerInstance(baseInst) && 
                   baseInst.data.config.enabled &&
                   baseInst.data.initialized;
        };
        
        return baseInst;
    }
    
    // ---------------------------------------------------------
    // 2.6 导出接口
    // ---------------------------------------------------------
    
    return {
        create: create
    };
    
})();

// 通过window导出，确保AD环境可访问
if (typeof window !== "undefined") {
    window.LoggerModule = LoggerModule;
}


// 加载模块: .._src_modules_logger_index.js
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
     * 创建默认Logger实例
     * @returns {Object} Logger实例
     */
    function _createDefaultInstance() {
        if (!_defaultInstance) {
            var options = {
                moduleName: _moduleConfig.defaultModuleName,
                autoInit: true,  // 让LoggerModule自己处理初始化
                level: 15,  // ALL
                threshold: 50,
                enabled: true
            };
            
            _defaultInstance = LoggerModule.create(options);
            
            // 存储到实例列表中
            _instances[_moduleConfig.defaultModuleName] = _defaultInstance;
        }
        
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
            return _createDefaultInstance();
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
        var instance = getDefaultLogger();
        if (instance && typeof instance.flush === "function") {
            return instance.flush();
        }
        return false;
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


// 加载模块: .._src_modules_object-module_index.js
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
            
            // 备用：直接访问（构建后自动可用）
            if (typeof eval('(typeof ' + moduleName + ' !== "undefined") ? ' + moduleName + ' : null') !== 'null') {
                return eval(moduleName);
            }
            
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


// 加载模块: .._src_modules_pcb-interfaces_index.js
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


// === 简化导出 ===
if (typeof module !== "undefined" && module.exports) {
    module.exports.BaseModule = BaseModule;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.LoggerTypes = LoggerTypes;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.LoggerTools = LoggerTools;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.StepFormat = StepFormat;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.StepWrite = StepWrite;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.LoggerModule = LoggerModule;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.LoggerModule = LoggerModule;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.ModuleName = ModuleName;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.ModuleName = ModuleName;
}

// === 测试代码 ===
function runAutoTest() {
    console.log("=== 自动生成的模块测试 ===");
    
    console.log("BaseModule 可用: " + (typeof BaseModule !== "undefined"));
    console.log("LoggerTypes 可用: " + (typeof LoggerTypes !== "undefined"));
    console.log("LoggerTools 可用: " + (typeof LoggerTools !== "undefined"));
    console.log("StepFormat 可用: " + (typeof StepFormat !== "undefined"));
    console.log("StepWrite 可用: " + (typeof StepWrite !== "undefined"));
    console.log("LoggerModule 可用: " + (typeof LoggerModule !== "undefined"));
    console.log("LoggerModule 可用: " + (typeof LoggerModule !== "undefined"));
    console.log("ModuleName 可用: " + (typeof ModuleName !== "undefined"));
    console.log("ModuleName 可用: " + (typeof ModuleName !== "undefined"));
    
    // 测试模块间调用
    try {
        if (BaseModule && LoggerTypes) {
            console.log("模块调用测试通过");
        } else {
            console.log("模块调用测试失败");
        }
    } catch (error) {
        console.log("测试错误: " + error.message);
    }
    
    console.log("=== 测试完成 ===");
}

// Node.js环境自动运行
if (typeof window === "undefined") {
    runAutoTest();
}