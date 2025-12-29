/**
 * PCBObjectFactory - PCB对象工厂
 * 提供统一的对象创建和类型识别功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBObjectFactory = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _wrapperConstructors = {};
    var _objectTypeMapping = {};
    var _factoryStats = {
        totalCreated: 0,
        createdByType: {},
        lastCreatedTime: null
    };
    
    // 私有工具函数
    function _createFactoryLogger() {
        return {
            debug: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.debug) {
                        logger.debug("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            info: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.info) {
                        logger.info("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            warn: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.warn) {
                        logger.warn("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            error: function(message) {
                try {
                    if (typeof logger !== "undefined" && logger && logger.error) {
                        logger.error("[PCBObjectFactory][index.js] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            }
        };
    }
    
    function _updateFactoryStats(objectType) {
        _factoryStats.totalCreated++;
        _factoryStats.lastCreatedTime = new Date();
        
        if (!_factoryStats.createdByType[objectType]) {
            _factoryStats.createdByType[objectType] = 0;
        }
        _factoryStats.createdByType[objectType]++;
    }
    
    function _getObjectTypeFromId(objectId) {
        if (typeof eArcObject !== "undefined" && objectId === eArcObject) return "Arc";
        if (typeof ePadObject !== "undefined" && objectId === ePadObject) return "Pad";
        if (typeof eTrackObject !== "undefined" && objectId === eTrackObject) return "Track";
        if (typeof eViaObject !== "undefined" && objectId === eViaObject) return "Via";
        if (typeof eBoardOutlineObject !== "undefined" && objectId === eBoardOutlineObject) return "BoardOutline";
        if (typeof ePolyObject !== "undefined" && objectId === ePolyObject) return "Polygon";
        if (typeof eSignalLayerObject !== "undefined" && objectId === eSignalLayerObject) return "SignalLayer";
        if (typeof eMechanicalLayerObject !== "undefined" && objectId === eMechanicalLayerObject) return "MechanicalLayer";
        if (typeof eDielectricLayerObject !== "undefined" && objectId === eDielectricLayerObject) return "DielectricLayer";
        if (typeof eInternalPlaneObject !== "undefined" && objectId === eInternalPlaneObject) return "InternalPlane";
        return "Unknown";
    }
    
    function _validateNativeObject(nativeObject) {
        if (!nativeObject) {
            return { valid: false, error: "Native object is null" };
        }
        
        if (typeof nativeObject.ObjectId === "undefined") {
            return { valid: false, error: "Native object missing ObjectId property" };
        }
        
        return { valid: true, error: null };
    }
    
    function _validateOptions(options) {
        if (!options) {
            options = {};
        }
        
        // 确保基本选项存在
        if (typeof options.isMock === "undefined") {
            options.isMock = false;
        }
        
        if (typeof options.mockType === "undefined") {
            options.mockType = null;
        }
        
        if (typeof options.mockData === "undefined") {
            options.mockData = {};
        }
        
        if (typeof options.enableCache === "undefined") {
            options.enableCache = true;
        }
        
        return options;
    }
    
    // 初始化对象类型映射
    function _initializeObjectTypeMapping() {
        _objectTypeMapping = {
            // 设计对象
            "Arc": {
                objectId: eArcObject,
                wrapperConstructor: null, // 将在注册时设置
                mockType: "Arc"
            },
            "Pad": {
                objectId: ePadObject,
                wrapperConstructor: null,
                mockType: "Pad"
            },
            "Track": {
                objectId: eTrackObject,
                wrapperConstructor: null,
                mockType: "Track"
            },
            "Via": {
                objectId: eViaObject,
                wrapperConstructor: null,
                mockType: "Via"
            },
            "BoardOutline": {
                objectId: eBoardOutlineObject,
                wrapperConstructor: null,
                mockType: "BoardOutline"
            },
            "Polygon": {
                objectId: (typeof ePolyObject !== "undefined" ? ePolyObject : null),
                wrapperConstructor: null,
                mockType: "Polygon"
            },
            
            // 层对象
            "SignalLayer": {
                objectId: eSignalLayerObject,
                wrapperConstructor: null,
                mockType: "SignalLayer"
            },
            "MechanicalLayer": {
                objectId: eMechanicalLayerObject,
                wrapperConstructor: null,
                mockType: "MechanicalLayer"
            },
            "DielectricLayer": {
                objectId: eDielectricLayerObject,
                wrapperConstructor: null,
                mockType: "DielectricLayer"
            },
            "InternalPlane": {
                objectId: eInternalPlaneObject,
                wrapperConstructor: null,
                mockType: "InternalPlane"
            }
        };
    }
    
    // 公有API函数
    function registerWrapperConstructor(objectType, constructor) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][registerWrapperConstructor] START - Registering wrapper for type: " + objectType);
        
        try {
            if (!_objectTypeMapping[objectType]) {
                throw new Error("[PCBObjectFactory][index.js][registerWrapperConstructor] Unknown object type: " + objectType);
            }
            
            if (typeof constructor !== "function") {
                throw new Error("[PCBObjectFactory][index.js][registerWrapperConstructor] Constructor must be a function");
            }
            
            _objectTypeMapping[objectType].wrapperConstructor = constructor;
            _wrapperConstructors[objectType] = constructor;
            
            logger.debug("[PCBObjectFactory][index.js][registerWrapperConstructor] SUCCESS - Wrapper registered for: " + objectType);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][registerWrapperConstructor] ERROR - " + error.message);
            throw error;
        }
    }
    
    function createWrapper(nativeObject, options) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][createWrapper] START - Creating wrapper, options: " + JSON.stringify(options));
        
        try {
            // 验证和标准化选项
            options = _validateOptions(options);
            
            var wrapper = null;
            var objectType = null;
            
            if (options.isMock) {
                // 创建Mock对象
                logger.debug("[PCBObjectFactory][index.js][createWrapper] Creating mock wrapper for type: " + options.mockType);
                
                if (!options.mockType) {
                    throw new Error("[PCBObjectFactory][index.js][createWrapper] Mock type is required for mock objects");
                }
                
                objectType = options.mockType;
                
                // 创建Mock原生对象
                if (!nativeObject) {
                    if (typeof PCBMockSystem !== "undefined" && PCBMockSystem.createMockObject) {
                        nativeObject = PCBMockSystem.createMockObject(options.mockType, options.mockData);
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] PCBMockSystem not available");
                    }
                }
                
                // 创建Mock封装对象
                if (_wrapperConstructors[objectType]) {
                    wrapper = _wrapperConstructors[objectType]({
                        nativeObject: nativeObject,
                        objectType: objectType,
                        isMock: true,
                        mockData: options.mockData,
                        enableCache: options.enableCache
                    });
                } else {
                    // 使用基础封装类
                    if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                        wrapper = BasePCBWrapper.create({
                            nativeObject: nativeObject,
                            objectType: objectType,
                            isMock: true,
                            mockData: options.mockData,
                            enableCache: options.enableCache
                        });
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                    }
                }
                
            } else {
                // 创建真实对象封装
                logger.debug("[PCBObjectFactory][index.js][createWrapper] Creating real wrapper");
                
                // 验证原生对象
                var validation = _validateNativeObject(nativeObject);
                if (!validation.valid) {
                    throw new Error("[PCBObjectFactory][index.js][createWrapper] Invalid native object: " + validation.error);
                }
                
                // 识别对象类型
                objectType = _getObjectTypeFromId(nativeObject.ObjectId);
                
                if (objectType === "Unknown") {
                    logger.warn("[PCBObjectFactory][index.js][createWrapper] Unknown object type for ObjectId: " + nativeObject.ObjectId);
                    
                    // 使用基础封装类
                    if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                        wrapper = BasePCBWrapper.create({
                            nativeObject: nativeObject,
                            objectType: "Unknown",
                            isMock: false,
                            enableCache: options.enableCache
                        });
                    } else {
                        throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                    }
                } else {
                    // 使用特定封装类
                    if (_wrapperConstructors[objectType]) {
                        wrapper = _wrapperConstructors[objectType]({
                            nativeObject: nativeObject,
                            objectType: objectType,
                            isMock: false,
                            enableCache: options.enableCache
                        });
                    } else {
                        // 使用基础封装类
                        if (typeof BasePCBWrapper !== "undefined" && BasePCBWrapper.create) {
                            wrapper = BasePCBWrapper.create({
                                nativeObject: nativeObject,
                                objectType: objectType,
                                isMock: false,
                                enableCache: options.enableCache
                            });
                        } else {
                            throw new Error("[PCBObjectFactory][index.js][createWrapper] BasePCBWrapper not available");
                        }
                    }
                }
            }
            
            // 初始化封装对象
            if (wrapper && wrapper.init) {
                wrapper.init();
            }
            
            // 更新统计信息
            _updateFactoryStats(objectType);
            
            logger.debug("[PCBObjectFactory][index.js][createWrapper] SUCCESS - Wrapper created for type: " + objectType);
            
            return wrapper;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][createWrapper] ERROR - " + error.message);
            throw error;
        }
    }
    
    function createWrappersFromIterator(iterator, options) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][createWrappersFromIterator] START - Creating wrappers from iterator");
        
        try {
            if (!iterator) {
                throw new Error("[PCBObjectFactory][index.js][createWrappersFromIterator] Iterator is required");
            }
            
            if (typeof iterator.First !== "function" || typeof iterator.Next !== "function") {
                throw new Error("[PCBObjectFactory][index.js][createWrappersFromIterator] Invalid iterator interface");
            }
            
            var wrappers = [];
            var nativeObject = iterator.First;
            var count = 0;
            
            while (nativeObject != null) {
                try {
                    var wrapper = createWrapper(nativeObject, options);
                    if (wrapper) {
                        wrappers.push(wrapper);
                        count++;
                    }
                } catch (error) {
                    logger.warn("[PCBObjectFactory][index.js][createWrappersFromIterator] Failed to create wrapper for object: " + error.message);
                    // 继续处理其他对象
                }
                
                nativeObject = iterator.Next;
            }
            
            logger.debug("[PCBObjectFactory][index.js][createWrappersFromIterator] SUCCESS - Created " + count + " wrappers from iterator");
            
            return wrappers;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][createWrappersFromIterator] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getObjectType(nativeObject) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getObjectType] START - Getting object type");
        
        try {
            if (!nativeObject) {
                logger.warn("[PCBObjectFactory][index.js][getObjectType] Native object is null");
                return "Unknown";
            }
            
            if (typeof nativeObject.ObjectId === "undefined") {
                logger.warn("[PCBObjectFactory][index.js][getObjectType] Native object missing ObjectId");
                return "Unknown";
            }
            
            var objectType = _getObjectTypeFromId(nativeObject.ObjectId);
            
            logger.debug("[PCBObjectFactory][index.js][getObjectType] SUCCESS - Object type: " + objectType);
            
            return objectType;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getObjectType] ERROR - " + error.message);
            return "Unknown";
        }
    }
    
    function getSupportedObjectTypes() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getSupportedObjectTypes] START - Getting supported object types");
        
        try {
            var types = [];
            var key;
            
            for (key in _objectTypeMapping) {
                if (_objectTypeMapping.hasOwnProperty(key)) {
                    types.push(key);
                }
            }
            
            logger.debug("[PCBObjectFactory][index.js][getSupportedObjectTypes] SUCCESS - Found " + types.length + " supported types");
            
            return types;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getSupportedObjectTypes] ERROR - " + error.message);
            throw error;
        }
    }
    
    function isObjectTypeSupported(objectType) {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][isObjectTypeSupported] START - Checking support for type: " + objectType);
        
        try {
            var supported = _objectTypeMapping.hasOwnProperty(objectType);
            
            logger.debug("[PCBObjectFactory][index.js][isObjectTypeSupported] SUCCESS - Type " + objectType + " supported: " + supported);
            
            return supported;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][isObjectTypeSupported] ERROR - " + error.message);
            return false;
        }
    }
    
    function getFactoryStatistics() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][getFactoryStatistics] START - Getting factory statistics");
        
        try {
            var stats = {
                totalCreated: _factoryStats.totalCreated,
                createdByType: {},
                lastCreatedTime: _factoryStats.lastCreatedTime,
                supportedTypes: Object.keys(_objectTypeMapping).length,
                registeredWrappers: Object.keys(_wrapperConstructors).length
            };
            
            // 复制创建统计
            var key;
            for (key in _factoryStats.createdByType) {
                if (_factoryStats.createdByType.hasOwnProperty(key)) {
                    stats.createdByType[key] = _factoryStats.createdByType[key];
                }
            }
            
            logger.debug("[PCBObjectFactory][index.js][getFactoryStatistics] SUCCESS - Statistics: " + JSON.stringify(stats));
            
            return stats;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][getFactoryStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    function resetFactoryStatistics() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][resetFactoryStatistics] START - Resetting factory statistics");
        
        try {
            _factoryStats.totalCreated = 0;
            _factoryStats.createdByType = {};
            _factoryStats.lastCreatedTime = null;
            
            logger.debug("[PCBObjectFactory][index.js][resetFactoryStatistics] SUCCESS - Factory statistics reset");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][resetFactoryStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    function initialize() {
        var logger = _createFactoryLogger();
        
        logger.debug("[PCBObjectFactory][index.js][initialize] START - Initializing PCB Object Factory");
        
        try {
            _initializeObjectTypeMapping();
            
            logger.debug("[PCBObjectFactory][index.js][initialize] SUCCESS - PCB Object Factory initialized with " + 
                       Object.keys(_objectTypeMapping).length + " supported types");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBObjectFactory][index.js][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    return {
        // 对象创建
        createWrapper: createWrapper,
        createWrappersFromIterator: createWrappersFromIterator,
        
        // 类型识别和查询
        getObjectType: getObjectType,
        getSupportedObjectTypes: getSupportedObjectTypes,
        isObjectTypeSupported: isObjectTypeSupported,
        
        // 封装器注册
        registerWrapperConstructor: registerWrapperConstructor,
        
        // 统计和管理
        getFactoryStatistics: getFactoryStatistics,
        resetFactoryStatistics: resetFactoryStatistics,
        
        // 初始化
        initialize: initialize,
        
        // 版本信息
        version: _moduleVersion
    };
})();


// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.PCBObjectFactory = PCBObjectFactory;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PCBObjectFactory;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PCBObjectFactory = PCBObjectFactory;
    }
})();
