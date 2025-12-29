/**
 * ES3 工程语义操作系统 - 依赖关系分析器
 * 职责：分析模块间依赖关系、函数调用关系、循环依赖检测
 * 
 * @author ES3 工程语义操作系统
 * @module DependencyAnalyzer
 */

/**
 * 依赖关系分析器模块
 */
var DependencyAnalyzer = (function(){
    
    /**
     * 分析模块间依赖关系
     * @param {Object} ast AST节点
     * @param {Array} symbols 已识别的符号列表
     * @returns {Object} 依赖分析结果
     */
    function analyzeModuleDependencies(ast, symbols) {
        var dependencies = [];
        var moduleSymbols = symbols.filter(function(symbol) {
            return symbol.kind === "module";
        });
        
        console.log("🔗 分析模块依赖关系...");
        console.log("  模块数量: " + moduleSymbols.length);
        
        // 遍历AST查找模块引用
        traverseAST(ast, function(node) {
            // 情况1: VariableDeclarator中的模块引用
            if (node.type === "VariableDeclarator" && node.init && node.init.type === "Identifier") {
                var referencedModule = node.init.name;
                
                // 检查是否是对已定义模块的引用
                var targetModule = moduleSymbols.find(function(symbol) {
                    return symbol.name === referencedModule;
                });
                
                if (targetModule) {
                    var sourceModule = findContainingModule(node, moduleSymbols);
                    
                    if (sourceModule && sourceModule.name !== referencedModule) {
                        var dependency = {
                            source: sourceModule.name,
                            target: referencedModule,
                            type: "module-reference",
                            line: node.loc ? node.loc.start.line : null,
                            column: node.loc ? node.loc.start.column : null,
                            context: node.id.name + " = " + referencedModule
                        };
                        
                        // 避免重复依赖
                        if (!dependencies.find(function(dep) {
                            return dep.source === dependency.source && 
                                   dep.target === dependency.target;
                        })) {
                            dependencies.push(dependency);
                            console.log("    发现依赖: " + dependency.source + " → " + dependency.target);
                        }
                    }
                }
            }
            
            // 情况2: CallExpression中的模块方法调用
            if (node.type === "CallExpression" && 
                node.callee.type === "MemberExpression" &&
                node.callee.object.type === "Identifier") {
                
                var moduleName = node.callee.object.name;
                var methodName = node.callee.property.name;
                
                // 检查是否是对已定义模块的调用
                var targetModule = moduleSymbols.find(function(symbol) {
                    return symbol.name === moduleName;
                });
                
                if (targetModule) {
                    var sourceModule = findContainingModule(node, moduleSymbols);
                    
                    if (sourceModule && sourceModule.name !== moduleName) {
                        var dependency = {
                            source: sourceModule.name,
                            target: moduleName,
                            type: "module-method-call",
                            line: node.loc ? node.loc.start.line : null,
                            column: node.loc ? node.loc.start.column : null,
                            context: moduleName + "." + methodName + "()"
                        };
                        
                        // 避免重复依赖
                        if (!dependencies.find(function(dep) {
                            return dep.source === dependency.source && 
                                   dep.target === dependency.target;
                        })) {
                            dependencies.push(dependency);
                            console.log("    发现依赖: " + dependency.source + " → " + dependency.target);
                        }
                    }
                }
            }
        });
        
        console.log("  依赖关系数量: " + dependencies.length);
        
        return {
            success: true,
            dependencies: dependencies,
            summary: {
                totalDependencies: dependencies.length,
                moduleCount: moduleSymbols.length
            }
        };
    }
    
    /**
     * 分析函数调用关系
     * @param {Object} ast AST节点
     * @param {Array} symbols 已识别的符号列表
     * @returns {Object} 调用关系分析结果
     */
    function analyzeFunctionCalls(ast, symbols) {
        var calls = [];
        var allFunctions = extractAllFunctions(ast);
        
        console.log("📞 分析函数调用关系...");
        console.log("  函数数量: " + allFunctions.length);
        
        // 遍历AST查找函数调用
        traverseAST(ast, function(node) {
            if (node.type === "CallExpression" && node.callee.type === "Identifier") {
                var calledFunctionName = node.callee.name;
                var callingFunction = findContainingFunction(node, allFunctions);
                var calledFunction = allFunctions.find(function(func) {
                    return func.name === calledFunctionName;
                });
                
                if (callingFunction && calledFunction) {
                    var call = {
                        caller: callingFunction.name,
                        callee: calledFunctionName,
                        callerType: callingFunction.type,
                        calleeType: calledFunction.type,
                        line: node.loc ? node.loc.start.line : null,
                        column: node.loc ? node.loc.start.column : null,
                        arguments: node.arguments ? node.arguments.length : 0
                    };
                    
                    calls.push(call);
                    console.log("    发现调用: " + call.caller + " → " + call.callee);
                }
            }
            
            // 处理模块方法调用：ModuleName.methodName()
            if (node.type === "CallExpression" && 
                node.callee.type === "MemberExpression" &&
                node.callee.object.type === "Identifier") {
                
                var moduleName = node.callee.object.name;
                var methodName = node.callee.property.name;
                var callingFunction = findContainingFunction(node, allFunctions);
                
                if (callingFunction) {
                    var call = {
                        caller: callingFunction.name,
                        callee: moduleName + "." + methodName,
                        callerType: callingFunction.type,
                        calleeType: "module-method",
                        moduleName: moduleName,
                        methodName: methodName,
                        line: node.loc ? node.loc.start.line : null,
                        column: node.loc ? node.loc.start.column : null,
                        arguments: node.arguments ? node.arguments.length : 0
                    };
                    
                    calls.push(call);
                    console.log("    发现模块调用: " + call.caller + " → " + call.callee);
                }
            }
        });
        
        console.log("  调用关系数量: " + calls.length);
        
        return {
            success: true,
            calls: calls,
            summary: {
                totalCalls: calls.length,
                functionCount: allFunctions.length
            }
        };
    }
    
    /**
     * 检测循环依赖
     * @param {Array} dependencies 依赖关系列表
     * @returns {Object} 循环依赖检测结果
     */
    function detectCircularDependencies(dependencies) {
        console.log("🔄 检测循环依赖...");
        
        // 构建依赖图
        var graph = {};
        dependencies.forEach(function(dep) {
            if (!graph[dep.source]) {
                graph[dep.source] = [];
            }
            graph[dep.source].push(dep.target);
        });
        
        var cycles = [];
        var visited = {};
        var recursionStack = {};
        
        // 深度优先搜索检测循环
        function dfs(node, path) {
            if (recursionStack[node]) {
                // 找到循环，提取循环路径
                var cycleStart = path.indexOf(node);
                if (cycleStart !== -1) {
                    var cycle = path.slice(cycleStart).concat([node]);
                    cycles.push(cycle);
                }
                return;
            }
            
            if (visited[node]) {
                return;
            }
            
            visited[node] = true;
            recursionStack[node] = true;
            path.push(node);
            
            if (graph[node]) {
                for (var i = 0; i < graph[node].length; i++) {
                    dfs(graph[node][i], path.slice());
                }
            }
            
            recursionStack[node] = false;
        }
        
        // 对所有节点执行DFS
        Object.keys(graph).forEach(function(node) {
            if (!visited[node]) {
                dfs(node, []);
            }
        });
        
        console.log("  发现循环: " + cycles.length + " 个");
        
        // 格式化循环依赖信息
        var formattedCycles = cycles.map(function(cycle, index) {
            return {
                id: index + 1,
                path: cycle,
                description: cycle.join(" → "),
                length: cycle.length - 1,
                severity: cycle.length > 3 ? "error" : "warning"
            };
        });
        
        return {
            success: true,
            hasCycles: cycles.length > 0,
            cycles: formattedCycles,
            summary: {
                totalCycles: cycles.length,
                maxCycleLength: Math.max.apply(Math, cycles.map(function(cycle) { return cycle.length; }).concat([0]))
            }
        };
    }
    
    /**
     * 构建项目依赖图
     * @param {Array} dependencies 依赖关系列表
     * @returns {Object} 依赖图数据结构
     */
    function buildDependencyGraph(dependencies) {
        console.log("🏗️ 构建项目依赖图...");
        
        var graph = {
            nodes: [],
            edges: [],
            metadata: {
                totalNodes: 0,
                totalEdges: 0,
                maxDepth: 0
            }
        };
        
        // 收集所有唯一节点
        var nodeSet = new Set();
        dependencies.forEach(function(dep) {
            nodeSet.add(dep.source);
            nodeSet.add(dep.target);
        });
        
        // 创建节点
        nodeSet.forEach(function(nodeName) {
            var node = {
                id: nodeName,
                name: nodeName,
                type: "module",
                dependencies: [],
                dependents: []
            };
            graph.nodes.push(node);
        });
        
        // 创建边
        dependencies.forEach(function(dep) {
            var edge = {
                source: dep.source,
                target: dep.target,
                type: dep.type,
                line: dep.line,
                column: dep.column
            };
            graph.edges.push(edge);
            
            // 更新节点的依赖信息
            var sourceNode = graph.nodes.find(function(n) { return n.id === dep.source; });
            var targetNode = graph.nodes.find(function(n) { return n.id === dep.target; });
            
            if (sourceNode) {
                sourceNode.dependencies.push(dep.target);
            }
            if (targetNode) {
                targetNode.dependents.push(dep.source);
            }
        });
        
        // 计算元数据
        graph.metadata.totalNodes = graph.nodes.length;
        graph.metadata.totalEdges = graph.edges.length;
        graph.metadata.maxDepth = calculateMaxDepth(graph);
        
        console.log("  节点数量: " + graph.metadata.totalNodes);
        console.log("  边数量: " + graph.metadata.totalEdges);
        console.log("  最大深度: " + graph.metadata.maxDepth);
        
        return graph;
    }
    
    /**
     * 生成依赖分析报告
     * @param {Object} dependencyResult 依赖分析结果
     * @param {Object} callResult 调用分析结果
     * @param {Object} circularResult 循环依赖检测结果
     * @param {Object} graph 依赖图
     * @returns {string} 格式化的报告
     */
    function generateDependencyReport(dependencyResult, callResult, circularResult, graph) {
        var report = "";
        
        report += "📄 依赖关系分析报告\n";
        report += "═══════════════════════════════════════\n\n";
        
        // 模块依赖关系
        if (dependencyResult.dependencies.length > 0) {
            report += "🔗 模块依赖关系 (" + dependencyResult.dependencies.length + "):\n";
            for (var i = 0; i < dependencyResult.dependencies.length; i++) {
                var dep = dependencyResult.dependencies[i];
                report += "  " + (i + 1) + ". " + dep.source + " → " + dep.target + "\n";
                if (dep.line) {
                    report += "     位置: Line " + dep.line + "\n";
                }
                report += "     上下文: " + dep.context + "\n\n";
            }
        }
        
        // 函数调用关系
        if (callResult.calls.length > 0) {
            report += "📞 函数调用关系 (" + callResult.calls.length + "):\n";
            for (var j = 0; j < callResult.calls.length; j++) {
                var call = callResult.calls[j];
                report += "  " + (j + 1) + ". " + call.caller + " → " + call.callee + "\n";
                report += "     类型: " + call.callerType + " → " + call.calleeType + "\n";
                if (call.line) {
                    report += "     位置: Line " + call.line + "\n";
                }
                report += "     参数: " + call.arguments + " 个\n\n";
            }
        }
        
        // 循环依赖检测
        if (circularResult.hasCycles) {
            report += "🔄 循环依赖检测 (" + circularResult.cycles.length + "):\n";
            for (var k = 0; k < circularResult.cycles.length; k++) {
                var cycle = circularResult.cycles[k];
                report += "  " + (k + 1) + ". ";
                if (cycle.severity === "error") {
                    report += "❌ ";
                } else {
                    report += "⚠️ ";
                }
                report += "循环长度: " + cycle.length + "\n";
                report += "     路径: " + cycle.description + "\n\n";
            }
        } else {
            report += "✅ 未发现循环依赖\n\n";
        }
        
        // 依赖图统计
        report += "📊 依赖图统计:\n";
        report += "  模块总数: " + graph.metadata.totalNodes + "\n";
        report += "  依赖关系: " + graph.metadata.totalEdges + "\n";
        report += "  最大深度: " + graph.metadata.maxDepth + "\n\n";
        
        // 模块详细信息
        report += "📋 模块详细信息:\n";
        for (var m = 0; m < graph.nodes.length; m++) {
            var module = graph.nodes[m];
            report += "  " + (m + 1) + ". " + module.name + "\n";
            report += "     依赖: " + module.dependencies.length + " 个";
            if (module.dependencies.length > 0) {
                report += " (" + module.dependencies.join(", ") + ")";
            }
            report += "\n";
            report += "     被依赖: " + module.dependents.length + " 个";
            if (module.dependents.length > 0) {
                report += " (" + module.dependents.join(", ") + ")";
            }
            report += "\n\n";
        }
        
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    // 辅助函数：遍历AST
    function traverseAST(node, callback) {
        if (!node) return;
        
        callback(node);
        
        for (var key in node) {
            if (node.hasOwnProperty(key)) {
                var child = node[key];
                if (Array.isArray(child)) {
                    for (var i = 0; i < child.length; i++) {
                        traverseAST(child[i], callback);
                    }
                } else if (child && typeof child === 'object' && child.type) {
                    traverseAST(child, callback);
                }
            }
        }
    }
    
    // 辅助函数：查找包含指定节点的模块
    function findContainingModule(node, moduleSymbols) {
        if (!node.loc) return null;
        
        for (var i = 0; i < moduleSymbols.length; i++) {
            var symbol = moduleSymbols[i];
            var symbolLoc = symbol.astNode.loc;
            if (symbolLoc && node.loc.start.line >= symbolLoc.start.line && 
                node.loc.end.line <= symbolLoc.end.line) {
                return symbol;
            }
        }
        return null;
    }
    
    // 辅助函数：查找包含指定节点的函数
    function findContainingFunction(node, functions) {
        if (!node.loc) return null;
        
        for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            var funcLoc = func.range || func.node.loc;
            if (funcLoc && node.loc.start.line >= funcLoc.start.line && 
                node.loc.end.line <= funcLoc.end.line) {
                return func;
            }
        }
        return null;
    }
    
    // 辅助函数：提取所有函数
    function extractAllFunctions(ast) {
        var functions = [];
        
        traverseAST(ast, function(node) {
            if (node.type === "FunctionDeclaration") {
                functions.push({
                    name: node.id ? node.id.name : "anonymous",
                    type: "function",
                    range: node.loc,
                    node: node
                });
            } else if (node.type === "FunctionExpression" && node.id) {
                functions.push({
                    name: node.id.name,
                    type: "function-expression",
                    range: node.loc,
                    node: node
                });
            }
        });
        
        return functions;
    }
    
    // 辅助函数：计算依赖图的最大深度
    function calculateMaxDepth(graph) {
        var maxDepth = 0;
        
        function calculateDepth(nodeId, visited, depth) {
            if (visited[nodeId]) {
                return depth; // 检测到循环，返回当前深度
            }
            
            visited[nodeId] = true;
            var node = graph.nodes.find(function(n) { return n.id === nodeId; });
            
            if (!node || node.dependencies.length === 0) {
                maxDepth = Math.max(maxDepth, depth);
                return depth;
            }
            
            for (var i = 0; i < node.dependencies.length; i++) {
                calculateDepth(node.dependencies[i], Object.assign({}, visited), depth + 1);
            }
        }
        
        graph.nodes.forEach(function(node) {
            calculateDepth(node.id, {}, 0);
        });
        
        return maxDepth;
    }
    
    // 公共接口
    return {
        analyzeModuleDependencies: analyzeModuleDependencies,
        analyzeFunctionCalls: analyzeFunctionCalls,
        detectCircularDependencies: detectCircularDependencies,
        buildDependencyGraph: buildDependencyGraph,
        generateDependencyReport: generateDependencyReport
    };
    
})();

module.exports = DependencyAnalyzer;
