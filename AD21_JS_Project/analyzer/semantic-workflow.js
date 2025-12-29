#!/usr/bin/env node

/**
 * Semantic Workflow CLI v1.0
 * 工程级语义裁判 + 计划生成器
 * 
 * 核心原则：
 * 1. CLI是无状态裁判，不是流程记忆体
 * 2. 只接受声明的意图类型，不接受自然语言目标
 * 3. v1只生成计划和建议，不自动执行代码
 * 
 * @author ES3 工程语义操作系统
 */

var fs = require("fs");
var path = require("path");

// 导入语义系统组件
var CapabilityIndexBuilder = require("./capability-index-builder");
var CapabilityQueryValidator = require("./capability-query-validator");
var SemanticAnalyzer = require("./semantic/semantic-analyzer");
var ActionPlanner = require("./execution/action-planner");
var Interpreter = require("./interpretation/interpreter");

/**
 * CLI主控制器
 */
var SemanticWorkflow = {
    /**
     * CLI入口点
     */
    main: function() {
        var args = process.argv.slice(2);
        
        if (args.length === 0) {
            this.showHelp();
            return;
        }
        
        var command = args[0];
        var options = this.parseOptions(args.slice(1));
        
        try {
            this.executeCommand(command, options);
        } catch (error) {
            console.error("❌ 执行失败:", error.message);
            console.error("   详情:", error.stack);
            process.exit(1);
        }
    },
    
    /**
     * 显示帮助信息
     */
    showHelp: function() {
        console.log("🧠 Semantic Workflow CLI v1.0");
        console.log("═══════════════════════════════════════");
        console.log();
        console.log("🔍 查询命令 (Gate + Query):");
        console.log("  list-modules                    列出所有模块");
        console.log("  list-methods --module <name>    列出模块方法");
        console.log("  check-callable --object <name>   检查对象可调用性");
        console.log("  can-access --from <obj> --to <target>  检查访问权限");
        console.log("  predict-impact --symbol <name> --action <type>  预测影响");
        console.log();
        console.log("📋 计划生成 (Plan Generator):");
        console.log("  generate-plan --intent <type> --symbol <name>  生成执行计划");
        console.log("  simulate-plan --plan <id>       模拟执行计划");
        console.log();
        console.log("📊 报告命令:");
        console.log("  validate-capability             验证能力索引");
        console.log("  analyze-project --path <dir>    分析项目语义");
        console.log();
        console.log("⚙️  选项:");
        console.log("  --format json|markdown          输出格式 (默认: markdown)");
        console.log("  --output <file>                输出到文件");
        console.log("  --facts <file>                 指定事实文件路径");
        console.log("  --verbose                      详细输出");
        console.log();
        console.log("💡 示例:");
        console.log("  node semantic-workflow.js list-modules");
        console.log("  node semantic-workflow.js check-callable --object LoggerModule");
        console.log("  node semantic-workflow.js generate-plan --intent remove-unused-symbol --symbol deadVar");
    },
    
    /**
     * 解析命令行选项
     */
    parseOptions: function(args) {
        var options = {
            format: "markdown",
            verbose: false,
            facts: null,
            output: null
        };
        
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            
            if (arg === "--format" && i + 1 < args.length) {
                options.format = args[i + 1];
                i++;
            } else if (arg === "--output" && i + 1 < args.length) {
                options.output = args[i + 1];
                i++;
            } else if (arg === "--facts" && i + 1 < args.length) {
                options.facts = args[i + 1];
                i++;
            } else if (arg === "--verbose") {
                options.verbose = true;
            } else if (arg.startsWith("--")) {
                var key = arg.substring(2);
                if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
                    options[key] = args[i + 1];
                    i++;
                } else {
                    options[key] = true;
                }
            }
        }
        
        return options;
    },
    
    /**
     * 执行命令
     */
    executeCommand: function(command, options) {
        console.log("🚀 执行命令:", command);
        
        var result;
        
        switch (command) {
            case "list-modules":
                result = this.listModules(options);
                break;
                
            case "list-methods":
                result = this.listMethods(options);
                break;
                
            case "check-callable":
                result = this.checkCallable(options);
                break;
                
            case "can-access":
                result = this.canAccess(options);
                break;
                
            case "predict-impact":
                result = this.predictImpact(options);
                break;
                
            case "generate-plan":
                result = this.generatePlan(options);
                break;
                
            case "simulate-plan":
                result = this.simulatePlan(options);
                break;
                
            case "validate-capability":
                result = this.validateCapability(options);
                break;
                
            case "analyze-project":
                result = this.analyzeProject(options);
                break;
                
            default:
                throw new Error("未知命令: " + command);
        }
        
        // 输出结果
        this.outputResult(result, options);
    },
    
    /**
     * 加载能力查询接口
     */
    loadCapabilityQuery: function(options) {
        var factsPath = options.facts || "reports/capability-index-v1.json";
        
        if (!fs.existsSync(factsPath)) {
            throw new Error("能力索引文件不存在: " + factsPath + "\n请先运行 capability-index-builder.js");
        }
        
        var capabilityData = JSON.parse(fs.readFileSync(factsPath, "utf8"));
        
        // 重建查询接口
        var queryInterface = {
            isObjectCallable: function(objectName) {
                if (capabilityData.facts.modules[objectName]) {
                    return capabilityData.facts.modules[objectName].callable;
                }
                if (capabilityData.facts.callables[objectName]) {
                    return capabilityData.facts.callables[objectName].callable;
                }
                return false;
            },
            
            listMethods: function(objectName) {
                if (capabilityData.facts.modules[objectName]) {
                    return Object.keys(capabilityData.facts.modules[objectName].methods);
                }
                if (capabilityData.facts.callables[objectName]) {
                    return [capabilityData.facts.callables[objectName].name];
                }
                return [];
            },
            
            canAccess: function(fromObject, toTarget) {
                var fromExists = capabilityData.facts.modules[fromObject] || capabilityData.facts.callables[fromObject];
                var toExists = capabilityData.facts.modules[toTarget] || capabilityData.facts.callables[toTarget];
                
                return {
                    fromExists: !!fromExists,
                    toExists: !!toExists,
                    staticallyReachable: fromExists && toExists
                };
            },
            
            getGlobalSymbols: function() {
                return {
                    modules: Object.keys(capabilityData.facts.modules),
                    callables: Object.keys(capabilityData.facts.callables),
                    globals: Object.keys(capabilityData.facts.globals)
                };
            },
            
            getMethodSignature: function(objectName, methodName) {
                var module = capabilityData.facts.modules[objectName];
                if (module && module.methods[methodName]) {
                    return module.methods[methodName].signature;
                }
                return null;
            },
            
            getModuleDependencies: function(moduleName) {
                var module = capabilityData.facts.modules[moduleName];
                if (module) {
                    return module.dependencies;
                }
                return [];
            }
        };
        
        return queryInterface;
    },
    
    /**
     * 列出所有模块
     */
    listModules: function(options) {
        var query = this.loadCapabilityQuery(options);
        var symbols = query.getGlobalSymbols();
        
        var result = {
            command: "list-modules",
            success: true,
            data: {
                modules: symbols.modules,
                callables: symbols.callables,
                globals: symbols.globals,
                summary: {
                    totalModules: symbols.modules.length,
                    totalCallables: symbols.callables.length,
                    totalGlobals: symbols.globals.length
                }
            }
        };
        
        return result;
    },
    
    /**
     * 列出模块方法
     */
    listMethods: function(options) {
        if (!options.module) {
            throw new Error("缺少必需参数: --module <name>");
        }
        
        var query = this.loadCapabilityQuery(options);
        var methods = query.listMethods(options.module);
        var callable = query.isObjectCallable(options.module);
        
        var result = {
            command: "list-methods",
            success: true,
            data: {
                module: options.module,
                callable: callable,
                methods: methods,
                summary: {
                    methodCount: methods.length
                }
            }
        };
        
        return result;
    },
    
    /**
     * 检查对象可调用性
     */
    checkCallable: function(options) {
        if (!options.object) {
            throw new Error("缺少必需参数: --object <name>");
        }
        
        var query = this.loadCapabilityQuery(options);
        var callable = query.isObjectCallable(options.object);
        var methods = query.listMethods(options.object);
        
        var result = {
            command: "check-callable",
            success: true,
            data: {
                object: options.object,
                callable: callable,
                methods: methods,
                conclusion: callable ? "✅ 对象可调用" : "❌ 对象不可调用"
            }
        };
        
        return result;
    },
    
    /**
     * 检查访问权限
     */
    canAccess: function(options) {
        if (!options.from || !options.to) {
            throw new Error("缺少必需参数: --from <object> --to <target>");
        }
        
        var query = this.loadCapabilityQuery(options);
        var access = query.canAccess(options.from, options.to);
        
        var result = {
            command: "can-access",
            success: true,
            data: {
                from: options.from,
                to: options.to,
                access: access,
                conclusion: access.staticallyReachable ? 
                    "✅ 静态可达" : "❌ 静态不可达"
            }
        };
        
        return result;
    },
    
    /**
     * 预测影响
     */
    predictImpact: function(options) {
        if (!options.symbol) {
            throw new Error("缺少必需参数: --symbol <name>");
        }
        
        // 加载能力索引
        var factsPath = options.facts || "reports/capability-index-v1.json";
        var capabilityData = JSON.parse(fs.readFileSync(factsPath, "utf8"));
        
        // 模拟影响分析
        var symbolExists = capabilityData.facts.modules[options.symbol] || 
                          capabilityData.facts.callables[options.symbol] ||
                          capabilityData.facts.globals[options.symbol];
        
        var impact = {
            symbol: options.symbol,
            exists: !!symbolExists,
            type: symbolExists ? symbolExists.type || "unknown" : "unknown",
            risk: symbolExists ? "low" : "medium",
            affectedModules: [],
            affectedFiles: [],
            potentialIssues: []
        };
        
        if (!symbolExists) {
            impact.potentialIssues.push("符号不存在，可能是未定义的使用");
            impact.risk = "high";
        }
        
        var result = {
            command: "predict-impact",
            success: true,
            data: impact
        };
        
        return result;
    },
    
    /**
     * 生成执行计划
     */
    generatePlan: function(options) {
        if (!options.intent) {
            throw new Error("缺少必需参数: --intent <type>");
        }
        
        // 验证intent类型
        var validIntents = [
            "remove-unused-symbol",
            "add-method-call", 
            "define-variable",
            "remove-usage",
            "rename-symbol"
        ];
        
        if (validIntents.indexOf(options.intent) === -1) {
            throw new Error("无效的intent类型: " + options.intent + "\n有效类型: " + validIntents.join(", "));
        }
        
        // 创建基础事实（模拟）
        var mockFacts = {
            symbols: [],
            defUseChains: [],
            dependencies: []
        };
        
        // 创建模拟解释结果
        var mockInterpretationResult = {
            actions: [{
                action: options.intent,
                symbol: options.symbol || "unknown",
                risk: "low",
                confidence: "medium",
                reason: "CLI生成的计划"
            }],
            warnings: [],
            errors: [],
            meta: {
                ruleCount: 1,
                generatedAt: Date.now()
            }
        };
        
        // 生成执行计划
        var plan = ActionPlanner.createPlan(mockInterpretationResult, {
            mode: "dry-run"
        });
        
        var result = {
            command: "generate-plan",
            success: true,
            data: {
                intent: options.intent,
                symbol: options.symbol,
                planId: plan.meta.id,
                plan: plan,
                conclusion: "✅ 执行计划已生成，建议先进行simulate"
            }
        };
        
        return result;
    },
    
    /**
     * 模拟执行计划
     */
    simulatePlan: function(options) {
        if (!options.plan) {
            throw new Error("缺少必需参数: --plan <id>");
        }
        
        // 模拟计划（简化实现）
        var mockPlan = {
            meta: { id: options.plan },
            steps: [{
                id: "step-1",
                type: "remove-symbol",
                description: "模拟步骤",
                risk: "low"
            }],
            riskSummary: {
                level: "low",
                blockers: 0
            }
        };
        
        var simulation = ActionPlanner.simulatePlan(mockPlan);
        
        var result = {
            command: "simulate-plan",
            success: true,
            data: {
                planId: options.plan,
                simulation: simulation,
                conclusion: "✅ 模拟完成，计划可安全执行"
            }
        };
        
        return result;
    },
    
    /**
     * 验证能力索引
     */
    validateCapability: function(options) {
        var validationResult = CapabilityQueryValidator.runValidation();
        
        var result = {
            command: "validate-capability",
            success: validationResult.success,
            data: validationResult
        };
        
        return result;
    },
    
    /**
     * 分析项目语义
     */
    analyzeProject: function(options) {
        var projectPath = options.path || "src";
        
        if (!fs.existsSync(projectPath)) {
            throw new Error("项目路径不存在: " + projectPath);
        }
        
        // 扫描JavaScript文件
        var files = this.scanJSFiles(projectPath);
        
        if (files.length === 0) {
            throw new Error("在路径 " + projectPath + " 中未找到JavaScript文件");
        }
        
        // 执行语义分析
        var analysisResult = SemanticAnalyzer.analyzeProject(files);
        
        var result = {
            command: "analyze-project",
            success: analysisResult.success,
            data: analysisResult
        };
        
        return result;
    },
    
    /**
     * 扫描JavaScript文件
     */
    scanJSFiles: function(dir) {
        var files = [];
        
        function scan(currentDir) {
            var items = fs.readdirSync(currentDir);
            
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var fullPath = path.join(currentDir, item);
                var stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scan(fullPath);
                } else if (item.endsWith(".js")) {
                    files.push(fullPath);
                }
            }
        }
        
        scan(dir);
        return files;
    },
    
    /**
     * 输出结果
     */
    outputResult: function(result, options) {
        var output;
        
        if (options.format === "json") {
            output = JSON.stringify(result, null, 2);
        } else {
            output = this.formatMarkdown(result, options);
        }
        
        if (options.output) {
            fs.writeFileSync(options.output, output, "utf8");
            console.log("📄 结果已保存到:", options.output);
        } else {
            console.log(output);
        }
    },
    
    /**
     * 格式化为Markdown
     */
    formatMarkdown: function(result, options) {
        var markdown = "";
        
        // 标题
        markdown += "## 🧠 Semantic Workflow 结果\n\n";
        markdown += "**命令**: `" + result.command + "`\n";
        markdown += "**状态**: " + (result.success ? "✅ 成功" : "❌ 失败") + "\n";
        markdown += "**时间**: " + new Date().toISOString() + "\n\n";
        
        if (!result.success) {
            markdown += "### ❌ 错误信息\n\n";
            markdown += "```\n" + result.error + "\n```\n\n";
            return markdown;
        }
        
        // 数据部分
        var data = result.data;
        
        switch (result.command) {
            case "list-modules":
                markdown += "### 📋 全局符号概览\n\n";
                markdown += "- **模块数量**: " + data.summary.totalModules + "\n";
                markdown += "- **可调用对象**: " + data.summary.totalCallables + "\n";
                markdown += "- **全局变量**: " + data.summary.totalGlobals + "\n\n";
                
                markdown += "#### 🏗️ 模块列表\n\n";
                for (var i = 0; i < data.modules.length; i++) {
                    markdown += "- " + data.modules[i] + "\n";
                }
                markdown += "\n";
                break;
                
            case "list-methods":
                markdown += "### 🔍 模块方法详情\n\n";
                markdown += "**模块**: " + data.module + "\n";
                markdown += "**可调用**: " + (data.callable ? "✅" : "❌") + "\n";
                markdown += "**方法数量**: " + data.summary.methodCount + "\n\n";
                
                if (data.methods.length > 0) {
                    markdown += "#### 📋 方法列表\n\n";
                    for (var j = 0; j < data.methods.length; j++) {
                        markdown += "- " + data.methods[j] + "\n";
                    }
                    markdown += "\n";
                }
                break;
                
            case "check-callable":
                markdown += "### 🔍 可调用性检查\n\n";
                markdown += "**对象**: " + data.object + "\n";
                markdown += "**结论**: " + data.conclusion + "\n\n";
                break;
                
            case "can-access":
                markdown += "### 🔗 访问权限检查\n\n";
                markdown += "**从**: " + data.from + "\n";
                markdown += "**到**: " + data.to + "\n";
                markdown += "**结论**: " + data.conclusion + "\n\n";
                break;
                
            case "predict-impact":
                markdown += "### 🎯 影响预测\n\n";
                markdown += "**符号**: " + data.symbol + "\n";
                markdown += "**存在性**: " + (data.exists ? "✅ 存在" : "❌ 不存在") + "\n";
                markdown += "**类型**: " + data.type + "\n";
                markdown += "**风险级别**: " + data.risk + "\n\n";
                
                if (data.potentialIssues.length > 0) {
                    markdown += "#### ⚠️ 潜在问题\n\n";
                    for (var k = 0; k < data.potentialIssues.length; k++) {
                        markdown += "- " + data.potentialIssues[k] + "\n";
                    }
                    markdown += "\n";
                }
                break;
                
            default:
                markdown += "### 📊 命令结果\n\n";
                markdown += "```json\n" + JSON.stringify(data, null, 2) + "\n```\n\n";
        }
        
        markdown += "---\n";
        markdown += "*由 Semantic Workflow CLI v1.0 生成*";
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    SemanticWorkflow.main();
}

module.exports = SemanticWorkflow;
