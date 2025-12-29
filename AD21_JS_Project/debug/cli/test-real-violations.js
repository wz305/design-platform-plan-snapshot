// ==========================================================
// 真实违规检测测试脚本
// 测试Jalangi2系统能否检测到真实的AD API违规
// ==========================================================

console.log("[Real Violation Test] 开始真实违规检测测试...");

// 加载Jalangi2模块
require('../jalangi/analyzers/value-history.js');
require('../jalangi/analyzers/expectation-engine.js');
require('../jalangi/analyzers/violation-tracer.js');
require('../jalangi/analyzers/semantic-reporter.js');
require('../jalangi/run-semantic-analysis.js');

console.log("[Real Violation Test] ✓ 所有模块加载完成");

// 初始化语义分析器
var initResult = SemanticAnalysisRunner.initialize({
    rulesFile: '../jalangi/rules/ad-function-expects.json'
});

if (!initResult) {
    console.log("[Real Violation Test] ✗ 语义分析器初始化失败");
    process.exit(1);
}

console.log("[Real Violation Test] ✓ 语义分析器初始化完成");

// 运行真实违规测试
console.log("[Real Violation Test] 开始分析包含真实违规的代码...");

var result = SemanticAnalysisRunner.runAnalysis(
    '../test-real-violations.js',
    'TestRealViolations_Click',
    { verbose: true }
);

console.log("\n[Real Violation Test] === 分析结果 ===");
console.log("[Real Violation Test] 执行成功: " + result.success);
console.log("[Real Violation Test] 执行时间: " + (result.executionStats ? result.executionStats.analysisTime + 'ms' : '未知'));

if (result.semanticReport) {
    var report = result.semanticReport;
    console.log("[Real Violation Test] 违规总数: " + (report.violations ? report.violations.length : 0));
    
    if (report.violations && report.violations.length > 0) {
        console.log("\n[Real Violation Test] === 检测到的违规 ===");
        for (var i = 0; i < report.violations.length; i++) {
            var violation = report.violations[i];
            console.log("[Real Violation Test] 违规 " + (i + 1) + ":");
            console.log("[Real Violation Test]   类型: " + violation.type);
            console.log("[Real Violation Test]   严重程度: " + violation.severity);
            console.log("[Real Violation Test]   消息: " + violation.message);
            console.log("[Real Violation Test]   位置: " + (violation.location || '未知'));
            if (violation.rootCause) {
                console.log("[Real Violation Test]   根本原因: " + (violation.rootCause.description || '未知'));
                console.log("[Real Violation Test]   置信度: " + violation.confidence);
            }
            console.log("[Real Violation Test]   ");
        }
    } else {
        console.log("[Real Violation Test] ⚠️ 未检测到任何违规");
    }
    
    if (report.recommendations && report.recommendations.length > 0) {
        console.log("[Real Violation Test] === 修复建议 ===");
        for (var i = 0; i < report.recommendations.length; i++) {
            var rec = report.recommendations[i];
            console.log("[Real Violation Test] 建议 " + (i + 1) + ":");
            console.log("[Real Violation Test]   优先级: " + rec.priority);
            console.log("[Real Violation Test]   标题: " + rec.title);
            console.log("[Real Violation Test]   描述: " + rec.description);
            console.log("[Real Violation Test]   自动修复: " + (rec.autoFixable ? '是' : '否'));
            console.log("[Real Violation Test]   ");
        }
    }
    
    // 显示统计信息
    if (report.statistics) {
        console.log("[Real Violation Test] === 统计信息 ===");
        console.log("[Real Violation Test] 总对象数: " + (report.statistics.totalObjects || 0));
        console.log("[Real Violation Test] 总修改数: " + (report.statistics.totalModifications || 0));
        console.log("[Real Violation Test] 总违规数: " + (report.statistics.totalViolations || 0));
        console.log("[Real Violation Test] 平均置信度: " + (report.statistics.averageConfidence || 0));
    }
}

console.log("[Real Violation Test] === 测试完成 ===");

// 保存报告
if (result.semanticReport) {
    var fs = require('fs');
    var reportPath = '../reports/real-violation-test-report.json';
    
    try {
        fs.writeFileSync(reportPath, JSON.stringify(result.semanticReport, null, 2), 'utf8');
        console.log("[Real Violation Test] ✓ 报告已保存: " + reportPath);
    } catch (error) {
        console.log("[Real Violation Test] ✗ 报告保存失败: " + error.message);
    }
}

// 最终结论
var totalViolations = result.semanticReport && result.semanticReport.violations ? result.semanticReport.violations.length : 0;

console.log("\n[Real Violation Test] === 最终结论 ===");
if (totalViolations > 0) {
    console.log("[Real Violation Test] ✓ 成功检测到 " + totalViolations + " 个违规！");
    console.log("[Real Violation Test] ✓ Jalangi2系统工作正常");
} else {
    console.log("[Real Violation Test] ⚠️ 未检测到违规，可能需要改进检测规则");
    console.log("[Real Violation Test] ? 系统功能需要进一步验证");
}

console.log("[Real Violation Test] 测试结束");
