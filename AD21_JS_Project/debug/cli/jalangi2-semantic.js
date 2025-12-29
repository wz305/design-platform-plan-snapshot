// ==========================================================
// Jalangi2 Semantic Analysis CLI - 语义溯源分析命令行接口
// 用于运行期语义溯源分析的CLI工具
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 依赖检查和加载
// ==========================================================

/**
 * 检查并加载Jalangi2语义分析依赖
 * @return {Boolean} 是否加载成功
 */
function loadJalangi2Dependencies() {
    try {
        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var debugDir = path.dirname(__filename);
            
            console.log("[Jalangi2 Semantic] 开始加载依赖模块...");
            
            // 加载值历史追踪器
            var valueHistoryPath = path.join(debugDir, "..", "jalangi", "analyzers", "value-history.js");
            if (fs.existsSync(valueHistoryPath)) {
                require(valueHistoryPath);
                console.log("[Jalangi2 Semantic] ✓ 值历史追踪器已加载");
            } else {
                console.log("[Jalangi2 Semantic] ✗ 值历史追踪器不存在: " + valueHistoryPath);
                return false;
            }
            
            // 加载期望引擎
            var expectationPath = path.join(debugDir, "..", "jalangi", "analyzers", "expectation-engine.js");
            if (fs.existsSync(expectationPath)) {
                require(expectationPath);
                console.log("[Jalangi2 Semantic] ✓ 期望引擎已加载");
            } else {
                console.log("[Jalangi2 Semantic] ✗ 期望引擎不存在: " + expectationPath);
                return false;
            }
            
            // 加载违规追踪器
            var violationPath = path.join(debugDir, "..", "jalangi", "analyzers", "violation-tracer.js");
            if (fs.existsSync(violationPath)) {
                require(violationPath);
                console.log("[Jalangi2 Semantic] ✓ 违规追踪器已加载");
            } else {
                console.log("[Jalangi2 Semantic] ✗ 违规追踪器不存在: " + violationPath);
                return false;
            }
            
            // 加载语义报告器
            var reporterPath = path.join(debugDir, "..", "jalangi", "analyzers", "semantic-reporter.js");
            if (fs.existsSync(reporterPath)) {
                require(reporterPath);
                console.log("[Jalangi2 Semantic] ✓ 语义报告器已加载");
            } else {
                console.log("[Jalangi2 Semantic] ✗ 语义报告器不存在: " + reporterPath);
                return false;
            }
            
            // 加载核心运行器
            var runnerPath = path.join(debugDir, "..", "jalangi", "run-semantic-analysis.js");
            if (fs.existsSync(runnerPath)) {
                require(runnerPath);
                console.log("[Jalangi2 Semantic] ✓ 核心运行器已加载");
            } else {
                console.log("[Jalangi2 Semantic] ✗ 核心运行器不存在: " + runnerPath);
                return false;
            }
            
            // 加载测试函数
            var testFunctionsPath = path.join(debugDir, "..", "test-functions.js");
            if (fs.existsSync(testFunctionsPath)) {
                require(testFunctionsPath);
                console.log("[Jalangi2 Semantic] ✓ 测试函数已加载");
            }
            
            // 尝试加载Capability Query（如果可用）
            try {
                var capabilityPath = path.join(process.cwd(), "analyzer", "reports", "capability-index-v1-interface.js");
                if (fs.existsSync(capabilityPath)) {
                    global.CapabilityQuery = require(capabilityPath);
                    console.log("[Jalangi2 Semantic] ✓ Capability Query 已加载");
                } else {
                    console.log("[Jalangi2 Semantic] ⚠ Capability Query 不可用");
                }
            } catch (error) {
                console.log("[Jalangi2 Semantic] ⚠ Capability Query 加载失败: " + error.message);
            }
            
            console.log("[Jalangi2 Semantic] ✓ 所有依赖加载完成");
            return true;
            
        } else {
            console.log("[Jalangi2 Semantic] 浏览器环境，跳过模块加载");
            return true;
        }
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 依赖加载失败: " + error.message);
        return false;
    }
}

// ==========================================================
// 参数解析
// ==========================================================

/**
 * 解析命令行参数
 * @param {Array} args - 命令行参数数组
 * @return {Object} 解析后的参数对象
 */
function parseArguments(args) {
    var options = {
        command: "",
        script: "",
        entry: "",
        rules: "debug/jalangi/rules/ad-function-expects.json",
        output: "debug/reports/jalangi2-semantic-report.json",
        help: false,
        verbose: false,
        demo: false,
        test: false,
        validate: false,
        traceDepth: 5,
        confidence: 0.7
    };
    
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (arg === "--help" || arg === "-h") {
            options.help = true;
        } else if (arg === "--verbose" || arg === "-v") {
            options.verbose = true;
        } else if (arg === "--script" || arg === "-s") {
            if (i + 1 < args.length) {
                options.script = args[i + 1];
                i++; // 跳过下一个参数
            }
        } else if (arg === "--entry" || arg === "-e") {
            if (i + 1 < args.length) {
                options.entry = args[i + 1];
                i++;
            }
        } else if (arg === "--rules" || arg === "-r") {
            if (i + 1 < args.length) {
                options.rules = args[i + 1];
                i++;
            }
        } else if (arg === "--output" || arg === "-o") {
            if (i + 1 < args.length) {
                options.output = args[i + 1];
                i++;
            }
        } else if (arg === "--depth" || arg === "-d") {
            if (i + 1 < args.length) {
                options.traceDepth = parseInt(args[i + 1]);
                i++;
            }
        } else if (arg === "--confidence" || arg === "-c") {
            if (i + 1 < args.length) {
                options.confidence = parseFloat(args[i + 1]);
                i++;
            }
        } else if (arg === "--demo") {
            options.demo = true;
        } else if (arg === "--test") {
            options.test = true;
        } else if (arg === "--validate") {
            options.validate = true;
        } else if (arg === "analyze") {
            options.command = "analyze";
        } else if (arg === "demo") {
            options.command = "demo";
        } else if (arg === "test") {
            options.command = "test";
        } else if (arg === "validate") {
            options.command = "validate";
        } else if (!arg.startsWith("-")) {
            // 位置参数
            if (!options.command) {
                options.command = arg;
            } else if (!options.script) {
                options.script = arg;
            } else if (!options.entry) {
                options.entry = arg;
            }
        }
    }
    
    return options;
}

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log("Jalangi2 Semantic Analysis CLI - 运行期语义溯源分析工具");
    console.log("");
    console.log("用法:");
    console.log("  jalangi2 analyze [选项] <script> <entry>");
    console.log("  jalangi2 demo [选项]");
    console.log("  jalangi2 test [选项]");
    console.log("  jalangi2 validate [选项]");
    console.log("");
    console.log("命令:");
    console.log("  analyze   - 对指定脚本进行语义分析");
    console.log("  demo      - 运行完整的语义分析演示");
    console.log("  test      - 运行语义分析测试套件");
    console.log("  validate  - 验证语义分析环境");
    console.log("");
    console.log("选项:");
    console.log("  -s, --script <file>      指定要分析的脚本文件");
    console.log("  -e, --entry <func>       指定入口函数名");
    console.log("  -r, --rules <file>       指定AD函数期望规则文件");
    console.log("  -o, --output <file>      指定输出报告文件");
    console.log("  -d, --depth <number>    指定溯源链最大深度 (默认: 5)");
    console.log("  -c, --confidence <num>    指定置信度阈值 (默认: 0.7)");
    console.log("  --demo                    运行演示模式");
    console.log("  --test                    运行测试模式");
    console.log("  --validate                验证环境模式");
    console.log("  -v, --verbose             详细输出");
    console.log("  -h, --help               显示此帮助信息");
    console.log("");
    console.log("示例:");
    console.log("  jalangi2 analyze debug/test-functions.js TestButton_Click");
    console.log("  jalangi2 demo --verbose");
    console.log("  jalangi2 test --confidence 0.8");
    console.log("  jalangi2 validate");
    console.log("");
    console.log("功能特性:");
    console.log("  🔍 函数级插桩 - 精确拦截每一次函数调用");
    console.log("  📊 实参采集 - 获取真实运行期参数和返回值");
    console.log("  ⚠️  违规检测 - 基于AD函数期望规则验证调用语义");
    console.log("  🔗 因果溯源 - 构建'为什么不符合期望'的完整链路");
    console.log("  📋 语义报告 - 集成现有系统，提供修复建议");
}

// ==========================================================
// 命令实现
// ==========================================================

/**
 * 执行分析命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeAnalyze(options) {
    try {
        console.log("[Jalangi2 Semantic] 开始语义分析");
        console.log("[Jalangi2 Semantic] 脚本: " + options.script);
        console.log("[Jalangi2 Semantic] 入口函数: " + options.entry);
        console.log("[Jalangi2 Semantic] 规则文件: " + options.rules);
        console.log("[Jalangi2 Semantic] 输出文件: " + options.output);
        
        // 验证必要参数
        if (!options.script) {
            console.log("[Jalangi2 Semantic] ✗ 请指定要分析的脚本文件");
            return 1;
        }
        
        if (!options.entry) {
            console.log("[Jalangi2 Semantic] ✗ 请指定入口函数名");
            return 1;
        }
        
        // 验证脚本文件存在
        var fs = require("fs");
        if (!fs.existsSync(options.script)) {
            console.log("[Jalangi2 Semantic] ✗ 脚本文件不存在: " + options.script);
            return 1;
        }
        
        // 验证规则文件存在
        if (!fs.existsSync(options.rules)) {
            console.log("[Jalangi2 Semantic] ⚠ 规则文件不存在，使用默认规则: " + options.rules);
        }
        
        // 初始化语义分析器
        console.log("[Jalangi2 Semantic] 初始化语义分析器...");
        if (!global.SemanticAnalysisRunner) {
            console.log("[Jalangi2 Semantic] ✗ SemanticAnalysisRunner不可用");
            return 1;
        }
        
        var initResult = global.SemanticAnalysisRunner.initialize({
            rulesFile: options.rules,
            enableDetailedTracing: options.verbose,
            maxTraceDepth: options.traceDepth
        });
        
        if (!initResult) {
            console.log("[Jalangi2 Semantic] ✗ 语义分析器初始化失败");
            return 1;
        }
        
        console.log("[Jalangi2 Semantic] ✓ 语义分析器初始化成功");
        
        // 执行语义分析
        console.log("[Jalangi2 Semantic] 开始执行语义分析...");
        var analysisResult = global.SemanticAnalysisRunner.runAnalysis(
            options.script,
            options.entry,
            {
                verbose: options.verbose,
                confidence: options.confidence
            }
        );
        
        if (!analysisResult.success) {
            console.log("[Jalangi2 Semantic] ✗ 语义分析失败: " + analysisResult.error);
            return 1;
        }
        
        console.log("[Jalangi2 Semantic] ✓ 语义分析完成");
        
        // 显示分析结果摘要
        var report = analysisResult.semanticReport;
        console.log("[Jalangi2 Semantic] 分析结果摘要:");
        console.log("[Jalangi2 Semantic]   执行时间: " + analysisResult.executionStats.analysisTime + "ms");
        console.log("[Jalangi2 Semantic]   总事件数: " + analysisResult.executionStats.totalEvents);
        
        if (report.violations && report.violations.length > 0) {
            console.log("[Jalangi2 Semantic]   检测到违规: " + report.violations.length + " 个");
            
            if (options.verbose) {
                for (var i = 0; i < report.violations.length; i++) {
                    var violation = report.violations[i];
                    console.log("[Jalangi2 Semantic]     - " + violation.type + ": " + violation.message);
                    if (violation.rootCause) {
                        console.log("[Jalangi2 Semantic]       根本原因: " + violation.rootCause.description);
                    }
                }
            }
        } else {
            console.log("[Jalangi2 Semantic]   未检测到违规");
        }
        
        // 保存报告
        console.log("[Jalangi2 Semantic] 保存分析报告...");
        var path = require("path");
        var outputDir = path.dirname(options.output);
        
        if (!fs.existsSync(outputDir)) {
            try {
                fs.mkdirSync(outputDir, { recursive: true });
                console.log("[Jalangi2 Semantic] ✓ 创建输出目录: " + outputDir);
            } catch (error) {
                console.log("[Jalangi2 Semantic] ⚠ 创建目录失败: " + error.message);
            }
        }
        
        fs.writeFileSync(options.output, JSON.stringify(report, null, 2), "utf8");
        console.log("[Jalangi2 Semantic] ✓ 报告已保存到: " + options.output);
        
        console.log("[Jalangi2 Semantic] ✓ 分析命令完成");
        return 0;
        
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 分析命令失败: " + error.message);
        if (options.verbose) {
            console.log("[Jalangi2 Semantic] 错误堆栈: " + error.stack);
        }
        return 1;
    }
}

/**
 * 执行演示命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeDemo(options) {
    try {
        console.log("[Jalangi2 Semantic] 开始语义分析演示");
        
        // 加载演示脚本
        var demoPath = require("path").join(__dirname, "..", "jalangi", "demo-semantic-analysis.js");
        if (!require("fs").existsSync(demoPath)) {
            console.log("[Jalangi2 Semantic] ✗ 演示脚本不存在: " + demoPath);
            return 1;
        }
        
        console.log("[Jalangi2 Semantic] 加载演示脚本...");
        var demoModule = require(demoPath);
        
        if (typeof demoModule.runDemo === "function") {
            console.log("[Jalangi2 Semantic] 开始运行演示...");
            var demoResult = demoModule.runDemo();
            
            if (demoResult.success) {
                console.log("[Jalangi2 Semantic] ✓ 演示成功完成");
                console.log("[Jalangi2 Semantic]   演示场景: " + demoResult.results.length);
                console.log("[Jalangi2 Semantic]   总违规数: " + demoResult.results.reduce(function(sum, r) { return sum + r.violationCount; }, 0));
                console.log("[Jalangi2 Semantic]   耗时: " + demoResult.duration + "ms");
                
                if (options.verbose && demoResult.summaryReport) {
                    console.log("[Jalangi2 Semantic] 详细报告已生成");
                }
                
                return 0;
            } else {
                console.log("[Jalangi2 Semantic] ✗ 演示执行失败: " + demoResult.error);
                return 1;
            }
        } else {
            console.log("[Jalangi2 Semantic] ✗ 演示脚本接口无效");
            return 1;
        }
        
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 演示命令失败: " + error.message);
        if (options.verbose) {
            console.log("[Jalangi2 Semantic] 错误堆栈: " + error.stack);
        }
        return 1;
    }
}

/**
 * 执行测试命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeTest(options) {
    try {
        console.log("[Jalangi2 Semantic] 开始语义分析测试");
        
        // 加载测试脚本
        var testPath = require("path").join(__dirname, "..", "__tests__", "jalangi2-semantic-test.js");
        if (!require("fs").existsSync(testPath)) {
            console.log("[Jalangi2 Semantic] ✗ 测试脚本不存在: " + testPath);
            return 1;
        }
        
        console.log("[Jalangi2 Semantic] 加载测试脚本...");
        var testModule = require(testPath);
        
        if (typeof testModule.main === "function") {
            console.log("[Jalangi2 Semantic] 开始运行测试...");
            var testResult = testModule.main();
            
            if (testResult) {
                console.log("[Jalangi2 Semantic] ✓ 所有测试通过");
                return 0;
            } else {
                console.log("[Jalangi2 Semantic] ✗ 部分测试失败");
                return 1;
            }
        } else {
            console.log("[Jalangi2 Semantic] ✗ 测试脚本接口无效");
            return 1;
        }
        
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 测试命令失败: " + error.message);
        if (options.verbose) {
            console.log("[Jalangi2 Semantic] 错误堆栈: " + error.stack);
        }
        return 1;
    }
}

/**
 * 执行验证命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeValidate(options) {
    try {
        console.log("[Jalangi2 Semantic] 开始环境验证");
        
        var issues = [];
        var warnings = [];
        
        // 验证核心模块
        if (typeof ValueHistoryTracker === "undefined") {
            issues.push("ValueHistoryTracker不可用");
        } else {
            console.log("[Jalangi2 Semantic] ✓ ValueHistoryTracker可用");
        }
        
        if (typeof ExpectationEngine === "undefined") {
            issues.push("ExpectationEngine不可用");
        } else {
            console.log("[Jalangi2 Semantic] ✓ ExpectationEngine可用");
        }
        
        if (typeof ViolationTracer === "undefined") {
            issues.push("ViolationTracer不可用");
        } else {
            console.log("[Jalangi2 Semantic] ✓ ViolationTracer可用");
        }
        
        if (typeof SemanticReporter === "undefined") {
            issues.push("SemanticReporter不可用");
        } else {
            console.log("[Jalangi2 Semantic] ✓ SemanticReporter可用");
        }
        
        if (typeof SemanticAnalysisRunner === "undefined") {
            issues.push("SemanticAnalysisRunner不可用");
        } else {
            console.log("[Jalangi2 Semantic] ✓ SemanticAnalysisRunner可用");
        }
        
        // 验证规则文件
        var fs = require("fs");
        var rulesFile = options.rules;
        if (fs.existsSync(rulesFile)) {
            console.log("[Jalangi2 Semantic] ✓ 规则文件存在: " + rulesFile);
        } else {
            warnings.push("规则文件不存在: " + rulesFile);
        }
        
        // 验证输出目录
        var path = require("path");
        var outputDir = path.dirname(options.output);
        if (fs.existsSync(outputDir)) {
            console.log("[Jalangi2 Semantic] ✓ 输出目录可用: " + outputDir);
        } else {
            try {
                fs.mkdirSync(outputDir, { recursive: true });
                console.log("[Jalangi2 Semantic] ✓ 创建输出目录: " + outputDir);
            } catch (error) {
                issues.push("输出目录不可用: " + outputDir);
            }
        }
        
        // 验证Capability Query
        if (global.CapabilityQuery) {
            console.log("[Jalangi2 Semantic] ✓ CapabilityQuery可用");
        } else {
            warnings.push("CapabilityQuery不可用（可选）");
        }
        
        // 输出验证结果
        console.log("[Jalangi2 Semantic] 验证完成:");
        if (issues.length === 0 && warnings.length === 0) {
            console.log("[Jalangi2 Semantic] ✓ 所有检查通过，环境就绪");
        } else {
            if (issues.length > 0) {
                console.log("[Jalangi2 Semantic] ✗ 发现问题:");
                for (var i = 0; i < issues.length; i++) {
                    console.log("[Jalangi2 Semantic]   - " + issues[i]);
                }
            }
            if (warnings.length > 0) {
                console.log("[Jalangi2 Semantic] ⚠ 警告:");
                for (var i = 0; i < warnings.length; i++) {
                    console.log("[Jalangi2 Semantic]   - " + warnings[i]);
                }
            }
        }
        
        return issues.length > 0 ? 1 : 0;
        
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 验证命令失败: " + error.message);
        return 1;
    }
}

// ==========================================================
// 主函数
// ==========================================================

/**
 * 主函数
 * @param {Array} args - 命令行参数
 * @return {Number} 退出码
 */
function main(args) {
    try {
        console.log("[Jalangi2 Semantic] Jalangi2 语义分析CLI启动");
        
        // 加载依赖
        if (!loadJalangi2Dependencies()) {
            console.log("[Jalangi2 Semantic] ✗ 依赖加载失败，退出");
            return 1;
        }
        
        // 解析参数
        var options = parseArguments(args);
        
        // 显示帮助
        if (options.help) {
            showHelp();
            return 0;
        }
        
        // 如果没有指定命令，默认显示帮助
        if (!options.command) {
            console.log("[Jalangi2 Semantic] 未指定命令，显示帮助信息");
            showHelp();
            return 0;
        }
        
        // 执行命令
        var exitCode = 0;
        
        if (options.command === "analyze") {
            exitCode = executeAnalyze(options);
        } else if (options.command === "demo") {
            exitCode = executeDemo(options);
        } else if (options.command === "test") {
            exitCode = executeTest(options);
        } else if (options.command === "validate") {
            exitCode = executeValidate(options);
        } else {
            console.log("[Jalangi2 Semantic] ✗ 未知命令: " + options.command);
            console.log("[Jalangi2 Semantic] 使用 --help 查看帮助信息");
            exitCode = 1;
        }
        
        console.log("[Jalangi2 Semantic] CLI执行完成，退出码: " + exitCode);
        return exitCode;
        
    } catch (error) {
        console.log("[Jalangi2 Semantic] ✗ 主函数执行失败: " + error.message);
        return 1;
    }
}

// ==========================================================
// 导出和执行
// ==========================================================

// 导出模块
var moduleExports = {
    main: main,
    parseArguments: parseArguments,
    executeAnalyze: executeAnalyze,
    executeDemo: executeDemo,
    executeTest: executeTest,
    executeValidate: executeValidate,
    loadJalangi2Dependencies: loadJalangi2Dependencies
};

// Node.js环境下的执行
if (typeof require !== "undefined") {
    module.exports = moduleExports;
    
    if (require.main === module) {
        var args = process.argv.slice(2); // 移除node和脚本名
        var exitCode = main(args);
        process.exit(exitCode);
    }
}

// 浏览器环境下的导出
if (typeof window !== "undefined") {
    window.jalangi2Semantic = moduleExports;
}

console.log("[Jalangi2 Semantic] jalangi2-semantic.js 加载完成");
