/**
 * ES3 工程语义操作系统 - 符号类型定义
 * 职责：定义工程中所有符号类型的标准结构和常量
 * 
 * @author ES3 工程语义操作系统
 * @module SymbolTypes
 */

/**
 * 符号类型定义模块
 */
var SymbolTypes = (function(){
    
    /**
     * 符号种类常量
     */
    var SymbolKind = {
        MODULE: "module",
        EXECUTION_ENTRY: "execution-entry",
        EXPORTED_MEMBER: "exported-member",
        INTERNAL_MEMBER: "internal-member",
        GLOBAL_CONSTANT: "global-constant"
    };
    
    /**
     * 可见性常量
     */
    var Visibility = {
        PUBLIC: "public",
        PRIVATE: "private",
        PROTECTED: "protected",
        INTERNAL: "internal"
    };
    
    /**
     * 生命周期阶段常量
     */
    var LifecyclePhase = {
        INIT: "init",
        RUNTIME: "runtime",
        CLEANUP: "cleanup",
        LOADING: "loading"
    };
    
    /**
     * 诊断严重级别常量
     */
    var Severity = {
        ERROR: "error",
        WARNING: "warning",
        INFO: "info",
        HINT: "hint"
    };
    
    /**
     * 诊断规则常量
     */
    var DiagnosticRule = {
        TOP_LEVEL_STRUCTURE: "TOP_LEVEL_STRUCTURE",
        FILE_CONSTRAINT: "FILE_CONSTRAINT",
        SYMBOL_DUPLICATE: "SYMBOL_DUPLICATE",
        MISSING_EXPORT: "MISSING_EXPORT",
        ILLEGAL_REFERENCE: "ILLEGAL_REFERENCE",
        EMPTY_FILE: "EMPTY_FILE"
    };
    
    /**
     * 创建基础符号结构
     * @param {string} kind 符号种类
     * @param {string} name 符号名称
     * @param {string} definedIn 定义文件
     * @returns {Object} 基础符号结构
     */
    function createBaseSymbol(kind, name, definedIn) {
        return {
            kind: kind,
            name: name,
            definedIn: definedIn,
            astNode: null,
            visibility: Visibility.PUBLIC,
            lifecyclePhase: LifecyclePhase.INIT,
            metadata: {},
            dependencies: [],
            dependents: []
        };
    }
    
    /**
     * 创建模块符号
     * @param {string} name 模块名称
     * @param {string} definedIn 定义文件
     * @returns {Object} 模块符号
     */
    function createModuleSymbol(name, definedIn) {
        var symbol = createBaseSymbol(SymbolKind.MODULE, name, definedIn);
        symbol.lifecyclePhase = LifecyclePhase.INIT;
        symbol.metadata = {
            declarationType: "VariableDeclaration",
            isIIFE: true,
            hasReturnStatement: true,
            exportedMembers: []
        };
        return symbol;
    }
    
    /**
     * 创建执行入口符号（DFM函数）
     * @param {string} name 函数名称
     * @param {string} definedIn 定义文件
     * @returns {Object} 执行入口符号
     */
    function createExecutionEntrySymbol(name, definedIn) {
        var symbol = createBaseSymbol(SymbolKind.EXECUTION_ENTRY, name, definedIn);
        symbol.lifecyclePhase = LifecyclePhase.RUNTIME;
        symbol.metadata = {
            declarationType: "FunctionDeclaration",
            parameters: 0,
            isEventHandler: true,
            eventHandlerType: "dfm"
        };
        return symbol;
    }
    
    /**
     * 创建导出成员符号
     * @param {string} name 成员名称
     * @param {string} definedIn 定义文件
     * @param {string} moduleName 所属模块名
     * @returns {Object} 导出成员符号
     */
    function createExportedMemberSymbol(name, definedIn, moduleName) {
        var symbol = createBaseSymbol(SymbolKind.EXPORTED_MEMBER, name, definedIn);
        symbol.visibility = Visibility.PUBLIC;
        symbol.metadata = {
            declarationType: "FunctionExpression",
            moduleName: moduleName,
            memberType: "function"
        };
        return symbol;
    }
    
    /**
     * 创建内部成员符号
     * @param {string} name 成员名称
     * @param {string} definedIn 定义文件
     * @param {string} moduleName 所属模块名
     * @returns {Object} 内部成员符号
     */
    function createInternalMemberSymbol(name, definedIn, moduleName) {
        var symbol = createBaseSymbol(SymbolKind.INTERNAL_MEMBER, name, definedIn);
        symbol.visibility = Visibility.PRIVATE;
        symbol.metadata = {
            declarationType: "FunctionDeclaration",
            moduleName: moduleName,
            memberType: "function"
        };
        return symbol;
    }
    
    /**
     * 创建诊断信息
     * @param {string} severity 严重级别
     * @param {string} filePath 文件路径
     * @param {string} message 消息
     * @param {string} rule 规则
     * @returns {Object} 诊断信息
     */
    function createDiagnostic(severity, filePath, message, rule) {
        return {
            severity: severity,
            filePath: filePath,
            line: null,
            column: null,
            message: message,
            rule: rule,
            nodeType: null,
            symbolName: null
        };
    }
    
    /**
     * 创建错误诊断
     * @param {string} filePath 文件路径
     * @param {string} message 消息
     * @param {string} rule 规则
     * @returns {Object} 错误诊断
     */
    function createErrorDiagnostic(filePath, message, rule) {
        return createDiagnostic(Severity.ERROR, filePath, message, rule);
    }
    
    /**
     * 创建警告诊断
     * @param {string} filePath 文件路径
     * @param {string} message 消息
     * @param {string} rule 规则
     * @returns {Object} 警告诊断
     */
    function createWarningDiagnostic(filePath, message, rule) {
        return createDiagnostic(Severity.WARNING, filePath, message, rule);
    }
    
    /**
     * 验证符号结构的完整性
     * @param {Object} symbol 符号对象
     * @returns {Object} 验证结果
     */
    function validateSymbol(symbol) {
        var issues = [];
        
        if (!symbol) {
            issues.push("符号对象为空");
            return { valid: false, issues: issues };
        }
        
        // 检查必需字段
        var requiredFields = ["kind", "name", "definedIn"];
        for (var i = 0; i < requiredFields.length; i++) {
            var field = requiredFields[i];
            if (!symbol[field]) {
                issues.push("缺少必需字段: " + field);
            }
        }
        
        // 检查符号种类
        if (symbol.kind && !Object.values(SymbolKind).includes(symbol.kind)) {
            issues.push("无效的符号种类: " + symbol.kind);
        }
        
        // 检查可见性
        if (symbol.visibility && !Object.values(Visibility).includes(symbol.visibility)) {
            issues.push("无效的可见性: " + symbol.visibility);
        }
        
        // 检查生命周期阶段
        if (symbol.lifecyclePhase && !Object.values(LifecyclePhase).includes(symbol.lifecyclePhase)) {
            issues.push("无效的生命周期阶段: " + symbol.lifecyclePhase);
        }
        
        // 检查名称格式
        if (symbol.name) {
            if (typeof symbol.name !== "string" || symbol.name.length === 0) {
                issues.push("符号名称必须是非空字符串");
            } else if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(symbol.name)) {
                issues.push("符号名称格式无效: " + symbol.name);
            }
        }
        
        return {
            valid: issues.length === 0,
            issues: issues
        };
    }
    
    /**
     * 验证诊断信息的完整性
     * @param {Object} diagnostic 诊断对象
     * @returns {Object} 验证结果
     */
    function validateDiagnostic(diagnostic) {
        var issues = [];
        
        if (!diagnostic) {
            issues.push("诊断对象为空");
            return { valid: false, issues: issues };
        }
        
        // 检查必需字段
        var requiredFields = ["severity", "filePath", "message"];
        for (var i = 0; i < requiredFields.length; i++) {
            var field = requiredFields[i];
            if (!diagnostic[field]) {
                issues.push("缺少必需字段: " + field);
            }
        }
        
        // 检查严重级别
        if (diagnostic.severity && !Object.values(Severity).includes(diagnostic.severity)) {
            issues.push("无效的严重级别: " + diagnostic.severity);
        }
        
        // 检查位置信息
        if (diagnostic.line !== null && (typeof diagnostic.line !== "number" || diagnostic.line < 1)) {
            issues.push("行号必须是大于0的数字或null");
        }
        
        if (diagnostic.column !== null && (typeof diagnostic.column !== "number" || diagnostic.column < 0)) {
            issues.push("列号必须是非负数或null");
        }
        
        return {
            valid: issues.length === 0,
            issues: issues
        };
    }
    
    /**
     * 获取符号的可读描述
     * @param {Object} symbol 符号对象
     * @returns {string} 描述文本
     */
    function getSymbolDescription(symbol) {
        if (!symbol) {
            return "未知符号";
        }
        
        var description = "";
        
        switch (symbol.kind) {
            case SymbolKind.MODULE:
                description = "模块 '" + symbol.name + "'";
                break;
            case SymbolKind.EXECUTION_ENTRY:
                description = "执行入口 '" + symbol.name + "'";
                break;
            case SymbolKind.EXPORTED_MEMBER:
                description = "导出成员 '" + symbol.name + "'";
                if (symbol.metadata && symbol.metadata.moduleName) {
                    description += " (来自模块 " + symbol.metadata.moduleName + ")";
                }
                break;
            case SymbolKind.INTERNAL_MEMBER:
                description = "内部成员 '" + symbol.name + "'";
                if (symbol.metadata && symbol.metadata.moduleName) {
                    description += " (来自模块 " + symbol.metadata.moduleName + ")";
                }
                break;
            default:
                description = "未知符号 '" + symbol.name + "'";
        }
        
        return description;
    }
    
    // 公共接口
    return {
        // 常量
        SymbolKind: SymbolKind,
        Visibility: Visibility,
        LifecyclePhase: LifecyclePhase,
        Severity: Severity,
        DiagnosticRule: DiagnosticRule,
        
        // 创建方法
        createBaseSymbol: createBaseSymbol,
        createModuleSymbol: createModuleSymbol,
        createExecutionEntrySymbol: createExecutionEntrySymbol,
        createExportedMemberSymbol: createExportedMemberSymbol,
        createInternalMemberSymbol: createInternalMemberSymbol,
        createDiagnostic: createDiagnostic,
        createErrorDiagnostic: createErrorDiagnostic,
        createWarningDiagnostic: createWarningDiagnostic,
        
        // 验证方法
        validateSymbol: validateSymbol,
        validateDiagnostic: validateDiagnostic,
        
        // 工具方法
        getSymbolDescription: getSymbolDescription
    };
    
})();

module.exports = SymbolTypes;
