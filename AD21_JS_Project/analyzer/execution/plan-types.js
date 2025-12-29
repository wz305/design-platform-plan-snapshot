/**
 * Execution Plan Types
 * Execution层核心数据结构定义
 * 
 * 核心理念：ExecutionPlan ≠ Patch
 * - ExecutionPlan是"可执行的步骤计划"
 * - 支持dry-run/approve/rollback
 * - AI/人/工具都可以消费
 */

/**
 * 执行步骤类型枚举
 */
var StepType = {
    REMOVE_SYMBOL: "remove-symbol",
    DEFINE_VARIABLE: "define-variable", 
    REMOVE_USAGE: "remove-usage",
    ADD_COMMENT: "add-comment",
    RENAME_SYMBOL: "rename-symbol"
};

/**
 * 风险级别枚举
 */
var RiskLevel = {
    LOW: "low",
    MEDIUM: "medium", 
    HIGH: "high",
    CRITICAL: "critical"
};

/**
 * 执行步骤接口
 * 每个步骤都是原子操作，支持回滚
 */
var ExecutionStep = {
    // 基本信息
    type: "",              // StepType
    id: "",                // 唯一标识符
    description: "",        // 人类可读描述
    
    // 目标定位
    target: {
        symbol: "",         // 目标符号名
        file: "",          // 文件路径
        line: 0,           // 行号
        column: 0          // 列号（可选）
    },
    
    // 执行控制
    reversible: true,       // 是否可回滚
    requiresApproval: false, // 是否需要人工确认
    
    // 风险评估
    risk: "",              // RiskLevel
    confidence: "",         // 置信度
    reason: "",            // 操作理由
    
    // 上下文信息
    context: {
        originalCode: "",    // 原始代码片段
        scope: "",          // 作用域信息
        dependencies: []     // 依赖的其他符号
    },
    
    // 回滚信息
    rollback: {
        operation: "",      // 回滚操作类型
        data: {}          // 回滚所需数据
    }
};

/**
 * 风险摘要接口
 */
var RiskSummary = {
    level: "",             // RiskLevel - 整体风险级别
    blockers: 0,           // 阻断性问题数量
    totalSteps: 0,         // 总步骤数
    reversibleSteps: 0,     // 可回滚步骤数
    approvalRequired: 0      // 需要确认的步骤数
};

/**
 * 执行计划接口
 * 整个执行计划的容器
 */
var ExecutionPlan = {
    // 元信息
    meta: {
        id: "",                 // 计划唯一ID
        createdAt: "",          // 创建时间
        version: "1.0.0",     // 计划版本
        source: "stage6-interpretation" // 数据来源
    },
    
    // 核心内容
    steps: [],               // ExecutionStep数组
    riskSummary: {},         // RiskSummary
    
    // 执行控制
    execution: {
        mode: "dry-run",      // 执行模式: dry-run/simulate/execute
        batchEnabled: true,    // 是否支持批量执行
        rollbackEnabled: true   // 是否支持回滚
    },
    
    // 统计信息
    statistics: {
        stepsByType: {},       // 按类型分组的步骤统计
        stepsByRisk: {},      // 按风险分组的步骤统计
        estimatedImpact: {}    // 预估影响范围
    }
};

/**
 * 执行结果接口
 */
var ExecutionResult = {
    // 基本信息
    success: false,          // 是否执行成功
    planId: "",            // 关联的执行计划ID
    
    // 执行详情
    executedSteps: [],       // 已执行的步骤
    failedSteps: [],         // 失败的步骤
    skippedSteps: [],        // 跳过的步骤
    
    // 影响分析
    impact: {
        filesModified: [],    // 修改的文件列表
        symbolsChanged: [],   // 变化的符号列表
        errorsGenerated: []   // 产生的错误
    },
    
    // 回滚信息
    rollback: {
        available: true,     // 是否可回滚
        data: {}           // 回滚数据
    }
};

/**
 * 工厂函数：创建执行步骤
 */
function createExecutionStep(options) {
    var step = {
        // 默认值
        type: options.type || StepType.REMOVE_SYMBOL,
        id: options.id || generateStepId(),
        description: options.description || "",
        
        target: {
            symbol: options.target && options.target.symbol || "",
            file: options.target && options.target.file || "",
            line: options.target && options.target.line || 0,
            column: options.target && options.target.column || 0
        },
        
        reversible: options.reversible !== false,
        requiresApproval: options.requiresApproval === true,
        
        risk: options.risk || RiskLevel.LOW,
        confidence: options.confidence || "high",
        reason: options.reason || "",
        
        context: {
            originalCode: options.context && options.context.originalCode || "",
            scope: options.context && options.context.scope || "",
            dependencies: options.context && options.context.dependencies || []
        },
        
        rollback: {
            operation: options.rollback && options.rollback.operation || "",
            data: options.rollback && options.rollback.data || {}
        }
    };
    
    return step;
}

/**
 * 工厂函数：创建执行计划
 */
function createExecutionPlan(options) {
    var plan = {
        meta: {
            id: options.id || generatePlanId(),
            createdAt: new Date().toISOString(),
            version: "1.0.0",
            source: options.source || "stage6-interpretation"
        },
        
        steps: options.steps || [],
        riskSummary: options.riskSummary || createRiskSummary(),
        
        execution: {
            mode: options.mode || "dry-run",
            batchEnabled: options.batchEnabled !== false,
            rollbackEnabled: options.rollbackEnabled !== false
        },
        
        statistics: options.statistics || {}
    };
    
    // 自动计算统计信息
    plan.statistics = calculateStatistics(plan);
    
    return plan;
}

/**
 * 工厂函数：创建风险摘要
 */
function createRiskSummary(options) {
    var summary = {
        level: options.level || RiskLevel.LOW,
        blockers: options.blockers || 0,
        totalSteps: options.totalSteps || 0,
        reversibleSteps: options.reversibleSteps || 0,
        approvalRequired: options.approvalRequired || 0
    };
    
    return summary;
}

/**
 * 计算执行计划统计信息
 */
function calculateStatistics(plan) {
    var stats = {
        stepsByType: {},
        stepsByRisk: {},
        estimatedImpact: {
            filesAffected: new Set(),
            symbolsAffected: new Set(),
            highRiskCount: 0,
            criticalCount: 0
        }
    };
    
    plan.steps.forEach(function(step) {
        // 按类型统计
        stats.stepsByType[step.type] = (stats.stepsByType[step.type] || 0) + 1;
        
        // 按风险统计
        stats.stepsByRisk[step.risk] = (stats.stepsByRisk[step.risk] || 0) + 1;
        
        // 影响范围统计
        if (step.target.file) {
            stats.estimatedImpact.filesAffected.add(step.target.file);
        }
        if (step.target.symbol) {
            stats.estimatedImpact.symbolsAffected.add(step.target.symbol);
        }
        
        if (step.risk === RiskLevel.HIGH) {
            stats.estimatedImpact.highRiskCount++;
        }
        if (step.risk === RiskLevel.CRITICAL) {
            stats.estimatedImpact.criticalCount++;
        }
    });
    
    // 转换Set为数组
    stats.estimatedImpact.filesAffected = Array.from(stats.estimatedImpact.filesAffected);
    stats.estimatedImpact.symbolsAffected = Array.from(stats.estimatedImpact.symbolsAffected);
    
    return stats;
}

/**
 * 生成步骤ID
 */
function generateStepId() {
    return "step_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成计划ID
 */
function generatePlanId() {
    return "plan_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * 验证执行计划的有效性
 */
function validateExecutionPlan(plan) {
    var errors = [];
    
    if (!plan.steps || plan.steps.length === 0) {
        errors.push("Execution plan must have at least one step");
    }
    
    plan.steps.forEach(function(step, index) {
        if (!step.type) {
            errors.push("Step " + index + " missing type");
        }
        if (!step.target.symbol && !step.target.file) {
            errors.push("Step " + index + " missing target");
        }
    });
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * 合并多个执行计划
 */
function mergeExecutionPlans(plans) {
    var mergedSteps = [];
    var allFiles = new Set();
    var allSymbols = new Set();
    
    plans.forEach(function(plan) {
        mergedSteps = mergedSteps.concat(plan.steps);
        plan.statistics.estimatedImpact.filesAffected.forEach(function(file) {
            allFiles.add(file);
        });
        plan.statistics.estimatedImpact.symbolsAffected.forEach(function(symbol) {
            allSymbols.add(symbol);
        });
    });
    
    return createExecutionPlan({
        steps: mergedSteps,
        source: "merged-plans"
    });
}

// 导出所有类型和工厂函数
module.exports = {
    // 枚举
    StepType: StepType,
    RiskLevel: RiskLevel,
    
    // 接口定义
    ExecutionStep: ExecutionStep,
    ExecutionPlan: ExecutionPlan,
    ExecutionResult: ExecutionResult,
    RiskSummary: RiskSummary,
    
    // 工厂函数
    createExecutionStep: createExecutionStep,
    createExecutionPlan: createExecutionPlan,
    createRiskSummary: createRiskSummary,
    
    // 工具函数
    calculateStatistics: calculateStatistics,
    validateExecutionPlan: validateExecutionPlan,
    mergeExecutionPlans: mergeExecutionPlans,
    generateStepId: generateStepId,
    generatePlanId: generatePlanId
};
