/**
 * 全局变量来源分析工具
 * 专门分析1359个全局变量的具体来源和分布
 * 
 * @author ES3 工程语义操作系统
 * @module GlobalVariableAnalyzer
 */

var fs = require("fs");
var path = require("path");

// 导入语义系统
var ASTParser = require("./ast/parser");

/**
 * 全局变量分析工具
 */
var GlobalVariableAnalyzer = {
    /**
     * 执行全局变量来源分析
     */
    runAnalysis: function() {
        console.log("🔍 开始分析1359个全局变量的来源...");
        console.log("=".repeat(60));
        
        // 第一步：分析构建文件中的全局变量
        var builtAnalysis = this._analyzeBuiltFile();
        
        // 第二步：按文件分解变量来源
        var fileAnalysis = this._analyzeSourceFiles();
        
        // 第三步：生成详细报告
        var report = this._generateDetailedReport(builtAnalysis, fileAnalysis);
        
        // 第四步：保存报告
        this._saveReport(report);
        
        console.log("✅ 全局变量分析完成");
        return report;
    },
    
    /**
     * 分析构建文件
     * @private
     */
    _analyzeBuiltFile: function() {
        var builtFiles = ["dist/main_utf8.js", "dist/main.js"];
        
        for (var i = 0; i < builtFiles.length; i++) {
            var filePath = builtFiles[i];
            console.log("\n🏗️ 分析构建文件:", filePath);
            
            if (!fs.existsSync(filePath)) {
                console.log("   ⚠️ 文件不存在，跳过");
                continue;
            }
            
            try {
                var analysis = this._analyzeFileGlobalVars(filePath);
                console.log("   📊 全局变量总数:", Object.keys(analysis.variables).length);
                
                // 分析数字变量
                var numberVars = [];
                var otherVars = [];
                
                for (var varName in analysis.variables) {
                    if (analysis.variables.hasOwnProperty(varName)) {
                        if (/^\d+$/.test(varName)) {
                            numberVars.push(varName);
                        } else {
                            otherVars.push(varName);
                        }
                    }
                }
                
                console.log("   🔢 数字变量:", numberVars.length);
                console.log("   📝 其他变量:", otherVars.length);
                
                // 显示数字变量范围
                if (numberVars.length > 0) {
                    var numbers = numberVars.map(function(n) { return parseInt(n); });
                    var min = Math.min.apply(Math, numbers);
                    var max = Math.max.apply(Math, numbers);
                    console.log("   📈 数字范围:", min, "-", max);
                }
                
                // 显示其他变量的样例
                if (otherVars.length > 0) {
                    console.log("   📋 其他变量样例:");
                    for (var j = 0; j < Math.min(10, otherVars.length); j++) {
                        console.log("      -", otherVars[j]);
                    }
                    if (otherVars.length > 10) {
                        console.log("      ... 还有", otherVars.length - 10, "个");
                    }
                }
                
                return analysis;
                
            } catch (error) {
                console.log("   ❌ 分析失败:", error.message);
            }
        }
    },
    
    /**
     * 分析源文件
     * @private
     */
    _analyzeSourceFiles: function() {
        var configPath = "config/merge-order.json";
        var config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        var filePaths = config.mergeOrder;
        
        var fileAnalysis = {};
        var totalVars = 0;
        
        console.log("\n📁 分析源文件全局变量分布...");
        
        for (var i = 0; i < filePaths.length; i++) {
            var filePath = filePaths[i];
            console.log("\n" + (i + 1) + ". 分析源文件:", path.basename(filePath));
            
            if (!fs.existsSync(filePath)) {
                console.log("   ⚠️ 文件不存在");
                continue;
            }
            
            try {
                var analysis = this._analyzeFileGlobalVars(filePath);
                fileAnalysis[filePath] = analysis;
                totalVars += Object.keys(analysis.variables).length;
                
                console.log("   📊 变量数量:", Object.keys(analysis.variables).length);
                
                // 分类统计
                var numberVars = 0;
                var otherVars = 0;
                
                for (var varName in analysis.variables) {
                    if (/^\d+$/.test(varName)) {
                        numberVars++;
                    } else {
                        otherVars++;
                    }
                }
                
                console.log("   🔢 数字变量:", numberVars);
                console.log("   📝 其他变量:", otherVars);
                
            } catch (error) {
                console.log("   ❌ 分析失败:", error.message);
            }
        }
        
        console.log("\n📈 源文件总计:", totalVars, "个变量");
        return fileAnalysis;
    },
    
    /**
     * 分析单个文件的全局变量
     * @private
     */
    _analyzeFileGlobalVars: function(filePath) {
        var sourceCode = fs.readFileSync(filePath, "utf8");
        
        // 创建临时文件用于解析
        var tempDir = path.join(path.dirname(filePath), "temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        var tempFilePath = path.join(tempDir, path.basename(filePath) + ".temp.js");
        fs.writeFileSync(tempFilePath, sourceCode, "utf8");
        
        try {
            var parseResult = ASTParser.parseFile(tempFilePath);
            if (!parseResult.success) {
                throw new Error("AST解析失败: " + parseResult.error);
            }
            
            var variables = this._extractGlobalVariables(parseResult.ast, filePath);
            
            return {
                filePath: filePath,
                fileName: path.basename(filePath),
                fileSize: sourceCode.length,
                variables: variables,
                variableCount: Object.keys(variables).length
            };
            
        } finally {
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                // 忽略清理错误
            }
        }
    },
    
    /**
     * 提取全局变量
     * @private
     */
    _extractGlobalVariables: function(ast, filePath) {
        var variables = {};
        
        function traverse(node, depth) {
            if (!node) return;
            
            // 查找变量声明
            if (node.type === "VariableDeclaration" && node.kind === "var") {
                for (var i = 0; i < node.declarations.length; i++) {
                    var decl = node.declarations[i];
                    if (decl.id && decl.id.name) {
                        variables[decl.id.name] = {
                            name: decl.id.name,
                            type: decl.init ? decl.init.type : "uninitialized",
                            line: node.loc ? node.loc.start.line : null,
                            depth: depth,
                            filePath: filePath
                        };
                    }
                }
            }
            
            // 递归遍历子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i], depth + 1);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child, depth + 1);
                    }
                }
            }
        }
        
        traverse(ast, 0);
        return variables;
    },
    
    /**
     * 生成详细报告
     * @private
     */
    _generateDetailedReport: function(builtAnalysis, fileAnalysis) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                description: "全局变量来源详细分析报告"
            },
            summary: {
                totalFiles: Object.keys(fileAnalysis).length,
                totalVariables: 0,
                numberVariables: 0,
                otherVariables: 0,
                topContributors: []
            },
            fileBreakdown: {},
            variableCategories: {
                numbers: {},
                strings: {},
                functions: {},
                objects: {},
                others: {}
            },
            suspiciousPatterns: []
        };
        
        // 统计每个文件的贡献
        var fileContributions = [];
        for (var filePath in fileAnalysis) {
            if (fileAnalysis.hasOwnProperty(filePath)) {
                var analysis = fileAnalysis[filePath];
                var varCount = Object.keys(analysis.variables).length;
                report.totalVariables += varCount;
                
                fileContributions.push({
                    filePath: filePath,
                    fileName: analysis.fileName,
                    variableCount: varCount,
                    fileSize: analysis.fileSize
                });
                
                report.fileBreakdown[filePath] = analysis;
                
                // 分类变量
                for (var varName in analysis.variables) {
                    if (analysis.variables.hasOwnProperty(varName)) {
                        var variable = analysis.variables[varName];
                        
                        if (/^\d+$/.test(varName)) {
                            report.numberVariables++;
                            report.variableCategories.numbers[varName] = variable;
                        } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(varName)) {
                            if (variable.type === "FunctionExpression") {
                                report.variableCategories.functions[varName] = variable;
                            } else {
                                report.variableCategories.strings[varName] = variable;
                            }
                        } else {
                            report.variableCategories.others[varName] = variable;
                        }
                    }
                }
            }
        }
        
        // 找出贡献最大的文件
        fileContributions.sort(function(a, b) { return b.variableCount - a.variableCount; });
        report.summary.topContributors = fileContributions.slice(0, 10);
        
        report.summary.totalVariables = report.totalVariables;
        report.summary.numberVariables = report.numberVariables;
        report.summary.otherVariables = report.totalVariables - report.numberVariables;
        
        // 检查可疑模式
        if (report.numberVariables > 100) {
            report.suspiciousPatterns.push({
                type: "excessive_number_variables",
                description: "发现大量数字变量，可能是自动生成或数组索引",
                count: report.numberVariables
            });
        }
        
        // 检查是否有连续的数字变量
        var numberKeys = Object.keys(report.variableCategories.numbers)
            .map(function(n) { return parseInt(n); })
            .sort(function(a, b) { return a - b; });
        
        if (numberKeys.length > 10) {
            var consecutive = 1;
            var maxConsecutive = 1;
            for (var i = 1; i < numberKeys.length; i++) {
                if (numberKeys[i] === numberKeys[i-1] + 1) {
                    consecutive++;
                    maxConsecutive = Math.max(maxConsecutive, consecutive);
                } else {
                    consecutive = 1;
                }
            }
            
            if (maxConsecutive > 50) {
                report.suspiciousPatterns.push({
                    type: "consecutive_numbers",
                    description: "发现连续的数字变量，可能是枚举或常量数组",
                    maxConsecutive: maxConsecutive,
                    range: numberKeys[0] + " - " + numberKeys[numberKeys.length - 1]
                });
            }
        }
        
        return report;
    },
    
    /**
     * 保存报告
     * @private
     */
    _saveReport: function(report) {
        var reportPath = "analyzer/reports/global-variable-analysis.json";
        var markdownPath = reportPath.replace(".json", ".md");
        
        // 保存JSON报告
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
        
        // 生成Markdown报告
        var markdown = this._generateMarkdownReport(report);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 报告已保存:");
        console.log("   JSON:", reportPath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成Markdown报告
     * @private
     */
    _generateMarkdownReport: function(report) {
        var markdown = "# 全局变量来源分析报告\n\n";
        
        markdown += "## 📊 总体概览\n\n";
        markdown += "- **生成时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **源文件总数**: " + report.summary.totalFiles + "\n";
        markdown += "- **全局变量总数**: " + report.summary.totalVariables + "\n";
        markdown += "- **数字变量**: " + report.summary.numberVariables + "\n";
        markdown += "- **其他变量**: " + report.summary.otherVariables + "\n\n";
        
        // 贡献最大的文件
        markdown += "## 🏆 变量贡献最多的文件\n\n";
        markdown += "| 排名 | 文件名 | 变量数量 | 文件大小 |\n";
        markdown += "|------|--------|----------|----------|\n";
        
        for (var i = 0; i < Math.min(10, report.summary.topContributors.length); i++) {
            var contributor = report.summary.topContributors[i];
            markdown += "| " + (i + 1) + " | `" + contributor.fileName + "` | " + 
                       contributor.variableCount + " | " + contributor.fileSize + " bytes |\n";
        }
        
        // 变量分类
        markdown += "\n## 📂 变量分类统计\n\n";
        markdown += "- **数字变量**: " + Object.keys(report.variableCategories.numbers).length + " 个\n";
        markdown += "- **字符串变量**: " + Object.keys(report.variableCategories.strings).length + " 个\n";
        markdown += "- **函数变量**: " + Object.keys(report.variableCategories.functions).length + " 个\n";
        markdown += "- **其他变量**: " + Object.keys(report.variableCategories.others).length + " 个\n\n";
        
        // 可疑模式
        if (report.suspiciousPatterns.length > 0) {
            markdown += "## ⚠️ 可疑模式\n\n";
            for (var j = 0; j < report.suspiciousPatterns.length; j++) {
                var pattern = report.suspiciousPatterns[j];
                markdown += "### " + pattern.type + "\n\n";
                markdown += "**描述**: " + pattern.description + "\n\n";
                if (pattern.count) {
                    markdown += "**数量**: " + pattern.count + "\n\n";
                }
                if (pattern.range) {
                    markdown += "**范围**: " + pattern.range + "\n\n";
                }
            }
        }
        
        // 数字变量分析
        var numberKeys = Object.keys(report.variableCategories.numbers);
        if (numberKeys.length > 0) {
            markdown += "## 🔢 数字变量分析\n\n";
            
            var numbers = numberKeys.map(function(n) { return parseInt(n); });
            var min = Math.min.apply(Math, numbers);
            var max = Math.max.apply(Math, numbers);
            var range = max - min + 1;
            
            markdown += "- **最小值**: " + min + "\n";
            markdown += "- **最大值**: " + max + "\n";
            markdown += "- **范围**: " + range + " 个数字\n";
            markdown += "- **密度**: " + (range / numbers.length * 100).toFixed(1) + "% (实际使用率)\n\n";
            
            // 显示数字变量的分布
            if (numberKeys.length <= 50) {
                markdown += "### 数字变量列表\n\n";
                for (var k = 0; k < numberKeys.length; k++) {
                    var num = numberKeys[k];
                    var variable = report.variableCategories.numbers[num];
                    markdown += "- **" + num + "** (行 " + variable.line + ", " + variable.type + ")\n";
                }
                markdown += "\n";
            } else {
                markdown += "### 数字变量样例\n\n";
                for (var m = 0; m < Math.min(20, numberKeys.length); m++) {
                    var numSample = numberKeys[m];
                    var varSample = report.variableCategories.numbers[numSample];
                    markdown += "- **" + numSample + "** (行 " + varSample.line + ", " + varSample.type + ")\n";
                }
                markdown += "*... 还有 " + (numberKeys.length - 20) + " 个数字变量*\n\n";
            }
        }
        
        // 其他重要变量
        var otherKeys = Object.keys(report.variableCategories.strings);
        if (otherKeys.length > 0) {
            markdown += "## 📝 重要非数字变量\n\n";
            
            for (var n = 0; n < Math.min(20, otherKeys.length); n++) {
                var key = otherKeys[n];
                var variable = report.variableCategories.strings[key];
                markdown += "- **" + key + "** (行 " + variable.line + ", " + variable.type + ")\n";
            }
            if (otherKeys.length > 20) {
                markdown += "*... 还有 " + (otherKeys.length - 20) + " 个变量*\n";
            }
            markdown += "\n";
        }
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动全局变量来源分析");
    
    try {
        var report = GlobalVariableAnalyzer.runAnalysis();
        
        console.log("\n🎉 分析完成！");
        console.log("📊 总变量数:", report.summary.totalVariables);
        console.log("🔢 数字变量:", report.summary.numberVariables);
        console.log("📝 其他变量:", report.summary.otherVariables);
        
    } catch (error) {
        console.error("❌ 分析失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = GlobalVariableAnalyzer;
