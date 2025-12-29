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
 * BaseModule - AD ES3 模块基础架构
 * 提供标准的模块生命周期、状态管理、Hook系统
 * 100% 兼容 JScript 5.8 (ES3)
 */

var BaseModule = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _defaultOptions = {
        moduleName: "BaseModule",
        autoInit: false,
        autoTime: true,
        debugMode: false
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
    
    function _createHooks() {
        return {
            onBeforeInit: null,
            onAfterInit: null,
            onBeforeRun: null,
            onAfterRun: null,
            onBeforeDestroy: null,
            onAfterDestroy: null
        };
    }
    
    function _createState() {
        return {
            initialized: false,
            running: false,
            destroyed: false,
            errorCount: 0,
            lastError: null
        };
    }
    
    function _createContext() {
        return {
            startTime: null,
            endTime: null,
            executionTime: 0
        };
    }
    
    function _executeHook(hook, instance, data) {
        if (hook && typeof hook === "function") {
            try {
                return hook(instance, data);
            } catch (error) {
                // 直接输出到UI，不再静默处理
                try {
                    if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
                        memLog.Lines.Add("[BaseModule][ERROR] Hook execution failed: " + error.message);
                    }
                } catch (e) {
                    // 如果连UI输出都失败，那就真的没办法了
                }
                return null;
            }
        }
        return null;
    }
    
    // 可重写的核心方法（子模块重写这些）
    function _performInitialization(inst) {
        // 子模块重写此方法实现具体初始化
        return true;
    }
    
    function _executeMainLogic(inst) {
        // 子模块重写此方法实现主要逻辑
        return {
            success: true,
            message: "BaseModule executed successfully",
            data: null,
            time: inst.context.executionTime
        };
    }
    
    function _performDestroy(inst) {
        // 子模块重写此方法实现资源清理
        return true;
    }
    
    // 公有API函数
    function create(userOptions) {
        var options = _mergeOptions(userOptions || {}, _defaultOptions);
        
        var instance = {
            // 配置选项
            options: options,
            
            // 运行状态
            state: _createState(),
            
            // 执行上下文
            context: _createContext(),
            
            // Hook系统
            hooks: _createHooks(),
            
            // 生命周期方法
            init: function() { return init(instance); },
            run: function() { return run(instance); },
            destroy: function() { return destroy(instance); },
            
            // 内部方法引用（子模块可重写）
            _performInitialization: function() { return _performInitialization(instance); },
            _executeMainLogic: function() { return _executeMainLogic(instance); },
            _performDestroy: function() { return _performDestroy(instance); }
        };
        
        // 创建日志记录器（移除Logger依赖，避免循环依赖）
        // 注意：BaseModule不应该依赖Logger，Logger应该依赖BaseModule
        instance.logger = null;
        
        // 自动初始化
        if (options.autoInit) {
            init(instance);
        }
        
        return instance;
    }
    
    function init(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][init] Instance is required");
        }
        
        if (instance.state.initialized) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][init] Module already initialized");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeInit, instance);
            
            // 设置开始时间
            if (instance.options.autoTime) {
                instance.context.startTime = new Date();
            }
            
            // 执行具体初始化
            var initResult = instance._performInitialization();
            
            if (initResult) {
                instance.state.initialized = true;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterInit, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BaseModule][index.js][init] Module initialized successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BaseModule][index.js][init] Initialization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][init] Initialization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function run(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][run] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BaseModule][index.js][run] Module not initialized");
        }
        
        if (instance.state.running) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][run] Module already running");
            }
            return null;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeRun, instance);
            
            // 设置运行状态
            instance.state.running = true;
            
            // 设置开始时间
            if (instance.options.autoTime) {
                instance.context.startTime = new Date();
            }
            
            // 执行主要逻辑
            var result = instance._executeMainLogic();
            
            // 设置结束时间和执行时间
            if (instance.options.autoTime && instance.context.startTime) {
                instance.context.endTime = new Date();
                instance.context.executionTime = instance.context.endTime.getTime() - instance.context.startTime.getTime();
                
                if (result) {
                    result.time = instance.context.executionTime;
                }
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterRun, instance, result);
            
            if (instance.logger && instance.logger.info) {
                instance.logger.info("[BaseModule][index.js][run] Module executed successfully: " + instance.options.moduleName + " (" + instance.context.executionTime + "ms)");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][run] Execution error: " + error.message);
            }
            
            throw error;
        } finally {
            instance.state.running = false;
        }
    }
    
    function destroy(instance) {
        if (!instance) {
            throw new Error("[BaseModule][index.js][destroy] Instance is required");
        }
        
        if (instance.state.destroyed) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BaseModule][index.js][destroy] Module already destroyed");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeDestroy, instance);
            
            // 执行具体销毁逻辑
            var destroyResult = instance._performDestroy();
            
            if (destroyResult) {
                // 清理状态
                instance.state.destroyed = true;
                instance.state.initialized = false;
                instance.state.running = false;
                
                // 清理上下文
                instance.context.startTime = null;
                instance.context.endTime = null;
                instance.context.executionTime = 0;
                
                // 清理Hook
                instance.hooks.onBeforeInit = null;
                instance.hooks.onAfterInit = null;
                instance.hooks.onBeforeRun = null;
                instance.hooks.onAfterRun = null;
                instance.hooks.onBeforeDestroy = null;
                instance.hooks.onAfterDestroy = null;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterDestroy, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BaseModule][index.js][destroy] Module destroyed successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BaseModule][index.js][destroy] Destruction failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BaseModule][index.js][destroy] Destruction error: " + error.message);
            }
            
            throw error;
        }
    }
    
    // 返回模块接口
    return {
        create: create,
        init: init,
        run: run,
        destroy: destroy,
        
        // 版本信息
        version: _moduleVersion,
        
        // 默认选项（供参考）
        defaultOptions: _defaultOptions
    };
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.BaseModule = BaseModule;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = BaseModule;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.BaseModule = BaseModule;
    }
})();
