/**
 * BasePCBWrapper - PCB对象封装基类（双向绑定架构）
 * 提供属性缓存、Mock支持、生命周期管理、双向绑定
 * 100% 兼容 JScript 5.8 (ES3)
 */

var BasePCBWrapper = (function(){
    
    // 私有变量
    var _moduleVersion = "2.0.0";
    var _defaultOptions = {
        moduleName: "BasePCBWrapper",
        autoInit: false,
        autoTime: true,
        debugMode: false,
        enableCache: true,
        enableMock: false,
        enableDirectAccess: true,  // 启用直接访问原生对象
        syncMode: "auto"            // 同步模式: "auto", "manual", "realtime"
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
            onAfterDestroy: null,
            onBeforePropertyAccess: null,
            onAfterPropertyAccess: null,
            onBeforeSync: null,
            onAfterSync: null,
            onBeforeNativeAccess: null,
            onAfterNativeAccess: null
        };
    }
    
    function _createState() {
        return {
            initialized: false,
            running: false,
            destroyed: false,
            errorCount: 0,
            lastError: null,
            cacheHits: 0,
            cacheMisses: 0,
            syncCount: 0,
            nativeAccessCount: 0
        };
    }
    
    function _createContext() {
        return {
            startTime: null,
            endTime: null,
            executionTime: 0,
            lastSyncTime: null,
            creationTime: new Date()
        };
    }
    
    function _executeHook(hook, instance, data) {
        if (hook && typeof hook === "function") {
            try {
                return hook(instance, data);
            } catch (error) {
                // 记录Hook执行错误
                if (instance.logger && instance.logger.error) {
                    instance.logger.error("[BasePCBWrapper][index.js][_executeHook] Hook execution failed: " + error.message);
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
            message: "BasePCBWrapper executed successfully",
            data: null,
            time: inst.context.executionTime
        };
    }
    
    function _performDestroy(inst) {
        // 子模块重写此方法实现资源清理
        return true;
    }
    
    function _extractSpecificProperties(inst) {
        // 子模块重写此方法提取特定属性
        // 默认实现：提取基础属性
        if (inst.nativeObject) {
            inst.cachedProperties.ObjectId = inst.nativeObject.ObjectId;
            inst.cachedProperties.I_ObjectAddress = inst.nativeObject.I_ObjectAddress;
            inst.cachedProperties.V6_LayerID = inst.nativeObject.V6_LayerID;
            inst.cachedProperties.V7_LayerID = inst.nativeObject.V7_LayerID;
            inst.cachedProperties.LayerStack = inst.nativeObject.LayerStack;
        }
    }
    
    function _syncPropertiesToNative(inst) {
        // 子模块重写此方法同步属性到原生对象
        // 默认实现：同步基础属性
        if (inst.nativeObject && inst.isDirty) {
            // 这里可以添加基础属性同步逻辑
            inst.isDirty = false;
            return true;
        }
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
            
            // PCB对象特有属性
            nativeObject: options.nativeObject || null,  // AD原生对象引用
            cachedProperties: {},                        // 属性缓存
            isDirty: false,                             // 是否需要同步
            objectType: options.objectType || "unknown", // 对象类型标识
            
            // Mock支持
            isMock: options.isMock || false,
            mockData: options.mockData || {},
            
            // 生命周期方法
            init: function() { return init(instance); },
            run: function() { return run(instance); },
            destroy: function() { return destroy(instance); },
            
            // 内部方法引用（子模块可重写）
            _performInitialization: function() { return _performInitialization(instance); },
            _executeMainLogic: function() { return _executeMainLogic(instance); },
            _performDestroy: function() { return _performDestroy(instance); },
            _extractSpecificProperties: function() { return _extractSpecificProperties(instance); },
            _syncPropertiesToNative: function() { return _syncPropertiesToNative(instance); },
            
            // 属性访问方法（双向绑定）
            getProperty: function(propertyName) { return getProperty(instance, propertyName); },
            setProperty: function(propertyName, value) { return setProperty(instance, propertyName, value); },
            hasProperty: function(propertyName) { return hasProperty(instance, propertyName); },
            getAllProperties: function() { return getAllProperties(instance); },
            
            // 直接访问原生对象方法
            getNativeProperty: function(propertyName) { return getNativeProperty(instance, propertyName); },
            setNativeProperty: function(propertyName, value) { return setNativeProperty(instance, propertyName, value); },
            callNativeMethod: function(methodName) { 
                var args = Array.prototype.slice.call(arguments, 1);
                return callNativeMethod.apply(null, [instance, methodName].concat(args)); 
            },
            
            // 缓存管理方法
            clearCache: function() { return clearCache(instance); },
            getCacheStats: function() { return getCacheStats(instance); },
            
            // 同步方法
            syncToNative: function() { return syncToNative(instance); },
            syncFromNative: function() { return syncFromNative(instance); },
            isSyncNeeded: function() { return isSyncNeeded(instance); },
            
            // 对象标识方法
            getObjectId: function() { return getObjectId(instance); },
            getObjectType: function() { return getObjectType(instance); },
            isMockObject: function() { return isMockObject(instance); },
            getNativeObject: function() { return getNativeObject(instance); },
            
            // Mock数据访问方法
            getMockData: function() { return getMockData(instance); },
            isMockMode: function() { return isMockMode(instance); },
            
            // 调试方法
            getDebugInfo: function() { return getDebugInfo(instance); },
            validateState: function() { return validateState(instance); }
        };
        
        // 创建日志记录器（延迟初始化，避免循环依赖）
        instance.logger = null;
        
        // 自动初始化
        if (options.autoInit) {
            init(instance);
        }
        
        return instance;
    }
    
    function init(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][init] Instance is required");
        }
        
        if (instance.state.initialized) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][init] Module already initialized");
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
            
            // 验证前置条件
            if (!instance.isMock && !instance.nativeObject) {
                throw new Error("[BasePCBWrapper][index.js][init] Native PCB object is required for non-mock objects");
            }
            
            // 执行具体初始化
            var initResult = instance._performInitialization();
            
            if (initResult) {
                // 一次性提取并缓存所有属性
                if (instance.options.enableCache) {
                    instance._extractSpecificProperties();
                }
                
                instance.state.initialized = true;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterInit, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BasePCBWrapper][index.js][init] Module initialized successfully: " + instance.options.moduleName + 
                                        ", Type: " + instance.objectType + 
                                        ", Mock: " + instance.isMock +
                                        ", DirectAccess: " + instance.options.enableDirectAccess);
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][init] Initialization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][init] Initialization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function run(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][run] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][run] Module not initialized");
        }
        
        if (instance.state.running) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][run] Module already running");
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
                instance.logger.info("[BasePCBWrapper][index.js][run] Module executed successfully: " + instance.options.moduleName + " (" + instance.context.executionTime + "ms)");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][run] Execution error: " + error.message);
            }
            
            throw error;
        } finally {
            instance.state.running = false;
        }
    }
    
    function destroy(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][destroy] Instance is required");
        }
        
        if (instance.state.destroyed) {
            if (instance.logger && instance.logger.warn) {
                instance.logger.warn("[BasePCBWrapper][index.js][destroy] Module already destroyed");
            }
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeDestroy, instance);
            
            // 同步到原生对象（如果需要）
            if (instance.isSyncNeeded()) {
                instance.syncToNative();
            }
            
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
                instance.context.lastSyncTime = null;
                
                // 清理缓存
                instance.cachedProperties = {};
                
                // 清理Hook
                instance.hooks.onBeforeInit = null;
                instance.hooks.onAfterInit = null;
                instance.hooks.onBeforeRun = null;
                instance.hooks.onAfterRun = null;
                instance.hooks.onBeforeDestroy = null;
                instance.hooks.onAfterDestroy = null;
                instance.hooks.onBeforePropertyAccess = null;
                instance.hooks.onAfterPropertyAccess = null;
                instance.hooks.onBeforeSync = null;
                instance.hooks.onAfterSync = null;
                instance.hooks.onBeforeNativeAccess = null;
                instance.hooks.onAfterNativeAccess = null;
                
                // 清理原生对象引用
                instance.nativeObject = null;
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterDestroy, instance);
                
                if (instance.logger && instance.logger.info) {
                    instance.logger.info("[BasePCBWrapper][index.js][destroy] Module destroyed successfully: " + instance.options.moduleName);
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][destroy] Destruction failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][destroy] Destruction error: " + error.message);
            }
            
            throw error;
        }
    }
    
    // 属性访问方法（双向绑定）
    function getProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][getProperty] Module not initialized");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforePropertyAccess, instance, { propertyName: propertyName, operation: "get" });
            
            var value;
            
            if (instance.options.enableCache && instance.cachedProperties.hasOwnProperty(propertyName)) {
                // 从缓存获取
                value = instance.cachedProperties[propertyName];
                instance.state.cacheHits++;
                
                if (instance.logger && instance.logger.debug) {
                    instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Cache hit for property: " + propertyName);
                }
            } else {
                // 从原生对象获取（如果不是Mock）
                if (!instance.isMock && instance.nativeObject && instance.nativeObject[propertyName] !== undefined) {
                    value = instance.nativeObject[propertyName];
                    
                    // 缓存属性值
                    if (instance.options.enableCache) {
                        instance.cachedProperties[propertyName] = value;
                    }
                    
                    instance.state.cacheMisses++;
                    
                    if (instance.logger && instance.logger.debug) {
                        instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Cache miss, fetched from native object: " + propertyName);
                    }
                } else if (instance.isMock && instance.mockData && instance.mockData[propertyName] !== undefined) {
                    // 从Mock数据获取
                    value = instance.mockData[propertyName];
                    
                    // 缓存属性值
                    if (instance.options.enableCache) {
                        instance.cachedProperties[propertyName] = value;
                    }
                    
                    instance.state.cacheMisses++;
                    
                    if (instance.logger && instance.logger.debug) {
                        instance.logger.debug("[BasePCBWrapper][index.js][getProperty] Mock data for property: " + propertyName);
                    }
                } else {
                    // 属性不存在
                    value = undefined;
                }
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterPropertyAccess, instance, { propertyName: propertyName, operation: "get", value: value });
            
            return value;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][getProperty] Error getting property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function setProperty(instance, propertyName, value) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][setProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][setProperty] Module not initialized");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforePropertyAccess, instance, { propertyName: propertyName, operation: "set", value: value });
            
            // 设置缓存值
            if (instance.options.enableCache) {
                instance.cachedProperties[propertyName] = value;
            }
            
            // 根据同步模式处理
            if (instance.options.syncMode === "realtime" && !instance.isMock && instance.nativeObject) {
                // 实时同步：直接设置到原生对象
                instance.nativeObject[propertyName] = value;
            } else {
                // 标记为需要同步
                instance.isDirty = true;
            }
            
            // 如果是Mock对象，同时更新Mock数据
            if (instance.isMock) {
                if (!instance.mockData) {
                    instance.mockData = {};
                }
                instance.mockData[propertyName] = value;
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterPropertyAccess, instance, { propertyName: propertyName, operation: "set", value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][setProperty] Property set: " + propertyName + " = " + JSON.stringify(value) + 
                                    ", SyncMode: " + instance.options.syncMode);
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][setProperty] Error setting property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    // 直接访问原生对象方法
    function getNativeProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][getNativeProperty] Native object not available");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { propertyName: propertyName, operation: "get" });
            
            var value = instance.nativeObject[propertyName];
            instance.state.nativeAccessCount++;
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { propertyName: propertyName, operation: "get", value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][getNativeProperty] Direct native access: " + propertyName);
            }
            
            return value;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][getNativeProperty] Error accessing native property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function setNativeProperty(instance, propertyName, value) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][setNativeProperty] Native object not available");
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { propertyName: propertyName, operation: "set", value: value });
            
            instance.nativeObject[propertyName] = value;
            instance.state.nativeAccessCount++;
            
            // 更新缓存
            if (instance.options.enableCache) {
                instance.cachedProperties[propertyName] = value;
            }
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { propertyName: propertyName, operation: "set", value: value });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][setNativeProperty] Direct native modification: " + propertyName + " = " + JSON.stringify(value));
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][setNativeProperty] Error setting native property '" + propertyName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function callNativeMethod(instance, methodName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Instance is required");
        }
        
        if (!instance.options.enableDirectAccess) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Direct access is disabled");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Native object not available");
        }
        
        if (!instance.nativeObject[methodName] || typeof instance.nativeObject[methodName] !== "function") {
            throw new Error("[BasePCBWrapper][index.js][callNativeMethod] Method '" + methodName + "' not found or not a function");
        }
        
        try {
            // 执行Before Hook
            var args = Array.prototype.slice.call(arguments, 2);
            _executeHook(instance.hooks.onBeforeNativeAccess, instance, { methodName: methodName, operation: "call", args: args });
            
            var result = instance.nativeObject[methodName].apply(instance.nativeObject, args);
            instance.state.nativeAccessCount++;
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterNativeAccess, instance, { methodName: methodName, operation: "call", result: result });
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][callNativeMethod] Direct native method call: " + methodName + "(" + JSON.stringify(args) + ")");
            }
            
            return result;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][callNativeMethod] Error calling native method '" + methodName + "': " + error.message);
            }
            
            throw error;
        }
    }
    
    function hasProperty(instance, propertyName) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][hasProperty] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][hasProperty] Module not initialized");
        }
        
        // 检查缓存
        if (instance.options.enableCache && instance.cachedProperties.hasOwnProperty(propertyName)) {
            return true;
        }
        
        // 检查原生对象
        if (!instance.isMock && instance.nativeObject && instance.nativeObject[propertyName] !== undefined) {
            return true;
        }
        
        // 检查Mock数据
        if (instance.isMock && instance.mockData && instance.mockData[propertyName] !== undefined) {
            return true;
        }
        
        return false;
    }
    
    function getAllProperties(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getAllProperties] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][getAllProperties] Module not initialized");
        }
        
        return instance.cachedProperties;
    }
    
    // 缓存管理方法
    function clearCache(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][clearCache] Instance is required");
        }
        
        instance.cachedProperties = {};
        instance.state.cacheHits = 0;
        instance.state.cacheMisses = 0;
        
        if (instance.logger && instance.logger.info) {
            instance.logger.info("[BasePCBWrapper][index.js][clearCache] Cache cleared");
        }
        
        return true;
    }
    
    function getCacheStats(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][getCacheStats] Instance is required");
        }
        
        var total = instance.state.cacheHits + instance.state.cacheMisses;
        var hitRate = total > 0 ? (instance.state.cacheHits / total * 100).toFixed(2) : 0;
        
        return {
            hits: instance.state.cacheHits,
            misses: instance.state.cacheMisses,
            total: total,
            hitRate: parseFloat(hitRate),
            cacheSize: Object.keys(instance.cachedProperties).length
        };
    }
    
    // 同步方法
    function syncToNative(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][syncToNative] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][syncToNative] Module not initialized");
        }
        
        if (instance.isMock || !instance.nativeObject || !instance.isDirty) {
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeSync, instance);
            
            // 执行具体同步逻辑
            var syncResult = instance._syncPropertiesToNative();
            
            if (syncResult) {
                instance.isDirty = false;
                instance.state.syncCount++;
                instance.context.lastSyncTime = new Date();
                
                // 执行After Hook
                _executeHook(instance.hooks.onAfterSync, instance);
                
                if (instance.logger && instance.logger.debug) {
                    instance.logger.debug("[BasePCBWrapper][index.js][syncToNative] Properties synchronized to native object");
                }
                
                return true;
            } else {
                throw new Error("[BasePCBWrapper][index.js][syncToNative] Synchronization failed");
            }
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][syncToNative] Synchronization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function syncFromNative(instance) {
        if (!instance) {
            throw new Error("[BasePCBWrapper][index.js][syncFromNative] Instance is required");
        }
        
        if (!instance.state.initialized) {
            throw new Error("[BasePCBWrapper][index.js][syncFromNative] Module not initialized");
        }
        
        if (instance.isMock || !instance.nativeObject) {
            return true;
        }
        
        try {
            // 执行Before Hook
            _executeHook(instance.hooks.onBeforeSync, instance);
            
            // 重新提取属性
            instance._extractSpecificProperties();
            
            // 执行After Hook
            _executeHook(instance.hooks.onAfterSync, instance);
            
            if (instance.logger && instance.logger.debug) {
                instance.logger.debug("[BasePCBWrapper][index.js][syncFromNative] Properties synchronized from native object");
            }
            
            return true;
            
        } catch (error) {
            instance.state.errorCount++;
            instance.state.lastError = error;
            
            if (instance.logger && instance.logger.error) {
                instance.logger.error("[BasePCBWrapper][index.js][syncFromNative] Synchronization error: " + error.message);
            }
            
            throw error;
        }
    }
    
    function isSyncNeeded(instance) {
        if (!instance) {
            return false;
        }
        
        return !instance.isMock && instance.nativeObject && instance.isDirty;
    }
    
    // 对象标识方法
    function getObjectId(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.getProperty("ObjectId");
    }
    
    function getObjectType(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.objectType;
    }
    
    function isMockObject(instance) {
        if (!instance) {
            return false;
        }
        
        return instance.isMock;
    }
    
    function getNativeObject(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.nativeObject;
    }
    
    // Mock数据访问方法
    function getMockData(instance) {
        if (!instance) {
            return null;
        }
        
        return instance.mockData || {};
    }
    
    function isMockMode(instance) {
        if (!instance) {
            return false;
        }
        
        return instance.isMock;
    }
    
    // 调试方法
    function getDebugInfo(instance) {
        if (!instance) {
            return null;
        }
        
        return {
            moduleName: instance.options.moduleName,
            objectType: instance.objectType,
            isMock: instance.isMock,
            isInitialized: instance.state.initialized,
            isRunning: instance.state.running,
            isDestroyed: instance.state.destroyed,
            isDirty: instance.isDirty,
            errorCount: instance.state.errorCount,
            lastError: instance.state.lastError ? instance.state.lastError.message : null,
            cacheStats: getCacheStats(instance),
            syncCount: instance.state.syncCount,
            nativeAccessCount: instance.state.nativeAccessCount,
            creationTime: instance.context.creationTime,
            lastSyncTime: instance.context.lastSyncTime,
            executionTime: instance.context.executionTime,
            syncMode: instance.options.syncMode,
            enableDirectAccess: instance.options.enableDirectAccess
        };
    }
    
    function validateState(instance) {
        if (!instance) {
            return { valid: false, errors: ["Instance is null"] };
        }
        
        var errors = [];
        
        if (!instance.state.initialized) {
            errors.push("Module not initialized");
        }
        
        if (instance.state.destroyed) {
            errors.push("Module is destroyed");
        }
        
        if (!instance.isMock && !instance.nativeObject) {
            errors.push("Native object is required for non-mock objects");
        }
        
        if (instance.state.errorCount > 10) {
            errors.push("Too many errors: " + instance.state.errorCount);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
    
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

// AD环境兼容性导出
if (typeof window !== "undefined") {
    window.BasePCBWrapper = BasePCBWrapper;
}
