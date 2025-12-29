/**
 * encode-to-gb2312-enhanced.js
 * 增强版 GB2312 编码转换脚本
 * 
 * @author Altium Developer
 * @version 1.0.0
 * @description
 *   读取 ES3 转换后的文件
 *   进行 GB2312 编码转换
 *   输出最终的可部署文件
 */

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// 配置
const CONFIG = {
    inputFile: path.join(__dirname, '../dist/main.es3.js'),
    outputFile: path.join(__dirname, '../refactor_v2_deploy/main.js'),
    deployDir: path.join(__dirname, '../refactor_v2_deploy'),
    encoding: 'gb2312',
    fallbackEncoding: 'utf8'
};

/**
 * 日志输出函数
 */
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [GB2312-Encode] ${message}`);
}

/**
 * 错误处理函数
 */
function handleError(error, context) {
    log(`ERROR in ${context}: ${error.message}`);
    if (error.stack) {
        log(`Stack trace:\n${error.stack}`);
    }
    process.exit(1);
}

/**
 * 检查输入文件是否存在
 */
function checkInputFile() {
    if (!fs.existsSync(CONFIG.inputFile)) {
        throw new Error(`Input file not found: ${CONFIG.inputFile}`);
    }
    
    const stats = fs.statSync(CONFIG.inputFile);
    if (stats.size === 0) {
        throw new Error(`Input file is empty: ${CONFIG.inputFile}`);
    }
    
    log(`Input file found: ${CONFIG.inputFile} (${stats.size} bytes)`);
}

/**
 * 创建部署目录
 */
function ensureDeployDirectory() {
    try {
        if (!fs.existsSync(CONFIG.deployDir)) {
            fs.mkdirSync(CONFIG.deployDir, { recursive: true });
            log(`Created deploy directory: ${CONFIG.deployDir}`);
        } else {
            log(`Deploy directory exists: ${CONFIG.deployDir}`);
        }
    } catch (error) {
        handleError(error, 'ensureDeployDirectory');
    }
}

/**
 * 读取输入文件
 */
function readInputFile() {
    try {
        const content = fs.readFileSync(CONFIG.inputFile, 'utf8');
        log(`Read ${content.length} characters from input file`);
        return content;
    } catch (error) {
        handleError(error, 'readInputFile');
    }
}

/**
 * 使用 iconv-lite 进行 GB2312 编码转换
 */
function encodeWithIconv(content) {
    try {
        log('Attempting GB2312 encoding with iconv-lite...');
        
        const gb2312Buffer = iconv.encode(content, CONFIG.encoding);
        log(`iconv-lite encoding successful: ${gb2312Buffer.length} bytes`);
        
        return gb2312Buffer;
        
    } catch (error) {
        log(`iconv-lite encoding failed: ${error.message}`);
        return null;
    }
}

/**
 * 使用 Windows Script Host 的 ADODB.Stream 进行编码转换
 */
function encodeWithADODB(content) {
    if (process.platform !== 'win32') {
        log('ADODB.Stream method only available on Windows');
        return null;
    }
    
    try {
        log('Attempting GB2312 encoding with ADODB.Stream...');
        
        // 创建临时脚本文件
        const tempScriptPath = CONFIG.inputFile + '.temp_gb2312.js';
        const scriptContent = `
var fso = new ActiveXObject("Scripting.FileSystemObject");
var adStream = new ActiveXObject("ADODB.Stream");

try {
    adStream.Type = 2; // 文本类型
    adStream.Charset = "${CONFIG.encoding}";
    adStream.Open();
    adStream.WriteText(${JSON.stringify(content)});
    adStream.SaveToFile("${CONFIG.outputFile.replace(/\\/g, '\\\\')}", 2); // 2 = adSaveCreateOverWrite
    adStream.Close();
    
    WScript.Echo("ADODB.Stream encoding successful");
} catch (error) {
    WScript.Echo("ADODB.Stream encoding failed: " + error.message);
    WScript.Quit(1);
}
`;
        
        fs.writeFileSync(tempScriptPath, scriptContent, 'utf8');
        
        // 执行 Windows Script Host 脚本
        const { execSync } = require('child_process');
        const result = execSync(`cscript //nologo "${tempScriptPath}"`, { 
            encoding: 'utf8',
            stdio: 'pipe'
        });
        
        // 清理临时文件
        fs.unlinkSync(tempScriptPath);
        
        if (result.includes('successful')) {
            log('ADODB.Stream encoding successful');
            return fs.readFileSync(CONFIG.outputFile);
        } else {
            log(`ADODB.Stream encoding failed: ${result}`);
            return null;
        }
        
    } catch (error) {
        log(`ADODB.Stream encoding failed: ${error.message}`);
        return null;
    }
}

/**
 * 回退到 UTF-8 with BOM
 */
function encodeWithUTF8BOM(content) {
    try {
        log('Falling back to UTF-8 with BOM...');
        
        const utf8WithBOM = '\uFEFF' + content;
        const buffer = Buffer.from(utf8WithBOM, 'utf8');
        
        log(`UTF-8 with BOM encoding: ${buffer.length} bytes`);
        return buffer;
        
    } catch (error) {
        handleError(error, 'encodeWithUTF8BOM');
    }
}

/**
 * 写入输出文件
 */
function writeOutputFile(buffer) {
    try {
        fs.writeFileSync(CONFIG.outputFile, buffer);
        
        const stats = fs.statSync(CONFIG.outputFile);
        log(`Output file written: ${CONFIG.outputFile} (${stats.size} bytes)`);
        
        return stats;
        
    } catch (error) {
        handleError(error, 'writeOutputFile');
    }
}

/**
 * 验证编码结果
 */
function validateEncoding(originalContent, outputStats) {
    try {
        // 尝试读取编码后的文件
        const testContent = fs.readFileSync(CONFIG.outputFile);
        
        log('Encoding validation:');
        log(`  Original content length: ${originalContent.length} characters`);
        log(`  Encoded file size: ${outputStats.size} bytes`);
        log(`  Size ratio: ${(outputStats.size / originalContent.length).toFixed(2)}`);
        
        // 检查是否包含中文字符
        const hasChinese = /[\u4e00-\u9fff]/.test(originalContent);
        log(`  Contains Chinese characters: ${hasChinese}`);
        
        if (hasChinese) {
            log('  WARNING: Chinese characters detected, manual verification recommended');
        }
        
        return true;
        
    } catch (error) {
        log(`Encoding validation failed: ${error.message}`);
        return false;
    }
}

/**
 * 复制其他必要文件
 */
function copyAdditionalFiles() {
    const additionalFiles = [
        { src: '../dist/main.dfm', dst: '../refactor_v2_deploy/main.dfm' },
        { src: '../dist/RefactorV2Scripts.PrjScr', dst: '../refactor_v2_deploy/RefactorV2Scripts.PrjScr' }
    ];
    
    additionalFiles.forEach(file => {
        try {
            const srcPath = path.join(__dirname, file.src);
            const dstPath = path.join(__dirname, file.dst);
            
            if (fs.existsSync(srcPath)) {
                fs.copyFileSync(srcPath, dstPath);
                log(`Copied: ${srcPath} -> ${dstPath}`);
            } else {
                log(`WARNING: Source file not found: ${srcPath}`);
            }
        } catch (error) {
            log(`ERROR copying ${file.src}: ${error.message}`);
        }
    });
}

/**
 * 生成编码报告
 */
function generateReport(originalContent, outputStats, encodingMethod) {
    const report = {
        timestamp: new Date().toISOString(),
        inputFile: CONFIG.inputFile,
        outputFile: CONFIG.outputFile,
        originalSize: originalContent.length,
        encodedSize: outputStats.size,
        encodingMethod: encodingMethod,
        encoding: CONFIG.encoding,
        platform: process.platform,
        nodeVersion: process.version
    };
    
    log('Encoding Report:');
    log(`  Original size: ${report.originalSize} characters`);
    log(`  Encoded size: ${report.encodedSize} bytes`);
    log(`  Encoding method: ${report.encodingMethod}`);
    log(`  Platform: ${report.platform}`);
    
    return report;
}

/**
 * 主函数
 */
function main() {
    try {
        log('Starting GB2312 encoding process...');
        log(`Node.js version: ${process.version}`);
        log(`Platform: ${process.platform}`);
        
        // 检查 iconv-lite 是否可用
        if (!iconv) {
            throw new Error('iconv-lite is not available');
        }
        
        // 检查输入文件
        checkInputFile();
        
        // 创建部署目录
        ensureDeployDirectory();
        
        // 读取输入文件
        const originalContent = readInputFile();
        
        let encodedBuffer = null;
        let encodingMethod = 'unknown';
        
        // 尝试不同的编码方法
        encodedBuffer = encodeWithIconv(originalContent);
        if (encodedBuffer) {
            encodingMethod = 'iconv-lite';
        } else {
            encodedBuffer = encodeWithADODB(originalContent);
            if (encodedBuffer) {
                encodingMethod = 'ADODB.Stream';
            } else {
                encodedBuffer = encodeWithUTF8BOM(originalContent);
                encodingMethod = 'UTF-8-BOM';
            }
        }
        
        // 写入输出文件
        const outputStats = writeOutputFile(encodedBuffer);
        
        // 验证编码结果
        validateEncoding(originalContent, outputStats);
        
        // 复制其他文件
        copyAdditionalFiles();
        
        // 生成报告
        const report = generateReport(originalContent, outputStats, encodingMethod);
        
        // 保存报告
        const reportPath = path.join(__dirname, '../refactor_v2_deploy/encoding-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
        log(`Encoding report saved: ${reportPath}`);
        
        log('GB2312 encoding completed successfully!');
        log(`Output file: ${CONFIG.outputFile}`);
        log(`Encoding method: ${encodingMethod}`);
        
    } catch (error) {
        handleError(error, 'main');
    }
}

// 错误处理
process.on('uncaughtException', (error) => {
    handleError(error, 'uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    handleError(new Error(`Unhandled rejection: ${reason}`), 'unhandledRejection');
});

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    main,
    encodeWithIconv,
    encodeWithADODB,
    encodeWithUTF8BOM,
    CONFIG
};
