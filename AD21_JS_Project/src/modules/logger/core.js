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
        
        // 简化级别检查：直接比较数值
        return (inst.data.config.level & level) === level;
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
        var entry = {
            timestamp: "",
            level: "",
            message: "",
            moduleName: "",
            fileName: "",
            functionName: "",
            context: null
        };
        
        // 设置基本信息
        entry.timestamp = new Date().getTime();
        
        // 简化级别名称映射
        var levelMap = {
            1: "ERROR",
            2: "WARN", 
            4: "INFO",
            8: "DEBUG"
        };
        entry.level = levelMap[level] || "UNKNOWN";
        entry.message = message || "";
        entry.moduleName = inst.data.config.moduleName || "LoggerModule";
        entry.fileName = fileName || "";
        entry.functionName = functionName || "";
        
        // 处理上下文
        if (context !== null && context !== undefined) {
            if (inst.data.config.captureEnabled) {
                try {
                    entry.context = JSON.stringify(context);
                } catch (e) {
                    entry.context = String(context);
                }
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
            inst.data.lastLogTime = new Date().getTime();
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    /**
     * 检查是否应该显示到UI
     * @param {string} level 日志级别
     * @returns {boolean} 是否应该显示
     */
    function _shouldDisplayToUI(level) {
        var globalController = GlobalLogController;
        return globalController && 
               typeof globalController.isDisplayEnabled === "function" && 
               globalController.isDisplayEnabled(level);
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
            // 缓存为空时返回true，这是正常情况
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
                // 增强的模拟写入：检查StepWrite是否可用
                if (typeof StepWrite !== "undefined" && StepWrite.executeWriteStep) {
                    writeResult = StepWrite.executeWriteStep(logsToWrite, inst.data.config.moduleName);
                } else {
                    // 最终回退：模拟写入成功
                    writeResult = {success: true, message: "模拟写入", written: logsToWrite.length};
                }
            }
            
            // 更新统计
            if (writeResult.success) {
                inst.data.stats.lastFlushTime = new Date().getTime();
                inst.data.stats.flushCount++;
            } else {
                inst.data.stats.errorFlushCount++;
                // 写入失败，恢复缓存
                for (var i = 0; i < logsToWrite.length; i++) {
                    inst.data.cache.push(logsToWrite[i]);
                }
                
                // 增强错误诊断
                if (typeof console !== "undefined" && console.log) {
                    console.log("_flushCache写入失败:", {
                        writeResult: writeResult,
                        logsCount: logsToWrite.length,
                        moduleName: inst.data.config.moduleName,
                        hasExecuteWriteStep: typeof executeWriteStep === "function",
                        hasStepWrite: typeof StepWrite !== "undefined"
                    });
                }
            }
            
            return writeResult.success;
        } catch (e) {
            // 异常处理和诊断
            if (typeof console !== "undefined" && console.log) {
                console.log("_flushCache异常:", {
                    error: e.message,
                    cacheLength: cache.length,
                    moduleName: inst.data.config.moduleName
                });
            }
            
            // 异常时也要恢复缓存
            var logsToWrite = cache.slice();
            inst.data.cache = [];
            for (var i = 0; i < logsToWrite.length; i++) {
                inst.data.cache.push(logsToWrite[i]);
            }
            
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
            
            // 简单合并配置，不依赖mergeConfig函数
            var config = {};
            var key;
            for (key in _loggerDefaultConfig) {
                if (_loggerDefaultConfig.hasOwnProperty(key)) {
                    config[key] = _loggerDefaultConfig[key];
                }
            }
            if (inst.options) {
                for (key in inst.options) {
                    if (inst.options.hasOwnProperty(key)) {
                        config[key] = inst.options[key];
                    }
                }
            }
            
            // 初始化Logger数据结构
            inst.data = {
                config: config,
                cache: [],
                stats: {
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
            
            // 验证配置 - 简化验证逻辑
            if (typeof inst.data.config.level !== "number" || inst.data.config.level < 0) {
                inst.data.config.level = LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ALL : 15;
            }
            
            return true;
        } catch (e) {
            if (typeof console !== "undefined" && console.log) {
                console.log("_performInitialization异常:", e.message);
            }
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
        
        // 检查生成级开关 - 决定是否保存日志
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
        } else {
            // GlobalLogController不存在时，默认允许生成日志
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
        
        // 创建日志条目并保存到缓存
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.ERROR : 1, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
        }
        
        // 独立检查显示开关 - 决定是否输出到UI
        if (_shouldDisplayToUI("error")) {
            wasDisplayed = true;
            // 直接输出到UI
            try {
                if (typeof uiError !== "undefined") {
                    uiError(message, context, fileName, functionName);
                }
            } catch (e) {
                // 静默处理UI输出错误
            }
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
        } else {
            // GlobalLogController不存在时，默认允许生成日志
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
        
        // 创建日志条目并保存到缓存
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.WARN : 2, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
        }
        
        // 独立检查显示开关 - 决定是否输出到UI
        if (_shouldDisplayToUI("warn")) {
            wasDisplayed = true;
            // 直接输出到UI
            try {
                if (typeof uiWarn !== "undefined") {
                    uiWarn(message, context, fileName, functionName);
                }
            } catch (e) {
                // 静默处理UI输出错误
            }
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
        } else {
            // GlobalLogController不存在时，默认允许生成日志
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
        
        // 创建日志条目并保存到缓存
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.INFO : 4, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
        }
        
        // 独立检查显示开关 - 决定是否输出到UI
        if (_shouldDisplayToUI("info")) {
            wasDisplayed = true;
            // 直接输出到UI
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo(message, context, fileName, functionName);
                }
            } catch (e) {
                // 静默处理UI输出错误
            }
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
        } else {
            // GlobalLogController不存在时，默认允许生成日志
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
        
        // 创建日志条目并保存到缓存
        var logEntry = _createLogEntry(inst, LoggerTypes && LoggerTypes.LOG_LEVELS ? LoggerTypes.LOG_LEVELS.DEBUG : 8, message, context, fileName, functionName);
        if (_addToCache(inst, logEntry)) {
            // 移除原有的统计更新，使用统一统计处理
            _checkThreshold(inst);
        }
        
        // 独立检查显示开关 - 决定是否输出到UI
        if (_shouldDisplayToUI("debug")) {
            wasDisplayed = true;
            // 直接输出到UI
            try {
                if (typeof uiDebug !== "undefined") {
                    uiDebug(message, context, fileName, functionName);
                }
            } catch (e) {
                // 静默处理UI输出错误
            }
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
        
        if (typeof level !== "number" || level < 0) {
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
        
        // 先初始化Logger数据，再调用BaseModule的init
        var initResult = _performInitialization(baseInst);
        if (!initResult) {
            throw new Error("Logger初始化失败");
        }
        
        // 如果用户要求autoInit，调用BaseModule的init
        if (options && options.autoInit) {
            baseInst.init();
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
