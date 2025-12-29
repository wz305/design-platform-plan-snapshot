/**
 * ES3 工程语义操作系统 - 分析器脚本
 * 职责：执行完整的 ES3 语义分析流程（Stage 1-2）
 * 
 * 使用方法：
 * npm run es3-analyze
 * 
 * @author ES3 工程语义操作系统
 */

var ESLintRunner = require("../analyzer/eslint/eslint-runner");
var ASTParser = require("../analyzer/ast/parser");
var fs = require("fs");
var path = require("path");

/**
 * ES3 分析器脚本
 */
function run() {
    console.log("🚀 开始 ES3 工程语义分析...");
    
    try {
        // 读取构建配置文件
        var mergeConfigPath = path.join(__dirname, "../config/merge-order.json");
        if (!fs.existsSync(mergeConfigPath)) {
            console.error("❌ 构建配置文件不存在: " + mergeConfigPath);
            process.exit(1);
        }
        
        var mergeConfig = JSON.parse(fs.readFileSync(mergeConfigPath, "utf8"));
        var buildFiles = mergeConfig.mergeOrder || [];
        
        console.log("📁 根据 config/merge-order.json 发现 " + buildFiles.length + " 个构建文件需要分析");
        
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
        
        var sourceFiles = existingFiles;
        console.log("   - 实际分析文件: " + sourceFiles.length);
        
        if (sourceFiles.length === 0) {
            console.log("⚠️  没有找到需要分析的文件");
            return;
        }
        
        // Stage 1: ESLint 语言门禁
        console.log("\n🚪 Stage 1: 语言门禁检查...");
        
        ESLintRunner.validateFiles(sourceFiles).then(function(eslintResult) {
            if (!eslintResult.success) {
                console.log("❌ 语言门禁未通过，停止分析");
                console.log("   请先运行 'npm run es3-validate' 修复语法问题");
                process.exit(1);
                return;
            }
            
            console.log("✅ 语言门禁通过，开始语义分析");
            
            // Stage 2: AST 解析
            console.log("\n🌳 Stage 2: AST 解析...");
            
            var astResults = ASTParser.parseFiles(sourceFiles);
            var successfulFiles = [];
            var failedFiles = [];
            
            for (var i = 0; i < astResults.results.length; i++) {
                var result = astResults.results[i];
                if (result.success) {
                    successfulFiles.push(result);
                    console.log("✅ " + result.filePath);
                } else {
                    failedFiles.push(result);
                    console.log("❌ " + result.filePath + " - " + result.error);
                }
            }
            
            console.log("\n📊 AST 解析统计:");
            console.log("   成功: " + successfulFiles.length);
            console.log("   失败: " + failedFiles.length);
            
            if (failedFiles.length > 0) {
                console.log("⚠️  部分文件解析失败，但继续分析成功文件");
            }
            
            // Stage 2.1: 文件信息分析
            console.log("\n📋 Stage 2.1: 文件信息分析...");
            
            var fileInfos = [];
            var totalModules = 0;
            var totalFunctions = 0;
            var totalSize = 0;
            
            for (var j = 0; j < successfulFiles.length; j++) {
                var fileResult = successfulFiles[j];
                var fileInfo = ASTParser.getFileInfo(fileResult);
                
                if (fileInfo) {
                    fileInfos.push(fileInfo);
                    totalSize += fileInfo.size;
                    
                    if (fileInfo.hasIIFEModules) {
                        totalModules++;
                    }
                    if (fileInfo.hasTopLevelFunctions) {
                        totalFunctions++;
                    }
                    
                    console.log("📄 " + fileInfo.filePath);
                    console.log("    大小: " + fileInfo.size + " 字符");
                    console.log("    顶层节点: " + fileInfo.topLevelNodes);
                    console.log("    IIFE 模块: " + (fileInfo.hasIIFEModules ? "是" : "否"));
                    console.log("    顶层函数: " + (fileInfo.hasTopLevelFunctions ? "是" : "否"));
                }
            }
            
            // 生成分析报告
            console.log("\n📈 ES3 工程语义分析报告");
            console.log("=".repeat(50));
            
            console.log("\n📁 文件统计:");
            console.log("   总文件数: " + sourceFiles.length);
            console.log("   解析成功: " + successfulFiles.length);
            console.log("   解析失败: " + failedFiles.length);
            console.log("   总代码量: " + totalSize + " 字符");
            
            console.log("\n🏗️  结构统计:");
            console.log("   IIFE 模块: " + totalModules);
            console.log("   顶层函数: " + totalFunctions);
            console.log("   平均文件大小: " + Math.round(totalSize / successfulFiles.length) + " 字符");
            
            console.log("\n🎯 工程健康度:");
            
            // 计算健康度指标
            var successRate = (successfulFiles.length / sourceFiles.length * 100).toFixed(1);
            var moduleRate = (totalModules / successfulFiles.length * 100).toFixed(1);
            
            console.log("   解析成功率: " + successRate + "%");
            console.log("   模块化率: " + moduleRate + "%");
            
            if (successRate >= 95) {
                console.log("   ✅ 工程结构良好");
            } else if (successRate >= 80) {
                console.log("   ⚠️  工程结构需要改进");
            } else {
                console.log("   ❌ 工程结构存在严重问题");
            }
            
            console.log("\n🔄 下一步建议:");
            if (failedFiles.length > 0) {
                console.log("   1. 修复解析失败的文件");
            }
            
            if (totalModules < successfulFiles.length * 0.5) {
                console.log("   2. 考虑增加模块化程度");
            }
            
            console.log("   3. 可以开始 Stage 3: 顶层语义识别");
            console.log("   4. 可以开始 Stage 4: 工程符号表构建");
            
            // 保存详细报告
            var reportPath = "reports/es3-analysis-report.json";
            var report = {
                timestamp: new Date().toISOString(),
                summary: {
                    totalFiles: sourceFiles.length,
                    successfulFiles: successfulFiles.length,
                    failedFiles: failedFiles.length,
                    totalSize: totalSize,
                    totalModules: totalModules,
                    totalFunctions: totalFunctions,
                    successRate: parseFloat(successRate),
                    moduleRate: parseFloat(moduleRate)
                },
                files: fileInfos,
                failedFiles: failedFiles.map(function(f) {
                    return {
                        filePath: f.filePath,
                        error: f.error,
                        line: f.line,
                        column: f.column
                    };
                })
            };
            
            // 确保 reports 目录存在
            if (!fs.existsSync("reports")) {
                fs.mkdirSync("reports");
            }
            
            fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
            console.log("\n💾 详细报告已保存到: " + reportPath);
            
            if (eslintResult.success && failedFiles.length === 0) {
                console.log("\n🎉 ES3 工程语义分析完成！");
                console.log("   ✅ Stage 1-2 全部通过");
                console.log("   ✅ 准备进入语义分析阶段");
                process.exit(0);
            } else {
                console.log("\n⚠️  分析完成，但存在需要注意的问题");
                process.exit(1);
            }
            
        }).catch(function(error) {
            console.error("💥 分析过程中发生错误: " + error.message);
            console.error(error.stack);
            process.exit(1);
        });
        
    } catch (error) {
        console.error("💥 初始化失败: " + error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 如果直接运行此文件，执行分析
if (require.main === module) {
    run();
}

module.exports = { run: run };
