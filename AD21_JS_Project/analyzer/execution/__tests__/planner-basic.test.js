/**
 * Action Planner Basic Tests
 * Execution层基础功能测试
 * 
 * 验证：InterpretationResult → ExecutionPlan 的完整转换
 */

var ActionPlanner = require("../action-planner");
var PlanTypes = require("../plan-types");

/**
 * 测试数据构造器
 */
function createMockInterpretationResult() {
  return {
    actions: [
      {
        action: "safe-remove",
        symbol: "deadVariable",
        risk: "low",
        confidence: "high",
        reason: "Symbol defined but never used with high confidence, safe to remove",
        evidence: {
          file: "test.js",
          line: 3,
          type: "VariableDeclaration"
        }
      },
      {
        action: "define-variable",
        symbol: "missingVar",
        risk: "medium",
        confidence: "high",
        reason: "Variable used but never defined",
        evidence: {
          file: "test.js",
          line: 10,
          type: "read"
        }
      }
    ],
    warnings: [
      {
        type: "unused-symbol-medium",
        symbol: "maybeUnused",
        risk: "medium",
        reason: "Symbol appears to be unused but confidence is medium",
        location: {
          file: "test.js",
          line: 7
        }
      }
    ],
    errors: [
      {
        type: "undefined-use",
        symbol: "undefinedVar",
        risk: "critical",
        reason: "Variable used but never defined",
        location: {
          file: "test.js",
          line: 15
        },
        suggestions: [
          {
            action: "define-variable",
            description: "Define variable before use"
          }
        ]
      }
    ],
    meta: {
      ruleCount: 3,
      generatedAt: new Date().toISOString()
    }
  };
}

/**
 * 测试工具函数
 */
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message + ": Expected '" + expected + "', got '" + actual + "'");
  }
}

function assertArrayLength(array, expectedLength, message) {
  if (!array || array.length !== expectedLength) {
    throw new Error(message + ": Expected array length " + expectedLength + ", got " + (array ? array.length : "null"));
  }
}

function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message + ": Expected true, got false");
  }
}

function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log("✅ " + testName);
    return true;
  } catch (error) {
    console.log("❌ " + testName + ": " + error.message);
    return false;
  }
}

/**
 * 测试用例
 */

function testBasicPlanCreation() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  // 验证基本结构
  assertTrue(typeof plan === "object", "Plan should be object");
  assertArrayLength(plan.steps, 4, "Should have 4 steps (2 actions + 1 warning + 1 error)");
  assertTrue(typeof plan.meta === "object", "Should have meta");
  assertTrue(typeof plan.riskSummary === "object", "Should have risk summary");
  assertTrue(typeof plan.statistics === "object", "Should have statistics");
}

function testActionToStepConversion() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  // 验证Actions转换为Steps
  var removeSteps = plan.steps.filter(function(step) {
    return step.type === PlanTypes.StepType.REMOVE_SYMBOL;
  });
  var defineSteps = plan.steps.filter(function(step) {
    return step.type === PlanTypes.StepType.DEFINE_VARIABLE;
  });
  
  assertArrayLength(removeSteps, 1, "Should have 1 remove-symbol step");
  assertArrayLength(defineSteps, 1, "Should have 1 define-variable step");
  
  // 验证remove步骤
  var removeStep = removeSteps[0];
  assertEqual(removeStep.target.symbol, "deadVariable", "Should target correct symbol");
  assertEqual(removeStep.risk, PlanTypes.RiskLevel.LOW, "Should have low risk");
  assertEqual(removeStep.confidence, "high", "Should have high confidence");
  assertTrue(removeStep.reversible, "Should be reversible");
}

function testWarningAndErrorHandling() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  // 验证Warnings转为Steps
  var commentSteps = plan.steps.filter(function(step) {
    return step.type === PlanTypes.StepType.ADD_COMMENT;
  });
  
  assertArrayLength(commentSteps, 2, "Should have 2 comment steps (1 warning + 1 error)");
  
  // 验证warning step
  var warningStep = commentSteps.find(function(step) {
    return step.description.indexOf("warning") !== -1;
  });
  assertTrue(!!warningStep, "Should have warning comment step");
  assertEqual(warningStep.risk, PlanTypes.RiskLevel.LOW, "Warning should be low risk");
  
  // 验证error step
  var errorStep = commentSteps.find(function(step) {
    return step.description.indexOf("error") !== -1;
  });
  assertTrue(!!errorStep, "Should have error comment step");
  assertEqual(errorStep.risk, PlanTypes.RiskLevel.MEDIUM, "Error should be medium risk");
}

function testRiskAssessmentAndSorting() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  // 验证风险级别排序（低风险优先）
  var lowRiskSteps = plan.steps.filter(function(step) {
    return step.risk === PlanTypes.RiskLevel.LOW;
  });
  var mediumRiskSteps = plan.steps.filter(function(step) {
    return step.risk === PlanTypes.RiskLevel.MEDIUM;
  });
  var criticalRiskSteps = plan.steps.filter(function(step) {
    return step.risk === PlanTypes.RiskLevel.CRITICAL;
  });
  
  assertArrayLength(lowRiskSteps, 2, "Should have 2 low risk steps (1 action + 1 warning)");
  assertArrayLength(mediumRiskSteps, 2, "Should have 2 medium risk steps (1 action + 1 error)");
  assertArrayLength(criticalRiskSteps, 0, "Should have 0 critical risk steps (errors become medium comment steps)");
  
  // 验证排序：低风险步骤应该在前
  var firstLowRiskIndex = plan.steps.findIndex(function(step) {
    return step.risk === PlanTypes.RiskLevel.LOW;
  });
  var firstMediumRiskIndex = plan.steps.findIndex(function(step) {
    return step.risk === PlanTypes.RiskLevel.MEDIUM;
  });
  
  assertTrue(firstLowRiskIndex < firstMediumRiskIndex, "Low risk steps should come before medium risk");
}

function testRiskSummaryCalculation() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  // 验证风险摘要
  assertEqual(plan.riskSummary.level, PlanTypes.RiskLevel.MEDIUM, "Overall risk should be medium (no critical steps)");
  assertEqual(plan.riskSummary.blockers, 0, "Should have 0 blockers (errors become medium comment steps)");
  assertEqual(plan.riskSummary.totalSteps, 4, "Should have 4 total steps");
  assertTrue(plan.riskSummary.reversibleSteps > 0, "Should have reversible steps");
}

function testPlanValidation() {
  var validInterpretationResult = createMockInterpretationResult();
  var validPlan = ActionPlanner.createPlan(validInterpretationResult);
  
  var validation = PlanTypes.validateExecutionPlan(validPlan);
  assertTrue(validation.valid, "Valid plan should pass validation");
  assertArrayLength(validation.errors, 0, "Valid plan should have no validation errors");
  
  // 测试无效计划
  var invalidPlan = {
    steps: [],
    riskSummary: { level: PlanTypes.RiskLevel.LOW },
    meta: { id: "test", createdAt: new Date().toISOString(), version: "1.0.0", source: "test" }
  };
  
  var invalidValidation = PlanTypes.validateExecutionPlan(invalidPlan);
  assertTrue(!invalidValidation.valid, "Empty plan should fail validation");
  assertArrayLength(invalidValidation.errors, 1, "Empty plan should have 1 validation error");
}

function testPlanSimulation() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  var simulation = ActionPlanner.simulatePlan(plan);
  
  // 验证模拟结果
  assertEqual(simulation.planId, plan.meta.id, "Should reference correct plan ID");
  assertEqual(simulation.mode, "simulate", "Should be in simulate mode");
  assertArrayLength(simulation.steps, plan.steps.length, "Should simulate all steps");
  assertArrayLength(simulation.impact.filesAffected, 1, "Should affect 1 file");
  assertArrayLength(simulation.impact.symbolsAffected, 4, "Should affect 4 symbols");
  assertTrue(simulation.summary.estimatedDuration > 0, "Should have estimated duration");
}

function testPlanStatistics() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  var stats = ActionPlanner.getPlanStatistics(plan);
  
  // 验证概览信息
  assertEqual(stats.overview.totalSteps, 4, "Should have 4 total steps");
  assertEqual(stats.overview.riskLevel, PlanTypes.RiskLevel.MEDIUM, "Should be medium risk");
  assertEqual(stats.overview.blockers, 0, "Should have 0 blockers");
  
  // 验证分布信息
  assertTrue(typeof stats.distribution.byType === "object", "Should have type distribution");
  assertTrue(typeof stats.distribution.byRisk === "object", "Should have risk distribution");
  
  // 验证影响信息
  assertEqual(stats.impact.filesAffected, 1, "Should affect 1 file");
  assertEqual(stats.impact.symbolsAffected, 4, "Should affect 4 symbols");
  
  // 验证执行信息
  assertEqual(stats.execution.mode, "dry-run", "Should be in dry-run mode");
  assertTrue(stats.execution.batchEnabled, "Should have batch enabled");
  assertTrue(stats.execution.rollbackEnabled, "Should have rollback enabled");
}

function testExecutionSafetyCheck() {
  var interpretationResult = createMockInterpretationResult();
  var plan = ActionPlanner.createPlan(interpretationResult);
  
  var safety = ActionPlanner.checkExecutionSafety(plan);
  
  // 验证安全检查结果
  assertTrue(safety.safe, "Plan with medium risk should be safe");
  assertArrayLength(safety.blockers, 0, "Should have 0 blockers (no critical steps)");
  assertArrayLength(safety.warnings, 1, "Should have 1 warning (medium risk steps)");
  assertArrayLength(safety.recommendations, 1, "Should have 1 recommendation");
  
  // 测试安全计划
  var safeInterpretationResult = {
    actions: [
      {
        action: "safe-remove",
        symbol: "unusedVar",
        risk: "low",
        confidence: "high",
        reason: "Safe to remove"
      }
    ],
    warnings: [],
    errors: [],
    meta: { ruleCount: 1 }
  };
  
  var safePlan = ActionPlanner.createPlan(safeInterpretationResult);
  var safeCheck = ActionPlanner.checkExecutionSafety(safePlan);
  
  assertTrue(safeCheck.safe, "Low risk plan should be safe");
  assertArrayLength(safeCheck.blockers, 0, "Safe plan should have no blockers");
}

function testEmptyInputHandling() {
  var emptyResult = {
    actions: [],
    warnings: [],
    errors: [],
    meta: { ruleCount: 0 }
  };
  
  try {
    var plan = ActionPlanner.createPlan(emptyResult);
    // 应该创建空计划但验证会失败
    assertTrue(false, "Should throw error for empty plan");
  } catch (error) {
    assertTrue(error.message.indexOf("Invalid execution plan") !== -1, "Should throw validation error");
  }
}

/**
 * 测试运行器
 */
function runAllTests() {
  console.log("🧪 Action Planner Basic Tests\n");
  
  var tests = [
    "Basic Plan Creation",
    "Action to Step Conversion",
    "Warning and Error Handling",
    "Risk Assessment and Sorting",
    "Risk Summary Calculation",
    "Plan Validation",
    "Plan Simulation",
    "Plan Statistics",
    "Execution Safety Check",
    "Empty Input Handling"
  ];
  
  var testFunctions = [
    testBasicPlanCreation,
    testActionToStepConversion,
    testWarningAndErrorHandling,
    testRiskAssessmentAndSorting,
    testRiskSummaryCalculation,
    testPlanValidation,
    testPlanSimulation,
    testPlanStatistics,
    testExecutionSafetyCheck,
    testEmptyInputHandling
  ];
  
  var passed = 0;
  var total = tests.length;
  
  for (var i = 0; i < total; i++) {
    if (runTest(tests[i], testFunctions[i])) {
      passed++;
    }
  }
  
  console.log("\n📊 Test Results: " + passed + "/" + total + " passed");
  
  if (passed === total) {
    console.log("🎉 All tests passed! Action Planner is working correctly.");
    return true;
  } else {
    console.log("❌ Some tests failed. Please check the implementation.");
    return false;
  }
}

// 如果直接运行此文件，执行测试
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests: runAllTests,
  createMockInterpretationResult: createMockInterpretationResult
};
