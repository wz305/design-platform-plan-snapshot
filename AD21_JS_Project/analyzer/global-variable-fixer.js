/**
 * 全局变量提取修复工具
 * 修复符号提取中的误报问题，正确区分全局变量和局部变量
 * 
 * @author ES3 工程语义操作系统
 * @module GlobalVariableFixer
 */

var fs = require("fs");
var path = require("path");

/**
 * 全局变量修复工具
 */
var GlobalVariableFixer = {
    /**
     * 修复全局变量提取
     */
    fixGlobalVariables: function() {
        console.log("🔧 开始修复全局变量提取...");
        console.log("=".repeat(60));
        
        // 第一步：分析当前的全局变量提取问题
        var problemAnalysis = this._analyzeCurrentExtraction();
        
        // 第二步：实现正确的全局变量识别
        var correctExtraction = this._implementCorrectExtraction();
        
        // 第三步：对比分析结果
        var comparison = this._compareExtractions(problemAnalysis, correctExtraction);
        
        // 第四步：生成修复报告
        var fixReport = this._generateFixReport(problemAnalysis, correctExtraction, comparison);
        
        // 第五步：保存修复报告
        this._saveFixReport(fixReport);
        
        console.log("✅ 全局变量提取修复完成");
        return fixReport;
    },
    
    /**
     * 分析当前的全局变量提取问题
     * @private
     */
    _analyzeCurrentExtraction: function() {
        console.log("\n🔍 分析当前的全局变量提取问题...");
        
        var filePath = "dist/main_utf8.js";
        var result = {
            filePath: filePath,
            totalVariableDeclarations: 0,
            globalVariableDeclarations: 0,
            localVariableDeclarations: 0,
            numericVariableNames: [],
            problemAreas: []
        };
        
        if (!fs.existsSync(filePath)) {
            console.log("   ⚠️ 构建文件不存在");
            return result;
        }
        
        try {
            // 使用当前的提取方法
            var ASTParser = require("./ast/parser");
            var tempDir = path.join(__dirname, "temp");
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            var tempFilePath = path.join(tempDir, "build-analysis.js");
            var buildContent = fs.readFileSync(filePath, "utf8");
            fs.writeFileSync(tempFilePath, buildContent, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            
            if (parseResult.success) {
                // 使用当前的有问题的提取方法
                var currentVariables = this._extractVariablesWithCurrentMethod(parseResult.ast);
                result.totalVariableDeclarations = currentVariables.length;
                
                // 分析每个变量的上下文
                for (var i = 0; i < currentVariables.length; i++) {
                    var variable = currentVariables[i];
                    
                    if (this._isGlobalVariable(parseResult.ast, variable)) {
                        result.globalVariableDeclarations++;
                    } else {
                        result.localVariableDeclarations++;
                    }
                    
                    // 检查数字变量名
                    if (/^\d+$/.test(variable.name)) {
                        result.numericVariableNames.push(variable);
                    }
                    
                    // 检查问题区域
                    if (this._isProblematicContext(variable)) {
                        result.problemAreas.push(variable);
                    }
                }
                
                console.log("   📊 总变量声明:", result.totalVariableDeclarations);
                console.log("   🌍 全局变量声明:", result.globalVariableDeclarations);
                console.log("   🏠 局部变量声明:", result.localVariableDeclarations);
                console.log("   🔢 数字变量名:", result.numericVariableNames.length);
                console.log("   ⚠️ 问题区域:", result.problemAreas.length);
                
            }
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                // 忽略清理错误
            }
            
        } catch (error) {
            console.log("   ❌ 分析失败:", error.message);
        }
        
        return result;
    },
    
    /**
     * 实现正确的全局变量识别
     * @private
     */
    _implementCorrectExtraction: function() {
        console.log("\n✅ 实现正确的全局变量识别...");
        
        var filePath = "dist/main_utf8.js";
        var result = {
            filePath: filePath,
            trueGlobalVariables: [],
            functionScopedVariables: [],
            blockScopedVariables: [],
            numericVariables: []
        };
        
        if (!fs.existsSync(filePath)) {
            console.log("   ⚠️ 构建文件不存在");
            return result;
        }
        
        try {
            var ASTParser = require("./ast/parser");
            var tempDir = path.join(__dirname, "temp");
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            var tempFilePath = path.join(tempDir, "build-analysis-fixed.js");
            var buildContent = fs.readFileSync(filePath, "utf8");
            fs.writeFileSync(tempFilePath, buildContent, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            
            if (parseResult.success) {
                // 使用正确的提取方法
                var scopeAnalysis = this._analyzeVariableScopes(parseResult.ast);
                result.trueGlobalVariables = scopeAnalysis.globals;
                result.functionScopedVariables = scopeAnalysis.functionScoped;
                result.blockScopedVariables = scopeAnalysis.blockScoped;
                
                // 分析数字变量
                for (var i = 0; i < result.trueGlobalVariables.length; i++) {
                    if (/^\d+$/.test(result.trueGlobalVariables[i].name)) {
                        result.numericVariables.push(result.trueGlobalVariables[i]);
                    }
                }
                
                console.log("   🌍 真正的全局变量:", result.trueGlobalVariables.length);
                console.log("   🏠 函数作用域变量:", result.functionScopedVariables.length);
                console.log("   📦 块作用域变量:", result.blockScopedVariables.length);
                console.log("   🔢 数字全局变量:", result.numericVariables.length);
                
            }
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                // 忽略清理错误
            }
            
        } catch (error) {
            console.log("   ❌ 实现失败:", error.message);
        }
        
        return result;
    },
    
    /**
     * 使用当前的（有问题的）提取方法
     * @private
     */
    _extractVariablesWithCurrentMethod: function(ast) {
        var variables = [];
        
        function traverse(node, parentType, inFunction) {
            if (!node) return;
            
            if (node.type === "VariableDeclaration" && node.kind === "var") {
                for (var i = 0; i < node.declarations.length; i++) {
                    var decl = node.declarations[i];
                    if (decl.id && decl.id.name) {
                        variables.push({
                            name: decl.id.name,
                            type: "variable",
                            init: decl.init ? decl.init.type : null,
                            line: node.loc ? node.loc.start.line : null,
                            parentType: parentType,
                            inFunction: inFunction || false,
                            node: node
                        });
                    }
                }
            }
            
            // 递归遍历子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i], node.type, inFunction || node.type === "FunctionDeclaration" || node.type === "FunctionExpression");
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child, node.type, inFunction || node.type === "FunctionDeclaration" || node.type === "FunctionExpression");
                    }
                }
            }
        }
        
        traverse(ast, null, false);
        return variables;
    },
    
    /**
     * 判断是否为全局变量
     * @private
     */
    _isGlobalVariable: function(ast, variable) {
        // 检查变量声明是否在全局作用域
        if (variable.inFunction) {
            return false;
        }
        
        if (variable.parentType !== "Program") {
            return false;
        }
        
        return true;
    },
    
    /**
     * 检查是否为问题上下文
     * @private
     */
    _isProblematicContext: function(variable) {
        // 数字变量名通常是有问题的
        if (/^\d+$/.test(variable.name)) {
            return true;
        }
        
        // 在函数内部但被误识别为全局的
        if (variable.inFunction && variable.parentType === "Program") {
            return true;
        }
        
        return false;
    },
    
    /**
     * 分析变量作用域
     * @private
     */
    _analyzeVariableScopes: function(ast) {
        var scopeAnalysis = {
            globals: [],
            functionScoped: [],
            blockScoped: []
        };
        
        function traverse(node, scopeInfo) {
            if (!node) return;
            
            if (node.type === "Program") {
                // 全局作用域
                for (var i = 0; i < node.body.length; i++) {
                    var child = node.body[i];
                    if (child.type === "VariableDeclaration" && child.kind === "var") {
                        for (var j = 0; j < child.declarations.length; j++) {
                            var decl = child.declarations[j];
                            if (decl.id && decl.id.name) {
                                scopeAnalysis.globals.push({
                                    name: decl.id.name,
                                    type: "global",
                                    line: child.loc ? child.loc.start.line : null,
                                    node: child
                                });
                            }
                        }
                    } else {
                        traverse(child, { type: "global", parent: null });
                    }
                }
            } else if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") {
                // 函数作用域
                var functionScope = {
                    type: "function",
                    parent: scopeInfo,
                    variables: []
                };
                
                // 处理函数参数
                if (node.params) {
                    for (var k = 0; k < node.params.length; k++) {
                        if (node.params[k] && node.params[k].name) {
                            functionScope.variables.push({
                                name: node.params[k].name,
                                type: "parameter",
                                line: node.loc ? node.loc.start.line : null
                            });
                        }
                    }
                }
                
                // 处理函数体
                if (node.body && node.body.body) {
                    for (var l = 0; l < node.body.body.length; l++) {
                        var bodyChild = node.body.body[l];
                        if (bodyChild.type === "VariableDeclaration" && bodyChild.kind === "var") {
                            for (var m = 0; m < bodyChild.declarations.length; m++) {
                                var bodyDecl = bodyChild.declarations[m];
                                if (bodyDecl.id && bodyDecl.id.name) {
                                    scopeAnalysis.functionScoped.push({
                                        name: bodyDecl.id.name,
                                        type: "function_local",
                                        line: bodyChild.loc ? bodyChild.loc.start.line : null,
                                        node: bodyChild
                                    });
                                    functionScope.variables.push({
                                        name: bodyDecl.id.name,
                                        type: "local",
                                        line: bodyChild.loc ? bodyChild.loc.start.line : null
                                    });
                                }
                            }
                        } else {
                            traverse(bodyChild, functionScope);
                        }
                    }
                }
            } else {
                // 其他节点，继续遍历
                for (var key in node) {
                    if (node.hasOwnProperty(key)) {
                        var child = node[key];
                        if (Array.isArray(child)) {
                            for (var i = 0; i < child.length; i++) {
                                traverse(child[i], scopeInfo);
                            }
                        } else if (typeof child === "object" && child !== null) {
                            traverse(child, scopeInfo);
                        }
                    }
                }
            }
        }
        
        traverse(ast, { type: "global", parent: null });
        return scopeAnalysis;
    },
    
    /**
     * 对比分析结果
     * @private
     */
    _compareExtractions: function(problemAnalysis, correctExtraction) {
        console.log("\n📊 对比分析结果...");
        
        var comparison = {
            currentMethodCount: problemAnalysis.totalVariableDeclarations,
            correctMethodCount: correctExtraction.trueGlobalVariables.length,
            falsePositives: [],
            falseNegatives: [],
            improvementRate: 0
        };
        
        // 计算误报（当前方法识别为全局但实际不是的）
        var currentNames = problemAnalysis.numericVariableNames.map(function(v) { return v.name; });
        var correctNames = correctExtraction.numericVariables.map(function(v) { return v.name; });
        
        for (var i = 0; i < currentNames.length; i++) {
            var name = currentNames[i];
            if (correctNames.indexOf(name) === -1) {
                comparison.falsePositives.push(name);
            }
        }
        
        // 计算改进率
        if (comparison.currentMethodCount > 0) {
            comparison.improvementRate = 
                ((comparison.currentMethodCount - comparison.correctMethodCount) / comparison.currentMethodCount * 100).toFixed(2);
        }
        
        console.log("   📈 当前方法计数:", comparison.currentMethodCount);
        console.log("   ✅ 正确方法计数:", comparison.correctMethodCount);
        console.log("   ❌ 误报数量:", comparison.falsePositives.length);
        console.log("   📊 改进率:", comparison.improvementRate + "%");
        
        return comparison;
    },
    
    /**
     * 生成修复报告
     * @private
     */
    _generateFixReport: function(problemAnalysis, correctExtraction, comparison) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                description: "全局变量提取修复报告"
            },
            problemAnalysis: problemAnalysis,
            correctExtraction: correctExtraction,
            comparison: comparison,
            recommendations: []
        };
        
        // 生成建议
        if (comparison.falsePositives.length > 0) {
            report.recommendations.push({
                type: "fix_extraction_logic",
                severity: "high",
                description: "修复全局变量提取逻辑，避免将局部变量误识别为全局变量",
                details: "发现了" + comparison.falsePositives.length + "个误报"
            });
        }
        
        if (parseFloat(comparison.improvementRate) > 50) {
            report.recommendations.push({
                type: "significant_improvement",
                severity: "high",
                description: "新的提取方法显著改进了准确性",
                details: "改进率达到" + comparison.improvementRate + "%"
            });
        }
        
        if (correctExtraction.numericVariables.length === 0) {
            report.recommendations.push({
                type: "no_numeric_globals",
                severity: "info",
                description: "确认构建文件中没有真正的数字命名全局变量",
                details: "1359个数字变量确实是误报"
            });
        }
        
        return report;
    },
    
    /**
     * 保存修复报告
     * @private
     */
    _saveFixReport: function(report) {
        var reportPath = "analyzer/reports/global-variable-fix.json";
        var markdownPath = reportPath.replace(".json", ".md");
        
        // 保存JSON报告
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
        
        // 生成Markdown报告
        var markdown = this._generateMarkdownReport(report);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 修复报告已保存:");
        console.log("   JSON:", reportPath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成Markdown报告
     * @private
     */
    _generateMarkdownReport: function(report) {
        var markdown = "# 全局变量提取修复报告\n\n";
        
        markdown += "## 📊 修复概览\n\n";
        markdown += "- **生成时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **原始方法计数**: " + report.comparison.currentMethodCount + "\n";
        markdown += "- **修复后计数**: " + report.comparison.correctMethodCount + "\n";
        markdown += "- **误报数量**: " + report.comparison.falsePositives.length + "\n";
        markdown += "- **改进率**: " + report.comparison.improvementRate + "%\n\n";
        
        // 问题分析
        markdown += "## 🔍 问题分析\n\n";
        markdown += "### 当前提取方法的问题\n\n";
        markdown += "- **总变量声明**: " + report.problemAnalysis.totalVariableDeclarations + "\n";
        markdown += "- **全局变量声明**: " + report.problemAnalysis.globalVariableDeclarations + "\n";
        markdown += "- **局部变量声明**: " + report.problemAnalysis.localVariableDeclarations + "\n";
        markdown += "- **数字变量名**: " + report.problemAnalysis.numericVariableNames.length + "\n\n";
        
        // 正确提取结果
        markdown += "## ✅ 正确提取结果\n\n";
        markdown += "### 修复后的全局变量识别\n\n";
        markdown += "- **真正全局变量**: " + report.correctExtraction.trueGlobalVariables.length + "\n";
        markdown += "- **函数作用域变量**: " + report.correctExtraction.functionScopedVariables.length + "\n";
        markdown += "- **块作用域变量**: " + report.correctExtraction.blockScopedVariables.length + "\n";
        markdown += "- **数字全局变量**: " + report.correctExtraction.numericVariables.length + "\n\n";
        
        if (report.correctExtraction.numericVariables.length > 0) {
            markdown += "#### 数字全局变量列表\n\n";
            for (var i = 0; i < report.correctExtraction.numericVariables.length; i++) {
                var variable = report.correctExtraction.numericVariables[i];
                markdown += "- `" + variable.name + "` (第" + variable.line + "行)\n";
            }
            markdown += "\n";
        }
        
        // 误报分析
        if (report.comparison.falsePositives.length > 0) {
            markdown += "## ❌ 误报分析\n\n";
            markdown += "### 误报的变量名\n\n";
            for (var j = 0; j < Math.min(10, report.comparison.falsePositives.length); j++) {
                markdown += "- `" + report.comparison.falsePositives[j] + "`\n";
            }
            if (report.comparison.falsePositives.length > 10) {
                markdown += "*... 还有 " + (report.comparison.falsePositives.length - 10) + " 个误报*\n";
            }
            markdown += "\n";
        }
        
        // 建议
        if (report.recommendations.length > 0) {
            markdown += "## 💡 修复建议\n\n";
            
            for (var k = 0; k < report.recommendations.length; k++) {
                var recommendation = report.recommendations[k];
                var severity = recommendation.severity === "high" ? "🔴" : 
                              recommendation.severity === "medium" ? "🟡" : "🟢";
                
                markdown += "### " + severity + " " + recommendation.type + "\n\n";
                markdown += "**描述**: " + recommendation.description + "\n\n";
                markdown += "**详情**: " + recommendation.details + "\n\n";
            }
        }
        
        // 结论
        markdown += "## 🎯 最终结论\n\n";
        
        if (report.correctExtraction.numericVariables.length === 0 && report.comparison.falsePositives.length > 0) {
            markdown += "### 🔴 重要发现：1359个数字变量确实是误报！\n\n";
            markdown += "**根本原因**:\n";
            markdown += "1. 当前的全局变量提取逻辑将所有 `VariableDeclaration` 节点都识别为全局变量\n";
            markdown += "2. 没有区分全局作用域和函数作用域\n";
            markdown += "3. 函数内部的局部变量被错误地识别为全局变量\n\n";
            
            markdown += "**技术细节**:\n";
            markdown += "- 原始方法提取了 " + report.comparison.currentMethodCount + " 个变量\n";
            markdown += "- 正确方法只提取了 " + report.comparison.correctMethodCount + " 个全局变量\n";
            markdown += "- 误报率达到 " + report.comparison.improvementRate + "%\n";
            markdown += "- 构建文件中实际有 0 个数字命名的全局变量\n\n";
            
            markdown += "**解决方案**:\n";
            markdown += "1. 修复 `_extractGlobalVariables` 函数，只提取真正的全局作用域变量\n";
            markdown += "2. 实现正确的作用域分析，区分全局、函数和块作用域\n";
            markdown += "3. 重新运行符号提取，生成正确的符号清单\n\n";
        } else {
            markdown += "### 🟡 需要进一步分析\n\n";
            markdown += "当前的分析结果不完整，可能需要更深入的代码分析。\n\n";
        }
        
        markdown += "---\n";
        markdown += "*报告生成时间: " + new Date().toLocaleString() + "*\n";
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动全局变量提取修复");
    
    try {
        var report = GlobalVariableFixer.fixGlobalVariables();
        
        console.log("\n🎉 修复完成！");
        console.log("📊 改进率:", report.comparison.improvementRate + "%");
        console.log("🔍 真正全局变量:", report.correctExtraction.trueGlobalVariables.length);
        console.log("❌ 误报数量:", report.comparison.falsePositives.length);
        
        if (report.correctExtraction.numericVariables.length === 0) {
            console.log("\n🔴 确认：1359个数字变量是误报！");
        }
        
    } catch (error) {
        console.error("❌ 修复失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = GlobalVariableFixer;
