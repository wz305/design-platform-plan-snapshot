/**
 * GlobalLogController 全局日志控制器
 * 
 * 提供日志级别的生成和显示控制，实现性能优化
 * ES3/JScript 5.8 兼容
 * 
 * IIFE模块架构说明
 * 
 * 1. 本模块使用IIFE模式封装对象：var ModuleName = (function(){...})();
 * 2. 构建后所有模块变量在同一作用域，可直接引用
 * 3. 不处理模块间依赖，需构建到一个文件中使用
 * 4. 不需要window对象，不需要额外的导出操作
 * 5. 依赖的模块必须在当前模块之前加载（通过merge-order.json控制）
 */

var GlobalLogController = (function() {
        
        // ---------------------------------------------------------
        // 1.1 私有变量
        // ---------------------------------------------------------
        
        // 生成级开关 - 控制日志是否被创建和处理
        var _generationSwitches = {
            debug: true,    // 默认开启
            info: true,     // 默认开启  
            warn: true,     // 默认开启
            error: true     // 默认开启（通常不建议关闭）
        };
        
        // 显示级开关 - 控制日志是否输出到UI
        var _displaySwitches = {
            debug: true,    // 默认开启
            info: true,     // 默认开启
            warn: true,     // 默认开启
            error: true     // 默认开启
        };
        
        // 性能统计
        var _stats = {
            generated: {
                debug: 0,
                info: 0,
                warn: 0,
                error: 0
            },
            filtered: {
                debug: 0,
                info: 0,
                warn: 0,
                error: 0
            },
            displayed: {
                debug: 0,
                info: 0,
                warn: 0,
                error: 0
            }
        };
        
        // 防重复统计机制
        var _processedLogs = {};  // 存储已处理的日志ID
        var _logIdCounter = 0;     // 日志ID计数器
        
        // 模块配置
        var _moduleConfig = {
            enableStats: true,           // 启用性能统计
            enableAutoOptimization: false, // 启用自动优化
            maxDebugPerSecond: 100,      // 每秒最大DEBUG日志数
            performanceThreshold: 1000   // 性能阈值（毫秒）
        };
        
        // 性能监控变量
        var _lastOptimizationTime = 0;
        var _debugCountInSecond = 0;
        var _secondStartTime = new Date().getTime();
        
        // ---------------------------------------------------------
        // 1.2 私有函数
        // ---------------------------------------------------------
        
        /**
         * 验证日志级别
         * @param {string} level 日志级别
         * @returns {boolean} 是否有效
         */
        function _isValidLevel(level) {
            return level === "debug" || 
                   level === "info" || 
                   level === "warn" || 
                   level === "error";
        }
        
        /**
         * 更新性能统计
         * @param {string} level 日志级别
         * @param {string} type 统计类型（generated/filtered/displayed）
         */
        function _updateStats(level, type) {
            if (!_moduleConfig.enableStats) {
                return;
            }
            
            try {
                if (_stats[type] && typeof _stats[type][level] === "number") {
                    _stats[type][level]++;
                }
            } catch (e) {
                // 静默处理统计错误
            }
        }
        
        /**
         * 自动性能优化
         */
        function _autoOptimization() {
            if (!_moduleConfig.enableAutoOptimization) {
                return;
            }
            
        var now = new Date().getTime();
            
            // 检查是否需要进行优化（每秒检查一次）
            if (now - _lastOptimizationTime < 1000) {
                return;
            }
            
            _lastOptimizationTime = now;
            
            // 检查DEBUG日志频率
            if (_debugCountInSecond > _moduleConfig.maxDebugPerSecond) {
                // 自动关闭DEBUG级别
                _generationSwitches.debug = false;
                _displaySwitches.debug = false;
                
                // 输出警告信息
                try {
                    if (typeof uiWarn !== "undefined") {
                        uiWarn("自动性能优化：DEBUG日志过多，已自动关闭", {
                            debugCount: _debugCountInSecond,
                            threshold: _moduleConfig.maxDebugPerSecond
                        }, "log-controller", "_autoOptimization");
                    }
                } catch (e) {
                    // 静默处理
                }
            }
            
            // 重置计数器
            _debugCountInSecond = 0;
            _secondStartTime = now;
        }
        
        /**
         * 检查DEBUG日志频率
         */
        function _checkDebugFrequency() {
            if (!_moduleConfig.enableAutoOptimization) {
                return;
            }
            
            var now = new Date().getTime();
            
            // 如果超过1秒，重置计数器
            if (now - _secondStartTime >= 1000) {
                _debugCountInSecond = 0;
                _secondStartTime = now;
            }
            
            _debugCountInSecond++;
            
            // 触发自动优化检查
            _autoOptimization();
        }
        
        /**
         * 生成唯一的日志ID
         * @param {string} level 日志级别
         * @param {string} message 日志消息
         * @param {string} moduleName 模块名
         * @param {string} functionName 函数名
         * @returns {string} 唯一的日志ID
         */
        function _generateLogId(level, message, moduleName, functionName) {
            // 使用时间戳、计数器和消息内容生成唯一ID
            var timestamp = new Date().getTime();
            var content = (level || "") + "|" + (message || "") + "|" + (moduleName || "") + "|" + (functionName || "");
            var hash = 0;
            
            // 简单的字符串哈希算法
            for (var i = 0; i < content.length; i++) {
                var charCode = content.charCodeAt(i);
                hash = ((hash << 5) - hash) + charCode;
                hash = hash & hash; // 转换为32位整数
            }
            
            return timestamp + "_" + Math.abs(hash) + "_" + (_logIdCounter++);
        }
        
        /**
         * 检查日志是否已被处理
         * @param {string} logId 日志ID
         * @returns {boolean} 是否已被处理
         */
        function _isLogProcessed(logId) {
            return _processedLogs.hasOwnProperty(logId);
        }
        
        /**
         * 标记日志为已处理
         * @param {string} logId 日志ID
         */
        function _markLogProcessed(logId) {
            _processedLogs[logId] = true;
            
            // 清理旧的日志ID（保持最近1000个）
            var keys = [];
            for (var key in _processedLogs) {
                if (_processedLogs.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            
            if (keys.length > 1000) {
                // 按时间戳排序，删除最旧的一半
                keys.sort();
                var deleteCount = Math.floor(keys.length / 2);
                for (var i = 0; i < deleteCount; i++) {
                    delete _processedLogs[keys[i]];
                }
            }
        }
        
        /**
         * 统一的日志统计更新函数
         * @param {string} level 日志级别
         * @param {string} type 统计类型（generated/filtered/displayed）
         * @param {string} logId 日志ID（可选，用于防重复）
         * @returns {boolean} 是否成功更新统计
         */
        function _updateStatsUnified(level, type, logId) {
            if (!_moduleConfig.enableStats) {
                return false;
            }
            
            // 如果提供了logId，检查是否已处理
            if (logId) {
                if (_isLogProcessed(logId)) {
                    return false; // 已处理，跳过统计
                }
                _markLogProcessed(logId);
            }
            
            try {
                if (_stats[type] && typeof _stats[type][level] === "number") {
                    _stats[type][level]++;
                    return true;
                }
            } catch (e) {
                // 静默处理统计错误
            }
            
            return false;
        }
        
        /**
         * 处理日志统计的统一入口
         * @param {string} level 日志级别
         * @param {string} message 日志消息
         * @param {string} moduleName 模块名
         * @param {string} functionName 函数名
         * @param {boolean} wasGenerated 是否被生成
         * @param {boolean} wasFiltered 是否被过滤
         * @param {boolean} wasDisplayed 是否被显示
         * @returns {Object} 处理结果
         */
        function _processLogStats(level, message, moduleName, functionName, wasGenerated, wasFiltered, wasDisplayed) {
            var logId = _generateLogId(level, message, moduleName, functionName);
            var result = {
                logId: logId,
                generated: false,
                filtered: false,
                displayed: false
            };
            
            if (wasGenerated) {
                result.generated = _updateStatsUnified(level, "generated", logId);
            }
            
            if (wasFiltered) {
                result.filtered = _updateStatsUnified(level, "filtered", logId);
            }
            
            if (wasDisplayed) {
                result.displayed = _updateStatsUnified(level, "displayed", logId);
            }
            
            return result;
        }
        
        // ---------------------------------------------------------
        // 1.3 公共API - 生成级控制
        // ---------------------------------------------------------
        
        /**
         * 设置生成级开关
         * @param {string} level 日志级别
         * @param {boolean} enabled 是否启用
         * @returns {boolean} 是否成功
         */
        function setGenerationLevel(level, enabled) {
            if (!_isValidLevel(level)) {
                return false;
            }
            
            var oldValue = _generationSwitches[level];
            _generationSwitches[level] = enabled;
            
            // 输出状态变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("生成级开关变更", {
                        level: level.toUpperCase(),
                        oldValue: oldValue,
                        newValue: enabled
                    }, "log-controller", "setGenerationLevel");
                }
            } catch (e) {
                // 静默处理
            }
            
            return true;
        }
        
        /**
         * 检查生成级开关是否启用
         * @param {string} level 日志级别
         * @returns {boolean} 是否启用
         */
        function isGenerationEnabled(level) {
            if (!_isValidLevel(level)) {
                return false;
            }
            
            var enabled = _generationSwitches[level];
            
            // 如果启用，更新统计和检查频率
            if (enabled) {
                _updateStats(level, "generated");
                
                // 特殊处理DEBUG级别的频率检查
                if (level === "debug") {
                    _checkDebugFrequency();
                }
            } else {
                _updateStats(level, "filtered");
            }
            
            return enabled;
        }
        
        /**
         * 获取生成级开关状态
         * @param {string} level 日志级别（可选）
         * @returns {Object|boolean} 开关状态
         */
        function getGenerationSwitches(level) {
            if (level && _isValidLevel(level)) {
                return _generationSwitches[level];
            }
            
            // 返回所有状态的副本
            var result = {};
            for (var key in _generationSwitches) {
                if (_generationSwitches.hasOwnProperty(key)) {
                    result[key] = _generationSwitches[key];
                }
            }
            return result;
        }
        
        // ---------------------------------------------------------
        // 1.4 公共API - 显示级控制
        // ---------------------------------------------------------
        
        /**
         * 设置显示级开关
         * @param {string} level 日志级别
         * @param {boolean} enabled 是否启用
         * @returns {boolean} 是否成功
         */
        function setDisplayLevel(level, enabled) {
            if (!_isValidLevel(level)) {
                return false;
            }
            
            var oldValue = _displaySwitches[level];
            _displaySwitches[level] = enabled;
            
            // 输出状态变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("显示级开关变更", {
                        level: level.toUpperCase(),
                        oldValue: oldValue,
                        newValue: enabled
                    }, "log-controller", "setDisplayLevel");
                }
            } catch (e) {
                // 静默处理
            }
            
            return true;
        }
        
        /**
         * 检查显示级开关是否启用
         * @param {string} level 日志级别
         * @returns {boolean} 是否启用
         */
        function isDisplayEnabled(level) {
            if (!_isValidLevel(level)) {
                return false;
            }
            
            var enabled = _displaySwitches[level];
            
            // 更新统计
            if (enabled) {
                _updateStats(level, "displayed");
            }
            
            return enabled;
        }
        
        /**
         * 获取显示级开关状态
         * @param {string} level 日志级别（可选）
         * @returns {Object|boolean} 开关状态
         */
        function getDisplaySwitches(level) {
            if (level && _isValidLevel(level)) {
                return _displaySwitches[level];
            }
            
            // 返回所有状态的副本
            var result = {};
            for (var key in _displaySwitches) {
                if (_displaySwitches.hasOwnProperty(key)) {
                    result[key] = _displaySwitches[key];
                }
            }
            return result;
        }
        
        // ---------------------------------------------------------
        // 1.5 公共API - 批量操作
        // ---------------------------------------------------------
        
        /**
         * 开启所有级别
         */
        function enableAllLevels() {
            var changed = [];
            
            for (var level in _generationSwitches) {
                if (_generationSwitches.hasOwnProperty(level)) {
                    if (!_generationSwitches[level]) {
                        _generationSwitches[level] = true;
                        changed.push("GEN-" + level.toUpperCase());
                    }
                }
            }
            
            for (var level in _displaySwitches) {
                if (_displaySwitches.hasOwnProperty(level)) {
                    if (!_displaySwitches[level]) {
                        _displaySwitches[level] = true;
                        changed.push("DISP-" + level.toUpperCase());
                    }
                }
            }
            
            // 输出变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("开启所有日志级别", {
                        changed: changed
                    }, "log-controller", "enableAllLevels");
                }
            } catch (e) {
                // 静默处理
            }
        }
        
        /**
         * 关闭所有级别
         */
        function disableAllLevels() {
            var changed = [];
            
            for (var level in _generationSwitches) {
                if (_generationSwitches.hasOwnProperty(level)) {
                    if (_generationSwitches[level]) {
                        _generationSwitches[level] = false;
                        changed.push("GEN-" + level.toUpperCase());
                    }
                }
            }
            
            for (var level in _displaySwitches) {
                if (_displaySwitches.hasOwnProperty(level)) {
                    if (_displaySwitches[level]) {
                        _displaySwitches[level] = false;
                        changed.push("DISP-" + level.toUpperCase());
                    }
                }
            }
            
            // 输出变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("关闭所有日志级别", {
                        changed: changed
                    }, "log-controller", "disableAllLevels");
                }
            } catch (e) {
                // 静默处理
            }
        }
        
        /**
         * 生产模式：仅ERROR级别
         */
        function enableProductionMode() {
            var changed = [];
            
            // 设置生成级开关
            for (var level in _generationSwitches) {
                if (_generationSwitches.hasOwnProperty(level)) {
                    var newValue = (level === "error");
                    if (_generationSwitches[level] !== newValue) {
                        _generationSwitches[level] = newValue;
                        changed.push("GEN-" + level.toUpperCase() + ":" + (newValue ? "ON" : "OFF"));
                    }
                }
            }
            
            // 设置显示级开关
            for (var level in _displaySwitches) {
                if (_displaySwitches.hasOwnProperty(level)) {
                    var newValue = (level === "error");
                    if (_displaySwitches[level] !== newValue) {
                        _displaySwitches[level] = newValue;
                        changed.push("DISP-" + level.toUpperCase() + ":" + (newValue ? "ON" : "OFF"));
                    }
                }
            }
            
            // 输出变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("切换到生产模式", {
                        changed: changed,
                        mode: "PRODUCTION"
                    }, "log-controller", "enableProductionMode");
                }
            } catch (e) {
                // 静默处理
            }
        }
        
        /**
         * 调试模式：DEBUG + INFO + ERROR
         */
        function enableDebugMode() {
            var changed = [];
            
            // 设置生成级开关
            for (var level in _generationSwitches) {
                if (_generationSwitches.hasOwnProperty(level)) {
                    var newValue = (level !== "warn");
                    if (_generationSwitches[level] !== newValue) {
                        _generationSwitches[level] = newValue;
                        changed.push("GEN-" + level.toUpperCase() + ":" + (newValue ? "ON" : "OFF"));
                    }
                }
            }
            
            // 设置显示级开关
            for (var level in _displaySwitches) {
                if (_displaySwitches.hasOwnProperty(level)) {
                    var newValue = (level !== "warn");
                    if (_displaySwitches[level] !== newValue) {
                        _displaySwitches[level] = newValue;
                        changed.push("DISP-" + level.toUpperCase() + ":" + (newValue ? "ON" : "OFF"));
                    }
                }
            }
            
            // 输出变更信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("切换到调试模式", {
                        changed: changed,
                        mode: "DEBUG"
                    }, "log-controller", "enableDebugMode");
                }
            } catch (e) {
                // 静默处理
            }
        }
        
        // ---------------------------------------------------------
        // 1.6 公共API - 统计和监控
        // ---------------------------------------------------------
        
        /**
         * 获取性能统计
         * @returns {Object} 统计信息
         */
        function getStats() {
            if (!_moduleConfig.enableStats) {
                return {enabled: false};
            }
            
            // 返回统计信息的副本
            var result = {
                enabled: true,
                generated: {},
                filtered: {},
                displayed: {},
                summary: {}
            };
            
            // 复制统计数据
            for (var type in _stats) {
                if (_stats.hasOwnProperty(type)) {
                    result[type] = {};
                    for (var level in _stats[type]) {
                        if (_stats[type].hasOwnProperty(level)) {
                            result[type][level] = _stats[type][level];
                        }
                    }
                }
            }
            
            // 计算汇总信息
            for (var level in _stats.generated) {
                if (_stats.generated.hasOwnProperty(level)) {
                    var total = _stats.generated[level];
                    var filtered = _stats.filtered[level];
                    var displayed = _stats.displayed[level];
                    
                    result.summary[level] = {
                        total: total,
                        filtered: filtered,
                        displayed: displayed,
                        filterRate: total > 0 ? (filtered / total * 100).toFixed(2) + "%" : "0%",
                        displayRate: total > 0 ? (displayed / total * 100).toFixed(2) + "%" : "0%"
                    };
                }
            }
            
            return result;
        }
        
        /**
         * 重置统计信息
         */
        function resetStats() {
            _stats.generated = {debug: 0, info: 0, warn: 0, error: 0};
            _stats.filtered = {debug: 0, info: 0, warn: 0, error: 0};
            _stats.displayed = {debug: 0, info: 0, warn: 0, error: 0};
            
            // 清空已处理日志记录
            _processedLogs = {};
            _logIdCounter = 0;
            
            // 输出重置信息
            try {
                if (typeof uiInfo !== "undefined") {
                    uiInfo("统计信息已重置", null, "log-controller", "resetStats");
                }
            } catch (e) {
                // 静默处理
            }
        }
        
        /**
         * 统一的日志统计处理API
         * @param {string} level 日志级别
         * @param {string} message 日志消息
         * @param {string} moduleName 模块名
         * @param {string} functionName 函数名
         * @param {boolean} wasGenerated 是否被生成
         * @param {boolean} wasFiltered 是否被过滤
         * @param {boolean} wasDisplayed 是否被显示
         * @returns {Object} 处理结果
         */
        function processLogStats(level, message, moduleName, functionName, wasGenerated, wasFiltered, wasDisplayed) {
            return _processLogStats(level, message, moduleName, functionName, wasGenerated, wasFiltered, wasDisplayed);
        }
        
        /**
         * 输出详细的debug信息到UI
         * @param {string} level 日志级别
         * @param {string} message 日志消息
         * @param {*} context 上下文信息
         * @param {string} moduleName 模块名
         * @param {string} functionName 函数名
         */
        function outputDebugInfo(level, message, context, moduleName, functionName) {
            try {
                // 检查是否启用debug输出
                if (!_displaySwitches.debug && level === "debug") {
                    return;
                }
                
                var timestamp = new Date().toLocaleString();
                var debugInfo = {
                    timestamp: timestamp,
                    level: level.toUpperCase(),
                    message: message,
                    moduleName: moduleName || "Unknown",
                    functionName: functionName || "Unknown",
                    context: context || null,
                    controllerState: {
                        generationSwitches: _generationSwitches,
                        displaySwitches: _displaySwitches,
                        stats: _stats
                    }
                };
                
                // 尝试输出到UI
                if (typeof uiDebug !== "undefined") {
                    uiDebug(level, message, debugInfo, moduleName, functionName);
                } else if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
                    // 备用输出方式
                    var output = "[" + timestamp + "][DEBUG-" + level.toUpperCase() + "][" + moduleName + "][" + functionName + "] " + message;
                    if (context) {
                        try {
                            output += " | " + JSON.stringify(context);
                        } catch (e) {
                            output += " | [Context: 无法序列化]";
                        }
                    }
                    memLog.Lines.Add(output);
                }
                
            } catch (e) {
                // 静默处理debug输出错误
            }
        }
        
        /**
         * 获取详细的系统状态信息
         * @returns {Object} 系统状态
         */
        function getDetailedStatus() {
            var status = {
                timestamp: new Date().toLocaleString(),
                controller: {
                    available: true,
                    version: "1.0.0"
                },
                switches: {
                    generation: _generationSwitches,
                    display: _displaySwitches
                },
                statistics: _stats,
                configuration: _moduleConfig,
                performance: {
                    lastOptimizationTime: _lastOptimizationTime,
                    debugCountInSecond: _debugCountInSecond,
                    secondStartTime: _secondStartTime
                },
                processedLogs: {
                    count: 0,
                    sampleIds: []
                }
            };
            
            // 统计已处理日志数量
            var count = 0;
            var samples = [];
            for (var id in _processedLogs) {
                if (_processedLogs.hasOwnProperty(id)) {
                    count++;
                    if (samples.length < 5) {
                        samples.push(id);
                    }
                }
            }
            status.processedLogs.count = count;
            status.processedLogs.sampleIds = samples;
            
            return status;
        }
        
        /**
         * 输出完整的系统诊断信息
         */
        function outputSystemDiagnostics() {
            try {
                var status = getDetailedStatus();
                
                outputDebugInfo("info", "=== GlobalLogController 系统诊断 ===", status, "log-controller", "outputSystemDiagnostics");
                
                // 输出各级别开关状态
                for (var level in _generationSwitches) {
                    if (_generationSwitches.hasOwnProperty(level)) {
                        outputDebugInfo("info", "开关状态 - " + level.toUpperCase(), {
                            generation: _generationSwitches[level],
                            display: _displaySwitches[level]
                        }, "log-controller", "outputSystemDiagnostics");
                    }
                }
                
                // 输出统计信息
                outputDebugInfo("info", "性能统计", _stats, "log-controller", "outputSystemDiagnostics");
                
                // 输出配置信息
                outputDebugInfo("info", "模块配置", _moduleConfig, "log-controller", "outputSystemDiagnostics");
                
                outputDebugInfo("info", "=== 诊断完成 ===", null, "log-controller", "outputSystemDiagnostics");
                
            } catch (e) {
                // 静默处理诊断错误
            }
        }
        
        /**
         * 清理过期的已处理日志记录
         */
        function cleanupProcessedLogs() {
            var keys = [];
            for (var key in _processedLogs) {
                if (_processedLogs.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            
            if (keys.length > 500) {
                // 按时间戳排序，删除最旧的一半
                keys.sort();
                var deleteCount = Math.floor(keys.length / 2);
                for (var i = 0; i < deleteCount; i++) {
                    delete _processedLogs[keys[i]];
                }
            }
        }
        
        /**
         * 配置模块
         * @param {Object} config 配置选项
         */
        function configure(config) {
            if (config && typeof config === "object") {
                for (var key in config) {
                    if (config.hasOwnProperty(key) && _moduleConfig.hasOwnProperty(key)) {
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
        
        // ---------------------------------------------------------
        // 1.7 导出接口
        // ---------------------------------------------------------
        
        return {
            // 生成级控制
            setGenerationLevel: setGenerationLevel,
            isGenerationEnabled: isGenerationEnabled,
            getGenerationSwitches: getGenerationSwitches,
            
            // 显示级控制
            setDisplayLevel: setDisplayLevel,
            isDisplayEnabled: isDisplayEnabled,
            getDisplaySwitches: getDisplaySwitches,
            
            // 批量操作
            enableAllLevels: enableAllLevels,
            disableAllLevels: disableAllLevels,
            enableProductionMode: enableProductionMode,
            enableDebugMode: enableDebugMode,
            
            // 统计和监控
            getStats: getStats,
            resetStats: resetStats,
            processLogStats: processLogStats,
            cleanupProcessedLogs: cleanupProcessedLogs,
            
            // Debug和诊断功能
            outputDebugInfo: outputDebugInfo,
            getDetailedStatus: getDetailedStatus,
            outputSystemDiagnostics: outputSystemDiagnostics,
            
            // 配置管理
            configure: configure,
            getConfiguration: getConfiguration
        };
        
    })();
