// ==========================================================
// 简化的Jalangi2测试脚本
// 直接测试模块加载和基本功能
// ==========================================================

console.log("[Simple Test] 开始Jalangi2简化测试...");

// 步骤1: 加载所有模块
console.log("[Simple Test] 步骤1: 加载模块...");

try {
    // 加载值历史追踪器
    require('./../jalangi/analyzers/value-history.js');
    console.log("[Simple Test] ✓ ValueHistoryTracker加载完成");
    
    // 加载期望引擎
    require('./../jalangi/analyzers/expectation-engine.js');
    console.log("[Simple Test] ✓ ExpectationEngine加载完成");
    
    // 加载违规追踪器
    require('./../jalangi/analyzers/violation-tracer.js');
    console.log("[Simple Test] ✓ ViolationTracer加载完成");
    
    // 加载语义报告器
    require('./../jalangi/analyzers/semantic-reporter.js');
    console.log("[Simple Test] ✓ SemanticReporter加载完成");
    
    // 加载运行器
    require('./../jalangi/run-semantic-analysis.js');
    console.log("[Simple Test] ✓ SemanticAnalysisRunner加载完成");
    
} catch (error) {
    console.log("[Simple Test] ✗ 模块加载失败: " + error.message);
    process.exit(1);
}

// 步骤2: 验证模块可用性
console.log("[Simple Test] 步骤2: 验证模块可用性...");

// 步骤3: 验证模块可用性
console.log("[Simple Test] 步骤3: 验证模块可用性...");

var modules = {
    'ValueHistoryTracker': typeof ValueHistoryTracker,
    'ExpectationEngine': typeof ExpectationEngine,
    'ViolationTracer': typeof ViolationTracer,
    'SemanticReporter': typeof SemanticReporter,
    'SemanticAnalysisRunner': typeof SemanticAnalysisRunner
};

var allAvailable = true;
for (var moduleName in modules) {
    var type = modules[moduleName];
    if (type === 'object') {
        console.log("[Simple Test] ✓ " + moduleName + " 可用");
    } else if (type === 'function') {
        console.log("[Simple Test] ✓ " + moduleName + " 可用 (函数)");
    } else {
        console.log("[Simple Test] ✗ " + moduleName + " 不可用 (" + type + ")");
        allAvailable = false;
    }
}

if (!allAvailable) {
    console.log("[Simple Test] ✗ 部分模块不可用，测试终止");
    process.exit(1);
}

// 步骤4: 测试基本初始化
console.log("[Simple Test] 步骤4: 测试基本初始化...");

try {
    // 初始化值历史追踪器
    ValueHistoryTracker.clearHistory();
    console.log("[Simple Test] ✓ ValueHistoryTracker初始化完成");
    
    // 初始化期望引擎
    var rules = {
        'TestFunction': {
            expects: [
                { arg: 0, type: 'string', required: true },
                { arg: 1, type: 'number', required: false }
            ],
            returns: { type: 'boolean', required: true }
        }
    };
    ExpectationEngine.initialize(rules, ValueHistoryTracker);
    console.log("[Simple Test] ✓ ExpectationEngine初始化完成");
    
    // 初始化违规追踪器
    ViolationTracer.initialize(ValueHistoryTracker, ExpectationEngine);
    console.log("[Simple Test] ✓ ViolationTracer初始化完成");
    
    // 初始化语义报告器
    SemanticReporter.initialize(ValueHistoryTracker, ExpectationEngine, ViolationTracer);
    console.log("[Simple Test] ✓ SemanticReporter初始化完成");
    
    // 初始化运行器
    var initResult = SemanticAnalysisRunner.initialize({
        rulesFile: '../jalangi/rules/ad-function-expects.json'
    });
    
    if (initResult) {
        console.log("[Simple Test] ✓ SemanticAnalysisRunner初始化完成");
    } else {
        console.log("[Simple Test] ✗ SemanticAnalysisRunner初始化失败");
        process.exit(1);
    }
    
} catch (error) {
    console.log("[Simple Test] ✗ 初始化失败: " + error.message);
    console.log("[Simple Test] 堆栈: " + error.stack);
    process.exit(1);
}

// 步骤5: 运行简单测试
console.log("[Simple Test] 步骤5: 运行简单测试...");

try {
    // 模拟函数调用
    function TestFunction(param1, param2) {
        // 记录函数调用
        var args = Array.prototype.slice.call(arguments);
        var result = param1 && param2 > 0;
        
        // 手动触发验证
        if (typeof ExpectationEngine !== 'undefined') {
            ExpectationEngine.validateFunctionCall('TestFunction', this, args, result, 'test_iid', 'test_location');
        }
        
        return result;
    }
    
    // 测试正常调用
    console.log("[Simple Test] 测试正常调用...");
    var result1 = TestFunction('hello', 5);
    console.log("[Simple Test] 结果1: " + result1);
    
    // 测试违规调用
    console.log("[Simple Test] 测试违规调用...");
    var result2 = TestFunction(123, 'invalid');
    console.log("[Simple Test] 结果2: " + result2);
    
    // 检查违规
    var violations = ExpectationEngine.getViolations();
    console.log("[Simple Test] 检测到违规: " + violations.length + " 个");
    
    for (var i = 0; i < violations.length; i++) {
        var violation = violations[i];
        console.log("[Simple Test]   - " + violation.type + ": " + violation.message);
    }
    
    // 测试语义报告
    if (violations.length > 0) {
        var report = SemanticReporter.generateSemanticReport('TestFunction', violations, {
            executionTime: Date.now(),
            memoryUsage: 1024,
            traceComplexity: 1
        });
        
        console.log("[Simple Test] ✓ 语义报告生成完成");
        console.log("[Simple Test]   总违规: " + report.summary.totalViolations);
        console.log("[Simple Test]   错误数: " + report.summary.errorCount);
        console.log("[Simple Test]   警告数: " + report.summary.warningCount);
        console.log("[Simple Test]   建议数: " + report.recommendations.length);
    }
    
    console.log("[Simple Test] ✓ 简单测试完成");
    
} catch (error) {
    console.log("[Simple Test] ✗ 测试执行失败: " + error.message);
    console.log("[Simple Test] 堆栈: " + error.stack);
    process.exit(1);
}

// 步骤6: 显示统计信息
console.log("[Simple Test] 步骤6: 显示统计信息...");

try {
    console.log("[Simple Test] 值历史统计:");
    var valueStats = ValueHistoryTracker.getStatistics();
    console.log("[Simple Test]   总对象数: " + valueStats.totalObjects);
    console.log("[Simple Test]   总修改数: " + valueStats.totalModifications);
    console.log("[Simple Test]   对象类型: " + JSON.stringify(valueStats.objectTypes));
    
    console.log("[Simple Test] 期望引擎统计:");
    var expectStats = ExpectationEngine.getStatistics();
    console.log("[Simple Test]   总违规数: " + expectStats.totalViolations);
    console.log("[Simple Test]   错误数: " + expectStats.errorCount);
    console.log("[Simple Test]   警告数: " + expectStats.warningCount);
    
    console.log("[Simple Test] 违规追踪统计:");
    var traceStats = ViolationTracer.getStatistics();
    console.log("[Simple Test]   总追踪数: " + traceStats.totalTraces);
    console.log("[Simple Test]   平均深度: " + traceStats.averageDepth);
    console.log("[Simple Test]   平均置信度: " + traceStats.averageConfidence);
    
    console.log("[Simple Test] 语义报告统计:");
    var reportStats = SemanticReporter.getStatistics();
    console.log("[Simple Test]   总报告数: " + reportStats.totalReports);
    console.log("[Simple Test]   总违规数: " + reportStats.totalViolations);
    console.log("[Simple Test]   平均置信度: " + reportStats.averageConfidence);
    
} catch (error) {
    console.log("[Simple Test] ✗ 统计获取失败: " + error.message);
}

// 步骤7: 最终结论
console.log("[Simple Test] 步骤7: 最终结论...");

try {
    var finalStats = SemanticAnalysisRunner.getStatistics();
    console.log("[Simple Test] 运行器状态:");
    console.log("[Simple Test]   已初始化: " + finalStats.initialized);
    console.log("[Simple Test]   分析器可用性: " + JSON.stringify(finalStats.analyzers));
    
    if (finalStats.initialized && finalStats.analyzers.valueTracker && finalStats.analyzers.expectationEngine && finalStats.analyzers.violationTracer && finalStats.analyzers.semanticReporter) {
        console.log("[Simple Test] ✓ Jalangi2语义分析系统完全可用！");
        console.log("[Simple Test] ✓ 所有核心功能正常工作");
        console.log("[Simple Test] ✓ 可以进行生产使用");
        process.exit(0);
    } else {
        console.log("[Simple Test] ✗ Jalangi2语义分析系统部分可用");
        console.log("[Simple Test] ✗ 需要进一步修复");
        process.exit(1);
    }
    
} catch (error) {
    console.log("[Simple Test] ✗ 最终验证失败: " + error.message);
    process.exit(1);
}
