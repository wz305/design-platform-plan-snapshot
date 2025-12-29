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
function 测试_AD_Spec_0_1_一键验证() {
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
        var objectIndexResult = null;
        var uploadObjectsOk = false;
        var uploadObjectsBatches = 0;
        var uploadObjectsOkBatches = 0;
        var objectIndexBatchSize = 5000;
        var objectIndexIncludeBounds = false;
        var objectIndexIncludeLayerName = true;
        try {
            objectIndexResult = _streamObjectIndexUpload(resolved.board, {
                client: client,
                baseUrl: baseUrl,
                boardName: boardSummary ? boardSummary.name : "",
                batchSize: objectIndexBatchSize,
                includeBounds: objectIndexIncludeBounds,
                includeLayerName: objectIndexIncludeLayerName
            });
        } catch (eObjIdx) {
            objectIndexResult = { ok: false, error: String(eObjIdx) };
        }
        if (objectIndexResult && objectIndexResult.ok) {
            uploadObjectsOk = objectIndexResult.uploadOk;
            uploadObjectsBatches = objectIndexResult.uploadBatches || 0;
            uploadObjectsOkBatches = objectIndexResult.uploadOkBatches || 0;
        } else {
            uiWarn("UPLOAD_OBJECTS", { ok: false, reason: objectIndexResult ? objectIndexResult.error : "unknown" }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
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

        uiInfo("FINAL_SUMMARY", {
            echoOk: r1 && r1.ok,
            summaryOk: r2 && r2.ok,
            unknownOkFalse: r3 && (r3.ok === false),
            hasBoardSummary: !!boardSummary,
            uploadOk: uploadOk,
            objectIndexOk: objectIndexResult && objectIndexResult.ok,
            uploadObjectsOk: uploadObjectsOk,
            uploadObjectsBatches: uploadObjectsBatches,
            uploadObjectsOkBatches: uploadObjectsOkBatches,
            objectGetOk: objGet && objGet.ok
        }, "global-events.js", "测试_AD_Spec_0_1_一键验证");
    } catch (error) {
        showErrorInUI("测试_AD_Spec_0_1_一键验证", error, {
            baseUrl: baseUrl,
            timestamp: new Date().toLocaleString()
        });
    }
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




