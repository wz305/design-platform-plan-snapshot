/**
 * 测试Def-Use查询API
 * 验证5个核心查询API的功能
 */

var DefUseAnalyzer = require("./semantic/def-use-analyzer");
var ASTParser = require("./ast/parser");
var fs = require("fs");

console.log("🧪 开始测试Def-Use查询API...\n");

// 测试代码
var testCode = [
    "var used = 1;",
    "var unused = 2;",
    "var ModuleA = (function(){",
    "    var privateVar = 'secret';",
    "    function privateFunc() {",
    "        return privateVar;",
    "    }",
    "    return {",
    "        publicMethod: privateFunc",
    "    };",
    "})();",
    "function test(param) {",
    "    var result = used + param;",
    "    return result;",
    "}",
    "test(10);",
    "console.log(undefinedVar);"
].join("\n");

// 创建临时文件
var testFilePath = "query-api-test.js";
fs.writeFileSync(testFilePath, testCode, "utf8");

try {
    // 解析文件
    var parseResult = ASTParser.parseFile(testFilePath);
    if (!parseResult.success) {
        console.error("❌ AST解析失败:", parseResult.error);
        process.exit(1);
    }
    
    // 执行Def-Use分析
    var defUseResult = DefUseAnalyzer.analyzeDefUse(parseResult.ast, testFilePath, []);
    if (!defUseResult.success) {
        console.error("❌ Def-Use分析失败:", defUseResult.errors);
        process.exit(1);
    }
    
    console.log("📊 分析结果概览:");
    console.log("  定义点:", defUseResult.summary.totalDefinitions);
    console.log("  使用点:", defUseResult.summary.totalUses);
    console.log("  未定义使用:", defUseResult.summary.undefinedUses);
    console.log("  未使用定义:", defUseResult.summary.unusedDefinitions);
    console.log();
    
    // 测试API 1: getDefs
    console.log("🔍 测试 getDefs():");
    var defs = DefUseAnalyzer.getDefs(defUseResult);
    console.log("  定义点数量:", defs.length);
    for (var i = 0; i < Math.min(defs.length, 5); i++) {
        var def = defs[i];
        console.log("    " + def.symbolName + " (" + def.definitionType + ") [" + def.line + ":" + def.column + "]");
    }
    if (defs.length > 5) {
        console.log("    ... 还有 " + (defs.length - 5) + " 个定义点");
    }
    console.log();
    
    // 测试API 2: getUses
    console.log("🔍 测试 getUses():");
    var uses = DefUseAnalyzer.getUses(defUseResult);
    console.log("  使用点数量:", uses.length);
    for (var j = 0; j < Math.min(uses.length, 8); j++) {
        var use = uses[j];
        console.log("    " + use.symbolName + " (" + use.useType + ") [" + use.line + ":" + use.column + "]");
    }
    if (uses.length > 8) {
        console.log("    ... 还有 " + (uses.length - 8) + " 个使用点");
    }
    console.log();
    
    // 测试API 3: getUnusedSymbols
    console.log("🔍 测试 getUnusedSymbols():");
    console.log("  所有未使用符号:");
    var allUnused = DefUseAnalyzer.getUnusedSymbols(defUseResult, "all");
    for (var k = 0; k < allUnused.length; k++) {
        var unused = allUnused[k];
        console.log("    " + unused.symbolId + " (confidence: " + unused.confidence + ")");
        for (var r = 0; r < unused.reasons.length; r++) {
            console.log("      - " + unused.reasons[r]);
        }
    }
    console.log();
    
    console.log("  高置信度未使用符号:");
    var highUnused = DefUseAnalyzer.getUnusedSymbols(defUseResult, "high");
    console.log("    数量:", highUnused.length);
    for (var h = 0; h < highUnused.length; h++) {
        console.log("    " + highUnused[h].symbolId);
    }
    console.log();
    
    console.log("  中等置信度未使用符号:");
    var mediumUnused = DefUseAnalyzer.getUnusedSymbols(defUseResult, "medium");
    console.log("    数量:", mediumUnused.length);
    for (var m = 0; m < mediumUnused.length; m++) {
        console.log("    " + mediumUnused[m].symbolId);
    }
    console.log();
    
    // 测试API 4: getUndefinedUses
    console.log("🔍 测试 getUndefinedUses():");
    var undefinedUses = DefUseAnalyzer.getUndefinedUses(defUseResult);
    console.log("  未定义使用数量:", undefinedUses.length);
    for (var u = 0; u < undefinedUses.length; u++) {
        var undefUse = undefinedUses[u];
        console.log("    " + undefUse.symbolName + " (" + undefUse.useType + ") [" + undefUse.line + ":" + undefUse.column + "]");
    }
    console.log();
    
    // 测试API 5: queryImpact
    console.log("🔍 测试 queryImpact():");
    var testSymbols = ["used", "unused", "ModuleA", "undefinedVar", "nonexistent"];
    
    for (var s = 0; s < testSymbols.length; s++) {
        var symbolName = testSymbols[s];
        var impact = DefUseAnalyzer.queryImpact(defUseResult, symbolName);
        
        console.log("  符号 '" + symbolName + "':");
        console.log("    找到定义:", impact.found);
        console.log("    影响点数:", impact.impact.downstreamCount);
        console.log("    风险级别:", impact.impact.riskLevel);
        
        if (impact.impact.definition) {
            console.log("    定义类型:", impact.impact.definition.definitionType);
            console.log("    定义位置:", "[" + impact.impact.definition.line + ":" + impact.impact.definition.column + "]");
        }
        
        if (impact.impact.uses.length > 0) {
            console.log("    使用点:");
            for (var w = 0; w < Math.min(impact.impact.uses.length, 3); w++) {
                var use = impact.impact.uses[w];
                console.log("      " + use.symbolName + " (" + use.useType + ") [" + use.line + ":" + use.column + "]");
            }
            if (impact.impact.uses.length > 3) {
                console.log("      ... 还有 " + (impact.impact.uses.length - 3) + " 个使用点");
            }
        }
        console.log();
    }
    
    console.log("✅ 所有查询API测试完成！");
    
} catch (error) {
    console.error("❌ 测试执行异常:", error.message);
} finally {
    // 清理临时文件
    try {
        fs.unlinkSync(testFilePath);
    } catch (cleanupError) {
        // 忽略清理错误
    }
}
