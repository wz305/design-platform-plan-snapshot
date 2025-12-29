/**
 * Interpretation Basic Test
 * Stage 6 基础功能测试
 * 
 * 验证：Facts → Interpretation → Action 的完整闭环
 */

var Interpreter = require("../interpreter");
var RuleContext = require("../rule-context");

/**
 * 测试数据构造器
 */
function createMockStage5Facts(overrides) {
  var defaults = {
    unusedSymbols: [
      {
        name: "unusedVar",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      },
      {
        name: "maybeUnused",
        confidence: "medium",
        line: 5,
        type: "VariableDeclaration"
      },
      {
        name: "entryPoint",
        confidence: "high",
        line: 10,
        type: "FunctionDeclaration"
      }
    ],
    undefinedUses: [
      {
        name: "undefinedVar",
        line: 7,
        type: "read",
        context: "variable"
      },
      {
        name: "missingFunction",
        line: 12,
        type: "call",
        context: "function"
      }
    ],
    defUseAnalysis: []
  };
  
  // 合并覆盖数据
  if (overrides) {
    for (var key in overrides) {
      defaults[key] = overrides[key];
    }
  }
  
  return defaults;
}

function createMockStage4Meta(overrides) {
  var defaults = {
    entryPoints: ["entryPoint", "Button1Click"],
    exports: ["publicAPI", "helper"],
    moduleMap: {
      "externalSymbol": "external",
      "unusedVar": "internal"
    },
    moduleGraph: {
      "unusedVar": [],
      "externalSymbol": ["moduleA", "moduleB"]
    }
  };
  
  if (overrides) {
    for (var key in overrides) {
      defaults[key] = overrides[key];
    }
  }
  
  return defaults;
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

function testInterpreterBasicFlow() {
  // 创建包含跨模块符号的测试数据
  var facts = createMockStage5Facts({
    unusedSymbols: [
      {
        name: "unusedVar",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      },
      {
        name: "maybeUnused",
        confidence: "medium",
        line: 5,
        type: "VariableDeclaration"
      },
      {
        name: "entryPoint",
        confidence: "high",
        line: 10,
        type: "FunctionDeclaration"
      },
      {
        name: "externalSymbol",
        confidence: "high",
        line: 15,
        type: "VariableDeclaration"
      }
    ]
  });
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  
  // 验证结果结构
  assertEqual(typeof result, "object", "Result should be object");
  assertArrayLength(result.actions, 2, "Should have 2 actions");
  assertArrayLength(result.warnings, 3, "Should have 3 warnings");
  assertArrayLength(result.errors, 2, "Should have 2 errors");
  assertEqual(result.meta.ruleCount, 3, "Should have applied 3 rules");
}

function testUnusedSymbolRule() {
  var facts = createMockStage5Facts();
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  
  // 验证高置信度未使用符号生成action
  var safeRemoveAction = null;
  for (var i = 0; i < result.actions.length; i++) {
    if (result.actions[i].action === "safe-remove") {
      safeRemoveAction = result.actions[i];
      break;
    }
  }
  
  if (!safeRemoveAction) {
    throw new Error("Expected safe-remove action for high confidence unused symbol");
  }
  
  assertEqual(safeRemoveAction.symbol, "unusedVar", "Should target unusedVar");
  assertEqual(safeRemoveAction.risk, "low", "Should be low risk");
  assertEqual(safeRemoveAction.confidence, "high", "Should be high confidence");
}

function testUndefinedUseRule() {
  var facts = createMockStage5Facts();
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  
  // 验证未定义使用生成错误
  assertArrayLength(result.errors, 2, "Should have 2 undefined use errors");
  
  var undefinedError = result.errors[0];
  assertEqual(undefinedError.type, "undefined-use", "Should be undefined-use type");
  assertEqual(undefinedError.risk, "critical", "Should be critical risk");
}

function testCrossModuleRule() {
  // 创建包含跨模块符号的测试数据
  var facts = createMockStage5Facts({
    unusedSymbols: [
      {
        name: "externalSymbol",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      }
    ]
  });
  
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  
  // 验证跨模块符号生成警告
  var crossModuleWarning = null;
  for (var i = 0; i < result.warnings.length; i++) {
    if (result.warnings[i].type.indexOf("cross-module") === 0) {
      crossModuleWarning = result.warnings[i];
      break;
    }
  }
  
  if (!crossModuleWarning) {
    throw new Error("Expected cross-module warning");
  }
  
  assertEqual(crossModuleWarning.symbol, "externalSymbol", "Should target externalSymbol");
  assertEqual(crossModuleWarning.risk, "medium", "Should be medium risk");
}

function testStatisticsFunction() {
  // 创建包含跨模块符号的测试数据以匹配预期数量
  var facts = createMockStage5Facts({
    unusedSymbols: [
      {
        name: "unusedVar",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      },
      {
        name: "maybeUnused",
        confidence: "medium",
        line: 5,
        type: "VariableDeclaration"
      },
      {
        name: "entryPoint",
        confidence: "high",
        line: 10,
        type: "FunctionDeclaration"
      },
      {
        name: "externalSymbol",
        confidence: "high",
        line: 15,
        type: "VariableDeclaration"
      }
    ]
  });
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  var stats = Interpreter.getStatistics(result);
  
  assertEqual(stats.totalActions, 2, "Should have 2 total actions");
  assertEqual(stats.totalWarnings, 3, "Should have 3 total warnings");
  assertEqual(stats.totalErrors, 2, "Should have 2 total errors");
  assertEqual(stats.criticalIssues, 2, "Should have 2 critical issues");
  assertEqual(stats.ruleCount, 3, "Should have 3 rules applied");
}

function testHasBlockingIssuesFunction() {
  // 使用包含跨模块符号的测试数据
  var facts = createMockStage5Facts({
    unusedSymbols: [
      {
        name: "unusedVar",
        confidence: "high",
        line: 3,
        type: "VariableDeclaration"
      },
      {
        name: "maybeUnused",
        confidence: "medium",
        line: 5,
        type: "VariableDeclaration"
      },
      {
        name: "entryPoint",
        confidence: "high",
        line: 10,
        type: "FunctionDeclaration"
      },
      {
        name: "externalSymbol",
        confidence: "high",
        line: 15,
        type: "VariableDeclaration"
      }
    ]
  });
  var meta = createMockStage4Meta();
  
  var result = Interpreter.interpret(facts, meta);
  var hasBlocking = Interpreter.hasBlockingIssues(result);
  
  assertEqual(hasBlocking, true, "Should have blocking issues (critical errors)");
}

function testEmptyInput() {
  var result = Interpreter.interpret({}, {});
  
  assertArrayLength(result.actions, 0, "Empty input should have no actions");
  assertArrayLength(result.warnings, 0, "Empty input should have no warnings");
  assertArrayLength(result.errors, 0, "Empty input should have no errors");
  assertEqual(result.meta.ruleCount, 3, "Should still apply 3 rules");
}

function testRuleContext() {
  var facts = createMockStage5Facts();
  var meta = createMockStage4Meta();
  
  var ctx = new RuleContext(facts, meta);
  
  assertArrayLength(ctx.getUnusedSymbols(), 3, "Should get 3 unused symbols");
  assertArrayLength(ctx.getUndefinedUses(), 2, "Should get 2 undefined uses");
  assertEqual(ctx.isCrossModule("externalSymbol"), true, "Should detect cross-module symbol");
  assertEqual(ctx.isCrossModule("unusedVar"), false, "Should not treat unusedVar as cross-module");
  assertEqual(ctx.isEntryFunction("entryPoint"), true, "Should detect entry point");
  assertEqual(ctx.isEntryFunction("unusedVar"), false, "Should not detect unusedVar as entry point");
}

/**
 * 测试运行器
 */
function runAllTests() {
  console.log("🧪 Stage 6 Interpretation Basic Tests\n");
  
  var tests = [
    "Basic Interpretation Flow",
    "Unused Symbol Rule", 
    "Undefined Use Rule",
    "Cross Module Rule",
    "Statistics Function",
    "Has Blocking Issues Function",
    "Empty Input Handling",
    "Rule Context Functions"
  ];
  
  var testFunctions = [
    testInterpreterBasicFlow,
    testUnusedSymbolRule,
    testUndefinedUseRule, 
    testCrossModuleRule,
    testStatisticsFunction,
    testHasBlockingIssuesFunction,
    testEmptyInput,
    testRuleContext
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
    console.log("🎉 All tests passed! Stage 6 Interpretation is working correctly.");
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
  createMockStage5Facts: createMockStage5Facts,
  createMockStage4Meta: createMockStage4Meta
};
