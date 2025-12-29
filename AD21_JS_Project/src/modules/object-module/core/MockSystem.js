/**
 * MockSystem - Mock对象系统核心模块
 * 
 * 提供Mock对象创建和管理功能，支持离线开发和测试
 * 严格遵循ES3语法规范，兼容AD环境
 * 
 * @author AD21 Object Module
 * @version 1.0.0
 */

var MockSystem = (function(){
    "use strict";
    
    // -------------------------------------------------------------
    // 私有变量
    // -------------------------------------------------------------
    
    var _mockTemplates = {};       // Mock模板
    var _mockObjects = {};         // 存储Mock对象
    var _config = {
        enableAutoId: true,
        enableTimestamp: true,
        defaultLayer: "TopLayer",
        defaultUnit: "mil"
    };
    
    var _statistics = {
        totalCreated: 0,
        byType: {},
        templatesUsed: {}
    };
    
    // -------------------------------------------------------------
    // 私有函数
    // -------------------------------------------------------------
    
    /**
     * 生成Mock ID
     * @param {string} objectType 对象类型
     * @returns {string} Mock ID
     */
    function _generateMockId(objectType) {
        if (!_config.enableAutoId) {
            return "";
        }
        
        var timestamp = _config.enableTimestamp ? new Date().getTime() : "";
        var random = Math.floor(Math.random() * 10000);
        return "Mock_" + objectType + "_" + timestamp + "_" + random;
    }
    
    /**
     * 获取默认Mock数据
     * @param {string} objectType 对象类型
     * @returns {Object} 默认Mock数据
     */
    function _getDefaultMockData(objectType) {
        var defaults = {
            "Arc": {
                X1: 1000,
                Y1: 1000,
                X2: 2000,
                Y2: 1000,
                Radius: 500,
                StartAngle: 0,
                EndAngle: 180,
                Layer: _config.defaultLayer,
                Width: 10
            },
            "Pad": {
                X: 1000,
                Y: 1000,
                TopX: 50,
                TopY: 100,
                MidX: 50,
                MidY: 100,
                BottomX: 50,
                BottomY: 100,
                HoleSize: 25,
                Layer: _config.defaultLayer,
                PadShape: 0, // Rectangular
                Designator: "1"
            },
            "Track": {
                X1: 1000,
                Y1: 1000,
                X2: 2000,
                Y2: 2000,
                Layer: _config.defaultLayer,
                Width: 10
            },
            "Via": {
                X: 1000,
                Y: 1000,
                HoleSize: 25,
                Diameter: 50,
                StartLayer: "TopLayer",
                EndLayer: "BottomLayer"
            },
            "Board": {
                BoardWidth: 10000,
                BoardHeight: 8000,
                LayerCount: 4,
                Unit: _config.defaultUnit
            },
            "Text": {
                X: 1000,
                Y: 1000,
                Text: "Mock Text",
                Layer: _config.defaultLayer,
                FontSize: 60,
                FontName: "Default"
            },
            "Coordinate": {
                X: 1000,
                Y: 1000,
                Layer: _config.defaultLayer,
                Text: "Origin"
            }
        };
        
        return defaults[objectType] || {};
    }
    
    /**
     * 合并Mock数据
     * @param {Object} defaultData 默认数据
     * @param {Object} userData 用户数据
     * @returns {Object} 合并后的数据
     */
    function _mergeMockData(defaultData, userData) {
        var result = {};
        
        // 复制默认数据
        for (var key in defaultData) {
            if (defaultData.hasOwnProperty(key)) {
                result[key] = defaultData[key];
            }
        }
        
        // 覆盖用户数据
        if (userData) {
            for (var key in userData) {
                if (userData.hasOwnProperty(key)) {
                    result[key] = userData[key];
                }
            }
        }
        
        return result;
    }
    
    /**
     * 更新统计信息
     * @param {string} objectType 对象类型
     * @param {string} templateName 模板名称
     */
    function _updateStatistics(objectType, templateName) {
        _statistics.totalCreated++;
        
        if (!_statistics.byType[objectType]) {
            _statistics.byType[objectType] = 0;
        }
        _statistics.byType[objectType]++;
        
        if (templateName) {
            if (!_statistics.templatesUsed[templateName]) {
                _statistics.templatesUsed[templateName] = 0;
            }
            _statistics.templatesUsed[templateName]++;
        }
    }
    
    /**
     * 验证Mock数据
     * @param {string} objectType 对象类型
     * @param {Object} mockData Mock数据
     * @returns {Object} 验证结果
     */
    function _validateMockData(objectType, mockData) {
        var result = {
            valid: true,
            errors: []
        };
        
        if (!objectType) {
            result.valid = false;
            result.errors.push("Object type is required");
            return result;
        }
        
        if (!mockData || typeof mockData !== "object") {
            result.valid = false;
            result.errors.push("Mock data must be an object");
            return result;
        }
        
        // 类型特定验证
        switch (objectType) {
            case "Arc":
                if (typeof mockData.Radius !== "number" || mockData.Radius <= 0) {
                    result.valid = false;
                    result.errors.push("Arc: Radius must be a positive number");
                }
                break;
                
            case "Pad":
                if (typeof mockData.X !== "number" || typeof mockData.Y !== "number") {
                    result.valid = false;
                    result.errors.push("Pad: X and Y coordinates are required");
                }
                break;
                
            case "Track":
                if (typeof mockData.X1 !== "number" || typeof mockData.Y1 !== "number" ||
                    typeof mockData.X2 !== "number" || typeof mockData.Y2 !== "number") {
                    result.valid = false;
                    result.errors.push("Track: X1, Y1, X2, Y2 coordinates are required");
                }
                break;
                
            case "Via":
                if (typeof mockData.X !== "number" || typeof mockData.Y !== "number") {
                    result.valid = false;
                    result.errors.push("Via: X and Y coordinates are required");
                }
                break;
        }
        
        return result;
    }
    
    // -------------------------------------------------------------
    // 公共接口
    // -------------------------------------------------------------
    
    /**
     * 注册Mock模板
     * @param {string} templateName 模板名称
     * @param {string} objectType 对象类型
     * @param {Object} templateData 模板数据
     */
    function registerMockTemplate(templateName, objectType, templateData) {
        if (!templateName || !objectType || !templateData) {
            throw new Error("MockSystem.registerMockTemplate: templateName, objectType and templateData are required");
        }
        
        _mockTemplates[templateName] = {
            objectType: objectType,
            data: templateData,
            createdAt: new Date().getTime()
        };
    }
    
    /**
     * 创建Mock对象
     * @param {string} objectType 对象类型
     * @param {Object} mockData Mock数据
     * @returns {Object} Mock对象
     */
    function createMockObject(objectType, mockData) {
        if (!objectType) {
            throw new Error("MockSystem.createMockObject: objectType is required");
        }
        
        // 获取默认数据
        var defaultData = _getDefaultMockData(objectType);
        
        // 合并数据
        var finalData = _mergeMockData(defaultData, mockData);
        
        // 验证数据
        var validation = _validateMockData(objectType, finalData);
        if (!validation.valid) {
            throw new Error("MockSystem.createMockObject: Validation failed - " + validation.errors.join(", "));
        }
        
        // 生成Mock ID
        var mockId = _generateMockId(objectType);
        
        // 创建Mock对象
        var mockObject = {
            mockId: mockId,
            objectType: objectType,
            data: finalData,
            isMock: true,
            createdAt: new Date().getTime()
        };
        
        // 添加Mock方法
        mockObject.GetState_String = function() {
            return "Mock_" + objectType;
        };
        
        mockObject.GetObjectId = function() {
            return mockId;
        };
        
        // 存储Mock对象
        _mockObjects[mockId] = mockObject;
        
        // 更新统计
        _updateStatistics(objectType, null);
        
        return mockObject;
    }
    
    /**
     * 从模板创建Mock对象
     * @param {string} templateName 模板名称
     * @param {Object} overrides 覆盖数据
     * @returns {Object} Mock对象
     */
    function createMockFromTemplate(templateName, overrides) {
        if (!templateName || !_mockTemplates[templateName]) {
            throw new Error("MockSystem.createMockFromTemplate: Template not found - " + templateName);
        }
        
        var template = _mockTemplates[templateName];
        var mockData = _mergeMockData(template.data, overrides);
        
        var mockObject = createMockObject(template.objectType, mockData);
        
        // 更新统计
        _updateStatistics(template.objectType, templateName);
        
        return mockObject;
    }
    
    /**
     * 批量创建Mock对象
     * @param {Array} mockList Mock对象列表
     * @returns {Object} 批量创建结果
     */
    function createBatchMockObjects(mockList) {
        if (!mockList || !Array.isArray(mockList)) {
            throw new Error("MockSystem.createBatchMockObjects: mockList must be an array");
        }
        
        var result = {
            success: [],
            failed: [],
            totalCount: mockList.length,
            successCount: 0,
            failedCount: 0
        };
        
        for (var i = 0; i < mockList.length; i++) {
            var item = mockList[i];
            
            try {
                var mockObject;
                
                if (item.templateName) {
                    mockObject = createMockFromTemplate(item.templateName, item.overrides);
                } else if (item.objectType) {
                    mockObject = createMockObject(item.objectType, item.mockData);
                } else {
                    throw new Error("Invalid item: neither templateName nor objectType provided");
                }
                
                result.success.push(mockObject);
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
        
        return result;
    }
    
    /**
     * 获取Mock对象
     * @param {string} mockId Mock ID
     * @returns {Object} Mock对象
     */
    function getMockObject(mockId) {
        return _mockObjects[mockId] || null;
    }
    
    /**
     * 删除Mock对象
     * @param {string} mockId Mock ID
     * @returns {boolean} 是否成功
     */
    function removeMockObject(mockId) {
        if (_mockObjects[mockId]) {
            delete _mockObjects[mockId];
            return true;
        }
        return false;
    }
    
    /**
     * 获取所有Mock对象
     * @returns {Array} Mock对象列表
     */
    function getAllMockObjects() {
        var result = [];
        for (var mockId in _mockObjects) {
            if (_mockObjects.hasOwnProperty(mockId)) {
                result.push(_mockObjects[mockId]);
            }
        }
        return result;
    }
    
    /**
     * 按类型获取Mock对象
     * @param {string} objectType 对象类型
     * @returns {Array} Mock对象列表
     */
    function getMockObjectsByType(objectType) {
        var result = [];
        for (var mockId in _mockObjects) {
            if (_mockObjects.hasOwnProperty(mockId)) {
                var mockObj = _mockObjects[mockId];
                if (mockObj.objectType === objectType) {
                    result.push(mockObj);
                }
            }
        }
        return result;
    }
    
    /**
     * 获取Mock模板列表
     * @returns {Array} 模板列表
     */
    function getMockTemplates() {
        var result = [];
        for (var templateName in _mockTemplates) {
            if (_mockTemplates.hasOwnProperty(templateName)) {
                var template = _mockTemplates[templateName];
                result.push({
                    name: templateName,
                    objectType: template.objectType,
                    createdAt: template.createdAt
                });
            }
        }
        return result;
    }
    
    /**
     * 获取支持的对象类型
     * @returns {Array} 支持的类型列表
     */
    function getSupportedObjectTypes() {
        return [
            "Arc", "Pad", "Track", "Via", "Board", 
            "Text", "Coordinate", "Region", "Fill", "Dimension"
        ];
    }
    
    /**
     * 配置Mock系统
     * @param {Object} config 配置选项
     */
    function configure(config) {
        if (!config) {
            return;
        }
        
        for (var key in config) {
            if (config.hasOwnProperty(key) && _config.hasOwnProperty(key)) {
                _config[key] = config[key];
            }
        }
    }
    
    /**
     * 获取配置
     * @returns {Object} 当前配置
     */
    function getConfiguration() {
        var result = {};
        for (var key in _config) {
            if (_config.hasOwnProperty(key)) {
                result[key] = _config[key];
            }
        }
        return result;
    }
    
    /**
     * 获取统计信息
     * @returns {Object} 统计信息
     */
    function getMockStatistics() {
        return {
            totalCreated: _statistics.totalCreated,
            byType: _statistics.byType,
            templatesUsed: _statistics.templatesUsed,
            templateCount: Object.keys(_mockTemplates).length,
            activeMockObjects: Object.keys(_mockObjects).length,
            supportedTypes: getSupportedObjectTypes(),
            configuration: getConfiguration()
        };
    }
    
    /**
     * 清理所有Mock对象
     */
    function clearAllMockObjects() {
        _mockObjects = {};
    }
    
    /**
     * 清理Mock模板
     */
    function clearMockTemplates() {
        _mockTemplates = {};
    }
    
    /**
     * 重置统计信息
     */
    function resetMockStatistics() {
        _statistics = {
            totalCreated: 0,
            byType: {},
            templatesUsed: {}
        };
    }
    
    /**
     * 清理Mock系统
     */
    function cleanup() {
        clearAllMockObjects();
        clearMockTemplates();
        resetMockStatistics();
    }
    
    // -------------------------------------------------------------
    // 初始化默认模板
    // -------------------------------------------------------------
    
    /**
     * 初始化默认Mock模板
     */
    function initializeDefaultTemplates() {
        // 标准焊盘模板
        registerMockTemplate("StandardPad", "Pad", {
            X: 0,
            Y: 0,
            TopX: 60,
            TopY: 100,
            MidX: 60,
            MidY: 100,
            BottomX: 60,
            BottomY: 100,
            HoleSize: 30,
            Layer: "MultiLayer",
            PadShape: 0,
            Designator: "1"
        });
        
        // 标准过孔模板
        registerMockTemplate("StandardVia", "Via", {
            X: 0,
            Y: 0,
            HoleSize: 20,
            Diameter: 40,
            StartLayer: "TopLayer",
            EndLayer: "BottomLayer"
        });
        
        // 标准走线模板
        registerMockTemplate("StandardTrack", "Track", {
            X1: 0,
            Y1: 0,
            X2: 1000,
            Y2: 0,
            Layer: "TopLayer",
            Width: 10
        });
        
        // 标准圆弧模板
        registerMockTemplate("StandardArc", "Arc", {
            X1: 0,
            Y1: 0,
            X2: 1000,
            Y2: 0,
            Radius: 500,
            StartAngle: 0,
            EndAngle: 180,
            Layer: "TopLayer",
            Width: 10
        });
    }
    
    // 自动初始化默认模板
    initializeDefaultTemplates();
    
    // -------------------------------------------------------------
    // 导出接口
    // -------------------------------------------------------------
    
    return {
        // Mock对象创建
        createMockObject: createMockObject,
        createMockFromTemplate: createMockFromTemplate,
        createBatchMockObjects: createBatchMockObjects,
        
        // Mock对象管理
        getMockObject: getMockObject,
        removeMockObject: removeMockObject,
        getAllMockObjects: getAllMockObjects,
        getMockObjectsByType: getMockObjectsByType,
        
        // Mock模板管理
        registerMockTemplate: registerMockTemplate,
        getMockTemplates: getMockTemplates,
        
        // 查询方法
        getSupportedObjectTypes: getSupportedObjectTypes,
        
        // 配置和统计
        configure: configure,
        getConfiguration: getConfiguration,
        getMockStatistics: getMockStatistics,
        
        // 维护操作
        clearAllMockObjects: clearAllMockObjects,
        clearMockTemplates: clearMockTemplates,
        resetMockStatistics: resetMockStatistics,
        cleanup: cleanup
    };
    
})();
