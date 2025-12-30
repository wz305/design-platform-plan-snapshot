/**
 * UI Event Manager - 事件管理器模块
 * 纯大IIFE模块，符合AD环境规范
 */

var UIEventManager = (function(){
    // 私有变量
    var _eventsBound = false;
    var _config = {};
    
    // 私有事件处理函数
    function _handleObjectTypeChange(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("对象类型选择变化事件", {
                    newType: cmbObjectType ? cmbObjectType.Text : "unknown"
                }, "UIEventManager.js", "_handleObjectTypeChange");
            }
            
            // 使用ObjectCreatorUI处理
            if (typeof ObjectCreatorUI !== "undefined") {
                var newType = cmbObjectType ? cmbObjectType.Text : "Track";
                ObjectCreatorUI.handleObjectTypeChange(newType);
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("对象类型选择变化事件处理失败", {
                    error: error.message,
                    newType: cmbObjectType ? cmbObjectType.Text : "unknown"
                }, "UIEventManager.js", "_handleObjectTypeChange");
            }
        }
    }
    
    function _handleSetOriginClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("设为原点按钮点击事件", null, "UIEventManager.js", "_handleSetOriginClick");
            }
            
            // 获取当前位置
            var x = parseInt(edtX.Text) || 0;
            var y = parseInt(edtY.Text) || 0;
            
            // 使用ObjectCreatorUI处理
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.handleSetOrigin(x, y);
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("设为原点按钮点击事件处理失败", {
                    error: error.message,
                    x: edtX ? edtX.Text : "unknown",
                    y: edtY ? edtY.Text : "unknown"
                }, "UIEventManager.js", "_handleSetOriginClick");
            }
        }
    }
    
    function _handleValidateClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("验证参数按钮点击事件", null, "UIEventManager.js", "_handleValidateClick");
            }
            
            // 验证位置
            var x = parseInt(edtX.Text) || 0;
            var y = parseInt(edtY.Text) || 0;
            
            var positionValid = true;
            var positionErrors = [];
            
            if (isNaN(x) || isNaN(y)) {
                positionValid = false;
                positionErrors.push("坐标必须是有效数字");
            }
            
            // 使用ObjectCreatorUI验证参数
            var paramValidation = {valid: true, errors: []};
            if (typeof ObjectCreatorUI !== "undefined") {
                var controller = ObjectCreatorUI.controller();
                if (controller && controller.validateParameters) {
                    paramValidation = controller.validateParameters();
                }
            }
            
            var allValid = positionValid && paramValidation.valid;
            var allErrors = positionErrors.concat(paramValidation.errors);
            
            if (allValid) {
                if (typeof ObjectCreatorUI !== "undefined") {
                    var controller = ObjectCreatorUI.controller();
                    if (controller && controller.updateStatus) {
                        controller.updateStatus("参数验证通过", false);
                    }
                }
                if (typeof uiInfo === "function") {
                    uiInfo("参数验证通过", {
                        position: {x: x, y: y},
                        parameters: paramValidation
                    }, "UIEventManager.js", "_handleValidateClick");
                }
            } else {
                var errorMsg = "验证失败: " + allErrors.join("; ");
                if (typeof ObjectCreatorUI !== "undefined") {
                    var controller = ObjectCreatorUI.controller();
                    if (controller && controller.updateStatus) {
                        controller.updateStatus(errorMsg, true);
                    }
                }
                if (typeof uiWarn === "function") {
                    uiWarn("参数验证失败", {
                        errors: allErrors
                    }, "UIEventManager.js", "_handleValidateClick");
                }
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("参数验证按钮点击事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleValidateClick");
            }
        }
    }
    
    function _handleCreateClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("创建对象按钮点击事件", null, "UIEventManager.js", "_handleCreateClick");
            }
            
            // 获取位置
            var x = parseInt(edtX.Text) || 0;
            var y = parseInt(edtY.Text) || 0;
            
            // 使用ObjectCreatorUI处理
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.handleCreateObject(x, y, false);
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("创建对象按钮点击事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleCreateClick");
            }
        }
    }
    
    function _handleCreateAtOriginClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("在原点创建按钮点击事件", null, "UIEventManager.js", "_handleCreateAtOriginClick");
            }
            
            // 使用ObjectCreatorUI处理
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.handleCreateObject(0, 0, true);
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("在原点创建按钮点击事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleCreateAtOriginClick");
            }
        }
    }
    
    function _handleResetClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("重置按钮点击事件", null, "UIEventManager.js", "_handleResetClick");
            }
            
            // 使用ObjectCreatorUI处理
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.handleReset();
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("重置按钮点击事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleResetClick");
            }
        }
    }
    
    function _handleCancelClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("取消按钮点击事件", null, "UIEventManager.js", "_handleCancelClick");
            }

            if (typeof 请求停止_当前任务 === "function") {
                try { 请求停止_当前任务("ui.cancel", "ui"); } catch (eStop) {}
            }

            // 关闭窗口
            if (ObjectCreatorForm) {
                ObjectCreatorForm.Close();
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口已关闭", null, "UIEventManager.js", "_handleCancelClick");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("取消按钮点击事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleCancelClick");
            }
        }
    }
    
    function _handleGridSnapClick(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("网格对齐复选框变化事件", {
                    enabled: chkGridSnap ? chkGridSnap.Checked : false
                }, "UIEventManager.js", "_handleGridSnapClick");
            }
            
            // 使用ObjectCreatorUI更新状态
            if (typeof ObjectCreatorUI !== "undefined") {
                var controller = ObjectCreatorUI.controller();
                if (controller) {
                    controller.isGridSnapEnabled = chkGridSnap ? chkGridSnap.Checked : false;
                }
            }
            
            // 更新位置管理器
            if (typeof PositionManager_GLOBAL !== "undefined") {
                PositionManager_GLOBAL.configureCoordinateSystem({
                    enableGridSnap: chkGridSnap ? chkGridSnap.Checked : false,
                    gridSize: parseInt(edtGridSize.Text) || 5
                });
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("网格对齐复选框变化事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleGridSnapClick");
            }
        }
    }
    
    function _handleGridSizeChange(Sender) {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("网格大小编辑框变化事件", {
                    gridSize: edtGridSize ? edtGridSize.Text : "5"
                }, "UIEventManager.js", "_handleGridSizeChange");
            }
            
            var gridSize = parseInt(edtGridSize.Text) || 5;
            
            // 使用ObjectCreatorUI更新状态
            if (typeof ObjectCreatorUI !== "undefined") {
                var controller = ObjectCreatorUI.controller();
                if (controller) {
                    controller.gridSize = gridSize;
                }
            }
            
            // 更新位置管理器
            if (typeof PositionManager_GLOBAL !== "undefined") {
                PositionManager_GLOBAL.configureCoordinateSystem({
                    gridSize: gridSize,
                    enableGridSnap: chkGridSnap ? chkGridSnap.Checked : false
                });
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("网格大小编辑框变化事件处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleGridSizeChange");
            }
        }
    }
    
    function _handleHttpSmokeTestClick(Sender) {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 开始最小通信测试(HTTP) ===", {
                    sender: Sender ? "有效" : "无效"
                }, "UIEventManager.js", "_handleHttpSmokeTestClick");
            }

            if (typeof 测试_AD_Spec_0_1_一键验证 === "function") {
                测试_AD_Spec_0_1_一键验证();
                if (typeof uiInfo === "function") {
                    uiInfo("=== Spec0.1 一键验证已触发 ===", null, "UIEventManager.js", "_handleHttpSmokeTestClick");
                }
                return;
            }

            if (typeof 测试_AD_XMLHTTP_最小验证 === "function") {
                测试_AD_XMLHTTP_最小验证();
                
                if (typeof uiInfo === "function") {
                    uiInfo("=== 最小通信测试(HTTP) 已触发 ===", null, "UIEventManager.js", "_handleHttpSmokeTestClick");
                }
            } else if (typeof 测试_最小通信流程 === "function") {
                测试_最小通信流程();
                
                if (typeof uiInfo === "function") {
                    uiInfo("=== 最小通信测试(HTTP) 已触发 ===", null, "UIEventManager.js", "_handleHttpSmokeTestClick");
                }
            } else {
                if (typeof uiWarn === "function") {
                    uiWarn("测试入口不可用，已跳过", {
                        testFn: typeof 测试_AD_XMLHTTP_最小验证,
                        testFnLegacy: typeof 测试_最小通信流程
                    }, "UIEventManager.js", "_handleHttpSmokeTestClick");
                }
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("最小通信测试(HTTP) 处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleHttpSmokeTestClick");
            }
        }
    }

    function _handleEnvironmentProbeClick(Sender) {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 开始环境可用组件/能力探测 ===", {
                    sender: Sender ? "有效" : "无效"
                }, "UIEventManager.js", "_handleEnvironmentProbeClick");
            }

            if (typeof 测试_运行环境探测 === "function") {
                测试_运行环境探测();

                if (typeof uiInfo === "function") {
                    uiInfo("=== 环境探测已触发 ===", null, "UIEventManager.js", "_handleEnvironmentProbeClick");
                }
            } else if (typeof EnvironmentProbeModule !== "undefined" && EnvironmentProbeModule && EnvironmentProbeModule.runAll) {
                EnvironmentProbeModule.runAll({
                    safeMode: true,
                    allowRiskyProbes: false,
                    tryWriteReport: true,
                    reportPath: "reports\\environment-probe-report.json"
                });

                if (typeof uiInfo === "function") {
                    uiInfo("=== 环境探测已触发（直接调用模块） ===", null, "UIEventManager.js", "_handleEnvironmentProbeClick");
                }
            } else {
                if (typeof uiWarn === "function") {
                    uiWarn("环境探测入口不可用，已跳过", {
                        testFn: typeof 测试_运行环境探测,
                        moduleFn: typeof EnvironmentProbeModule
                    }, "UIEventManager.js", "_handleEnvironmentProbeClick");
                }
            }

        } catch (error) {
            if (typeof uiError === "function") {
                uiError("环境探测处理失败", {
                    error: error.message
                }, "UIEventManager.js", "_handleEnvironmentProbeClick");
            }
        }
    }
    
    // 公共接口函数
    function create(options) {
        _config = options || {};
        return {
            config: _config,
            eventsBound: _eventsBound
        };
    }
    
    function bindEvents() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 绑定UI事件 ===", null, "UIEventManager.js", "bindEvents");
            }
            
            // 注意：这里不直接绑定事件，因为DFM事件是通过全局函数处理的
            // 我们只是标记事件已准备就绪
            _eventsBound = true;
            
            if (typeof uiInfo === "function") {
                uiInfo("UI事件绑定完成", null, "UIEventManager.js", "bindEvents");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("绑定UI事件失败", {
                    error: error.message
                }, "UIEventManager.js", "bindEvents");
            }
        }
    }
    
    function unbindEvents() {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("解绑UI事件", null, "UIEventManager.js", "unbindEvents");
            }
            
            _eventsBound = false;
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("解绑UI事件失败", {
                    error: error.message
                }, "UIEventManager.js", "unbindEvents");
            }
        }
    }
    
    function isEventsBound() {
        return _eventsBound;
    }
    
    // 返回模块接口对象
    return {
        create: create,
        bindEvents: bindEvents,
        unbindEvents: unbindEvents,
        isEventsBound: isEventsBound,
        
        // 暴露事件处理函数供全局DFM函数调用
        handleObjectTypeChange: _handleObjectTypeChange,
        handleSetOriginClick: _handleSetOriginClick,
        handleValidateClick: _handleValidateClick,
        handleCreateClick: _handleCreateClick,
        handleCreateAtOriginClick: _handleCreateAtOriginClick,
        handleResetClick: _handleResetClick,
        handleHttpSmokeTestClick: _handleHttpSmokeTestClick,
        handleEnvironmentProbeClick: _handleEnvironmentProbeClick,
        handleCancelClick: _handleCancelClick,
        handleGridSnapClick: _handleGridSnapClick,
        handleGridSizeChange: _handleGridSizeChange
    };
})();

