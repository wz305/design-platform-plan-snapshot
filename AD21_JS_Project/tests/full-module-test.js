/**
 * 自动生成的测试脚本
 * 
 * 模块加载顺序: .._src_modules_base_index.js -> .._src_modules_logger_types.js -> .._src_modules_logger_tools.js -> .._src_modules_logger_steps_step_format.js -> .._src_modules_logger_steps_step_write.js -> .._src_modules_logger_core.js -> .._src_modules_logger_index.js -> .._src_modules_pcb-interfaces_core_BasePCBWrapper.js -> .._src_modules_pcb-interfaces_core_PCBMockSystem.js -> .._src_modules_pcb-interfaces_core_PCBObjectFactory.js -> .._src_modules_pcb-interfaces_core_PCBObjectManager.js -> .._src_modules_pcb-interfaces_core_PCBObjectPool.js -> .._src_modules_pcb-interfaces_calculators_GeometryCalculator.js -> .._src_modules_pcb-interfaces_wrappers_ArcWrapper.js -> .._src_modules_pcb-interfaces_wrappers_PadWrapper.js -> .._src_modules_pcb-interfaces_wrappers_TrackWrapper.js -> .._src_modules_pcb-interfaces_wrappers_ViaWrapper.js -> .._src_modules_pcb-interfaces_index.js
 * 生成时间: 2025/12/14 15:58:37
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


// 加载模块: .._src_modules_pcb-interfaces_core_BasePCBWrapper.js
/**
 * BasePCBWrapper - PCB对象封装基类（双向绑定架构）
 * 提供属性缓存、Mock支持、生命周期管理、双向绑定
 * 100% 兼容 JScript 5.8 (ES3)
 */

var BasePCBWrapper = (function(){
    
    // 私有变量
    var _moduleVersion = "2.0.0";
    var _defaultOptions = {
        moduleName: "BasePCBWrapper",
        autoInit: false,
        autoTime: true,
        debugMode: false,
        enableCache: true,
        enableMock: false,
        enableDirectAccess: true,  // 启用直接访问原生对象
        syncMode: "auto"            // 同步模式: "auto", "manual", "realtime"
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
            onAfterDestroy: null,
            onBeforePropertyAccess: null,
            onAfterPropertyAccess: null,
            onBeforeSync: null,
            onAfterSync: null,
            onBeforeNativeAccess: null,
            onAfterNativeAccess: null
        };
    }
    
    function _createState() {
        return {
            initialized: false,
            running: false,
            destroyed: false,
            errorCount: 0,
            lastError: null,
            cacheHits: 0,
            cacheMisses: 0,
            syncCount: 0,
            nativeAccessCount: 0
        };
    }
    
    function _createContext() {
        return {
            startTime: null,
            endTime: null,
            executionTime: 0,
            lastSyncTime: null,
            creationTime: new Date()
        };
    }
    
    function _executeHook(hook, instance, data) {
        if (hook && typeof hook === "function") {
            try {
                return hook(instance, data);
            } catch (error) {
                // 记录Hook执行错误
                if (instance.logger && instance.logger.error) {
                    instance.logger.error("[BasePCBWrapper][index.js][_executeHook] Hook execution failed: " + error.message);
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
            message: "BasePCBWrapper executed successfully",
            data: null,
            time: inst.context.executionTime
        };
    }
    
    function _performDestroy(inst) {
        // 子模块重写此方法实现资源清理
        return true;
    }
    
    function _extractSpecificProperties(inst) {
        // 子模块重写此方法提取特定属性
        // 默认实现：提取基础属性
        if (inst.nativeObject) {
            inst.cachedProperties.ObjectId = inst.nativeObject.ObjectId;
            inst.cachedProperties.I_ObjectAddress = inst.nativeObject.I_ObjectAddress;
            inst.cachedProperties.V6_LayerID = inst.nativeObject.V6_LayerID;
            inst.cachedProperties.V7_LayerID = inst.nativeObject.V7_LayerID;
            inst.cachedProperties.LayerStack = inst.nativeObject.LayerStack;
        }
    }
    
    function _syncPropertiesToNative(inst) {
        // 子模块重写此方法同步属性到原生对象
        // 默认实现：同步基础属性
        if (inst.nativeObject && inst.isDirty) {
            // 这里可以添加基础属性同步逻辑
            inst.isDirty = false;
            return true;
        }
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
            
            // PCB对象特有属性
            nativeObject: options.nativeObject || null,  // AD原生对象引用
            cachedProperties: {},                        // 属性缓存
            isDirty: false,                             // 是否需要同步
            objectType: options.objectType || 'unknown', // 对象类型标识
            
            // Mock支持
            isMock: options.isMock || false,
            mockData: options.mockData || {},
            
            // 生命周期方法
            init: function() { return init(instance); },
            run: function() { return run(instance); },
            destroy: function() { return destroy(instance); },
            
            // 内部方法引用（子模块可重写）
            _performInitialization: function() { return _performInitialization(instance); },
            _executeMainLogic: function() { return _executeMainLogic(instance); },
            _performDestroy: function() { return _performDestroy(instance); },
            _extractSpecificProperties: function() { return _extractSpecificProperties(instance); },
            _syncPropertiesToNative: function() { return _syncPropertiesToNative(instance); },
            
            // 属性访问方法（双向绑定）
            getProperty: function(propertyName) { return getProperty(instance, propertyName); },
            setProperty: function(propertyName, value) { return setProperty(instance, propertyName, value); },
            hasProperty: function(propertyName) { return hasProperty(instance, propertyName); },
            getAllProperties: function() { return getAllProperties(instance); },
            
            // 直接访问原生对象方法
            getNativeProperty: function(propertyName) { return getNativeProperty(instance, propertyName); },
            setNativeProperty: function(propertyName, value) { return setNativeProperty(instance, propertyName, value); },
            callNativeMethod: function(methodName) { 
                var args = Array.prototype.slice.call(arguments, 1);
                return callNativeMethod.apply(null, [instance, methodName].concat(args)); 
            },
            
            // 缓存管理方法
            clearCache: function() { return clearCache(instance); },
            getCacheStats: function() { return getCacheStats(instance); },
            
            // 同步方法
            syncToNative: function() { return syncToNative(instance); },
            syncFromNative: function() { return syncFromNative(instance); },
            isSyncNeeded: function() { return isSyncNeeded(instance); },
            
            // 对象标识方法
            getObjectId: function() { return getObjectId(instance); },
            getObjectType: function() { return getObjectType(instance); },
            isMockObject: function() { return isMockObject(instance); },
            getNativeObject: function() { return getNativeObject(instance); },
            
            // Mock数据访问方法
            getMockData: function() { return getMockData(instance); },
            isMockMode: function() { return isMockMode(instance); },
            
            // 调试方法
            getDebugInfo: function() { return getDebugInfo(instance); },
            validateState: function() { return validateState(instance); }
        };
        
        // 创建日志记录器（延迟初始化，避免循环依赖）
        instance.logger = null;
        
        // 自动初始化
        if (options.autoInit) {
            init(instance);
        }
        
        return instance;
    }
    
    function init(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][init] Instance is required");
        }
        
        if (instance.state.initialized) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][init] Module already initialized");
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
            
            // 验证前置条件
            if (!instance.isMock && !instance.nativeObject) {
                throw new Error("[BasePCBWrapper][index.js][init] Native PCB object is required for non-mock objects");
            }
            
            // 执行具体初始化
            var initResult = instance._performInitialization();
            
            if (initResult) {
                // 一次性提取并缓存所有属性
                if (instance.options.enableCache) {
                    instance._extractSpecificProperties();
                }
                
                instance.state.initialized = true;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterInit, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BasePCBWrapper][index.js][init] Module initialized successfully: " + instance.options.moduleName + 
                                        ", Type: " + instance.objectType + 
                                        ", Mock: " + instance.isMock +
                                        ", DirectAccess: " + instance.options.enableDirectAccess);
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][init] Initialization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][init] Initialization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function run(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][run] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][run] Module not initialized");
        }
        
        if (instance.state.running) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][run] Module already running");
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
                instance.logger.info("[BasePCBWrapper][index.js][run] Module executed successfully: " + instance.options.moduleName + " (" + instance.context.executionTime + "ms)");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][run] Execution error: " + error.message);
            }
            
            throw error;
        } finally {
            instance.state.running = false;
        }
    }
    
    function destroy(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][destroy] Instance is required");
        }
        
        if (instance.state.destroyed) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][destroy] Module already destroyed");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeDestroy, instance);
            
            // 同步到原生对象（如果需要）
            if (instance.isSyncNeeded()) {
                instance.syncToNative();
            }
            
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
                instance.context.lastSyncTime = null;
                
                // 清理缓存
                instance.cachedProperties = {};
                
                // 清理Hook
                instance.hooks.onBeforeInit = null;
                instance.hooks.onAfterInit = null;
                instance.hooks.onBeforeRun = null;
                instance.hooks.onAfterRun = null;
                instance.hooks.onBeforeDestroy = null;
                instance.hooks.onAfterDestroy = null;
                instance.hooks.onBeforePropertyAccess = null;
                instance.hooks.onAfterPropertyAccess = null;
                instance.hooks.onBeforeSync = null;
                instance.hooks.onAfterSync = null;
                instance.hooks.onBeforeNativeAccess = null;
                instance.hooks.onAfterNativeAccess = null;
                
                // 清理原生对象引用
                instance.nativeObject = null;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterDestroy, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BasePCBWrapper][index.js][destroy] Module destroyed successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][destroy] Destruction failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][destroy] Destruction error: " + error.message);
            }
            
            throw error;
        }
    }
    
    // 属性访问方法（双向绑定）
    function getProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][getProperty] Module not initialized");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforePropertyAccess, instance, { propertyName: propertyName, operation: 'get' });
            
            var value;
            
            if (instance.options.enableCache && instance.cachedProperties.hasOwnProperty(propertyName)) {
                // 从缓存获取
                value = instance.cachedProperties[propertyName];
                instance.state.cacheHits++;
                
                if (instance.logger && instance.logger.debug) {
                    instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Cache hit for property: " + propertyName);
                }
            } else {
                // 从原生对象获取（如果不是Mock）
                if (!instance.isMock && instance.nativeObject && instance.nativeObject[propertyName] !== undefined) {
                    value = instance.nativeObject[propertyName];
                    
                    // 缓存属性值
                    if (instance.options.enableCache) {
                        instance.cachedProperties[propertyName] = value;
                    }
                    
                    instance.state.cacheMisses++;
                    
                    if (instance.logger && instance.logger.debug) {
                        instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Cache miss, fetched from native object: " + propertyName);
                    }
                } else if (instance.isMock && instance.mockData && instance.mockData[propertyName] !== undefined) {
                    // 从Mock数据获取
                    value = instance.mockData[propertyName];
                    
                    // 缓存属性值
                    if (instance.options.enableCache) {
                        instance.cachedProperties[propertyName] = value;
                    }
                    
                    instance.state.cacheMisses++;
                    
                    if (instance.logger && instance.logger.debug) {
                        instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Mock data for property: " + propertyName);
                    }
                } else {
                    // 属性不存在
                    value = undefined;
                }
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterPropertyAccess, instance, { propertyName: propertyName, operation: 'get', value: value });
            
            return value;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][getProperty] Error getting property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function setProperty(instance, propertyName, value) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][setProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][setProperty] Module not initialized");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforePropertyAccess, instance, { propertyName: propertyName, operation: 'set', value: value });
            
            // 设置缓存值
            if (instance.options.enableCache) {
                instance.cachedProperties[propertyName] = value;
            }
            
            // 根据同步模式处理
            if (instance.options.syncMode === "realtime" && !instance.isMock && instance.nativeObject) {
                // 实时同步：直接设置到原生对象
                instance.nativeObject[propertyName] = value;
            } else {
                // 标记为需要同步
                instance.isDirty = true;
            }
            
            // 如果是Mock对象，同时更新Mock数据
            if (instance.isMock) {
                if (!instance.mockData) {
                    instance.mockData = {};
                }
                instance.mockData[propertyName] = value;
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterPropertyAccess, instance, { propertyName: propertyName, operation: 'set', value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][setProperty] Property set: " + propertyName + " = " + JSON.stringify(value) + 
                                    ", SyncMode: " + instance.options.syncMode);
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][setProperty] Error setting property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    // 直接访问原生对象方法
    function getNativeProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Native object not available");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { propertyName: propertyName, operation: 'get' });
            
            var value = instance.nativeObject[propertyName];
            instance.state.nativeAccessCount++;
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { propertyName: propertyName, operation: 'get', value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][getNativeProperty] Direct native access: " + propertyName);
            }
            
            return value;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][getNativeProperty] Error accessing native property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function setNativeProperty(instance, propertyName, value) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Native object not available");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { propertyName: propertyName, operation: 'set', value: value });
            
            instance.nativeObject[propertyName] = value;
            instance.state.nativeAccessCount++;
            
            // 更新缓存
            if (instance.options.enableCache) {
                instance.cachedProperties[propertyName] = value;
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { propertyName: propertyName, operation: 'set', value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][setNativeProperty] Direct native modification: " + propertyName + " = " + JSON.stringify(value));
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][setNativeProperty] Error setting native property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function callNativeMethod(instance, methodName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Native object not available");
        }
        
        if (!instance.nativeObject[methodName] || typeof instance.nativeObject[methodName] !== "function") {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Method '" + methodName + "' not found or not a function");
        }
        
        try {
            // 执行Before Hook
            var args = Array.prototype.slice.call(arguments, 2);
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { methodName: methodName, operation: 'call', args: args });
            
            var result = instance.nativeObject[methodName].apply(instance.nativeObject, args);
            instance.state.nativeAccessCount++;
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { methodName: methodName, operation: 'call', result: result });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][callNativeMethod] Direct native method call: " + methodName + "(" + JSON.stringify(args) + ")");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][callNativeMethod] Error calling native method '" + methodName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function hasProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][hasProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][hasProperty] Module not initialized");
        }
        
        // 检查缓存
        if (instance.options.enableCache && instance.cachedProperties.hasOwnProperty(propertyName)) {
            return true;
        }
        
        // 检查原生对象
        if (!instance.isMock && instance.nativeObject && instance.nativeObject[propertyName] !== undefined) {
            return true;
        }
        
        // 检查Mock数据
        if (instance.isMock && instance.mockData && instance.mockData[propertyName] !== undefined) {
            return true;
        }
        
        return false;
    }
    
    function getAllProperties(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getAllProperties] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][getAllProperties] Module not initialized");
        }
        
        return instance.cachedProperties;
    }
    
    // 缓存管理方法
    function clearCache(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][clearCache] Instance is required");
        }
        
        instance.cachedProperties = {};
        instance.state.cacheHits = 0;
        instance.state.cacheMisses = 0;
        
        if (instance.logger && instance.logger.info) {
            instance.logger.info("[BasePCBWrapper][index.js][clearCache] Cache cleared");
        }
        
        return true;
    }
    
    function getCacheStats(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getCacheStats] Instance is required");
        }
        
        var total = instance.state.cacheHits + instance.state.cacheMisses;
        var hitRate = total > 0 ? (instance.state.cacheHits / total * 100).toFixed(2) : 0;
        
        return {
            hits: instance.state.cacheHits,
            misses: instance.state.cacheMisses,
            total: total,
            hitRate: parseFloat(hitRate),
            cacheSize: Object.keys(instance.cachedProperties).length
        };
    }
    
    // 同步方法
    function syncToNative(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][syncToNative] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][syncToNative] Module not initialized");
        }
        
        if (instance.isMock || !instance.nativeObject || !instance.isDirty) {
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeSync, instance);
            
            // 执行具体同步逻辑
            var syncResult = instance._syncPropertiesToNative();
            
            if (syncResult) {
                instance.isDirty = false;
                instance.state.syncCount++;
                instance.context.lastSyncTime = new Date();
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterSync, instance);
                
                if (instance.logger && instance.logger.debug) {
                    instance.logger.debug("[BasePCBWrapper][index.js][syncToNative] Properties synchronized to native object");
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][syncToNative] Synchronization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][syncToNative] Synchronization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function syncFromNative(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][syncFromNative] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][syncFromNative] Module not initialized");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeSync, instance);
            
            // 重新提取属性
            instance._extractSpecificProperties();
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterSync, instance);
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][syncFromNative] Properties synchronized from native object");
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][syncFromNative] Synchronization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function isSyncNeeded(instance) {
        if (!instance) {
            return false;
        }
        
        return !instance.isMock && instance.nativeObject && instance.isDirty;
    }
    
    // 对象标识方法
    function getObjectId(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.getProperty('ObjectId');
    }
    
    function getObjectType(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.objectType;
    }
    
    function isMockObject(instance) {
        if (!instance) {
            return false;
        }
        
        return instance.isMock;
    }
    
    function getNativeObject(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.nativeObject;
    }
    
    // Mock数据访问方法
    function getMockData(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.mockData || {};
    }
    
    function isMockMode(instance) {
        if (!instance) {
            return false;
        }
        
        return instance.isMock;
    }
    
    // 调试方法
    function getDebugInfo(instance) {
        if (!instance) {
            return null;
        }
        
        return {
            moduleName: instance.options.moduleName,
            objectType: instance.objectType,
            isMock: instance.isMock,
            isInitialized: instance.state.initialized,
            isRunning: instance.state.running,
            isDestroyed: instance.state.destroyed,
            isDirty: instance.isDirty,
            errorCount: instance.state.errorCount,
            lastError: instance.state.lastError ? instance.state.lastError.message : null,
            cacheStats: getCacheStats(instance),
            syncCount: instance.state.syncCount,
            nativeAccessCount: instance.state.nativeAccessCount,
            creationTime: instance.context.creationTime,
            lastSyncTime: instance.context.lastSyncTime,
            executionTime: instance.context.executionTime,
            syncMode: instance.options.syncMode,
            enableDirectAccess: instance.options.enableDirectAccess
        };
    }
    
    function validateState(instance) {
        if (!instance) {
            return { valid: false, errors: ["Instance is null"] };
        }
        
        var errors = [];
        
        if (!instance.state.initialized) {
            errors.push("Module not initialized");
        }
        
        if (instance.state.destroyed) {
            errors.push("Module is destroyed");
        }
        
        if (!instance.isMock && !instance.nativeObject) {
            errors.push("Native object is required for non-mock objects");
        }
        
        if (instance.state.errorCount > 10) {
            errors.push("Too many errors: " + instance.state.errorCount);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
    
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

// AD环境兼容性导出
if (typeof window !== "undefined") {
    window.BasePCBWrapper = BasePCBWrapper;
}


// 加载模块: .._src_modules_pcb-interfaces_core_PCBMockSystem.js
/**
 * PCBMockSystem - PCB对象Mock系统
 * 提供完整的Mock对象创建和管理功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBMockSystem = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _mockObjects = {};
    var _mockDataTemplates = {};
    var _objectIdCounter = 1000;
    
    // 私有工具函数
    function _generateMockId() {
        _objectIdCounter++;
        return "MOCK_" + _objectIdCounter;
    }
    
    function _mergeMockData(templateData, userData) {
        var result = {};
        var key;
        
        // 复制模板数据
        if (templateData) {
            for (key in templateData) {
                if (templateData.hasOwnProperty(key)) {
                    result[key] = templateData[key];
                }
            }
        }
        
        // 覆盖用户数据
        if (userData) {
            for (key in userData) {
                if (userData.hasOwnProperty(key)) {
                    result[key] = userData[key];
                }
            }
        }
        
        return result;
    }
    
    function _createMockLogger() {
        return {
            debug: function(message) {
                // Mock环境下的简单日志输出
                try {
                    if (typeof console !== "undefined" && console.log) {
                        console.log("[MOCK] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            info: function(message) {
                try {
                    if (typeof console !== "undefined" && console.log) {
                        console.log("[MOCK INFO] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            warn: function(message) {
                try {
                    if (typeof console !== "undefined" && console.warn) {
                        console.warn("[MOCK WARN] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            error: function(message) {
                try {
                    if (typeof console !== "undefined" && console.error) {
                        console.error("[MOCK ERROR] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            }
        };
    }
    
    // 初始化Mock数据模板
    function _initializeMockDataTemplates() {
        // Arc对象模板
        _mockDataTemplates.Arc = {
            ObjectId: eArcObject,
            I_ObjectAddress: "MOCK_ARC_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X1: 0,
            Y1: 0,
            X2: 1000,
            Y2: 1000,
            Radius: 500,
            StartAngle: 0,
            EndAngle: 90,
            LineWidth: 100,
            Color: 0xFF0000
        };
        
        // Pad对象模板
        _mockDataTemplates.Pad = {
            ObjectId: ePadObject,
            I_ObjectAddress: "MOCK_PAD_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X: 0,
            Y: 0,
            Size: { X: 1000, Y: 1000 },
            HoleSize: { X: 500, Y: 500 },
            TopShape: eRounded,
            MidShape: eRounded,
            BottomShape: eRounded,
            DrillShape: eRounded,
            TopX: 1000,
            TopY: 1000,
            MidX: 1000,
            MidY: 1000,
            BottomX: 1000,
            BottomY: 1000,
            HoleX: 500,
            HoleY: 500,
            Rotation: 0,
            Plated: true,
            Name: "MockPad",
            Designator: "P1"
        };
        
        // Track对象模板
        _mockDataTemplates.Track = {
            ObjectId: eTrackObject,
            I_ObjectAddress: "MOCK_TRACK_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X1: 0,
            Y1: 0,
            X2: 5000,
            Y2: 0,
            Width: 100,
            Net: null,
            StartShape: eRound,
            EndShape: eRound
        };
        
        // Via对象模板
        _mockDataTemplates.Via = {
            ObjectId: eViaObject,
            I_ObjectAddress: "MOCK_VIA_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X: 0,
            Y: 0,
            Size: 1000,
            HoleSize: 500,
            HighLayer: eBottomLayer,
            LowLayer: eTopLayer,
            Net: null,
            Plated: true
        };
        
        // BoardOutline对象模板
        _mockDataTemplates.BoardOutline = {
            ObjectId: eBoardOutlineObject,
            I_ObjectAddress: "MOCK_BOARDOUTLINE_ADDRESS",
            V6_LayerID: eMechanicalLayer1,
            V7_LayerID: eMechanicalLayer1,
            LayerStack: null,
            Width: 1000,
            Closed: true
        };
        
        // SignalLayer对象模板
        _mockDataTemplates.SignalLayer = {
            ObjectId: eSignalLayerObject,
            I_ObjectAddress: "MOCK_SIGNALLAYER_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            Name: "Top Layer",
            UsedByPrims: true,
            CopperThickness: 1750,
            ComponentPlacement: true
        };
        
        // MechanicalLayer对象模板
        _mockDataTemplates.MechanicalLayer = {
            ObjectId: eMechanicalLayerObject,
            I_ObjectAddress: "MOCK_MECHLAYER_ADDRESS",
            V6_LayerID: eMechanicalLayer1,
            V7_LayerID: eMechanicalLayer1,
            LayerStack: null,
            Name: "Mechanical Layer 1",
            UsedByPrims: false,
            MechanicalLayerEnabled: true,
            DisplayInSingleLayerMode: true,
            LinkToSheet: false
        };
        
        // DielectricLayer对象模板
        _mockDataTemplates.DielectricLayer = {
            ObjectId: eDielectricLayerObject,
            I_ObjectAddress: "MOCK_DIELECTRIC_ADDRESS",
            V6_LayerID: eDielectricLayer1,
            V7_LayerID: eDielectricLayer1,
            LayerStack: null,
            Name: "Dielectric Layer 1",
            UsedByPrims: false,
            DielectricMaterial: "FR-4",
            DielectricType: eCore,
            DielectricConstant: 4.5,
            DielectricHeight: 1600
        };
        
        // InternalPlane对象模板
        _mockDataTemplates.InternalPlane = {
            ObjectId: eInternalPlaneObject,
            I_ObjectAddress: "MOCK_INTERNALPLANE_ADDRESS",
            V6_LayerID: eInternalPlane1,
            V7_LayerID: eInternalPlane1,
            LayerStack: null,
            Name: "Internal Plane 1",
            UsedByPrims: true,
            CopperThickness: 1750,
            PullBackDistance: 2000,
            NetName: "GND"
        };
    }
    
    // 公有API函数
    function createMockObject(objectType, mockData) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][createMockObject] START - Creating mock object of type: " + objectType + 
                   ", mockData: " + JSON.stringify(mockData));
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            // 获取模板数据
            var templateData = _mockDataTemplates[objectType];
            if (!templateData) {
                throw new Error("[PCBMockSystem][index.js][createMockObject] Unknown object type: " + objectType);
            }
            
            // 合并模板数据和用户数据
            var mergedData = _mergeMockData(templateData, mockData);
            
            // 创建Mock对象
            var mockObject = {
                // 基础属性
                _mockId: _generateMockId(),
                _mockType: objectType,
                _mockData: mergedData,
                
                // 动态属性访问
                GetProperty: function(propertyName) {
                    return this._mockData[propertyName];
                },
                
                SetProperty: function(propertyName, value) {
                    this._mockData[propertyName] = value;
                },
                
                // 模拟AD对象接口
                toString: function() {
                    return "[Mock " + this._mockType + " Object]";
                }
            };
            
            // 动态添加所有属性
            var key;
            for (key in mergedData) {
                if (mergedData.hasOwnProperty(key)) {
                    (function(propName) {
                        Object.defineProperty(mockObject, propName, {
                            get: function() {
                                return mockObject._mockData[propName];
                            },
                            set: function(value) {
                                mockObject._mockData[propName] = value;
                            },
                            enumerable: true,
                            configurable: true
                        });
                    })(key);
                }
            }
            
            // 存储Mock对象
            _mockObjects[mockObject._mockId] = mockObject;
            
            logger.debug("[PCBMockSystem][index.js][createMockObject] SUCCESS - Mock object created with ID: " + mockObject._mockId);
            
            return mockObject;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][createMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockObject(mockId) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockObject] START - Getting mock object with ID: " + mockId);
        
        try {
            var mockObject = _mockObjects[mockId];
            
            if (!mockObject) {
                logger.warn("[PCBMockSystem][index.js][getMockObject] Mock object not found: " + mockId);
                return null;
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockObject] SUCCESS - Mock object found: " + mockObject._mockType);
            
            return mockObject;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function removeMockObject(mockId) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][removeMockObject] START - Removing mock object with ID: " + mockId);
        
        try {
            var mockObject = _mockObjects[mockId];
            
            if (!mockObject) {
                logger.warn("[PCBMockSystem][index.js][removeMockObject] Mock object not found: " + mockId);
                return false;
            }
            
            delete _mockObjects[mockId];
            
            logger.debug("[PCBMockSystem][index.js][removeMockObject] SUCCESS - Mock object removed: " + mockObject._mockType);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][removeMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getAllMockObjects() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getAllMockObjects] START - Getting all mock objects");
        
        try {
            var result = [];
            var key;
            
            for (key in _mockObjects) {
                if (_mockObjects.hasOwnProperty(key)) {
                    result.push(_mockObjects[key]);
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getAllMockObjects] SUCCESS - Found " + result.length + " mock objects");
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getAllMockObjects] ERROR - " + error.message);
            throw error;
        }
    }
    
    function clearAllMockObjects() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][clearAllMockObjects] START - Clearing all mock objects");
        
        try {
            var count = Object.keys(_mockObjects).length;
            _mockObjects = {};
            
            logger.debug("[PCBMockSystem][index.js][clearAllMockObjects] SUCCESS - Cleared " + count + " mock objects");
            
            return count;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][clearAllMockObjects] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockDataTemplate(objectType) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockDataTemplate] START - Getting template for object type: " + objectType);
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            var template = _mockDataTemplates[objectType];
            
            if (!template) {
                logger.warn("[PCBMockSystem][index.js][getMockDataTemplate] Template not found for object type: " + objectType);
                return null;
            }
            
            // 返回模板的副本
            var result = {};
            var key;
            for (key in template) {
                if (template.hasOwnProperty(key)) {
                    result[key] = template[key];
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockDataTemplate] SUCCESS - Template retrieved for: " + objectType);
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockDataTemplate] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getAllMockDataTemplates() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getAllMockDataTemplates] START - Getting all mock data templates");
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            var result = {};
            var key;
            
            for (key in _mockDataTemplates) {
                if (_mockDataTemplates.hasOwnProperty(key)) {
                    result[key] = {};
                    var subKey;
                    for (subKey in _mockDataTemplates[key]) {
                        if (_mockDataTemplates[key].hasOwnProperty(subKey)) {
                            result[key][subKey] = _mockDataTemplates[key][subKey];
                        }
                    }
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getAllMockDataTemplates] SUCCESS - Retrieved " + Object.keys(result).length + " templates");
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getAllMockDataTemplates] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockObjectId(objectType) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockObjectId] START - Getting object ID for type: " + objectType);
        
        try {
            var objectIds = {
                'Arc': eArcObject,
                'Pad': ePadObject,
                'Track': eTrackObject,
                'Via': eViaObject,
                'BoardOutline': eBoardOutlineObject,
                'SignalLayer': eSignalLayerObject,
                'MechanicalLayer': eMechanicalLayerObject,
                'DielectricLayer': eDielectricLayerObject,
                'InternalPlane': eInternalPlaneObject
            };
            
            var objectId = objectIds[objectType];
            
            if (objectId === undefined) {
                logger.warn("[PCBMockSystem][index.js][getMockObjectId] Unknown object type: " + objectType);
                return eNoObject;
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockObjectId] SUCCESS - Object ID: " + objectId);
            
            return objectId;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockObjectId] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockStatistics() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockStatistics] START - Getting mock system statistics");
        
        try {
            var stats = {
                totalMockObjects: Object.keys(_mockObjects).length,
                totalTemplates: Object.keys(_mockDataTemplates).length,
                objectIdCounter: _objectIdCounter,
                mockObjectsByType: {}
            };
            
            // 统计各类型的Mock对象数量
            var key;
            for (key in _mockObjects) {
                if (_mockObjects.hasOwnProperty(key)) {
                    var mockObject = _mockObjects[key];
                    var type = mockObject._mockType;
                    
                    if (!stats.mockObjectsByType[type]) {
                        stats.mockObjectsByType[type] = 0;
                    }
                    stats.mockObjectsByType[type]++;
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockStatistics] SUCCESS - Statistics: " + JSON.stringify(stats));
            
            return stats;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    // 初始化模块
    function initialize() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][initialize] START - Initializing PCB Mock System");
        
        try {
            _initializeMockDataTemplates();
            
            logger.debug("[PCBMockSystem][index.js][initialize] SUCCESS - PCB Mock System initialized with " + 
                       Object.keys(_mockDataTemplates).length + " templates");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    return {
        // Mock对象创建和管理
        createMockObject: createMockObject,
        getMockObject: getMockObject,
        removeMockObject: removeMockObject,
        getAllMockObjects: getAllMockObjects,
        clearAllMockObjects: clearAllMockObjects,
        
        // Mock数据模板
        getMockDataTemplate: getMockDataTemplate,
        getAllMockDataTemplates: getAllMockDataTemplates,
        getMockObjectId: getMockObjectId,
        
        // 统计和工具
        getMockStatistics: getMockStatistics,
        initialize: initialize,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 加载模块: .._src_modules_pcb-interfaces_core_PCBObjectFactory.js
/**
 * PCBObjectFactory - PCB对象工厂
 * 提供统一的对象创建和类型识别功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectFactory = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _wrapperConstructors = {};
    var _objectTypeMapping = {};
    var _factoryStats = {
        totalCreated: 0,
        createdByType: {},
        lastCreatedTime: null
    };
    
    // 私有工具函数
    function _createFactoryLogger() {
        return {
            debug: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.debug) {
                        logger.debug("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            info: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.info) {
                        logger.info("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            warn: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.warn) {
                        logger.warn("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            error: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.error) {
                        logger.error("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            }
        };
    }
    
    function _updateFactoryStats(objectType) {
        _factoryStats.totalCreated++;
        _factoryStats.lastCreatedTime = new Date();
        
        if (!_factoryStats.createdByType[objectType]) {
            _factoryStats.createdByType[objectType] = 0;
        }
        _factoryStats.createdByType[objectType]++;
    }
    
    function _getObjectTypeFromId(objectId) {
        var typeMapping = {
            eArcObject: 'Arc',
            ePadObject: 'Pad',
            eTrackObject: 'Track',
            eViaObject: 'Via',
            eBoardOutlineObject: 'BoardOutline',
            eSignalLayerObject: 'SignalLayer',
            eMechanicalLayerObject: 'MechanicalLayer',
            eDielectricLayerObject: 'DielectricLayer',
            eInternalPlaneObject: 'InternalPlane'
        };
        
        return typeMapping[objectId] || 'Unknown';
    }
    
    function _validateNativeObject(nativeObject) {
        if (!nativeObject) {
            return { valid: false, error: "Native object is null" };
        }
        
        if (typeof nativeObject.ObjectId === "undefined") {
            return { valid: false, error: "Native object missing ObjectId property" };
        }
        
        return { valid: true, error: null };
    }
    
    function _validateOptions(options) {
        if (!options) {
            options = {};
        }
        
        // 确保基本选项存在
        if (typeof options.isMock === "undefined") {
            options.isMock = false;
        }
        
        if (typeof options.mockType === "undefined") {
            options.mockType = null;
        }
        
        if (typeof options.mockData === "undefined") {
            options.mockData = {};
        }
        
        if (typeof options.enableCache === "undefined") {
            options.enableCache = true;
        }
        
        return options;
    }
    
    // 初始化对象类型映射
    function _initializeObjectTypeMapping() {
        _objectTypeMapping = {
            // 设计对象
            'Arc': {
                objectId: eArcObject,
                wrapperConstructor: null, // 将在注册时设置
                mockType: 'Arc'
            },
            'Pad': {
                objectId: ePadObject,
                wrapperConstructor: null,
                mockType: 'Pad'
            },
            'Track': {
                objectId: eTrackObject,
                wrapperConstructor: null,
                mockType: 'Track'
            },
            'Via': {
                objectId: eViaObject,
                wrapperConstructor: null,
                mockType: 'Via'
            },
            'BoardOutline': {
                objectId: eBoardOutlineObject,
                wrapperConstructor: null,
                mockType: 'BoardOutline'
            },
            
            // 层对象
            'SignalLayer': {
                objectId: eSignalLayerObject,
                wrapperConstructor: null,
                mockType: 'SignalLayer'
            },
            'MechanicalLayer': {
                objectId: eMechanicalLayerObject,
                wrapperConstructor: null,
                mockType: 'MechanicalLayer'
            },
            'DielectricLayer': {
                objectId: eDielectricLayerObject,
                wrapperConstructor: null,
                mockType: 'DielectricLayer'
            },
            'InternalPlane': {
                objectId: eInternalPlaneObject,
                wrapperConstructor: null,
                mockType: 'InternalPlane'
            }
        };
    }
    
    // 公有API函数
    function registerWrapperConstructor(objectType, constructor) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][registerWrapperConstructor] START - Registering wrapper for type: " + objectType);
        
        try {
            if (!_objectTypeMapping[objectType]) {
                throw new Error("[PCBObjectFactory][index.js][registerWrapperConstructor] Unknown object type: " + objectType);
            }
            
            if (typeof constructor !== "function") {
                throw new Error("[PCBObjectFactory][index.js][registerWrapperConstructor] Constructor must be a function");
            }
            
            _objectTypeMapping[objectType].wrapperConstructor = constructor;
            _wrapperConstructors[objectType] = constructor;
            
            logger.debug("[PCBObjectFactory][index.js][registerWrapperConstructor] SUCCESS - Wrapper registered for: " + objectType);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][registerWrapperConstructor] ERROR - " + error.message);
            throw error;
        }
    }
    
    function createWrapper(nativeObject, options) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][createWrapper] START - Creating wrapper, options: " + JSON.stringify(options));
        
        try {
            // 验证和标准化选项
            options = _validateOptions(options);
            
            var wrapper = null;
            var objectType = null;
            
            if (options.isMock) {
                // 创建Mock对象
                logger.debug("[PCBObjectFactory][index.js][createWrapper] Creating mock wrapper for type: " + options.mockType);
                
                if (!options.mockType) {
                    throw new Error("[PCBObjectFactory][index.js][createWrapper] Mock type is required for mock objects");
                }
                
                objectType = options.mockType;
                
                // 创建Mock原生对象
                if (!nativeObject) {
                    if (typeof PCBMockSystem !== "undefined" && PCBMockSystem.createMockObject) {
                        nativeObject = PCBMockSystem.createMockObject(options.mockType, options.mockData);
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] PCBMockSystem not available");
                    }
                }
                
                // 创建Mock封装对象
                if (_wrapperConstructors[objectType]) {
                    wrapper = _wrapperConstructors[objectType]({
                        nativeObject: nativeObject,
                        objectType: objectType,
                        isMock: true,
                        mockData: options.mockData,
                        enableCache: options.enableCache
                    });
                } else {
                    // 使用基础封装类
                    if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                        wrapper = BasePCBWrapper.create({
                            nativeObject: nativeObject,
                            objectType: objectType,
                            isMock: true,
                            mockData: options.mockData,
                            enableCache: options.enableCache
                        });
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                    }
                }
                
            } else {
                // 创建真实对象封装
                logger.debug("[PCBObjectFactory][index.js][createWrapper] Creating real wrapper");
                
                // 验证原生对象
                var validation = _validateNativeObject(nativeObject);
                if (!validation.valid) {
                    throw new Error("[PCBObjectFactory][index.js][createWrapper] Invalid native object: " + validation.error);
                }
                
                // 识别对象类型
                objectType = _getObjectTypeFromId(nativeObject.ObjectId);
                
                if (objectType === 'Unknown') {
                    logger.warn("[PCBObjectFactory][index.js][createWrapper] Unknown object type for ObjectId: " + nativeObject.ObjectId);
                    
                    // 使用基础封装类
                    if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                        wrapper = BasePCBWrapper.create({
                            nativeObject: nativeObject,
                            objectType: 'Unknown',
                            isMock: false,
                            enableCache: options.enableCache
                        });
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                    }
                } else {
                    // 使用特定封装类
                    if (_wrapperConstructors[objectType]) {
                        wrapper = _wrapperConstructors[objectType]({
                            nativeObject: nativeObject,
                            objectType: objectType,
                            isMock: false,
                            enableCache: options.enableCache
                        });
                    } else {
                        // 使用基础封装类
                        if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                            wrapper = BasePCBWrapper.create({
                                nativeObject: nativeObject,
                                objectType: objectType,
                                isMock: false,
                                enableCache: options.enableCache
                            });
                        } else {
                            throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                        }
                    }
                }
            }
            
            // 初始化封装对象
            if (wrapper && wrapper.init) {
                wrapper.init();
            }
            
            // 更新统计信息
            _updateFactoryStats(objectType);
            
            logger.debug("[PCBObjectFactory][index.js][createWrapper] SUCCESS - Wrapper created for type: " + objectType);
            
            return wrapper;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][createWrapper] ERROR - " + error.message);
            throw error;
        }
    }
    
    function createWrappersFromIterator(iterator, options) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][createWrappersFromIterator] START - Creating wrappers from iterator");
        
        try {
            if (!iterator) {
                throw new Error("[PCBObjectFactory][index.js][createWrappersFromIterator] Iterator is required");
            }
            
            if (typeof iterator.First !== "function" || typeof iterator.Next !== "function") {
                throw new Error("[PCBObjectFactory][index.js][createWrappersFromIterator] Invalid iterator interface");
            }
            
            var wrappers = [];
            var nativeObject = iterator.First;
            var count = 0;
            
            while (nativeObject != null) {
                try {
                    var wrapper = createWrapper(nativeObject, options);
                    if (wrapper) {
                        wrappers.push(wrapper);
                        count++;
                    }
                } catch (error) {
                    logger.warn("[PCBObjectFactory][index.js][createWrappersFromIterator] Failed to create wrapper for object: " + error.message);
                    // 继续处理其他对象
                }
                
                nativeObject = iterator.Next;
            }
            
            logger.debug("[PCBObjectFactory][index.js][createWrappersFromIterator] SUCCESS - Created " + count + " wrappers from iterator");
            
            return wrappers;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][createWrappersFromIterator] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getObjectType(nativeObject) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getObjectType] START - Getting object type");
        
        try {
            if (!nativeObject) {
                logger.warn("[PCBObjectFactory][index.js][getObjectType] Native object is null");
                return 'Unknown';
            }
            
            if (typeof nativeObject.ObjectId === "undefined") {
                logger.warn("[PCBObjectFactory][index.js][getObjectType] Native object missing ObjectId");
                return 'Unknown';
            }
            
            var objectType = _getObjectTypeFromId(nativeObject.ObjectId);
            
            logger.debug("[PCBObjectFactory][index.js][getObjectType] SUCCESS - Object type: " + objectType);
            
            return objectType;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getObjectType] ERROR - " + error.message);
            return 'Unknown';
        }
    }
    
    function getSupportedObjectTypes() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getSupportedObjectTypes] START - Getting supported object types");
        
        try {
            var types = [];
            var key;
            
            for (key in _objectTypeMapping) {
                if (_objectTypeMapping.hasOwnProperty(key)) {
                    types.push(key);
                }
            }
            
            logger.debug("[PCBObjectFactory][index.js][getSupportedObjectTypes] SUCCESS - Found " + types.length + " supported types");
            
            return types;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getSupportedObjectTypes] ERROR - " + error.message);
            throw error;
        }
    }
    
    function isObjectTypeSupported(objectType) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][isObjectTypeSupported] START - Checking support for type: " + objectType);
        
        try {
            var supported = _objectTypeMapping.hasOwnProperty(objectType);
            
            logger.debug("[PCBObjectFactory][index.js][isObjectTypeSupported] SUCCESS - Type " + objectType + " supported: " + supported);
            
            return supported;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][isObjectTypeSupported] ERROR - " + error.message);
            return false;
        }
    }
    
    function getFactoryStatistics() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getFactoryStatistics] START - Getting factory statistics");
        
        try {
            var stats = {
                totalCreated: _factoryStats.totalCreated,
                createdByType: {},
                lastCreatedTime: _factoryStats.lastCreatedTime,
                supportedTypes: Object.keys(_objectTypeMapping).length,
                registeredWrappers: Object.keys(_wrapperConstructors).length
            };
            
            // 复制创建统计
            var key;
            for (key in _factoryStats.createdByType) {
                if (_factoryStats.createdByType.hasOwnProperty(key)) {
                    stats.createdByType[key] = _factoryStats.createdByType[key];
                }
            }
            
            logger.debug("[PCBObjectFactory][index.js][getFactoryStatistics] SUCCESS - Statistics: " + JSON.stringify(stats));
            
            return stats;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getFactoryStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    function resetFactoryStatistics() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][resetFactoryStatistics] START - Resetting factory statistics");
        
        try {
            _factoryStats.totalCreated = 0;
            _factoryStats.createdByType = {};
            _factoryStats.lastCreatedTime = null;
            
            logger.debug("[PCBObjectFactory][index.js][resetFactoryStatistics] SUCCESS - Factory statistics reset");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][resetFactoryStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    function initialize() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][initialize] START - Initializing PCB Object Factory");
        
        try {
            _initializeObjectTypeMapping();
            
            logger.debug("[PCBObjectFactory][index.js][initialize] SUCCESS - PCB Object Factory initialized with " + 
                       Object.keys(_objectTypeMapping).length + " supported types");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    return {
        // 对象创建
        createWrapper: createWrapper,
        createWrappersFromIterator: createWrappersFromIterator,
        
        // 类型识别和查询
        getObjectType: getObjectType,
        getSupportedObjectTypes: getSupportedObjectTypes,
        isObjectTypeSupported: isObjectTypeSupported,
        
        // 封装器注册
        registerWrapperConstructor: registerWrapperConstructor,
        
        // 统计和管理
        getFactoryStatistics: getFactoryStatistics,
        resetFactoryStatistics: resetFactoryStatistics,
        
        // 初始化
        initialize: initialize,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 加载模块: .._src_modules_pcb-interfaces_core_PCBObjectManager.js
/**
 * PCBObjectManager - PCB对象管理系统
 * 提供对象创建、绑定、池管理功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectManager = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _pendingPool = [];      // 待绑定池
    var _boundObjects = {};     // 已绑定对象映射 {I_ObjectAddress: wrapper}
    var _factory = null;        // 对象工厂引用
    var _logger = null;         // 日志记录器
    
    // 私有工具函数
    function _generateAddressKey(nativeObject) {
        if (!nativeObject || !nativeObject.I_ObjectAddress) {
            return null;
        }
        return "addr_" + nativeObject.I_ObjectAddress.toString();
    }
    
    function _validateNativeObject(nativeObject) {
        if (!nativeObject) {
            throw new Error("[PCBObjectManager][index.js][_validateNativeObject] Native object is required");
        }
        
        if (!nativeObject.I_ObjectAddress) {
            throw new Error("[PCBObjectManager][index.js][_validateNativeObject] Native object must have I_ObjectAddress property");
        }
        
        return true;
    }
    
    function _validateWrapperType(wrapperType) {
        var validTypes = ['track', 'arc', 'pad', 'via'];
        
        if (!wrapperType) {
            throw new Error("[PCBObjectManager][index.js][_validateWrapperType] Wrapper type is required");
        }
        
        var lowerType = wrapperType.toLowerCase();
        var isValid = false;
        
        for (var i = 0; i < validTypes.length; i++) {
            if (lowerType === validTypes[i]) {
                isValid = true;
                break;
            }
        }
        
        if (!isValid) {
            throw new Error("[PCBObjectManager][index.js][_validateWrapperType] Invalid wrapper type: " + wrapperType + 
                           ". Valid types: " + validTypes.join(", "));
        }
        
        return lowerType;
    }
    
    function _createWrapperByType(nativeObject, wrapperType, options) {
        var wrapper;
        var lowerType = _validateWrapperType(wrapperType);
        
        // 根据类型创建对应的封装器
        switch (lowerType) {
            case 'track':
                if (typeof TrackWrapper !== "undefined") {
                    wrapper = TrackWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] TrackWrapper not available");
                }
                break;
                
            case 'arc':
                if (typeof ArcWrapper !== "undefined") {
                    wrapper = ArcWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] ArcWrapper not available");
                }
                break;
                
            case 'pad':
                if (typeof PadWrapper !== "undefined") {
                    wrapper = PadWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] PadWrapper not available");
                }
                break;
                
            case 'via':
                if (typeof ViaWrapper !== "undefined") {
                    wrapper = ViaWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] ViaWrapper not available");
                }
                break;
                
            default:
                throw new Error("[PCBObjectManager][index.js][_createWrapperByType] Unsupported wrapper type: " + wrapperType);
        }
        
        return wrapper;
    }
    
    function _addToBoundObjects(wrapper) {
        if (!wrapper || !wrapper.getNativeObject) {
            return false;
        }
        
        var nativeObj = wrapper.getNativeObject();
        if (!nativeObj || !nativeObj.I_ObjectAddress) {
            return false;
        }
        
        var key = _generateAddressKey(nativeObj);
        if (key) {
            _boundObjects[key] = wrapper;
            
            if (_logger && _logger.debug) {
                _logger.debug("[PCBObjectManager][index.js][_addToBoundObjects] Added wrapper to bound objects: " + key);
            }
            
            return true;
        }
        
        return false;
    }
    
    function _removeFromBoundObjects(wrapper) {
        if (!wrapper || !wrapper.getNativeObject) {
            return false;
        }
        
        var nativeObj = wrapper.getNativeObject();
        if (!nativeObj || !nativeObj.I_ObjectAddress) {
            return false;
        }
        
        var key = _generateAddressKey(nativeObj);
        if (key && _boundObjects.hasOwnProperty(key)) {
            delete _boundObjects[key];
            
            if (_logger && _logger.debug) {
                _logger.debug("[PCBObjectManager][index.js][_removeFromBoundObjects] Removed wrapper from bound objects: " + key);
            }
            
            return true;
        }
        
        return false;
    }
    
    // 公有API函数
    function initialize(factory, logger) {
        if (!factory) {
            throw new Error("[PCBObjectManager][index.js][initialize] Factory is required");
        }
        
        _factory = factory;
        _logger = logger || null;
        
        if (_logger && _logger.info) {
            _logger.info("[PCBObjectManager][index.js][initialize] PCBObjectManager initialized");
        }
        
        return true;
    }
    
    // 模式1：创建时绑定
    function createWrapper(nativeObject, wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createWrapper] Manager not initialized. Call initialize() first.");
        }
        
        _validateNativeObject(nativeObject);
        var lowerType = _validateWrapperType(wrapperType);
        
        var wrapperOptions = options || {};
        wrapperOptions.objectType = lowerType;
        wrapperOptions.nativeObject = nativeObject;
        
        // 创建封装器
        var wrapper = _createWrapperByType(nativeObject, lowerType, wrapperOptions);
        
        // 添加到已绑定对象映射
        if (_addToBoundObjects(wrapper)) {
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][createWrapper] Created and bound wrapper: " + lowerType + 
                            ", Address: " + nativeObject.I_ObjectAddress);
            }
            
            return wrapper;
        } else {
            throw new Error("[PCBObjectManager][index.js][createWrapper] Failed to add wrapper to bound objects");
        }
    }
    
    // 模式2：创建空封装器（放入待绑定池）
    function createEmptyWrapper(wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createEmptyWrapper] Manager not initialized. Call initialize() first.");
        }
        
        var lowerType = _validateWrapperType(wrapperType);
        
        var wrapperOptions = options || {};
        wrapperOptions.objectType = lowerType;
        wrapperOptions.isMock = true;  // 标记为Mock，因为没有原生对象
        wrapperOptions.mockData = {};
        
        // 创建空封装器
        var wrapper = _createWrapperByType(null, lowerType, wrapperOptions);
        
        // 添加到待绑定池
        _pendingPool.push({
            wrapper: wrapper,
            wrapperType: lowerType,
            createdTime: new Date(),
            options: wrapperOptions
        });
        
        if (_logger && _logger.info) {
            _logger.info("[PCBObjectManager][index.js][createEmptyWrapper] Created empty wrapper: " + lowerType + 
                        ", Pool size: " + _pendingPool.length);
        }
        
        return wrapper;
    }
    
    // 模式3：绑定已有对象
    function bindToExisting(wrapper, nativeObject) {
        if (!wrapper) {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Wrapper is required");
        }
        
        _validateNativeObject(nativeObject);
        
        // 检查是否已经在待绑定池中
        var poolIndex = -1;
        for (var i = 0; i < _pendingPool.length; i++) {
            if (_pendingPool[i].wrapper === wrapper) {
                poolIndex = i;
                break;
            }
        }
        
        if (poolIndex === -1) {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Wrapper not found in pending pool");
        }
        
        // 从待绑定池中移除
        _pendingPool.splice(poolIndex, 1);
        
        // 重新配置封装器
        wrapper.nativeObject = nativeObject;
        wrapper.isMock = false;
        wrapper.options.nativeObject = nativeObject;
        
        // 重新初始化
        if (wrapper.init) {
            wrapper.init();
        }
        
        // 从原生对象同步属性
        if (wrapper.syncFromNative) {
            wrapper.syncFromNative();
        }
        
        // 添加到已绑定对象映射
        if (_addToBoundObjects(wrapper)) {
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][bindToExisting] Bound wrapper to native object: " + 
                            wrapper.objectType + ", Address: " + nativeObject.I_ObjectAddress);
            }
            
            return wrapper;
        } else {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Failed to add wrapper to bound objects");
        }
    }
    
    // 从已有原生对象创建封装器
    function createFromExisting(nativeObject, wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createFromExisting] Manager not initialized. Call initialize() first.");
        }
        
        _validateNativeObject(nativeObject);
        var lowerType = _validateWrapperType(wrapperType);
        
        // 检查是否已经存在封装器
        var existingWrapper = getWrapper(nativeObject);
        if (existingWrapper) {
            if (_logger && _logger.warn) {
                _logger.warn("[PCBObjectManager][index.js][createFromExisting] Wrapper already exists for object: " + 
                            nativeObject.I_ObjectAddress + ", returning existing wrapper");
            }
            
            return existingWrapper;
        }
        
        // 创建新的封装器
        return createWrapper(nativeObject, lowerType, options);
    }
    
    // 获取已绑定的封装器
    function getWrapper(nativeObject) {
        if (!nativeObject || !nativeObject.I_ObjectAddress) {
            return null;
        }
        
        var key = _generateAddressKey(nativeObject);
        if (key && _boundObjects.hasOwnProperty(key)) {
            return _boundObjects[key];
        }
        
        return null;
    }
    
    // 获取待绑定池中的封装器
    function getPendingWrappers() {
        var result = [];
        
        for (var i = 0; i < _pendingPool.length; i++) {
            result.push(_pendingPool[i].wrapper);
        }
        
        return result;
    }
    
    // 获取待绑定池信息
    function getPendingPoolInfo() {
        var result = [];
        
        for (var i = 0; i < _pendingPool.length; i++) {
            var item = _pendingPool[i];
            result.push({
                index: i,
                wrapperType: item.wrapperType,
                createdTime: item.createdTime,
                isInitialized: item.wrapper.state ? item.wrapper.state.initialized : false
            });
        }
        
        return result;
    }
    
    // 销毁封装器
    function destroyWrapper(wrapper) {
        if (!wrapper) {
            return false;
        }
        
        try {
            // 从已绑定对象映射中移除
            _removeFromBoundObjects(wrapper);
            
            // 从待绑定池中移除
            var poolIndex = -1;
            for (var i = 0; i < _pendingPool.length; i++) {
                if (_pendingPool[i].wrapper === wrapper) {
                    poolIndex = i;
                    break;
                }
            }
            
            if (poolIndex !== -1) {
                _pendingPool.splice(poolIndex, 1);
            }
            
            // 销毁封装器
            if (wrapper.destroy) {
                wrapper.destroy();
            }
            
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][destroyWrapper] Wrapper destroyed: " + 
                            (wrapper.objectType || 'unknown'));
            }
            
            return true;
            
        } catch (error) {
            if (_logger && _logger.error) {
                _logger.error("[PCBObjectManager][index.js][destroyWrapper] Error destroying wrapper: " + error.message);
            }
            
            return false;
        }
    }
    
    // 清理所有对象
    function clearAll() {
        var destroyedCount = 0;
        
        try {
            // 销毁所有已绑定对象
            for (var key in _boundObjects) {
                if (_boundObjects.hasOwnProperty(key)) {
                    var wrapper = _boundObjects[key];
                    if (wrapper && wrapper.destroy) {
                        wrapper.destroy();
                        destroyedCount++;
                    }
                }
            }
            
            // 清空已绑定对象映射
            _boundObjects = {};
            
            // 销毁待绑定池中的对象
            for (var i = _pendingPool.length - 1; i >= 0; i--) {
                var item = _pendingPool[i];
                if (item.wrapper && item.wrapper.destroy) {
                    item.wrapper.destroy();
                    destroyedCount++;
                }
            }
            
            // 清空待绑定池
            _pendingPool = [];
            
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][clearAll] Cleared all objects, destroyed: " + destroyedCount);
            }
            
            return true;
            
        } catch (error) {
            if (_logger && _logger.error) {
                _logger.error("[PCBObjectManager][index.js][clearAll] Error clearing all objects: " + error.message);
            }
            
            return false;
        }
    }
    
    // 获取统计信息
    function getStats() {
        var boundCount = 0;
        var pendingCount = _pendingPool.length;
        
        for (var key in _boundObjects) {
            if (_boundObjects.hasOwnProperty(key)) {
                boundCount++;
            }
        }
        
        return {
            boundObjects: boundCount,
            pendingObjects: pendingCount,
            totalObjects: boundCount + pendingCount,
            isInitialized: !!_factory
        };
    }
    
    // 获取调试信息
    function getDebugInfo() {
        var boundDetails = [];
        var pendingDetails = [];
        
        // 已绑定对象详情
        for (var key in _boundObjects) {
            if (_boundObjects.hasOwnProperty(key)) {
                var wrapper = _boundObjects[key];
                boundDetails.push({
                    key: key,
                    objectType: wrapper.objectType || 'unknown',
                    isInitialized: wrapper.state ? wrapper.state.initialized : false,
                    isDirty: wrapper.isDirty || false,
                    isMock: wrapper.isMock || false
                });
            }
        }
        
        // 待绑定对象详情
        for (var i = 0; i < _pendingPool.length; i++) {
            var item = _pendingPool[i];
            pendingDetails.push({
                index: i,
                wrapperType: item.wrapperType,
                createdTime: item.createdTime,
                isInitialized: item.wrapper.state ? item.wrapper.state.initialized : false
            });
        }
        
        return {
            stats: getStats(),
            boundObjects: boundDetails,
            pendingObjects: pendingDetails,
            isInitialized: !!_factory
        };
    }
    
    return {
        // 初始化
        initialize: initialize,
        
        // 创建模式
        createWrapper: createWrapper,           // 模式1：创建时绑定
        createEmptyWrapper: createEmptyWrapper, // 模式2：创建空封装器
        bindToExisting: bindToExisting,         // 模式3：绑定已有对象
        createFromExisting: createFromExisting, // 从已有对象创建
        
        // 查询方法
        getWrapper: getWrapper,
        getPendingWrappers: getPendingWrappers,
        getPendingPoolInfo: getPendingPoolInfo,
        
        // 管理方法
        destroyWrapper: destroyWrapper,
        clearAll: clearAll,
        
        // 状态方法
        getStats: getStats,
        getDebugInfo: getDebugInfo,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 加载模块: .._src_modules_pcb-interfaces_core_PCBObjectPool.js
/**
 * PCBObjectPool - PCB对象池管理
 * 提供对象生命周期管理和内存优化功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectPool = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _objectPools = {
        native: {},      // 原生对象池
        wrapped: {},     // 封装对象池
        modified: {}     // 修改对象池
    };
    var _poolStats = {
        totalObjects: 0,
        objectsByPool: {},
        objectsByType: {},
        lastAccessTime: null,
        poolHits: 0,
        poolMisses: 0
    };
    var _poolConfig = {
        maxPoolSize: 1000,
        enableAutoCleanup: true,
        cleanupInterval: 60000, // 60秒
        maxObjectAge: 300000   // 5分钟
    };
    
    // 私有工具函数
    function _createPoolLogger() {
        return {
            debug: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.debug) {
                        logger.debug("[PCBObjectPool][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            info: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.info) {
                        logger.info("[PCBObjectPool][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            warn: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.warn) {
                        logger.warn("[PCBObjectPool][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            error: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.error) {
                        logger.error("[PCBObjectPool][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            }
        };
    }
    
    function _generateObjectKey(poolType, objectId, objectType) {
        return poolType + "_" + (objectId || 'unknown') + "_" + (objectType || 'unknown');
    }
    
    function _updatePoolStats(poolType, objectType, operation) {
        _poolStats.lastAccessTime = new Date();
        
        if (operation === 'add') {
            _poolStats.totalObjects++;
            
            if (!_poolStats.objectsByPool[poolType]) {
                _poolStats.objectsByPool[poolType] = 0;
            }
            _poolStats.objectsByPool[poolType]++;
            
            if (!_poolStats.objectsByType[objectType]) {
                _poolStats.objectsByType[objectType] = 0;
            }
            _poolStats.objectsByType[objectType]++;
            
        } else if (operation === 'remove') {
            _poolStats.totalObjects = Math.max(0, _poolStats.totalObjects - 1);
            
            if (_poolStats.objectsByPool[poolType]) {
                _poolStats.objectsByPool[poolType] = Math.max(0, _poolStats.objectsByPool[poolType] - 1);
            }
            
            if (_poolStats.objectsByType[objectType]) {
                _poolStats.objectsByType[objectType] = Math.max(0, _poolStats.objectsByType[objectType] - 1);
            }
        }
    }
    
    function _validatePoolType(poolType) {
        var validTypes = ['native', 'wrapped', 'modified'];
        return validTypes.indexOf(poolType) !== -1;
    }
    
    function _validateObject(object) {
        if (!object) {
            return { valid: false, error: "Object is null" };
        }
        
        if (typeof object !== "object") {
            return { valid: false, error: "Object is not an object type" };
        }
        
        return { valid: true, error: null };
    }
    
    function _performAutoCleanup() {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][_performAutoCleanup] START - Performing automatic cleanup");
        
        try {
            var currentTime = new Date().getTime();
            var cleanedCount = 0;
            var poolType, key, objectInfo;
            
            for (poolType in _objectPools) {
                if (_objectPools.hasOwnProperty(poolType)) {
                    for (key in _objectPools[poolType]) {
                        if (_objectPools[poolType].hasOwnProperty(key)) {
                            objectInfo = _objectPools[poolType][key];
                            
                            // 检查对象年龄
                            if (objectInfo.timestamp && (currentTime - objectInfo.timestamp.getTime()) > _poolConfig.maxObjectAge) {
                                // 清理过期对象
                                if (removeFromPool(poolType, key)) {
                                    cleanedCount++;
                                }
                            }
                        }
                    }
                }
            }
            
            // 检查池大小限制
            if (_poolStats.totalObjects > _poolConfig.maxPoolSize) {
                cleanedCount += _cleanupOldestObjects(_poolStats.totalObjects - _poolConfig.maxPoolSize);
            }
            
            logger.debug("[PCBObjectPool][index.js][_performAutoCleanup] SUCCESS - Cleaned up " + cleanedCount + " objects");
            
            return cleanedCount;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][_performAutoCleanup] ERROR - " + error.message);
            return 0;
        }
    }
    
    function _cleanupOldestObjects(count) {
        var logger = _createPoolLogger();
        var allObjects = [];
        var poolType, key, objectInfo;
        
        // 收集所有对象信息
        for (poolType in _objectPools) {
            if (_objectPools.hasOwnProperty(poolType)) {
                for (key in _objectPools[poolType]) {
                    if (_objectPools[poolType].hasOwnProperty(key)) {
                        objectInfo = _objectPools[poolType][key];
                        allObjects.push({
                            poolType: poolType,
                            key: key,
                            timestamp: objectInfo.timestamp || new Date(0)
                        });
                    }
                }
            }
        }
        
        // 按时间戳排序（最老的在前）
        allObjects.sort(function(a, b) {
            return a.timestamp.getTime() - b.timestamp.getTime();
        });
        
        // 清理最老的对象
        var cleanedCount = 0;
        var i;
        for (i = 0; i < Math.min(count, allObjects.length); i++) {
            if (removeFromPool(allObjects[i].poolType, allObjects[i].key)) {
                cleanedCount++;
            }
        }
        
        return cleanedCount;
    }
    
    // 公有API函数
    function addToPool(poolType, key, object) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][addToPool] START - Adding object to pool: " + poolType + ", key: " + key);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][addToPool] Invalid pool type: " + poolType);
            }
            
            // 验证对象
            var validation = _validateObject(object);
            if (!validation.valid) {
                throw new Error("[PCBObjectPool][index.js][addToPool] Invalid object: " + validation.error);
            }
            
            // 检查池大小限制
            if (_poolStats.totalObjects >= _poolConfig.maxPoolSize) {
                if (_poolConfig.enableAutoCleanup) {
                    _performAutoCleanup();
                } else {
                    logger.warn("[PCBObjectPool][index.js][addToPool] Pool size limit reached, object not added");
                    return false;
                }
            }
            
            // 获取对象类型
            var objectType = 'Unknown';
            if (object.getObjectType && typeof object.getObjectType === "function") {
                objectType = object.getObjectType();
            } else if (object._mockType) {
                objectType = object._mockType;
            } else if (object.ObjectId !== undefined) {
                // 从ObjectId推断类型
                var typeMapping = {
                    eArcObject: 'Arc',
                    ePadObject: 'Pad',
                    eTrackObject: 'Track',
                    eViaObject: 'Via',
                    eBoardOutlineObject: 'BoardOutline'
                };
                objectType = typeMapping[object.ObjectId] || 'Unknown';
            }
            
            // 生成完整键值（如果没有提供）
            var fullKey = key;
            if (!fullKey) {
                fullKey = _generateObjectKey(poolType, object.ObjectId || 'unknown', objectType);
            }
            
            // 添加到池中
            _objectPools[poolType][fullKey] = {
                object: object,
                objectType: objectType,
                timestamp: new Date(),
                accessCount: 0,
                lastAccess: new Date()
            };
            
            // 更新统计信息
            _updatePoolStats(poolType, objectType, 'add');
            
            logger.debug("[PCBObjectPool][index.js][addToPool] SUCCESS - Object added to pool: " + poolType + ", key: " + fullKey);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][addToPool] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getFromPool(poolType, key) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][getFromPool] START - Getting object from pool: " + poolType + ", key: " + key);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][getFromPool] Invalid pool type: " + poolType);
            }
            
            var objectInfo = _objectPools[poolType][key];
            
            if (!objectInfo) {
                _poolStats.poolMisses++;
                logger.debug("[PCBObjectPool][index.js][getFromPool] Object not found in pool: " + key);
                return null;
            }
            
            // 更新访问信息
            objectInfo.accessCount++;
            objectInfo.lastAccess = new Date();
            _poolStats.poolHits++;
            _poolStats.lastAccessTime = new Date();
            
            logger.debug("[PCBObjectPool][index.js][getFromPool] SUCCESS - Object retrieved from pool: " + key);
            
            return objectInfo.object;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][getFromPool] ERROR - " + error.message);
            throw error;
        }
    }
    
    function removeFromPool(poolType, key) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][removeFromPool] START - Removing object from pool: " + poolType + ", key: " + key);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][removeFromPool] Invalid pool type: " + poolType);
            }
            
            var objectInfo = _objectPools[poolType][key];
            
            if (!objectInfo) {
                logger.warn("[PCBObjectPool][index.js][removeFromPool] Object not found in pool: " + key);
                return false;
            }
            
            // 更新统计信息
            _updatePoolStats(poolType, objectInfo.objectType, 'remove');
            
            // 从池中移除
            delete _objectPools[poolType][key];
            
            logger.debug("[PCBObjectPool][index.js][removeFromPool] SUCCESS - Object removed from pool: " + key);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][removeFromPool] ERROR - " + error.message);
            throw error;
        }
    }
    
    function clearPool(poolType) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][clearPool] START - Clearing pool: " + poolType);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][clearPool] Invalid pool type: " + poolType);
            }
            
            var count = Object.keys(_objectPools[poolType]).length;
            
            // 更新统计信息
            var key, objectInfo;
            for (key in _objectPools[poolType]) {
                if (_objectPools[poolType].hasOwnProperty(key)) {
                    objectInfo = _objectPools[poolType][key];
                    _updatePoolStats(poolType, objectInfo.objectType, 'remove');
                }
            }
            
            // 清空池
            _objectPools[poolType] = {};
            
            logger.debug("[PCBObjectPool][index.js][clearPool] SUCCESS - Cleared " + count + " objects from pool: " + poolType);
            
            return count;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][clearPool] ERROR - " + error.message);
            throw error;
        }
    }
    
    function clearAllPools() {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][clearAllPools] START - Clearing all pools");
        
        try {
            var totalCount = 0;
            var poolType;
            
            for (poolType in _objectPools) {
                if (_objectPools.hasOwnProperty(poolType)) {
                    totalCount += clearPool(poolType);
                }
            }
            
            logger.debug("[PCBObjectPool][index.js][clearAllPools] SUCCESS - Cleared " + totalCount + " objects from all pools");
            
            return totalCount;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][clearAllPools] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getPoolSize(poolType) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][getPoolSize] START - Getting pool size: " + poolType);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][getPoolSize] Invalid pool type: " + poolType);
            }
            
            var size = Object.keys(_objectPools[poolType]).length;
            
            logger.debug("[PCBObjectPool][index.js][getPoolSize] SUCCESS - Pool size: " + size);
            
            return size;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][getPoolSize] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getAllPoolObjects(poolType) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][getAllPoolObjects] START - Getting all objects from pool: " + poolType);
        
        try {
            // 验证池类型
            if (!_validatePoolType(poolType)) {
                throw new Error("[PCBObjectPool][index.js][getAllPoolObjects] Invalid pool type: " + poolType);
            }
            
            var objects = [];
            var key, objectInfo;
            
            for (key in _objectPools[poolType]) {
                if (_objectPools[poolType].hasOwnProperty(key)) {
                    objectInfo = _objectPools[poolType][key];
                    objects.push({
                        key: key,
                        object: objectInfo.object,
                        objectType: objectInfo.objectType,
                        timestamp: objectInfo.timestamp,
                        accessCount: objectInfo.accessCount,
                        lastAccess: objectInfo.lastAccess
                    });
                }
            }
            
            logger.debug("[PCBObjectPool][index.js][getAllPoolObjects] SUCCESS - Found " + objects.length + " objects in pool: " + poolType);
            
            return objects;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][getAllPoolObjects] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getPoolStatistics() {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][getPoolStatistics] START - Getting pool statistics");
        
        try {
            var stats = {
                totalObjects: _poolStats.totalObjects,
                objectsByPool: {},
                objectsByType: {},
                poolHits: _poolStats.poolHits,
                poolMisses: _poolStats.poolMisses,
                hitRate: 0,
                lastAccessTime: _poolStats.lastAccessTime,
                poolSizes: {},
                config: {}
            };
            
            // 计算命中率
            var totalAccess = _poolStats.poolHits + _poolStats.poolMisses;
            if (totalAccess > 0) {
                stats.hitRate = (_poolStats.poolHits / totalAccess * 100).toFixed(2);
            }
            
            // 复制统计信息
            var key;
            for (key in _poolStats.objectsByPool) {
                if (_poolStats.objectsByPool.hasOwnProperty(key)) {
                    stats.objectsByPool[key] = _poolStats.objectsByPool[key];
                }
            }
            
            for (key in _poolStats.objectsByType) {
                if (_poolStats.objectsByType.hasOwnProperty(key)) {
                    stats.objectsByType[key] = _poolStats.objectsByType[key];
                }
            }
            
            // 获取各池大小
            for (key in _objectPools) {
                if (_objectPools.hasOwnProperty(key)) {
                    stats.poolSizes[key] = Object.keys(_objectPools[key]).length;
                }
            }
            
            // 复制配置
            for (key in _poolConfig) {
                if (_poolConfig.hasOwnProperty(key)) {
                    stats.config[key] = _poolConfig[key];
                }
            }
            
            logger.debug("[PCBObjectPool][index.js][getPoolStatistics] SUCCESS - Statistics: " + JSON.stringify(stats));
            
            return stats;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][getPoolStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    function configurePool(config) {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][configurePool] START - Configuring pool with: " + JSON.stringify(config));
        
        try {
            if (!config || typeof config !== "object") {
                throw new Error("[PCBObjectPool][index.js][configurePool] Config must be an object");
            }
            
            // 更新配置
            var key;
            for (key in config) {
                if (config.hasOwnProperty(key) && _poolConfig.hasOwnProperty(key)) {
                    _poolConfig[key] = config[key];
                }
            }
            
            logger.debug("[PCBObjectPool][index.js][configurePool] SUCCESS - Pool configured");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][configurePool] ERROR - " + error.message);
            throw error;
        }
    }
    
    function performCleanup() {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][performCleanup] START - Performing manual cleanup");
        
        try {
            var cleanedCount = _performAutoCleanup();
            
            logger.debug("[PCBObjectPool][index.js][performCleanup] SUCCESS - Manual cleanup completed, cleaned " + cleanedCount + " objects");
            
            return cleanedCount;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][performCleanup] ERROR - " + error.message);
            throw error;
        }
    }
    
    function initialize() {
        var logger = _createPoolLogger();
        
        logger.debug("[PCBObjectPool][index.js][initialize] START - Initializing PCB Object Pool");
        
        try {
            // 重置统计信息
            _poolStats = {
                totalObjects: 0,
                objectsByPool: {},
                objectsByType: {},
                lastAccessTime: null,
                poolHits: 0,
                poolMisses: 0
            };
            
            // 清空所有池
            _objectPools = {
                native: {},
                wrapped: {},
                modified: {}
            };
            
            logger.debug("[PCBObjectPool][index.js][initialize] SUCCESS - PCB Object Pool initialized");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectPool][index.js][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    return {
        // 对象池操作
        addToPool: addToPool,
        getFromPool: getFromPool,
        removeFromPool: removeFromPool,
        clearPool: clearPool,
        clearAllPools: clearAllPools,
        
        // 查询操作
        getPoolSize: getPoolSize,
        getAllPoolObjects: getAllPoolObjects,
        getPoolStatistics: getPoolStatistics,
        
        // 配置和管理
        configurePool: configurePool,
        performCleanup: performCleanup,
        
        // 初始化
        initialize: initialize,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 加载模块: .._src_modules_pcb-interfaces_calculators_GeometryCalculator.js
/**
 * GeometryCalculator - 几何计算器
 * 
 * 提供PCB对象几何计算的核心功能
 * 
 * @author AD21 PCB Interface Module
 * @version 1.0.0
 */

var GeometryCalculator = (function(){
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

    var logger = SimpleLogger;

    /**
     * GeometryCalculator构造函数
     */
    function GeometryCalculator() {
        // 构造函数逻辑
    }

/**
 * 计算两点之间的距离
 * @param {number} x1 第一个点的X坐标
 * @param {number} y1 第一个点的Y坐标
 * @param {number} x2 第二个点的X坐标
 * @param {number} y2 第二个点的Y坐标
 * @returns {number} 距离
 */
GeometryCalculator.calculateDistance = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateDistance] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        logger.debug("[GeometryCalculator][calculateDistance] SUCCESS - result: " + distance);
        return distance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateDistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算线段的角度（度）
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @returns {number} 角度（度）
 */
GeometryCalculator.calculateAngle = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateAngle] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angleRad = Math.atan2(dy, dx);
        var angleDeg = angleRad * 180 / Math.PI;
        
        // 确保角度在0-360度范围内
        if (angleDeg < 0) {
            angleDeg += 360;
        }
        
        logger.debug("[GeometryCalculator][calculateAngle] SUCCESS - result: " + angleDeg);
        return angleDeg;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateAngle] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算线段的中点
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @returns {Object} {x, y} 中点坐标
 */
GeometryCalculator.calculateMidPoint = function(x1, y1, x2, y2) {
    logger.debug("[GeometryCalculator][calculateMidPoint] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }));
    
    try {
        var midX = (x1 + x2) / 2;
        var midY = (y1 + y2) / 2;
        
        var result = { x: midX, y: midY };
        
        logger.debug("[GeometryCalculator][calculateMidPoint] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateMidPoint] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 极坐标转换为直角坐标
 * @param {number} centerX 中心点X坐标
 * @param {number} centerY 中心点Y坐标
 * @param {number} radius 半径
 * @param {number} angle 角度（度）
 * @returns {Object} {x, y} 直角坐标
 */
GeometryCalculator.polarToCartesian = function(centerX, centerY, radius, angle) {
    logger.debug("[GeometryCalculator][polarToCartesian] START - params: " + JSON.stringify({
        centerX: centerX,
        centerY: centerY,
        radius: radius,
        angle: angle
    }));
    
    try {
        var angleRad = angle * Math.PI / 180;
        var x = centerX + radius * Math.cos(angleRad);
        var y = centerY + radius * Math.sin(angleRad);
        
        var result = { x: x, y: y };
        
        logger.debug("[GeometryCalculator][polarToCartesian] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][polarToCartesian] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆弧长度
 * @param {number} radius 半径
 * @param {number} startAngle 起始角度（度）
 * @param {number} endAngle 结束角度（度）
 * @returns {number} 圆弧长度
 */
GeometryCalculator.calculateArcLength = function(radius, startAngle, endAngle) {
    logger.debug("[GeometryCalculator][calculateArcLength] START - params: " + JSON.stringify({
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle
    }));
    
    try {
        var angleDiff = endAngle - startAngle;
        
        // 处理角度跨越0度的情况
        if (angleDiff < 0) {
            angleDiff += 360;
        }
        
        var angleRad = angleDiff * Math.PI / 180;
        var arcLength = radius * angleRad;
        
        logger.debug("[GeometryCalculator][calculateArcLength] SUCCESS - result: " + arcLength);
        return arcLength;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateArcLength] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆的包围盒
 * @param {number} centerX 中心点X坐标
 * @param {number} centerY 中心点Y坐标
 * @param {number} radius 半径
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateCircleBoundingBox = function(centerX, centerY, radius) {
    logger.debug("[GeometryCalculator][calculateCircleBoundingBox] START - params: " + JSON.stringify({
        centerX: centerX,
        centerY: centerY,
        radius: radius
    }));
    
    try {
        var result = {
            x1: centerX - radius,
            y1: centerY - radius,
            x2: centerX + radius,
            y2: centerY + radius
        };
        
        logger.debug("[GeometryCalculator][calculateCircleBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateCircleBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算矩形的包围盒
 * @param {number} x 中心点X坐标
 * @param {number} y 中心点Y坐标
 * @param {number} width 宽度
 * @param {number} height 高度
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateRectBoundingBox = function(x, y, width, height) {
    logger.debug("[GeometryCalculator][calculateRectBoundingBox] START - params: " + JSON.stringify({
        x: x,
        y: y,
        width: width,
        height: height
    }));
    
    try {
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        
        var result = {
            x1: x - halfWidth,
            y1: y - halfHeight,
            x2: x + halfWidth,
            y2: y + halfHeight
        };
        
        logger.debug("[GeometryCalculator][calculateRectBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateRectBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线的包围盒
 * @param {number} x1 起点X坐标
 * @param {number} y1 起点Y坐标
 * @param {number} x2 终点X坐标
 * @param {number} y2 终点Y坐标
 * @param {number} width 线宽
 * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
 */
GeometryCalculator.calculateTrackBoundingBox = function(x1, y1, x2, y2, width) {
    logger.debug("[GeometryCalculator][calculateTrackBoundingBox] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        width: width
    }));
    
    try {
        var halfWidth = width / 2;
        
        var result = {
            x1: Math.min(x1, x2) - halfWidth,
            y1: Math.min(y1, y2) - halfWidth,
            x2: Math.max(x1, x2) + halfWidth,
            y2: Math.max(y1, y2) + halfWidth
        };
        
        logger.debug("[GeometryCalculator][calculateTrackBoundingBox] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackBoundingBox] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算圆的面积
 * @param {number} radius 半径
 * @returns {number} 面积
 */
GeometryCalculator.calculateCircleArea = function(radius) {
    logger.debug("[GeometryCalculator][calculateCircleArea] START - params: " + JSON.stringify({
        radius: radius
    }));
    
    try {
        var area = Math.PI * radius * radius;
        
        logger.debug("[GeometryCalculator][calculateCircleArea] SUCCESS - result: " + area);
        return area;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateCircleArea] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算焊盘面积
 * @param {number} sizeX X方向尺寸
 * @param {number} sizeY Y方向尺寸
 * @param {string} shape 形状（Rect, Round, Octagonal, RoundedRect）
 * @returns {number} 面积
 */
GeometryCalculator.calculatePadArea = function(sizeX, sizeY, shape) {
    logger.debug("[GeometryCalculator][calculatePadArea] START - params: " + JSON.stringify({
        sizeX: sizeX,
        sizeY: sizeY,
        shape: shape
    }));
    
    try {
        var area;
        
        switch (shape) {
            case "Round":
                var radius = Math.min(sizeX, sizeY) / 2;
                area = Math.PI * radius * radius;
                break;
            case "Rect":
                area = sizeX * sizeY;
                break;
            case "Octagonal":
                // 八边形面积近似为矩形面积的0.828倍
                area = sizeX * sizeY * 0.828;
                break;
            case "RoundedRect":
                // 圆角矩形面积近似为矩形面积的0.95倍
                area = sizeX * sizeY * 0.95;
                break;
            default:
                area = sizeX * sizeY;
        }
        
        logger.debug("[GeometryCalculator][calculatePadArea] SUCCESS - result: " + area);
        return area;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculatePadArea] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在圆内
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 圆心X坐标
 * @param {number} centerY 圆心Y坐标
 * @param {number} radius 半径
 * @returns {boolean} 是否在圆内
 */
GeometryCalculator.isPointInCircle = function(x, y, centerX, centerY, radius) {
    logger.debug("[GeometryCalculator][isPointInCircle] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        radius: radius
    }));
    
    try {
        var distance = GeometryCalculator.calculateDistance(x, y, centerX, centerY);
        var result = distance <= radius;
        
        logger.debug("[GeometryCalculator][isPointInCircle] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointInCircle] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在线段上
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} x1 线段起点X坐标
 * @param {number} y1 线段起点Y坐标
 * @param {number} x2 线段终点X坐标
 * @param {number} y2 线段终点Y坐标
 * @param {number} tolerance 容差
 * @returns {boolean} 是否在线段上
 */
GeometryCalculator.isPointOnLine = function(x, y, x1, y1, x2, y2, tolerance) {
    logger.debug("[GeometryCalculator][isPointOnLine] START - params: " + JSON.stringify({
        x: x,
        y: y,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        tolerance: tolerance
    }));
    
    try {
        // 计算点到线段的距离
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
        
        var dot = A * C + B * D;
        var lenSq = C * C + D * D;
        var param = -1;
        
        if (lenSq !== 0) {
            param = dot / lenSq;
        }
        
        var xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        var distance = GeometryCalculator.calculateDistance(x, y, xx, yy);
        var result = distance <= tolerance;
        
        logger.debug("[GeometryCalculator][isPointOnLine] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointOnLine] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在圆弧上
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 圆弧中心X坐标
 * @param {number} centerY 圆弧中心Y坐标
 * @param {number} radius 半径
 * @param {number} startAngle 起始角度（度）
 * @param {number} endAngle 结束角度（度）
 * @param {number} tolerance 容差
 * @returns {boolean} 是否在圆弧上
 */
GeometryCalculator.isPointOnArc = function(x, y, centerX, centerY, radius, startAngle, endAngle, tolerance) {
    logger.debug("[GeometryCalculator][isPointOnArc] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        tolerance: tolerance
    }));
    
    try {
        // 首先检查点是否在圆环内
        var distance = GeometryCalculator.calculateDistance(x, y, centerX, centerY);
        if (Math.abs(distance - radius) > tolerance) {
            logger.debug("[GeometryCalculator][isPointOnArc] SUCCESS - result: false (not on circle)");
            return false;
        }
        
        // 计算点的角度
        var angle = GeometryCalculator.calculateAngle(centerX, centerY, x, y);
        
        // 检查角度是否在圆弧范围内
        var result;
        if (startAngle <= endAngle) {
            result = angle >= startAngle && angle <= endAngle;
        } else {
            // 处理跨越0度的情况
            result = angle >= startAngle || angle <= endAngle;
        }
        
        logger.debug("[GeometryCalculator][isPointOnArc] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointOnArc] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查点是否在焊盘内
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} padX 焊盘中心X坐标
 * @param {number} padY 焊盘中心Y坐标
 * @param {number} sizeX 焊盘X方向尺寸
 * @param {number} sizeY 焊盘Y方向尺寸
 * @param {string} shape 焊盘形状
 * @param {number} rotation 旋转角度（度）
 * @returns {boolean} 是否在焊盘内
 */
GeometryCalculator.isPointInPad = function(x, y, padX, padY, sizeX, sizeY, shape, rotation) {
    logger.debug("[GeometryCalculator][isPointInPad] START - params: " + JSON.stringify({
        x: x,
        y: y,
        padX: padX,
        padY: padY,
        sizeX: sizeX,
        sizeY: sizeY,
        shape: shape,
        rotation: rotation
    }));
    
    try {
        // 如果有旋转，先旋转点坐标
        if (rotation && rotation !== 0) {
            var rotatedPoint = GeometryCalculator.rotatePoint(x, y, padX, padY, -rotation);
            x = rotatedPoint.x;
            y = rotatedPoint.y;
        }
        
        var result;
        
        switch (shape) {
            case "Round":
                var radius = Math.min(sizeX, sizeY) / 2;
                result = GeometryCalculator.isPointInCircle(x, y, padX, padY, radius);
                break;
            case "Rect":
            case "RoundedRect":
                var halfWidth = sizeX / 2;
                var halfHeight = sizeY / 2;
                result = x >= padX - halfWidth && x <= padX + halfWidth &&
                        y >= padY - halfHeight && y <= padY + halfHeight;
                break;
            case "Octagonal":
                // 八边形检测简化为内切圆检测
                var inscribedRadius = Math.min(sizeX, sizeY) / 2 * 0.924;
                result = GeometryCalculator.isPointInCircle(x, y, padX, padY, inscribedRadius);
                break;
            default:
                // 默认按矩形处理
                var halfWidth = sizeX / 2;
                var halfHeight = sizeY / 2;
                result = x >= padX - halfWidth && x <= padX + halfWidth &&
                        y >= padY - halfHeight && y <= padY + halfHeight;
        }
        
        logger.debug("[GeometryCalculator][isPointInPad] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][isPointInPad] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 旋转点坐标
 * @param {number} x 点的X坐标
 * @param {number} y 点的Y坐标
 * @param {number} centerX 旋转中心X坐标
 * @param {number} centerY 旋转中心Y坐标
 * @param {number} angle 旋转角度（度）
 * @returns {Object} {x, y} 旋转后的坐标
 */
GeometryCalculator.rotatePoint = function(x, y, centerX, centerY, angle) {
    logger.debug("[GeometryCalculator][rotatePoint] START - params: " + JSON.stringify({
        x: x,
        y: y,
        centerX: centerX,
        centerY: centerY,
        angle: angle
    }));
    
    try {
        var angleRad = angle * Math.PI / 180;
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);
        
        var dx = x - centerX;
        var dy = y - centerY;
        
        var rotatedX = centerX + dx * cos - dy * sin;
        var rotatedY = centerY + dx * sin + dy * cos;
        
        var result = { x: rotatedX, y: rotatedY };
        
        logger.debug("[GeometryCalculator][rotatePoint] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][rotatePoint] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 延长线段
 * @param {number} x1 线段起点X坐标
 * @param {number} y1 线段起点Y坐标
 * @param {number} x2 线段终点X坐标
 * @param {number} y2 线段终点Y坐标
 * @param {number} extension 延长距离
 * @returns {Object} {x, y} 延长后的点坐标
 */
GeometryCalculator.extendLine = function(x1, y1, x2, y2, extension) {
    logger.debug("[GeometryCalculator][extendLine] START - params: " + JSON.stringify({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        extension: extension
    }));
    
    try {
        var angle = GeometryCalculator.calculateAngle(x1, y1, x2, y2);
        var angleRad = angle * Math.PI / 180;
        
        var extendedX = x2 + extension * Math.cos(angleRad);
        var extendedY = y2 + extension * Math.sin(angleRad);
        
        var result = { x: extendedX, y: extendedY };
        
        logger.debug("[GeometryCalculator][extendLine] SUCCESS - result: " + JSON.stringify(result));
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][extendLine] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 检查两个包围盒是否相交
 * @param {Object} box1 第一个包围盒 {x1, y1, x2, y2}
 * @param {Object} box2 第二个包围盒 {x1, y1, x2, y2}
 * @returns {boolean} 是否相交
 */
GeometryCalculator.doBoundingBoxesIntersect = function(box1, box2) {
    logger.debug("[GeometryCalculator][doBoundingBoxesIntersect] START - params: " + JSON.stringify({
        box1: box1,
        box2: box2
    }));
    
    try {
        var result = !(box1.x2 < box2.x1 || box2.x2 < box1.x1 ||
                      box1.y2 < box2.y1 || box2.y2 < box1.y1);
        
        logger.debug("[GeometryCalculator][doBoundingBoxesIntersect] SUCCESS - result: " + result);
        return result;
        
    } catch (error) {
        logger.error("[GeometryCalculator][doBoundingBoxesIntersect] ERROR - " + error.message);
        throw error;
    }
};

// 电气计算相关方法（简化实现）

/**
 * 计算走线电阻
 * @param {number} length 长度（mm）
 * @param {number} width 宽度（mm）
 * @param {number} thickness 厚度（mm）
 * @returns {number} 电阻值（欧姆）
 */
GeometryCalculator.calculateTrackResistance = function(length, width, thickness) {
    logger.debug("[GeometryCalculator][calculateTrackResistance] START - params: " + JSON.stringify({
        length: length,
        width: width,
        thickness: thickness
    }));
    
    try {
        // 铜的电阻率：0.0175 Ω·mm²/m
        var resistivity = 0.0175;
        var crossSection = width * thickness; // mm²
        var resistance = resistivity * length / 1000 / crossSection; // 转换为米
        
        logger.debug("[GeometryCalculator][calculateTrackResistance] SUCCESS - result: " + resistance);
        return resistance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackResistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线电容
 * @param {number} length 长度（mm）
 * @param {number} width 宽度（mm）
 * @param {Object} layer 层对象
 * @returns {number} 电容值（pF）
 */
GeometryCalculator.calculateTrackCapacitance = function(length, width, layer) {
    logger.debug("[GeometryCalculator][calculateTrackCapacitance] START - params: " + JSON.stringify({
        length: length,
        width: width,
        layer: layer
    }));
    
    try {
        // 简化的电容计算，实际需要考虑介电常数、层间距等
        var dielectricConstant = 4.5; // FR4的介电常数
        var capacitancePerMm = 0.2; // pF/mm 经验值
        var capacitance = length * capacitancePerMm;
        
        logger.debug("[GeometryCalculator][calculateTrackCapacitance] SUCCESS - result: " + capacitance);
        return capacitance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackCapacitance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算走线阻抗
 * @param {number} width 宽度（mm）
 * @param {number} thickness 厚度（mm）
 * @param {Object} layer 层对象
 * @returns {number} 阻抗值（欧姆）
 */
GeometryCalculator.calculateTrackImpedance = function(width, thickness, layer) {
    logger.debug("[GeometryCalculator][calculateTrackImpedance] START - params: " + JSON.stringify({
        width: width,
        thickness: thickness,
        layer: layer
    }));
    
    try {
        // 简化的阻抗计算，实际需要考虑层间距、介电常数等
        var impedance = 50; // 默认50欧姆
        if (width > 0.2) {
            impedance = 35; // 较宽的走线阻抗较低
        } else if (width < 0.1) {
            impedance = 65; // 较窄的走线阻抗较高
        }
        
        logger.debug("[GeometryCalculator][calculateTrackImpedance] SUCCESS - result: " + impedance);
        return impedance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateTrackImpedance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电阻
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电阻值（欧姆）
 */
GeometryCalculator.calculateViaResistance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaResistance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电阻计算
        var ringThickness = (size - holeSize) / 2;
        var resistance = 0.001; // 典型过孔电阻约1mΩ
        
        logger.debug("[GeometryCalculator][calculateViaResistance] SUCCESS - result: " + resistance);
        return resistance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaResistance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电容
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电容值（pF）
 */
GeometryCalculator.calculateViaCapacitance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaCapacitance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电容计算
        var capacitance = 0.5; // 典型过孔电容约0.5pF
        
        logger.debug("[GeometryCalculator][calculateViaCapacitance] SUCCESS - result: " + capacitance);
        return capacitance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaCapacitance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔电感
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @returns {number} 电感值（nH）
 */
GeometryCalculator.calculateViaInductance = function(size, holeSize, startLayer, endLayer) {
    logger.debug("[GeometryCalculator][calculateViaInductance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize,
        startLayer: startLayer,
        endLayer: endLayer
    }));
    
    try {
        // 简化的过孔电感计算
        var inductance = 1.0; // 典型过孔电感约1nH
        
        logger.debug("[GeometryCalculator][calculateViaInductance] SUCCESS - result: " + inductance);
        return inductance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaInductance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔阻抗
 * @param {number} size 过孔直径（mm）
 * @param {number} holeSize 孔径（mm）
 * @returns {number} 阻抗值（欧姆）
 */
GeometryCalculator.calculateViaImpedance = function(size, holeSize) {
    logger.debug("[GeometryCalculator][calculateViaImpedance] START - params: " + JSON.stringify({
        size: size,
        holeSize: holeSize
    }));
    
    try {
        // 简化的过孔阻抗计算
        var impedance = 25; // 典型过孔阻抗约25欧姆
        
        logger.debug("[GeometryCalculator][calculateViaImpedance] SUCCESS - result: " + impedance);
        return impedance;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaImpedance] ERROR - " + error.message);
        throw error;
    }
};

/**
 * 计算过孔纵横比
 * @param {Object} startLayer 起始层
 * @param {Object} endLayer 结束层
 * @param {number} holeSize 孔径（mm）
 * @returns {number} 纵横比
 */
GeometryCalculator.calculateViaAspectRatio = function(startLayer, endLayer, holeSize) {
    logger.debug("[GeometryCalculator][calculateViaAspectRatio] START - params: " + JSON.stringify({
        startLayer: startLayer,
        endLayer: endLayer,
        holeSize: holeSize
    }));
    
    try {
        // 简化的层间距计算
        var layerDistance = 1.6; // 标准FR4板厚1.6mm
        var aspectRatio = layerDistance / holeSize;
        
        logger.debug("[GeometryCalculator][calculateViaAspectRatio] SUCCESS - result: " + aspectRatio);
        return aspectRatio;
        
    } catch (error) {
        logger.error("[GeometryCalculator][calculateViaAspectRatio] ERROR - " + error.message);
        throw error;
    }
};

    // 返回GeometryCalculator对象
    return GeometryCalculator;
    
})();

// AD环境兼容性导出
if (typeof window !== "undefined") {
    window.GeometryCalculator = GeometryCalculator;
}


// 加载模块: .._src_modules_pcb-interfaces_wrappers_ArcWrapper.js
/**
 * ArcWrapper - 圆弧对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Arc接口封装，提供圆弧对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var ArcWrapper = (function(){
    // 引入依赖 - 使用全局变量
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * ArcWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Arc对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function ArcWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Arc",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || ArcWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });
    
    /**
     * 重写：提取圆弧特有属性
     */
    function _extractSpecificProperties() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 提取圆弧特有属性
            baseInst.setNativeProperty("XCenter", nativeObj.XCenter);
            baseInst.setNativeProperty("YCenter", nativeObj.YCenter);
            baseInst.setNativeProperty("Radius", nativeObj.Radius);
            baseInst.setNativeProperty("StartAngle", nativeObj.StartAngle);
            baseInst.setNativeProperty("EndAngle", nativeObj.EndAngle);
            baseInst.setNativeProperty("LineWidth", nativeObj.LineWidth);
            baseInst.setNativeProperty("Layer", nativeObj.Layer);
            
        } catch (error) {
            baseInst.handleError("_extractSpecificProperties", error);
        }
    }
    
    /**
     * 重写：同步属性到原生对象
     */
    function _syncPropertiesToNative() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 同步圆弧特有属性
            nativeObj.XCenter = baseInst.getNativeProperty("XCenter");
            nativeObj.YCenter = baseInst.getNativeProperty("YCenter");
            nativeObj.Radius = baseInst.getNativeProperty("Radius");
            nativeObj.StartAngle = baseInst.getNativeProperty("StartAngle");
            nativeObj.EndAngle = baseInst.getNativeProperty("EndAngle");
            nativeObj.LineWidth = baseInst.getNativeProperty("LineWidth");
            nativeObj.Layer = baseInst.getNativeProperty("Layer");
            
        } catch (error) {
            baseInst.handleError("_syncPropertiesToNative", error);
        }
    }
    
    // 重写基类的属性提取和同步方法
    baseInst._extractSpecificProperties = _extractSpecificProperties;
    baseInst._syncPropertiesToNative = _syncPropertiesToNative;
    
    // 初始化时提取属性
    _extractSpecificProperties();
    
    /**
     * 获取圆弧中心点X坐标
     * @returns {number} X坐标
     */
    function getCenterX() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的centerX，否则使用X1，最后使用默认值
            return mockData.centerX !== undefined ? mockData.centerX : 
                   (mockData.X1 !== undefined ? mockData.X1 : 0);
        }
        return baseInst.getNativeProperty("XCenter");
    }
    
    /**
     * 设置圆弧中心点X坐标
     * @param {number} value X坐标
     */
    function setCenterX(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().centerX = value;
        }
        baseInst.setNativeProperty("XCenter", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取圆弧中心点Y坐标
     * @returns {number} Y坐标
     */
    function getCenterY() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的centerY，否则使用Y1，最后使用默认值
            return mockData.centerY !== undefined ? mockData.centerY : 
                   (mockData.Y1 !== undefined ? mockData.Y1 : 0);
        }
        return baseInst.getNativeProperty("YCenter");
    }
    
    /**
     * 设置圆弧中心点Y坐标
     * @param {number} value Y坐标
     */
    function setCenterY(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().centerY = value;
        }
        baseInst.setNativeProperty("YCenter", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取圆弧半径
     * @returns {number} 半径
     */
    function getRadius() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的radius，否则计算默认值
            return mockData.radius !== undefined ? mockData.radius : 1000;
        }
        return baseInst.getNativeProperty("Radius");
    }
    
    /**
     * 设置圆弧半径
     * @param {number} value 半径
     */
    function setRadius(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().radius = value;
        }
        baseInst.setNativeProperty("Radius", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取起始角度（度）
     * @returns {number} 起始角度
     */
    function getStartAngle() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的startAngle，否则使用默认值0
            return mockData.startAngle !== undefined ? mockData.startAngle : 0;
        }
        return baseInst.getNativeProperty("StartAngle");
    }
    
    /**
     * 设置起始角度（度）
     * @param {number} value 起始角度
     */
    function setStartAngle(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().startAngle = value;
        }
        baseInst.setNativeProperty("StartAngle", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取结束角度（度）
     * @returns {number} 结束角度
     */
    function getEndAngle() {
        if (baseInst.isMockMode()) {
            var mockData = baseInst.getMockData();
            // 优先使用用户提供的endAngle，否则使用默认值90
            return mockData.endAngle !== undefined ? mockData.endAngle : 90;
        }
        return baseInst.getNativeProperty("EndAngle");
    }
    
    /**
     * 设置结束角度（度）
     * @param {number} value 结束角度
     */
    function setEndAngle(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().endAngle = value;
        }
        baseInst.setNativeProperty("EndAngle", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取线宽
     * @returns {number} 线宽
     */
    function getLineWidth() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().lineWidth || 0.1;
        }
        return baseInst.getNativeProperty("LineWidth");
    }
    
    /**
     * 设置线宽
     * @param {number} value 线宽
     */
    function setLineWidth(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().lineWidth = value;
        }
        baseInst.setNativeProperty("LineWidth", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().layer || { "Name": "Top Layer" };
        }
        return baseInst.getNativeProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().layer = value;
        }
        baseInst.setNativeProperty("Layer", value);
        baseInst._markDirty();
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 绕指定点旋转圆弧 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新中心点位置
            var currentCenterX = getCenterX();
            var currentCenterY = getCenterY();
            var rad = angle * Math.PI / 180;
            var newCenterX = centerX + (currentCenterX - centerX) * Math.cos(rad) - (currentCenterY - centerY) * Math.sin(rad);
            var newCenterY = centerY + (currentCenterX - centerX) * Math.sin(rad) + (currentCenterY - centerY) * Math.cos(rad);
            setCenterX(newCenterX);
            setCenterY(newCenterY);
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.RotateAroundXY === "function") {
                nativeObj.RotateAroundXY(centerX, centerY, angle);
                // 旋转后重新提取属性
                _extractSpecificProperties();
            } else {
                // 降级处理：手动计算旋转
                var currentCenterX = getCenterX();
                var currentCenterY = getCenterY();
                var rad = angle * Math.PI / 180;
                var newCenterX = centerX + (currentCenterX - centerX) * Math.cos(rad) - (currentCenterY - centerY) * Math.sin(rad);
                var newCenterY = centerY + (currentCenterX - centerX) * Math.sin(rad) + (currentCenterY - centerY) * Math.cos(rad);
                setCenterX(newCenterX);
                setCenterY(newCenterY);
                // 同时更新起始和结束角度
                setStartAngle(getStartAngle() + angle);
                setEndAngle(getEndAngle() + angle);
            }
        } catch (error) {
            baseInst.handleError("rotateAroundXY", error);
        }
    }
    
    /**
     * 精确点碰撞检测 (高优先级API)
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMockMode()) {
            // Mock模式下使用简单的圆弧检测
            return isPointOnArc(x, y, getLineWidth());
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.GetState_StrictHitTest === "function") {
                return nativeObj.GetState_StrictHitTest(x, y);
            }
            // 降级处理：使用几何计算
            return isPointOnArc(x, y, getLineWidth());
        } catch (error) {
            baseInst.handleError("getState_StrictHitTest", error);
            return false;
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取圆弧的起点坐标
     * @returns {Object} {x, y} 坐标
     */
    function getStartPoint() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var startAngle = getStartAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.polarToCartesian(centerX, centerY, radius, startAngle);
        }
        
        // 降级处理：手动计算
        var rad = startAngle * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad)
        };
    }
    
    /**
     * 获取圆弧的终点坐标
     * @returns {Object} {x, y} 坐标
     */
    function getEndPoint() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.polarToCartesian(centerX, centerY, radius, endAngle);
        }
        
        // 降级处理：手动计算
        var rad = endAngle * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad)
        };
    }
    
    /**
     * 获取圆弧长度
     * @returns {number} 圆弧长度
     */
    function getArcLength() {
        var radius = getRadius();
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateArcLength(radius, startAngle, endAngle);
        }
        
        // 降级处理：手动计算
        var angleDiff = endAngle - startAngle;
        // 标准化角度差到0-360度范围
        while (angleDiff < 0) {
            angleDiff += 360;
        }
        while (angleDiff > 360) {
            angleDiff -= 360;
        }
        return 2 * Math.PI * radius * (angleDiff / 360);
    }
    
    /**
     * 获取圆弧的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleBoundingBox(centerX, centerY, radius);
        }
        
        // 降级处理：简单的圆形包围盒
        return {
            x1: centerX - radius,
            y1: centerY - radius,
            x2: centerX + radius,
            y2: centerY + radius
        };
    }
    
    /**
     * 检查点是否在圆弧上
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @param {number} tolerance 容差
     * @returns {boolean} 是否在圆弧上
     */
    function isPointOnArc(x, y, tolerance) {
        tolerance = tolerance || 0.01;
        var centerX = getCenterX();
        var centerY = getCenterY();
        var radius = getRadius();
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointOnArc(x, y, centerX, centerY, radius, startAngle, endAngle, tolerance);
        }
        
        // 降级处理：手动计算
        // 1. 检查点到圆心的距离是否接近半径
        var distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        if (Math.abs(distance - radius) > tolerance) {
            return false;
        }
        
        // 2. 检查点是否在圆弧角度范围内
        var pointAngle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
        var normalizedStart = startAngle % 360;
        var normalizedEnd = endAngle % 360;
        var normalizedPoint = pointAngle % 360;
        
        // 处理角度范围跨越0度的情况
        if (normalizedStart <= normalizedEnd) {
            return normalizedPoint >= normalizedStart && normalizedPoint <= normalizedEnd;
        } else {
            return normalizedPoint >= normalizedStart || normalizedPoint <= normalizedEnd;
        }
    }
    
    /**
     * 反转圆弧方向
     */
    function reverse() {
        var startAngle = getStartAngle();
        var endAngle = getEndAngle();
        
        setStartAngle(endAngle);
        setEndAngle(startAngle);
    }
    
    /**
     * 获取圆弧的完整信息
     * @returns {Object} 圆弧信息对象
     */
    function getArcInfo() {
        return {
            centerX: getCenterX(),
            centerY: getCenterY(),
            radius: getRadius(),
            startAngle: getStartAngle(),
            endAngle: getEndAngle(),
            lineWidth: getLineWidth(),
            layer: getLayer(),
            startPoint: getStartPoint(),
            endPoint: getEndPoint(),
            arcLength: getArcLength(),
            boundingBox: getBoundingBox()
        };
    }
    
    /**
     * 同步所有属性到原生对象
     */
    function syncToNative() {
        baseInst.syncToNative();
    }
    
    /**
     * 从原生对象同步所有属性
     */
    function syncFromNative() {
        _extractSpecificProperties();
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            centerX: 0,
            centerY: 0,
            radius: 1,
            startAngle: 0,
            endAngle: 90,
            lineWidth: 0.1,
            layer: { "Name": "Top Layer" }
        };
    }
    
    // 扩展基类实例
    baseInst.getCenterX = getCenterX;
    baseInst.setCenterX = setCenterX;
    baseInst.getCenterY = getCenterY;
    baseInst.setCenterY = setCenterY;
    baseInst.getRadius = getRadius;
    baseInst.setRadius = setRadius;
    baseInst.getStartAngle = getStartAngle;
    baseInst.setStartAngle = setStartAngle;
    baseInst.getEndAngle = getEndAngle;
    baseInst.setEndAngle = setEndAngle;
    baseInst.getLineWidth = getLineWidth;
    baseInst.setLineWidth = setLineWidth;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getStartPoint = getStartPoint;
    baseInst.getEndPoint = getEndPoint;
    baseInst.getArcLength = getArcLength;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.isPointOnArc = isPointOnArc;
    baseInst.reverse = reverse;
    baseInst.getArcInfo = getArcInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    return baseInst;
}

/**
 * 创建ArcWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} ArcWrapper实例
 */
ArcWrapper.create = function(options) {
    return ArcWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
ArcWrapper.getDefaultMockData = function() {
    return {
        centerX: 0,
        centerY: 0,
        radius: 1,
        startAngle: 0,
        endAngle: 90,
        lineWidth: 0.1,
        layer: { "Name": "Top Layer" }
    };
};

    // 返回ArcWrapper构造函数
    return ArcWrapper;
    
})();


// 加载模块: .._src_modules_pcb-interfaces_wrappers_PadWrapper.js
/**
 * PadWrapper - 焊盘对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Pad接口封装，提供焊盘对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var PadWrapper = (function(){
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * PadWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Pad对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function PadWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Pad",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || PadWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });
    
    /**
     * 重写：提取焊盘特有属性
     */
    function _extractSpecificProperties() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 提取焊盘特有属性
            baseInst.setNativeProperty("X", nativeObj.X);
            baseInst.setNativeProperty("Y", nativeObj.Y);
            baseInst.setNativeProperty("SizeX", nativeObj.SizeX);
            baseInst.setNativeProperty("SizeY", nativeObj.SizeY);
            baseInst.setNativeProperty("Shape", nativeObj.Shape);
            baseInst.setNativeProperty("HoleSize", nativeObj.HoleSize);
            baseInst.setNativeProperty("Layer", nativeObj.Layer);
            baseInst.setNativeProperty("Name", nativeObj.Name);
            baseInst.setNativeProperty("PadType", nativeObj.PadType);
            baseInst.setNativeProperty("Rotation", nativeObj.Rotation);
            baseInst.setNativeProperty("Plated", nativeObj.Plated);
            baseInst.setNativeProperty("Connected", nativeObj.Connected);
            
            // 高优先级API：PadMode
            if (typeof nativeObj.PadMode !== "undefined") {
                baseInst.setNativeProperty("PadMode", nativeObj.PadMode);
            }
            
            // 中优先级API
            if (typeof nativeObj.TopShape !== "undefined") {
                baseInst.setNativeProperty("TopShape", nativeObj.TopShape);
            }
            if (typeof nativeObj.MidShape !== "undefined") {
                baseInst.setNativeProperty("MidShape", nativeObj.MidShape);
            }
            if (typeof nativeObj.BotShape !== "undefined") {
                baseInst.setNativeProperty("BotShape", nativeObj.BotShape);
            }
            if (typeof nativeObj.SlotSize !== "undefined") {
                baseInst.setNativeProperty("SlotSize", nativeObj.SlotSize);
            }
            if (typeof nativeObj.SlotXSize !== "undefined") {
                baseInst.setNativeProperty("SlotXSize", nativeObj.SlotXSize);
            }
            if (typeof nativeObj.SlotYSize !== "undefined") {
                baseInst.setNativeProperty("SlotYSize", nativeObj.SlotYSize);
            }
            
        } catch (error) {
            baseInst.handleError("_extractSpecificProperties", error);
        }
    }
    
    /**
     * 重写：同步属性到原生对象
     */
    function _syncPropertiesToNative() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 同步基础属性
            nativeObj.X = baseInst.getNativeProperty("X");
            nativeObj.Y = baseInst.getNativeProperty("Y");
            nativeObj.SizeX = baseInst.getNativeProperty("SizeX");
            nativeObj.SizeY = baseInst.getNativeProperty("SizeY");
            nativeObj.Shape = baseInst.getNativeProperty("Shape");
            nativeObj.HoleSize = baseInst.getNativeProperty("HoleSize");
            nativeObj.Layer = baseInst.getNativeProperty("Layer");
            nativeObj.Name = baseInst.getNativeProperty("Name");
            nativeObj.PadType = baseInst.getNativeProperty("PadType");
            nativeObj.Rotation = baseInst.getNativeProperty("Rotation");
            nativeObj.Plated = baseInst.getNativeProperty("Plated");
            nativeObj.Connected = baseInst.getNativeProperty("Connected");
            
            // 同步高优先级API
            if (typeof nativeObj.PadMode !== "undefined") {
                nativeObj.PadMode = baseInst.getNativeProperty("PadMode");
            }
            
            // 同步中优先级API
            if (typeof nativeObj.TopShape !== "undefined") {
                nativeObj.TopShape = baseInst.getNativeProperty("TopShape");
            }
            if (typeof nativeObj.MidShape !== "undefined") {
                nativeObj.MidShape = baseInst.getNativeProperty("MidShape");
            }
            if (typeof nativeObj.BotShape !== "undefined") {
                nativeObj.BotShape = baseInst.getNativeProperty("BotShape");
            }
            if (typeof nativeObj.SlotSize !== "undefined") {
                nativeObj.SlotSize = baseInst.getNativeProperty("SlotSize");
            }
            if (typeof nativeObj.SlotXSize !== "undefined") {
                nativeObj.SlotXSize = baseInst.getNativeProperty("SlotXSize");
            }
            if (typeof nativeObj.SlotYSize !== "undefined") {
                nativeObj.SlotYSize = baseInst.getNativeProperty("SlotYSize");
            }
            
        } catch (error) {
            baseInst.handleError("_syncPropertiesToNative", error);
        }
    }
    
    // 重写基类的属性提取和同步方法
    baseInst._extractSpecificProperties = _extractSpecificProperties;
    baseInst._syncPropertiesToNative = _syncPropertiesToNative;
    
    // 初始化时提取属性
    _extractSpecificProperties();
    
    /**
     * 获取焊盘中心点X坐标
     * @returns {number} X坐标
     */
    function getX() {
        return baseInst.getNativeProperty("X");
    }
    
    /**
     * 设置焊盘中心点X坐标
     * @param {number} value X坐标
     */
    function setX(value) {
        baseInst.setNativeProperty("X", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘中心点Y坐标
     * @returns {number} Y坐标
     */
    function getY() {
        return baseInst.getNativeProperty("Y");
    }
    
    /**
     * 设置焊盘中心点Y坐标
     * @param {number} value Y坐标
     */
    function setY(value) {
        baseInst.setNativeProperty("Y", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘尺寸（X方向）
     * @returns {number} X方向尺寸
     */
    function getSizeX() {
        return baseInst.getNativeProperty("SizeX");
    }
    
    /**
     * 设置焊盘尺寸（X方向）
     * @param {number} value X方向尺寸
     */
    function setSizeX(value) {
        baseInst.setNativeProperty("SizeX", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘尺寸（Y方向）
     * @returns {number} Y方向尺寸
     */
    function getSizeY() {
        return baseInst.getNativeProperty("SizeY");
    }
    
    /**
     * 设置焊盘尺寸（Y方向）
     * @param {number} value Y方向尺寸
     */
    function setSizeY(value) {
        baseInst.setNativeProperty("SizeY", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘形状
     * @returns {string} 焊盘形状（Rect, Round, Octagonal, RoundedRect）
     */
    function getShape() {
        return baseInst.getNativeProperty("Shape");
    }
    
    /**
     * 设置焊盘形状
     * @param {string} value 焊盘形状
     */
    function setShape(value) {
        baseInst.setNativeProperty("Shape", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取钻孔尺寸
     * @returns {number} 钻孔尺寸
     */
    function getHoleSize() {
        return baseInst.getNativeProperty("HoleSize");
    }
    
    /**
     * 设置钻孔尺寸
     * @param {number} value 钻孔尺寸
     */
    function setHoleSize(value) {
        baseInst.setNativeProperty("HoleSize", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        return baseInst.getNativeProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        baseInst.setNativeProperty("Layer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘编号
     * @returns {string} 焊盘编号
     */
    function getName() {
        return baseInst.getNativeProperty("Name");
    }
    
    /**
     * 设置焊盘编号
     * @param {string} value 焊盘编号
     */
    function setName(value) {
        baseInst.setNativeProperty("Name", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘类型
     * @returns {string} 焊盘类型（Standard, Mechanical, Thermal, Fiducial）
     */
    function getPadType() {
        return baseInst.getNativeProperty("PadType");
    }
    
    /**
     * 设置焊盘类型
     * @param {string} value 焊盘类型
     */
    function setPadType(value) {
        baseInst.setNativeProperty("PadType", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取焊盘旋转角度
     * @returns {number} 旋转角度（度）
     */
    function getRotation() {
        return baseInst.getNativeProperty("Rotation");
    }
    
    /**
     * 设置焊盘旋转角度
     * @param {number} value 旋转角度（度）
     */
    function setRotation(value) {
        baseInst.setNativeProperty("Rotation", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查焊盘是否被电镀
     * @returns {boolean} 是否被电镀
     */
    function isPlated() {
        return baseInst.getNativeProperty("Plated");
    }
    
    /**
     * 设置焊盘电镀状态
     * @param {boolean} value 是否电镀
     */
    function setPlated(value) {
        baseInst.setNativeProperty("Plated", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查焊盘是否已连接
     * @returns {boolean} 是否已连接
     */
    function isConnected() {
        return baseInst.getNativeProperty("Connected");
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 获取焊盘模式 (最高优先级API)
     * @returns {number} 焊盘模式
     */
    function getPadMode() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().padMode || 0;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.PadMode !== "undefined") {
                return nativeObj.PadMode;
            }
            return baseInst.getNativeProperty("PadMode") || 0;
        } catch (error) {
            baseInst.handleError("getPadMode", error);
            return 0;
        }
    }
    
    /**
     * 设置焊盘模式 (最高优先级API)
     * @param {number} value 焊盘模式
     */
    function setPadMode(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().padMode = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.PadMode !== "undefined") {
                nativeObj.PadMode = value;
            }
            baseInst.setNativeProperty("PadMode", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setPadMode", error);
        }
    }
    
    /**
     * 绕指定点旋转焊盘 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新旋转角度
            var currentRotation = getRotation();
            setRotation(currentRotation + angle);
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.RotateAroundXY === "function") {
                nativeObj.RotateAroundXY(centerX, centerY, angle);
                // 旋转后重新提取属性
                _extractSpecificProperties();
            } else {
                // 降级处理：手动计算旋转
                var currentX = getX();
                var currentY = getY();
                var rad = angle * Math.PI / 180;
                var newX = centerX + (currentX - centerX) * Math.cos(rad) - (currentY - centerY) * Math.sin(rad);
                var newY = centerY + (currentX - centerX) * Math.sin(rad) + (currentY - centerY) * Math.cos(rad);
                setX(newX);
                setY(newY);
                setRotation(getRotation() + angle);
            }
        } catch (error) {
            baseInst.handleError("rotateAroundXY", error);
        }
    }
    
    /**
     * 精确点碰撞检测 (高优先级API)
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMockMode()) {
            // Mock模式下使用简单的矩形检测
            var padX = getX();
            var padY = getY();
            var sizeX = getSizeX();
            var sizeY = getSizeY();
            return x >= padX - sizeX/2 && x <= padX + sizeX/2 &&
                   y >= padY - sizeY/2 && y <= padY + sizeY/2;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.GetState_StrictHitTest === "function") {
                return nativeObj.GetState_StrictHitTest(x, y);
            }
            // 降级处理：使用几何计算
            return isPointInside(x, y);
        } catch (error) {
            baseInst.handleError("getState_StrictHitTest", error);
            return false;
        }
    }
    
    // ========== 中优先级API实现 ==========
    
    /**
     * 获取顶层焊盘形状 (中优先级API)
     * @returns {string} 顶层形状
     */
    function getTopShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().topShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.TopShape !== "undefined") {
                return nativeObj.TopShape;
            }
            return baseInst.getNativeProperty("TopShape") || getShape();
        } catch (error) {
            baseInst.handleError("getTopShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置顶层焊盘形状 (中优先级API)
     * @param {string} value 顶层形状
     */
    function setTopShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().topShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.TopShape !== "undefined") {
                nativeObj.TopShape = value;
            }
            baseInst.setNativeProperty("TopShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setTopShape", error);
        }
    }
    
    /**
     * 获取中间层焊盘形状 (中优先级API)
     * @returns {string} 中间层形状
     */
    function getMidShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().midShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.MidShape !== "undefined") {
                return nativeObj.MidShape;
            }
            return baseInst.getNativeProperty("MidShape") || getShape();
        } catch (error) {
            baseInst.handleError("getMidShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置中间层焊盘形状 (中优先级API)
     * @param {string} value 中间层形状
     */
    function setMidShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().midShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.MidShape !== "undefined") {
                nativeObj.MidShape = value;
            }
            baseInst.setNativeProperty("MidShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setMidShape", error);
        }
    }
    
    /**
     * 获取底层焊盘形状 (中优先级API)
     * @returns {string} 底层形状
     */
    function getBotShape() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().botShape || getShape();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.BotShape !== "undefined") {
                return nativeObj.BotShape;
            }
            return baseInst.getNativeProperty("BotShape") || getShape();
        } catch (error) {
            baseInst.handleError("getBotShape", error);
            return getShape();
        }
    }
    
    /**
     * 设置底层焊盘形状 (中优先级API)
     * @param {string} value 底层形状
     */
    function setBotShape(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().botShape = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.BotShape !== "undefined") {
                nativeObj.BotShape = value;
            }
            baseInst.setNativeProperty("BotShape", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setBotShape", error);
        }
    }
    
    /**
     * 获取槽孔尺寸 (中优先级API)
     * @returns {number} 槽孔尺寸
     */
    function getSlotSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotSize !== "undefined") {
                return nativeObj.SlotSize;
            }
            return baseInst.getNativeProperty("SlotSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔尺寸 (中优先级API)
     * @param {number} value 槽孔尺寸
     */
    function setSlotSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotSize !== "undefined") {
                nativeObj.SlotSize = value;
            }
            baseInst.setNativeProperty("SlotSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotSize", error);
        }
    }
    
    /**
     * 获取槽孔X方向尺寸 (中优先级API)
     * @returns {number} 槽孔X方向尺寸
     */
    function getSlotXSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotXSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotXSize !== "undefined") {
                return nativeObj.SlotXSize;
            }
            return baseInst.getNativeProperty("SlotXSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotXSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔X方向尺寸 (中优先级API)
     * @param {number} value 槽孔X方向尺寸
     */
    function setSlotXSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotXSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotXSize !== "undefined") {
                nativeObj.SlotXSize = value;
            }
            baseInst.setNativeProperty("SlotXSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotXSize", error);
        }
    }
    
    /**
     * 获取槽孔Y方向尺寸 (中优先级API)
     * @returns {number} 槽孔Y方向尺寸
     */
    function getSlotYSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().slotYSize || getHoleSize();
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotYSize !== "undefined") {
                return nativeObj.SlotYSize;
            }
            return baseInst.getNativeProperty("SlotYSize") || getHoleSize();
        } catch (error) {
            baseInst.handleError("getSlotYSize", error);
            return getHoleSize();
        }
    }
    
    /**
     * 设置槽孔Y方向尺寸 (中优先级API)
     * @param {number} value 槽孔Y方向尺寸
     */
    function setSlotYSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().slotYSize = value;
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.SlotYSize !== "undefined") {
                nativeObj.SlotYSize = value;
            }
            baseInst.setNativeProperty("SlotYSize", value);
            baseInst._markDirty();
        } catch (error) {
            baseInst.handleError("setSlotYSize", error);
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取焊盘的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x = getX();
        var y = getY();
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateRectBoundingBox(x, y, sizeX, sizeY);
        }
        
        // 降级处理
        return {
            x1: x - sizeX / 2,
            y1: y - sizeY / 2,
            x2: x + sizeX / 2,
            y2: y + sizeY / 2
        };
    }
    
    /**
     * 获取焊盘面积
     * @returns {number} 焊盘面积
     */
    function getArea() {
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        var shape = getShape();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculatePadArea(sizeX, sizeY, shape);
        }
        
        // 降级处理：简单矩形面积
        return sizeX * sizeY;
    }
    
    /**
     * 检查点是否在焊盘内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在焊盘内
     */
    function isPointInside(x, y) {
        var padX = getX();
        var padY = getY();
        var sizeX = getSizeX();
        var sizeY = getSizeY();
        var shape = getShape();
        var rotation = getRotation();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInPad(x, y, padX, padY, sizeX, sizeY, shape, rotation);
        }
        
        // 降级处理：简单的矩形检测
        return x >= padX - sizeX/2 && x <= padX + sizeX/2 &&
               y >= padY - sizeY/2 && y <= padY + sizeY/2;
    }
    
    /**
     * 获取焊盘的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            isPlated: isPlated(),
            isConnected: isConnected(),
            netName: getNetName(),
            voltage: getVoltage()
        };
    }
    
    /**
     * 获取网络名称
     * @returns {string} 网络名称
     */
    function getNetName() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().netName || "";
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && nativeObj.Net && nativeObj.Net.Name) {
                return nativeObj.Net.Name;
            }
            return "";
        } catch (error) {
            baseInst.handleError("getNetName", error);
            return "";
        }
    }
    
    /**
     * 获取焊盘电压
     * @returns {number} 电压值
     */
    function getVoltage() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().voltage || 0;
        }
        // 实际实现需要从网络或其他地方获取电压信息
        return 0;
    }
    
    /**
     * 获取焊盘的完整信息
     * @returns {Object} 焊盘信息对象
     */
    function getPadInfo() {
        return {
            x: getX(),
            y: getY(),
            sizeX: getSizeX(),
            sizeY: getSizeY(),
            shape: getShape(),
            holeSize: getHoleSize(),
            layer: getLayer(),
            name: getName(),
            padType: getPadType(),
            rotation: getRotation(),
            padMode: getPadMode(),
            topShape: getTopShape(),
            midShape: getMidShape(),
            botShape: getBotShape(),
            slotSize: getSlotSize(),
            slotXSize: getSlotXSize(),
            slotYSize: getSlotYSize(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            electrical: getElectricalProperties()
        };
    }
    
    /**
     * 同步所有属性到原生对象
     */
    function syncToNative() {
        baseInst.syncToNative();
    }
    
    /**
     * 从原生对象同步所有属性
     */
    function syncFromNative() {
        _extractSpecificProperties();
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            x: 0,
            y: 0,
            sizeX: 1,
            sizeY: 1,
            shape: "Rect",
            holeSize: 0.5,
            layer: { "Name": "Top Layer" },
            name: "1",
            padType: "Standard",
            rotation: 0,
            plated: true,
            connected: false,
            netName: "",
            voltage: 0,
            padMode: 0,
            topShape: "Rect",
            midShape: "Rect",
            botShape: "Rect",
            slotSize: 0.5,
            slotXSize: 0.5,
            slotYSize: 0.5
        };
    }
    
    // 扩展基类实例
    baseInst.getX = getX;
    baseInst.setX = setX;
    baseInst.getY = getY;
    baseInst.setY = setY;
    baseInst.getSizeX = getSizeX;
    baseInst.setSizeX = setSizeX;
    baseInst.getSizeY = getSizeY;
    baseInst.setSizeY = setSizeY;
    baseInst.getShape = getShape;
    baseInst.setShape = setShape;
    baseInst.getHoleSize = getHoleSize;
    baseInst.setHoleSize = setHoleSize;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getName = getName;
    baseInst.setName = setName;
    baseInst.getPadType = getPadType;
    baseInst.setPadType = setPadType;
    baseInst.getRotation = getRotation;
    baseInst.setRotation = setRotation;
    baseInst.isPlated = isPlated;
    baseInst.setPlated = setPlated;
    baseInst.isConnected = isConnected;
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.getNetName = getNetName;
    baseInst.getVoltage = getVoltage;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.isPointInside = isPointInside;
    baseInst.getPadInfo = getPadInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    
    // 高优先级API
    baseInst.getPadMode = getPadMode;
    baseInst.setPadMode = setPadMode;
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    // 中优先级API
    baseInst.getTopShape = getTopShape;
    baseInst.setTopShape = setTopShape;
    baseInst.getMidShape = getMidShape;
    baseInst.setMidShape = setMidShape;
    baseInst.getBotShape = getBotShape;
    baseInst.setBotShape = setBotShape;
    baseInst.getSlotSize = getSlotSize;
    baseInst.setSlotSize = setSlotSize;
    baseInst.getSlotXSize = getSlotXSize;
    baseInst.setSlotXSize = setSlotXSize;
    baseInst.getSlotYSize = getSlotYSize;
    baseInst.setSlotYSize = setSlotYSize;
    
    return baseInst;
}

/**
 * 创建PadWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} PadWrapper实例
 */
PadWrapper.create = function(options) {
    return PadWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
PadWrapper.getDefaultMockData = function() {
    return {
        x: 0,
        y: 0,
        sizeX: 1,
        sizeY: 1,
        shape: "Rect",
        holeSize: 0.5,
        layer: { "Name": "Top Layer" },
        name: "1",
        padType: "Standard",
        rotation: 0,
        plated: true,
        connected: false,
        netName: "",
        voltage: 0,
        padMode: 0,
        topShape: "Rect",
        midShape: "Rect",
        botShape: "Rect",
        slotSize: 0.5,
        slotXSize: 0.5,
        slotYSize: 0.5
    };
};

    // 返回PadWrapper构造函数
    return PadWrapper;
    
})();


// 加载模块: .._src_modules_pcb-interfaces_wrappers_TrackWrapper.js
/**
 * TrackWrapper - 走线对象封装（双向绑定架构）
 * 
 * 封装IPCB_Track接口，提供走线对象的属性访问、计算和Mock支持
 * 支持直接访问原生对象和双向绑定
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var TrackWrapper = (function(){
    // 引入依赖 - 使用全局变量
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * TrackWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Track对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     */
    function TrackWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数，启用直接访问和实时同步
    var baseInst = BasePCBWrapper.create({
        objectType: "Track",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        enableMock: options.enableMock,
        mockData: options.mockData || TrackWrapper.getDefaultMockData(),
        enableDirectAccess: true,
        syncMode: options.syncMode || "auto"  // 默认自动同步模式
    });
    
    // 重写基类的属性提取方法
    baseInst._extractSpecificProperties = function() {
        if (baseInst.nativeObject) {
            // 提取Track特有属性
            baseInst.cachedProperties.X1 = baseInst.nativeObject.X1;
            baseInst.cachedProperties.Y1 = baseInst.nativeObject.Y1;
            baseInst.cachedProperties.X2 = baseInst.nativeObject.X2;
            baseInst.cachedProperties.Y2 = baseInst.nativeObject.Y2;
            baseInst.cachedProperties.Width = baseInst.nativeObject.Width;
            baseInst.cachedProperties.Layer = baseInst.nativeObject.Layer;
            baseInst.cachedProperties.Net = baseInst.nativeObject.Net;
            baseInst.cachedProperties.ObjectId = baseInst.nativeObject.ObjectId;
            baseInst.cachedProperties.I_ObjectAddress = baseInst.nativeObject.I_ObjectAddress;
            baseInst.cachedProperties.V6_LayerID = baseInst.nativeObject.V6_LayerID;
            baseInst.cachedProperties.V7_LayerID = baseInst.nativeObject.V7_LayerID;
            baseInst.cachedProperties.LayerStack = baseInst.nativeObject.LayerStack;
        }
    };
    
    // 重写基类的属性同步方法
    baseInst._syncPropertiesToNative = function() {
        if (baseInst.nativeObject && baseInst.isDirty) {
            // 同步Track特有属性
            if (baseInst.cachedProperties.hasOwnProperty("X1")) {
                baseInst.nativeObject.X1 = baseInst.cachedProperties.X1;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Y1")) {
                baseInst.nativeObject.Y1 = baseInst.cachedProperties.Y1;
            }
            if (baseInst.cachedProperties.hasOwnProperty("X2")) {
                baseInst.nativeObject.X2 = baseInst.cachedProperties.X2;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Y2")) {
                baseInst.nativeObject.Y2 = baseInst.cachedProperties.Y2;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Width")) {
                baseInst.nativeObject.Width = baseInst.cachedProperties.Width;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Layer")) {
                baseInst.nativeObject.Layer = baseInst.cachedProperties.Layer;
            }
            if (baseInst.cachedProperties.hasOwnProperty("Net")) {
                baseInst.nativeObject.Net = baseInst.cachedProperties.Net;
            }
            
            return true;
        }
        return true;
    };
    
    // === 基础属性访问方法（双向绑定） ===
    
    /**
     * 获取起点X坐标
     * @returns {number} X坐标
     */
    function getX1() {
        return baseInst.getProperty("X1");
    }
    
    /**
     * 设置起点X坐标
     * @param {number} value X坐标
     */
    function setX1(value) {
        baseInst.setProperty("X1", value);
    }
    
    /**
     * 获取起点Y坐标
     * @returns {number} Y坐标
     */
    function getY1() {
        return baseInst.getProperty("Y1");
    }
    
    /**
     * 设置起点Y坐标
     * @param {number} value Y坐标
     */
    function setY1(value) {
        baseInst.setProperty("Y1", value);
    }
    
    /**
     * 获取终点X坐标
     * @returns {number} X坐标
     */
    function getX2() {
        return baseInst.getProperty("X2");
    }
    
    /**
     * 设置终点X坐标
     * @param {number} value X坐标
     */
    function setX2(value) {
        baseInst.setProperty("X2", value);
    }
    
    /**
     * 获取终点Y坐标
     * @returns {number} Y坐标
     */
    function getY2() {
        return baseInst.getProperty("Y2");
    }
    
    /**
     * 设置终点Y坐标
     * @param {number} value Y坐标
     */
    function setY2(value) {
        baseInst.setProperty("Y2", value);
    }
    
    /**
     * 获取线宽
     * @returns {number} 线宽
     */
    function getWidth() {
        return baseInst.getProperty("Width");
    }
    
    /**
     * 设置线宽
     * @param {number} value 线宽
     */
    function setWidth(value) {
        baseInst.setProperty("Width", value);
    }
    
    /**
     * 获取所在层
     * @returns {Object} 层对象
     */
    function getLayer() {
        return baseInst.getProperty("Layer");
    }
    
    /**
     * 设置所在层
     * @param {Object} value 层对象
     */
    function setLayer(value) {
        baseInst.setProperty("Layer", value);
    }
    
    /**
     * 获取网络对象
     * @returns {Object} 网络对象
     */
    function getNet() {
        return baseInst.getProperty("Net");
    }
    
    /**
     * 设置网络对象
     * @param {Object} value 网络对象
     */
    function setNet(value) {
        baseInst.setProperty("Net", value);
    }
    
    /**
     * 获取网络名称
     * @returns {string} 网络名称
     */
    function getNetName() {
        var net = getNet();
        if (net && net.Name) {
            return net.Name;
        }
        return "";
    }
    
    // === 高优先级缺失API实现 ===
    
    /**
     * 绕指定点旋转走线（高优先级API）
     * @param {number} cx 旋转中心X坐标
     * @param {number} cy 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     * @returns {boolean} 是否成功
     */
    function rotateAroundXY(cx, cy, angle) {
        if (baseInst.isMock) {
            // Mock模式：手动计算旋转
            var x1 = getX1();
            var y1 = getY1();
            var x2 = getX2();
            var y2 = getY2();
            
            var rad = angle * Math.PI / 180;
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);
            
            // 旋转起点
            var newX1 = cx + (x1 - cx) * cos - (y1 - cy) * sin;
            var newY1 = cy + (x1 - cx) * sin + (y1 - cy) * cos;
            
            // 旋转终点
            var newX2 = cx + (x2 - cx) * cos - (y2 - cy) * sin;
            var newY2 = cy + (x2 - cx) * sin + (y2 - cy) * cos;
            
            setX1(newX1);
            setY1(newY1);
            setX2(newX2);
            setY2(newY2);
            
            return true;
        } else {
            // 直接调用原生方法
            try {
                baseInst.callNativeMethod("RotateAroundXY", cx, cy, angle);
                // 重新同步属性
                baseInst.syncFromNative();
                return true;
            } catch (error) {
                if (baseInst.logger && baseInst.logger.error) {
                    baseInst.logger.error("[TrackWrapper][index.js][rotateAroundXY] Native method failed: " + error.message);
                }
                return false;
            }
        }
    }
    
    /**
     * 获取精确点碰撞检测结果（中优先级API）
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMock) {
            // Mock模式：使用几何计算
            return isPointOnTrack(x, y, getWidth() / 2);
        } else {
            // 直接调用原生方法
            try {
                return baseInst.callNativeMethod("GetState_StrictHitTest", x, y);
            } catch (error) {
                if (baseInst.logger && baseInst.logger.error) {
                    baseInst.logger.error("[TrackWrapper][index.js][getState_StrictHitTest] Native method failed: " + error.message);
                }
                // 降级到几何计算
                return isPointOnTrack(x, y, getWidth() / 2);
            }
        }
    }
    
    // === 计算方法 ===
    
    /**
     * 获取走线长度
     * @returns {number} 走线长度
     */
    function getLength() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateDistance(x1, y1, x2, y2);
        } else {
            // 降级计算
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    
    /**
     * 获取走线角度（度）
     * @returns {number} 走线角度
     */
    function getAngle() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateAngle(x1, y1, x2, y2);
        } else {
            // 降级计算
            var dx = x2 - x1;
            var dy = y2 - y1;
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }
    }
    
    /**
     * 获取走线的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackBoundingBox(x1, y1, x2, y2, width);
        } else {
            // 降级计算
            return {
                x1: Math.min(x1, x2) - width / 2,
                y1: Math.min(y1, y2) - width / 2,
                x2: Math.max(x1, x2) + width / 2,
                y2: Math.max(y1, y2) + width / 2
            };
        }
    }
    
    /**
     * 获取走线面积
     * @returns {number} 走线面积
     */
    function getArea() {
        var length = getLength();
        var width = getWidth();
        return length * width;
    }
    
    /**
     * 检查点是否在走线上
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @param {number} tolerance 容差
     * @returns {boolean} 是否在走线上
     */
    function isPointOnTrack(x, y, tolerance) {
        tolerance = tolerance || getWidth() / 2;
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointOnLine(x, y, x1, y1, x2, y2, tolerance);
        } else {
            // 降级计算
            var A = x - x1;
            var B = y - y1;
            var C = x2 - x1;
            var D = y2 - y1;
            
            var dot = A * C + B * D;
            var lenSq = C * C + D * D;
            var param = lenSq !== 0 ? dot / lenSq : -1;
            
            var xx, yy;
            
            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            
            var dx = x - xx;
            var dy = y - yy;
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            return distance <= tolerance;
        }
    }
    
    /**
     * 获取走线中点坐标
     * @returns {Object} {x, y} 中点坐标
     */
    function getMidPoint() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateMidPoint(x1, y1, x2, y2);
        } else {
            // 降级计算
            return {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2
            };
        }
    }
    
    // === 操作方法 ===
    
    /**
     * 反转走线方向
     */
    function reverse() {
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        
        setX1(x2);
        setY1(y2);
        setX2(x1);
        setY2(y1);
    }
    
    /**
     * 延长走线
     * @param {number} startExtension 起点延长距离
     * @param {number} endExtension 终点延长距离
     */
    function extend(startExtension, endExtension) {
        startExtension = startExtension || 0;
        endExtension = endExtension || 0;
        
        var x1 = getX1();
        var y1 = getY1();
        var x2 = getX2();
        var y2 = getY2();
        var angle = getAngle();
        
        if (startExtension > 0) {
            var rad = angle * Math.PI / 180;
            var newX1 = x1 - startExtension * Math.cos(rad);
            var newY1 = y1 - startExtension * Math.sin(rad);
            setX1(newX1);
            setY1(newY1);
        }
        
        if (endExtension > 0) {
            var rad = angle * Math.PI / 180;
            var newX2 = x2 + endExtension * Math.cos(rad);
            var newY2 = y2 + endExtension * Math.sin(rad);
            setX2(newX2);
            setY2(newY2);
        }
    }
    
    /**
     * 移动走线
     * @param {number} dx X方向偏移
     * @param {number} dy Y方向偏移
     */
    function move(dx, dy) {
        setX1(getX1() + dx);
        setY1(getY1() + dy);
        setX2(getX2() + dx);
        setY2(getY2() + dy);
    }
    
    /**
     * 设置走线坐标
     * @param {number} x1 起点X
     * @param {number} y1 起点Y
     * @param {number} x2 终点X
     * @param {number} y2 终点Y
     */
    function setCoordinates(x1, y1, x2, y2) {
        setX1(x1);
        setY1(y1);
        setX2(x2);
        setY2(y2);
    }
    
    // === 电气特性计算 ===
    
    /**
     * 获取走线的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            netName: getNetName(),
            resistance: calculateResistance(),
            capacitance: calculateCapacitance(),
            impedance: calculateImpedance()
        };
    }
    
    /**
     * 计算走线电阻
     * @returns {number} 电阻值（欧姆）
     */
    function calculateResistance() {
        var length = getLength();
        var width = getWidth();
        var thickness = 0.035; // 默认铜厚35um
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackResistance(length, width, thickness);
        } else {
            // 降级计算（简化公式）
            return 0.0175 * length / (width * thickness); // 铜电阻率
        }
    }
    
    /**
     * 计算走线电容
     * @returns {number} 电容值（pF）
     */
    function calculateCapacitance() {
        var length = getLength();
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackCapacitance(length, width, getLayer());
        } else {
            // 降级计算（简化公式）
            return 0.1 * length * width; // 简化估算
        }
    }
    
    /**
     * 计算走线阻抗
     * @returns {number} 阻抗值（欧姆）
     */
    function calculateImpedance() {
        var width = getWidth();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateTrackImpedance(width, 0.035, getLayer());
        } else {
            // 降级计算（简化公式）
            return 50 / width; // 简化估算
        }
    }
    
    // === 冲突检测 ===
    
    /**
     * 检查走线是否与其他对象冲突
     * @param {Array} otherObjects 其他对象数组
     * @returns {Array} 冲突对象数组
     */
    function checkConflicts(otherObjects) {
        var conflicts = [];
        var boundingBox = getBoundingBox();
        
        for (var i = 0; i < otherObjects.length; i++) {
            var obj = otherObjects[i];
            if (obj.getObjectId && obj.getObjectId() !== baseInst.getObjectId()) {
                var objBoundingBox = obj.getBoundingBox();
                if (GeometryCalculator && GeometryCalculator.doBoundingBoxesIntersect) {
                    if (GeometryCalculator.doBoundingBoxesIntersect(boundingBox, objBoundingBox)) {
                        conflicts.push(obj);
                    }
                } else {
                    // 降级检测
                    if (objBoundingBox && 
                        !(boundingBox.x2 < objBoundingBox.x1 || 
                          boundingBox.x1 > objBoundingBox.x2 || 
                          boundingBox.y2 < objBoundingBox.y1 || 
                          boundingBox.y1 > objBoundingBox.y2)) {
                        conflicts.push(obj);
                    }
                }
            }
        }
        
        return conflicts;
    }
    
    // === 信息获取 ===
    
    /**
     * 获取走线的完整信息
     * @returns {Object} 走线信息对象
     */
    function getTrackInfo() {
        return {
            x1: getX1(),
            y1: getY1(),
            x2: getX2(),
            y2: getY2(),
            width: getWidth(),
            layer: getLayer(),
            netName: getNetName(),
            length: getLength(),
            angle: getAngle(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            midPoint: getMidPoint(),
            electrical: getElectricalProperties(),
            objectId: baseInst.getObjectId(),
            isMock: baseInst.isMockObject()
        };
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            X1: 0,
            Y1: 0,
            X2: 1,
            Y2: 0,
            Width: 0.1,
            Layer: { "Name": "Top Layer", "V6_LayerID": 1 },
            Net: { "Name": "" },
            ObjectId: "mock_track_001",
            I_ObjectAddress: 1001,
            V6_LayerID: 1,
            V7_LayerID: 1,
            LayerStack: null
        };
    }
    
    // === 扩展基类实例 ===
    baseInst.getX1 = getX1;
    baseInst.setX1 = setX1;
    baseInst.getY1 = getY1;
    baseInst.setY1 = setY1;
    baseInst.getX2 = getX2;
    baseInst.setX2 = setX2;
    baseInst.getY2 = getY2;
    baseInst.setY2 = setY2;
    baseInst.getWidth = getWidth;
    baseInst.setWidth = setWidth;
    baseInst.getLayer = getLayer;
    baseInst.setLayer = setLayer;
    baseInst.getNet = getNet;
    baseInst.setNet = setNet;
    baseInst.getNetName = getNetName;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    // 计算方法
    baseInst.getLength = getLength;
    baseInst.getAngle = getAngle;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.isPointOnTrack = isPointOnTrack;
    baseInst.getMidPoint = getMidPoint;
    
    // 操作方法
    baseInst.reverse = reverse;
    baseInst.extend = extend;
    baseInst.move = move;
    baseInst.setCoordinates = setCoordinates;
    
    // 电气特性
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.calculateResistance = calculateResistance;
    baseInst.calculateCapacitance = calculateCapacitance;
    baseInst.calculateImpedance = calculateImpedance;
    
    // 冲突检测
    baseInst.checkConflicts = checkConflicts;
    
    // 信息获取
    baseInst.getTrackInfo = getTrackInfo;
    baseInst.getDefaultMockData = getDefaultMockData;
    
    return baseInst;
}

/**
 * 创建TrackWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} TrackWrapper实例
 */
TrackWrapper.create = function(options) {
    return TrackWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
TrackWrapper.getDefaultMockData = function() {
    return {
        X1: 0,
        Y1: 0,
        X2: 1,
        Y2: 0,
        Width: 0.1,
        Layer: { "Name": "Top Layer", "V6_LayerID": 1 },
        Net: { "Name": "" },
        ObjectId: "mock_track_001",
        I_ObjectAddress: 1001,
        V6_LayerID: 1,
        V7_LayerID: 1,
        LayerStack: null
    };
};

    // 返回TrackWrapper构造函数
    return TrackWrapper;
    
})();


// 加载模块: .._src_modules_pcb-interfaces_wrappers_ViaWrapper.js
/**
 * ViaWrapper - 过孔对象封装 (v2.0.0)
 * 
 * 基于双向绑定架构的IPCB_Via接口封装，提供过孔对象的属性访问、计算和Mock支持
 * 
 * @author AD21 PCB Interface Module
 * @version 2.0.0
 */

var ViaWrapper = (function(){
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BasePCBWrapper, GeometryCalculator

    /**
     * ViaWrapper构造函数
     * 
     * @param {Object} options 配置选项
     * @param {Object} options.nativeObject 原始IPCB_Via对象
     * @param {boolean} options.enableMock 是否启用Mock模式
     * @param {Object} options.mockData Mock数据
     * @param {string} options.syncMode 同步模式 (realtime/auto/manual)
     */
    function ViaWrapper(options) {
    options = options || {};
    
    // 调用基类构造函数
    var baseInst = BasePCBWrapper.create({
        objectType: "Via",
        nativeObject: options.nativeObject,
        isMock: options.isMock || options.enableMock,
        mockData: options.mockData || ViaWrapper.getDefaultMockData(),
        syncMode: options.syncMode || "auto"
    });
    
    /**
     * 重写：提取过孔特有属性
     */
    function _extractSpecificProperties() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 提取过孔特有属性
            baseInst.setNativeProperty("X", nativeObj.X);
            baseInst.setNativeProperty("Y", nativeObj.Y);
            baseInst.setNativeProperty("HoleSize", nativeObj.HoleSize);
            baseInst.setNativeProperty("Size", nativeObj.Size);
            baseInst.setNativeProperty("StartLayer", nativeObj.StartLayer);
            baseInst.setNativeProperty("EndLayer", nativeObj.EndLayer);
            baseInst.setNativeProperty("ViaType", nativeObj.ViaType);
            baseInst.setNativeProperty("Plated", nativeObj.Plated);
            
        } catch (error) {
            baseInst.handleError("_extractSpecificProperties", error);
        }
    }
    
    /**
     * 重写：同步属性到原生对象
     */
    function _syncPropertiesToNative() {
        if (baseInst.isMockMode()) {
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (!nativeObj) {
                return;
            }
            
            // 同步过孔特有属性
            nativeObj.X = baseInst.getNativeProperty("X");
            nativeObj.Y = baseInst.getNativeProperty("Y");
            nativeObj.HoleSize = baseInst.getNativeProperty("HoleSize");
            nativeObj.Size = baseInst.getNativeProperty("Size");
            nativeObj.StartLayer = baseInst.getNativeProperty("StartLayer");
            nativeObj.EndLayer = baseInst.getNativeProperty("EndLayer");
            nativeObj.ViaType = baseInst.getNativeProperty("ViaType");
            nativeObj.Plated = baseInst.getNativeProperty("Plated");
            
        } catch (error) {
            baseInst.handleError("_syncPropertiesToNative", error);
        }
    }
    
    // 重写基类的属性提取和同步方法
    baseInst._extractSpecificProperties = _extractSpecificProperties;
    baseInst._syncPropertiesToNative = _syncPropertiesToNative;
    
    // 初始化时提取属性
    _extractSpecificProperties();
    
    /**
     * 获取过孔中心点X坐标
     * @returns {number} X坐标
     */
    function getX() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().x || 0;
        }
        return baseInst.getNativeProperty("X");
    }
    
    /**
     * 设置过孔中心点X坐标
     * @param {number} value X坐标
     */
    function setX(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().x = value;
        }
        baseInst.setNativeProperty("X", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔中心点Y坐标
     * @returns {number} Y坐标
     */
    function getY() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().y || 0;
        }
        return baseInst.getNativeProperty("Y");
    }
    
    /**
     * 设置过孔中心点Y坐标
     * @param {number} value Y坐标
     */
    function setY(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().y = value;
        }
        baseInst.setNativeProperty("Y", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔孔径
     * @returns {number} 孔径
     */
    function getHoleSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().holeSize || 0.2;
        }
        return baseInst.getNativeProperty("HoleSize");
    }
    
    /**
     * 设置过孔孔径
     * @param {number} value 孔径
     */
    function setHoleSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().holeSize = value;
        }
        baseInst.setNativeProperty("HoleSize", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔直径
     * @returns {number} 直径
     */
    function getSize() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().size || 0.5;
        }
        return baseInst.getNativeProperty("Size");
    }
    
    /**
     * 设置过孔直径
     * @param {number} value 直径
     */
    function setSize(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().size = value;
        }
        baseInst.setNativeProperty("Size", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取起始层
     * @returns {Object} 起始层对象
     */
    function getStartLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().startLayer || { "Name": "Top Layer" };
        }
        return baseInst.getNativeProperty("StartLayer");
    }
    
    /**
     * 设置起始层
     * @param {Object} value 起始层对象
     */
    function setStartLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().startLayer = value;
        }
        baseInst.setNativeProperty("StartLayer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取结束层
     * @returns {Object} 结束层对象
     */
    function getEndLayer() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().endLayer || { "Name": "Bottom Layer" };
        }
        return baseInst.getNativeProperty("EndLayer");
    }
    
    /**
     * 设置结束层
     * @param {Object} value 结束层对象
     */
    function setEndLayer(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().endLayer = value;
        }
        baseInst.setNativeProperty("EndLayer", value);
        baseInst._markDirty();
    }
    
    /**
     * 获取过孔类型
     * @returns {string} 过孔类型（Through, Blind, Buried）
     */
    function getViaType() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().viaType || "Through";
        }
        return baseInst.getNativeProperty("ViaType");
    }
    
    /**
     * 设置过孔类型
     * @param {string} value 过孔类型
     */
    function setViaType(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().viaType = value;
        }
        baseInst.setNativeProperty("ViaType", value);
        baseInst._markDirty();
    }
    
    /**
     * 检查过孔是否被电镀
     * @returns {boolean} 是否被电镀
     */
    function isPlated() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().plated !== false;
        }
        return baseInst.getNativeProperty("Plated");
    }
    
    /**
     * 设置过孔电镀状态
     * @param {boolean} value 是否电镀
     */
    function setPlated(value) {
        if (baseInst.isMockMode()) {
            baseInst.getMockData().plated = value;
        }
        baseInst.setNativeProperty("Plated", value);
        baseInst._markDirty();
    }
    
    // ========== 高优先级API实现 ==========
    
    /**
     * 绕指定点旋转过孔 (高优先级API)
     * @param {number} centerX 旋转中心X坐标
     * @param {number} centerY 旋转中心Y坐标
     * @param {number} angle 旋转角度（度）
     */
    function rotateAroundXY(centerX, centerY, angle) {
        if (baseInst.isMockMode()) {
            // Mock模式下简单更新位置
            var currentX = getX();
            var currentY = getY();
            var rad = angle * Math.PI / 180;
            var newX = centerX + (currentX - centerX) * Math.cos(rad) - (currentY - centerY) * Math.sin(rad);
            var newY = centerY + (currentX - centerX) * Math.sin(rad) + (currentY - centerY) * Math.cos(rad);
            setX(newX);
            setY(newY);
            return;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.RotateAroundXY === "function") {
                nativeObj.RotateAroundXY(centerX, centerY, angle);
                // 旋转后重新提取属性
                _extractSpecificProperties();
            } else {
                // 降级处理：手动计算旋转
                var currentX = getX();
                var currentY = getY();
                var rad = angle * Math.PI / 180;
                var newX = centerX + (currentX - centerX) * Math.cos(rad) - (currentY - centerY) * Math.sin(rad);
                var newY = centerY + (currentX - centerX) * Math.sin(rad) + (currentY - centerY) * Math.cos(rad);
                setX(newX);
                setY(newY);
            }
        } catch (error) {
            baseInst.handleError("rotateAroundXY", error);
        }
    }
    
    /**
     * 精确点碰撞检测 (高优先级API)
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否碰撞
     */
    function getState_StrictHitTest(x, y) {
        if (baseInst.isMockMode()) {
            // Mock模式下使用简单的圆形检测
            return isPointInside(x, y);
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.GetState_StrictHitTest === "function") {
                return nativeObj.GetState_StrictHitTest(x, y);
            }
            // 降级处理：使用几何计算
            return isPointInside(x, y);
        } catch (error) {
            baseInst.handleError("getState_StrictHitTest", error);
            return false;
        }
    }
    
    // ========== 几何计算方法 ==========
    
    /**
     * 获取网络名称
     * @returns {string} 网络名称
     */
    function getNetName() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().netName || "";
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && nativeObj.Net && nativeObj.Net.Name) {
                return nativeObj.Net.Name;
            }
            return "";
        } catch (error) {
            baseInst.handleError("getNetName", error);
            return "";
        }
    }
    
    /**
     * 获取过孔的包围盒
     * @returns {Object} {x1, y1, x2, y2} 包围盒坐标
     */
    function getBoundingBox() {
        var x = getX();
        var y = getY();
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleBoundingBox(x, y, size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        return {
            x1: x - radius,
            y1: y - radius,
            x2: x + radius,
            y2: y + radius
        };
    }
    
    /**
     * 获取过孔面积
     * @returns {number} 过孔面积
     */
    function getArea() {
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleArea(size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        return Math.PI * radius * radius;
    }
    
    /**
     * 获取过孔孔面积
     * @returns {number} 孔面积
     */
    function getHoleArea() {
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateCircleArea(holeSize / 2);
        }
        
        // 降级处理：手动计算
        var radius = holeSize / 2;
        return Math.PI * radius * radius;
    }
    
    /**
     * 获取过孔环面积
     * @returns {number} 环面积
     */
    function getRingArea() {
        return getArea() - getHoleArea();
    }
    
    /**
     * 检查点是否在过孔内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在过孔内
     */
    function isPointInside(x, y) {
        var viaX = getX();
        var viaY = getY();
        var size = getSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInCircle(x, y, viaX, viaY, size / 2);
        }
        
        // 降级处理：手动计算
        var radius = size / 2;
        var distance = Math.sqrt(Math.pow(x - viaX, 2) + Math.pow(y - viaY, 2));
        return distance <= radius;
    }
    
    /**
     * 检查点是否在过孔孔内
     * @param {number} x X坐标
     * @param {number} y Y坐标
     * @returns {boolean} 是否在过孔孔内
     */
    function isPointInHole(x, y) {
        var viaX = getX();
        var viaY = getY();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.isPointInCircle(x, y, viaX, viaY, holeSize / 2);
        }
        
        // 降级处理：手动计算
        var radius = holeSize / 2;
        var distance = Math.sqrt(Math.pow(x - viaX, 2) + Math.pow(y - viaY, 2));
        return distance <= radius;
    }
    
    /**
     * 获取过孔的电气特性
     * @returns {Object} 电气特性对象
     */
    function getElectricalProperties() {
        return {
            netName: getNetName(),
            resistance: calculateResistance(),
            capacitance: calculateCapacitance(),
            inductance: calculateInductance(),
            impedance: calculateImpedance()
        };
    }
    
    /**
     * 计算过孔电阻
     * @returns {number} 电阻值（欧姆）
     */
    function calculateResistance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaResistance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 0.001; // 1mΩ 典型值
    }
    
    /**
     * 计算过孔电容
     * @returns {number} 电容值（pF）
     */
    function calculateCapacitance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaCapacitance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 0.1; // 0.1pF 典型值
    }
    
    /**
     * 计算过孔电感
     * @returns {number} 电感值（nH）
     */
    function calculateInductance() {
        var size = getSize();
        var holeSize = getHoleSize();
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaInductance(size, holeSize, startLayer, endLayer);
        }
        
        // 降级处理：简单估算
        return 1.0; // 1nH 典型值
    }
    
    /**
     * 计算过孔阻抗
     * @returns {number} 阻抗值（欧姆）
     */
    function calculateImpedance() {
        var size = getSize();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaImpedance(size, holeSize);
        }
        
        // 降级处理：简单估算
        return 50; // 50Ω 典型值
    }
    
    /**
     * 获取过孔的机械特性
     * @returns {Object} 机械特性对象
     */
    function getMechanicalProperties() {
        return {
            plated: isPlated(),
            viaType: getViaType(),
            aspectRatio: calculateAspectRatio(),
            drillTolerance: getDrillTolerance(),
            minAnnularRing: getMinAnnularRing()
        };
    }
    
    /**
     * 计算纵横比
     * @returns {number} 纵横比
     */
    function calculateAspectRatio() {
        var startLayer = getStartLayer();
        var endLayer = getEndLayer();
        var holeSize = getHoleSize();
        
        if (GeometryCalculator) {
            return GeometryCalculator.calculateViaAspectRatio(startLayer, endLayer, holeSize);
        }
        
        // 降级处理：简单估算
        return 8.0; // 8:1 典型值
    }
    
    /**
     * 获取钻孔公差
     * @returns {number} 钻孔公差
     */
    function getDrillTolerance() {
        if (baseInst.isMockMode()) {
            return baseInst.getMockData().drillTolerance || 0.05;
        }
        
        try {
            var nativeObj = baseInst.getNativeObject();
            if (nativeObj && typeof nativeObj.DrillTolerance !== "undefined") {
                return nativeObj.DrillTolerance;
            }
        } catch (error) {
            baseInst.handleError("getDrillTolerance", error);
        }
        
        return 0.05; // 默认值
    }
    
    /**
     * 获取最小环宽
     * @returns {number} 最小环宽
     */
    function getMinAnnularRing() {
        var size = getSize();
        var holeSize = getHoleSize();
        var drillTolerance = getDrillTolerance();
        
        return (size - holeSize) / 2 - drillTolerance;
    }
    
    /**
     * 检查过孔是否满足制造约束
     * @returns {Object} 约束检查结果
     */
    function checkManufacturingConstraints() {
        var aspectRatio = calculateAspectRatio();
        var minAnnularRing = getMinAnnularRing();
        var viaType = getViaType();
        
        return {
            aspectRatioOK: aspectRatio <= 10, // 通常最大纵横比为10:1
            minAnnularRingOK: minAnnularRing >= 0.05, // 最小环宽0.05mm
            drillSizeOK: getHoleSize() >= 0.1, // 最小钻孔0.1mm
            viaTypeOK: viaType === "Through" || viaType === "Blind" || viaType === "Buried"
        };
    }
    
    /**
     * 获取过孔的完整信息
     * @returns {Object} 过孔信息对象
     */
    function getViaInfo() {
        return {
            x: getX(),
            y: getY(),
            holeSize: getHoleSize(),
            size: getSize(),
            startLayer: getStartLayer(),
            endLayer: getEndLayer(),
            viaType: getViaType(),
            netName: getNetName(),
            plated: isPlated(),
            boundingBox: getBoundingBox(),
            area: getArea(),
            holeArea: getHoleArea(),
            ringArea: getRingArea(),
            electrical: getElectricalProperties(),
            mechanical: getMechanicalProperties(),
            constraints: checkManufacturingConstraints()
        };
    }
    
    /**
     * 同步所有属性到原生对象
     */
    function syncToNative() {
        baseInst.syncToNative();
    }
    
    /**
     * 从原生对象同步所有属性
     */
    function syncFromNative() {
        _extractSpecificProperties();
    }
    
    /**
     * 获取默认Mock数据
     * @returns {Object} 默认Mock数据
     */
    function getDefaultMockData() {
        return {
            x: 0,
            y: 0,
            holeSize: 0.2,
            size: 0.5,
            startLayer: { "Name": "Top Layer" },
            endLayer: { "Name": "Bottom Layer" },
            viaType: "Through",
            netName: "",
            plated: true,
            drillTolerance: 0.05
        };
    }
    
    // 扩展基类实例
    baseInst.getX = getX;
    baseInst.setX = setX;
    baseInst.getY = getY;
    baseInst.setY = setY;
    baseInst.getHoleSize = getHoleSize;
    baseInst.setHoleSize = setHoleSize;
    baseInst.getSize = getSize;
    baseInst.setSize = setSize;
    baseInst.getStartLayer = getStartLayer;
    baseInst.setStartLayer = setStartLayer;
    baseInst.getEndLayer = getEndLayer;
    baseInst.setEndLayer = setEndLayer;
    baseInst.getViaType = getViaType;
    baseInst.setViaType = setViaType;
    baseInst.getNetName = getNetName;
    baseInst.isPlated = isPlated;
    baseInst.setPlated = setPlated;
    baseInst.getBoundingBox = getBoundingBox;
    baseInst.getArea = getArea;
    baseInst.getHoleArea = getHoleArea;
    baseInst.getRingArea = getRingArea;
    baseInst.isPointInside = isPointInside;
    baseInst.isPointInHole = isPointInHole;
    baseInst.getElectricalProperties = getElectricalProperties;
    baseInst.calculateResistance = calculateResistance;
    baseInst.calculateCapacitance = calculateCapacitance;
    baseInst.calculateInductance = calculateInductance;
    baseInst.calculateImpedance = calculateImpedance;
    baseInst.getMechanicalProperties = getMechanicalProperties;
    baseInst.calculateAspectRatio = calculateAspectRatio;
    baseInst.getDrillTolerance = getDrillTolerance;
    baseInst.getMinAnnularRing = getMinAnnularRing;
    baseInst.checkManufacturingConstraints = checkManufacturingConstraints;
    baseInst.getViaInfo = getViaInfo;
    baseInst.syncToNative = syncToNative;
    baseInst.syncFromNative = syncFromNative;
    
    // 高优先级API
    baseInst.rotateAroundXY = rotateAroundXY;
    baseInst.getState_StrictHitTest = getState_StrictHitTest;
    
    return baseInst;
}

/**
 * 创建ViaWrapper实例
 * 
 * @param {Object} options 配置选项
 * @returns {Object} ViaWrapper实例
 */
ViaWrapper.create = function(options) {
    return ViaWrapper(options);
};

/**
 * 获取默认Mock数据
 * @returns {Object} 默认Mock数据
 */
ViaWrapper.getDefaultMockData = function() {
    return {
        x: 0,
        y: 0,
        holeSize: 0.2,
        size: 0.5,
        startLayer: { "Name": "Top Layer" },
        endLayer: { "Name": "Bottom Layer" },
        viaType: "Through",
        netName: "",
        plated: true,
        drillTolerance: 0.05
    };
};

    // 返回ViaWrapper构造函数
    return ViaWrapper;
    
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
    module.exports.BasePCBWrapper = BasePCBWrapper;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.PCBMockSystem = PCBMockSystem;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.PCBObjectFactory = PCBObjectFactory;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.PCBObjectManager = PCBObjectManager;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.PCBObjectPool = PCBObjectPool;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.GeometryCalculator = GeometryCalculator;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.ArcWrapper = ArcWrapper;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.PadWrapper = PadWrapper;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.TrackWrapper = TrackWrapper;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.ViaWrapper = ViaWrapper;
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
    console.log("BasePCBWrapper 可用: " + (typeof BasePCBWrapper !== "undefined"));
    console.log("PCBMockSystem 可用: " + (typeof PCBMockSystem !== "undefined"));
    console.log("PCBObjectFactory 可用: " + (typeof PCBObjectFactory !== "undefined"));
    console.log("PCBObjectManager 可用: " + (typeof PCBObjectManager !== "undefined"));
    console.log("PCBObjectPool 可用: " + (typeof PCBObjectPool !== "undefined"));
    console.log("GeometryCalculator 可用: " + (typeof GeometryCalculator !== "undefined"));
    console.log("ArcWrapper 可用: " + (typeof ArcWrapper !== "undefined"));
    console.log("PadWrapper 可用: " + (typeof PadWrapper !== "undefined"));
    console.log("TrackWrapper 可用: " + (typeof TrackWrapper !== "undefined"));
    console.log("ViaWrapper 可用: " + (typeof ViaWrapper !== "undefined"));
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