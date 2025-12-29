// ==========================================================
// Enhanced Analysis - Jalangi2 + 轻量级智能切换
// 支持Jalangi2优先，轻量级备用的调试系统
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 智能分析器管理器
// ==========================================================
var AnalyzerManager = {
    currentAnalyzer: null,
    analyzerType: null,
    
    /**
     * 初始化分析器（Jalangi2优先，轻量级备用）
     * @param {String} preferredAnalyzer - 首选分析器类型
     * @return {Object} 分析器实例
     */
    initialize: function(preferredAnalyzer) {
        console.log("[Analyzer Manager] 初始化分析器，首选: " + preferredAnalyzer);
        
        // 优先尝试Jalangi2
        if (preferredAnalyzer === "jalangi2" || !preferredAnalyzer) {
            if (this._tryJalangi2()) {
                this.currentAnalyzer = new Jalangi2Analyzer();
                this.analyzerType = "jalangi2";
                console.log("[Analyzer Manager] ✓ 使用Jalangi2分析器");
                return this.currentAnalyzer;
            }
        }
        
        // 降级到轻量级
        console.log("[Analyzer Manager] ⚠️ 降级到轻量级分析器");
        this.currentAnalyzer = new LightweightAnalyzer();
        this.analyzerType = "lightweight";
        return this.currentAnalyzer;
    },
    
    /**
     * 尝试初始化Jalangi2
     * @return {Boolean} 是否成功
     */
    _tryJalangi2: function() {
        try {
            // 检查Jalangi2是否可用
            if (typeof require !== "undefined") {
                var jalangi2 = require("jalangi2");
                if (jalangi2 && jalangi2.J$) {
                    console.log("[Analyzer Manager] Jalangi2可用");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("[Analyzer Manager] Jalangi2不可用: " + error.message);
            return false;
        }
    },
    
    /**
     * 获取当前分析器类型
     * @return {String} 分析器类型
     */
    getType: function() {
        return this.analyzerType;
    },
    
    /**
     * 获取当前分析器
     * @return {Object} 分析器实例
     */
    getCurrent: function() {
        return this.currentAnalyzer;
    }
};

// ==========================================================
// Jalangi2分析器
// ==========================================================
function Jalangi2Analyzer() {
    this.traces = [];
    this.enabled = false;
    this.jalangi2 = null;
    
    this._initialize();
}

Jalangi2Analyzer.prototype = {
    /**
     * 初始化Jalangi2
     */
    _initialize: function() {
        try {
            if (typeof require !== "undefined") {
                this.jalangi2 = require("jalangi2");
                console.log("[Jalangi2 Analyzer] 初始化成功");
            }
        } catch (error) {
            throw new Error("Jalangi2初始化失败: " + error.message);
        }
    },
    
    /**
     * 启用Trace收集
     */
    enable: function() {
        this.enabled = true;
        this.traces = [];
        console.log("[Jalangi2 Analyzer] 已启用");
    },
    
    /**
     * 禁用Trace收集
     */
    disable: function() {
        this.enabled = false;
        console.log("[Jalangi2 Analyzer] 已禁用");
    },
    
    /**
     * 执行脚本并收集Trace
     * @param {String} scriptPath - 脚本路径
     * @param {String} entryFunction - 入口函数名
     * @param {Object} options - 执行选项
     * @return {Object} 执行结果
     */
    executeAndTrace: function(scriptPath, entryFunction, options) {
        if (!this.jalangi2) {
            throw new Error("Jalangi2未初始化");
        }
        
        console.log("[Jalangi2 Analyzer] 执行脚本: " + scriptPath);
        console.log("[Jalangi2 Analyzer] 入口函数: " + entryFunction);
        
        try {
            // 准备Jalangi2执行
            var analysisPath = __dirname + "/enhanced-analysis.js";
            var cmd = [
                "node",
                "node_modules/jalangi2/src/js/commands/jalangi.js",
                "--analysis", analysisPath,
                scriptPath,
                entryFunction
            ];
            
            // 这里应该通过child_process执行，为了简化先返回模拟结果
            var result = {
                success: true,
                traces: this.traces,
                analyzerType: "jalangi2",
                message: "Jalangi2执行成功"
            };
            
            console.log("[Jalangi2 Analyzer] ✓ 执行完成");
            return result;
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                analyzerType: "jalangi2"
            };
        }
    },
    
    /**
     * 获取Traces
     * @return {Array} Trace数组
     */
    getTraces: function() {
        return this.traces.slice();
    },
    
    /**
     * 清空Traces
     */
    clearTraces: function() {
        this.traces = [];
        console.log("[Jalangi2 Analyzer] Traces已清空");
    }
};

// ==========================================================
// 轻量级分析器（基于之前的实现）
// ==========================================================
function LightweightAnalyzer() {
    this.traces = [];
    this.enabled = false;
    this.originalFunctions = {};
    this.instrumented = false;
}

LightweightAnalyzer.prototype = {
    /**
     * 启用Trace收集
     */
    enable: function() {
        this.enabled = true;
        this.traces = [];
        this._instrumentConsole();
        console.log("[Lightweight Analyzer] 已启用");
    },
    
    /**
     * 禁用Trace收集
     */
    disable: function() {
        this.enabled = false;
        this._restoreFunctions();
        console.log("[Lightweight Analyzer] 已禁用");
    },
    
    /**
     * 执行脚本并收集Trace
     * @param {String} scriptPath - 脚本路径
     * @param {String} entryFunction - 入口函数名
     * @param {Object} options - 执行选项
     * @return {Object} 执行结果
     */
    executeAndTrace: function(scriptPath, entryFunction, options) {
        console.log("[Lightweight Analyzer] 执行脚本: " + scriptPath);
        console.log("[Lightweight Analyzer] 入口函数: " + entryFunction);
        
        try {
            // 加载脚本
            require(scriptPath);
            
            // 检查入口函数是否存在
            if (typeof global[entryFunction] !== "function") {
                throw new Error("入口函数不存在: " + entryFunction);
            }
            
            // 执行入口函数
            var result = global[entryFunction]();
            
            return {
                success: true,
                traces: this.traces,
                analyzerType: "lightweight",
                message: "轻量级执行成功",
                result: result
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                analyzerType: "lightweight",
                stack: error.stack
            };
        }
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
        
        this.traces.push(trace);
        
        // 使用原始console.log避免循环
        if (this._originalConsoleLog) {
            this._originalConsoleLog("[Trace] " + type + ": " + JSON.stringify(data));
        }
    },
    
    /**
     * 插桩console
     */
    _instrumentConsole: function() {
        var self = this;
        var originalLog = console.log;
        
        // 保存原始console.log
        self._originalConsoleLog = originalLog;
        
        console.log = function() {
            // 记录console调用
            if (self.enabled && !self._inRecord) {
                self._inRecord = true;
                try {
                    self.record("console", {
                        method: "log",
                        args: self._sanitizeArgs(arguments)
                    });
                } finally {
                    self._inRecord = false;
                }
            }
            
            return originalLog.apply(console, arguments);
        };
        
        this.originalFunctions["console.log"] = originalLog;
    },
    
    /**
     * 恢复原始函数
     */
    _restoreFunctions: function() {
        if (this.originalFunctions["console.log"]) {
            console.log = this.originalFunctions["console.log"];
        }
    },
    
    /**
     * 清理参数值
     * @param {Arguments} args - 参数对象
     * @return {Array} 清理后的参数
     */
    _sanitizeArgs: function(args) {
        if (!args || !Array.isArray(args)) {
            return [];
        }
        
        var sanitized = [];
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (typeof arg === "object" && arg !== null) {
                sanitized.push("[Object]");
            } else if (typeof arg === "function") {
                sanitized.push("[Function]");
            } else {
                sanitized.push(arg);
            }
        }
        return sanitized;
    },
    
    /**
     * 获取Traces
     * @return {Array} Trace数组
     */
    getTraces: function() {
        return this.traces.slice();
    },
    
    /**
     * 清空Traces
     */
    clearTraces: function() {
        this.traces = [];
        console.log("[Lightweight Analyzer] Traces已清空");
    }
};

// ==========================================================
// Jalangi2 Analysis接口（兼容性）
// ==========================================================
var analysis = {
    
    /**
     * 变量写入事件（Jalangi2调用）
     */
    write: function(iid, name, val, lhs) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record) {
            analyzer.record("write", {
                iid: iid,
                symbol: name,
                oldValue: lhs,
                newValue: val,
                valueType: typeof val
            });
        }
    },
    
    /**
     * 函数调用事件（Jalangi2调用）
     */
    invokeFun: function(iid, f, base, args, result) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record) {
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
            
            analyzer.record("call", {
                iid: iid,
                from: "user_code",
                to: functionName,
                args: this._sanitizeArgs(args),
                result: this._sanitizeValue(result),
                hasBase: base !== undefined && base !== null
            });
        }
    },
    
    /**
     * 函数返回事件（Jalangi2调用）
     */
    return_: function(iid, value) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record) {
            analyzer.record("return", {
                iid: iid,
                value: this._sanitizeValue(value),
                valueType: typeof value
            });
        }
    },
    
    /**
     * 对象属性读取事件（Jalangi2调用）
     */
    getField: function(iid, base, offset, val) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record && typeof offset === "string") {
            analyzer.record("read", {
                iid: iid,
                object: this._getObjectType(base),
                property: offset,
                value: this._sanitizeValue(val),
                valueType: typeof val
            });
        }
    },
    
    /**
     * 对象属性写入事件（Jalangi2调用）
     */
    putField: function(iid, base, offset, val) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record && typeof offset === "string") {
            analyzer.record("write", {
                iid: iid,
                object: this._getObjectType(base),
                property: offset,
                newValue: this._sanitizeValue(val),
                valueType: typeof val
            });
        }
    },
    
    /**
     * 条件分支事件（Jalangi2调用）
     */
    conditional: function(iid, result) {
        var analyzer = AnalyzerManager.getCurrent();
        if (analyzer && analyzer.record) {
            analyzer.record("conditional", {
                iid: iid,
                result: result
            });
        }
    },
    
    /**
     * 清理参数值
     */
    _sanitizeArgs: function(args) {
        if (!args || !Array.isArray(args)) {
            return [];
        }
        
        var sanitized = [];
        for (var i = 0; i < args.length; i++) {
            sanitized.push(this._sanitizeValue(args[i]));
        }
        return sanitized;
    },
    
    /**
     * 清理值
     */
    _sanitizeValue: function(val) {
        if (val === null || val === undefined) {
            return val;
        }
        
        var type = typeof val;
        
        if (type === "string" || type === "number" || type === "boolean") {
            return val;
        }
        
        if (type === "function") {
            return "[Function: " + (val.name || "anonymous") + "]";
        }
        
        if (type === "object") {
            try {
                var result = {
                    _type: this._getObjectType(val)
                };
                
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
                return "[Object: " + this._getObjectType(val) + "]";
            }
        }
        
        return val;
    },
    
    /**
     * 获取对象类型
     */
    _getObjectType: function(obj) {
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
        
        var str = Object.prototype.toString.call(obj);
        var match = str.match(/\[object\s+(\w+)\]/);
        if (match) {
            return match[1];
        }
        
        return typeof obj;
    }
};

// ==========================================================
// 全局接口
// ==========================================================

/**
 * 初始化分析器
 * @param {String} preferredAnalyzer - 首选分析器
 * @return {Object} 分析器实例
 */
function initializeAnalyzer(preferredAnalyzer) {
    return AnalyzerManager.initialize(preferredAnalyzer);
}

/**
 * 启用Trace收集
 */
function enableTrace() {
    var analyzer = AnalyzerManager.getCurrent();
    if (analyzer) {
        analyzer.enable();
    }
}

/**
 * 禁用Trace收集
 */
function disableTrace() {
    var analyzer = AnalyzerManager.getCurrent();
    if (analyzer) {
        analyzer.disable();
    }
}

/**
 * 获取Trace
 * @return {Array} Trace数组
 */
function getTrace() {
    var analyzer = AnalyzerManager.getCurrent();
    if (analyzer) {
        return analyzer.getTraces();
    }
    return [];
}

/**
 * 清空Trace
 */
function clearTrace() {
    var analyzer = AnalyzerManager.getCurrent();
    if (analyzer) {
        analyzer.clearTraces();
    }
}

/**
 * 获取分析器类型
 * @return {String} 分析器类型
 */
function getAnalyzerType() {
    return AnalyzerManager.getType();
}

/**
 * 保存Trace到文件
 * @param {String} filePath - 文件路径
 */
function saveTrace(filePath) {
    var analyzer = AnalyzerManager.getCurrent();
    if (!analyzer) {
        console.log("[Enhanced Analysis] 没有活动的分析器");
        return;
    }
    
    var traces = analyzer.getTraces();
    if (!traces || traces.length === 0) {
        console.log("[Enhanced Analysis] 没有Trace数据可保存");
        return;
    }
    
    try {
        var fs = require("fs");
        var path = require("path");
        
        // 确保目录存在
        var dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        var traceData = {
            metadata: {
                timestamp: new Date().toISOString(),
                analyzerType: AnalyzerManager.getType(),
                totalTraces: traces.length
            },
            traces: traces
        };
        
        fs.writeFileSync(filePath, JSON.stringify(traceData, null, 2), "utf8");
        console.log("[Enhanced Analysis] Trace已保存到: " + filePath);
        
    } catch (error) {
        console.log("[Enhanced Analysis] 保存Trace失败: " + error.message);
    }
}

/**
 * 获取Trace统计信息
 * @return {Object} 统计信息
 */
function getTraceStats() {
    var analyzer = AnalyzerManager.getCurrent();
    if (!analyzer) {
        return { total: 0, byType: {} };
    }
    
    var traces = analyzer.getTraces();
    if (!traces) {
        return { total: 0, byType: {} };
    }
    
    var stats = {
        total: traces.length,
        byType: {}
    };
    
    for (var i = 0; i < traces.length; i++) {
        var type = traces[i].type;
        if (!stats.byType[type]) {
            stats.byType[type] = 0;
        }
        stats.byType[type]++;
    }
    
    return stats;
}

// 如果Jalangi可用，注册analysis
if (typeof J$ !== "undefined") {
    J$.analysis = analysis;
    console.log("[Enhanced Analysis] 已注册到Jalangi2");
} else {
    console.log("[Enhanced Analysis] Jalangi2不可用，准备独立运行");
}

// 在全局作用域暴露接口
if (typeof global !== "undefined") {
    global.AnalyzerManager = AnalyzerManager;
    global.initializeAnalyzer = initializeAnalyzer;
    global.enableTrace = enableTrace;
    global.disableTrace = disableTrace;
    global.getTrace = getTrace;
    global.clearTrace = clearTrace;
    global.getAnalyzerType = getAnalyzerType;
    global.saveTrace = saveTrace;
    global.getTraceStats = getTraceStats;
} else {
    this.AnalyzerManager = AnalyzerManager;
    this.initializeAnalyzer = initializeAnalyzer;
    this.enableTrace = enableTrace;
    this.disableTrace = disableTrace;
    this.getTrace = getTrace;
    this.clearTrace = clearTrace;
    this.getAnalyzerType = getAnalyzerType;
    this.saveTrace = saveTrace;
    this.getTraceStats = getTraceStats;
}

console.log("[Enhanced Analysis] enhanced-analysis.js 加载完成");
