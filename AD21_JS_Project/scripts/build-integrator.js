/**
 * 构建集成器
 * 
 * 将测试通过的UTF8版本转换为GB2312、资源复制等功能
 * 集成现有的build.js构建系统
 */

var fs = require('fs');
var path = require('path');
var TestRunner = require('./test-runner');
var DefUseRunner = require('./defuse-runner');

/**
 * 构建集成器
 */
var BuildIntegrator = (function(){
    
    /**
     * 加载现有构建系统
     * @returns {Object} 构建管理器实例
     */
    function loadExistingBuildSystem() {
        try {
            var buildPath = path.join(__dirname, '../build/build.js');
            var buildModule = require(buildPath);
            return buildModule.BuildManager ? new buildModule.BuildManager() : null;
        } catch (error) {
            console.error('❌ 加载现有构建系统失败: ' + error.message);
            return null;
        }
    }
    
    /**
     * 运行测试并验证
     * @returns {Object} 测试结果
     */
    function runAndValidateTests() {
        console.log('🧪 运行测试验证...');
        
        // 1. 构建测试环境
        var testResult = TestRunner.run();
        if (!testResult.success) {
            return {
                success: false,
                error: '测试环境构建失败: ' + testResult.error,
                stage: 'test-build'
            };
        }
        
        // 2. 执行测试
        console.log('🚀 执行模块测试...');
        
        try {
            var { spawn } = require('child_process');
            
            return new Promise(function(resolve, reject) {
                var testProcess = spawn('node', [testResult.testFile.path], {
                    cwd: path.dirname(testResult.testFile.path),
                    stdio: 'pipe'
                });
                
                var stdout = '';
                var stderr = '';
                
                testProcess.stdout.on('data', function(data) {
                    stdout += data.toString();
                });
                
                testProcess.stderr.on('data', function(data) {
                    stderr += data.toString();
                });
                
                testProcess.on('close', function(code) {
                    // 读取测试报告
                    var testReport = null;
                    try {
                        var reportPath = path.join(__dirname, '../reports/test-runner-report.json');
                        if (fs.existsSync(reportPath)) {
                            var reportContent = fs.readFileSync(reportPath, 'utf8');
                            testReport = JSON.parse(reportContent);
                        }
                    } catch (error) {
                        console.warn('⚠️ 读取测试报告失败: ' + error.message);
                    }
                    
                    if (code === 0) {
                        console.log('✅ 测试验证通过');
                        resolve({
                            success: true,
                            exitCode: code,
                            testReport: testReport,
                            stdout: stdout,
                            stderr: stderr
                        });
                    } else {
                        console.log('❌ 测试验证失败，退出码: ' + code);
                        if (stderr) {
                            console.log('错误输出: ' + stderr);
                        }
                        resolve({
                            success: false,
                            exitCode: code,
                            error: '测试验证失败，退出码: ' + code,
                            testReport: testReport,
                            stdout: stdout,
                            stderr: stderr
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
                error: '执行测试时出错: ' + error.message
            };
        }
    }
    
    /**
     * 执行生产构建
     * @param {Object} buildManager 构建管理器实例
     * @returns {Object} 构建结果
     */
    function executeProductionBuild(buildManager) {
        console.log('🏭 执行生产构建...');
        
        if (!buildManager) {
            return {
                success: false,
                error: '构建管理器不可用'
            };
        }
        
        try {
            var buildResult = buildManager.build();
            
            if (buildResult && buildResult.success) {
                console.log('✅ 生产构建完成');
                return {
                    success: true,
                    files: buildResult.files,
                    report: buildResult.report
                };
            } else {
                console.log('❌ 生产构建失败');
                return {
                    success: false,
                    error: '生产构建失败',
                    details: buildResult ? buildResult.errors : ['未知错误']
                };
            }
        } catch (error) {
            console.error('❌ 生产构建异常: ' + error.message);
            return {
                success: false,
                error: '生产构建异常: ' + error.message
            };
        }
    }
    
    /**
     * 运行Def-Use分析
     * @returns {Object} 分析结果
     */
    function runDefUseAnalysis() {
        console.log('🔍 运行Def-Use静态分析...');
        
        try {
            var defuseResult = DefUseRunner.runIntegrated();
            
            if (defuseResult.success) {
                console.log('✅ Def-Use分析完成');
                return {
                    success: true,
                    result: defuseResult,
                    issues: defuseResult.totalIssues || 0
                };
            } else {
                console.log('❌ Def-Use分析失败');
                return {
                    success: false,
                    error: defuseResult.error || 'Def-Use分析失败',
                    issues: defuseResult.totalIssues || 0
                };
            }
        } catch (error) {
            console.error('❌ Def-Use分析异常: ' + error.message);
            return {
                success: false,
                error: 'Def-Use分析异常: ' + error.message,
                issues: 0
            };
        }
    }
    
    /**
     * 验证构建输出
     * @param {Object} buildResult 构建结果
     * @returns {Object} 验证结果
     */
    function validateBuildOutput(buildResult) {
        console.log('🔍 验证构建输出...');
        
        var validation = {
            success: true,
            errors: [],
            warnings: [],
            files: {}
        };
        
        var distDir = path.join(__dirname, '../dist');
        
        // 验证必需文件
        var requiredFiles = [
            'main.js',          // GB2312版本
            'main_utf8.js',     // UTF8版本
            'main_utf8_test.js', // 测试版本
            'build-report.json' // 构建报告
        ];
        
        for (var i = 0; i < requiredFiles.length; i++) {
            var fileName = requiredFiles[i];
            var filePath = path.join(distDir, fileName);
            
            if (fs.existsSync(filePath)) {
                var stats = fs.statSync(filePath);
                validation.files[fileName] = {
                    exists: true,
                    size: stats.size,
                    path: filePath
                };
                console.log('✅ ' + fileName + ' (' + stats.size + ' bytes)');
            } else {
                validation.files[fileName] = {
                    exists: false,
                    size: 0,
                    path: filePath
                };
                validation.errors.push('缺失文件: ' + fileName);
                validation.success = false;
                console.log('❌ ' + fileName + ' - 文件不存在');
            }
        }
        
        // 验证文件大小合理性
        if (validation.files['main_utf8.js'] && validation.files['main_utf8.js'].exists) {
            var utf8Size = validation.files['main_utf8.js'].size;
            if (utf8Size < 1000) {
                validation.warnings.push('UTF8文件过小，可能构建不完整');
            }
        }
        
        if (validation.files['main.js'] && validation.files['main.js'].exists) {
            var gb2312Size = validation.files['main.js'].size;
            if (gb2312Size < 1000) {
                validation.warnings.push('GB2312文件过小，可能转换失败');
            }
        }
        
        return validation;
    }
    
    /**
     * 生成集成报告
     * @param {Object} testResult 测试结果
     * @param {Object} buildResult 构建结果
     * @param {Object} defuseResult Def-Use分析结果
     * @param {Object} validation 输出验证结果
     * @param {number} duration 总耗时
     * @returns {Object} 集成报告
     */
    function generateIntegrationReport(testResult, buildResult, defuseResult, validation, duration) {
        var report = {
            timestamp: new Date().toISOString(),
            duration: duration,
            summary: {
                success: validation.success,
                testPassed: testResult.success,
                buildPassed: buildResult.success,
                defusePassed: defuseResult ? defuseResult.success : false,
                totalStages: 4,
                passedStages: 0
            },
            stages: {
                testing: {
                    name: '测试验证',
                    success: testResult.success,
                    duration: testResult.duration || 0,
                    errors: testResult.error ? [testResult.error] : []
                },
                building: {
                    name: '生产构建',
                    success: buildResult.success,
                    duration: buildResult.duration || 0,
                    errors: buildResult.error ? [buildResult.error] : []
                },
                defuse: {
                    name: 'Def-Use分析',
                    success: defuseResult ? defuseResult.success : false,
                    duration: defuseResult && defuseResult.result ? defuseResult.result.duration || 0 : 0,
                    errors: defuseResult && !defuseResult.success ? [defuseResult.error] : [],
                    issues: defuseResult ? defuseResult.issues : 0
                },
                validation: {
                    name: '输出验证',
                    success: validation.success,
                    duration: 0,
                    errors: validation.errors,
                    warnings: validation.warnings
                }
            },
            files: validation.files,
            testReport: testResult.testReport,
            buildReport: buildResult.report,
            defuseReport: defuseResult ? defuseResult.result : null
        };
        
        // 计算通过的阶段数
        if (testResult.success) report.summary.passedStages++;
        if (buildResult.success) report.summary.passedStages++;
        if (defuseResult && defuseResult.success) report.summary.passedStages++;
        if (validation.success) report.summary.passedStages++;
        
        return report;
    }
    
    /**
     * 主要的构建集成函数
     * @returns {Object} 集成结果
     */
    function integrate() {
        console.log('🚀 开始构建集成...\n');
        
        var startTime = Date.now();
        
        // 1. 运行测试验证
        console.log('📋 第一阶段：测试验证');
        var testResult = runAndValidateTests();
        
        if (testResult instanceof Promise) {
            // 异步情况，需要处理
            console.log('⏳ 等待测试完成...');
            return testResult.then(function(testResultSync) {
                return continueIntegration(testResultSync, startTime);
            }).catch(function(error) {
                return {
                    success: false,
                    error: '测试阶段异常: ' + error.message,
                    stage: 'testing'
                };
            });
        } else {
            // 同步情况
            return continueIntegration(testResult, startTime);
        }
    }
    
    /**
     * 继续集成流程
     * @param {Object} testResult 测试结果
     * @param {number} startTime 开始时间
     * @returns {Object} 集成结果
     */
    function continueIntegration(testResult, startTime) {
        if (!testResult.success) {
            var duration = Date.now() - startTime;
            console.log('\n💥 构建集成失败！');
            console.log('❌ 错误: ' + testResult.error);
            console.log('📍 失败阶段: 测试验证');
            console.log('⏱️ 耗时: ' + duration + 'ms');
            
            return {
                success: false,
                error: testResult.error,
                stage: 'testing',
                duration: duration
            };
        }
        
        console.log('\n✅ 测试验证通过');
        
        // 2. 执行生产构建
        console.log('\n📋 第二阶段：生产构建');
        var buildManager = loadExistingBuildSystem();
        var buildResult = executeProductionBuild(buildManager);
        
        if (!buildResult.success) {
            var duration = Date.now() - startTime;
            console.log('\n💥 构建集成失败！');
            console.log('❌ 错误: ' + buildResult.error);
            console.log('📍 失败阶段: 生产构建');
            console.log('⏱️ 耗时: ' + duration + 'ms');
            
            return {
                success: false,
                error: buildResult.error,
                stage: 'building',
                details: buildResult.details || [],
                duration: duration
            };
        }
        
        console.log('\n✅ 生产构建完成');
        
        // 3. 运行Def-Use分析
        console.log('\n📋 第三阶段：Def-Use静态分析');
        var defuseResult = runDefUseAnalysis();
        
        // 4. 验证构建输出
        console.log('\n📋 第四阶段：输出验证');
        var validation = validateBuildOutput(buildResult);
        
        var duration = Date.now() - startTime;
        
        // 4. 生成集成报告
        var integrationReport = generateIntegrationReport(testResult, buildResult, defuseResult, validation, duration);
        
        // 5. 保存集成报告
        var reportPath = path.join(__dirname, '../reports/build-integration-report.json');
        try {
            fs.writeFileSync(reportPath, JSON.stringify(integrationReport, null, 2));
            console.log('\n📊 集成报告已保存: ' + reportPath);
        } catch (error) {
            console.warn('⚠️ 保存集成报告失败: ' + error.message);
        }
        
        // 6. 输出结果
        console.log('\n📈 构建集成统计:');
        console.log('  总耗时: ' + duration + 'ms');
        console.log('  测试验证: ' + (testResult.success ? '✅ 通过' : '❌ 失败'));
        console.log('  生产构建: ' + (buildResult.success ? '✅ 通过' : '❌ 失败'));
        console.log('  Def-Use分析: ' + (defuseResult && defuseResult.success ? '✅ 通过' : '❌ 失败'));
        if (defuseResult && defuseResult.issues > 0) {
            console.log('    发现问题: ' + defuseResult.issues + ' 个');
        }
        console.log('  输出验证: ' + (validation.success ? '✅ 通过' : '❌ 失败'));
        console.log('  总体状态: ' + (integrationReport.summary.success ? '🎉 成功' : '💥 失败'));
        
        if (validation.warnings.length > 0) {
            console.log('  ⚠️ 警告: ' + validation.warnings.length + ' 个');
            for (var i = 0; i < validation.warnings.length; i++) {
                console.log('    - ' + validation.warnings[i]);
            }
        }
        
        if (integrationReport.summary.success) {
            console.log('\n🎉 构建集成完成！');
            console.log('📁 输出文件:');
            for (var fileName in validation.files) {
                if (validation.files[fileName].exists) {
                    console.log('  - ' + fileName + ' (' + validation.files[fileName].size + ' bytes)');
                }
            }
        }
        
        return {
            success: integrationReport.summary.success,
            report: integrationReport,
            testResult: testResult,
            buildResult: buildResult,
            validation: validation,
            duration: duration
        };
    }
    
    return {
        integrate: integrate,
        runAndValidateTests: runAndValidateTests,
        executeProductionBuild: executeProductionBuild,
        validateBuildOutput: validateBuildOutput
    };
})();

// 如果直接运行此脚本
if (require.main === module) {
    var result = BuildIntegrator.integrate();
    
    // 处理Promise结果
    if (result && typeof result.then === 'function') {
        result.then(function(finalResult) {
            if (finalResult.success) {
                console.log('\n🎉 构建集成成功完成！');
                process.exit(0);
            } else {
                console.log('\n💥 构建集成失败！');
                console.log('❌ 错误: ' + finalResult.error);
                console.log('📍 失败阶段: ' + (finalResult.stage || '未知'));
                process.exit(1);
            }
        }).catch(function(error) {
            console.log('\n💥 构建集成异常！');
            console.log('❌ 异常: ' + error.message);
            process.exit(1);
        });
    } else {
        // 同步结果
        if (result.success) {
            console.log('\n🎉 构建集成成功完成！');
            process.exit(0);
        } else {
            console.log('\n💥 构建集成失败！');
            console.log('❌ 错误: ' + result.error);
            console.log('📍 失败阶段: ' + (result.stage || '未知'));
            process.exit(1);
        }
    }
}

// 导出模块
if (typeof module !== "undefined" && module.exports) {
    module.exports = BuildIntegrator;
}
