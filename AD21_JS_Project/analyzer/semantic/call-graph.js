/**
 * ES3 工程语义操作系统 - 函数调用图
 * 职责：构建和分析函数调用关系图，提供调用路径追踪和死代码检测
 * 
 * @author ES3 工程语义操作系统
 * @module CallGraph
 */

/**
 * 函数调用图模块
 */
var CallGraph = (function(){
    
    /**
     * 创建调用图
     * @returns {Object} 空的调用图
     */
    function createCallGraph() {
        return {
            nodes: [],
            edges: [],
            metadata: {
                totalNodes: 0,
                totalEdges: 0,
                maxCallDepth: 0,
                entryPoints: [],
                deadFunctions: []
            }
        };
    }
    
    /**
     * 构建函数调用图
     * @param {Object} ast AST节点
     * @param {Array} symbols 符号列表
     * @returns {Object} 调用图和分析结果
     */
    function buildCallGraph(ast, symbols) {
        console.log("📞 构建函数调用图...");
        
        var callGraph = createCallGraph();
        var allFunctions = extractAllFunctions(ast);
        var calls = extractFunctionCalls(ast, allFunctions);
        
        console.log("  函数数量: " + allFunctions.length);
        console.log("  调用关系: " + calls.length);
        
        // 创建节点
        allFunctions.forEach(function(func) {
            var node = createFunctionNode(func, symbols);
            callGraph.nodes.push(node);
        });
        
        // 创建边
        calls.forEach(function(call) {
            var edge = createCallEdge(call, callGraph.nodes);
            if (edge) {
                callGraph.edges.push(edge);
            }
        });
        
        // 分析调用图
        analyzeCallGraph(callGraph);
        
        console.log("  节点数量: " + callGraph.nodes.length);
        console.log("  边数量: " + callGraph.edges.length);
        console.log("  入口点: " + callGraph.metadata.entryPoints.length);
        console.log("  死函数: " + callGraph.metadata.deadFunctions.length);
        
        return {
            success: true,
            callGraph: callGraph,
            statistics: {
                totalFunctions: allFunctions.length,
                totalCalls: calls.length,
                entryPoints: callGraph.metadata.entryPoints.length,
                deadFunctions: callGraph.metadata.deadFunctions.length,
                maxCallDepth: callGraph.metadata.maxCallDepth
            }
        };
    }
    
    /**
     * 查找调用路径
     * @param {Object} callGraph 调用图
     * @param {string} fromFunction 起始函数名
     * @param {string} toFunction 目标函数名
     * @returns {Array} 调用路径列表
     */
    function findCallPaths(callGraph, fromFunction, toFunction) {
        console.log("🔍 查找调用路径: " + fromFunction + " → " + toFunction);
        
        var paths = [];
        var visited = {};
        
        function dfs(currentNode, targetName, path) {
            if (currentNode.name === targetName) {
                paths.push(path.concat([currentNode.name]));
                return;
            }
            
            if (visited[currentNode.name]) {
                return; // 避免循环
            }
            
            visited[currentNode.name] = true;
            
            // 查找当前节点的所有出边
            var outgoingEdges = callGraph.edges.filter(function(edge) {
                return edge.source === currentNode.name;
            });
            
            for (var i = 0; i < outgoingEdges.length; i++) {
                var edge = outgoingEdges[i];
                var nextNode = callGraph.nodes.find(function(n) {
                    return n.name === edge.target;
                });
                
                if (nextNode) {
                    dfs(nextNode, targetName, path.concat([currentNode.name]));
                }
            }
            
            visited[currentNode.name] = false;
        }
        
        // 从起始节点开始搜索
        var startNode = callGraph.nodes.find(function(n) {
            return n.name === fromFunction;
        });
        
        if (startNode) {
            dfs(startNode, toFunction, []);
        }
        
        console.log("  找到路径: " + paths.length + " 条");
        
        return paths.map(function(path, index) {
            return {
                id: index + 1,
                path: path,
                length: path.length - 1,
                description: path.join(" → ")
            };
        });
    }
    
    /**
     * 检测死代码
     * @param {Object} callGraph 调用图
     * @returns {Object} 死代码分析结果
     */
    function detectDeadCode(callGraph) {
        console.log("🔍 检测死代码...");
        
        var deadFunctions = [];
        var reachableFunctions = new Set();
        
        // 从入口点开始标记可达函数
        callGraph.metadata.entryPoints.forEach(function(entryPoint) {
            markReachableFunctions(callGraph, entryPoint, reachableFunctions);
        });
        
        // 找出不可达的函数
        callGraph.nodes.forEach(function(node) {
            if (!reachableFunctions.has(node.name)) {
                deadFunctions.push({
                    function: node,
                    reason: "unreachable",
                    severity: node.type === "execution-entry" ? "error" : "warning"
                });
            }
        });
        
        console.log("  死函数数量: " + deadFunctions.length);
        
        return {
            success: true,
            deadFunctions: deadFunctions,
            reachableCount: reachableFunctions.size,
            totalCount: callGraph.nodes.length,
            deadRate: (deadFunctions.length / callGraph.nodes.length * 100).toFixed(2) + "%"
        };
    }
    
    /**
     * 计算调用深度
     * @param {Object} callGraph 调用图
     * @returns {Object} 调用深度分析
     */
    function calculateCallDepth(callGraph) {
        console.log("📏 计算调用深度...");
        
        var depthInfo = {};
        var maxDepth = 0;
        
        // 对每个节点计算最大调用深度
        callGraph.nodes.forEach(function(node) {
            var depth = calculateNodeDepth(callGraph, node.name, {}, 0);
            depthInfo[node.name] = depth;
            maxDepth = Math.max(maxDepth, depth);
        });
        
        // 按深度排序
        var sortedByDepth = Object.keys(depthInfo).map(function(name) {
            return {
                name: name,
                depth: depthInfo[name]
            };
        }).sort(function(a, b) {
            return b.depth - a.depth;
        });
        
        console.log("  最大调用深度: " + maxDepth);
        
        return {
            success: true,
            maxDepth: maxDepth,
            depthInfo: depthInfo,
            sortedByDepth: sortedByDepth,
            averageDepth: (sortedByDepth.reduce(function(sum, item) {
                return sum + item.depth;
            }, 0) / sortedByDepth.length).toFixed(2)
        };
    }
    
    /**
     * 检测递归调用
     * @param {Object} callGraph 调用图
     * @returns {Object} 递归调用分析结果
     */
    function detectRecursion(callGraph) {
        console.log("🔄 检测递归调用...");
        
        var recursiveCalls = [];
        var cycles = [];
        
        // 检测直接递归
        callGraph.edges.forEach(function(edge) {
            if (edge.source === edge.target) {
                recursiveCalls.push({
                    type: "direct-recursion",
                    function: edge.source,
                    location: edge.location,
                    severity: "warning"
                });
            }
        });
        
        // 检测间接递归（循环）
        var visited = {};
        var recursionStack = {};
        
        function dfs(nodeName, path) {
            if (recursionStack[nodeName]) {
                // 找到循环
                var cycleStart = path.indexOf(nodeName);
                if (cycleStart !== -1) {
                    var cycle = path.slice(cycleStart).concat([nodeName]);
                    cycles.push({
                        type: "indirect-recursion",
                        path: cycle,
                        length: cycle.length - 1,
                        description: cycle.join(" → "),
                        severity: cycle.length > 5 ? "error" : "warning"
                    });
                }
                return;
            }
            
            if (visited[nodeName]) {
                return;
            }
            
            visited[nodeName] = true;
            recursionStack[nodeName] = true;
            path.push(nodeName);
            
            // 遍历出边
            var outgoingEdges = callGraph.edges.filter(function(edge) {
                return edge.source === nodeName;
            });
            
            for (var i = 0; i < outgoingEdges.length; i++) {
                dfs(outgoingEdges[i].target, path.slice());
            }
            
            recursionStack[nodeName] = false;
        }
        
        // 对所有节点执行DFS
        callGraph.nodes.forEach(function(node) {
            if (!visited[node.name]) {
                dfs(node.name, []);
            }
        });
        
        console.log("  直接递归: " + recursiveCalls.length);
        console.log("  间接递归: " + cycles.length);
        
        return {
            success: true,
            recursiveCalls: recursiveCalls,
            cycles: cycles,
            hasRecursion: recursiveCalls.length > 0 || cycles.length > 0
        };
    }
    
    /**
     * 生成调用图报告
     * @param {Object} callGraph 调用图
     * @param {Object} depthAnalysis 深度分析结果
     * @param {Object} deadCodeAnalysis 死代码分析结果
     * @param {Object} recursionAnalysis 递归分析结果
     * @returns {string} 格式化的报告
     */
    function generateCallGraphReport(callGraph, depthAnalysis, deadCodeAnalysis, recursionAnalysis) {
        var report = "";
        
        report += "📄 函数调用图报告\n";
        report += "═══════════════════════════════════════\n\n";
        
        // 总体统计
        report += "📊 总体统计:\n";
        report += "  函数总数: " + callGraph.metadata.totalNodes + "\n";
        report += "  调用关系: " + callGraph.metadata.totalEdges + "\n";
        report += "  最大调用深度: " + callGraph.metadata.maxCallDepth + "\n";
        report += "  入口点数量: " + callGraph.metadata.entryPoints.length + "\n";
        report += "  死函数数量: " + callGraph.metadata.deadFunctions.length + "\n\n";
        
        // 入口点
        if (callGraph.metadata.entryPoints.length > 0) {
            report += "🚪 入口点 (" + callGraph.metadata.entryPoints.length + "):\n";
            for (var i = 0; i < callGraph.metadata.entryPoints.length; i++) {
                var entry = callGraph.metadata.entryPoints[i];
                report += "  " + (i + 1) + ". " + entry.name + "\n";
                report += "     类型: " + entry.type + "\n";
                report += "     文件: " + entry.filePath + "\n\n";
            }
        }
        
        // 调用深度分析
        if (depthAnalysis && depthAnalysis.sortedByDepth.length > 0) {
            report += "📏 调用深度分析:\n";
            report += "  最大深度: " + depthAnalysis.maxDepth + "\n";
            report += "  平均深度: " + depthAnalysis.averageDepth + "\n\n";
            
            report += "  深度排行 (前10):\n";
            var topDepth = depthAnalysis.sortedByDepth.slice(0, 10);
            for (var j = 0; j < topDepth.length; j++) {
                var depth = topDepth[j];
                report += "    " + (j + 1) + ". " + depth.name + " (深度: " + depth.depth + ")\n";
            }
            report += "\n";
        }
        
        // 死代码分析
        if (deadCodeAnalysis && deadCodeAnalysis.deadFunctions.length > 0) {
            report += "🗑️ 死代码分析 (" + deadCodeAnalysis.deadFunctions.length + "):\n";
            for (var k = 0; k < deadCodeAnalysis.deadFunctions.length; k++) {
                var dead = deadCodeAnalysis.deadFunctions[k];
                report += "  " + (k + 1) + ". ";
                if (dead.severity === "error") {
                    report += "❌ ";
                } else {
                    report += "⚠️ ";
                }
                report += dead.function.name + "\n";
                report += "     类型: " + dead.function.type + "\n";
                report += "     原因: " + dead.reason + "\n";
                report += "     文件: " + dead.function.filePath + "\n\n";
            }
        } else {
            report += "✅ 未发现死代码\n\n";
        }
        
        // 递归调用分析
        if (recursionAnalysis && recursionAnalysis.hasRecursion) {
            report += "🔄 递归调用分析:\n";
            
            if (recursionAnalysis.recursiveCalls.length > 0) {
                report += "  直接递归 (" + recursionAnalysis.recursiveCalls.length + "):\n";
                for (var l = 0; l < recursionAnalysis.recursiveCalls.length; l++) {
                    var directRec = recursionAnalysis.recursiveCalls[l];
                    report += "    " + (l + 1) + ". " + directRec.function + "\n";
                    report += "       位置: " + directRec.location.file + ":" + directRec.location.line + "\n";
                }
                report += "\n";
            }
            
            if (recursionAnalysis.cycles.length > 0) {
                report += "  间接递归 (" + recursionAnalysis.cycles.length + "):\n";
                for (var m = 0; m < recursionAnalysis.cycles.length; m++) {
                    var cycle = recursionAnalysis.cycles[m];
                    report += "    " + (m + 1) + ". ";
                    if (cycle.severity === "error") {
                        report += "❌ ";
                    } else {
                        report += "⚠️ ";
                    }
                    report += "循环长度: " + cycle.length + "\n";
                    report += "       路径: " + cycle.description + "\n";
                }
                report += "\n";
            }
        } else {
            report += "✅ 未发现递归调用\n\n";
        }
        
        // 详细调用关系
        if (callGraph.edges.length > 0) {
            report += "📞 详细调用关系 (" + callGraph.edges.length + "):\n";
            for (var n = 0; n < Math.min(callGraph.edges.length, 20); n++) {
                var edge = callGraph.edges[n];
                report += "  " + (n + 1) + ". " + edge.source + " → " + edge.target + "\n";
                report += "     位置: " + edge.location.file + ":" + edge.location.line + "\n";
                report += "     参数: " + edge.arguments + " 个\n\n";
            }
            
            if (callGraph.edges.length > 20) {
                report += "  ... (还有 " + (callGraph.edges.length - 20) + " 个调用关系)\n\n";
            }
        }
        
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    // 辅助函数：提取所有函数
    function extractAllFunctions(ast) {
        var functions = [];
        
        function traverse(node) {
            if (!node) return;
            
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
            
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i]);
                        }
                    } else if (child && typeof child === 'object' && child.type) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return functions;
    }
    
    // 辅助函数：提取函数调用
    function extractFunctionCalls(ast, functions) {
        var calls = [];
        
        function traverse(node) {
            if (!node) return;
            
            if (node.type === "CallExpression") {
                var callingFunction = findContainingFunction(node, functions);
                var callInfo = extractCallInfo(node);
                
                if (callingFunction && callInfo) {
                    calls.push({
                        caller: callingFunction.name,
                        callee: callInfo.name,
                        calleeType: callInfo.type,
                        location: callInfo.location,
                        arguments: callInfo.arguments
                    });
                }
            }
            
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var child = node[key];
                    if (Array.isArray(child)) {
                        for (var i = 0; i < child.length; i++) {
                            traverse(child[i]);
                        }
                    } else if (child && typeof child === 'object' && child.type) {
                        traverse(child);
                    }
                }
            }
        }
        
        traverse(ast);
        return calls;
    }
    
    // 辅助函数：提取调用信息
    function extractCallInfo(callNode) {
        if (callNode.callee.type === "Identifier") {
            return {
                name: callNode.callee.name,
                type: "function",
                location: {
                    file: null,
                    line: callNode.loc ? callNode.loc.start.line : null,
                    column: callNode.loc ? callNode.loc.start.column : null
                },
                arguments: callNode.arguments ? callNode.arguments.length : 0
            };
        } else if (callNode.callee.type === "MemberExpression" && 
                   callNode.callee.object.type === "Identifier") {
            return {
                name: callNode.callee.object.name + "." + callNode.callee.property.name,
                type: "method",
                location: {
                    file: null,
                    line: callNode.loc ? callNode.loc.start.line : null,
                    column: callNode.loc ? callNode.loc.start.column : null
                },
                arguments: callNode.arguments ? callNode.arguments.length : 0
            };
        }
        return null;
    }
    
    // 辅助函数：创建函数节点
    function createFunctionNode(func, symbols) {
        var symbol = symbols.find(function(s) {
            return s.name === func.name;
        });
        
        return {
            name: func.name,
            type: func.type,
            filePath: symbol ? symbol.filePath : null,
            range: func.range,
            inDegree: 0,
            outDegree: 0,
            isEntry: func.type === "execution-entry" || func.type === "dfm-function"
        };
    }
    
    // 辅助函数：创建调用边
    function createCallEdge(call, nodes) {
        var sourceNode = nodes.find(function(n) { return n.name === call.caller; });
        var targetNode = nodes.find(function(n) { return n.name === call.callee; });
        
        if (!sourceNode || !targetNode) {
            return null;
        }
        
        sourceNode.outDegree++;
        targetNode.inDegree++;
        
        return {
            source: call.caller,
            target: call.callee,
            type: "function-call",
            location: call.location,
            arguments: call.arguments
        };
    }
    
    // 辅助函数：分析调用图
    function analyzeCallGraph(callGraph) {
        // 更新元数据
        callGraph.metadata.totalNodes = callGraph.nodes.length;
        callGraph.metadata.totalEdges = callGraph.edges.length;
        
        // 找出入口点（没有入边的函数或DFM函数）
        callGraph.metadata.entryPoints = callGraph.nodes.filter(function(node) {
            return node.inDegree === 0 || node.type === "execution-entry" || node.isEntry;
        });
        
        // 计算最大调用深度
        var maxDepth = 0;
        callGraph.nodes.forEach(function(node) {
            var depth = calculateNodeDepth(callGraph, node.name, {}, 0);
            maxDepth = Math.max(maxDepth, depth);
        });
        callGraph.metadata.maxCallDepth = maxDepth;
    }
    
    // 辅助函数：计算节点深度
    function calculateNodeDepth(callGraph, nodeName, visited, currentDepth) {
        if (visited[nodeName]) {
            return currentDepth; // 检测到循环
        }
        
        visited[nodeName] = true;
        var maxChildDepth = currentDepth;
        
        var outgoingEdges = callGraph.edges.filter(function(edge) {
            return edge.source === nodeName;
        });
        
        for (var i = 0; i < outgoingEdges.length; i++) {
            var childDepth = calculateNodeDepth(callGraph, outgoingEdges[i].target, 
                                              Object.assign({}, visited), currentDepth + 1);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
        }
        
        return maxChildDepth;
    }
    
    // 辅助函数：标记可达函数
    function markReachableFunctions(callGraph, node, reachable) {
        if (reachable.has(node)) {
            return;
        }
        
        reachable.add(node);
        
        var outgoingEdges = callGraph.edges.filter(function(edge) {
            return edge.source === node;
        });
        
        for (var i = 0; i < outgoingEdges.length; i++) {
            markReachableFunctions(callGraph, outgoingEdges[i].target, reachable);
        }
    }
    
    // 辅助函数：查找包含函数
    function findContainingFunction(node, functions) {
        if (!node.loc) return null;
        
        for (var i = 0; i < functions.length; i++) {
            var func = functions[i];
            if (func.range && node.loc.start.line >= func.range.start.line && 
                node.loc.end.line <= func.range.end.line) {
                return func;
            }
        }
        return null;
    }
    
    // 公共接口
    return {
        createCallGraph: createCallGraph,
        buildCallGraph: buildCallGraph,
        analyzeCallGraph: analyzeCallGraph,
        findCallPaths: findCallPaths,
        detectDeadCode: detectDeadCode,
        calculateCallDepth: calculateCallDepth,
        detectRecursion: detectRecursion,
        generateCallGraphReport: generateCallGraphReport
    };
    
})();

module.exports = CallGraph;
