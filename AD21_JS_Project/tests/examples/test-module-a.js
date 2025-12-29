/**
 * 测试模块A - 基础模块
 * 
 * 提供简单的数学运算功能
 * 遵循ES3语法规范和IIFE模块架构
 */

var TestModuleA = (function(){
    
    // 私有变量
    var _version = "1.0.0";
    var _initialized = false;
    
    // 私有函数
    function _log(message) {
        if (typeof console !== "undefined" && console.log) {
            console.log("[TestModuleA] " + message);
        }
    }
    
    /**
     * 初始化模块
     */
    function initialize() {
        _log("initialize - START");
        
        if (_initialized) {
            _log("initialize - Module already initialized");
            return true;
        }
        
        _initialized = true;
        _log("initialize - SUCCESS - TestModuleA initialized");
        return true;
    }
    
    /**
     * 加法运算
     * @param {number} a 第一个数
     * @param {number} b 第二个数
     * @returns {number} 计算结果
     */
    function add(a, b) {
        _log("add - START - params: " + a + ", " + b);
        
        if (typeof a !== "number" || typeof b !== "number") {
            _log("add - ERROR - Invalid parameters");
            return NaN;
        }
        
        var result = a + b;
        _log("add - SUCCESS - result: " + result);
        return result;
    }
    
    /**
     * 乘法运算
     * @param {number} a 第一个数
     * @param {number} b 第二个数
     * @returns {number} 计算结果
     */
    function multiply(a, b) {
        _log("multiply - START - params: " + a + ", " + b);
        
        if (typeof a !== "number" || typeof b !== "number") {
            _log("multiply - ERROR - Invalid parameters");
            return NaN;
        }
        
        var result = a * b;
        _log("multiply - SUCCESS - result: " + result);
        return result;
    }
    
    /**
     * 获取模块信息
     * @returns {Object} 模块信息
     */
    function getInfo() {
        return {
            name: "TestModuleA",
            version: _version,
            initialized: _initialized,
            description: "基础数学运算模块"
        };
    }
    
    /**
     * 检查模块是否已初始化
     * @returns {boolean} 是否已初始化
     */
    function isInitialized() {
        return _initialized;
    }
    
    /**
     * 重置模块状态
     */
    function reset() {
        _log("reset - START");
        _initialized = false;
        _log("reset - SUCCESS - Module reset");
    }
    
    // 导出接口
    return {
        // 核心功能
        add: add,
        multiply: multiply,
        
        // 生命周期
        initialize: initialize,
        isInitialized: isInitialized,
        reset: reset,
        
        // 信息查询
        getInfo: getInfo,
        
        // 常量
        VERSION: _version
    };
    
})();

// 简化导出 - 只导出到module.exports
if (typeof module !== "undefined" && module.exports) {
    module.exports = TestModuleA;
}
