// ==========================================================
// 真实违规测试代码
// 包含各种AD API使用错误，用于测试Jalangi2检测能力
// ==========================================================

// 加载AD Mock
require('./runtime/ad-mock.js');

function TestRealViolations_Click(Sender) {
    console.log("[Real Test] 开始真实违规测试...");
    
    // ==========================================================
    // 测试1: PCBServer基本调用
    // ==========================================================
    try {
        var board = PCBServer().GetCurrentPCBBoard();
        console.log("[Real Test] PCBServer调用成功");
    } catch (error) {
        console.log("[Real Test] PCBServer调用失败: " + error.message);
    }
    
    // ==========================================================
    // 测试2: PCBObjectFactory参数错误
    // ==========================================================
    try {
        // 错误1: 参数数量不正确
        var obj1 = PCBServer().PCBObjectFactory(1); // 缺少Y坐标参数
        console.log("[Real Test] 对象创建1: " + (obj1 ? "成功" : "失败"));
        
        // 错误2: 参数类型错误
        var obj2 = PCBServer().PCBObjectFactory("invalid_type", 0, 0); // 字符串类型
        console.log("[Real Test] 对象创建2: " + (obj2 ? "成功" : "失败"));
        
        // 错误3: 无效的枚举值
        var obj3 = PCBServer().PCBObjectFactory(999, 0, 0); // 无效类型ID
        console.log("[Real Test] 对象创建3: " + (obj3 ? "成功" : "失败"));
        
        // 正确的对象创建
        var obj4 = PCBServer().PCBObjectFactory(1, 100, 200); // 正确创建
        console.log("[Real Test] 对象创建4: " + (obj4 ? "成功" : "失败"));
        
    } catch (error) {
        console.log("[Real Test] 对象创建错误: " + error.message);
    }
    
    // ==========================================================
    // 测试3: 对象属性类型错误
    // ==========================================================
    try {
        var track = PCBServer().PCBObjectFactory(1, 0, 0);
        
        // 错误4: 坐标属性类型错误
        track.X = "invalid_string"; // 字符串赋值给数值属性
        track.Y = 123.456; // 浮点数赋值给整数属性
        track.Width = null; // null值赋值
        
        console.log("[Real Test] 属性赋值完成");
        
        // 错误5: 缺少必需属性
        delete track.I_ObjectAddress; // 删除必需属性
        console.log("[Real Test] 必需属性已删除");
        
    } catch (error) {
        console.log("[Real Test] 属性操作错误: " + error.message);
    }
    
    // ==========================================================
    // 测试4: AddPCBObject调用错误
    // ==========================================================
    try {
        var board = PCBServer().GetCurrentPCBBoard();
        
        // 错误6: 添加null对象
        board.AddPCBObject(null);
        console.log("[Real Test] 添加null对象完成");
        
        // 错误7: 添加无效对象
        var invalidObj = { Type: "invalid" };
        board.AddPCBObject(invalidObj);
        console.log("[Real Test] 添加无效对象完成");
        
        // 错误8: 对象缺少I_ObjectAddress
        var incompleteObj = PCBServer().PCBObjectFactory(1, 0, 0);
        incompleteObj.I_ObjectAddress = undefined;
        board.AddPCBObject(incompleteObj);
        console.log("[Real Test] 添加不完整对象完成");
        
    } catch (error) {
        console.log("[Real Test] 对象添加错误: " + error.message);
    }
    
    // ==========================================================
    // 测试5: 迭代器使用错误
    // ==========================================================
    try {
        // 错误9: 迭代器创建错误
        var iterator = BoardIterator_Create(); // 缺少参数
        console.log("[Real Test] 迭代器创建1: " + (iterator ? "成功" : "失败"));
        
        // 正确创建
        var iterator2 = BoardIterator_Create();
        console.log("[Real Test] 迭代器创建2: " + (iterator2 ? "成功" : "失败"));
        
        // 错误10: 迭代器方法调用错误
        if (iterator2) {
            var firstObj = iterator2.FirstPCBObject();
            console.log("[Real Test] 获取第一个对象: " + (firstObj ? "成功" : "失败"));
            
            // 错误11: 在错误的this对象上调用方法
            var wrongThis = { FirstPCBObject: iterator2.FirstPCBObject };
            var result = wrongThis.FirstPCBObject();
            console.log("[Real Test] 错误的this调用: " + (result ? "成功" : "失败"));
        }
        
    } catch (error) {
        console.log("[Real Test] 迭代器错误: " + error.message);
    }
    
    // ==========================================================
    // 测试6: 复杂数据流错误
    // ==========================================================
    try {
        // 创建一个错误的对象
        var sourceObj = PCBServer().PCBObjectFactory(1, 0, 0);
        sourceObj.X = "string_error";
        
        // 将错误传递给另一个对象
        var targetObj = PCBServer().PCBObjectFactory(2, 0, 0);
        targetObj.X = sourceObj.X; // 错误的类型传递
        
        // 继续传递错误
        var finalObj = PCBServer().PCBObjectFactory(3, 0, 0);
        finalObj.X = targetObj.X; // 进一步的错误传递
        
        console.log("[Real Test] 复杂数据流错误完成");
        
    } catch (error) {
        console.log("[Real Test] 数据流错误: " + error.message);
    }
    
    console.log("[Real Test] 真实违规测试完成");
}

// 导出函数用于测试
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestRealViolations_Click: TestRealViolations_Click };
}
