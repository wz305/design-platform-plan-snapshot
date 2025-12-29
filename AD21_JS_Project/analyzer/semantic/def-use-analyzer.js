/**
 * ES3 工程语义操作系统 - Stage 5A: Def-Use 事实分析器
 * 职责：纯粹记录变量的定义点和使用点，不进行任何判断，只构建事实数据库
 * 
 * 核心原则：
 * - 只记录，不判断
 * - 构建Def-Use图
 * - 支持Use类型细分
 * - 提供置信度标记
 * 
 * @author ES3 工程语义操作系统
 * @module DefUseAnalyzer
 */

var SymbolTypes = require("./symbol-types");
var fs = require("fs");
var path = require("path");

/**
 * 定义-使用分析器模块
 */
var DefUseAnalyzer = (function(){
    
    /**
     * Use类型枚举
     */
    var UseType = {
        READ: "read",           // 读取变量值
        WRITE: "write",          // 写入变量值
        CALL: "call",           // 函数调用
        RETURN: "return",       // 返回语句
        MEMBER_READ: "member-read",    // 成员读取: obj.prop
        MEMBER_WRITE: "member-write", // 成员写入: obj.prop = value
        DELETE: "delete",       // delete操作
        TYPEOF: "typeof",       // typeof操作
        IN: "in",              // in操作
        INSTANCEOF: "instanceof" // instanceof操作
    };
    
    /**
     * 置信度级别
     */
    var Confidence = {
        DEFINITE: "definite",   // 确定：AST明确分析
        POSSIBLE: "possible",   // 可能：动态特性导致不确定性
        HEURISTIC: "heuristic"  // 启发式：基于模式推断
    };
    
    /**
     * PathTag类型 - 标记使用点的上下文
     */
    var PathTag = {
        SEQUENTIAL: "sequential",   // 顺序执行
        CONDITIONAL: "conditional", // 条件分支 (if)
        LOOP: "loop",             // 循环体 (for/while)
        TRY: "try",               // try块
        CATCH: "catch",           // catch块
        FINALLY: "finally"        // finally块
    };
    
    /**
     * 分析单个文件的Def-Use关系
     * @param {Object} ast - AST对象
     * @param {string} filePath - 文件路径
     * @param {Array} allSymbols - 项目级所有符号
     * @returns {Object} Def-Use分析结果
     */
    function analyzeDefUse(ast, filePath, allSymbols) {
        var startTime = Date.now();
        
        var result = {
            success: true,
            filePath: filePath,
            definitions: [],
            uses: [],
            defUseChains: [],
            summary: {
                totalDefinitions: 0,
                totalUses: 0,
                totalChains: 0,
                undefinedUses: 0,
                unusedDefinitions: 0
            },
            errors: []
        };
        
        try {
            console.log("🔍 开始Def-Use分析: " + path.basename(filePath));
            
            // 第一阶段：收集所有定义点
            var definitions = collectDefinitions(ast, filePath);
            result.definitions = definitions;
            result.summary.totalDefinitions = definitions.length;
            
            // 第二阶段：收集所有使用点
            var uses = collectUses(ast, filePath, allSymbols);
            result.uses = uses;
            result.summary.totalUses = uses.length;
            
            // 第三阶段：构建Def-Use链
            var chains = buildDefUseChains(definitions, uses);
            result.defUseChains = chains;
            result.summary.totalChains = chains.length;
            
            // 第四阶段：统计未定义使用和未使用定义
            var stats = calculateStatistics(definitions, uses, chains);
            result.summary.undefinedUses = stats.undefinedUses;
            result.summary.unusedDefinitions = stats.unusedDefinitions;
            result.summary.unusedFacts = stats.unusedFacts;
            
            console.log("  📊 定义点: " + definitions.length);
            console.log("  📊 使用点: " + uses.length);
            console.log("  📊 Def-Use链: " + chains.length);
            console.log("  ⚠️  未定义使用: " + stats.undefinedUses);
            console.log("  ⚠️  未使用定义: " + stats.unusedDefinitions);
            
        } catch (error) {
            result.success = false;
            result.errors.push({
                message: "Def-Use分析失败: " + error.message,
                line: error.line || null,
                column: error.column || null
            });
            console.error("❌ Def-Use分析失败:", error.message);
        }
        
        var duration = Date.now() - startTime;
        console.log("⏱️ Def-Use分析完成，耗时: " + duration + "ms");
        
        return result;
    }
    
    /**
     * 收集所有定义点
     * @param {Object} ast - AST对象
     * @param {string} filePath - 文件路径
     * @returns {Array} 定义点数组
     */
    function collectDefinitions(ast, filePath) {
        var definitions = [];
        var definedSymbols = {}; // 用于避免重复定义
        
        function traverse(node, pathTag, context) {
            if (!node) return;
            
            pathTag = pathTag || PathTag.SEQUENTIAL;
            context = context || {};
            
            switch (node.type) {
                case "VariableDeclaration":
                    // var声明
                    for (var i = 0; i < node.declarations.length; i++) {
                        var decl = node.declarations[i];
                        if (decl.id.type === "Identifier") {
                            var symbolName = decl.id.name;
                            var symbolKey = symbolName + "@" + (node.loc ? node.loc.start.line : 0);
                            
                            // 避免重复定义同一符号
                            if (!definedSymbols[symbolKey]) {
                                definedSymbols[symbolKey] = true;
                                definitions.push(createDefinition(
                                    symbolName,
                                    "VariableDeclaration",
                                    node,
                                    filePath,
                                    Confidence.DEFINITE,
                                    pathTag
                                ));
                            }
                            
                            // 处理初始化表达式中的标识符使用（如 var result = obj.value + 5; 中的 obj）
                            if (decl.init) {
                                traverse(decl.init, pathTag, context);
                            }
                        }
                    }
                    break;
                    
                case "FunctionDeclaration":
                    // 函数声明
                    if (node.id && node.id.type === "Identifier") {
                        definitions.push(createDefinition(
                            node.id.name,
                            "FunctionDeclaration",
                            node,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag
                        ));
                    }
                    // 函数参数也是定义
                    for (var j = 0; j < node.params.length; j++) {
                        var param = node.params[j];
                        if (param.type === "Identifier") {
                            definitions.push(createDefinition(
                                param.name,
                                "FunctionParameter",
                                param,
                                filePath,
                                Confidence.DEFINITE,
                                pathTag
                            ));
                        }
                    }
                    break;
                    
                case "FunctionExpression":
                    // 函数表达式中的参数
                    for (var k = 0; k < node.params.length; k++) {
                        var paramExpr = node.params[k];
                        if (paramExpr.type === "Identifier") {
                            definitions.push(createDefinition(
                                paramExpr.name,
                                "FunctionParameter",
                                paramExpr,
                                filePath,
                                Confidence.DEFINITE,
                                pathTag
                            ));
                        }
                    }
                    break;
                    
                case "ForStatement":
                    // for循环初始化器中的变量定义
                    if (node.init && node.init.type === "VariableDeclaration") {
                        for (var l = 0; l < node.init.declarations.length; l++) {
                            var forDecl = node.init.declarations[l];
                            if (forDecl.id.type === "Identifier") {
                                var symbolName = forDecl.id.name;
                                var symbolKey = symbolName + "@" + (forDecl.loc ? forDecl.loc.start.line : 0);
                                
                                // 避免重复定义同一符号
                                if (!definedSymbols[symbolKey]) {
                                    definedSymbols[symbolKey] = true;
                                    definitions.push(createDefinition(
                                        symbolName,
                                        "ForLoopInitializer",
                                        forDecl,
                                        filePath,
                                        Confidence.DEFINITE,
                                        PathTag.LOOP
                                    ));
                                }
                            }
                        }
                    }
                    break;
                    
                case "CatchClause":
                    // catch子句中的参数
                    if (node.param && node.param.type === "Identifier") {
                        definitions.push(createDefinition(
                            node.param.name,
                            "CatchParameter",
                            node.param,
                            filePath,
                            Confidence.DEFINITE,
                            PathTag.CATCH
                        ));
                    }
                    break;
            }
            
            // 递归遍历子节点
            traverseChildren(node, pathTag, context, traverse);
        }
        
        traverse(ast, null, {});
        return definitions;
    }
    
    /**
     * 收集所有使用点
     * @param {Object} ast - AST对象
     * @param {string} filePath - 文件路径
     * @param {Array} allSymbols - 项目级所有符号
     * @returns {Array} 使用点数组
     */
    function collectUses(ast, filePath, allSymbols) {
        var uses = [];
        var processedNodes = {}; // 避免重复处理同一节点 - ES3兼容：使用对象代替Set
        
        function traverse(node, pathTag, context) {
            if (!node) return;
            
            pathTag = pathTag || PathTag.SEQUENTIAL;
            context = context || {};
            
            switch (node.type) {
                case "Identifier":
                    // 标识符使用（排除定义点和特定上下文）
                    if (!isDefinitionContext(node, context) && !isSpecialContext(node, context)) {
                        var nodeKey = node.type + "@" + (node.loc ? node.loc.start.line + ":" + node.loc.start.column : "0:0");
                        
                        if (!processedNodes[nodeKey]) {
                            processedNodes[nodeKey] = true;
                            var useType = determineUseType(node, context);
                            var confidence = determineUseConfidence(node, allSymbols);
                            
                            uses.push(createUse(
                                node.name,
                                useType,
                                node,
                                filePath,
                                confidence,
                                pathTag,
                                context
                            ));
                        }
                    }
                    break;
                    
                case "CallExpression":
                    // 函数调用 - 专门处理，不依赖Identifier case
                    if (node.callee && node.callee.type === "Identifier") {
                        var callNodeKey = "call@" + (node.callee.loc ? node.callee.loc.start.line + ":" + node.callee.loc.start.column : "0:0");
                        
                        if (!processedNodes[callNodeKey]) {
                            processedNodes[callNodeKey] = true;
                            uses.push(createUse(
                                node.callee.name,
                                UseType.CALL,
                                node.callee,
                                filePath,
                                Confidence.DEFINITE,
                                pathTag,
                                context
                            ));
                        }
                    }
                    break;
                    
                case "MemberExpression":
                    // 成员访问 - 专门处理object部分
                    if (node.object && node.object.type === "Identifier") {
                        var memberNodeKey = "member@" + (node.object.loc ? node.object.loc.start.line + ":" + node.object.loc.start.column : "0:0");
                        
                        if (!processedNodes[memberNodeKey]) {
                            processedNodes[memberNodeKey] = true;
                            var memberUseType = node.computed ? UseType.READ : UseType.MEMBER_READ;
                            uses.push(createUse(
                                node.object.name,
                                memberUseType,
                                node.object,
                                filePath,
                                Confidence.DEFINITE,
                                pathTag,
                                context
                            ));
                        }
                    }
                    // 处理property部分（可能是标识符）- 但要排除成员属性访问
                    if (node.property && node.property.type === "Identifier" && !node.computed) {
                        // 不处理成员属性名，因为它们不是变量使用
                        // 例如：obj.value 中的 value 不是变量，而是属性名
                        // 只有在 computed: true 的情况下才处理（如 obj[key] 中的 key）
                    }
                    break;
                    
                case "AssignmentExpression":
                    // 赋值表达式左侧是写入，右侧是读取
                    if (node.left.type === "Identifier") {
                        uses.push(createUse(
                            node.left.name,
                            UseType.WRITE,
                            node.left,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    // 处理右侧标识符（如 z = y + 5 中的 y）
                    if (node.right && node.right.type === "Identifier") {
                        uses.push(createUse(
                            node.right.name,
                            UseType.READ,
                            node.right,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "UpdateExpression":
                    // ++/-- 操作符
                    if (node.argument.type === "Identifier") {
                        uses.push(createUse(
                            node.argument.name,
                            UseType.WRITE,
                            node.argument,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "UnaryExpression":
                    // typeof, delete等
                    if (node.argument.type === "Identifier") {
                        var unaryUseType = UseType.READ;
                        if (node.operator === "typeof") {
                            unaryUseType = UseType.TYPEOF;
                        } else if (node.operator === "delete") {
                            unaryUseType = UseType.DELETE;
                        }
                        
                        uses.push(createUse(
                            node.argument.name,
                            unaryUseType,
                            node.argument,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "BinaryExpression":
                    // 处理左侧标识符
                    if (node.left.type === "Identifier") {
                        var binaryUseType = UseType.READ;
                        if (node.operator === "in") {
                            binaryUseType = UseType.IN;
                        } else if (node.operator === "instanceof") {
                            binaryUseType = UseType.INSTANCEOF;
                        }
                        uses.push(createUse(
                            node.left.name,
                            binaryUseType,
                            node.left,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    // 处理右侧标识符（如 x + y 中的 y）
                    if (node.right.type === "Identifier") {
                        uses.push(createUse(
                            node.right.name,
                            UseType.READ,
                            node.right,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "ReturnStatement":
                    // return语句
                    if (node.argument && node.argument.type === "Identifier") {
                        uses.push(createUse(
                            node.argument.name,
                            UseType.RETURN,
                            node.argument,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "ThrowStatement":
                    // throw语句中的标识符
                    if (node.argument && node.argument.type === "Identifier") {
                        uses.push(createUse(
                            node.argument.name,
                            UseType.READ,
                            node.argument,
                            filePath,
                            Confidence.DEFINITE,
                            pathTag,
                            context
                        ));
                    }
                    break;
                    
                case "FunctionExpression":
                    // 函数表达式本身可能被使用（如赋值给变量）
                    // 需要检查父上下文来确定是否为使用点
                    if (!context.isParameter && !context.isDeclaration) {
                        // 函数表达式中的函数名（如果有）
                        if (node.id && node.id.type === "Identifier") {
                            var funcNodeKey = "function@" + (node.id.loc ? node.id.loc.start.line + ":" + node.id.loc.start.column : "0:0");
                            
                            if (!processedNodes[funcNodeKey]) {
                                processedNodes[funcNodeKey] = true;
                                uses.push(createUse(
                                    node.id.name,
                                    UseType.READ,
                                    node.id,
                                    filePath,
                                    Confidence.DEFINITE,
                                    pathTag,
                                    context
                                ));
                            }
                        }
                    }
                    break;
                    
                case "Property":
                    // 对象属性中的标识符（如 {key: value} 中的 value）
                    if (node.value && node.value.type === "Identifier") {
                        var propValueNodeKey = "property-value@" + (node.value.loc ? node.value.loc.start.line + ":" + node.value.loc.start.column : "0:0");
                        
                        if (!processedNodes[propValueNodeKey]) {
                            processedNodes[propValueNodeKey] = true;
                            uses.push(createUse(
                                node.value.name,
                                UseType.READ,
                                node.value,
                                filePath,
                                Confidence.DEFINITE,
                                pathTag,
                                context
                            ));
                        }
                    }
                    break;
            }
            
            // 递归遍历子节点
            traverseChildren(node, pathTag, context, traverse);
        }
        
        traverse(ast, null, {});
        return uses;
    }
    
    /**
     * 构建Def-Use链
     * @param {Array} definitions - 定义点数组
     * @param {Array} uses - 使用点数组
     * @returns {Array} Def-Use链数组
     */
    function buildDefUseChains(definitions, uses) {
        var chains = [];
        
        for (var i = 0; i < definitions.length; i++) {
            var def = definitions[i];
            var relatedUses = [];
            
            // 查找所有相关的使用点
            for (var j = 0; j < uses.length; j++) {
                var use = uses[j];
                if (use.symbolName === def.symbolName) {
                    relatedUses.push(use);
                }
            }
            
            if (relatedUses.length > 0) {
                chains.push({
                    definition: def,
                    uses: relatedUses,
                    symbolName: def.symbolName,
                    useCount: relatedUses.length,
                    confidence: calculateChainConfidence(def, relatedUses)
                });
            }
        }
        
        return chains;
    }
    
    /**
     * 创建定义点对象
     * @param {string} symbolName - 符号名称
     * @param {string} definitionType - 定义类型
     * @param {Object} node - AST节点
     * @param {string} filePath - 文件路径
     * @param {string} confidence - 置信度
     * @param {string} pathTag - 路径标签
     * @returns {Object} 定义点对象
     */
    function createDefinition(symbolName, definitionType, node, filePath, confidence, pathTag) {
        return {
            symbolName: symbolName,
            definitionType: definitionType,
            node: node,
            filePath: filePath,
            line: node.loc ? node.loc.start.line : null,
            column: node.loc ? node.loc.start.column : null,
            confidence: confidence,
            pathTag: pathTag,
            timestamp: Date.now()
        };
    }
    
    /**
     * 创建使用点对象
     * @param {string} symbolName - 符号名称
     * @param {string} useType - 使用类型
     * @param {Object} node - AST节点
     * @param {string} filePath - 文件路径
     * @param {string} confidence - 置信度
     * @param {string} pathTag - 路径标签
     * @param {Object} context - 上下文信息
     * @returns {Object} 使用点对象
     */
    function createUse(symbolName, useType, node, filePath, confidence, pathTag, context) {
        return {
            symbolName: symbolName,
            useType: useType,
            node: node,
            filePath: filePath,
            line: node.loc ? node.loc.start.line : null,
            column: node.loc ? node.loc.start.column : null,
            confidence: confidence,
            pathTag: pathTag,
            context: context || {},
            timestamp: Date.now()
        };
    }
    
    /**
     * 判断是否为定义上下文
     * @param {Object} node - AST节点
     * @param {Object} context - 上下文
     * @returns {boolean} 是否为定义上下文
     */
    function isDefinitionContext(node, context) {
        return context.isDeclaration || context.isParameter || context.isCatchParam;
    }
    
    /**
     * 判断是否为特殊上下文（需要排除的标识符）
     * @param {Object} node - AST节点
     * @param {Object} context - 上下文
     * @returns {boolean} 是否为特殊上下文
     */
    function isSpecialContext(node, context) {
        // 排除对象属性中的标识符（如 console.log 中的 log）
        if (context.isMemberProperty) {
            return true;
        }
        // 排除赋值左侧的标识符（已在AssignmentExpression中处理）
        if (context.isAssignmentTarget) {
            return true;
        }
        // 不排除函数调用中的标识符，让CallExpression处理
        // 不排除赋值右侧的标识符，因为它们确实是使用
        return false;
    }
    
    /**
     * 确定使用类型
     * @param {Object} node - AST节点
     * @param {Object} context - 上下文
     * @returns {string} 使用类型
     */
    function determineUseType(node, context) {
        if (context.isAssignmentTarget) {
            return UseType.WRITE;
        } else if (context.isCallTarget) {
            return UseType.CALL;
        } else if (context.isMemberObject) {
            return UseType.MEMBER_READ;
        } else {
            return UseType.READ;
        }
    }
    
    /**
     * 确定使用置信度
     * @param {Object} node - AST节点
     * @param {Array} allSymbols - 项目级所有符号
     * @returns {string} 置信度级别
     */
    function determineUseConfidence(node, allSymbols) {
        // JavaScript内置对象和全局对象列表
        var builtinObjects = [
            "console", "Object", "Array", "String", "Number", "Boolean", "Date", "RegExp",
            "Function", "Math", "JSON", "Error", "TypeError", "ReferenceError", "SyntaxError",
            "parseInt", "parseFloat", "isNaN", "isFinite", "eval", "undefined", "NaN",
            "Infinity", "window", "global", "document", "Element", "Node", "Event"
        ];
        
        // 在项目中查找符号
        var foundInProject = false;
        for (var i = 0; i < allSymbols.length; i++) {
            if (allSymbols[i].name === node.name) {
                foundInProject = true;
                break;
            }
        }
        
        if (foundInProject) {
            return Confidence.DEFINITE;
        } else if (builtinObjects.indexOf(node.name) !== -1) {
            return Confidence.DEFINITE; // 内置对象认为是确定的
        } else {
            return Confidence.HEURISTIC;
        }
    }
    
    /**
     * 计算链的置信度
     * @param {Object} definition - 定义点
     * @param {Array} uses - 使用点数组
     * @returns {string} 置信度级别
     */
    function calculateChainConfidence(definition, uses) {
        if (definition.confidence === Confidence.DEFINITE) {
            return Confidence.DEFINITE;
        } else {
            var allDefinite = true;
            for (var i = 0; i < uses.length; i++) {
                if (uses[i].confidence !== Confidence.DEFINITE) {
                    allDefinite = false;
                    break;
                }
            }
            if (allDefinite) {
                return Confidence.DEFINITE;
            } else {
                var hasNonHeuristic = false;
                for (var j = 0; j < uses.length; j++) {
                    if (uses[j].confidence !== Confidence.HEURISTIC) {
                        hasNonHeuristic = true;
                        break;
                    }
                }
                if (hasNonHeuristic) {
                    return Confidence.POSSIBLE;
                } else {
                    return Confidence.HEURISTIC;
                }
            }
        }
    }
    
    /**
     * 创建未使用事实对象
     * @param {Object} definition - 定义点
     * @param {Array} uses - 使用点数组
     * @param {string} confidence - 置信度
     * @param {Array} reasons - 原因说明
     * @returns {Object} 未使用事实对象
     */
    function createUnusedFact(definition, uses, confidence, reasons) {
        return {
            symbolId: definition.symbolName + "@" + definition.line,
            confidence: confidence,
            reasons: reasons,
            definition: definition,
            affectedUses: uses.filter(function(use) {
                return use.symbolName === definition.symbolName;
            })
        };
    }
    
    /**
     * 计算未使用置信度
     * @param {Object} definition - 定义点
     * @param {Array} uses - 使用点数组
     * @returns {Object} 置信度信息
     */
    function calculateUnusedConfidence(definition, uses) {
        var confidence = "high";
        var reasons = [];
        var symbolName = definition.symbolName;
        
        // 获取相关的使用点
        var relatedUses = uses.filter(function(use) {
            return use.symbolName === symbolName;
        });
        
        // ① Def-Use事实完整度判断（最重要）
        if (relatedUses.length === 0) {
            // 完全没有使用点
            if (definition.pathTag === PathTag.SEQUENTIAL) {
                confidence = "high";
                reasons.push("符号定义在顺序执行路径中，且无任何使用点");
            } else {
                confidence = "medium";
                reasons.push("符号无使用点，但定义在特殊路径中（" + definition.pathTag + "）");
            }
        } else if (relatedUses.length > 0) {
            // 有使用点，需要进一步判断
            var hasRealUse = false;
            for (var i = 0; i < relatedUses.length; i++) {
                var use = relatedUses[i];
                var useType = use.useType;
                var isMemberProperty = useType === UseType.READ && use.context && use.context.isMemberProperty;
                
                // 排除成员属性访问
                if (!isMemberProperty) {
                    hasRealUse = true;
                    break;
                }
            }
            
            if (!hasRealUse) {
                confidence = "medium";
                reasons.push("符号只在成员属性访问中出现，可能不是真正的变量使用");
            } else {
                // 有真正的使用，不应该算作未使用
                return {
                    confidence: null, // 表示不是未使用
                    reasons: []
                };
            }
        }
        
        // ② PathTag覆盖情况调整
        if (definition.pathTag === PathTag.CONDITIONAL) {
            if (confidence === "high") confidence = "medium";
            reasons.push("符号定义在条件分支中，可能在某些执行路径中被使用");
        } else if (definition.pathTag === PathTag.TRY || definition.pathTag === PathTag.CATCH) {
            if (confidence === "high") confidence = "low";
            reasons.push("符号定义在异常处理块中，可能有异常处理用途");
        } else if (definition.pathTag === PathTag.LOOP) {
            if (confidence === "high") confidence = "medium";
            reasons.push("符号定义在循环中，可能在循环迭代中被使用");
        }
        
        // ③ 符号"角色"判断
        if (definition.definitionType === "FunctionParameter") {
            if (confidence === "high") confidence = "medium";
            reasons.push("符号是函数参数，常被预留或用于接口");
        } else if (definition.definitionType === "CatchParameter") {
            confidence = "low";
            reasons.push("符号是catch参数，专用于异常处理");
        } else if (definition.definitionType === "VariableDeclaration" && 
                   symbolName.match(/^[A-Z][a-zA-Z0-9]*$/)) {
            // 大写开头的变量名（模块导出符号）
            if (confidence === "high") confidence = "medium";
            reasons.push("符号可能是模块导出，可能被外部使用");
        } else if (definition.definitionType === "VariableDeclaration") {
            // IIFE内私有var，作用域明确
            // 检查是否在IIFE内
            var isInIIFE = definition.pathTag === PathTag.SEQUENTIAL && 
                           symbolName.length > 0 && 
                           symbolName[0] !== symbolName[0].toUpperCase();
            if (isInIIFE && confidence === "medium") confidence = "high";
        }
        
        return {
            confidence: confidence,
            reasons: reasons
        };
    }
    
    /**
     * 计算统计信息
     * @param {Array} definitions - 定义点数组
     * @param {Array} uses - 使用点数组
     * @param {Array} chains - Def-Use链数组
     * @returns {Object} 统计信息
     */
    function calculateStatistics(definitions, uses, chains) {
        var definedSymbols = {};
        var usedSymbols = {};
        
        // JavaScript内置对象和全局对象列表（扩展列表）
        var builtinObjects = [
            "console", "Object", "Array", "String", "Number", "Boolean", "Date", "RegExp",
            "Function", "Math", "JSON", "Error", "TypeError", "ReferenceError", "SyntaxError",
            "parseInt", "parseFloat", "isNaN", "isFinite", "eval", "undefined", "NaN",
            "Infinity", "window", "global", "document", "Element", "Node", "Event",
            "log", "info", "warn", "error", "debug", "trace",  // console方法
            "message", "name", "stack"  // Error对象属性
        ];
        
        // 收集已定义的符号（去重）
        for (var i = 0; i < definitions.length; i++) {
            definedSymbols[definitions[i].symbolName] = true;
        }
        
        // 收集已使用的符号（排除内置对象和成员属性）
        for (var j = 0; j < uses.length; j++) {
            var symbolName = uses[j].symbolName;
            var useType = uses[j].useType;
            
            // 排除内置对象
            var isBuiltin = builtinObjects.indexOf(symbolName) !== -1;
            
            // 只有真正的READ类型才需要排除成员属性，其他类型都是有效的使用
            var isMemberProperty = useType === UseType.READ && uses[j].context && uses[j].context.isMemberProperty;
            var isConsoleMethod = isMemberProperty && (symbolName === "log" || symbolName === "info" || symbolName === "warn" || symbolName === "error" || symbolName === "debug" || symbolName === "trace");
            
            // MEMBER_READ是对象访问，不是属性名访问，应该统计
            // 只有READ + isMemberProperty才排除
            // 注意：对于 obj.value 的情况，value会被标记为READ + isMemberProperty，应该排除
            if (!isBuiltin && !isMemberProperty && !isConsoleMethod) {
                usedSymbols[symbolName] = true;
            }
        }
        
        // 计算未定义使用（排除内置对象和成员属性）
        var undefinedUses = 0;
        for (var symbol in usedSymbols) {
            if (!definedSymbols.hasOwnProperty(symbol) && builtinObjects.indexOf(symbol) === -1) {
                undefinedUses++;
            }
        }
        
        // 首先检查文件是否有未定义使用
        var fileHasUndefinedUses = false;
        for (var n = 0; n < uses.length; n++) {
            var use = uses[n];
            var useType = use.useType;
            var isMemberProperty = useType === UseType.READ && use.context && use.context.isMemberProperty;
            var isConsoleMethod = isMemberProperty && (use.symbolName === "log" || use.symbolName === "info" || use.symbolName === "warn" || use.symbolName === "error" || use.symbolName === "debug" || use.symbolName === "trace");
            
            if (!definedSymbols.hasOwnProperty(use.symbolName) && 
                builtinObjects.indexOf(use.symbolName) === -1 &&
                !isMemberProperty && !isConsoleMethod) {
                fileHasUndefinedUses = true;
                break;
            }
        }
        
        // 计算未使用定义和未使用事实
        var unusedDefinitions = 0;
        var unusedFacts = [];
        
        for (var defSymbol in definedSymbols) {
            // 如果文件中有未定义使用，则不算未使用定义（原有逻辑）
            if (fileHasUndefinedUses) {
                continue;
            }
            
            // 查找对应的定义
            var definition = null;
            for (var m = 0; m < definitions.length; m++) {
                if (definitions[m].symbolName === defSymbol) {
                    definition = definitions[m];
                    break;
                }
            }
            
            if (!definition) continue;
            
            // 计算未使用置信度
            var confidenceResult = calculateUnusedConfidence(definition, uses);
            
            if (confidenceResult.confidence !== null) {
                // 这是未使用符号
                var unusedFact = createUnusedFact(definition, uses, confidenceResult.confidence, confidenceResult.reasons);
                unusedFacts.push(unusedFact);
                
                // 只有HIGH和MEDIUM置信度才计入"严格未使用"数量
                if (confidenceResult.confidence === "high" || confidenceResult.confidence === "medium") {
                    unusedDefinitions++;
                }
            }
        }
        
        return {
            undefinedUses: undefinedUses,
            unusedDefinitions: unusedDefinitions,
            unusedFacts: unusedFacts
        };
    }
    
    /**
     * 递归遍历子节点
     * @param {Object} node - AST节点
     * @param {string} pathTag - 路径标签
     * @param {Object} context - 上下文
     * @param {Function} traverseFunc - 遍历函数
     */
    function traverseChildren(node, pathTag, context, traverseFunc) {
        if (!node || typeof node !== "object") return;
        
        // 根据节点类型确定子节点的路径标签
        var childPathTag = pathTag;
        if (node.type === "IfStatement") {
            childPathTag = PathTag.CONDITIONAL;
        } else if (node.type === "ForStatement" || node.type === "WhileStatement" || node.type === "DoWhileStatement") {
            childPathTag = PathTag.LOOP;
        } else if (node.type === "TryStatement") {
            childPathTag = PathTag.TRY;
        } else if (node.type === "CatchClause") {
            childPathTag = PathTag.CATCH;
        } else if (node.type === "FinallyClause") {
            childPathTag = PathTag.FINALLY;
        }
        
        // 构建子节点的上下文 - ES3兼容：手动复制对象
        var childContext = {};
        if (context) {
            for (var key in context) {
                if (context.hasOwnProperty(key)) {
                    childContext[key] = context[key];
                }
            }
        }
        
        // 设置上下文标志
        if (node.type === "VariableDeclaration") {
            childContext.isDeclaration = true;
        } else if (node.type === "FunctionDeclaration" || node.type === "FunctionExpression") {
            childContext.isParameter = true;
        } else if (node.type === "CatchClause") {
            childContext.isCatchParam = true;
        } else if (node.type === "AssignmentExpression") {
            // 分别处理左右子节点 - ES3兼容：手动复制对象
            var leftContext = {};
            for (var key1 in childContext) {
                if (childContext.hasOwnProperty(key1)) {
                    leftContext[key1] = childContext[key1];
                }
            }
            leftContext.isAssignmentTarget = true;
            var rightContext = {};
            for (var key2 in childContext) {
                if (childContext.hasOwnProperty(key2)) {
                    rightContext[key2] = childContext[key2];
                }
            }
            rightContext.isAssignmentRight = true;
            
            if (node.left) {
                traverseFunc(node.left, childPathTag, leftContext);
            }
            if (node.right) {
                traverseFunc(node.right, childPathTag, rightContext);
            }
            return; // 已经处理了子节点，直接返回
        } else if (node.type === "CallExpression") {
            // 处理函数调用：callee是调用目标，arguments是参数 - ES3兼容：手动复制对象
            if (node.callee) {
                var calleeContext = {};
                for (var key3 in childContext) {
                    if (childContext.hasOwnProperty(key3)) {
                        calleeContext[key3] = childContext[key3];
                    }
                }
                calleeContext.isCallTarget = true;
                traverseFunc(node.callee, childPathTag, calleeContext);
            }
            if (node.arguments) {
                for (var i = 0; i < node.arguments.length; i++) {
                    traverseFunc(node.arguments[i], childPathTag, childContext);
                }
            }
            return; // 已经处理了子节点，直接返回
        } else if (node.type === "MemberExpression") {
            // 处理成员访问：object是对象，property是属性 - ES3兼容：手动复制对象
            if (node.object) {
                var objectContext = {};
                for (var key4 in childContext) {
                    if (childContext.hasOwnProperty(key4)) {
                        objectContext[key4] = childContext[key4];
                    }
                }
                objectContext.isMemberObject = true;
                traverseFunc(node.object, childPathTag, objectContext);
            }
            if (node.property) {
                var propertyContext = {};
                for (var key5 in childContext) {
                    if (childContext.hasOwnProperty(key5)) {
                        propertyContext[key5] = childContext[key5];
                    }
                }
                propertyContext.isMemberProperty = true;
                traverseFunc(node.property, childPathTag, propertyContext);
            }
            return; // 已经处理了子节点，直接返回
        }
        
        // 遍历所有子节点属性
        var keys = [];
        for (var key in node) {
            if (node.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            var child = node[key];
            
            if (child && typeof child === "object") {
                if (Object.prototype.toString.call(child) === "[object Array]") {
                    for (var i = 0; i < child.length; i++) {
                        traverseFunc(child[i], childPathTag, childContext);
                    }
                } else if (child.type) {
                    traverseFunc(child, childPathTag, childContext);
                }
            }
        }
    }
    
    /**
     * 生成Def-Use分析报告
     * @param {Object} defUseResult - Def-Use分析结果
     * @returns {string} 格式化报告
     */
    function generateDefUseReport(defUseResult) {
        var report = "";
        
        report += "📄 Def-Use 分析报告\n";
        report += "═════════════════════════════════\n";
        report += "文件: " + defUseResult.filePath + "\n";
        report += "状态: " + (defUseResult.success ? "✅ 成功" : "❌ 失败") + "\n\n";
        
        if (!defUseResult.success) {
            report += "❌ 分析失败:\n";
            for (var i = 0; i < defUseResult.errors.length; i++) {
                var error = defUseResult.errors[i];
                report += "  " + error.message + "\n";
            }
            return report;
        }
        
        // 统计概览
        report += "📊 统计概览:\n";
        report += "  定义点: " + defUseResult.summary.totalDefinitions + "\n";
        report += "  使用点: " + defUseResult.summary.totalUses + "\n";
        report += "  Def-Use链: " + defUseResult.summary.totalChains + "\n";
        report += "  未定义使用: " + defUseResult.summary.undefinedUses + "\n";
        report += "  未使用定义: " + defUseResult.summary.unusedDefinitions + "\n\n";
        
        // 详细信息
        if (defUseResult.definitions.length > 0) {
            report += "🏷️  定义点详情:\n";
            var maxDefs = Math.min(defUseResult.definitions.length, 10);
            for (var j = 0; j < maxDefs; j++) {
                var def = defUseResult.definitions[j];
                report += "  " + (j + 1) + ". " + def.symbolName;
                report += " (" + def.definitionType + ")";
                report += " [" + def.line + ":" + def.column + "]";
                report += " [" + def.confidence + "]\n";
            }
            if (defUseResult.definitions.length > 10) {
                report += "  ... 还有 " + (defUseResult.definitions.length - 10) + " 个定义点\n";
            }
            report += "\n";
        }
        
        if (defUseResult.uses.length > 0) {
            report += "🔍 使用点详情:\n";
            var maxUses = Math.min(defUseResult.uses.length, 10);
            for (var k = 0; k < maxUses; k++) {
                var use = defUseResult.uses[k];
                report += "  " + (k + 1) + ". " + use.symbolName;
                report += " (" + use.useType + ")";
                report += " [" + use.line + ":" + use.column + "]";
                report += " [" + use.confidence + "]\n";
            }
            if (defUseResult.uses.length > 10) {
                report += "  ... 还有 " + (defUseResult.uses.length - 10) + " 个使用点\n";
            }
            report += "\n";
        }
        
        if (defUseResult.defUseChains.length > 0) {
            report += "🔗 Def-Use链详情:\n";
            var maxChains = Math.min(defUseResult.defUseChains.length, 10);
            for (var l = 0; l < maxChains; l++) {
                var chain = defUseResult.defUseChains[l];
                report += "  " + (l + 1) + ". " + chain.symbolName;
                report += " → " + chain.useCount + " 次使用";
                report += " [" + chain.confidence + "]\n";
            }
            if (defUseResult.defUseChains.length > 10) {
                report += "  ... 还有 " + (defUseResult.defUseChains.length - 10) + " 个Def-Use链\n";
            }
        }
        
        report += "═════════════════════════════════\n";
        
        return report;
    }
    
    /**
     * 查询API: 获取所有定义点
     * @param {Object} defUseResult - Def-Use分析结果
     * @returns {Array} 定义点数组
     */
    function getDefs(defUseResult) {
        if (!defUseResult || !defUseResult.definitions) {
            return [];
        }
        return defUseResult.definitions.slice(); // 返回副本
    }
    
    /**
     * 查询API: 获取所有使用点
     * @param {Object} defUseResult - Def-Use分析结果
     * @returns {Array} 使用点数组
     */
    function getUses(defUseResult) {
        if (!defUseResult || !defUseResult.uses) {
            return [];
        }
        return defUseResult.uses.slice(); // 返回副本
    }
    
    /**
     * 查询API: 获取未使用符号（带置信度过滤）
     * @param {Object} defUseResult - Def-Use分析结果
     * @param {string} confidenceFilter - 置信度过滤 ("high", "medium", "low", "all")
     * @returns {Array} 未使用事实数组
     */
    function getUnusedSymbols(defUseResult, confidenceFilter) {
        if (!defUseResult || !defUseResult.summary || !defUseResult.summary.unusedFacts) {
            return [];
        }
        
        var unusedFacts = defUseResult.summary.unusedFacts;
        
        if (!confidenceFilter || confidenceFilter === "all") {
            return unusedFacts.slice(); // 返回所有未使用符号
        }
        
        // 按置信度过滤
        return unusedFacts.filter(function(fact) {
            return fact.confidence === confidenceFilter;
        });
    }
    
    /**
     * 查询API: 获取未定义使用
     * @param {Object} defUseResult - Def-Use分析结果
     * @returns {Array} 未定义使用点数组
     */
    function getUndefinedUses(defUseResult) {
        if (!defUseResult || !defUseResult.uses) {
            return [];
        }
        
        // JavaScript内置对象和全局对象列表
        var builtinObjects = [
            "console", "Object", "Array", "String", "Number", "Boolean", "Date", "RegExp",
            "Function", "Math", "JSON", "Error", "TypeError", "ReferenceError", "SyntaxError",
            "parseInt", "parseFloat", "isNaN", "isFinite", "eval", "undefined", "NaN",
            "Infinity", "window", "global", "document", "Element", "Node", "Event",
            "log", "info", "warn", "error", "debug", "trace",
            "message", "name", "stack"
        ];
        
        // 获取已定义的符号
        var definedSymbols = {};
        if (defUseResult.definitions) {
            for (var i = 0; i < defUseResult.definitions.length; i++) {
                definedSymbols[defUseResult.definitions[i].symbolName] = true;
            }
        }
        
        // 筛选未定义的使用点
        var undefinedUses = [];
        for (var j = 0; j < defUseResult.uses.length; j++) {
            var use = defUseResult.uses[j];
            var useType = use.useType;
            var isMemberProperty = useType === UseType.READ && use.context && use.context.isMemberProperty;
            var isConsoleMethod = isMemberProperty && (use.symbolName === "log" || use.symbolName === "info" || use.symbolName === "warn" || use.symbolName === "error" || use.symbolName === "debug" || use.symbolName === "trace");
            
            if (!definedSymbols.hasOwnProperty(use.symbolName) && 
                builtinObjects.indexOf(use.symbolName) === -1 &&
                !isMemberProperty && !isConsoleMethod) {
                undefinedUses.push(use);
            }
        }
        
        return undefinedUses;
    }
    
    /**
     * 查询API: 影响面分析 - 查询删除某个符号会影响哪些地方
     * @param {Object} defUseResult - Def-Use分析结果
     * @param {string} symbolName - 符号名称
     * @returns {Object} 影响面信息
     */
    function queryImpact(defUseResult, symbolName) {
        if (!defUseResult) {
            return {
                symbolName: symbolName,
                found: false,
                impact: {
                    definition: null,
                    uses: [],
                    downstreamCount: 0,
                    riskLevel: "none"
                }
            };
        }
        
        // 查找定义点
        var definition = null;
        if (defUseResult.definitions) {
            for (var i = 0; i < defUseResult.definitions.length; i++) {
                if (defUseResult.definitions[i].symbolName === symbolName) {
                    definition = defUseResult.definitions[i];
                    break;
                }
            }
        }
        
        // 查找使用点
        var uses = [];
        if (defUseResult.uses) {
            for (var j = 0; j < defUseResult.uses.length; j++) {
                if (defUseResult.uses[j].symbolName === symbolName) {
                    uses.push(defUseResult.uses[j]);
                }
            }
        }
        
        // 计算风险级别
        var riskLevel = "none";
        var downstreamCount = uses.length;
        
        if (definition) {
            if (downstreamCount === 0) {
                riskLevel = "low"; // 未使用的符号，删除影响小
            } else if (downstreamCount <= 3) {
                riskLevel = "medium"; // 少量使用，中等影响
            } else {
                riskLevel = "high"; // 大量使用，高风险
            }
            
            // 特殊情况调整
            if (definition.definitionType === "FunctionParameter") {
                riskLevel = "low"; // 函数参数通常影响较小
            } else if (definition.definitionType === "CatchParameter") {
                riskLevel = "low"; // catch参数影响最小
            } else if (definition.symbolName.match(/^[A-Z][a-zA-Z0-9]*$/)) {
                riskLevel = "high"; // 大写开头的可能是模块，删除影响大
            }
        } else {
            // 符号未定义，但被使用
            if (downstreamCount > 0) {
                riskLevel = "high"; // 这是未定义使用，需要修复
            }
        }
        
        return {
            symbolName: symbolName,
            found: definition !== null,
            impact: {
                definition: definition,
                uses: uses,
                downstreamCount: downstreamCount,
                riskLevel: riskLevel
            }
        };
    }
    
    // 公共接口
    return {
        UseType: UseType,
        Confidence: Confidence,
        PathTag: PathTag,
        analyzeDefUse: analyzeDefUse,
        generateDefUseReport: generateDefUseReport,
        
        // 查询API
        getDefs: getDefs,
        getUses: getUses,
        getUnusedSymbols: getUnusedSymbols,
        getUndefinedUses: getUndefinedUses,
        queryImpact: queryImpact
    };
    
})();

module.exports = DefUseAnalyzer;
