/**
 * Object Creator UI - 核心UI逻辑模块
 * 纯大IIFE模块，符合AD环境规范
 */

var ObjectCreatorUI = (function(){
    // 私有变量
    var _controller = null;
    var _config = {};
    
    // 私有初始化函数
    function _initializeController() {
        _controller = {
            currentObjectType: "Track",
            currentPosition: {x: 0, y: 0},
            isGridSnapEnabled: true,
            gridSize: 5,
            ObjectModule: null,
            
            // 获取当前参数
            getCurrentParameters: function() {
                var params = {};
                var objectType = this.currentObjectType;
                
                if (objectType === "Track") {
                    params.width = parseInt(edtTrackWidth.Text) || 10;
                    params.layer = cmbTrackLayer.Text || "Top Layer";
                    params.endX = parseInt(edtTrackEndX.Text) || 1000;
                    params.endY = parseInt(edtTrackEndY.Text) || 0;
                } else if (objectType === "Pad") {
                    params.size = parseInt(edtPadSize.Text) || 100;
                    params.shape = cmbPadShape.Text || "Rectangular";
                    params.layer = cmbPadLayer.Text || "Top Layer";
                    params.designator = edtPadDesignator.Text || "1";
                } else if (objectType === "Via") {
                    params.size = parseInt(edtViaSize.Text) || 50;
                    params.holeSize = parseInt(edtViaHoleSize.Text) || 25;
                    params.startLayer = cmbViaStartLayer.Text || "Top Layer";
                    params.endLayer = cmbViaEndLayer.Text || "Bottom Layer";
                } else if (objectType === "Arc") {
                    params.radius = parseInt(edtArcRadius.Text) || 500;
                    params.startAngle = parseInt(edtArcStartAngle.Text) || 0;
                    params.endAngle = parseInt(edtArcEndAngle.Text) || 90;
                    params.layer = cmbArcLayer.Text || "Top Layer";
                }
                
                return params;
            },
            
            // 验证参数
            validateParameters: function() {
                var params = this.getCurrentParameters();
                var errors = [];
                
                // 基础验证
                if (this.currentObjectType === "Track") {
                    if (params.width <= 0) errors.push("线宽必须大于0");
                    if (params.endX < 0 || params.endY < 0) errors.push("终点坐标不能为负数");
                } else if (this.currentObjectType === "Pad") {
                    if (params.size <= 0) errors.push("焊盘尺寸必须大于0");
                    if (!params.designator) errors.push("焊盘标号不能为空");
                } else if (this.currentObjectType === "Via") {
                    if (params.size <= 0) errors.push("过孔尺寸必须大于0");
                    if (params.holeSize <= 0) errors.push("孔径必须大于0");
                    if (params.holeSize >= params.size) errors.push("孔径必须小于过孔尺寸");
                } else if (this.currentObjectType === "Arc") {
                    if (params.radius <= 0) errors.push("半径必须大于0");
                    if (params.startAngle < 0 || params.startAngle > 360) errors.push("起始角必须在0-360度之间");
                    if (params.endAngle < 0 || params.endAngle > 360) errors.push("结束角必须在0-360度之间");
                }
                
                return {
                    valid: errors.length === 0,
                    errors: errors
                };
            },
            
            // 更新状态显示
            updateStatus: function(message, isError) {
                if (lblStatus) {
                    lblStatus.Caption = message;
                    lblStatus.Font.Color = isError ? clRed : clGreen;
                }
            },
            
            // 更新位置信息
            updatePositionInfo: function() {
                if (lblPositionInfo) {
                    var posText = "当前位置: (" + this.currentPosition.x + ", " + this.currentPosition.y + ")";
                    if (this.currentPosition.x === 0 && this.currentPosition.y === 0) {
                        posText += " - 原点位置";
                    }
                    lblPositionInfo.Caption = posText;
                }
            }
        };
    }
    
    // 公共接口函数
    function create(options) {
        _config = options || {};
        _initializeController();
        return {
            controller: _controller,
            config: _config
        };
    }
    
    function initialize() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 初始化对象创建窗口 ===", null, "ObjectCreatorUI.js", "initialize");
            }
            
            // 检查ObjectModule是否可用
            if (typeof ObjectModule !== "undefined") {
                ObjectModule.initialize({
                    enableLogging: true,
                    enableAutoRegistration: true,
                    enablePositionManagement: true,
                    enableGeometryCalculation: true,
                    defaultLayer: "TopLayer",
                    conflictThreshold: 10
                });
                
                // 存储引用供后续使用
                _controller.ObjectModule = ObjectModule;
            } else {
                throw new Error("ObjectModule not found");
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口初始化完成", null, "ObjectCreatorUI.js", "initialize");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("初始化对象创建窗口失败", {
                    error: error.message,
                    stack: error.stack
                }, "ObjectCreatorUI.js", "initialize");
            }
            throw error;
        }
    }
    
    function showWindow() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 显示对象创建窗口 ===", null, "ObjectCreatorUI.js", "showWindow");
            }
            
            // 显示窗口
            if (ObjectCreatorForm) {
                ObjectCreatorForm.Show();
            } else {
                throw new Error("ObjectCreatorForm not found");
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口已显示", null, "ObjectCreatorUI.js", "showWindow");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("显示对象创建窗口失败", {
                    error: error.message
                }, "ObjectCreatorUI.js", "showWindow");
            }
            throw error;
        }
    }
    
    function hideWindow() {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("隐藏对象创建窗口", null, "ObjectCreatorUI.js", "hideWindow");
            }
            
            if (ObjectCreatorForm) {
                ObjectCreatorForm.Hide();
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("隐藏对象创建窗口失败", {
                    error: error.message
                }, "ObjectCreatorUI.js", "hideWindow");
            }
        }
    }
    
    // 对象类型选择变化处理
    function handleObjectTypeChange(newType) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("对象类型选择变化", {
                    newType: newType
                }, "ObjectCreatorUI.js", "handleObjectTypeChange");
            }
            
            _controller.currentObjectType = newType;
            
            // 隐藏所有参数组
            if (grpTrack) grpTrack.Visible = false;
            if (grpPad) grpPad.Visible = false;
            if (grpVia) grpVia.Visible = false;
            if (grpArc) grpArc.Visible = false;
            
            // 显示对应的参数组
            if (newType === "Track" && grpTrack) {
                grpTrack.Visible = true;
                if (lblDescription) lblDescription.Caption = "创建PCB走线对象，需要设置线宽、图层和终点坐标";
            } else if (newType === "Pad" && grpPad) {
                grpPad.Visible = true;
                if (lblDescription) lblDescription.Caption = "创建PCB焊盘对象，需要设置尺寸、形状和图层";
            } else if (newType === "Via" && grpVia) {
                grpVia.Visible = true;
                if (lblDescription) lblDescription.Caption = "创建PCB过孔对象，需要设置尺寸、孔径和层间连接";
            } else if (newType === "Arc" && grpArc) {
                grpArc.Visible = true;
                if (lblDescription) lblDescription.Caption = "创建PCB圆弧对象，需要设置半径、角度范围和图层";
            }
            
            _controller.updateStatus("就绪 - 已选择 " + newType + " 类型", false);
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("对象类型选择变化处理失败", {
                    error: error.message,
                    newType: newType
                }, "ObjectCreatorUI.js", "handleObjectTypeChange");
            }
        }
    }
    
    // 设为原点处理
    function handleSetOrigin(x, y) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("设为原点", {x: x, y: y}, "ObjectCreatorUI.js", "handleSetOrigin");
            }
            
            // 设置为原点
            _controller.currentPosition = {x: x, y: y};
            
            // 更新位置管理器
            if (typeof PositionManager_GLOBAL !== "undefined") {
                PositionManager_GLOBAL.setOrigin({x: x, y: y});
            }
            
            // 更新显示
            _controller.updatePositionInfo();
            _controller.updateStatus("原点已设置为 (" + x + ", " + y + ")", false);
            
            if (typeof uiInfo === "function") {
                uiInfo("原点设置完成", {x: x, y: y}, "ObjectCreatorUI.js", "handleSetOrigin");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("设为原点失败", {
                    error: error.message,
                    x: x,
                    y: y
                }, "ObjectCreatorUI.js", "handleSetOrigin");
            }
        }
    }
    
    // 创建对象处理
    function handleCreateObject(x, y, atOrigin) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("创建对象", {
                    x: x,
                    y: y,
                    atOrigin: atOrigin
                }, "ObjectCreatorUI.js", "handleCreateObject");
            }
            
            // 检查ObjectModule引用
            if (!_controller.ObjectModule) {
                throw new Error("ObjectModule not available");
            }
            
            // 验证参数
            var paramValidation = _controller.validateParameters();
            if (!paramValidation.valid) {
                var errorMsg = "参数验证失败: " + paramValidation.errors.join("; ");
                _controller.updateStatus(errorMsg, true);
                if (typeof uiWarn === "function") {
                    uiWarn("创建对象失败", {
                        reason: "参数验证失败",
                        errors: paramValidation.errors
                    }, "ObjectCreatorUI.js", "handleCreateObject");
                }
                return {success: false, error: errorMsg};
            }
            
            // 准备Mock数据
            var mockData = _controller.getCurrentParameters();
            var objectType = _controller.currentObjectType;
            
            // 添加位置信息到Mock数据
            if (atOrigin) {
                if (objectType === "Track") {
                    mockData.startX = 0;
                    mockData.startY = 0;
                } else if (objectType === "Pad" || objectType === "Via") {
                    mockData.x = 0;
                    mockData.y = 0;
                } else if (objectType === "Arc") {
                    mockData.centerX = 0;
                    mockData.centerY = 0;
                }
            } else {
                if (objectType === "Track") {
                    mockData.startX = x;
                    mockData.startY = y;
                } else if (objectType === "Pad" || objectType === "Via") {
                    mockData.x = x;
                    mockData.y = y;
                } else if (objectType === "Arc") {
                    mockData.centerX = x;
                    mockData.centerY = y;
                }
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("开始创建对象", {
                    objectType: objectType,
                    position: atOrigin ? {x: 0, y: 0} : {x: x, y: y},
                    mockData: mockData
                }, "ObjectCreatorUI.js", "handleCreateObject");
            }
            
            // 创建Mock对象
            var createdObject = _controller.ObjectModule.createMock(objectType, mockData);
            
            if (createdObject) {
                var successMsg = atOrigin ? "在原点创建对象成功" : "对象创建成功";
                _controller.updateStatus(successMsg, false);
                if (typeof uiInfo === "function") {
                    uiInfo(successMsg, {
                        objectType: objectType,
                        position: atOrigin ? {x: 0, y: 0} : {x: x, y: y},
                        objectId: createdObject.getObjectId ? createdObject.getObjectId() : "unknown"
                    }, "ObjectCreatorUI.js", "handleCreateObject");
                }
                return {success: true, object: createdObject};
            } else {
                throw new Error("创建对象返回null");
            }
            
        } catch (error) {
            var errorMsg = "创建对象失败: " + error.message;
            _controller.updateStatus(errorMsg, true);
            if (typeof uiError === "function") {
                uiError("创建对象失败", {
                    error: error.message,
                    stack: error.stack,
                    objectType: _controller ? _controller.currentObjectType : "unknown"
                }, "ObjectCreatorUI.js", "handleCreateObject");
            }
            return {success: false, error: errorMsg};
        }
    }
    
    // 重置处理
    function handleReset() {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("重置窗口", null, "ObjectCreatorUI.js", "handleReset");
            }
            
            // 重置位置
            edtX.Text = "0";
            edtY.Text = "0";
            _controller.currentPosition = {x: 0, y: 0};
            
            // 重置网格设置
            chkGridSnap.Checked = true;
            edtGridSize.Text = "5";
            _controller.isGridSnapEnabled = true;
            _controller.gridSize = 5;
            
            // 重置对象类型
            cmbObjectType.ItemIndex = 0;
            handleObjectTypeChange("Track");
            
            // 重置参数为默认值
            if (edtTrackWidth) edtTrackWidth.Text = "10";
            if (edtTrackEndX) edtTrackEndX.Text = "1000";
            if (edtTrackEndY) edtTrackEndY.Text = "0";
            if (cmbTrackLayer) cmbTrackLayer.ItemIndex = 0;
            
            if (edtPadSize) edtPadSize.Text = "100";
            if (edtPadDesignator) edtPadDesignator.Text = "1";
            if (cmbPadShape) cmbPadShape.ItemIndex = 0;
            if (cmbPadLayer) cmbPadLayer.ItemIndex = 0;
            
            if (edtViaSize) edtViaSize.Text = "50";
            if (edtViaHoleSize) edtViaHoleSize.Text = "25";
            if (cmbViaStartLayer) cmbViaStartLayer.ItemIndex = 0;
            if (cmbViaEndLayer) cmbViaEndLayer.ItemIndex = 0;
            
            if (edtArcRadius) edtArcRadius.Text = "500";
            if (edtArcStartAngle) edtArcStartAngle.Text = "0";
            if (edtArcEndAngle) edtArcEndAngle.Text = "90";
            if (cmbArcLayer) cmbArcLayer.ItemIndex = 0;
            
            // 更新显示
            _controller.updatePositionInfo();
            _controller.updateStatus("已重置为默认值", false);
            
            if (typeof uiInfo === "function") {
                uiInfo("窗口已重置", null, "ObjectCreatorUI.js", "handleReset");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("重置失败", {
                    error: error.message
                }, "ObjectCreatorUI.js", "handleReset");
            }
        }
    }
    
    // 返回模块接口对象
    return {
        create: create,
        initialize: initialize,
        showWindow: showWindow,
        hideWindow: hideWindow,
        handleObjectTypeChange: handleObjectTypeChange,
        handleSetOrigin: handleSetOrigin,
        handleCreateObject: handleCreateObject,
        handleReset: handleReset,
        controller: function() { return _controller; }
    };
})();
