// ==========================================================
// Violation Tracer - 违规溯源追踪器
// 构建完整的因果溯源链，定位违规根本原因
// 严格遵循ES3语法规范
// ==========================================================

var ViolationTracer = (function(){
    
    // ==========================================================
    // 私有变量
    // ==========================================================
    var _violations = [];
    var _rootCauses = new Object();
    var _traceDepth = 5; // 最大溯源深度
    var _valueTracker = null;
    var _expectationEngine = null;
    
    // ==========================================================
    // 初始化
    // ==========================================================
    
    /**
     * 初始化违规追踪器
     * @param {Object} valueTracker - 值追踪器
     * @param {Object} expectationEngine - 期望引擎
     */
    function initialize(valueTracker, expectationEngine) {
        _valueTracker = valueTracker;
        _expectationEngine = expectationEngine;
        _violations = [];
        _rootCauses = new Object();
        
        console.log("[ViolationTracer] 初始化完成");
    }
    
    // ==========================================================
    // 核心溯源算法
    // ==========================================================
    
    /**
     * 追踪违规的根本原因
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceViolation(violation) {
        console.log("[ViolationTracer] 开始溯源: " + violation.type);
        
        var traceResult = {
            originalViolation: violation,
            rootCause: null,
            causalChain: [],
            traceDepth: 0,
            confidence: 0.0
        };
        
        // 根据违规类型选择溯源策略
        switch (violation.type) {
            case "ARGUMENT_TYPE_MISMATCH":
            case "MISSING_REQUIRED_PROPERTY":
            case "INVALID_ENUM_VALUE":
                traceResult = traceArgumentViolation(violation);
                break;
                
            case "RETURN_TYPE_MISMATCH":
            case "MISSING_RETURN_PROPERTY":
            case "MISSING_RETURN_METHOD":
                traceResult = traceReturnViolation(violation);
                break;
                
            case "THIS_TYPE_MISMATCH":
            case "MISSING_REQUIRED_METHOD":
                traceResult = traceThisViolation(violation);
                break;
                
            case "ERROR_CONDITION":
            case "WARNING_CONDITION":
                traceResult = traceConditionViolation(violation);
                break;
                
            default:
                traceResult = traceGenericViolation(violation);
                break;
        }
        
        // 缓存溯源结果
        _violations.push(traceResult);
        
        console.log("[ViolationTracer] 溯源完成，深度: " + traceResult.traceDepth + ", 置信度: " + traceResult.confidence);
        
        return traceResult;
    }
    
    /**
     * 追踪参数违规
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceArgumentViolation(violation) {
        var argIndex = violation.argIndex;
        var argValue = violation.cause && violation.cause.valueHistory ? 
            getLastValue(violation.cause.valueHistory) : "unknown";
        
        var causalChain = [];
        var currentDepth = 0;
        var confidence = 1.0;
        
        // 分析参数值的来源
        if (_valueTracker && argValue !== undefined) {
            var history = _valueTracker.getValueHistory(argValue);
            if (history && history.length > 0) {
                // 构建因果链
                for (var i = history.length - 1; i >= 0 && currentDepth < _traceDepth; i--) {
                    var event = history[i];
                    var link = {
                        step: currentDepth + 1,
                        type: event.type,
                        description: describeEvent(event),
                        location: event.location,
                        timestamp: event.time,
                        relevance: calculateRelevance(event, violation)
                    };
                    
                    causalChain.push(link);
                    currentDepth++;
                    
                    // 检查是否找到根本原因
                    if (isRootCause(event, violation)) {
                        break;
                    }
                }
                
                // 调整置信度
                confidence = calculateConfidence(causalChain, violation);
            }
        }
        
        // 生成根本原因假设
        var rootCause = generateRootCauseHypothesis(violation, causalChain);
        
        return {
            originalViolation: violation,
            rootCause: rootCause,
            causalChain: causalChain,
            traceDepth: currentDepth,
            confidence: confidence,
            violationType: "argument_violation"
        };
    }
    
    /**
     * 追踪返回值违规
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceReturnViolation(violation) {
        var returnValue = violation.cause && violation.cause.valueHistory ? 
            getLastValue(violation.cause.valueHistory) : "unknown";
        
        var causalChain = [];
        var currentDepth = 0;
        var confidence = 1.0;
        
        // 分析返回值的来源
        if (_valueTracker && returnValue !== undefined) {
            var history = _valueTracker.getValueHistory(returnValue);
            if (history && history.length > 0) {
                // 构建因果链
                for (var i = history.length - 1; i >= 0 && currentDepth < _traceDepth; i--) {
                    var event = history[i];
                    var link = {
                        step: currentDepth + 1,
                        type: event.type,
                        description: describeEvent(event),
                        location: event.location,
                        timestamp: event.time,
                        relevance: calculateRelevance(event, violation)
                    };
                    
                    causalChain.push(link);
                    currentDepth++;
                    
                    // 检查是否找到根本原因
                    if (isRootCause(event, violation)) {
                        break;
                    }
                }
                
                confidence = calculateConfidence(causalChain, violation);
            }
        }
        
        // 生成根本原因假设
        var rootCause = generateRootCauseHypothesis(violation, causalChain);
        
        return {
            originalViolation: violation,
            rootCause: rootCause,
            causalChain: causalChain,
            traceDepth: currentDepth,
            confidence: confidence,
            violationType: "return_violation"
        };
    }
    
    /**
     * 追踪this对象违规
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceThisViolation(violation) {
        var thisObject = violation.cause && violation.cause.valueHistory ? 
            getLastValue(violation.cause.valueHistory) : "unknown";
        
        var causalChain = [];
        var currentDepth = 0;
        var confidence = 1.0;
        
        // 分析this对象的来源
        if (_valueTracker && thisObject !== undefined) {
            var history = _valueTracker.getValueHistory(thisObject);
            if (history && history.length > 0) {
                // 构建因果链
                for (var i = history.length - 1; i >= 0 && currentDepth < _traceDepth; i--) {
                    var event = history[i];
                    var link = {
                        step: currentDepth + 1,
                        type: event.type,
                        description: describeEvent(event),
                        location: event.location,
                        timestamp: event.time,
                        relevance: calculateRelevance(event, violation)
                    };
                    
                    causalChain.push(link);
                    currentDepth++;
                    
                    // 检查是否找到根本原因
                    if (isRootCause(event, violation)) {
                        break;
                    }
                }
                
                confidence = calculateConfidence(causalChain, violation);
            }
        }
        
        // 生成根本原因假设
        var rootCause = generateRootCauseHypothesis(violation, causalChain);
        
        return {
            originalViolation: violation,
            rootCause: rootCause,
            causalChain: causalChain,
            traceDepth: currentDepth,
            confidence: confidence,
            violationType: "this_violation"
        };
    }
    
    /**
     * 追踪条件违规
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceConditionViolation(violation) {
        var causalChain = [];
        var currentDepth = 0;
        var confidence = 0.5; // 条件违规的初始置信度较低
        
        // 分析条件相关的值
        if (_valueTracker && violation.cause) {
            var argsHistory = violation.cause.argumentsHistory;
            var resultHistory = violation.cause.resultHistory;
            
            // 处理参数历史
            if (argsHistory) {
                for (var i = 0; i < argsHistory.length && currentDepth < _traceDepth; i++) {
                    var argHistory = argsHistory[i];
                    if (argHistory && argHistory.history) {
                        for (var j = argHistory.history.length - 1; j >= 0; j--) {
                            var event = argHistory.history[j];
                            var link = {
                                step: currentDepth + 1,
                                type: event.type,
                                description: describeEvent(event),
                                location: event.location,
                                timestamp: event.time,
                                relevance: calculateRelevance(event, violation)
                            };
                            
                            causalChain.push(link);
                            currentDepth++;
                            
                            if (isRootCause(event, violation)) {
                                break;
                            }
                        }
                    }
                }
            }
            
            // 处理返回值历史
            if (resultHistory && resultHistory.length > 0) {
                for (var i = resultHistory.length - 1; i >= 0 && currentDepth < _traceDepth; i--) {
                    var event = resultHistory[i];
                    var link = {
                        step: currentDepth + 1,
                        type: event.type,
                        description: describeEvent(event),
                        location: event.location,
                        timestamp: event.time,
                        relevance: calculateRelevance(event, violation)
                    };
                    
                    causalChain.push(link);
                    currentDepth++;
                    
                    if (isRootCause(event, violation)) {
                        break;
                    }
                }
            }
            
            confidence = calculateConfidence(causalChain, violation);
        }
        
        // 生成根本原因假设
        var rootCause = generateRootCauseHypothesis(violation, causalChain);
        
        return {
            originalViolation: violation,
            rootCause: rootCause,
            causalChain: causalChain,
            traceDepth: currentDepth,
            confidence: confidence,
            violationType: "condition_violation"
        };
    }
    
    /**
     * 追踪通用违规
     * @param {Object} violation - 违规信息
     * @return {Object} 溯源结果
     */
    function traceGenericViolation(violation) {
        var causalChain = [];
        var confidence = 0.3; // 通用违规的初始置信度最低
        
        // 基于调用栈进行基本溯源
        if (violation.callStack && violation.callStack.length > 0) {
            for (var i = violation.callStack.length - 1; i >= 0 && currentDepth < _traceDepth; i--) {
                var frame = violation.callStack[i];
                var link = {
                    step: currentDepth + 1,
                    type: "function_call",
                    description: "函数调用: " + frame.functionName,
                    location: frame.iid,
                    timestamp: frame.entryTime,
                    relevance: calculateRelevance(frame, violation)
                };
                
                causalChain.push(link);
                currentDepth++;
            }
            
            confidence = calculateConfidence(causalChain, violation);
        }
        
        // 生成根本原因假设
        var rootCause = generateRootCauseHypothesis(violation, causalChain);
        
        return {
            originalViolation: violation,
            rootCause: rootCause,
            causalChain: causalChain,
            traceDepth: currentDepth,
            confidence: confidence,
            violationType: "generic_violation"
        };
    }
    
    // ==========================================================
    // 工具函数
    // ==========================================================
    
    /**
     * 获取历史中的最后一个值
     * @param {Array} history - 历史数组
     * @return {*} 最后的值
     */
    function getLastValue(history) {
        if (!history || history.length === 0) {
            return null;
        }
        
        var lastEvent = history[history.length - 1];
        return lastEvent.newValue || lastEvent.value;
    }
    
    /**
     * 描述事件
     * @param {Object} event - 事件对象
     * @return {String} 描述
     */
    function describeEvent(event) {
        switch (event.type) {
            case "function_return":
                return "函数返回: " + (event.functionName || "unknown");
            case "object_creation":
                return "对象创建: " + (event.objectType || "unknown");
            case "variable_write":
                return "变量写入: " + (event.variableName || "unknown") + " = " + String(event.newValue || "");
            case "property_write":
                return "属性写入: " + (event.property || "unknown") + " = " + String(event.value || "");
            case "value_transfer":
                return "值传递: " + (event.from || "unknown") + " -> " + (event.to || "unknown");
            default:
                return "事件: " + event.type;
        }
    }
    
    /**
     * 计算事件相关性
     * @param {Object} event - 事件
     * @param {Object} violation - 违规
     * @return {Number} 相关性分数
     */
    function calculateRelevance(event, violation) {
        var relevance = 0.0;
        
        // 基于违规类型计算相关性
        switch (violation.type) {
            case "ARGUMENT_TYPE_MISMATCH":
                if (event.type === "function_return" && event.functionName) {
                    relevance += 0.8; // 函数返回的值与参数类型相关
                }
                if (event.type === "variable_write" && event.variableName) {
                    relevance += 0.6; // 变量写入可能影响类型
                }
                break;
                
            case "RETURN_TYPE_MISMATCH":
                if (event.type === "function_return") {
                    relevance += 0.9; // 直接相关
                }
                if (event.type === "property_write") {
                    relevance += 0.4; // 属性写入可能影响返回类型
                }
                break;
                
            case "MISSING_REQUIRED_PROPERTY":
                if (event.type === "object_creation") {
                    relevance += 0.7; // 对象创建与属性缺失相关
                }
                if (event.type === "function_return") {
                    relevance += 0.8; // 函数返回的对象缺少属性
                }
                break;
        }
        
        return Math.min(relevance, 1.0);
    }
    
    /**
     * 检查是否为根本原因
     * @param {Object} event - 事件
     * @param {Object} violation - 违规
     * @return {Boolean} 是否为根本原因
     */
    function isRootCause(event, violation) {
        // 类型转换事件通常是根本原因
        if (event.type === "property_write" && violation.type.indexOf("TYPE_MISMATCH") > -1) {
            var newValue = event.value;
            var expectedType = violation.expectedType || violation.actualType;
            
            // 检查是否是类型转换问题
            if (typeof newValue !== expectedType) {
                return true;
            }
        }
        
        // 对象创建时的参数错误
        if (event.type === "function_return" && violation.type.indexOf("ARGUMENT") > -1) {
            return true;
        }
        
        return false;
    }
    
    /**
     * 计算置信度
     * @param {Array} causalChain - 因果链
     * @param {Object} violation - 违规
     * @return {Number} 置信度
     */
    function calculateConfidence(causalChain, violation) {
        if (!causalChain || causalChain.length === 0) {
            return 0.1;
        }
        
        var totalRelevance = 0.0;
        var maxRelevance = 0.0;
        
        for (var i = 0; i < causalChain.length; i++) {
            var relevance = causalChain[i].relevance;
            totalRelevance += relevance;
            maxRelevance = Math.max(maxRelevance, relevance);
        }
        
        // 基于相关性计算置信度
        var avgRelevance = totalRelevance / causalChain.length;
        var confidence = avgRelevance * (1.0 + maxRelevance) / 2.0;
        
        return Math.min(confidence, 1.0);
    }
    
    /**
     * 生成根本原因假设
     * @param {Object} violation - 违规
     * @param {Array} causalChain - 因果链
     * @return {Object} 根本原因假设
     */
    function generateRootCauseHypothesis(violation, causalChain) {
        var hypothesis = {
            type: "unknown",
            description: "无法确定根本原因",
            likelihood: 0.0,
            suggestedFixes: []
        };
        
        // 分析因果链，找出最可能的原因
        if (causalChain.length > 0) {
            var mostRelevantEvent = null;
            var maxRelevance = 0.0;
            
            for (var i = 0; i < causalChain.length; i++) {
                var event = causalChain[i];
                if (event.relevance > maxRelevance) {
                    maxRelevance = event.relevance;
                    mostRelevantEvent = event;
                }
            }
            
            // 基于最相关事件生成假设
            if (mostRelevantEvent) {
                hypothesis = analyzeRootCauseFromEvent(mostRelevantEvent, violation);
            }
        }
        
        return hypothesis;
    }
    
    /**
     * 从事件分析根本原因
     * @param {Object} event - 最相关事件
     * @param {Object} violation - 违规
     * @return {Object} 根本原因分析
     */
    function analyzeRootCauseFromEvent(event, violation) {
        var analysis = {
            type: "event_based",
            description: "",
            likelihood: 0.7,
            suggestedFixes: []
        };
        
        switch (event.type) {
            case "property_write":
                if (violation.type.indexOf("TYPE_MISMATCH") > -1) {
                    analysis.type = "type_assignment_error";
                    analysis.description = "在属性 " + (event.property || "unknown") + " 中赋值了错误的类型";
                    analysis.suggestedFixes = [
                        "检查赋值前进行类型验证",
                        "使用类型转换函数",
                        "检查数据来源"
                    ];
                }
                break;
                
            case "function_return":
                if (violation.type.indexOf("ARGUMENT") > -1) {
                    analysis.type = "parameter_propagation";
                    analysis.description = "函数 " + (event.functionName || "unknown") + " 返回了不符合期望的参数类型";
                    analysis.suggestedFixes = [
                        "检查函数 " + (event.functionName || "unknown") + " 的实现",
                        "验证输入参数",
                        "添加参数类型检查"
                    ];
                }
                break;
                
            case "object_creation":
                if (violation.type.indexOf("MISSING_PROPERTY") > -1) {
                    analysis.type = "incomplete_object_creation";
                    analysis.description = "创建的对象缺少必需属性: " + (violation.property || "unknown");
                    analysis.suggestedFixes = [
                        "检查对象构造函数",
                        "验证创建参数",
                        "完善对象初始化"
                    ];
                }
                break;
        }
        
        return analysis;
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 初始化
        initialize: initialize,
        
        // 核心溯源
        traceViolation: traceViolation,
        
        // 批量处理
        traceMultipleViolations: function(violations) {
            var results = [];
            for (var i = 0; i < violations.length; i++) {
                results.push(traceViolation(violations[i]));
            }
            return results;
        },
        
        // 结果查询
        getTraceResults: function() {
            return _violations.slice(); // 返回副本
        },
        
        clearTraces: function() {
            _violations = [];
            _rootCauses = new Object();
            console.log("[ViolationTracer] 溯源记录已清空");
        },
        
        // 统计信息
        getStatistics: function() {
            var totalTraces = _violations.length;
            var avgDepth = 0;
            var avgConfidence = 0.0;
            var violationTypes = {};
            
            if (totalTraces > 0) {
                var totalDepth = 0;
                var totalConfidence = 0.0;
                
                for (var i = 0; i < totalTraces; i++) {
                    var trace = _violations[i];
                    totalDepth += trace.traceDepth;
                    totalConfidence += trace.confidence;
                    
                    var type = trace.violationType;
                    violationTypes[type] = (violationTypes[type] || 0) + 1;
                }
                
                avgDepth = totalDepth / totalTraces;
                avgConfidence = totalConfidence / totalTraces;
            }
            
            return {
                totalTraces: totalTraces,
                averageDepth: avgDepth,
                averageConfidence: avgConfidence,
                violationTypes: violationTypes
            };
        }
    };
    
})();

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.ViolationTracer = ViolationTracer;
} else {
    this.ViolationTracer = ViolationTracer;
}

console.log("[ViolationTracer] violation-tracer.js 加载完成");
