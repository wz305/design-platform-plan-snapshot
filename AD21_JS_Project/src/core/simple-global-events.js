// 简化的全局事件处理函数
// 使用SimpleLogger，符合"创建即初始化"原则

// 错误处理工具函数
function HandleError(error, context) {
    var errorMessage = "";
    
    if (error && error.message) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        errorMessage = "未知错误";
    }
    
    var contextInfo = context || "未知上下文";
    var fullMessage = "错误在 " + contextInfo + ": " + errorMessage;
    
    // 使用SimpleLogger记录错误
    if (typeof SimpleLogError !== "undefined") {
        SimpleLogError(fullMessage);
    } else {
        // 回退到原始方式
        if (typeof ShowMessage !== "undefined") {
            ShowMessage(fullMessage);
        }
    }
}

// 安全执行工具函数
function SafeExecute(func, errorContext, fallbackValue) {
    try {
        return func();
    } catch (error) {
        HandleError(error, errorContext);
        return fallbackValue;
    }
}

// 输出日志按钮事件
function btnOutputLogClick(Sender) {
    SafeExecute(function() {
        // 使用SimpleLogger记录按钮点击
        SimpleLogInfo("用户点击了输出日志按钮");
        
        // 获取当前缓存的日志数量
        var logger = SimpleLoggerIndex.getDefault();
        var cacheCount = logger.getCacheCount();
        var totalCount = logger.getTotalCount();
        
        SimpleLogInfo("当前缓存日志数量: " + cacheCount);
        SimpleLogInfo("总计日志数量: " + totalCount);
        
        // 手动刷新日志
        logger.flush();
        
        SimpleLogInfo("日志已输出到控制台");
        
        // 显示用户友好的消息
        if (typeof ShowMessage !== "undefined") {
            ShowMessage("日志已输出！共 " + totalCount + " 条日志");
        }
        
    }, "输出日志按钮点击", null);
}

// 生成日志按钮事件
function btnGenerateLogClick(Sender) {
    SafeExecute(function() {
        SimpleLogInfo("用户点击了生成日志按钮");
        
        // 生成各种类型的测试日志
        SimpleLogDebug("这是一条调试信息 - 测试用");
        SimpleLogInfo("这是一条信息日志 - 测试用");
        SimpleLogWarn("这是一条警告日志 - 测试用");
        SimpleLogError("这是一条错误日志 - 测试用");
        SimpleLog("这是一条普通日志 - 测试用");
        
        // 生成一些带数据的日志
        var currentTime = new Date().toString();
        SimpleLogInfo("生成日志时间: " + currentTime);
        
        // 生成一些模拟的业务日志
        SimpleLogInfo("开始检查PCB文件...");
        SimpleLogDebug("检查元件数量: 150");
        SimpleLogDebug("检查网络数量: 75");
        SimpleLogInfo("PCB检查完成");
        
        // 获取当前状态
        var logger = SimpleLoggerIndex.getDefault();
        var cacheCount = logger.getCacheCount();
        
        SimpleLogInfo("测试日志生成完成，缓存中有 " + cacheCount + " 条日志");
        
        // 显示用户友好的消息
        if (typeof ShowMessage !== "undefined") {
            ShowMessage("已生成测试日志！缓存中有 " + cacheCount + " 条日志");
        }
        
    }, "生成日志按钮点击", null);
}

// 清空显示按钮事件
function btnClearDisplayClick(Sender) {
    SafeExecute(function() {
        SimpleLogInfo("用户点击了清空显示按钮");
        
        // 刷新所有缓存的日志
        var logger = SimpleLoggerIndex.getDefault();
        logger.flush();
        
        SimpleLogInfo("显示已清空");
        
        // 显示用户友好的消息
        if (typeof ShowMessage !== "undefined") {
            ShowMessage("显示已清空！");
        }
        
    }, "清空显示按钮点击", null);
}

// 保存日志按钮事件
function btnSaveLogClick(Sender) {
    SafeExecute(function() {
        SimpleLogInfo("用户点击了保存日志按钮");
        
        var logger = SimpleLoggerIndex.getDefault();
        var totalCount = logger.getTotalCount();
        
        // 刷新所有日志确保都被处理
        logger.flush();
        
        SimpleLogInfo("日志保存完成，共处理 " + totalCount + " 条日志");
        
        // 显示用户友好的消息
        if (typeof ShowMessage !== "undefined") {
            ShowMessage("日志保存完成！共 " + totalCount + " 条日志");
        }
        
    }, "保存日志按钮点击", null);
}

// 初始化函数
function InitializeSimpleLoggerUI() {
    SafeExecute(function() {
        SimpleLogInfo("初始化SimpleLogger UI系统");
        
        // 配置SimpleLogger
        SimpleLoggerIndex.configure({
            level: 15,  // ALL级别
            threshold: 10,  // 较小的阈值便于测试
            autoTime: true
        });
        
        SimpleLogInfo("SimpleLogger UI系统初始化完成");
        
    }, "SimpleLogger UI初始化", null);
}
