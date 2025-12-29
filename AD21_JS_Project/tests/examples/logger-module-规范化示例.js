/**
 * LoggerModule 规范化示例
 * 
 * 展示如何将直接调用模式改为条件依赖模式
 * 符合模块调用规范化指南
 */

// ❌ 原来的直接调用模式（不推荐）
var LoggerModuleOriginal = (function(){
    function create(options) {
        // 直接调用，没有条件检查
        var baseInst = BaseModule.create(options); // 危险：BaseModule可能不存在
        
        baseInst._performInitialization = function() {
            // Logger特定的初始化逻辑
            return true;
        };
        
        return baseInst;
    }
    
    return {
        create: create
    };
})();

// ✅ 规范化后的条件依赖模式（推荐）
var LoggerModuleNormalized = (function(){
    function create(options) {
        var baseInst = null;
        
        // ✅ 正确：条件依赖检查
        if (BaseModule) {
            baseInst = BaseModule.create(options);
            
            // 重写初始化方法
            baseInst._performInitialization = function() {
                // Logger特定的初始化逻辑
                return true;
            };
        } else {
            // ✅ 优雅降级：提供基本功能
            baseInst = {
                init: function() {
                    if (console && console.log) {
                        console.log("LoggerModule: BaseModule 不可用，使用简化初始化");
                    }
                    return true;
                },
                run: function() {
                    if (console && console.log) {
                        console.log("LoggerModule: BaseModule 不可用，使用简化运行");
                    }
                    return { success: true, message: "简化运行完成" };
                },
                destroy: function() {
                    if (console && console.log) {
                        console.log("LoggerModule: BaseModule 不可用，使用简化销毁");
                    }
                    return true;
                },
                options: options || {},
                state: { initialized: false, running: false, destroyed: false }
            };
        }
        
        return baseInst;
    }
    
    return {
        create: create
    };
})();

// ✅ 更完整的规范化示例（包含日志功能）
var LoggerModuleComplete = (function(){
    function create(options) {
        var components = {};
        
        // ✅ 分层依赖检查
        // 第一层：核心依赖
        if (BaseModule) {
            components.base = BaseModule.create({
                moduleName: options.moduleName || "LoggerModule",
                autoInit: false
            });
        }
        
        // 第二层：可选依赖
        if (LoggerTypes) {
            components.types = LoggerTypes;
        }
        
        if (LoggerTools) {
            components.tools = LoggerTools;
        }
        
        // ✅ 依赖验证
        if (!components.base) {
            console.warn("LoggerModule: BaseModule 不可用，功能受限");
        }
        
        // 创建Logger实例
        var loggerInstance = components.base || {};
        
        // ✅ 条件功能增强
        if (components.base) {
            // 重写BaseModule的方法
            loggerInstance._performInitialization = function() {
                try {
                    // Logger特定的初始化逻辑
                    this.data = {
                        config: components.types ? components.types.mergeConfig(options, this.getDefaultConfig()) : options,
                        cache: [],
                        stats: components.tools ? components.tools.createStats() : { totalLogs: 0 },
                        initialized: true
                    };
                    
                    return true;
                } catch (error) {
                    if (console && console.error) {
                        console.error("LoggerModule 初始化失败: " + error.message);
                    }
                    return false;
                }
            };
            
            loggerInstance._executeMainLogic = function() {
                try {
                    // Logger特定的主要逻辑
                    if (this.data && this.data.cache.length > 0) {
                        return {
                            success: true,
                            message: "处理了 " + this.data.cache.length + " 条日志",
                            data: { processedCount: this.data.cache.length }
                        };
                    }
                    return { success: true, message: "Logger运行完成" };
                } catch (error) {
                    if (console && console.error) {
                        console.error("LoggerModule 运行失败: " + error.message);
                    }
                    return { success: false, message: error.message };
                }
            };
            
            loggerInstance._performDestroy = function() {
                try {
                    // Logger特定的销毁逻辑
                    if (this.data) {
                        if (this.data.cache.length > 0) {
                            if (console && console.log) {
                                console.log("LoggerModule: 销毁时清空 " + this.data.cache.length + " 条日志");
                            }
                        }
                        this.data.cache = [];
                        this.data.stats = null;
                        this.data.config = null;
                        this.data.initialized = false;
                    }
                    return true;
                } catch (error) {
                    if (console && console.error) {
                        console.error("LoggerModule 销毁失败: " + error.message);
                    }
                    return false;
                }
            };
        }
        
        // ✅ 添加Logger特定方法
        loggerInstance.error = function(message, context, fileName, functionName) {
            if (this.data && this.data.config) {
                var logEntry = components.tools ? components.tools.createLogEntry("ERROR", message, context, fileName, functionName) : {
                    level: "ERROR",
                    message: message,
                    timestamp: new Date().getTime()
                };
                
                this.data.cache.push(logEntry);
                this.data.stats.totalLogs++;
                
                if (console && console.error) {
                    console.error("[" + (this.data.config.moduleName || "LoggerModule") + "] ERROR: " + message);
                }
            }
        };
        
        loggerInstance.info = function(message, context, fileName, functionName) {
            if (this.data && this.data.config) {
                var logEntry = components.tools ? components.tools.createLogEntry("INFO", message, context, fileName, functionName) : {
                    level: "INFO",
                    message: message,
                    timestamp: new Date().getTime()
                };
                
                this.data.cache.push(logEntry);
                this.data.stats.totalLogs++;
                
                if (console && console.log) {
                    console.log("[" + (this.data.config.moduleName || "LoggerModule") + "] INFO: " + message);
                }
            }
        };
        
        return loggerInstance;
    }
    
    return {
        create: create
    };
})();

// ✅ 测试函数：展示差异
function testModulePatterns() {
    console.log("=== 模块调用模式测试 ===");
    
    console.log("\n1. 测试原始直接调用模式:");
    try {
        var originalLogger = LoggerModuleOriginal.create({moduleName: "TestOriginal"});
        console.log("   ✅ 原始模式：成功（假设BaseModule存在）");
        originalLogger.destroy();
    } catch (error) {
        console.log("   ❌ 原始模式：失败 - " + error.message);
    }
    
    console.log("\n2. 测试规范化条件依赖模式:");
    try {
        var normalizedLogger = LoggerModuleNormalized.create({moduleName: "TestNormalized"});
        console.log("   ✅ 规范化模式：成功（有无BaseModule都能工作）");
        normalizedLogger.destroy();
    } catch (error) {
        console.log("   ❌ 规范化模式：失败 - " + error.message);
    }
    
    console.log("\n3. 测试完整规范化模式:");
    try {
        var completeLogger = LoggerModuleComplete.create({moduleName: "TestComplete"});
        console.log("   ✅ 完整模式：成功（支持完整的依赖检查）");
        
        // 测试Logger功能
        completeLogger.info("测试信息日志", {test: true}, "test.js", "testFunction");
        completeLogger.error("测试错误日志", {error: "test error"}, "test.js", "testFunction");
        
        completeLogger.destroy();
    } catch (error) {
        console.log("   ❌ 完整模式：失败 - " + error.message);
    }
    
    console.log("\n=== 测试完成 ===");
}

// 如果是Node.js环境，自动运行测试
if (typeof window === "undefined") {
    testModulePatterns();
}
