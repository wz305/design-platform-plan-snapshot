/**
 * 构建文件语义总览工具
 * 专门用于分析构建后文件的可调用对象和变量
 * 
 * @author ES3 工程语义操作系统
 * @module BuildSymbolsOverview
 */

var fs = require("fs");
var path = require("path");

// 导入语义系统各个阶段
var ESLintRunner = require("./eslint/eslint-runner");
var ASTParser = require("./ast/parser");

/**
 * 构建文件符号总览工具
 */
var BuildSymbolsOverview = {
    /**
     * 执行完整的构建文件符号总览
     * @param {Object} options - 配置选项
     */
    runOverview: function(options) {
        options = options || {};
        
        console.log("🚀 开始构建文件语义总览分析");
        console.log("=".repeat(60));
        
        // 第一步：读取构建配置
        var mergeConfig = this._loadMergeOrder();
        console.log("📋 构建配置加载完成，共", mergeConfig.mergeOrder.length, "个文件");
        
        // 第二步：按顺序分析所有源文件
        var sourceAnalysis = this._analyzeSourceFiles(mergeConfig.mergeOrder);
        
        // 第三步：分析构建后的合并文件
        var builtAnalysis = this._analyzeBuiltFiles();
        
        // 第四步：生成符号总览报告
        var overviewReport = this._generateSymbolsOverview(sourceAnalysis, builtAnalysis);
        
        // 第五步：保存报告
        this._saveOverviewReport(overviewReport, options.outputPath || "analyzer/reports/build-symbols-overview.json");
        
        console.log("✅ 构建文件语义总览完成");
        console.log("📊 报告已保存");
        
        return overviewReport;
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
     * 分析所有源文件
     * @private
     */
    _analyzeSourceFiles: function(filePaths) {
        var results = {
            summary: {
                totalFiles: filePaths.length,
                processedFiles: 0,
                failedFiles: 0,
                totalModules: 0,
                totalFunctions: 0,
                totalGlobalVariables: 0,
                totalDFMFunctions: 0
            },
            files: [],
            globalSymbols: {
                modules: {},
                functions: {},
                variables: {},
                dfmFunctions: {}
            },
            moduleInterfaces: {}
        };
        
        console.log("\n🔍 开始分析源文件...");
        
        for (var i = 0; i < filePaths.length; i++) {
            var filePath = filePaths[i];
            console.log("\n" + (i + 1) + ". 分析源文件:", filePath);
            console.log("-".repeat(50));
            
            try {
                var fileResult = this._analyzeSourceFile(filePath, i + 1);
                results.files.push(fileResult);
                results.summary.processedFiles++;
                
                // 收集全局符号
                this._collectGlobalSymbols(fileResult, results.globalSymbols);
                
                // 收集模块接口
                if (fileResult.moduleInterface) {
                    results.moduleInterfaces[fileResult.moduleName] = fileResult.moduleInterface;
                    results.summary.totalModules++;
                }
                
                results.summary.totalFunctions += fileResult.functions.length;
                results.summary.totalGlobalVariables += fileResult.globalVariables.length;
                results.summary.totalDFMFunctions += fileResult.dfmFunctions.length;
                
                console.log("✅ 文件分析完成:", fileResult.summary.status);
                
            } catch (error) {
                console.log("❌ 文件分析失败:", error.message);
                
                results.files.push({
                    filePath: filePath,
                    index: i + 1,
                    summary: { status: "failed", error: error.message }
                });
                
                results.summary.failedFiles++;
            }
        }
        
        console.log("\n📊 源文件分析汇总:");
        console.log("   成功:", results.summary.processedFiles);
        console.log("   失败:", results.summary.failedFiles);
        console.log("   模块:", results.summary.totalModules);
        console.log("   函数:", results.summary.totalFunctions);
        console.log("   全局变量:", results.summary.totalGlobalVariables);
        console.log("   DFM函数:", results.summary.totalDFMFunctions);
        
        return results;
    },
    
    /**
     * 分析单个源文件
     * @private
     */
    _analyzeSourceFile: function(filePath, fileIndex) {
        var startTime = Date.now();
        
        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            throw new Error("文件不存在: " + filePath);
        }
        
        var sourceCode = fs.readFileSync(filePath, "utf8");
        var fileName = path.basename(filePath);
        var moduleName = this._extractModuleName(filePath, sourceCode);
        
        console.log("   📄 文件大小:", sourceCode.length, "字符");
        console.log("   📄 文件名:", fileName);
        
        var result = {
            filePath: filePath,
            index: fileIndex,
            fileName: fileName,
            moduleName: moduleName,
            summary: {
                status: "success",
                processingTime: 0
            },
            functions: [],
            globalVariables: [],
            dfmFunctions: [],
            moduleInterface: null,
            exports: [],
            dependencies: []
        };
        
        // Stage 1: ESLint 语言门禁检查
        console.log("   🚪 Stage 1: ESLint语言门禁...");
        try {
            var eslintResult = ESLintRunner.validateFile(filePath);
            if (!eslintResult.success) {
                result.summary.status = "warning";
                console.log("      ⚠️  ESLint警告 (错误:", eslintResult.errorCount, ", 警告:", eslintResult.warningCount, ")");
            } else {
                console.log("      ✅ 通过");
            }
        } catch (error) {
            console.log("      ❌ 失败:", error.message);
            result.summary.status = "failed";
            throw error;
        }
        
        // Stage 2: AST解析和符号提取
        console.log("   🌳 Stage 2: AST解析和符号提取...");
        try {
            var parseResult = ASTParser.parseFile(filePath);
            if (!parseResult.success) {
                throw new Error("AST解析失败: " + parseResult.error);
            }
            
            // 提取各种符号
            result.functions = this._extractFunctions(parseResult.ast, filePath);
            result.globalVariables = this._extractGlobalVariables(parseResult.ast, filePath);
            result.dfmFunctions = this._extractDFMFunctions(parseResult.ast, filePath);
            result.exports = this._extractExports(parseResult.ast, filePath);
            result.dependencies = this._extractDependencies(parseResult.ast, filePath);
            
            // 如果是模块文件，提取模块接口
            if (moduleName) {
                result.moduleInterface = this._extractModuleInterface(parseResult.ast, moduleName);
            }
            
            console.log("      ✅ 成功 (函数:", result.functions.length, 
                       ", 变量:", result.globalVariables.length, 
                       ", DFM:", result.dfmFunctions.length, ")");
            
        } catch (error) {
            console.log("      ❌ 失败:", error.message);
            result.summary.status = "failed";
            throw error;
        }
        
        result.summary.processingTime = Date.now() - startTime;
        
        console.log("   ⏱️  处理耗时:", result.summary.processingTime + "ms");
        
        return result;
    },
    
    /**
     * 分析构建后的合并文件
     * @private
     */
    _analyzeBuiltFiles: function() {
        var builtFiles = ["dist/main_utf8.js", "dist/main.js"];
        var results = {
            summary: {
                totalFiles: builtFiles.length,
                analyzedFiles: 0,
                totalGlobalSymbols: 0,
                totalCallableObjects: 0
            },
            files: {},
            globalSymbols: {
                callable: {},
                variables: {},
                modules: {}
            }
        };
        
        console.log("\n🏗️  开始分析构建后的文件...");
        
        for (var i = 0; i < builtFiles.length; i++) {
            var filePath = builtFiles[i];
            console.log("\n" + (i + 1) + ". 分析构建文件:", filePath);
            console.log("-".repeat(50));
            
            if (!fs.existsSync(filePath)) {
                console.log("   ⚠️  文件不存在，跳过:", filePath);
                continue;
            }
            
            try {
                var fileResult = this._analyzeBuiltFile(filePath);
                results.files[filePath] = fileResult;
                results.summary.analyzedFiles++;
                
                // 合并全局符号
                this._mergeGlobalSymbols(fileResult.globalSymbols, results.globalSymbols);
                
                console.log("✅ 构建文件分析完成");
                
            } catch (error) {
                console.log("❌ 构建文件分析失败:", error.message);
            }
        }
        
        console.log("\n📊 构建文件分析汇总:");
        console.log("   分析文件:", results.summary.analyzedFiles);
        console.log("   全局符号:", results.summary.totalGlobalSymbols);
        console.log("   可调用对象:", results.summary.totalCallableObjects);
        
        return results;
    },
    
    /**
     * 分析单个构建文件
     * @private
     */
    _analyzeBuiltFile: function(filePath) {
        var sourceCode = fs.readFileSync(filePath, "utf8");
        var fileName = path.basename(filePath);
        
        console.log("   📄 文件大小:", sourceCode.length, "字符");
        
        var result = {
            filePath: filePath,
            fileName: fileName,
            fileSize: sourceCode.length,
            globalSymbols: {
                callable: {},
                variables: {},
                modules: {}
            },
            summary: {
                status: "success"
            }
        };
        
        // 解析AST - 先创建临时文件然后解析
        try {
            // 创建临时文件
            var tempDir = path.join(path.dirname(filePath), "temp");
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            var tempFilePath = path.join(tempDir, path.basename(filePath) + ".temp.js");
            fs.writeFileSync(tempFilePath, sourceCode, "utf8");
            
            var parseResult = ASTParser.parseFile(tempFilePath);
            if (!parseResult.success) {
                throw new Error("AST解析失败: " + parseResult.error);
            }
            
            // 清理临时文件
            try {
                fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
                // 忽略清理错误
            }
            
            // 提取全局符号
            result.globalSymbols.callable = this._extractGlobalCallableObjects(parseResult.ast);
            result.globalSymbols.variables = this._extractGlobalVariables(parseResult.ast, filePath);
            result.globalSymbols.modules = this._extractGlobalModules(parseResult.ast);
            
            console.log("   📊 可调用对象:", Object.keys(result.globalSymbols.callable).length);
            console.log("   📊 全局变量:", Object.keys(result.globalSymbols.variables).length);
            console.log("   📊 全局模块:", Object.keys(result.globalSymbols.modules).length);
            
        } catch (error) {
            console.log("   ❌ 解析失败:", error.message);
            result.summary.status = "failed";
            throw error;
        }
        
        return result;
    },
    
    /**
     * 提取模块名
     * @private
     */
    _extractModuleName: function(filePath, sourceCode) {
        // 从文件路径推断模块名
        if (filePath.indexOf("modules/") !== -1) {
            var parts = filePath.split("/");
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] === "modules" && i + 1 < parts.length) {
                    return parts[i + 1];
                }
            }
        }
        
        // 从源代码中查找模块定义
        var moduleMatch = sourceCode.match(/var\s+(\w+)\s*=\s*\(function\(\)\s*\{/);
        if (moduleMatch) {
            return moduleMatch[1];
        }
        
        return null;
    },
    
    /**
     * 提取函数
     * @private
     */
    _extractFunctions: function(ast, filePath) {
        var functions = [];
        
        function traverse(node, parentName) {
            if (!node) return;
            
            if (node.type === "FunctionDeclaration") {
                functions.push({
                    name: node.id ? node.id.name : "anonymous",
                    type: "function",
                    params: node.params ? node.params.map(function(p) { return p.name; }) : [],
                    line: node.loc ? node.loc.start.line : null,
                    filePath: filePath
                });
            }
            
            if (node.type === "FunctionExpression") {
                functions.push({
                    name: "function_expression_" + functions.length,
                    type: "function_expression",
                    params: node.params ? node.params.map(function(p) { return p.name; }) : [],
                    line: node.loc ? node.loc.start.line : null,
                    filePath: filePath
                });
            }
            
            // 递归遍历子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i], parentName);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child, parentName);
                    }
                }
            }
        }
        
        traverse(ast, null);
        return functions;
    },
    
    /**
     * 提取全局变量
     * @private
     */
    _extractGlobalVariables: function(ast, filePath) {
        var variables = [];
        
        function traverse(node) {
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
                            filePath: filePath
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
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return variables;
    },
    
    /**
     * 提取DFM函数
     * @private
     */
    _extractDFMFunctions: function(ast, filePath) {
        var dfmFunctions = [];
        
        function traverse(node) {
            if (!node) return;
            
            if (node.type === "FunctionDeclaration" && node.id) {
                var funcName = node.id.name;
                // DFM函数通常以特定模式命名
                if (funcName.match(/^(Button|Form|Label|Edit|Memo|Panel|GroupBox|CheckBox|RadioButton|ComboBox|ListBox|StringGrid|TreeView|ListView|ProgressBar|Timer|Image|Shape|Bevel|ScrollBar|MainMenu|PopupMenu|ToolBar|StatusBar|PageControl|TabControl|NoteBook|TabControl|Frame|ScrollBox|ControlBar|Panel|GroupBox|RadioGroup|CheckListBox|DateTimePicker|MonthCalendar|UpDown|HotKey|ActionList|ImageList|Timer|DataSource|ADOConnection|ADOTable|ADOQuery|ADOStoredProc|ClientDataSet|DataSetProvider|XMLBroker|XMLTransformProvider|XMLTransformClient|SocketConnection|WebConnection|DCOMConnection|CorbaConnection|RemoteDataModule|WebModule|SOAPServer|SOAPServerDataModule|HTTPServer|HTTPServerDataModule|HTTPS|HTTPSDataModule)/)) {
                    dfmFunctions.push({
                        name: funcName,
                        type: "dfm_function",
                        params: node.params ? node.params.map(function(p) { return p.name; }) : [],
                        line: node.loc ? node.loc.start.line : null,
                        filePath: filePath
                    });
                }
            }
            
            // 递归遍历子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return dfmFunctions;
    },
    
    /**
     * 提取导出
     * @private
     */
    _extractExports: function(ast, filePath) {
        var exports = [];
        
        function traverse(node) {
            if (!node) return;
            
            // 查找return语句中的对象属性
            if (node.type === "ReturnStatement" && node.argument && node.argument.type === "ObjectExpression") {
                for (var i = 0; i < node.argument.properties.length; i++) {
                    var prop = node.argument.properties[i];
                    if (prop.key && prop.key.name) {
                        exports.push({
                            name: prop.key.name,
                            type: "export",
                            line: node.loc ? node.loc.start.line : null,
                            filePath: filePath
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
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return exports;
    },
    
    /**
     * 提取依赖
     * @private
     */
    _extractDependencies: function(ast, filePath) {
        var dependencies = [];
        
        function traverse(node) {
            if (!node) return;
            
            // 查找变量引用，可能是模块依赖
            if (node.type === "Identifier" && node.name) {
                // 简单的启发式：大写开头的变量可能是模块
                if (node.name.match(/^[A-Z][a-zA-Z0-9]*Module$/)) {
                    dependencies.push({
                        name: node.name,
                        type: "module_dependency",
                        line: node.loc ? node.loc.start.line : null,
                        filePath: filePath
                    });
                }
            }
            
            // 递归遍历子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        
        // 去重
        var uniqueDependencies = [];
        var seen = {};
        for (var i = 0; i < dependencies.length; i++) {
            var dep = dependencies[i];
            if (!seen[dep.name]) {
                seen[dep.name] = true;
                uniqueDependencies.push(dep);
            }
        }
        
        return uniqueDependencies;
    },
    
    /**
     * 提取模块接口
     * @private
     */
    _extractModuleInterface: function(ast, moduleName) {
        var interfaceMethods = [];
        
        function traverse(node) {
            if (!node) return;
            
            // 查找模块的return语句
            if (node.type === "ReturnStatement" && node.argument && node.argument.type === "ObjectExpression") {
                for (var i = 0; i < node.argument.properties.length; i++) {
                    var prop = node.argument.properties[i];
                    if (prop.key && prop.key.name) {
                        interfaceMethods.push({
                            name: prop.key.name,
                            type: "method",
                            line: node.loc ? node.loc.start.line : null
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
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        
        return {
            moduleName: moduleName,
            methods: interfaceMethods,
            methodCount: interfaceMethods.length
        };
    },
    
    /**
     * 收集全局符号
     * @private
     */
    _collectGlobalSymbols: function(fileResult, globalSymbols) {
        // 收集模块
        if (fileResult.moduleName && fileResult.moduleInterface) {
            globalSymbols.modules[fileResult.moduleName] = fileResult.moduleInterface;
        }
        
        // 收集函数
        for (var i = 0; i < fileResult.functions.length; i++) {
            var func = fileResult.functions[i];
            if (!globalSymbols.functions[func.name]) {
                globalSymbols.functions[func.name] = [];
            }
            globalSymbols.functions[func.name].push(func);
        }
        
        // 收集变量
        for (var j = 0; j < fileResult.globalVariables.length; j++) {
            var variable = fileResult.globalVariables[j];
            if (!globalSymbols.variables[variable.name]) {
                globalSymbols.variables[variable.name] = [];
            }
            globalSymbols.variables[variable.name].push(variable);
        }
        
        // 收集DFM函数
        for (var k = 0; k < fileResult.dfmFunctions.length; k++) {
            var dfmFunc = fileResult.dfmFunctions[k];
            if (!globalSymbols.dfmFunctions[dfmFunc.name]) {
                globalSymbols.dfmFunctions[dfmFunc.name] = [];
            }
            globalSymbols.dfmFunctions[dfmFunc.name].push(dfmFunc);
        }
    },
    
    /**
     * 提取全局可调用对象
     * @private
     */
    _extractGlobalCallableObjects: function(ast) {
        var callableObjects = {};
        
        function traverse(node) {
            if (!node) return;
            
            // 查找函数声明
            if (node.type === "FunctionDeclaration" && node.id && node.id.name) {
                callableObjects[node.id.name] = {
                    name: node.id.name,
                    type: "function",
                    params: node.params ? node.params.map(function(p) { return p.name; }) : [],
                    line: node.loc ? node.loc.start.line : null
                };
            }
            
            // 查找变量赋值为函数的情况
            if (node.type === "VariableDeclaration" && node.kind === "var") {
                for (var i = 0; i < node.declarations.length; i++) {
                    var decl = node.declarations[i];
                    if (decl.id && decl.id.name && decl.init && 
                        (decl.init.type === "FunctionExpression" || 
                         decl.init.type === "ArrowFunctionExpression")) {
                        callableObjects[decl.id.name] = {
                            name: decl.id.name,
                            type: "function",
                            params: decl.init.params ? decl.init.params.map(function(p) { return p.name; }) : [],
                            line: node.loc ? node.loc.start.line : null
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
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return callableObjects;
    },
    
    /**
     * 提取全局模块
     * @private
     */
    _extractGlobalModules: function(ast) {
        var modules = {};
        
        function traverse(node) {
            if (!node) return;
            
            // 查找模块定义：var ModuleName = (function(){...})();
            if (node.type === "VariableDeclaration" && node.kind === "var") {
                for (var i = 0; i < node.declarations.length; i++) {
                    var decl = node.declarations[i];
                    if (decl.id && decl.id.name && decl.init && 
                        decl.init.type === "CallExpression" &&
                        decl.init.callee && decl.init.callee.type === "FunctionExpression") {
                        modules[decl.id.name] = {
                            name: decl.id.name,
                            type: "module",
                            line: node.loc ? node.loc.start.line : null
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
                            traverse(child[i]);
                        }
                    } else if (typeof child === "object" && child !== null) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return modules;
    },
    
    /**
     * 合并全局符号
     * @private
     */
    _mergeGlobalSymbols: function(fileSymbols, globalSymbols) {
        for (var type in fileSymbols) {
            if (fileSymbols.hasOwnProperty(type)) {
                for (var name in fileSymbols[type]) {
                    if (fileSymbols[type].hasOwnProperty(name)) {
                        globalSymbols[type][name] = fileSymbols[type][name];
                    }
                }
            }
        }
    },
    
    /**
     * 生成符号总览报告
     * @private
     */
    _generateSymbolsOverview: function(sourceAnalysis, builtAnalysis) {
        var report = {
            meta: {
                generatedAt: new Date().toISOString(),
                version: "1.0.0",
                description: "构建文件语义总览报告"
            },
            summary: {
                sourceFiles: sourceAnalysis.summary,
                builtFiles: builtAnalysis.summary,
                totalModules: 0,
                totalCallableObjects: 0,
                totalVariables: 0,
                totalDFMFunctions: 0
            },
            modules: {},
            callableObjects: {},
            variables: {},
            dfmFunctions: {},
            moduleInterfaces: {},
            usageGuide: {}
        };
        
        // 统计总体数据
        report.summary.totalModules = Object.keys(sourceAnalysis.globalSymbols.modules).length;
        report.summary.totalCallableObjects = Object.keys(builtAnalysis.globalSymbols.callable).length;
        report.summary.totalVariables = Object.keys(builtAnalysis.globalSymbols.variables).length;
        report.summary.totalDFMFunctions = Object.keys(sourceAnalysis.globalSymbols.dfmFunctions).length;
        
        // 模块信息
        report.modules = sourceAnalysis.globalSymbols.modules;
        
        // 可调用对象
        report.callableObjects = builtAnalysis.globalSymbols.callable;
        
        // 全局变量
        report.variables = builtAnalysis.globalSymbols.variables;
        
        // DFM函数
        report.dfmFunctions = sourceAnalysis.globalSymbols.dfmFunctions;
        
        // 模块接口
        report.moduleInterfaces = sourceAnalysis.moduleInterfaces;
        
        // 生成使用指南
        report.usageGuide = this._generateUsageGuide(report);
        
        return report;
    },
    
    /**
     * 生成使用指南
     * @private
     */
    _generateUsageGuide: function(report) {
        var guide = {
            modules: {},
            functions: {},
            variables: {},
            examples: []
        };
        
        // 模块使用指南
        for (var moduleName in report.modules) {
            if (report.modules.hasOwnProperty(moduleName)) {
                var module = report.modules[moduleName];
                var interface = report.moduleInterfaces[moduleName];
                
                guide.modules[moduleName] = {
                    description: module.moduleName + "模块",
                    usage: "直接调用模块方法",
                    example: interface && interface.methods.length > 0 ? 
                        moduleName + "." + interface.methods[0].name + "()" : 
                        moduleName + ".create()",
                    methods: interface ? interface.methods : []
                };
            }
        }
        
        // 函数使用指南
        for (var funcName in report.callableObjects) {
            if (report.callableObjects.hasOwnProperty(funcName)) {
                var func = report.callableObjects[funcName];
                var params = func.params.length > 0 ? "(" + func.params.join(", ") + ")" : "()";
                
                guide.functions[funcName] = {
                    description: func.type + "函数",
                    usage: funcName + params,
                    example: funcName + params
                };
            }
        }
        
        // 变量使用指南
        for (var varName in report.variables) {
            if (report.variables.hasOwnProperty(varName)) {
                guide.variables[varName] = {
                    description: "全局变量",
                    usage: "直接访问",
                    example: varName
                };
            }
        }
        
        // 生成使用示例
        guide.examples = this._generateUsageExamples(report);
        
        return guide;
    },
    
    /**
     * 生成使用示例
     * @private
     */
    _generateUsageExamples: function(report) {
        var examples = [];
        
        // 模块使用示例
        var moduleCount = 0;
        for (var moduleName in report.modules) {
            if (report.modules.hasOwnProperty(moduleName) && moduleCount < 3) {
                var interface = report.moduleInterfaces[moduleName];
                if (interface && interface.methods.length > 0) {
                    examples.push({
                        type: "module_usage",
                        description: "使用" + moduleName + "模块",
                        code: "// 使用 " + moduleName + " 模块\n" +
                               "var result = " + moduleName + "." + interface.methods[0].name + "();\n" +
                               "console.log(result);"
                    });
                    moduleCount++;
                }
            }
        }
        
        // 函数调用示例
        var funcCount = 0;
        for (var funcName in report.callableObjects) {
            if (report.callableObjects.hasOwnProperty(funcName) && funcCount < 3) {
                var func = report.callableObjects[funcName];
                var params = func.params.length > 0 ? "param1, param2" : "";
                examples.push({
                    type: "function_call",
                    description: "调用" + funcName + "函数",
                    code: "// 调用 " + funcName + " 函数\n" +
                           "var result = " + funcName + "(" + params + ");\n" +
                           "console.log(result);"
                });
                funcCount++;
            }
        }
        
        // DFM函数示例
        if (Object.keys(report.dfmFunctions).length > 0) {
            var dfmName = Object.keys(report.dfmFunctions)[0];
            examples.push({
                type: "dfm_function",
                description: "DFM事件处理函数",
                code: "// DFM事件处理函数示例\n" +
                       "function " + dfmName + "(Sender) {\n" +
                       "    // 事件处理逻辑\n" +
                       "    console.log('Event triggered:', Sender);\n" +
                       "}"
            });
        }
        
        return examples;
    },
    
    /**
     * 保存总览报告
     * @private
     */
    _saveOverviewReport: function(report, outputPath) {
        var reportDir = path.dirname(outputPath);
        
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
        
        // 保存JSON报告
        var reportJson = JSON.stringify(report, null, 2);
        fs.writeFileSync(outputPath, reportJson, "utf8");
        
        // 生成Markdown格式报告
        var markdownReport = this._generateMarkdownOverview(report);
        var markdownPath = outputPath.replace(".json", ".md");
        fs.writeFileSync(markdownPath, markdownReport, "utf8");
        
        console.log("📄 JSON报告保存至:", outputPath);
        console.log("📄 Markdown报告保存至:", markdownPath);
        
        // 生成简化的符号清单
        var symbolsList = this._generateSymbolsList(report);
        var listPath = outputPath.replace(".json", "-symbols.txt");
        fs.writeFileSync(listPath, symbolsList, "utf8");
        
        console.log("📄 符号清单保存至:", listPath);
    },
    
    /**
     * 生成Markdown格式总览
     * @private
     */
    _generateMarkdownOverview: function(report) {
        var markdown = "# 构建文件语义总览报告\n\n";
        
        markdown += "## 📊 总体概览\n\n";
        markdown += "- **生成时间**: " + report.meta.generatedAt + "\n";
        markdown += "- **模块数量**: " + report.summary.totalModules + "\n";
        markdown += "- **可调用对象**: " + report.summary.totalCallableObjects + "\n";
        markdown += "- **全局变量**: " + report.summary.totalVariables + "\n";
        markdown += "- **DFM函数**: " + report.summary.totalDFMFunctions + "\n\n";
        
        // 模块接口
        markdown += "## 🏗️ 模块接口\n\n";
        for (var moduleName in report.modules) {
            if (report.modules.hasOwnProperty(moduleName)) {
                var guide = report.usageGuide.modules[moduleName];
                markdown += "### " + moduleName + "\n\n";
                markdown += "**描述**: " + guide.description + "\n\n";
                markdown += "**使用方式**: " + guide.usage + "\n\n";
                markdown += "**示例**:\n```javascript\n" + guide.example + "\n```\n\n";
                
                if (guide.methods.length > 0) {
                    markdown += "**可用方法**:\n";
                    for (var i = 0; i < guide.methods.length; i++) {
                        var method = guide.methods[i];
                        markdown += "- `" + method.name + "` (行 " + method.line + ")\n";
                    }
                    markdown += "\n";
                }
            }
        }
        
        // 可调用对象
        markdown += "## 📞 可调用对象\n\n";
        var funcCount = 0;
        for (var funcName in report.callableObjects) {
            if (report.callableObjects.hasOwnProperty(funcName) && funcCount < 10) {
                var guide = report.usageGuide.functions[funcName];
                markdown += "### " + funcName + "\n\n";
                markdown += "**描述**: " + guide.description + "\n\n";
                markdown += "**使用方式**: " + guide.usage + "\n\n";
                markdown += "**示例**:\n```javascript\n" + guide.example + "\n```\n\n";
                funcCount++;
            }
        }
        if (Object.keys(report.callableObjects).length > 10) {
            markdown += "*... 还有 " + (Object.keys(report.callableObjects).length - 10) + " 个函数*\n\n";
        }
        
        // DFM函数
        if (Object.keys(report.dfmFunctions).length > 0) {
            markdown += "## 🎨 DFM事件处理函数\n\n";
            for (var dfmName in report.dfmFunctions) {
                if (report.dfmFunctions.hasOwnProperty(dfmName)) {
                    markdown += "### " + dfmName + "\n\n";
                    markdown += "**类型**: DFM事件处理函数\n\n";
                    markdown += "**使用方式**: 事件绑定\n\n";
                    markdown += "**参数**: Sender\n\n";
                }
            }
            markdown += "\n";
        }
        
        // 使用示例
        markdown += "## 💡 使用示例\n\n";
        for (var i = 0; i < report.usageGuide.examples.length; i++) {
            var example = report.usageGuide.examples[i];
            markdown += "### " + example.description + "\n\n";
            markdown += "```javascript\n" + example.code + "\n```\n\n";
        }
        
        return markdown;
    },
    
    /**
     * 生成符号清单
     * @private
     */
    _generateSymbolsList: function(report) {
        var list = "";
        
        list += "构建文件符号清单\n";
        list += "==================\n\n";
        
        list += "模块 (" + Object.keys(report.modules).length + "):\n";
        for (var moduleName in report.modules) {
            if (report.modules.hasOwnProperty(moduleName)) {
                list += "  " + moduleName + "\n";
            }
        }
        
        list += "\n可调用对象 (" + Object.keys(report.callableObjects).length + "):\n";
        for (var funcName in report.callableObjects) {
            if (report.callableObjects.hasOwnProperty(funcName)) {
                var func = report.callableObjects[funcName];
                list += "  " + funcName + "(" + func.params.join(", ") + ")\n";
            }
        }
        
        list += "\n全局变量 (" + Object.keys(report.variables).length + "):\n";
        for (var varName in report.variables) {
            if (report.variables.hasOwnProperty(varName)) {
                list += "  " + varName + "\n";
            }
        }
        
        list += "\nDFM函数 (" + Object.keys(report.dfmFunctions).length + "):\n";
        for (var dfmName in report.dfmFunctions) {
            if (report.dfmFunctions.hasOwnProperty(dfmName)) {
                list += "  " + dfmName + "(Sender)\n";
            }
        }
        
        return list;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动构建文件语义总览分析");
    
    try {
        var report = BuildSymbolsOverview.runOverview({
            outputPath: "analyzer/reports/build-symbols-overview.json"
        });
        
        console.log("\n🎉 总览分析完成！");
        console.log("📊 模块数量:", report.summary.totalModules);
        console.log("📊 可调用对象:", report.summary.totalCallableObjects);
        console.log("📊 全局变量:", report.summary.totalVariables);
        console.log("📊 DFM函数:", report.summary.totalDFMFunctions);
        
    } catch (error) {
        console.error("❌ 总览分析失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = BuildSymbolsOverview;
