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
