/**
 * UI Module - UI模块入口文件
 * 纯大IIFE模块，符合AD环境规范
 */

var UIModule = (function(){
    // 私有变量
    var _initialized = false;
    var _config = {};
    
    // 公共接口函数
    function createObjectCreatorUI(options) {
        return ObjectCreatorUI.create(options);
    }
    
    function initializeUI() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 初始化UI模块 ===", null, "ui/index.js", "initializeUI");
            }
            
            // 初始化ObjectCreatorUI
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.initialize();
            }
            
            // 绑定事件
            if (typeof UIEventManager !== "undefined") {
                UIEventManager.bindEvents();
            }
            
            _initialized = true;
            
            if (typeof uiInfo === "function") {
                uiInfo("UI模块初始化完成", null, "ui/index.js", "initializeUI");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("UI模块初始化失败", {
                    error: error.message,
                    stack: error.stack
                }, "ui/index.js", "initializeUI");
            }
            throw error;
        }
    }
    
    function showObjectCreatorWindow() {
        try {
            if (typeof uiInfo === "function") {
                uiInfo("=== 显示对象创建窗口 ===", null, "ui/index.js", "showObjectCreatorWindow");
            }
            
            // 确保UI已初始化
            if (!_initialized) {
                initializeUI();
            }
            
            // 显示窗口
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.showWindow();
            } else {
                throw new Error("ObjectCreatorUI不可用");
            }
            
            if (typeof uiInfo === "function") {
                uiInfo("对象创建窗口已显示", null, "ui/index.js", "showObjectCreatorWindow");
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("显示对象创建窗口失败", {
                    error: error.message,
                    stack: error.stack
                }, "ui/index.js", "showObjectCreatorWindow");
            }
            throw error;
        }
    }
    
    function hideObjectCreatorWindow() {
        try {
            if (typeof uiDebug === "function") {
                uiDebug("隐藏对象创建窗口", null, "ui/index.js", "hideObjectCreatorWindow");
            }
            
            if (typeof ObjectCreatorUI !== "undefined") {
                ObjectCreatorUI.hideWindow();
            }
            
        } catch (error) {
            if (typeof uiError === "function") {
                uiError("隐藏对象创建窗口失败", {
                    error: error.message
                }, "ui/index.js", "hideObjectCreatorWindow");
            }
        }
    }
    
    function isInitialized() {
        return _initialized;
    }
    
    function getStatus() {
        return {
            initialized: _initialized,
            objectCreatorUIAvailable: typeof ObjectCreatorUI !== "undefined",
            eventManagerAvailable: typeof UIEventManager !== "undefined",
            eventsBound: typeof UIEventManager !== "undefined" ? UIEventManager.isEventsBound() : false
        };
    }
    
    // 返回模块接口对象
    return {
        createObjectCreatorUI: createObjectCreatorUI,
        initializeUI: initializeUI,
        showObjectCreatorWindow: showObjectCreatorWindow,
        hideObjectCreatorWindow: hideObjectCreatorWindow,
        isInitialized: isInitialized,
        getStatus: getStatus,
        
        // 直接暴露其他模块变量（构建后自动可访问）
        ObjectCreatorUI: ObjectCreatorUI,
        UIEventManager: UIEventManager
    };
})();
