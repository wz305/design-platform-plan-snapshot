/**
 * PCBObjectWrapper - 通用PCB对象封装器
 * 
 * 提供统一的PCB对象封装接口，支持属性缓存和方法调用
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var PCBObjectWrapper = (function(){
    "use strict";
    
    // -------------------------------------------------------------
    // 私有变量
    // -------------------------------------------------------------
    
    var _wrapperConfig = {
        enablePropertyCache: true,
        enableMethodCache: false,
        enableAutoRefresh: false,
        cacheTimeout: 30000, // 30秒
        enableLogging: true
    };
    
    // -------------------------------------------------------------
    // 私有函数
    // -------------------------------------------------------------
    
    /**
     * 简化的日志系统
     */
    var _logger = {
        debug: function(msg) {
            if (_wrapperConfig.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[DEBUG] " + msg);
            }
        },
        info: function(msg) {
            if (_wrapperConfig.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[INFO] " + msg);
            }
        },
        warn: function(msg) {
            if (_wrapperConfig.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[WARN] " + msg);
            }
        },
        error: function(msg) {
            if (_wrapperConfig.enableLogging && typeof console !== "undefined" && console.log) {
                console.log("[ERROR] " + msg);
            }
        }
    };
    
    /**
     * 提取对象属性
     * @param {Object} nativeObject 原生对象
     * @returns {Object} 属性对象
     */
    function _extractProperties(nativeObject) {
        var properties = {};
        
        if (!nativeObject) {
            return properties;
        }
        
        try {
            // 基础属性
            if (typeof nativeObject.GetObjectId === "function") {
                properties.ObjectId = nativeObject.GetObjectId();
            }
            
            if (typeof nativeObject.GetState_String === "function") {
                properties.State = nativeObject.GetState_String();
            }
            
            // 通用属性提取
            var commonProperties = [
                "X", "Y", "X1", "Y1", "X2", "Y2", "Radius", "Width", "Layer",
                "TopX", "TopY", "MidX", "MidY", "BottomX", "BottomY",
                "HoleSize", "Diameter", "StartAngle", "EndAngle",
                "Text", "FontSize", "FontName", "Designator", "PadShape"
            ];
            
            for (var i = 0; i < commonProperties.length; i++) {
                var propName = commonProperties[i];
                if (typeof nativeObject[propName] !== "undefined") {
                    properties[propName] = nativeObject[propName];
                }
            }
            
        } catch (error) {
            _logger.error("PCBObjectWrapper._extractProperties: " + error.message);
        }
        
        return properties;
    }
    
    /**
     * 检查缓存是否过期
     * @param {Object} cache 缓存对象
     * @returns {boolean} 是否过期
     */
    function _isCacheExpired(cache) {
        if (!cache || !cache.timestamp) {
            return true;
        }
        
        var now = new Date().getTime();
        return (now - cache.timestamp) > _wrapperConfig.cacheTimeout;
    }
    
    /**
     * 刷新属性缓存
     * @param {Object} wrapper 封装器实例
     */
    function _refreshPropertyCache(wrapper) {
        if (!wrapper._objectData || !wrapper._objectData.nativeObject) {
            return;
        }
        
        try {
            var newProperties = _extractProperties(wrapper._objectData.nativeObject);
            wrapper._objectData.properties = newProperties;
            wrapper._propertyCache.timestamp = new Date().getTime();
            
            _logger.debug("PCBObjectWrapper._refreshPropertyCache: Properties refreshed for " + wrapper._objectData.objectType);
            
        } catch (error) {
            _logger.error("PCBObjectWrapper._refreshPropertyCache: " + error.message);
        }
    }
    
    /**
     * 创建方法代理
     * @param {Object} nativeObject 原生对象
     * @param {string} methodName 方法名
     * @returns {Function} 代理函数
     */
    function _createMethodProxy(nativeObject, methodName) {
        return function() {
            if (!nativeObject || typeof nativeObject[methodName] !== "function") {
                throw new Error("Method '" + methodName + "' not found on native object");
            }
            
            try {
                var args = Array.prototype.slice.call(arguments);
                return nativeObject[methodName].apply(nativeObject, args);
            } catch (error) {
                _logger.error("PCBObjectWrapper._createMethodProxy: Error calling " + methodName + " - " + error.message);
                throw error;
            }
        };
    }
    
    // -------------------------------------------------------------
    // PCBObjectWrapper构造函数
    // -------------------------------------------------------------
    
    /**
     * PCBObjectWrapper构造函数
     * @param {Object} objectData 对象数据
     */
    function PCBObjectWrapper(objectData) {
        if (!objectData) {
            throw new Error("PCBObjectWrapper: objectData is required");
        }
        
        // 初始化对象数据
        this._objectData = {
            objectId: objectData.objectId || "",
            objectType: objectData.objectType || "Unknown",
            nativeObject: objectData.nativeObject || null,
            isMock: objectData.isMock || false,
            mockData: objectData.mockData || null,
            createdAt: objectData.createdAt || new Date().getTime(),
            properties: {},
            methods: {}
        };
        
        // 初始化缓存
        this._propertyCache = {
            timestamp: 0,
            data: {}
        };
        
        this._methodCache = {};
        
        // 提取初始属性
        if (this._objectData.nativeObject) {
            this._objectData.properties = _extractProperties(this._objectData.nativeObject);
            this._propertyCache.timestamp = new Date().getTime();
        } else if (this._objectData.mockData) {
            this._objectData.properties = this._objectData.mockData;
            this._propertyCache.timestamp = new Date().getTime();
        }
        
        _logger.debug("PCBObjectWrapper.constructor: Created wrapper for " + this._objectData.objectType);
    }
    
    // -------------------------------------------------------------
    // PCBObjectWrapper原型方法
    // -------------------------------------------------------------
    
    /**
     * 获取对象ID
     * @returns {string} 对象ID
     */
    PCBObjectWrapper.prototype.getObjectId = function() {
        return this._objectData.objectId;
    };
    
    /**
     * 获取对象类型
     * @returns {string} 对象类型
     */
    PCBObjectWrapper.prototype.getObjectType = function() {
        return this._objectData.objectType;
    };
    
    /**
     * 检查是否为Mock对象
     * @returns {boolean} 是否为Mock对象
     */
    PCBObjectWrapper.prototype.isMock = function() {
        return this._objectData.isMock;
    };
    
    /**
     * 获取原生对象
     * @returns {Object} 原生对象
     */
    PCBObjectWrapper.prototype.getNativeObject = function() {
        return this._objectData.nativeObject;
    };
    
    /**
     * 获取对象数据
     * @returns {Object} 对象数据
     */
    PCBObjectWrapper.prototype.getObjectData = function() {
        return this._objectData;
    };
    
    /**
     * 获取属性值
     * @param {string} propertyName 属性名
     * @returns {*} 属性值
     */
    PCBObjectWrapper.prototype.getProperty = function(propertyName) {
        if (!propertyName) {
            return null;
        }
        
        // 检查缓存是否需要刷新
        if (_wrapperConfig.enablePropertyCache && 
            (_wrapperConfig.enableAutoRefresh || _isCacheExpired(this._propertyCache))) {
            _refreshPropertyCache(this);
        }
        
        return this._objectData.properties[propertyName] || null;
    };
    
    /**
     * 设置属性值
     * @param {string} propertyName 属性名
     * @param {*} value 属性值
     * @returns {boolean} 是否成功
     */
    PCBObjectWrapper.prototype.setProperty = function(propertyName, value) {
        if (!propertyName) {
            return false;
        }
        
        try {
            // 设置到原生对象
            if (this._objectData.nativeObject && 
                typeof this._objectData.nativeObject[propertyName] !== "undefined") {
                this._objectData.nativeObject[propertyName] = value;
            }
            
            // 更新缓存
            this._objectData.properties[propertyName] = value;
            this._propertyCache.timestamp = new Date().getTime();
            
            _logger.debug("PCBObjectWrapper.setProperty: Set " + propertyName + " = " + value);
            return true;
            
        } catch (error) {
            _logger.error("PCBObjectWrapper.setProperty: " + error.message);
            return false;
        }
    };
    
    /**
     * 获取所有属性
     * @returns {Object} 属性对象
     */
    PCBObjectWrapper.prototype.getAllProperties = function() {
        // 检查缓存是否需要刷新
        if (_wrapperConfig.enablePropertyCache && 
            (_wrapperConfig.enableAutoRefresh || _isCacheExpired(this._propertyCache))) {
            _refreshPropertyCache(this);
        }
        
        var result = {};
        for (var key in this._objectData.properties) {
            if (this._objectData.properties.hasOwnProperty(key)) {
                result[key] = this._objectData.properties[key];
            }
        }
        return result;
    };
    
    /**
     * 调用原生对象方法
     * @param {string} methodName 方法名
     * @param {...*} args 参数
     * @returns {*} 方法返回值
     */
    PCBObjectWrapper.prototype.callMethod = function(methodName) {
        if (!methodName) {
            throw new Error("PCBObjectWrapper.callMethod: methodName is required");
        }
        
        var nativeObject = this._objectData.nativeObject;
        if (!nativeObject) {
            throw new Error("PCBObjectWrapper.callMethod: No native object available");
        }
        
        if (typeof nativeObject[methodName] !== "function") {
            throw new Error("PCBObjectWrapper.callMethod: Method '" + methodName + "' not found");
        }
        
        try {
            var args = Array.prototype.slice.call(arguments, 1);
            var result = nativeObject[methodName].apply(nativeObject, args);
            
            _logger.debug("PCBObjectWrapper.callMethod: Called " + methodName + " with " + args.length + " arguments");
            return result;
            
        } catch (error) {
            _logger.error("PCBObjectWrapper.callMethod: Error calling " + methodName + " - " + error.message);
            throw error;
        }
    };
    
    /**
     * 获取方法代理
     * @param {string} methodName 方法名
     * @returns {Function} 方法代理
     */
    PCBObjectWrapper.prototype.getMethod = function(methodName) {
        if (!methodName) {
            return null;
        }
        
        // 检查方法缓存
        if (_wrapperConfig.enableMethodCache && this._methodCache[methodName]) {
            return this._methodCache[methodName];
        }
        
        var nativeObject = this._objectData.nativeObject;
        if (!nativeObject || typeof nativeObject[methodName] !== "function") {
            return null;
        }
        
        // 创建方法代理
        var proxy = _createMethodProxy(nativeObject, methodName);
        
        // 缓存方法代理
        if (_wrapperConfig.enableMethodCache) {
            this._methodCache[methodName] = proxy;
        }
        
        return proxy;
    };
    
    /**
     * 刷新缓存
     */
    PCBObjectWrapper.prototype.refreshCache = function() {
        _refreshPropertyCache(this);
        
        // 清理方法缓存
        if (_wrapperConfig.enableMethodCache) {
            this._methodCache = {};
        }
        
        _logger.debug("PCBObjectWrapper.refreshCache: Cache refreshed");
    };
    
    /**
     * 获取位置信息
     * @returns {Object} 位置对象 {x, y, layer}
     */
    PCBObjectWrapper.prototype.getPosition = function() {
        var x = 0, y = 0, layer = "";
        
        if (this._objectData.objectType === "Track") {
            x = (this.getProperty("X1") + this.getProperty("X2")) / 2;
            y = (this.getProperty("Y1") + this.getProperty("Y2")) / 2;
        } else if (this._objectData.objectType === "Arc") {
            x = this.getProperty("X1");
            y = this.getProperty("Y1");
        } else {
            x = this.getProperty("X") || 0;
            y = this.getProperty("Y") || 0;
        }
        
        layer = this.getProperty("Layer") || "";
        
        return {
            x: x,
            y: y,
            layer: layer
        };
    };
    
    /**
     * 设置位置信息
     * @param {Object} position 位置对象 {x, y, layer}
     * @returns {boolean} 是否成功
     */
    PCBObjectWrapper.prototype.setPosition = function(position) {
        if (!position) {
            return false;
        }
        
        var success = true;
        
        try {
            if (this._objectData.objectType === "Track") {
                var dx = position.x - ((this.getProperty("X1") + this.getProperty("X2")) / 2);
                var dy = position.y - ((this.getProperty("Y1") + this.getProperty("Y2")) / 2);
                
                success = this.setProperty("X1", this.getProperty("X1") + dx) && success;
                success = this.setProperty("Y1", this.getProperty("Y1") + dy) && success;
                success = this.setProperty("X2", this.getProperty("X2") + dx) && success;
                success = this.setProperty("Y2", this.getProperty("Y2") + dy) && success;
            } else {
                success = this.setProperty("X", position.x) && success;
                success = this.setProperty("Y", position.y) && success;
            }
            
            if (position.layer) {
                success = this.setProperty("Layer", position.layer) && success;
            }
            
        } catch (error) {
            _logger.error("PCBObjectWrapper.setPosition: " + error.message);
            success = false;
        }
        
        return success;
    };
    
    /**
     * 获取对象边界框
     * @returns {Object} 边界框 {left, top, right, bottom}
     */
    PCBObjectWrapper.prototype.getBoundingBox = function() {
        var left = 0, top = 0, right = 0, bottom = 0;
        
        switch (this._objectData.objectType) {
            case "Track":
                left = Math.min(this.getProperty("X1"), this.getProperty("X2"));
                top = Math.min(this.getProperty("Y1"), this.getProperty("Y2"));
                right = Math.max(this.getProperty("X1"), this.getProperty("X2"));
                bottom = Math.max(this.getProperty("Y1"), this.getProperty("Y2"));
                break;
                
            case "Arc":
                var centerX = this.getProperty("X1");
                var centerY = this.getProperty("Y1");
                var radius = this.getProperty("Radius");
                left = centerX - radius;
                top = centerY - radius;
                right = centerX + radius;
                bottom = centerY + radius;
                break;
                
            case "Pad":
            case "Via":
                var x = this.getProperty("X");
                var y = this.getProperty("Y");
                var size = Math.max(
                    this.getProperty("TopX") || this.getProperty("Diameter") || 0,
                    this.getProperty("TopY") || this.getProperty("Diameter") || 0
                );
                left = x - size / 2;
                top = y - size / 2;
                right = x + size / 2;
                bottom = y + size / 2;
                break;
                
            default:
                var x = this.getProperty("X") || 0;
                var y = this.getProperty("Y") || 0;
                left = right = x;
                top = bottom = y;
                break;
        }
        
        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom
        };
    };
    
    /**
     * 获取封装器统计信息
     * @returns {Object} 统计信息
     */
    PCBObjectWrapper.prototype.getStatistics = function() {
        return {
            objectId: this._objectData.objectId,
            objectType: this._objectData.objectType,
            isMock: this._objectData.isMock,
            createdAt: this._objectData.createdAt,
            propertyCount: Object.keys(this._objectData.properties).length,
            methodCacheSize: _wrapperConfig.enableMethodCache ? Object.keys(this._methodCache).length : 0,
            cacheTimestamp: this._propertyCache.timestamp,
            cacheExpired: _isCacheExpired(this._propertyCache)
        };
    };
    
    // -------------------------------------------------------------
    // 静态方法
    // -------------------------------------------------------------
    
    /**
     * 配置封装器
     * @param {Object} config 配置选项
     */
    PCBObjectWrapper.configure = function(config) {
        if (!config) {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _wrapperConfig.hasOwnProperty(key)) {
                _wrapperConfig[key] = config[key];
            }
        }
    };
    
    /**
     * 获取配置
     * @returns {Object} 当前配置
     */
    PCBObjectWrapper.getConfiguration = function() {
        var result = {};
        for (var key in _wrapperConfig) {
            if (_wrapperConfig.hasOwnProperty(key)) {
                result[key] = _wrapperConfig[key];
            }
        }
        return result;
    };
    
    // -------------------------------------------------------------
    // 导出
    // -------------------------------------------------------------
    
    return PCBObjectWrapper;
    
})();
