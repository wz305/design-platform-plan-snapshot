/**
 * ObjectCreatorModule - PCB对象创建模块主入口
 * 
 * 提供统一的PCB对象创建接口，支持在指定位置创建各种PCB对象
 * ES3/JScript 5.8 兼容
 * 
 * IIFE模块架构说明
 * 
 * 1. 本模块使用IIFE模式封装对象：var ModuleName = (function(){...})();
 * 2. 构建后所有模块变量在同一作用域，可直接引用
 * 3. 不处理模块间依赖，需构建到一个文件中使用
 * 4. 通过window导出，确保AD环境可访问
 * 5. 依赖的模块必须在当前模块之前加载（通过merge-order.json控制）
 */

var ObjectCreatorModule = (function() {
    
    // -------------------------------------------------------------
    // 1. 依赖引用（构建后自动可访问）
    // -------------------------------------------------------------
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BaseModule, ObjectCreator, PositionManager
    
    // 简化的日志系统（用于测试）
    var SimpleLogger = {
        debug: function(msg) { 
            if (typeof console !== "undefined" && console.log) {
                console.log("[DEBUG] " + msg); 
            }
        },
        info: function(msg) { 
            if (typeof console !== "undefined" && console.log) {
                console.log("[INFO] " + msg); 
            }
        },
        warn: function(msg) { 
            if (typeof console !== "undefined" && console.log) {
                console.log("[WARN] " + msg); 
            }
        },
        error: function(msg) { 
            if (typeof console !== "undefined" && console.log) {
                console.log("[ERROR] " + msg); 
            }
        }
    };
    
    var logger = SimpleLogger;
    
    // -------------------------------------------------------------
    // 2. 私有变量
    // -------------------------------------------------------------
    
    var _instances = {};           // 存储模块实例
    var _defaultInstance = null;    // 默认模块实例
    var _moduleConfig = {           // 模块配置
        enableLogging: true,
        enableValidation: true,
        enablePositionManagement: true,
        autoRegisterPositions: true,
        conflictDetection: true
    };
    
    // -------------------------------------------------------------
    // 3. 私有函数
    // -------------------------------------------------------------
    
    /**
     * 创建默认模块实例
     * @returns {Object} 模块实例
     */
    function _createDefaultInstance() {
        if (!_defaultInstance) {
            var options = {
                moduleName: "ObjectCreator",
                autoInit: true,
                enableLogging: _moduleConfig.enableLogging,
                enableValidation: _moduleConfig.enableValidation,
                enablePositionManagement: _moduleConfig.enablePositionManagement,
                autoRegisterPositions: _moduleConfig.autoRegisterPositions,
                conflictDetection: _moduleConfig.conflictDetection
            };
            
            _defaultInstance = BaseModule.create(options);
            
            // 初始化实例
            if (_defaultInstance && typeof _defaultInstance.init === "function") {
                _defaultInstance.init();
            }
        }
        
        return _defaultInstance;
    }
    
    /**
     * 生成唯一对象ID
     * @param {string} objectType 对象类型
     * @returns {string} 唯一ID
     */
    function _generateObjectId(objectType) {
        var timestamp = new Date().getTime();
        var random = Math.floor(Math.random() * 10000);
        return objectType + "_" + timestamp + "_" + random;
    }
    
    /**
     * 验证创建选项
     * @param {Object} options 创建选项
     * @returns {Object} 验证结果
     */
    function _validateCreateOptions(options) {
        var result = {
            valid: true,
            errors: []
        };
        
        try {
            if (!options || typeof options !== "object") {
                result.valid = false;
                result.errors.push("Invalid options: must be an object");
                return result;
            }
            
            if (!options.type || typeof options.type !== "string") {
                result.valid = false;
                result.errors.push("Invalid object type: must be a string");
            }
            
            if (!ObjectCreator.isSupportedType(options.type)) {
                result.valid = false;
                result.errors.push("Unsupported object type: " + options.type);
            }
            
            if (!options.position || typeof options.position !== "object") {
                result.valid = false;
                result.errors.push("Invalid position: must be an object");
            } else {
                var positionValidation = PositionManager.validatePosition(options.position);
                if (!positionValidation.valid) {
                    result.valid = false;
                    result.errors = result.errors.concat(positionValidation.errors);
                }
            }
            
        } catch (e) {
            result.valid = false;
            result.errors.push("Validation error: " + e.message);
        }
        
        return result;
    }
    
    /**
     * 注册对象位置
     * @param {Object} object 创建的对象
     * @param {Object} options 创建选项
     */
    function _registerObjectPosition(object, options) {
        try {
            if (_moduleConfig.autoRegisterPositions && object && options.position) {
                var objectId = _generateObjectId(options.type);
                
                PositionManager.registerPosition(options.position, {
                    id: objectId,
                    type: options.type,
                    object: object
                });
                
                // 将ID添加到对象中
                if (object && typeof object === "object") {
                    object._objectId = objectId;
                }
            }
        } catch (e) {
            logger.warn("[ObjectCreatorModule][_registerObjectPosition] Failed to register position: " + e.message);
        }
    }
    
    // -------------------------------------------------------------
    // 4. 公共API - 模块生命周期
    // -------------------------------------------------------------
    
    /**
     * 创建模块实例
     * @param {Object} options 配置选项
     * @returns {Object} 模块实例
     */
    function create(options) {
        logger.debug("[ObjectCreatorModule][create] START - params: " + JSON.stringify(options));
        
        try {
            options = options || {};
            
            // 合并默认配置
            var config = {};
            for (var key in _moduleConfig) {
                if (_moduleConfig.hasOwnProperty(key)) {
                    config[key] = _moduleConfig[key];
                }
            }
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    config[key] = options[key];
                }
            }
            
            // 创建BaseModule实例
            var instance = BaseModule.create({
                moduleName: options.moduleName || "ObjectCreator",
                autoInit: options.autoInit !== false,
                enableLogging: config.enableLogging,
                enableValidation: config.enableValidation
            });
            
            logger.debug("[ObjectCreatorModule][create] SUCCESS - instance created");
            return instance;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][create] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 初始化模块实例
     * @param {Object} instance 模块实例
     * @returns {boolean} 是否成功
     */
    function init(instance) {
        logger.debug("[ObjectCreatorModule][init] START");
        
        try {
            if (!instance) {
                return false;
            }
            
            if (typeof instance.init === "function") {
                var result = instance.init();
                
                // 初始化位置管理器
                if (_moduleConfig.enablePositionManagement) {
                    PositionManager.configureCoordinateSystem({
                        unit: "mil",
                        gridSize: 5,
                        enableGridSnap: true,
                        conflictThreshold: 10
                    });
                }
                
                logger.debug("[ObjectCreatorModule][init] SUCCESS - instance initialized");
                return result;
            }
            
            return false;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][init] ERROR - " + error.message);
            return false;
        }
    }
    
    /**
     * 运行模块实例
     * @param {Object} instance 模块实例
     * @param {*} data 运行数据
     * @returns {Object} 运行结果
     */
    function run(instance, data) {
        logger.debug("[ObjectCreatorModule][run] START - params: " + JSON.stringify({
            hasInstance: !!instance,
            data: data
        }));
        
        try {
            if (!instance) {
                return {success: false, message: "实例无效"};
            }
            
            if (typeof instance.run === "function") {
                var result = instance.run(data);
                logger.debug("[ObjectCreatorModule][run] SUCCESS - instance run completed");
                return result;
            }
            
            return {success: false, message: "run方法不存在"};
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][run] ERROR - " + error.message);
            return {success: false, message: "运行异常: " + error.message};
        }
    }
    
    /**
     * 销毁模块实例
     * @param {Object} instance 模块实例
     * @returns {boolean} 是否成功
     */
    function destroy(instance) {
        logger.debug("[ObjectCreatorModule][destroy] START");
        
        try {
            if (!instance) {
                return false;
            }
            
            if (typeof instance.destroy === "function") {
                var result = instance.destroy();
                
                // 清理位置缓存
                if (_moduleConfig.enablePositionManagement) {
                    PositionManager.clearPositionCache();
                }
                
                logger.debug("[ObjectCreatorModule][destroy] SUCCESS - instance destroyed");
                return result;
            }
            
            return false;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][destroy] ERROR - " + error.message);
            return false;
        }
    }
    
    // -------------------------------------------------------------
    // 5. 公共API - 对象创建
    // -------------------------------------------------------------
    
    /**
     * 创建PCB对象
     * @param {Object} options 创建选项
     * @returns {Object} 创建的对象
     */
    function createObject(options) {
        logger.debug("[ObjectCreatorModule][createObject] START - params: " + JSON.stringify(options));
        
        try {
            // 验证选项
            if (_moduleConfig.enableValidation) {
                var validation = _validateCreateOptions(options);
                if (!validation.valid) {
                    throw new Error("Validation failed: " + validation.errors.join(", "));
                }
            }
            
            // 冲突检测
            if (_moduleConfig.conflictDetection && _moduleConfig.enablePositionManagement) {
                var conflictResult = PositionManager.checkPositionConflict(options.position);
                if (conflictResult.hasConflict) {
                    logger.warn("[ObjectCreatorModule][createObject] Position conflict detected: " + JSON.stringify(conflictResult.conflicts));
                    // 可以选择使用建议位置或抛出错误
                    // 这里我们记录警告但继续创建
                }
            }
            
            // 创建对象
            var object = ObjectCreator.createObject(options);
            
            // 注册位置
            _registerObjectPosition(object, options);
            
            logger.info("[ObjectCreatorModule][createObject] SUCCESS - object created: " + options.type);
            return object;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][createObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 在原点(0,0)创建对象
     * @param {string} objectType 对象类型
     * @param {Object} parameters 参数
     * @returns {Object} 创建的对象
     */
    function createAtOrigin(objectType, parameters) {
        logger.debug("[ObjectCreatorModule][createAtOrigin] START - params: " + JSON.stringify({
            objectType: objectType,
            parameters: parameters
        }));
        
        try {
            var options = {
                type: objectType,
                position: PositionManager.getOrigin(),
                parameters: parameters
            };
            
            var result = createObject(options);
            
            logger.info("[ObjectCreatorModule][createAtOrigin] SUCCESS - object created at origin: " + objectType);
            return result;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][createAtOrigin] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 批量创建对象
     * @param {Array} objectList 对象列表
     * @returns {Object} 创建结果
     */
    function createBatch(objectList) {
        logger.debug("[ObjectCreatorModule][createBatch] START - params: " + JSON.stringify({
            objectCount: objectList ? objectList.length : 0
        }));
        
        try {
            var result = ObjectCreator.createBatch(objectList);
            
            // 批量注册位置
            if (_moduleConfig.autoRegisterPositions && result.success) {
                for (var i = 0; i < result.success.length; i++) {
                    var object = result.success[i];
                    var options = objectList[i];
                    _registerObjectPosition(object, options);
                }
            }
            
            logger.info("[ObjectCreatorModule][createBatch] SUCCESS - batch creation completed");
            return result;
            
        } catch (error) {
            logger.error("[ObjectCreatorModule][createBatch] ERROR - " + error.message);
            throw error;
        }
    }
    
    // -------------------------------------------------------------
    // 6. 公共API - 查询和验证
    // -------------------------------------------------------------
    
    /**
     * 获取支持的对象类型
     * @returns {Array} 支持的类型数组
     */
    function getSupportedTypes() {
        return ObjectCreator.getSupportedTypes();
    }
    
    /**
     * 验证创建选项
     * @param {Object} options 创建选项
     * @returns {Object} 验证结果
     */
    function validateCreateOptions(options) {
        return _validateCreateOptions(options);
    }
    
    /**
     * 获取模块统计信息
     * @returns {Object} 统计信息
     */
    function getStatistics() {
        var stats = {
            moduleConfig: _moduleConfig,
            positionStats: null,
            supportedTypes: getSupportedTypes()
        };
        
        if (_moduleConfig.enablePositionManagement) {
            stats.positionStats = PositionManager.getPositionStatistics();
        }
        
        return stats;
    }
    
    // -------------------------------------------------------------
    // 7. 返回模块接口
    // -------------------------------------------------------------
    
    return {
        // 生命周期方法
        create: create,
        init: init,
        run: run,
        destroy: destroy,
        
        // 对象创建方法
        createObject: createObject,
        createAtOrigin: createAtOrigin,
        createBatch: createBatch,
        
        // 查询和验证方法
        getSupportedTypes: getSupportedTypes,
        validateCreateOptions: validateCreateOptions,
        getStatistics: getStatistics,
        
        // 直接访问核心组件
        ObjectCreator: ObjectCreator,
        PositionManager: PositionManager
    };
    
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.ObjectCreatorModule = ObjectCreatorModule;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ObjectCreatorModule;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.ObjectCreatorModule = ObjectCreatorModule;
    }
})();
