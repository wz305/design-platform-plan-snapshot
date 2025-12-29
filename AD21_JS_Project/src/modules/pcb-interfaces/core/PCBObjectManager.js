/**
 * PCBObjectManager - PCB对象管理系统
 * 提供对象创建、绑定、池管理功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectManager = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _pendingPool = [];      // 待绑定池
    var _boundObjects = {};     // 已绑定对象映射 {I_ObjectAddress: wrapper}
    var _factory = null;        // 对象工厂引用
    var _logger = null;         // 日志记录器
    
    // 私有工具函数
    function _generateAddressKey(nativeObject) {
        if (!nativeObject || !nativeObject.I_ObjectAddress) {
            return null;
        }
        return "addr_" + nativeObject.I_ObjectAddress.toString();
    }
    
    function _validateNativeObject(nativeObject) {
        if (!nativeObject) {
            throw new Error("[PCBObjectManager][index.js][_validateNativeObject] Native object is required");
        }
        
        if (!nativeObject.I_ObjectAddress) {
            throw new Error("[PCBObjectManager][index.js][_validateNativeObject] Native object must have I_ObjectAddress property");
        }
        
        return true;
    }
    
    function _validateWrapperType(wrapperType) {
        var validTypes = ["track", "arc", "pad", "via"];
        
        if (!wrapperType) {
            throw new Error("[PCBObjectManager][index.js][_validateWrapperType] Wrapper type is required");
        }
        
        var lowerType = wrapperType.toLowerCase();
        var isValid = false;
        
        for (var i = 0; i < validTypes.length; i++) {
            if (lowerType === validTypes[i]) {
                isValid = true;
                break;
            }
        }
        
        if (!isValid) {
            throw new Error("[PCBObjectManager][index.js][_validateWrapperType] Invalid wrapper type: " + wrapperType + 
                           ". Valid types: " + validTypes.join(", "));
        }
        
        return lowerType;
    }
    
    function _createWrapperByType(nativeObject, wrapperType, options) {
        var wrapper;
        var lowerType = _validateWrapperType(wrapperType);
        
        // 根据类型创建对应的封装器
        switch (lowerType) {
            case "track":
                if (typeof TrackWrapper !== "undefined") {
                    wrapper = TrackWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] TrackWrapper not available");
                }
                break;
                
            case "arc":
                if (typeof ArcWrapper !== "undefined") {
                    wrapper = ArcWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] ArcWrapper not available");
                }
                break;
                
            case "pad":
                if (typeof PadWrapper !== "undefined") {
                    wrapper = PadWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] PadWrapper not available");
                }
                break;
                
            case "via":
                if (typeof ViaWrapper !== "undefined") {
                    wrapper = ViaWrapper.create(nativeObject, options);
                } else {
                    throw new Error("[PCBObjectManager][index.js][_createWrapperByType] ViaWrapper not available");
                }
                break;
                
            default:
                throw new Error("[PCBObjectManager][index.js][_createWrapperByType] Unsupported wrapper type: " + wrapperType);
        }
        
        return wrapper;
    }
    
    function _addToBoundObjects(wrapper) {
        if (!wrapper || !wrapper.getNativeObject) {
            return false;
        }
        
        var nativeObj = wrapper.getNativeObject();
        if (!nativeObj || !nativeObj.I_ObjectAddress) {
            return false;
        }
        
        var key = _generateAddressKey(nativeObj);
        if (key) {
            _boundObjects[key] = wrapper;
            
            if (_logger && _logger.debug) {
                _logger.debug("[PCBObjectManager][index.js][_addToBoundObjects] Added wrapper to bound objects: " + key);
            }
            
            return true;
        }
        
        return false;
    }
    
    function _removeFromBoundObjects(wrapper) {
        if (!wrapper || !wrapper.getNativeObject) {
            return false;
        }
        
        var nativeObj = wrapper.getNativeObject();
        if (!nativeObj || !nativeObj.I_ObjectAddress) {
            return false;
        }
        
        var key = _generateAddressKey(nativeObj);
        if (key && _boundObjects.hasOwnProperty(key)) {
            delete _boundObjects[key];
            
            if (_logger && _logger.debug) {
                _logger.debug("[PCBObjectManager][index.js][_removeFromBoundObjects] Removed wrapper from bound objects: " + key);
            }
            
            return true;
        }
        
        return false;
    }
    
    // 公有API函数
    function initialize(factory, logger) {
        if (!factory) {
            throw new Error("[PCBObjectManager][index.js][initialize] Factory is required");
        }
        
        _factory = factory;
        _logger = logger || null;
        
        if (_logger && _logger.info) {
            _logger.info("[PCBObjectManager][index.js][initialize] PCBObjectManager initialized");
        }
        
        return true;
    }
    
    // 模式1：创建时绑定
    function createWrapper(nativeObject, wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createWrapper] Manager not initialized. Call initialize() first.");
        }
        
        _validateNativeObject(nativeObject);
        var lowerType = _validateWrapperType(wrapperType);
        
        var wrapperOptions = options || {};
        wrapperOptions.objectType = lowerType;
        wrapperOptions.nativeObject = nativeObject;
        
        // 创建封装器
        var wrapper = _createWrapperByType(nativeObject, lowerType, wrapperOptions);
        
        // 添加到已绑定对象映射
        if (_addToBoundObjects(wrapper)) {
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][createWrapper] Created and bound wrapper: " + lowerType + 
                            ", Address: " + nativeObject.I_ObjectAddress);
            }
            
            return wrapper;
        } else {
            throw new Error("[PCBObjectManager][index.js][createWrapper] Failed to add wrapper to bound objects");
        }
    }
    
    // 模式2：创建空封装器（放入待绑定池）
    function createEmptyWrapper(wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createEmptyWrapper] Manager not initialized. Call initialize() first.");
        }
        
        var lowerType = _validateWrapperType(wrapperType);
        
        var wrapperOptions = options || {};
        wrapperOptions.objectType = lowerType;
        wrapperOptions.isMock = true;  // 标记为Mock，因为没有原生对象
        wrapperOptions.mockData = {};
        
        // 创建空封装器
        var wrapper = _createWrapperByType(null, lowerType, wrapperOptions);
        
        // 添加到待绑定池
        _pendingPool.push({
            wrapper: wrapper,
            wrapperType: lowerType,
            createdTime: new Date(),
            options: wrapperOptions
        });
        
        if (_logger && _logger.info) {
            _logger.info("[PCBObjectManager][index.js][createEmptyWrapper] Created empty wrapper: " + lowerType + 
                        ", Pool size: " + _pendingPool.length);
        }
        
        return wrapper;
    }
    
    // 模式3：绑定已有对象
    function bindToExisting(wrapper, nativeObject) {
        if (!wrapper) {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Wrapper is required");
        }
        
        _validateNativeObject(nativeObject);
        
        // 检查是否已经在待绑定池中
        var poolIndex = -1;
        for (var i = 0; i < _pendingPool.length; i++) {
            if (_pendingPool[i].wrapper === wrapper) {
                poolIndex = i;
                break;
            }
        }
        
        if (poolIndex === -1) {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Wrapper not found in pending pool");
        }
        
        // 从待绑定池中移除
        _pendingPool.splice(poolIndex, 1);
        
        // 重新配置封装器
        wrapper.nativeObject = nativeObject;
        wrapper.isMock = false;
        wrapper.options.nativeObject = nativeObject;
        
        // 重新初始化
        if (wrapper.init) {
            wrapper.init();
        }
        
        // 从原生对象同步属性
        if (wrapper.syncFromNative) {
            wrapper.syncFromNative();
        }
        
        // 添加到已绑定对象映射
        if (_addToBoundObjects(wrapper)) {
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][bindToExisting] Bound wrapper to native object: " + 
                            wrapper.objectType + ", Address: " + nativeObject.I_ObjectAddress);
            }
            
            return wrapper;
        } else {
            throw new Error("[PCBObjectManager][index.js][bindToExisting] Failed to add wrapper to bound objects");
        }
    }
    
    // 从已有原生对象创建封装器
    function createFromExisting(nativeObject, wrapperType, options) {
        if (!_factory) {
            throw new Error("[PCBObjectManager][index.js][createFromExisting] Manager not initialized. Call initialize() first.");
        }
        
        _validateNativeObject(nativeObject);
        var lowerType = _validateWrapperType(wrapperType);
        
        // 检查是否已经存在封装器
        var existingWrapper = getWrapper(nativeObject);
        if (existingWrapper) {
            if (_logger && _logger.warn) {
                _logger.warn("[PCBObjectManager][index.js][createFromExisting] Wrapper already exists for object: " + 
                            nativeObject.I_ObjectAddress + ", returning existing wrapper");
            }
            
            return existingWrapper;
        }
        
        // 创建新的封装器
        return createWrapper(nativeObject, lowerType, options);
    }
    
    // 获取已绑定的封装器
    function getWrapper(nativeObject) {
        if (!nativeObject || !nativeObject.I_ObjectAddress) {
            return null;
        }
        
        var key = _generateAddressKey(nativeObject);
        if (key && _boundObjects.hasOwnProperty(key)) {
            return _boundObjects[key];
        }
        
        return null;
    }
    
    // 获取待绑定池中的封装器
    function getPendingWrappers() {
        var result = [];
        
        for (var i = 0; i < _pendingPool.length; i++) {
            result.push(_pendingPool[i].wrapper);
        }
        
        return result;
    }
    
    // 获取待绑定池信息
    function getPendingPoolInfo() {
        var result = [];
        
        for (var i = 0; i < _pendingPool.length; i++) {
            var item = _pendingPool[i];
            result.push({
                index: i,
                wrapperType: item.wrapperType,
                createdTime: item.createdTime,
                isInitialized: item.wrapper.state ? item.wrapper.state.initialized : false
            });
        }
        
        return result;
    }
    
    // 销毁封装器
    function destroyWrapper(wrapper) {
        if (!wrapper) {
            return false;
        }
        
        try {
            // 从已绑定对象映射中移除
            _removeFromBoundObjects(wrapper);
            
            // 从待绑定池中移除
            var poolIndex = -1;
            for (var i = 0; i < _pendingPool.length; i++) {
                if (_pendingPool[i].wrapper === wrapper) {
                    poolIndex = i;
                    break;
                }
            }
            
            if (poolIndex !== -1) {
                _pendingPool.splice(poolIndex, 1);
            }
            
            // 销毁封装器
            if (wrapper.destroy) {
                wrapper.destroy();
            }
            
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][destroyWrapper] Wrapper destroyed: " + 
                            (wrapper.objectType || "unknown"));
            }
            
            return true;
            
        } catch (error) {
            if (_logger && _logger.error) {
                _logger.error("[PCBObjectManager][index.js][destroyWrapper] Error destroying wrapper: " + error.message);
            }
            
            return false;
        }
    }
    
    // 清理所有对象
    function clearAll() {
        var destroyedCount = 0;
        
        try {
            // 销毁所有已绑定对象
            for (var key in _boundObjects) {
                if (_boundObjects.hasOwnProperty(key)) {
                    var wrapper = _boundObjects[key];
                    if (wrapper && wrapper.destroy) {
                        wrapper.destroy();
                        destroyedCount++;
                    }
                }
            }
            
            // 清空已绑定对象映射
            _boundObjects = {};
            
            // 销毁待绑定池中的对象
            for (var i = _pendingPool.length - 1; i >= 0; i--) {
                var item = _pendingPool[i];
                if (item.wrapper && item.wrapper.destroy) {
                    item.wrapper.destroy();
                    destroyedCount++;
                }
            }
            
            // 清空待绑定池
            _pendingPool = [];
            
            if (_logger && _logger.info) {
                _logger.info("[PCBObjectManager][index.js][clearAll] Cleared all objects, destroyed: " + destroyedCount);
            }
            
            return true;
            
        } catch (error) {
            if (_logger && _logger.error) {
                _logger.error("[PCBObjectManager][index.js][clearAll] Error clearing all objects: " + error.message);
            }
            
            return false;
        }
    }
    
    // 获取统计信息
    function getStats() {
        var boundCount = 0;
        var pendingCount = _pendingPool.length;
        
        for (var key in _boundObjects) {
            if (_boundObjects.hasOwnProperty(key)) {
                boundCount++;
            }
        }
        
        return {
            boundObjects: boundCount,
            pendingObjects: pendingCount,
            totalObjects: boundCount + pendingCount,
            isInitialized: !!_factory
        };
    }
    
    // 获取调试信息
    function getDebugInfo() {
        var boundDetails = [];
        var pendingDetails = [];
        
        // 已绑定对象详情
        for (var key in _boundObjects) {
            if (_boundObjects.hasOwnProperty(key)) {
                var wrapper = _boundObjects[key];
                boundDetails.push({
                    key: key,
                    objectType: wrapper.objectType || "unknown",
                    isInitialized: wrapper.state ? wrapper.state.initialized : false,
                    isDirty: wrapper.isDirty || false,
                    isMock: wrapper.isMock || false
                });
            }
        }
        
        // 待绑定对象详情
        for (var i = 0; i < _pendingPool.length; i++) {
            var item = _pendingPool[i];
            pendingDetails.push({
                index: i,
                wrapperType: item.wrapperType,
                createdTime: item.createdTime,
                isInitialized: item.wrapper.state ? item.wrapper.state.initialized : false
            });
        }
        
        return {
            stats: getStats(),
            boundObjects: boundDetails,
            pendingObjects: pendingDetails,
            isInitialized: !!_factory
        };
    }
    
    return {
        // 初始化
        initialize: initialize,
        
        // 创建模式
        createWrapper: createWrapper,           // 模式1：创建时绑定
        createEmptyWrapper: createEmptyWrapper, // 模式2：创建空封装器
        bindToExisting: bindToExisting,         // 模式3：绑定已有对象
        createFromExisting: createFromExisting, // 从已有对象创建
        
        // 查询方法
        getWrapper: getWrapper,
        getPendingWrappers: getPendingWrappers,
        getPendingPoolInfo: getPendingPoolInfo,
        
        // 管理方法
        destroyWrapper: destroyWrapper,
        clearAll: clearAll,
        
        // 状态方法
        getStats: getStats,
        getDebugInfo: getDebugInfo,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.PCBObjectManager = PCBObjectManager;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PCBObjectManager;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PCBObjectManager = PCBObjectManager;
    }
})();
