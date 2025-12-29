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
