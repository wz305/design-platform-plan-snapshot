/**
 * Def-Use 静态分析器 - 基于虚拟Program的全局分析
 * 
 * 核心设计原则：
 * - Def-Use 静态分析不以"文件"为作用域边界
 * - 以 merge-order.json 定义的拼接顺序，构建一个"虚拟单一 Program"进行分析
 * - 所有 var / function 定义视为全局定义
 * - 所有引用在拼接顺序合法的前提下视为合法引用
 * 
 * 兼容ES3语法，适用于AD环境JavaScript项目
 */

var fs = require('fs');
var path = require('path');
var acorn = require('acorn');
var estraverse = require('estraverse');

/**
 * Def-Use 分析器
 */
var DefUseAnalyzer = (function(){
    
    /**
     * 分析配置
     */
    var _config = {
        // ES3语法选项
        ecmaVersion: 3,
        sourceType: 'script',
        // 忽略的变量名
        ignoreVars: ['console', 'logger', 'window', 'document', 'process', 'require', 'module', 'exports', 
                    'msg', 'code', 'eval', 'JSON', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
                    'Date', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Function'],
        // 忽略的属性名
        ignoreProps: ['length', 'prototype', 'constructor', 'toString', 'valueOf']
    };
    
    /**
     * 分析结果
     */
    var _analysisResult = {
        analysisType: 'virtual-program',
        timestamp: '',
        mergeOrder: [],
        files: [],
        globalSymbols: {},
        summary: {
            totalSymbols: 0,
            totalDefinitions: 0,
            totalUsages: 0,
            unusedDefinitions: 0,
            undefinedUsages: 0,
            orderViolations: 0,
            issues: 0
        },
        issues: []
    };
    
    /**
     * 重置分析结果
     */
    function _resetResult() {
        _analysisResult = {
            analysisType: 'virtual-program',
            timestamp: new Date().toISOString(),
            mergeOrder: [],
            files: [],
            globalSymbols: {},
            summary: {
                totalSymbols: 0,
                totalDefinitions: 0,
                totalUsages: 0,
                unusedDefinitions: 0,
                undefinedUsages: 0,
                orderViolations: 0,
                issues: 0
            },
            issues: []
        };
    }
    
    /**
     * 检查是否应该忽略变量
     * @param {string} varName 变量名
     * @returns {boolean} 是否忽略
     */
    function _shouldIgnoreVar(varName) {
        return _config.ignoreVars.indexOf(varName) !== -1 || 
               varName.indexOf('_') === 0 ||
               varName === 'Sender' || // AD环境特殊参数
               varName === 'this'; // AD环境不支持this，但需要检查
    }
    
    /**
     * 验证merge-order.json
     * @param {string} configPath 配置文件路径
     * @returns {Object} 验证结果
     */
    function _validateMergeOrder(configPath) {
        console.log('[DefUseAnalyzer][_validateMergeOrder] 验证配置: ' + configPath);
        
        try {
            if (!fs.existsSync(configPath)) {
                return {
                    success: false,
                    error: 'merge-order.json 文件不存在'
                };
            }
            
            var configContent = fs.readFileSync(configPath, 'utf8');
            var config = JSON.parse(configContent);
            
            if (!config.mergeOrder || !Array.isArray(config.mergeOrder)) {
                return {
                    success: false,
                    error: 'merge-order.json 缺少 mergeOrder 数组'
                };
            }
            
            if (config.mergeOrder.length === 0) {
                return {
                    success: false,
                    error: 'merge-order.json 为空'
                };
            }
            
            // 验证文件存在性
            var missingFiles = [];
            var oversizedFiles = [];
            
            for (var i = 0; i < config.mergeOrder.length; i++) {
                var filePath = config.mergeOrder[i];
                var fullPath = path.join(path.dirname(configPath), '..', filePath);
                
                if (!fs.existsSync(fullPath)) {
                    missingFiles.push(filePath);
                } else {
                    var stats = fs.statSync(fullPath);
                    if (stats.size > 50 * 1024) { // 50KB限制
                        oversizedFiles.push(filePath);
                    }
                }
            }
            
            if (missingFiles.length > 0) {
                return {
                    success: false,
                    error: '以下文件不存在: ' + missingFiles.join(', ')
                };
            }
            
            if (oversizedFiles.length > 0) {
                console.warn('[DefUseAnalyzer][_validateMergeOrder] 警告: 以下文件超过50KB限制: ' + oversizedFiles.join(', '));
            }
            
            console.log('[DefUseAnalyzer][_validateMergeOrder] 验证通过，文件数量: ' + config.mergeOrder.length);
            return {
                success: true,
                mergeOrder: config.mergeOrder
            };
            
        } catch (error) {
            return {
                success: false,
                error: '配置解析失败: ' + error.message
            };
        }
    }
    
    /**
     * 检查文件是否应该被排除
     * @param {string} filePath 文件路径
     * @returns {boolean} 是否排除
     */
    function _shouldExcludeFile(filePath) {
        if (!_config.excludeFiles || !Array.isArray(_config.excludeFiles)) {
            return false;
        }
        
        return _config.excludeFiles.indexOf(filePath) !== -1;
    }
    
    /**
     * 构建虚拟Program
     * @param {Array} mergeOrder 文件合并顺序
     * @param {string} basePath 基础路径
     * @returns {Object} 虚拟Program
     */
    function _buildVirtualProgram(mergeOrder, basePath) {
        console.log('[DefUseAnalyzer][_buildVirtualProgram] 构建虚拟Program');
        
        var virtualProgram = {
            type: 'VirtualProgram',
            files: [],
            globalSymbolTable: {},
            orderMap: {}
        };
        
        for (var i = 0; i < mergeOrder.length; i++) {
            var filePath = mergeOrder[i];
            var fullPath = path.join(basePath, filePath);
            
            // 检查是否应该排除此文件
            if (_shouldExcludeFile(filePath)) {
                console.log('[DefUseAnalyzer][_buildVirtualProgram] 跳过排除文件: ' + filePath);
                continue;
            }
            
            console.log('[DefUseAnalyzer][_buildVirtualProgram] 解析文件 ' + (i + 1) + '/' + mergeOrder.length + ': ' + filePath);
            
            try {
                var content = fs.readFileSync(fullPath, 'utf8');
                var ast = acorn.parse(content, {
                    ecmaVersion: _config.ecmaVersion,
                    sourceType: _config.sourceType,
                    locations: true
                });
                
                var fileInfo = {
                    path: filePath,
                    fullPath: fullPath,
                    order: i,
                    ast: ast,
                    definitions: [],
                    usages: []
                };
                
                virtualProgram.files.push(fileInfo);
                virtualProgram.orderMap[filePath] = i;
                
            } catch (error) {
                console.error('[DefUseAnalyzer][_buildVirtualProgram] 解析失败: ' + filePath + ' - ' + error.message);
                _analysisResult.issues.push({
                    type: 'parse-error',
                    message: '文件解析失败: ' + filePath + ' - ' + error.message,
                    file: filePath,
                    severity: 'error'
                });
            }
        }
        
        console.log('[DefUseAnalyzer][_buildVirtualProgram] 虚拟Program构建完成，有效文件数: ' + virtualProgram.files.length);
        return virtualProgram;
    }
    
    /**
     * 收集全局定义
     * @param {Object} virtualProgram 虚拟Program
     */
    function _collectGlobalDefinitions(virtualProgram) {
        console.log('[DefUseAnalyzer][_collectGlobalDefinitions] 收集全局定义');
        
        for (var i = 0; i < virtualProgram.files.length; i++) {
            var file = virtualProgram.files[i];
            var scopeDepth = 0;  // 跟踪作用域深度
            var inGlobalScope = true; // 是否在全局作用域
            
            estraverse.traverse(file.ast, {
                enter: function(node, parent) {
                    var defInfo = null;
                    
                    // 进入新的作用域（函数、IIFE等）
                    if (node.type === 'FunctionDeclaration' || 
                        node.type === 'FunctionExpression') {
                        scopeDepth++;
                        inGlobalScope = false;
                    }
                    
                    // 处理IIFE调用：var Module = (function(){})();
                    if (node.type === 'CallExpression' && 
                        node.callee && node.callee.type === 'FunctionExpression') {
                        // 这是一个IIFE，增加作用域深度
                        scopeDepth++;
                        inGlobalScope = false;
                        
                        // 检查是否有变量声明被赋值为IIFE结果
                        if (parent && parent.type === 'VariableDeclarator' && 
                            parent.id && parent.id.type === 'Identifier') {
                            // 这是全局变量：var Module = (function(){})();
                            if (!_shouldIgnoreVar(parent.id.name)) {
                                defInfo = {
                                    name: parent.id.name,
                                    file: file.path,
                                    order: file.order,
                                    line: parent.loc ? parent.loc.start.line : 0,
                                    column: parent.loc ? parent.loc.start.column : 0,
                                    type: 'IIFE',
                                    node: parent
                                };
                                
                                _addGlobalDefinition(virtualProgram, defInfo);
                                file.definitions.push(defInfo);
                            }
                        }
                    }
                    
                    // 只在全局作用域收集变量声明（scopeDepth === 0）
                    if (scopeDepth === 0 && node.type === 'VariableDeclaration' && node.declarations) {
                        for (var j = 0; j < node.declarations.length; j++) {
                            var declarator = node.declarations[j];
                            if (declarator.id && declarator.id.type === 'Identifier' && !_shouldIgnoreVar(declarator.id.name)) {
                                // 检查是否是IIFE赋值，如果是则跳过（由IIFE处理逻辑负责）
                                if (declarator.init && 
                                    declarator.init.type === 'CallExpression' && 
                                    declarator.init.callee && 
                                    declarator.init.callee.type === 'FunctionExpression') {
                                    // 这是IIFE赋值，跳过普通变量处理
                                    continue;
                                }
                                
                                defInfo = {
                                    name: declarator.id.name,
                                    file: file.path,
                                    order: file.order,
                                    line: node.loc ? node.loc.start.line : 0,
                                    column: node.loc ? node.loc.start.column : 0,
                                    type: 'variable',
                                    node: node
                                };
                                
                                _addGlobalDefinition(virtualProgram, defInfo);
                                file.definitions.push(defInfo);
                            }
                        }
                    }
                    
                    // 函数声明：只在全局作用域收集（会提升到全局）
                    if (scopeDepth === 0 && node.type === 'FunctionDeclaration' && node.id && !_shouldIgnoreVar(node.id.name)) {
                        defInfo = {
                            name: node.id.name,
                            file: file.path,
                            order: file.order,
                            line: node.loc ? node.loc.start.line : 0,
                            column: node.loc ? node.loc.start.column : 0,
                            type: 'function',
                            node: node
                        };
                        
                        _addGlobalDefinition(virtualProgram, defInfo);
                        file.definitions.push(defInfo);
                    }
                },
                leave: function(node) {
                    // 离开作用域
                    if (node.type === 'FunctionDeclaration' || 
                        node.type === 'FunctionExpression') {
                        scopeDepth--;
                        if (scopeDepth === 0) {
                            inGlobalScope = true;
                        }
                    }
                    
                    // 离开IIFE
                    if (node.type === 'CallExpression' && 
                        node.callee && node.callee.type === 'FunctionExpression') {
                        scopeDepth--;
                        if (scopeDepth === 0) {
                            inGlobalScope = true;
                        }
                    }
                }
            });
        }
        
        console.log('[DefUseAnalyzer][_collectGlobalDefinitions] 收集完成，全局符号数: ' + Object.keys(virtualProgram.globalSymbolTable).length);
    }
    
    /**
     * 添加全局定义
     * @param {Object} virtualProgram 虚拟Program
     * @param {Object} defInfo 定义信息
     */
    function _addGlobalDefinition(virtualProgram, defInfo) {
        var symbolName = defInfo.name;
        
        if (!virtualProgram.globalSymbolTable[symbolName]) {
            virtualProgram.globalSymbolTable[symbolName] = {
                name: symbolName,
                definitions: [],
                usages: [],
                isUsed: false
            };
        }
        
        // 确保 usages 数组存在
        if (!virtualProgram.globalSymbolTable[symbolName].usages) {
            virtualProgram.globalSymbolTable[symbolName].usages = [];
        }
        
        var existingDefs = virtualProgram.globalSymbolTable[symbolName].definitions;
        
        // 检查重复定义 - 改进逻辑：检查是否完全相同的定义
        for (var i = 0; i < existingDefs.length; i++) {
            var existingDef = existingDefs[i];
            if (existingDef.order === defInfo.order && 
                existingDef.line === defInfo.line && 
                existingDef.file === defInfo.file &&
                existingDef.type === defInfo.type) {
                // 完全相同的定义，忽略（重复遍历）
                return;
            }
        }
        
        virtualProgram.globalSymbolTable[symbolName].definitions.push(defInfo);
        
        // 记录重定义警告 - 只记录真正的跨文件重复定义
        if (existingDefs.length > 0) {
            // 检查是否是真正的跨文件重复定义
            var hasCrossFileConflict = false;
            for (var i = 0; i < existingDefs.length; i++) {
                if (existingDefs[i].file !== defInfo.file) {
                    hasCrossFileConflict = true;
                    break;
                }
            }
            
            if (hasCrossFileConflict) {
                // 找出所有相关定义的位置信息
                var allDefs = existingDefs.concat([defInfo]);
                var locations = allDefs.map(function(def) {
                    return def.file + ':' + def.line;
                }).join(', ');
                
                _analysisResult.issues.push({
                    type: 'redefinition',
                    message: '符号 "' + symbolName + '" 被重复定义',
                    symbol: symbolName,
                    file: defInfo.file,
                    line: defInfo.line,
                    severity: 'warning',
                    details: {
                        symbol: symbolName,
                        totalDefinitions: allDefs.length,
                        locations: locations
                    }
                });
            }
        }
    }
    
    /**
     * 分析全局使用
     * @param {Object} virtualProgram 虚拟Program
     */
    function _analyzeGlobalUsages(virtualProgram) {
        console.log('[DefUseAnalyzer][_analyzeGlobalUsages] 分析全局使用');
        
        for (var i = 0; i < virtualProgram.files.length; i++) {
            var file = virtualProgram.files[i];
            
            estraverse.traverse(file.ast, {
                enter: function(node, parent) {
                    // 处理标识符引用
                    if (node.type === 'Identifier' && !_shouldIgnoreVar(node.name)) {
                        // 检查是否是定义节点
                        var isDefinition = false;
                        if (parent) {
                            if ((parent.type === 'VariableDeclarator' && parent.id === node) ||
                                (parent.type === 'FunctionDeclaration' && parent.id === node) ||
                                (parent.type === 'FunctionExpression' && parent.id === node)) {
                                isDefinition = true;
                            }
                        }
                        
                        // 检查是否是对象属性访问（不应该算作独立变量使用）
                        var isObjectProperty = false;
                        
                        // 检查直接父节点是否是MemberExpression的property
                        if (parent && parent.type === 'MemberExpression' && parent.property === node) {
                            isObjectProperty = true;
                        }
                        
                        // 检查更复杂的嵌套情况，比如在对象字面量中
                        if (parent && parent.type === 'Property' && parent.key === node && parent.kind === 'init') {
                            isObjectProperty = true;
                        }
                        
                        // 检查是否在对象方法的属性名中
                        if (parent && parent.type === 'Property' && parent.key === node) {
                            isObjectProperty = true;
                        }
                        
                        if (!isDefinition && !isObjectProperty) {
                            var usageInfo = {
                                name: node.name,
                                file: file.path,
                                order: file.order,
                                line: node.loc ? node.loc.start.line : 0,
                                column: node.loc ? node.loc.start.column : 0,
                                node: node
                            };
                               
                            file.usages.push(usageInfo);
                            _processUsage(virtualProgram, usageInfo);
                        }
                    }
                    }
                    
                    // 特殊处理：_getDependency("X") 视为对符号 X 的逻辑使用
                    if (node.type === 'CallExpression' && 
                        node.callee && node.callee.type === 'Identifier' && 
                        node.callee.name === '_getDependency' &&
                        node.arguments && node.arguments.length > 0 &&
                        node.arguments[0].type === 'Literal') {
                        
                        var dependencyName = node.arguments[0].value;
                        if (dependencyName && typeof dependencyName === 'string' && !_shouldIgnoreVar(dependencyName)) {
                            var logicalUsage = {
                                name: dependencyName,
                                file: file.path,
                                order: file.order,
                                line: node.loc ? node.loc.start.line : 0,
                                column: node.loc ? node.loc.start.column : 0,
                                node: node,
                                isLogical: true
                            };
                            
                            file.usages.push(logicalUsage);
                            _processUsage(virtualProgram, logicalUsage);
                        }
                    }
                }
            });
        }
        
        console.log('[DefUseAnalyzer][_analyzeGlobalUsages] 分析完成');
    }
    
    /**
     * 处理使用
     * @param {Object} virtualProgram 虚拟Program
     * @param {Object} usageInfo 使用信息
     */
    function _processUsage(virtualProgram, usageInfo) {
        var symbolName = usageInfo.name;
        var symbol = virtualProgram.globalSymbolTable[symbolName];
        
        if (!symbol) {
            // 未定义的使用
            _analysisResult.issues.push({
                type: 'undefined-variable',
                message: '符号 "' + symbolName + '" 在全局作用域中未定义',
                symbol: symbolName,
                file: usageInfo.file,
                line: usageInfo.line,
                order: usageInfo.order,
                severity: 'error'
            });
            _analysisResult.summary.undefinedUsages++;
        } else {
            // 确保 usages 数组存在
            if (!symbol.usages) {
                symbol.usages = [];
            }
            
            // 标记为已使用
            symbol.isUsed = true;
            symbol.usages.push(usageInfo);
            
            // 检查顺序违规
            var earliestDef = _getEarliestDefinition(symbol);
            if (earliestDef && earliestDef.order > usageInfo.order) {
                _analysisResult.issues.push({
                    type: 'order-violation',
                    message: '使用发生在定义之前，请调整 merge-order.json',
                    symbol: symbolName,
                    usedIn: usageInfo.file,
                    definedIn: earliestDef.file,
                    order: usageInfo.order,
                    definedOrder: earliestDef.order,
                    severity: 'error'
                });
                _analysisResult.summary.orderViolations++;
            }
        }
        
        _analysisResult.summary.totalUsages++;
    }
    
    /**
     * 获取最早的定义
     * @param {Object} symbol 符号信息
     * @returns {Object} 最早的定义
     */
    function _getEarliestDefinition(symbol) {
        if (!symbol.definitions || symbol.definitions.length === 0) {
            return null;
        }
        
        var earliest = symbol.definitions[0];
        for (var i = 1; i < symbol.definitions.length; i++) {
            if (symbol.definitions[i].order < earliest.order) {
                earliest = symbol.definitions[i];
            }
        }
        return earliest;
    }
    
    /**
     * 分析未使用的定义
     * @param {Object} virtualProgram 虚拟Program
     */
    function _analyzeUnusedDefinitions(virtualProgram) {
        console.log('[DefUseAnalyzer][_analyzeUnusedDefinitions] 分析未使用的定义');
        
        for (var symbolName in virtualProgram.globalSymbolTable) {
            if (!virtualProgram.globalSymbolTable.hasOwnProperty(symbolName)) {
                continue;
            }
            
            var symbol = virtualProgram.globalSymbolTable[symbolName];
            
            if (!symbol.isUsed && symbol.definitions.length > 0) {
                for (var i = 0; i < symbol.definitions.length; i++) {
                    var def = symbol.definitions[i];
                    _analysisResult.issues.push({
                        type: 'unused-variable',
                        message: '符号 "' + symbolName + '" 已定义但从未使用',
                        symbol: symbolName,
                        file: def.file,
                        line: def.line,
                        severity: 'warning'
                    });
                    _analysisResult.summary.unusedDefinitions++;
                }
            }
        }
    }
    
    /**
     * 基于merge-order的虚拟Program分析
     * @param {string} mergeOrderPath merge-order.json路径
     * @returns {Object} 分析结果
     */
    function analyzeVirtualProgram(mergeOrderPath) {
        console.log('[DefUseAnalyzer][analyzeVirtualProgram] 开始虚拟Program分析');
        
        _resetResult();
        
        // 验证merge-order.json
        var validation = _validateMergeOrder(mergeOrderPath);
        if (!validation.success) {
            return {
                success: false,
                error: validation.error
            };
        }
        
        _analysisResult.mergeOrder = validation.mergeOrder;
        
        var basePath = path.join(path.dirname(mergeOrderPath), '..');
        
        try {
            // 构建虚拟Program
            var virtualProgram = _buildVirtualProgram(validation.mergeOrder, basePath);
            
            // 第一遍：收集全局定义
            _collectGlobalDefinitions(virtualProgram);
            
            // 第二遍：分析全局使用
            _analyzeGlobalUsages(virtualProgram);
            
            // 第三遍：分析未使用的定义
            _analyzeUnusedDefinitions(virtualProgram);
            
            // 更新汇总信息
            _updateVirtualProgramSummary(virtualProgram);
            
            // 保存文件信息
            _analysisResult.files = virtualProgram.files.map(function(file) {
                return {
                    path: file.path,
                    order: file.order,
                    definitions: file.definitions,
                    usages: file.usages
                };
            });
            
            // 保存全局符号表
            _analysisResult.globalSymbols = virtualProgram.globalSymbolTable;
            
            console.log('[DefUseAnalyzer][analyzeVirtualProgram] 虚拟Program分析完成');
            
            return {
                success: true,
                result: _analysisResult
            };
            
        } catch (error) {
            console.error('[DefUseAnalyzer][analyzeVirtualProgram] 分析过程出错: ' + error.message);
            return {
                success: false,
                error: '分析失败: ' + error.message
            };
        }
    }
    
    /**
     * 更新虚拟Program分析汇总
     * @param {Object} virtualProgram 虚拟Program
     */
    function _updateVirtualProgramSummary(virtualProgram) {
        _analysisResult.summary.totalSymbols = Object.keys(virtualProgram.globalSymbolTable).length;
        
        for (var symbolName in virtualProgram.globalSymbolTable) {
            if (!virtualProgram.globalSymbolTable.hasOwnProperty(symbolName)) {
                continue;
            }
            
            var symbol = virtualProgram.globalSymbolTable[symbolName];
            _analysisResult.summary.totalDefinitions += symbol.definitions.length;
            _analysisResult.summary.totalUsages += symbol.usages.length;
        }
        
        _analysisResult.summary.issues = _analysisResult.issues.length;
    }
    
    /**
     * 保存分析报告
     * @param {string} reportPath 报告文件路径
     * @returns {Object} 保存结果
     */
    function saveReport(reportPath) {
        console.log('[DefUseAnalyzer][saveReport] 保存分析报告: ' + reportPath);
        
        try {
            // 确保目录存在
            var dir = path.dirname(reportPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFileSync(reportPath, JSON.stringify(_analysisResult, null, 2));
            console.log('[DefUseAnalyzer][saveReport] 报告保存成功');
            
            return {
                success: true,
                path: reportPath
            };
            
        } catch (error) {
            console.error('[DefUseAnalyzer][saveReport] 报告保存失败: ' + error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * 打印分析摘要
     */
    function printSummary() {
        console.log('\n=== Def-Use 虚拟Program分析摘要 ===');
        console.log('分析类型: ' + _analysisResult.analysisType);
        console.log('分析时间: ' + _analysisResult.timestamp);
        console.log('合并顺序文件数: ' + _analysisResult.mergeOrder.length);
        console.log('有效分析文件数: ' + _analysisResult.files.length);
        console.log('全局符号数: ' + _analysisResult.summary.totalSymbols);
        console.log('总定义数: ' + _analysisResult.summary.totalDefinitions);
        console.log('总使用数: ' + _analysisResult.summary.totalUsages);
        console.log('未使用定义: ' + _analysisResult.summary.unusedDefinitions);
        console.log('未定义使用: ' + _analysisResult.summary.undefinedUsages);
        console.log('顺序违规: ' + _analysisResult.summary.orderViolations);
        console.log('问题总数: ' + _analysisResult.summary.issues);
        
        if (_analysisResult.issues.length > 0) {
            console.log('\n=== 问题详情 ===');
            for (var i = 0; i < Math.min(_analysisResult.issues.length, 10); i++) {
                var issue = _analysisResult.issues[i];
                console.log((i + 1) + '. [' + issue.severity.toUpperCase() + '] ' + issue.message);
                console.log('   文件: ' + (issue.file || issue.usedIn || '未知') + ' 行: ' + issue.line);
                
                // 显示重复定义的详细信息
                if (issue.type === 'redefinition' && issue.details && issue.details.locations) {
                    console.log('   所有定义位置: ' + issue.details.locations);
                    console.log('   定义总数: ' + issue.details.totalDefinitions);
                }
                
                if (issue.definedIn) {
                    console.log('   定义于: ' + issue.definedIn);
                }
            }
            
            if (_analysisResult.issues.length > 10) {
                console.log('... 还有 ' + (_analysisResult.issues.length - 10) + ' 个问题');
            }
        }
        
        console.log('');
    }
    
    return {
        analyzeVirtualProgram: analyzeVirtualProgram,
        saveReport: saveReport,
        printSummary: printSummary,
        setConfig: function(config) {
            Object.assign(_config, config);
        }
    };
})();

// 导出模块
if (typeof module !== "undefined" && module.exports) {
    module.exports = DefUseAnalyzer;
}
