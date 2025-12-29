/**
 * 测试集成器
 * 
 * 构建UTF8版本、验证模块功能
 * 集成依赖构建器和现有测试脚本
 */

var fs = require('fs');
var path = require('path');
var DependencyBuilder = require('./dependency-builder');

/**
 * 测试运行器
 */
var TestRunner = (function(){
    
    /**
     * 构建UTF8测试文件
     * @param {Object} modules 模块信息
     * @param {Object} config 配置对象
     * @returns {Object} 构建结果
     */
    function buildUTF8TestFile(modules, config) {
        console.log('🔨 构建UTF8测试文件...');
        
        var testContent = [];
        
        // 文件头
        testContent.push('/**');
        testContent.push(' * 自动生成的UTF8测试文件');
        testContent.push(' * ');
        testContent.push(' * 基于config/merge-order.json生成');
        testContent.push(' * 生成时间: ' + new Date().toLocaleString());
        testContent.push(' * ');
        testContent.push(' * 模块列表: ' + Object.keys(modules).length + ' 个');
        testContent.push(' */');
        testContent.push('');
        
        // AD环境兼容性初始化
        testContent.push('// AD环境兼容性初始化');
        testContent.push('(function(){');
        testContent.push('    if (typeof window === "undefined") {');
        testContent.push('        window = {};');
        testContent.push('    }');
        testContent.push('})();');
        testContent.push('');
        
        // 按merge-order顺序加载模块
        testContent.push('// === 按配置顺序加载模块 ===');
        for (var i = 0; i < config.mergeOrder.length; i++) {
            var filePath = config.mergeOrder[i];
            if (modules[filePath]) {
                var module = modules[filePath];
                testContent.push('');
                testContent.push('// 模块: ' + filePath + ' (' + module.actualName + ')');
                testContent.push(module.content);
            }
        }
        
        testContent.push('');
        
        // 全局导出处理
        testContent.push('// === 全局导出处理 ===');
        testContent.push('(function(){');
        testContent.push('    var globalVars = [');
        
        var moduleNames = [];
        for (var modPath in modules) {
            moduleNames.push('"' + modules[modPath].actualName + '_GLOBAL"');
        }
        
        testContent.push('        ' + moduleNames.join(',\n        '));
        testContent.push('    ];');
        testContent.push('    ');
        testContent.push('    for (var i = 0; i < globalVars.length; i++) {');
        testContent.push('        var varName = globalVars[i];');
        testContent.push('        if (typeof this[varName] !== "undefined") {');
        testContent.push('            window[varName] = this[varName];');
        testContent.push('        }');
        testContent.push('    }');
        testContent.push('})();');
        testContent.push('');
        
        // 测试代码
        testContent.push('// === 自动化测试代码 ===');
        testContent.push(buildTestCode(modules));
        
        var finalContent = testContent.join('\n');
        
        // 确保dist目录存在
        var distDir = path.join(__dirname, '../dist');
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }
        
        // 写入UTF8测试文件
        var utf8TestPath = path.join(distDir, 'main_utf8_test.js');
        try {
            fs.writeFileSync(utf8TestPath, finalContent, 'utf8');
            console.log('✅ UTF8测试文件已生成: ' + utf8TestPath);
            
            return {
                success: true,
                path: utf8TestPath,
                size: finalContent.length,
                modules: Object.keys(modules).length
            };
        } catch (error) {
            console.error('❌ 写入UTF8测试文件失败: ' + error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 构建测试代码
     * @param {Object} modules 模块信息
     * @returns {string} 测试代码
     */
    function buildTestCode(modules) {
        var testCode = [];
        
        testCode.push('function runModuleTests() {');
        testCode.push('    console.log("=== 开始模块测试 ===");');
        testCode.push('    ');
        testCode.push('    var testResults = {');
        testCode.push('        passed: 0,');
        testCode.push('        failed: 0,');
        testCode.push('        errors: []');
        testCode.push('    };');
        testCode.push('    ');
        
        // 基础存在性测试
        testCode.push('    // === 基础存在性测试 ===');
        var moduleIndex = 0;
        for (var modPath in modules) {
            var moduleName = modules[modPath].actualName;
            testCode.push('    // 测试模块: ' + moduleName);
            testCode.push('    try {');
            testCode.push('        var moduleExists' + moduleIndex + ' = typeof ' + moduleName + ' !== "undefined";');
            testCode.push('        if (moduleExists' + moduleIndex + ') {');
            testCode.push('            testResults.passed++;');
            testCode.push('            console.log("✅ ' + moduleName + ' - 模块存在");');
            testCode.push('        } else {');
            testCode.push('            testResults.failed++;');
            testCode.push('            testResults.errors.push("' + moduleName + ' - 模块不存在");');
            testCode.push('            console.log("❌ ' + moduleName + ' - 模块不存在");');
            testCode.push('        }');
            testCode.push('    } catch (error' + moduleIndex + ') {');
            testCode.push('        testResults.failed++;');
            testCode.push('        testResults.errors.push("' + moduleName + ' - 测试异常: " + error' + moduleIndex + '.message);');
            testCode.push('        console.log("❌ ' + moduleName + ' - 测试异常: " + error' + moduleIndex + '.message);');
            testCode.push('    }');
            testCode.push('    ');
            moduleIndex++;
        }
        
        // 功能测试
        testCode.push('    // === 功能测试 ===');
        
        // 测试BaseModule
        if (modules['src/modules/base/index.js']) {
            testCode.push('    // 测试BaseModule创建');
            testCode.push('    try {');
            testCode.push('        if (BaseModule && typeof BaseModule.create === "function") {');
            testCode.push('            var baseInstance = BaseModule.create({moduleName: "TestBase"});');
            testCode.push('            if (baseInstance) {');
            testCode.push('                testResults.passed++;');
            testCode.push('                console.log("✅ BaseModule - 创建成功");');
            testCode.push('            } else {');
            testCode.push('                testResults.failed++;');
            testCode.push('                testResults.errors.push("BaseModule - 创建失败");');
            testCode.push('                console.log("❌ BaseModule - 创建失败");');
            testCode.push('            }');
            testCode.push('        } else {');
            testCode.push('            testResults.failed++;');
            testCode.push('            testResults.errors.push("BaseModule - create方法不存在");');
            testCode.push('        }');
            testCode.push('    } catch (error) {');
            testCode.push('        testResults.failed++;');
            testCode.push('        testResults.errors.push("BaseModule - 测试异常: " + error.message);');
            testCode.push('    }');
            testCode.push('    ');
        }
        
        // 测试LoggerModule
        if (modules['src/modules/logger/core.js']) {
            testCode.push('    // 测试LoggerModule');
            testCode.push('    try {');
            testCode.push('        if (LoggerModule && typeof LoggerModule.create === "function") {');
            testCode.push('            var loggerInstance = LoggerModule.create({moduleName: "TestLogger"});');
            testCode.push('            if (loggerInstance) {');
            testCode.push('                testResults.passed++;');
            testCode.push('                console.log("✅ LoggerModule - 创建成功");');
            testCode.push('            } else {');
            testCode.push('                testResults.failed++;');
            testCode.push('                testResults.errors.push("LoggerModule - 创建失败");');
            testCode.push('                console.log("❌ LoggerModule - 创建失败");');
            testCode.push('            }');
            testCode.push('        } else {');
            testCode.push('            testResults.failed++;');
            testCode.push('            testResults.errors.push("LoggerModule - create方法不存在");');
            testCode.push('        }');
            testCode.push('    } catch (error) {');
            testCode.push('        testResults.failed++;');
            testCode.push('        testResults.errors.push("LoggerModule - 测试异常: " + error.message);');
            testCode.push('    }');
            testCode.push('    ');
        }
        
        // 测试PCB接口
        if (modules['src/modules/pcb-interfaces/index.js']) {
            testCode.push('    // 测试PCBInterfaces');
            testCode.push('    try {');
            testCode.push('        if (PCBInterfaces) {');
            testCode.push('            testResults.passed++;');
            testCode.push('            console.log("✅ PCBInterfaces - 模块可用");');
            testCode.push('        } else {');
            testCode.push('            testResults.failed++;');
            testCode.push('            testResults.errors.push("PCBInterfaces - 模块不存在");');
            testCode.push('            console.log("❌ PCBInterfaces - 模块不存在");');
            testCode.push('        }');
            testCode.push('    } catch (error) {');
            testCode.push('        testResults.failed++;');
            testCode.push('        testResults.errors.push("PCBInterfaces - 测试异常: " + error.message);');
            testCode.push('    }');
            testCode.push('    ');
        }
        
        // 结果汇总
        testCode.push('    // === 测试结果汇总 ===');
        testCode.push('    console.log("");');
        testCode.push('    console.log("=== 测试结果汇总 ===");');
        testCode.push('    console.log("总测试数: " + (testResults.passed + testResults.failed));');
        testCode.push('    console.log("通过: " + testResults.passed);');
        testCode.push('    console.log("失败: " + testResults.failed);');
        testCode.push('    ');
        testCode.push('    var successRate = 0;');
        testCode.push('    if (testResults.passed + testResults.failed > 0) {');
        testCode.push('        successRate = (testResults.passed / (testResults.passed + testResults.failed)) * 100;');
        testCode.push('    }');
        testCode.push('    console.log("成功率: " + successRate.toFixed(2) + "%");');
        testCode.push('    ');
        testCode.push('    if (testResults.errors.length > 0) {');
        testCode.push('        console.log("错误详情:");');
        testCode.push('        for (var i = 0; i < testResults.errors.length; i++) {');
        testCode.push('            console.log("  " + (i + 1) + ". " + testResults.errors[i]);');
        testCode.push('        }');
        testCode.push('    }');
        testCode.push('    ');
        testCode.push('    return {');
        testCode.push('        success: testResults.failed === 0,');
        testCode.push('        passed: testResults.passed,');
        testCode.push('        failed: testResults.failed,');
        testCode.push('        successRate: successRate,');
        testCode.push('        errors: testResults.errors');
        testCode.push('    };');
        testCode.push('}');
        testCode.push('');
        
        // 自动运行测试
        testCode.push('// === 自动运行测试 ===');
        testCode.push('if (typeof window === "undefined") {');
        testCode.push('    // Node.js环境');
        testCode.push('    var testResult = runModuleTests();');
        testCode.push('    ');
        testCode.push('    // 保存测试结果');
        testCode.push('    try {');
        testCode.push('        var fs = require("fs");');
        testCode.push('        var reportData = {');
        testCode.push('            timestamp: new Date().toISOString(),');
        testCode.push('            result: testResult');
        testCode.push('        };');
        testCode.push('        fs.writeFileSync("../reports/test-runner-report.json", JSON.stringify(reportData, null, 2));');
        testCode.push('        console.log("📊 测试报告已保存: ../reports/test-runner-report.json");');
        testCode.push('    } catch (error) {');
        testCode.push('        console.warn("⚠️ 保存测试报告失败: " + error.message);');
        testCode.push('    }');
        testCode.push('    ');
        testCode.push('    // 根据测试结果设置退出码');
        testCode.push('    if (testResult.success) {');
        testCode.push('        console.log("🎉 测试通过！");');
        testCode.push('        process.exit(0);');
        testCode.push('    } else {');
        testCode.push('        console.log("💥 测试失败！");');
        testCode.push('        process.exit(1);');
        testCode.push('    }');
        testCode.push('} else {');
        testCode.push('    // 浏览器环境');
        testCode.push('    console.log("在浏览器环境中，请手动调用 runModuleTests()");');
        testCode.push('}');
        
        return testCode.join('\n');
    }
    
    /**
     * 运行测试
     * @param {Object} testFile 测试文件信息
     * @returns {Object} 测试结果
     */
    function runTests(testFile) {
        console.log('🧪 运行模块测试...');
        
        if (!testFile.success) {
            return {
                success: false,
                error: '测试文件构建失败: ' + testFile.error
            };
        }
        
        try {
            // 使用child_process运行测试文件
            var { spawn } = require('child_process');
            
            return new Promise(function(resolve, reject) {
                console.log('🚀 启动测试进程: ' + testFile.path);
                
                var testProcess = spawn('node', [testFile.path], {
                    cwd: path.dirname(testFile.path),
                    stdio: 'inherit'
                });
                
                testProcess.on('close', function(code) {
                    if (code === 0) {
                        console.log('✅ 测试执行完成，退出码: ' + code);
                        resolve({
                            success: true,
                            exitCode: code
                        });
                    } else {
                        console.log('❌ 测试执行失败，退出码: ' + code);
                        resolve({
                            success: false,
                            exitCode: code,
                            error: '测试进程退出码: ' + code
                        });
                    }
                });
                
                testProcess.on('error', function(error) {
                    console.error('❌ 测试进程错误: ' + error.message);
                    resolve({
                        success: false,
                        error: '测试进程错误: ' + error.message
                    });
                });
                
            });
            
        } catch (error) {
            return {
                success: false,
                error: '运行测试时出错: ' + error.message
            };
        }
    }
    
    /**
     * 主要的测试运行函数
     * @returns {Object} 测试结果
     */
    function run() {
        console.log('🧪 开始测试集成...\n');
        
        var startTime = Date.now();
        
        // 1. 运行依赖构建
        console.log('📋 第一步：依赖构建验证');
        var dependencyResult = DependencyBuilder.build();
        
        if (!dependencyResult.success) {
            return {
                success: false,
                error: '依赖构建失败: ' + (dependencyResult.error || '未知错误'),
                stage: 'dependency'
            };
        }
        
        // 2. 构建UTF8测试文件
        console.log('\n📋 第二步：构建UTF8测试文件');
        var config = DependencyBuilder.loadConfig();
        if (!config) {
            return {
                success: false,
                error: '配置文件加载失败',
                stage: 'config'
            };
        }
        
        var testFileResult = buildUTF8TestFile(dependencyResult.modules, config);
        if (!testFileResult.success) {
            return {
                success: false,
                error: 'UTF8测试文件构建失败: ' + testFileResult.error,
                stage: 'build'
            };
        }
        
        // 3. 运行测试
        console.log('\n📋 第三步：运行模块测试');
        
        // 由于是同步环境，这里返回文件路径，让调用者决定如何运行
        var duration = Date.now() - startTime;
        
        console.log('\n📈 测试集成统计:');
        console.log('  模块数量: ' + dependencyResult.modules.length);
        console.log('  依赖验证: ✅ 通过');
        console.log('  测试文件: ' + testFileResult.path);
        console.log('  文件大小: ' + testFileResult.size + ' bytes');
        console.log('  耗时: ' + duration + 'ms');
        
        return {
            success: true,
            testFile: testFileResult,
            modules: dependencyResult.modules,
            report: dependencyResult.report,
            duration: duration
        };
    }
    
    return {
        run: run,
        buildUTF8TestFile: buildUTF8TestFile,
        runTests: runTests
    };
})();

// 如果直接运行此脚本
if (require.main === module) {
    var result = TestRunner.run();
    
    if (result.success) {
        console.log('\n🎉 测试集成完成！');
        console.log('📁 测试文件: ' + result.testFile.path);
        console.log('💡 请运行以下命令执行测试:');
        console.log('   node ' + result.testFile.path);
        process.exit(0);
    } else {
        console.log('\n💥 测试集成失败！');
        console.log('❌ 错误: ' + result.error);
        console.log('📍 失败阶段: ' + (result.stage || '未知'));
        process.exit(1);
    }
}

// 导出模块
if (typeof module !== "undefined" && module.exports) {
    module.exports = TestRunner;
}
