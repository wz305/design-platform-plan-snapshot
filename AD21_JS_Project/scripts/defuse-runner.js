/**
 * Def-Use 分析运行器 - 基于虚拟Program的全局分析
 * 
 * 核心变化：
 * - 唯一分析入口：node scripts/defuse-runner.js merge
 * - 不再分析 dist/main.js 等构建产物
 * - 完全基于 merge-order.json 进行分析
 * 
 * 集成到构建流程中
 */

var fs = require('fs');
var path = require('path');
var DefUseAnalyzer = require('./defuse-analyzer');

/**
 * Def-Use 运行器
 */
var DefUseRunner = (function(){
    
    var _config = null;
    
    /**
     * 加载配置
     * @returns {Object} 配置对象
     */
    function loadConfig() {
        if (_config) {
            return _config;
        }
        
        try {
            var configPath = path.join(__dirname, '../config/defuse-config.json');
            var configContent = fs.readFileSync(configPath, 'utf8');
            _config = JSON.parse(configContent);
            
            console.log('[DefUseRunner][loadConfig] 配置加载成功');
            return _config;
            
        } catch (error) {
            console.error('[DefUseRunner][loadConfig] 配置加载失败: ' + error.message);
            return null;
        }
    }
    
    /**
     * 运行虚拟Program分析（唯一入口）
     * @returns {Object} 分析结果
     */
    function runVirtualProgramAnalysis() {
        console.log('[DefUseRunner][runVirtualProgramAnalysis] 开始虚拟Program分析');
        
        var config = loadConfig();
        if (!config) {
            return {
                success: false,
                error: '配置加载失败'
            };
        }
        
        // 配置分析器
        DefUseAnalyzer.setConfig(config.analysis);
        
        // 获取merge-order.json路径
        var mergeOrderPath = path.join(__dirname, '../config/merge-order.json');
        
        var startTime = Date.now();
        
        try {
            // 执行虚拟Program分析
            var result = DefUseAnalyzer.analyzeVirtualProgram(mergeOrderPath);
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error
                };
            }
            
            var duration = Date.now() - startTime;
            
            // 保存报告
            var reportPath = path.join(__dirname, '..', config.output.reportDir, 'defuse-virtual-program-report.json');
            var saveResult = DefUseAnalyzer.saveReport(reportPath);
            
            // 打印摘要
            if (config.output.consoleOutput) {
                DefUseAnalyzer.printSummary();
            }
            
            // 检查是否应该失败
            var shouldFail = false;
            var totalIssues = result.result.summary.issues;
            
            if (config.integration.failOnError && totalIssues > 0) {
                // 检查是否有错误级别的问题
                var hasErrors = false;
                for (var i = 0; i < result.result.issues.length; i++) {
                    if (result.result.issues[i].severity === 'error') {
                        hasErrors = true;
                        break;
                    }
                }
                shouldFail = hasErrors;
            }
            
            console.log('[DefUseRunner][runVirtualProgramAnalysis] 分析完成，耗时: ' + duration + 'ms');
            
            return {
                success: !shouldFail,
                type: 'virtual-program',
                result: result.result,
                reportPath: saveResult.success ? reportPath : null,
                duration: duration,
                totalIssues: totalIssues
            };
            
        } catch (error) {
            console.error('[DefUseRunner][runVirtualProgramAnalysis] 分析过程中出错: ' + error.message);
            return {
                success: false,
                error: error.message,
                type: 'virtual-program'
            };
        }
    }
    
    /**
     * 运行分析（主入口）
     * @param {string} type 分析类型 ('merge')
     * @returns {Object} 分析结果
     */
    function run(type) {
        console.log('[DefUseRunner][run] 开始Def-Use分析，类型: ' + type);
        
        var config = loadConfig();
        if (!config) {
            return {
                success: false,
                error: '配置加载失败'
            };
        }
        
        var startTime = Date.now();
        var results = [];
        
        try {
            if (type === 'merge') {
                var virtualResult = runVirtualProgramAnalysis();
                results.push(virtualResult);
            } else {
                console.error('[DefUseRunner][run] 不支持的分析类型: ' + type);
                console.log('[DefUseRunner][run] 支持的类型: merge');
                return {
                    success: false,
                    error: '不支持的分析类型: ' + type + '。请使用 "merge"'
                };
            }
            
            var duration = Date.now() - startTime;
            
            // 汇总结果
            var totalIssues = 0;
            var allSuccess = true;
            
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if (result.totalIssues) {
                    totalIssues += result.totalIssues;
                }
                if (!result.success) {
                    allSuccess = false;
                }
            }
            
            console.log('[DefUseRunner][run] 分析完成，总耗时: ' + duration + 'ms');
            
            return {
                success: allSuccess,
                type: type,
                results: results,
                duration: duration,
                totalIssues: totalIssues
            };
            
        } catch (error) {
            console.error('[DefUseRunner][run] 分析过程中出错: ' + error.message);
            return {
                success: false,
                error: error.message,
                type: type
            };
        }
    }
    
    /**
     * 运行集成分析（构建时调用）
     * @returns {Object} 分析结果
     */
    function runIntegrated() {
        console.log('[DefUseRunner][runIntegrated] 运行集成Def-Use分析');
        
        var config = loadConfig();
        if (!config || !config.integration.buildWithTest) {
            console.log('[DefUseRunner][runIntegrated] 集成分析未启用，跳过');
            return {
                success: true,
                skipped: true,
                message: '集成分析未启用'
            };
        }
        
        // 运行虚拟Program分析
        return run('merge');
    }
    
    /**
     * 验证merge-order.json
     * @returns {Object} 验证结果
     */
    function validateMergeOrder() {
        console.log('[DefUseRunner][validateMergeOrder] 验证merge-order.json');
        
        var mergeOrderPath = path.join(__dirname, '../config/merge-order.json');
        
        if (!fs.existsSync(mergeOrderPath)) {
            return {
                success: false,
                error: 'merge-order.json 文件不存在'
            };
        }
        
        try {
            var configContent = fs.readFileSync(mergeOrderPath, 'utf8');
            var config = JSON.parse(configContent);
            
            if (!config.mergeOrder || !Array.isArray(config.mergeOrder)) {
                return {
                    success: false,
                    error: 'merge-order.json 缺少 mergeOrder 数组'
                };
            }
            
            if (config.mergeOrder.length === 0) {
                return {
                    success: false,
                    error: 'merge-order.json 为空'
                };
            }
            
            // 验证文件存在性
            var missingFiles = [];
            var projectRoot = path.join(__dirname, '..');
            
            for (var i = 0; i < config.mergeOrder.length; i++) {
                var filePath = config.mergeOrder[i];
                var fullPath = path.join(projectRoot, filePath);
                
                if (!fs.existsSync(fullPath)) {
                    missingFiles.push(filePath);
                }
            }
            
            if (missingFiles.length > 0) {
                return {
                    success: false,
                    error: '以下文件不存在: ' + missingFiles.join(', ')
                };
            }
            
            console.log('[DefUseRunner][validateMergeOrder] 验证通过，文件数量: ' + config.mergeOrder.length);
            return {
                success: true,
                fileCount: config.mergeOrder.length,
                files: config.mergeOrder
            };
            
        } catch (error) {
            return {
                success: false,
                error: '配置解析失败: ' + error.message
            };
        }
    }
    
    return {
        run: run,
        runVirtualProgramAnalysis: runVirtualProgramAnalysis,
        runIntegrated: runIntegrated,
        validateMergeOrder: validateMergeOrder,
        loadConfig: loadConfig
    };
})();

// 如果直接运行此脚本
if (require.main === module) {
    var args = process.argv.slice(2);
    var type = args[0] || 'merge'; // 默认运行虚拟Program分析
    
    console.log('🔍 Def-Use 虚拟Program静态分析器');
    console.log('分析类型: ' + type);
    console.log('');
    
    // 显示使用说明
    if (type === 'help' || type === '-h' || type === '--help') {
        console.log('使用方法:');
        console.log('  node scripts/defuse-runner.js merge    # 基于merge-order.json进行虚拟Program分析');
        console.log('  node scripts/defuse-runner.js validate  # 验证merge-order.json配置');
        console.log('  node scripts/defuse-runner.js help      # 显示此帮助信息');
        console.log('');
        console.log('说明:');
        console.log('  - 本分析器不再分析 dist/main.js 等构建产物');
        console.log('  - 唯一分析依据是 config/merge-order.json');
        console.log('  - 所有 var/function 定义视为全局定义');
        console.log('  - 支持顺序违规检测和未定义变量检测');
        process.exit(0);
    }
    
    if (type === 'validate') {
        var validation = DefUseRunner.validateMergeOrder();
        if (validation.success) {
            console.log('✅ merge-order.json 验证通过');
            console.log('📦 文件数量: ' + validation.fileCount);
            process.exit(0);
        } else {
            console.log('❌ merge-order.json 验证失败');
            console.log('错误: ' + validation.error);
            process.exit(1);
        }
    }
    
    var result = DefUseRunner.run(type);
    
    if (result.success) {
        console.log('✅ Def-Use分析完成');
        
        if (result.results) {
            for (var i = 0; i < result.results.length; i++) {
                var analysisResult = result.results[i];
                if (analysisResult.reportPath) {
                    console.log('📊 报告已保存: ' + analysisResult.reportPath);
                }
            }
        }
        
        console.log('⏱️  总耗时: ' + result.duration + 'ms');
        console.log('🔍 发现问题: ' + result.totalIssues + ' 个');
        
        process.exit(0);
    } else {
        console.log('❌ Def-Use分析失败');
        console.log('错误: ' + (result.error || '未知错误'));
        process.exit(1);
    }
}

// 导出模块
if (typeof module !== "undefined" && module.exports) {
    module.exports = DefUseRunner;
}
