// ==========================================================
// simpleBitmaskLogger.js — 简化位掩码日志系统
// ==========================================================
/**
 * @class SimpleBitmaskLogger
 * @description
 *  基于位掩码的简化日志系统，避免频繁写入
 *  
 *  日志级别位掩码：
 *  - ERROR = 1 (二进制 0001)
 *  - WARN  = 2 (二进制 0010) 
 *  - INFO  = 4 (二进制 0100)
 *  - DEBUG = 8 (二进制 1000)
 *  
 *  使用示例：
 *  - 只记录错误：LOG_LEVEL = 1
 *  - 记录错误和警告：LOG_LEVEL = 3 (1+2)
 *  - 记录所有级别：LOG_LEVEL = 15 (1+2+4+8)
 */

// 全局配置
var LOG_LEVEL = 15;        // 默认调试模式：记录所有级别
var LOG_THRESHOLD = 100;     // 统一阈值：100条日志或5KB
var LOG_PATH = "Logs/";     // 日志文件路径（向后兼容）

// 日志级别常量
var LOG_ERROR = 1;    // 错误级别
var LOG_WARN  = 2;    // 警告级别  
var LOG_INFO  = 4;    // 信息级别
var LOG_DEBUG = 8;    // 调试级别

/**
 * 简化位掩码日志系统构造函数
 */
function SimpleBitmaskLogger() {
    this.logs = [];           // 日志缓存
    this.fso = null;          // 文件系统对象
    this.initialized = false; // 初始化状态
    this.currentLogFile = "";  // 当前日志文件名
    
    try {
        this.fso = new ActiveXObject("Scripting.FileSystemObject");
        this.initialized = true;
        
        // 预先生成日志文件名
        this.currentLogFile = this.generateDailyFileName();
        
        // 注意：不能在这里调用LOG.info，因为LOG正在初始化过程中
        // 这会导致循环引用问题
    } catch (error) {
        this.initialized = false;
    }
}

/**
 * 检查日志级别是否启用
 * @param {number} level - 日志级别
 * @returns {boolean} 是否启用
 */
SimpleBitmaskLogger.prototype.isLevelEnabled = function(level) {
    return (LOG_LEVEL & level) === level;
};

/**
 * 获取日志级别名称
 * @param {number} level - 日志级别
 * @returns {string} 级别名称
 */
SimpleBitmaskLogger.prototype.getLevelName = function(level) {
    switch (level) {
        case LOG_ERROR:
            return "ERROR";
        case LOG_WARN:
            return "WARN";
        case LOG_INFO:
            return "INFO";
        case LOG_DEBUG:
            return "DEBUG";
        default:
            return "UNKNOWN";
    }
};

/**
 * 格式化日期时间为字符串（ES3兼容版本）
 * @param {Date} date - 日期对象
 * @returns {string} 格式化的日期时间字符串
 */
SimpleBitmaskLogger.prototype.formatDateTime = function(date) {
    if (!date) {
        date = new Date();
    }
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    // 补零
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
};

/**
 * 推入日志到缓存
 * @param {number} level - 日志级别
 * @param {string} message - 日志消息
 * @param {Object} context - 上下文信息（可选）
 */
SimpleBitmaskLogger.prototype._push = function(level, message, context) {
    // 检查级别是否启用
    if (!this.isLevelEnabled(level)) {
        return;
    }
    
    // 创建日志对象
    var logEntry = {
        level: this.getLevelName(level),
        message: message,
        context: context || null,
        time: new Date().getTime(),
        timestamp: this.formatDateTime(new Date())
    };
    
    // 添加到缓存
    this.logs.push(logEntry);
    
    // 检查是否需要写入
    this.checkThreshold();
};

/**
 * 获取日志统计信息
 * @returns {Object} 统计信息对象
 */
SimpleBitmaskLogger.prototype.getStats = function() {
    try {
        var stats = {
            'count': this.logs.length,
            'currentLevel': LOG_LEVEL,
            'threshold': LOG_THRESHOLD,
            'initialized': this.initialized,
            'levelDescription': this.getLevelDescription()
        };
        return stats;
    } catch (error) {
        // 如果出错，返回基本信息
        return {
            'count': this.logs ? this.logs.length : 0,
            'currentLevel': LOG_LEVEL,
            'threshold': LOG_THRESHOLD,
            'initialized': this.initialized || false,
            'levelDescription': 'Unknown'
        };
    }
};

/**
 * 检查阈值并写入
 */
SimpleBitmaskLogger.prototype.checkThreshold = function() {
    if (this.logs.length === 0) {
        return;
    }
    
    // 检查数量阈值
    if (this.logs.length >= LOG_THRESHOLD) {
        this.flush();
        return;
    }
    
    // 检查大小阈值（估算5KB）
    var estimatedSize = this.estimateSize();
    if (estimatedSize >= 5120) { // 5KB
        this.flush();
    }
};

/**
 * 估算日志内容大小
 * @returns {number} 估算大小（字节）
 */
SimpleBitmaskLogger.prototype.estimateSize = function() {
    var size = 0;
    for (var i = 0; i < this.logs.length; i++) {
        var log = this.logs[i];
        size += log.level.length + log.message.length + 50; // 基础开销
        if (log.context) {
            size += 100; // 上下文开销
        }
    }
    return size;
};

/**
 * 写入日志到文件并清空缓存（新建文件模式）
 * @returns {boolean} 写入是否成功
 */
SimpleBitmaskLogger.prototype.flush = function() {
    if (!this.initialized || this.logs.length === 0) {
        return false;
    }
    
    try {
        // 生成新的日志文件名（每次运行新建文件）
        var fileName = this.generateDailyFileName();
        
        // 格式化日志内容
        var content = this.formatLogs();
        
        var writeSuccess = false;
        
        // 检查是否启用多路径输出
        if (typeof LOG_PATH_MANAGER !== 'undefined' && 
            getConfig && getConfig("logPaths.enableMultiPath")) {
            
            // 使用多路径输出
            var result = LOG_PATH_MANAGER.writeToAllPaths(fileName, content);
            writeSuccess = result.success > 0;
            
            // 记录多路径写入结果
            if (typeof LOG !== 'undefined') {
                LOG.info("多路径日志写入完成", {
                    fileName: fileName,
                    totalPaths: result.total,
                    successPaths: result.success,
                    failedPaths: result.failed
                });
            }
            
        } else {
            // 使用传统单路径输出（向后兼容）
            this.ensureLogDirectory();
            var filePath = LOG_PATH + fileName;
            
            // 创建新文件并写入（覆盖模式，因为文件名是唯一的）
            var file = this.fso.CreateTextFile(filePath, true); // true = 覆盖
            file.WriteLine(content);
            file.Close();
            writeSuccess = true;
            
            // 记录新创建的日志文件
            if (typeof LOG !== 'undefined') {
                LOG.info("日志文件已创建", { fileName: fileName, path: filePath });
            }
        }
        
        // 如果写入成功，清空缓存
        if (writeSuccess) {
            this.logs = [];
        }
        
        return writeSuccess;
        
    } catch (error) {
        // 写入失败时不清空缓存，保留日志
        if (typeof LOG !== 'undefined') {
            LOG.error("创建日志文件失败: " + error.message);
        }
        return false;
    }
};

/**
 * 确保日志目录存在
 */
SimpleBitmaskLogger.prototype.ensureLogDirectory = function() {
    try {
        if (!this.fso.FolderExists(LOG_PATH)) {
            this.fso.CreateFolder(LOG_PATH);
        }
    } catch (error) {
        // 目录创建失败，继续尝试
    }
};

/**
 * 检测当日已有日志文件数量并生成新的文件名
 * @returns {string} 新的日志文件名
 */
SimpleBitmaskLogger.prototype.generateDailyFileName = function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = now.getDate().toString();
    
    // 补零
    month = month.length === 1 ? "0" + month : month;
    day = day.length === 1 ? "0" + day : day;
    
    var datePrefix = "PCB_Check_" + year + month + day;
    var runNumber = this.getNextRunNumber(datePrefix);
    
    return datePrefix + "_" + runNumber + ".log";
};

/**
 * 获取下一个运行编号
 * @param {string} datePrefix - 日期前缀（如：PCB_Check_20251122）
 * @returns {number} 运行编号
 */
SimpleBitmaskLogger.prototype.getNextRunNumber = function(datePrefix) {
    try {
        var maxRunNumber = 0;
        var files = [];
        
        // 确保日志目录存在
        this.ensureLogDirectory();
        
        // 获取日志目录中的所有文件
        var folder = this.fso.GetFolder(LOG_PATH);
        var fileCollection = folder.Files;
        
        // 遍历文件，查找匹配的日志文件
        var enumerator = new Enumerator(fileCollection);
        for (; !enumerator.atEnd(); enumerator.moveNext()) {
            var file = enumerator.item();
            var fileName = file.Name;
            
            // 检查文件名是否匹配当日格式
            if (fileName.indexOf(datePrefix + "_") === 0 && 
                fileName.indexOf(".log") === fileName.length - 4) {
                
                // 提取运行编号
                var parts = fileName.split("_");
                if (parts.length >= 3) {
                    var runNumberStr = parts[parts.length - 1].replace(".log", "");
                    var runNumber = parseInt(runNumberStr, 10);
                    
                    if (!isNaN(runNumber) && runNumber > maxRunNumber) {
                        maxRunNumber = runNumber;
                    }
                }
            }
        }
        
        // 返回下一个编号
        return maxRunNumber + 1;
        
    } catch (error) {
        // 如果检测失败，默认返回1
        if (typeof LOG !== 'undefined') {
            LOG.warn("检测日志文件编号失败，使用默认编号1: " + error.message);
        }
        return 1;
    }
};

/**
 * 格式化日志内容（新建文件模式）
 * @returns {string} 格式化的日志内容
 */
SimpleBitmaskLogger.prototype.formatLogs = function() {
    var content = "";
    content += "=================================================\n";
    content += "PCB检查系统日志\n";
    content += "=================================================\n";
    content += "创建时间: " + this.formatDateTime(new Date()) + "\n";
    content += "日志级别: " + this.getLevelDescription() + "\n";
    content += "日志数量: " + this.logs.length + "\n";
    content += "配置阈值: " + LOG_THRESHOLD + " 条\n";
    content += "=================================================\n\n";
    
    for (var i = 0; i < this.logs.length; i++) {
        var log = this.logs[i];
        content += "[" + log.level + "] " + log.timestamp + "\n";
        content += "消息: " + log.message + "\n";
        
        if (log.context) {
            content += "上下文: " + JSON.stringify(log.context) + "\n";
        }
        
        content += "---\n";
    }
    
    content += "\n=================================================\n";
    content += "日志结束\n";
    content += "=================================================\n";
    
    return content;
};

/**
 * 获取当前日志级别描述
 * @returns {string} 级别描述
 */
SimpleBitmaskLogger.prototype.getLevelDescription = function() {
    var levels = [];
    if (this.isLevelEnabled(LOG_ERROR)) levels.push("ERROR");
    if (this.isLevelEnabled(LOG_WARN))  levels.push("WARN");
    if (this.isLevelEnabled(LOG_INFO))  levels.push("INFO");
    if (this.isLevelEnabled(LOG_DEBUG)) levels.push("DEBUG");
    return levels.join(", ") || "NONE";
};

/**
 * 记录错误日志
 * @param {string} message - 错误消息
 * @param {Object} context - 上下文信息（可选）
 */
SimpleBitmaskLogger.prototype.error = function(message, context) {
    this._push(LOG_ERROR, message, context);
};

/**
 * 记录警告日志
 * @param {string} message - 警告消息
 * @param {Object} context - 上下文信息（可选）
 */
SimpleBitmaskLogger.prototype.warn = function(message, context) {
    this._push(LOG_WARN, message, context);
};

/**
 * 记录信息日志
 * @param {string} message - 信息消息
 * @param {Object} context - 上下文信息（可选）
 */
SimpleBitmaskLogger.prototype.info = function(message, context) {
    this._push(LOG_INFO, message, context);
};

/**
 * 记录调试日志
 * @param {string} message - 调试消息
 * @param {Object} context - 上下文信息（可选）
 */
SimpleBitmaskLogger.prototype.debug = function(message, context) {
    this._push(LOG_DEBUG, message, context);
};

/**
 * 获取当前缓存中的日志数量
 * @returns {number} 日志数量
 */
SimpleBitmaskLogger.prototype.getCount = function() {
    return this.logs.length;
};

/**
 * 清空日志缓存（不写入文件）
 */
SimpleBitmaskLogger.prototype.clear = function() {
    this.logs = [];
};

/**
 * 输出格式化日志数组（兼容旧系统）
 * @returns {Array} 格式化的日志数组
 */
SimpleBitmaskLogger.prototype.dump = function() {
    var arr = [];
    for (var i = 0; i < this.logs.length; i++) {
        var log = this.logs[i];
        arr.push("[" + log.level + "] " + log.message + 
                 (log.context ? " | ctx=" + JSON.stringify(log.context) : "")
        );
    }
    return arr;
};

/**
 * 导出日志为JSON格式（兼容旧系统）
 * @returns {Array} 日志数组
 */
SimpleBitmaskLogger.prototype.toJSON = function() {
    return this.logs.slice();
};

/**
 * 获取日志级别数值（兼容旧系统）
 * @returns {number} 当前日志级别
 */
SimpleBitmaskLogger.prototype.getLevel = function() {
    return LOG_LEVEL;
};

/**
 * 设置日志级别（兼容旧系统）
 * @param {number} level - 日志级别
 */
SimpleBitmaskLogger.prototype.setLevel = function(level) {
    LOG_LEVEL = level;
};


// 创建全局日志实例
var LOG = new SimpleBitmaskLogger();

/**
 * 便捷函数：设置日志级别
 * @param {number} level - 日志级别
 */
function setLogLevel(level) {
    LOG_LEVEL = level;
}

/**
 * 便捷函数：设置日志阈值
 * @param {number} threshold - 阈值
 */
function setLogThreshold(threshold) {
    LOG_THRESHOLD = threshold;
}

/**
 * 便捷函数：强制写入日志
 * @returns {boolean} 写入是否成功
 */
function flushLogs() {
    return LOG.flush();
}

/**
 * 便捷函数：获取日志统计
 * @returns {Object} 统计信息
 */
function getLogStats() {
    return LOG.getStats();
}
