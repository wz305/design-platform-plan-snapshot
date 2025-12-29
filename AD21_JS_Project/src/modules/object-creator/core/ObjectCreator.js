/**
 * ObjectCreator - PCB对象创建器核心
 * 
 * 提供统一的PCB对象创建接口，支持多种对象类型和精确位置控制
 * ES3/JScript 5.8 兼容
 */

var ObjectCreator = (function() {
    
    // -------------------------------------------------------------
    // 1. 依赖引用（构建后自动可访问）
    // -------------------------------------------------------------
    // 注意：在ES3环境中，这些依赖在构建后会自动成为全局变量
    // BaseModule, PCBInterfaces
    
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
    
    var _supportedTypes = {
        "Track": true,
        "Pad": true,
        "Via": true,
        "Arc": true
    };
    
    var _defaultParameters = {
        "Track": {
            width: 10,
            layer: "Top Layer",
            endX: 1000,
            endY: 0
        },
        "Pad": {
            size: 100,
            shape: "Rectangular",
            layer: "Top Layer",
            designator: "1"
        },
        "Via": {
            size: 50,
            holeSize: 25,
            startLayer: "Top Layer",
            endLayer: "Bottom Layer"
        },
        "Arc": {
            radius: 500,
            startAngle: 0,
            endAngle: 90,
            layer: "Top Layer"
        }
    };
    
    // -------------------------------------------------------------
    // 3. 私有函数
    // -------------------------------------------------------------
    
    /**
     * 验证对象类型
     * @param {string} objectType 对象类型
     * @returns {boolean} 是否有效
     */
    function _validateObjectType(objectType) {
        return _supportedTypes.hasOwnProperty(objectType);
    }
    
    /**
     * 获取默认参数
     * @param {string} objectType 对象类型
     * @returns {Object} 默认参数
     */
    function _getDefaultParameters(objectType) {
        var defaults = _defaultParameters[objectType];
        if (!defaults) {
            return {};
        }
        
        // 深拷贝默认参数
        var result = {};
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                result[key] = defaults[key];
            }
        }
        return result;
    }
    
    /**
     * 合并参数
     * @param {Object} defaults 默认参数
     * @param {Object} userParams 用户参数
     * @returns {Object} 合并后的参数
     */
    function _mergeParameters(defaults, userParams) {
        var result = {};
        
        // 复制默认参数
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                result[key] = defaults[key];
            }
        }
        
        // 覆盖用户参数
        if (userParams) {
            for (var key in userParams) {
                if (userParams.hasOwnProperty(key)) {
                    result[key] = userParams[key];
                }
            }
        }
        
        return result;
    }
    
    /**
     * 验证位置
     * @param {Object} position 位置对象
     * @returns {boolean} 是否有效
     */
    function _validatePosition(position) {
        if (!position || typeof position !== "object") {
            return false;
        }
        
        if (typeof position.x !== "number" || typeof position.y !== "number") {
            return false;
        }
        
        return true;
    }
    
    /**
     * 创建原生PCB对象
     * @param {string} objectType 对象类型
     * @param {Object} parameters 参数
     * @param {Object} position 位置
     * @returns {Object} 原生对象
     */
    function _createNativeObject(objectType, parameters, position) {
        logger.debug("[ObjectCreator][_createNativeObject] START - params: " + JSON.stringify({
            objectType: objectType,
            parameters: parameters,
            position: position
        }));
        
        try {
            // 这里应该调用AD的API创建原生对象
            // 由于我们在测试环境中，使用Mock对象
            var mockObject = PCBInterfaces.createMock(objectType, {
                X1: position.x,
                Y1: position.y,
                // 根据对象类型添加特定属性
                Width: parameters.width,
                Layer: parameters.layer,
                EndX: parameters.endX,
                EndY: parameters.endY
            });
            
            logger.debug("[ObjectCreator][_createNativeObject] SUCCESS - mock object created");
            return mockObject;
            
        } catch (error) {
            logger.error("[ObjectCreator][_createNativeObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 创建封装对象
     * @param {Object} nativeObject 原生对象
     * @param {string} objectType 对象类型
     * @returns {Object} 封装对象
     */
    function _createWrapperObject(nativeObject, objectType) {
        logger.debug("[ObjectCreator][_createWrapperObject] START - params: " + JSON.stringify({
            objectType: objectType,
            hasNativeObject: !!nativeObject
        }));
        
        try {
            var wrapper = PCBInterfaces.createWrapper(objectType, {
                nativeObject: nativeObject,
                enableMock: true
            });
            
            logger.debug("[ObjectCreator][_createWrapperObject] SUCCESS - wrapper created");
            return wrapper;
            
        } catch (error) {
            logger.error("[ObjectCreator][_createWrapperObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    // -------------------------------------------------------------
    // 4. 公共API - 对象创建
    // -------------------------------------------------------------
    
    /**
     * 创建PCB对象
     * @param {Object} options 创建选项
     * @param {string} options.type 对象类型
     * @param {Object} options.position 位置 {x, y}
     * @param {Object} options.parameters 参数
     * @returns {Object} 创建的对象
     */
    function createObject(options) {
        logger.debug("[ObjectCreator][createObject] START - params: " + JSON.stringify(options));
        
        try {
            // 验证输入参数
            if (!options || typeof options !== "object") {
                throw new Error("Invalid options: must be an object");
            }
            
            if (!options.type || typeof options.type !== "string") {
                throw new Error("Invalid object type: must be a string");
            }
            
            if (!_validateObjectType(options.type)) {
                throw new Error("Unsupported object type: " + options.type);
            }
            
            if (!_validatePosition(options.position)) {
                throw new Error("Invalid position: must be {x: number, y: number}");
            }
            
            // 获取默认参数并合并
            var defaults = _getDefaultParameters(options.type);
            var parameters = _mergeParameters(defaults, options.parameters);
            
            logger.debug("[ObjectCreator][createObject] CONTEXT - validated and merged parameters: " + JSON.stringify(parameters));
            
            // 创建原生对象
            var nativeObject = _createNativeObject(options.type, parameters, options.position);
            
            // 创建封装对象
            var wrapper = _createWrapperObject(nativeObject, options.type);
            
            logger.info("[ObjectCreator][createObject] SUCCESS - object created: " + options.type + " at (" + options.position.x + ", " + options.position.y + ")");
            return wrapper;
            
        } catch (error) {
            logger.error("[ObjectCreator][createObject] ERROR - " + error.message);
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
        logger.debug("[ObjectCreator][createAtOrigin] START - params: " + JSON.stringify({
            objectType: objectType,
            parameters: parameters
        }));
        
        try {
            var options = {
                type: objectType,
                position: {x: 0, y: 0},
                parameters: parameters
            };
            
            var result = createObject(options);
            
            logger.info("[ObjectCreator][createAtOrigin] SUCCESS - object created at origin: " + objectType);
            return result;
            
        } catch (error) {
            logger.error("[ObjectCreator][createAtOrigin] ERROR - " + error.message);
            throw error;
        }
    }
    
    /**
     * 批量创建对象
     * @param {Array} objectList 对象列表
     * @returns {Array} 创建的对象数组
     */
    function createBatch(objectList) {
        logger.debug("[ObjectCreator][createBatch] START - params: " + JSON.stringify({
            objectCount: objectList ? objectList.length : 0
        }));
        
        try {
            if (!objectList || !Array.isArray(objectList)) {
                throw new Error("Invalid object list: must be an array");
            }
            
            var results = [];
            var errors = [];
            
            for (var i = 0; i < objectList.length; i++) {
                try {
                    var obj = createObject(objectList[i]);
                    results.push(obj);
                } catch (e) {
                    errors.push({
                        index: i,
                        error: e.message,
                        object: objectList[i]
                    });
                }
            }
            
            logger.info("[ObjectCreator][createBatch] SUCCESS - created " + results.length + " objects, " + errors.length + " errors");
            
            return {
                success: results,
                errors: errors,
                totalCount: objectList.length,
                successCount: results.length,
                errorCount: errors.length
            };
            
        } catch (error) {
            logger.error("[ObjectCreator][createBatch] ERROR - " + error.message);
            throw error;
        }
    }
    
    // -------------------------------------------------------------
    // 5. 公共API - 验证和查询
    // -------------------------------------------------------------
    
    /**
     * 验证对象类型
     * @param {string} objectType 对象类型
     * @returns {boolean} 是否支持
     */
    function isSupportedType(objectType) {
        return _validateObjectType(objectType);
    }
    
    /**
     * 获取支持的对象类型
     * @returns {Array} 支持的类型数组
     */
    function getSupportedTypes() {
        var types = [];
        for (var type in _supportedTypes) {
            if (_supportedTypes.hasOwnProperty(type)) {
                types.push(type);
            }
        }
        return types;
    }
    
    /**
     * 获取对象类型的默认参数
     * @param {string} objectType 对象类型
     * @returns {Object} 默认参数
     */
    function getDefaultParameters(objectType) {
        if (!_validateObjectType(objectType)) {
            throw new Error("Unsupported object type: " + objectType);
        }
        return _getDefaultParameters(objectType);
    }
    
    /**
     * 验证创建参数
     * @param {Object} options 创建选项
     * @returns {Object} 验证结果
     */
    function validateCreateOptions(options) {
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
            
            if (!_validateObjectType(options.type)) {
                result.valid = false;
                result.errors.push("Unsupported object type: " + options.type);
            }
            
            if (!_validatePosition(options.position)) {
                result.valid = false;
                result.errors.push("Invalid position: must be {x: number, y: number}");
            }
            
        } catch (e) {
            result.valid = false;
            result.errors.push("Validation error: " + e.message);
        }
        
        return result;
    }
    
    // -------------------------------------------------------------
    // 6. 返回模块接口
    // -------------------------------------------------------------
    
    return {
        // 对象创建方法
        createObject: createObject,
        createAtOrigin: createAtOrigin,
        createBatch: createBatch,
        
        // 验证和查询方法
        isSupportedType: isSupportedType,
        getSupportedTypes: getSupportedTypes,
        getDefaultParameters: getDefaultParameters,
        validateCreateOptions: validateCreateOptions
    };
    
})();
