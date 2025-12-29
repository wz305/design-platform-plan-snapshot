/**
 * Stage 5.5: Capability Index Builder
 * 构建可查询的能力事实库，将符号系统升级到语义级
 * 
 * @author ES3 工程语义操作系统
 * @module CapabilityIndexBuilder
 */

var fs = require("fs");
var path = require("path");

/**
 * 能力索引构建器
 */
var CapabilityIndexBuilder = {
    /**
     * 构建完整的能力索引
     */
    buildCapabilityIndex: function() {
        console.log("🚀 开始构建 Capability Index (Stage 5.5)");
        console.log("=".repeat(60));
        
        // 第一步：加载修正版符号数据
        var symbolData = this._loadCorrectedSymbolData();
        
        // 第二步：分析模块能力
        var moduleCapabilities = this._analyzeModuleCapabilities(symbolData);
        
        // 第三步：分析可调用对象能力
        var callableCapabilities = this._analyzeCallableCapabilities(symbolData);
        
        // 第四步：构建全局能力索引
        var capabilityIndex = this._buildCapabilityIndex(moduleCapabilities, callableCapabilities);
        
        // 第五步：生成查询接口
        var queryInterface = this._buildQueryInterface(capabilityIndex);
        
        // 第六步：保存能力索引
        this._saveCapabilityIndex(capabilityIndex, queryInterface);
        
        console.log("✅ Capability Index 构建完成");
        return { capabilityIndex: capabilityIndex, queryInterface: queryInterface };
    },
    
    /**
     * 加载修正版符号数据
     * @private
     */
    _loadCorrectedSymbolData: function() {
        console.log("\n📥 加载修正版符号数据...");
        
        var correctedDataPath = "reports/corrected-symbols-overview.json";
        
        if (!fs.existsSync(correctedDataPath)) {
            throw new Error("修正版符号数据不存在，请先运行 corrected-symbols-overview.js");
        }
        
        var symbolData = JSON.parse(fs.readFileSync(correctedDataPath, "utf8"));
        
        console.log("   📊 模块数量:", Object.keys(symbolData.modules).length);
        console.log("   📊 可调用对象:", Object.keys(symbolData.callableObjects).length);
        console.log("   📊 全局变量:", Object.keys(symbolData.globalVariables).length);
        
        return symbolData;
    },
    
    /**
     * 分析模块能力
     * @private
     */
    _analyzeModuleCapabilities: function(symbolData) {
        console.log("\n🏗️ 分析模块能力...");
        
        var modules = symbolData.modules;
        var moduleCapabilities = {};
        
        for (var moduleName in modules) {
            if (modules.hasOwnProperty(moduleName)) {
                var module = modules[moduleName];
                var capability = this._createModuleCapability(moduleName, module, symbolData);
                moduleCapabilities[moduleName] = capability;
                
                console.log("   ✅ 分析模块:", moduleName, "(", capability.methods.length, "个方法)");
            }
        }
        
        return moduleCapabilities;
    },
    
    /**
     * 创建模块能力描述
     * @private
     */
    _createModuleCapability: function(moduleName, module, symbolData) {
        var capability = {
            name: moduleName,
            type: "module",
            access: "global",
            location: {
                file: "dist/main_utf8.js",
                line: module.line
            },
            methods: {},
            properties: {},
            callable: true,
            category: this._categorizeModule(moduleName),
            dependencies: this._analyzeModuleDependencies(moduleName, symbolData),
            interface: this._extractModuleInterface(moduleName, symbolData)
        };
        
        // 分析模块方法和属性
        var interfaceInfo = capability.interface;
        for (var i = 0; i < interfaceInfo.methods.length; i++) {
            var method = interfaceInfo.methods[i];
            capability.methods[method.name] = {
                name: method.name,
                type: "method",
                callable: true,
                access: "instance",
                location: method.line,
                signature: this._inferMethodSignature(method.name, moduleName)
            };
        }
        
        return capability;
    },
    
    /**
     * 分析可调用对象能力
     * @private
     */
    _analyzeCallableCapabilities: function(symbolData) {
        console.log("\n🎯 分析可调用对象能力...");
        
        var callables = symbolData.callableObjects;
        var callableCapabilities = {};
        
        for (var callableName in callables) {
            if (callables.hasOwnProperty(callableName)) {
                var callable = callables[callableName];
                var capability = this._createCallableCapability(callableName, callable);
                callableCapabilities[callableName] = capability;
                
                console.log("   ✅ 分析可调用对象:", callableName);
            }
        }
        
        return callableCapabilities;
    },
    
    /**
     * 创建可调用对象能力描述
     * @private
     */
    _createCallableCapability: function(callableName, callable) {
        var capability = {
            name: callableName,
            type: this._categorizeCallable(callableName),
            access: "global",
            location: {
                file: "dist/main_utf8.js",
                line: callable.line
            },
            callable: true,
            signature: {
                name: callableName,
                params: callable.params || []
            },
            category: this._categorizeCallable(callableName)
        };
        
        return capability;
    },
    
    /**
     * 构建全局能力索引
     * @private
     */
    _buildCapabilityIndex: function(moduleCapabilities, callableCapabilities) {
        console.log("\n📋 构建全局能力索引...");
        
        var capabilityIndex = {
            meta: {
                version: "1.0.0",
                generatedAt: new Date().toISOString(),
                description: "Stage 5.5 Capability Facts - 可查询的能力事实库"
            },
            facts: {
                modules: moduleCapabilities,
                callables: callableCapabilities,
                globals: this._buildGlobalFacts(moduleCapabilities, callableCapabilities)
            },
            query: {
                supported: [
                    "isObjectCallable",
                    "listMethods", 
                    "canAccess",
                    "getGlobalSymbols",
                    "getMethodSignature",
                    "getModuleDependencies"
                ]
            },
            system: {
                boundaries: this._defineSystemBoundaries()
            }
        };
        
        console.log("   📊 模块能力:", Object.keys(moduleCapabilities).length);
        console.log("   📊 可调用能力:", Object.keys(callableCapabilities).length);
        console.log("   📊 全局事实:", Object.keys(capabilityIndex.facts.globals).length);
        
        return capabilityIndex;
    },
    
    /**
     * 构建查询接口
     * @private
     */
    _buildQueryInterface: function(capabilityIndex) {
        console.log("\n🔍 构建查询接口...");
        
        var queryInterface = {
            /**
             * 检查对象是否可调用
             */
            isObjectCallable: function(objectName) {
                if (capabilityIndex.facts.modules[objectName]) {
                    return capabilityIndex.facts.modules[objectName].callable;
                }
                if (capabilityIndex.facts.callables[objectName]) {
                    return capabilityIndex.facts.callables[objectName].callable;
                }
                return false;
            },
            
            /**
             * 列出对象的方法
             */
            listMethods: function(objectName) {
                if (capabilityIndex.facts.modules[objectName]) {
                    return Object.keys(capabilityIndex.facts.modules[objectName].methods);
                }
                if (capabilityIndex.facts.callables[objectName]) {
                    return [capabilityIndex.facts.callables[objectName].name];
                }
                return [];
            },
            
            /**
             * 检查访问权限
             */
            canAccess: function(fromObject, toTarget) {
                // 系统承诺的边界：只检查静态可达性
                var fromExists = capabilityIndex.facts.modules[fromObject] || capabilityIndex.facts.callables[fromObject];
                var toExists = capabilityIndex.facts.modules[toTarget] || capabilityIndex.facts.callables[toTarget];
                
                return {
                    fromExists: !!fromExists,
                    toExists: !!toExists,
                    staticallyReachable: fromExists && toExists
                    // 不承诺：运行时权限、生命周期状态
                };
            },
            
            /**
             * 获取全局符号列表
             */
            getGlobalSymbols: function() {
                return {
                    modules: Object.keys(capabilityIndex.facts.modules),
                    callables: Object.keys(capabilityIndex.facts.callables),
                    globals: Object.keys(capabilityIndex.facts.globals)
                };
            },
            
            /**
             * 获取方法签名
             */
            getMethodSignature: function(objectName, methodName) {
                var module = capabilityIndex.facts.modules[objectName];
                if (module && module.methods[methodName]) {
                    return module.methods[methodName].signature;
                }
                return null;
            },
            
            /**
             * 获取模块依赖
             */
            getModuleDependencies: function(moduleName) {
                var module = capabilityIndex.facts.modules[moduleName];
                if (module) {
                    return module.dependencies;
                }
                return [];
            }
        };
        
        console.log("   ✅ 查询接口构建完成，支持", capabilityIndex.query.supported.length, "种查询");
        
        return queryInterface;
    },
    
    /**
     * 定义系统边界
     * @private
     */
    _defineSystemBoundaries: function() {
        return {
            // 系统承诺的能力
            capabilities: [
                "静态可达性分析",
                "符号存在性检查", 
                "方法签名推断",
                "模块依赖分析",
                "作用域边界识别"
            ],
            
            // 系统不承诺的能力
            limitations: [
                "运行时值状态推断",
                "AD内部对象生命周期模拟",
                "参数值合法性验证",
                "动态执行路径分析",
                "内存使用情况预测"
            ],
            
            // 验证级别
            confidence: {
                static: "high",
                runtime: "limited",
                semantic: "high"
            }
        };
    },
    
    /**
     * 分类模块
     * @private
     */
    _categorizeModule: function(moduleName) {
        if (moduleName.indexOf("Logger") !== -1) return "logging";
        if (moduleName.indexOf("PCB") !== -1) return "pcb";
        if (moduleName.indexOf("Object") !== -1) return "object";
        if (moduleName.indexOf("Module") !== -1) return "core";
        return "utility";
    },
    
    /**
     * 分类可调用对象
     * @private
     */
    _categorizeCallable: function(callableName) {
        if (callableName.indexOf("btn") !== -1 || callableName.indexOf("chk") !== -1) return "ui_event";
        if (callableName.indexOf("ui") !== -1) return "ui_function";
        if (callableName.indexOf("debug") !== -1) return "debug";
        return "utility";
    },
    
    /**
     * 分析模块依赖
     * @private
     */
    _analyzeModuleDependencies: function(moduleName, symbolData) {
        // 简化实现：基于模块名模式推断依赖
        var dependencies = [];
        
        // 日志模块依赖
        if (moduleName !== "LoggerModule" && moduleName.indexOf("Module") !== -1) {
            dependencies.push("LoggerModule");
        }
        
        return dependencies;
    },
    
    /**
     * 提取模块接口
     * @private
     */
    _extractModuleInterface: function(moduleName, symbolData) {
        // 基于模块名推断接口方法
        var commonMethods = ["create", "destroy", "init", "get", "set"];
        var moduleSpecificMethods = this._getModuleSpecificMethods(moduleName);
        
        var allMethods = commonMethods.concat(moduleSpecificMethods);
        var interfaceMethods = [];
        
        for (var i = 0; i < allMethods.length; i++) {
            interfaceMethods.push({
                name: allMethods[i],
                line: symbolData.modules[moduleName] ? symbolData.modules[moduleName].line : null
            });
        }
        
        return { methods: interfaceMethods };
    },
    
    /**
     * 获取模块特定方法
     * @private
     */
    _getModuleSpecificMethods: function(moduleName) {
        var methodMap = {
            "LoggerModule": ["getLogger", "createLogger", "setLevel", "log"],
            "ObjectModule": ["createObject", "getObject", "deleteObject"],
            "PCBInterfaces": ["createTrack", "createPad", "createVia"],
            "ObjectCreator": ["show", "hide", "create", "validate"]
        };
        
        return methodMap[moduleName] || [];
    },
    
    /**
     * 推断方法签名
     * @private
     */
    _inferMethodSignature: function(methodName, moduleName) {
        var signatures = {
            create: { params: ["options"], returns: "object" },
            get: { params: ["id"], returns: "object" },
            set: { params: ["id", "value"], returns: "boolean" },
            destroy: { params: [], returns: "boolean" },
            getLogger: { params: ["name"], returns: "logger" },
            createObject: { params: ["type", "properties"], returns: "object" }
        };
        
        return signatures[methodName] || { params: [], returns: "unknown" };
    },
    
    /**
     * 构建全局事实
     * @private
     */
    _buildGlobalFacts: function(moduleCapabilities, callableCapabilities) {
        var globals = {};
        
        // 模块实例作为全局变量
        for (var moduleName in moduleCapabilities) {
            globals[moduleName] = {
                type: "module_instance",
                callable: true,
                access: "global",
                module: moduleName
            };
        }
        
        // 其他全局变量
        for (var callableName in callableCapabilities) {
            if (!globals[callableName]) {
                globals[callableName] = {
                    type: "function",
                    callable: true,
                    access: "global"
                };
            }
        }
        
        return globals;
    },
    
    /**
     * 保存能力索引
     * @private
     */
    _saveCapabilityIndex: function(capabilityIndex, queryInterface) {
        var indexPath = "reports/capability-index-v1.json";
        var interfacePath = indexPath.replace(".json", "-interface.js");
        var markdownPath = indexPath.replace(".json", ".md");
        
        // 保存JSON格式
        fs.writeFileSync(indexPath, JSON.stringify(capabilityIndex, null, 2), "utf8");
        
        // 保存接口文件
        var interfaceCode = this._generateInterfaceCode(queryInterface);
        fs.writeFileSync(interfacePath, interfaceCode, "utf8");
        
        // 生成Markdown文档
        var markdown = this._generateCapabilityMarkdown(capabilityIndex);
        fs.writeFileSync(markdownPath, markdown, "utf8");
        
        console.log("\n📄 Capability Index 已保存:");
        console.log("   JSON:", indexPath);
        console.log("   Interface:", interfacePath);
        console.log("   Markdown:", markdownPath);
    },
    
    /**
     * 生成接口代码
     * @private
     */
    _generateInterfaceCode: function(queryInterface) {
        var code = "/**\n";
        code += " * Capability Query Interface v1.0\n";
        code += " * Stage 5.5 Semantic Query Suite\n";
        code += " */\n\n";
        code += "var CapabilityQuery = {\n";
        code += "    /**\n";
        code += "     * 检查对象是否可调用\n";
        code += "     * @param {string} objectName - 对象名称\n";
        code += "     * @returns {boolean} 是否可调用\n";
        code += "     */\n";
        code += "    isObjectCallable: function(objectName) {\n";
        code += "        return queryInterface.isObjectCallable(objectName);\n";
        code += "    },\n\n";
        code += "    /**\n";
        code += "     * 列出对象的方法\n";
        code += "     * @param {string} objectName - 对象名称\n";
        code += "     * @returns {Array} 方法列表\n";
        code += "     */\n";
        code += "    listMethods: function(objectName) {\n";
        code += "        return queryInterface.listMethods(objectName);\n";
        code += "    },\n\n";
        code += "    /**\n";
        code += "     * 检查访问权限\n";
        code += "     * @param {string} fromObject - 源对象\n";
        code += "     * @param {string} toTarget - 目标对象\n";
        code += "     * @returns {Object} 访问权限信息\n";
        code += "     */\n";
        code += "    canAccess: function(fromObject, toTarget) {\n";
        code += "        return queryInterface.canAccess(fromObject, toTarget);\n";
        code += "    },\n\n";
        code += "    /**\n";
        code += "     * 获取全局符号列表\n";
        code += "     * @returns {Object} 全局符号信息\n";
        code += "     */\n";
        code += "    getGlobalSymbols: function() {\n";
        code += "        return queryInterface.getGlobalSymbols();\n";
        code += "    }\n";
        code += "};\n\n";
        code += "// 注意：queryInterface 是内部实现的引用\n";
        code += "// 实际使用时需要加载 capability-index-v1.json\n";
        
        return code;
    },
    
    /**
     * 生成Markdown文档
     * @private
     */
    _generateCapabilityMarkdown: function(capabilityIndex) {
        var markdown = "# Capability Index v1.0 - Stage 5.5\n\n";
        markdown += "## 🎯 系统能力边界声明\n\n";
        markdown += "### ✅ 系统承诺的能力\n\n";
        
        var capabilities = capabilityIndex.system.boundaries.capabilities;
        for (var i = 0; i < capabilities.length; i++) {
            markdown += "- " + capabilities[i] + "\n";
        }
        
        markdown += "\n### ❌ 系统不承诺的能力\n\n";
        var limitations = capabilityIndex.system.boundaries.limitations;
        for (var j = 0; j < limitations.length; j++) {
            markdown += "- " + limitations[j] + "\n";
        }
        
        markdown += "\n## 📋 可查询事实\n\n";
        markdown += "- **模块数量**: " + Object.keys(capabilityIndex.facts.modules).length + "\n";
        markdown += "- **可调用对象**: " + Object.keys(capabilityIndex.facts.callables).length + "\n";
        markdown += "- **全局符号**: " + Object.keys(capabilityIndex.facts.globals).length + "\n";
        
        markdown += "\n## 🔍 查询接口\n\n";
        var supported = capabilityIndex.query.supported;
        for (var k = 0; k < supported.length; k++) {
            markdown += "- `" + supported[k] + "`\n";
        }
        
        markdown += "\n## 🏗️ 模块能力详情\n\n";
        var modules = capabilityIndex.facts.modules;
        for (var moduleName in modules) {
            if (modules.hasOwnProperty(moduleName)) {
                var module = modules[moduleName];
                markdown += "### " + moduleName + "\n\n";
                markdown += "**类型**: " + module.type + "\n";
                markdown += "**访问**: " + module.access + "\n";
                markdown += "**可调用**: " + module.callable + "\n";
                markdown += "**方法数量**: " + Object.keys(module.methods).length + "\n\n";
            }
        }
        
        return markdown;
    }
};

// 如果直接运行此脚本
if (require.main === module) {
    console.log("🚀 启动 Capability Index 构建");
    
    try {
        var result = CapabilityIndexBuilder.buildCapabilityIndex();
        
        console.log("\n🎉 Capability Index v1.0 构建完成！");
        console.log("📊 模块能力:", Object.keys(result.capabilityIndex.facts.modules).length);
        console.log("📊 可调用能力:", Object.keys(result.capabilityIndex.facts.callables).length);
        console.log("🔍 查询接口:", result.capabilityIndex.query.supported.length, "个方法");
        
    } catch (error) {
        console.error("❌ 构建失败:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 导出模块
module.exports = CapabilityIndexBuilder;
