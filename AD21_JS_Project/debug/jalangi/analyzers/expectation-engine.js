// ==========================================================
// Expectation Engine - 期望规则引擎
// 基于AD函数期望规则验证函数调用和参数
// 严格遵循ES3语法规范
// ==========================================================

var ExpectationEngine = (function(){
    
    // ==========================================================
    // 私有变量
    // ==========================================================
    var _rules = new Object();
    var _violations = [];
    var _callStack = [];
    var _valueTracker = null;
    
    // ==========================================================
    // 初始化
    // ==========================================================
    
    /**
     * 初始化期望引擎
     * @param {Object} rules - 规则对象
     * @param {Object} valueTracker - 值追踪器
     */
    function initialize(rules, valueTracker) {
        _rules = rules || {};
        _valueTracker = valueTracker;
        _violations = [];
        _callStack = [];
        
        console.log("[ExpectationEngine] 初始化完成，规则数量: " + Object.keys(_rules).length);
    }
    
    // ==========================================================
    // 规则验证核心
    // ==========================================================
    
    /**
     * 验证函数调用
     * @param {String} functionName - 函数名
     * @param {*} base - this对象
     * @param {Array} args - 参数数组
     * @param {*} result - 返回值
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateFunctionCall(functionName, base, args, result, iid, location) {
        var rule = _rules[functionName];
        if (!rule) {
            return; // 没有规则，跳过验证
        }
        
        console.log("[ExpectationEngine] 验证函数调用: " + functionName);
        
        // 验证参数
        if (rule.expects) {
            validateArguments(functionName, args, rule.expects, iid, location);
        }
        
        // 验证this对象
        if (rule.this) {
            validateThisObject(functionName, base, rule.this, iid, location);
        }
        
        // 验证返回值
        if (rule.returns) {
            validateReturnValue(functionName, result, rule.returns, iid, location);
        }
        
        // 检查错误条件
        if (rule.errors) {
            validateErrorConditions(functionName, base, args, result, rule.errors, iid, location);
        }
        
        // 检查警告条件
        if (rule.warnings) {
            validateWarningConditions(functionName, base, args, result, rule.warnings, iid, location);
        }
    }
    
    /**
     * 验证参数
     * @param {String} functionName - 函数名
     * @param {Array} args - 参数数组
     * @param {Array} expects - 期望规则
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateArguments(functionName, args, expects, iid, location) {
        for (var i = 0; i < expects.length; i++) {
            var expect = expects[i];
            var argIndex = expect.arg;
            var argValue = args[argIndex];
            
            // 检查必需参数
            if (expect.required && argValue === undefined) {
                reportViolation({
                    type: "MISSING_REQUIRED_ARGUMENT",
                    severity: "ERROR",
                    function: functionName,
                    argIndex: argIndex,
                    message: "缺少必需参数: " + argIndex,
                    iid: iid,
                    location: location,
                    cause: _buildArgumentCause(argValue, expect, argIndex)
                });
                continue;
            }
            
            // 类型检查
            if (argValue !== undefined && expect.type) {
                var actualType = typeof argValue;
                if (actualType !== expect.type) {
                    reportViolation({
                        type: "ARGUMENT_TYPE_MISMATCH",
                        severity: "ERROR",
                        function: functionName,
                        argIndex: argIndex,
                        expectedType: expect.type,
                        actualType: actualType,
                        message: "参数" + argIndex + "类型不匹配: 期望 " + expect.type + ", 实际 " + actualType,
                        iid: iid,
                        location: location,
                        cause: _buildArgumentCause(argValue, expect, argIndex)
                    });
                }
            }
            
            // 枚举值检查
            if (argValue !== undefined && expect.enum && expect.enum.indexOf(argValue) === -1) {
                reportViolation({
                    type: "INVALID_ENUM_VALUE",
                    severity: "ERROR",
                    function: functionName,
                    argIndex: argIndex,
                    invalidValue: argValue,
                    validValues: expect.enum,
                    message: "参数" + argIndex + "的值无效: " + argValue + ", 有效值: " + expect.enum.join(", "),
                    iid: iid,
                    location: location,
                    cause: _buildArgumentCause(argValue, expect, argIndex)
                });
            }
            
            // 必需属性检查
            if (argValue !== null && typeof argValue === "object" && expect.requiredProps) {
                for (var j = 0; j < expect.requiredProps.length; j++) {
                    var prop = expect.requiredProps[j];
                    if (argValue[prop] === undefined || argValue[prop] === null) {
                        reportViolation({
                            type: "MISSING_REQUIRED_PROPERTY",
                            severity: "ERROR",
                            function: functionName,
                            argIndex: argIndex,
                            property: prop,
                            message: "参数" + argIndex + "缺少必需属性: " + prop,
                            iid: iid,
                            location: location,
                            cause: _buildArgumentCause(argValue, expect, argIndex)
                        });
                    }
                }
            }
            
            // 可选属性检查
            if (argValue !== null && typeof argValue === "object" && expect.optionalProps) {
                var presentProps = [];
                for (var j = 0; j < expect.optionalProps.length; j++) {
                    var prop = expect.optionalProps[j];
                    if (argValue[prop] !== undefined) {
                        presentProps.push(prop);
                    }
                }
                
                if (presentProps.length > 0) {
                    console.log("[ExpectationEngine] 参数" + argIndex + "包含可选属性: " + presentProps.join(", "));
                }
            }
        }
    }
    
    /**
     * 验证this对象
     * @param {String} functionName - 函数名
     * @param {*} base - this对象
     * @param {Object} thisRule - this规则
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateThisObject(functionName, base, thisRule, iid, location) {
        if (base === null || base === undefined) {
            if (thisRule.required) {
                reportViolation({
                    type: "INVALID_THIS_OBJECT",
                    severity: "ERROR",
                    function: functionName,
                    message: "this对象为空但要求非空",
                    iid: iid,
                    location: location,
                    cause: _buildThisCause(base, thisRule)
                });
            }
            return;
        }
        
        var actualType = typeof base;
        if (thisRule.type && actualType !== thisRule.type) {
            reportViolation({
                type: "THIS_TYPE_MISMATCH",
                severity: "ERROR",
                function: functionName,
                expectedType: thisRule.type,
                actualType: actualType,
                message: "this对象类型不匹配: 期望 " + thisRule.type + ", 实际 " + actualType,
                iid: iid,
                location: location,
                cause: _buildThisCause(base, thisRule)
            });
        }
        
        // 必需方法检查
        if (thisRule.requiredMethods) {
            for (var i = 0; i < thisRule.requiredMethods.length; i++) {
                var method = thisRule.requiredMethods[i];
                if (base[method] === undefined || typeof base[method] !== "function") {
                    reportViolation({
                        type: "MISSING_REQUIRED_METHOD",
                        severity: "ERROR",
                        function: functionName,
                        thisObject: base,
                        missingMethod: method,
                        message: "this对象缺少必需方法: " + method,
                        iid: iid,
                        location: location,
                        cause: _buildThisCause(base, thisRule)
                    });
                }
            }
        }
    }
    
    /**
     * 验证返回值
     * @param {String} functionName - 函数名
     * @param {*} result - 返回值
     * @param {Object} returnRule - 返回值规则
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateReturnValue(functionName, result, returnRule, iid, location) {
        if (result === undefined && returnRule.required !== false) {
            reportViolation({
                type: "MISSING_RETURN_VALUE",
                severity: "WARNING",
                function: functionName,
                message: "函数缺少返回值",
                iid: iid,
                location: location,
                cause: _buildReturnCause(result, returnRule)
            });
            return;
        }
        
        var actualType = typeof result;
        if (returnRule.type && actualType !== returnRule.type) {
            reportViolation({
                type: "RETURN_TYPE_MISMATCH",
                severity: "ERROR",
                function: functionName,
                expectedType: returnRule.type,
                actualType: actualType,
                message: "返回值类型不匹配: 期望 " + returnRule.type + ", 实际 " + actualType,
                iid: iid,
                location: location,
                cause: _buildReturnCause(result, returnRule)
            });
        }
        
        if (result !== null && typeof result === "object") {
            // 必需属性检查
            if (returnRule.requiredProps) {
                for (var i = 0; i < returnRule.requiredProps.length; i++) {
                    var prop = returnRule.requiredProps[i];
                    if (result[prop] === undefined || result[prop] === null) {
                        reportViolation({
                            type: "MISSING_RETURN_PROPERTY",
                            severity: "ERROR",
                            function: functionName,
                            property: prop,
                            message: "返回值缺少必需属性: " + prop,
                            iid: iid,
                            location: location,
                            cause: _buildReturnCause(result, returnRule)
                        });
                    }
                }
            }
            
            // 可选属性检查
            if (returnRule.optionalProps) {
                var presentProps = [];
                for (var i = 0; i < returnRule.optionalProps.length; i++) {
                    var prop = returnRule.optionalProps[i];
                    if (result[prop] !== undefined) {
                        presentProps.push(prop);
                    }
                }
                
                if (presentProps.length > 0) {
                    console.log("[ExpectationEngine] 返回值包含可选属性: " + presentProps.join(", "));
                }
            }
            
            // 必需方法检查
            if (returnRule.requiredMethods) {
                for (var i = 0; i < returnRule.requiredMethods.length; i++) {
                    var method = returnRule.requiredMethods[i];
                    if (result[method] === undefined || typeof result[method] !== "function") {
                        reportViolation({
                            type: "MISSING_RETURN_METHOD",
                            severity: "ERROR",
                            function: functionName,
                            property: method,
                            message: "返回值缺少必需方法: " + method,
                            iid: iid,
                            location: location,
                            cause: _buildReturnCause(result, returnRule)
                        });
                    }
                }
            }
        }
    }
    
    /**
     * 验证错误条件
     * @param {String} functionName - 函数名
     * @param {*} base - this对象
     * @param {Array} args - 参数数组
     * @param {*} result - 返回值
     * @param {Array} errorConditions - 错误条件
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateErrorConditions(functionName, base, args, result, errorConditions, iid, location) {
        for (var i = 0; i < errorConditions.length; i++) {
            var condition = errorConditions[i];
            
            // 简单条件评估（注意安全性）
            var conditionMet = false;
            try {
                conditionMet = evalCondition(condition.condition, {
                    args: args,
                    result: result,
                    base: base,
                    functionName: functionName
                });
            } catch (error) {
                console.log("[ExpectationEngine] 条件评估失败: " + error.message);
                continue;
            }
            
            if (conditionMet) {
                reportViolation({
                    type: "ERROR_CONDITION",
                    severity: "ERROR",
                    function: functionName,
                    condition: condition.condition,
                    message: condition.message,
                    iid: iid,
                    location: location,
                    cause: _buildErrorCause(args, result, condition)
                });
            }
        }
    }
    
    /**
     * 验证警告条件
     * @param {String} functionName - 函数名
     * @param {*} base - this对象
     * @param {Array} args - 参数数组
     * @param {*} result - 返回值
     * @param {Array} warningConditions - 警告条件
     * @param {String} iid - 指令ID
     * @param {String} location - 位置
     */
    function validateWarningConditions(functionName, base, args, result, warningConditions, iid, location) {
        for (var i = 0; i < warningConditions.length; i++) {
            var condition = warningConditions[i];
            
            // 简单条件评估
            var conditionMet = false;
            try {
                conditionMet = evalCondition(condition.condition, {
                    args: args,
                    result: result,
                    base: base,
                    functionName: functionName
                });
            } catch (error) {
                console.log("[ExpectationEngine] 警告条件评估失败: " + error.message);
                continue;
            }
            
            if (conditionMet) {
                reportViolation({
                    type: "WARNING_CONDITION",
                    severity: "WARNING",
                    function: functionName,
                    condition: condition.condition,
                    message: condition.message,
                    iid: iid,
                    location: location,
                    cause: _buildErrorCause(args, result, condition)
                });
            }
        }
    }
    
    // ==========================================================
    // 因果构建器
    // ==========================================================
    
    /**
     * 构建参数违规的因果信息
     * @param {*} argValue - 参数值
     * @param {Object} expect - 期望规则
     * @param {Number} argIndex - 参数索引
     * @return {Object} 因果信息
     */
    function _buildArgumentCause(argValue, expect, argIndex) {
        var cause = {
            type: "argument_violation",
            argIndex: argIndex,
            expectedRule: expect
        };
        
        // 如果有值追踪器，获取值的历史
        if (_valueTracker && argValue !== undefined) {
            var history = _valueTracker.getValueHistory(argValue);
            if (history.length > 0) {
                cause.valueHistory = history;
                cause.creationInfo = _valueTracker.getCreationInfo(argValue);
                cause.lastModification = _valueTracker.getLastModification(argValue);
            }
        }
        
        return cause;
    }
    
    /**
     * 构建this对象违规的因果信息
     * @param {*} base - this对象
     * @param {Object} thisRule - this规则
     * @return {Object} 因果信息
     */
    function _buildThisCause(base, thisRule) {
        var cause = {
            type: "this_violation",
            expectedRule: thisRule
        };
        
        // 如果有值追踪器，获取this对象的历史
        if (_valueTracker && base !== undefined && base !== null) {
            var history = _valueTracker.getValueHistory(base);
            if (history.length > 0) {
                cause.valueHistory = history;
                cause.creationInfo = _valueTracker.getCreationInfo(base);
                cause.lastModification = _valueTracker.getLastModification(base);
            }
        }
        
        return cause;
    }
    
    /**
     * 构建返回值违规的因果信息
     * @param {*} result - 返回值
     * @param {Object} returnRule - 返回值规则
     * @return {Object} 因果信息
     */
    function _buildReturnCause(result, returnRule) {
        var cause = {
            type: "return_violation",
            expectedRule: returnRule
        };
        
        // 如果有值追踪器，获取返回值的历史
        if (_valueTracker && result !== undefined) {
            var history = _valueTracker.getValueHistory(result);
            if (history.length > 0) {
                cause.valueHistory = history;
                cause.creationInfo = _valueTracker.getCreationInfo(result);
                cause.lastModification = _valueTracker.getLastModification(result);
            }
        }
        
        return cause;
    }
    
    /**
     * 构建错误条件的因果信息
     * @param {Array} args - 参数数组
     * @param {*} result - 返回值
     * @param {Object} condition - 条件规则
     * @return {Object} 因果信息
     */
    function _buildErrorCause(args, result, condition) {
        var cause = {
            type: "error_condition",
            condition: condition
        };
        
        // 获取相关值的历史
        if (_valueTracker) {
            cause.argumentsHistory = [];
            for (var i = 0; i < args.length; i++) {
                var history = _valueTracker.getValueHistory(args[i]);
                if (history.length > 0) {
                    cause.argumentsHistory.push({
                        argIndex: i,
                        history: history
                    });
                }
            }
            
            if (result !== undefined) {
                var resultHistory = _valueTracker.getValueHistory(result);
                if (resultHistory.length > 0) {
                    cause.resultHistory = resultHistory;
                }
            }
        }
        
        return cause;
    }
    
    /**
     * 安全的条件评估
     * @param {String} condition - 条件字符串
     * @param {Object} context - 上下文
     * @return {Boolean} 评估结果
     */
    function evalCondition(condition, context) {
        // 简单的条件评估器，只支持基本操作
        var safeCondition = condition
            .replace(/args\[(\d+)\]/g, "context.args[$1]")
            .replace(/result/g, "context.result")
            .replace(/base/g, "context.base")
            .replace(/functionName/g, "context.functionName");
        
        try {
            // 使用Function构造器进行安全评估
            var evalFunc = new Function("context", "return " + safeCondition);
            return evalFunc(context);
        } catch (error) {
            console.log("[ExpectationEngine] 条件评估错误: " + error.message);
            return false;
        }
    }
    
    // ==========================================================
    // 违规报告
    // ==========================================================
    
    /**
     * 报告违规
     * @param {Object} violation - 违规信息
     */
    function reportViolation(violation) {
        // 添加调用栈信息
        violation.callStack = _callStack.slice();
        violation.timestamp = new Date().getTime();
        
        _violations.push(violation);
        
        console.log("[ExpectationEngine] 发现违规: " + violation.type + " - " + violation.message);
    }
    
    // ==========================================================
    // 调用栈管理
    // ==========================================================
    
    /**
     * 函数进入
     * @param {String} functionName - 函数名
     * @param {String} iid - 指令ID
     */
    function functionEnter(functionName, iid) {
        _callStack.push({
            functionName: functionName,
            iid: iid,
            entryTime: new Date().getTime()
        });
    }
    
    /**
     * 函数退出
     * @param {String} functionName - 函数名
     */
    function functionExit(functionName) {
        // 找到并移除对应的栈帧
        for (var i = _callStack.length - 1; i >= 0; i--) {
            if (_callStack[i].functionName === functionName) {
                _callStack.splice(i, 1);
                break;
            }
        }
    }
    
    // ==========================================================
    // 模块接口
    // ==========================================================
    
    return {
        // 初始化
        initialize: initialize,
        
        // 核心验证
        validateFunctionCall: validateFunctionCall,
        
        // 调用栈管理
        functionEnter: functionEnter,
        functionExit: functionExit,
        
        // 结果查询
        getViolations: function() {
            return _violations.slice(); // 返回副本
        },
        
        clearViolations: function() {
            _violations = [];
            console.log("[ExpectationEngine] 违规记录已清空");
        },
        
        getCallStack: function() {
            return _callStack.slice(); // 返回副本
        },
        
        // 工具方法
        setRules: function(rules) {
            _rules = rules || {};
            console.log("[ExpectationEngine] 规则已更新，数量: " + Object.keys(_rules).length);
        },
        
        getStatistics: function() {
            var errorCount = 0;
            var warningCount = 0;
            var violationTypes = {};
            
            for (var i = 0; i < _violations.length; i++) {
                var violation = _violations[i];
                if (violation.severity === "ERROR") {
                    errorCount++;
                } else if (violation.severity === "WARNING") {
                    warningCount++;
                }
                
                var type = violation.type;
                violationTypes[type] = (violationTypes[type] || 0) + 1;
            }
            
            return {
                totalViolations: _violations.length,
                errorCount: errorCount,
                warningCount: warningCount,
                violationTypes: violationTypes
            };
        }
    };
    
})();

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.ExpectationEngine = ExpectationEngine;
} else {
    this.ExpectationEngine = ExpectationEngine;
}

console.log("[ExpectationEngine] expectation-engine.js 加载完成");
