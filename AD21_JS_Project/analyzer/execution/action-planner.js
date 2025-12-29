/**
 * Action Planner
 * 将Stage 6 InterpretationResult转换为ExecutionPlan
 * 
 * 核心职责：
 * 1. Action → ExecutionStep的映射
 * 2. 风险评估和优先级排序
 * 3. 执行计划生成和验证
 * 4. 支持dry-run/simulate/execute模式
 */

var PlanTypes = require("./plan-types");

/**
 * Action Planner主接口
 */
var ActionPlanner = {
    /**
     * 将InterpretationResult转换为ExecutionPlan
     * @param {Object} interpretationResult - Stage 6的解释结果
     * @param {Object} options - 规划选项
     * @returns {Object} ExecutionPlan
     */
    createPlan: function(interpretationResult, options) {
        options = options || {};
        
        console.log("🎯 开始规划ExecutionPlan...");
        console.log("   输入Actions:", interpretationResult.actions.length);
        console.log("   输入Warnings:", interpretationResult.warnings.length);
        console.log("   输入Errors:", interpretationResult.errors.length);
        
        // 第一步：转换Actions为ExecutionSteps
        var steps = this._convertActionsToSteps(interpretationResult.actions, options);
        
        // 第二步：处理Warnings和Errors（转为information steps）
        var infoSteps = this._convertIssuesToSteps(interpretationResult.warnings, interpretationResult.errors);
        steps = steps.concat(infoSteps);
        
        // 第三步：风险评估和优先级排序
        steps = this._assessAndSortSteps(steps);
        
        // 第四步：生成执行计划
        var riskSummary = this._calculateRiskSummary(steps);
        var plan = PlanTypes.createExecutionPlan({
            steps: steps,
            riskSummary: riskSummary,
            mode: options.mode || "dry-run"
        });
        
        // 第五步：验证计划有效性
        var validation = PlanTypes.validateExecutionPlan(plan);
        if (!validation.valid) {
            console.log("❌ ExecutionPlan验证失败:", validation.errors);
            throw new Error("Invalid execution plan: " + validation.errors.join(", "));
        }
        
        console.log("✅ ExecutionPlan生成完成:");
        console.log("   总步骤数:", plan.steps.length);
        console.log("   风险级别:", plan.riskSummary.level);
        console.log("   阻断问题:", plan.riskSummary.blockers);
        
        return plan;
    },
    
    /**
     * 模拟执行计划（不实际修改代码）
     * @param {Object} plan - ExecutionPlan
     * @returns {Object} 模拟结果
     */
    simulatePlan: function(plan) {
        console.log("🔍 模拟执行ExecutionPlan...");
        
        var simulation = {
            planId: plan.meta.id,
            mode: "simulate",
            startTime: new Date().toISOString(),
            
            steps: [],
            summary: {
                total: plan.steps.length,
                byType: {},
                byRisk: {},
                estimatedDuration: 0
            },
            
            impact: {
                filesAffected: [],
                symbolsAffected: [],
                potentialIssues: []
            }
        };
        
        // 逐步骤模拟
        plan.steps.forEach(function(step, index) {
            var stepResult = this._simulateStep(step, index);
            simulation.steps.push(stepResult);
            
            // 统计信息更新
            simulation.summary.byType[step.type] = (simulation.summary.byType[step.type] || 0) + 1;
            simulation.summary.byRisk[step.risk] = (simulation.summary.byRisk[step.risk] || 0) + 1;
            simulation.summary.estimatedDuration += stepResult.estimatedDuration || 0;
            
            // 影响范围统计
            if (step.target.file && simulation.impact.filesAffected.indexOf(step.target.file) === -1) {
                simulation.impact.filesAffected.push(step.target.file);
            }
            if (step.target.symbol && simulation.impact.symbolsAffected.indexOf(step.target.symbol) === -1) {
                simulation.impact.symbolsAffected.push(step.target.symbol);
            }
            
            if (stepResult.potentialIssues && stepResult.potentialIssues.length > 0) {
                simulation.impact.potentialIssues = simulation.impact.potentialIssues.concat(stepResult.potentialIssues);
            }
        }.bind(this));
        
        console.log("✅ 模拟完成:");
        console.log("   模拟步骤数:", simulation.steps.length);
        console.log("   预估耗时:", simulation.summary.estimatedDuration + "ms");
        console.log("   影响文件数:", simulation.impact.filesAffected.length);
        
        return simulation;
    },
    
    /**
     * 获取执行计划统计信息
     * @param {Object} plan - ExecutionPlan
     * @returns {Object} 统计信息
     */
    getPlanStatistics: function(plan) {
        return {
            overview: {
                totalSteps: plan.steps.length,
                riskLevel: plan.riskSummary.level,
                blockers: plan.riskSummary.blockers,
                reversibleSteps: plan.riskSummary.reversibleSteps,
                requiresApproval: plan.riskSummary.approvalRequired
            },
            
            distribution: {
                byType: plan.statistics.stepsByType,
                byRisk: plan.statistics.stepsByRisk
            },
            
            impact: {
                filesAffected: plan.statistics.estimatedImpact.filesAffected.length,
                symbolsAffected: plan.statistics.estimatedImpact.symbolsAffected.length,
                highRiskSteps: plan.statistics.estimatedImpact.highRiskCount,
                criticalSteps: plan.statistics.estimatedImpact.criticalCount
            },
            
            execution: {
                mode: plan.execution.mode,
                batchEnabled: plan.execution.batchEnabled,
                rollbackEnabled: plan.execution.rollbackEnabled
            }
        };
    },
    
    /**
     * 检查执行计划是否可以安全执行
     * @param {Object} plan - ExecutionPlan
     * @returns {Object} 安全检查结果
     */
    checkExecutionSafety: function(plan) {
        var safety = {
            safe: true,
            blockers: [],
            warnings: [],
            recommendations: []
        };
        
        // 检查阻断性问题
        if (plan.riskSummary.blockers > 0) {
            safety.safe = false;
            safety.blockers.push("存在 " + plan.riskSummary.blockers + " 个阻断性问题");
        }
        
        // 检查高风险步骤
        var highRiskSteps = plan.steps.filter(function(step) {
            return step.risk === PlanTypes.RiskLevel.HIGH || step.risk === PlanTypes.RiskLevel.CRITICAL;
        });
        
        if (highRiskSteps.length > 0) {
            safety.warnings.push("包含 " + highRiskSteps.length + " 个高风险步骤");
            safety.recommendations.push("建议先执行dry-run模式验证");
        }
        
        // 检查不可回滚步骤
        var irreversibleSteps = plan.steps.filter(function(step) {
            return !step.reversible;
        });
        
        if (irreversibleSteps.length > 0) {
            safety.warnings.push("包含 " + irreversibleSteps.length + " 个不可回滚步骤");
            safety.recommendations.push("请仔细审查这些步骤");
        }
        
        return safety;
    },
    
    /**
     * 转换Actions为ExecutionSteps
     * @private
     */
    _convertActionsToSteps: function(actions, options) {
        var steps = [];
        
        actions.forEach(function(action) {
            var step = this._convertActionToStep(action, options);
            if (step) {
                steps.push(step);
            }
        }.bind(this));
        
        return steps;
    },
    
    /**
     * 单个Action转换为ExecutionStep
     * @private
     */
    _convertActionToStep: function(action, options) {
        var stepOptions = {
            type: this._mapActionToStepType(action.action),
            description: this._generateStepDescription(action),
            target: {
                symbol: action.symbol,
                file: action.evidence && action.evidence.file || "",
                line: action.evidence && action.evidence.line || 0,
                column: action.evidence && action.evidence.column || 0
            },
            risk: this._mapRiskLevel(action.risk),
            confidence: action.confidence,
            reason: action.reason,
            reversible: this._isReversibleAction(action.action),
            requiresApproval: this._requiresApproval(action),
            context: {
                originalCode: action.evidence && action.evidence.originalCode || "",
                dependencies: action.evidence && action.evidence.dependencies || []
            }
        };
        
        return PlanTypes.createExecutionStep(stepOptions);
    },
    
    /**
     * 转换Warnings和Errors为信息步骤
     * @private
     */
    _convertIssuesToSteps: function(warnings, errors) {
        var steps = [];
        
        // 处理warnings
        warnings.forEach(function(warning) {
            var step = PlanTypes.createExecutionStep({
                type: PlanTypes.StepType.ADD_COMMENT,
                description: "Add warning comment: " + warning.reason,
                target: {
                    symbol: warning.symbol,
                    file: warning.location && warning.location.file || "",
                    line: warning.location && warning.location.line || 0
                },
                risk: PlanTypes.RiskLevel.LOW,
                confidence: "medium",
                reason: warning.reason,
                reversible: true,
                requiresApproval: false,
                context: {
                    originalCode: "// WARNING: " + warning.reason
                }
            });
            steps.push(step);
        });
        
        // 处理errors
        errors.forEach(function(error) {
            var step = PlanTypes.createExecutionStep({
                type: PlanTypes.StepType.ADD_COMMENT,
                description: "Add error comment: " + error.reason,
                target: {
                    symbol: error.symbol,
                    file: error.location && error.location.file || "",
                    line: error.location && error.location.line || 0
                },
                risk: PlanTypes.RiskLevel.MEDIUM,
                confidence: "high",
                reason: error.reason,
                reversible: true,
                requiresApproval: false,
                context: {
                    originalCode: "// ERROR: " + error.reason + " (requires fix)"
                }
            });
            steps.push(step);
        });
        
        return steps;
    },
    
    /**
     * 风险评估和优先级排序
     * @private
     */
    _assessAndSortSteps: function(steps) {
        // 按风险级别和置信度排序
        var riskOrder = {
            "low": 1,
            "medium": 2,
            "high": 3,
            "critical": 4
        };
        
        var confidenceOrder = {
            "low": 1,
            "medium": 2,
            "high": 3
        };
        
        steps.sort(function(a, b) {
            // 首先按风险级别排序（低风险优先）
            var riskDiff = riskOrder[a.risk] - riskOrder[b.risk];
            if (riskDiff !== 0) {
                return riskDiff;
            }
            
            // 然后按置信度排序（高置信度优先）
            var confidenceDiff = confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
            if (confidenceDiff !== 0) {
                return confidenceDiff;
            }
            
            // 最后按类型排序
            return a.type.localeCompare(b.type);
        });
        
        return steps;
    },
    
    /**
     * 计算风险摘要
     * @private
     */
    _calculateRiskSummary: function(steps) {
        var summary = {
            level: PlanTypes.RiskLevel.LOW,
            blockers: 0,
            totalSteps: steps.length,
            reversibleSteps: 0,
            approvalRequired: 0
        };
        
        // 统计各项指标
        steps.forEach(function(step) {
            if (step.risk === PlanTypes.RiskLevel.CRITICAL) {
                summary.blockers++;
            }
            
            if (step.reversible) {
                summary.reversibleSteps++;
            }
            
            if (step.requiresApproval) {
                summary.approvalRequired++;
            }
        });
        
        // 确定整体风险级别（最高风险级别决定整体级别）
        var hasCritical = steps.some(function(step) { return step.risk === PlanTypes.RiskLevel.CRITICAL; });
        var hasHigh = steps.some(function(step) { return step.risk === PlanTypes.RiskLevel.HIGH; });
        var hasMedium = steps.some(function(step) { return step.risk === PlanTypes.RiskLevel.MEDIUM; });
        
        if (hasCritical) {
            summary.level = PlanTypes.RiskLevel.CRITICAL;
        } else if (hasHigh) {
            summary.level = PlanTypes.RiskLevel.HIGH;
        } else if (hasMedium) {
            summary.level = PlanTypes.RiskLevel.MEDIUM;
        } else {
            summary.level = PlanTypes.RiskLevel.LOW;
        }
        
        return PlanTypes.createRiskSummary(summary);
    },
    
    /**
     * 映射Action类型到Step类型
     * @private
     */
    _mapActionToStepType: function(action) {
        var mapping = {
            "safe-remove": PlanTypes.StepType.REMOVE_SYMBOL,
            "define-variable": PlanTypes.StepType.DEFINE_VARIABLE,
            "remove-usage": PlanTypes.StepType.REMOVE_USAGE,
            "rename-symbol": PlanTypes.StepType.RENAME_SYMBOL
        };
        
        return mapping[action] || PlanTypes.StepType.ADD_COMMENT;
    },
    
    /**
     * 映射风险级别
     * @private
     */
    _mapRiskLevel: function(risk) {
        if (risk === "critical") return PlanTypes.RiskLevel.CRITICAL;
        if (risk === "high") return PlanTypes.RiskLevel.HIGH;
        if (risk === "medium") return PlanTypes.RiskLevel.MEDIUM;
        return PlanTypes.RiskLevel.LOW;
    },
    
    /**
     * 生成步骤描述
     * @private
     */
    _generateStepDescription: function(action) {
        var descriptions = {
            "safe-remove": "Remove unused symbol: " + action.symbol,
            "define-variable": "Define missing variable: " + action.symbol,
            "remove-usage": "Remove undefined usage: " + action.symbol,
            "rename-symbol": "Rename symbol: " + action.symbol
        };
        
        return descriptions[action.action] || "Process symbol: " + action.symbol;
    },
    
    /**
     * 判断Action是否可回滚
     * @private
     */
    _isReversibleAction: function(action) {
        var reversibleActions = ["safe-remove", "add-comment", "rename-symbol"];
        return reversibleActions.indexOf(action) !== -1;
    },
    
    /**
     * 判断Action是否需要人工确认
     * @private
     */
    _requiresApproval: function(action) {
        // 高风险和关键风险需要确认
        return action.risk === "high" || action.risk === "critical";
    },
    
    /**
     * 模拟单个步骤
     * @private
     */
    _simulateStep: function(step, index) {
        return {
            stepId: step.id,
            index: index,
            type: step.type,
            status: "simulated",
            estimatedDuration: this._estimateStepDuration(step),
            potentialIssues: this._identifyPotentialIssues(step),
            impact: {
                files: step.target.file ? [step.target.file] : [],
                symbols: step.target.symbol ? [step.target.symbol] : []
            }
        };
    },
    
    /**
     * 估算步骤执行时间
     * @private
     */
    _estimateStepDuration: function(step) {
        var durations = {
            "remove-symbol": 10,
            "define-variable": 15,
            "remove-usage": 8,
            "add-comment": 5,
            "rename-symbol": 20
        };
        
        return durations[step.type] || 10;
    },
    
    /**
     * 识别潜在问题
     * @private
     */
    _identifyPotentialIssues: function(step) {
        var issues = [];
        
        if (step.risk === PlanTypes.RiskLevel.CRITICAL) {
            issues.push("Critical risk step - may break functionality");
        }
        
        if (!step.reversible) {
            issues.push("Irreversible operation - cannot rollback");
        }
        
        if (step.requiresApproval) {
            issues.push("Manual approval required");
        }
        
        return issues;
    }
};

// 导出Action Planner
module.exports = ActionPlanner;
