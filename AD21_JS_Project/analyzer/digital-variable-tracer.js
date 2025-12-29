/**
 * 数字变量追踪工具
 * 专门追踪构建过程中数字变量的来源
 * 
 * @author ES3 工程语义操作系统
 * @module DigitalVariableTracer
 */

var fs = require("fs");
var path = require("path");

/**
 * 数字变量追踪工具
 */
var DigitalVariableTracer = {
    /**
     * 执行数字变量追踪分析
     */
    runTrace: function() {
        console.log("🔍 开始追踪数字变量的来源...");
        console.log("=".repeat(60));
        
        // 第一步：检查构建文件中的数字变量
        var builtAnalysis = this._analyzeBuiltFileForNumbers();
        
        // 第二步：检查构建脚本中的自动生成代码
        var scriptAnalysis = this._analyzeBuildScript();
        
        // 第三步：查找可能的数字变量生成模式
        var patternAnalysis = this._findNumberGenerationPatterns();
        
        // 第四步：生成追踪报告
        var report = this._generateTraceReport(builtAnalysis, scriptAnalysis, patternAnalysis);
        
        // 第五步：保存报告
        this._saveTraceReport(report);
        
        console.log("✅ 数字变量追踪完成");
        return report;
    },
    
    /**
     * 分析构建文件中的数字变量
     * @private
     */
    _analyzeBuiltFileForNumbers: function() {
        console.log("\n🏗️ 分析构建文件中的数字变量...");
        
        var builtFiles = ["dist/main_utf8.js", "dist/main.js"];
        var results = [];
        
        for (var i = 0; i < builtFiles.length; i++) {
            var filePath = builtFiles[i];
            console.log("\n📄 分析文件:", filePath);
            
            if (!fs.existsSync(filePath)) {
                console.log("   ⚠️ 文件不存在");
                continue;
            }
            
            try {
                var content = fs.readFileSync(filePath, "utf8");
                var lines = content.split("\n");
                var numberVariables = [];
                var numberVarLines = [];
                
                // 查找所有数字变量声明
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j].trim();
                    
                    // 匹配 var 声明中的数字变量
                    var varMatch = line.match(/var\s+(\d+)(\s*=|;)/);
                    if (varMatch) {
                        numberVariables.push(varMatch[1]);
                        numberVarLines.push({
                            lineNumber: j + 1,
                            line: line,
                            variable: varMatch[1]
                        });
                    }
                }
                
                // 统计连续的数字变量
                var consecutiveGroups = this._findConsecutiveGroups(numberVariables);
                
                var result = {
                    filePath: filePath,
                    totalNumberVars: numberVariables.length,
                    numberVariables: numberVariables,
                    numberVarLines: numberVarLines,
                    consecutiveGroups: consecutiveGroups,
                    totalLines: lines.length,
                    fileSize: content.length
                };
                
                results.push(result);
                
                console.log("   📊 数字变量总数:", numberVariables.length);
                console.log("   🔢 连续组数:", consecutiveGroups.length);
                
                if (consecutiveGroups.length > 0) {
                    console.log("   📈 最大连续组:", consecutiveGroups[0].start, "-", consecutiveGroups[0].end, "(" + consecutiveGroups[0].count + "个)");
                }
                
            } catch (error) {
                console.log("   ❌ 分析失败:", error.message);
            }
        }
        
        return results;
    },
    
    /**
     * 查找连续的数字变量组
     * @private
     */
    _findConsecutiveGroups: function(numberVariables) {
        if (numberVariables.length === 0) return [];
        
        // 转换为数字并排序
        var numbers = numberVariables.map(function(n) { return parseInt(n); });
        numbers.sort(function(a, b) { return a - b; });
        
        var groups = [];
        var currentGroup = {
            start: numbers[0],
            end: numbers[0],
            count: 1
        };
        
        for (var i = 1; i < numbers.length; i++) {
            if (numbers[i] === numbers[i-1] + 1) {
                // 连续
                currentGroup.end = numbers[i];
                currentGroup.count++;
            } else {
                // 不连续，保存当前组，开始新组
                groups.push(currentGroup);
                currentGroup = {
                    start: numbers[i],
                    end: numbers[i],
                    count: 1
                };
            }
        }
        groups.push(currentGroup);
        
        // 按组大小排序
        groups.sort(function(a, b) { return b.count - a.count; });
        
        return groups;
    },
    
    /**
     * 分析构建脚本
     * @private
     */
    _analyzeBuildScript: function() {
        console.log("\n🔧 分析构建脚本...");
        
        var scriptPath = "build/build.js";
        var result = {
            filePath: scriptPath,
            hasNumberGeneration: false,
            numberGenerationCode: [],
            globalExportCode: []
        };
        
        if (!fs.existsSync(scriptPath)) {
            console.log("   ⚠️ 构建脚本不存在");
            return result;
        }
        
        try {
            var content = fs.readFileSync(scriptPath, "utf8");
            var lines = content.split("\n");
            
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                
                // 查找可能的数字生成代码
                if (line.indexOf("for (var i = 0; i <") !== -1 || 
                    line.indexOf("globalVars") !== -1 ||
                    line.indexOf("window[") !== -1 ||
                    line.indexOf("varName") !== -1) {
                    
                    result.numberGenerationCode.push({
                        lineNumber: i + 1,
                        line: line.trim()
                    });
                }
                
                // 查找全局导出代码
                if (line.indexOf("globalVars = [") !== -1) {
                    result.hasNumberGeneration = true;
                    // 收集整个globalVars数组
                    var startLine = i;
                    var endLine = i;
                    while (endLine < lines.length && lines[endLine].indexOf("];") === -1) {
                        endLine++;
                    }
                    
                    var arrayContent = lines.slice(startLine, endLine + 1).join("\n");
                    result.globalExportCode.push({
                        startLine: startLine + 1,
                        endLine: endLine + 1,
                        content: arrayContent
                    });
                }
            }
            
            console.log("   🔍 数字生成代码片段:", result.numberGenerationCode.length);
            console.log("   📦 全局导出代码片段:", result.globalExportCode.length);
            
        } catch (error) {
            console.log("   ❌ 分析构建脚本失败:", error.message);
        }
        
        return result;
    },
    
    /**
     * 查找数字变量生成模式
     * @private
     */
    _findNumberGenerationPatterns: function() {
        console.log("\n🔍 查找数字变量生成模式...");
        
        var patterns = [
            {
                name: "构建脚本全局变量导出",
                description: "构建脚本中的globalVars数组可能生成数字变量",
                files: ["build/build.js"],
                pattern: /globalVars\s*=\s*\[([\s\S]*?)\]/
            },
            {
                name: "自动索引生成",
                description: "循环中可能生成数字索引变量",
                files: ["build/build.js", "scripts/build-integrator.js"],
                pattern: /for\s*\(\s*var\s+i\s*=\s*\d+/g
            },
            {
                name: "数组索引变量",
                description: "数组访问可能创建数字变量",
                files: ["src/**/*.js"],
                pattern: /var\s+\d+\s*=/g
            }
        ];
        
        var results = [];
        
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            console.log("\n   🔍 检查模式:", pattern.name);
            
            var patternResult = {
                name: pattern.name,
                description: pattern.description,
                matches: []
            };
            
            for (var j = 0; j < pattern.files.length; j++) {
                var filePattern = pattern.files[j];
                var files = this._getFilesByPattern(filePattern);
                
                for (var k = 0; k < files.length; k++) {
                    var filePath = files[k];
                    try {
                        var content = fs.readFileSync(filePath, "utf8");
                        var matches = content.match(pattern.pattern);
                        
                        if (matches && matches.length > 0) {
                            patternResult.matches.push({
                                file: filePath,
                                matches: matches,
                                count: matches.length
                            });
                            
                            console.log("      ✅ 找到", matches.length, "个匹配在", path.basename(filePath));
                        }
                    } catch (error) {
                        // 忽略读取错误
                    }
                }
            }
            
            if (patternResult.matches.length > 0) {
                results.push(patternResult);
            }
        }
        
        console.log("\n   📊 发现", results.length, "个匹配模式");
        
        return results;
    },
    
    /**
     * 根据模式获取文件列表
     * @private
     */
    _getFilesByPattern: function(pattern) {
        // 简化的文件匹配，只处理常见情况
        if (pattern.indexOf("**") === -1) {
            // 直接文件路径
            return fs.existsSync(pattern) ? [pattern] : [];
        }
        
        // 简单的通配符处理
        var files = [];
        if (pattern.startsWith("src/**/*.js")) {
            var srcDir = "src";
            if (fs.existsSync(srcDir)) {
                var allFiles = this._getAllFiles(srcDir, ".js");
                files = files.concat(allFiles);
            }
        }
        
        return files;
    },
    
    /**
     * 递归获取所有文件
     * @private
     */
    _getAllFiles: function(dir, extension) {
        var files = [];
        
        try {
            var items = fs.readdirSync(dir);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemPath = path.join(dir, item);
                var stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    var subFiles = this._getAllFiles(itemPath, extension);
                    files = files.concat(subFiles);
                } else if (item.endsWith(extension)) {
                    files.push(itemPath);
                }
            }
        } catch (error) {
            // 忽略错误
        }
        
        return files;
    },
    
    /**
     * 生成追踪报告
     * @private
     */
    _generateTraceReport: function(builtAnalysis, scriptAnalysis, patternAnalysis) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                description: "数字变量来源追踪报告"
            },
            summary: {
                totalBuiltFiles: builtAnalysis.length,
                totalNumberVariables: 0,
                maxConsecutiveGroup: null,
                hasScriptGeneration: scriptAnalysis.hasNumberGeneration,
                patternsFound: patternAnalysis.length
            },
            builtFileAnalysis: builtAnalysis,
            scriptAnalysis: scriptAnalysis,
            patternAnalysis: patternAnalysis,
            conclusions: []
        };
        
        // 计算总体统计
        for (var i = 0; i < builtAnalysis.length; i++) {
            var analysis = builtAnalysis[i];
            report.summary.totalNumberVariables += analysis.totalNumberVars;
            
            if (analysis.consecutiveGroups.length > 0) {
                if (!report.summary.maxConsecutiveGroup || 
                    analysis.consecutiveGroups[0].count > report.summary.maxConsecutiveGroup.count) {
                    report.summary.maxConsecutiveGroup = analysis.consecutiveGroups[0];
                }
            }
        }
        
        // 生成结论
        if (report.summary.totalNumberVariables > 1000) {
            report.conclusions.push({
                type: "excessive_numbers",
                severity: "high",
                description: "发现大量数字变量（" + report.summary.totalNumberVariables + "个），需要调查来源"
            });
        }
        
        if (scriptAnalysis.hasNumberGeneration) {
            report.conclusions.push({
                type: "script_generation",
                severity: "medium",
                description: "构建脚本可能包含数字变量生成代码"
            });
        }
        
        if (report.summary.maxConsecutiveGroup && report.summary.maxConsecutiveGroup.count > 100) {
            report.conclusions.push({
                type: "consecutive_pattern",
                severity: "medium",
                description: "发现大型连续数字变量组（" + report.summary.maxConsecutiveGroup.count + "个连续变量）"
            });
        }
        
        if (patternAnalysis.length > 0) {
            report.conclusions.push({
                type: "pattern_matches",
                severity: "low",
                description: "发现" + patternAnalysis.length + "个可能的数字变量生成模式"
            });
        }
        
        return report;
    },
    
    /**
     * 保存追踪报告
     * @private
     */
    _saveTraceReport: function(report) {
        var reportPath = "analyzer/reports/digital-variable-trace.json";
        var markdownPath = reportPath.replace(".json", ".md");
        
        // 保存JSON报告
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
        
        // 生成Markdown报告
        var markdown = this._generateMarkdownReport(report);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 追踪报告已保存:");
        console.log("   JSON:", reportPath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成Markdown报告
     * @private
     */
    _generateMarkdownReport: function(report) {
        var markdown = "# 数字变量来源追踪报告\n\n";
        
        markdown += "## 📊 总体概览\n\n";
        markdown += "- **生成时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **构建文件数量**: " + report.summary.totalBuiltFiles + "\n";
        markdown += "- **数字变量总数**: " + report.summary.totalNumberVariables + "\n";
        markdown += "- **最大连续组**: ";
        
        if (report.summary.maxConsecutiveGroup) {
            markdown += report.summary.maxConsecutiveGroup.start + " - " + 
                       report.summary.maxConsecutiveGroup.end + 
                       " (" + report.summary.maxConsecutiveGroup.count + "个)\n";
        } else {
            markdown += "无\n";
        }
        
        markdown += "- **构建脚本生成**: " + (report.summary.hasScriptGeneration ? "是" : "否") + "\n";
        markdown += "- **发现模式**: " + report.summary.patternsFound + " 个\n\n";
        
        // 构建文件分析
        markdown += "## 🏗️ 构建文件分析\n\n";
        
        for (var i = 0; i < report.builtFileAnalysis.length; i++) {
            var analysis = report.builtFileAnalysis[i];
            markdown += "### " + path.basename(analysis.filePath) + "\n\n";
            markdown += "- **数字变量**: " + analysis.totalNumberVars + " 个\n";
            markdown += "- **连续组**: " + analysis.consecutiveGroups.length + " 个\n";
            markdown += "- **文件大小**: " + analysis.fileSize + " bytes\n";
            markdown += "- **总行数**: " + analysis.totalLines + " 行\n\n";
            
            if (analysis.consecutiveGroups.length > 0) {
                markdown += "#### 连续数字变量组\n\n";
                markdown += "| 排名 | 起始 | 结束 | 数量 |\n";
                markdown += "|------|------|------|------|\n";
                
                for (var j = 0; j < Math.min(5, analysis.consecutiveGroups.length); j++) {
                    var group = analysis.consecutiveGroups[j];
                    markdown += "| " + (j + 1) + " | " + group.start + " | " + group.end + " | " + group.count + " |\n";
                }
                markdown += "\n";
            }
        }
        
        // 构建脚本分析
        markdown += "## 🔧 构建脚本分析\n\n";
        
        if (report.scriptAnalysis.hasNumberGeneration) {
            markdown += "### ⚠️ 发现数字变量生成代码\n\n";
            
            for (var k = 0; k < report.scriptAnalysis.globalExportCode.length; k++) {
                var code = report.scriptAnalysis.globalExportCode[k];
                markdown += "#### 全局导出代码 (第" + code.startLine + "-" + code.endLine + "行)\n\n";
                markdown += "```javascript\n" + code.content + "\n```\n\n";
            }
            
            if (report.scriptAnalysis.numberGenerationCode.length > 0) {
                markdown += "#### 数字生成相关代码片段\n\n";
                for (var l = 0; l < report.scriptAnalysis.numberGenerationCode.length; l++) {
                    var snippet = report.scriptAnalysis.numberGenerationCode[l];
                    markdown += "- 第" + snippet.lineNumber + "行: `" + snippet.line + "`\n";
                }
                markdown += "\n";
            }
        } else {
            markdown += "✅ 未发现明显的数字变量生成代码\n\n";
        }
        
        // 模式分析
        if (report.patternAnalysis.length > 0) {
            markdown += "## 🔍 模式匹配分析\n\n";
            
            for (var m = 0; m < report.patternAnalysis.length; m++) {
                var pattern = report.patternAnalysis[m];
                markdown += "### " + pattern.name + "\n\n";
                markdown += pattern.description + "\n\n";
                
                for (var n = 0; n < pattern.matches.length; n++) {
                    var match = pattern.matches[n];
                    markdown += "- **" + path.basename(match.file) + "**: " + match.count + " 个匹配\n";
                }
                markdown += "\n";
            }
        }
        
        // 结论
        markdown += "## 🎯 分析结论\n\n";
        
        if (report.conclusions.length === 0) {
            markdown += "✅ 未发现异常的数字变量生成模式\n\n";
        } else {
            for (var o = 0; o < report.conclusions.length; o++) {
                var conclusion = report.conclusions[o];
                var severity = conclusion.severity === "high" ? "🔴" : 
                              conclusion.severity === "medium" ? "🟡" : "🟢";
                markdown += "### " + severity + " " + conclusion.type + "\n\n";
                markdown += conclusion.description + "\n\n";
            }
        }
        
        // 建议
        markdown += "## 💡 建议\n\n";
        
        if (report.summary.totalNumberVariables > 1000) {
            markdown += "1. **调查数字变量来源**: 检查构建脚本中的自动生成代码\n";
            markdown += "2. **优化构建过程**: 减少不必要的数字变量生成\n";
            markdown += "3. **变量命名优化**: 使用有意义的变量名而非数字\n";
        } else if (report.summary.maxConsecutiveGroup && report.summary.maxConsecutiveGroup.count > 100) {
            markdown += "1. **检查连续变量用途**: 确认大型连续数字变量的必要性\n";
            markdown += "2. **考虑数组替代**: 使用数组结构替代大量连续变量\n";
        }
        
        if (report.scriptAnalysis.hasNumberGeneration) {
            markdown += "3. **审查构建脚本**: 检查globalVars数组的内容和用途\n";
        }
        
        markdown += "\n---\n";
        markdown += "*报告生成时间: " + new Date().toLocaleString() + "*\n";
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动数字变量追踪");
    
    try {
        var report = DigitalVariableTracer.runTrace();
        
        console.log("\n🎉 追踪完成！");
        console.log("📊 数字变量总数:", report.summary.totalNumberVariables);
        console.log("🔧 构建脚本生成:", report.summary.hasScriptGeneration ? "是" : "否");
        console.log("🔍 发现模式:", report.summary.patternsFound, "个");
        
    } catch (error) {
        console.error("❌ 追踪失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = DigitalVariableTracer;
