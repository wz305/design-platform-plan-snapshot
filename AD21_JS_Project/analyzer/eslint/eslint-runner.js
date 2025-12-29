/**
 * ES3 工程语义操作系统 - ESLint 运行器
 * 职责：作为语言合法性门禁，验证文件是否为合法 ES3 代码
 * 
 * @author ES3 工程语义操作系统
 * @module ESLintRunner
 */

var { ESLint } = require("eslint");
var path = require("path");

/**
 * ESLint 运行器模块
 */
var ESLintRunner = (function(){
    
    /**
     * ESLint 实例
     */
    var _eslint = null;
    
    /**
     * 初始化 ESLint 实例
     */
    function _init() {
        try {
            // ESLint v9+ 使用 flat config，指定配置文件路径
            _eslint = new ESLint({
                overrideConfigFile: path.join(__dirname, "eslint.config.js")
            });
        } catch (error) {
            throw new Error("ESLint 初始化失败: " + error.message);
        }
    }
    
    /**
     * 验证单个文件的 ES3 语法合法性
     * @param {string} filePath 文件路径
     * @returns {Promise<Object>} 验证结果
     */
    async function validateFile(filePath) {
        if (!_eslint) {
            _init();
        }
        
        try {
            var results = await _eslint.lintFiles([filePath]);
            var result = results[0];
            
            return {
                success: result.errorCount === 0 && result.warningCount === 0,
                filePath: filePath,
                errorCount: result.errorCount,
                warningCount: result.warningCount,
                messages: result.messages.map(function(msg) {
                    return {
                        line: msg.line,
                        column: msg.column,
                        severity: msg.severity === 2 ? "error" : "warning",
                        message: msg.message,
                        ruleId: msg.ruleId
                    };
                })
            };
            
        } catch (error) {
            return {
                success: false,
                filePath: filePath,
                error: error.message,
                messages: []
            };
        }
    }
    
    /**
     * 验证多个文件的 ES3 语法合法性
     * @param {string[]} filePaths 文件路径数组
     * @returns {Promise<Object>} 批量验证结果
     */
    async function validateFiles(filePaths) {
        if (!_eslint) {
            _init();
        }
        
        var results = [];
        var totalErrors = 0;
        var totalWarnings = 0;
        var hasFatalError = false;
        
        for (var i = 0; i < filePaths.length; i++) {
            var result = await validateFile(filePaths[i]);
            results.push(result);
            
            if (result.error) {
                hasFatalError = true;
            } else {
                totalErrors += result.errorCount;
                totalWarnings += result.warningCount;
            }
        }
        
        return {
            success: totalErrors === 0 && totalWarnings === 0 && !hasFatalError,
            filePaths: filePaths,
            results: results,
            summary: {
                totalFiles: filePaths.length,
                totalErrors: totalErrors,
                totalWarnings: totalWarnings,
                hasFatalError: hasFatalError
            }
        };
    }
    
    /**
     * 检查文件是否通过语言门禁
     * 这是语义分析器的入口守卫
     * @param {string} filePath 文件路径
     * @returns {Promise<boolean>} 是否通过
     */
    async function passesLanguageGate(filePath) {
        var result = await validateFile(filePath);
        return result.success;
    }
    
    /**
     * 格式化错误信息
     * @param {Object} result ESLint 结果
     * @returns {string} 格式化的错误信息
     */
    function formatErrors(result) {
        if (result.success) {
            return "✅ 文件通过 ES3 语法检查: " + result.filePath;
        }
        
        var output = "❌ 文件 ES3 语法错误: " + result.filePath + "\n";
        
        for (var i = 0; i < result.messages.length; i++) {
            var msg = result.messages[i];
            output += "  Line " + msg.line + ":" + msg.column + " ";
            output += "[" + msg.severity.toUpperCase() + "] " + msg.message;
            if (msg.ruleId) {
                output += " (" + msg.ruleId + ")";
            }
            output += "\n";
        }
        
        return output;
    }
    
    // 公共接口
    return {
        validateFile: validateFile,
        validateFiles: validateFiles,
        passesLanguageGate: passesLanguageGate,
        formatErrors: formatErrors
    };
    
})();

module.exports = ESLintRunner;
