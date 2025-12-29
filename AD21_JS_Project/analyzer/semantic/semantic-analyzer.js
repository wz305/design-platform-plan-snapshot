/**
 * ES3 工程语义操作系统 - 语义分析器
 * 职责：整合ESLint、AST解析和语义扫描，提供完整的语义分析功能
 * 
 * @author ES3 工程语义操作系统
 * @module SemanticAnalyzer
 */

var ESLintRunner = require("../eslint/eslint-runner");
var ASTParser = require("../ast/parser");
var TopLevelScanner = require("../semantic/top-level-scanner");
var SymbolTypes = require("../semantic/symbol-types");
var DependencyAnalyzer = require("../semantic/dependency-analyzer");
var ProjectIndex = require("../semantic/project-index");
var CallGraph = require("../semantic/call-graph");
var DefUseAnalyzer = require("../semantic/def-use-analyzer");
var fs = require("fs");
var path = require("path");

/**
 * 语义分析器模块
 */
var SemanticAnalyzer = (function(){
    
    /**
     * 分析单个文件的完整语义
     * @param {string} filePath 文件路径
     * @returns {Object} 分析结果
     */
    async function analyzeFile(filePath) {
        var analysisResult = {
            success: true,
            filePath: filePath,
            stages: {
                eslint: null,
                parsing: null,
                semantic: null
            },
            symbols: [],
            diagnostics: [],
            summary: {
                totalSymbols: 0,
                totalDiagnostics: 0,
                errorCount: 0,
                warningCount: 0
            }
        };
        
        try {
            console.log("🔍 分析文件: " + filePath);
            
            // Stage 1: ESLint 语言门禁检查
            console.log("  📋 Stage 1: ESLint 语言门禁检查...");
            var eslintResult = await ESLintRunner.validateFile(filePath);
            analysisResult.stages.eslint = eslintResult;
            
            if (!eslintResult.success) {
                analysisResult.success = false;
                analysisResult.summary.errorCount += eslintResult.errorCount;
                analysisResult.summary.warningCount += eslintResult.warningCount;
                
                // 将ESLint错误转换为诊断信息
                for (var i = 0; i < eslintResult.messages.length; i++) {
                    var msg = eslintResult.messages[i];
                    var diagnostic = {
                        severity: msg.severity,
                        filePath: filePath,
                        line: msg.line,
                        column: msg.column,
                        message: msg.message + " (" + msg.ruleId + ")",
                        rule: "ESLINT_" + (msg.ruleId || "UNKNOWN"),
                        source: "eslint"
                    };
                    analysisResult.diagnostics.push(diagnostic);
                }
                
                console.log("    ❌ ESLint检查失败，跳过后续分析");
                return analysisResult;
            }
            
            console.log("    ✅ ESLint检查通过");
            
            // Stage 2: AST 解析
            console.log("  🌳 Stage 2: AST 解析...");
            var parseResult = ASTParser.parseFile(filePath);
            analysisResult.stages.parsing = parseResult;
            
            if (!parseResult.success) {
                analysisResult.success = false;
                analysisResult.diagnostics.push({
                    severity: "error",
                    filePath: filePath,
                    line: parseResult.line,
                    column: parseResult.column,
                    message: "AST解析失败: " + parseResult.error,
                    rule: "AST_PARSE_ERROR",
                    source: "parser"
                });
                analysisResult.summary.errorCount++;
                
                console.log("    ❌ AST解析失败");
                return analysisResult;
            }
            
            console.log("    ✅ AST解析成功");
            
            // Stage 3: 顶层语义扫描
            console.log("  🔎 Stage 3: 顶层语义扫描...");
            var scanResult = TopLevelScanner.scanTopLevelSymbols(parseResult.ast, filePath);
            analysisResult.stages.semantic = scanResult;
            analysisResult.symbols = scanResult.symbols;
            
            // 合并诊断信息
            for (var j = 0; j < scanResult.diagnostics.length; j++) {
                var diagnostic = scanResult.diagnostics[j];
                diagnostic.source = "semantic";
                analysisResult.diagnostics.push(diagnostic);
                
                if (diagnostic.severity === "error") {
                    analysisResult.summary.errorCount++;
                } else if (diagnostic.severity === "warning") {
                    analysisResult.summary.warningCount++;
                }
            }
            
            if (!scanResult.success) {
                analysisResult.success = false;
                console.log("    ❌ 语义扫描失败");
                return analysisResult;
            }
            
            console.log("    ✅ 语义扫描成功");
            
            // 更新统计信息
            analysisResult.summary.totalSymbols = scanResult.symbols.length;
            analysisResult.summary.totalDiagnostics = scanResult.diagnostics.length;
            
            // 如果有错误诊断，标记分析失败
            if (analysisResult.summary.errorCount > 0) {
                analysisResult.success = false;
            }
            
            console.log("  📊 发现符号: " + scanResult.symbols.length + " 个");
            console.log("  ⚠️  诊断信息: " + scanResult.diagnostics.length + " 条");
            
        } catch (error) {
            analysisResult.success = false;
            analysisResult.diagnostics.push({
                severity: "error",
                filePath: filePath,
                line: null,
                column: null,
                message: "语义分析失败: " + error.message,
                rule: "ANALYSIS_ERROR",
                source: "analyzer"
            });
            analysisResult.summary.errorCount++;
        }
        
        return analysisResult;
    }
    
    /**
     * 批量分析多个文件
     * @param {string[]} filePaths 文件路径数组
     * @returns {Object} 批量分析结果
     */
    async function analyzeFiles(filePaths) {
        console.log("🚀 开始批量语义分析...");
        console.log("📁 文件数量: " + filePaths.length);
        
        var results = [];
        var totalSymbols = 0;
        var totalDiagnostics = 0;
        var totalErrors = 0;
        var totalWarnings = 0;
        var successCount = 0;
        var failureCount = 0;
        
        for (var i = 0; i < filePaths.length; i++) {
            var filePath = filePaths[i];
            
            if (!fs.existsSync(filePath)) {
                console.log("❌ 文件不存在: " + filePath);
                results.push({
                    success: false,
                    filePath: filePath,
                    error: "文件不存在",
                    diagnostics: [{
                        severity: "error",
                        filePath: filePath,
                        message: "文件不存在"
                    }]
                });
                failureCount++;
                continue;
            }
            
            var analysisResult = await analyzeFile(filePath);
            results.push(analysisResult);
            
            if (analysisResult.success) {
                successCount++;
            } else {
                failureCount++;
            }
            
            totalSymbols += analysisResult.summary.totalSymbols;
            totalDiagnostics += analysisResult.summary.totalDiagnostics;
            totalErrors += analysisResult.summary.errorCount;
            totalWarnings += analysisResult.summary.warningCount;
        }
        
        console.log("\n📊 批量分析完成:");
        console.log("  成功: " + successCount + " 个文件");
        console.log("  失败: " + failureCount + " 个文件");
        console.log("  符号总数: " + totalSymbols + " 个");
        console.log("  诊断总数: " + totalDiagnostics + " 条");
        console.log("  错误总数: " + totalErrors + " 条");
        console.log("  警告总数: " + totalWarnings + " 条");
        
        return {
            success: failureCount === 0,
            filePaths: filePaths,
            results: results,
            summary: {
                totalFiles: filePaths.length,
                successCount: successCount,
                failureCount: failureCount,
                totalSymbols: totalSymbols,
                totalDiagnostics: totalDiagnostics,
                totalErrors: totalErrors,
                totalWarnings: totalWarnings
            }
        };
    }
    
    /**
     * Stage 4: 完整工程语义分析
     * @param {string[]} filePaths 文件路径数组
     * @returns {Object} Stage 4分析结果
     */
    async function analyzeProject(filePaths) {
        console.log("🚀 开始Stage 4: 完整工程语义分析...");
        
        // 执行前三个阶段的分析
        var batchResult = await analyzeFiles(filePaths);
        
        if (!batchResult.success) {
            return {
                success: false,
                stages: {
                    stage1_3: batchResult,
                    stage4: null
                },
                error: "基础语义分析失败，无法进行Stage 4分析"
            };
        }
        
        console.log("\n📊 Stage 1-3 完成，开始Stage 4分析...");
        
        // 创建工程符号表
        var projectIndex = ProjectIndex.createIndex();
        
        // 收集所有成功的分析结果
        var successfulResults = batchResult.results.filter(function(result) {
            return result.success;
        });
        
        // 将符号添加到工程索引
        for (var i = 0; i < successfulResults.length; i++) {
            var result = successfulResults[i];
            if (result.symbols && result.symbols.length > 0) {
                ProjectIndex.addSymbols(projectIndex, result.symbols, result.filePath);
            }
        }
        
        // 收集所有符号用于跨文件依赖分析
        var allSymbols = [];
        for (var k = 0; k < successfulResults.length; k++) {
            var result = successfulResults[k];
            if (result.symbols) {
                allSymbols = allSymbols.concat(result.symbols);
            }
        }
        
        // Stage 4 分析结果容器
        var stage4Results = {
            projectIndex: projectIndex,
            dependencyAnalysis: null,
            callGraphAnalysis: null,
            circularDependencies: null,
            deadCodeAnalysis: null,
            summary: {
                totalModules: projectIndex.modules.length,
                totalFunctions: projectIndex.functions.length,
                totalDependencies: 0,
                totalCalls: 0,
                totalCycles: 0,
                deadFunctions: 0
            }
        };
        
        // 分析每个文件的依赖关系和调用图
        var allDependencies = [];
        var allCalls = [];
        var allCallGraphs = [];
        
        for (var j = 0; j < successfulResults.length; j++) {
            var result = successfulResults[j];
            
            if (result.stages.parsing && result.stages.parsing.success && result.symbols) {
                // 依赖关系分析 - 使用全局符号表进行跨文件依赖检测
                var depResult = DependencyAnalyzer.analyzeModuleDependencies(
                    result.stages.parsing.ast, 
                    allSymbols // 使用所有符号，不仅仅是当前文件的符号
                );
                if (depResult.success) {
                    allDependencies = allDependencies.concat(depResult.dependencies);
                }
                
                // 函数调用分析
                var callResult = DependencyAnalyzer.analyzeFunctionCalls(
                    result.stages.parsing.ast, 
                    allSymbols // 使用所有符号
                );
                if (callResult.success) {
                    allCalls = allCalls.concat(callResult.calls);
                }
                
                // 调用图构建
                var callGraphResult = CallGraph.buildCallGraph(
                    result.stages.parsing.ast, 
                    allSymbols // 使用所有符号
                );
                if (callGraphResult.success) {
                    allCallGraphs.push(callGraphResult.callGraph);
                }
            }
        }
        
        // 循环依赖检测
        var circularResult = DependencyAnalyzer.detectCircularDependencies(allDependencies);
        stage4Results.circularDependencies = circularResult;
        
        // 构建项目级依赖图
        var dependencyGraph = DependencyAnalyzer.buildDependencyGraph(allDependencies);
        stage4Results.dependencyAnalysis = {
            dependencies: allDependencies,
            graph: dependencyGraph
        };
        
        // 合并所有调用图
        var mergedCallGraph = mergeCallGraphs(allCallGraphs);
        stage4Results.callGraphAnalysis = {
            graph: mergedCallGraph,
            depthAnalysis: CallGraph.calculateCallDepth(mergedCallGraph),
            deadCodeAnalysis: CallGraph.detectDeadCode(mergedCallGraph),
            recursionAnalysis: CallGraph.detectRecursion(mergedCallGraph)
        };
        
        // 更新统计信息
        stage4Results.summary.totalDependencies = allDependencies.length;
        stage4Results.summary.totalCalls = allCalls.length;
        stage4Results.summary.totalCycles = circularResult.cycles.length;
        if (stage4Results.callGraphAnalysis.deadCodeAnalysis) {
            stage4Results.summary.deadFunctions = stage4Results.callGraphAnalysis.deadCodeAnalysis.deadFunctions.length;
        }
        
        console.log("\n📊 Stage 4 分析完成:");
        console.log("  模块数量: " + stage4Results.summary.totalModules);
        console.log("  函数数量: " + stage4Results.summary.totalFunctions);
        console.log("  依赖关系: " + stage4Results.summary.totalDependencies);
        console.log("  调用关系: " + stage4Results.summary.totalCalls);
        console.log("  循环依赖: " + stage4Results.summary.totalCycles);
        console.log("  死函数: " + stage4Results.summary.deadFunctions);
        
        // Stage 5: Def-Use 分析
        console.log("\n🚀 开始Stage 5: Def-Use 分析...");
        var stage5Results = {
            defUseAnalysis: [],
            summary: {
                totalDefinitions: 0,
                totalUses: 0,
                totalChains: 0,
                undefinedUses: 0,
                unusedDefinitions: 0
            }
        };
        
        // 对每个成功的文件进行Def-Use分析
        for (var k = 0; k < successfulResults.length; k++) {
            var result = successfulResults[k];
            
            if (result.stages.parsing && result.stages.parsing.success) {
                var defUseResult = DefUseAnalyzer.analyzeDefUse(
                    result.stages.parsing.ast, 
                    result.filePath, 
                    allSymbols
                );
                
                if (defUseResult.success) {
                    stage5Results.defUseAnalysis.push(defUseResult);
                    stage5Results.summary.totalDefinitions += defUseResult.summary.totalDefinitions;
                    stage5Results.summary.totalUses += defUseResult.summary.totalUses;
                    stage5Results.summary.totalChains += defUseResult.summary.totalChains;
                    stage5Results.summary.undefinedUses += defUseResult.summary.undefinedUses;
                    stage5Results.summary.unusedDefinitions += defUseResult.summary.unusedDefinitions;
                }
            }
        }
        
        console.log("\n📊 Stage 5 分析完成:");
        console.log("  定义点总数: " + stage5Results.summary.totalDefinitions);
        console.log("  使用点总数: " + stage5Results.summary.totalUses);
        console.log("  Def-Use链总数: " + stage5Results.summary.totalChains);
        console.log("  未定义使用: " + stage5Results.summary.undefinedUses);
        console.log("  未使用定义: " + stage5Results.summary.unusedDefinitions);
        
        return {
            success: true,
            stages: {
                stage1_3: batchResult,
                stage4: stage4Results,
                stage5: stage5Results
            },
            summary: {
                totalFiles: filePaths.length,
                totalSymbols: batchResult.summary.totalSymbols,
                totalModules: stage4Results.summary.totalModules,
                totalFunctions: stage4Results.summary.totalFunctions,
                totalDependencies: stage4Results.summary.totalDependencies,
                totalCalls: stage4Results.summary.totalCalls,
                hasCircularDependencies: circularResult.hasCycles,
                hasDeadCode: stage4Results.summary.deadFunctions > 0,
                hasUndefinedUses: stage5Results.summary.undefinedUses > 0,
                hasUnusedDefinitions: stage5Results.summary.unusedDefinitions > 0
            }
        };
    }
    
    /**
     * 生成分析报告
     * @param {Object} analysisResult 分析结果
     * @returns {string} 格式化的报告
     */
    function generateReport(analysisResult) {
        var report = "";
        
        // 文件头部
        report += "📄 语义分析报告\n";
        report += "═══════════════════════════════════════\n";
        report += "文件: " + analysisResult.filePath + "\n";
        report += "状态: " + (analysisResult.success ? "✅ 成功" : "❌ 失败") + "\n\n";
        
        // 分析阶段
        report += "🔍 分析阶段:\n";
        if (analysisResult.stages.eslint) {
            report += "  ESLint: " + (analysisResult.stages.eslint.success ? "✅ 通过" : "❌ 失败") + "\n";
        }
        if (analysisResult.stages.parsing) {
            report += "  AST解析: " + (analysisResult.stages.parsing.success ? "✅ 成功" : "❌ 失败") + "\n";
        }
        if (analysisResult.stages.semantic) {
            report += "  语义扫描: " + (analysisResult.stages.semantic.success ? "✅ 成功" : "❌ 失败") + "\n";
        }
        report += "\n";
        
        // 发现的符号
        if (analysisResult.symbols.length > 0) {
            report += "🏷️  发现的符号 (" + analysisResult.symbols.length + "):\n";
            for (var i = 0; i < analysisResult.symbols.length; i++) {
                var symbol = analysisResult.symbols[i];
                var description = SymbolTypes.getSymbolDescription(symbol);
                report += "  " + (i + 1) + ". " + description + "\n";
                report += "     类型: " + symbol.kind + "\n";
                report += "     生命周期: " + symbol.lifecyclePhase + "\n";
                report += "     可见性: " + symbol.visibility + "\n\n";
            }
        }
        
        // 诊断信息
        if (analysisResult.diagnostics.length > 0) {
            report += "⚠️  诊断信息 (" + analysisResult.diagnostics.length + "):\n";
            for (var j = 0; j < analysisResult.diagnostics.length; j++) {
                var diagnostic = analysisResult.diagnostics[j];
                report += "  ";
                if (diagnostic.severity === "error") {
                    report += "❌";
                } else if (diagnostic.severity === "warning") {
                    report += "⚠️";
                } else {
                    report += "ℹ️";
                }
                
                if (diagnostic.line !== null) {
                    report += " Line " + diagnostic.line;
                    if (diagnostic.column !== null) {
                        report += ":" + diagnostic.column;
                    }
                }
                
                report += " " + diagnostic.message;
                if (diagnostic.rule) {
                    report += " [" + diagnostic.rule + "]";
                }
                report += "\n";
            }
        }
        
        // 统计摘要
        report += "\n📊 统计摘要:\n";
        report += "  符号总数: " + analysisResult.summary.totalSymbols + "\n";
        report += "  诊断总数: " + analysisResult.summary.totalDiagnostics + "\n";
        report += "  错误数量: " + analysisResult.summary.errorCount + "\n";
        report += "  警告数量: " + analysisResult.summary.warningCount + "\n";
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    /**
     * 生成批量分析报告
     * @param {Object} batchResult 批量分析结果
     * @returns {string} 格式化的批量报告
     */
    function generateBatchReport(batchResult) {
        var report = "";
        
        report += "📄 批量语义分析报告\n";
        report += "═══════════════════════════════════════\n";
        report += "文件总数: " + batchResult.summary.totalFiles + "\n";
        report += "成功分析: " + batchResult.summary.successCount + "\n";
        report += "分析失败: " + batchResult.summary.failureCount + "\n";
        report += "总体状态: " + (batchResult.success ? "✅ 成功" : "❌ 存在失败") + "\n\n";
        
        report += "📊 总体统计:\n";
        report += "  符号总数: " + batchResult.summary.totalSymbols + "\n";
        report += "  诊断总数: " + batchResult.summary.totalDiagnostics + "\n";
        report += "  错误总数: " + batchResult.summary.totalErrors + "\n";
        report += "  警告总数: " + batchResult.summary.totalWarnings + "\n\n";
        
        // 详细的文件分析结果
        report += "📁 详细分析结果:\n";
        for (var i = 0; i < batchResult.results.length; i++) {
            var result = batchResult.results[i];
            report += (i + 1) + ". " + path.basename(result.filePath) + "\n";
            report += "   状态: " + (result.success ? "✅" : "❌") + "\n";
            report += "   符号: " + result.summary.totalSymbols + " 个\n";
            report += "   诊断: " + result.summary.totalDiagnostics + " 条\n";
        }
        
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    /**
     * 生成Stage 4完整报告
     * @param {Object} projectResult 项目分析结果
     * @returns {string} 格式化的完整报告
     */
    function generateProjectReport(projectResult) {
        var report = "";
        
        report += "📄 ES3 工程语义分析完整报告\n";
        report += "═══════════════════════════════════════\n";
        report += "分析时间: " + new Date().toISOString() + "\n";
        report += "分析状态: " + (projectResult.success ? "✅ 成功" : "❌ 失败") + "\n\n";
        
        if (!projectResult.success) {
            report += "❌ 分析失败: " + projectResult.error + "\n";
            report += "═══════════════════════════════════════\n";
            return report;
        }
        
        // 总体概览
        report += "📊 总体概览:\n";
        report += "  分析文件: " + projectResult.summary.totalFiles + " 个\n";
        report += "  符号总数: " + projectResult.summary.totalSymbols + " 个\n";
        report += "  模块数量: " + projectResult.summary.totalModules + " 个\n";
        report += "  函数数量: " + projectResult.summary.totalFunctions + " 个\n";
        report += "  依赖关系: " + projectResult.summary.totalDependencies + " 个\n";
        report += "  调用关系: " + projectResult.summary.totalCalls + " 个\n";
        report += "  循环依赖: " + (projectResult.summary.hasCircularDependencies ? "⚠️ 存在" : "✅ 无") + "\n";
        report += "  死代码: " + (projectResult.summary.hasDeadCode ? "⚠️ 存在" : "✅ 无") + "\n";
        report += "  未定义使用: " + (projectResult.summary.hasUndefinedUses ? "⚠️ 存在" : "✅ 无") + "\n";
        report += "  未使用定义: " + (projectResult.summary.hasUnusedDefinitions ? "⚠️ 存在" : "✅ 无") + "\n\n";
        
        // Stage 1-3 基础分析摘要
        report += "🔍 基础语义分析 (Stage 1-3):\n";
        var stage1_3 = projectResult.stages.stage1_3;
        report += "  成功分析: " + stage1_3.summary.successCount + " 个文件\n";
        report += "  分析失败: " + stage1_3.summary.failureCount + " 个文件\n";
        report += "  错误总数: " + stage1_3.summary.totalErrors + "\n";
        report += "  警告总数: " + stage1_3.summary.totalWarnings + "\n\n";
        
        // Stage 4 依赖关系分析
        if (projectResult.stages.stage4) {
            var stage4 = projectResult.stages.stage4;
            
            // 依赖关系报告
            if (stage4.dependencyAnalysis) {
                report += DependencyAnalyzer.generateDependencyReport(
                    stage4.dependencyAnalysis,
                    { calls: [] },
                    stage4.circularDependencies,
                    stage4.dependencyAnalysis.graph
                );
            }
            
            // 工程符号表报告
            report += ProjectIndex.generateIndexReport(stage4.projectIndex);
            
            // 调用图报告
            if (stage4.callGraphAnalysis) {
                report += CallGraph.generateCallGraphReport(
                    stage4.callGraphAnalysis.graph,
                    stage4.callGraphAnalysis.depthAnalysis,
                    stage4.callGraphAnalysis.deadCodeAnalysis,
                    stage4.callGraphAnalysis.recursionAnalysis
                );
            }
        }
        
        // Stage 5 Def-Use分析报告
        if (projectResult.stages.stage5) {
            var stage5 = projectResult.stages.stage5;
            
            report += "📊 Def-Use 分析 (Stage 5):\n";
            report += "  定义点总数: " + stage5.summary.totalDefinitions + "\n";
            report += "  使用点总数: " + stage5.summary.totalUses + "\n";
            report += "  Def-Use链总数: " + stage5.summary.totalChains + "\n";
            report += "  未定义使用: " + stage5.summary.undefinedUses + "\n";
            report += "  未使用定义: " + stage5.summary.unusedDefinitions + "\n\n";
            
            // 详细的Def-Use分析结果
            if (stage5.defUseAnalysis.length > 0) {
                report += "🔍 详细 Def-Use 分析结果:\n";
                for (var d = 0; d < Math.min(stage5.defUseAnalysis.length, 3); d++) {
                    var defUseResult = stage5.defUseAnalysis[d];
                    report += "  " + (d + 1) + ". " + path.basename(defUseResult.filePath) + "\n";
                    report += "     定义点: " + defUseResult.summary.totalDefinitions + "\n";
                    report += "     使用点: " + defUseResult.summary.totalUses + "\n";
                    report += "     未定义使用: " + defUseResult.summary.undefinedUses + "\n";
                    report += "     未使用定义: " + defUseResult.summary.unusedDefinitions + "\n";
                }
                if (stage5.defUseAnalysis.length > 3) {
                    report += "  ... 还有 " + (stage5.defUseAnalysis.length - 3) + " 个文件\n";
                }
                report += "\n";
            }
        }
        
        report += "═══════════════════════════════════════\n";
        report += "报告生成完成 - ES3 工程语义操作系统 Stage 5\n";
        
        return report;
    }
    
    // 辅助函数：合并调用图
    function mergeCallGraphs(callGraphs) {
        var merged = CallGraph.createCallGraph();
        var nodeMap = new Map();
        
        // 合并所有节点
        callGraphs.forEach(function(graph) {
            graph.nodes.forEach(function(node) {
                if (!nodeMap.has(node.name)) {
                    var newNode = Object.assign({}, node);
                    newNode.inDegree = 0;
                    newNode.outDegree = 0;
                    nodeMap.set(node.name, newNode);
                    merged.nodes.push(newNode);
                }
            });
        });
        
        // 合并所有边
        callGraphs.forEach(function(graph) {
            graph.edges.forEach(function(edge) {
                var existingEdge = merged.edges.find(function(e) {
                    return e.source === edge.source && e.target === edge.target;
                });
                
                if (!existingEdge) {
                    merged.edges.push(Object.assign({}, edge));
                    
                    // 更新节点度数
                    var sourceNode = nodeMap.get(edge.source);
                    var targetNode = nodeMap.get(edge.target);
                    if (sourceNode) sourceNode.outDegree++;
                    if (targetNode) targetNode.inDegree++;
                }
            });
        });
        
        // 重新分析合并后的调用图
        CallGraph.analyzeCallGraph(merged);
        
        return merged;
    }
    
    // 公共接口
    return {
        analyzeFile: analyzeFile,
        analyzeFiles: analyzeFiles,
        analyzeProject: analyzeProject,
        generateReport: generateReport,
        generateBatchReport: generateBatchReport,
        generateProjectReport: generateProjectReport
    };
    
})();

module.exports = SemanticAnalyzer;
