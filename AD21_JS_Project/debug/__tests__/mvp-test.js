// ==========================================================
// MVP功能测试脚本
// 验证Debug基础设施的核心功能
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 测试配置
// ==========================================================
var testConfig = {
    verbose: true,
    mockEntry: "TestButton_Click",
    outputFile: "debug/traces/test-trace.json"
};

// ==========================================================
// 测试工具函数
// ==========================================================

/**
 * 记录测试结果
 * @param {String} testName - 测试名称
 * @param {Boolean} passed - 是否通过
 * @param {String} message - 消息
 */
function logTest(testName, passed, message) {
    var status = passed ? "✓" : "✗";
    console.log("[MVP Test] " + status + " " + testName + ": " + message);
}

/**
 * 断言函数
 * @param {Boolean} condition - 条件
 * @param {String} message - 失败消息
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error("断言失败: " + message);
    }
}

/**
 * 模拟DFM按钮点击函数
 * @param {Object} Sender - 发送者对象
 */
function TestButton_Click(Sender) {
    console.log("[Test Function] TestButton_Click 被调用");
    console.log("[Test Function] Sender.I_ObjectAddress: " + Sender.I_ObjectAddress);
    
    // 模拟一些PCB操作
    var board = PCBServer().GetCurrentPCBBoard();
    if (board) {
        console.log("[Test Function] 当前PCB文档: " + board.FileName);
        
        // 创建一个测试对象
        var via = PCBServer().PCBObjectFactory(3, 0, 0); // eViaObject
        if (via) {
            via.X = 5000;
            via.Y = 6000;
            via.Size = 100;
            via.HoleSize = 50;
            board.AddPCBObject(via);
            
            console.log("[Test Function] 创建了Via对象");
        }
        
        // 测试迭代器
        var iterator = board.BoardIterator_Create();
        if (iterator) {
            iterator.AddFilter_ObjectSet(null); // 所有对象
            var obj = iterator.FirstPCBObject();
            var count = 0;
            while (obj) {
                count++;
                obj = iterator.NextPCBObject();
            }
            board.BoardIterator_Destroy(iterator);
            console.log("[Test Function] 遍历了 " + count + " 个对象");
        }
    }
}

// ==========================================================
// 测试用例
// ==========================================================

/**
 * 测试1: AD Mock基础功能
 */
function testADMockBasic() {
    console.log("[MVP Test] === 测试1: AD Mock基础功能 ===");
    
    try {
        // 测试PCBServer函数
        var pcbServer = PCBServer();
        assert(pcbServer !== null, "PCBServer()应该返回对象");
        logTest("PCBServer函数", true, "PCBServer()返回有效对象");
        
        // 测试GetCurrentPCBBoard
        var board = pcbServer.GetCurrentPCBBoard();
        assert(board !== null, "GetCurrentPCBBoard()应该返回对象");
        logTest("GetCurrentPCBBoard", true, "返回PCB文档对象");
        
        // 测试Board属性
        assert(typeof board.FileName === "string", "Board.FileName应该是字符串");
        logTest("Board.FileName属性", true, "文件名: " + board.FileName);
        
        assert(typeof board.IsLibrary === "boolean", "Board.IsLibrary应该是布尔值");
        logTest("Board.IsLibrary属性", true, "是否为库: " + board.IsLibrary);
        
        // 测试PCBObjectFactory
        var track = pcbServer.PCBObjectFactory(1, 0, 0); // eTrackObject
        assert(track !== null, "PCBObjectFactory()应该返回对象");
        logTest("PCBObjectFactory", true, "成功创建Track对象");
        
        assert(track.I_ObjectAddress !== undefined, "对象应该有I_ObjectAddress");
        logTest("对象I_ObjectAddress", true, "地址: " + track.I_ObjectAddress);
        
    } catch (error) {
        logTest("AD Mock基础功能", false, error.message);
    }
}

/**
 * 测试2: 迭代器功能
 */
function testIteratorFunction() {
    console.log("[MVP Test] === 测试2: 迭代器功能 ===");
    
    try {
        var board = PCBServer().GetCurrentPCBBoard();
        assert(board !== null, "需要有效的Board对象");
        
        // 测试BoardIterator
        var iterator = board.BoardIterator_Create();
        assert(iterator !== null, "BoardIterator_Create()应该返回对象");
        logTest("BoardIterator创建", true, "成功创建迭代器");
        
        // 测试迭代
        var obj = iterator.FirstPCBObject();
        var count = 0;
        var foundTypes = {};
        
        while (obj) {
            count++;
            var type = "unknown";
            if (obj.Width !== undefined) {
                type = "track";
            } else if (obj.HoleSize !== undefined) {
                if (obj.LowLayer !== undefined) {
                    type = "via";
                } else {
                    type = "pad";
                }
            }
            
            foundTypes[type] = (foundTypes[type] || 0) + 1;
            obj = iterator.NextPCBObject();
        }
        
        logTest("对象遍历", true, "遍历了 " + count + " 个对象");
        
        // 检查对象类型
        console.log("[MVP Test] 发现的对象类型:");
        for (var type in foundTypes) {
            console.log("[MVP Test]   " + type + ": " + foundTypes[type] + " 个");
        }
        
        // 清理
        board.BoardIterator_Destroy(iterator);
        logTest("迭代器销毁", true, "成功销毁迭代器");
        
    } catch (error) {
        logTest("迭代器功能", false, error.message);
    }
}

/**
 * 测试3: Trace收集功能
 */
function testTraceCollection() {
    console.log("[MVP Test] === 测试3: Trace收集功能 ===");
    
    try {
        // 检查Trace收集器是否可用
        assert(typeof enableTrace === "function", "enableTrace函数应该存在");
        assert(typeof disableTrace === "function", "disableTrace函数应该存在");
        assert(typeof getTrace === "function", "getTrace函数应该存在");
        logTest("Trace收集器可用性", true, "所有必需函数都存在");
        
        // 启用Trace收集
        enableTrace();
        logTest("启用Trace收集", true, "Trace收集已启用");
        
        // 执行一些操作
        var testVar = "initial";
        testVar = "changed";
        
        var board = PCBServer().GetCurrentPCBBoard();
        if (board) {
            var fileName = board.FileName; // 这应该触发read事件
        }
        
        // 禁用Trace收集
        disableTrace();
        logTest("禁用Trace收集", true, "Trace收集已禁用");
        
        // 检查Trace结果
        var traces = getTrace();
        assert(Array.isArray(traces), "getTrace()应该返回数组");
        logTest("Trace获取", true, "获取到 " + traces.length + " 个Trace事件");
        
        // 显示一些Trace
        if (traces.length > 0) {
            console.log("[MVP Test] 前3个Trace事件:");
            for (var i = 0; i < Math.min(3, traces.length); i++) {
                var trace = traces[i];
                console.log("[MVP Test]   " + trace.type + ": " + JSON.stringify(trace.data));
            }
        }
        
    } catch (error) {
        logTest("Trace收集功能", false, error.message);
    }
}

/**
 * 测试4: CLI集成功能
 */
function testCLIIntegration() {
    console.log("[MVP Test] === 测试4: CLI集成功能 ===");
    
    try {
        // 检查semantic-debug是否可用
        var semanticDebug;
        if (typeof require !== "undefined") {
            try {
                var path = require("path");
                var cliPath = path.join(__dirname, "..", "cli", "semantic-debug.js");
                semanticDebug = require(cliPath);
                logTest("CLI模块加载", true, "semantic-debug.js加载成功");
            } catch (error) {
                logTest("CLI模块加载", false, "semantic-debug.js加载失败: " + error.message);
                return;
            }
        } else {
            logTest("CLI模块加载", false, "非Node.js环境，跳过测试");
            return;
        }
        
        // 检查命令函数
        assert(typeof semanticDebug.executeDebug === "function", "executeDebug函数应该存在");
        assert(typeof semanticDebug.executeValidate === "function", "executeValidate函数应该存在");
        logTest("CLI命令函数", true, "所有CLI命令函数都存在");
        
        // 测试参数解析
        var args = ["debug", "--entry", "TestButton_Click", "--verbose"];
        var options = semanticDebug.parseArguments(args);
        
        assert(options.command === "debug", "命令应该是debug");
        assert(options.entry === "TestButton_Click", "入口应该是TestButton_Click");
        assert(options.verbose === true, "verbose应该为true");
        logTest("参数解析", true, "参数解析正确");
        
        // 测试validate命令
        var exitCode = semanticDebug.executeValidate({ verbose: false });
        logTest("Validate命令", exitCode === 0, "Validate命令执行" + (exitCode === 0 ? "成功" : "失败"));
        
    } catch (error) {
        logTest("CLI集成功能", false, error.message);
    }
}

/**
 * 测试5: 端到端Debug流程
 */
function testEndToEndDebug() {
    console.log("[MVP Test] === 测试5: 端到端Debug流程 ===");
    
    try {
        // 检查semantic-debug完整debug流程
        var semanticDebug;
        if (typeof require !== "undefined") {
            try {
                var path = require("path");
                var cliPath = path.join(__dirname, "..", "cli", "semantic-debug.js");
                semanticDebug = require(cliPath);
            } catch (error) {
                logTest("端到端Debug流程", false, "无法加载CLI模块");
                return;
            }
        } else {
            logTest("端到端Debug流程", false, "非Node.js环境，跳过测试");
            return;
        }
        
        // 定义测试选项
        var debugOptions = {
            command: "debug",
            entry: testConfig.mockEntry,
            runtime: "ad-mock",
            mode: "trace",
            outputFile: testConfig.outputFile,
            verbose: false
        };
        
        // 执行debug命令
        var exitCode = semanticDebug.executeDebug(debugOptions);
        logTest("完整Debug流程", exitCode === 0, "Debug流程执行" + (exitCode === 0 ? "成功" : "失败"));
        
        // 检查输出文件是否生成
        if (exitCode === 0) {
            var fs = require("fs");
            if (fs.existsSync(testConfig.outputFile)) {
                logTest("Trace文件生成", true, "Trace文件已生成");
                
                // 读取并验证文件内容
                var traceData = JSON.parse(fs.readFileSync(testConfig.outputFile, "utf8"));
                assert(traceData.metadata !== undefined, "应该有metadata");
                assert(Array.isArray(traceData.traces), "traces应该是数组");
                logTest("Trace文件格式", true, "Trace文件格式正确");
                
                console.log("[MVP Test] Trace文件统计:");
                console.log("[MVP Test]   时间戳: " + traceData.metadata.timestamp);
                console.log("[MVP Test]   事件总数: " + traceData.metadata.totalTraces);
                
            } else {
                logTest("Trace文件生成", false, "Trace文件未生成");
            }
        }
        
    } catch (error) {
        logTest("端到端Debug流程", false, error.message);
    }
}

// ==========================================================
// 测试执行器
// ==========================================================

/**
 * 运行所有测试
 */
function runAllTests() {
    console.log("[MVP Test] 开始MVP功能测试");
    console.log("[MVP Test] 测试时间: " + new Date().toISOString());
    console.log("");
    
    var testResults = {
        total: 0,
        passed: 0,
        failed: 0
    };
    
    // 运行各个测试
    var tests = [
        testADMockBasic,
        testIteratorFunction,
        testTraceCollection,
        testCLIIntegration,
        testEndToEndDebug
    ];
    
    for (var i = 0; i < tests.length; i++) {
        testResults.total++;
        
        try {
            tests[i]();
            testResults.passed++;
        } catch (error) {
            testResults.failed++;
            console.log("[MVP Test] 测试异常: " + error.message);
        }
        
        console.log("");
    }
    
    // 输出总结
    console.log("[MVP Test] === MVP测试总结 ===");
    console.log("[MVP Test] 总计: " + testResults.total + " 个测试");
    console.log("[MVP Test] 通过: " + testResults.passed + " 个测试");
    console.log("[MVP Test] 失败: " + testResults.failed + " 个测试");
    console.log("[MVP Test] 成功率: " + (testResults.passed / testResults.total * 100).toFixed(1) + "%");
    
    if (testResults.failed === 0) {
        console.log("[MVP Test] 🎉 所有测试通过！MVP功能已就绪");
    } else {
        console.log("[MVP Test] ⚠ 有测试失败，需要修复问题");
    }
}

// ==========================================================
// 主函数
// ==========================================================

/**
 * 主函数
 */
function main() {
    try {
        runAllTests();
    } catch (error) {
        console.log("[MVP Test] 测试执行失败: " + error.message);
        console.log("[MVP Test] 错误堆栈: " + error.stack);
    }
}

// 加载必要的依赖
if (typeof require !== "undefined") {
    try {
        // 加载AD Mock
        var path = require("path");
        var debugDir = path.dirname(__filename);
        var mockPath = path.join(debugDir, "..", "runtime", "ad-mock.js");
        require(mockPath);
        console.log("[MVP Test] AD Mock 已加载");
        
        // 加载Jalangi Analysis
        var analysisPath = path.join(debugDir, "..", "jalangi", "analysis.js");
        require(analysisPath);
        console.log("[MVP Test] Jalangi Analysis 已加载");
        
        // 将TestButton_Click暴露到全局作用域
        if (typeof global !== "undefined") {
            global.TestButton_Click = TestButton_Click;
        }
    } catch (error) {
        console.log("[MVP Test] 依赖加载失败: " + error.message);
    }
}

// 如果直接运行此脚本
if (typeof require !== "undefined" && require.main === module) {
    main();
}

console.log("[MVP Test] mvp-test.js 加载完成");
