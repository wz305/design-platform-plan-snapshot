// ==========================================================
// 直接违规检测测试脚本
// 直接执行违规代码并测试Jalangi2检测能力
// ==========================================================

console.log("[Direct Violation Test] 开始直接违规检测测试...");

// 加载Jalangi2模块
require('../jalangi/analyzers/value-history.js');
require('../jalangi/analyzers/expectation-engine.js');
require('../jalangi/analyzers/violation-tracer.js');
require('../jalangi/analyzers/semantic-reporter.js');
require('../jalangi/run-semantic-analysis.js');

// 加载AD Mock
require('../runtime/ad-mock.js');

console.log("[Direct Violation Test] ✓ 所有模块加载完成");

// 初始化语义分析器
var initResult = SemanticAnalysisRunner.initialize({
    rulesFile: '../jalangi/rules/ad-function-expects.json'
});

if (!initResult) {
    console.log("[Direct Violation Test] ✗ 语义分析器初始化失败");
    process.exit(1);
}

console.log("[Direct Violation Test] ✓ 语义分析器初始化完成");

// 创建测试函数
function TestRealViolations_Click(Sender) {
    console.log("[Direct Violation Test] 开始真实违规测试...");
    
    // 手动追踪函数调用
    // 注意：ValueHistoryTracker没有functionEnter方法，这里移除调用
    
    // 测试1: PCBObjectFactory参数错误
    try {
        console.log("[Direct Violation Test] 测试1: PCBObjectFactory参数错误");
        
        // 错误1: 参数数量不正确
        var obj1 = PCBServer().PCBObjectFactory(1); // 缺少Y坐标参数
        console.log("[Direct Violation Test] 对象创建1: " + (obj1 ? "成功" : "失败"));
        
        // 手动记录属性访问
        if (typeof ValueHistoryTracker !== "undefined") {
            ValueHistoryTracker.recordPropertyWrite(obj1, "X", 0, "test_write", "test-real-violations-direct.js");
            ValueHistoryTracker.recordPropertyWrite(obj1, "Y", 0, "test_write", "test-real-violations-direct.js");
        }
        
        // 错误2: 参数类型错误
        var obj2 = PCBServer().PCBObjectFactory("invalid_type", 0, 0); // 字符串类型
        console.log("[Direct Violation Test] 对象创建2: " + (obj2 ? "成功" : "失败"));
        
        // 正确的对象创建
        var obj3 = PCBServer().PCBObjectFactory(1, 100, 200); // 正确创建
        console.log("[Direct Violation Test] 对象创建3: " + (obj3 ? "成功" : "失败"));
        
    } catch (error) {
        console.log("[Direct Violation Test] 对象创建错误: " + error.message);
        
        // 手动记录错误
        if (typeof ExpectationEngine !== "undefined") {
            // ExpectationEngine没有reportViolation方法，这里直接记录到全局违规数组
            console.log("[Direct Violation Test] 手动记录错误: " + error.message);
        }
    }
    
    // 测试2: 对象属性类型错误
    try {
        console.log("[Direct Violation Test] 测试2: 对象属性类型错误");
        var track = PCBServer().PCBObjectFactory(1, 0, 0);
        
        // 错误3: 坐标属性类型错误
        track.X = "invalid_string"; // 字符串赋值给数值属性
        console.log("[Direct Violation Test] 属性赋值完成 - X = '" + track.X + "'");
        
        // 手动记录属性写入违规
        if (typeof ExpectationEngine !== "undefined") {
            // ExpectationEngine没有reportViolation方法，这里直接记录到控制台
            console.log("[Direct Violation Test] 手动记录属性类型违规: 属性X类型错误");
        }
        
        track.Y = 123.456; // 浮点数赋值给整数属性
        console.log("[Direct Violation Test] 属性赋值完成 - Y = " + track.Y);
        
        // 手动记录属性写入
        if (typeof ValueHistoryTracker !== "undefined") {
            ValueHistoryTracker.recordPropertyWrite(track, "X", "invalid_string", "test_write", "test-real-violations-direct.js");
            ValueHistoryTracker.recordPropertyWrite(track, "Y", 123.456, "test_write", "test-real-violations-direct.js");
        }
        
        // 错误4: 缺少必需属性
        delete track.I_ObjectAddress; // 删除必需属性
        console.log("[Direct Violation Test] 必需属性已删除");
        
        // 手动记录必需属性删除违规
        if (typeof ExpectationEngine !== "undefined") {
            // ExpectationEngine没有reportViolation方法，这里直接记录到控制台
            console.log("[Direct Violation Test] 手动记录必需属性删除违规");
        }
        
    } catch (error) {
        console.log("[Direct Violation Test] 属性操作错误: " + error.message);
    }
    
    // 测试3: AddPCBObject调用错误
    try {
        console.log("[Direct Violation Test] 测试3: AddPCBObject调用错误");
        var board = PCBServer().GetCurrentPCBBoard();
        
        // 错误5: 添加null对象 - 这会在AddPCBObject中抛出错误
        try {
            board.AddPCBObject(null);
            console.log("[Direct Violation Test] 添加null对象完成");
        } catch (nullError) {
            console.log("[Direct Violation Test] 添加null对象错误: " + nullError.message);
        }
        
        // 错误6: 添加无效对象 - 这会在AddPCBObject中抛出错误
        try {
            var invalidObj = { Type: "invalid" }; // 缺少I_ObjectAddress
            board.AddPCBObject(invalidObj);
            console.log("[Direct Violation Test] 添加无效对象完成");
        } catch (invalidError) {
            console.log("[Direct Violation Test] 添加无效对象错误: " + invalidError.message);
        }
        
    } catch (error) {
        console.log("[Direct Violation Test] 对象添加错误: " + error.message);
    }
    
    // 手动记录函数退出
    // 注意：ValueHistoryTracker没有functionExit方法，这里移除调用
    
    console.log("[Direct Violation Test] 真实违规测试完成");
}

// 手动执行测试函数并监控
console.log("[Direct Violation Test] 开始手动执行和监控...");

// 清空历史记录
ValueHistoryTracker.clearHistory();
ExpectationEngine.clearViolations();
ViolationTracer.clearTraces();
SemanticReporter.clearReports();

// 执行测试函数
console.log("[Direct Violation Test] 执行测试函数...");
try {
    TestRealViolations_Click(null);
} catch (error) {
    console.log("[Direct Violation Test] 测试函数执行错误: " + error.message);
}

// 获取结果
console.log("\n[Direct Violation Test] === 分析结果 ===");

// 值历史统计
var valueStats = ValueHistoryTracker.getStatistics();
console.log("[Direct Violation Test] 值历史统计:");
console.log("[Direct Violation Test]   总对象数: " + valueStats.totalObjects);
console.log("[Direct Violation Test]   总修改数: " + valueStats.totalModifications);
console.log("[Direct Violation Test]   对象类型: " + JSON.stringify(valueStats.objectTypes));

// 期望引擎统计
var expectationStats = ExpectationEngine.getStatistics();
console.log("[Direct Violation Test] 期望引擎统计:");
console.log("[Direct Violation Test]   总违规数: " + expectationStats.totalViolations);
console.log("[Direct Violation Test]   错误数: " + expectationStats.errorCount);
console.log("[Direct Violation Test]   警告数: " + expectationStats.warningCount);

// 违规追踪统计
var violationStats = ViolationTracer.getStatistics();
console.log("[Direct Violation Test] 违规追踪统计:");
console.log("[Direct Violation Test]   总追踪数: " + violationStats.totalTraces);
console.log("[Direct Violation Test]   平均深度: " + violationStats.averageDepth);
console.log("[Direct Violation Test]   平均置信度: " + violationStats.averageConfidence);

// 生成语义报告
console.log("[Direct Violation Test] 生成语义报告...");
var violations = ExpectationEngine.getViolations();
var semanticReport = SemanticReporter.generateSemanticReport("TestRealViolations_Click", violations, {});

if (semanticReport.violations && semanticReport.violations.length > 0) {
    console.log("[Direct Violation Test] === 检测到的违规 ===");
    for (var i = 0; i < semanticReport.violations.length; i++) {
        var violation = semanticReport.violations[i];
        console.log("[Direct Violation Test] 违规 " + (i + 1) + ":");
        console.log("[Direct Violation Test]   类型: " + violation.type);
        console.log("[Direct Violation Test]   严重程度: " + violation.severity);
        console.log("[Direct Violation Test]   消息: " + violation.message);
        console.log("[Direct Violation Test]   位置: " + (violation.location || '未知'));
        if (violation.rootCause) {
            console.log("[Direct Violation Test]   根本原因: " + (violation.rootCause.description || '未知'));
            console.log("[Direct Violation Test]   置信度: " + violation.confidence);
        }
        console.log("[Direct Violation Test]   ");
    }
} else {
    console.log("[Direct Violation Test] ⚠️ 未检测到任何违规");
}

// 保存报告
try {
    var fs = require('fs');
    var reportPath = '../reports/direct-violation-test-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(semanticReport, null, 2), 'utf8');
    console.log("[Direct Violation Test] ✓ 报告已保存: " + reportPath);
} catch (error) {
    console.log("[Direct Violation Test] ✗ 报告保存失败: " + error.message);
}

// 最终结论
var totalViolations = semanticReport.violations ? semanticReport.violations.length : 0;

console.log("\n[Direct Violation Test] === 最终结论 ===");
if (totalViolations > 0) {
    console.log("[Direct Violation Test] ✓ 成功检测到 " + totalViolations + " 个违规！");
    console.log("[Direct Violation Test] ✓ Jalangi2系统工作正常");
} else {
    console.log("[Direct Violation Test] ⚠️ 未检测到违规，可能需要改进检测规则");
    console.log("[Direct Violation Test] ? 系统功能需要进一步验证");
}

console.log("[Direct Violation Test] 测试结束");
