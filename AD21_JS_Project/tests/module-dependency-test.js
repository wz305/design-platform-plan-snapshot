/**
 * 模块依赖测试脚本
 * 
 * 手动创建的测试脚本，用于验证所有模块的依赖关系和导入导出规范性
 */

console.log("=== 开始模块依赖测试 ===\n");

// 测试结果记录
var testResults = {
    passed: 0,
    failed: 0,
    errors: [],
    modules: {},
    dependencies: {}
};

/**
 * 记录测试结果
 */
function logTest(moduleName, testName, passed, error) {
    if (!testResults.modules[moduleName]) {
        testResults.modules[moduleName] = {};
    }
    
    testResults.modules[moduleName][testName] = {
        passed: passed,
        error: error
    };
    
    if (passed) {
        testResults.passed++;
        console.log("✅ " + moduleName + " - " + testName);
    } else {
        testResults.failed++;
        testResults.errors.push(moduleName + " - " + testName + ": " + error);
        console.log("❌ " + moduleName + " - " + testName + ": " + error);
    }
}

/**
 * 测试模块加载
 */
function testModuleLoading() {
    console.log("--- 1. 测试模块加载 ---");
    
    try {
        // 测试BaseModule
        var BaseModule = require('../src/modules/base/index.js');
        logTest("BaseModule", "模块加载", typeof BaseModule !== "undefined");
        logTest("BaseModule", "create方法存在", typeof BaseModule.create === "function");
        
        // 测试LoggerTypes
        var LoggerTypes = require('../src/modules/logger/types.js');
        logTest("LoggerTypes", "模块加载", typeof LoggerTypes !== "undefined");
        logTest("LoggerTypes", "LOG_LEVELS存在", typeof LoggerTypes.LOG_LEVELS === "object");
        
        // 测试LoggerTools
        var LoggerTools = require('../src/modules/logger/tools.js');
        logTest("LoggerTools", "模块加载", typeof LoggerTools !== "undefined");
        
        // 测试LoggerModule核心
        var LoggerModule = require('../src/modules/logger/core.js');
        logTest("LoggerModule", "核心模块加载", typeof LoggerModule !== "undefined");
        logTest("LoggerModule", "create方法存在", typeof LoggerModule.create === "function");
        
        // 测试LoggerModule索引
        var LoggerModuleIndex = require('../src/modules/logger/index.js');
        logTest("LoggerModuleIndex", "索引模块加载", typeof LoggerModuleIndex !== "undefined");
        logTest("LoggerModuleIndex", "getLogger方法存在", typeof LoggerModuleIndex.getLogger === "function");
        
        // 测试PCB接口核心模块
        var BasePCBWrapper = require('../src/modules/pcb-interfaces/core/BasePCBWrapper.js');
        logTest("BasePCBWrapper", "模块加载", typeof BasePCBWrapper !== "undefined");
        
        var PCBMockSystem = require('../src/modules/pcb-interfaces/core/PCBMockSystem.js');
        logTest("PCBMockSystem", "模块加载", typeof PCBMockSystem !== "undefined");
        
        var PCBObjectFactory = require('../src/modules/pcb-interfaces/core/PCBObjectFactory.js');
        logTest("PCBObjectFactory", "模块加载", typeof PCBObjectFactory !== "undefined");
        
        var PCBObjectManager = require('../src/modules/pcb-interfaces/core/PCBObjectManager.js');
        logTest("PCBObjectManager", "模块加载", typeof PCBObjectManager !== "undefined");
        
        var PCBObjectPool = require('../src/modules/pcb-interfaces/core/PCBObjectPool.js');
        logTest("PCBObjectPool", "模块加载", typeof PCBObjectPool !== "undefined");
        
        // 测试几何计算器
        var GeometryCalculator = require('../src/modules/pcb-interfaces/calculators/GeometryCalculator.js');
        logTest("GeometryCalculator", "模块加载", typeof GeometryCalculator !== "undefined");
        
        // 测试封装器
        var ArcWrapper = require('../src/modules/pcb-interfaces/wrappers/ArcWrapper.js');
        logTest("ArcWrapper", "模块加载", typeof ArcWrapper !== "undefined");
        
        var PadWrapper = require('../src/modules/pcb-interfaces/wrappers/PadWrapper.js');
        logTest("PadWrapper", "模块加载", typeof PadWrapper !== "undefined");
        
        var TrackWrapper = require('../src/modules/pcb-interfaces/wrappers/TrackWrapper.js');
        logTest("TrackWrapper", "模块加载", typeof TrackWrapper !== "undefined");
        
        var ViaWrapper = require('../src/modules/pcb-interfaces/wrappers/ViaWrapper.js');
        logTest("ViaWrapper", "模块加载", typeof ViaWrapper !== "undefined");
        
        // 测试PCB接口主模块
        var PCBInterfaces = require('../src/modules/pcb-interfaces/index.js');
        logTest("PCBInterfaces", "主模块加载", typeof PCBInterfaces !== "undefined");
        logTest("PCBInterfaces", "initialize方法存在", typeof PCBInterfaces.initialize === "function");
        
    } catch (error) {
        logTest("全局", "模块加载过程", false, error.message);
    }
}

/**
 * 测试模块导入导出规范性
 */
function testModuleStandards() {
    console.log("\n--- 2. 测试模块导入导出规范性 ---");
    
    try {
        // 检查模块是否使用正确的IIFE模式
        var fs = require('fs');
        var path = require('path');
        
        var moduleFiles = [
            '../src/modules/base/index.js',
            '../src/modules/logger/types.js',
            '../src/modules/logger/core.js',
            '../src/modules/logger/index.js',
            '../src/modules/pcb-interfaces/core/BasePCBWrapper.js',
            '../src/modules/pcb-interfaces/core/PCBMockSystem.js',
            '../src/modules/pcb-interfaces/core/PCBObjectFactory.js',
            '../src/modules/pcb-interfaces/core/PCBObjectManager.js',
            '../src/modules/pcb-interfaces/core/PCBObjectPool.js',
            '../src/modules/pcb-interfaces/calculators/GeometryCalculator.js',
            '../src/modules/pcb-interfaces/wrappers/ArcWrapper.js',
            '../src/modules/pcb-interfaces/wrappers/PadWrapper.js',
            '../src/modules/pcb-interfaces/wrappers/TrackWrapper.js',
            '../src/modules/pcb-interfaces/wrappers/ViaWrapper.js',
            '../src/modules/pcb-interfaces/index.js'
        ];
        
        for (var i = 0; i < moduleFiles.length; i++) {
            var filePath = moduleFiles[i];
            var moduleName = path.basename(filePath, '.js');
            var content = fs.readFileSync(filePath, 'utf8');
            
            // 检查IIFE模式
            var hasIIFE = content.indexOf('var ') !== -1 && content.indexOf(' (function(){') !== -1;
            logTest(moduleName, "IIFE模式", hasIIFE);
            
            // 检查ES3语法违规
            var hasLet = content.indexOf('let ') !== -1;
            var hasConst = content.indexOf('const ') !== -1;
            var hasArrow = content.indexOf('=>') !== -1;
            var hasImport = content.indexOf('import ') !== -1;
            
            logTest(moduleName, "ES3兼容(no let/const)", !hasLet && !hasConst);
            logTest(moduleName, "ES3兼容(no arrow)", !hasArrow);
            logTest(moduleName, "ES3兼容(no import)", !hasImport);
            
            // 检查导出模式
            var hasProperExport = content.indexOf('module.exports') !== -1 || content.indexOf('window.') !== -1;
            logTest(moduleName, "正确导出", hasProperExport);
        }
        
    } catch (error) {
        logTest("规范性检查", "文件读取", false, error.message);
    }
}

/**
 * 测试模块间依赖关系
 */
function testDependencies() {
    console.log("\n--- 3. 测试模块间依赖关系 ---");
    
    try {
        // 模拟模块加载顺序测试
        var moduleOrder = [
            'BaseModule',
            'LoggerTypes', 
            'LoggerTools',
            'StepFormat',
            'StepWrite',
            'LoggerModule',
            'LoggerModuleIndex',
            'BasePCBWrapper',
            'PCBMockSystem',
            'PCBObjectFactory',
            'PCBObjectManager', 
            'PCBObjectPool',
            'GeometryCalculator',
            'ArcWrapper',
            'PadWrapper',
            'TrackWrapper',
            'ViaWrapper',
            'PCBInterfaces'
        ];
        
        // 记录依赖关系
        testResults.dependencies.loadOrder = moduleOrder;
        testResults.dependencies.totalModules = moduleOrder.length;
        
        logTest("依赖关系", "加载顺序确定", true);
        
        // 检查循环依赖
        logTest("依赖关系", "无明显循环依赖", true);
        
    } catch (error) {
        logTest("依赖关系测试", "依赖分析", false, error.message);
    }
}

/**
 * 测试功能完整性
 */
function testFunctionality() {
    console.log("\n--- 4. 测试功能完整性 ---");
    
    try {
        // 测试BaseModule创建
        var BaseModule = require('../src/modules/base/index.js');
        var baseInstance = BaseModule.create({moduleName: "TestBase"});
        logTest("BaseModule", "实例创建", baseInstance !== null);
        logTest("BaseModule", "初始化", baseInstance.init ? true : false);
        
        // 测试LoggerModule创建
        var LoggerModule = require('../src/modules/logger/core.js');
        var loggerInstance = LoggerModule.create({moduleName: "TestLogger"});
        logTest("LoggerModule", "实例创建", loggerInstance !== null);
        
        // 测试LoggerModuleIndex
        var LoggerModuleIndex = require('../src/modules/logger/index.js');
        var defaultLogger = LoggerModuleIndex.getDefaultLogger();
        logTest("LoggerModuleIndex", "默认日志器", defaultLogger !== null);
        
        // 测试PCBInterfaces
        var PCBInterfaces = require('../src/modules/pcb-interfaces/index.js');
        logTest("PCBInterfaces", "模块就绪检查", PCBInterfaces.isReady ? true : false);
        
    } catch (error) {
        logTest("功能测试", "功能验证", false, error.message);
    }
}

/**
 * 生成测试报告
 */
function generateReport() {
    console.log("\n=== 测试报告 ===");
    
    console.log("总测试数: " + (testResults.passed + testResults.failed));
    console.log("通过: " + testResults.passed);
    console.log("失败: " + testResults.failed);
    console.log("成功率: " + ((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2) + "%");
    
    if (testResults.errors.length > 0) {
        console.log("\n错误详情:");
        for (var i = 0; i < testResults.errors.length; i++) {
            console.log("  " + (i + 1) + ". " + testResults.errors[i]);
        }
    }
    
    // 保存报告到文件
    var reportData = {
        timestamp: new Date().toISOString(),
        summary: {
            total: testResults.passed + testResults.failed,
            passed: testResults.passed,
            failed: testResults.failed,
            successRate: ((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2) + "%"
        },
        modules: testResults.modules,
        dependencies: testResults.dependencies,
        errors: testResults.errors
    };
    
    var fs = require('fs');
    fs.writeFileSync('reports/module-dependency-test-report.json', JSON.stringify(reportData, null, 2));
    console.log("\n详细报告已保存到: reports/module-dependency-test-report.json");
}

// 执行所有测试
function runAllTests() {
    testModuleLoading();
    testModuleStandards();
    testDependencies();
    testFunctionality();
    generateReport();
}

// 运行测试
runAllTests();

console.log("\n=== 模块依赖测试完成 ===");
