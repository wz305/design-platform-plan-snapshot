/**
 * PCBMockSystem - PCB对象Mock系统
 * 提供完整的Mock对象创建和管理功能
 * 100% 兼容 JScript 5.8 (ES3)
 */

var PCBMockSystem = (function(){
    
    // 私有变量
    var _moduleVersion = "1.0.0";
    var _mockObjects = {};
    var _mockDataTemplates = {};
    var _objectIdCounter = 1000;
    
    // 私有工具函数
    function _generateMockId() {
        _objectIdCounter++;
        return "MOCK_" + _objectIdCounter;
    }
    
    function _mergeMockData(templateData, userData) {
        var result = {};
        var key;
        
        // 复制模板数据
        if (templateData) {
            for (key in templateData) {
                if (templateData.hasOwnProperty(key)) {
                    result[key] = templateData[key];
                }
            }
        }
        
        // 覆盖用户数据
        if (userData) {
            for (key in userData) {
                if (userData.hasOwnProperty(key)) {
                    result[key] = userData[key];
                }
            }
        }
        
        return result;
    }
    
    function _createMockLogger() {
        return {
            debug: function(message) {
                // Mock环境下的简单日志输出
                try {
                    if (typeof console !== "undefined" && console.log) {
                        console.log("[MOCK] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            info: function(message) {
                try {
                    if (typeof console !== "undefined" && console.log) {
                        console.log("[MOCK INFO] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            warn: function(message) {
                try {
                    if (typeof console !== "undefined" && console.warn) {
                        console.warn("[MOCK WARN] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            },
            error: function(message) {
                try {
                    if (typeof console !== "undefined" && console.error) {
                        console.error("[MOCK ERROR] " + message);
                    }
                } catch (e) {
                    // 忽略日志错误
                }
            }
        };
    }
    
    // 初始化Mock数据模板
    function _initializeMockDataTemplates() {
        // Arc对象模板
        _mockDataTemplates.Arc = {
            ObjectId: eArcObject,
            I_ObjectAddress: "MOCK_ARC_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X1: 0,
            Y1: 0,
            X2: 1000,
            Y2: 1000,
            Radius: 500,
            StartAngle: 0,
            EndAngle: 90,
            LineWidth: 100,
            Color: 0xFF0000
        };
        
        // Pad对象模板
        _mockDataTemplates.Pad = {
            ObjectId: ePadObject,
            I_ObjectAddress: "MOCK_PAD_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X: 0,
            Y: 0,
            Size: { X: 1000, Y: 1000 },
            HoleSize: { X: 500, Y: 500 },
            TopShape: eRounded,
            MidShape: eRounded,
            BottomShape: eRounded,
            DrillShape: eRounded,
            TopX: 1000,
            TopY: 1000,
            MidX: 1000,
            MidY: 1000,
            BottomX: 1000,
            BottomY: 1000,
            HoleX: 500,
            HoleY: 500,
            Rotation: 0,
            Plated: true,
            Name: "MockPad",
            Designator: "P1"
        };
        
        // Track对象模板
        _mockDataTemplates.Track = {
            ObjectId: eTrackObject,
            I_ObjectAddress: "MOCK_TRACK_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X1: 0,
            Y1: 0,
            X2: 5000,
            Y2: 0,
            Width: 100,
            Net: null,
            StartShape: eRound,
            EndShape: eRound
        };
        
        // Via对象模板
        _mockDataTemplates.Via = {
            ObjectId: eViaObject,
            I_ObjectAddress: "MOCK_VIA_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            X: 0,
            Y: 0,
            Size: 1000,
            HoleSize: 500,
            HighLayer: eBottomLayer,
            LowLayer: eTopLayer,
            Net: null,
            Plated: true
        };
        
        // BoardOutline对象模板
        _mockDataTemplates.BoardOutline = {
            ObjectId: eBoardOutlineObject,
            I_ObjectAddress: "MOCK_BOARDOUTLINE_ADDRESS",
            V6_LayerID: eMechanicalLayer1,
            V7_LayerID: eMechanicalLayer1,
            LayerStack: null,
            Width: 1000,
            Closed: true
        };
        
        // SignalLayer对象模板
        _mockDataTemplates.SignalLayer = {
            ObjectId: eSignalLayerObject,
            I_ObjectAddress: "MOCK_SIGNALLAYER_ADDRESS",
            V6_LayerID: eTopLayer,
            V7_LayerID: eTopLayer,
            LayerStack: null,
            Name: "Top Layer",
            UsedByPrims: true,
            CopperThickness: 1750,
            ComponentPlacement: true
        };
        
        // MechanicalLayer对象模板
        _mockDataTemplates.MechanicalLayer = {
            ObjectId: eMechanicalLayerObject,
            I_ObjectAddress: "MOCK_MECHLAYER_ADDRESS",
            V6_LayerID: eMechanicalLayer1,
            V7_LayerID: eMechanicalLayer1,
            LayerStack: null,
            Name: "Mechanical Layer 1",
            UsedByPrims: false,
            MechanicalLayerEnabled: true,
            DisplayInSingleLayerMode: true,
            LinkToSheet: false
        };
        
        // DielectricLayer对象模板
        _mockDataTemplates.DielectricLayer = {
            ObjectId: eDielectricLayerObject,
            I_ObjectAddress: "MOCK_DIELECTRIC_ADDRESS",
            V6_LayerID: eDielectricLayer1,
            V7_LayerID: eDielectricLayer1,
            LayerStack: null,
            Name: "Dielectric Layer 1",
            UsedByPrims: false,
            DielectricMaterial: "FR-4",
            DielectricType: eCore,
            DielectricConstant: 4.5,
            DielectricHeight: 1600
        };
        
        // InternalPlane对象模板
        _mockDataTemplates.InternalPlane = {
            ObjectId: eInternalPlaneObject,
            I_ObjectAddress: "MOCK_INTERNALPLANE_ADDRESS",
            V6_LayerID: eInternalPlane1,
            V7_LayerID: eInternalPlane1,
            LayerStack: null,
            Name: "Internal Plane 1",
            UsedByPrims: true,
            CopperThickness: 1750,
            PullBackDistance: 2000,
            NetName: "GND"
        };
    }
    
    // 公有API函数
    function createMockObject(objectType, mockData) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][createMockObject] START - Creating mock object of type: " + objectType + 
                   ", mockData: " + JSON.stringify(mockData));
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            // 获取模板数据
            var templateData = _mockDataTemplates[objectType];
            if (!templateData) {
                throw new Error("[PCBMockSystem][index.js][createMockObject] Unknown object type: " + objectType);
            }
            
            // 合并模板数据和用户数据
            var mergedData = _mergeMockData(templateData, mockData);
            
            // 创建Mock对象
            var mockObject = {
                // 基础属性
                _mockId: _generateMockId(),
                _mockType: objectType,
                _mockData: mergedData,
                
                // 动态属性访问
                GetProperty: function(propertyName) {
                    return this._mockData[propertyName];
                },
                
                SetProperty: function(propertyName, value) {
                    this._mockData[propertyName] = value;
                },
                
                // 模拟AD对象接口
                toString: function() {
                    return "[Mock " + this._mockType + " Object]";
                }
            };
            
            // 动态添加所有属性
            var key;
            for (key in mergedData) {
                if (mergedData.hasOwnProperty(key)) {
                    (function(propName) {
                        Object.defineProperty(mockObject, propName, {
                            get: function() {
                                return mockObject._mockData[propName];
                            },
                            set: function(value) {
                                mockObject._mockData[propName] = value;
                            },
                            enumerable: true,
                            configurable: true
                        });
                    })(key);
                }
            }
            
            // 存储Mock对象
            _mockObjects[mockObject._mockId] = mockObject;
            
            logger.debug("[PCBMockSystem][index.js][createMockObject] SUCCESS - Mock object created with ID: " + mockObject._mockId);
            
            return mockObject;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][createMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockObject(mockId) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockObject] START - Getting mock object with ID: " + mockId);
        
        try {
            var mockObject = _mockObjects[mockId];
            
            if (!mockObject) {
                logger.warn("[PCBMockSystem][index.js][getMockObject] Mock object not found: " + mockId);
                return null;
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockObject] SUCCESS - Mock object found: " + mockObject._mockType);
            
            return mockObject;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function removeMockObject(mockId) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][removeMockObject] START - Removing mock object with ID: " + mockId);
        
        try {
            var mockObject = _mockObjects[mockId];
            
            if (!mockObject) {
                logger.warn("[PCBMockSystem][index.js][removeMockObject] Mock object not found: " + mockId);
                return false;
            }
            
            delete _mockObjects[mockId];
            
            logger.debug("[PCBMockSystem][index.js][removeMockObject] SUCCESS - Mock object removed: " + mockObject._mockType);
            
            return true;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][removeMockObject] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getAllMockObjects() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getAllMockObjects] START - Getting all mock objects");
        
        try {
            var result = [];
            var key;
            
            for (key in _mockObjects) {
                if (_mockObjects.hasOwnProperty(key)) {
                    result.push(_mockObjects[key]);
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getAllMockObjects] SUCCESS - Found " + result.length + " mock objects");
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getAllMockObjects] ERROR - " + error.message);
            throw error;
        }
    }
    
    function clearAllMockObjects() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][clearAllMockObjects] START - Clearing all mock objects");
        
        try {
            var count = Object.keys(_mockObjects).length;
            _mockObjects = {};
            
            logger.debug("[PCBMockSystem][index.js][clearAllMockObjects] SUCCESS - Cleared " + count + " mock objects");
            
            return count;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][clearAllMockObjects] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockDataTemplate(objectType) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockDataTemplate] START - Getting template for object type: " + objectType);
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            var template = _mockDataTemplates[objectType];
            
            if (!template) {
                logger.warn("[PCBMockSystem][index.js][getMockDataTemplate] Template not found for object type: " + objectType);
                return null;
            }
            
            // 返回模板的副本
            var result = {};
            var key;
            for (key in template) {
                if (template.hasOwnProperty(key)) {
                    result[key] = template[key];
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockDataTemplate] SUCCESS - Template retrieved for: " + objectType);
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockDataTemplate] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getAllMockDataTemplates() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getAllMockDataTemplates] START - Getting all mock data templates");
        
        try {
            // 确保模板已初始化
            if (Object.keys(_mockDataTemplates).length === 0) {
                _initializeMockDataTemplates();
            }
            
            var result = {};
            var key;
            
            for (key in _mockDataTemplates) {
                if (_mockDataTemplates.hasOwnProperty(key)) {
                    result[key] = {};
                    var subKey;
                    for (subKey in _mockDataTemplates[key]) {
                        if (_mockDataTemplates[key].hasOwnProperty(subKey)) {
                            result[key][subKey] = _mockDataTemplates[key][subKey];
                        }
                    }
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getAllMockDataTemplates] SUCCESS - Retrieved " + Object.keys(result).length + " templates");
            
            return result;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getAllMockDataTemplates] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockObjectId(objectType) {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockObjectId] START - Getting object ID for type: " + objectType);
        
        try {
            var objectIds = {
                "Arc": eArcObject,
                "Pad": ePadObject,
                "Track": eTrackObject,
                "Via": eViaObject,
                "BoardOutline": eBoardOutlineObject,
                "SignalLayer": eSignalLayerObject,
                "MechanicalLayer": eMechanicalLayerObject,
                "DielectricLayer": eDielectricLayerObject,
                "InternalPlane": eInternalPlaneObject
            };
            
            var objectId = objectIds[objectType];
            
            if (objectId === undefined) {
                logger.warn("[PCBMockSystem][index.js][getMockObjectId] Unknown object type: " + objectType);
                return eNoObject;
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockObjectId] SUCCESS - Object ID: " + objectId);
            
            return objectId;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockObjectId] ERROR - " + error.message);
            throw error;
        }
    }
    
    function getMockStatistics() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][getMockStatistics] START - Getting mock system statistics");
        
        try {
            var stats = {
                totalMockObjects: Object.keys(_mockObjects).length,
                totalTemplates: Object.keys(_mockDataTemplates).length,
                objectIdCounter: _objectIdCounter,
                mockObjectsByType: {}
            };
            
            // 统计各类型的Mock对象数量
            var key;
            for (key in _mockObjects) {
                if (_mockObjects.hasOwnProperty(key)) {
                    var mockObject = _mockObjects[key];
                    var type = mockObject._mockType;
                    
                    if (!stats.mockObjectsByType[type]) {
                        stats.mockObjectsByType[type] = 0;
                    }
                    stats.mockObjectsByType[type]++;
                }
            }
            
            logger.debug("[PCBMockSystem][index.js][getMockStatistics] SUCCESS - Statistics: " + JSON.stringify(stats));
            
            return stats;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][getMockStatistics] ERROR - " + error.message);
            throw error;
        }
    }
    
    // 初始化模块
    function initialize() {
        var logger = _createMockLogger();
        
        logger.debug("[PCBMockSystem][index.js][initialize] START - Initializing PCB Mock System");
        
        try {
            _initializeMockDataTemplates();
            
            logger.debug("[PCBMockSystem][index.js][initialize] SUCCESS - PCB Mock System initialized with " + 
                       Object.keys(_mockDataTemplates).length + " templates");
            
            return true;
            
        } catch (error) {
            logger.error("[PCBMockSystem][index.js][initialize] ERROR - " + error.message);
            throw error;
        }
    }
    
    return {
        // Mock对象创建和管理
        createMockObject: createMockObject,
        getMockObject: getMockObject,
        removeMockObject: removeMockObject,
        getAllMockObjects: getAllMockObjects,
        clearAllMockObjects: clearAllMockObjects,
        
        // Mock数据模板
        getMockDataTemplate: getMockDataTemplate,
        getAllMockDataTemplates: getAllMockDataTemplates,
        getMockObjectId: getMockObjectId,
        
        // 统计和工具
        getMockStatistics: getMockStatistics,
        initialize: initialize,
        
        // 版本信息
        version: _moduleVersion
    };
})();

// 统一的环境检测和导出
(function() {
    // AD环境导出
    if (typeof window !== "undefined") {
        window.PCBMockSystem = PCBMockSystem;
    }
    
    // Node.js环境导出
    if (typeof module !== "undefined" && module.exports) {
        module.exports = PCBMockSystem;
    }
    
    // 其他环境的全局导出（备用）
    if (typeof global !== "undefined" && typeof window === "undefined") {
        global.PCBMockSystem = PCBMockSystem;
    }
})();
