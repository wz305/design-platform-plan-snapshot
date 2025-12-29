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

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.LoggerTypes = LoggerTypes;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = LoggerTypes;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.LoggerTypes = LoggerTypes;
    }
})();
