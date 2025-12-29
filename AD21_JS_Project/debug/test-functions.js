// ==========================================================
// Debug测试函数集合
// 用于Debug系统的测试函数
// 严格遵循ES3语法规范
// ==========================================================

// ==========================================================
// 测试函数定义
// ==========================================================

/**
 * 测试按钮点击函数
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

/**
 * 测试模块系统函数
 * @param {Object} Sender - 发送者对象
 */
function TestModuleSystem(Sender) {
    console.log("[Test Function] TestModuleSystem 被调用");
    
    // 测试LoggerModule
    if (typeof LoggerModule !== "undefined") {
        var logger = LoggerModule.getLogger("TestModuleSystem");
        logger.info("测试LoggerModule功能");
        console.log("[Test Function] LoggerModule 可用");
    } else {
        console.log("[Test Function] LoggerModule 不可用");
    }
    
    // 测试ObjectModule
    if (typeof ObjectModule !== "undefined") {
        var obj = ObjectModule.createObject({
            type: "test",
            position: {x: 1000, y: 2000}
        });
        console.log("[Test Function] ObjectModule 创建对象: " + JSON.stringify(obj));
    } else {
        console.log("[Test Function] ObjectModule 不可用");
    }
}

/**
 * 测试完整业务流程
 * @param {Object} Sender - 发送者对象
 */
function TestBusinessFlow(Sender) {
    console.log("[Test Function] TestBusinessFlow 被调用");
    
    try {
        // 1. 初始化日志
        if (typeof LoggerModule !== "undefined") {
            var logger = LoggerModule.getLogger("BusinessFlow");
            logger.info("开始业务流程测试");
        }
        
        // 2. 获取PCB文档
        var board = PCBServer().GetCurrentPCBBoard();
        if (!board) {
            throw new Error("无法获取PCB文档");
        }
        
        // 3. 创建测试对象
        var track = PCBServer().PCBObjectFactory(1, 0, 0); // eTrackObject
        if (track) {
            track.X = 1000;
            track.Y = 1000;
            track.X1 = 1000;
            track.Y1 = 1000;
            track.X2 = 3000;
            track.Y2 = 1000;
            track.Width = 150;
            track.Layer = 0; // eTopLayer
            
            board.AddPCBObject(track);
            console.log("[Test Function] 创建了Track对象");
        }
        
        // 4. 遍历验证
        var iterator = board.BoardIterator_Create();
        if (iterator) {
            var obj = iterator.FirstPCBObject();
            var objectCount = 0;
            while (obj) {
                objectCount++;
                console.log("[Test Function] 找到对象: " + obj.I_ObjectAddress);
                obj = iterator.NextPCBObject();
            }
            board.BoardIterator_Destroy(iterator);
            
            if (typeof LoggerModule !== "undefined") {
                var logger = LoggerModule.getLogger("BusinessFlow");
                logger.info("业务流程完成，处理了 " + objectCount + " 个对象");
            }
        }
        
        console.log("[Test Function] 业务流程测试完成");
        
    } catch (error) {
        console.log("[Test Function] 业务流程测试失败: " + error.message);
        if (typeof LoggerModule !== "undefined") {
            var logger = LoggerModule.getLogger("BusinessFlow");
            logger.error("业务流程失败: " + error.message);
        }
    }
}

// ==========================================================
// 全局暴露
// ==========================================================

// 在Node.js环境中将测试函数暴露到global
if (typeof global !== "undefined") {
    global.TestButton_Click = TestButton_Click;
    global.TestModuleSystem = TestModuleSystem;
    global.TestBusinessFlow = TestBusinessFlow;
} else {
    // 浏览器环境
    this.TestButton_Click = TestButton_Click;
    this.TestModuleSystem = TestModuleSystem;
    this.TestBusinessFlow = TestBusinessFlow;
}

// ==========================================================
// 函数列表（用于查询）
// ==========================================================

/**
 * 获取所有可用的测试函数列表
 * @return {Array} 函数名列表
 */
function getAvailableTestFunctions() {
    return [
        "TestButton_Click",
        "TestModuleSystem", 
        "TestBusinessFlow"
    ];
}

/**
 * 检查函数是否存在
 * @param {String} functionName - 函数名
 * @return {Boolean} 是否存在
 */
function isTestFunctionAvailable(functionName) {
    var availableFunctions = getAvailableTestFunctions();
    for (var i = 0; i < availableFunctions.length; i++) {
        if (availableFunctions[i] === functionName) {
            return true;
        }
    }
    return false;
}

// 暴露工具函数
if (typeof global !== "undefined") {
    global.getAvailableTestFunctions = getAvailableTestFunctions;
    global.isTestFunctionAvailable = isTestFunctionAvailable;
} else {
    this.getAvailableTestFunctions = getAvailableTestFunctions;
    this.isTestFunctionAvailable = isTestFunctionAvailable;
}

console.log("[Test Functions] test-functions.js 加载完成");
