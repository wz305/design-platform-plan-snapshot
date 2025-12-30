/**
 * 全局事件处理函数 - DFM直接调用版本
 * @description 此文件不使用IIFE包装，确保AD DFM文件可以直接调用
 * 注意：此文件必须保持ES3兼容性，不能使用任何ES5+特性
 * 
 * 文件用途：提供AD DFM文件可直接调用的全局函数
 * 特别说明：此文件不能使用IIFE包装，必须直接在全局作用域定义函数
 */

/**
 * 工具函数：在UI中显示错误信息
 * @param {string} functionName 函数名称
 * @param {Error} error 错误对象
 * @param {*} context 上下文信息
 */
function showErrorInUI(functionName, error, context) {
    try {
        var timestamp = new Date().toLocaleString();
        
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Add("=== 错误信息 ===");
            memLog.Lines.Add("时间: " + timestamp);
            memLog.Lines.Add("函数: " + functionName);
            memLog.Lines.Add("错误: " + (error.message || "未知错误"));
            
            if (context) {
                memLog.Lines.Add("上下文: " + JSON.stringify(context));
            }
            
            if (error.stack) {
                memLog.Lines.Add("堆栈: " + error.stack);
            }
            
            memLog.Lines.Add("================");
        } else {
            // 如果memLog不可用，尝试使用alert
            if (typeof alert !== "undefined") {
                alert("错误 in " + functionName + ": " + (error.message || "未知错误"));
            }
        }
    } catch (e) {
        // 静默处理错误显示失败
    }
}

/**
 * 工具函数：在UI中显示成功信息
 * @param {string} functionName 函数名称
 * @param {string} message 成功消息
 * @param {*} context 上下文信息
 */
function showSuccessInUI(functionName, message, context) {
    try {
        var timestamp = new Date().toLocaleString();
        
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Add("=== " + message + " ===");
            memLog.Lines.Add("时间: " + timestamp);
            memLog.Lines.Add("函数: " + functionName);
            
            if (context) {
                memLog.Lines.Add("详情: " + JSON.stringify(context));
            }
            
            memLog.Lines.Add("================");
        }
    } catch (e) {
        // 静默处理成功信息显示失败
    }
}

/**
 * 工具函数：检查LoggerModule可用性
 * @returns {Object} 检查结果
 */
function checkLoggerModuleAvailability() {
    var result = {
        available: false,
        loggerModule: null,
        loggerIndex: null,
        uiLoggerModule: null,
        logController: null,
        defaultLogger: null,
        errors: []
    };
    
    try {
        // 检查LoggerModule - 直接检查全局变量
        if (typeof LoggerModule !== "undefined") {
            result.loggerModule = LoggerModule;
        } else {
            result.errors.push("LoggerModule未找到");
        }
        
        // 检查LoggerModuleIndex - 直接检查全局变量
        if (typeof LoggerModuleIndex !== "undefined") {
            result.loggerIndex = LoggerModuleIndex;
        } else {
            result.errors.push("LoggerModuleIndex未找到");
        }
        
        // 检查UILoggerModule - 直接检查全局变量
        if (typeof UILoggerModule !== "undefined") {
            result.uiLoggerModule = UILoggerModule;
        } else {
            result.errors.push("UILoggerModule未找到");
        }
        
        // 检查GlobalLogController - 直接检查全局变量
        if (typeof GlobalLogController !== "undefined") {
            result.logController = GlobalLogController;
        } else {
            result.errors.push("GlobalLogController未找到");
        }
        
        // 检查默认实例
        if (result.loggerIndex) {
            try {
                result.defaultLogger = result.loggerIndex.getDefaultLogger();
                if (result.defaultLogger) {
                    result.available = true;
                } else {
                    result.errors.push("无法获取默认Logger实例");
                }
            } catch (e) {
                result.errors.push("获取默认Logger实例失败: " + e.message);
            }
        }
        
    } catch (e) {
        result.errors.push("检查LoggerModule时发生异常: " + e.message);
    }
    
    return result;
}

/**
 * 全局btnOutputLogClick函数 - 输出日志按钮点击事件
 * @description 将LoggerModule缓存中的日志输出到UI显示区域
 * @param {Object} Sender 事件发送者
 */
function btnOutputLogClick(Sender) {
    try {
        // 检查LoggerModule可用性
        var checkResult = checkLoggerModuleAvailability();
        
        if (!checkResult.available) {
            showErrorInUI("btnOutputLogClick", new Error("LoggerModule不可用"), checkResult);
            return;
        }
        
        // 显示开始信息
        showSuccessInUI("btnOutputLogClick", "开始输出日志", {
            loggerAvailable: checkResult.available,
            timestamp: new Date().toLocaleString()
        });
        
        // 强制刷新日志缓存
        var flushed = checkResult.loggerIndex.flush();
        
        if (flushed) {
            // 获取统计信息
            var stats = checkResult.loggerIndex.getStats();
            var count = checkResult.loggerIndex.getCount();
            
            showSuccessInUI("btnOutputLogClick", "日志输出完成", {
                flushed: flushed,
                stats: stats,
                cacheCount: count,
                timestamp: new Date().toLocaleString()
            });
            
            // 显示一些示例日志内容（如果有的话）
            if (count > 0) {
                memLog.Lines.Add("--- 缓存中有 " + count + " 条日志 ---");
            } else {
                memLog.Lines.Add("--- 缓存中没有日志 ---");
            }
            
        } else {
            showErrorInUI("btnOutputLogClick", new Error("日志输出失败"), {
                flushed: flushed,
                timestamp: new Date().toLocaleString()
            });
        }
        
    } catch (error) {
        showErrorInUI("btnOutputLogClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnGenerateLogClick函数 - 生成日志按钮点击事件
 * @description 生成各种级别的测试日志，包含详细的debug信息
 * @param {Object} Sender 事件发送者
 */
function btnGenerateLogClick(Sender) {
    try {
        // 输出详细的开始信息
        uiInfo("=== 开始日志生成测试 ===", {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        }, "global-events.js", "btnGenerateLogClick");
        
        // 检查LoggerModule可用性
        var checkResult = checkLoggerModuleAvailability();
        
        // 输出详细的模块检查结果
        uiInfo("模块可用性检查结果", {
            available: checkResult.available,
            loggerModule: !!checkResult.loggerModule,
            loggerIndex: !!checkResult.loggerIndex,
            uiLoggerModule: !!checkResult.uiLoggerModule,
            logController: !!checkResult.logController,
            defaultLogger: !!checkResult.defaultLogger,
            errors: checkResult.errors
        }, "global-events.js", "btnGenerateLogClick");
        
        if (!checkResult.available) {
            // 输出详细的错误诊断信息
            uiError("LoggerModule不可用", {
                checkResult: checkResult,
                globalVariables: {
                    LoggerModule: typeof LoggerModule,
                    LoggerModuleIndex: typeof LoggerModuleIndex,
                    UILoggerModule: typeof UILoggerModule,
                    GlobalLogController: typeof GlobalLogController
                },
                timestamp: new Date().toLocaleString()
            }, "global-events.js", "btnGenerateLogClick");
            
            showErrorInUI("btnGenerateLogClick", new Error("LoggerModule不可用"), checkResult);
            return;
        }
        
        // 如果GlobalLogController可用，输出系统诊断信息
        if (checkResult.logController) {
            try {
                uiInfo("输出GlobalLogController诊断信息", null, "global-events.js", "btnGenerateLogClick");
                checkResult.logController.outputSystemDiagnostics();
            } catch (e) {
                uiWarn("输出诊断信息失败", {error: e.message}, "global-events.js", "btnGenerateLogClick");
            }
        }
        
        var logger = checkResult.defaultLogger;
        var testResults = {
            error: false,
            warn: false,
            info: false,
            debug: false
        };
        
        // 输出详细的测试开始信息
        uiInfo("开始各级别日志测试", {
            loggerType: typeof logger,
            loggerHealthy: logger && typeof logger.isHealthy === "function" ? logger.isHealthy() : "unknown",
            timestamp: new Date().toLocaleString()
        }, "global-events.js", "btnGenerateLogClick");
        
        // 生成ERROR级别测试日志
        try {
            uiDebug("测试ERROR级别日志", null, "global-events.js", "btnGenerateLogClick");
            logger.error("这是一个错误日志测试", {
                test: true, 
                level: "error",
                timestamp: new Date().getTime(),
                testId: "error_test_001"
            }, "ui-test", "btnGenerateLogClick");
            testResults.error = true;
            uiInfo("ERROR级别测试成功", null, "global-events.js", "btnGenerateLogClick");
        } catch (e) {
            testResults.error = "失败: " + e.message;
            uiError("ERROR级别测试失败", {
                error: e.message,
                stack: e.stack
            }, "global-events.js", "btnGenerateLogClick");
        }
        
        // 生成WARN级别测试日志
        try {
            uiDebug("测试WARN级别日志", null, "global-events.js", "btnGenerateLogClick");
            logger.warn("这是一个警告日志测试", {
                test: true, 
                level: "warn",
                timestamp: new Date().getTime(),
                testId: "warn_test_001"
            }, "ui-test", "btnGenerateLogClick");
            testResults.warn = true;
            uiInfo("WARN级别测试成功", null, "global-events.js", "btnGenerateLogClick");
        } catch (e) {
            testResults.warn = "失败: " + e.message;
            uiError("WARN级别测试失败", {
                error: e.message,
                stack: e.stack
            }, "global-events.js", "btnGenerateLogClick");
        }
        
        // 生成INFO级别测试日志
        try {
            uiDebug("测试INFO级别日志", null, "global-events.js", "btnGenerateLogClick");
            logger.info("这是一个信息日志测试", {
                test: true, 
                level: "info",
                timestamp: new Date().getTime(),
                testId: "info_test_001"
            }, "ui-test", "btnGenerateLogClick");
            testResults.info = true;
            uiInfo("INFO级别测试成功", null, "global-events.js", "btnGenerateLogClick");
        } catch (e) {
            testResults.info = "失败: " + e.message;
            uiError("INFO级别测试失败", {
                error: e.message,
                stack: e.stack
            }, "global-events.js", "btnGenerateLogClick");
        }
        
        // 生成DEBUG级别测试日志
        try {
            uiDebug("测试DEBUG级别日志", null, "global-events.js", "btnGenerateLogClick");
            logger.debug("这是一个调试日志测试", {
                test: true, 
                level: "debug",
                timestamp: new Date().getTime(),
                testId: "debug_test_001",
                detailedContext: {
                    functionName: "btnGenerateLogClick",
                    fileName: "global-events.js",
                    lineNumber: "约200行",
                    additionalInfo: "这是详细的debug上下文信息"
                }
            }, "ui-test", "btnGenerateLogClick");
            testResults.debug = true;
            uiInfo("DEBUG级别测试成功", null, "global-events.js", "btnGenerateLogClick");
        } catch (e) {
            testResults.debug = "失败: " + e.message;
            uiError("DEBUG级别测试失败", {
                error: e.message,
                stack: e.stack
            }, "global-events.js", "btnGenerateLogClick");
        }
        
        // 输出详细的测试结果
        uiInfo("=== 测试结果汇总 ===", {
            results: testResults,
            successCount: (testResults.error === true ? 1 : 0) + 
                          (testResults.warn === true ? 1 : 0) + 
                          (testResults.info === true ? 1 : 0) + 
                          (testResults.debug === true ? 1 : 0),
            failureCount: (testResults.error !== true ? 1 : 0) + 
                          (testResults.warn !== true ? 1 : 0) + 
                          (testResults.info !== true ? 1 : 0) + 
                          (testResults.debug !== true ? 1 : 0),
            timestamp: new Date().toLocaleString()
        }, "global-events.js", "btnGenerateLogClick");
        
        // 如果GlobalLogController可用，输出统计信息
        if (checkResult.logController) {
            try {
                var stats = checkResult.logController.getStats();
                uiInfo("GlobalLogController统计信息", stats, "global-events.js", "btnGenerateLogClick");
            } catch (e) {
                uiWarn("获取统计信息失败", {error: e.message}, "global-events.js", "btnGenerateLogClick");
            }
        }
        
        // 显示生成结果
        showSuccessInUI("btnGenerateLogClick", "测试日志生成完成", {
            results: testResults,
            timestamp: new Date().toLocaleString()
        });
        
        uiInfo("=== 日志生成测试完成 ===", null, "global-events.js", "btnGenerateLogClick");
        
    } catch (error) {
        uiError("btnGenerateLogClick发生异常", {
            error: error.message,
            stack: error.stack,
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        }, "global-events.js", "btnGenerateLogClick");
        
        showErrorInUI("btnGenerateLogClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnClearDisplayClick函数 - 清空显示按钮点击事件
 * @description 清空UI显示区域
 * @param {Object} Sender 事件发送者
 */
function btnClearDisplayClick(Sender) {
    try {
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Clear();
            showSuccessInUI("btnClearDisplayClick", "显示区域已清空", {
                timestamp: new Date().toLocaleString()
            });
        } else {
            showErrorInUI("btnClearDisplayClick", new Error("memLog组件不可用"), {
                memLogType: typeof memLog,
                timestamp: new Date().toLocaleString()
            });
        }
    } catch (error) {
        showErrorInUI("btnClearDisplayClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnSaveLogClick函数 - 保存日志按钮点击事件
 * @description 将当前显示的日志保存到文件
 * @param {Object} Sender 事件发送者
 */
function btnSaveLogClick(Sender) {
    try {
        // 检查LoggerModule可用性
        var checkResult = checkLoggerModuleAvailability();
        
        if (!checkResult.available) {
            showErrorInUI("btnSaveLogClick", new Error("LoggerModule不可用"), checkResult);
            return;
        }
        
        // 设置目标路径 - 修复为正确路径
        var targetPath = "D:\\!Work\\AD21_JS_Project\\logs";
        
        // 显示开始信息
        showSuccessInUI("btnSaveLogClick", "开始保存日志", {
            targetPath: targetPath,
            timestamp: new Date().toLocaleString()
        });
        
        // 强制刷新日志缓存
        var flushed = checkResult.loggerIndex.flush();
        
        if (flushed) {
            showSuccessInUI("btnSaveLogClick", "日志保存完成", {
                targetPath: targetPath,
                flushed: flushed,
                timestamp: new Date().toLocaleString()
            });
        } else {
            // 增强错误诊断信息
            var errorDetails = {
                flushed: flushed,
                targetPath: targetPath,
                timestamp: new Date().toLocaleString(),
                additionalInfo: {
                    loggerIndexAvailable: !!checkResult.loggerIndex,
                    defaultLoggerAvailable: !!checkResult.defaultLogger,
                    cacheCount: checkResult.loggerIndex ? checkResult.loggerIndex.getCount() : 0,
                    errorCount: checkResult.defaultLogger && checkResult.defaultLogger.getStats ? 
                               checkResult.defaultLogger.getStats().errorCount || 0 : 0
                }
            };
            
            showErrorInUI("btnSaveLogClick", new Error("日志保存失败"), errorDetails);
        }
        
    } catch (error) {
        showErrorInUI("btnSaveLogClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnDebugStatusClick函数 - 调试状态按钮点击事件
 * @description 使用UI调试系统检查模块状态
 * @param {Object} Sender 事件发送者
 */
function btnDebugStatusClick(Sender) {
    try {
        uiInfo("=== 开始调试状态检查 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnDebugStatusClick");
        
        // 调用模块状态检查函数
        debugModuleStatus();
        
        // 额外的UI调试系统测试
        uiTrace("UI调试系统测试", {level: "TRACE"}, "global-events.js", "btnDebugStatusClick");
        uiInfo("UI调试系统测试", {level: "INFO"}, "global-events.js", "btnDebugStatusClick");
        uiWarn("UI调试系统测试", {level: "WARN"}, "global-events.js", "btnDebugStatusClick");
        uiError("UI调试系统测试", {level: "ERROR"}, "global-events.js", "btnDebugStatusClick");
        
        uiInfo("=== 调试状态检查完成 ===", null, "global-events.js", "btnDebugStatusClick");
        
    } catch (error) {
        uiFatal("调试状态检查异常", {
            error: error.message,
            stack: error.stack,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnDebugStatusClick");
    }
}

/**
 * 全局btnLogStatsClick函数 - 日志统计按钮点击事件
 * @description 显示日志性能统计信息
 * @param {Object} Sender 事件发送者
 */
function btnLogStatsClick(Sender) {
    try {
        // 检查GlobalLogController可用性
        var checkResult = checkLoggerModuleAvailability();
        
        if (!checkResult.logController) {
            showErrorInUI("btnLogStatsClick", new Error("GlobalLogController不可用"), checkResult);
            return;
        }
        
        uiInfo("=== 日志性能统计 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnLogStatsClick");
        
        // 获取统计信息
        var stats = checkResult.logController.getStats();
        
        if (stats.enabled) {
            uiInfo("统计信息已启用", null, "global-events.js", "btnLogStatsClick");
            
            // 显示各级别统计
            for (var level in stats.summary) {
                if (stats.summary.hasOwnProperty(level)) {
                    var levelStats = stats.summary[level];
                    uiInfo(level.toUpperCase() + "级别统计", levelStats, "global-events.js", "btnLogStatsClick");
                }
            }
            
            // 显示开关状态
            var genSwitches = checkResult.logController.getGenerationSwitches();
            var dispSwitches = checkResult.logController.getDisplaySwitches();
            
            uiInfo("生成级开关状态", genSwitches, "global-events.js", "btnLogStatsClick");
            uiInfo("显示级开关状态", dispSwitches, "global-events.js", "btnLogStatsClick");
            
        } else {
            uiWarn("统计信息未启用", null, "global-events.js", "btnLogStatsClick");
        }
        
        uiInfo("=== 日志统计完成 ===", null, "global-events.js", "btnLogStatsClick");
        
    } catch (error) {
        showErrorInUI("btnLogStatsClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 显示对象创建窗口函数
 * @description 显示PCB对象创建窗口，提供用户界面来创建各种PCB对象
 */
function showObjectCreatorWindow() {
    try {
        uiInfo("=== 启动对象创建窗口 ===", null, "global-events.js", "showObjectCreatorWindow");
        
        // 检查UILoggerModule是否可用（用于UI输出）
        if (typeof UILoggerModule === "undefined") {
            throw new Error("UILoggerModule不可用，请确保UI日志模块已正确加载");
        }
        
        // 检查ObjectCreatorModule是否可用
        if (typeof ObjectCreatorModule === "undefined") {
            throw new Error("ObjectCreatorModule不可用，请确保对象创建模块已正确加载");
        }
        
        // 使用UILoggerModule显示对象创建窗口信息
        UILoggerModule.uiInfo("对象创建窗口启动", {
            timestamp: new Date().toLocaleString()
        }, "global-events.js", "showObjectCreatorWindow");
        
        uiInfo("=== 对象创建窗口已准备就绪 ===", null, "global-events.js", "showObjectCreatorWindow");
        
    } catch (error) {
        uiError("显示对象创建窗口失败", {
            error: error.message,
            stack: error.stack
        }, "global-events.js", "showObjectCreatorWindow");
        throw error;
    }
}

/**
 * 全局btnCreateObjectClick函数 - 创建对象按钮点击事件
 * @description 显示对象创建窗口
 * @param {Object} Sender 事件发送者
 */
function btnCreateObjectClick(Sender) {
    try {
        uiInfo("=== 显示对象创建窗口 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnCreateObjectClick");
        
        // 调用对象创建窗口函数
        showObjectCreatorWindow();
        
        uiInfo("对象创建窗口已显示", null, "global-events.js", "btnCreateObjectClick");
        
    } catch (error) {
        showErrorInUI("btnCreateObjectClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnRefreshStatusClick函数 - 刷新状态按钮点击事件
 * @description 刷新所有模块状态
 * @param {Object} Sender 事件发送者
 */
function btnRefreshStatusClick(Sender) {
    try {
        uiInfo("=== 刷新模块状态 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnRefreshStatusClick");
        
        // 检查LoggerModule
        var loggerCheck = checkLoggerModuleAvailability();
        uiInfo("LoggerModule状态", {
            available: loggerCheck.available,
            hasDefaultLogger: !!loggerCheck.defaultLogger
        }, "global-events.js", "btnRefreshStatusClick");
        
        // 检查ObjectCreatorModule
        var objectCreatorAvailable = false;
        if (typeof ObjectCreatorModule !== "undefined") {
            objectCreatorAvailable = true;
            try {
                var stats = ObjectCreatorModule.getStatistics();
                uiInfo("ObjectCreatorModule状态", {
                    available: true,
                    config: stats.moduleConfig,
                    supportedTypes: stats.supportedTypes
                }, "global-events.js", "btnRefreshStatusClick");
            } catch (e) {
                uiWarn("ObjectCreatorModule统计获取失败", {error: e.message}, "global-events.js", "btnRefreshStatusClick");
            }
        } else {
            uiWarn("ObjectCreatorModule不可用", null, "global-events.js", "btnRefreshStatusClick");
        }
        
        // 检查PCBInterfaces
        var pcbInterfacesAvailable = false;
        if (typeof PCBInterfaces !== "undefined") {
            pcbInterfacesAvailable = true;
            try {
                var supportedTypes = PCBInterfaces.getSupportedTypes();
                uiInfo("PCBInterfaces状态", {
                    available: true,
                    supportedTypes: supportedTypes
                }, "global-events.js", "btnRefreshStatusClick");
            } catch (e) {
                uiWarn("PCBInterfaces状态获取失败", {error: e.message}, "global-events.js", "btnRefreshStatusClick");
            }
        } else {
            uiWarn("PCBInterfaces不可用", null, "global-events.js", "btnRefreshStatusClick");
        }
        
        uiInfo("=== 状态刷新完成 ===", null, "global-events.js", "btnRefreshStatusClick");
        
    } catch (error) {
        showErrorInUI("btnRefreshStatusClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnObjectStatsClick函数 - 对象统计按钮点击事件
 * @description 显示对象创建统计信息
 * @param {Object} Sender 事件发送者
 */
function btnObjectStatsClick(Sender) {
    try {
        uiInfo("=== 对象创建统计 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnObjectStatsClick");
        
        // 检查ObjectCreatorModule
        if (typeof ObjectCreatorModule !== "undefined") {
            try {
                var stats = ObjectCreatorModule.getStatistics();
                
                uiInfo("模块配置", stats.moduleConfig, "global-events.js", "btnObjectStatsClick");
                uiInfo("支持的对象类型", stats.supportedTypes, "global-events.js", "btnObjectStatsClick");
                
                if (stats.positionStats) {
                    uiInfo("位置统计", stats.positionStats, "global-events.js", "btnObjectStatsClick");
                }
                
            } catch (e) {
                uiError("获取对象统计失败", {error: e.message}, "global-events.js", "btnObjectStatsClick");
            }
        } else {
            uiWarn("ObjectCreatorModule不可用", null, "global-events.js", "btnObjectStatsClick");
        }
        
        // 检查PCBInterfaces
        if (typeof PCBInterfaces !== "undefined") {
            try {
                var pcbStats = PCBInterfaces.getStatistics();
                uiInfo("PCB接口统计", pcbStats, "global-events.js", "btnObjectStatsClick");
            } catch (e) {
                uiWarn("获取PCB接口统计失败", {error: e.message}, "global-events.js", "btnObjectStatsClick");
            }
        }
        
        uiInfo("=== 对象统计完成 ===", null, "global-events.js", "btnObjectStatsClick");
        
    } catch (error) {
        showErrorInUI("btnObjectStatsClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 全局btnClearCacheClick函数 - 清空缓存按钮点击事件
 * @description 清空所有模块缓存
 * @param {Object} Sender 事件发送者
 */
function btnClearCacheClick(Sender) {
    try {
        uiInfo("=== 清空模块缓存 ===", {sender: Sender ? "有效" : "无效"}, "global-events.js", "btnClearCacheClick");
        
        // 清空ObjectCreatorModule缓存
        if (typeof ObjectCreatorModule !== "undefined") {
            try {
                if (ObjectCreatorModule.PositionManager && 
                    typeof ObjectCreatorModule.PositionManager.clearPositionCache === "function") {
                    ObjectCreatorModule.PositionManager.clearPositionCache();
                    uiInfo("位置缓存已清空", null, "global-events.js", "btnClearCacheClick");
                }
            } catch (e) {
                uiWarn("清空位置缓存失败", {error: e.message}, "global-events.js", "btnClearCacheClick");
            }
        }
        
        // 清空PCBInterfaces缓存
        if (typeof PCBInterfaces !== "undefined") {
            try {
                if (typeof PCBInterfaces.cleanup === "function") {
                    PCBInterfaces.cleanup();
                    uiInfo("PCB接口缓存已清空", null, "global-events.js", "btnClearCacheClick");
                }
            } catch (e) {
                uiWarn("清空PCB接口缓存失败", {error: e.message}, "global-events.js", "btnClearCacheClick");
            }
        }
        
        // 清空日志缓存
        var loggerCheck = checkLoggerModuleAvailability();
        if (loggerCheck.logController) {
            try {
                if (typeof loggerCheck.logController.clearAllCaches === "function") {
                    loggerCheck.logController.clearAllCaches();
                    uiInfo("日志缓存已清空", null, "global-events.js", "btnClearCacheClick");
                }
            } catch (e) {
                uiWarn("清空日志缓存失败", {error: e.message}, "global-events.js", "btnClearCacheClick");
            }
        }
        
        uiInfo("=== 缓存清空完成 ===", null, "global-events.js", "btnClearCacheClick");
        
    } catch (error) {
        showErrorInUI("btnClearCacheClick", error, {
            sender: Sender ? "有效" : "无效",
            timestamp: new Date().toLocaleString()
        });
    }
}

// ============================================================
// 日志级别控制事件处理函数
// ============================================================

/**
 * 生成级DEBUG开关点击事件
 */
function chkGenDebugClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkGenDebugClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setGenerationLevel("debug", enabled);
        
        uiInfo("生成级DEBUG开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkGenDebugClick");
        
    } catch (error) {
        showErrorInUI("chkGenDebugClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 生成级INFO开关点击事件
 */
function chkGenInfoClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkGenInfoClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setGenerationLevel("info", enabled);
        
        uiInfo("生成级INFO开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkGenInfoClick");
        
    } catch (error) {
        showErrorInUI("chkGenInfoClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 生成级WARN开关点击事件
 */
function chkGenWarnClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkGenWarnClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setGenerationLevel("warn", enabled);
        
        uiInfo("生成级WARN开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkGenWarnClick");
        
    } catch (error) {
        showErrorInUI("chkGenWarnClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 生成级ERROR开关点击事件
 */
function chkGenErrorClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkGenErrorClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setGenerationLevel("error", enabled);
        
        uiInfo("生成级ERROR开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkGenErrorClick");
        
    } catch (error) {
        showErrorInUI("chkGenErrorClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 显示级DEBUG开关点击事件
 */
function chkUIDebugClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkUIDebugClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setDisplayLevel("debug", enabled);
        
        uiInfo("显示级DEBUG开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkUIDebugClick");
        
    } catch (error) {
        showErrorInUI("chkUIDebugClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 显示级INFO开关点击事件
 */
function chkUIInfoClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkUIInfoClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setDisplayLevel("info", enabled);
        
        uiInfo("显示级INFO开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkUIInfoClick");
        
    } catch (error) {
        showErrorInUI("chkUIInfoClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 显示级WARN开关点击事件
 */
function chkUIWarnClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkUIWarnClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setDisplayLevel("warn", enabled);
        
        uiInfo("显示级WARN开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkUIWarnClick");
        
    } catch (error) {
        showErrorInUI("chkUIWarnClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 显示级ERROR开关点击事件
 */
function chkUIErrorClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("chkUIErrorClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        var enabled = Sender.Checked;
        checkResult.logController.setDisplayLevel("error", enabled);
        
        uiInfo("显示级ERROR开关", {
            enabled: enabled,
            action: enabled ? "开启" : "关闭"
        }, "global-events.js", "chkUIErrorClick");
        
    } catch (error) {
        showErrorInUI("chkUIErrorClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

// ============================================================
// 快捷模式按钮事件处理函数
// ============================================================

/**
 * 开发模式按钮点击事件
 */
function btnDevModeClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("btnDevModeClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        checkResult.logController.enableAllLevels();
        updateAllSwitches(true);
        
        uiInfo("切换到开发模式", {
            mode: "DEVELOPMENT",
            description: "所有日志级别已开启"
        }, "global-events.js", "btnDevModeClick");
        
    } catch (error) {
        showErrorInUI("btnDevModeClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 生产模式按钮点击事件
 */
function btnProdModeClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("btnProdModeClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        checkResult.logController.enableProductionMode();
        updateProductionModeSwitches();
        
        uiInfo("切换到生产模式", {
            mode: "PRODUCTION",
            description: "仅ERROR级别开启"
        }, "global-events.js", "btnProdModeClick");
        
    } catch (error) {
        showErrorInUI("btnProdModeClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 调试模式按钮点击事件
 */
function btnDebugModeClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("btnDebugModeClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        checkResult.logController.enableDebugMode();
        updateDebugModeSwitches();
        
        uiInfo("切换到调试模式", {
            mode: "DEBUG",
            description: "DEBUG + INFO + ERROR级别开启"
        }, "global-events.js", "btnDebugModeClick");
        
    } catch (error) {
        showErrorInUI("btnDebugModeClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 静默模式按钮点击事件
 */
function btnSilentModeClick(Sender) {
    try {
        var checkResult = checkLoggerModuleAvailability();
        if (!checkResult.logController) {
            showErrorInUI("btnSilentModeClick", new Error("GlobalLogController不可用"), null);
            return;
        }
        
        checkResult.logController.disableAllLevels();
        updateAllSwitches(false);
        
        uiInfo("切换到静默模式", {
            mode: "SILENT",
            description: "所有日志级别已关闭"
        }, "global-events.js", "btnSilentModeClick");
        
    } catch (error) {
        showErrorInUI("btnSilentModeClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

// ============================================================
// UI控件状态更新函数
// ============================================================

/**
 * 更新所有开关控件状态
 * @param {boolean} enabled 是否启用
 */
function updateAllSwitches(enabled) {
    try {
        // 更新生成级开关
        if (typeof chkGenDebug !== "undefined") {
            chkGenDebug.Checked = enabled;
        }
        if (typeof chkGenInfo !== "undefined") {
            chkGenInfo.Checked = enabled;
        }
        if (typeof chkGenWarn !== "undefined") {
            chkGenWarn.Checked = enabled;
        }
        if (typeof chkGenError !== "undefined") {
            chkGenError.Checked = enabled;
        }
        
        // 更新显示级开关
        if (typeof chkUIDebug !== "undefined") {
            chkUIDebug.Checked = enabled;
        }
        if (typeof chkUIInfo !== "undefined") {
            chkUIInfo.Checked = enabled;
        }
        if (typeof chkUIWarn !== "undefined") {
            chkUIWarn.Checked = enabled;
        }
        if (typeof chkUIError !== "undefined") {
            chkUIError.Checked = enabled;
        }
        
    } catch (e) {
        // 静默处理UI更新错误
    }
}

/**
 * 更新生产模式开关状态
 */
function updateProductionModeSwitches() {
    try {
        // 生成级：仅ERROR开启
        if (typeof chkGenDebug !== "undefined") {
            chkGenDebug.Checked = false;
        }
        if (typeof chkGenInfo !== "undefined") {
            chkGenInfo.Checked = false;
        }
        if (typeof chkGenWarn !== "undefined") {
            chkGenWarn.Checked = false;
        }
        if (typeof chkGenError !== "undefined") {
            chkGenError.Checked = true;
        }
        
        // 显示级：仅ERROR开启
        if (typeof chkUIDebug !== "undefined") {
            chkUIDebug.Checked = false;
        }
        if (typeof chkUIInfo !== "undefined") {
            chkUIInfo.Checked = false;
        }
        if (typeof chkUIWarn !== "undefined") {
            chkUIWarn.Checked = false;
        }
        if (typeof chkUIError !== "undefined") {
            chkUIError.Checked = true;
        }
        
    } catch (e) {
        // 静默处理UI更新错误
    }
}

/**
 * 更新调试模式开关状态
 */
function updateDebugModeSwitches() {
    try {
        // 生成级：DEBUG + INFO + ERROR开启，WARN关闭
        if (typeof chkGenDebug !== "undefined") {
            chkGenDebug.Checked = true;
        }
        if (typeof chkGenInfo !== "undefined") {
            chkGenInfo.Checked = true;
        }
        if (typeof chkGenWarn !== "undefined") {
            chkGenWarn.Checked = false;
        }
        if (typeof chkGenError !== "undefined") {
            chkGenError.Checked = true;
        }
        
        // 显示级：DEBUG + INFO + ERROR开启，WARN关闭
        if (typeof chkUIDebug !== "undefined") {
            chkUIDebug.Checked = true;
        }
        if (typeof chkUIInfo !== "undefined") {
            chkUIInfo.Checked = true;
        }
        if (typeof chkUIWarn !== "undefined") {
            chkUIWarn.Checked = false;
        }
        if (typeof chkUIError !== "undefined") {
            chkUIError.Checked = true;
        }
        
    } catch (e) {
        // 静默处理UI更新错误
    }
}

/**
 * 全局初始化函数（可选）
 * @description 用于初始化全局事件系统
 */
function initializeGlobalEvents() {
    try {
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Add("=== 全局事件系统初始化 ===");
            memLog.Lines.Add("时间: " + new Date().toLocaleString());
            memLog.Lines.Add("状态: 成功");
            memLog.Lines.Add("========================");
        }
    } catch (e) {
        // 静默处理初始化错误
    }
}

/**
 * UI调试系统 - 核心输出函数
 * @description 基于现有的memLog.Lines.Add()机制
 */
function uiWrite(message) {
    try {
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Add(message);
            
            // 自动滚动到底部
            try {
                if (memLog.Perform && typeof memLog.Perform === "function") {
                    memLog.Perform(EM_SCROLLCARET, 0);
                }
            } catch (e) {
                // 忽略滚动错误
            }
        }
    } catch (e) {
        // 静默处理输出错误
    }
}

/**
 * UI调试系统 - 基础调试函数
 * @description 基于现有格式风格的调试输出
 */
function uiDebug(level, message, context, fileName, functionName) {
    // 性能优化：检查GlobalLogController显示级开关
    var globalController = null;
    if (typeof GlobalLogController !== "undefined") {
        globalController = GlobalLogController;
    }
    
    if (globalController && typeof globalController.isDisplayEnabled === "function") {
        var levelLower = level.toLowerCase();
        if (!globalController.isDisplayEnabled(levelLower)) {
            return;  // 早期返回，避免UI输出
        }
    }
    
    var timestamp = new Date().toLocaleString();
    var parts = [];
    
    // 使用现有的格式风格
    parts.push("[" + timestamp + "]");
    parts.push("[" + level + "]");
    
    if (functionName) {
        parts.push("[函数: " + functionName + "]");
    }
    
    if (fileName) {
        parts.push("[文件: " + fileName + "]");
    }
    
    parts.push(message);
    
    if (context) {
        try {
            parts.push("上下文: " + JSON.stringify(context));
        } catch (e) {
            parts.push("上下文: [无法序列化]");
        }
    }
    
    uiWrite(parts.join(" "));
}

/**
 * UI调试系统 - TRACE级别
 */
function uiTrace(message, context, fileName, functionName) {
    uiDebug("TRACE", message, context, fileName, functionName);
}

/**
 * UI调试系统 - INFO级别
 */
function uiInfo(message, context, fileName, functionName) {
    uiDebug("INFO", message, context, fileName, functionName);
}

/**
 * UI调试系统 - WARN级别
 */
function uiWarn(message, context, fileName, functionName) {
    uiDebug("WARN", message, context, fileName, functionName);
}

/**
 * UI调试系统 - ERROR级别
 */
function uiError(message, context, fileName, functionName) {
    uiDebug("ERROR", message, context, fileName, functionName);
}

/**
 * UI调试系统 - FATAL级别
 */
function uiFatal(message, context, fileName, functionName) {
    uiDebug("FATAL", message, context, fileName, functionName);
}

/**
 * 环境探测入口（安全模式默认）
 */
function 测试_运行环境探测() {
    try {
        if (typeof EnvironmentProbeModule === "undefined" || !EnvironmentProbeModule || !EnvironmentProbeModule.runAll) {
            showErrorInUI("测试_运行环境探测", new Error("EnvironmentProbeModule 未加载"), {
                EnvironmentProbeModule: typeof EnvironmentProbeModule
            });
            return;
        }

        var allowRisky = false;
        var includeMaybe = true;
        var cleanupRisky = false;
        try {
            if (typeof cmbProbeScope !== "undefined" && cmbProbeScope) {
                var idx = -1;
                try { idx = cmbProbeScope.ItemIndex; } catch (e1) {}
                if (idx === 0) {
                    includeMaybe = false;
                    allowRisky = false;
                    cleanupRisky = false;
                } else if (idx === 1) {
                    includeMaybe = true;
                    allowRisky = false;
                    cleanupRisky = false;
                } else if (idx === 2) {
                    includeMaybe = true;
                    allowRisky = true;
                    cleanupRisky = true;
                }
            }
        } catch (e2) {}

        EnvironmentProbeModule.runAll({
            safeMode: true,
            allowRiskyProbes: allowRisky,
            includeMaybeProbes: includeMaybe,
            cleanupRisky: cleanupRisky,
            progIdCandidatesPath: "config\\ActiveX-ProgID-超级候选清单.v3.json",
            httpBaseUrl: "http://127.0.0.1:8080",
            enableUploadReport: true
        });
    } catch (error) {
        showErrorInUI("测试_运行环境探测", error, {
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 最小通信测试入口（M0/M1）
 *
 * 前置：先启动本地Mock Server：
 * - node AD21_JS_Project/web-mock/mock-server-es3.js
 *
 * 在 AD 中直接运行：测试_最小通信流程()
 */
function 测试_AD_XMLHTTP_最小验证() {
        var baseUrl = "http://127.0.0.1:8080";
    
    try {
        uiInfo("=== 开始最小通信流程(AD<->Node) ===", { baseUrl: baseUrl }, "global-events.js", "测试_AD_XMLHTTP_最小验证");
        
        var client = null;
        if (typeof HTTPClientModule !== "undefined") {
            client = HTTPClientModule;
        } else if (typeof HTTP客户端 !== "undefined") {
            client = HTTP客户端;
        }
        
        if (!client) {
            showErrorInUI("测试_AD_XMLHTTP_最小验证", new Error("HTTPClientModule 未加载"), {
                HTTPClientModule: typeof HTTPClientModule,
                HTTP客户端: typeof HTTP客户端
            });
            return;
        }
        
        if (client.setBaseUrl) {
            try { client.setBaseUrl(baseUrl); } catch (e0) {}
        }
        
        var ok = false;
        if (client.ping) {
            ok = client.ping(baseUrl);
        }
        if (!ok) {
            uiWarn("=== 最小通信流程失败：ping ===", { baseUrl: baseUrl }, "global-events.js", "测试_AD_XMLHTTP_最小验证");
            return;
        }
        
        var r1 = null;
        var r2 = null;
        var r3 = null;
        
        if (client.command) {
            r1 = client.command("mock.echo", { from: "AD", a: 1 });
            r2 = client.command("mock.board.summary", { from: "AD" });
            r3 = client.command("mock.unknown", { from: "AD" });
        } else if (client.sendCommand) {
            r1 = client.sendCommand(baseUrl, "mock.echo", { from: "AD", a: 1 });
            r2 = client.sendCommand(baseUrl, "mock.board.summary", { from: "AD" });
            r3 = client.sendCommand(baseUrl, "mock.unknown", { from: "AD" });
        }
        
        var latest = null;
        if (client.latestReport) {
            latest = client.latestReport(0, baseUrl);
        }
        
        try {
            uiInfo("=== 最小通信流程完成 ===", {
                echoOk: r1 && r1.ok,
                summaryOk: r2 && r2.ok,
                unknownOkFalse: r3 && (r3.ok === false),
                latestType: latest && latest.meta ? latest.meta.type : (latest && latest.type ? latest.type : null)
            }, "global-events.js", "测试_AD_XMLHTTP_最小验证");
        } catch (e1) {}
        
    } catch (error) {
        showErrorInUI("测试_AD_XMLHTTP_最小验证", error, {
            baseUrl: baseUrl,
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * 最小通信测试入口（M0/M1）
 *
 * 前置：先启动本地Mock Server：
 * - node AD21_JS_Project/web-mock/mock-server-es3.js
 *
 * 在 AD 中直接运行：测试_最小通信流程()
 */
function 测试_最小通信流程() {
    var baseUrl = "http://127.0.0.1:8080";
    
    try {
        if (typeof 测试_AD_XMLHTTP_最小验证 === "function") {
            测试_AD_XMLHTTP_最小验证();
            return;
        }
        
        uiInfo("=== 开始最小通信流程(AD?Node) ===", { baseUrl: baseUrl }, "global-events.js", "测试_最小通信流程");
        
        var client = null;
        if (typeof HTTPClientModule !== "undefined") {
            client = HTTPClientModule;
        } else if (typeof HTTP客户端 !== "undefined") {
            client = HTTP客户端;
        }
        
        if (!client || !client.ping || !client.sendCommand) {
            showErrorInUI("测试_最小通信流程", new Error("HTTPClientModule 未加载"), {
                HTTPClientModule: typeof HTTPClientModule,
                HTTP客户端: typeof HTTP客户端
            });
            return;
        }
        
        var ok = client.ping(baseUrl);
        if (!ok) {
            client.ui("[TEST] ping failed");
            uiWarn("=== 最小通信流程失败：ping ===", { baseUrl: baseUrl }, "global-events.js", "测试_最小通信流程");
            return;
        }
        
        var resp = client.sendCommand(baseUrl, "mock.board.summary", { from: "AD" });
        try {
            client.ui("[TEST] board.summary=" + JSON.stringify(resp));
        } catch (e1) {
            client.ui("[TEST] board.summary (stringify failed)");
        }
        
        if (resp && resp.ok) {
            uiInfo("=== 最小通信流程完成：OK ===", null, "global-events.js", "测试_最小通信流程");
        } else {
            uiWarn("=== 最小通信流程完成：命令返回失败 ===", resp, "global-events.js", "测试_最小通信流程");
        }
        
    } catch (error) {
        showErrorInUI("测试_最小通信流程", error, {
            baseUrl: baseUrl,
            timestamp: new Date().toLocaleString()
        });
    }
}

/**
 * Spec v0.1 一键验证入口
 * 在 AD 中直接运行：测试_AD_Spec_0_1_一键验证()
 */
function 测试_AD_Spec_0_1_一键验证(options) {
    var useRunControl = !(options && options.skipRunControl);
    var runId = 0;
    if (useRunControl && typeof _beginAdRun === "function") {
        runId = _beginAdRun("Spec0.1");
    }
    var abortCheck = null;
    if (options && options.shouldAbort) {
        abortCheck = options.shouldAbort;
    } else if (useRunControl) {
        abortCheck = function (stage, total, errors) {
            if (typeof _shouldAdStop !== "function") return false;
            return _shouldAdStop(runId, stage) ? "stop.requested" : false;
        };
    } else {
        abortCheck = function () { return false; };
    }
    var baseUrl = "http://127.0.0.1:8080";

    function _safeJson(obj) {
        try {
            if (typeof JsonUtil !== "undefined" && JsonUtil && JsonUtil.stringify) return JsonUtil.stringify(obj);
        } catch (e0) {}
        try { if (typeof JSON !== "undefined" && JSON && JSON.stringify) return JSON.stringify(obj); } catch (e1) {}
        return "";
    }

    function _resolveBoardRef() {
        var pcbServer = null;
        var diag = {
            hasBridge: false,
            hasHostEval: false,
            pcbServerType: "undefined",
            bridgeGetType: "undefined",
            hasGetCurrentPCBBoard: false,
            getCurrentType: "undefined",
            getCurrentError: "",
            resolve: "",
            resolveErrors: ""
        };
        try {
            if (typeof 全局符号桥 !== "undefined" && 全局符号桥 && 全局符号桥.get) {
                diag.hasBridge = true;
                pcbServer = 全局符号桥.get("PCBServer");
                diag.bridgeGetType = typeof pcbServer;
            }
        } catch (e0) {}
        try { diag.hasHostEval = (typeof __adGetHostGlobal === "function"); } catch (e1) {}
        if (!pcbServer && typeof PCBServer !== "undefined") {
            pcbServer = PCBServer;
        }
        try { diag.pcbServerType = typeof pcbServer; } catch (e2) {}
        try {
            if (pcbServer) {
                var tmp = pcbServer.GetCurrentPCBBoard;
                diag.hasGetCurrentPCBBoard = (typeof tmp !== "undefined");
                diag.getCurrentType = typeof tmp;
            }
        } catch (e3) {
            try { diag.getCurrentError = String(e3); } catch (e4) {}
        }

        function _tryResolve(label, fn) {
            try {
                var r = fn();
                if (r) {
                    diag.resolve = label;
                    return r;
                }
            } catch (e9) {
                diag.resolveErrors += label + ": " + String(e9) + "; ";
            }
            return null;
        }

        function _isBoardLike(obj) {
            try {
                if (!obj) return false;
                if (obj.BoardOutline && obj.BoardIterator_Create) return true;
            } catch (e0) {}
            return false;
        }

        var board = null;
        if (pcbServer) {
            board = _tryResolve("pcbServer()", function () {
                if (typeof pcbServer === "function") {
                    var svr = pcbServer();
                    if (svr && svr.GetCurrentPCBBoard) {
                        return (typeof svr.GetCurrentPCBBoard === "function") ? svr.GetCurrentPCBBoard() : svr.GetCurrentPCBBoard;
                    }
                }
                return null;
            });
            if (!board) {
                board = _tryResolve("pcbServer.GetCurrentPCBBoard", function () {
                    if (!pcbServer || typeof pcbServer.GetCurrentPCBBoard === "undefined") return null;
                    if (typeof pcbServer.GetCurrentPCBBoard === "function") return pcbServer.GetCurrentPCBBoard();
                    return pcbServer.GetCurrentPCBBoard;
                });
            }
            if (!board && _isBoardLike(pcbServer)) {
                diag.resolve = "pcbServer(board-like)";
                board = pcbServer;
            }
        }

        if (!board) {
            board = _tryResolve("PCBServer()", function () {
                if (typeof PCBServer === "function") {
                    var svr2 = PCBServer();
                    if (svr2 && svr2.GetCurrentPCBBoard) {
                        return (typeof svr2.GetCurrentPCBBoard === "function") ? svr2.GetCurrentPCBBoard() : svr2.GetCurrentPCBBoard;
                    }
                }
                return null;
            });
        }
        if (!board) {
            board = _tryResolve("PCBServer.GetCurrentPCBBoard", function () {
                if (typeof PCBServer === "undefined") return null;
                if (typeof PCBServer.GetCurrentPCBBoard === "function") return PCBServer.GetCurrentPCBBoard();
                return PCBServer.GetCurrentPCBBoard;
            });
        }
        if (!board && typeof PCBServer !== "undefined" && _isBoardLike(PCBServer)) {
            diag.resolve = "PCBServer(board-like)";
            board = PCBServer;
        }

        var note = "";
        if (!board) {
            if (pcbServer && diag.hasGetCurrentPCBBoard) {
                note = "GetCurrentPCBBoard 返回空，可能未打开 PCB 文档(未确认: 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/01-a_id_IPCB_ServerInterface_a_IPCB_ServerInterface.md)";
            } else {
                note = "PCBServer 未可用(未确认: 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/01-a_id_IPCB_ServerInterface_a_IPCB_ServerInterface.md)";
            }
        }

        return { board: board, diag: diag, note: note };
    }

    function _getBoardSummary() {
        var summary = {
            name: "unknown",
            unitsRaw: null,
            units: "unknown",
            bounds: null,
            counts: { track: 0, via: 0, pad: 0, total: 0 }
        };

        function _normalizeUnits(raw, unitText) {
            if (typeof eImperial !== "undefined" && raw === eImperial) return "mil";
            if (typeof eMetric !== "undefined" && raw === eMetric) return "mm";
            if (unitText) {
                var t = String(unitText);
                if (t.indexOf("Imperial") >= 0 || t.indexOf("mil") >= 0) return "mil";
                if (t.indexOf("Metric") >= 0 || t.indexOf("mm") >= 0) return "mm";
            }
            return "unknown";
        }

        function _buildSummaryFromBoard(board) {
            try { if (board.FileName) summary.name = board.FileName; } catch (e1) {}

            try {
                if (board.DisplayUnit !== undefined) {
                    var raw = null;
                    var unitText = "";
                    try { raw = board.DisplayUnit; } catch (e2a) {}
                    try {
                        if (typeof UnitToString === "function") {
                            unitText = UnitToString(raw);
                        }
                    } catch (e2b) {}
                    summary.unitsRaw = raw;
                    summary.units = _normalizeUnits(raw, unitText);
                    if (summary.units === "unknown") {
                        try {
                            uiWarn("BOARD_SUMMARY_UNITS_DIAG", {
                                unitsRaw: raw,
                                unitText: unitText,
                                doc: "参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/02-a_id_PCB_System_Interfaces_a_PCB_System_Interfaces/02-a_id_IPCB_Board_a_IPCB_Board.md"
                            }, "global-events.js", "_buildSummaryFromBoard");
                        } catch (e2c) {}
                    }
                }
            } catch (e2) {}

            try {
                if (board.BoardOutline && board.BoardOutline.BoundingRectangle) {
                    var br = board.BoardOutline.BoundingRectangle;
                    summary.bounds = {
                        x1: br.Left,
                        y1: br.Bottom,
                        x2: br.Right,
                        y2: br.Top
                    };
                }
            } catch (e3) {}

            try {
                if (typeof StackMap !== "undefined" && StackMap && StackMap.initFromBoard) {
                    StackMap.initFromBoard(board);
                }
            } catch (e4) {}

            try {
                function _getCounter() {
                    try {
                        if (board.PrimitiveCounter) return board.PrimitiveCounter;
                    } catch (e0) {}
                    try {
                        if (board.GetPrimitiveCounter && typeof board.GetPrimitiveCounter === "function") {
                            return board.GetPrimitiveCounter();
                        }
                    } catch (e1) {}
                    return null;
                }

                function _countByCounter(counter, objConst, label) {
                    var err = "";
                    var v = null;
                    try {
                        if (typeof counter.GetObjectCount !== "undefined") {
                            v = counter.GetObjectCount(objConst);
                        } else if (typeof counter.GetCount !== "undefined" && typeof MkSet === "function") {
                            v = counter.GetCount(MkSet(objConst));
                        } else {
                            err = "PrimitiveCounter methods missing";
                        }
                    } catch (e2) {
                        var msg = "";
                        try { if (e2 && e2.message) msg = String(e2.message); } catch (x1) {}
                        try { if (!msg && e2 && e2.description) msg = String(e2.description); } catch (x2) {}
                        try { if (!msg && e2 && typeof e2.number !== "undefined") msg = "number=" + e2.number; } catch (x3) {}
                        err = "PrimitiveCounter error: " + (msg || String(e2));
                    }
                    return { ok: err === "" && v !== null && typeof v !== "undefined", count: Number(v || 0), error: err, label: label };
                }

                function _countByBoard(objConst, label) {
                    var err = "";
                    var v = null;
                    try {
                        if (typeof board.GetPrimitiveCount !== "undefined") {
                            if (typeof MkSet === "function" && typeof AllLayers !== "undefined" && typeof eProcessAll !== "undefined") {
                                v = board.GetPrimitiveCount(MkSet(objConst), AllLayers, eProcessAll);
                            } else {
                                err = "MkSet/AllLayers/eProcessAll missing";
                            }
                        } else {
                            err = "GetPrimitiveCount missing";
                        }
                    } catch (e3) {
                        var msg = "";
                        try { if (e3 && e3.message) msg = String(e3.message); } catch (x4) {}
                        try { if (!msg && e3 && e3.description) msg = String(e3.description); } catch (x5) {}
                        try { if (!msg && e3 && typeof e3.number !== "undefined") msg = "number=" + e3.number; } catch (x6) {}
                        err = "GetPrimitiveCount error: " + (msg || String(e3));
                    }
                    return { ok: err === "" && v !== null && typeof v !== "undefined", count: Number(v || 0), error: err, label: label };
                }

                function _countByIterator(objConst, label) {
                    var err = "";
                    var v = 0;
                    var it = null;
                    try {
                        if (typeof board.BoardIterator_Create !== "undefined") {
                            if (typeof MkSet === "function" && typeof AllLayers !== "undefined" && typeof eProcessAll !== "undefined") {
                                it = board.BoardIterator_Create();
                                if (!it) {
                                    err = "BoardIterator_Create returned null";
                                } else {
                                    if (typeof it.AddFilter_ObjectSet !== "undefined") {
                                        it.AddFilter_ObjectSet(MkSet(objConst));
                                    } else {
                                        err = "Iterator AddFilter_ObjectSet missing";
                                    }
                                    if (!err) {
                                        if (typeof it.AddFilter_LayerSet !== "undefined") {
                                            it.AddFilter_LayerSet(AllLayers);
                                        } else {
                                            err = "Iterator AddFilter_LayerSet missing";
                                        }
                                    }
                                    if (!err) {
                                        if (typeof it.AddFilter_Method !== "undefined") {
                                            it.AddFilter_Method(eProcessAll);
                                        } else {
                                            err = "Iterator AddFilter_Method missing";
                                        }
                                    }
                                    if (!err) {
                                        if (typeof it.FirstPCBObject !== "undefined" && typeof it.NextPCBObject !== "undefined") {
                                            var obj = it.FirstPCBObject();
                                            while (obj) {
                                                v++;
                                                obj = it.NextPCBObject();
                                            }
                                        } else {
                                            err = "Iterator First/Next missing";
                                        }
                                    }
                                }
                            } else {
                                err = "MkSet/AllLayers/eProcessAll missing";
                            }
                        } else {
                            err = "BoardIterator_Create missing";
                        }
                    } catch (e4) {
                        var msg = "";
                        try { if (e4 && e4.message) msg = String(e4.message); } catch (x7) {}
                        try { if (!msg && e4 && e4.description) msg = String(e4.description); } catch (x8) {}
                        try { if (!msg && e4 && typeof e4.number !== "undefined") msg = "number=" + e4.number; } catch (x9) {}
                        err = "BoardIterator error: " + (msg || String(e4));
                    } finally {
                        try {
                            if (it && typeof board.BoardIterator_Destroy !== "undefined") {
                                board.BoardIterator_Destroy(it);
                            }
                        } catch (e5) {}
                    }
                    return { ok: err === "" && v !== null && typeof v !== "undefined", count: Number(v || 0), error: err, label: label };
                }

                if (typeof eTrackObject !== "undefined" && typeof eViaObject !== "undefined" && typeof ePadObject !== "undefined") {
                    var counter = _getCounter();
                    var rTrack = null;
                    var rVia = null;
                    var rPad = null;
                    if (counter) {
                        rTrack = _countByCounter(counter, eTrackObject, "track");
                        rVia = _countByCounter(counter, eViaObject, "via");
                        rPad = _countByCounter(counter, ePadObject, "pad");
                        if (!rTrack.ok) rTrack = _countByBoard(eTrackObject, "track");
                        if (!rVia.ok) rVia = _countByBoard(eViaObject, "via");
                        if (!rPad.ok) rPad = _countByBoard(ePadObject, "pad");
                        if (!rTrack.ok) rTrack = _countByIterator(eTrackObject, "track");
                        if (!rVia.ok) rVia = _countByIterator(eViaObject, "via");
                        if (!rPad.ok) rPad = _countByIterator(ePadObject, "pad");
                    } else {
                        rTrack = _countByBoard(eTrackObject, "track");
                        rVia = _countByBoard(eViaObject, "via");
                        rPad = _countByBoard(ePadObject, "pad");
                        if (!rTrack.ok) rTrack = _countByIterator(eTrackObject, "track");
                        if (!rVia.ok) rVia = _countByIterator(eViaObject, "via");
                        if (!rPad.ok) rPad = _countByIterator(ePadObject, "pad");
                    }

                    if (rTrack && rTrack.ok) summary.counts.track = rTrack.count;
                    if (rVia && rVia.ok) summary.counts.via = rVia.count;
                    if (rPad && rPad.ok) summary.counts.pad = rPad.count;
                    summary.counts.total = summary.counts.track + summary.counts.via + summary.counts.pad;
                    if (!rTrack || !rVia || !rPad || !rTrack.ok || !rVia.ok || !rPad.ok) {
                        summary.note = "PrimitiveCounter/GetPrimitiveCount 统计失败: " +
                            (rTrack ? rTrack.error : "track missing") + " | " +
                            (rVia ? rVia.error : "via missing") + " | " +
                            (rPad ? rPad.error : "pad missing");
                        try {
                            uiWarn("BOARD_SUMMARY_COUNT_DIAG", {
                                track: rTrack,
                                via: rVia,
                                pad: rPad,
                                hasCounter: !!counter
                            }, "global-events.js", "_buildSummaryFromBoard");
                        } catch (e6) {}
                    }
                } else {
                    summary.note = "计数常量缺失(未确认: 参考示例/1.接口文档(处理后版本)/Scripting API/14-PCB_API_System_Interfaces/README.md)";
                }
            } catch (e5) {
                summary.note = "BoardIterator 统计失败";
            }

            return summary;
        }

        try {
            var resolved = _resolveBoardRef();
            if (!resolved.board) {
                summary.note = resolved.note;
                try { uiWarn("BOARD_SUMMARY_DIAG", resolved.diag, "global-events.js", "_getBoardSummary"); } catch (e10) {}
                try {
                    if (typeof ShowMessage === "function") {
                        ShowMessage("未检测到 PCB 文档，请先打开 PcbDoc 后再点击一键验证。");
                    }
                } catch (e11) {}
                return summary;
            }
            return _buildSummaryFromBoard(resolved.board);
        } catch (e6) {
            summary.note = "BoardSummary 异常: " + (e6 && e6.message ? e6.message : String(e6));
            return summary;
        }
    }

    function _resolveLayerName(layerId) {
        if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
            var name = StackMap.getNormalizedLayerName(layerId);
            if (name) return name;
        }
        if (typeof eTopLayer !== "undefined" && layerId === eTopLayer) return "TopLayer";
        if (typeof eBottomLayer !== "undefined" && layerId === eBottomLayer) return "BottomLayer";
        if (typeof eMultiLayer !== "undefined" && layerId === eMultiLayer) return "MultiLayer";
        return null;
    }

    function _normalizeHandleToNumber(v) {
        var diag = { rawType: typeof v, rawString: null };
        if (v === null || v === undefined) return { ok: false, num: 0, diag: diag };
        if (typeof v === "number") {
            if (v !== 0 && isFinite(v)) return { ok: true, num: v, diag: diag };
            return { ok: false, num: 0, diag: diag };
        }
        try {
            var s = String(v);
            diag.rawString = s;
            var n = (s.indexOf("0x") === 0 || s.indexOf("0X") === 0) ? parseInt(s, 16) : parseInt(s, 10);
            if (!isNaN(n) && n !== 0) return { ok: true, num: n, diag: diag };
        } catch (e1) {}
        try {
            var n2 = Number(v);
            if (!isNaN(n2) && n2 !== 0) return { ok: true, num: n2, diag: diag };
        } catch (e2) {}
        return { ok: false, num: 0, diag: diag };
    }

    function _readHandleNumber(obj) {
        if (!obj) return null;
        var raw = null;
        try {
            if (obj.I_ObjectAddress !== undefined && obj.I_ObjectAddress !== null) {
                var t = typeof obj.I_ObjectAddress;
                try { raw = obj.I_ObjectAddress; } catch (eAddr1) {}
                if (typeof raw === "function") {
                    try { raw = raw(); } catch (eAddr2) {}
                }
                if ((raw === null || raw === undefined || raw === 0) && (t === "function" || t === "unknown")) {
                    raw = obj.I_ObjectAddress();
                }
            }
        } catch (e1) {}
        if (raw === null || raw === undefined || raw === 0) {
            try {
                if (obj.ObjectAddress !== undefined && obj.ObjectAddress !== null) {
                    raw = obj.ObjectAddress;
                }
            } catch (e2) {}
        }
        var norm = _normalizeHandleToNumber(raw);
        return norm.ok ? norm.num : null;
    }

    function _readBounds(obj) {
        if (!obj) return null;
        var br = null;
        try {
            if (obj.BoundingRectangle !== undefined && obj.BoundingRectangle !== null) {
                if (typeof obj.BoundingRectangle === "function" || typeof obj.BoundingRectangle === "unknown") {
                    br = obj.BoundingRectangle();
                } else {
                    br = obj.BoundingRectangle;
                }
            }
        } catch (e1) {}
        if (!br) return null;
        return {
            x1: br.Left,
            y1: br.Bottom,
            x2: br.Right,
            y2: br.Top
        };
    }

    function _readObjectIdInfo(obj) {
        var oid = null;
        var oidStr = "";
        if (!obj) return { oid: null, oidStr: "" };
        try { oid = obj.ObjectId; } catch (eObjId) {}
        try { if (obj.ObjectIDString !== undefined) oidStr = String(obj.ObjectIDString); } catch (eObjStr) {}
        if (!oidStr) {
            try { if (obj.ObjectIdString !== undefined) oidStr = String(obj.ObjectIdString); } catch (eObjStr2) {}
        }
        return { oid: oid, oidStr: oidStr };
    }

    function _buildIndexItem(obj, options) {
        var info = _readObjectIdInfo(obj);
        var layerId = null;
        var layerName = null;
        var includeLayerName = !(options && options.includeLayerName === false);
        var includeBounds = !(options && options.includeBounds === false);
        var includeHandle = !(options && options.includeHandle === false);
        try { layerId = obj.Layer; } catch (e1) {}
        if (includeLayerName) {
            var cache = options && options.layerNameCache;
            if (cache && layerId !== null && layerId !== undefined) {
                var cacheKey = String(layerId);
                if (cache.hasOwnProperty(cacheKey)) {
                    layerName = cache[cacheKey];
                } else {
                    layerName = _resolveLayerName(layerId);
                    cache[cacheKey] = layerName;
                }
            } else {
                layerName = _resolveLayerName(layerId);
            }
        }
        var item = {
            objectId: info.oid,
            objectIdString: info.oidStr,
            layerId: layerId
        };
        if (includeLayerName) item.layerName = layerName;
        if (includeHandle) item.handle = _readHandleNumber(obj);
        if (includeBounds) item.bounds = _readBounds(obj);
        return item;
    }

    function _collectObjectIndex(board, maxItems) {
        var res = { ok: false, items: [], total: 0, truncated: false, error: "" };
        if (!board || typeof board.BoardIterator_Create === "undefined") {
            res.error = "BoardIterator_Create not available";
            return res;
        }
        var it = null;
        try { it = board.BoardIterator_Create(); } catch (e1) { it = null; }
        if (!it) {
            res.error = "iterator create failed";
            return res;
        }

        function _iterFirst(it) {
            var p = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    p = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    p = (typeof it.First === "function") ? it.First() : it.First;
                }
            } catch (e2) { p = null; }
            return p || null;
        }

        function _iterNext(it) {
            var p = null;
            try {
                if (typeof it.NextPCBObject !== "undefined") {
                    p = it.NextPCBObject();
                } else if (typeof it.Next !== "undefined") {
                    p = (typeof it.Next === "function") ? it.Next() : it.Next;
                }
            } catch (e3) { p = null; }
            return p || null;
        }

        try {
            if (typeof it.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                it.AddFilter_LayerSet(AllLayers);
            }
            if (typeof it.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                it.AddFilter_Method(eProcessAll);
            }
        } catch (e4) {}

        var cursor = _iterFirst(it);
        while (cursor) {
            res.total++;
            if (!maxItems || res.items.length < maxItems) {
                res.items.push(_buildIndexItem(cursor));
            } else {
                res.truncated = true;
            }
            cursor = _iterNext(it);
        }

        try {
            if (typeof board.BoardIterator_Destroy !== "undefined") {
                board.BoardIterator_Destroy(it);
            }
        } catch (e5) {}

        res.ok = true;
        return res;
    }

    function _streamObjectIndexUpload(board, options) {
        var res = {
            ok: false,
            total: 0,
            truncated: false,
            error: "",
            uploadOk: false,
            uploadBatches: 0,
            uploadOkBatches: 0
        };
        if (!board || typeof board.BoardIterator_Create === "undefined") {
            res.error = "BoardIterator_Create not available";
            return res;
        }
        var it = null;
        try { it = board.BoardIterator_Create(); } catch (e1) { it = null; }
        if (!it) {
            res.error = "iterator create failed";
            return res;
        }

        function _iterFirst(it) {
            var p = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    p = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    p = (typeof it.First === "function") ? it.First() : it.First;
                }
            } catch (e2) { p = null; }
            return p || null;
        }

        function _iterNext(it) {
            var p = null;
            try {
                if (typeof it.NextPCBObject !== "undefined") {
                    p = it.NextPCBObject();
                } else if (typeof it.Next !== "undefined") {
                    p = (typeof it.Next === "function") ? it.Next() : it.Next;
                }
            } catch (e3) { p = null; }
            return p || null;
        }

        try {
            if (typeof it.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                it.AddFilter_LayerSet(AllLayers);
            }
            if (typeof it.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                it.AddFilter_Method(eProcessAll);
            }
        } catch (e4) {}

        var batchSize = options && options.batchSize ? options.batchSize : 0;
        if (!batchSize || batchSize <= 0) batchSize = 5000;
        var maxItems = options && options.maxItems ? options.maxItems : 0;
        var includeBounds = !(options && options.includeBounds === false);
        var includeLayerName = !(options && options.includeLayerName === false);
        var includeHandle = !(options && options.includeHandle === false);
        var layerNameCache = includeLayerName ? {} : null;
        var client = options && options.client ? options.client : null;
        var baseUrl = options && options.baseUrl ? options.baseUrl : "";
        var boardName = options && options.boardName ? options.boardName : "";
        var canRequest = client && client.request ? true : false;

        var batchItems = [];
        var batchIndex = 0;
        var sentCount = 0;
        var uploadOk = true;

        function _sendBatch(isFinal) {
            if (!batchItems || batchItems.length === 0) return;
            batchIndex++;
            var payload = {
                boardName: boardName,
                count: batchItems.length,
                truncated: res.truncated,
                offset: sentCount,
                batchIndex: batchIndex,
                batchCount: isFinal ? batchIndex : 0,
                isFinal: isFinal,
                items: batchItems
            };
            if (isFinal) {
                payload.total = res.total;
            }
            var objectReportId = "ad.object.index-" + String(new Date().getTime()) + "-" + String(batchIndex);
            var objectReport = {
                schema: "spec/0.1",
                type: "ad.object.index",
                id: objectReportId,
                payload: payload,
                meta: {
                    ts: new Date().getTime(),
                    source: "AD",
                    rev: 0.1,
                    detail: { schema: "spec/0.1", build: "ad21-js" }
                }
            };

            if (canRequest) {
                var bodyObjects = _safeJson(objectReport);
                var respObjects = client.request("POST", baseUrl + "/api/upload-objects", bodyObjects, { "Content-Type": "application/json" });
                var okBatch = respObjects && respObjects.ok;
                if (okBatch) res.uploadOkBatches++;
                if (!okBatch) uploadOk = false;
                uiInfo("UPLOAD_OBJECTS", {
                    ok: okBatch,
                    status: respObjects ? respObjects.status : 0,
                    count: batchItems.length,
                    offset: sentCount,
                    total: isFinal ? res.total : null,
                    truncated: res.truncated,
                    batchIndex: batchIndex,
                    batchCount: isFinal ? batchIndex : 0,
                    isFinal: isFinal
                }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
            } else {
                uploadOk = false;
                uiWarn("UPLOAD_OBJECTS", {
                    ok: false,
                    reason: "request not available",
                    batchIndex: batchIndex,
                    batchCount: isFinal ? batchIndex : 0,
                    isFinal: isFinal
                }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
            }

            sentCount += batchItems.length;
            res.uploadBatches = batchIndex;
            batchItems = [];
        }

        try {
            var cursor = _iterFirst(it);
            if (!cursor) {
                res.total = 0;
            }
            while (cursor) {
                res.total++;
                if (maxItems && res.total > maxItems) {
                    res.truncated = true;
                    break;
                }
                batchItems.push(_buildIndexItem(cursor, {
                    includeBounds: includeBounds,
                    includeLayerName: includeLayerName,
                    includeHandle: includeHandle,
                    layerNameCache: layerNameCache
                }));

                var next = _iterNext(it);
                var isLast = !next;
                if (maxItems && res.total >= maxItems) {
                    res.truncated = true;
                    isLast = true;
                }
                if (batchItems.length >= batchSize || isLast) {
                    _sendBatch(isLast);
                }
                if (isLast) break;
                cursor = next;
            }
        } catch (eIter) {
            res.error = String(eIter);
        }

        try {
            if (typeof board.BoardIterator_Destroy !== "undefined") {
                board.BoardIterator_Destroy(it);
            }
        } catch (e5) {}

        if (!res.error) {
            res.ok = true;
        }
        res.uploadOk = uploadOk && res.ok;
        if (res.total === 0) {
            res.uploadOk = true;
            res.uploadBatches = 0;
            uiInfo("UPLOAD_OBJECTS", {
                ok: true,
                status: 0,
                count: 0,
                offset: 0,
                total: 0,
                truncated: false,
                batchIndex: 0,
                batchCount: 0,
                isFinal: true
            }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        }
        return res;
    }

    function _hashDjb2(text) {
        var str = String(text || "");
        var hash = 5381;
        var i;
        for (i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash & 0x7fffffff;
        }
        return "h:" + hash.toString(16);
    }

    function _readPropOrCall(obj, propName, args) {
        if (!obj) return null;
        var v = null;
        try {
            if (obj[propName] !== undefined && obj[propName] !== null) {
                var t = typeof obj[propName];
                if (t === "function" || t === "unknown") {
                    v = obj[propName].apply(obj, args || []);
                } else {
                    v = obj[propName];
                }
            }
        } catch (e1) {}
        if (v === null || v === undefined) {
            var fn = null;
            try { fn = obj["GetState_" + propName]; } catch (e2) { fn = null; }
            if (fn !== undefined && fn !== null) {
                try {
                    var t2 = typeof fn;
                    if (t2 === "function" || t2 === "unknown") {
                        v = fn.apply(obj, args || []);
                    } else {
                        v = fn;
                    }
                } catch (e3) {}
            }
        }
        return v;
    }

    function _readNumber(obj, propName, def, args) {
        var v = _readPropOrCall(obj, propName, args);
        if (v === null || v === undefined || v === "") return def;
        var n = def;
        try {
            n = Number(v);
        } catch (e1) {
            return def;
        }
        if (isNaN(n)) return def;
        return n;
    }

    function _readBool(obj, propName, def, args) {
        var v = _readPropOrCall(obj, propName, args);
        if (v === null || v === undefined) return def ? 1 : 0;
        return v ? 1 : 0;
    }

    function _readStringValue(obj, propName, def, args) {
        var v = _readPropOrCall(obj, propName, args);
        if (v === null || v === undefined) return def || "";
        try {
            return String(v);
        } catch (e1) {
            return def || "";
        }
    }

    function _getObjectIdConsts() {
        return {
            arc: (typeof eArcObject !== "undefined") ? eArcObject : null,
            pad: (typeof ePadObject !== "undefined") ? ePadObject : null,
            via: (typeof eViaObject !== "undefined") ? eViaObject : null,
            track: (typeof eTrackObject !== "undefined") ? eTrackObject : null,
            text: (typeof eTextObject !== "undefined") ? eTextObject : null,
            fill: (typeof eFillObject !== "undefined") ? eFillObject : null,
            connection: (typeof eConnectionObject !== "undefined") ? eConnectionObject : null,
            net: (typeof eNetObject !== "undefined") ? eNetObject : null,
            component: (typeof eComponentObject !== "undefined") ? eComponentObject : null,
            poly: (typeof ePolyObject !== "undefined") ? ePolyObject : null,
            region: (typeof eRegionObject !== "undefined") ? eRegionObject : null,
            splitPlane: (typeof eSplitPlaneObject !== "undefined") ? eSplitPlaneObject : null,
            componentBody: (typeof eComponentBodyObject !== "undefined") ? eComponentBodyObject : null,
            dimension: (typeof eDimensionObject !== "undefined") ? eDimensionObject : null,
            coordinate: (typeof eCoordinateObject !== "undefined") ? eCoordinateObject : null,
            classObj: (typeof eClassObject !== "undefined") ? eClassObject : null,
            rule: (typeof eRuleObject !== "undefined") ? eRuleObject : null,
            fromTo: (typeof eFromToObject !== "undefined") ? eFromToObject : null,
            diffPair: (typeof eDifferentialPairObject !== "undefined") ? eDifferentialPairObject : null,
            violation: (typeof eViolationObject !== "undefined") ? eViolationObject : null,
            embedded: (typeof eEmbeddedObject !== "undefined") ? eEmbeddedObject : null,
            embeddedBoard: (typeof eEmbeddedBoardObject !== "undefined") ? eEmbeddedBoardObject : null,
            trace: (typeof eTraceObject !== "undefined") ? eTraceObject : null,
            spareVia: (typeof eSpareViaObject !== "undefined") ? eSpareViaObject : null,
            board: (typeof eBoardObject !== "undefined") ? eBoardObject : null,
            boardOutline: (typeof eBoardOutlineObject !== "undefined") ? eBoardOutlineObject : null
        };
    }

    var specAllFormat = "spec-0.1all";

    var propValNum = 1;
    var propValBool = 2;
    var propValStr = 3;
    var propValLayer = 4;
    var propValNet = 5;

    var IPCB_INTERFACE_PROPS = {
        "IPCB_Arc": ["EndAngle","EndX","EndY","LineWidth","Radius","StartAngle","StartX","StartY","XCenter","YCenter"],
        "IPCB_Board": ["AutomaticSplitPlanes","BigVisibleGridSize","BigVisibleGridUnit","BoardOutline","ComponentGridSize","ComponentGridSizeX","ComponentGridSizeY","CurrentLayer","DisplayUnit","DrawDotGrid","DrillLayersPairsCount","ECOOptions","FileName","GerberOptions","InternalPlane1NetName","InternalPlane2NetName","InternalPlane3NetName","InternalPlane4NetName","InternalPlaneNetName","LayerColor","LayerIsDisplayed","LayerIsUsed","LayerPair","LayerStack","MechanicalPairs","OutputOptions","PCBSheet","PCBWindow","PlacerOptions","PrimitiveCounter","PrinterOptions","SelectecObject","SelectecObjectCount","SnapGridSize","SnapGridSizeX","SnapGridSizeY","SnapGridUnit","TrackGridSize","ViaGridSize","VisibleGridSize","VisibleGridUnit","XCursor","XOrigin","YCursor","YOrigin"],
        "IPCB_BoardOutline": [],
        "IPCB_Component": ["ChannelOffset","Comment","CommentAutoPosition","CommentOn","ComponentKind","DefaultPCB3DModel","EnablePartSwapping","EnablePinSwapping","FootprintDescription","GroupNum","Height","IsBGA","LockStrings","Name","NameAutoPosition","NameOn","Pattern","Rotation","SourceComponentLibrary","SourceDescription","SourceDesignator","SourceFootprintLibrary","SourceHierarchicalPath","SourceLibReference","SourceUniqueId","UnionIndex"],
        "IPCB_ComponentBody": ["BodyProjection","OverallHeight","StandoffHeight"],
        "IPCB_Connection": ["Layer1","Layer2","Mode","X1","X2","Y1","Y2"],
        "IPCB_Contour": ["CX","CY","Count","Points","Rotation"],
        "IPCB_ContourMaker": [],
        "IPCB_ContourPoint": ["X","Y"],
        "IPCB_Coordinate": ["LineWidth","Rotation","Size","Style","TextFont","TextHeight","TextWidth"],
        "IPCB_Embedded": ["Description","Name"],
        "IPCB_FromTo": ["FromPad","NetName","ToPad"],
        "IPCB_Group": ["LayerUsed","PrimitiveLock","X","Y"],
        "IPCB_LettersCache": [],
        "IPCB_LibComponent": ["Description","Height","Name"],
        "IPCB_Library": ["Board","CurrentComponent"],
        "IPCB_Net": ["Color","ConnectivelyInvalid","ConnectsVisible","DifferentialPair","InDifferentialPair","IsHighlighted","LiveHighlightMode","LoopRemoval","Name","PadByName","PadByPinDescription","PinCount","RoutedLength","ViaCount"],
        "IPCB_ObjectClass": ["MemberKind","MemberName","Name","SuperClass"],
        "IPCB_Pad": ["BotShape","BotXSize","BotYSize","Cache","DrillType","HoleRotation","HoleSize","HoleType","HoleWidth","IsConnectedToPlane","MidShape","MidXSize","MidYSize","Mode","Name","OwnerPart_ID","PinDescriptor","Plated","Rotation","ShapeOnLayer","StackShapeOnLayer","SwapID_Gate","SwapID_Pad","SwappedPadName","TopShape","TopXSize","TopYSize","Width","WidthOnLayer","X","XPadOffset","XSizeOnLayer","XStackSizeOnLayer","Y","YPadOffset","YSizeOnLayer","YStackSizeOnLayer"],
        "IPCB_Pad2": ["CRPercentage","CornerRadius","StackCRPctOnLayer"],
        "IPCB_Polygon": ["ArcApproximation","BorderWidth","Grid","IslandAreaThreshold","Layer","MinTrack","NeckWidthThreshold","PolygonType","PourOver","RemoveDead","RemoveIslandsByArea","RemoveNarrowNecks","TrackSize"],
        "IPCB_Primitive": ["AllowGlobalEdit","Board","Component","Coordinate","DRCError","Dimension","EnableDraw","Enabled","Enabled_Direct","Enabled_vComponent","Handle","IsEmbeddedBoard","IsEmbeddedComponent","IsEmbeddedComponentBody","IsEmbeddedComponentRegion","IsPolygon","IsPolyLine","IsRegion","IsText","Layer","Locked","Mirror","Mode","Net","ObjectId","ObjectKind","ObjectKindString","ObjectKindString_vComponent","ObjectLayer","ObjectLayerString","ObjectKindString_vComponent","ObjectKindString","OwnerComponent","OwnerPart","OwnerPart_ID","PrimitiveObjectId","PrimitiveObjectIdString","PrimitiveObjectIDString","PrimitiveType","PrimitiveTypeString","PrimitiveTypeString_vComponent","Selectable","SelectionState","StreamVersion","StreamVersion2","UnderlyingLayer","V6_LayerID","V7_LayerID"],
        "IPCB_RectangularPrimitive": ["Rotation","X1Location","X2Location","XLocation","Y1Location","Y2Location","YLocation"],
        "IPCB_Region": ["Area","Contour","ContourString","IsRectangle","Outline","OutlineString"],
        "IPCB_Sheet": ["DocumentName","DocumentPath","DocumentReference","Filename","Locked","Name","OwnerFileName"],
        "IPCB_SpecialStringConverter": [],
        "IPCB_TTFontData": ["Bold","CanEmbed","Charset","EmbeddedFontHandle","FontFaceName","FontFullName","FontStyleName","Italic","RefCount"],
        "IPCB_Text": ["AutoPosition","Bold","BottomJustified","CanShrink","CharHeight","CharWidth","FontName","FontNameAndStyle","FontNameAndStyleInDesignator","FontNameAndStyleInText","FontNameInDesignator","FontNameInText","FontStyleName","FontStyleNameInDesignator","FontStyleNameInText","FontType","Inverted","InvertedTTTextBorder","IsDesignator","IsName","IsPolyObject","IsRotatable","IsSpecialString","IsText","IsTrueType","IsVisible","IsVisibleInView","IsVisibleInView2","IsVisibleInView3","IsVisibleInView4","IsVisibleInView5","IsVisibleInView6","IsVisibleInView7","IsVisibleInView8","IsVisibleInView9","IsVisibleInView10","IsVisibleInView11","IsVisibleInView12","IsVisibleInView13","IsVisibleInView14","IsVisibleInView15","IsVisibleInView16","IsVisibleInView17","IsVisibleInView18","IsVisibleInView19","IsVisibleInView20","IsVisibleInView21","IsVisibleInView22","IsVisibleInView23","IsVisibleInView24","IsVisibleInView25","IsVisibleInView26","IsVisibleInView27","IsVisibleInView28","IsVisibleInView29","IsVisibleInView30","Italic","LeftJustified","LineWidth","Mirror","MirrorY","ObjectId","ObjectKind","ParentIsComposite","RightJustified","Rotation","ShearAngle","SpecialString","String","Text","TextKind","TextStyle","TopJustified","UseTTFonts","UseTTFontsInDesignator","UseTTFontsInText","XLocation","YLocation"],
        "IPCB_Track": ["Width","X1","X2","Y1","Y2"],
        "IPCB_Via": ["HoleSize","LowLayer","HighLayer","Size","SizeOnLayer","Shape","ShapeOnLayer","Style","X","Y"],
        "IPCB_Violation": ["Area","AreaString","ErrorKind","InDB","LocationX","LocationY","PositionX","PositionY","RuleName","RuleId","RuleKind","RuleKindString","State","Text","X1","X2","Y1","Y2"]
    };

    var OBJECT_INTERFACE_MAP = {
        "Track": ["IPCB_Primitive","IPCB_Track"],
        "Arc": ["IPCB_Primitive","IPCB_Arc"],
        "Via": ["IPCB_Primitive","IPCB_Via"],
        "Pad": ["IPCB_Primitive","IPCB_Pad","IPCB_Pad2"],
        "Polygon": ["IPCB_Primitive","IPCB_Group","IPCB_Polygon"],
        "BoardOutline": ["IPCB_Primitive","IPCB_Group","IPCB_BoardOutline"],
        "Fill": ["IPCB_Primitive","IPCB_RectangularPrimitive"],
        "Region": ["IPCB_Primitive","IPCB_Group","IPCB_Region"],
        "Text": ["IPCB_Primitive","IPCB_Text"],
        "Component": ["IPCB_Primitive","IPCB_Component"],
        "ComponentBody": ["IPCB_Primitive","IPCB_ComponentBody"],
        "Connection": ["IPCB_Primitive","IPCB_Connection"],
        "Coordinate": ["IPCB_Primitive","IPCB_Coordinate"],
        "Dimension": ["IPCB_Primitive","IPCB_Coordinate"],
        "Net": ["IPCB_Group","IPCB_Net"],
        "Class": ["IPCB_ObjectClass"],
        "Rule": [],
        "DifferentialPair": [],
        "FromTo": ["IPCB_FromTo"],
        "Violation": ["IPCB_Violation"],
        "Embedded": ["IPCB_Primitive","IPCB_Embedded"],
        "EmbeddedBoard": ["IPCB_Primitive","IPCB_Embedded"],
        "Board": ["IPCB_Board"],
        "Trace": ["IPCB_Primitive","IPCB_Track"],
        "SpareVia": ["IPCB_Primitive","IPCB_Via"],
        "SplitPlane": ["IPCB_Primitive","IPCB_Group","IPCB_Polygon"],
        "SplitPlaneRegion": ["IPCB_Primitive","IPCB_Group","IPCB_Region"]
    };

    var OBJECT_PROP_DYNAMIC = {
        "Rule": true,
        "DifferentialPair": true
    };
    var OBJECT_PROP_LIST_CACHE = {};

    function _getObjectPropList(objectIdString) {
        if (!objectIdString) return null;
        if (OBJECT_PROP_LIST_CACHE.hasOwnProperty(objectIdString)) return OBJECT_PROP_LIST_CACHE[objectIdString];
        var ifaces = OBJECT_INTERFACE_MAP[objectIdString];
        if (!ifaces || !ifaces.length) return null;
        var list = [];
        var seen = {};
        var i;
        for (i = 0; i < ifaces.length; i++) {
            var iface = ifaces[i];
            var props = IPCB_INTERFACE_PROPS[iface];
            if (!props || !props.length) continue;
            var j;
            for (j = 0; j < props.length; j++) {
                var p = props[j];
                if (!seen[p]) {
                    seen[p] = 1;
                    list.push(p);
                }
            }
        }
        OBJECT_PROP_LIST_CACHE[objectIdString] = list;
        return list;
    }

    function _isLayeredPropName(propName) {
        if (!propName) return false;
        if (propName.indexOf("OnLayer") >= 0) return true;
        if (propName.indexOf("OnPlane") >= 0) return true;
        return false;
    }

    var __adRunControl = {
        activeId: 0,
        stopRequested: false,
        stopReason: "",
        stopSource: "",
        abortLogged: 0,
        label: ""
    };

    function _ensureRunControl() {
        if (!__adRunControl || typeof __adRunControl !== "object") {
            __adRunControl = {
                activeId: 0,
                stopRequested: false,
                stopReason: "",
                stopSource: "",
                abortLogged: 0,
                label: ""
            };
        }
        return __adRunControl;
    }

    function _beginAdRun(label) {
        var rc = _ensureRunControl();
        rc.activeId = rc.activeId + 1;
        rc.stopRequested = false;
        rc.stopReason = "";
        rc.stopSource = "";
        rc.abortLogged = 0;
        rc.label = label || "";
        try { uiInfo("RUN_BEGIN", { runId: rc.activeId, label: rc.label }, "global-events.js", "_beginAdRun"); } catch (e0) {}
        return rc.activeId;
    }

    function _endAdRun(runId) {
        var rc = _ensureRunControl();
        if (rc.activeId !== runId) return;
        rc.stopRequested = false;
        rc.stopReason = "";
        rc.stopSource = "";
        rc.abortLogged = 0;
        rc.label = "";
        try { uiInfo("RUN_END", { runId: runId }, "global-events.js", "_endAdRun"); } catch (e0) {}
    }

    function _requestAdStop(reason, source) {
        var rc = _ensureRunControl();
        rc.stopRequested = true;
        if (reason !== null && reason !== undefined) rc.stopReason = String(reason);
        if (source !== null && source !== undefined) rc.stopSource = String(source);
        try {
            uiWarn("RUN_STOP_REQUEST", {
                runId: rc.activeId,
                label: rc.label,
                reason: rc.stopReason,
                source: rc.stopSource
            }, "global-events.js", "_requestAdStop");
        } catch (e1) {}
        return true;
    }

    function _shouldAdStop(runId, stage) {
        var rc = _ensureRunControl();
        if (!runId) return false;
        if (rc.activeId !== runId) return false;
        if (!rc.stopRequested) return false;
        if (rc.abortLogged !== runId) {
            rc.abortLogged = runId;
            try {
                uiWarn("RUN_ABORTED", {
                    runId: runId,
                    stage: stage || "",
                    reason: rc.stopReason,
                    source: rc.stopSource
                }, "global-events.js", "_shouldAdStop");
            } catch (e2) {}
        }
        return true;
    }

    function _processMessagesSafe() {
        try {
            if (typeof Application !== "undefined" && Application && Application.ProcessMessages) {
                Application.ProcessMessages();
                return true;
            }
        } catch (e1) {}
        try {
            if (typeof ProcessMessages !== "undefined") {
                ProcessMessages();
                return true;
            }
        } catch (e2) {}
        return false;
    }

    function 请求停止_当前任务(reason, source) {
        return _requestAdStop(reason || "manual", source || "user");
    }

    function 请求停止_一键验证(reason, source) {
        return _requestAdStop(reason || "manual", source || "user");
    }

    function _getCompactTableDefs(ids, format) {
        var defs = [];
        var useAll = (format === specAllFormat);
        function add(name, objectId, fields, fieldTypes) {
            defs.push({
                tableId: defs.length + 1,
                name: name,
                objectId: objectId,
                fields: fields,
                fieldTypes: fieldTypes
            });
        }

        add("track", ids.track, ["x1","y1","x2","y2","width","layerId","netId"], ["n","n","n","n","n","layerId","netId"]);
        add("arc", ids.arc, ["centerX","centerY","radius","startAngle","endAngle","lineWidth","layerId","netId"], ["n","n","n","n","n","n","layerId","netId"]);
        add("via", ids.via, ["x","y","lowLayerId","highLayerId","holeSize","netId"], ["n","n","layerId","layerId","n","netId"]);
        add("via.layer", ids.via, ["viaId","layerId","shape","size"], ["ref","layerId","e","n"]);
        add("pad", ids.pad, ["x","y","rotation","mode","plated","holeSize","drillType","holeType","holeWidth","holeRotation","netId","ownerPartId","nameId"], ["n","n","n","e","b","n","e","e","n","n","netId","n","s"]);
        add("pad.layer", ids.pad, ["padId","layerId","shape","xSize","ySize","offsetX","offsetY","cornerRadiusPct"], ["ref","layerId","e","n","n","n","n","n"]);
        add("polygon", ids.poly, ["layerId","netId","polygonType","pourOver","grid","trackSize","minTrack","borderWidth","removeDead","removeIslandsByArea","islandAreaThreshold","removeNarrowNecks","neckWidthThreshold","arcApprox"], ["layerId","netId","e","e","n","n","n","n","b","b","n","b","n","n"]);
        add("polygon.seg.track", ids.poly, ["polyId","x1","y1","x2","y2","width"], ["ref","n","n","n","n","n"]);
        add("polygon.seg.arc", ids.poly, ["polyId","centerX","centerY","radius","startAngle","endAngle","lineWidth"], ["ref","n","n","n","n","n","n"]);
        add("board.outline", ids.boardOutline, ["outlineId"], ["ref"]);
        add("board.outline.seg.track", ids.boardOutline, ["outlineId","x1","y1","x2","y2","width"], ["ref","n","n","n","n","n"]);
        add("board.outline.seg.arc", ids.boardOutline, ["outlineId","centerX","centerY","radius","startAngle","endAngle","lineWidth"], ["ref","n","n","n","n","n","n"]);
        add("fill", ids.fill, ["x1","y1","x2","y2","rotation","layerId","netId"], ["n","n","n","n","n","layerId","netId"]);
        add("region", ids.region, ["layerId","netId"], ["layerId","netId"]);
        add("region.seg.track", ids.region, ["regionId","x1","y1","x2","y2","width"], ["ref","n","n","n","n","n"]);
        add("region.seg.arc", ids.region, ["regionId","centerX","centerY","radius","startAngle","endAngle","lineWidth"], ["ref","n","n","n","n","n","n"]);
        add("splitplane", ids.splitPlane, ["layerId","netId"], ["layerId","netId"]);
        add("splitplane.seg.track", ids.splitPlane, ["planeId","x1","y1","x2","y2","width"], ["ref","n","n","n","n","n"]);
        add("splitplane.seg.arc", ids.splitPlane, ["planeId","centerX","centerY","radius","startAngle","endAngle","lineWidth"], ["ref","n","n","n","n","n","n"]);
        add("text", ids.text, ["x","y","layerId","rotation","height","width","strokeWidth","textId","fontId","inverted","mirrored"], ["n","n","layerId","n","n","n","n","s","s","b","b"]);
        add("component", ids.component, ["x","y","layerId","rotation","designatorId","commentId","patternId","sourceLibId","locked"], ["n","n","layerId","n","s","s","s","s","b"]);
        add("component.body", ids.componentBody, ["componentId","layerId","x1","y1","x2","y2","bodyType"], ["ref","layerId","n","n","n","n","e"]);
        add("net", ids.net, ["nameId"], ["s"]);
        add("class", ids.classObj, ["classKind","nameId"], ["e","s"]);
        add("rule", ids.rule, ["ruleKind","nameId","enabled"], ["e","s","b"]);
        add("diffpair", ids.diffPair, ["nameId","netPId","netNId"], ["s","ref","ref"]);
        add("fromto", ids.fromTo, ["netId","fromPadId","toPadId"], ["ref","ref","ref"]);
        add("coordinate", ids.coordinate, ["x","y","layerId"], ["n","n","layerId"]);
        add("dimension", ids.dimension, ["dimType","x1","y1","x2","y2","textId"], ["e","n","n","n","n","s"]);
        add("violation", ids.violation, ["ruleId","objAId","objBId","x","y"], ["ref","ref","ref","n","n"]);
        add("connection", ids.connection, ["x1","y1","x2","y2","layerId","netId"], ["n","n","n","n","layerId","netId"]);
        add("embedded", ids.embedded, ["nameId","x","y","rotation","scaleX","scaleY"], ["s","n","n","n","n","n"]);
        add("embedded.board", ids.embeddedBoard, ["nameId","x","y","rotation","scaleX","scaleY"], ["s","n","n","n","n","n"]);
        add("board", ids.board, ["nameId","originX","originY"], ["s","n","n"]);
        add("trace", ids.trace, ["x1","y1","x2","y2","width","layerId","netId"], ["n","n","n","n","n","layerId","netId"]);
        add("sparevia", ids.spareVia, ["x","y","lowLayerId","highLayerId","holeSize","netId"], ["n","n","layerId","layerId","n","netId"]);
        if (useAll) {
            add("prop", null, ["objectId","rowId","propId","valueType","valueNum","valueStrId","layerId"], ["e","ref","s","e","n","s","layerId"]);
        }
        return defs;
    }

    function _initTableMap(defs) {
        var map = {};
        var list = [];
        var i;
        for (i = 0; i < defs.length; i++) {
            var def = defs[i];
            var t = {
                tableId: def.tableId,
                name: def.name,
                objectId: def.objectId,
                fields: def.fields,
                fieldTypes: def.fieldTypes,
                rows: []
            };
            map[def.name] = t;
            list.push(t);
        }
        return { map: map, list: list };
    }

    function _getStringBank(banks, bankId) {
        var key = String(bankId);
        if (!banks[key]) {
            banks[key] = { bankId: key, list: [], map: {} };
        }
        return banks[key];
    }

    function _addStringToBank(banks, bankId, value) {
        if (value === null || value === undefined) return 0;
        var str = "";
        try {
            str = String(value);
        } catch (e1) {
            return 0;
        }
        if (!str) return 0;
        var bank = _getStringBank(banks, bankId);
        if (bank.map.hasOwnProperty(str)) {
            return bank.map[str];
        }
        var id = bank.list.length + 1;
        bank.list.push(str);
        bank.map[str] = id;
        return id;
    }

    function _createBoardIterator(board, objectIds) {
        if (!board || typeof board.BoardIterator_Create === "undefined") return null;
        var it = null;
        try { it = board.BoardIterator_Create(); } catch (e1) { it = null; }
        if (!it) return null;

        try {
            if (objectIds && objectIds.length && typeof MkSet === "function" && typeof it.AddFilter_ObjectSet !== "undefined") {
                var list = [];
                var i;
                for (i = 0; i < objectIds.length; i++) {
                    var oid = objectIds[i];
                    if (oid !== null && oid !== undefined) list.push(oid);
                }
                if (list.length) it.AddFilter_ObjectSet(MkSet.apply(null, list));
            }
            if (typeof it.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                it.AddFilter_LayerSet(AllLayers);
            } else if (typeof it.AddFilter_IPCB_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                it.AddFilter_IPCB_LayerSet(AllLayers);
            }
            if (typeof it.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                it.AddFilter_Method(eProcessAll);
            }
        } catch (e2) {}

        function _iterFirst() {
            var p = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    p = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    p = (typeof it.First === "function") ? it.First() : it.First;
                }
            } catch (e3) { p = null; }
            return p || null;
        }

        function _iterNext() {
            var p = null;
            try {
                if (typeof it.NextPCBObject !== "undefined") {
                    p = it.NextPCBObject();
                } else if (typeof it.Next !== "undefined") {
                    p = (typeof it.Next === "function") ? it.Next() : it.Next;
                }
            } catch (e4) { p = null; }
            return p || null;
        }

        function _destroy() {
            try {
                if (typeof board.BoardIterator_Destroy !== "undefined") {
                    board.BoardIterator_Destroy(it);
                }
            } catch (e5) {}
        }

        return { it: it, first: _iterFirst, next: _iterNext, destroy: _destroy };
    }

    function _createGroupIterator(groupObj) {
        if (!groupObj || typeof groupObj.GroupIterator_Create === "undefined") return null;
        var it = null;
        try { it = groupObj.GroupIterator_Create(); } catch (e1) { it = null; }
        if (!it) return null;

        function _iterFirst() {
            var p = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    p = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    p = (typeof it.First === "function") ? it.First() : it.First;
                }
            } catch (e2) { p = null; }
            return p || null;
        }

        function _iterNext() {
            var p = null;
            try {
                if (typeof it.NextPCBObject !== "undefined") {
                    p = it.NextPCBObject();
                } else if (typeof it.Next !== "undefined") {
                    p = (typeof it.Next === "function") ? it.Next() : it.Next;
                }
            } catch (e3) { p = null; }
            return p || null;
        }

        function _destroy() {
            try {
                if (typeof groupObj.GroupIterator_Destroy !== "undefined") {
                    groupObj.GroupIterator_Destroy(it);
                }
            } catch (e4) {}
        }

        return { it: it, first: _iterFirst, next: _iterNext, destroy: _destroy };
    }

    function _readNetName(obj) {
        var name = "";
        try {
            var netObj = _readPropOrCall(obj, "Net", null);
            if (netObj && netObj.Name) name = String(netObj.Name);
        } catch (e1) {}
        if (!name) {
            name = _readStringValue(obj, "NetName", "");
        }
        return name || "";
    }

    function _getNetId(netName, tables, banks, netMap, ids) {
        if (!netName) return 0;
        if (netMap.hasOwnProperty(netName)) return netMap[netName];
        var netTable = tables.map["net"];
        if (!netTable) return 0;
        var bankId = (ids.net !== null && ids.net !== undefined) ? String(ids.net) : "net";
        var nameId = _addStringToBank(banks, bankId, netName);
        var id = netTable.rows.length + 1;
        netTable.rows.push([nameId]);
        netMap[netName] = id;
        return id;
    }

    function _readTextString(obj) {
        var s = _readStringValue(obj, "Text", "");
        if (!s) s = _readStringValue(obj, "TextString", "");
        if (!s) s = _readStringValue(obj, "String", "");
        if (!s) s = _readStringValue(obj, "Value", "");
        return s || "";
    }

    function _readTrackWidth(obj) {
        var w = _readNumber(obj, "Width", null);
        if (w === null || w === undefined) w = _readNumber(obj, "LineWidth", 0);
        return w;
    }

    function _buildDeclInfo(format) {
        if (!format) format = specAllFormat;
        var ids = _getObjectIdConsts();
        var defs = _getCompactTableDefs(ids, format);
        var tables = _initTableMap(defs);
        var i;
        var hashBase = String(format) + "|";
        for (i = 0; i < defs.length; i++) {
            var d = defs[i];
            hashBase += d.name + "|" + String(d.objectId) + "|" + d.fields.join(",") + "|";
        }
        var declHash = _hashDjb2(hashBase);
        var declId = "decl-" + declHash;
        var stringBanks = [];
        stringBanks.push({ bankId: "layer", objectId: null, note: "layer names" });
        if (ids.net !== null && ids.net !== undefined) stringBanks.push({ bankId: String(ids.net), objectId: ids.net, note: "net strings" });
        if (ids.text !== null && ids.text !== undefined) stringBanks.push({ bankId: String(ids.text), objectId: ids.text, note: "text strings" });
        if (ids.dimension !== null && ids.dimension !== undefined) stringBanks.push({ bankId: String(ids.dimension), objectId: ids.dimension, note: "dimension strings" });
        if (ids.component !== null && ids.component !== undefined) stringBanks.push({ bankId: String(ids.component), objectId: ids.component, note: "component strings" });
        if (ids.pad !== null && ids.pad !== undefined) stringBanks.push({ bankId: String(ids.pad), objectId: ids.pad, note: "pad strings" });
        if (ids.classObj !== null && ids.classObj !== undefined) stringBanks.push({ bankId: String(ids.classObj), objectId: ids.classObj, note: "class strings" });
        if (ids.rule !== null && ids.rule !== undefined) stringBanks.push({ bankId: String(ids.rule), objectId: ids.rule, note: "rule strings" });
        if (ids.diffPair !== null && ids.diffPair !== undefined) stringBanks.push({ bankId: String(ids.diffPair), objectId: ids.diffPair, note: "diffpair strings" });
        if (ids.embedded !== null && ids.embedded !== undefined) stringBanks.push({ bankId: String(ids.embedded), objectId: ids.embedded, note: "embedded strings" });
        if (ids.embeddedBoard !== null && ids.embeddedBoard !== undefined) stringBanks.push({ bankId: String(ids.embeddedBoard), objectId: ids.embeddedBoard, note: "embedded board strings" });
        if (ids.board !== null && ids.board !== undefined) stringBanks.push({ bankId: String(ids.board), objectId: ids.board, note: "board strings" });
        if (format === specAllFormat) {
            stringBanks.push({ bankId: "prop.name", objectId: null, note: "property names" });
            stringBanks.push({ bankId: "prop.value", objectId: null, note: "property values" });
        }
        return {
            format: format,
            declId: declId,
            declHash: declHash,
            rowIdMode: "implicit-1",
            ids: ids,
            defs: defs,
            tables: tables,
            stringBanks: stringBanks,
            isAll: (format === specAllFormat)
        };
    }

    function _buildLayerStackInfo(board, banks) {
        var res = {
            ok: false,
            error: "",
            fields: ["layerId","nameId","stackIndex","flags"],
            layers: [],
            layerIds: [],
            layerIndexMap: {},
            signalLayerIds: [],
            stackSig: ""
        };
        if (!board) {
            res.error = "board missing";
            return res;
        }

        function _resolveStack(boardRef) {
            if (boardRef && boardRef.LayerStack) return boardRef.LayerStack;
            if (boardRef && boardRef.LayerStack_V7) return boardRef.LayerStack_V7;
            return null;
        }

        function _callStackFirst(stack, layerClass) {
            if (!stack) return null;
            var obj = null;
            try {
                if (stack.FirstLayer !== undefined) {
                    obj = (typeof stack.FirstLayer === "function" || typeof stack.FirstLayer === "unknown") ? stack.FirstLayer() : stack.FirstLayer;
                    return obj || null;
                }
                if (stack.First !== undefined) {
                    if (typeof stack.First === "function" || typeof stack.First === "unknown") {
                        obj = (layerClass !== null && layerClass !== undefined) ? stack.First(layerClass) : stack.First();
                    } else {
                        obj = stack.First;
                    }
                    return obj || null;
                }
            } catch (e1) {}
            return null;
        }

        function _callStackNext(stack, layerClass, refLayer) {
            if (!stack) return null;
            var obj = null;
            try {
                if (stack.NextLayer !== undefined) {
                    obj = (typeof stack.NextLayer === "function" || typeof stack.NextLayer === "unknown") ? stack.NextLayer(refLayer) : stack.NextLayer;
                    return obj || null;
                }
                if (stack.Next !== undefined) {
                    if (typeof stack.Next === "function" || typeof stack.Next === "unknown") {
                        obj = (layerClass !== null && layerClass !== undefined) ? stack.Next(layerClass, refLayer) : stack.Next(refLayer);
                    } else {
                        obj = stack.Next;
                    }
                    return obj || null;
                }
            } catch (e2) {}
            return null;
        }

        var stack = _resolveStack(board);
        if (!stack) {
            res.error = "LayerStack not available";
            return res;
        }

        var layerClassAll = (typeof eLayerClass_All !== "undefined") ? eLayerClass_All :
            ((typeof eLayerClass_Physical !== "undefined") ? eLayerClass_Physical : null);
        var layerClassSignal = (typeof eLayerClass_Signal !== "undefined") ? eLayerClass_Signal : null;

        var signalSet = {};
        if (layerClassSignal !== null) {
            var sLayer = _callStackFirst(stack, layerClassSignal);
            while (sLayer) {
                var sid = null;
                try { sid = sLayer.LayerID; } catch (eS1) {}
                if (sid !== null && sid !== undefined) {
                    signalSet[String(sid)] = true;
                    res.signalLayerIds.push(sid);
                }
                sLayer = _callStackNext(stack, layerClassSignal, sLayer);
            }
        }

        var layerObj = _callStackFirst(stack, layerClassAll);
        var idx = 0;
        while (layerObj) {
            var layerId = null;
            var layerName = "";
            try { layerId = layerObj.LayerID; } catch (e1) {}
            try { layerName = String(layerObj.Name || ""); } catch (e2) {}
            if (layerId !== null && layerId !== undefined) {
                var flags = 0;
                if (signalSet[String(layerId)]) flags = flags | 1;
                var nameId = _addStringToBank(banks, "layer", layerName);
                res.layers.push([layerId, nameId, idx, flags]);
                res.layerIds.push(layerId);
                res.layerIndexMap[String(layerId)] = idx;
                idx++;
            }
            layerObj = _callStackNext(stack, layerClassAll, layerObj);
        }

        if (res.layers.length === 0 && typeof StackMap !== "undefined" && StackMap && StackMap.getAllNormalizedLayers) {
            var names = StackMap.getAllNormalizedLayers();
            var i;
            for (i = 0; i < names.length; i++) {
                var nm = names[i];
                var id = StackMap.getLayerId(nm);
                var nId = _addStringToBank(banks, "layer", nm);
                res.layers.push([id, nId, i, 0]);
                res.layerIds.push(id);
                res.layerIndexMap[String(id)] = i;
            }
        }

        var sigText = "";
        var j;
        for (j = 0; j < res.layers.length; j++) {
            var row = res.layers[j];
            sigText += String(row[0]) + ":" + String(row[1]) + ":" + String(row[2]) + ":" + String(row[3]) + ";";
        }
        res.stackSig = _hashDjb2(sigText);
        res.ok = true;
        return res;
    }

    function _collectCompactData(board, declInfo, layerInfo, banks, options) {
        var res = {
            ok: false,
            error: "",
            aborted: false,
            abortReason: "",
            tables: declInfo.tables,
            stringBanks: banks,
            stats: {
                total: 0,
                unsupported: 0,
                unsupportedTypes: {},
                tableCounts: {},
                objectCounts: {},
                errors: 0,
                errorSamples: [],
                errorDropped: 0,
                perfSample: 0,
                perfSamples: 0,
                perfTotalMs: 0,
                perfTop: null
            }
        };
        if (!board) {
            res.error = "board missing";
            return res;
        }

        var tables = declInfo.tables;
        var ids = declInfo.ids;
        var netMap = {};
        var compMap = {};
        var classMap = {};
        var ruleMap = {};
        var diffMap = {};
        var fromToMap = {};
        var violationMap = {};
        var padHandleMap = {};
        var boardRowAdded = false;
        var progressStep = (options && options.progressStep) ? options.progressStep : 5000;
        var debug = options && options.debug;
        var abortRequested = false;
        var abortReason = "";
        var shouldAbort = (options && options.shouldAbort) ? options.shouldAbort : null;
        var maxErrors = (options && options.maxErrors) ? options.maxErrors : 0;
        var yieldStep = (options && options.yieldStep) ? options.yieldStep : progressStep;
        var perfSample = 0;
        var perfEnabled = false;
        var perfTypes = {};
        var perfSampleCount = 0;
        var perfTotalMs = 0;
        var perfTopLimit = (options && options.perfTopLimit) ? options.perfTopLimit : 8;
        if (options && options.perfSample !== undefined) perfSample = options.perfSample;
        if (options && options.perfTypes) perfEnabled = true;
        if (perfSample && perfSample > 0) perfEnabled = true;

        function _touchTableCount(name) {
            if (!tables.map[name]) return;
            res.stats.tableCounts[name] = tables.map[name].rows.length;
        }

        function _markUnsupported(key) {
            res.stats.unsupported++;
            if (!res.stats.unsupportedTypes[key]) res.stats.unsupportedTypes[key] = 0;
            res.stats.unsupportedTypes[key]++;
        }

        function _requestAbort(reason) {
            if (abortRequested) return;
            abortRequested = true;
            abortReason = reason || "";
        }

        function _checkAbort(stage) {
            if (abortRequested) return true;
            if (shouldAbort) {
                var stop = false;
                try { stop = shouldAbort(stage, res.stats.total, res.stats.errors); } catch (eStop) { stop = false; }
                if (stop) {
                    _requestAbort(typeof stop === "string" ? stop : "stop.requested");
                    return true;
                }
            }
            return false;
        }

        function _yieldIfNeeded(count) {
            if (!yieldStep) return;
            if (count > 0 && (count % yieldStep === 0)) {
                _processMessagesSafe();
            }
        }

        function _countType(typeKey) {
            if (!typeKey) return;
            if (!res.stats.objectCounts[typeKey]) res.stats.objectCounts[typeKey] = 0;
            res.stats.objectCounts[typeKey]++;
        }

        function _recordPerf(typeKey, startMs) {
            if (!startMs || !typeKey) return;
            var dt = new Date().getTime() - startMs;
            perfSampleCount++;
            perfTotalMs += dt;
            var item = perfTypes[typeKey];
            if (!item) {
                item = { ms: 0, count: 0 };
                perfTypes[typeKey] = item;
            }
            item.ms += dt;
            item.count++;
        }

        function _perfWrap(typeKey, obj, handler) {
            _countType(typeKey);
            var t0 = 0;
            if (perfEnabled && (perfSample <= 1 || (res.stats.total % perfSample === 0))) {
                t0 = new Date().getTime();
            }
            handler(obj);
            _recordPerf(typeKey, t0);
        }

        function _buildPerfTop(map, limit) {
            var arr = [];
            var k;
            for (k in map) {
                if (!map.hasOwnProperty(k)) continue;
                arr.push({ type: k, ms: map[k].ms, count: map[k].count });
            }
            arr.sort(function (a, b) { return b.ms - a.ms; });
            if (limit && arr.length > limit) arr.length = limit;
            var i;
            for (i = 0; i < arr.length; i++) {
                var it = arr[i];
                it.avgMs = (it.count > 0) ? (Math.round((it.ms / it.count) * 100) / 100) : 0;
            }
            return arr;
        }

        var errorBuffer = [];
        var errorBatchSize = (options && options.errorBatchSize) ? options.errorBatchSize : 50;
        var errorMaxBatches = (options && options.errorMaxBatches) ? options.errorMaxBatches : 20;
        var errorBatchesSent = 0;
        var errorVerbose = options && options.errorVerbose;
        var debugLimit = (options && options.debugLimit) ? options.debugLimit : 5;
        var debugCounts = { layerRead: 0, padLayer: 0, viaRange: 0, unsupported: 0, errorSample: 0, errorDetail: 0 };
        var scanStartedAt = new Date().getTime();
        var lastProgressAt = scanStartedAt;
        var lastProgressCount = 0;

        function _flushErrorBuffer(force) {
            if (!options || !options.onErrorBatch) return;
            if (!errorBuffer.length) return;
            if (!force && errorBuffer.length < errorBatchSize) return;
            if (errorBatchesSent >= errorMaxBatches) return;
            try {
                options.onErrorBatch(errorBuffer, errorBatchesSent + 1, !!force);
            } catch (eSend) {}
            errorBatchesSent++;
            errorBuffer = [];
        }

        function _recordError(oid, oidStr, msg) {
            res.stats.errors++;
            if (res.stats.errorSamples.length < 5) {
                res.stats.errorSamples.push({ objectId: oid, objectIdString: oidStr, message: msg });
            }

            if (maxErrors && res.stats.errors >= maxErrors) {
                _requestAbort("error.limit");
            }

            if (errorBatchesSent >= errorMaxBatches) {
                res.stats.errorDropped++;
                return;
            }

            errorBuffer.push({
                index: res.stats.errors,
                objectId: oid,
                objectIdString: oidStr,
                message: msg
            });
            _flushErrorBuffer(false);

            if (errorVerbose && options && options.onErrorBatch) {
                try { uiWarn("COMPACT_ITEM_ERROR", { objectId: oid, objectIdString: oidStr, message: msg }, "global-events.js", "_collectCompactData"); } catch (eWarn) {}
            }
        }

        var propTable = tables.map["prop"];
        var propEnabled = !!propTable;
        var propSeen = {};
        var propNameBankId = "prop.name";
        var propValueBankId = "prop.value";
        var propDynamicLimit = (options && options.propDynamicLimit) ? options.propDynamicLimit : 200;
        var propDebugLimit = (options && options.propDebugLimit) ? options.propDebugLimit : 3;
        var propDebugCount = 0;

        var layerValueProps = {
            Layer: 1, LayerID: 1, LayerId: 1, Layer1: 1, Layer2: 1, LowLayer: 1, HighLayer: 1,
            StartLayer: 1, StopLayer: 1, UnderlyingLayer: 1, ObjectLayer: 1, CurrentLayer: 1
        };

        function _isLayerValuePropName(propName) {
            if (!propName) return false;
            if (layerValueProps[propName]) return true;
            if (propName.indexOf("LayerID") >= 0) return true;
            if (propName.indexOf("LayerId") >= 0) return true;
            if (propName.length > 5 && propName.substr(propName.length - 5) === "Layer") return true;
            if (/Layer\\d+$/.test(propName)) return true;
            return false;
        }

        function _isNetValuePropName(propName) {
            if (!propName) return false;
            return propName.indexOf("Net") >= 0;
        }

        function _readLayerValue(obj, propName, layerId, diagInfo, diagTag) {
            var v = null;
            var err = null;
            if (!obj) return { value: null, error: null };
            try {
                var fn = null;
                try { fn = obj["GetState_" + propName]; } catch (eFn) { err = eFn; fn = null; }
                if (fn !== null && fn !== undefined) {
                    var t = typeof fn;
                    if (t === "function" || t === "unknown") {
                        v = fn.apply(obj, [layerId]);
                    } else {
                        v = fn;
                    }
                } else {
                    var prop = null;
                    try { prop = obj[propName]; } catch (eProp) { err = eProp; prop = null; }
                    if (prop !== null && prop !== undefined) {
                        var t2 = typeof prop;
                        if (t2 === "function" || t2 === "unknown") {
                            v = prop.apply(obj, [layerId]);
                        } else {
                            v = null;
                        }
                    }
                }
            } catch (e1) {
                err = e1;
            }
            if ((v === null || v === undefined) && err && debug && propDebugCount < propDebugLimit) {
                propDebugCount++;
                try {
                    uiDebug("COMPACT_LAYER_PROP_FAIL", {
                        tag: diagTag || "",
                        prop: propName,
                        layerId: layerId,
                        objectId: diagInfo ? diagInfo.oid : null,
                        objectIdString: diagInfo ? diagInfo.oidStr : "",
                        error: (err && err.message) ? String(err.message) : String(err)
                    }, "global-events.js", "_collectCompactData");
                } catch (eLog) {}
            }
            return { value: v, error: err };
        }

        function _normalizePropValue(propName, value, obj, layerId) {
            if (value === null || value === undefined) return null;
            var t = typeof value;
            if (t === "boolean") return { type: propValBool, num: value ? 1 : 0, strId: 0 };
            if (t === "number") {
                if (_isLayerValuePropName(propName)) return { type: propValLayer, num: value, strId: 0 };
                return { type: propValNum, num: value, strId: 0 };
            }
            if (t === "string") {
                if (_isNetValuePropName(propName)) {
                    var netId = _getNetId(value, tables, banks, netMap, ids);
                    return { type: propValNet, num: netId, strId: 0 };
                }
                var strId = _addStringToBank(banks, propValueBankId, value);
                return { type: propValStr, num: 0, strId: strId };
            }

            if (t === "object" || t === "unknown") {
                var lid = _readLayerIdFromObject(value);
                if (lid !== null && lid !== undefined) {
                    return { type: propValLayer, num: lid, strId: 0 };
                }
                if (_isNetValuePropName(propName)) {
                    var netName = "";
                    try {
                        if (value && value.Net && value.Net.Name) netName = String(value.Net.Name);
                    } catch (eNet1) {}
                    if (!netName) {
                        try { if (value && value.Name !== undefined) netName = String(value.Name); } catch (eNet2) {}
                    }
                    if (netName) {
                        var netId2 = _getNetId(netName, tables, banks, netMap, ids);
                        return { type: propValNet, num: netId2, strId: 0 };
                    }
                }
                try {
                    if (value && value.Name !== undefined) {
                        var nameStr = String(value.Name);
                        var nameId = _addStringToBank(banks, propValueBankId, nameStr);
                        return { type: propValStr, num: 0, strId: nameId };
                    }
                } catch (eName) {}
            }

            if (layerId !== null && layerId !== undefined) {
                return { type: propValNum, num: 0, strId: 0 };
            }
            return null;
        }

        function _pushPropRow(objectId, rowId, propName, valueType, valueNum, valueStrId, layerId) {
            if (!propEnabled) return;
            if (!objectId || !rowId) return;
            if (!propName) return;
            var propId = _addStringToBank(banks, propNameBankId, propName);
            if (!propId) return;
            propTable.rows.push([
                objectId,
                rowId,
                propId,
                valueType || 0,
                valueNum || 0,
                valueStrId || 0,
                layerId || 0
            ]);
        }

        function _collectPlainProp(obj, info, rowId, propName) {
            var v = _readPropOrCall(obj, propName, null);
            if (v === null || v === undefined) return;
            var norm = _normalizePropValue(propName, v, obj, null);
            if (!norm) return;
            _pushPropRow(info.oid, rowId, propName, norm.type, norm.num, norm.strId, 0);
        }

        function _dedupeLayerList(list) {
            if (!list || !list.length) return [];
            var out = [];
            var seen = {};
            var i;
            for (i = 0; i < list.length; i++) {
                var lid = list[i];
                if (lid === null || lid === undefined) continue;
                var key = String(lid);
                if (seen[key]) continue;
                seen[key] = 1;
                out.push(lid);
            }
            return out;
        }

        function _getPadCandidateLayers(obj) {
            if (!layerInfo) return [];
            var layerId = _readNumber(obj, "Layer", null);
            var topLayer = (typeof eTopLayer !== "undefined") ? eTopLayer : null;
            var bottomLayer = (typeof eBottomLayer !== "undefined") ? eBottomLayer : null;
            var multiLayer = (typeof eMultiLayer !== "undefined") ? eMultiLayer : null;
            var mode = _readNumber(obj, "Mode", 0);
            var modeSimple = (typeof ePadMode_Simple !== "undefined" && mode === ePadMode_Simple);
            var modeLocal = (typeof ePadMode_LocalStack !== "undefined" && mode === ePadMode_LocalStack);
            var modeExternal = (typeof ePadMode_ExternalStack !== "undefined" && mode === ePadMode_ExternalStack);
            var list = [];
            if (modeSimple) {
                if (layerId === null || layerId === undefined || (multiLayer !== null && layerId === multiLayer)) {
                    if (topLayer !== null) list.push(topLayer);
                    else if (bottomLayer !== null) list.push(bottomLayer);
                    else if (layerInfo.layerIds && layerInfo.layerIds.length) list.push(layerInfo.layerIds[0]);
                } else {
                    list.push(layerId);
                }
            } else if (modeLocal) {
                var listAll = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
                var mid = null;
                var j;
                for (j = 0; j < listAll.length; j++) {
                    var lid = listAll[j];
                    if (lid !== topLayer && lid !== bottomLayer && lid !== multiLayer) {
                        mid = lid;
                        break;
                    }
                }
                if (topLayer !== null) list.push(topLayer);
                if (mid !== null) list.push(mid);
                if (bottomLayer !== null) list.push(bottomLayer);
            } else if (modeExternal) {
                list = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
            } else {
                list = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
            }
            return _dedupeLayerList(list);
        }

        function _collectLayeredProp(obj, info, rowId, propName) {
            if (!layerInfo) return;
            var list = null;
            if (info && info.oidStr === "Pad") {
                list = _getPadCandidateLayers(obj);
            }
            if (!list || !list.length) {
                list = layerInfo.layerIds && layerInfo.layerIds.length ? layerInfo.layerIds : [];
            }
            var i;
            for (i = 0; i < list.length; i++) {
                var lid = list[i];
                var resVal = _readLayerValue(obj, propName, lid, info, "prop.layer");
                if (resVal.value === null || resVal.value === undefined) continue;
                var norm = _normalizePropValue(propName, resVal.value, obj, lid);
                if (!norm) continue;
                _pushPropRow(info.oid, rowId, propName, norm.type, norm.num, norm.strId, lid);
            }
        }

        function _collectDynamicProps(obj, info, rowId) {
            if (!obj) return;
            var count = 0;
            var k;
            for (k in obj) {
                if (!k) continue;
                if (k.indexOf("GetState_") === 0) continue;
                if (k.indexOf("SetState_") === 0) continue;
                if (k.indexOf("_") === 0) continue;
                _collectPlainProp(obj, info, rowId, k);
                count++;
                if (count >= propDynamicLimit) break;
            }
        }

        function _addExtraProps(obj, info, rowId) {
            if (!propEnabled) return;
            if (!obj || !rowId) return;
            if (!info) info = _readObjectIdInfo(obj);
            if (!info || !info.oid) return;
            var key = String(info.oid) + "|" + String(rowId);
            if (propSeen[key]) return;
            propSeen[key] = true;
            var list = _getObjectPropList(info.oidStr);
            if (list && list.length) {
                var i;
                for (i = 0; i < list.length; i++) {
                    var propName = list[i];
                    if (_isLayeredPropName(propName)) {
                        _collectLayeredProp(obj, info, rowId, propName);
                    } else {
                        _collectPlainProp(obj, info, rowId, propName);
                    }
                }
            }
            if (OBJECT_PROP_DYNAMIC[info.oidStr]) {
                _collectDynamicProps(obj, info, rowId);
            }
        }

        function _readCoord(obj, prop1, prop2) {
            var v = _readNumber(obj, prop1, null);
            if (v === null || v === undefined) v = _readNumber(obj, prop2, 0);
            return v;
        }

        function _readLayerNumber(obj, propName, def, layerId, diagInfo, diagTag) {
            var v = null;
            var err = null;
            if (!obj) return def;
            try {
                var fn = null;
                try {
                    fn = obj["GetState_" + propName];
                } catch (eFn) {
                    err = eFn;
                    fn = null;
                }
                if (fn !== null && fn !== undefined) {
                    var t = typeof fn;
                    if (t === "function" || t === "unknown") {
                        v = fn.apply(obj, [layerId]);
                    } else {
                        v = fn;
                    }
                } else {
                    var prop = null;
                    try {
                        prop = obj[propName];
                    } catch (eProp) {
                        err = eProp;
                        prop = null;
                    }
                    if (prop !== null && prop !== undefined) {
                        var t2 = typeof prop;
                        if (t2 === "function" || t2 === "unknown") {
                            v = prop.apply(obj, [layerId]);
                        } else {
                            v = null;
                        }
                    }
                }
            } catch (e1) {
                err = e1;
            }
            if (v === null || v === undefined || v === "") {
                if (err && debug && debugCounts.layerRead < debugLimit) {
                    debugCounts.layerRead++;
                    try {
                        uiDebug("COMPACT_LAYER_READ_FAIL", {
                            tag: diagTag || "",
                            prop: propName,
                            layerId: layerId,
                            layerType: typeof layerId,
                            objectId: diagInfo ? diagInfo.oid : null,
                            objectIdString: diagInfo ? diagInfo.oidStr : "",
                            error: (err && err.message) ? String(err.message) : String(err)
                        }, "global-events.js", "_collectCompactData");
                    } catch (eLog1) {}
                }
                return def;
            }
            var n = def;
            try {
                n = Number(v);
            } catch (e3) {
                err = err || e3;
                n = def;
            }
            if (isNaN(n)) {
                if (!err) err = "nan";
                n = def;
            }
            if (err && debug && debugCounts.layerRead < debugLimit) {
                debugCounts.layerRead++;
                try {
                    uiDebug("COMPACT_LAYER_READ_FAIL", {
                        tag: diagTag || "",
                        prop: propName,
                        layerId: layerId,
                        layerType: typeof layerId,
                        objectId: diagInfo ? diagInfo.oid : null,
                        objectIdString: diagInfo ? diagInfo.oidStr : "",
                        error: (err && err.message) ? String(err.message) : String(err)
                    }, "global-events.js", "_collectCompactData");
                } catch (eLog2) {}
            }
            return n;
        }

        function _hasLayerGetter(obj, propName) {
            if (!obj) return false;
            var fn = null;
            try {
                fn = obj["GetState_" + propName];
            } catch (e1) {
                return false;
            }
            if (fn === null || fn === undefined) return false;
            var t = typeof fn;
            return (t === "function" || t === "unknown");
        }

        function _readLayerIdFromObject(layerObj) {
            if (!layerObj) return null;
            var id = null;
            try { if (layerObj.LayerID !== undefined) id = layerObj.LayerID; } catch (e1) {}
            if (id === null || id === undefined) {
                try { if (layerObj.Layer !== undefined) id = layerObj.Layer; } catch (e2) {}
            }
            if (id === null || id === undefined) {
                try { if (layerObj.Id !== undefined) id = layerObj.Id; } catch (e3) {}
            }
            if (id === null || id === undefined) return null;
            var n = null;
            try { n = Number(id); } catch (e4) { return null; }
            if (isNaN(n)) return null;
            return n;
        }

        function _isRoundedShape(shape) {
            if (shape === null || shape === undefined) return false;
            if (typeof eRoundRectShape !== "undefined" && shape === eRoundRectShape) return true;
            if (typeof eRoundedRectangular !== "undefined" && shape === eRoundedRectangular) return true;
            if (typeof eRounded !== "undefined" && shape === eRounded) return true;
            return false;
        }

        function _registerPadHandle(obj, padId) {
            var h = _readHandleNumber(obj);
            if (h !== null && h !== undefined) {
                padHandleMap[String(h)] = padId;
            }
        }

        function _safePropType(obj, propName) {
            try {
                if (obj && obj[propName] !== undefined && obj[propName] !== null) return typeof obj[propName];
                return "missing";
            } catch (e1) {
                return "error";
            }
        }

        function _buildPadErrorDetail(obj) {
            var detail = {};
            try { detail.mode = _readNumber(obj, "Mode", null); } catch (e1) {}
            try { detail.layer = _readNumber(obj, "Layer", null); } catch (e2) {}
            try { detail.plated = _readBool(obj, "Plated", 0); } catch (e3) {}
            try { detail.hole = _readNumber(obj, "HoleSize", null); } catch (e4) {}
            try { detail.drillType = _readNumber(obj, "DrillType", null); } catch (e5) {}
            try { detail.holeType = _readNumber(obj, "HoleType", null); } catch (e6) {}
            try { detail.holeWidth = _readNumber(obj, "HoleWidth", null); } catch (e7) {}
            try { detail.holeRotation = _readNumber(obj, "HoleRotation", null); } catch (e8) {}
            detail.propTypes = {
                XStackSizeOnLayer: _safePropType(obj, "XStackSizeOnLayer"),
                YStackSizeOnLayer: _safePropType(obj, "YStackSizeOnLayer"),
                StackShapeOnLayer: _safePropType(obj, "StackShapeOnLayer"),
                XSizeOnLayer: _safePropType(obj, "XSizeOnLayer"),
                YSizeOnLayer: _safePropType(obj, "YSizeOnLayer"),
                ShapeOnLayer: _safePropType(obj, "ShapeOnLayer"),
                TopXSize: _safePropType(obj, "TopXSize"),
                TopYSize: _safePropType(obj, "TopYSize"),
                TopShape: _safePropType(obj, "TopShape"),
                MidXSize: _safePropType(obj, "MidXSize"),
                MidYSize: _safePropType(obj, "MidYSize"),
                MidShape: _safePropType(obj, "MidShape"),
                BotXSize: _safePropType(obj, "BotXSize"),
                BotYSize: _safePropType(obj, "BotYSize"),
                BotShape: _safePropType(obj, "BotShape"),
                XPadOffsetOnLayer: _safePropType(obj, "XPadOffsetOnLayer"),
                YPadOffsetOnLayer: _safePropType(obj, "YPadOffsetOnLayer"),
                StackCRPctOnLayer: _safePropType(obj, "StackCRPctOnLayer"),
                CRPercentageOnLayer: _safePropType(obj, "CRPercentageOnLayer")
            };
            return detail;
        }

        function _buildViaErrorDetail(obj) {
            var detail = {};
            try { detail.lowLayer = _readNumber(obj, "LowLayer", null); } catch (e1) {}
            try { detail.highLayer = _readNumber(obj, "HighLayer", null); } catch (e2) {}
            try { detail.startLayer = _readNumber(obj, "StartLayer", null); } catch (e3) {}
            try { detail.stopLayer = _readNumber(obj, "StopLayer", null); } catch (e4) {}
            try { detail.hole = _readNumber(obj, "HoleSize", null); } catch (e5) {}
            try { detail.size = _readNumber(obj, "Size", null); } catch (e6) {}
            detail.propTypes = {
                SizeOnLayer: _safePropType(obj, "SizeOnLayer"),
                ShapeOnLayer: _safePropType(obj, "ShapeOnLayer")
            };
            return detail;
        }

        function _resolvePadId(obj) {
            if (!obj) return 0;
            var h = _readHandleNumber(obj);
            if (h === null || h === undefined) return 0;
            var key = String(h);
            return padHandleMap.hasOwnProperty(key) ? padHandleMap[key] : 0;
        }

        function _readNetNameFromProp(obj, propName) {
            var v = _readPropOrCall(obj, propName, null);
            if (v && v.Net && v.Net.Name) return String(v.Net.Name);
            if (v && (v.Name !== undefined || v.GetState_Name !== undefined)) return _readStringValue(v, "Name", "");
            if (v !== null && v !== undefined) return String(v);
            return "";
        }

        function _getClassId(className, classKind) {
            if (!className) return 0;
            if (classKind === null || classKind === undefined) classKind = 0;
            var key = String(classKind) + "|" + className;
            if (classMap.hasOwnProperty(key)) return classMap[key];
            var t = tables.map["class"];
            if (!t) return 0;
            var bankId = (ids.classObj !== null && ids.classObj !== undefined) ? String(ids.classObj) : "class";
            var nameId = _addStringToBank(banks, bankId, className);
            t.rows.push([classKind, nameId]);
            var id = t.rows.length;
            classMap[key] = id;
            return id;
        }

        function _getRuleId(ruleName, ruleKind, enabled) {
            if (!ruleName && (ruleKind === null || ruleKind === undefined)) return 0;
            if (ruleKind === null || ruleKind === undefined) ruleKind = 0;
            if (enabled === null || enabled === undefined) enabled = 1;
            var key = String(ruleKind) + "|" + String(ruleName || "");
            if (ruleMap.hasOwnProperty(key)) return ruleMap[key];
            var t = tables.map["rule"];
            if (!t) return 0;
            var bankId = (ids.rule !== null && ids.rule !== undefined) ? String(ids.rule) : "rule";
            var nameId = _addStringToBank(banks, bankId, ruleName || "");
            t.rows.push([ruleKind, nameId, enabled ? 1 : 0]);
            var id = t.rows.length;
            ruleMap[key] = id;
            return id;
        }

        function _addBoardRow() {
            var t = tables.map["board"];
            if (!t || boardRowAdded) return;
            var name = _readStringValue(board, "FileName", "");
            if (!name) name = _readStringValue(board, "Name", "");
            if (!name && options && options.boardName) name = options.boardName;
            var bankId = (ids.board !== null && ids.board !== undefined) ? String(ids.board) : "board";
            var nameId = _addStringToBank(banks, bankId, name);
            var originX = _readNumber(board, "XOrigin", 0);
            var originY = _readNumber(board, "YOrigin", 0);
            t.rows.push([nameId, originX, originY]);
            try {
                _addExtraProps(board, { oid: ids.board, oidStr: "Board" }, t.rows.length);
            } catch (eProp) {
                _recordError(ids.board, "Board", (eProp && eProp.message) ? String(eProp.message) : String(eProp));
            }
            boardRowAdded = true;
        }

        function _addNetObject(obj) {
            var name = _readStringValue(obj, "Name", "");
            if (!name) name = _readStringValue(obj, "NetName", "");
            var netId = _getNetId(name, tables, banks, netMap, ids);
            _addExtraProps(obj, null, netId);
        }

        function _addClass(obj) {
            var className = _readStringValue(obj, "Name", "");
            var classKind = _readNumber(obj, "MemberKind", null);
            if (classKind === null || classKind === undefined) classKind = _readNumber(obj, "ClassKind", 0);
            var classId = _getClassId(className, classKind);
            _addExtraProps(obj, null, classId);
        }

        function _addRule(obj) {
            var ruleName = _readStringValue(obj, "Name", "");
            if (!ruleName) ruleName = _readStringValue(obj, "RuleName", "");
            var ruleKind = _readNumber(obj, "RuleKind", null);
            if (ruleKind === null || ruleKind === undefined) ruleKind = _readNumber(obj, "Kind", 0);
            var enabled = _readBool(obj, "Enabled", 1);
            var ruleId = _getRuleId(ruleName, ruleKind, enabled);
            _addExtraProps(obj, null, ruleId);
        }

        function _addDiffPair(obj) {
            var t = tables.map["diffpair"];
            if (!t) return;
            var name = _readStringValue(obj, "Name", "");
            if (!name) name = _readStringValue(obj, "PairName", "");
            if (!name) name = _readStringValue(obj, "DifferentialPairName", "");
            if (!name) return;
            if (diffMap.hasOwnProperty(name)) return;
            var netP = _readNetNameFromProp(obj, "PositiveNet");
            if (!netP) netP = _readNetNameFromProp(obj, "NetP");
            if (!netP) netP = _readNetNameFromProp(obj, "Net1");
            var netN = _readNetNameFromProp(obj, "NegativeNet");
            if (!netN) netN = _readNetNameFromProp(obj, "NetN");
            if (!netN) netN = _readNetNameFromProp(obj, "Net2");
            var netPId = _getNetId(netP, tables, banks, netMap, ids);
            var netNId = _getNetId(netN, tables, banks, netMap, ids);
            var bankId = (ids.diffPair !== null && ids.diffPair !== undefined) ? String(ids.diffPair) : "diffpair";
            var nameId = _addStringToBank(banks, bankId, name);
            t.rows.push([nameId, netPId, netNId]);
            diffMap[name] = t.rows.length;
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addFromTo(obj) {
            var t = tables.map["fromto"];
            if (!t) return;
            var netName = _readNetName(obj);
            if (!netName) netName = _readNetNameFromProp(obj, "Net");
            var netId = _getNetId(netName, tables, banks, netMap, ids);
            var fromPad = _readPropOrCall(obj, "FromPad", null);
            if (!fromPad) fromPad = _readPropOrCall(obj, "Pad1", null);
            var toPad = _readPropOrCall(obj, "ToPad", null);
            if (!toPad) toPad = _readPropOrCall(obj, "Pad2", null);
            var fromPadId = _resolvePadId(fromPad);
            var toPadId = _resolvePadId(toPad);
            var key = String(netId) + "|" + String(fromPadId) + "|" + String(toPadId);
            if (fromToMap.hasOwnProperty(key)) return;
            t.rows.push([netId, fromPadId, toPadId]);
            fromToMap[key] = t.rows.length;
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addCoordinate(obj) {
            var t = tables.map["coordinate"];
            if (!t) return;
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var layerId = _readNumber(obj, "Layer", 0);
            t.rows.push([x, y, layerId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addDimension(obj) {
            var t = tables.map["dimension"];
            if (!t) return;
            var dimType = _readNumber(obj, "DimensionType", null);
            if (dimType === null || dimType === undefined) dimType = _readNumber(obj, "DimType", null);
            if (dimType === null || dimType === undefined) dimType = _readNumber(obj, "Type", 0);
            var x1 = _readNumber(obj, "X1", 0);
            var y1 = _readNumber(obj, "Y1", 0);
            var x2 = _readNumber(obj, "X2", 0);
            var y2 = _readNumber(obj, "Y2", 0);
            if (x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0) {
                x1 = _readNumber(obj, "StartX", 0);
                y1 = _readNumber(obj, "StartY", 0);
                x2 = _readNumber(obj, "EndX", 0);
                y2 = _readNumber(obj, "EndY", 0);
            }
            var textStr = _readTextString(obj);
            var bankId = (ids.dimension !== null && ids.dimension !== undefined) ? String(ids.dimension) : "dimension";
            var textId = _addStringToBank(banks, bankId, textStr);
            t.rows.push([dimType, x1, y1, x2, y2, textId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addViolation(obj) {
            var t = tables.map["violation"];
            if (!t) return;
            var ruleName = "";
            var ruleKind = 0;
            var enabled = 1;
            var ruleObj = _readPropOrCall(obj, "Rule", null);
            if (ruleObj) {
                ruleName = _readStringValue(ruleObj, "Name", "");
                if (!ruleName) ruleName = _readStringValue(ruleObj, "RuleName", "");
                ruleKind = _readNumber(ruleObj, "RuleKind", 0);
                enabled = _readBool(ruleObj, "Enabled", 1);
            }
            if (!ruleName) ruleName = _readStringValue(obj, "RuleName", "");
            if (ruleKind === 0) ruleKind = _readNumber(obj, "RuleKind", 0);
            var ruleId = _getRuleId(ruleName, ruleKind, enabled);
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var key = String(ruleId) + "|" + String(x) + "|" + String(y);
            if (violationMap.hasOwnProperty(key)) return;
            t.rows.push([ruleId, 0, 0, x, y]);
            violationMap[key] = t.rows.length;
            _addExtraProps(obj, null, t.rows.length);
            if (debug) {
                try { uiDebug("COMPACT_VIOLATION_REF", { ruleId: ruleId, objAId: 0, objBId: 0 }, "global-events.js", "_collectCompactData"); } catch (eV) {}
            }
        }

        function _addEmbedded(obj) {
            var t = tables.map["embedded"];
            if (!t) return;
            var name = _readStringValue(obj, "Name", "");
            if (!name) name = _readStringValue(obj, "ComponentName", "");
            var bankId = (ids.embedded !== null && ids.embedded !== undefined) ? String(ids.embedded) : "embedded";
            var nameId = _addStringToBank(banks, bankId, name);
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var rotation = _readNumber(obj, "Rotation", 0);
            var scaleX = _readNumber(obj, "ScaleX", 0);
            var scaleY = _readNumber(obj, "ScaleY", 0);
            if (!scaleX) scaleX = _readNumber(obj, "Scale", 0);
            if (!scaleY) scaleY = scaleX;
            t.rows.push([nameId, x, y, rotation, scaleX, scaleY]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addEmbeddedBoard(obj) {
            var t = tables.map["embedded.board"];
            if (!t) return;
            var name = _readStringValue(obj, "Name", "");
            if (!name) name = _readStringValue(obj, "BoardName", "");
            var bankId = (ids.embeddedBoard !== null && ids.embeddedBoard !== undefined) ? String(ids.embeddedBoard) : "embedded.board";
            var nameId = _addStringToBank(banks, bankId, name);
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var rotation = _readNumber(obj, "Rotation", 0);
            var scaleX = _readNumber(obj, "ScaleX", 0);
            var scaleY = _readNumber(obj, "ScaleY", 0);
            if (!scaleX) scaleX = _readNumber(obj, "Scale", 0);
            if (!scaleY) scaleY = scaleX;
            t.rows.push([nameId, x, y, rotation, scaleX, scaleY]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addTrace(obj) {
            var t = tables.map["trace"];
            if (!t) return;
            var x1 = _readNumber(obj, "X1", 0);
            var y1 = _readNumber(obj, "Y1", 0);
            var x2 = _readNumber(obj, "X2", 0);
            var y2 = _readNumber(obj, "Y2", 0);
            var w = _readTrackWidth(obj);
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x1, y1, x2, y2, w, layerId, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addSpareVia(obj) {
            var t = tables.map["sparevia"];
            if (!t) return;
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var low = _readNumber(obj, "LowLayer", null);
            if (low === null || low === undefined) low = _readNumber(obj, "StartLayer", 0);
            var high = _readNumber(obj, "HighLayer", null);
            if (high === null || high === undefined) high = _readNumber(obj, "StopLayer", 0);
            var hole = _readNumber(obj, "HoleSize", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x, y, low, high, hole, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addTrack(obj) {
            var t = tables.map["track"];
            if (!t) return;
            var x1 = _readNumber(obj, "X1", 0);
            var y1 = _readNumber(obj, "Y1", 0);
            var x2 = _readNumber(obj, "X2", 0);
            var y2 = _readNumber(obj, "Y2", 0);
            var w = _readTrackWidth(obj);
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x1, y1, x2, y2, w, layerId, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addArc(obj) {
            var t = tables.map["arc"];
            if (!t) return;
            var cx = _readNumber(obj, "XCenter", 0);
            var cy = _readNumber(obj, "YCenter", 0);
            var r = _readNumber(obj, "Radius", 0);
            var sa = _readNumber(obj, "StartAngle", 0);
            var ea = _readNumber(obj, "EndAngle", 0);
            var w = _readNumber(obj, "LineWidth", 0);
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([cx, cy, r, sa, ea, w, layerId, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addVia(obj) {
            var t = tables.map["via"];
            if (!t) return;
            var info = _readObjectIdInfo(obj);
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var low = _readNumber(obj, "LowLayer", null);
            if (low === null || low === undefined) {
                var startLayerObj = _readPropOrCall(obj, "StartLayer", null);
                low = _readLayerIdFromObject(startLayerObj);
            }
            if (low === null || low === undefined) low = _readNumber(obj, "StartLayer", 0);
            var high = _readNumber(obj, "HighLayer", null);
            if (high === null || high === undefined) {
                var stopLayerObj = _readPropOrCall(obj, "StopLayer", null);
                high = _readLayerIdFromObject(stopLayerObj);
            }
            if (high === null || high === undefined) high = _readNumber(obj, "StopLayer", 0);
            var hole = _readNumber(obj, "HoleSize", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x, y, low, high, hole, netId]);
            var viaId = t.rows.length;

            var tLayer = tables.map["via.layer"];
            if (tLayer && layerInfo && layerInfo.layerIndexMap) {
                var lowIdx = layerInfo.layerIndexMap[String(low)];
                var highIdx = layerInfo.layerIndexMap[String(high)];
                if (debug && (lowIdx === undefined || highIdx === undefined) && debugCounts.viaRange < debugLimit) {
                    debugCounts.viaRange++;
                    try {
                        uiDebug("COMPACT_VIA_LAYER_RANGE", {
                            lowLayer: low,
                            highLayer: high,
                            lowIdx: lowIdx,
                            highIdx: highIdx
                        }, "global-events.js", "_collectCompactData");
                    } catch (eRange) {}
                }
                if (lowIdx === undefined || highIdx === undefined) return;
                var canSize = _hasLayerGetter(obj, "SizeOnLayer");
                var canShape = _hasLayerGetter(obj, "ShapeOnLayer");
                if (!canSize && !canShape) return;
                var list = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
                var i;
                for (i = 0; i < list.length; i++) {
                    var lid = list[i];
                    var idx = layerInfo.layerIndexMap[String(lid)];
                    if (lowIdx !== undefined && highIdx !== undefined) {
                        if (idx < lowIdx || idx > highIdx) continue;
                    }
                    var size = canSize ? _readLayerNumber(obj, "SizeOnLayer", null, lid, info, "via.size") : null;
                    var shape = canShape ? _readLayerNumber(obj, "ShapeOnLayer", 0, lid, info, "via.shape") : 0;
                    if (size === null || size === undefined) size = _readNumber(obj, "Size", 0);
                    tLayer.rows.push([viaId, lid, shape, size]);
                }
            }
            _addExtraProps(obj, info, viaId);
        }

        function _addPad(obj) {
            var t = tables.map["pad"];
            if (!t) return;
            var info = _readObjectIdInfo(obj);
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var rotation = _readNumber(obj, "Rotation", 0);
            var mode = _readNumber(obj, "Mode", 0);
            var plated = _readBool(obj, "Plated", 0);
            var hole = _readNumber(obj, "HoleSize", 0);
            var drillType = _readNumber(obj, "DrillType", 0);
            var holeType = _readNumber(obj, "HoleType", 0);
            var holeWidth = _readNumber(obj, "HoleWidth", 0);
            var holeRotation = _readNumber(obj, "HoleRotation", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            var ownerPartId = _readNumber(obj, "OwnerPart_ID", 0);
            var name = _readStringValue(obj, "Name", "");
            var bankId = (ids.pad !== null && ids.pad !== undefined) ? String(ids.pad) : "pad";
            var nameId = _addStringToBank(banks, bankId, name);
            t.rows.push([x, y, rotation, mode, plated, hole, drillType, holeType, holeWidth, holeRotation, netId, ownerPartId, nameId]);

            var padId = t.rows.length;
            _addExtraProps(obj, info, padId);
            _registerPadHandle(obj, padId);
            var tLayer = tables.map["pad.layer"];
            if (tLayer && layerInfo) {
                var layerId = _readNumber(obj, "Layer", 0);
                var topLayer = (typeof eTopLayer !== "undefined") ? eTopLayer : null;
                var bottomLayer = (typeof eBottomLayer !== "undefined") ? eBottomLayer : null;
                var multiLayer = (typeof eMultiLayer !== "undefined") ? eMultiLayer : null;
                var hasPad2CR = _hasLayerGetter(obj, "CRPercentageOnLayer") || _hasLayerGetter(obj, "StackCRPctOnLayer");
                var candidateLayers = [];
                var modeSimple = (typeof ePadMode_Simple !== "undefined" && mode === ePadMode_Simple);
                var modeLocal = (typeof ePadMode_LocalStack !== "undefined" && mode === ePadMode_LocalStack);
                var modeExternal = (typeof ePadMode_ExternalStack !== "undefined" && mode === ePadMode_ExternalStack);
                if (modeSimple) {
                    if (layerId === null || layerId === undefined || (multiLayer !== null && layerId === multiLayer)) {
                        if (topLayer !== null) candidateLayers.push(topLayer);
                        else if (bottomLayer !== null) candidateLayers.push(bottomLayer);
                        else if (layerInfo.layerIds && layerInfo.layerIds.length) candidateLayers.push(layerInfo.layerIds[0]);
                    } else {
                        candidateLayers.push(layerId);
                    }
                } else if (modeLocal) {
                    var top = topLayer;
                    var bottom = bottomLayer;
                    var mid = null;
                    var list = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
                    var j;
                    for (j = 0; j < list.length; j++) {
                        var lid = list[j];
                        if (lid !== top && lid !== bottom && lid !== multiLayer) {
                            mid = lid;
                            break;
                        }
                    }
                    if (top !== null) candidateLayers.push(top);
                    if (mid !== null) candidateLayers.push(mid);
                    if (bottom !== null) candidateLayers.push(bottom);
                } else {
                    candidateLayers = layerInfo.signalLayerIds && layerInfo.signalLayerIds.length ? layerInfo.signalLayerIds : layerInfo.layerIds;
                }

                if (debug && layerInfo.layerIndexMap && layerId !== null && layerId !== undefined) {
                    if (layerInfo.layerIndexMap[String(layerId)] === undefined && debugCounts.padLayer < debugLimit) {
                        debugCounts.padLayer++;
                        try {
                            uiDebug("COMPACT_PAD_LAYER_UNKNOWN", { layerId: layerId, mode: mode }, "global-events.js", "_collectCompactData");
                        } catch (ePadLayer) {}
                    }
                }

                var k;
                for (k = 0; k < candidateLayers.length; k++) {
                    var lid2 = candidateLayers[k];
                    if (lid2 === null || lid2 === undefined) continue;
                    var xSize = null;
                    var ySize = null;
                    var shape = null;
                    var cr = 0;
                    var isRounded = false;
                    var canStackX = false;
                    var canStackY = false;
                    var canStackShape = false;
                    var canStackCr = false;
                    var canCr = false;

                    if (modeExternal) {
                        canStackX = _hasLayerGetter(obj, "XStackSizeOnLayer");
                        canStackY = _hasLayerGetter(obj, "YStackSizeOnLayer");
                        canStackShape = _hasLayerGetter(obj, "StackShapeOnLayer");
                        canStackCr = _hasLayerGetter(obj, "StackCRPctOnLayer");
                        canCr = _hasLayerGetter(obj, "CRPercentageOnLayer");
                        xSize = canStackX ? _readLayerNumber(obj, "XStackSizeOnLayer", null, lid2, info, "pad.stack.x") : null;
                        ySize = canStackY ? _readLayerNumber(obj, "YStackSizeOnLayer", null, lid2, info, "pad.stack.y") : null;
                        shape = canStackShape ? _readLayerNumber(obj, "StackShapeOnLayer", null, lid2, info, "pad.stack.shape") : null;
                        isRounded = _isRoundedShape(shape);
                        if (hasPad2CR && isRounded) {
                            if (canStackCr) {
                                cr = _readLayerNumber(obj, "StackCRPctOnLayer", null, lid2, info, "pad.stack.cr");
                            } else if (canCr) {
                                cr = _readLayerNumber(obj, "CRPercentageOnLayer", null, lid2, info, "pad.cr");
                            }
                        }
                    } else {
                        if (modeLocal) {
                            if (topLayer !== null && lid2 === topLayer) {
                                xSize = _readNumber(obj, "TopXSize", 0);
                                ySize = _readNumber(obj, "TopYSize", 0);
                                shape = _readNumber(obj, "TopShape", 0);
                            } else if (bottomLayer !== null && lid2 === bottomLayer) {
                                xSize = _readNumber(obj, "BotXSize", 0);
                                ySize = _readNumber(obj, "BotYSize", 0);
                                shape = _readNumber(obj, "BotShape", 0);
                            } else {
                                xSize = _readNumber(obj, "MidXSize", 0);
                                ySize = _readNumber(obj, "MidYSize", 0);
                                shape = _readNumber(obj, "MidShape", 0);
                            }
                        } else {
                            xSize = _readNumber(obj, "TopXSize", 0);
                            ySize = _readNumber(obj, "TopYSize", 0);
                            shape = _readNumber(obj, "TopShape", 0);
                        }
                        isRounded = _isRoundedShape(shape);
                        canCr = _hasLayerGetter(obj, "CRPercentageOnLayer");
                        if (hasPad2CR && isRounded && canCr) {
                            cr = _readLayerNumber(obj, "CRPercentageOnLayer", null, lid2, info, "pad.cr");
                        }
                    }

                    if (xSize === null || xSize === undefined) xSize = 0;
                    if (ySize === null || ySize === undefined) ySize = 0;
                    if (shape === null || shape === undefined) shape = 0;
                    if (cr === null || cr === undefined) cr = 0;

                    var offsetX = 0;
                    var offsetY = 0;
                    tLayer.rows.push([padId, lid2, shape, xSize, ySize, offsetX, offsetY, cr]);
                }
            }
        }

        function _addPolygon(obj) {
            var t = tables.map["polygon"];
            if (!t) return;
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            var polygonType = _readNumber(obj, "PolygonType", 0);
            var pourOver = _readNumber(obj, "PourOver", 0);
            var grid = _readNumber(obj, "Grid", 0);
            var trackSize = _readNumber(obj, "TrackSize", 0);
            var minTrack = _readNumber(obj, "MinTrack", 0);
            var borderWidth = _readNumber(obj, "BorderWidth", 0);
            var removeDead = _readBool(obj, "RemoveDead", 0);
            var removeIslands = _readBool(obj, "RemoveIslandsByArea", 0);
            var islandArea = _readNumber(obj, "IslandAreaThreshold", 0);
            var removeNecks = _readBool(obj, "RemoveNarrowNecks", 0);
            var neckWidth = _readNumber(obj, "NeckWidthThreshold", 0);
            var arcApprox = _readNumber(obj, "ArcApproximation", 0);
            t.rows.push([layerId, netId, polygonType, pourOver, grid, trackSize, minTrack, borderWidth, removeDead, removeIslands, islandArea, removeNecks, neckWidth, arcApprox]);

            var polyId = t.rows.length;
            _addExtraProps(obj, null, polyId);
            _addGroupSegments(obj, polyId, "polygon.seg.track", "polygon.seg.arc");
        }

        function _addBoardOutline(obj) {
            var t = tables.map["board.outline"];
            if (!t) return;
            t.rows.push([t.rows.length + 1]);
            var outlineId = t.rows.length;
            _addExtraProps(obj, null, outlineId);
            _addGroupSegments(obj, outlineId, "board.outline.seg.track", "board.outline.seg.arc");
        }

        function _addFill(obj) {
            var t = tables.map["fill"];
            if (!t) return;
            var x1 = _readNumber(obj, "X1", 0);
            var y1 = _readNumber(obj, "Y1", 0);
            var x2 = _readNumber(obj, "X2", 0);
            var y2 = _readNumber(obj, "Y2", 0);
            var rotation = _readNumber(obj, "Rotation", 0);
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x1, y1, x2, y2, rotation, layerId, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addRegion(obj) {
            var t = tables.map["region"];
            if (!t) return;
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([layerId, netId]);
            var regionId = t.rows.length;
            _addExtraProps(obj, null, regionId);
            _addGroupSegments(obj, regionId, "region.seg.track", "region.seg.arc");
        }

        function _addSplitPlane(obj) {
            var t = tables.map["splitplane"];
            if (!t) return;
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([layerId, netId]);
            var planeId = t.rows.length;
            _addExtraProps(obj, null, planeId);
            _addGroupSegments(obj, planeId, "splitplane.seg.track", "splitplane.seg.arc");
        }

        function _addText(obj) {
            var t = tables.map["text"];
            if (!t) return;
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var layerId = _readNumber(obj, "Layer", 0);
            var rotation = _readNumber(obj, "Rotation", 0);
            var height = _readNumber(obj, "Height", 0);
            var width = _readNumber(obj, "Width", 0);
            var stroke = _readNumber(obj, "StrokeWidth", null);
            if (stroke === null || stroke === undefined) stroke = _readNumber(obj, "LineWidth", 0);
            var textStr = _readTextString(obj);
            var fontName = _readStringValue(obj, "FontName", "");
            var inverted = _readBool(obj, "Inverted", 0);
            var mirrored = _readBool(obj, "Mirror", 0);
            var bankId = (ids.text !== null && ids.text !== undefined) ? String(ids.text) : "text";
            var textId = _addStringToBank(banks, bankId, textStr);
            var fontId = _addStringToBank(banks, bankId, fontName);
            t.rows.push([x, y, layerId, rotation, height, width, stroke, textId, fontId, inverted, mirrored]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _readNestedText(obj, propName) {
            var s = "";
            try {
                var v = obj[propName];
                if (v && v.Text !== undefined) s = String(v.Text);
                if (!s && v && v.String !== undefined) s = String(v.String);
            } catch (e1) {}
            if (!s) s = _readStringValue(obj, propName, "");
            return s;
        }

        function _getComponentKey(obj) {
            var handle = _readHandleNumber(obj);
            if (handle) return "H:" + String(handle);
            var d = _readNestedText(obj, "Designator");
            if (d) return "D:" + d;
            return null;
        }

        function _addComponent(obj) {
            var t = tables.map["component"];
            if (!t) return;
            var x = _readCoord(obj, "X", "XLocation");
            var y = _readCoord(obj, "Y", "YLocation");
            var layerId = _readNumber(obj, "Layer", 0);
            var rotation = _readNumber(obj, "Rotation", 0);
            var designator = _readNestedText(obj, "Designator");
            var comment = _readNestedText(obj, "Comment");
            var pattern = _readStringValue(obj, "Pattern", "");
            if (!pattern) pattern = _readStringValue(obj, "PatternName", "");
            var sourceLib = _readStringValue(obj, "SourceLibReference", "");
            var locked = _readBool(obj, "Locked", 0);
            var bankId = (ids.component !== null && ids.component !== undefined) ? String(ids.component) : "component";
            var designatorId = _addStringToBank(banks, bankId, designator);
            var commentId = _addStringToBank(banks, bankId, comment);
            var patternId = _addStringToBank(banks, bankId, pattern);
            var sourceLibId = _addStringToBank(banks, bankId, sourceLib);
            t.rows.push([x, y, layerId, rotation, designatorId, commentId, patternId, sourceLibId, locked]);
            _addExtraProps(obj, null, t.rows.length);
            var compKey = _getComponentKey(obj);
            if (compKey) compMap[compKey] = t.rows.length;
        }

        function _addComponentBody(obj) {
            var t = tables.map["component.body"];
            if (!t) return;
            var compId = 0;
            try {
                if (obj.Component) {
                    var key = _getComponentKey(obj.Component);
                    if (key && compMap[key]) compId = compMap[key];
                }
            } catch (e1) {}
            if (!compId) {
                try {
                    if (obj.Owner) {
                        var key2 = _getComponentKey(obj.Owner);
                        if (key2 && compMap[key2]) compId = compMap[key2];
                    }
                } catch (e2) {}
            }
            var layerId = _readNumber(obj, "Layer", 0);
            var bounds = _readBounds(obj);
            var x1 = bounds ? bounds.x1 : 0;
            var y1 = bounds ? bounds.y1 : 0;
            var x2 = bounds ? bounds.x2 : 0;
            var y2 = bounds ? bounds.y2 : 0;
            var bodyType = _readNumber(obj, "BodyType", 0);
            t.rows.push([compId, layerId, x1, y1, x2, y2, bodyType]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addConnection(obj) {
            var t = tables.map["connection"];
            if (!t) return;
            var x1 = _readNumber(obj, "X1", 0);
            var y1 = _readNumber(obj, "Y1", 0);
            var x2 = _readNumber(obj, "X2", 0);
            var y2 = _readNumber(obj, "Y2", 0);
            var layerId = _readNumber(obj, "Layer", 0);
            var netId = _getNetId(_readNetName(obj), tables, banks, netMap, ids);
            t.rows.push([x1, y1, x2, y2, layerId, netId]);
            _addExtraProps(obj, null, t.rows.length);
        }

        function _addGroupSegments(obj, parentId, trackTableName, arcTableName) {
            var it = _createGroupIterator(obj);
            if (!it) return;
            var trackTable = tables.map[trackTableName];
            var arcTable = tables.map[arcTableName];
            var cursor = it.first();
            while (cursor) {
                var info = _readObjectIdInfo(cursor);
                var oid = info.oid;
                var oidStr = info.oidStr;
                if ((ids.track !== null && oid === ids.track) || oidStr === "Track") {
                    if (trackTable) {
                        var x1 = _readNumber(cursor, "X1", 0);
                        var y1 = _readNumber(cursor, "Y1", 0);
                        var x2 = _readNumber(cursor, "X2", 0);
                        var y2 = _readNumber(cursor, "Y2", 0);
                        var w = _readTrackWidth(cursor);
                        trackTable.rows.push([parentId, x1, y1, x2, y2, w]);
                    }
                } else if ((ids.arc !== null && oid === ids.arc) || oidStr === "Arc") {
                    if (arcTable) {
                        var cx = _readNumber(cursor, "XCenter", 0);
                        var cy = _readNumber(cursor, "YCenter", 0);
                        var r = _readNumber(cursor, "Radius", 0);
                        var sa = _readNumber(cursor, "StartAngle", 0);
                        var ea = _readNumber(cursor, "EndAngle", 0);
                        var w2 = _readNumber(cursor, "LineWidth", 0);
                        arcTable.rows.push([parentId, cx, cy, r, sa, ea, w2]);
                    }
                }
                cursor = it.next();
            }
            it.destroy();
        }

        function _scanObjectSet(objectId, handler, label) {
            if (!board || typeof board.BoardIterator_Create === "undefined") return 0;
            if (objectId === null || objectId === undefined) return 0;
            if (typeof MkSet !== "function") return 0;
            var it = null;
            try { it = board.BoardIterator_Create(); } catch (e1) { it = null; }
            if (!it) return 0;
            try {
                if (typeof it.AddFilter_ObjectSet !== "undefined") {
                    it.AddFilter_ObjectSet(MkSet(objectId));
                }
                if (typeof it.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                    it.AddFilter_LayerSet(AllLayers);
                } else if (typeof it.AddFilter_IPCB_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                    it.AddFilter_IPCB_LayerSet(AllLayers);
                }
                if (typeof it.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                    it.AddFilter_Method(eProcessAll);
                }
            } catch (e2) {}

            var count = 0;
            var aborted = false;
            var cursor = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    cursor = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    cursor = (typeof it.First === "function") ? it.First() : it.First;
                }
            } catch (e3) { cursor = null; }

            while (cursor) {
                if (_checkAbort(label ? ("scan.set." + label) : "scan.set")) {
                    aborted = true;
                    break;
                }
                count++;
                _yieldIfNeeded(count);
                try {
                    handler(cursor);
                } catch (eRun) {
                    var info = _readObjectIdInfo(cursor);
                    var msg = (eRun && eRun.message) ? String(eRun.message) : String(eRun);
                    _recordError(info.oid, info.oidStr, msg);
                }
                try {
                    if (typeof it.NextPCBObject !== "undefined") {
                        cursor = it.NextPCBObject();
                    } else if (typeof it.Next !== "undefined") {
                        cursor = (typeof it.Next === "function") ? it.Next() : it.Next;
                    } else {
                        cursor = null;
                    }
                } catch (e4) { cursor = null; }
            }

            try {
                if (typeof board.BoardIterator_Destroy !== "undefined") {
                    board.BoardIterator_Destroy(it);
                }
            } catch (e5) {}

            if (aborted) {
                res.ok = false;
                res.aborted = true;
                res.abortReason = abortReason || "stop.requested";
                res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            }
            if (debug && label) {
                try { uiDebug("COMPACT_SCAN_SET", { label: label, count: count }, "global-events.js", "_collectCompactData"); } catch (e6) {}
            }
            return count;
        }

        _addBoardRow();
        var iter = _createBoardIterator(board);
        if (!iter) {
            res.error = "BoardIterator_Create not available";
            return res;
        }

        var cursor = iter.first();
        while (cursor) {
            if (_checkAbort("scan.all")) break;
            res.stats.total++;
            if (progressStep && (res.stats.total % progressStep === 0)) {
                var now = new Date().getTime();
                var elapsed = now - scanStartedAt;
                var delta = now - lastProgressAt;
                var deltaCount = res.stats.total - lastProgressCount;
                var rate = elapsed ? (res.stats.total * 1000 / elapsed) : 0;
                var batchRate = delta ? (deltaCount * 1000 / delta) : 0;
                try {
                    uiInfo("COMPACT_PROGRESS", {
                        stage: "scan.all",
                        count: res.stats.total,
                        elapsedMs: elapsed,
                        ratePerSec: Math.round(rate * 100) / 100,
                        batchRatePerSec: Math.round(batchRate * 100) / 100,
                        batchMs: delta
                    }, "global-events.js", "_collectCompactData");
                } catch (e0) {}
                lastProgressAt = now;
                lastProgressCount = res.stats.total;
                if (debug) {
                    try { uiDebug("COMPACT_SCAN_PROGRESS", { count: res.stats.total }, "global-events.js", "_collectCompactData"); } catch (e1) {}
                }
            }
            _yieldIfNeeded(res.stats.total);
            var info = _readObjectIdInfo(cursor);
            var oid = info.oid;
            var oidStr = info.oidStr;

            try {
                if ((ids.track !== null && oid === ids.track) || oidStr === "Track") {
                    _perfWrap("Track", cursor, _addTrack);
                } else if ((ids.arc !== null && oid === ids.arc) || oidStr === "Arc") {
                    _perfWrap("Arc", cursor, _addArc);
                } else if ((ids.via !== null && oid === ids.via) || oidStr === "Via") {
                    _perfWrap("Via", cursor, _addVia);
                } else if ((ids.pad !== null && oid === ids.pad) || oidStr === "Pad") {
                    _perfWrap("Pad", cursor, _addPad);
                } else if ((ids.poly !== null && oid === ids.poly) || oidStr === "Polygon") {
                    _perfWrap("Polygon", cursor, _addPolygon);
                } else if ((ids.boardOutline !== null && oid === ids.boardOutline) || oidStr === "BoardOutline") {
                    _perfWrap("BoardOutline", cursor, _addBoardOutline);
                } else if ((ids.fill !== null && oid === ids.fill) || oidStr === "Fill") {
                    _perfWrap("Fill", cursor, _addFill);
                } else if ((ids.region !== null && oid === ids.region) || oidStr === "Region") {
                    _perfWrap("Region", cursor, _addRegion);
                } else if ((ids.splitPlane !== null && oid === ids.splitPlane) || oidStr === "SplitPlane" || oidStr === "SplitPlaneRegion") {
                    _perfWrap("SplitPlane", cursor, _addSplitPlane);
                } else if ((ids.text !== null && oid === ids.text) || oidStr === "Text") {
                    _perfWrap("Text", cursor, _addText);
                } else if ((ids.component !== null && oid === ids.component) || oidStr === "Component") {
                    _perfWrap("Component", cursor, _addComponent);
                } else if ((ids.componentBody !== null && oid === ids.componentBody) || oidStr === "ComponentBody") {
                    _perfWrap("ComponentBody", cursor, _addComponentBody);
                } else if ((ids.connection !== null && oid === ids.connection) || oidStr === "Connection") {
                    _perfWrap("Connection", cursor, _addConnection);
                } else if ((ids.coordinate !== null && oid === ids.coordinate) || oidStr === "Coordinate") {
                    _perfWrap("Coordinate", cursor, _addCoordinate);
                } else if ((ids.dimension !== null && oid === ids.dimension) || oidStr === "Dimension") {
                    _perfWrap("Dimension", cursor, _addDimension);
                } else if ((ids.net !== null && oid === ids.net) || oidStr === "Net") {
                    _perfWrap("Net", cursor, _addNetObject);
                } else if ((ids.classObj !== null && oid === ids.classObj) || oidStr === "Class") {
                    _perfWrap("Class", cursor, _addClass);
                } else if ((ids.rule !== null && oid === ids.rule) || oidStr === "Rule") {
                    _perfWrap("Rule", cursor, _addRule);
                } else if ((ids.diffPair !== null && oid === ids.diffPair) || oidStr === "DifferentialPair") {
                    _perfWrap("DifferentialPair", cursor, _addDiffPair);
                } else if ((ids.fromTo !== null && oid === ids.fromTo) || oidStr === "FromTo") {
                    _perfWrap("FromTo", cursor, _addFromTo);
                } else if ((ids.violation !== null && oid === ids.violation) || oidStr === "Violation") {
                    _perfWrap("Violation", cursor, _addViolation);
                } else if ((ids.embedded !== null && oid === ids.embedded) || oidStr === "Embedded") {
                    _perfWrap("Embedded", cursor, _addEmbedded);
                } else if ((ids.embeddedBoard !== null && oid === ids.embeddedBoard) || oidStr === "EmbeddedBoard") {
                    _perfWrap("EmbeddedBoard", cursor, _addEmbeddedBoard);
                } else if ((ids.trace !== null && oid === ids.trace) || oidStr === "Trace") {
                    _perfWrap("Trace", cursor, _addTrace);
                } else if ((ids.spareVia !== null && oid === ids.spareVia) || oidStr === "SpareVia") {
                    _perfWrap("SpareVia", cursor, _addSpareVia);
                } else if ((ids.board !== null && oid === ids.board) || oidStr === "Board") {
                    _countType("Board");
                    if (perfEnabled && (perfSample <= 1 || (res.stats.total % perfSample === 0))) {
                        var tBoard = new Date().getTime();
                        _addBoardRow();
                        _recordPerf("Board", tBoard);
                    } else {
                        _addBoardRow();
                    }
                } else {
                    var key = oidStr || String(oid);
                    _countType(key);
                    _markUnsupported(key);
                }
            } catch (eObj) {
                var msg = (eObj && eObj.message) ? String(eObj.message) : String(eObj);
                _recordError(oid, oidStr, msg);
                if (debugCounts.errorDetail < debugLimit) {
                    debugCounts.errorDetail++;
                    try {
                        if ((ids.pad !== null && oid === ids.pad) || oidStr === "Pad") {
                            uiWarn("COMPACT_PAD_ERROR_DETAIL", _buildPadErrorDetail(cursor), "global-events.js", "_collectCompactData");
                        } else if ((ids.via !== null && oid === ids.via) || oidStr === "Via") {
                            uiWarn("COMPACT_VIA_ERROR_DETAIL", _buildViaErrorDetail(cursor), "global-events.js", "_collectCompactData");
                        }
                    } catch (eDiag) {}
                }
            }

            cursor = iter.next();
        }
        iter.destroy();

        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }

        _scanObjectSet(ids.net, _addNetObject, "net");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _scanObjectSet(ids.classObj, _addClass, "class");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _scanObjectSet(ids.rule, _addRule, "rule");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _scanObjectSet(ids.diffPair, _addDiffPair, "diffpair");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _scanObjectSet(ids.fromTo, _addFromTo, "fromto");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _scanObjectSet(ids.violation, _addViolation, "violation");
        if (abortRequested) {
            _flushErrorBuffer(true);
            res.ok = false;
            res.aborted = true;
            res.abortReason = abortReason || "stop.requested";
            res.error = res.abortReason ? ("aborted:" + res.abortReason) : "aborted";
            return res;
        }
        _flushErrorBuffer(true);

        var i;
        for (i = 0; i < tables.list.length; i++) {
            _touchTableCount(tables.list[i].name);
        }
        if (debug && res.stats.unsupported > 0 && debugCounts.unsupported < debugLimit) {
            debugCounts.unsupported++;
            try {
                uiDebug("COMPACT_UNSUPPORTED_TYPES", {
                    total: res.stats.unsupported,
                    types: res.stats.unsupportedTypes
                }, "global-events.js", "_collectCompactData");
            } catch (eUnsup) {}
        }
        if (debug && res.stats.errors > 0 && res.stats.errorSamples.length && debugCounts.errorSample < debugLimit) {
            debugCounts.errorSample++;
            try {
                uiDebug("COMPACT_ERROR_SAMPLES", {
                    total: res.stats.errors,
                    samples: res.stats.errorSamples
                }, "global-events.js", "_collectCompactData");
            } catch (eSamp) {}
        }
        if (perfEnabled) {
            res.stats.perfSample = perfSample || 1;
            res.stats.perfSamples = perfSampleCount;
            res.stats.perfTotalMs = perfTotalMs;
            res.stats.perfTop = _buildPerfTop(perfTypes, perfTopLimit);
            try {
                uiInfo("COMPACT_PERF_TOP", {
                    sample: res.stats.perfSample,
                    samples: res.stats.perfSamples,
                    totalMs: res.stats.perfTotalMs,
                    types: res.stats.perfTop
                }, "global-events.js", "_collectCompactData");
            } catch (ePerf) {}
        }
        res.ok = true;
        return res;
    }

    function _uploadEnvelope(client, url, envelope, label, extra) {
        if (!client || !client.request) {
            uiWarn(label, { ok: false, reason: "request not available" }, "global-events.js", "_uploadEnvelope");
            return { ok: false, status: 0, error: "request not available" };
        }
        var body = _safeJson(envelope);
        var resp = client.request("POST", url, body, { "Content-Type": "application/json" });
        var ok = resp && resp.ok;
        var payload = { ok: ok, status: resp ? resp.status : 0 };
        if (extra) {
            var k;
            for (k in extra) {
                if (extra.hasOwnProperty(k)) payload[k] = extra[k];
            }
        }
        uiInfo(label, payload, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        return { ok: ok, resp: resp };
    }

    function _readMemLogLine(lines, idx) {
        var line = "";
        try { line = lines.Strings(idx); } catch (e1) {}
        if (line === "" || line === null || line === undefined) {
            try { line = lines.Item(idx); } catch (e2) {}
        }
        if (line === "" || line === null || line === undefined) {
            try { line = lines[idx]; } catch (e3) {}
        }
        if (line === null || line === undefined) line = "";
        return String(line);
    }

    function _collectUILogLines(maxLines) {
        var res = { ok: false, total: 0, start: 0, lines: [], truncated: false };
        if (typeof memLog === "undefined" || !memLog || !memLog.Lines) return res;
        var count = 0;
        try { count = memLog.Lines.Count; } catch (e1) { count = 0; }
        res.total = count;
        if (!count) return res;
        var take = maxLines && maxLines > 0 ? maxLines : count;
        var start = count > take ? (count - take) : 0;
        res.start = start;
        res.truncated = count > take;
        var i;
        for (i = start; i < count; i++) {
            res.lines.push(_readMemLogLine(memLog.Lines, i));
        }
        res.ok = true;
        return res;
    }

    function _uploadUILog(client, baseUrl, options) {
        var maxLines = (options && options.maxLines) ? options.maxLines : 2000;
        var snapshot = _collectUILogLines(maxLines);
        if (!snapshot.ok) {
            uiWarn("UPLOAD_UI_LOG", { ok: false, reason: "memLog unavailable" }, "global-events.js", "_uploadUILog");
            return { ok: false, reason: "memLog unavailable" };
        }
        var env = {
            schema: "spec/0.1",
            type: "ad.ui.log",
            id: "ad.ui.log-" + String(new Date().getTime()),
            payload: {
                total: snapshot.total,
                start: snapshot.start,
                count: snapshot.lines.length,
                truncated: snapshot.truncated,
                lines: snapshot.lines
            },
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        return _uploadEnvelope(client, baseUrl + "/api/upload-logs", env, "UPLOAD_UI_LOG", {
            count: snapshot.lines.length,
            total: snapshot.total,
            truncated: snapshot.truncated ? true : false
        });
    }

    function _uploadDeclSummary(client, baseUrl, declInfo, layerInfo, boardSummary) {
        var summary = {
            schema: "spec/0.1",
            type: "ad.decl.summary",
            id: "ad.decl.summary-" + String(new Date().getTime()),
            payload: {
                format: declInfo.format,
                declId: declInfo.declId,
                declHash: declInfo.declHash,
                stackSig: layerInfo && layerInfo.stackSig ? layerInfo.stackSig : "",
                boardName: boardSummary ? boardSummary.name : ""
            },
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        var resp = _uploadEnvelope(client, baseUrl + "/api/decl-summary", summary, "DECL_SUMMARY");
        var needDecl = true;
        var needStack = true;
        if (resp && resp.resp && resp.resp.json) {
            try {
                if (resp.resp.json.needDecl === false) needDecl = false;
                if (resp.resp.json.needStack === false) needStack = false;
            } catch (e1) {}
        }
        return { ok: resp.ok, needDecl: needDecl, needStack: needStack };
    }

    function _uploadDecl(client, baseUrl, declInfo) {
        var decl = {
            schema: "spec/0.1",
            type: "ad.decl",
            id: "ad.decl-" + String(new Date().getTime()),
            payload: {
                format: declInfo.format,
                declId: declInfo.declId,
                declHash: declInfo.declHash,
                rowIdMode: declInfo.rowIdMode,
                tables: declInfo.defs,
                stringBanks: declInfo.stringBanks
            },
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        return _uploadEnvelope(client, baseUrl + "/api/upload-decl", decl, "DECL_UPLOAD");
    }

    function _uploadLayerStack(client, baseUrl, layerInfo) {
        var env = {
            schema: "spec/0.1",
            type: "ad.layer.stack",
            id: "ad.layer.stack-" + String(new Date().getTime()),
            payload: {
                stackSig: layerInfo.stackSig,
                fields: layerInfo.fields,
                layers: layerInfo.layers
            },
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        return _uploadEnvelope(client, baseUrl + "/api/upload-layer-stack", env, "LAYER_STACK_UPLOAD", { count: layerInfo.layers.length });
    }

    function _uploadStringBanks(client, baseUrl, banks, options) {
        var ok = true;
        var totalBanks = 0;
        var batchSize = (options && options.stringBatchSize) ? options.stringBatchSize : 1000;
        var shouldAbort = (options && options.shouldAbort) ? options.shouldAbort : null;
        var abortReason = "";
        var k;
        for (k in banks) {
            if (!banks.hasOwnProperty(k)) continue;
            var bank = banks[k];
            var list = bank.list || [];
            if (list.length === 0) continue;
            totalBanks++;
            var offset = 1;
            var idx = 0;
            while (idx < list.length) {
                if (shouldAbort) {
                    var stop = false;
                    try { stop = shouldAbort("string.bank." + String(bank.bankId || k), offset, list.length); } catch (eStop) { stop = false; }
                    if (stop) {
                        abortReason = (typeof stop === "string") ? stop : "stop.requested";
                        return { ok: false, totalBanks: totalBanks, aborted: true, abortReason: abortReason };
                    }
                }
                var take = list.slice(idx, idx + batchSize);
                var env = {
                    schema: "spec/0.1",
                    type: "ad.string.bank",
                    id: "ad.string.bank-" + String(new Date().getTime()) + "-" + String(k),
                    payload: {
                        bankId: bank.bankId,
                        offset: offset,
                        strings: take
                    },
                    meta: {
                        ts: new Date().getTime(),
                        source: "AD",
                        rev: 0.1,
                        detail: { schema: "spec/0.1", build: "ad21-js" }
                    }
                };
                var resp = _uploadEnvelope(client, baseUrl + "/api/upload-strings", env, "STRING_BANK_UPLOAD", {
                    bankId: bank.bankId,
                    count: take.length
                });
                if (!resp.ok) ok = false;
                idx += take.length;
                offset += take.length;
            }
        }
        return { ok: ok, totalBanks: totalBanks };
    }

    function _uploadErrorBatch(client, baseUrl, context, batchIndex, items, isFinal) {
        var payload = {
            stage: context && context.stage ? context.stage : "",
            boardName: context && context.boardName ? context.boardName : "",
            format: context && context.format ? context.format : "",
            declId: context && context.declId ? context.declId : "",
            declHash: context && context.declHash ? context.declHash : "",
            stackSig: context && context.stackSig ? context.stackSig : "",
            batchIndex: batchIndex,
            count: items ? items.length : 0,
            isFinal: !!isFinal,
            items: items || []
        };
        var env = {
            schema: "spec/0.1",
            type: "ad.error.batch",
            id: "ad.error.batch-" + String(new Date().getTime()) + "-" + String(batchIndex),
            payload: payload,
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        return _uploadEnvelope(client, baseUrl + "/api/upload-errors", env, "ERROR_BATCH_UPLOAD", {
            count: payload.count,
            batchIndex: batchIndex,
            isFinal: !!isFinal
        });
    }

    function _uploadCompactTables(client, baseUrl, declInfo, layerInfo, boardSummary, tables, options) {
        var batchSize = (options && options.batchSize) ? options.batchSize : 5000;
        var totalRows = 0;
        var i;
        for (i = 0; i < tables.list.length; i++) {
            totalRows += tables.list[i].rows.length;
        }
        if (totalRows === 0) {
            uiInfo("UPLOAD_OBJECTS", {
                ok: true,
                status: 0,
                count: 0,
                total: 0,
                batchIndex: 0,
                batchCount: 0,
                isFinal: true
            }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
            return { ok: true, batches: 0, okBatches: 0, totalRows: 0 };
        }

        var rowPos = {};
        for (i = 0; i < tables.list.length; i++) {
            rowPos[tables.list[i].name] = 0;
        }
        var batchCount = Math.ceil(totalRows / batchSize);
        var batchIndex = 0;
        var sent = 0;
        var ok = true;
        var okBatches = 0;
        var shouldAbort = (options && options.shouldAbort) ? options.shouldAbort : null;
        var aborted = false;
        var abortReason = "";

        while (sent < totalRows) {
            if (shouldAbort) {
                var stop = false;
                try { stop = shouldAbort("upload.objects", sent, totalRows); } catch (eStop) { stop = false; }
                if (stop) {
                    aborted = true;
                    abortReason = (typeof stop === "string") ? stop : "stop.requested";
                    break;
                }
            }
            batchIndex++;
            var batchTables = [];
            var batchCountRows = 0;
            for (i = 0; i < tables.list.length; i++) {
                if (batchCountRows >= batchSize) break;
                var table = tables.list[i];
                var pos = rowPos[table.name];
                if (pos >= table.rows.length) continue;
                var remain = table.rows.length - pos;
                var take = batchSize - batchCountRows;
                if (take > remain) take = remain;
                if (take > 0) {
                    batchTables.push({
                        tableId: table.tableId,
                        rows: table.rows.slice(pos, pos + take)
                    });
                    rowPos[table.name] = pos + take;
                    batchCountRows += take;
                }
            }

            var isFinal = (sent + batchCountRows) >= totalRows;
            var payload = {
                format: declInfo.format,
                declId: declInfo.declId,
                declHash: declInfo.declHash,
                stackSig: layerInfo && layerInfo.stackSig ? layerInfo.stackSig : "",
                boardName: boardSummary ? boardSummary.name : "",
                count: batchCountRows,
                total: isFinal ? totalRows : null,
                offset: sent,
                batchIndex: batchIndex,
                batchCount: isFinal ? batchCount : 0,
                isFinal: isFinal,
                tables: batchTables
            };
            var env = {
                schema: "spec/0.1",
                type: "ad.object.index",
                id: "ad.object.index-" + String(new Date().getTime()) + "-" + String(batchIndex),
                payload: payload,
                meta: {
                    ts: new Date().getTime(),
                    source: "AD",
                    rev: 0.1,
                    detail: { schema: "spec/0.1", build: "ad21-js" }
                }
            };
            var resp = _uploadEnvelope(client, baseUrl + "/api/upload-objects", env, "UPLOAD_OBJECTS", {
                count: batchCountRows,
                offset: sent,
                batchIndex: batchIndex,
                batchCount: isFinal ? batchCount : 0,
                isFinal: isFinal
            });
            if (!resp.ok) ok = false;
            if (resp.ok) okBatches++;
            sent += batchCountRows;
        }

        if (aborted) {
            return { ok: false, batches: batchIndex, okBatches: okBatches, totalRows: totalRows, aborted: true, abortReason: abortReason };
        }
        return { ok: ok, batches: batchCount, okBatches: okBatches, totalRows: totalRows };
    }

    function _runCompactTransfer(board, boardSummary, client, baseUrl, options) {
        var result = {
            ok: false,
            declSummaryOk: false,
            declUploadOk: false,
            layerStackOk: false,
            stringBanksOk: false,
            objectUploadOk: false,
            objectBatches: 0,
            objectOkBatches: 0,
            totalRows: 0,
            stats: null,
            aborted: false,
            abortReason: "",
            format: "",
            declId: "",
            declHash: "",
            stackSig: "",
            timing: {}
        };
        if (!board) {
            result.error = "board missing";
            return result;
        }

        function _checkAbort(stage) {
            if (!options || !options.shouldAbort) return false;
            var stop = false;
            try { stop = options.shouldAbort(stage, 0, result.stats ? result.stats.errors : 0); } catch (eStop) { stop = false; }
            if (stop) {
                result.aborted = true;
                result.abortReason = (typeof stop === "string") ? stop : "stop.requested";
                return true;
            }
            return false;
        }

        var declInfo = _buildDeclInfo(options && options.format ? options.format : specAllFormat);
        result.format = declInfo.format;
        result.declId = declInfo.declId;
        result.declHash = declInfo.declHash;
        var banks = {};
        var layerInfo = _buildLayerStackInfo(board, banks);
        result.stackSig = layerInfo && layerInfo.stackSig ? layerInfo.stackSig : "";
        if (options && options.debug) {
            try { uiDebug("DECL_BUILD", { tables: declInfo.defs.length, declHash: declInfo.declHash }, "global-events.js", "_runCompactTransfer"); } catch (e0) {}
            try { uiDebug("LAYER_STACK_BUILD", { count: layerInfo.layers.length, stackSig: layerInfo.stackSig }, "global-events.js", "_runCompactTransfer"); } catch (e1) {}
        }

        var tDeclSummary = new Date().getTime();
        var summaryResp = _uploadDeclSummary(client, baseUrl, declInfo, layerInfo, boardSummary);
        result.timing.declSummaryMs = new Date().getTime() - tDeclSummary;
        result.declSummaryOk = summaryResp.ok;
        uiInfo("COMPACT_STAGE", {
            stage: "decl.summary",
            ok: summaryResp.ok,
            needDecl: summaryResp.needDecl,
            needStack: summaryResp.needStack,
            ms: result.timing.declSummaryMs
        }, "global-events.js", "_runCompactTransfer");
        if (_checkAbort("decl.summary")) return result;

        var forceDecl = !(options && options.forceDecl === false);
        var forceStack = !(options && options.forceStack === false);
        var tDeclUpload = new Date().getTime();
        if (summaryResp.needDecl || forceDecl) {
            var declResp = _uploadDecl(client, baseUrl, declInfo);
            result.declUploadOk = declResp.ok;
        } else {
            result.declUploadOk = true;
        }
        result.timing.declUploadMs = new Date().getTime() - tDeclUpload;
        uiInfo("COMPACT_STAGE", {
            stage: "decl.upload",
            ok: result.declUploadOk,
            ms: result.timing.declUploadMs
        }, "global-events.js", "_runCompactTransfer");
        if (_checkAbort("decl.upload")) return result;

        var tLayerStack = new Date().getTime();
        if (layerInfo.ok && (summaryResp.needStack || forceStack)) {
            var layerBank = banks["layer"];
            if (layerBank && layerBank.list && layerBank.list.length) {
                _uploadStringBanks(client, baseUrl, { layer: layerBank }, options);
            }
            var layerResp = _uploadLayerStack(client, baseUrl, layerInfo);
            result.layerStackOk = layerResp.ok;
        } else {
            result.layerStackOk = layerInfo.ok;
        }
        result.timing.layerStackMs = new Date().getTime() - tLayerStack;
        uiInfo("COMPACT_STAGE", {
            stage: "layer.stack",
            ok: result.layerStackOk,
            count: layerInfo.layers.length,
            ms: result.timing.layerStackMs
        }, "global-events.js", "_runCompactTransfer");
        if (_checkAbort("layer.stack")) return result;

        var collectOptions = {};
        if (options) {
            var k;
            for (k in options) {
                if (options.hasOwnProperty(k)) collectOptions[k] = options[k];
            }
        }
        collectOptions.boardName = boardSummary ? boardSummary.name : "";
        if (!(options && options.reportErrors === false)) {
            var errorContext = {
                stage: "collect",
                boardName: boardSummary ? boardSummary.name : "",
                format: declInfo.format,
                declId: declInfo.declId,
                declHash: declInfo.declHash,
                stackSig: layerInfo && layerInfo.stackSig ? layerInfo.stackSig : ""
            };
            collectOptions.onErrorBatch = function (items, batchIndex, isFinal) {
                _uploadErrorBatch(client, baseUrl, errorContext, batchIndex, items, isFinal);
            };
        }
        var tCollect = new Date().getTime();
        var collect = _collectCompactData(board, declInfo, layerInfo, banks, collectOptions);
        result.timing.collectMs = new Date().getTime() - tCollect;
        result.stats = collect.stats;
        uiInfo("COMPACT_STAGE", {
            stage: "collect",
            ok: collect.ok,
            total: collect.stats ? collect.stats.total : null,
            unsupported: collect.stats ? collect.stats.unsupported : null,
            errors: collect.stats ? collect.stats.errors : null,
            errorDropped: collect.stats ? collect.stats.errorDropped : null,
            aborted: collect.aborted,
            abortReason: collect.abortReason,
            ms: result.timing.collectMs
        }, "global-events.js", "_runCompactTransfer");
        if (collect.aborted) {
            result.aborted = true;
            result.abortReason = collect.abortReason || "stop.requested";
            result.error = collect.error || "aborted";
            return result;
        }
        if (collect.ok) {
            if (options && options.debug) {
                try { uiDebug("COMPACT_SCAN_SUMMARY", { total: collect.stats.total, unsupported: collect.stats.unsupported }, "global-events.js", "_runCompactTransfer"); } catch (e2) {}
                try { uiDebug("COMPACT_TABLE_STATS", collect.stats.tableCounts, "global-events.js", "_runCompactTransfer"); } catch (e3) {}
            }
            var tStringBanks = new Date().getTime();
            var stringResp = _uploadStringBanks(client, baseUrl, banks, options);
            result.timing.stringBanksMs = new Date().getTime() - tStringBanks;
            result.stringBanksOk = stringResp.ok;
            uiInfo("COMPACT_STAGE", {
                stage: "string.banks",
                ok: stringResp.ok,
                totalBanks: stringResp.totalBanks,
                ms: result.timing.stringBanksMs
            }, "global-events.js", "_runCompactTransfer");
            if (stringResp.aborted) {
                result.aborted = true;
                result.abortReason = stringResp.abortReason || "stop.requested";
                result.error = "aborted";
                return result;
            }
            var tObjectUpload = new Date().getTime();
            var uploadResp = _uploadCompactTables(client, baseUrl, declInfo, layerInfo, boardSummary, collect.tables, options);
            result.timing.objectUploadMs = new Date().getTime() - tObjectUpload;
            result.objectUploadOk = uploadResp.ok;
            result.objectBatches = uploadResp.batches;
            result.objectOkBatches = uploadResp.okBatches;
            result.totalRows = uploadResp.totalRows;
            uiInfo("COMPACT_STAGE", {
                stage: "object.upload",
                ok: uploadResp.ok,
                batches: uploadResp.batches,
                okBatches: uploadResp.okBatches,
                totalRows: uploadResp.totalRows,
                ms: result.timing.objectUploadMs
            }, "global-events.js", "_runCompactTransfer");
            if (uploadResp.aborted) {
                result.aborted = true;
                result.abortReason = uploadResp.abortReason || "stop.requested";
                result.error = "aborted";
                return result;
            }
        }

        result.ok = result.declSummaryOk && result.declUploadOk && result.layerStackOk && result.stringBanksOk && result.objectUploadOk;
        return result;
    }

    function _adObjectGet(params) {
        var poolId = params && params.poolId;
        var handle = params && params.handle;
        if ((poolId === undefined || poolId === null) && (handle === undefined || handle === null)) {
            return { ok: false, error: { code: "BAD_INPUT", message: "handle or poolId required" } };
        }
        if (typeof PCBObjectPool === "undefined" || !PCBObjectPool || !PCBObjectPool.getByHandle) {
            return { ok: false, error: { code: "NO_POOL", message: "PCBObjectPool not available" } };
        }
        var wrapper = null;
        if (poolId !== undefined && poolId !== null && PCBObjectPool.getByPoolId) {
            try { wrapper = PCBObjectPool.getByPoolId(poolId); } catch (ePool) {}
        }
        if (!wrapper && handle !== undefined && handle !== null) {
            try { wrapper = PCBObjectPool.getByHandle(handle); } catch (e1) {}
        }
        if (!wrapper) {
            return { ok: false, error: { code: "NOT_IN_POOL", message: "handle not in pool" } };
        }
        if (wrapper.toSpec) {
            try { return { ok: true, data: wrapper.toSpec() }; } catch (e2) {}
        }
        return { ok: false, error: { code: "NO_TOSPEC", message: "wrapper.toSpec not available" } };
    }

    function _isDefined(v) {
        return (v !== null && v !== undefined);
    }

    function _tryObjectGet(wrapper, resolvedBoard) {
        var objGet = null;
        try {
            uiInfo("OBJECT_GET_DIAG", {
                hasWrapper: !!wrapper,
                hasPoolModule: (typeof PCBObjectPool !== "undefined" && PCBObjectPool) ? true : false,
                poolId: wrapper ? wrapper.poolId : null,
                handle: wrapper ? wrapper.handle : null,
                handleType: wrapper ? (typeof wrapper.handle) : null,
                hasNativeObject: wrapper ? (wrapper.nativeObject ? true : false) : false
            }, "global-events.js", "_tryObjectGet");
        } catch (eDiag) {}

        if (wrapper && _isDefined(wrapper.poolId)) {
            objGet = _adObjectGet({ poolId: wrapper.poolId });
            uiInfo("OBJECT_GET_SUMMARY", {
                ok: objGet && objGet.ok,
                code: objGet && objGet.error ? objGet.error.code : null,
                keyType: "poolId",
                poolId: wrapper.poolId
            }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
            return objGet;
        }

        if (wrapper && _isDefined(wrapper.handle) && typeof wrapper.handle === "number") {
            objGet = _adObjectGet({ handle: wrapper.handle });
            uiInfo("OBJECT_GET_SUMMARY", {
                ok: objGet && objGet.ok,
                code: objGet && objGet.error ? objGet.error.code : null,
                keyType: "handle",
                handle: wrapper.handle
            }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
            return objGet;
        }

        objGet = { ok: false, error: { code: "SKIPPED_NO_KEY", message: "no poolId and no numeric handle" } };
        uiWarn("OBJECT_GET_SUMMARY", {
            ok: false,
            code: "SKIPPED_NO_KEY",
            poolId: wrapper ? wrapper.poolId : null,
            handle: wrapper ? wrapper.handle : null,
            handleType: wrapper ? (typeof wrapper.handle) : null
        }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        return objGet;
    }

    function _createWrapperFromBoard(board) {
        // === WRAP_DIAG_ITER ===
        // 目的：确认是否在最早的 guard（board/BoardIterator_Create）处提前 return。
        try {
            uiInfo("WRAP_DIAG_ITER", {
                hasBoard: !!board,
                hasIteratorFn: (!!board && (typeof board.BoardIterator_Create !== "undefined")),
                boardType: (board === null) ? "null" : typeof board
            }, "global-events.js", "_createWrapperFromBoard");
        } catch (eWrapDiagIter) {}

        if (!board) return null;
        if (typeof board.BoardIterator_Create === "undefined") return null;
        function _pickFirstNonNull(a, b, c, d) {
            if (a !== null && a !== undefined) return a;
            if (b !== null && b !== undefined) return b;
            if (c !== null && c !== undefined) return c;
            if (d !== null && d !== undefined) return d;
            return null;
        }
        function _normalizeHandleToNumber(v) {
            var diag = { rawType: typeof v, rawString: null };
            if (v === null || v === undefined) return { ok: false, num: 0, diag: diag };
            if (typeof v === "number") {
                if (v !== 0 && isFinite(v)) return { ok: true, num: v, diag: diag };
                return { ok: false, num: 0, diag: diag };
            }
            try {
                var s = String(v);
                diag.rawString = s;
                var n = (s.indexOf("0x") === 0 || s.indexOf("0X") === 0) ? parseInt(s, 16) : parseInt(s, 10);
                if (!isNaN(n) && n !== 0) return { ok: true, num: n, diag: diag };
            } catch (e1) {}
            try {
                var n2 = Number(v);
                if (!isNaN(n2) && n2 !== 0) return { ok: true, num: n2, diag: diag };
            } catch (e2) {}
            return { ok: false, num: 0, diag: diag };
        }
        function _tryString(obj, prop) {
            try {
                if (!obj) return "";
                var value = obj[prop];
                if (value === undefined || value === null) return "";
                var s = String(value);
                if (!s || s === "undefined") return "";
                return s;
            } catch (e) {
                return "";
            }
        }
        function _readObjectIdInfo(obj) {
            var oid = null;
            var oidStr = "";
            if (!obj) return { oid: null, oidStr: "" };
            try { oid = obj.ObjectId; } catch (eObjId) {}
            oidStr = _tryString(obj, "ObjectIDString");
            if (!oidStr) {
                oidStr = _tryString(obj, "ObjectIdString");
            }
            return { oid: oid, oidStr: oidStr };
        }
        function _iterFirst(it) {
            var p = null;
            try {
                if (typeof it.FirstPCBObject !== "undefined") {
                    p = it.FirstPCBObject();
                } else if (typeof it.First !== "undefined") {
                    try {
                        p = (typeof it.First === "function") ? it.First() : it.First;
                    } catch (eFirstProp) {
                        p = it.First;
                    }
                }
            } catch (eIterFirst) {
                p = null;
            }
            return p || null;
        }
        function _iterNext(it) {
            var p = null;
            try {
                if (typeof it.NextPCBObject !== "undefined") {
                    p = it.NextPCBObject();
                } else if (typeof it.Next !== "undefined") {
                    try {
                        p = (typeof it.Next === "function") ? it.Next() : it.Next;
                    } catch (eNextProp) {
                        p = it.Next;
                    }
                }
            } catch (eIterNext) {
                p = null;
            }
            return p || null;
        }

        var it = null;
        var nativeObj = null;
        var padCandidate = null;
        var firstSeen = null;
        var diag = {
            hasBoard: !!board,
            hasIterator: (typeof board.BoardIterator_Create !== "undefined"),
            hasMkSet: (typeof MkSet === "function"),
            hasTrackConst: (typeof eTrackObject !== "undefined"),
            hasViaConst: (typeof eViaObject !== "undefined"),
            hasPadConst: (typeof ePadObject !== "undefined"),
            hasArcConst: (typeof eArcObject !== "undefined"),
            hasPolyConst: (typeof ePolyObject !== "undefined"),
            hasBoardOutlineConst: (typeof eBoardOutlineObject !== "undefined"),
            hasTrackWrapper: (typeof TrackWrapper !== "undefined"),
            hasViaWrapper: (typeof ViaWrapper !== "undefined"),
            hasPadWrapper: (typeof PadWrapper !== "undefined"),
            hasArcWrapper: (typeof ArcWrapper !== "undefined"),
            hasPolygonWrapper: (typeof PolygonWrapper !== "undefined"),
            hasBoardOutlineWrapper: (typeof BoardOutlineWrapper !== "undefined"),
            hasAllLayers: (typeof AllLayers !== "undefined"),
            hasProcessAll: (typeof eProcessAll !== "undefined"),
            trackConst: (typeof eTrackObject !== "undefined") ? eTrackObject : null,
            viaConst: (typeof eViaObject !== "undefined") ? eViaObject : null,
            padConst: (typeof ePadObject !== "undefined") ? ePadObject : null,
            arcConst: (typeof eArcObject !== "undefined") ? eArcObject : null,
            polyConst: (typeof ePolyObject !== "undefined") ? ePolyObject : null,
            boardOutlineConst: (typeof eBoardOutlineObject !== "undefined") ? eBoardOutlineObject : null,
            loopCount: 0,
            padCandidateUsed: false,
            fallbackTrack: false,
            firstSeenFallback: false,
            boardOutlineFallback: false
        };
        try {
            it = board.BoardIterator_Create();
            if (!it) {
                // === WRAP_DIAG_FIRST ===
                // 目的：迭代器都没创建出来时，明确打点。
                try {
                    uiInfo("WRAP_DIAG_FIRST", {
                        hasIterator: false,
                        hasFirstFn: false,
                        gotObj: false
                    }, "global-events.js", "_createWrapperFromBoard");
                } catch (eWrapDiagFirst0) {}
                return null;
            }

            if (typeof it.AddFilter_ObjectSet !== "undefined") {
                if (typeof MkSet === "function") {
                    var setArgs = [];
                    if (typeof eTrackObject !== "undefined") setArgs.push(eTrackObject);
                    if (typeof eViaObject !== "undefined") setArgs.push(eViaObject);
                    if (typeof ePadObject !== "undefined") setArgs.push(ePadObject);
                    if (typeof eArcObject !== "undefined") setArgs.push(eArcObject);
                    if (typeof ePolyObject !== "undefined") setArgs.push(ePolyObject);
                    if (setArgs.length > 0) {
                        it.AddFilter_ObjectSet(MkSet.apply(null, setArgs));
                    }
                } else {
                    // MkSet/常量缺失时跳过对象过滤，直接取第一个对象
                }
            }

            if (typeof it.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                it.AddFilter_LayerSet(AllLayers);
            }
            if (typeof it.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                it.AddFilter_Method(eProcessAll);
            }

            var maxLoop = 50;
            var scanCount = 0;
            var cursor = _iterFirst(it);
            if (cursor && !firstSeen) {
                firstSeen = cursor;
            }
            try {
                uiInfo("WRAP_DIAG_FIRST", {
                    hasIterator: !!it,
                    hasFirstFn: (typeof it.FirstPCBObject !== "undefined" || typeof it.First !== "undefined"),
                    gotObj: !!cursor
                }, "global-events.js", "_createWrapperFromBoard");
            } catch (eWrapDiagFirst1) {}

            if (cursor) {
                try {
                    var firstOidInfo = _readObjectIdInfo(cursor);
                    uiInfo("WRAP_DIAG_OBJID", {
                        hasObjectId: (firstOidInfo.oid !== null && firstOidInfo.oid !== undefined),
                        hasObjectIdString: !!firstOidInfo.oidStr,
                        hasObjectIDString: !!_tryString(cursor, "ObjectIDString"),
                        objectId: firstOidInfo.oid,
                        objectIdString: firstOidInfo.oidStr
                    }, "global-events.js", "_createWrapperFromBoard");
                } catch (eObjDiag) {}
            }

            while (cursor && scanCount < maxLoop) {
                scanCount += 1;
                diag.loopCount = scanCount;

                var oidInfo = _readObjectIdInfo(cursor);
                var oid = oidInfo.oid;
                var oidStr = oidInfo.oidStr;

                if (
                    (typeof eTrackObject !== "undefined" && oid === eTrackObject) ||
                    (typeof eViaObject !== "undefined" && oid === eViaObject) ||
                    (typeof ePadObject !== "undefined" && oid === ePadObject) ||
                    (typeof eArcObject !== "undefined" && oid === eArcObject) ||
                    (typeof ePolyObject !== "undefined" && oid === ePolyObject) ||
                    (typeof eBoardOutlineObject !== "undefined" && oid === eBoardOutlineObject) ||
                    oidStr === "Track" || oidStr === "Via" || oidStr === "Pad" || oidStr === "Arc" || oidStr === "Polygon" || oidStr === "BoardOutline"
                ) {
                    nativeObj = cursor;
                    try {
                        uiInfo("WRAP_DIAG_FOUND", {
                            objectId: oid,
                            objectIdString: oidStr
                        }, "global-events.js", "_createWrapperFromBoard");
                    } catch (eWrapDiagFound1) {}
                    break;
                }

                if (
                    (typeof ePadObject !== "undefined" && oid === ePadObject) ||
                    oidStr === "Pad"
                ) {
                    if (!padCandidate) {
                        padCandidate = cursor;
                    }
                }

                cursor = _iterNext(it);
            }
        } catch (e3) {
            // === WRAP_DIAG_EX ===
            // 目的：异常不再静默吞掉，输出具体错误信息。
            try {
                var ex = {
                    message: (e3 && e3.message) ? String(e3.message) : "",
                    description: (e3 && e3.description) ? String(e3.description) : "",
                    number: (e3 && e3.number !== undefined) ? e3.number : null,
                    toString: (e3) ? String(e3) : ""
                };

                if (typeof uiWarn !== "undefined") {
                    uiWarn("WRAP_DIAG_EX", ex, "global-events.js", "_createWrapperFromBoard");
                } else {
                    uiInfo("WRAP_DIAG_EX", ex, "global-events.js", "_createWrapperFromBoard");
                }
            } catch (eIgnore) {}
            return null;
        } finally {
            try {
                if (it && typeof board.BoardIterator_Destroy !== "undefined") {
                    board.BoardIterator_Destroy(it);
                }
            } catch (e4) {}
        }

        if (!nativeObj && padCandidate) {
            nativeObj = padCandidate;
            diag.padCandidateUsed = true;

            // === WRAP_DIAG_FOUND ===
            // 目的：Track/Via 未命中，最终 fallback 到 Pad 候选时也明确打点。
            try {
                var _padOid = null;
                var _padOidStr = "";
                try { _padOid = nativeObj.ObjectId; } catch (ePadObjId) {}
                try { if (nativeObj.ObjectIDString !== undefined) _padOidStr = String(nativeObj.ObjectIDString); } catch (ePadObjStr) {}
                uiInfo("WRAP_DIAG_FOUND", {
                    objectId: _padOid,
                    objectIdString: _padOidStr || "Pad",
                    padCandidateUsed: true
                }, "global-events.js", "_createWrapperFromBoard");
            } catch (eWrapDiagFound2) {}
        }
        if (!nativeObj && board && board.BoardOutline) {
            nativeObj = board.BoardOutline;
            diag.boardOutlineFallback = true;
            try {
                uiInfo("WRAP_DIAG_FOUND", {
                    objectId: (nativeObj && nativeObj.ObjectId !== undefined) ? nativeObj.ObjectId : null,
                    objectIdString: (nativeObj && nativeObj.ObjectIDString !== undefined) ? String(nativeObj.ObjectIDString) : "BoardOutline",
                    boardOutlineFallback: true
                }, "global-events.js", "_createWrapperFromBoard");
            } catch (eWrapDiagFound2b) {}
        }
        if (!nativeObj && firstSeen) {
            nativeObj = firstSeen;
            diag.firstSeenFallback = true;
            try {
                var firstOidInfo2 = _readObjectIdInfo(firstSeen);
                uiInfo("WRAP_DIAG_FOUND", {
                    objectId: firstOidInfo2.oid,
                    objectIdString: firstOidInfo2.oidStr || "",
                    firstSeenFallback: true
                }, "global-events.js", "_createWrapperFromBoard");
            } catch (eWrapDiagFound3) {}
        }
        if (!nativeObj) return null;

        // 额外诊断：单独验证 I_ObjectAddress 返回值（不依赖 wrapper）
        try {
            function _describeValue(v) {
                var t = typeof v;
                if (v === null) return { type: "null", value: null };
                if (v === undefined) return { type: "undefined", value: null };
                if (t === "number" || t === "string" || t === "boolean") return { type: t, value: v };
                var s = "";
                try { s = String(v); } catch (eDesc) { s = "[unprintable]"; }
                return { type: t, value: s };
            }
            var addrDiag = {
                hasIObjectAddress: (nativeObj.I_ObjectAddress !== undefined && nativeObj.I_ObjectAddress !== null),
                iObjectAddressType: (nativeObj.I_ObjectAddress !== undefined && nativeObj.I_ObjectAddress !== null) ? typeof nativeObj.I_ObjectAddress : ""
            };
            if (addrDiag.hasIObjectAddress) {
                try { addrDiag.iObjectAddressProp = nativeObj.I_ObjectAddress; } catch (eAddrProp) { addrDiag.iObjectAddressPropError = String(eAddrProp); }
                addrDiag.iObjectAddressPropInfo = _describeValue(addrDiag.iObjectAddressProp);
                if (typeof addrDiag.iObjectAddressProp === "function") {
                    try { addrDiag.iObjectAddressPropCall = addrDiag.iObjectAddressProp(); } catch (eAddrPropCall) { addrDiag.iObjectAddressPropCallError = String(eAddrPropCall); }
                    addrDiag.iObjectAddressPropCallInfo = _describeValue(addrDiag.iObjectAddressPropCall);
                }
                if (addrDiag.iObjectAddressType === "function" || addrDiag.iObjectAddressType === "unknown") {
                    try { addrDiag.iObjectAddressCall = nativeObj.I_ObjectAddress(); } catch (eAddrCall) { addrDiag.iObjectAddressCallError = String(eAddrCall); }
                    addrDiag.iObjectAddressCallInfo = _describeValue(addrDiag.iObjectAddressCall);
                }
            }
            try { uiDebug("DEBUG", "I_OBJECTADDRESS_DIAG", addrDiag, "global-events.js", "_createWrapperFromBoard"); } catch (eAddrLog) {}
        } catch (eAddrOuter) {}

        var objectId = null;
        try { objectId = nativeObj.ObjectId; } catch (e5) {}
        diag.objectId = objectId;
        var objectIdString = "";
        try {
            if (nativeObj.ObjectIDString !== undefined) {
                objectIdString = String(nativeObj.ObjectIDString);
            }
        } catch (e6a) {}
        diag.objectIdString = objectIdString;
        var rawAddrFromNative = null;
        var rawAddrFromNativeProp = null;
        var rawAddrFromNativeCall = null;
        var rawAddrType = "";
        var rawAddrPropType = "";
        var rawAddrReadError = "";
        var rawAddrCallError = "";
        var rawAddrError = "";
        try {
            if (nativeObj.I_ObjectAddress !== undefined && nativeObj.I_ObjectAddress !== null) {
                rawAddrType = typeof nativeObj.I_ObjectAddress;
                // 先尝试当作属性读
                try { rawAddrFromNativeProp = nativeObj.I_ObjectAddress; } catch (eAddr1) { rawAddrReadError = String(eAddr1); }
                rawAddrPropType = (rawAddrFromNativeProp !== null && rawAddrFromNativeProp !== undefined) ? typeof rawAddrFromNativeProp : "";
                if (rawAddrPropType === "function") {
                    try { rawAddrFromNativeCall = rawAddrFromNativeProp(); } catch (eAddr2) { rawAddrCallError = String(eAddr2); }
                    if (rawAddrFromNativeCall !== null && rawAddrFromNativeCall !== undefined && rawAddrFromNativeCall !== 0) {
                        rawAddrFromNative = rawAddrFromNativeCall;
                    }
                } else if (rawAddrFromNativeProp !== null && rawAddrFromNativeProp !== undefined && rawAddrFromNativeProp !== 0) {
                    rawAddrFromNative = rawAddrFromNativeProp;
                } else if (rawAddrType === "function" || rawAddrType === "unknown") {
                    try { rawAddrFromNativeCall = nativeObj.I_ObjectAddress(); } catch (eAddr3) { rawAddrCallError = String(eAddr3); }
                    if (rawAddrFromNativeCall !== null && rawAddrFromNativeCall !== undefined && rawAddrFromNativeCall !== 0) {
                        rawAddrFromNative = rawAddrFromNativeCall;
                    }
                }
            } else if (nativeObj.ObjectAddress !== undefined && nativeObj.ObjectAddress !== null) {
                rawAddrType = typeof nativeObj.ObjectAddress;
                rawAddrFromNative = nativeObj.ObjectAddress;
            }
        } catch (e6b) {
            rawAddrError = (e6b && e6b.message) ? String(e6b.message) : String(e6b);
        }
        if (rawAddrFromNative !== null && rawAddrFromNative !== undefined) {
            diag.rawAddrFromNative = rawAddrFromNative;
        }
        if (rawAddrFromNativeProp !== undefined) {
            diag.rawAddrFromNativeProp = rawAddrFromNativeProp;
        }
        if (rawAddrFromNativeCall !== undefined) {
            diag.rawAddrFromNativeCall = rawAddrFromNativeCall;
        }
        if (rawAddrType) {
            diag.rawAddrType = rawAddrType;
        }
        if (rawAddrPropType) {
            diag.rawAddrPropType = rawAddrPropType;
        }
        if (rawAddrReadError) {
            diag.rawAddrReadError = rawAddrReadError;
        }
        if (rawAddrCallError) {
            diag.rawAddrCallError = rawAddrCallError;
        }
        if (rawAddrError) {
            diag.rawAddrError = rawAddrError;
        }

        function _findTrackObject(boardRef) {
            var it2 = null;
            var obj2 = null;
            try {
                it2 = boardRef.BoardIterator_Create();
                if (!it2) return null;
                if (typeof it2.AddFilter_LayerSet !== "undefined" && typeof AllLayers !== "undefined") {
                    it2.AddFilter_LayerSet(AllLayers);
                }
                if (typeof it2.AddFilter_Method !== "undefined" && typeof eProcessAll !== "undefined") {
                    it2.AddFilter_Method(eProcessAll);
                }
                var j = 0;
                for (j = 0; j < 60; j++) {
                    if (!obj2) {
                        if (j === 0) {
                            if (typeof it2.FirstPCBObject !== "undefined") obj2 = it2.FirstPCBObject();
                            else if (typeof it2.First !== "undefined") obj2 = it2.First;
                        } else {
                            if (typeof it2.NextPCBObject !== "undefined") obj2 = it2.NextPCBObject();
                            else if (typeof it2.Next !== "undefined") obj2 = it2.Next;
                        }
                    }
                    if (!obj2) break;
                    var oid2 = null;
                    var oidStr2 = "";
                    try { oid2 = obj2.ObjectId; } catch (eOid2) {}
                    try { if (obj2.ObjectIDString !== undefined) oidStr2 = String(obj2.ObjectIDString); } catch (eOidStr2) {}
                    if ((typeof eTrackObject !== "undefined" && oid2 === eTrackObject) || oidStr2 === "Track") {
                        return obj2;
                    }
                    obj2 = null;
                }
            } catch (eFind) {
                return null;
            } finally {
                try { if (it2 && boardRef && boardRef.BoardIterator_Destroy) boardRef.BoardIterator_Destroy(it2); } catch (eDestroy2) {}
            }
            return null;
        }

        function _createLiteWrapper(nativeObj, type) {
            if (!nativeObj) return null;
            var w = {
                objectType: type || "Unknown",
                nativeObject: nativeObj,
                handle: null,
                address: null,
                toSpec: function() {
                    var obj = nativeObj;
                    var t = type;
                    if (!t) {
                        try {
                            if (obj.ObjectIDString !== undefined) t = String(obj.ObjectIDString);
                        } catch (e0) {}
                    }
                    t = t || "Unknown";
                    if (t === "Track") {
                        var x1 = null, y1 = null, x2 = null, y2 = null, width = null, layerId = null;
                        try { x1 = obj.X1; } catch (e1) {}
                        try { y1 = obj.Y1; } catch (e2) {}
                        try { x2 = obj.X2; } catch (e3) {}
                        try { y2 = obj.Y2; } catch (e4) {}
                        try { width = obj.Width; } catch (e5) {}
                        try { layerId = obj.Layer; } catch (e6) {}
                        var layerName = null;
                        try {
                            if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
                                layerName = StackMap.getNormalizedLayerName(layerId);
                            }
                        } catch (e7) {}
                        return {
                            schema: "spec/0.1",
                            type: "track",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {
                                common: {
                                    x1: x1, y1: y1, x2: x2, y2: y2,
                                    width: width,
                                    layer: layerName || null,
                                    net: null
                                }
                            }
                        };
                    }
                    if (t === "Via") {
                        var vx = null, vy = null, hole = null, size = null;
                        try { vx = obj.X; } catch (e8) {}
                        try { vy = obj.Y; } catch (e9) {}
                        try { hole = obj.HoleSize; } catch (e10) {}
                        try { size = obj.Size; } catch (e11) {}
                        return {
                            schema: "spec/0.1",
                            type: "via",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {
                                common: {
                                    x: vx, y: vy,
                                    net: null,
                                    hole: { diameter: hole },
                                    size: { xSize: size, ySize: size },
                                    isPlated: null
                                },
                                layerMode: "multilayer",
                                layerSpan: null
                            }
                        };
                    }
                    if (t === "Pad") {
                        var px = null, py = null, sx = null, sy = null, hole2 = null;
                        try { px = obj.X; } catch (e12) {}
                        try { py = obj.Y; } catch (e13) {}
                        try { sx = obj.SizeX; } catch (e14) {}
                        try { sy = obj.SizeY; } catch (e15) {}
                        try { hole2 = obj.HoleSize; } catch (e16) {}
                        return {
                            schema: "spec/0.1",
                            type: "pad",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {
                                common: {
                                    x: px, y: py, net: null,
                                    hole: { diameter: hole2 }
                                },
                                layerMode: "multilayer",
                                layerTable: {
                                    MultiLayer: { shape: null, xSize: sx, ySize: sy }
                                }
                            }
                        };
                    }
                    if (t === "Arc") {
                        var cx = null, cy = null, radius = null, sa = null, ea = null, width2 = null, layerId2 = null;
                        try { cx = obj.XCenter; } catch (e17) {}
                        try { cy = obj.YCenter; } catch (e18) {}
                        try { radius = obj.Radius; } catch (e19) {}
                        try { sa = obj.StartAngle; } catch (e20) {}
                        try { ea = obj.EndAngle; } catch (e21) {}
                        try { width2 = obj.LineWidth; } catch (e22) {}
                        try { layerId2 = obj.Layer; } catch (e23) {}
                        var layerName2 = null;
                        try {
                            if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
                                layerName2 = StackMap.getNormalizedLayerName(layerId2);
                            }
                        } catch (e24) {}
                        return {
                            schema: "spec/0.1",
                            type: "arc",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {
                                common: {
                                    centerX: cx, centerY: cy, radius: radius,
                                    startAngle: sa, endAngle: ea,
                                    width: width2,
                                    layer: layerName2,
                                    net: null
                                }
                            }
                        };
                    }
                    if (t === "Polygon") {
                        var layerId3 = null;
                        try { layerId3 = obj.Layer; } catch (e25) {}
                        var layerName3 = null;
                        try {
                            if (typeof StackMap !== "undefined" && StackMap && StackMap.getNormalizedLayerName) {
                                layerName3 = StackMap.getNormalizedLayerName(layerId3);
                            }
                        } catch (e26) {}
                        return {
                            schema: "spec/0.1",
                            type: "polygon",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {
                                layer: layerName3
                            }
                        };
                    }
                    if (t === "BoardOutline") {
                        return {
                            schema: "spec/0.1",
                            type: "board.outline",
                            handle: w.handle || null,
                            address: w.address || null,
                            payload: {}
                        };
                    }
                    return { schema: "spec/0.1", type: "unknown", payload: {} };
                }
            };

            try {
                var cand = null;
                var cand2 = null;
                var cand3 = null;
                try { cand = nativeObj.I_ObjectAddress; } catch (eAddrProp) {}
                try {
                    var t = typeof nativeObj.I_ObjectAddress;
                    if (t === "function" || t === "unknown") cand2 = nativeObj.I_ObjectAddress();
                } catch (eAddrCall) {}
                try { cand3 = nativeObj.ObjectAddress; } catch (eObjAddr) {}
                var r1 = _normalizeHandleToNumber(cand);
                var r2 = _normalizeHandleToNumber(cand2);
                var r3 = _normalizeHandleToNumber(cand3);
                var best = r1.ok ? r1 : (r2.ok ? r2 : (r3.ok ? r3 : null));
                w._handleDiag = { r1: r1.diag, r2: r2.diag, r3: r3.diag };
                if (best) {
                    w.handle = best.num;
                    w.address = best.num;
                } else {
                    w.handle = null;
                    w.address = null;
                }
            } catch (e17) {}

            return w;
        }

        var wrapper = null;
        var wrapperError = "";
        var wrapperStage = "";
        var wrapperErrDetail = null;
        try {
            if (typeof eTrackObject !== "undefined" && objectId === eTrackObject && typeof TrackWrapper !== "undefined") {
                wrapperStage = "TrackWrapper.create";
                wrapper = TrackWrapper.create ? TrackWrapper.create({ nativeObject: nativeObj }) : TrackWrapper({ nativeObject: nativeObj });
            } else if (typeof eViaObject !== "undefined" && objectId === eViaObject && typeof ViaWrapper !== "undefined") {
                wrapperStage = "ViaWrapper.create";
                wrapper = ViaWrapper.create ? ViaWrapper.create({ nativeObject: nativeObj }) : ViaWrapper({ nativeObject: nativeObj });
            } else if (typeof ePadObject !== "undefined" && objectId === ePadObject && typeof PadWrapper !== "undefined") {
                wrapperStage = "PadWrapper.create";
                wrapper = PadWrapper.create ? PadWrapper.create({ nativeObject: nativeObj }) : PadWrapper({ nativeObject: nativeObj });
            } else if (typeof eArcObject !== "undefined" && objectId === eArcObject && typeof ArcWrapper !== "undefined") {
                wrapperStage = "ArcWrapper.create";
                wrapper = ArcWrapper.create ? ArcWrapper.create({ nativeObject: nativeObj }) : ArcWrapper({ nativeObject: nativeObj });
            } else if (typeof ePolyObject !== "undefined" && objectId === ePolyObject && typeof PolygonWrapper !== "undefined") {
                wrapperStage = "PolygonWrapper.create";
                wrapper = PolygonWrapper.create ? PolygonWrapper.create({ nativeObject: nativeObj }) : PolygonWrapper({ nativeObject: nativeObj });
            } else if (typeof eBoardOutlineObject !== "undefined" && objectId === eBoardOutlineObject && typeof BoardOutlineWrapper !== "undefined") {
                wrapperStage = "BoardOutlineWrapper.create";
                wrapper = BoardOutlineWrapper.create ? BoardOutlineWrapper.create({ nativeObject: nativeObj }) : BoardOutlineWrapper({ nativeObject: nativeObj });
            } else if (objectIdString) {
                if (objectIdString === "Track" && typeof TrackWrapper !== "undefined") {
                    wrapperStage = "TrackWrapper.create:ObjectIDString";
                    wrapper = TrackWrapper.create ? TrackWrapper.create({ nativeObject: nativeObj }) : TrackWrapper({ nativeObject: nativeObj });
                } else if (objectIdString === "Via" && typeof ViaWrapper !== "undefined") {
                    wrapperStage = "ViaWrapper.create:ObjectIDString";
                    wrapper = ViaWrapper.create ? ViaWrapper.create({ nativeObject: nativeObj }) : ViaWrapper({ nativeObject: nativeObj });
                } else if (objectIdString === "Pad" && typeof PadWrapper !== "undefined") {
                    wrapperStage = "PadWrapper.create:ObjectIDString";
                    wrapper = PadWrapper.create ? PadWrapper.create({ nativeObject: nativeObj }) : PadWrapper({ nativeObject: nativeObj });
                } else if (objectIdString === "Arc" && typeof ArcWrapper !== "undefined") {
                    wrapperStage = "ArcWrapper.create:ObjectIDString";
                    wrapper = ArcWrapper.create ? ArcWrapper.create({ nativeObject: nativeObj }) : ArcWrapper({ nativeObject: nativeObj });
                } else if (objectIdString === "Polygon" && typeof PolygonWrapper !== "undefined") {
                    wrapperStage = "PolygonWrapper.create:ObjectIDString";
                    wrapper = PolygonWrapper.create ? PolygonWrapper.create({ nativeObject: nativeObj }) : PolygonWrapper({ nativeObject: nativeObj });
                } else if (objectIdString === "BoardOutline" && typeof BoardOutlineWrapper !== "undefined") {
                    wrapperStage = "BoardOutlineWrapper.create:ObjectIDString";
                    wrapper = BoardOutlineWrapper.create ? BoardOutlineWrapper.create({ nativeObject: nativeObj }) : BoardOutlineWrapper({ nativeObject: nativeObj });
                }
            } else if (typeof PCBObjectFactory !== "undefined" && PCBObjectFactory && PCBObjectFactory.createWrapper) {
                wrapperStage = "PCBObjectFactory.createWrapper";
                wrapper = PCBObjectFactory.createWrapper(nativeObj, {});
            }
        } catch (e6) {
            wrapperError = e6 && e6.message ? String(e6.message) : String(e6);
            wrapperErrDetail = {
                message: wrapperError,
                description: (e6 && e6.description) ? String(e6.description) : "",
                number: (e6 && e6.number !== undefined) ? e6.number : null
            };
        }

        if (!wrapper && wrapperError && board) {
            var trackObj = _findTrackObject(board);
            if (trackObj && typeof TrackWrapper !== "undefined") {
                try {
                    diag.fallbackTrack = true;
                    wrapperStage = "TrackWrapper.create:fallback";
                    wrapper = TrackWrapper.create ? TrackWrapper.create({ nativeObject: trackObj }) : TrackWrapper({ nativeObject: trackObj });
                    wrapperError = "";
                    wrapperErrDetail = null;
                } catch (e7f) {
                    wrapperError = e7f && e7f.message ? String(e7f.message) : String(e7f);
                    wrapperErrDetail = {
                        message: wrapperError,
                        description: (e7f && e7f.description) ? String(e7f.description) : "",
                        number: (e7f && e7f.number !== undefined) ? e7f.number : null
                    };
                }
            }
        }

        if (!wrapper && nativeObj) {
            var tLite = objectIdString || null;
            if (typeof eTrackObject !== "undefined" && objectId === eTrackObject) tLite = "Track";
            if (typeof eViaObject !== "undefined" && objectId === eViaObject) tLite = "Via";
            if (typeof ePadObject !== "undefined" && objectId === ePadObject) tLite = "Pad";
            if (typeof eArcObject !== "undefined" && objectId === eArcObject) tLite = "Arc";
            if (typeof ePolyObject !== "undefined" && objectId === ePolyObject) tLite = "Polygon";
            if (typeof eBoardOutlineObject !== "undefined" && objectId === eBoardOutlineObject) tLite = "BoardOutline";
            wrapper = _createLiteWrapper(nativeObj, tLite);
            if (wrapper) {
                diag.liteWrapper = true;
            }
        }
        if (!wrapper && nativeObj) {
            // 兜底：仍然创建一个未知类型的 lite wrapper，并用原生对象作为 handle
            wrapper = _createLiteWrapper(nativeObj, objectIdString || "Unknown");
            if (wrapper) {
                diag.liteWrapper = true;
                diag.fallbackUnknown = true;
            }
        }

        if (wrapper) {
            if (wrapper.initFromNative) {
                try { wrapper.initFromNative(nativeObj); } catch (e7b) {}
            }
            if (!wrapper.handle && !wrapper.address && nativeObj) {
                var addr = null;
                try {
                    if (nativeObj.I_ObjectAddress !== undefined && nativeObj.I_ObjectAddress !== null) {
                        var tAddr = typeof nativeObj.I_ObjectAddress;
                        try { addr = nativeObj.I_ObjectAddress; } catch (e7a1) {}
                        if (addr === null || addr === undefined || addr === 0) {
                            if (tAddr === "function" || tAddr === "unknown") {
                                addr = nativeObj.I_ObjectAddress();
                            }
                        }
                    }
                } catch (e7a) {}
                if (addr !== null && addr !== undefined) {
                    wrapper.handle = addr;
                    wrapper.address = addr;
                }
            }
            if (!wrapper.handle && !wrapper.address && rawAddrFromNative !== null && rawAddrFromNative !== undefined && rawAddrFromNative !== 0) {
                wrapper.handle = rawAddrFromNative;
                wrapper.address = rawAddrFromNative;
            }
            if (!wrapper.handle && !wrapper.address && nativeObj) {
                wrapper.handle = nativeObj;
                wrapper.address = nativeObj;
            }
            if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
                try { PCBObjectPool.register(wrapper); } catch (e7) {}
            }
        }

        diag.wrapperType = wrapper && wrapper.objectType ? wrapper.objectType : (wrapper ? "unknown" : "none");
        diag.wrapperHandle = wrapper ? (wrapper.handle || wrapper.address || null) : null;
        if (wrapper && wrapper._rawAddr !== undefined) {
            diag.wrapperRawAddr = wrapper._rawAddr;
        }
        if (wrapperError) {
            diag.wrapperError = wrapperError;
            diag.wrapperStage = wrapperStage;
            if (wrapperErrDetail) {
                diag.wrapperErrorDetail = wrapperErrDetail;
            }
        }
        try { uiInfo("OBJECT_GET_DIAG", diag, "global-events.js", "_createWrapperFromBoard"); } catch (e8) {}
        try {
            if (typeof ShowMessage === "function") {
                var msg = "OBJ_DIAG type=" + (diag.wrapperType || "none") +
                    " handle=" + (diag.wrapperHandle === null ? "null" : (diag.wrapperHandle === undefined ? "undef" : typeof diag.wrapperHandle)) +
                    " rawType=" + (diag.rawAddrType || "") +
                    " propType=" + (diag.rawAddrPropType || "") +
                    " objId=" + (diag.objectIdString || diag.objectId || "");
                ShowMessage(msg);
            }
        } catch (e8a) {}

        try {
            if (wrapper) {
                if (typeof PCBObjectPool !== "undefined" && PCBObjectPool && PCBObjectPool.register) {
                    if (wrapper.poolId === null || wrapper.poolId === undefined) {
                        PCBObjectPool.register(wrapper);
                    }
                } else {
                    uiWarn("OBJECT_POOL_MISSING", { hasPool: false }, "global-events.js", "_createWrapperFromBoard");
                }
            }
        } catch (eReg) {
            uiWarn("OBJECT_POOL_REGISTER_FAIL", { msg: String(eReg) }, "global-events.js", "_createWrapperFromBoard");
        }

        return wrapper || null;
    }

    var finalSummary = null;
    try {
        var client = null;
        if (typeof HTTPClientModule !== "undefined") {
            client = HTTPClientModule;
        } else if (typeof HTTP客户端 !== "undefined") {
            client = HTTP客户端;
        }

        if (!client) {
            showErrorInUI("测试_AD_Spec_0_1_一键验证", new Error("HTTPClientModule 未加载"), {
                HTTPClientModule: typeof HTTPClientModule,
                HTTP客户端: typeof HTTP客户端
            });
            return;
        }

        if (client.setBaseUrl) {
            try { client.setBaseUrl(baseUrl); } catch (e7) {}
        }

        var pingOk = false;
        if (client.ping) {
            pingOk = client.ping(baseUrl);
        }
        uiInfo("PING", { ok: pingOk, baseUrl: baseUrl }, "global-events.js", "测试_AD_Spec_0_1_一键验证");

        var r1 = null;
        var r2 = null;
        var r3 = null;
        if (client.command) {
            r1 = client.command("mock.echo", { from: "AD" });
            r2 = client.command("mock.board.summary", { from: "AD" });
            r3 = client.command("mock.unknown", { from: "AD" });
        } else if (client.sendCommand) {
            r1 = client.sendCommand(baseUrl, "mock.echo", { from: "AD" });
            r2 = client.sendCommand(baseUrl, "mock.board.summary", { from: "AD" });
            r3 = client.sendCommand(baseUrl, "mock.unknown", { from: "AD" });
        }

        uiInfo("COMMAND", {
            echoOk: r1 && r1.ok,
            summaryOk: r2 && r2.ok,
            unknownOkFalse: r3 && (r3.ok === false)
        }, "global-events.js", "测试_AD_Spec_0_1_一键验证");

        var boardSummary = _getBoardSummary();
        uiInfo("BOARD_SUMMARY", boardSummary, "global-events.js", "测试_AD_Spec_0_1_一键验证");

        var resolved = _resolveBoardRef();
        var compactResult = null;
        var opt = options || {};
        try {
            compactResult = _runCompactTransfer(resolved.board, boardSummary, client, baseUrl, {
                batchSize: opt.batchSize || 10000,
                stringBatchSize: opt.stringBatchSize || 5000,
                progressStep: opt.progressStep || 5000,
                yieldStep: opt.yieldStep || 5000,
                perfSample: (opt.perfSample === 0) ? 0 : (opt.perfSample || 100),
                perfTopLimit: opt.perfTopLimit || 8,
                perfTypes: (opt.perfTypes === true) ? true : false,
                format: opt.format || specAllFormat,
                shouldAbort: abortCheck,
                debug: (opt.debug === false) ? false : true,
                forceDecl: (opt.forceDecl === false) ? false : true,
                forceStack: (opt.forceStack === false) ? false : true,
                reportErrors: (opt.reportErrors === false) ? false : true,
                errorBatchSize: opt.errorBatchSize || 100,
                errorMaxBatches: opt.errorMaxBatches || 50,
                errorVerbose: opt.errorVerbose ? true : false
            });
            uiInfo("COMPACT_SUMMARY", {
                ok: compactResult && compactResult.ok,
                declSummaryOk: compactResult && compactResult.declSummaryOk,
                declUploadOk: compactResult && compactResult.declUploadOk,
                layerStackOk: compactResult && compactResult.layerStackOk,
                stringBanksOk: compactResult && compactResult.stringBanksOk,
                objectUploadOk: compactResult && compactResult.objectUploadOk,
                objectBatches: compactResult && compactResult.objectBatches,
                objectOkBatches: compactResult && compactResult.objectOkBatches,
                totalRows: compactResult && compactResult.totalRows,
                totalObjects: compactResult && compactResult.stats ? compactResult.stats.total : null,
                unsupported: compactResult && compactResult.stats ? compactResult.stats.unsupported : null,
                unsupportedTypes: compactResult && compactResult.stats ? compactResult.stats.unsupportedTypes : null,
                errors: compactResult && compactResult.stats ? compactResult.stats.errors : null,
                errorDropped: compactResult && compactResult.stats ? compactResult.stats.errorDropped : null,
                aborted: compactResult && compactResult.aborted,
                abortReason: compactResult && compactResult.abortReason,
                format: compactResult && compactResult.format,
                declId: compactResult && compactResult.declId,
                declHash: compactResult && compactResult.declHash,
                stackSig: compactResult && compactResult.stackSig,
                timing: compactResult && compactResult.timing
            }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        } catch (eObjIdx) {
            compactResult = { ok: false, error: String(eObjIdx), format: opt.format || specAllFormat };
            uiWarn("COMPACT_SUMMARY", { ok: false, reason: compactResult.error }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        }
        var wrapper = _createWrapperFromBoard(resolved.board);
        var objGet = _tryObjectGet(wrapper, resolved.board);

        var reportId = "ad.board.summary-" + String(new Date().getTime());
        var report = {
            schema: "spec/0.1",
            type: "ad.board.summary",
            id: reportId,
            payload: boardSummary,
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };

        var uploadOk = false;
        if (client.request) {
            var body = _safeJson(report);
            var resp = client.request("POST", baseUrl + "/api/upload-report", body, { "Content-Type": "application/json" });
            uploadOk = resp && resp.ok;
            uiInfo("UPLOAD_REPORT", { ok: uploadOk, status: resp ? resp.status : 0 }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        } else {
            try { if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) { memLog.Lines.Add(_safeJson(report)); } } catch (e8) {}
            uiWarn("UPLOAD_REPORT", { ok: false, reason: "request not available" }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        }

        finalSummary = {
            echoOk: r1 && r1.ok,
            summaryOk: r2 && r2.ok,
            unknownOkFalse: r3 && (r3.ok === false),
            hasBoardSummary: !!boardSummary,
            uploadOk: uploadOk,
            compactOk: compactResult && compactResult.ok,
            declSummaryOk: compactResult && compactResult.declSummaryOk,
            declUploadOk: compactResult && compactResult.declUploadOk,
            layerStackOk: compactResult && compactResult.layerStackOk,
            stringBanksOk: compactResult && compactResult.stringBanksOk,
            uploadObjectsOk: compactResult && compactResult.objectUploadOk,
            uploadObjectsBatches: compactResult && compactResult.objectBatches,
            uploadObjectsOkBatches: compactResult && compactResult.objectOkBatches,
            uploadObjectsRows: compactResult && compactResult.totalRows,
            compactErrors: compactResult && compactResult.stats ? compactResult.stats.errors : null,
            compactErrorDropped: compactResult && compactResult.stats ? compactResult.stats.errorDropped : null,
            compactAborted: compactResult && compactResult.aborted,
            compactAbortReason: compactResult && compactResult.abortReason,
            objectGetOk: objGet && objGet.ok
        };
        uiInfo("FINAL_SUMMARY", finalSummary, "global-events.js", "测试_AD_Spec_0_1_一键验证");
        if (opt.uploadUiLog === false) {
            // skip
        } else {
            try {
                _uploadUILog(client, baseUrl, { maxLines: opt.logMaxLines || 2000 });
            } catch (eLog) {}
        }
        return finalSummary;
    } catch (error) {
        showErrorInUI("测试_AD_Spec_0_1_一键验证", error, {
            baseUrl: baseUrl,
            timestamp: new Date().toLocaleString()
        });
        finalSummary = { ok: false, error: String(error) };
        return finalSummary;
    } finally {
        if (useRunControl && typeof _endAdRun === "function") _endAdRun(runId);
    }
}

/**
 * Spec v0.1 任务轮询入口
 * 在 AD 中直接运行：测试_AD_任务轮询()
 */
function 测试_AD_任务轮询() {
    var baseUrl = "http://127.0.0.1:8080";
    var runId = 0;
    if (typeof _beginAdRun === "function") {
        runId = _beginAdRun("TaskPoll");
    }
    var pollSummary = {
        ok: false,
        reason: "",
        polls: 0,
        tasks: 0,
        startedAt: new Date().getTime(),
        stoppedAt: 0
    };
    var client = null;
    var abortCheck = function (stage, total, errors) {
        if (typeof _shouldAdStop !== "function") return false;
        return _shouldAdStop(runId, stage) ? "stop.requested" : false;
    };

    function _safeJson(obj) {
        try {
            if (typeof JsonUtil !== "undefined" && JsonUtil && JsonUtil.stringify) return JsonUtil.stringify(obj);
        } catch (e0) {}
        try { if (typeof JSON !== "undefined" && JSON && JSON.stringify) return JSON.stringify(obj); } catch (e1) {}
        return "";
    }

    function _postJson(url, obj) {
        if (!client || !client.request || typeof client.request !== "function") {
            return { ok: false, status: 0, error: "request not available", json: null };
        }
        var body = _safeJson(obj);
        try {
            return client.request("POST", url, body, { "Content-Type": "application/json" });
        } catch (eReq) {
            return { ok: false, status: 0, error: String(eReq), json: null };
        }
    }

    function _pollNext(ctx) {
        var reqObj = {
            clientId: ctx.clientId,
            sessionId: ctx.sessionId,
            lastTaskId: ctx.lastTaskId || "",
            wants: ["ad.tasks"]
        };
        var resp = _postJson(baseUrl + "/api/task/poll", reqObj);
        if (!resp || !resp.ok) {
            return {
                ok: false,
                status: resp ? resp.status : 0,
                error: resp ? (resp.error || resp.parseError) : "request failed"
            };
        }
        if (!resp.json) {
            return {
                ok: false,
                status: resp.status,
                error: resp.parseError || "json missing"
            };
        }
        var action = resp.json.action || resp.json.state || "";
        if (resp.json.sessionId && !ctx.sessionId) ctx.sessionId = resp.json.sessionId;
        if (resp.json.pollIntervalMs) ctx.pollIntervalMs = resp.json.pollIntervalMs;
        return {
            ok: true,
            action: action,
            task: resp.json.task || null,
            stop: resp.json.stop === true,
            pollIntervalMs: resp.json.pollIntervalMs || 0,
            raw: resp.json
        };
    }

    function _executeTask(task, ctx) {
        var result = {
            ok: false,
            error: "",
            data: null,
            aborted: false,
            abortReason: "",
            startedAt: new Date().getTime(),
            finishedAt: 0,
            durationMs: 0
        };

        if (!task) {
            result.error = "task missing";
            result.finishedAt = new Date().getTime();
            result.durationMs = result.finishedAt - result.startedAt;
            return result;
        }

        var stop = abortCheck("task.before", 0, 0);
        if (stop) {
            result.aborted = true;
            result.abortReason = stop;
            result.finishedAt = new Date().getTime();
            result.durationMs = result.finishedAt - result.startedAt;
            return result;
        }

        var taskType = task.type || task.action || task.cmd || task.name || "";
        var taskParams = task.params || {};

        try {
            if (taskType === "spec0.1" || taskType === "run.spec0.1" || taskType === "spec-0.1" || taskType === "spec0_1") {
                var specOpt = { skipRunControl: true, shouldAbort: abortCheck };
                var k;
                for (k in taskParams) {
                    if (taskParams.hasOwnProperty(k)) specOpt[k] = taskParams[k];
                }
                var summary = 测试_AD_Spec_0_1_一键验证(specOpt);
                result.ok = summary ? (summary.compactOk !== false && summary.uploadOk !== false && summary.echoOk !== false) : false;
                result.data = summary || null;
                if (summary && summary.compactAborted) {
                    result.aborted = true;
                    result.abortReason = summary.compactAbortReason || "aborted";
                }
            } else if (taskType === "ping") {
                var pong = false;
                if (client && client.ping) {
                    pong = client.ping(baseUrl);
                }
                result.ok = pong ? true : false;
                result.data = { ok: pong };
            } else if (taskType === "command") {
                var cmdName = task.cmd || task.name || "";
                if (!cmdName) {
                    result.ok = false;
                    result.error = "command missing";
                } else if (client && client.sendCommand) {
                    var cmdResp = client.sendCommand(baseUrl, cmdName, taskParams || {});
                    result.ok = cmdResp && cmdResp.ok;
                    result.data = cmdResp || null;
                } else {
                    result.ok = false;
                    result.error = "sendCommand unavailable";
                }
            } else {
                result.ok = false;
                result.error = "unknown task: " + taskType;
            }
        } catch (eTask) {
            result.ok = false;
            result.error = String(eTask);
        }

        result.finishedAt = new Date().getTime();
        result.durationMs = result.finishedAt - result.startedAt;
        return result;
    }

    function _reportTask(ctx, task, result) {
        var payload = {
            clientId: ctx.clientId,
            sessionId: ctx.sessionId,
            taskId: task && task.id ? task.id : "",
            taskType: task && (task.type || task.action || task.cmd || task.name) ? (task.type || task.action || task.cmd || task.name) : "",
            ok: result && result.ok ? true : false,
            error: result && result.error ? String(result.error) : "",
            aborted: result && result.aborted ? true : false,
            abortReason: result && result.abortReason ? String(result.abortReason) : "",
            startedAt: result && result.startedAt ? result.startedAt : 0,
            finishedAt: result && result.finishedAt ? result.finishedAt : 0,
            durationMs: result && result.durationMs ? result.durationMs : 0,
            result: result && result.data ? result.data : null
        };
        var env = {
            schema: "spec/0.1",
            type: "ad.task.report",
            id: "ad.task.report-" + String(new Date().getTime()) + "-" + String(payload.taskId || ""),
            payload: payload,
            meta: {
                ts: new Date().getTime(),
                source: "AD",
                rev: 0.1,
                detail: { schema: "spec/0.1", build: "ad21-js" }
            }
        };
        var resp = _postJson(baseUrl + "/api/task/report", env);
        uiInfo("TASK_REPORT", {
            ok: resp && resp.ok,
            status: resp ? resp.status : 0,
            taskId: payload.taskId,
            taskType: payload.taskType
        }, "global-events.js", "测试_AD_任务轮询");
        return { ok: resp && resp.ok, stop: resp && resp.json && resp.json.stop === true };
    }

    try {
        if (typeof HTTPClientModule !== "undefined") {
            client = HTTPClientModule;
        } else if (typeof HTTP客户端 !== "undefined") {
            client = HTTP客户端;
        }

        if (!client) {
            showErrorInUI("测试_AD_任务轮询", new Error("HTTPClientModule 未加载"), {
                HTTPClientModule: typeof HTTPClientModule,
                HTTP客户端: typeof HTTP客户端
            });
            pollSummary.reason = "client missing";
            return pollSummary;
        }

        if (client.setBaseUrl) {
            try { client.setBaseUrl(baseUrl); } catch (e7) {}
        }

        var ctx = {
            clientId: "ad-" + String(new Date().getTime()) + "-" + String(Math.floor(Math.random() * 100000)),
            sessionId: "",
            pollIntervalMs: 1000,
            lastPollAt: 0,
            lastTaskId: ""
        };

        uiInfo("TASK_POLL_BEGIN", {
            clientId: ctx.clientId,
            baseUrl: baseUrl
        }, "global-events.js", "测试_AD_任务轮询");

        while (true) {
            if (typeof _shouldAdStop === "function" && _shouldAdStop(runId, "poll.loop")) {
                pollSummary.reason = "stop.requested";
                break;
            }

            var now = new Date().getTime();
            if (ctx.lastPollAt && (now - ctx.lastPollAt < ctx.pollIntervalMs)) {
                _processMessagesSafe();
                continue;
            }
            ctx.lastPollAt = now;
            pollSummary.polls++;

            var pollResp = _pollNext(ctx);
            if (!pollResp.ok) {
                uiWarn("TASK_POLL_FAIL", {
                    status: pollResp.status || 0,
                    error: pollResp.error || "poll failed"
                }, "global-events.js", "测试_AD_任务轮询");
                _processMessagesSafe();
                continue;
            }

            if (pollResp.pollIntervalMs) ctx.pollIntervalMs = pollResp.pollIntervalMs;
            if (pollResp.action === "stop" || pollResp.stop) {
                pollSummary.reason = "server.stop";
                break;
            }
            if (pollResp.action === "wait" || !pollResp.task) {
                _processMessagesSafe();
                continue;
            }

            var task = pollResp.task;
            pollSummary.tasks++;
            uiInfo("TASK_RECEIVED", {
                taskId: task && task.id ? task.id : "",
                taskType: task && (task.type || task.action || task.cmd || task.name) ? (task.type || task.action || task.cmd || task.name) : ""
            }, "global-events.js", "测试_AD_任务轮询");

            var taskResult = _executeTask(task, ctx);
            ctx.lastTaskId = task && task.id ? task.id : ctx.lastTaskId;
            var reportResp = _reportTask(ctx, task, taskResult);
            if (reportResp && reportResp.stop) {
                pollSummary.reason = "server.stop";
                break;
            }
            if (taskResult && taskResult.aborted) {
                pollSummary.reason = taskResult.abortReason || "aborted";
                break;
            }
        }

        pollSummary.ok = true;
    } catch (ePoll) {
        pollSummary.ok = false;
        pollSummary.reason = String(ePoll);
        showErrorInUI("测试_AD_任务轮询", ePoll, {
            baseUrl: baseUrl,
            timestamp: new Date().toLocaleString()
        });
    } finally {
        pollSummary.stoppedAt = new Date().getTime();
        uiInfo("TASK_POLL_END", pollSummary, "global-events.js", "测试_AD_任务轮询");
        if (typeof _endAdRun === "function") _endAdRun(runId);
    }
    return pollSummary;
}

/**
 * UI调试系统 - 模块状态检查
 */
function debugModuleStatus() {
    uiInfo("=== 开始模块状态检查 ===", null, "debug-tools", "debugModuleStatus");
    
    // 检查LoggerModule - 直接检查全局变量
    var loggerModule = null;
    if (typeof LoggerModule !== "undefined") {
        loggerModule = LoggerModule;
        uiInfo("LoggerModule: 可用", {type: typeof LoggerModule}, "debug-tools", "debugModuleStatus");
    } else {
        uiError("LoggerModule: 不可用", {global: typeof LoggerModule}, "debug-tools", "debugModuleStatus");
    }
    
    // 检查LoggerModuleIndex - 直接检查全局变量
    var loggerIndex = null;
    if (typeof LoggerModuleIndex !== "undefined") {
        loggerIndex = LoggerModuleIndex;
        uiInfo("LoggerModuleIndex: 可用", {type: typeof LoggerModuleIndex}, "debug-tools", "debugModuleStatus");
    } else {
        uiError("LoggerModuleIndex: 不可用", {global: typeof LoggerModuleIndex}, "debug-tools", "debugModuleStatus");
    }
    
    // 检查UILoggerModule - 直接检查全局变量
    var uiLoggerModule = null;
    if (typeof UILoggerModule !== "undefined") {
        uiLoggerModule = UILoggerModule;
        uiInfo("UILoggerModule: 可用", {type: typeof UILoggerModule}, "debug-tools", "debugModuleStatus");
    } else {
        uiError("UILoggerModule: 不可用", {global: typeof UILoggerModule}, "debug-tools", "debugModuleStatus");
    }
    
    // 检查默认实例
    try {
        var defaultLogger = null;
        if (loggerIndex && typeof loggerIndex.getDefaultLogger === "function") {
            defaultLogger = loggerIndex.getDefaultLogger();
            if (defaultLogger) {
                uiInfo("默认Logger实例: 可用", {
                    type: typeof defaultLogger,
                    initialized: defaultLogger.state ? defaultLogger.state.initialized : "unknown"
                }, "debug-tools", "debugModuleStatus");
            } else {
                uiError("默认Logger实例: 不可用", {reason: "getDefaultLogger返回null"}, "debug-tools", "debugModuleStatus");
            }
        } else {
            uiError("获取默认Logger实例失败", {
                loggerIndex: loggerIndex ? "exists" : "null",
                getDefaultLogger: loggerIndex && typeof loggerIndex.getDefaultLogger === "function" ? "exists" : "missing"
            }, "debug-tools", "debugModuleStatus");
        }
    } catch (e) {
        uiError("获取默认Logger实例异常", {error: e.message}, "debug-tools", "debugModuleStatus");
    }
    
    // 检查环境信息
    uiInfo("环境信息", {
        window: typeof window,
        global: typeof global,
        LoggerModule: typeof LoggerModule,
        LoggerModuleIndex: typeof LoggerModuleIndex,
        UILoggerModule: typeof UILoggerModule
    }, "debug-tools", "debugModuleStatus");
    
    uiInfo("=== 模块状态检查完成 ===", null, "debug-tools", "debugModuleStatus");
}

/**
 * UI调试系统 - 函数调用跟踪
 */
function debugFunctionCall(functionName, args, fileName) {
    uiTrace("函数调用: " + functionName, {
        args: args,
        argsCount: args ? args.length : 0
    }, fileName || "unknown", functionName);
}

/**
 * UI调试系统 - 函数返回跟踪
 */
function debugFunctionReturn(functionName, result, fileName) {
    uiTrace("函数返回: " + functionName, {
        result: result,
        resultType: typeof result
    }, fileName || "unknown", functionName);
}

/**
 * UI调试系统 - 函数异常跟踪
 */
function debugFunctionError(functionName, error, fileName) {
    uiError("函数异常: " + functionName, {
        error: error.message,
        stack: error.stack
    }, fileName || "unknown", functionName);
}

// ============================================================
// ObjectCreatorForm DFM事件处理函数
// ============================================================

/**
 * 对象类型选择变化事件 - ObjectCreatorForm
 */
function cmbObjectTypeChange(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleObjectTypeChange(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "cmbObjectTypeChange"
            }, "global-events.js", "cmbObjectTypeChange");
        }
    } catch (error) {
        uiError("对象类型选择变化事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "cmbObjectTypeChange");
    }
}

/**
 * 设为原点按钮点击事件 - ObjectCreatorForm
 */
function btnSetOriginClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleSetOriginClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnSetOriginClick"
            }, "global-events.js", "btnSetOriginClick");
        }
    } catch (error) {
        uiError("设为原点按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnSetOriginClick");
    }
}

/**
 * 验证参数按钮点击事件 - ObjectCreatorForm
 */
function btnValidateClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleValidateClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnValidateClick"
            }, "global-events.js", "btnValidateClick");
        }
    } catch (error) {
        uiError("验证参数按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnValidateClick");
    }
}

/**
 * 创建对象按钮点击事件 - ObjectCreatorForm
 */
function btnCreateClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleCreateClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnCreateClick"
            }, "global-events.js", "btnCreateClick");
        }
    } catch (error) {
        uiError("创建对象按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnCreateClick");
    }
}

/**
 * 在原点创建按钮点击事件 - ObjectCreatorForm
 */
function btnCreateAtOriginClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleCreateAtOriginClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnCreateAtOriginClick"
            }, "global-events.js", "btnCreateAtOriginClick");
        }
    } catch (error) {
        uiError("在原点创建按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnCreateAtOriginClick");
    }
}

/**
 * 重置按钮点击事件 - ObjectCreatorForm
 */
function btnResetClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleResetClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnResetClick"
            }, "global-events.js", "btnResetClick");
        }
    } catch (error) {
        uiError("重置按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnResetClick");
    }
}

/**
 * 组件测试按钮点击事件
 * @description 执行模块可用性检查与运行环境探测
 * @param {Object} Sender 事件发送者
 */
function btnComponentTestClick(Sender) {
    try {
        uiInfo("=== 开始组件测试 ===", { sender: Sender ? "有效" : "无效" }, "global-events.js", "btnComponentTestClick");
        
        if (typeof debugModuleStatus === "function") {
            debugModuleStatus();
        } else {
            uiWarn("debugModuleStatus 不可用", { fn: typeof debugModuleStatus }, "global-events.js", "btnComponentTestClick");
        }
        
        if (typeof 测试_运行环境探测 === "function") {
            测试_运行环境探测();
        } else {
            uiWarn("测试_运行环境探测 不可用", { fn: typeof 测试_运行环境探测 }, "global-events.js", "btnComponentTestClick");
        }
        
        uiInfo("=== 组件测试完成 ===", null, "global-events.js", "btnComponentTestClick");
        
    } catch (error) {
        showErrorInUI("btnComponentTestClick", error, {
            sender: Sender ? "有效" : "无效"
        });
    }
}

/**
 * 最小通信测试（HTTP）按钮点击事件 - ObjectCreatorForm
 */
function btnHttpSmokeTestClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined" && UIEventManager && UIEventManager.handleHttpSmokeTestClick) {
            UIEventManager.handleHttpSmokeTestClick(Sender);
            return;
        }
        
        // fallback：不依赖UIEventManager
        if (typeof 测试_AD_Spec_0_1_一键验证 === "function") {
            测试_AD_Spec_0_1_一键验证();
            return;
        }
        if (typeof 测试_AD_XMLHTTP_最小验证 === "function") {
            测试_AD_XMLHTTP_最小验证();
            return;
        }
        if (typeof 测试_最小通信流程 === "function") {
            测试_最小通信流程();
            return;
        }
        
        uiError("最小通信测试入口不可用", {
            UIEventManager: typeof UIEventManager,
            hasHandler: !!(UIEventManager && UIEventManager.handleHttpSmokeTestClick),
            testFnSpec: typeof 测试_AD_Spec_0_1_一键验证,
            testFn: typeof 测试_AD_XMLHTTP_最小验证,
            testFnLegacy: typeof 测试_最小通信流程
        }, "global-events.js", "btnHttpSmokeTestClick");
        
    } catch (error) {
        try {
            if (typeof UILoggerModule !== "undefined" && UILoggerModule && UILoggerModule.uiError) {
                UILoggerModule.uiError("最小通信测试按钮处理失败", { error: error.message }, "global-events.js", "btnHttpSmokeTestClick");
                return;
            }
        } catch (e1) {}
        
        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
                memLog.Lines.Add("[ERROR] btnHttpSmokeTestClick failed: " + (error && error.message ? error.message : String(error)));
            }
        } catch (e2) {}
    }
}

/**
 * 环境探测按钮点击事件 - MainForm
 */
function btnEnvironmentProbeClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined" && UIEventManager && UIEventManager.handleEnvironmentProbeClick) {
            UIEventManager.handleEnvironmentProbeClick(Sender);
            return;
        }

        // fallback：不依赖UIEventManager
        if (typeof 测试_运行环境探测 === "function") {
            测试_运行环境探测();
            return;
        }

        uiError("环境探测入口不可用", {
            UIEventManager: typeof UIEventManager,
            hasHandler: !!(UIEventManager && UIEventManager.handleEnvironmentProbeClick),
            testFn: typeof 测试_运行环境探测
        }, "global-events.js", "btnEnvironmentProbeClick");

    } catch (error) {
        try {
            if (typeof UILoggerModule !== "undefined" && UILoggerModule && UILoggerModule.uiError) {
                UILoggerModule.uiError("环境探测按钮处理失败", { error: error.message }, "global-events.js", "btnEnvironmentProbeClick");
                return;
            }
        } catch (e1) {}

        try {
            if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
                memLog.Lines.Add("[ERROR] btnEnvironmentProbeClick failed: " + (error && error.message ? error.message : String(error)));
            }
        } catch (e2) {}
    }
}

/**
 * 取消按钮点击事件 - ObjectCreatorForm
 */
function btnCancelClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleCancelClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "btnCancelClick"
            }, "global-events.js", "btnCancelClick");
        }
    } catch (error) {
        uiError("取消按钮点击事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "btnCancelClick");
    }
}

/**
 * 网格对齐复选框变化事件 - ObjectCreatorForm
 */
function chkGridSnapClick(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleGridSnapClick(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "chkGridSnapClick"
            }, "global-events.js", "chkGridSnapClick");
        }
    } catch (error) {
        uiError("网格对齐复选框变化事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "chkGridSnapClick");
    }
}

/**
 * 网格大小编辑框变化事件 - ObjectCreatorForm
 */
function edtGridSizeChange(Sender) {
    try {
        if (typeof UIEventManager !== "undefined") {
            UIEventManager.handleGridSizeChange(Sender);
        } else {
            uiError("UIEventManager不可用", {
                event: "edtGridSizeChange"
            }, "global-events.js", "edtGridSizeChange");
        }
    } catch (error) {
        uiError("网格大小编辑框变化事件处理失败", {
            error: error.message,
            sender: Sender ? "有效" : "无效"
        }, "global-events.js", "edtGridSizeChange");
    }
}

/**
 * 全局清理函数（可选）
 * @description 用于清理全局事件系统
 */
function cleanupGlobalEvents() {
    try {
        if (typeof memLog !== "undefined" && memLog && memLog.Lines) {
            memLog.Lines.Add("=== 全局事件系统清理 ===");
            memLog.Lines.Add("时间: " + new Date().toLocaleString());
            memLog.Lines.Add("状态: 完成");
            memLog.Lines.Add("======================");
        }
    } catch (e) {
        // 静默处理清理错误
    }
}




