/**
 * Core - 核心系统模块
 * 基于BaseModule的核心系统管理器
 * 提供系统级别的配置、状态管理和协调功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var Core = (function(){
    
    // 依赖引用（直接使用，构建后自动可访问）
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _defaultOptions = {
        moduleName: "Core",
        autoInit: true,
        autoTime: true,
        debugMode: false,
        enableLogging: true,
        systemConfig: {}
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
    
    function _createSystemState() {
        return {
            initialized: false,
            modulesLoaded: 0,
            modulesTotal: 0,
            lastActivity: null,
            errorCount: 0,
            warnings: []
        };
    }
    
    // Core构造函数
    function Core(userOptions) {
        var options = _mergeOptions(userOptions || {}, _defaultOptions);
        
        // 创建BaseModule实例
        var baseInstance = BaseModule.create(options);
        
        // 扩展BaseInstance以添加Core特定功能
        var coreInstance = {
            // 继承BaseModule的所有属性和方法
            options: baseInstance.options,
            state: baseInstance.state,
            context: baseInstance.context,
            hooks: baseInstance.hooks,
            init: function() { return baseInstance.init(); },
            run: function() { return baseInstance.run(); },
            destroy: function() { return baseInstance.destroy(); },
            
            // 确保logger字段存在（初始为null，在初始化时设置）
            logger: null,
            
            // Core特有属性
            systemState: _createSystemState(),
            
            // Core特有方法
            getSystemState: function() {
                return this.systemState;
            },
            
            updateSystemState: function(updates) {
                if (updates && typeof updates === "object") {
                    var key;
                    for (key in updates) {
                        if (updates.hasOwnProperty(key)) {
                            this.systemState[key] = updates[key];
                        }
                    }
                }
                return this.systemState;
            },
            
            addWarning: function(message) {
                if (message && typeof message === "string") {
                    this.systemState.warnings.push({
                        message: message,
                        timestamp: new Date(),
                        level: "WARNING"
                    });
                }
            },
            
            clearWarnings: function() {
                this.systemState.warnings = [];
            },
            
            getWarnings: function() {
                return this.systemState.warnings.slice(); // 返回副本
            },
            
            // 重写BaseModule的初始化方法
            _performInitialization: function() {
                try {
                    // Core特定的初始化逻辑
                    this.systemState.initialized = true;
                    this.systemState.lastActivity = new Date();
                    
                    // 尝试创建Logger实例
                    if (this.options.enableLogging) {
                        try {
                            if (typeof Logger !== "undefined") {
                                this.logger = Logger.create("Core");
                            }
                        } catch (error) {
                            // Logger创建失败不应该阻止Core初始化
                            this.addWarning("Logger creation failed: " + error.message);
                        }
                    }
                    
                    return true;
                } catch (error) {
                    this.systemState.errorCount++;
                    throw error;
                }
            },
            
            // 重写BaseModule的主逻辑方法
            _executeMainLogic: function() {
                try {
                    this.systemState.lastActivity = new Date();
                    
                    var result = {
                        success: true,
                        message: "Core executed successfully",
                        data: {
                            systemState: this.systemState,
                            moduleState: this.state,
                            warnings: this.getWarnings()
                        },
                        time: this.context.executionTime
                    };
                    
                    return result;
                } catch (error) {
                    this.systemState.errorCount++;
                    throw error;
                }
            },
            
            // 重写BaseModule的销毁方法
            _performDestroy: function() {
                try {
                    // Core特定的清理逻辑
                    this.systemState.initialized = false;
                    this.clearWarnings();
                    
                    return true;
                } catch (error) {
                    this.systemState.errorCount++;
                    throw error;
                }
            },
            
            // Core特有的健康检查
            isHealthy: function() {
                return this.state.initialized && 
                       !this.state.destroyed && 
                       this.systemState.errorCount === 0;
            },
            
            // 获取Core信息
            getInfo: function() {
                return {
                    name: "Core",
                    version: _moduleVersion,
                    state: this.state,
                    systemState: this.systemState,
                    options: this.options,
                    healthy: this.isHealthy()
                };
            }
        };
        
        // 自动初始化
        if (options.autoInit) {
            coreInstance.init();
        }
        
        return coreInstance;
    }
    
    // 静态方法
    Core.create = function(options) {
        return new Core(options);
    };
    
    Core.version = _moduleVersion;
    Core.defaultOptions = _defaultOptions;
    
    return Core;
})();

// 通过window导出，确保AD环境可访问
if (typeof window !== "undefined") {
    window.Core = Core;
}
