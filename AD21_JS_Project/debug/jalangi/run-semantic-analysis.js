// ==========================================================
// Jalangi2 Semantic Analysis Runner - 运行期语义分析启动器
// 整合值历史、期望引擎、违规追踪、语义报告
// 严格遵循ES3语法规范
// ==========================================================

var SemanticAnalysisRunner = (function(){
    
    // ==========================================================
    // 私有变量
    // ==========================================================
    var _initialized = false;
    var _analyzers = {};
    var _rules = null;
    var _entryFunction = null;
    var _startTime = null;
    var _executionStats = {
        totalEvents: 0,
        analysisTime: 0,
        memoryUsage: 0,
        traceComplexity: 0
    };
    
    // ==========================================================
    // 初始化
    // ==========================================================
    
    /**
     * 初始化语义分析器
     * @param {Object} options - 配置选项
     * @return {Boolean} 是否初始化成功
     */
    function initialize(options) {
        console.log("[SemanticAnalysisRunner] 初始化语义分析器...");
        
        options = options || {};
        
        try {
            // 加载AD函数期望规则
            _rules = loadRules(options.rulesFile || "debug/jalangi/rules/ad-function-expects.json");
            
            // 初始化值历史追踪器
            if (typeof ValueHistoryTracker !== "undefined") {
                _analyzers.valueTracker = ValueHistoryTracker;
                console.log("[SemanticAnalysisRunner] 值历史追踪器已加载");
            } else {
                console.log("[SemanticAnalysisRunner] 警告: ValueHistoryTracker不可用");
                return false;
            }
            
            // 初始化期望引擎
            if (typeof ExpectationEngine !== "undefined") {
                _analyzers.expectationEngine = ExpectationEngine;
                _analyzers.expectationEngine.initialize(_rules, _analyzers.valueTracker);
                console.log("[SemanticAnalysisRunner] 期望引擎已加载");
            } else {
                console.log("[SemanticAnalysisRunner] 警告: ExpectationEngine不可用");
                return false;
            }
            
            // 初始化违规追踪器
            if (typeof ViolationTracer !== "undefined") {
                _analyzers.violationTracer = ViolationTracer;
                _analyzers.violationTracer.initialize(_analyzers.valueTracker, _analyzers.expectationEngine);
                console.log("[SemanticAnalysisRunner] 违规追踪器已加载");
            } else {
                console.log("[SemanticAnalysisRunner] 警告: ViolationTracer不可用");
                return false;
            }
            
            // 初始化语义报告器
            if (typeof SemanticReporter !== "undefined") {
                _analyzers.semanticReporter = SemanticReporter;
                _analyzers.semanticReporter.initialize(_analyzers.valueTracker, _analyzers.expectationEngine, _analyzers.violationTracer);
                console.log("[SemanticAnalysisRunner] 语义报告器已加载");
            } else {
                console.log("[SemanticAnalysisRunner] 警告: SemanticReporter不可用");
                return false;
            }
            
            _initialized = true;
            console.log("[SemanticAnalysisRunner] ✓ 语义分析器初始化成功");
            
            return true;
            
        } catch (error) {
            console.log("[SemanticAnalysisRunner] ✗ 初始化失败: " + error.message);
            return false;
        }
    }
    
    /**
     * 加载规则文件
     * @param {String} rulesFile - 规则文件路径
     * @return {Object} 规则对象
     */
    function loadRules(rulesFile) {
        try {
            if (typeof require !== "undefined") {
                var fs = require("fs");
                var path = require("path");
                
                var fullPath = path.resolve(process.cwd(), rulesFile);
                if (fs.existsSync(fullPath)) {
                    var rulesContent = fs.readFileSync(fullPath, "utf8");
                    var rules = JSON.parse(rulesContent);
                    console.log("[SemanticAnalysisRunner] 已加载规则文件: " + rulesFile);
                    return rules;
                } else {
                    console.log("[SemanticAnalysisRunner] 规则文件不存在: " + fullPath);
                    return {};
                }
            } else {
                console.log("[SemanticAnalysisRunner] 警告: 文件系统不可用");
                return {};
            }
        } catch (error) {
            console.log("[SemanticAnalysisRunner] 加载规则失败: " + error.message);
            return {};
        }
    }
    
    // ==========================================================
    // Jalangi2 Analysis接口整合
    // ==========================================================
    
    /**
     * 创建统一的Jalangi2分析接口
     * @return {Object} 分析接口
     */
    function createUnifiedAnalysis() {
        return {
            // 值历史追踪
            write: function(iid, name, val, lhs) {
                if (_analyzers.valueTracker) {
                    return _analyzers.valueTracker.write(iid, name, val, lhs);
                }
            },
            
            invokeFun: function(iid, f, base, args, result) {
                if (!_analyzers.valueTracker || !_analyzers.expectationEngine) {
                    return result;
                }
                
                var functionName = "";
                if (f && f.name) {
                    functionName = f.name;
                } else if (f && f.toString) {
                    var match = f.toString().match(/function\s+(\w+)/);
                    if (match) {
                        functionName = match[1];
                    } else {
                        functionName = "anonymous";
                    }
                } else {
                    functionName = "unknown";
                }
                
                console.log("[SemanticAnalysisRunner] 函数调用: " + functionName);
                
                // 记录函数入口
                if (_analyzers.expectationEngine) {
                    _analyzers.expectationEngine.functionEnter(functionName, iid);
                }
                
                // 执行期望验证
                _analyzers.expectationEngine.validateFunctionCall(functionName, base, args, result, iid, getLocation(iid));
                
                // 记录值历史
                if (_analyzers.valueTracker) {
                    _analyzers.valueTracker.invokeFun(iid, f, base, args, result);
                }
                
                // 记录违规
                var violations = _analyzers.expectationEngine.getViolations();
                if (violations && violations.length > 0) {
                    for (var i = 0; i < violations.length; i++) {
                        var lastViolation = violations[violations.length - 1];
                        if (_analyzers.violationTracer) {
                            _analyzers.violationTracer.traceViolation(lastViolation);
                        }
                    }
                }
                
                // 记录函数退出
                if (_analyzers.expectationEngine) {
                    _analyzers.expectationEngine.functionExit(functionName);
                }
                
                _executionStats.totalEvents++;
                
                return result;
            },
            
            literal: function(iid, val) {
                if (_analyzers.valueTracker) {
                    return _analyzers.valueTracker.literal(iid, val);
                }
            },
            
            putField: function(iid, base, offset, val) {
                if (_analyzers.valueTracker) {
                    return _analyzers.valueTracker.putField(iid, base, offset, val);
                }
            },
            
            // 对象创建检测
            objectCreation: function(iid, val) {
                if (_analyzers.valueTracker) {
                    // 尝试识别对象类型
                    var objectType = "unknown";
                    if (val && typeof val === "object") {
                        if (val.I_ObjectAddress !== undefined) {
                            if (val.Width !== undefined && val.HoleSize === undefined) {
                                objectType = "track";
                            } else if (val.HoleSize !== undefined && val.LowLayer !== undefined) {
                                objectType = "via";
                            } else if (val.HoleSize !== undefined) {
                                objectType = "pad";
                            } else {
                                objectType = "pcb_object";
                            }
                        }
                    }
                    
                    _analyzers.valueTracker.recordObjectCreation(objectType, val, "jalangi2_analysis", iid, getLocation(iid));
                }
            },
            
            // 条件分支
            conditional: function(iid, result) {
                _executionStats.totalEvents++;
            },
            
            // 执行开始
            scriptLoad: function() {
                _startTime = new Date().getTime();
                console.log("[SemanticAnalysisRunner] 开始分析");
            },
            
            // 执行结束
            scriptExit: function() {
                var endTime = new Date().getTime();
                _executionStats.analysisTime = endTime - _startTime;
                console.log("[SemanticAnalysisRunner] 分析完成，耗时: " + _executionStats.analysisTime + "ms");
            }
        };
    }
    
    /**
     * 获取位置信息
     * @param {String} iid - 指令ID
     * @return {String} 位置信息
     */
    function getLocation(iid) {
        // 简化实现，实际应该使用Jalangi2的位置映射
        return "iid:" + iid;
    }
    
    // ==========================================================
    // 核心执行函数
    // ==========================================================
    
    /**
     * 执行语义分析
     * @param {String} scriptPath - 脚本路径
     * @param {String} entryFunction - 入口函数
     * @param {Object} options - 选项
     * @return {Object} 分析结果
     */
    function runAnalysis(scriptPath, entryFunction, options) {
        if (!_initialized) {
            console.log("[SemanticAnalysisRunner] 分析器未初始化");
            return { success: false, error: "analyzer_not_initialized" };
        }
        
        options = options || {};
        _entryFunction = entryFunction;
        _startTime = new Date().getTime();
        _executionStats = {
            totalEvents: 0,
            analysisTime: 0,
            memoryUsage: 0,
            traceComplexity: 0
        };
        
        console.log("[SemanticAnalysisRunner] 开始语义分析");
        console.log("[SemanticAnalysisRunner] 脚本: " + scriptPath);
        console.log("[SemanticAnalysisRunner] 入口函数: " + entryFunction);
        
        try {
            // 重置分析器状态
            if (_analyzers.valueTracker) {
                _analyzers.valueTracker.clearHistory();
            }
            if (_analyzers.expectationEngine) {
                _analyzers.expectationEngine.clearViolations();
            }
            if (_analyzers.violationTracer) {
                _analyzers.violationTracer.clearTraces();
            }
            if (_analyzers.semanticReporter) {
                _analyzers.semanticReporter.clearReports();
            }
            
            // 创建Jalangi2分析接口
            var analysis = createUnifiedAnalysis();
            
            // 注册到Jalangi2
            if (typeof J$ !== "undefined") {
                J$.analysis = analysis;
                console.log("[SemanticAnalysisRunner] ✓ 已注册到Jalangi2");
            } else {
                console.log("[SemanticAnalysisRunner] 警告: Jalangi2不可用，使用独立模式");
            }
            
            // 执行脚本
            var result = executeScript(scriptPath, entryFunction, options);
            
            // 生成语义报告
            var semanticReport = generateFinalReport(result);
            
            console.log("[SemanticAnalysisRunner] ✓ 语义分析完成");
            
            return {
                success: true,
                result: result,
                semanticReport: semanticReport,
                executionStats: _executionStats
            };
            
        } catch (error) {
            console.log("[SemanticAnalysisRunner] ✗ 分析执行失败: " + error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 执行脚本
     * @param {String} scriptPath - 脚本路径
     * @param {String} entryFunction - 入口函数
     * @param {Object} options - 选项
     * @return {Object} 执行结果
     */
    function executeScript(scriptPath, entryFunction, options) {
        try {
            // 如果是Jalangi2环境，已经通过插桩执行
            if (typeof J$ !== "undefined") {
                console.log("[SemanticAnalysisRunner] Jalangi2插桩模式，脚本已自动执行");
                return { executed: true, mode: "jalangi2_instrumented" };
            }
            
            // 非Jalangi2环境，手动执行
            console.log("[SemanticAnalysisRunner] 手动执行模式");
            
            // 加载并执行脚本
            if (typeof require !== "undefined") {
                var fs = require("fs");
                var path = require("path");
                
                var fullPath = path.resolve(process.cwd(), scriptPath);
                if (!fs.existsSync(fullPath)) {
                    throw new Error("脚本文件不存在: " + fullPath);
                }
                
                var scriptContent = fs.readFileSync(fullPath, "utf8");
                
                // 创建全局执行环境
                var globalContext = createGlobalContext();
                
                // 在全局上下文中执行脚本
                var script = "(function() {\n" + scriptContent + "\n})();";
                var scriptFunction = new Function("return " + script);
                scriptFunction.call(globalContext);
                
                // 调用入口函数
                var entryFunc = globalContext[entryFunction];
                if (typeof entryFunc === "function") {
                    var sender = { I_ObjectAddress: 9999 }; // 模拟DFM Sender
                    var result = entryFunc(sender);
                    
                    return {
                        executed: true,
                        mode: "manual_execution",
                        result: result,
                        globalContext: globalContext
                    };
                } else {
                    throw new Error("入口函数不存在: " + entryFunction);
                }
            } else {
                throw new Error("require不可用");
            }
            
        } catch (error) {
            console.log("[SemanticAnalysisRunner] 脚本执行失败: " + error.message);
            return { executed: false, error: error.message };
        }
    }
    
    /**
     * 创建全局执行上下文
     * @return {Object} 全局上下文
     */
    function createGlobalContext() {
        var context = {};
        
        // 添加基本对象
        context.console = console;
        context.Date = Date;
        context.JSON = JSON;
        context.Math = Math;
        context.Object = Object;
        context.Array = Array;
        context.String = String;
        context.Number = Number;
        context.Boolean = Boolean;
        
        // 添加AD Mock（如果可用）
        try {
            if (typeof PCBServer === "function") {
                context.PCBServer = PCBServer;
                console.log("[SemanticAnalysisRunner] 已添加PCBServer到全局上下文");
            }
        } catch (error) {
            console.log("[SemanticAnalysisRunner] 警告: PCBServer不可用: " + error.message);
        }
        
        return context;
    }
    
    /**
     * 生成最终报告
     * @param {Object} executionResult - 执行结果
     * @return {Object} 最终报告
     */
    function generateFinalReport(executionResult) {
        var report = {
            metadata: {
                timestamp: new Date().toISOString(),
                entryFunction: _entryFunction,
                analyzerType: "jalangi2_semantic",
                version: "1.0"
            },
            
            execution: {
                mode: executionResult.mode || "unknown",
                success: executionResult.executed || false,
                executionTime: _executionStats.analysisTime
            },
            
            violations: [],
            analysis: {},
            recommendations: []
        };
        
        // 收集违规信息
        if (_analyzers.violationTracer) {
            var traceResults = _analyzers.violationTracer.getTraceResults();
            if (traceResults.length > 0) {
                report.violations = traceResults.map(function(trace) {
                    return {
                        type: trace.originalViolation.type,
                        severity: trace.originalViolation.severity || "ERROR",
                        message: trace.originalViolation.message,
                        location: trace.originalViolation.location,
                        rootCause: trace.rootCause,
                        confidence: trace.confidence,
                        causalChain: trace.causalChain.map(function(link) {
                            return {
                                step: link.step,
                                description: link.description,
                                relevance: link.relevance
                            };
                        })
                    };
                });
            }
        }
        
        // 收集分析信息
        if (_analyzers.semanticReporter) {
            var reports = _analyzers.semanticReporter.getReports();
            if (reports.length > 0) {
                var lastReport = reports[reports.length - 1];
                report.analysis = lastReport.analysis || {};
                report.recommendations = lastReport.recommendations || [];
            }
        }
        
        // 集成静态分析（如果可用）
        if (typeof global !== "undefined" && global.CapabilityQuery) {
            try {
                var staticAnalysis = global.CapabilityQuery.analyzeFunction ? 
                    global.CapabilityQuery.analyzeFunction(_entryFunction) : null;
                    
                if (staticAnalysis) {
                    report.staticAnalysis = staticAnalysis;
                }
            } catch (error) {
                console.log("[SemanticAnalysisRunner] 静态分析集成失败: " + error.message);
            }
        }
        
        // 集成动态分析
        if (_analyzers.valueTracker) {
            var valueStats = _analyzers.valueTracker.getStatistics();
            if (valueStats) {
                report.dynamicAnalysis = {
                    objectProfile: valueStats,
                    executionPattern: "semantic_analysis_enabled"
                };
            }
        }
        
        return report;
    }
    
    // ==========================================================
    // 工具函数
    // ==========================================================
    
    /**
     * 获取统计信息
     * @return {Object} 统计信息
     */
    function getStatistics() {
        return {
            initialized: _initialized,
            analyzers: {
                valueTracker: _analyzers.valueTracker !== null,
                expectationEngine: _analyzers.expectationEngine !== null,
                violationTracer: _analyzers.violationTracer !== null,
                semanticReporter: _analyzers.semanticReporter !== null
            },
            execution: _executionStats
        };
    }
    
    /**
     * 获取分析器状态
     * @return {Object} 分析器状态
     */
    function getAnalyzerStatus() {
        var status = {};
        
        if (_analyzers.valueTracker) {
            status.valueHistory = _analyzers.valueTracker.getStatistics();
        }
        
        if (_analyzers.expectationEngine) {
            status.expectationEngine = _analyzers.expectationEngine.getStatistics();
        }
        
        if (_analyzers.violationTracer) {
            status.violationTracer = _analyzers.violationTracer.getStatistics();
        }
        
        if (_analyzers.semanticReporter) {
            status.semanticReporter = _analyzers.semanticReporter.getStatistics();
        }
        
        return status;
    }
    
    /**
     * 重置分析器
     */
    function reset() {
        if (_analyzers.valueTracker) {
            _analyzers.valueTracker.clearHistory();
        }
        if (_analyzers.expectationEngine) {
            _analyzers.expectationEngine.clearViolations();
        }
        if (_analyzers.violationTracer) {
            _analyzers.violationTracer.clearTraces();
        }
        if (_analyzers.semanticReporter) {
            _analyzers.semanticReporter.clearReports();
        }
        
        _executionStats = {
            totalEvents: 0,
            analysisTime: 0,
            memoryUsage: 0,
            traceComplexity: 0
        };
        
        console.log("[SemanticAnalysisRunner] 分析器已重置");
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 初始化
        initialize: initialize,
        
        // 核心分析
        runAnalysis: runAnalysis,
        
        // 工具方法
        getStatistics: getStatistics,
        getAnalyzerStatus: getAnalyzerStatus,
        reset: reset,
        
        // 底层访问
        getAnalyzers: function() {
            return _analyzers;
        },
        
        // 独立模式执行
        executeScript: executeScript
    };
    
})();

// 如果Jalangi可用，注册analysis
if (typeof J$ !== "undefined") {
    J$.analysis = SemanticAnalysisRunner.createUnifiedAnalysis();
    console.log("[SemanticAnalysisRunner] 已注册到Jalangi2");
}

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.SemanticAnalysisRunner = SemanticAnalysisRunner;
} else {
    this.SemanticAnalysisRunner = SemanticAnalysisRunner;
}

console.log("[SemanticAnalysisRunner] run-semantic-analysis.js 加载完成");
