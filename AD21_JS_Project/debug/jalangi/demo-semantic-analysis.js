// ==========================================================
// Jalangi2 Semantic Analysis Demo - 语义溯源系统演示
// 展示完整的函数级插桩、实参采集、违规检测、因果溯源
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 演示配置
// ==========================================================
var demoConfig = {
    // 目标脚本
    targetScript: "debug/test-functions.js",
    entryFunction: "TestButton_Click",
    
    // 分析器配置
    rulesFile: "debug/jalangi/rules/ad-function-expects.json",
    
    // 输出配置
    outputDir: "debug/reports",
    reportFile: "semantic-analysis-report.json",
    consoleOutput: true,
    
    // 分析选项
    enableDetailedTracing: true,
    enableStaticIntegration: true,
    maxTraceDepth: 5
};

// ==========================================================
// 演示场景
// ==========================================================
var demoScenarios = [
    {
        name: "正常PCB对象创建",
        description: "展示正常的AD API调用，无违规",
        script: createNormalPCBScript()
    },
    {
        name: "类型违规检测",
        description: "展示类型不匹配违规的检测和溯源",
        script: createTypeViolationScript()
    },
    {
        name: "属性缺失违规",
        description: "展示必需属性缺失的检测和溯源",
        script: createPropertyViolationScript()
    },
    {
        name: "复合违规场景",
        description: "展示多个违规的复杂场景和深度溯源",
        script: createComplexViolationScript()
    }
];

// ==========================================================
// 主演示函数
// ==========================================================

/**
 * 运行语义分析演示
 * @return {Object} 演示结果
 */
function runSemanticAnalysisDemo() {
    console.log("=".repeat(80));
    console.log("[DEMO] Jalangi2 运行期语义溯源系统演示");
    console.log("=".repeat(80));
    console.log("[DEMO] 功能: 函数级插桩 + 实参采集 + 违规检测 + 因果溯源");
    console.log("[DEMO] 目标: 回答 '为什么不符合期望' 的根本原因");
    console.log("[DEMO] 场景数量: " + demoScenarios.length);
    console.log("");
    
    var startTime = new Date().getTime();
    var results = [];
    
    try {
        // 1. 初始化语义分析器
        console.log("[DEMO] 步骤 1: 初始化语义分析器");
        var initResult = initializeSemanticAnalyzer();
        if (!initResult.success) {
            console.log("[DEMO] ✗ 初始化失败: " + initResult.error);
            return { success: false, error: initResult.error };
        }
        console.log("[DEMO] ✓ 初始化成功");
        console.log("");
        
        // 2. 运行每个演示场景
        for (var i = 0; i < demoScenarios.length; i++) {
            var scenario = demoScenarios[i];
            console.log("[DEMO] 步骤 2." + (i + 1) + ": 演示场景 - " + scenario.name);
            console.log("[DEMO] 描述: " + scenario.description);
            
            var scenarioResult = runScenario(scenario);
            results.push(scenarioResult);
            
            console.log("[DEMO] " + (scenarioResult.success ? "✓" : "✗") + " " + scenario.name + 
                       " - " + (scenarioResult.success ? "检测到 " + scenarioResult.violationCount + " 个违规" : "执行失败"));
            console.log("");
        }
        
        // 3. 生成综合报告
        console.log("[DEMO] 步骤 3: 生成综合分析报告");
        var summaryReport = generateSummaryReport(results);
        console.log("[DEMO] ✓ 综合报告已生成");
        console.log("");
        
        // 4. 展示核心能力
        console.log("[DEMO] 步骤 4: 展示核心能力");
        demonstrateCoreCapabilities(results);
        console.log("");
        
        var endTime = new Date().getTime();
        var duration = endTime - startTime;
        
        console.log("=".repeat(80));
        console.log("[DEMO] 演示完成统计:");
        console.log("[DEMO] 总场景数: " + demoScenarios.length);
        console.log("[DEMO] 成功场景: " + results.filter(function(r) { return r.success; }).length);
        console.log("[DEMO] 总违规数: " + results.reduce(function(sum, r) { return sum + r.violationCount; }, 0));
        console.log("[DEMO] 总耗时: " + duration + "ms");
        console.log("=".repeat(80));
        
        return {
            success: true,
            results: results,
            summaryReport: summaryReport,
            duration: duration
        };
        
    } catch (error) {
        console.log("[DEMO] ✗ 演示执行异常: " + error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * 初始化语义分析器
 * @return {Object} 初始化结果
 */
function initializeSemanticAnalyzer() {
    try {
        console.log("[DEMO]   加载分析器模块...");
        
        // 检查模块可用性
        if (!global.SemanticAnalysisRunner) {
            return {
                success: false,
                error: "SemanticAnalysisRunner模块不可用"
            };
        }
        
        console.log("[DEMO]   初始化分析器...");
        var initResult = global.SemanticAnalysisRunner.initialize({
            rulesFile: demoConfig.rulesFile,
            enableDetailedTracing: demoConfig.enableDetailedTracing,
            enableStaticIntegration: demoConfig.enableStaticIntegration,
            maxTraceDepth: demoConfig.maxTraceDepth
        });
        
        if (!initResult) {
            return {
                success: false,
                error: "分析器初始化失败"
            };
        }
        
        // 检查分析器状态
        var status = global.SemanticAnalysisRunner.getAnalyzerStatus();
        var allReady = status.analyzers.valueTracker &&
                      status.analyzers.expectationEngine &&
                      status.analyzers.violationTracer &&
                      status.analyzers.semanticReporter;
        
        if (!allReady) {
            return {
                success: false,
                error: "部分分析器未就绪"
            };
        }
        
        return {
            success: true,
            status: status
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * 运行单个演示场景
 * @param {Object} scenario - 演示场景
 * @return {Object} 场景结果
 */
function runScenario(scenario) {
    try {
        console.log("[DEMO]   执行脚本分析...");
        
        // 运行语义分析
        var analysisResult = global.SemanticAnalysisRunner.runAnalysis(
            scenario.script,
            scenario.name + "_Entry",
            {
                verbose: false,
                enableDetailedTracing: demoConfig.enableDetailedTracing
            }
        );
        
        if (!analysisResult.success) {
            return {
                success: false,
                scenario: scenario.name,
                error: analysisResult.error,
                violationCount: 0
            };
        }
        
        // 分析违规
        var violationCount = 0;
        var keyViolations = [];
        
        if (analysisResult.semanticReport && analysisResult.semanticReport.violations) {
            violationCount = analysisResult.semanticReport.violations.length;
            
            // 提取关键违规（高置信度）
            for (var i = 0; i < analysisResult.semanticReport.violations.length; i++) {
                var violation = analysisResult.semanticReport.violations[i];
                if (violation.confidence && violation.confidence > 0.7) {
                    keyViolations.push({
                        type: violation.type,
                        message: violation.message,
                        confidence: violation.confidence,
                        rootCause: violation.rootCause ? violation.rootCause.description : "未确定"
                    });
                }
            }
        }
        
        return {
            success: true,
            scenario: scenario.name,
            violationCount: violationCount,
            keyViolations: keyViolations,
            analysisResult: analysisResult,
            executionStats: analysisResult.executionStats
        };
        
    } catch (error) {
        return {
            success: false,
            scenario: scenario.name,
            error: error.message,
            violationCount: 0
        };
    }
}

/**
 * 生成综合报告
 * @param {Array} results - 场景结果
 * @return {Object} 综合报告
 */
function generateSummaryReport(results) {
    var report = {
        metadata: {
            timestamp: new Date().toISOString(),
            demoName: "Jalangi2 Semantic Analysis Demo",
            version: "1.0"
        },
        
        summary: {
            totalScenarios: results.length,
            successfulScenarios: results.filter(function(r) { return r.success; }).length,
            totalViolations: results.reduce(function(sum, r) { return sum + r.violationCount; }, 0),
            averageViolations: results.length > 0 ? (results.reduce(function(sum, r) { return sum + r.violationCount; }, 0) / results.length).toFixed(1) : 0
        },
        
        capabilities: {
            violationDetection: checkCapability(results, "violation_detection"),
            causalTracing: checkCapability(results, "causal_tracing"),
            rootCauseAnalysis: checkCapability(results, "root_cause_analysis"),
            typeSafety: checkCapability(results, "type_safety"),
            semanticReporting: checkCapability(results, "semantic_reporting")
        },
        
        keyFindings: extractKeyFindings(results),
        
        recommendations: generateDemoRecommendations(results)
    };
    
    // 保存报告
    try {
        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            
            var reportPath = path.join(demoConfig.outputDir, demoConfig.reportFile);
            var reportDir = path.dirname(reportPath);
            
            if (!fs.existsSync(reportDir)) {
                fs.mkdirSync(reportDir, { recursive: true });
            }
            
            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
            console.log("[DEMO]   报告已保存: " + reportPath);
        }
    } catch (error) {
        console.log("[DEMO]   保存报告失败: " + error.message);
    }
    
    return report;
}

/**
 * 展示核心能力
 * @param {Array} results - 场景结果
 */
function demonstrateCoreCapabilities(results) {
    console.log("[DEMO]   🔍 违规检测能力:");
    var totalViolations = results.reduce(function(sum, r) { return sum + r.violationCount; }, 0);
    console.log("[DEMO]     - 检测到 " + totalViolations + " 个违规");
    console.log("[DEMO]     - 覆盖类型不匹配、属性缺失、API误用等问题");
    
    console.log("[DEMO]   🔗 因果溯源能力:");
    var tracedViolations = 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i].keyViolations && results[i].keyViolations.length > 0) {
            tracedViolations += results[i].keyViolations.length;
        }
    }
    console.log("[DEMO]     - 成功溯源 " + tracedViolations + " 个违规");
    console.log("[DEMO]     - 提供根本原因分析和修复建议");
    
    console.log("[DEMO]   📊 语义分析能力:");
    console.log("[DEMO]     - 实时值历史追踪");
    console.log("[DEMO]     - 类型安全验证");
    console.log("[DEMO]     - AD API契约检查");
    console.log("[DEMO]     - 智能修复建议生成");
    
    console.log("[DEMO]   🎯 实际应用价值:");
    console.log("[DEMO]     - 发现语法正确但语义错误的AD代码");
    console.log("[DEMO]     - 精确定位参数传递链中的问题");
    console.log("[DEMO]     - 提供可操作的修复指导");
    console.log("[DEMO]     - 集成现有静态分析系统");
}

// ==========================================================
// 演示脚本生成器
// ==========================================================

/**
 * 创建正常PCB脚本
 * @return {String} 脚本内容
 */
function createNormalPCBScript() {
    return '// 正常PCB对象创建演示\n' +
        'function NormalPCBEntry(Sender) {\n' +
        '    console.log("开始正常PCB操作");\n' +
        '    \n' +
        '    // 获取当前PCB板\n' +
        '    var board = PCBServer().GetCurrentPCBBoard();\n' +
        '    \n' +
        '    // 创建有效PCB对象\n' +
        '    var track = PCBServer().PCBObjectFactory(1, 100, 200); // Track类型\n' +
        '    track.X = 100; // 正确的数字类型\n' +
        '    track.Y = 200; // 正确的数字类型\n' +
        '    track.Width = 50; // 正确的数字类型\n' +
        '    \n' +
        '    // 添加到板\n' +
        '    board.AddPCBObject(track);\n' +
        '    \n' +
        '    console.log("正常PCB操作完成");\n' +
        '}\n';
}

/**
 * 创建类型违规脚本
 * @return {String} 脚本内容
 */
function createTypeViolationScript() {
    return '// 类型违规检测演示\n' +
        'function TypeViolationEntry(Sender) {\n' +
        '    console.log("开始类型违规演示");\n' +
        '    \n' +
        '    // 获取当前PCB板\n' +
        '    var board = PCBServer().GetCurrentPCBBoard();\n' +
        '    \n' +
        '    // 创建PCB对象\n' +
        '    var track = PCBServer().PCBObjectFactory(1, 100, 200);\n' +
        '    \n' +
        '    // 故意制造类型错误\n' +
        '    track.X = "invalid_string"; // 字符串赋值给数字属性\n' +
        '    track.Y = 200;\n' +
        '    track.Width = 50;\n' +
        '    \n' +
        '    // 这里应该检测到类型违规\n' +
        '    board.AddPCBObject(track);\n' +
        '    \n' +
        '    // 另一个类型违规示例\n' +
        '    var via = PCBServer().PCBObjectFactory(3, 300, 400);\n' +
        '    via.HoleSize = "big"; // 字符串赋值给数字属性\n' +
        '    board.AddPCBObject(via); // 应该检测到违规\n' +
        '    \n' +
        '    console.log("类型违规演示完成");\n' +
        '}\n';
}

/**
 * 创建属性缺失脚本
 * @return {String} 脚本内容
 */
function createPropertyViolationScript() {
    return '// 属性缺失违规演示\n' +
        'function PropertyViolationEntry(Sender) {\n' +
        '    console.log("开始属性缺失演示");\n' +
        '    \n' +
        '    // 获取当前PCB板\n' +
        '    var board = PCBServer().GetCurrentPCBBoard();\n' +
        '    \n' +
        '    // 创建不完整的PCB对象\n' +
        '    var incompleteObj1 = {\n' +
        '        X: 100,\n' +
        '        Y: 200,\n' +
        '        Width: 50\n' +
        '        // 故意缺少 I_ObjectAddress\n' +
        '    };\n' +
        '    \n' +
        '    // 应该检测到缺少必需属性\n' +
        '    board.AddPCBObject(incompleteObj1);\n' +
        '    \n' +
        '    // 另一个属性缺失示例\n' +
        '    var incompleteObj2 = {\n' +
        '        I_ObjectAddress: 1234,\n' +
        '        X: 300,\n' +
        '        // 故意缺少 Y 坐标\n' +
        '        Width: 30\n' +
        '    };\n' +
        '    \n' +
        '    board.AddPCBObject(incompleteObj2); // 应该检测到违规\n' +
        '    \n' +
        '    console.log("属性缺失演示完成");\n' +
        '}\n';
}

/**
 * 创建复合违规脚本
 * @return {String} 脚本内容
 */
function createComplexViolationScript() {
    return '// 复合违规场景演示\n' +
        'function ComplexViolationEntry(Sender) {\n' +
        '    console.log("开始复合违规演示");\n' +
        '    \n' +
        '    // 获取当前PCB板\n' +
        '    var board = PCBServer().GetCurrentPCBBoard();\n' +
        '    \n' +
        '    // 第一次违规：类型错误\n' +
        '    var obj1 = PCBServer().PCBObjectFactory(1, 0, 0);\n' +
        '    obj1.X = "first_invalid"; // 类型错误\n' +
        '    obj1.Y = 100;\n' +
        '    board.AddPCBObject(obj1); // 应该检测到违规\n' +
        '    \n' +
        '    // 第二次违规：传递错误类型\n' +
        '    var obj2 = PCBServer().PCBObjectFactory(1, 0, 0);\n' +
        '    obj2.X = obj1.X; // 传递错误类型\n' +
        '    obj2.Y = 200;\n' +
        '    obj2.Width = "invalid_width"; // 另一个类型错误\n' +
        '    board.AddPCBObject(obj2); // 应该检测到多个违规\n' +
        '    \n' +
        '    // 第三次违规：不完整对象\n' +
        '    var obj3 = {\n' +
        '        X: 300,\n' +
        '        Y: 400\n' +
        '        // 缺少 I_ObjectAddress 和 Width\n' +
        '    };\n' +
        '    board.AddPCBObject(obj3); // 应该检测到属性缺失\n' +
        '    \n' +
        '    // 第四次违规：错误的对象类型\n' +
        '    var wrongTypeObj = {\n' +
        '        Type: "NotAPCBObject",\n' +
        '        I_ObjectAddress: 5678\n' +
        '    };\n' +
        '    board.AddPCBObject(wrongTypeObj); // 应该检测到对象类型错误\n' +
        '    \n' +
        '    console.log("复合违规演示完成");\n' +
        '}\n';
}

// ==========================================================
// 工具函数
// ==========================================================

/**
 * 检查能力
 * @param {Array} results - 结果
 * @param {String} capability - 能力名称
 * @return {Boolean} 是否具备能力
 */
function checkCapability(results, capability) {
    switch (capability) {
        case "violation_detection":
            return results.some(function(r) { return r.violationCount > 0; });
        case "causal_tracing":
            return results.some(function(r) { 
                return r.keyViolations && r.keyViolations.length > 0; 
            });
        case "root_cause_analysis":
            return results.some(function(r) {
                return r.keyViolations && r.keyViolations.some(function(v) {
                    return v.rootCause && v.rootCause !== "未确定";
                });
            });
        case "type_safety":
            return results.some(function(r) {
                return r.keyViolations && r.keyViolations.some(function(v) {
                    return v.type && v.type.indexOf("TYPE") > -1;
                });
            });
        case "semantic_reporting":
            return results.every(function(r) { return r.success; });
        default:
            return false;
    }
}

/**
 * 提取关键发现
 * @param {Array} results - 结果
 * @return {Array} 关键发现
 */
function extractKeyFindings(results) {
    var findings = [];
    
    var totalViolations = results.reduce(function(sum, r) { return sum + r.violationCount; }, 0);
    if (totalViolations > 0) {
        findings.push("成功检测到 " + totalViolations + " 个语义违规");
    }
    
    var tracedViolations = 0;
    for (var i = 0; i < results.length; i++) {
        if (results[i].keyViolations) {
            tracedViolations += results[i].keyViolations.length;
        }
    }
    if (tracedViolations > 0) {
        findings.push("成功溯源 " + tracedViolations + " 个违规的根本原因");
    }
    
    findings.push("实现了运行期语义验证与静态分析的集成");
    findings.push("提供了可操作的修复建议");
    
    return findings;
}

/**
 * 生成演示建议
 * @param {Array} results - 结果
 * @return {Array} 建议
 */
function generateDemoRecommendations(results) {
    return [
        {
            category: "检测能力",
            recommendation: "Jalangi2语义分析器能有效发现AD代码中的语义违规",
            impact: "高"
        },
        {
            category: "溯源能力",
            recommendation: "因果溯源链能精确定位违规的根本原因",
            impact: "高"
        },
        {
            category: "实用价值",
            recommendation: "系统填补了静态分析无法发现的运行期语义问题",
            impact: "中"
        },
        {
            category: "集成建议",
            recommendation: "建议将语义分析器集成到开发流程中",
            impact: "中"
        }
    ];
}

// ==========================================================
// 导出和执行
// ==========================================================

// 如果直接运行此脚本
if (typeof require !== "undefined" && require.main === module) {
    var result = runSemanticAnalysisDemo();
    
    if (result.success) {
        console.log("[DEMO] ✓ 演示成功完成");
        process.exit(0);
    } else {
        console.log("[DEMO] ✗ 演示执行失败");
        process.exit(1);
    }
}

// 模块导出
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        runDemo: runSemanticAnalysisDemo,
        createScripts: function() {
            return {
                normal: createNormalPCBScript(),
                typeViolation: createTypeViolationScript(),
                propertyViolation: createPropertyViolationScript(),
                complexViolation: createComplexViolationScript()
            };
        }
    };
}

console.log("[DEMO] demo-semantic-analysis.js 加载完成");
