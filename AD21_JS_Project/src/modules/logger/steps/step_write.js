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
            // 其他环境：回退到UI诊断
            else {
                // 输出诊断信息到UI
                if (typeof uiInfo !== "undefined") {
                    uiInfo("文件写入诊断", {
                        environment: "非AD环境",
                        filePath: filePath,
                        contentLength: content ? content.length : 0,
                        message: "使用模拟写入模式，文件未实际创建"
                    }, "step_write.js", "writeToFileSystem");
                }
                return false;  // 明确返回失败
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
