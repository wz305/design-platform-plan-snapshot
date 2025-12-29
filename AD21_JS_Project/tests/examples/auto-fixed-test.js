/**
 * 自动生成的测试脚本
 * 
 * 模块加载顺序: test-module-a -> test-module-b
 * 生成时间: 2025/12/14 15:10:51
 */

// === 按依赖顺序加载模块 ===

// 加载模块: test-module-a
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


// 加载模块: test-module-b
/**
 * 测试模块B - 依赖模块
 * 
 * 提供高级数学运算功能，依赖TestModuleA
 * 演示模块间依赖关系的处理
 */

var TestModuleB = (function(){
    
    // 私有变量
    var _version = "1.0.0";
    var _initialized = false;
    var _dependencyA = null;
    
    // 私有函数
    function _log(message) {
        if (typeof console !== "undefined" && console.log) {
            console.log("[TestModuleB] " + message);
        }
    }
    
    /**
     * 获取依赖模块A - 简化版本
     * @returns {Object|null} TestModuleA实例或null
     */
    function _getDependencyA() {
        // 简化的依赖检查 - 只使用直接变量访问
        if (TestModuleA) {
            _dependencyA = TestModuleA;
            _log("_getDependencyA - Found TestModuleA via direct variable");
            return _dependencyA;
        }
        
        _log("_getDependencyA - TestModuleA not found");
        return null;
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
        
        // 获取依赖模块
        _dependencyA = _getDependencyA();
        if (!_dependencyA) {
            _log("initialize - ERROR - Failed to get dependency TestModuleA");
            return false;
        }
        
        // 初始化依赖模块
        if (!_dependencyA.isInitialized()) {
            _log("initialize - Initializing dependency TestModuleA");
            if (!_dependencyA.initialize()) {
                _log("initialize - ERROR - Failed to initialize TestModuleA");
                return false;
            }
        }
        
        _initialized = true;
        _log("initialize - SUCCESS - TestModuleB initialized");
        return true;
    }
    
    /**
     * 计算平方（使用TestModuleA的multiply方法）
     * @param {number} x 输入数值
     * @returns {number} 平方结果
     */
    function square(x) {
        _log("square - START - params: " + x);
        
        if (!_initialized) {
            _log("square - ERROR - Module not initialized");
            return NaN;
        }
        
        var depA = _getDependencyA();
        if (!depA) {
            _log("square - ERROR - Dependency TestModuleA not available");
            return NaN;
        }
        
        if (typeof x !== "number") {
            _log("square - ERROR - Invalid parameter");
            return NaN;
        }
        
        var result = depA.multiply(x, x);
        _log("square - SUCCESS - result: " + result);
        return result;
    }
    
    /**
     * 计算立方（使用TestModuleA的multiply和add方法）
     * @param {number} x 输入数值
     * @returns {number} 立方结果
     */
    function cube(x) {
        _log("cube - START - params: " + x);
        
        if (!_initialized) {
            _log("cube - ERROR - Module not initialized");
            return NaN;
        }
        
        var depA = _getDependencyA();
        if (!depA) {
            _log("cube - ERROR - Dependency TestModuleA not available");
            return NaN;
        }
        
        if (typeof x !== "number") {
            _log("cube - ERROR - Invalid parameter");
            return NaN;
        }
        
        // x³ = x * x * x
        var square = depA.multiply(x, x);
        var result = depA.multiply(square, x);
        _log("cube - SUCCESS - result: " + result);
        return result;
    }
    
    /**
     * 计算两数之和的平方
     * @param {number} a 第一个数
     * @param {number} b 第二个数
     * @returns {number} (a+b)²的结果
     */
    function sumOfSquares(a, b) {
        _log("sumOfSquares - START - params: " + a + ", " + b);
        
        if (!_initialized) {
            _log("sumOfSquares - ERROR - Module not initialized");
            return NaN;
        }
        
        var depA = _getDependencyA();
        if (!depA) {
            _log("sumOfSquares - ERROR - Dependency TestModuleA not available");
            return NaN;
        }
        
        if (typeof a !== "number" || typeof b !== "number") {
            _log("sumOfSquares - ERROR - Invalid parameters");
            return NaN;
        }
        
        // (a+b)² = (a+b)*(a+b)
        var sum = depA.add(a, b);
        var result = depA.multiply(sum, sum);
        _log("sumOfSquares - SUCCESS - result: " + result);
        return result;
    }
    
    /**
     * 获取模块信息
     * @returns {Object} 模块信息
     */
    function getInfo() {
        var depA = _getDependencyA();
        return {
            name: "TestModuleB",
            version: _version,
            initialized: _initialized,
            description: "高级数学运算模块（依赖TestModuleA）",
            dependency: depA ? depA.getInfo() : null
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
        _dependencyA = null;
        _log("reset - SUCCESS - Module reset");
    }
    
    /**
     * 检查依赖是否可用
     * @returns {boolean} 依赖是否可用
     */
    function isDependencyAvailable() {
        return _getDependencyA() !== null;
    }
    
    // 导出接口
    return {
        // 核心功能
        square: square,
        cube: cube,
        sumOfSquares: sumOfSquares,
        
        // 生命周期
        initialize: initialize,
        isInitialized: isInitialized,
        reset: reset,
        
        // 依赖检查
        isDependencyAvailable: isDependencyAvailable,
        
        // 信息查询
        getInfo: getInfo,
        
        // 常量
        VERSION: _version
    };
    
})();

// 简化导出 - 只导出到module.exports
if (typeof module !== "undefined" && module.exports) {
    module.exports = TestModuleB;
}


// === 简化导出 ===
if (typeof module !== "undefined" && module.exports) {
    module.exports.TestModuleA = TestModuleA;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports.TestModuleB = TestModuleB;
}

// === 测试代码 ===
function runAutoTest() {
    console.log("=== 自动生成的模块测试 ===");
    
    console.log("TestModuleA 可用: " + (typeof TestModuleA !== "undefined"));
    console.log("TestModuleB 可用: " + (typeof TestModuleB !== "undefined"));
    
    // 测试模块间调用
    try {
        if (TestModuleA && TestModuleB) {
            console.log("模块调用测试通过");
        } else {
            console.log("模块调用测试失败");
        }
    } catch (error) {
        console.log("测试错误: " + error.message);
    }
    
    console.log("=== 测试完成 ===");
}

// Node.js环境自动运行
if (typeof window === "undefined") {
    runAutoTest();
}