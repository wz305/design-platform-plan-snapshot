// ==========================================================
// Semantic Reporter - 语义报告生成器
// 将Jalangi2分析结果集成到现有语义系统
// 严格遵循ES3语法规范
// ==========================================================

var SemanticReporter = (function(){
    
    // ==========================================================
    // 私有变量
    // ==========================================================
    var _valueTracker = null;
    var _expectationEngine = null;
    var _violationTracer = null;
    var _reports = [];
    var _capabilityQuery = null;
    
    // ==========================================================
    // 初始化
    // ==========================================================
    
    /**
     * 初始化语义报告器
     * @param {Object} valueTracker - 值追踪器
     * @param {Object} expectationEngine - 期望引擎
     * @param {Object} violationTracer - 违规追踪器
     */
    function initialize(valueTracker, expectationEngine, violationTracer) {
        _valueTracker = valueTracker;
        _expectationEngine = expectationEngine;
        _violationTracer = violationTracer;
        _reports = [];
        
        // 尝试连接现有语义系统
        if (typeof global !== "undefined" && global.CapabilityQuery) {
            _capabilityQuery = global.CapabilityQuery;
            console.log("[SemanticReporter] 已连接CapabilityQuery系统");
        } else {
            console.log("[SemanticReporter] CapabilityQuery系统不可用，使用内置分析");
        }
        
        console.log("[SemanticReporter] 初始化完成");
    }
    
    // ==========================================================
    // 报告生成核心
    // ==========================================================
    
    /**
     * 生成综合语义报告
     * @param {String} entryFunction - 入口函数
     * @param {Array} violations - 违规数组
     * @param {Object} executionStats - 执行统计
     * @return {Object} 综合报告
     */
    function generateSemanticReport(entryFunction, violations, executionStats) {
        console.log("[SemanticReporter] 生成语义报告: " + entryFunction);
        
        var report = {
            metadata: {
                timestamp: new Date().toISOString(),
                entryFunction: entryFunction,
                analyzerType: "jalangi2_semantic",
                version: "1.0"
            },
            
            summary: {
                totalViolations: violations.length,
                errorCount: 0,
                warningCount: 0,
                criticalCount: 0
            },
            
            violations: [],
            
            analysis: {
                semanticIssues: [],
                apiMisuse: [],
                typeSafety: [],
                dataFlow: []
            },
            
            recommendations: [],
            
            integration: {
                staticAnalysis: null,
                dynamicAnalysis: null,
                confidence: 0.0
            }
        };
        
        // 处理违规
        for (var i = 0; i < violations.length; i++) {
            var violation = violations[i];
            var processedViolation = processViolation(violation);
            
            report.violations.push(processedViolation);
            
            // 更新统计
            if (processedViolation.severity === "ERROR") {
                report.summary.errorCount++;
            } else if (processedViolation.severity === "WARNING") {
                report.summary.warningCount++;
            }
            if (processedViolation.severity === "ERROR" && 
                (processedViolation.type === "ARGUMENT_TYPE_MISMATCH" ||
                 processedViolation.type === "RETURN_TYPE_MISMATCH" ||
                 processedViolation.type === "MISSING_REQUIRED_PROPERTY")) {
                report.summary.criticalCount++;
            }
        }
        
        // 生成分析部分
        report.analysis = generateAnalysis(report.violations);
        
        // 生成建议
        report.recommendations = generateRecommendations(report.violations, report.analysis);
        
        // 集成静态分析
        if (_capabilityQuery) {
            report.integration.staticAnalysis = integrateStaticAnalysis(entryFunction);
        }
        
        // 集成动态分析
        report.integration.dynamicAnalysis = integrateDynamicAnalysis(report.violations, executionStats);
        
        // 计算综合置信度
        report.integration.confidence = calculateOverallConfidence(report);
        
        // 缓存报告
        _reports.push(report);
        
        console.log("[SemanticReporter] 报告生成完成，违规: " + report.summary.totalViolations + ", 错误: " + report.summary.errorCount);
        
        return report;
    }
    
    /**
     * 处理单个违规
     * @param {Object} violation - 原始违规
     * @return {Object} 处理后的违规
     */
    function processViolation(violation) {
        var processed = {
            id: "V" + (_reports.length + 1),
            type: violation.type,
            severity: violation.severity || "ERROR",
            message: violation.message,
            location: violation.location,
            
            originalViolation: violation,
            
            semanticContext: {},
            fixComplexity: "medium",
            autoFixable: false
        };
        
        // 添加语义上下文
        processed.semanticContext = extractSemanticContext(violation);
        
        // 评估修复复杂性
        processed.fixComplexity = assessFixComplexity(violation);
        
        // 检查是否可自动修复
        processed.autoFixable = isAutoFixable(violation);
        
        return processed;
    }
    
    /**
     * 提取语义上下文
     * @param {Object} violation - 违规
     * @return {Object} 语义上下文
     */
    function extractSemanticContext(violation) {
        var context = {
            adApiContext: null,
            moduleContext: null,
            typeSystemContext: null,
            dataFlowContext: null
        };
        
        // AD API上下文
        if (violation.function) {
            var adFunction = violation.function;
            if (adFunction.indexOf("PCB") === 0 || adFunction.indexOf("Add") === 0 || adFunction.indexOf("Board") === 0) {
                context.adApiContext = {
                    apiType: classifyADFunction(adFunction),
                    expectedBehavior: getExpectedBehavior(adFunction),
                    actualBehavior: "violated_constraint"
                };
            }
        }
        
        // 模块上下文
        if (violation.callStack && violation.callStack.length > 0) {
            var modules = extractModulesFromCallStack(violation.callStack);
            context.moduleContext = {
                involvedModules: modules,
                boundaryViolation: isModuleBoundaryViolation(violation),
                moduleChain: buildModuleChain(modules)
            };
        }
        
        // 类型系统上下文
        if (violation.type.indexOf("TYPE") > -1) {
            context.typeSystemContext = {
                typeViolation: violation.type,
                expectedType: violation.expectedType,
                actualType: violation.actualType,
                conversionPath: findTypeConversionPath(violation)
            };
        }
        
        // 数据流上下文
        if (violation.cause && violation.cause.valueHistory) {
            context.dataFlowContext = {
                sourceFunction: findSourceFunction(violation.cause.valueHistory),
                transformations: trackDataTransformations(violation.cause.valueHistory),
                sinkLocation: violation.location
            };
        }
        
        return context;
    }
    
    /**
     * 生成分析部分
     * @param {Array} violations - 违规数组
     * @return {Object} 分析结果
     */
    function generateAnalysis(violations) {
        var analysis = {
            semanticIssues: [],
            apiMisuse: [],
            typeSafety: [],
            dataFlow: []
        };
        
        for (var i = 0; i < violations.length; i++) {
            var violation = violations[i];
            
            // 语义问题分类
            if (violation.type.indexOf("TYPE_MISMATCH") > -1) {
                analysis.semanticIssues.push({
                    category: "type_system_violation",
                    description: "类型系统违规: " + violation.type,
                    impact: "runtime_error_risk"
                });
            }
            
            if (violation.type.indexOf("MISSING") > -1) {
                analysis.semanticIssues.push({
                    category: "contract_violation",
                    description: "接口契约违反: " + violation.type,
                    impact: "api_compatibility_risk"
                });
            }
            
            // API误用分类
            if (violation.function && (
                violation.function.indexOf("PCB") === 0 ||
                violation.function.indexOf("Board") === 0 ||
                violation.function.indexOf("Add") === 0 ||
                violation.function.indexOf("Iterator") === 0)) {
                
                analysis.apiMisuse.push({
                    apiFunction: violation.function,
                    misuseType: categorizeAPIMisuse(violation),
                    description: "AD API使用错误: " + violation.message,
                    severity: violation.severity
                });
            }
            
            // 类型安全分类
            if (violation.type.indexOf("TYPE") > -1 || violation.type.indexOf("PROPERTY") > -1) {
                analysis.typeSafety.push({
                    violationType: violation.type,
                    affectedValue: violation.argIndex !== undefined ? "arg[" + violation.argIndex + "]" : "return_value",
                    severity: violation.severity
                });
            }
            
            // 数据流分类
            if (violation.cause && violation.cause.valueHistory) {
                analysis.dataFlow.push({
                    flowType: "unexpected_type_change",
                    source: findDataSource(violation.cause.valueHistory),
                    sink: violation.location,
                    transformation: findTransformationType(violation.cause.valueHistory)
                });
            }
        }
        
        return analysis;
    }
    
    /**
     * 生成修复建议
     * @param {Array} violations - 违规数组
     * @param {Object} analysis - 分析结果
     * @return {Array} 建议数组
     */
    function generateRecommendations(violations, analysis) {
        var recommendations = [];
        
        // 基于违规类型生成建议
        for (var i = 0; i < violations.length; i++) {
            var violation = violations[i];
            var recommendation = generateViolationRecommendation(violation, analysis);
            
            if (recommendation) {
                recommendations.push(recommendation);
            }
        }
        
        // 去重和排序建议
        recommendations = deduplicateRecommendations(recommendations);
        recommendations = sortRecommendationsByPriority(recommendations);
        
        return recommendations;
    }
    
    /**
     * 集成静态分析
     * @param {String} entryFunction - 入口函数
     * @return {Object} 静态分析结果
     */
    function integrateStaticAnalysis(entryFunction) {
        if (!_capabilityQuery) {
            return null;
        }
        
        try {
            var staticContext = {
                capabilityQuery: null,
                defUseAnalysis: null,
                dependencyAnalysis: null
            };
            
            // 能力查询
            if (_capabilityQuery.isObjectCallable) {
                staticContext.capabilityQuery = {
                    isCallable: _capabilityQuery.isObjectCallable(entryFunction),
                    availableMethods: _capabilityQuery.listMethods ? _capabilityQuery.listMethods(entryFunction) : [],
                    methodSignature: _capabilityQuery.getMethodSignature ? _capabilityQuery.getMethodSignature(entryFunction) : null
                };
            }
            
            // Def-Use分析
            if (_capabilityQuery.getDefUseInfo) {
                staticContext.defUseAnalysis = _capabilityQuery.getDefUseInfo(entryFunction);
            }
            
            // 依赖分析
            if (_capabilityQuery.getModuleDependencies) {
                staticContext.dependencyAnalysis = _capabilityQuery.getModuleDependencies(entryFunction);
            }
            
            return staticContext;
            
        } catch (error) {
            console.log("[SemanticReporter] 静态分析集成失败: " + error.message);
            return {
                error: error.message,
                fallback: "static_analysis_unavailable"
            };
        }
    }
    
    /**
     * 集成动态分析
     * @param {Array} violations - 违规数组
     * @param {Object} executionStats - 执行统计
     * @return {Object} 动态分析结果
     */
    function integrateDynamicAnalysis(violations, executionStats) {
        var dynamicContext = {
            executionProfile: null,
            runtimeBehavior: null,
            performanceIndicators: null
        };
        
        // 执行概况
        if (_valueTracker && _valueTracker.getStatistics) {
            var stats = _valueTracker.getStatistics();
            dynamicContext.executionProfile = {
                totalObjects: stats.totalObjects,
                totalModifications: stats.totalModifications,
                objectTypes: stats.objectTypes,
                averageModifications: stats.averageModifications
            };
        }
        
        // 运行时行为
        if (violations.length > 0) {
            var behaviorPatterns = analyzeBehaviorPatterns(violations);
            dynamicContext.runtimeBehavior = {
                violationPatterns: behaviorPatterns.patterns,
                stabilityScore: behaviorPatterns.stabilityScore,
                errorFrequency: behaviorPatterns.errorFrequency
            };
        }
        
        // 性能指标
        if (executionStats) {
            dynamicContext.performanceIndicators = {
                executionTime: executionStats.executionTime,
                memoryUsage: executionStats.memoryUsage,
                traceComplexity: executionStats.traceComplexity
            };
        }
        
        return dynamicContext;
    }
    
    // ==========================================================
    // 工具函数
    // ==========================================================
    
    /**
     * 分类AD函数
     * @param {String} functionName - 函数名
     * @return {String} API类型
     */
    function classifyADFunction(functionName) {
        if (functionName.indexOf("Server") > -1) {
            return "server_api";
        } else if (functionName.indexOf("Board") > -1) {
            return "board_api";
        } else if (functionName.indexOf("Iterator") > -1) {
            return "iterator_api";
        } else if (functionName.indexOf("Factory") > -1) {
            return "factory_api";
        } else if (functionName.indexOf("Add") > -1) {
            return "modification_api";
        } else if (functionName.indexOf("Get") > -1) {
            return "query_api";
        } else {
            return "unknown_api";
        }
    }
    
    /**
     * 获取期望行为
     * @param {String} functionName - 函数名
     * @return {String} 期望行为
     */
    function getExpectedBehavior(functionName) {
        var expectations = {
            "PCBServer": "return_server_instance",
            "GetCurrentPCBBoard": "return_current_board_or_null",
            "PCBObjectFactory": "create_valid_pcb_object",
            "AddPCBObject": "add_object_to_board",
            "BoardIterator_Create": "create_iterator_instance"
        };
        
        return expectations[functionName] || "unknown_behavior";
    }
    
    /**
     * 分类API误用
     * @param {Object} violation - 违规
     * @return {String} 误用类型
     */
    function categorizeAPIMisuse(violation) {
        if (violation.type.indexOf("ARGUMENT") > -1) {
            return "argument_validation_error";
        } else if (violation.type.indexOf("RETURN") > -1) {
            return "return_value_error";
        } else if (violation.type.indexOf("THIS") > -1) {
            return "this_object_error";
        } else if (violation.type.indexOf("PROPERTY") > -1) {
            return "property_access_error";
        } else {
            return "general_api_error";
        }
    }
    
    /**
     * 评估修复复杂性
     * @param {Object} violation - 违规
     * @return {String} 复杂性
     */
    function assessFixComplexity(violation) {
        // 基于违规类型评估修复复杂性
        if (violation.type.indexOf("TYPE_MISMATCH") > -1) {
            return "simple"; // 类型转换通常简单
        } else if (violation.type.indexOf("MISSING_PROPERTY") > -1) {
            return "medium"; // 属性缺失需要对象检查
        } else if (violation.rootCause && violation.rootCause.type === "event_based") {
            return "complex"; // 基于事件的原因需要深入分析
        } else {
            return "medium";
        }
    }
    
    /**
     * 检查是否可自动修复
     * @param {Object} violation - 违规
     * @return {Boolean} 是否可修复
     */
    function isAutoFixable(violation) {
        // 简单的类型问题可自动修复
        if (violation.type === "ARGUMENT_TYPE_MISMATCH" && violation.expectedType === "string" && violation.actualType === "number") {
            return true; // 数字转字符串
        }
        
        if (violation.type === "MISSING_RETURN_VALUE") {
            return true; // 添加默认返回值
        }
        
        return false;
    }
    
    /**
     * 计算综合置信度
     * @param {Object} report - 报告
     * @return {Number} 置信度
     */
    function calculateOverallConfidence(report) {
        var baseConfidence = 0.7; // 基础置信度
        
        // 基于静态分析调整
        if (report.integration.staticAnalysis && !report.integration.staticAnalysis.error) {
            baseConfidence += 0.2;
        }
        
        // 基于动态分析调整
        if (report.integration.dynamicAnalysis && report.integration.dynamicAnalysis.runtimeBehavior) {
            var stability = report.integration.dynamicAnalysis.runtimeBehavior.stabilityScore;
            if (stability > 0.8) {
                baseConfidence += 0.1;
            } else if (stability < 0.5) {
                baseConfidence -= 0.1;
            }
        }
        
        return Math.min(Math.max(baseConfidence, 0.1), 1.0);
    }
    
    /**
     * 生成违规建议
     * @param {Object} violation - 违规
     * @param {Object} analysis - 分析结果
     * @return {Object} 建议
     */
    function generateViolationRecommendation(violation, analysis) {
        var recommendation = {
            id: "R" + (_reports.length + 1),
            violationId: violation.id,
            type: "fix",
            priority: "medium",
            title: "",
            description: "",
            codeExample: "",
            autoFixable: violation.autoFixable,
            estimatedEffort: "medium",
            impact: "medium"
        };
        
        // 基于违规类型生成具体建议
        switch (violation.type) {
            case "ARGUMENT_TYPE_MISMATCH":
                recommendation.title = "参数类型不匹配";
                recommendation.description = "函数参数类型与期望不符，建议进行类型检查或转换";
                recommendation.codeExample = "// 添加类型检查\nif (typeof arg !== '" + violation.expectedType + "') {\n  throw new Error('Invalid argument type');\n}";
                recommendation.priority = violation.severity === "ERROR" ? "high" : "medium";
                break;
                
            case "MISSING_REQUIRED_PROPERTY":
                recommendation.title = "缺少必需属性";
                recommendation.description = "对象缺少必需的AD属性，建议检查对象创建过程";
                recommendation.codeExample = "// 验证对象属性\nif (!obj.I_ObjectAddress) {\n  throw new Error('Missing I_ObjectAddress');\n}";
                recommendation.priority = "high";
                break;
                
            case "RETURN_TYPE_MISMATCH":
                recommendation.title = "返回值类型不匹配";
                recommendation.description = "函数返回值类型与期望不符，建议检查返回逻辑";
                recommendation.codeExample = "// 确保返回正确类型\nreturn expectedResultType;";
                recommendation.priority = violation.severity === "ERROR" ? "high" : "medium";
                break;
                
            default:
                recommendation.title = "API使用建议";
                recommendation.description = violation.message;
                recommendation.priority = "medium";
                break;
        }
        
        return recommendation;
    }
    
    /**
     * 去重建议
     * @param {Array} recommendations - 建议数组
     * @return {Array} 去重后的数组
     */
    function deduplicateRecommendations(recommendations) {
        var seen = new Object();
        var result = [];
        
        for (var i = 0; i < recommendations.length; i++) {
            var rec = recommendations[i];
            var key = rec.title + "|" + rec.description;
            
            if (!seen[key]) {
                seen[key] = true;
                result.push(rec);
            }
        }
        
        return result;
    }
    
    /**
     * 按优先级排序建议
     * @param {Array} recommendations - 建议数组
     * @return {Array} 排序后的数组
     */
    function sortRecommendationsByPriority(recommendations) {
        var priorityOrder = { "critical": 0, "high": 1, "medium": 2, "low": 3 };
        
        return recommendations.sort(function(a, b) {
            var priorityA = priorityOrder[a.priority] || 999;
            var priorityB = priorityOrder[b.priority] || 999;
            
            return priorityA - priorityB;
        });
    }
    
    // 其他工具函数（简化实现）
    function extractModulesFromCallStack(callStack) {
        // 简化实现
        return [];
    }
    
    function isModuleBoundaryViolation(violation) {
        // 简化实现
        return false;
    }
    
    function buildModuleChain(modules) {
        // 简化实现
        return [];
    }
    
    function findTypeConversionPath(violation) {
        // 简化实现
        return "direct";
    }
    
    function findSourceFunction(valueHistory) {
        // 简化实现
        return null;
    }
    
    function trackDataTransformations(valueHistory) {
        // 简化实现
        return [];
    }
    
    function findDataSource(valueHistory) {
        // 简化实现
        return "unknown";
    }
    
    function findTransformationType(valueHistory) {
        // 简化实现
        return "none";
    }
    
    function analyzeBehaviorPatterns(violations) {
        // 简化实现
        return {
            patterns: [],
            stabilityScore: 0.5,
            errorFrequency: "low"
        };
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 初始化
        initialize: initialize,
        
        // 核心报告
        generateSemanticReport: generateSemanticReport,
        
        // 查询方法
        getReports: function() {
            return _reports.slice();
        },
        
        clearReports: function() {
            _reports = [];
            console.log("[SemanticReporter] 报告历史已清空");
        },
        
        // 工具方法
        setCapabilityQuery: function(capabilityQuery) {
            _capabilityQuery = capabilityQuery;
            console.log("[SemanticReporter] CapabilityQuery已更新");
        },
        
        // 集成接口
        exportToCapabilitySystem: function(report) {
            if (_capabilityQuery) {
                try {
                    // 将Jalangi2结果转换为CapabilityQuery格式
                    var capabilityReport = convertToCapabilityFormat(report);
                    
                    // 调用CapabilityQuery的分析接口
                    if (_capabilityQuery.analyzeSemanticReport) {
                        return _capabilityQuery.analyzeSemanticReport(capabilityReport);
                    }
                } catch (error) {
                    console.log("[SemanticReporter] 导出到Capability系统失败: " + error.message);
                    return { error: error.message };
                }
            } else {
                return { error: "capability_query_unavailable" };
            }
        },
        
        getStatistics: function() {
            var totalReports = _reports.length;
            var totalViolations = 0;
            var totalErrors = 0;
            var totalWarnings = 0;
            
            for (var i = 0; i < totalReports; i++) {
                var report = _reports[i];
                totalViolations += report.summary.totalViolations;
                totalErrors += report.summary.errorCount;
                totalWarnings += report.summary.warningCount;
            }
            
            return {
                totalReports: totalReports,
                totalViolations: totalViolations,
                totalErrors: totalErrors,
                totalWarnings: totalWarnings,
                averageConfidence: _reports.length > 0 ? 
                    (_reports.reduce(function(sum, r) { return sum + r.integration.confidence; }, 0) / _reports.length) : 0.0
            };
        }
    };
    
})();

// 转换函数
function convertToCapabilityFormat(report) {
    return {
        timestamp: report.metadata.timestamp,
        entryPoint: report.metadata.entryFunction,
        analyzer: "jalangi2_semantic",
        
        violations: report.violations.map(function(v) {
            return {
                type: v.type,
                severity: v.severity,
                message: v.message,
                location: v.location,
                semanticContext: v.semanticContext,
                recommendation: v.autoFixable ? "auto_fixable" : "manual_fix_required"
            };
        }),
        
        staticAnalysis: report.integration.staticAnalysis,
        dynamicAnalysis: report.integration.dynamicAnalysis,
        
        summary: report.summary,
        analysis: report.analysis
    };
}

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.SemanticReporter = SemanticReporter;
} else {
    this.SemanticReporter = SemanticReporter;
}

console.log("[SemanticReporter] semantic-reporter.js 加载完成");
