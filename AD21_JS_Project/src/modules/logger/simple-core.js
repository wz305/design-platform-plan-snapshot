// SimpleLogger - 简单日志模块
// 遵循"创建即初始化"原则，符合KISS原则

function SimpleLogger(options) {
    // 直接初始化，无需复杂生命周期
    var config = {
        level: options.level || 15,  // 默认ALL级别
        threshold: options.threshold || 50,
        enabled: options.enabled !== false,
        autoTime: options.autoTime !== false,
        moduleName: options.moduleName || "SimpleLogger"
    };
    
    // 内部状态
    var data = {
        cache: [],
        lastFlushTime: 0,
        totalLogs: 0
    };
    
    // 日志级别常量
    var LOG_LEVELS = {
        DEBUG: 1,
        INFO: 2,
        WARN: 4,
        ERROR: 8,
        ALL: 15
    };
    
    // 格式化时间戳
    function formatTimestamp() {
        if (!config.autoTime) {
            return "";
        }
        
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var milliseconds = now.getMilliseconds();
        
        // 补零函数
        function padZero(num) {
            return num < 10 ? "0" + num : num.toString();
        }
        
        return "[" + year + "-" + padZero(month) + "-" + padZero(day) + " " +
               padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds) + "." +
               padZero(milliseconds) + "] ";
    }
    
    // 格式化日志消息
    function formatMessage(level, message) {
        var timestamp = formatTimestamp();
        var levelName = "";
        
        switch (level) {
            case LOG_LEVELS.DEBUG:
                levelName = "[DEBUG] ";
                break;
            case LOG_LEVELS.INFO:
                levelName = "[INFO] ";
                break;
            case LOG_LEVELS.WARN:
                levelName = "[WARN] ";
                break;
            case LOG_LEVELS.ERROR:
                levelName = "[ERROR] ";
                break;
            default:
                levelName = "[LOG] ";
        }
        
        return timestamp + levelName + message;
    }
    
    // 添加日志到缓存
    function addToCache(level, message) {
        if (!config.enabled || (level & config.level) === 0) {
            return;
        }
        
        var formattedMessage = formatMessage(level, message);
        var logEntry = {
            level: level,
            message: message,
            formatted: formattedMessage,
            timestamp: new Date()
        };
        
        data.cache.push(logEntry);
        data.totalLogs++;
        
        // 检查是否需要自动刷新
        if (data.cache.length >= config.threshold) {
            flush();
        }
    }
    
    // 刷新日志到输出
    function flush() {
        if (data.cache.length === 0) {
            return;
        }
        
        // 在AD环境中，使用ShowMessage或写入文件
        for (var i = 0; i < data.cache.length; i++) {
            var logEntry = data.cache[i];
            // 这里可以集成到UILogger或其他输出机制
            if (typeof console !== "undefined" && console.log) {
                console.log(logEntry.formatted);
            }
        }
        
        data.lastFlushTime = new Date().getTime();
        data.cache = [];
    }
    
    // 公共API
    function debug(message) {
        addToCache(LOG_LEVELS.DEBUG, message);
    }
    
    function info(message) {
        addToCache(LOG_LEVELS.INFO, message);
    }
    
    function warn(message) {
        addToCache(LOG_LEVELS.WARN, message);
    }
    
    function error(message) {
        addToCache(LOG_LEVELS.ERROR, message);
    }
    
    function log(message) {
        addToCache(LOG_LEVELS.ALL, message);
    }
    
    function setLevel(newLevel) {
        config.level = newLevel;
    }
    
    function setThreshold(newThreshold) {
        config.threshold = newThreshold;
    }
    
    function enable() {
        config.enabled = true;
    }
    
    function disable() {
        config.enabled = false;
    }
    
    function getCacheCount() {
        return data.cache.length;
    }
    
    function getTotalCount() {
        return data.totalLogs;
    }
    
    function getConfig() {
        // 返回配置的副本
        return {
            level: config.level,
            threshold: config.threshold,
            enabled: config.enabled,
            autoTime: config.autoTime,
            moduleName: config.moduleName
        };
    }
    
    // 返回公共接口
    return {
        // 日志方法
        debug: debug,
        info: info,
        warn: warn,
        error: error,
        log: log,
        
        // 控制方法
        flush: flush,
        setLevel: setLevel,
        setThreshold: setThreshold,
        enable: enable,
        disable: disable,
        
        // 状态方法
        getCacheCount: getCacheCount,
        getTotalCount: getTotalCount,
        getConfig: getConfig
    };
}

// 揭示模块模式
var SimpleLoggerModule = (function(){
    function create(options) {
        return SimpleLogger(options || {});
    }
    
    return {
        create: create
    };
})();
