// ==========================================================
// Semantic Debug CLI - 命令行接口
// 用于Debug Runtime的CLI命令
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 依赖检查和加载
// ==========================================================

/**
 * 检查并加载依赖
 * @return {Boolean} 是否加载成功
 */
function loadDependencies() {
    try {
        if (typeof require !== "undefined") {
            var path = require("path");
            var debugDir = path.dirname(__filename);
            
            // 加载AD Mock
            var mockPath = path.join(debugDir, "..", "runtime", "ad-mock.js");
            require(mockPath);
            console.log("[Semantic Debug] AD Mock 已加载");
            
            // 加载增强版Analysis（优先Jalangi2，轻量级备用）
            var enhancedAnalysisPath = path.join(debugDir, "..", "jalangi", "enhanced-analysis.js");
            if (require("fs").existsSync(enhancedAnalysisPath)) {
                require(enhancedAnalysisPath);
                console.log("[Semantic Debug] Enhanced Analysis 已加载");
            } else {
                // 降级到原版analysis.js
                var analysisPath = path.join(debugDir, "..", "jalangi", "analysis.js");
                require(analysisPath);
                console.log("[Semantic Debug] 原版Analysis 已加载（降级）");
            }
            
            // 加载测试函数
            var testFunctionsPath = path.join(debugDir, "..", "test-functions.js");
            if (require("fs").existsSync(testFunctionsPath)) {
                require(testFunctionsPath);
                console.log("[Semantic Debug] 测试函数已加载");
            }
            
            // 尝试加载Capability Query（如果可用）
            try {
                var capabilityPath = path.join(process.cwd(), "analyzer", "reports", "capability-index-v1-interface.js");
                if (require("fs").existsSync(capabilityPath)) {
                    global.CapabilityQuery = require(capabilityPath);
                    console.log("[Semantic Debug] Capability Query 已加载");
                }
            } catch (error) {
                console.log("[Semantic Debug] Capability Query 不可用: " + error.message);
            }
            
            return true;
        } else {
            console.log("[Semantic Debug] 浏览器环境，跳过模块加载");
            return true;
        }
    } catch (error) {
        console.log("[Semantic Debug] 依赖加载失败: " + error.message);
        return false;
    }
}

// ==========================================================
// 参数解析
// ==========================================================

/**
 * 解析命令行参数
 * @param {Array} args - 命令行参数数组
 * @return {Object} 解析后的参数对象
 */
function parseArguments(args) {
    var options = {
        command: "",
        entry: "",
        runtime: "ad-mock",
        mode: "trace",
        outputFile: "debug/traces/trace.json",
        help: false,
        verbose: false,
        build: false,
        analyzer: "lightweight"
    };
    
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (arg === "--help" || arg === "-h") {
            options.help = true;
        } else if (arg === "--verbose" || arg === "-v") {
            options.verbose = true;
        } else if (arg === "--entry" || arg === "-e") {
            if (i + 1 < args.length) {
                options.entry = args[i + 1];
                i++; // 跳过下一个参数
            }
        } else if (arg === "--runtime" || arg === "-r") {
            if (i + 1 < args.length) {
                options.runtime = args[i + 1];
                i++;
            }
        } else if (arg === "--mode" || arg === "-m") {
            if (i + 1 < args.length) {
                options.mode = args[i + 1];
                i++;
            }
        } else if (arg === "--output" || arg === "-o") {
            if (i + 1 < args.length) {
                options.outputFile = args[i + 1];
                i++;
            }
        } else if (arg === "--build" || arg === "-b") {
            options.build = true;
        } else if (arg === "--analyzer" || arg === "-a") {
            if (i + 1 < args.length) {
                options.analyzer = args[i + 1];
                i++;
            }
        } else if (arg === "debug") {
            options.command = "debug";
        } else if (arg === "explain") {
            options.command = "explain";
        } else if (arg === "query") {
            options.command = "query";
        } else if (arg === "validate") {
            options.command = "validate";
        } else if (!arg.startsWith("-")) {
            // 位置参数，可能是命令
            if (!options.command) {
                options.command = arg;
            } else if (!options.entry) {
                options.entry = arg;
            }
        }
    }
    
    return options;
}

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log("Semantic Debug CLI - AI可消费的Debug基础设施");
    console.log("");
    console.log("用法:");
    console.log("  semantic debug [选项]");
    console.log("  semantic explain [选项] <trace-file>");
    console.log("  semantic query [选项] <entry-function>");
    console.log("  semantic validate [选项]");
    console.log("  semantic build [选项]");
    console.log("");
    console.log("命令:");
    console.log("  debug     - 执行Debug模式，生成语义Trace");
    console.log("  explain   - 解释Trace文件，提供AI可理解的分析");
    console.log("  query     - 查询入口函数的语义信息");
    console.log("  validate  - 验证Debug环境和配置");
    console.log("  build     - 构建项目并进行分析");
    console.log("");
    console.log("选项:");
    console.log("  -e, --entry <name>     指定入口函数名");
    console.log("  -r, --runtime <type>   指定运行时类型 (ad-mock)");
    console.log("  -m, --mode <mode>      指定Debug模式 (trace)");
    console.log("  -o, --output <file>    指定输出文件");
    console.log("  -b, --build            构建项目后进行debug");
    console.log("  -a, --analyzer <type>  分析器类型 (lightweight|jalangi2)");
    console.log("  -v, --verbose          详细输出");
    console.log("  -h, --help             显示此帮助信息");
    console.log("");
    console.log("示例:");
    console.log("  semantic debug --entry TestButton_Click");
    console.log("  semantic debug --build --entry TestModuleSystem");
    console.log("  semantic explain debug/traces/trace.json");
    console.log("  semantic query --entry ObjectManager.create");
    console.log("  semantic validate");
    console.log("  semantic build --analyzer lightweight");
}

// ==========================================================
// 构建集成
// ==========================================================

/**
 * 执行项目构建
 * @param {Object} options - 选项
 * @return {Object} 构建结果
 */
function executeBuild(options) {
    try {
        console.log("[Semantic Debug] 开始构建项目...");
        
        var buildScript = require("path").join(__dirname, "..", "..", "build", "build.js");
        if (!require("fs").existsSync(buildScript)) {
            console.log("[Semantic Debug] ✗ 构建脚本不存在: " + buildScript);
            return { success: false, error: "构建脚本不存在" };
        }
        
        // 调用构建脚本
        var BuildManager = require(buildScript).BuildManager;
        var manager = new BuildManager();
        
        console.log("[Semantic Debug] 正在构建项目...");
        var buildResult = manager.build();
        
        if (buildResult.success) {
            console.log("[Semantic Debug] ✓ 项目构建成功");
            console.log("[Semantic Debug]   构建时间: " + buildResult.report.duration + "ms");
            console.log("[Semantic Debug]   输出文件: " + buildResult.files.utf8);
            
            // 加载构建后的代码
            var distPath = require("path").join(process.cwd(), "dist", "main_utf8.js");
            if (require("fs").existsSync(distPath)) {
                try {
                    // 在全局作用域执行构建后的代码
                    var builtCode = require("fs").readFileSync(distPath, "utf8");
                    eval(builtCode);
                    console.log("[Semantic Debug] ✓ 构建代码已加载到全局作用域");
                } catch (error) {
                    console.log("[Semantic Debug] ⚠ 构建代码加载失败: " + error.message);
                }
            }
            
            return { success: true, result: buildResult };
        } else {
            console.log("[Semantic Debug] ✗ 项目构建失败");
            console.log("[Semantic Debug]   错误: " + buildResult.errors.join(", "));
            return { success: false, error: buildResult.errors };
        }
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ 构建过程异常: " + error.message);
        return { success: false, error: error.message };
    }
}

/**
 * 切换分析器模式
 * @param {String} analyzerType - 分析器类型
 * @return {Boolean} 是否切换成功
 */
function switchAnalyzer(analyzerType) {
    try {
        console.log("[Semantic Debug] 切换分析器模式: " + analyzerType);
        
        // 使用增强分析器管理器
        if (typeof initializeAnalyzer === "function") {
            var analyzer = initializeAnalyzer(analyzerType);
            if (analyzer) {
                var currentType = getAnalyzerType ? getAnalyzerType() : "unknown";
                console.log("[Semantic Debug] ✓ 使用" + currentType + "分析器");
                return true;
            }
        }
        
        // 降级处理
        if (analyzerType === "lightweight") {
            console.log("[Semantic Debug] ✓ 使用轻量级分析器");
            return true;
        } else if (analyzerType === "jalangi2") {
            console.log("[Semantic Debug] ⚠ Jalangi2分析器不可用，使用轻量级分析器");
            return false;
        } else {
            console.log("[Semantic Debug] ✗ 未知的分析器类型: " + analyzerType);
            return false;
        }
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ 分析器切换失败: " + error.message);
        return false;
    }
}

// ==========================================================
// 命令实现
// ==========================================================

/**
 * 执行Debug命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeDebug(options) {
    try {
        console.log("[Semantic Debug] 开始Debug模式");
        console.log("[Semantic Debug] 入口函数: " + options.entry);
        console.log("[Semantic Debug] 运行时: " + options.runtime);
        console.log("[Semantic Debug] 模式: " + options.mode);
        console.log("[Semantic Debug] 分析器: " + options.analyzer);
        
        // 0. 如果需要构建，先执行构建
        if (options.build) {
            console.log("[Semantic Debug] 检测到--build选项，先执行构建...");
            var buildResult = executeBuild(options);
            if (!buildResult.success) {
                console.log("[Semantic Debug] ✗ 构建失败，终止debug");
                return 1;
            }
        }
        
        // 1. 切换分析器模式
        if (!switchAnalyzer(options.analyzer)) {
            console.log("[Semantic Debug] ⚠ 分析器切换失败，使用默认分析器");
        }
        
        // 2. 验证入口点（如果Capability Query可用）
        if (global.CapabilityQuery && options.entry) {
            console.log("[Semantic Debug] 验证入口点...");
            
            var isCallable = global.CapabilityQuery.isObjectCallable(options.entry);
            if (isCallable) {
                console.log("[Semantic Debug] ✓ 入口点验证通过: " + options.entry);
            } else {
                console.log("[Semantic Debug] ✗ 入口点验证失败: " + options.entry);
                console.log("[Semantic Debug] 继续执行（可能缺少Capability Query）");
            }
        }
        
        // 3. 初始化运行时环境
        console.log("[Semantic Debug] 初始化运行时环境...");
        if (options.runtime === "ad-mock") {
            if (typeof initializeADMock === "function") {
                initializeADMock();
                console.log("[Semantic Debug] ✓ AD Mock 已初始化");
            } else {
                console.log("[Semantic Debug] ✗ AD Mock 不可用");
                return 1;
            }
        }
        
        // 4. 启用Trace收集
        console.log("[Semantic Debug] 启用Trace收集...");
        if (typeof enableTrace === "function") {
            enableTrace();
            console.log("[Semantic Debug] ✓ Trace收集已启用");
        } else {
            console.log("[Semantic Debug] ✗ Trace收集不可用");
            return 1;
        }
        
        // 5. 执行入口函数
        if (options.entry) {
            console.log("[Semantic Debug] 执行入口函数: " + options.entry);
            try {
                // 尝试从全局作用域获取函数
                var entryFunc = eval(options.entry);
                if (typeof entryFunc === "function") {
                    // 模拟Sender参数（DFM函数需要）
                    entryFunc({ I_ObjectAddress: 9999 });
                    console.log("[Semantic Debug] ✓ 入口函数执行完成");
                } else {
                    console.log("[Semantic Debug] ✗ 入口函数不存在: " + options.entry);
                }
            } catch (error) {
                console.log("[Semantic Debug] ✗ 入口函数执行失败: " + error.message);
            }
        }
        
        // 6. 保存Trace结果
        console.log("[Semantic Debug] 保存Trace结果...");
        if (typeof saveTrace === "function") {
            // 确保输出目录存在
            var fs = require("fs");
            var path = require("path");
            var outputDir = path.dirname(options.outputFile);
            
            if (!fs.existsSync(outputDir)) {
                // 简单的目录创建，避免依赖mkdirp
                try {
                    fs.mkdirSync(outputDir, { recursive: true });
                    console.log("[Semantic Debug] ✓ 创建输出目录: " + outputDir);
                } catch (error) {
                    console.log("[Semantic Debug] ⚠ 创建目录失败: " + error.message);
                }
            }
            
            saveTrace(options.outputFile);
            console.log("[Semantic Debug] ✓ Trace已保存到: " + options.outputFile);
        }
        
        // 7. 显示统计信息
        if (typeof getTraceStats === "function") {
            var stats = getTraceStats();
            console.log("[Semantic Debug] Trace统计:");
            console.log("[Semantic Debug]   总计: " + stats.total + " 个事件");
            
            if (options.verbose) {
                for (var type in stats.byType) {
                    console.log("[Semantic Debug]   " + type + ": " + stats.byType[type]);
                }
            }
        }
        
        // 8. 禁用Trace收集
        if (typeof disableTrace === "function") {
            disableTrace();
            console.log("[Semantic Debug] ✓ Trace收集已禁用");
        }
        
        console.log("[Semantic Debug] ✓ Debug模式完成");
        return 0;
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ Debug模式失败: " + error.message);
        if (options.verbose) {
            console.log("[Semantic Debug] 错误堆栈: " + error.stack);
        }
        return 1;
    }
}

/**
 * 执行Build命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeBuildCommand(options) {
    try {
        console.log("[Semantic Debug] 开始Build命令");
        
        // 1. 执行构建
        var buildResult = executeBuild(options);
        if (!buildResult.success) {
            console.log("[Semantic Debug] ✗ 构建失败");
            return 1;
        }
        
        // 2. 切换分析器模式
        if (!switchAnalyzer(options.analyzer)) {
            console.log("[Semantic Debug] ⚠ 分析器切换失败，使用默认分析器");
        }
        
        // 3. 如果指定了入口函数，执行debug
        if (options.entry) {
            console.log("[Semantic Debug] 构建完成，开始Debug分析...");
            return executeDebug(options);
        } else {
            console.log("[Semantic Debug] ✓ 构建完成，未指定入口函数，跳过Debug");
            return 0;
        }
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ Build命令失败: " + error.message);
        return 1;
    }
}

/**
 * 执行Explain命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeExplain(options) {
    try {
        console.log("[Semantic Debug] 开始Explain模式");
        
        var traceFile = options.entry || options.outputFile;
        if (!traceFile) {
            console.log("[Semantic Debug] ✗ 请指定Trace文件");
            return 1;
        }
        
        console.log("[Semantic Debug] 分析Trace文件: " + traceFile);
        
        // 读取Trace文件
        var fs = require("fs");
        if (!fs.existsSync(traceFile)) {
            console.log("[Semantic Debug] ✗ Trace文件不存在: " + traceFile);
            return 1;
        }
        
        var traceData = JSON.parse(fs.readFileSync(traceFile, "utf8"));
        console.log("[Semantic Debug] ✓ Trace文件加载成功");
        console.log("[Semantic Debug]   时间戳: " + traceData.metadata.timestamp);
        console.log("[Semantic Debug]   事件总数: " + traceData.metadata.totalTraces);
        
        // 分析Trace模式
        var analysis = analyzeTracePatterns(traceData.traces);
        console.log("[Semantic Debug] Trace模式分析:");
        
        for (var pattern in analysis.patterns) {
            var count = analysis.patterns[pattern];
            console.log("[Semantic Debug]   " + pattern + ": " + count + " 次");
        }
        
        // 生成AI可理解的解释
        var explanation = generateAIExplanation(traceData.traces);
        console.log("[Semantic Debug] AI可理解解释:");
        console.log(explanation);
        
        console.log("[Semantic Debug] ✓ Explain模式完成");
        return 0;
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ Explain模式失败: " + error.message);
        return 1;
    }
}

/**
 * 执行Query命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeQuery(options) {
    try {
        console.log("[Semantic Debug] 开始Query模式");
        
        if (!global.CapabilityQuery) {
            console.log("[Semantic Debug] ✗ Capability Query 不可用");
            return 1;
        }
        
        var target = options.entry;
        if (!target) {
            console.log("[Semantic Debug] ✗ 请指定查询目标");
            return 1;
        }
        
        console.log("[Semantic Debug] 查询目标: " + target);
        
        // 执行各种查询
        var isCallable = global.CapabilityQuery.isObjectCallable(target);
        console.log("[Semantic Debug] 可调用性: " + (isCallable ? "是" : "否"));
        
        if (isCallable) {
            var methods = global.CapabilityQuery.listMethods(target);
            if (methods && methods.length > 0) {
                console.log("[Semantic Debug] 可用方法:");
                for (var i = 0; i < methods.length; i++) {
                    console.log("[Semantic Debug]   - " + methods[i]);
                }
            }
            
            var signature = global.CapabilityQuery.getMethodSignature(target);
            if (signature) {
                console.log("[Semantic Debug] 方法签名: " + signature);
            }
        }
        
        // 查询依赖关系
        var dependencies = global.CapabilityQuery.getModuleDependencies(target);
        if (dependencies && dependencies.length > 0) {
            console.log("[Semantic Debug] 模块依赖:");
            for (var i = 0; i < dependencies.length; i++) {
                console.log("[Semantic Debug]   - " + dependencies[i]);
            }
        }
        
        console.log("[Semantic Debug] ✓ Query模式完成");
        return 0;
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ Query模式失败: " + error.message);
        return 1;
    }
}

/**
 * 执行Validate命令
 * @param {Object} options - 解析后的选项
 * @return {Number} 退出码
 */
function executeValidate(options) {
    try {
        console.log("[Semantic Debug] 开始Validate模式");
        
        var issues = [];
        var warnings = [];
        
        // 验证依赖
        if (typeof enableTrace !== "function") {
            issues.push("Trace收集系统不可用");
        } else {
            console.log("[Semantic Debug] ✓ Trace收集系统可用");
        }
        
        if (typeof initializeADMock !== "function") {
            issues.push("AD Mock系统不可用");
        } else {
            console.log("[Semantic Debug] ✓ AD Mock系统可用");
        }
        
        if (!global.CapabilityQuery) {
            warnings.push("Capability Query系统不可用");
        } else {
            console.log("[Semantic Debug] ✓ Capability Query系统可用");
        }
        
        // 验证文件系统
        var fs = require("fs");
        var path = require("path");
        
        try {
            var tracesDir = path.join(process.cwd(), "debug", "traces");
            if (!fs.existsSync(tracesDir)) {
                // 简单的目录创建，避免依赖mkdirp
                try {
                    fs.mkdirSync(tracesDir, { recursive: true });
                    warnings.push("创建traces目录");
                } catch (error) {
                    console.log("[Semantic Debug] ⚠ 创建目录失败: " + error.message);
                }
            }
            console.log("[Semantic Debug] ✓ traces目录可用");
        } catch (error) {
            issues.push("traces目录不可用: " + error.message);
        }
        
        // 输出结果
        console.log("[Semantic Debug] 验证完成:");
        if (issues.length === 0 && warnings.length === 0) {
            console.log("[Semantic Debug] ✓ 所有检查通过");
        } else {
            if (issues.length > 0) {
                console.log("[Semantic Debug] ✗ 发现问题:");
                for (var i = 0; i < issues.length; i++) {
                    console.log("[Semantic Debug]   - " + issues[i]);
                }
            }
            if (warnings.length > 0) {
                console.log("[Semantic Debug] ⚠ 警告:");
                for (var i = 0; i < warnings.length; i++) {
                    console.log("[Semantic Debug]   - " + warnings[i]);
                }
            }
        }
        
        return issues.length > 0 ? 1 : 0;
        
    } catch (error) {
        console.log("[Semantic Debug] ✗ Validate模式失败: " + error.message);
        return 1;
    }
}

// ==========================================================
// 辅助函数
// ==========================================================

/**
 * 分析Trace模式
 * @param {Array} traces - Trace数组
 * @return {Object} 分析结果
 */
function analyzeTracePatterns(traces) {
    var patterns = {
        "函数调用": 0,
        "变量写入": 0,
        "属性读取": 0,
        "函数返回": 0
    };
    
    for (var i = 0; i < traces.length; i++) {
        var trace = traces[i];
        var type = trace.type;
        
        if (type === "call") {
            patterns["函数调用"]++;
        } else if (type === "write") {
            patterns["变量写入"]++;
        } else if (type === "read") {
            patterns["属性读取"]++;
        } else if (type === "return") {
            patterns["函数返回"]++;
        }
    }
    
    return { patterns: patterns };
}

/**
 * 生成AI可理解的解释
 * @param {Array} traces - Trace数组
 * @return {String} 解释文本
 */
function generateAIExplanation(traces) {
    var explanation = "基于执行轨迹的AI可理解分析:\n\n";
    
    // 找出关键事件
    var calls = [];
    var writes = [];
    
    for (var i = 0; i < traces.length; i++) {
        var trace = traces[i];
        if (trace.type === "call") {
            calls.push(trace);
        } else if (trace.type === "write") {
            writes.push(trace);
        }
    }
    
    if (calls.length > 0) {
        explanation += "1. 函数调用链:\n";
        for (var i = 0; i < Math.min(calls.length, 5); i++) {
            var call = calls[i];
            explanation += "   - " + (call.data.from || "unknown") + " -> " + call.data.to + "\n";
        }
        explanation += "\n";
    }
    
    if (writes.length > 0) {
        explanation += "2. 关键状态变化:\n";
        for (var i = 0; i < Math.min(writes.length, 5); i++) {
            var write = writes[i];
            explanation += "   - " + (write.data.property || write.data.symbol) + " = " + JSON.stringify(write.data.newValue) + "\n";
        }
        explanation += "\n";
    }
    
    explanation += "3. 执行总结:\n";
    explanation += "   - 总共执行了 " + traces.length + " 个事件\n";
    explanation += "   - 包含 " + calls.length + " 个函数调用\n";
    explanation += "   - 包含 " + writes.length + " 个状态变化\n";
    
    return explanation;
}

// ==========================================================
// 主函数
// ==========================================================

/**
 * 主函数
 * @param {Array} args - 命令行参数
 * @return {Number} 退出码
 */
function main(args) {
    try {
        // 加载依赖
        if (!loadDependencies()) {
            console.log("[Semantic Debug] 依赖加载失败，退出");
            return 1;
        }
        
        // 解析参数
        var options = parseArguments(args);
        
        // 显示帮助
        if (options.help) {
            showHelp();
            return 0;
        }
        
        // 执行命令
        var exitCode = 0;
        
        if (options.command === "debug") {
            exitCode = executeDebug(options);
        } else if (options.command === "explain") {
            exitCode = executeExplain(options);
        } else if (options.command === "query") {
            exitCode = executeQuery(options);
        } else if (options.command === "validate") {
            exitCode = executeValidate(options);
        } else if (options.command === "build") {
            exitCode = executeBuildCommand(options);
        } else {
            console.log("[Semantic Debug] 未知命令: " + options.command);
            console.log("[Semantic Debug] 使用 --help 查看帮助信息");
            exitCode = 1;
        }
        
        return exitCode;
        
    } catch (error) {
        console.log("[Semantic Debug] 主函数执行失败: " + error.message);
        return 1;
    }
}

// ==========================================================
// 导出和执行
// ==========================================================

// 导出模块
var moduleExports = {
    main: main,
    parseArguments: parseArguments,
    executeDebug: executeDebug,
    executeExplain: executeExplain,
    executeQuery: executeQuery,
    executeValidate: executeValidate,
    executeBuildCommand: executeBuildCommand,
    executeBuild: executeBuild,
    switchAnalyzer: switchAnalyzer
};

// Node.js环境下的执行
if (typeof require !== "undefined") {
    module.exports = moduleExports;
    
    if (require.main === module) {
        var args = process.argv.slice(2); // 移除node和脚本名
        var exitCode = main(args);
        process.exit(exitCode);
    }
}

// 浏览器环境下的导出
if (typeof window !== "undefined") {
    window.semanticDebug = moduleExports;
}

console.log("[Semantic Debug] semantic-debug.js 加载完成");
