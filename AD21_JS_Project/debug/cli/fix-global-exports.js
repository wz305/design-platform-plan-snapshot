// ==========================================================
// 修复全局导出脚本
// 为Jalangi2语义分析模块添加全局导出
// ==========================================================

console.log("[Fix Global Exports] 开始修复全局导出...");

// 为ExpectationEngine添加全局导出
if (typeof ExpectationEngine !== "undefined") {
    if (typeof global !== "undefined") {
        global.ExpectationEngine = ExpectationEngine;
    } else {
        this.ExpectationEngine = ExpectationEngine;
    }
    console.log("[Fix Global Exports] ✓ ExpectationEngine已导出到全局");
} else {
    console.log("[Fix Global Exports] ✗ ExpectationEngine不可用");
}

// 为ViolationTracer添加全局导出
if (typeof ViolationTracer !== "undefined") {
    if (typeof global !== "undefined") {
        global.ViolationTracer = ViolationTracer;
    } else {
        this.ViolationTracer = ViolationTracer;
    }
    console.log("[Fix Global Exports] ✓ ViolationTracer已导出到全局");
} else {
    console.log("[Fix Global Exports] ✗ ViolationTracer不可用");
}

// 为SemanticReporter添加全局导出
if (typeof SemanticReporter !== "undefined") {
    if (typeof global !== "undefined") {
        global.SemanticReporter = SemanticReporter;
    } else {
        this.SemanticReporter = SemanticReporter;
    }
    console.log("[Fix Global Exports] ✓ SemanticReporter已导出到全局");
} else {
    console.log("[Fix Global Exports] ✗ SemanticReporter不可用");
}

console.log("[Fix Global Exports] 全局导出修复完成");
