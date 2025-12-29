# Stage 5 Facts使用约定 (AI/Cline视角)

## 🎯 概述

本文档为AI助手（如Cline）提供Stage 5 Def-Use分析结果的标准化使用约定。确保AI工具能够正确理解和操作Stage 5输出的Facts数据。

## 📋 数据结构规范

### 1. 核心Facts对象
```javascript
// Stage 5标准输出格式
{
    "success": true,
    "filePath": "path/to/file.js",
    "stages": {
        "stage5": {
            "facts": {
                // 定义点集合
                "definitions": [
                    {
                        "name": "symbolName",
                        "type": "Variable|Function|Parameter|Module",
                        "line": 10,
                        "column": 5,
                        "scope": "global|function|block",
                        "role": "declaration|assignment|parameter",
                        "pathTag": "main|conditional|loop|function",
                        "astNode": {...}
                    }
                ],
                // 使用点集合
                "uses": [
                    {
                        "name": "symbolName",
                        "line": 15,
                        "column": 10,
                        "type": "read|write|call",
                        "context": "expression|statement|parameter",
                        "pathTag": "main|conditional|loop|function"
                    }
                ],
                // Def-Use链
                "defUseChains": [
                    {
                        "definition": {...},    // 定义点引用
                        "uses": [...],         // 使用点数组
                        "isComplete": true,     // 是否完全匹配
                        "confidence": "High|Medium|Low"
                    }
                ],
                // 分析统计
                "summary": {
                    "totalDefinitions": 5,
                    "totalUses": 8,
                    "totalChains": 4,
                    "undefinedUses": 1,
                    "unusedDefinitions": 2
                }
            }
        }
    }
}
```

### 2. 置信度评估约定
```javascript
// UnusedConfidence计算规则
{
    "symbolName": {
        "confidence": "High|Medium|Low",
        "score": 0.95,              // 0-1之间的数值
        "reasons": [
            "No uses found in any execution path",
            "Definition is reachable but never referenced",
            "Symbol type: Variable (high unused probability)"
        ],
        "pathCoverage": {
            "totalPaths": 4,
            "coveredPaths": 4,
            "usagePaths": 0
        },
        "roleFactor": 1.0,          // 基于符号类型的调整因子
        "completenessFactor": 1.0    // 基于事实完整度的调整因子
    }
}
```

## 🔍 AI使用指南

### 1. 读取Facts数据
```javascript
// AI工具读取Stage 5结果的标准方式
function readStage5Facts(result) {
    if (!result.success || !result.stages.stage5) {
        return null;
    }
    
    return result.stages.stage5.facts;
}

// 示例：获取所有未使用的符号
function getUnusedSymbols(facts) {
    return facts.defUseChains
        .filter(chain => chain.uses.length === 0)
        .map(chain => ({
            symbol: chain.definition.name,
            confidence: chain.confidence,
            location: `${chain.definition.line}:${chain.definition.column}`
        }));
}
```

### 2. 查询API使用约定
```javascript
// AI工具使用查询API的标准方式
var DefUseAnalyzer = require('./analyzer/semantic/def-use-analyzer');

// 获取定义点
var definitions = DefUseAnalyzer.getDefs(facts, "symbolName");
// 返回: Array<Definition> 或 null

// 获取使用点
var uses = DefUseAnalyzer.getUses(facts, "symbolName");
// 返回: Array<Use> 或 null

// 获取未使用符号（带置信度）
var unused = DefUseAnalyzer.getUnusedSymbols(facts);
// 返回: Array<UnusedSymbol> 每个元素包含confidence字段

// 获取未定义使用
var undefinedUses = DefUseAnalyzer.getUndefinedUses(facts);
// 返回: Array<UndefinedUse> 每个元素包含error级别

// 查询影响面
var impact = DefUseAnalyzer.queryImpact(facts, "symbolName");
// 返回: ImpactAnalysis对象
```

### 3. 错误处理约定
```javascript
// AI工具处理Stage 5错误的标准化方式
function handleStage5Errors(result) {
    if (!result.success) {
        return {
            type: "STAGE5_ERROR",
            message: result.error,
            suggestion: "检查输入文件是否为有效的ES3代码"
        };
    }
    
    var stage5 = result.stages.stage5;
    if (!stage5) {
        return {
            type: "STAGE5_MISSING", 
            message: "Stage 5分析结果缺失",
            suggestion: "确认分析流程包含Stage 5阶段"
        };
    }
    
    return null; // 无错误
}
```

## 🎯 AI决策规则

### 1. 置信度驱动的决策
```javascript
// 基于置信度的决策规则
function makeDecision(unusedSymbol) {
    switch (unusedSymbol.confidence) {
        case "High":
            return {
                action: "RECOMMEND_REMOVE",
                reason: "高置信度未使用符号，建议安全删除",
                confidence: unusedSymbol.score
            };
            
        case "Medium":
            return {
                action: "RECOMMEND_REVIEW", 
                reason: "中等置信度，需要人工确认",
                confidence: unusedSymbol.score,
                requiresHumanReview: true
            };
            
        case "Low":
            return {
                action: "NO_ACTION",
                reason: "低置信度，建议保留",
                confidence: unusedSymbol.score
            };
    }
}
```

### 2. 优先级排序规则
```javascript
// 问题优先级排序
function prioritizeIssues(issues) {
    return issues.sort((a, b) => {
        // 1. 未定义使用 > 未使用定义
        if (a.type === 'UNDEFINED_USE' && b.type !== 'UNDEFINED_USE') return -1;
        if (b.type === 'UNDEFINED_USE' && a.type !== 'UNDEFINED_USE') return 1;
        
        // 2. 高置信度 > 中等置信度 > 低置信度
        if (a.confidenceScore !== b.confidenceScore) {
            return b.confidenceScore - a.confidenceScore;
        }
        
        // 3. 错误级别：Error > Warning > Info
        var severityOrder = { 'error': 3, 'warning': 2, 'info': 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
    });
}
```

## 📊 数据验证规则

### 1. Facts完整性验证
```javascript
// AI工具验证Facts数据的完整性
function validateFacts(facts) {
    var errors = [];
    
    // 检查必需字段
    if (!facts.definitions) errors.push("Missing definitions array");
    if (!facts.uses) errors.push("Missing uses array");
    if (!facts.defUseChains) errors.push("Missing defUseChains array");
    if (!facts.summary) errors.push("Missing summary object");
    
    // 检查数据类型
    if (!Array.isArray(facts.definitions)) errors.push("definitions must be array");
    if (!Array.isArray(facts.uses)) errors.push("uses must be array");
    if (!Array.isArray(facts.defUseChains)) errors.push("defUseChains must be array");
    
    // 检查数据一致性
    var defCount = facts.definitions.length;
    var useCount = facts.uses.length;
    if (facts.summary.totalDefinitions !== defCount) {
        errors.push(`Summary definitions count mismatch: ${facts.summary.totalDefinitions} vs ${defCount}`);
    }
    if (facts.summary.totalUses !== useCount) {
        errors.push(`Summary uses count mismatch: ${facts.summary.totalUses} vs ${useCount}`);
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}
```

### 2. 置信度验证
```javascript
// 验证置信度数据的合理性
function validateConfidence(unusedSymbol) {
    var errors = [];
    
    // 检查置信度级别
    if (!['High', 'Medium', 'Low'].includes(unusedSymbol.confidence)) {
        errors.push(`Invalid confidence level: ${unusedSymbol.confidence}`);
    }
    
    // 检查置信度分数范围
    if (typeof unusedSymbol.score !== 'number' || unusedSymbol.score < 0 || unusedSymbol.score > 1) {
        errors.push(`Invalid confidence score: ${unusedSymbol.score}`);
    }
    
    // 检查原因说明
    if (!Array.isArray(unusedSymbol.reasons) || unusedSymbol.reasons.length === 0) {
        errors.push("Missing or invalid reasons array");
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}
```

## 🔧 集成模式

### 1. 单文件分析模式
```javascript
// AI工具分析单个文件的标准流程
async function analyzeSingleFile(filePath) {
    // 1. 执行Stage 5分析
    var result = await SemanticAnalyzer.analyzeProject([filePath]);
    
    // 2. 验证结果
    var validation = validateFacts(result.stages.stage5.facts);
    if (!validation.valid) {
        throw new Error(`Invalid Stage 5 facts: ${validation.errors.join(', ')}`);
    }
    
    // 3. 提取关键信息
    var unused = DefUseAnalyzer.getUnusedSymbols(result.stages.stage5.facts);
    var undefinedUses = DefUseAnalyzer.getUndefinedUses(result.stages.stage5.facts);
    
    // 4. 生成建议
    return {
        filePath: filePath,
        unused: unused.map(makeDecision),
        undefinedUses: undefinedUses,
        summary: result.stages.stage5.facts.summary
    };
}
```

### 2. 项目级分析模式
```javascript
// AI工具分析整个项目的标准流程
async function analyzeProject(filePaths) {
    var projectResult = await SemanticAnalyzer.analyzeProject(filePaths);
    
    if (!projectResult.success) {
        throw new Error(`Project analysis failed: ${projectResult.error}`);
    }
    
    var allIssues = [];
    var allUnused = [];
    var allUndefined = [];
    
    // 聚合所有文件的结果
    for (var i = 0; i < projectResult.stages.stage5.defUseAnalysis.length; i++) {
        var fileResult = projectResult.stages.stage5.defUseAnalysis[i];
        
        var unused = DefUseAnalyzer.getUnusedSymbols(fileResult.facts);
        var undefinedUses = DefUseAnalyzer.getUndefinedUses(fileResult.facts);
        
        allUnused = allUnused.concat(unused.map(u => Object.assign(u, {
            file: fileResult.filePath
        })));
        
        allUndefined = allUndefined.concat(undefinedUses.map(u => Object.assign(u, {
            file: fileResult.filePath
        })));
    }
    
    // 排序和优先级处理
    var prioritizedIssues = prioritizeIssues([
        ...allUnused.map(u => Object.assign(u, { type: 'UNUSED_DEFINITION' })),
        ...allUndefined.map(u => Object.assign(u, { type: 'UNDEFINED_USE' }))
    ]);
    
    return {
        projectSummary: projectResult.stages.stage5.summary,
        issues: prioritizedIssues,
        recommendations: prioritizedIssues.map(makeDecision)
    };
}
```

## 📈 性能优化指南

### 1. 内存管理
```javascript
// AI工具处理大型项目时的内存优化
function optimizeForLargeProject(facts) {
    // 1. 流式处理大文件
    if (facts.definitions.length > 10000) {
        return processInChunks(facts, 1000);
    }
    
    // 2. 及时清理不需要的数据
    var optimized = Object.assign({}, facts);
    delete optimized.astNode; // 移除大型AST节点
    
    // 3. 使用索引加速查询
    if (facts.defUseChains.length > 1000) {
        optimized.symbolIndex = buildSymbolIndex(facts.defUseChains);
    }
    
    return optimized;
}
```

### 2. 缓存策略
```javascript
// AI工具的缓存约定
function getCachedFacts(filePath, fileHash) {
    var cacheKey = `${filePath}_${fileHash}`;
    var cached = cache.get(cacheKey);
    
    if (cached && cached.timestamp > Date.now() - 3600000) { // 1小时有效期
        return cached.facts;
    }
    
    return null;
}

function setCachedFacts(filePath, fileHash, facts) {
    var cacheKey = `${filePath}_${fileHash}`;
    cache.set(cacheKey, {
        facts: facts,
        timestamp: Date.now()
    });
}
```

## 🚨 错误处理约定

### 1. 标准错误类型
```javascript
// Stage 5标准错误类型定义
var ERROR_TYPES = {
    'PARSE_ERROR': {
        severity: 'error',
        recoverable: false,
        message: '文件解析失败，检查语法是否正确'
    },
    'SYMBOL_RESOLUTION_ERROR': {
        severity: 'warning', 
        recoverable: true,
        message: '符号解析失败，可能存在作用域问题'
    },
    'CONFIDANCE_CALCULATION_ERROR': {
        severity: 'info',
        recoverable: true, 
        message: '置信度计算失败，使用默认值'
    },
    'MEMORY_LIMIT_ERROR': {
        severity: 'error',
        recoverable: false,
        message: '内存不足，尝试分析较小文件'
    }
};
```

### 2. 恢复策略
```javascript
// AI工具的错误恢复策略
function recoverFromError(error, context) {
    var errorType = identifyErrorType(error);
    var strategy = ERROR_TYPES[errorType];
    
    if (!strategy) {
        return { success: false, message: 'Unknown error type' };
    }
    
    if (strategy.recoverable) {
        return {
            success: true,
            message: strategy.message,
            fallbackResult: generateFallbackResult(context)
        };
    }
    
    return {
        success: false,
        message: strategy.message,
        shouldAbort: true
    };
}
```

## 📝 最佳实践

### 1. 数据安全
- 始终验证输入数据的完整性
- 对敏感代码内容进行适当过滤
- 避免在日志中输出完整代码内容

### 2. 性能考虑
- 对大型项目使用分块处理
- 实现智能缓存避免重复分析
- 监控内存使用，及时清理

### 3. 用户体验
- 提供清晰的错误信息和恢复建议
- 对分析结果进行合理的优先级排序
- 给出可操作的具体建议

### 4. 可维护性
- 遵循标准的数据格式约定
- 实现模块化的错误处理
- 保持API的向后兼容性

---

**文档版本**: v1.0  
**最后更新**: 2025年12月16日  
**适用对象**: AI工具开发者、Cline插件开发者、自动化工具开发者
