// SimpleLoggerIndex - 简单日志模块索引
// 提供全局默认实例和便捷访问

// 引入SimpleLoggerModule
// 在实际AD环境中，这些文件会被合并

// 全局默认实例
var _defaultSimpleLogger = null;

// 模块配置
var _simpleModuleConfig = {
    defaultModuleName: "SimpleLogger",
    defaultLevel: 15,  // ALL
    defaultThreshold: 50
};

// 创建默认实例
function _createDefaultSimpleInstance() {
    if (!_defaultSimpleLogger) {
        var options = {
            moduleName: _simpleModuleConfig.defaultModuleName,
            level: _simpleModuleConfig.defaultLevel,
            threshold: _simpleModuleConfig.defaultThreshold,
            enabled: true,
            autoTime: true
        };
        
        _defaultSimpleLogger = SimpleLoggerModule.create(options);
    }
    
    return _defaultSimpleLogger;
}

// 便捷的全局函数
function SimpleLogDebug(message) {
    var logger = _createDefaultSimpleInstance();
    logger.debug(message);
}

function SimpleLogInfo(message) {
    var logger = _createDefaultSimpleInstance();
    logger.info(message);
}

function SimpleLogWarn(message) {
    var logger = _createDefaultSimpleInstance();
    logger.warn(message);
}

function SimpleLogError(message) {
    var logger = _createDefaultSimpleInstance();
    logger.error(message);
}

function SimpleLog(message) {
    var logger = _createDefaultSimpleInstance();
    logger.log(message);
}

function SimpleFlushLogs() {
    var logger = _createDefaultSimpleInstance();
    logger.flush();
}

// 揭示模块模式
var SimpleLoggerIndex = (function(){
    function create(options) {
        return SimpleLoggerModule.create(options);
    }
    
    function getDefault() {
        return _createDefaultSimpleInstance();
    }
    
    function configure(config) {
        if (config.moduleName) {
            _simpleModuleConfig.defaultModuleName = config.moduleName;
        }
        if (config.level !== undefined) {
            _simpleModuleConfig.defaultLevel = config.level;
        }
        if (config.threshold !== undefined) {
            _simpleModuleConfig.defaultThreshold = config.threshold;
        }
        
        // 如果已存在默认实例，更新其配置
        if (_defaultSimpleLogger) {
            if (config.level !== undefined) {
                _defaultSimpleLogger.setLevel(config.level);
            }
            if (config.threshold !== undefined) {
                _defaultSimpleLogger.setThreshold(config.threshold);
            }
        }
    }
    
    function reset() {
        _defaultSimpleLogger = null;
    }
    
    return {
        create: create,
        getDefault: getDefault,
        configure: configure,
        reset: reset
    };
})();
