/**
 * 核心依赖构建器
 * 
 * 基于config/merge-order.json自动构建依赖顺序并报告依赖错误
 * 复用auto-test-builder.js的依赖分析逻辑
 */

var fs = require('fs');
var path = require('path');

/**
 * 依赖构建器
 */
var DependencyBuilder = (function(){
    
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
                    !depName.startsWith('_') &&
                    // 排除常见的本地变量名
                    depName !== 'WrapperConstructor' && depName !== 'objectType' &&
                    depName !== 'nativeObject' && depName !== 'options' &&
                    depName !== 'iterator' && depName !== 'mockData' &&
                    depName !== 'count' && depName !== 'maxCount' &&
                    depName !== 'result' && depName !== 'error' &&
                    // 排除常见UI/DFM全局对象（非模块依赖）
                    depName !== 'MainForm' && depName !== 'ObjectCreatorForm') {
                    dependencies.push(depName);
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
     * 读取配置文件
     * @returns {Object|null} 配置对象
     */
    function loadConfig() {
        try {
            var configPath = path.join(__dirname, '../config/merge-order.json');
            var content = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            console.error('❌ 读取配置文件失败: ' + error.message);
            return null;
        }
    }
    
    /**
     * 读取所有模块文件
     * @param {Array} fileList 文件列表
     * @returns {Object} 模块信息 {filePath: {content, actualName, deps}}
     */
    function loadModules(fileList) {
        var modules = {};
        var projectRoot = path.join(__dirname, '..');
        
        console.log('📂 读取模块文件...');
        
        for (var i = 0; i < fileList.length; i++) {
            var filePath = fileList[i];
            var fullPath = path.join(projectRoot, filePath);
            
            try {
                var content = fs.readFileSync(fullPath, 'utf8');
                
                // 提取实际的模块变量名
                var moduleNameMatch = content.match(/var\s+([A-Z][A-Za-z0-9_]*)\s*=/);
                var actualModuleName = moduleNameMatch ? moduleNameMatch[1] : path.basename(filePath, '.js');
                
                // 特殊处理某些模块
                if (content.indexOf("var BaseModule") !== -1 && content.indexOf("var BaseModule = (function") !== -1) {
                    actualModuleName = "BaseModule";
                } else if (content.indexOf("var LoggerModule") !== -1) {
                    actualModuleName = "LoggerModule";
                } else if (content.indexOf("var LoggerModuleIndex") !== -1) {
                    actualModuleName = "LoggerModuleIndex";
                }
                
                var deps = analyzeDependencies(content);
                
                modules[filePath] = {
                    content: content,
                    actualName: actualModuleName,
                    deps: deps,
                    fullPath: fullPath
                };
                
                console.log('  ✓ ' + filePath + ' → ' + actualModuleName + ' (依赖: ' + deps.length + ')');
                
            } catch (error) {
                console.error('  ❌ 读取失败: ' + filePath + ' - ' + error.message);
                return null;
            }
        }
        
        return modules;
    }
    
    /**
     * 验证依赖关系
     * @param {Object} modules 模块信息
     * @returns {Object} 验证结果
     */
    function validateDependencies(modules) {
        console.log('\n🔍 验证依赖关系...');
        
        var result = {
            valid: true,
            errors: [],
            warnings: [],
            missingDependencies: [],
            circularDependencies: []
        };
        
        // 构建可用模块映射
        var availableModules = {};
        for (var filePath in modules) {
            var actualName = modules[filePath].actualName;
            
            // 处理重名模块
            if (availableModules[actualName]) {
                availableModules[actualName + '_' + filePath.replace(/[\/\\:.]/g, '_')] = filePath;
            } else {
                availableModules[actualName] = filePath;
            }
        }
        
        // 检查缺失依赖
        for (var modPath in modules) {
            var deps = modules[modPath].deps;
            var modName = modules[modPath].actualName;
            
            for (var i = 0; i < deps.length; i++) {
                var dep = deps[i];
                if (!availableModules[dep]) {
                    result.missingDependencies.push({
                        module: modName,
                        dependency: dep,
                        file: modPath
                    });
                    result.valid = false;
                }
            }
        }
        
        // 报告缺失依赖
        if (result.missingDependencies.length > 0) {
            console.log('\n❌ 发现缺失的依赖:');
            for (var j = 0; j < result.missingDependencies.length; j++) {
                var missing = result.missingDependencies[j];
                console.log('  - ' + missing.module + ' 需要 ' + missing.dependency + ' (文件: ' + missing.file + ')');
                result.errors.push('模块 ' + missing.module + ' 缺少依赖: ' + missing.dependency);
            }
        } else {
            console.log('✅ 所有依赖都已找到');
        }
        
        // 简单的循环依赖检测
        var visiting = {};
        var visited = {};
        var hasCircular = false;
        
        function visit(moduleName, chain) {
            if (visiting[moduleName]) {
                var cycleStart = chain.indexOf(moduleName);
                if (cycleStart !== -1) {
                    var cycle = chain.slice(cycleStart).concat([moduleName]);
                    result.circularDependencies.push(cycle);
                    result.valid = false;
                    hasCircular = true;
                }
                return;
            }
            
            if (visited[moduleName]) {
                return;
            }
            
            visiting[moduleName] = true;
            chain.push(moduleName);
            
            // 查找对应文件
            var moduleFile = null;
            for (var fp in modules) {
                if (modules[fp].actualName === moduleName) {
                    moduleFile = fp;
                    break;
                }
            }
            
            if (moduleFile) {
                var deps = modules[moduleFile].deps;
                for (var k = 0; k < deps.length; k++) {
                    visit(deps[k], chain.slice());
                }
            }
            
            visiting[moduleName] = false;
            visited[moduleName] = true;
        }
        
        // 检查所有模块的循环依赖
        for (var mod in modules) {
            if (!visited[modules[mod].actualName]) {
                visit(modules[mod].actualName, []);
            }
        }
        
        // 报告循环依赖
        if (result.circularDependencies.length > 0) {
            console.log('\n❌ 发现循环依赖:');
            for (var l = 0; l < result.circularDependencies.length; l++) {
                console.log('  - ' + result.circularDependencies[l].join(' → '));
                result.errors.push('循环依赖: ' + result.circularDependencies[l].join(' → '));
            }
        } else {
            console.log('✅ 无循环依赖');
        }
        
        return result;
    }
    
    /**
     * 构建依赖报告
     * @param {Object} modules 模块信息
     * @param {Object} validation 验证结果
     * @returns {Object} 构建报告
     */
    function buildReport(modules, validation) {
        var report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalModules: Object.keys(modules).length,
                validDependencies: validation.valid,
                errors: validation.errors.length,
                warnings: validation.warnings.length,
                missingDependencies: validation.missingDependencies.length,
                circularDependencies: validation.circularDependencies.length
            },
            modules: {},
            dependencies: {
                missing: validation.missingDependencies,
                circular: validation.circularDependencies
            },
            errors: validation.errors,
            warnings: validation.warnings
        };
        
        // 模块详细信息
        for (var filePath in modules) {
            var module = modules[filePath];
            report.modules[filePath] = {
                name: module.actualName,
                dependencies: module.deps,
                size: module.content.length
            };
        }
        
        return report;
    }
    
    /**
     * 主要的依赖构建函数
     * @returns {Object} 构建结果
     */
    function build() {
        console.log('🚀 开始依赖构建...\n');
        
        var startTime = Date.now();
        
        // 1. 加载配置
        var config = loadConfig();
        if (!config) {
            return {
                success: false,
                error: '配置文件加载失败'
            };
        }
        
        console.log('📋 配置文件加载成功，包含 ' + config.mergeOrder.length + ' 个模块\n');
        
        // 2. 加载模块
        var modules = loadModules(config.mergeOrder);
        if (!modules) {
            return {
                success: false,
                error: '模块文件加载失败'
            };
        }
        
        // 3. 验证依赖
        var validation = validateDependencies(modules);
        
        // 4. 生成报告
        var report = buildReport(modules, validation);
        
        // 5. 保存报告
        var reportPath = path.join(__dirname, '../reports/dependency-build-report.json');
        try {
            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
            console.log('\n📊 依赖报告已保存: ' + reportPath);
        } catch (error) {
            console.warn('⚠️ 保存报告失败: ' + error.message);
        }
        
        var duration = Date.now() - startTime;
        
        // 6. 输出结果
        console.log('\n📈 构建统计:');
        console.log('  总模块数: ' + report.summary.totalModules);
        console.log('  依赖验证: ' + (report.summary.validDependencies ? '✅ 通过' : '❌ 失败'));
        console.log('  错误数: ' + report.summary.errors);
        console.log('  警告数: ' + report.summary.warnings);
        console.log('  缺失依赖: ' + report.summary.missingDependencies);
        console.log('  循环依赖: ' + report.summary.circularDependencies);
        console.log('  耗时: ' + duration + 'ms');
        
        return {
            success: validation.valid,
            modules: modules,
            report: report,
            duration: duration
        };
    }
    
    return {
        build: build,
        analyzeDependencies: analyzeDependencies,
        loadConfig: loadConfig,
        validateDependencies: validateDependencies
    };
})();

// 如果直接运行此脚本
if (require.main === module) {
    var result = DependencyBuilder.build();
    
    if (result.success) {
        console.log('\n🎉 依赖构建完成！');
        process.exit(0);
    } else {
        console.log('\n💥 依赖构建失败！');
        process.exit(1);
    }
}

// 导出模块
if (typeof module !== "undefined" && module.exports) {
    module.exports = DependencyBuilder;
}
