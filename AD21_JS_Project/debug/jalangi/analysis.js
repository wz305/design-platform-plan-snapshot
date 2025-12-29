// ==========================================================
// Jalangi Analysis - 简化版
// 用于Debug Runtime的代码插桩和Trace收集
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// Trace收集器
// ==========================================================
var _TraceCollector = {
    traces: [],
    enabled: false,
    
    /**
     * 启用Trace收集
     */
    enable: function() {
        this.enabled = true;
        this.traces = [];
        console.log("[Trace Collector] 已启用");
    },
    
    /**
     * 禁用Trace收集
     */
    disable: function() {
        this.enabled = false;
        console.log("[Trace Collector] 已禁用");
    },
    
    /**
     * 记录Trace事件
     * @param {String} type - 事件类型
     * @param {Object} data - 事件数据
     */
    record: function(type, data) {
        if (!this.enabled) {
            return;
        }
        
        var trace = {
            type: type,
            timestamp: new Date().getTime(),
            data: data
        };
        
        // 添加位置信息
        if (typeof J$ !== "undefined" && J$.iidToLocation) {
            var location = J$.iidToLocation(data.iid);
            if (location) {
                trace.location = location;
            }
        }
        
        this.traces.push(trace);
        
        // 使用原始console.log避免循环
        if (this._originalConsoleLog) {
            this._originalConsoleLog("[Trace] " + type + ": " + JSON.stringify(data));
        }
    },
    
    /**
     * 获取所有Trace
     * @return {Array} Trace数组
     */
    getTraces: function() {
        return this.traces.slice(); // 返回副本
    },
    
    /**
     * 清空Trace
     */
    clear: function() {
        this.traces = [];
        console.log("[Trace Collector] 已清空");
    },
    
    /**
     * 保存Trace到文件
     * @param {String} filename - 文件名
     */
    saveToFile: function(filename) {
        // 在Node.js环境中可以使用fs模块
        if (typeof require !== "undefined") {
            try {
                var fs = require("fs");
                var traceData = {
                    metadata: {
                        timestamp: new Date().toISOString(),
                        totalTraces: this.traces.length
                    },
                    traces: this.traces
                };
                
                fs.writeFileSync(filename, JSON.stringify(traceData, null, 2));
                console.log("[Trace Collector] Trace已保存到: " + filename);
            } catch (error) {
                console.log("[Trace Collector] 保存文件失败: " + error.message);
            }
        } else {
            console.log("[Trace Collector] 文件系统不可用");
        }
    }
};

// ==========================================================
// Jalangi Analysis接口
// ==========================================================
var analysis = {
    
    /**
     * 变量写入事件
     * @param {Number} iid - 动态指令ID
     * @param {String} name - 变量名
     * @param {*} val - 新值
     * @param {*} lhs - 左值
     */
    write: function(iid, name, val, lhs) {
        _TraceCollector.record("write", {
            iid: iid,
            symbol: name,
            oldValue: lhs,
            newValue: val,
            valueType: typeof val
        });
    },
    
    /**
     * 函数调用事件
     * @param {Number} iid - 动态指令ID
     * @param {Function} f - 被调用函数
     * @param {*} base - 基础对象
     * @param {Array} args - 参数数组
     * @param {*} result - 返回值
     */
    invokeFun: function(iid, f, base, args, result) {
        var functionName = "";
        if (f && f.name) {
            functionName = f.name;
        } else if (f && f.toString) {
            // 尝试从函数字符串提取名称
            var funcStr = f.toString();
            var match = funcStr.match(/function\s+(\w+)/);
            if (match) {
                functionName = match[1];
            } else {
                functionName = "anonymous";
            }
        } else {
            functionName = "unknown";
        }
        
        _TraceCollector.record("call", {
            iid: iid,
            from: _getCallerName(),
            to: functionName,
            args: _sanitizeArgs(args),
            result: _sanitizeValue(result),
            hasBase: base !== undefined && base !== null
        });
    },
    
    /**
     * 函数返回事件
     * @param {Number} iid - 动态指令ID
     * @param {*} value - 返回值
     */
    return_: function(iid, value) {
        _TraceCollector.record("return", {
            iid: iid,
            value: _sanitizeValue(value),
            valueType: typeof value
        });
    },
    
    /**
     * 对象属性读取事件
     * @param {Number} iid - 动态指令ID
     * @param {*} base - 基础对象
     * @param {String} offset - 属性名
     * @param {*} val - 属性值
     */
    getField: function(iid, base, offset, val) {
        if (typeof offset === "string") {
            _TraceCollector.record("read", {
                iid: iid,
                object: _getObjectType(base),
                property: offset,
                value: _sanitizeValue(val),
                valueType: typeof val
            });
        }
    },
    
    /**
     * 对象属性写入事件
     * @param {Number} iid - 动态指令ID
     * @param {*} base - 基础对象
     * @param {String} offset - 属性名
     * @param {*} val - 新值
     */
    putField: function(iid, base, offset, val) {
        if (typeof offset === "string") {
            _TraceCollector.record("write", {
                iid: iid,
                object: _getObjectType(base),
                property: offset,
                newValue: _sanitizeValue(val),
                valueType: typeof val
            });
        }
    },
    
    /**
     * 字面量创建事件
     * @param {Number} iid - 动态指令ID
     * @param {*} val - 字面量值
     */
    literal: function(iid, val) {
        // 字面量通常不需要记录，除非是复杂对象
        if (typeof val === "object" && val !== null) {
            _TraceCollector.record("literal", {
                iid: iid,
                value: _sanitizeValue(val),
                valueType: typeof val
            });
        }
    },
    
    /**
     * 条件分支事件
     * @param {Number} iid - 动态指令ID
     * @param {Boolean} result - 条件结果
     */
    conditional: function(iid, result) {
        _TraceCollector.record("conditional", {
            iid: iid,
            result: result
        });
    },
    
    /**
     * 脚本加载完成事件
     */
    scriptLoad: function() {
        _TraceCollector.record("script", {
            event: "load",
            url: typeof document !== "undefined" ? document.URL : "unknown"
        });
    },
    
    /**
     * 脚本执行完成事件
     */
    scriptExit: function() {
        _TraceCollector.record("script", {
            event: "exit",
            traceCount: _TraceCollector.traces.length
        });
    }
};

// ==========================================================
// 工具函数
// ==========================================================

/**
 * 获取调用者名称
 * @return {String} 调用者函数名
 */
function _getCallerName() {
    var stack = [];
    try {
        throw new Error();
    } catch (error) {
        stack = error.stack.split("\n");
    }
    
    // 跳过当前函数和Jalangi内部函数
    for (var i = 3; i < stack.length; i++) {
        var line = stack[i];
        if (line && line.indexOf("at ") !== -1) {
            var match = line.match(/at\s+(\w+)/);
            if (match) {
                return match[1];
            }
        }
    }
    
    return "unknown";
}

/**
 * 获取对象类型描述
 * @param {*} obj - 对象
 * @return {String} 类型描述
 */
function _getObjectType(obj) {
    if (obj === null) {
        return "null";
    }
    if (obj === undefined) {
        return "undefined";
    }
    
    var constructor = obj.constructor;
    if (constructor && constructor.name) {
        return constructor.name;
    }
    
    // 尝试从toString获取类型
    var str = Object.prototype.toString.call(obj);
    var match = str.match(/\[object\s+(\w+)\]/);
    if (match) {
        return match[1];
    }
    
    return typeof obj;
}

/**
 * 清理参数值（移除循环引用等）
 * @param {Array} args - 参数数组
 * @return {Array} 清理后的参数
 */
function _sanitizeArgs(args) {
    if (!args || !Array.isArray(args)) {
        return [];
    }
    
    var sanitized = [];
    for (var i = 0; i < args.length; i++) {
        sanitized.push(_sanitizeValue(args[i]));
    }
    return sanitized;
}

/**
 * 清理值（移除循环引用等）
 * @param {*} val - 原始值
 * @return {*} 清理后的值
 */
function _sanitizeValue(val) {
    if (val === null || val === undefined) {
        return val;
    }
    
    var type = typeof val;
    
    // 基本类型直接返回
    if (type === "string" || type === "number" || type === "boolean") {
        return val;
    }
    
    // 函数返回描述
    if (type === "function") {
        return "[Function: " + (val.name || "anonymous") + "]";
    }
    
    // 对象类型需要处理循环引用
    if (type === "object") {
        try {
            // 简化实现：只返回类型和关键属性
            var result = {
                _type: _getObjectType(val)
            };
            
            // 添加一些常见的识别属性
            if (val.I_ObjectAddress !== undefined) {
                result.I_ObjectAddress = val.I_ObjectAddress;
            }
            if (val.FileName !== undefined) {
                result.FileName = val.FileName;
            }
            if (val.Name !== undefined) {
                result.Name = val.Name;
            }
            
            return result;
        } catch (error) {
            return "[Object: " + _getObjectType(val) + "]";
        }
    }
    
    return val;
}

// ==========================================================
// 全局接口
// ==========================================================

/**
 * 启用Trace收集（全局接口）
 */
function enableTrace() {
    _TraceCollector.enable();
}

/**
 * 禁用Trace收集（全局接口）
 */
function disableTrace() {
    _TraceCollector.disable();
}

/**
 * 获取Trace（全局接口）
 * @return {Array} Trace数组
 */
function getTrace() {
    return _TraceCollector.getTraces();
}

/**
 * 清空Trace（全局接口）
 */
function clearTrace() {
    _TraceCollector.clear();
}

/**
 * 保存Trace到文件（全局接口）
 * @param {String} filename - 文件名
 */
function saveTrace(filename) {
    _TraceCollector.saveToFile(filename);
}

/**
 * 获取Trace统计信息
 * @return {Object} 统计信息
 */
function getTraceStats() {
    var traces = _TraceCollector.traces;
    var stats = {
        total: traces.length,
        byType: {},
        timeRange: null
    };
    
    if (traces.length > 0) {
        stats.timeRange = {
            start: traces[0].timestamp,
            end: traces[traces.length - 1].timestamp
        };
    }
    
    for (var i = 0; i < traces.length; i++) {
        var type = traces[i].type;
        if (!stats.byType[type]) {
            stats.byType[type] = 0;
        }
        stats.byType[type]++;
    }
    
    return stats;
}

// ==========================================================
// 轻量级插桩系统
// ==========================================================

/**
 * 轻量级插桩管理器
 */
var _LightweightInstrumentation = {
    originalFunctions: {},
    instrumented: false,
    
    /**
     * 启用轻量级插桩
     */
    enable: function() {
        if (this.instrumented) {
            return;
        }
        
        console.log("[Lightweight Instrumentation] 启用轻量级插桩");
        
        // 插桩全局函数调用
        this.instrumentGlobalFunctions();
        
        // 插桩常见对象方法
        this.instrumentObjectMethods();
        
        // 插桩console.log
        this.instrumentConsole();
        
        this.instrumented = true;
    },
    
    /**
     * 插桩全局函数
     */
    instrumentGlobalFunctions: function() {
        var self = this;
        
        // 获取全局作用域中的所有函数
        for (var name in this) {
            if (typeof this[name] === "function" && name.indexOf("_") !== 0) {
                this.wrapFunction(this, name, "global." + name);
            }
        }
        
        // 插桩window或global的函数
        var globalObj = typeof global !== "undefined" ? global : this;
        for (var name in globalObj) {
            if (typeof globalObj[name] === "function" && 
                name.indexOf("_") !== 0 && 
                !this.originalFunctions[name]) {
                this.wrapFunction(globalObj, name, "global." + name);
            }
        }
    },
    
    /**
     * 插桩对象方法
     */
    instrumentObjectMethods: function() {
        // 插桩Object的常用方法
        this.wrapFunction(Object, "create", "Object.create");
        this.wrapFunction(Object, "keys", "Object.keys");
        
        // 插桩Array的常用方法
        this.wrapFunction(Array.prototype, "push", "Array.prototype.push");
        this.wrapFunction(Array.prototype, "pop", "Array.prototype.pop");
        this.wrapFunction(Array.prototype, "slice", "Array.prototype.slice");
    },
    
    /**
     * 插桩console
     */
    instrumentConsole: function() {
        var self = this;
        var originalLog = console.log;
        
        // 保存原始console.log到TraceCollector
        _TraceCollector._originalConsoleLog = originalLog;
        
        console.log = function() {
            // 避免在Trace收集期间记录console调用
            if (_TraceCollector.enabled && !_TraceCollector._inRecord) {
                _TraceCollector._inRecord = true;
                try {
                    _TraceCollector.record("console", {
                        method: "log",
                        args: _sanitizeArgs(arguments)
                    });
                } finally {
                    _TraceCollector._inRecord = false;
                }
            }
            
            return originalLog.apply(console, arguments);
        };
        
        this.originalFunctions["console.log"] = originalLog;
    },
    
    /**
     * 包装函数以添加插桩
     * @param {Object} obj - 对象
     * @param {String} methodName - 方法名
     * @param {String} fullName - 完整名称
     */
    wrapFunction: function(obj, methodName, fullName) {
        if (!obj[methodName] || typeof obj[methodName] !== "function") {
            return;
        }
        
        // 避免插桩自己的函数
        if (fullName.indexOf("global.wrapFunction") === 0 ||
            fullName.indexOf("global.instrument") === 0 ||
            fullName.indexOf("global.enableTrace") === 0 ||
            fullName.indexOf("global.disableTrace") === 0 ||
            fullName.indexOf("global.saveTrace") === 0 ||
            fullName.indexOf("global.getTrace") === 0 ||
            fullName.indexOf("global.clearTrace") === 0 ||
            fullName.indexOf("global.getTraceStats") === 0 ||
            fullName.indexOf("_TraceCollector") === 0 ||
            fullName.indexOf("_LightweightInstrumentation") === 0 ||
            fullName.indexOf("_sanitize") === 0 ||
            fullName.indexOf("_getCallerName") === 0 ||
            fullName.indexOf("_getObjectType") === 0) {
            return;
        }
        
        var original = obj[methodName];
        var self = this;
        var inInstrumentation = false;
        
        obj[methodName] = function() {
            // 防止重入
            if (inInstrumentation) {
                return original.apply(this, arguments);
            }
            
            inInstrumentation = true;
            var startTime = new Date().getTime();
            var result;
            
            try {
                // 记录函数调用（但不记录插桩系统自己的调用）
                _TraceCollector.record("call", {
                    iid: "lightweight_" + startTime,
                    from: "user_code",
                    to: fullName,
                    args: _sanitizeArgs(arguments),
                    hasBase: obj !== this
                });
                
                result = original.apply(this, arguments);
                
                // 记录返回值
                _TraceCollector.record("return", {
                    iid: "lightweight_" + startTime + "_return",
                    value: _sanitizeValue(result),
                    valueType: typeof result
                });
                
                return result;
            } catch (error) {
                // 记录异常
                _TraceCollector.record("exception", {
                    iid: "lightweight_" + startTime + "_error",
                    error: error.message,
                    stack: error.stack
                });
                
                throw error;
            } finally {
                inInstrumentation = false;
            }
        };
        
        this.originalFunctions[fullName] = original;
    },
    
    /**
     * 恢复原始函数
     */
    disable: function() {
        if (!this.instrumented) {
            return;
        }
        
        console.log("[Lightweight Instrumentation] 恢复原始函数");
        
        // 恢复console.log
        if (this.originalFunctions["console.log"]) {
            console.log = this.originalFunctions["console.log"];
        }
        
        // 恢复其他函数（这里简化处理）
        this.instrumented = false;
    }
};

/**
 * 增强的启用Trace函数
 */
function enableTrace() {
    _TraceCollector.enable();
    
    // 启用轻量级插桩
    if (typeof J$ === "undefined") {
        _LightweightInstrumentation.enable();
    }
}

/**
 * 增强的禁用Trace函数
 */
function disableTrace() {
    _TraceCollector.disable();
    
    // 禁用轻量级插桩
    if (typeof J$ === "undefined") {
        _LightweightInstrumentation.disable();
    }
}

// ==========================================================
// Jalangi集成
// ==========================================================

// 如果Jalangi可用，注册analysis
if (typeof J$ !== "undefined") {
    J$.analysis = analysis;
    console.log("[Jalangi Analysis] 已注册到Jalangi");
} else {
    console.log("[Jalangi Analysis] Jalangi不可用，使用轻量级插桩");
}

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.enableTrace = enableTrace;
    global.disableTrace = disableTrace;
    global.getTrace = getTrace;
    global.clearTrace = clearTrace;
    global.saveTrace = saveTrace;
    global.getTraceStats = getTraceStats;
} else {
    this.enableTrace = enableTrace;
    this.disableTrace = disableTrace;
    this.getTrace = getTrace;
    this.clearTrace = clearTrace;
    this.saveTrace = saveTrace;
    this.getTraceStats = getTraceStats;
}

console.log("[Jalangi Analysis] analysis.js 加载完成");
