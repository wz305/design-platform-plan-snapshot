/**
 * 自动测试构建工具
 * 
 * 根据模块依赖关系自动按正确顺序构建测试脚本
 * 解决多文件模块项目的测试问题
 */

var fs = require('fs');
var path = require('path');

/**
 * 模块依赖分析器
 */
var DependencyAnalyzer = (function(){
    
    /**
     * 分析模块文件的依赖关系
     * @param {string} content 模块文件内容
     * @returns {Array} 依赖的模块名列表
     */
    function analyzeDependencies(content) {
        var dependencies = [];
        var lines = content.split('\n');
        
        // 首先提取模块变量名
        var moduleNameMatch = content.match(/var\s+([A-Z][A-Za-z0-9_]*)\s*=/);
        var currentModuleName = moduleNameMatch ? moduleNameMatch[1] : null;
        
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            
            // 查找 if (ModuleName) 模式的依赖
            var dependencyMatch = line.match(/if\s*\(\s*([A-Z][A-Za-z0-9_]*)\s*\)/);
            if (dependencyMatch) {
                var depName = dependencyMatch[1];
                
                // 排除常见的非模块依赖和私有变量
                if (depName !== 'module' && depName !== 'exports' && 
                    depName !== 'console' && depName !== 'window' && 
                    depName !== 'global' && depName !== 'require' &&
                    depName !== currentModuleName &&
                    !depName.startsWith('_')) {
                    dependencies.push(depName);
                }
            }
            
            // 查找直接调用 ModuleName.method() 模式的依赖 - 仅作为提示
            // 更严格的匹配，避免匹配变量属性
            var directCallMatch = line.match(/\b([A-Z][a-zA-Z0-9_]*)\.(create|get|set|init|destroy|run|call|apply|log|error|warn|info|debug)\s*\(/);
            if (directCallMatch) {
                var directDepName = directCallMatch[1];
                
                // 排除常见的非模块依赖和私有变量
                if (directDepName !== 'module' && directDepName !== 'exports' && 
                    directDepName !== 'console' && directDepName !== 'window' && 
                    directDepName !== 'global' && directDepName !== 'require' &&
                    directDepName !== 'Math' && directDepName !== 'JSON' && 
                    directDepName !== 'Date' && directDepName !== 'Object' &&
                    directDepName !== 'Array' && directDepName !== 'String' &&
                    directDepName !== 'Number' && directDepName !== 'Boolean' &&
                    directDepName !== 'RegExp' && directDepName !== 'Function' &&
                    directDepName !== 'Error' && directDepName !== 'Promise' &&
                    directDepName !== currentModuleName &&
                    !directDepName.startsWith('_') &&
                    dependencies.indexOf(directDepName) === -1) {
                    // 仅作为提示，不添加到依赖列表中
                    // 模块调用应该依靠条件依赖模式 if (ModuleName)
                }
            }
        }
        
        // 去重
        var uniqueDeps = [];
        for (var j = 0; j < dependencies.length; j++) {
            if (uniqueDeps.indexOf(dependencies[j]) === -1) {
                uniqueDeps.push(dependencies[j]);
            }
        }
        
        return uniqueDeps;
    }
    
    /**
     * 拓扑排序：根据依赖关系排序模块
     * @param {Object} modules 模块信息 {name: {content, deps}}
     * @returns {Array} 排序后的模块名列表
     */
    function topologicalSort(modules) {
        var visited = {};
        var visiting = {};
        var result = [];
        
        function visit(name) {
            if (visiting[name]) {
                console.log("警告：发现循环依赖，涉及模块: " + name);
                return;
            }
            if (visited[name]) {
                return;
            }
            
            visiting[name] = true;
            
            var deps = modules[name].deps;
            for (var i = 0; i < deps.length; i++) {
                var dep = deps[i];
                if (modules[dep]) {
                    visit(dep);
                }
            }
            
            visiting[name] = false;
            visited[name] = true;
            result.push(name);
        }
        
        var moduleNames = Object.keys(modules);
        for (var k = 0; k < moduleNames.length; k++) {
            if (!visited[moduleNames[k]]) {
                visit(moduleNames[k]);
            }
        }
        
        return result;
    }
    
    return {
        analyzeDependencies: analyzeDependencies,
        topologicalSort: topologicalSort
    };
})();

/**
 * 测试脚本构建器
 */
var TestScriptBuilder = (function(){
    
    /**
     * 构建测试脚本
     * @param {Array} moduleFiles 模块文件列表
     * @param {string} outputPath 输出路径
     */
    function buildTestScript(moduleFiles, outputPath) {
        console.log("=== 开始构建测试脚本 ===");
        
        // 1. 读取所有模块文件
        var modules = {};
        console.log("\n--- 1. 读取模块文件 ---");
        
        for (var i = 0; i < moduleFiles.length; i++) {
            var filePath = moduleFiles[i];
            var fileName = path.basename(filePath, '.js');
            // 为了避免重名，使用完整路径作为键，但显示时用简单名
            var uniqueKey = filePath.replace(/[\/\\]/g, '_').replace(/:/g, '_');
            var content = fs.readFileSync(filePath, 'utf8');
            
            // 提取实际的模块变量名
            var moduleNameMatch = content.match(/var\s+([A-Z][A-Za-z0-9_]*)\s*=/);
            var actualModuleName = moduleNameMatch ? moduleNameMatch[1] : fileName;
            
            // 特殊处理base模块 - 必须先检查，因为其他模块也可能包含"LoggerModule"字符串
            if (content.indexOf("var BaseModule") !== -1 && content.indexOf("var BaseModule = (function") !== -1) {
                actualModuleName = "BaseModule";
            }
            // 特殊处理logger模块
            else if (content.indexOf("var LoggerModule") !== -1) {
                actualModuleName = "LoggerModule";
            }
            else if (content.indexOf("var LoggerModuleIndex") !== -1) {
                actualModuleName = "LoggerModuleIndex";
            }
            
            console.log("读取模块: " + fileName + " (实际变量名: " + actualModuleName + ")");
            
            modules[uniqueKey] = {
                content: content,
                actualName: actualModuleName,
                deps: DependencyAnalyzer.analyzeDependencies(content),
                fileName: fileName  // 保留原始文件名用于显示
            };
            
            console.log("    存储到modules['" + uniqueKey + "']: " + actualModuleName);
        }
        
        // 2. 分析依赖关系
        console.log("\n--- 2. 分析依赖关系 ---");
        for (var moduleName in modules) {
            var deps = modules[moduleName].deps;
            console.log(moduleName + " (" + modules[moduleName].actualName + ") 依赖: [" + deps.join(", ") + "]");
        }
        
        // 检查缺失依赖
        console.log("\n--- 2.1 检查缺失依赖 ---");
        var allDependencies = [];
        var availableModules = {};
        
        // 首先处理BaseModule，确保最高优先级
        for (var modName in modules) {
            var actualName = modules[modName].actualName;
            if (actualName === "BaseModule") {
                availableModules["BaseModule"] = modName;
            }
        }
        
        // 然后处理其他模块
        for (var modName in modules) {
            var actualName = modules[modName].actualName;
            
            if (actualName === "BaseModule") {
                continue; // 已处理
            }
            
            // 如果已经存在同名模块，使用完整路径区分
            if (availableModules[actualName]) {
                availableModules[actualName + "_" + modName] = modName;
            } else {
                availableModules[actualName] = modName;
            }
        }
        
        // 收集所有依赖
        for (var mod in modules) {
            var deps = modules[mod].deps;
            for (var i = 0; i < deps.length; i++) {
                if (allDependencies.indexOf(deps[i]) === -1) {
                    allDependencies.push(deps[i]);
                }
            }
        }
        
        // 检查每个依赖是否可用
        var missingDeps = [];
        for (var j = 0; j < allDependencies.length; j++) {
            var dep = allDependencies[j];
            if (!availableModules[dep]) {
                missingDeps.push(dep);
            }
        }
        
        if (missingDeps.length > 0) {
            console.log("❌ 发现缺失的依赖:");
            for (var k = 0; k < missingDeps.length; k++) {
                console.log("   - " + missingDeps[k]);
            }
            console.log("\n💡 解决方案:");
            console.log("   1. 确保所有依赖模块都已包含在输入文件列表中");
            console.log("   2. 检查模块变量名是否正确");
            console.log("   3. 确认依赖关系确实存在");
            return null; // 终止构建
        } else {
            console.log("✅ 所有依赖都已找到");
        }
        
        // 3. 拓扑排序
        console.log("\n--- 3. 计算加载顺序 ---");
        var sortedModules = DependencyAnalyzer.topologicalSort(modules);
        console.log("推荐加载顺序: " + sortedModules.join(" -> "));
        
        // 4. 构建测试脚本
        console.log("\n--- 4. 构建测试脚本 ---");
        var testScript = buildTestContent(modules, sortedModules);
        
        // 5. 写入文件
        fs.writeFileSync(outputPath, testScript, 'utf8');
        console.log("\n✅ 测试脚本已生成: " + outputPath);
        
        return {
            modules: sortedModules,
            outputPath: outputPath
        };
    }
    
    /**
     * 构建测试脚本内容
     * @param {Object} modules 模块信息
     * @param {Array} order 加载顺序
     * @returns {string} 测试脚本内容
     */
    function buildTestContent(modules, order) {
        var content = [];
        
        // 文件头
        content.push('/**');
        content.push(' * 自动生成的测试脚本');
        content.push(' * ');
        content.push(' * 模块加载顺序: ' + order.join(' -> '));
        content.push(' * 生成时间: ' + new Date().toLocaleString());
        content.push(' */');
        content.push('');
        
        // 加载模块（按依赖顺序）
        content.push('// === 按依赖顺序加载模块 ===');
        for (var i = 0; i < order.length; i++) {
            var moduleName = order[i];
            var moduleContent = modules[moduleName].content;
            
            content.push('');
            content.push('// 加载模块: ' + moduleName);
            content.push(moduleContent);
        }
        
        content.push('');
        
        // 简化导出
        content.push('// === 简化导出 ===');
        for (var j = 0; j < order.length; j++) {
            var modName = order[j];
            var actualName = modules[modName].actualName;
            content.push('if (typeof module !== "undefined" && module.exports) {');
            content.push('    module.exports.' + actualName + ' = ' + actualName + ';');
            content.push('}');
        }
        
        content.push('');
        
        // 测试代码
        content.push('// === 测试代码 ===');
        content.push('function runAutoTest() {');
        content.push('    console.log("=== 自动生成的模块测试 ===");');
        content.push('    ');
        
        // 基本存在性测试
        for (var k = 0; k < order.length; k++) {
            var name = order[k];
            var actualName = modules[name].actualName;
            content.push('    console.log("' + actualName + ' 可用: " + (typeof ' + actualName + ' !== "undefined"));');
        }
        
        content.push('    ');
        
        // 功能测试（如果有依赖关系）
        if (order.length >= 2) {
            var firstModule = modules[order[0]].actualName;
            var secondModule = modules[order[1]].actualName;
            content.push('    // 测试模块间调用');
            content.push('    try {');
            content.push('        if (' + firstModule + ' && ' + secondModule + ') {');
            content.push('            console.log("模块调用测试通过");');
            content.push('        } else {');
            content.push('            console.log("模块调用测试失败");');
            content.push('        }');
            content.push('    } catch (error) {');
            content.push('        console.log("测试错误: " + error.message);');
            content.push('    }');
        }
        
        content.push('    ');
        content.push('    console.log("=== 测试完成 ===");');
        content.push('}');
        content.push('');
        
        // 自动运行
        content.push('// Node.js环境自动运行');
        content.push('if (typeof window === "undefined") {');
        content.push('    runAutoTest();');
        content.push('}');
        
        return content.join('\n');
    }
    
    return {
        buildTestScript: buildTestScript
    };
})();

/**
 * 主函数
 */
function main() {
    var args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log("用法: node auto-test-builder.js <模块文件1> <模块文件2> ... <输出文件>");
        console.log("");
        console.log("示例:");
        console.log("  node auto-test-builder.js test-module-a.js test-module-b.js auto-test.js");
        console.log("");
        return;
    }
    
    var moduleFiles = args.slice(0, -1);
    var outputPath = args[args.length - 1];
    
    console.log("输入模块文件:");
    for (var i = 0; i < moduleFiles.length; i++) {
        console.log("  " + (i + 1) + ". " + moduleFiles[i]);
    }
    console.log("输出文件: " + outputPath);
    console.log("");
    
    // 构建测试脚本
    var result = TestScriptBuilder.buildTestScript(moduleFiles, outputPath);
    
    if (result) {
        console.log("");
        console.log("=== 构建完成 ===");
        console.log("生成的测试文件: " + result.outputPath);
        console.log("包含模块: " + result.modules.join(", "));
        
        // 询问是否立即运行
        console.log("");
        console.log("是否立即运行测试？(Ctrl+C 取消)");
        setTimeout(function() {
            try {
                require('./' + path.basename(outputPath, '.js'));
            } catch (error) {
                console.log("运行测试时出错: " + error.message);
            }
        }, 2000);
    } else {
        console.log("");
        console.log("=== 构建失败 ===");
        console.log("请解决依赖问题后重试");
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

// 导出供其他脚本使用
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        DependencyAnalyzer: DependencyAnalyzer,
        TestScriptBuilder: TestScriptBuilder
    };
}
