/**
 * 最简化模块示例
 * 
 * 展示用户建议的简化模块访问方式
 */

// 基础模块
var BaseModule = (function(){
    return {
        add: function(a, b) { return a + b; },
        multiply: function(a, b) { return a * b; }
    };
})();

// 依赖模块 - 使用简化的依赖检查
var DependentModule = (function(){
    function getBase() {
        if (BaseModule) {  // 用户建议的方式：只使用这个检查
            return BaseModule;
        }
        return null;
    }
    
    return {
        square: function(x) {
            var base = getBase();
            return base ? base.multiply(x, x) : x * x;
        }
    };
})();

// 简化导出
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        BaseModule: BaseModule,
        DependentModule: DependentModule
    };
}

// 测试
if (typeof window === "undefined") {
    console.log("=== 最简化模块测试 ===");
    console.log("BaseModule加法:", BaseModule.add(2, 3));
    console.log("DependentModule平方:", DependentModule.square(5));
    console.log("=== 测试完成 ===");
}
