/**
 * ES3 工程语义操作系统 - AST 解析器
 * 职责：构建稳定的 ES3 AST，作为语义分析的原材料
 * 
 * @author ES3 工程语义操作系统
 * @module ASTParser
 */

var acorn = require("acorn");
var fs = require("fs");
var path = require("path");

/**
 * AST 解析器模块
 */
var ASTParser = (function(){
    
    /**
     * ES3 解析配置
     */
    var _ES3_OPTIONS = {
        ecmaVersion: 3,
        sourceType: "script",
        allowReturnOutsideFunction: false,
        allowHashBang: false,
        locations: true,
        ranges: true
    };
    
    /**
     * 解析文件为 AST
     * @param {string} filePath 文件路径
     * @returns {Object} 解析结果
     */
    function parseFile(filePath) {
        try {
            // 检查文件是否存在
            if (!fs.existsSync(filePath)) {
                throw new Error("文件不存在: " + filePath);
            }
            
            // 读取文件内容
            var source = fs.readFileSync(filePath, "utf8");
            
            // 解析为 AST
            var ast = acorn.parse(source, _ES3_OPTIONS);
            
            return {
                success: true,
                filePath: filePath,
                ast: ast,
                source: source,
                size: source.length
            };
            
        } catch (error) {
            return {
                success: false,
                filePath: filePath,
                error: error.message,
                line: error.loc ? error.loc.line : null,
                column: error.loc ? error.loc.column : null
            };
        }
    }
    
    /**
     * 批量解析文件
     * @param {string[]} filePaths 文件路径数组
     * @returns {Object} 批量解析结果
     */
    function parseFiles(filePaths) {
        var results = [];
        var successCount = 0;
        var errorCount = 0;
        
        for (var i = 0; i < filePaths.length; i++) {
            var result = parseFile(filePaths[i]);
            results.push(result);
            
            if (result.success) {
                successCount++;
            } else {
                errorCount++;
            }
        }
        
        return {
            results: results,
            summary: {
                totalFiles: filePaths.length,
                successCount: successCount,
                errorCount: errorCount
            }
        };
    }
    
    /**
     * 验证 AST 的完整性
     * @param {Object} ast AST 对象
     * @returns {Object} 验证结果
     */
    function validateAST(ast) {
        var issues = [];
        
        // 检查基本结构
        if (!ast) {
            issues.push("AST 为空");
            return { valid: false, issues: issues };
        }
        
        if (ast.type !== "Program") {
            issues.push("AST 根节点不是 Program");
        }
        
        if (!Array.isArray(ast.body)) {
            issues.push("AST.body 不是数组");
        }
        
        // 检查节点完整性
        function checkNode(node, depth) {
            if (depth > 100) {
                issues.push("AST 嵌套过深，可能存在循环");
                return;
            }
            
            if (!node || typeof node !== "object") {
                return;
            }
            
            if (!node.type) {
                issues.push("节点缺少 type 属性");
                return;
            }
            
            // 递归检查子节点
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    var value = node[key];
                    
                    if (Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            if (value[i] && typeof value[i] === "object" && value[i].type) {
                                checkNode(value[i], depth + 1);
                            }
                        }
                    } else if (value && typeof value === "object" && value.type) {
                        checkNode(value, depth + 1);
                    }
                }
            }
        }
        
        checkNode(ast, 0);
        
        return {
            valid: issues.length === 0,
            issues: issues
        };
    }
    
    /**
     * 获取文件的基本信息
     * @param {Object} parseResult 解析结果
     * @returns {Object} 文件信息
     */
    function getFileInfo(parseResult) {
        if (!parseResult.success) {
            return null;
        }
        
        var ast = parseResult.ast;
        var info = {
            filePath: parseResult.filePath,
            size: parseResult.size,
            topLevelNodes: ast.body.length,
            hasTopLevelFunctions: false,
            hasTopLevelVars: false,
            hasIIFEModules: false
        };
        
        // 分析顶层节点类型
        for (var i = 0; i < ast.body.length; i++) {
            var node = ast.body[i];
            
            if (node.type === "FunctionDeclaration") {
                info.hasTopLevelFunctions = true;
            } else if (node.type === "VariableDeclaration") {
                info.hasTopLevelVars = true;
                
                // 检查是否为 IIFE 模块
                if (node.declarations && node.declarations.length > 0) {
                    var decl = node.declarations[0];
                    if (decl.init && decl.init.type === "CallExpression" && 
                        decl.init.callee && decl.init.callee.type === "FunctionExpression") {
                        info.hasIIFEModules = true;
                    }
                }
            }
        }
        
        return info;
    }
    
    /**
     * 格式化解析错误
     * @param {Object} result 解析结果
     * @returns {string} 格式化的错误信息
     */
    function formatParseError(result) {
        if (result.success) {
            return "✅ 文件解析成功: " + result.filePath;
        }
        
        var output = "❌ 文件解析失败: " + result.filePath;
        if (result.line !== null) {
            output += " (Line " + result.line;
            if (result.column !== null) {
                output += ":" + result.column;
            }
            output += ")";
        }
        output += "\n";
        output += "  错误: " + result.error;
        
        return output;
    }
    
    // 公共接口
    return {
        parseFile: parseFile,
        parseFiles: parseFiles,
        validateAST: validateAST,
        getFileInfo: getFileInfo,
        formatParseError: formatParseError
    };
    
})();

module.exports = ASTParser;
