/**
 * 数字变量深度调查工具
 * 查找0-1358数字变量的真正来源
 * 
 * @author ES3 工程语义操作系统
 * @module NumberVariableInvestigator
 */

var fs = require("fs");
var path = require("path");

/**
 * 数字变量调查工具
 */
var NumberVariableInvestigator = {
    /**
     * 执行深度调查
     */
    investigate: function() {
        console.log("🔍 开始深度调查数字变量来源...");
        console.log("=".repeat(60));
        
        // 第一步：检查构建文件中的数字引用
        var builtFileInvestigation = this._investigateBuiltFile();
        
        // 第二步：查找数字变量的定义方式
        var definitionInvestigation = this._investigateDefinitions();
        
        // 第三步：分析可能的数组或对象索引
        var indexInvestigation = this._investigateIndexes();
        
        // 第四步：检查AST解析的特殊情况
        var astInvestigation = this._investigateASTAnomalies();
        
        // 第五步：生成调查报告
        var report = this._generateInvestigationReport(
            builtFileInvestigation, 
            definitionInvestigation, 
            indexInvestigation, 
            astInvestigation
        );
        
        // 第六步：保存报告
        this._saveInvestigationReport(report);
        
        console.log("✅ 数字变量深度调查完成");
        return report;
    },
    
    /**
     * 调查构建文件
     * @private
     */
    _investigateBuiltFile: function() {
        console.log("\n🏗️ 调查构建文件中的数字引用...");
        
        var filePath = "dist/main_utf8.js";
        var result = {
            filePath: filePath,
            totalLines: 0,
            numberReferences: [],
            arrayAccessPatterns: [],
            objectAccessPatterns: [],
            suspiciousPatterns: []
        };
        
        if (!fs.existsSync(filePath)) {
            console.log("   ⚠️ 构建文件不存在");
            return result;
        }
        
        try {
            var content = fs.readFileSync(filePath, "utf8");
            var lines = content.split("\n");
            result.totalLines = lines.length;
            
            console.log("   📊 总行数:", result.totalLines);
            
            // 查找数字引用的各种模式
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var lineNumber = i + 1;
                
                // 查找数组访问模式 array[0], array[1] 等
                var arrayMatches = line.match(/\w+\[(\d+)\]/g);
                if (arrayMatches) {
                    for (var j = 0; j < arrayMatches.length; j++) {
                        var match = arrayMatches[j];
                        var number = match.match(/\[(\d+)\]/)[1];
                        result.arrayAccessPatterns.push({
                            line: lineNumber,
                            pattern: match,
                            number: number,
                            fullLine: line.trim()
                        });
                    }
                }
                
                // 查找对象访问模式 obj.0, obj.1 等
                var objectMatches = line.match(/\w+\.(\d+)/g);
                if (objectMatches) {
                    for (var k = 0; k < objectMatches.length; k++) {
                        var objMatch = objectMatches[k];
                        var objNumber = objMatch.match(/\.(\d+)/)[1];
                        result.objectAccessPatterns.push({
                            line: lineNumber,
                            pattern: objMatch,
                            number: objNumber,
                            fullLine: line.trim()
                        });
                    }
                }
                
                // 查找可疑的数字变量声明或使用
                if (line.indexOf("var ") !== -1 && /\d+/.test(line)) {
                    result.suspiciousPatterns.push({
                        line: lineNumber,
                        type: "var_declaration",
                        content: line.trim()
                    });
                }
                
                // 查找直接的数字使用（可能是变量名）
                var directNumberMatch = line.match(/^\s*(\d+)\s*[=;]/);
                if (directNumberMatch) {
                    result.numberReferences.push({
                        line: lineNumber,
                        number: directNumberMatch[1],
                        content: line.trim()
                    });
                }
            }
            
            console.log("   🔢 数字引用:", result.numberReferences.length);
            console.log("   📦 数组访问模式:", result.arrayAccessPatterns.length);
            console.log("   🏷️ 对象访问模式:", result.objectAccessPatterns.length);
            console.log("   ⚠️ 可疑模式:", result.suspiciousPatterns.length);
            
        } catch (error) {
            console.log("   ❌ 调查失败:", error.message);
        }
        
        return result;
    },
    
    /**
     * 调查数字变量的定义方式
     * @private
     */
    _investigateDefinitions: function() {
        console.log("\n🔍 调查数字变量的定义方式...");
        
        var definitions = {
            varDeclarations: [],
            arrayElements: [],
            objectProperties: [],
            functionParameters: [],
            otherDefinitions: []
        };
        
        var filePath = "dist/main_utf8.js";
        if (!fs.existsSync(filePath)) {
            return definitions;
        }
        
        try {
            var content = fs.readFileSync(filePath, "utf8");
            var lines = content.split("\n");
            
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var lineNumber = i + 1;
                
                // 查找 var 数字 的声明
                var varMatch = line.match(/var\s+(\d+)\s*[=,;]/);
                if (varMatch) {
                    definitions.varDeclarations.push({
                        line: lineNumber,
                        variable: varMatch[1],
                        fullLine: line.trim()
                    });
                }
                
                // 查找数组中的数字元素 [0, 1, 2]
                var arrayMatch = line.match(/\[(\s*\d+\s*(?:,\s*\d+\s*)*)\]/);
                if (arrayMatch) {
                    definitions.arrayElements.push({
                        line: lineNumber,
                        array: arrayMatch[0],
                        numbers: arrayMatch[1].match(/\d+/g),
                        fullLine: line.trim()
                    });
                }
                
                // 查找对象中的数字属性 {0: value, 1: value}
                var objectMatch = line.match(/\{(\s*\d+\s*:\s*[^,}]+(?:,\s*\d+\s*:\s*[^,}]+)*)\}/);
                if (objectMatch) {
                    definitions.objectProperties.push({
                        line: lineNumber,
                        object: objectMatch[0],
                        properties: objectMatch[1].split(','),
                        fullLine: line.trim()
                    });
                }
                
                // 查找函数参数中的数字
                var paramMatch = line.match(/function\s*\([^)]*\d+[^)]*\)/);
                if (paramMatch) {
                    definitions.functionParameters.push({
                        line: lineNumber,
                        signature: paramMatch[0],
                        fullLine: line.trim()
                    });
                }
            }
            
            console.log("   📝 var声明:", definitions.varDeclarations.length);
            console.log("   📚 数组元素:", definitions.arrayElements.length);
            console.log("   🏷️ 对象属性:", definitions.objectProperties.length);
            console.log("   🎯 函数参数:", definitions.functionParameters.length);
            
        } catch (error) {
            console.log("   ❌ 定义调查失败:", error.message);
        }
        
        return definitions;
    },
    
    /**
     * 调查索引相关
     * @private
     */
    _investigateIndexes: function() {
        console.log("\n📇 调查索引相关模式...");
        
        var indexPatterns = {
            forLoops: [],
            whileLoops: [],
            arrayIterations: [],
            objectIterations: []
        };
        
        var filePath = "dist/main_utf8.js";
        if (!fs.existsSync(filePath)) {
            return indexPatterns;
        }
        
        try {
            var content = fs.readFileSync(filePath, "utf8");
            var lines = content.split("\n");
            
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var lineNumber = i + 1;
                
                // 查找 for 循环中的数字索引
                var forMatch = line.match(/for\s*\(\s*var\s+(\w+)\s*=\s*(\d+)/);
                if (forMatch) {
                    indexPatterns.forLoops.push({
                        line: lineNumber,
                        variable: forMatch[1],
                        startValue: forMatch[2],
                        fullLine: line.trim()
                    });
                }
                
                // 查找 while 循环中的数字
                var whileMatch = line.match(/while\s*\([^)]*\d+/);
                if (whileMatch) {
                    indexPatterns.whileLoops.push({
                        line: lineNumber,
                        condition: whileMatch[0],
                        fullLine: line.trim()
                    });
                }
                
                // 查找数组迭代模式
                var arrayIterMatch = line.match(/\w+\[\w+\]/);
                if (arrayIterMatch) {
                    indexPatterns.arrayIterations.push({
                        line: lineNumber,
                        pattern: arrayIterMatch[0],
                        fullLine: line.trim()
                    });
                }
                
                // 查找对象迭代模式
                var objIterMatch = line.match(/for.*in.*\d+/);
                if (objIterMatch) {
                    indexPatterns.objectIterations.push({
                        line: lineNumber,
                        pattern: objIterMatch[0],
                        fullLine: line.trim()
                    });
                }
            }
            
            console.log("   🔄 for循环:", indexPatterns.forLoops.length);
            console.log("   🔁 while循环:", indexPatterns.whileLoops.length);
            console.log("   📋 数组迭代:", indexPatterns.arrayIterations.length);
            console.log("   🏷️ 对象迭代:", indexPatterns.objectIterations.length);
            
        } catch (error) {
            console.log("   ❌ 索引调查失败:", error.message);
        }
        
        return indexPatterns;
    },
    
    /**
     * 调查AST异常
     * @private
     */
    _investigateASTAnomalies: function() {
        console.log("\n🌳 调查AST解析异常...");
        
        var anomalies = {
            parsingErrors: [],
            symbolExtractionIssues: [],
            variableDetectionProblems: []
        };
        
        // 检查是否有AST解析的特殊情况
        try {
            // 使用现有的AST解析器重新分析
            var ASTParser = require("./ast/parser");
            var tempDir = path.join(__dirname, "temp");
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            var tempFilePath = path.join(tempDir, "build-analysis.js");
            var buildContent = fs.readFileSync("dist/main_utf8.js", "utf8");
            fs.writeFileSync(tempFilePath, buildContent, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            
            if (!parseResult.success) {
                anomalies.parsingErrors.push({
                    error: parseResult.error,
                    details: "构建文件AST解析失败"
                });
            } else {
                // 检查符号提取是否正确
                console.log("   ✅ AST解析成功");
                console.log("   📊 提取的符号数量:", Object.keys(parseResult.symbols || {}).length);
            }
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                // 忽略清理错误
            }
            
        } catch (error) {
            anomalies.parsingErrors.push({
                error: error.message,
                details: "AST分析过程异常"
            });
        }
        
        console.log("   ❌ 解析错误:", anomalies.parsingErrors.length);
        
        return anomalies;
    },
    
    /**
     * 生成调查报告
     * @private
     */
    _generateInvestigationReport: function(builtFile, definitions, indexes, astAnomalies) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                description: "数字变量深度调查报告"
            },
            summary: {
                totalLines: builtFile.totalLines,
                numberReferences: builtFile.numberReferences.length,
                arrayAccessPatterns: builtFile.arrayAccessPatterns.length,
                objectAccessPatterns: builtFile.objectAccessPatterns.length,
                suspiciousPatterns: builtFile.suspiciousPatterns.length,
                varDeclarations: definitions.varDeclarations.length,
                arrayElements: definitions.arrayElements.length,
                objectProperties: definitions.objectProperties.length,
                forLoops: indexes.forLoops.length,
                parsingErrors: astAnomalies.parsingErrors.length
            },
            findings: {
                builtFileInvestigation: builtFile,
                definitionInvestigation: definitions,
                indexInvestigation: indexes,
                astInvestigation: astAnomalies
            },
            hypotheses: [],
            conclusions: []
        };
        
        // 生成假设
        if (report.summary.numberReferences === 0 && 
            report.summary.arrayAccessPatterns > 1000) {
            report.hypotheses.push({
                type: "ast_misinterpretation",
                description: "AST解析器可能将数组访问模式误解为全局变量",
                likelihood: "high",
                evidence: "发现大量数组访问模式但没有直接的数字变量声明"
            });
        }
        
        if (report.summary.arrayAccessPatterns > 1000) {
            report.hypotheses.push({
                type: "symbol_extraction_error",
                description: "符号提取过程可能错误地将数组索引识别为变量",
                likelihood: "medium",
                evidence: "数组访问模式数量异常高"
            });
        }
        
        if (report.summary.parsingErrors > 0) {
            report.hypotheses.push({
                type: "parsing_issue",
                description: "AST解析可能存在问题，导致符号识别错误",
                likelihood: "high",
                evidence: "发现AST解析错误"
            });
        }
        
        // 生成结论
        if (report.summary.arrayAccessPatterns > 1000) {
            report.conclusions.push({
                type: "false_positive",
                severity: "high",
                description: "1359个数字变量很可能是数组访问模式的误识别",
                recommendation: "检查符号提取逻辑，区分真正的变量和数组索引"
            });
        }
        
        if (report.summary.numberReferences === 0) {
            report.conclusions.push({
                type: "no_real_variables",
                severity: "info",
                description: "构建文件中不存在真正的数字命名全局变量",
                recommendation: "确认符号提取工具的正确性"
            });
        }
        
        return report;
    },
    
    /**
     * 保存调查报告
     * @private
     */
    _saveInvestigationReport: function(report) {
        var reportPath = "analyzer/reports/number-variable-investigation.json";
        var markdownPath = reportPath.replace(".json", ".md");
        
        // 保存JSON报告
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
        
        // 生成Markdown报告
        var markdown = this._generateMarkdownReport(report);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 调查报告已保存:");
        console.log("   JSON:", reportPath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成Markdown报告
     * @private
     */
    _generateMarkdownReport: function(report) {
        var markdown = "# 数字变量深度调查报告\n\n";
        
        markdown += "## 📊 调查概览\n\n";
        markdown += "- **生成时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **构建文件总行数**: " + report.summary.totalLines + "\n";
        markdown += "- **数字引用**: " + report.summary.numberReferences + "\n";
        markdown += "- **数组访问模式**: " + report.summary.arrayAccessPatterns + "\n";
        markdown += "- **对象访问模式**: " + report.summary.objectAccessPatterns + "\n";
        markdown += "- **可疑模式**: " + report.summary.suspiciousPatterns + "\n";
        markdown += "- **var声明**: " + report.summary.varDeclarations + "\n";
        markdown += "- **for循环**: " + report.summary.forLoops + "\n";
        markdown += "- **解析错误**: " + report.summary.parsingErrors + "\n\n";
        
        // 假设分析
        if (report.hypotheses.length > 0) {
            markdown += "## 🔍 调查假设\n\n";
            
            for (var i = 0; i < report.hypotheses.length; i++) {
                var hypothesis = report.hypotheses[i];
                var likelihood = hypothesis.likelihood === "high" ? "🔴" : 
                               hypothesis.likelihood === "medium" ? "🟡" : "🟢";
                
                markdown += "### " + likelihood + " " + hypothesis.type + "\n\n";
                markdown += "**描述**: " + hypothesis.description + "\n\n";
                markdown += "**可能性**: " + hypothesis.likelihood + "\n\n";
                markdown += "**证据**: " + hypothesis.evidence + "\n\n";
            }
        }
        
        // 结论
        if (report.conclusions.length > 0) {
            markdown += "## 🎯 调查结论\n\n";
            
            for (var j = 0; j < report.conclusions.length; j++) {
                var conclusion = report.conclusions[j];
                var severity = conclusion.severity === "high" ? "🔴" : 
                              conclusion.severity === "medium" ? "🟡" : "🟢";
                
                markdown += "### " + severity + " " + conclusion.type + "\n\n";
                markdown += "**描述**: " + conclusion.description + "\n\n";
                markdown += "**建议**: " + conclusion.recommendation + "\n\n";
            }
        }
        
        // 详细数据
        markdown += "## 📋 详细数据\n\n";
        
        var builtFile = report.findings.builtFileInvestigation;
        markdown += "### 构建文件分析\n\n";
        markdown += "- **数字引用**: " + builtFile.numberReferences.length + " 个\n";
        markdown += "- **数组访问模式**: " + builtFile.arrayAccessPatterns.length + " 个\n";
        markdown += "- **对象访问模式**: " + builtFile.objectAccessPatterns.length + " 个\n\n";
        
        if (builtFile.arrayAccessPatterns.length > 0) {
            markdown += "#### 数组访问模式样例\n\n";
            for (var k = 0; k < Math.min(10, builtFile.arrayAccessPatterns.length); k++) {
                var pattern = builtFile.arrayAccessPatterns[k];
                markdown += "- 第" + pattern.line + "行: `" + pattern.pattern + "`\n";
            }
            if (builtFile.arrayAccessPatterns.length > 10) {
                markdown += "*... 还有 " + (builtFile.arrayAccessPatterns.length - 10) + " 个*\n";
            }
            markdown += "\n";
        }
        
        // 最终判断
        markdown += "## 🏁 最终判断\n\n";
        
        if (report.summary.arrayAccessPatterns > 1000 && report.summary.numberReferences === 0) {
            markdown += "### 🔴 重要发现\n\n";
            markdown += "**1359个数字变量很可能是误报！**\n\n";
            markdown += "**原因分析**:\n";
            markdown += "1. 构建文件中没有发现真正的数字变量声明\n";
            markdown += "2. 发现大量数组访问模式（" + report.summary.arrayAccessPatterns + "个）\n";
            markdown += "3. 这与1359个数字变量的数量高度吻合\n\n";
            
            markdown += "**技术原因**:\n";
            markdown += "符号提取工具可能将 `array[0]`, `array[1]` 等数组访问模式中的数字索引误识别为全局变量。\n\n";
            
            markdown += "**解决方案**:\n";
            markdown += "1. 修改符号提取逻辑，区分变量声明和数组访问\n";
            markdown += "2. 在AST解析中正确处理成员表达式\n";
            markdown += "3. 验证符号提取的准确性\n\n";
        } else {
            markdown += "### 🟡 需要进一步调查\n\n";
            markdown += "当前数据不足以确定1359个数字变量的确切来源。\n";
            markdown += "建议进行更深入的代码分析。\n\n";
        }
        
        markdown += "---\n";
        markdown += "*报告生成时间: " + new Date().toLocaleString() + "*\n";
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动数字变量深度调查");
    
    try {
        var report = NumberVariableInvestigator.investigate();
        
        console.log("\n🎉 调查完成！");
        console.log("📊 总行数:", report.summary.totalLines);
        console.log("🔢 数字引用:", report.summary.numberReferences);
        console.log("📦 数组访问:", report.summary.arrayAccessPatterns);
        console.log("🏷️ 对象访问:", report.summary.objectAccessPatterns);
        console.log("⚠️ 可疑模式:", report.summary.suspiciousPatterns);
        
        if (report.summary.arrayAccessPatterns > 1000) {
            console.log("\n🔴 重要发现: 可能存在符号提取误报！");
        }
        
    } catch (error) {
        console.error("❌ 调查失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = NumberVariableInvestigator;
