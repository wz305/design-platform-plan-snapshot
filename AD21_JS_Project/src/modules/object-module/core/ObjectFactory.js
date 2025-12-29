/**
 * ObjectFactory - 对象工厂核心模块
 * 
 * 提供统一的PCB对象创建接口，支持Mock模式和批量创建
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var ObjectFactory = (function(){
    "use strict";
    
    // -------------------------------------------------------------
    // 私有变量
    // -------------------------------------------------------------
    
    var _supportedTypes = {
        "Arc": true,
        "Pad": true,
        "Track": true,
        "Via": true,
        "Board": true,
        "Region": true,
        "Fill": true,
        "Text": true,
        "Dimension": true,
        "Coordinate": true
    };
    
    var _wrapperConstructors = {};
    var _statistics = {
        totalCreated: 0,
        byType: {},
        mockCreated: 0,
        batchOperations: 0
    };
    
    // -------------------------------------------------------------
    // 私有函数
    // -------------------------------------------------------------
    
    /**
     * 验证对象类型是否支持
     * @param {string} objectType 对象类型
     * @returns {boolean} 是否支持
     */
    function _isTypeSupported(objectType) {
        return _supportedTypes.hasOwnProperty(objectType);
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
     * 更新统计信息
     * @param {string} objectType 对象类型
     * @param {boolean} isMock 是否为Mock对象
     */
    function _updateStatistics(objectType, isMock) {
        _statistics.totalCreated++;
        
        if (!_statistics.byType[objectType]) {
            _statistics.byType[objectType] = 0;
        }
        _statistics.byType[objectType]++;
        
        if (isMock) {
            _statistics.mockCreated++;
        }
    }
    
    /**
     * 创建基础对象数据
     * @param {string} objectType 对象类型
     * @param {Object} nativeObject 原生对象
     * @param {Object} options 选项
     * @returns {Object} 基础对象数据
     */
    function _createBaseObjectData(objectType, nativeObject, options) {
        var objectId = _generateObjectId(objectType);
        
        return {
            objectId: objectId,
            objectType: objectType,
            nativeObject: nativeObject,
            isMock: options.isMock || false,
            mockData: options.mockData || null,
            createdAt: new Date().getTime(),
            properties: {},
            methods: {}
        };
    }
    
    // -------------------------------------------------------------
    // 公共接口
    // -------------------------------------------------------------
    
    /**
     * 注册封装器构造函数
     * @param {string} objectType 对象类型
     * @param {Function} constructor 构造函数
     */
    function registerWrapperConstructor(objectType, constructor) {
        if (typeof objectType !== "string" || !objectType) {
            throw new Error("ObjectFactory.registerWrapperConstructor: objectType must be a non-empty string");
        }
        
        if (typeof constructor !== "function") {
            throw new Error("ObjectFactory.registerWrapperConstructor: constructor must be a function");
        }
        
        _wrapperConstructors[objectType] = constructor;
        _supportedTypes[objectType] = true;
    }
    
    /**
     * 创建单个对象
     * @param {Object} nativeObject 原生对象
     * @param {Object} options 选项
     * @returns {Object} 创建的对象
     */
    function createObject(nativeObject, options) {
        options = options || {};
        
        var objectType = options.objectType;
        if (!objectType) {
            throw new Error("ObjectFactory.createObject: objectType is required in options");
        }
        
        if (!_isTypeSupported(objectType)) {
            throw new Error("ObjectFactory.createObject: Unsupported object type: " + objectType);
        }
        
        try {
            // 创建基础对象数据
            var objectData = _createBaseObjectData(objectType, nativeObject, options);
            
            // 获取封装器构造函数
            var WrapperConstructor = _wrapperConstructors[objectType];
            if (!WrapperConstructor) {
                // 使用默认封装器
                WrapperConstructor = _wrapperConstructors["Default"];
            }
            
            var wrapper;
            if (WrapperConstructor) {
                wrapper = new WrapperConstructor(objectData);
            } else {
                // 创建简单的封装器
                wrapper = {
                    getObjectData: function() { return objectData; },
                    getObjectId: function() { return objectData.objectId; },
                    getObjectType: function() { return objectData.objectType; },
                    isMock: function() { return objectData.isMock; },
                    getNativeObject: function() { return objectData.nativeObject; }
                };
            }
            
            // 更新统计信息
            _updateStatistics(objectType, objectData.isMock);
            
            return wrapper;
            
        } catch (error) {
            throw new Error("ObjectFactory.createObject: Failed to create object - " + error.message);
        }
    }
    
    /**
     * 创建Mock对象
     * @param {string} objectType 对象类型
     * @param {Object} mockData Mock数据
     * @returns {Object} 创建的Mock对象
     */
    function createMock(objectType, mockData) {
        if (!objectType) {
            throw new Error("ObjectFactory.createMock: objectType is required");
        }
        
        if (!_isTypeSupported(objectType)) {
            throw new Error("ObjectFactory.createMock: Unsupported object type: " + objectType);
        }
        
        var options = {
            objectType: objectType,
            isMock: true,
            mockData: mockData || {}
        };
        
        return createObject(null, options);
    }
    
    /**
     * 从迭代器批量创建对象
     * @param {Object} iterator 迭代器对象
     * @param {string} objectType 对象类型
     * @param {Object} options 选项
     * @returns {Array} 创建的对象数组
     */
    function createFromIterator(iterator, objectType, options) {
        options = options || {};
        
        if (!iterator) {
            throw new Error("ObjectFactory.createFromIterator: iterator is required");
        }
        
        if (!objectType) {
            throw new Error("ObjectFactory.createFromIterator: objectType is required");
        }
        
        var results = [];
        var count = 0;
        var maxCount = options.maxCount || 1000; // 防止无限循环
        
        try {
            // 重置迭代器
            if (iterator && typeof iterator.Reset === "function") {
                iterator.Reset();
            }
            
            // 遍历迭代器
            while (count < maxCount) {
                var nativeObject;
                
                // 尝试不同的迭代器接口
                if (typeof iterator.NextPCBObject === "function") {
                    nativeObject = iterator.NextPCBObject();
                } else if (typeof iterator.Next === "function") {
                    nativeObject = iterator.Next();
                } else {
                    break; // 无法继续迭代
                }
                
                if (!nativeObject) {
                    break; // 迭代结束
                }
                
                try {
                    var wrapper = createObject(nativeObject, {
                        objectType: objectType,
                        batchMode: true
                    });
                    results.push(wrapper);
                    count++;
                } catch (error) {
                    // 记录错误但继续处理其他对象
                    if (options.skipErrors !== false) {
                        continue;
                    } else {
                        throw error;
                    }
                }
            }
            
            // 更新统计信息
            _statistics.batchOperations++;
            
            return results;
            
        } catch (error) {
            throw new Error("ObjectFactory.createFromIterator: Failed to create objects from iterator - " + error.message);
        }
    }
    
    /**
     * 批量创建对象
     * @param {Array} objectList 对象列表
     * @returns {Object} 批量创建结果
     */
    function createBatch(objectList) {
        if (!objectList || !Array.isArray(objectList)) {
            throw new Error("ObjectFactory.createBatch: objectList must be an array");
        }
        
        var result = {
            success: [],
            failed: [],
            totalCount: objectList.length,
            successCount: 0,
            failedCount: 0
        };
        
        for (var i = 0; i < objectList.length; i++) {
            var item = objectList[i];
            
            try {
                var wrapper;
                
                if (item.nativeObject) {
                    wrapper = createObject(item.nativeObject, item.options || {});
                } else if (item.mockData) {
                    wrapper = createMock(item.objectType, item.mockData);
                } else {
                    throw new Error("Invalid item: neither nativeObject nor mockData provided");
                }
                
                result.success.push(wrapper);
                result.successCount++;
                
            } catch (error) {
                result.failed.push({
                    index: i,
                    item: item,
                    error: error.message
                });
                result.failedCount++;
            }
        }
        
        // 更新统计信息
        _statistics.batchOperations++;
        
        return result;
    }
    
    /**
     * 获取支持的对象类型
     * @returns {Array} 支持的类型数组
     */
    function getSupportedObjectTypes() {
        var types = [];
        for (var type in _supportedTypes) {
            if (_supportedTypes.hasOwnProperty(type)) {
                types.push(type);
            }
        }
        return types;
    }
    
    /**
     * 检查对象类型是否支持
     * @param {string} objectType 对象类型
     * @returns {boolean} 是否支持
     */
    function isObjectTypeSupported(objectType) {
        return _isTypeSupported(objectType);
    }
    
    /**
     * 获取工厂统计信息
     * @returns {Object} 统计信息
     */
    function getFactoryStatistics() {
        return {
            totalCreated: _statistics.totalCreated,
            byType: _statistics.byType,
            mockCreated: _statistics.mockCreated,
            batchOperations: _statistics.batchOperations,
            supportedTypes: getSupportedObjectTypes(),
            registeredWrappers: Object.keys(_wrapperConstructors)
        };
    }
    
    /**
     * 重置工厂统计信息
     */
    function resetFactoryStatistics() {
        _statistics = {
            totalCreated: 0,
            byType: {},
            mockCreated: 0,
            batchOperations: 0
        };
    }
    
    /**
     * 清理工厂资源
     */
    function cleanup() {
        _wrapperConstructors = {};
        resetFactoryStatistics();
    }
    
    // -------------------------------------------------------------
    // 导出接口
    // -------------------------------------------------------------
    
    return {
        // 对象创建方法
        createObject: createObject,
        createMock: createMock,
        createFromIterator: createFromIterator,
        createBatch: createBatch,
        
        // 封装器管理
        registerWrapperConstructor: registerWrapperConstructor,
        
        // 查询方法
        getSupportedObjectTypes: getSupportedObjectTypes,
        isObjectTypeSupported: isObjectTypeSupported,
        
        // 统计和管理
        getFactoryStatistics: getFactoryStatistics,
        resetFactoryStatistics: resetFactoryStatistics,
        cleanup: cleanup
    };
    
})();
