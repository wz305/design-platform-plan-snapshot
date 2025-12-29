// ==========================================================
// AD API Mock - 最小实现版本
// 用于Debug Runtime的AD环境模拟
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 全局常量定义
// ==========================================================
var eTrackObject = 1;
var ePadObject = 2;
var eViaObject = 3;
var eArcObject = 4;
var eComponentObject = 5;

var eTopLayer = 0;
var eBottomLayer = 1;
var eMultiLayer = 32;

var eProcessAll = 0;
var eProcessFree = 1;
var eProcessComponents = 2;

var c_Broadcast = 0xFFFFFFFF;
var PCBM_BoardRegisteration = 1;
var PCBM_BeginModify = 2;
var PCBM_EndModify = 3;

var eNoDimension = 0;
var eCreate_Default = 0;

// ==========================================================
// 全局状态管理
// ==========================================================
var _MockState = {
    currentBoard: null,
    currentLibrary: null,
    objectCounter: 1000,
    iterators: [],
    preProcessActive: false
};

// ==========================================================
// Mock数据定义
// ==========================================================
var _MockData = {
    board: {
        fileName: "MockBoard.PcbDoc",
        isLibrary: false,
        currentLayer: eTopLayer,
        objects: [
            { 
                type: "track", 
                id: 1001,
                x: 1000, 
                y: 2000, 
                x1: 1000, 
                y1: 2000, 
                x2: 2000, 
                y2: 2000,
                width: 100, 
                layer: eTopLayer,
                net: { name: "GND" }
            },
            { 
                type: "pad", 
                id: 1002,
                x: 1500, 
                y: 2500, 
                topXSize: 80, 
                topYSize: 80,
                holeSize: 40, 
                layer: eMultiLayer,
                name: "1"
            },
            { 
                type: "via", 
                id: 1003,
                x: 2000, 
                y: 3000, 
                size: 60, 
                holeSize: 30, 
                lowLayer: eTopLayer, 
                highLayer: eBottomLayer
            }
        ],
        layerStack: {
            layers: [
                { layerID: eTopLayer, name: "Top Layer", isUsed: true },
                { layerID: eBottomLayer, name: "Bottom Layer", isUsed: false }
            ]
        }
    },
    
    library: {
        fileName: "MockLib.PcbLib",
        components: [
            {
                name: "TestComponent",
                objects: []
            }
        ],
        currentComponent: null
    }
};

// ==========================================================
// 工具函数
// ==========================================================

/**
 * 创建唯一的对象地址
 * @return {Number} 唯一地址
 */
function _createObjectAddress() {
    _MockState.objectCounter++;
    return _MockState.objectCounter;
}

/**
 * 查找对象
 * @param {Number} objectId - 对象ID
 * @return {Object|null} 对象或null
 */
function _findObject(objectId) {
    for (var i = 0; i < _MockData.board.objects.length; i++) {
        if (_MockData.board.objects[i].id === objectId) {
            return _MockData.board.objects[i];
        }
    }
    return null;
}

/**
 * 创建Mock对象的接口封装
 * @param {Object} mockData - Mock数据
 * @return {Object} 接口对象
 */
function _createObjectInterface(mockData) {
    if (!mockData) {
        return null;
    }
    
    var interface = {
        I_ObjectAddress: mockData.id
    };
    
    // 根据类型添加特定属性
    if (mockData.type === "track") {
        interface.X = mockData.x;
        interface.Y = mockData.y;
        interface.X1 = mockData.x1;
        interface.Y1 = mockData.y1;
        interface.X2 = mockData.x2;
        interface.Y2 = mockData.y2;
        interface.Width = mockData.width;
        interface.Layer = mockData.layer;
        interface.Net = mockData.net;
    } else if (mockData.type === "pad") {
        interface.X = mockData.x;
        interface.Y = mockData.y;
        interface.TopXSize = mockData.topXSize;
        interface.TopYSize = mockData.topYSize;
        interface.HoleSize = mockData.holeSize;
        interface.Layer = mockData.layer;
        interface.Name = mockData.name;
    } else if (mockData.type === "via") {
        interface.X = mockData.x;
        interface.Y = mockData.y;
        interface.Size = mockData.size;
        interface.HoleSize = mockData.holeSize;
        interface.LowLayer = mockData.lowLayer;
        interface.HighLayer = mockData.highLayer;
    }
    
    return interface;
}

// ==========================================================
// PCBServer 全局函数
// ==========================================================

/**
 * PCBServer全局函数
 * @return {Object} IPCB_ServerInterface Mock
 */
function PCBServer() {
    return {
        GetCurrentPCBBoard: function() {
            return _MockState.currentBoard;
        },
        
        GetCurrentPCBLibrary: function() {
            return _MockState.currentLibrary;
        },
        
        PCBObjectFactory: function(objectId, dimensionKind, creationMode) {
            // 调用分析器记录函数调用
            var args = Array.prototype.slice.call(arguments);
            var result = null;
            
            // 记录函数调用到值历史追踪器
            if (typeof ValueHistoryTracker !== "undefined") {
                ValueHistoryTracker.recordFunctionReturn("PCBObjectFactory", null, args, "mock_call", "ad-mock.js:PCBObjectFactory");
            }
            
            // 调用期望引擎验证
            if (typeof ExpectationEngine !== "undefined") {
                ExpectationEngine.validateFunctionCall("PCBObjectFactory", this, args, result, "mock_call", "ad-mock.js:PCBObjectFactory");
            }
            
            var mockObject = {
                type: null,
                id: _createObjectAddress()
            };
            
            // 根据objectId确定类型
            if (objectId === eTrackObject) {
                mockObject.type = "track";
                mockObject.x = 0;
                mockObject.y = 0;
                mockObject.x1 = 0;
                mockObject.y1 = 0;
                mockObject.x2 = 1000;
                mockObject.y2 = 1000;
                mockObject.width = 100;
                mockObject.layer = eTopLayer;
                mockObject.net = { name: "" };
            } else if (objectId === ePadObject) {
                mockObject.type = "pad";
                mockObject.x = 0;
                mockObject.y = 0;
                mockObject.topXSize = 80;
                mockObject.topYSize = 80;
                mockObject.holeSize = 40;
                mockObject.layer = eMultiLayer;
                mockObject.name = "1";
            } else if (objectId === eViaObject) {
                mockObject.type = "via";
                mockObject.x = 0;
                mockObject.y = 0;
                mockObject.size = 60;
                mockObject.holeSize = 30;
                mockObject.lowLayer = eTopLayer;
                mockObject.highLayer = eBottomLayer;
            }
            
            result = _createObjectInterface(mockObject);
            
            // 记录对象创建
            if (typeof ValueHistoryTracker !== "undefined") {
                ValueHistoryTracker.recordObjectCreation(mockObject.type, result, "PCBObjectFactory", "mock_call", "ad-mock.js:PCBObjectFactory");
            }
            
            return result;
        },
        
        CreatePCBLibComp: function() {
            var mockComponent = {
                name: "NewComponent",
                objects: []
            };
            
            return {
                Name: mockComponent.name,
                AddPCBObject: function(obj) {
                    mockComponent.objects.push(obj);
                }
            };
        },
        
        PreProcess: function() {
            _MockState.preProcessActive = true;
        },
        
        PostProcess: function() {
            _MockState.preProcessActive = false;
        },
        
        SendMessageToRobots: function(source, destination, messageId, messageData) {
            // Mock实现，仅记录日志
            console.log("[AD Mock] SendMessageToRobots: " + messageId);
        }
    };
}

// ==========================================================
// IPCB_Board Mock
// ==========================================================

function _createBoardInterface() {
    return {
        FileName: _MockData.board.fileName,
        IsLibrary: _MockData.board.isLibrary,
        CurrentLayer: _MockData.board.currentLayer,
        LayerStack: _createLayerStackInterface(),
        
        BoardIterator_Create: function() {
            var iterator = {
                type: "board",
                index: -1,
                filters: {
                    objectSet: null,
                    layerSet: null,
                    method: eProcessAll
                },
                filteredObjects: []
            };
            
            _MockState.iterators.push(iterator);
            
            return {
                AddFilter_ObjectSet: function(objectSet) {
                    iterator.filters.objectSet = objectSet;
                },
                
                AddFilter_LayerSet: function(layerSet) {
                    iterator.filters.layerSet = layerSet;
                },
                
                AddFilter_Method: function(method) {
                    iterator.filters.method = method;
                },
                
                FirstPCBObject: function() {
                    // 应用过滤器
                    iterator.filteredObjects = [];
                    for (var i = 0; i < _MockData.board.objects.length; i++) {
                        var obj = _MockData.board.objects[i];
                        
                        // 对象类型过滤
                        if (iterator.filters.objectSet) {
                            // 简化实现：假设objectSet包含允许的类型
                            var typeMatch = true; // 这里应该检查obj.type是否在objectSet中
                            if (!typeMatch) continue;
                        }
                        
                        // 层过滤
                        if (iterator.filters.layerSet) {
                            // 简化实现：假设layerSet包含允许的层
                            var layerMatch = true; // 这里应该检查obj.layer是否在layerSet中
                            if (!layerMatch) continue;
                        }
                        
                        iterator.filteredObjects.push(_createObjectInterface(obj));
                    }
                    
                    iterator.index = 0;
                    if (iterator.filteredObjects.length > 0) {
                        return iterator.filteredObjects[0];
                    }
                    return null;
                },
                
                NextPCBObject: function() {
                    iterator.index++;
                    if (iterator.index < iterator.filteredObjects.length) {
                        return iterator.filteredObjects[iterator.index];
                    }
                    return null;
                }
            };
        },
        
        BoardIterator_Destroy: function(iterator) {
            for (var i = 0; i < _MockState.iterators.length; i++) {
                if (_MockState.iterators[i] === iterator) {
                    _MockState.iterators.splice(i, 1);
                    break;
                }
            }
        },
        
        SpatialIterator_Create: function() {
            var iterator = {
                type: "spatial",
                index: -1,
                area: { x1: 0, y1: 0, x2: 10000, y2: 10000 },
                filters: {
                    objectSet: null,
                    layerSet: null
                },
                filteredObjects: []
            };
            
            _MockState.iterators.push(iterator);
            
            return {
                AddFilter_ObjectSet: function(objectSet) {
                    iterator.filters.objectSet = objectSet;
                },
                
                AddFilter_LayerSet: function(layerSet) {
                    iterator.filters.layerSet = layerSet;
                },
                
                AddFilter_Area: function(x1, y1, x2, y2) {
                    iterator.area = { x1: x1, y1: y1, x2: x2, y2: y2 };
                },
                
                FirstPCBObject: function() {
                    iterator.filteredObjects = [];
                    for (var i = 0; i < _MockData.board.objects.length; i++) {
                        var obj = _MockData.board.objects[i];
                        
                        // 区域过滤
                        if (obj.x < iterator.area.x1 || obj.x > iterator.area.x2 ||
                            obj.y < iterator.area.y1 || obj.y > iterator.area.y2) {
                            continue;
                        }
                        
                        iterator.filteredObjects.push(_createObjectInterface(obj));
                    }
                    
                    iterator.index = 0;
                    if (iterator.filteredObjects.length > 0) {
                        return iterator.filteredObjects[0];
                    }
                    return null;
                },
                
                NextPCBObject: function() {
                    iterator.index++;
                    if (iterator.index < iterator.filteredObjects.length) {
                        return iterator.filteredObjects[iterator.index];
                    }
                    return null;
                }
            };
        },
        
        SpatialIterator_Destroy: function(iterator) {
            for (var i = 0; i < _MockState.iterators.length; i++) {
                if (_MockState.iterators[i] === iterator) {
                    _MockState.iterators.splice(i, 1);
                    break;
                }
            }
        },
        
        AddPCBObject: function(pcbObject) {
            // 检查null对象
            if (pcbObject === null || pcbObject === undefined) {
                console.log("[AD Mock] AddPCBObject: 尝试添加null对象");
                
                // 记录违规到控制台（ExpectationEngine没有reportViolation方法）
                if (typeof ExpectationEngine !== "undefined") {
                    console.log("[AD Mock] 检测到违规: NULL_OBJECT_ADD - 尝试添加null对象到PCB");
                }
                
                throw new Error("Cannot read properties of null (reading 'I_ObjectAddress')");
            }
            
            // 检查I_ObjectAddress属性
            if (pcbObject.I_ObjectAddress === undefined) {
                console.log("[AD Mock] AddPCBObject: 对象缺少I_ObjectAddress属性");
                
                // 记录违规到控制台（ExpectationEngine没有reportViolation方法）
                if (typeof ExpectationEngine !== "undefined") {
                    console.log("[AD Mock] 检测到违规: MISSING_REQUIRED_PROPERTY - 对象缺少必需的I_ObjectAddress属性");
                }
                
                throw new Error("对象缺少必需的I_ObjectAddress属性");
            }
            
            // 调用分析器记录函数调用
            var args = Array.prototype.slice.call(arguments);
            
            // 记录函数调用到值历史追踪器
            if (typeof ValueHistoryTracker !== "undefined") {
                ValueHistoryTracker.recordFunctionReturn("AddPCBObject", null, args, "mock_call", "ad-mock.js:AddPCBObject");
            }
            
            // 调用期望引擎验证
            if (typeof ExpectationEngine !== "undefined") {
                ExpectationEngine.validateFunctionCall("AddPCBObject", this, args, undefined, "mock_call", "ad-mock.js:AddPCBObject");
            }
            
            // 从接口对象提取Mock数据
            var mockData = {
                type: "unknown",
                id: pcbObject.I_ObjectAddress
            };
            
            // 根据属性确定类型
            if (pcbObject.Width !== undefined) {
                mockData.type = "track";
                mockData.x = pcbObject.X || 0;
                mockData.y = pcbObject.Y || 0;
                mockData.x1 = pcbObject.X1 || 0;
                mockData.y1 = pcbObject.Y1 || 0;
                mockData.x2 = pcbObject.X2 || 0;
                mockData.y2 = pcbObject.Y2 || 0;
                mockData.width = pcbObject.Width || 100;
                mockData.layer = pcbObject.Layer || eTopLayer;
            } else if (pcbObject.HoleSize !== undefined) {
                if (pcbObject.LowLayer !== undefined) {
                    mockData.type = "via";
                    mockData.size = pcbObject.Size || 60;
                    mockData.holeSize = pcbObject.HoleSize || 30;
                    mockData.lowLayer = pcbObject.LowLayer || eTopLayer;
                    mockData.highLayer = pcbObject.HighLayer || eBottomLayer;
                } else {
                    mockData.type = "pad";
                    mockData.topXSize = pcbObject.TopXSize || 80;
                    mockData.topYSize = pcbObject.TopYSize || 80;
                    mockData.holeSize = pcbObject.HoleSize || 40;
                    mockData.layer = pcbObject.Layer || eMultiLayer;
                    mockData.name = pcbObject.Name || "1";
                }
            }
            
            _MockData.board.objects.push(mockData);
            
            console.log("[AD Mock] AddPCBObject: 已添加对象类型 " + mockData.type + " (ID: " + mockData.id + ")");
        },
        
        RemovePCBObject: function(pcbObject) {
            for (var i = 0; i < _MockData.board.objects.length; i++) {
                if (_MockData.board.objects[i].id === pcbObject.I_ObjectAddress) {
                    _MockData.board.objects.splice(i, 1);
                    break;
                }
            }
        },
        
        GetObjectAtCursor: function(objectSet, layerSet, statusBarText) {
            // 返回第一个对象作为Mock
            if (_MockData.board.objects.length > 0) {
                return _createObjectInterface(_MockData.board.objects[0]);
            }
            return null;
        },
        
        ChooseLocation: function(x, y, prompt) {
            // Mock实现：返回预定义坐标
            if (typeof x === "object" && x !== null) {
                x.value = 1500;
            }
            if (typeof y === "object" && y !== null) {
                y.value = 1500;
            }
            return true;
        }
    };
}

// ==========================================================
// LayerStack Mock
// ==========================================================

function _createLayerStackInterface() {
    return {
        LayerObject: {},
        FirstLayer: function() {
            if (_MockData.board.layerStack.layers.length > 0) {
                return _MockData.board.layerStack.layers[0];
            }
            return null;
        },
        NextLayer: function(layerObj) {
            for (var i = 0; i < _MockData.board.layerStack.layers.length - 1; i++) {
                if (_MockData.board.layerStack.layers[i] === layerObj) {
                    return _MockData.board.layerStack.layers[i + 1];
                }
            }
            return null;
        }
    };
}

// ==========================================================
// 初始化函数
// ==========================================================

/**
 * 初始化AD Mock环境
 */
function initializeADMock() {
    _MockState.currentBoard = _createBoardInterface();
    _MockState.currentLibrary = {
        FileName: _MockData.library.fileName,
        RegisterComponent: function(comp) {
            console.log("[AD Mock] RegisterComponent: " + comp.Name);
        },
        CurrentComponent: _MockData.library.currentComponent
    };
    
    console.log("[AD Mock] 初始化完成");
    console.log("[AD Mock] 当前PCB文档: " + _MockState.currentBoard.FileName);
    console.log("[AD Mock] 对象数量: " + _MockData.board.objects.length);
}

/**
 * 重置AD Mock环境
 */
function resetADMock() {
    _MockState.currentBoard = null;
    _MockState.currentLibrary = null;
    _MockState.objectCounter = 1000;
    _MockState.iterators = [];
    _MockState.preProcessActive = false;
    
    console.log("[AD Mock] 重置完成");
}

// ==========================================================
// 导出函数（全局使用）
// ==========================================================
// 在全局作用域暴露初始化函数
if (typeof global !== "undefined") {
    global.initializeADMock = initializeADMock;
    global.resetADMock = resetADMock;
} else {
    this.initializeADMock = initializeADMock;
    this.resetADMock = resetADMock;
}

// 自动初始化
initializeADMock();

// 在Node.js环境中，将PCBServer函数暴露到global
if (typeof global !== "undefined") {
    global.PCBServer = PCBServer;
}

console.log("[AD Mock] ad-mock.js 加载完成");
