/**
 * ES3 工程语义操作系统 - ESLint 配置 (Flat Config)
 * 职责：语言合法性门禁，确保输入为合法 ES3 代码
 * 
 * 配置策略：
 * - 库代码：严格ES3语法，确保AD环境兼容性
 * - 测试代码：允许ES6+语法，提升测试编写效率
 */

module.exports = [
    // 这是应用于所有文件的基础配置，确保库代码是严格的ES3
    {
        name: "es3-library-config",
        files: ["**/*.js"], // 默认匹配所有JS文件
        languageOptions: {
            ecmaVersion: 3, // 库代码必须为ES3
            sourceType: "script",
            
            // AD 环境全局变量（防止误报）
            globals: {
                // AD 系统全局变量
                "Client": "readonly",
                "WorkspaceManager": "readonly",
                "Board": "readonly",
                "SchServer": "readonly",
                "PCBServer": "readonly",
                "StringManager": "readonly",
                "ScriptingSupport": "readonly",
                
                // 我们的模块变量（构建后成为全局）
                "LoggerModule": "writable",
                "ObjectModule": "writable",
                "PCBInterfaces": "writable",
                
                // 通用全局变量
                "console": "writable",
                "logger": "writable"
            }
        },
        
        rules: {
            // === 基础语法规则 ===
            
            // 强制分号（ES3 风格）
            "semi": ["error", "always"],
            
            // 禁止不必要的分号
            "no-extra-semi": "error",
            
            // 字符串使用双引号（项目规范）
            "quotes": ["error", "double"],
            
            // === 关闭的现代化规则 ===
            
            // 允许 var 声明
            "no-var": "off",
            
            // 允许 == 比较（ES3 常用）
            "eqeqeq": "off",
            
            // 允许函数声明提升
            "no-func-assign": "off",
            
            // 不检查未定义变量（语义分析器负责）
            "no-undef": "off",
            
            // 不检查未使用变量（Def-Use 分析器负责）
            "no-unused-vars": "off"
        }
    },
    
    // 这是一个覆盖配置，专门用于测试文件，覆盖上面的严格设置
    {
        name: "test-override-config",
        files: ["**/*.test.js", "**/tests/**/*.js"], // 明确匹配测试文件
        languageOptions: {
            ecmaVersion: 2024, // 允许测试文件使用最新的ES语法
            sourceType: "script",
            
            // 测试环境额外的全局变量
            globals: {
                // Node.js 测试相关
                "describe": "readonly",
                "it": "readonly", 
                "before": "readonly",
                "after": "readonly",
                "beforeEach": "readonly",
                "afterEach": "readonly",
                "test": "readonly",
                "expect": "readonly",
                "assert": "readonly",
                
                // 模块系统（测试中可能使用）
                "require": "readonly",
                "module": "readonly",
                "exports": "readonly",
                "__dirname": "readonly",
                "__filename": "readonly",
                "process": "readonly",
                
                // 保持原有的全局变量
                "console": "writable",
                "logger": "writable"
            }
        },
        rules: {
            // 在测试文件中关闭ES3限制
            "quotes": ["error", "double"], // 保持双引号规范，但允许模板字符串
            "no-var": "off", // 测试中仍然可以使用var
            "eqeqeq": "off", // 测试中允许宽松比较
            "no-undef": "off", // 测试中常有全局变量
            "no-unused-vars": "off", // 测试代码可能有意外的未使用变量
            
            // 允许现代语法特性
            "no-template-curly-in-string": "off", // 允许模板字符串
            "prefer-arrow-callbacks": "off", // 不强制箭头函数
            "prefer-destructuring": "off", // 不强制解构
            "object-shorthand": "off", // 不强制对象简写
            "prefer-template": "off", // 不强制模板字符串
            
            // 测试相关的宽松规则
            "max-len": "off", // 测试代码可以较长
            "no-magic-numbers": "off", // 测试中允许魔法数字
            "no-console": "off" // 测试中允许console.log
        }
    }
];
