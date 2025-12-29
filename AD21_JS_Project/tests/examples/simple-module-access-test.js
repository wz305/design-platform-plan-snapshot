/**
 * 简化模块访问测试
 * 
 * 测试是否可以只使用简单的变量检查来访问模块
 * 避免复杂的环境检测和导出代码
 */

// 简化的TestModuleA - 只使用IIFE，无复杂导出
var SimpleModuleA = (function(){
    var _initialized = false;
    
    function initialize() {
        _initialized = true;
        console.log("[SimpleModuleA] Initialized");
        return true;
    }
    
    function add(a, b) {
        return a + b;
    }
    
    function isInitialized() {
        return _initialized;
    }
    
    function getInfo() {
        return {name: "SimpleModuleA", initialized: _initialized};
    }
    
    return {
        initialize: initialize,
        add: add,
        isInitialized: isInitialized,
        getInfo: getInfo
    };
})();

// 简化的TestModuleB - 只使用简单依赖检查
var SimpleModuleB = (function(){
    var _initialized = false;
    
    // 简化的依赖获取 - 只检查变量是否存在
    function getDependencyA() {
        if (SimpleModuleA) {  // 这就是用户问的方式：只使用这个检查
            return SimpleModuleA;
        }
        return null;
    }
    
    function initialize() {
        var depA = getDependencyA();
        if (!depA) {
            console.log("[SimpleModuleB] ERROR: SimpleModuleA not found");
            return false;
        }
        
        if (!depA.isInitialized()) {
            depA.initialize();
        }
        
        _initialized = true;
        console.log("[SimpleModuleB] Initialized");
        return true;
    }
    
    function square(x) {
        var depA = getDependencyA();
        if (!depA) {
            console.log("[SimpleModuleB] ERROR: SimpleModuleA not available");
            return NaN;
        }
        return depA.multiply ? depA.multiply(x, x) : x * x;
    }
    
    function isInitialized() {
        return _initialized;
    }
    
    function getInfo() {
        var depA = getDependencyA();
        return {
            name: "SimpleModuleB", 
            initialized: _initialized,
            dependency: depA ? depA.getInfo() : null
        };
    }
    
    return {
        initialize: initialize,
        square: square,
        isInitialized: isInitialized,
        getInfo: getInfo
    };
})();

// 测试函数
function runSimpleTest() {
    console.log("=== 简化模块访问测试 ===");
    
    // 测试1: 基本模块存在性
    console.log("\n--- 测试1: 模块存在性 ---");
    console.log("SimpleModuleA存在:", typeof SimpleModuleA !== "undefined");
    console.log("SimpleModuleB存在:", typeof SimpleModuleB !== "undefined");
    
    // 测试2: 简单依赖检查
    console.log("\n--- 测试2: 简单依赖检查 ---");
    var depA = SimpleModuleB.getDependencyA ? SimpleModuleB.getDependencyA() : "方法不存在";
    console.log("SimpleModuleB找到SimpleModuleA:", depA !== null);
    
    // 测试3: 初始化测试
    console.log("\n--- 测试3: 初始化测试 ---");
    var initA = SimpleModuleA.initialize();
    var initB = SimpleModuleB.initialize();
    console.log("SimpleModuleA初始化:", initA);
    console.log("SimpleModuleB初始化:", initB);
    
    // 测试4: 功能测试
    console.log("\n--- 测试4: 功能测试 ---");
    if (SimpleModuleA.isInitialized() && SimpleModuleB.isInitialized()) {
        var result = SimpleModuleB.square(5);
        console.log("SimpleModuleB.square(5) =", result);
        
        var addResult = SimpleModuleA.add(3, 4);
        console.log("SimpleModuleA.add(3, 4) =", addResult);
    }
    
    // 测试5: 信息查询
    console.log("\n--- 测试5: 信息查询 ---");
    console.log("SimpleModuleA信息:", SimpleModuleA.getInfo());
    console.log("SimpleModuleB信息:", SimpleModuleB.getInfo());
    
    console.log("\n=== 测试完成 ===");
}

// 简化导出
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        SimpleModuleA: SimpleModuleA,
        SimpleModuleB: SimpleModuleB,
        runSimpleTest: runSimpleTest
    };
}

// 如果直接运行，执行测试
if (typeof window === "undefined") {
    runSimpleTest();
}
