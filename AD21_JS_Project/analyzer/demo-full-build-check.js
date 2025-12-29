/**
 * 完整构建路径语义分析演示
 * 按照merge-order.json中定义的35个文件顺序进行完整语义分析
 * 演示Stage 1-7的完整流程
 */

var fs = require("fs");
var path = require("path");

// 导入语义系统各个阶段
var ESLintRunner = require("./eslint/eslint-runner");
var SemanticAnalyzer = require("./semantic/semantic-analyzer");
var Interpreter = require("./interpretation/interpreter");
var ActionPlanner = require("./execution/action-planner");

/**
 * 完整构建路径检查器
 */
var FullBuildChecker = {
    /**
     * 执行完整构建路径检查
     * @param {Object} options - 配置选项
     */
    runFullCheck: function(options) {
        options = options || {};
        
        console.log("🚀 开始完整构建路径语义分析");
        console.log("=" .repeat(60));
        
        // 第一步：读取构建配置
        var mergeConfig = this._loadMergeOrder();
        console.log("📋 构建配置加载完成，共", mergeConfig.mergeOrder.length, "个文件");
        
        // 第二步：按顺序分析所有文件
        var analysisResults = this._analyzeFilesInOrder(mergeConfig.mergeOrder);
        
        // 第三步：生成执行计划
        var executionPlans = this._generateExecutionPlans(analysisResults);
        
        // 第四步：生成综合报告
        var report = this._generateComprehensiveReport(analysisResults, executionPlans);
        
        // 第五步：保存报告
        this._saveReport(report, options.outputPath || "analyzer/reports/full-build-analysis-report.json");
        
        console.log("✅ 完整构建路径分析完成");
        console.log("📊 分析报告已保存");
        
        return report;
    },
    
    /**
     * 加载构建配置
     * @private
     */
    _loadMergeOrder: function() {
        var configPath = "config/merge-order.json";
        
        if (!fs.existsSync(configPath)) {
            throw new Error("构建配置文件不存在: " + configPath);
        }
        
        var configContent = fs.readFileSync(configPath, "utf8");
        var config = JSON.parse(configContent);
        
        return config;
    },
    
    /**
     * 按顺序分析所有文件
     * @private
     */
    _analyzeFilesInOrder: function(filePaths) {
        var results = {
            summary: {
                totalFiles: filePaths.length,
                processedFiles: 0,
                failedFiles: 0,
                totalStages: 0,
                processingTime: 0
            },
            files: []
        };
        
        var startTime = Date.now();
        
        console.log("\n🔍 开始按顺序分析文件...");
        
        filePaths.forEach(function(filePath, index) {
            console.log("\n" + (index + 1) + ". 分析文件:", filePath);
            console.log("-".repeat(50));
            
            try {
                var fileResult = this._analyzeSingleFile(filePath, index + 1);
                results.files.push(fileResult);
                results.summary.processedFiles++;
                
                console.log("✅ 文件分析完成:", fileResult.summary.status);
                
            } catch (error) {
                console.log("❌ 文件分析失败:", error.message);
                
                results.files.push({
                    filePath: filePath,
                    index: index + 1,
                    summary: { status: "failed", error: error.message },
                    stages: {},
                    executionPlan: null
                });
                
                results.summary.failedFiles++;
            }
        }.bind(this));
        
        results.summary.processingTime = Date.now() - startTime;
        results.summary.totalStages = results.files.reduce(function(total, file) {
            return total + (file.stages ? Object.keys(file.stages).length : 0);
        }, 0);
        
        console.log("\n📊 文件分析汇总:");
        console.log("   成功:", results.summary.processedFiles);
        console.log("   失败:", results.summary.failedFiles);
        console.log("   总耗时:", results.summary.processingTime + "ms");
        
        return results;
    },
    
    /**
     * 分析单个文件
     * @private
     */
    _analyzeSingleFile: function(filePath, fileIndex) {
        var startTime = Date.now();
        
        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            throw new Error("文件不存在: " + filePath);
        }
        
        var sourceCode = fs.readFileSync(filePath, "utf8");
        var fileName = path.basename(filePath);
        
        console.log("   📄 文件大小:", sourceCode.length, "字符");
        console.log("   📄 文件名:", fileName);
        
        var result = {
            filePath: filePath,
            index: fileIndex,
            fileName: fileName,
            summary: {
                status: "success",
                processingTime: 0,
                stagesCompleted: 0
            },
            stages: {},
            executionPlan: null
        };
        
        // Stage 1: ESLint 语言门禁检查
        console.log("   🚪 Stage 1: ESLint语言门禁...");
        try {
            var eslintResult = ESLintRunner.run(sourceCode, {
                configFile: "analyzer/eslint/eslint.config.js"
            });
            
            result.stages.stage1 = {
                name: "ESLint语言门禁",
                status: eslintResult.errorCount === 0 ? "passed" : "warning",
                summary: {
                    errorCount: eslintResult.errorCount,
                    warningCount: eslintResult.warningCount,
                    fixableErrorCount: eslintResult.fixableErrorCount,
                    fixableWarningCount: eslintResult.fixableWarningCount
                },
                details: eslintResult
            };
            
            console.log("      ✅ 通过 (错误:", eslintResult.errorCount, ", 警告:", eslintResult.warningCount, ")");
            result.summary.stagesCompleted++;
            
        } catch (error) {
            console.log("      ❌ 失败:", error.message);
            result.stages.stage1 = {
                name: "ESLint语言门禁",
                status: "failed",
                error: error.message
            };
        }
        
        // Stage 2-4: 语义分析
        console.log("   🔍 Stage 2-4: 语义分析...");
        try {
            var semanticResult = SemanticAnalyzer.analyze(sourceCode, {
                fileName: fileName,
                filePath: filePath
            });
            
            result.stages.stage2_4 = {
                name: "语义分析 (Stage 2-4)",
                status: "success",
                summary: {
                    symbolCount: semanticResult.symbols ? Object.keys(semanticResult.symbols).length : 0,
                    functionCount: semanticResult.functions ? semanticResult.functions.length : 0,
                    moduleCount: semanticResult.modules ? semanticResult.modules.length : 0,
                    dependencyCount: semanticResult.dependencies ? semanticResult.dependencies.length : 0
                },
                details: semanticResult
            };
            
            console.log("      ✅ 成功 (符号:", result.stages.stage2_4.summary.symbolCount, 
                       ", 函数:", result.stages.stage2_4.summary.functionCount, ")");
            result.summary.stagesCompleted++;
            
        } catch (error) {
            console.log("      ❌ 失败:", error.message);
            result.stages.stage2_4 = {
                name: "语义分析 (Stage 2-4)",
                status: "failed",
                error: error.message
            };
        }
        
        // Stage 5: Facts提取
        console.log("   📋 Stage 5: Facts提取...");
        try {
            var factsResult = semanticResult ? SemanticAnalyzer.extractFacts(semanticResult) : null;
            
            if (factsResult) {
                result.stages.stage5 = {
                    name: "Facts提取 (Stage 5)",
                    status: "success",
                    summary: {
                        factsCount: factsResult.facts ? factsResult.facts.length : 0,
                        confidenceLevel: factsResult.confidence || "unknown"
                    },
                    details: factsResult
                };
                
                console.log("      ✅ 成功 (Facts:", result.stages.stage5.summary.factsCount, ")");
                result.summary.stagesCompleted++;
            }
            
        } catch (error) {
            console.log("      ⚠️  跳过 (依赖Stage 2-4):", error.message);
        }
        
        // Stage 6: 规则解释
        console.log("   ⚖️  Stage 6: 规则解释...");
        try {
            var interpretationResult = factsResult ? Interpreter.interpret(factsResult) : null;
            
            if (interpretationResult) {
                result.stages.stage6 = {
                    name: "规则解释 (Stage 6)",
                    status: "success",
                    summary: {
                        actionsCount: interpretationResult.actions ? interpretationResult.actions.length : 0,
                        warningsCount: interpretationResult.warnings ? interpretationResult.warnings.length : 0,
                        errorsCount: interpretationResult.errors ? interpretationResult.errors.length : 0
                    },
                    details: interpretationResult
                };
                
                console.log("      ✅ 成功 (Actions:", result.stages.stage6.summary.actionsCount, 
                           ", Warnings:", result.stages.stage6.summary.warningsCount, ")");
                result.summary.stagesCompleted++;
                
                // Stage 7: 执行计划生成
                console.log("   🎯 Stage 7: 执行计划生成...");
                var executionPlan = ActionPlanner.createPlan(interpretationResult, {
                    mode: "dry-run"
                });
                
                result.executionPlan = {
                    name: "执行计划 (Stage 7)",
                    status: "success",
                    summary: {
                        stepsCount: executionPlan.steps ? executionPlan.steps.length : 0,
                        riskLevel: executionPlan.riskSummary ? executionPlan.riskSummary.level : "unknown",
                        blockersCount: executionPlan.riskSummary ? executionPlan.riskSummary.blockers : 0
                    },
                    details: executionPlan
                };
                
                console.log("      ✅ 成功 (Steps:", result.executionPlan.summary.stepsCount, 
                           ", Risk:", result.executionPlan.summary.riskLevel, ")");
                result.summary.stagesCompleted++;
                
            }
            
        } catch (error) {
            console.log("      ⚠️  跳过 (依赖Stage 5):", error.message);
        }
        
        result.summary.processingTime = Date.now() - startTime;
        
        console.log("   ⏱️  处理耗时:", result.summary.processingTime + "ms");
        console.log("   📊 完成阶段数:", result.summary.stagesCompleted + "/7");
        
        return result;
    },
    
    /**
     * 生成执行计划汇总
     * @private
     */
    _generateExecutionPlans: function(analysisResults) {
        var plans = {
            summary: {
                totalPlans: 0,
                totalSteps: 0,
                riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
                stepTypeDistribution: {}
            },
            plans: []
        };
        
        analysisResults.files.forEach(function(fileResult) {
            if (fileResult.executionPlan && fileResult.executionPlan.status === "success") {
                var plan = fileResult.executionPlan.details;
                
                plans.plans.push({
                    filePath: fileResult.filePath,
                    fileName: fileResult.fileName,
                    planId: plan.meta ? plan.meta.id : "unknown",
                    riskLevel: fileResult.executionPlan.summary.riskLevel,
                    stepsCount: fileResult.executionPlan.summary.stepsCount,
                    blockersCount: fileResult.executionPlan.summary.blockersCount,
                    plan: plan
                });
                
                plans.summary.totalPlans++;
                plans.summary.totalSteps += fileResult.executionPlan.summary.stepsCount;
                
                // 统计风险分布
                var risk = fileResult.executionPlan.summary.riskLevel;
                if (plans.summary.riskDistribution[risk] !== undefined) {
                    plans.summary.riskDistribution[risk]++;
                }
                
                // 统计步骤类型分布
                if (plan.steps) {
                    plan.steps.forEach(function(step) {
                        plans.summary.stepTypeDistribution[step.type] = 
                            (plans.summary.stepTypeDistribution[step.type] || 0) + 1;
                    });
                }
            }
        });
        
        console.log("\n📋 执行计划汇总:");
        console.log("   有效计划:", plans.summary.totalPlans);
        console.log("   总步骤数:", plans.summary.totalSteps);
        console.log("   风险分布:", JSON.stringify(plans.summary.riskDistribution));
        
        return plans;
    },
    
    /**
     * 生成综合报告
     * @private
     */
    _generateComprehensiveReport: function(analysisResults, executionPlans) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                version: "1.0.0",
                description: "完整构建路径语义分析报告"
            },
            summary: {
                files: analysisResults.summary,
                executionPlans: executionPlans.summary,
                overall: {
                    status: analysisResults.summary.failedFiles === 0 ? "success" : "partial",
                    successRate: (analysisResults.summary.processedFiles / analysisResults.summary.totalFiles * 100).toFixed(2) + "%",
                    averageStagesPerFile: (analysisResults.summary.totalStages / analysisResults.summary.processedFiles).toFixed(1)
                }
            },
            details: {
                files: analysisResults.files,
                executionPlans: executionPlans.plans
            },
            insights: this._generateInsights(analysisResults, executionPlans)
        };
        
        return report;
    },
    
    /**
     * 生成洞察信息
     * @private
     */
    _generateInsights: function(analysisResults, executionPlans) {
        var insights = {
            quality: {
                highQualityFiles: 0,
                mediumQualityFiles: 0,
                lowQualityFiles: 0,
                commonIssues: []
            },
            complexity: {
                mostComplexFiles: [],
                averageComplexity: 0
            },
            risks: {
                criticalRisks: [],
                highRiskFiles: []
            },
            recommendations: []
        };
        
        // 分析文件质量
        analysisResults.files.forEach(function(file) {
            var stagesCompleted = file.summary.stagesCompleted;
            var hasExecutionPlan = file.executionPlan && file.executionPlan.status === "success";
            var hasBlockers = file.executionPlan && file.executionPlan.summary.blockersCount > 0;
            
            if (stagesCompleted >= 6 && hasExecutionPlan && !hasBlockers) {
                insights.quality.highQualityFiles++;
            } else if (stagesCompleted >= 4) {
                insights.quality.mediumQualityFiles++;
            } else {
                insights.quality.lowQualityFiles++;
            }
            
            if (hasBlockers) {
                insights.risks.highRiskFiles.push({
                    filePath: file.filePath,
                    blockers: file.executionPlan.summary.blockersCount
                });
            }
        });
        
        // 生成建议
        if (insights.quality.lowQualityFiles > 0) {
            insights.recommendations.push("发现 " + insights.quality.lowQualityFiles + " 个低质量文件，建议优先处理");
        }
        
        if (insights.risks.highRiskFiles.length > 0) {
            insights.recommendations.push("发现 " + insights.risks.highRiskFiles.length + " 个高风险文件，需要重点关注");
        }
        
        if (analysisResults.summary.failedFiles > 0) {
            insights.recommendations.push("有 " + analysisResults.summary.failedFiles + " 个文件分析失败，需要检查文件格式和语法");
        }
        
        return insights;
    },
    
    /**
     * 保存报告
     * @private
     */
    _saveReport: function(report, outputPath) {
        var reportDir = path.dirname(outputPath);
        
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        var reportJson = JSON.stringify(report, null, 2);
        fs.writeFileSync(outputPath, reportJson, "utf8");
        
        // 同时生成Markdown格式报告
        var markdownReport = this._generateMarkdownReport(report);
        var markdownPath = outputPath.replace(".json", ".md");
        fs.writeFileSync(markdownPath, markdownReport, "utf8");
        
        console.log("📄 JSON报告保存至:", outputPath);
        console.log("📄 Markdown报告保存至:", markdownPath);
    },
    
    /**
     * 生成Markdown格式报告
     * @private
     */
    _generateMarkdownReport: function(report) {
        var markdown = "# 完整构建路径语义分析报告\n\n";
        
        markdown += "## 📊 总体概览\n\n";
        markdown += "- **分析时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **文件总数**: " + report.summary.files.totalFiles + "\n";
        markdown += "- **成功处理**: " + report.summary.files.processedFiles + "\n";
        markdown += "- **处理失败**: " + report.summary.files.failedFiles + "\n";
        markdown += "- **成功率**: " + report.summary.overall.successRate + "\n";
        markdown += "- **总处理时间**: " + report.summary.files.processingTime + "ms\n\n";
        
        markdown += "## 🎯 执行计划汇总\n\n";
        markdown += "- **有效计划**: " + report.summary.executionPlans.totalPlans + "\n";
        markdown += "- **总步骤数**: " + report.summary.executionPlans.totalSteps + "\n";
        markdown += "- **风险分布**: " + JSON.stringify(report.summary.executionPlans.riskDistribution) + "\n\n";
        
        markdown += "## 📋 文件分析详情\n\n";
        
        report.details.files.forEach(function(file) {
            markdown += "### " + file.fileName + "\n\n";
            markdown += "- **路径**: " + file.filePath + "\n";
            markdown += "- **状态**: " + file.summary.status + "\n";
            markdown += "- **完成阶段**: " + file.summary.stagesCompleted + "/7\n";
            markdown += "- **处理时间**: " + file.summary.processingTime + "ms\n\n";
            
            if (file.executionPlan && file.executionPlan.status === "success") {
                markdown += "**执行计划**:\n";
                markdown += "- 步骤数: " + file.executionPlan.summary.stepsCount + "\n";
                markdown += "- 风险级别: " + file.executionPlan.summary.riskLevel + "\n";
                markdown += "- 阻断问题: " + file.executionPlan.summary.blockersCount + "\n\n";
            }
        });
        
        markdown += "## 💡 洞察与建议\n\n";
        
        markdown += "### 质量分析\n\n";
        markdown += "- **高质量文件**: " + report.details.insights.quality.highQualityFiles + "\n";
        markdown += "- **中等质量文件**: " + report.details.insights.quality.mediumQualityFiles + "\n";
        markdown += "- **低质量文件**: " + report.details.insights.quality.lowQualityFiles + "\n\n";
        
        if (report.details.insights.recommendations.length > 0) {
            markdown += "### 建议\n\n";
            report.details.insights.recommendations.forEach(function(rec) {
                markdown += "- " + rec + "\n";
            });
            markdown += "\n";
        }
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动完整构建路径语义分析");
    
    try {
        var report = FullBuildChecker.runFullCheck({
            outputPath: "analyzer/reports/full-build-analysis-report.json"
        });
        
        console.log("\n🎉 分析完成！");
        console.log("📊 成功率:", report.summary.overall.successRate);
        console.log("📊 有效执行计划:", report.summary.executionPlans.totalPlans);
        
    } catch (error) {
        console.error("❌ 分析失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = FullBuildChecker;
