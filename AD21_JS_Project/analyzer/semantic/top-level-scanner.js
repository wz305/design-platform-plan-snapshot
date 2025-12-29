/**
 * ES3 工程语义操作系统 - 顶层语义扫描器
 * 职责：扫描AST的顶层结构，识别工程语义符号
 * 
 * @author ES3 工程语义操作系统
 * @module TopLevelScanner
 */

/**
 * 顶层语义扫描器模块
 */
var TopLevelScanner = (function(){
    
    /**
     * 扫描文件的顶层语义符号
     * @param {Object} ast AST对象
     * @param {string} filePath 文件路径
     * @returns {Object} 扫描结果
     */
    function scanTopLevelSymbols(ast, filePath) {
        var result = {
            success: true,
            filePath: filePath,
            symbols: [],
            diagnostics: []
        };
        
        try {
            if (!ast || ast.type !== "Program") {
                throw new Error("无效的AST结构");
            }
            
            if (!Array.isArray(ast.body)) {
                throw new Error("AST.body不是数组");
            }
            
            // 扫描每个顶层节点
            for (var i = 0; i < ast.body.length; i++) {
                var node = ast.body[i];
                var symbol = null;
                
                try {
                    // 尝试识别IIFE模块
                    if (isIIFEModule(node)) {
                        symbol = createModuleSymbol(node, filePath);
                    }
                    // 尝试识别DFM执行函数
                    else if (isDFMFunction(node)) {
                        symbol = createDFMSymbol(node, filePath);
                    }
                    // 尝试识别顶层函数（非DFM函数）
                    else if (isTopLevelFunction(node)) {
                        symbol = createFunctionSymbol(node, filePath);
                    }
                    // 其他情况视为非法顶层结构
                    else {
                        var diagnostic = createIllegalTopLevelDiagnostic(node, filePath);
                        result.diagnostics.push(diagnostic);
                    }
                    
                    if (symbol) {
                        result.symbols.push(symbol);
                    }
                    
                } catch (nodeError) {
                    var diagnostic = {
                        severity: "error",
                        filePath: filePath,
                        line: node.loc ? node.loc.start.line : null,
                        column: node.loc ? node.loc.start.column : null,
                        message: "节点扫描失败: " + nodeError.message,
                        nodeType: node.type
                    };
                    result.diagnostics.push(diagnostic);
                }
            }
            
            // 检查文件级别的约束
            validateFileConstraints(result, filePath);
            
        } catch (error) {
            result.success = false;
            result.diagnostics.push({
                severity: "error",
                filePath: filePath,
                line: null,
                column: null,
                message: "顶层扫描失败: " + error.message
            });
        }
        
        return result;
    }
    
    /**
     * 检查是否为IIFE模块
     * @param {Object} node AST节点
     * @returns {boolean} 是否为IIFE模块
     */
    function isIIFEModule(node) {
        if (node.type !== "VariableDeclaration") {
            return false;
        }
        
        if (node.declarations.length !== 1) {
            return false;
        }
        
        var decl = node.declarations[0];
        if (!decl.id || decl.id.type !== "Identifier") {
            return false;
        }
        
        if (!decl.init || decl.init.type !== "CallExpression") {
            return false;
        }
        
        var callExpr = decl.init;
        if (callExpr.callee.type !== "FunctionExpression") {
            return false;
        }
        
        // 检查函数表达式是否返回对象（标准模块模式）
        var funcExpr = callExpr.callee;
        if (funcExpr.body.type === "BlockStatement") {
            var hasReturn = false;
            for (var i = 0; i < funcExpr.body.body.length; i++) {
                var stmt = funcExpr.body.body[i];
                if (stmt.type === "ReturnStatement" && stmt.argument) {
                    hasReturn = true;
                    break;
                }
            }
            if (!hasReturn) {
                return false; // 不是标准模块模式
            }
        }
        
        return true;
    }
    
    /**
     * 检查是否为DFM执行函数
     * @param {Object} node AST节点
     * @returns {boolean} 是否为DFM执行函数
     */
    function isDFMFunction(node) {
        if (node.type !== "FunctionDeclaration") {
            return false;
        }
        
        if (!node.id || node.id.type !== "Identifier") {
            return false;
        }
        
        var name = node.id.name;
        
        // DFM函数命名规则：
        // 1. 以On开头的事件处理函数
        // 2. 包含Button的按钮点击函数
        // 3. 包含Click的点击处理函数
        var dfmPatterns = [
            /^On[A-Z]/,           // OnClick, OnInit, OnShow等
            /^Button/,             // Button1Click, Button2Press等
            /Click$/               // MainClick, ExitClick等
        ];
        
        for (var i = 0; i < dfmPatterns.length; i++) {
            if (dfmPatterns[i].test(name)) {
                return true;
            }
        }
        
        // 检查是否有DFM标识符注释
        if (hasDFMIdentifier(node)) {
            return true;
        }
        
        return false;
    }
    
    /**
     * 检查是否为顶层函数（非DFM函数）
     * @param {Object} node AST节点
     * @returns {boolean} 是否为顶层函数
     */
    function isTopLevelFunction(node) {
        if (node.type !== "FunctionDeclaration") {
            return false;
        }
        
        if (!node.id || node.id.type !== "Identifier") {
            return false;
        }
        
        // 排除DFM函数
        if (isDFMFunction(node)) {
            return false;
        }
        
        // 允许其他顶层函数（如工具函数）
        return true;
    }
    
    /**
     * 检查函数是否有DFM标识符
     * @param {Object} node AST节点
     * @returns {boolean} 是否有DFM标识符
     */
    function hasDFMIdentifier(node) {
        // 检查函数前的注释中是否包含DFM标识符
        // 这里简化处理，实际项目中可以扩展
        return false; // 暂时返回false，保持原有逻辑
    }
    
    /**
     * 创建模块符号
     * @param {Object} node AST节点
     * @param {string} filePath 文件路径
     * @returns {Object} 模块符号
     */
    function createModuleSymbol(node, filePath) {
        var decl = node.declarations[0];
        var moduleName = decl.id.name;
        
        return {
            kind: "module",
            name: moduleName,
            definedIn: filePath,
            astNode: node,
            visibility: "public",
            lifecyclePhase: "init",
            metadata: {
                declarationType: "VariableDeclaration",
                isIIFE: true,
                hasReturnStatement: true
            }
        };
    }
    
    /**
     * 创建DFM符号
     * @param {Object} node AST节点
     * @param {string} filePath 文件路径
     * @returns {Object} DFM符号
     */
    function createDFMSymbol(node, filePath) {
        var functionName = node.id.name;
        
        return {
            kind: "execution-entry",
            name: functionName,
            definedIn: filePath,
            astNode: node,
            visibility: "public",
            lifecyclePhase: "runtime",
            metadata: {
                declarationType: "FunctionDeclaration",
                parameters: node.params ? node.params.length : 0,
                isEventHandler: true
            }
        };
    }
    
    /**
     * 创建函数符号
     * @param {Object} node AST节点
     * @param {string} filePath 文件路径
     * @returns {Object} 函数符号
     */
    function createFunctionSymbol(node, filePath) {
        var functionName = node.id.name;
        
        return {
            kind: "function",
            name: functionName,
            definedIn: filePath,
            astNode: node,
            visibility: "public",
            lifecyclePhase: "runtime",
            metadata: {
                declarationType: "FunctionDeclaration",
                parameters: node.params ? node.params.length : 0,
                isEventHandler: false
            }
        };
    }
    
    /**
     * 创建非法顶层结构诊断
     * @param {Object} node AST节点
     * @param {string} filePath 文件路径
     * @returns {Object} 诊断信息
     */
    function createIllegalTopLevelDiagnostic(node, filePath) {
        var message = "";
        
        switch (node.type) {
            case "ExpressionStatement":
                message = "顶层不允许存在表达式语句";
                break;
            case "VariableDeclaration":
                message = "顶层变量声明必须为IIFE模块格式";
                break;
            case "IfStatement":
            case "ForStatement":
            case "WhileStatement":
            case "DoWhileStatement":
            case "SwitchStatement":
                message = "顶层不允许存在控制流语句";
                break;
            default:
                message = "不支持的顶层结构: " + node.type;
        }
        
        return {
            severity: "error",
            filePath: filePath,
            line: node.loc ? node.loc.start.line : null,
            column: node.loc ? node.loc.start.column : null,
            message: message,
            nodeType: node.type,
            rule: "TOP_LEVEL_STRUCTURE"
        };
    }
    
    /**
     * 验证文件级别的约束
     * @param {Object} scanResult 扫描结果
     * @param {string} filePath 文件路径
     */
    function validateFileConstraints(scanResult, filePath) {
        var symbols = scanResult.symbols;
        
        // 检查一个文件是否定义了过多模块（允许合理的多模块文件）
        var moduleCount = 0;
        for (var i = 0; i < symbols.length; i++) {
            if (symbols[i].kind === "module") {
                moduleCount++;
            }
        }
        
        // 允许多个模块，但给出警告
        if (moduleCount > 3) {
            scanResult.diagnostics.push({
                severity: "warning",
                filePath: filePath,
                line: null,
                column: null,
                message: "文件包含过多模块（" + moduleCount + "个），建议拆分到不同文件",
                rule: "TOO_MANY_MODULES"
            });
        }
        
        // 检查是否有符号但无有效内容
        if (symbols.length === 0 && scanResult.diagnostics.length === 0) {
            scanResult.diagnostics.push({
                severity: "warning",
                filePath: filePath,
                line: null,
                column: null,
                message: "文件为空或只包含注释",
                rule: "EMPTY_FILE"
            });
        }
    }
    
    /**
     * 批量扫描多个文件的顶层语义
     * @param {Array} fileScanResults 文件扫描结果数组
     * @returns {Object} 批量扫描结果
     */
    function scanFiles(fileScanResults) {
        var results = [];
        var totalSymbols = 0;
        var totalDiagnostics = 0;
        
        for (var i = 0; i < fileScanResults.length; i++) {
            var fileResult = fileScanResults[i];
            
            if (!fileResult.success || !fileResult.ast) {
                results.push({
                    success: false,
                    filePath: fileResult.filePath,
                    symbols: [],
                    diagnostics: [{
                        severity: "error",
                        filePath: fileResult.filePath,
                        message: fileResult.error || "文件解析失败"
                    }]
                });
                continue;
            }
            
            var scanResult = scanTopLevelSymbols(fileResult.ast, fileResult.filePath);
            results.push(scanResult);
            
            totalSymbols += scanResult.symbols.length;
            totalDiagnostics += scanResult.diagnostics.length;
        }
        
        return {
            results: results,
            summary: {
                totalFiles: fileScanResults.length,
                totalSymbols: totalSymbols,
                totalDiagnostics: totalDiagnostics
            }
        };
    }
    
    /**
     * 格式化扫描结果
     * @param {Object} result 扫描结果
     * @returns {string} 格式化的输出
     */
    function formatScanResult(result) {
        var output = "📁 文件: " + result.filePath + "\n";
        
        if (result.symbols.length > 0) {
            output += "✅ 发现符号 (" + result.symbols.length + "):\n";
            for (var i = 0; i < result.symbols.length; i++) {
                var symbol = result.symbols[i];
                output += "  " + symbol.kind + ": " + symbol.name + "\n";
            }
        }
        
        if (result.diagnostics.length > 0) {
            output += "⚠️  诊断信息 (" + result.diagnostics.length + "):\n";
            for (var i = 0; i < result.diagnostics.length; i++) {
                var diag = result.diagnostics[i];
                output += "  ";
                if (diag.severity === "error") {
                    output += "❌";
                } else {
                    output += "⚠️";
                }
                
                if (diag.line !== null) {
                    output += " Line " + diag.line;
                    if (diag.column !== null) {
                        output += ":" + diag.column;
                    }
                }
                
                output += " " + diag.message + "\n";
            }
        }
        
        return output;
    }
    
    // 公共接口
    return {
        scanTopLevelSymbols: scanTopLevelSymbols,
        scanFiles: scanFiles,
        isIIFEModule: isIIFEModule,
        isDFMFunction: isDFMFunction,
        isTopLevelFunction: isTopLevelFunction,
        formatScanResult: formatScanResult
    };
    
})();

module.exports = TopLevelScanner;
