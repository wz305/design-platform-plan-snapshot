/**
 * 自动修复引号格式脚本
 * 将单引号统一替换为双引号（符合 ES3 项目规范）
 * 基于构建配置文件，只修复实际参与构建的文件
 * 
 * 使用方法：
 * node scripts/fix-quotes.js
 */

var fs = require("fs");
var path = require("path");

/**
 * 修复单个文件的引号格式
 * @param {string} filePath 文件路径
 * @returns {boolean} 是否有修改
 */
function fixFileQuotes(filePath) {
    try {
        var content = fs.readFileSync(filePath, "utf8");
        var originalContent = content;
        var modified = false;
        
        // 只修复字符串字面量，不修复注释中的引号
        // 这是一个简化的修复，可能不够完美，但能解决大部分问题
        
        // 1. 修复简单的单引号字符串
        // 匹配：'text' (不包含转义字符)
        content = content.replace(/'([^'\\]*)'/g, function(match, text) {
            // 避免修复已经包含双引号的文本
            if (text.indexOf('"') === -1) {
                modified = true;
                return '"' + text + '"';
            }
            return match;
        });
        
        // 2. 修复包含转义字符的情况
        // 匹配：'text\'s' 或 'text\\n' 等
        content = content.replace(/'([^']*?)'/g, function(match, text) {
            if (text.length > 0 && text.indexOf('"') === -1) {
                modified = true;
                return '"' + text + '"';
            }
            return match;
        });
        
        if (modified) {
            fs.writeFileSync(filePath, content, "utf8");
            console.log("✅ 修复完成: " + filePath);
        }
        
        return modified;
        
    } catch (error) {
        console.error("❌ 修复失败: " + filePath + " - " + error.message);
        return false;
    }
}

/**
 * 主函数
 */
function main() {
    console.log("🔧 开始自动修复引号格式...");
    
    try {
        // 读取构建配置文件
        var mergeConfigPath = path.join(__dirname, "../config/merge-order.json");
        if (!fs.existsSync(mergeConfigPath)) {
            console.error("❌ 构建配置文件不存在: " + mergeConfigPath);
            process.exit(1);
        }
        
        var mergeConfig = JSON.parse(fs.readFileSync(mergeConfigPath, "utf8"));
        var buildFiles = mergeConfig.mergeOrder || [];
        
        console.log("📁 根据 config/merge-order.json 发现 " + buildFiles.length + " 个构建文件需要修复");
        
        // 验证文件是否存在
        var existingFiles = [];
        var missingFiles = [];
        
        for (var i = 0; i < buildFiles.length; i++) {
            var filePath = buildFiles[i];
            if (fs.existsSync(filePath)) {
                existingFiles.push(filePath);
            } else {
                missingFiles.push(filePath);
            }
        }
        
        if (missingFiles.length > 0) {
            console.log("⚠️  发现 " + missingFiles.length + " 个文件不存在:");
            for (var j = 0; j < missingFiles.length; j++) {
                console.log("   - " + missingFiles[j]);
            }
        }
        
        var jsFiles = existingFiles;
        console.log("   - 实际修复文件: " + jsFiles.length);
        
        if (jsFiles.length === 0) {
            console.log("⚠️  没有找到需要修复的文件");
            return;
        }
        
        var fixedCount = 0;
        var errorCount = 0;
        
        for (var k = 0; k < jsFiles.length; k++) {
            var filePath = jsFiles[k];
            
            try {
                if (fixFileQuotes(filePath)) {
                    fixedCount++;
                }
            } catch (error) {
                errorCount++;
                console.error("❌ 修复错误: " + filePath + " - " + error.message);
            }
        }
        
        console.log("\n📊 修复结果统计:");
        console.log("   总文件数: " + jsFiles.length);
        console.log("   已修复: " + fixedCount);
        console.log("   错误数: " + errorCount);
        
        if (fixedCount > 0) {
            console.log("\n✅ 引号格式修复完成！");
            console.log("   请运行 'npm run es3-validate' 验证修复结果");
        } else {
            console.log("\nℹ️  没有需要修复的文件");
        }
        
    } catch (error) {
        console.error("💥 修复过程失败: " + error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 如果直接运行此文件，执行修复
if (require.main === module) {
    main();
}

module.exports = { fixFileQuotes: fixFileQuotes, main: main };
