/**
 * Object Creator Window - PCB对象创建窗口事件处理
 * 重构为纯大IIFE模块，符合AD环境规范
 */

var ObjectCreatorWindow = (function(){
    // 私有变量
    var _initialized = false;
    var _config = {};
    
    // 公共接口函数
    function create(options) {
        _config = options || {};
        return {
            config: _config,
            initialized: _initialized
        };
    }
    
    function initialize() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 初始化对象创建窗口 ===", null, "object-creator.js", "initialize");
            }
            
            // 使用新的模块结构
            if (typeof UIModule !== "undefined") {
                UIModule.initializeUI();
            } else {
                throw new Error("UIModule不可用");
            }
            
            _initialized = true;
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口初始化完成", null, "object-creator.js", "initialize");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("初始化对象创建窗口失败", {
                    error: error.message,
                    stack: error.stack
                }, "object-creator.js", "initialize");
            }
            throw error;
        }
    }
    
    function show() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 显示对象创建窗口 ===", null, "object-creator.js", "show");
            }
            
            // 确保已初始化
            if (!_initialized) {
                initialize();
            }
            
            // 使用新的模块结构
            if (typeof UIModule !== "undefined") {
                UIModule.showObjectCreatorWindow();
            } else {
                throw new Error("UIModule不可用");
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口已显示", null, "object-creator.js", "show");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("显示对象创建窗口失败", {
                    error: error.message,
                    stack: error.stack
                }, "object-creator.js", "show");
            }
            throw error;
        }
    }
    
    function hide() {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("隐藏对象创建窗口", null, "object-creator.js", "hide");
            }
            
            // 使用新的模块结构
            if (typeof UIModule !== "undefined") {
                UIModule.hideObjectCreatorWindow();
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("隐藏对象创建窗口失败", {
                    error: error.message
                }, "object-creator.js", "hide");
            }
        }
    }
    
    function isInitialized() {
        return _initialized;
    }
    
    function getStatus() {
        return {
            initialized: _initialized,
            uiModuleAvailable: typeof UIModule !== "undefined",
            uiModuleStatus: typeof UIModule !== "undefined" ? UIModule.getStatus() : null
        };
    }
    
    // 返回模块接口对象
    return {
        create: create,
        initialize: initialize,
        show: show,
        hide: hide,
        isInitialized: isInitialized,
        getStatus: getStatus
    };
})();
