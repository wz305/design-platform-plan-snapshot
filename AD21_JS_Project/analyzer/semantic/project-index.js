/**
 * ES3 工程语义操作系统 - 工程符号表
 * 职责：建立项目级别的统一符号表，管理符号作用域和冲突检测
 * 
 * @author ES3 工程语义操作系统
 * @module ProjectIndex
 */

/**
 * 工程符号表模块
 */
var ProjectIndex = (function(){
    
    /**
     * 创建工程符号表
     * @returns {Object} 空的工程符号表
     */
    function createIndex() {
        return {
            symbols: [],
            modules: [],
            functions: [],
            globals: [],
            conflicts: [],
            metadata: {
                totalSymbols: 0,
                totalModules: 0,
                totalFunctions: 0,
                totalGlobals: 0,
                totalConflicts: 0,
                lastUpdated: null
            }
        };
    }
    
    /**
     * 添加符号到索引
     * @param {Object} index 工程符号表
     * @param {Object} symbol 符号对象
     * @param {string} filePath 文件路径
     * @returns {Object} 添加结果
     */
    function addSymbol(index, symbol, filePath) {
        console.log("📝 添加符号到索引: " + symbol.name);
        
        // 确保符号有完整信息
        var enrichedSymbol = enrichSymbol(symbol, filePath);
        
        // 检测符号冲突
        var conflicts = detectSymbolConflicts(enrichedSymbol, index.symbols);
        if (conflicts.length > 0) {
            console.log("  ⚠️ 发现符号冲突: " + conflicts.length + " 个");
            index.conflicts = index.conflicts.concat(conflicts);
        }
        
        // 添加到相应类别
        index.symbols.push(enrichedSymbol);
        
        switch (enrichedSymbol.kind) {
            case "module":
                index.modules.push(enrichedSymbol);
                break;
            case "execution-entry":
                index.functions.push(enrichedSymbol);
                break;
            case "global-variable":
                index.globals.push(enrichedSymbol);
                break;
        }
        
        // 更新元数据
        updateMetadata(index);
        
        return {
            success: true,
            symbol: enrichedSymbol,
            conflicts: conflicts,
            message: "符号添加成功"
        };
    }
    
    /**
     * 批量添加符号
     * @param {Object} index 工程符号表
     * @param {Array} symbols 符号数组
     * @param {string} filePath 文件路径
     * @returns {Object} 批量添加结果
     */
    function addSymbols(index, symbols, filePath) {
        console.log("📝 批量添加符号: " + symbols.length + " 个");
        
        var results = [];
        var totalConflicts = 0;
        
        for (var i = 0; i < symbols.length; i++) {
            var result = addSymbol(index, symbols[i], filePath);
            results.push(result);
            totalConflicts += result.conflicts.length;
        }
        
        return {
            success: true,
            results: results,
            addedCount: symbols.length,
            conflictCount: totalConflicts,
            message: "批量添加完成"
        };
    }
    
    /**
     * 查找符号
     * @param {Object} index 工程符号表
     * @param {string} name 符号名称
     * @param {string} kind 符号类型（可选）
     * @returns {Array} 匹配的符号列表
     */
    function findSymbols(index, name, kind) {
        var matches = index.symbols.filter(function(symbol) {
            var nameMatch = symbol.name === name;
            var kindMatch = !kind || symbol.kind === kind;
            return nameMatch && kindMatch;
        });
        
        return matches;
    }
    
    /**
     * 按作用域查找符号
     * @param {Object} index 工程符号表
     * @param {string} scope 作用域
     * @returns {Array} 作用域内的符号列表
     */
    function findSymbolsByScope(index, scope) {
        return index.symbols.filter(function(symbol) {
            return symbol.scope === scope;
        });
    }
    
    /**
     * 查找未使用的符号
     * @param {Object} index 工程符号表
     * @returns {Array} 未使用的符号列表
     */
    function findUnusedSymbols(index) {
        var unused = [];
        
        for (var i = 0; i < index.symbols.length; i++) {
            var symbol = index.symbols[i];
            var usages = findSymbolUsages(index, symbol);
            
            // 如果符号只在声明处被引用，则认为是未使用
            if (usages.length <= 1) {
                unused.push({
                    symbol: symbol,
                    usageCount: usages.length,
                    severity: symbol.kind === "module" ? "warning" : "info"
                });
            }
        }
        
        return unused;
    }
    
    /**
     * 查找符号的使用情况
     * @param {Object} index 工程符号表
     * @param {Object} symbol 目标符号
     * @returns {Array} 使用位置列表
     */
    function findSymbolUsages(index, symbol) {
        var usages = [];
        
        // 将符号本身的声明位置作为第一个使用
        usages.push({
            symbol: symbol,
            location: {
                file: symbol.filePath,
                line: symbol.range ? symbol.range.start.line : null,
                column: symbol.range ? symbol.range.start.column : null
            },
            type: "declaration"
        });
        
        // 在其他符号中查找对该符号的引用
        for (var i = 0; i < index.symbols.length; i++) {
            var otherSymbol = index.symbols[i];
            if (otherSymbol === symbol) continue;
            
            // 简化实现：检查名称匹配
            // 在实际实现中需要更精确的引用分析
            if (otherSymbol.references && otherSymbol.references.length > 0) {
                for (var j = 0; j < otherSymbol.references.length; j++) {
                    var ref = otherSymbol.references[j];
                    if (ref.name === symbol.name) {
                        usages.push({
                            symbol: otherSymbol,
                            location: ref.location,
                            type: "reference"
                        });
                    }
                }
            }
        }
        
        return usages;
    }
    
    /**
     * 分析符号可见性
     * @param {Object} index 工程符号表
     * @returns {Object} 可见性分析结果
     */
    function analyzeVisibility(index) {
        var analysis = {
            public: [],
            private: [],
            restricted: [],
            summary: {
                totalPublic: 0,
                totalPrivate: 0,
                totalRestricted: 0
            }
        };
        
        for (var i = 0; i < index.symbols.length; i++) {
            var symbol = index.symbols[i];
            
            switch (symbol.visibility) {
                case "public":
                    analysis.public.push(symbol);
                    break;
                case "private":
                    analysis.private.push(symbol);
                    break;
                case "restricted":
                    analysis.restricted.push(symbol);
                    break;
            }
        }
        
        analysis.summary.totalPublic = analysis.public.length;
        analysis.summary.totalPrivate = analysis.private.length;
        analysis.summary.totalRestricted = analysis.restricted.length;
        
        return analysis;
    }
    
    /**
     * 生成符号表报告
     * @param {Object} index 工程符号表
     * @returns {string} 格式化的报告
     */
    function generateIndexReport(index) {
        var report = "";
        
        report += "📄 工程符号表报告\n";
        report += "═══════════════════════════════════════\n\n";
        
        // 总体统计
        report += "📊 总体统计:\n";
        report += "  符号总数: " + index.metadata.totalSymbols + "\n";
        report += "  模块数量: " + index.metadata.totalModules + "\n";
        report += "  函数数量: " + index.metadata.totalFunctions + "\n";
        report += "  全局变量: " + index.metadata.totalGlobals + "\n";
        report += "  冲突数量: " + index.metadata.totalConflicts + "\n";
        report += "  最后更新: " + (index.metadata.lastUpdated || "未知") + "\n\n";
        
        // 符号冲突
        if (index.conflicts.length > 0) {
            report += "⚠️ 符号冲突 (" + index.conflicts.length + "):\n";
            for (var i = 0; i < index.conflicts.length; i++) {
                var conflict = index.conflicts[i];
                report += "  " + (i + 1) + ". ";
                if (conflict.severity === "error") {
                    report += "❌ ";
                } else if (conflict.severity === "warning") {
                    report += "⚠️ ";
                } else {
                    report += "ℹ️ ";
                }
                report += conflict.message + "\n";
                report += "     类型: " + conflict.type + "\n";
                report += "     位置: " + conflict.location.file + ":" + conflict.location.line + "\n\n";
            }
        } else {
            report += "✅ 未发现符号冲突\n\n";
        }
        
        // 模块列表
        if (index.modules.length > 0) {
            report += "🏗️ 模块列表 (" + index.modules.length + "):\n";
            for (var j = 0; j < index.modules.length; j++) {
                var module = index.modules[j];
                report += "  " + (j + 1) + ". " + module.name + "\n";
                report += "     文件: " + module.filePath + "\n";
                report += "     生命周期: " + module.lifecyclePhase + "\n";
                report += "     可见性: " + module.visibility + "\n\n";
            }
        }
        
        // 函数列表
        if (index.functions.length > 0) {
            report += "🔧 函数列表 (" + index.functions.length + "):\n";
            for (var k = 0; k < index.functions.length; k++) {
                var func = index.functions[k];
                report += "  " + (k + 1) + ". " + func.name + "\n";
                report += "     文件: " + func.filePath + "\n";
                report += "     类型: " + func.kind + "\n";
                report += "     生命周期: " + func.lifecyclePhase + "\n\n";
            }
        }
        
        // 可见性分析
        var visibility = analyzeVisibility(index);
        report += "👁️ 可见性分析:\n";
        report += "  公共符号: " + visibility.summary.totalPublic + "\n";
        report += "  私有符号: " + visibility.summary.totalPrivate + "\n";
        report += "  受限符号: " + visibility.summary.totalRestricted + "\n\n";
        
        // 未使用符号
        var unused = findUnusedSymbols(index);
        if (unused.length > 0) {
            report += "🔍 未使用符号 (" + unused.length + "):\n";
            for (var l = 0; l < unused.length; l++) {
                var unusedSymbol = unused[l];
                report += "  " + (l + 1) + ". " + unusedSymbol.symbol.name + "\n";
                report += "     类型: " + unusedSymbol.symbol.kind + "\n";
                report += "     使用次数: " + unusedSymbol.usageCount + "\n";
                report += "     严重程度: " + unusedSymbol.severity + "\n\n";
            }
        } else {
            report += "✅ 所有符号都被使用\n\n";
        }
        
        report += "═══════════════════════════════════════\n";
        
        return report;
    }
    
    /**
     * 导出符号表为JSON
     * @param {Object} index 工程符号表
     * @returns {Object} JSON格式的符号表数据
     */
    function exportToJSON(index) {
        return {
            version: "1.0",
            timestamp: new Date().toISOString(),
            metadata: index.metadata,
            symbols: index.symbols.map(function(symbol) {
                return {
                    name: symbol.name,
                    kind: symbol.kind,
                    visibility: symbol.visibility,
                    lifecyclePhase: symbol.lifecyclePhase,
                    filePath: symbol.filePath,
                    range: symbol.range
                };
            }),
            conflicts: index.conflicts,
            statistics: {
                modules: index.modules.length,
                functions: index.functions.length,
                globals: index.globals.length,
                unused: findUnusedSymbols(index).length
            }
        };
    }
    
    // 辅助函数：丰富符号信息
    function enrichSymbol(symbol, filePath) {
        var enriched = Object.assign({}, symbol);
        enriched.filePath = filePath;
        enriched.addedAt = new Date().toISOString();
        
        // 设置默认值
        if (!enriched.visibility) {
            enriched.visibility = enriched.kind === "module" ? "public" : "private";
        }
        
        if (!enriched.scope) {
            enriched.scope = enriched.kind === "global-variable" ? "global" : "file";
        }
        
        return enriched;
    }
    
    // 辅助函数：检测符号冲突
    function detectSymbolConflicts(newSymbol, existingSymbols) {
        var conflicts = [];
        
        for (var i = 0; i < existingSymbols.length; i++) {
            var existing = existingSymbols[i];
            
            // 检查名称冲突
            if (existing.name === newSymbol.name) {
                // 同类型的符号冲突更严重
                if (existing.kind === newSymbol.kind) {
                    conflicts.push({
                        type: "name-conflict-same-kind",
                        severity: "error",
                        message: "符号名称冲突: " + newSymbol.name + " (" + newSymbol.kind + ")",
                        newSymbol: newSymbol,
                        existingSymbol: existing,
                        location: {
                            file: newSymbol.filePath,
                            line: newSymbol.range ? newSymbol.range.start.line : null
                        }
                    });
                } else {
                    conflicts.push({
                        type: "name-conflict-different-kind",
                        severity: "warning",
                        message: "符号名称冲突: " + newSymbol.name + " (不同类型)",
                        newSymbol: newSymbol,
                        existingSymbol: existing,
                        location: {
                            file: newSymbol.filePath,
                            line: newSymbol.range ? newSymbol.range.start.line : null
                        }
                    });
                }
            }
        }
        
        return conflicts;
    }
    
    // 辅助函数：更新元数据
    function updateMetadata(index) {
        index.metadata.totalSymbols = index.symbols.length;
        index.metadata.totalModules = index.modules.length;
        index.metadata.totalFunctions = index.functions.length;
        index.metadata.totalGlobals = index.globals.length;
        index.metadata.totalConflicts = index.conflicts.length;
        index.metadata.lastUpdated = new Date().toISOString();
    }
    
    // 公共接口
    return {
        createIndex: createIndex,
        addSymbol: addSymbol,
        addSymbols: addSymbols,
        findSymbols: findSymbols,
        findSymbolsByScope: findSymbolsByScope,
        findUnusedSymbols: findUnusedSymbols,
        findSymbolUsages: findSymbolUsages,
        analyzeVisibility: analyzeVisibility,
        generateIndexReport: generateIndexReport,
        exportToJSON: exportToJSON
    };
    
})();

module.exports = ProjectIndex;
