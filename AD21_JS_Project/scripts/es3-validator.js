/**
 * ES3 工程语义操作系统 - 验证器脚本
 * 职责：作为构建流程的一部分，验证所有构建文件的 ES3 合法性
 * 
 * 使用方法：
 * npm run es3-validate
 * 
 * @author ES3 工程语义操作系统
 */

var ESLintRunner = require("../analyzer/eslint/eslint-runner");
var fs = require("fs");
var path = require("path");

/**
 * ES3 验证器脚本
 */
function run() {
    console.log("🚀 开始 ES3 工程语义验证...");
    
    try {
        // 读取构建配置文件
        var mergeConfigPath = path.join(__dirname, "../config/merge-order.json");
        if (!fs.existsSync(mergeConfigPath)) {
            console.error("❌ 构建配置文件不存在: " + mergeConfigPath);
            process.exit(1);
        }
        
        var mergeConfig = JSON.parse(fs.readFileSync(mergeConfigPath, "utf8"));
        var buildFiles = mergeConfig.mergeOrder || [];
        
        console.log("📁 根据 config/merge-order.json 发现 " + buildFiles.length + " 个构建文件需要验证");
        
        // 验证文件是否存在
        var existingFiles = [];
        var missingFiles = [];
        
        for (var i = 0; i < buildFiles.length; i++) {
            var filePath = buildFiles[i];
            if (fs.existsSync(filePath)) {
                existingFiles.push(filePath);
            } else {
                missingFiles.push(filePath);
            }
        }
        
        if (missingFiles.length > 0) {
            console.log("⚠️  发现 " + missingFiles.length + " 个文件不存在:");
            for (var j = 0; j < missingFiles.length; j++) {
                console.log("   - " + missingFiles[j]);
            }
        }
        
        var allFiles = existingFiles;
        console.log("   - 实际验证文件: " + allFiles.length);
        
        if (allFiles.length === 0) {
            console.log("⚠️  没有找到需要验证的文件");
            return true;
        }
        
        // 执行 ESLint 验证
        ESLintRunner.validateFiles(allFiles).then(function(result) {
            console.log("\n📊 验证结果统计:");
            console.log("   总文件数: " + result.summary.totalFiles);
            console.log("   错误数: " + result.summary.totalErrors);
            console.log("   警告数: " + result.summary.totalWarnings);
            
            if (result.summary.hasFatalError) {
                console.log("   致命错误: 是");
            }
            
            console.log("\n📋 详细结果:");
            
            var errorFiles = [];
            var warningFiles = [];
            
            for (var i = 0; i < result.results.length; i++) {
                var fileResult = result.results[i];
                
                if (fileResult.error) {
                    console.log("❌ " + fileResult.filePath + " - " + fileResult.error);
                    errorFiles.push(fileResult.filePath);
                } else if (fileResult.errorCount > 0 || fileResult.warningCount > 0) {
                    var status = [];
                    if (fileResult.errorCount > 0) {
                        status.push(fileResult.errorCount + " 错误");
                        errorFiles.push(fileResult.filePath);
                    }
                    if (fileResult.warningCount > 0) {
                        status.push(fileResult.warningCount + " 警告");
                        warningFiles.push(fileResult.filePath);
                    }
                    
                    console.log("⚠️  " + fileResult.filePath + " - " + status.join(", "));
                    
                    // 显示具体错误
                    for (var j = 0; j < fileResult.messages.length; j++) {
                        var msg = fileResult.messages[j];
                        console.log("    Line " + msg.line + ":" + msg.column + " [" + msg.severity.toUpperCase() + "] " + msg.message);
                        if (msg.ruleId) {
                            console.log("        (" + msg.ruleId + ")");
                        }
                    }
                } else {
                    console.log("✅ " + fileResult.filePath);
                }
            }
            
            // 总结
            console.log("\n🎯 验证总结:");
            if (result.success) {
                console.log("🎉 所有文件都通过了 ES3 语法检查！");
                console.log("   ✅ 语言门禁通过 - 可以进行语义分析");
                process.exit(0);
            } else {
                console.log("❌ 验证失败，存在以下问题:");
                if (errorFiles.length > 0) {
                    console.log("   - " + errorFiles.length + " 个文件有语法错误");
                }
                if (warningFiles.length > 0) {
                    console.log("   - " + warningFiles.length + " 个文件有警告");
                }
                if (result.summary.hasFatalError) {
                    console.log("   - 存在致命错误");
                }
                console.log("\n🔧 请修复上述问题后重新验证");
                console.log("   语言门禁未通过 - 无法进行语义分析");
                process.exit(1);
            }
            
        }).catch(function(error) {
            console.error("💥 验证过程中发生错误: " + error.message);
            console.error(error.stack);
            process.exit(1);
        });
        
    } catch (error) {
        console.error("💥 初始化失败: " + error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 如果直接运行此文件，执行验证
if (require.main === module) {
    run();
}

module.exports = { run: run };
