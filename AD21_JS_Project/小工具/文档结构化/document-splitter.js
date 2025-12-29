const fs = require('fs-extra');
const path = require('path');
const mammoth = require('mammoth');

// 配置
const CONFIG = {
    inputFile: '参考示例/1.接口文档/Scripting API.docx',
    outputDir: 'output',
    maxFileSize: 80 * 1024, // 80KB
    encoding: 'utf8'
};

// 工具函数
const Utils = {
    // 中文和特殊字符转下划线
    sanitizeFileName: function(name) {
        return name
            .replace(/[\u4e00-\u9fa5]/g, '_') // 中文转下划线
            .replace(/[^\w\-]/g, '_') // 特殊字符转下划线
            .replace(/_+/g, '_') // 多个下划线合并为一个
            .replace(/^_|_$/g, '') // 去除首尾下划线
            .trim();
    },

    // 生成带序号的文件名
    generateFileName: function(index, title, extension = '.md') {
        const sanitized = this.sanitizeFileName(title);
        const paddedIndex = String(index).padStart(2, '0');
        return `${paddedIndex}-${sanitized}${extension}`;
    },

    // 获取文件大小（字节）
    getFileSize: function(content) {
        return Buffer.byteLength(content, CONFIG.encoding);
    },

    // 格式化文件大小
    formatFileSize: function(bytes) {
        return (bytes / 1024).toFixed(2) + ' KB';
    }
};

// 标题解析器
const HeaderParser = {
    // 标题级别正则表达式
    patterns: {
        h1: /^# (.+)$/gm,
        h2: /^## (.+)$/gm,
        h3: /^### (.+)$/gm,
        h4: /^#### (.+)$/gm,
        h5: /^##### (.+)$/gm
    },

    // 提取指定级别的所有标题
    extractHeaders: function(content, level) {
        const pattern = this.patterns['h' + level];
        const headers = [];
        let match;

        while ((match = pattern.exec(content)) !== null) {
            headers.push({
                title: match[1].trim(),
                index: match.index,
                level: level
            });
        }

        return headers;
    },

    // 提取所有级别的标题
    extractAllHeaders: function(content) {
        const allHeaders = [];
        
        for (let level = 1; level <= 5; level++) {
            const headers = this.extractHeaders(content, level);
            allHeaders.push(...headers);
        }

        // 按位置排序
        allHeaders.sort((a, b) => a.index - b.index);
        
        return allHeaders;
    },

    // 构建标题层级树
    buildHeaderTree: function(content) {
        const headers = this.extractAllHeaders(content);
        const tree = [];
        const stack = [];

        headers.forEach((header, index) => {
            const node = {
                ...header,
                children: [],
                content: ''
            };

            // 找到父节点
            while (stack.length > 0 && stack[stack.length - 1].level >= header.level) {
                stack.pop();
            }

            if (stack.length === 0) {
                tree.push(node);
            } else {
                stack[stack.length - 1].children.push(node);
            }

            stack.push(node);
        });

        // 提取每个标题对应的内容
        this.extractContentForHeaders(content, tree);
        
        return tree;
    },

    // 提取标题对应的内容
    extractContentForHeaders: function(content, headers, nextHeaderIndex = null) {
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const startIndex = header.index;
            
            // 找到下一个同级或更高级标题的位置
            let endIndex = content.length;
            if (i < headers.length - 1) {
                endIndex = headers[i + 1].index;
            } else if (nextHeaderIndex !== null) {
                endIndex = nextHeaderIndex;
            }

            header.content = content.substring(startIndex, endIndex).trim();

            // 递归处理子标题
            if (header.children.length > 0) {
                this.extractContentForHeaders(content, header.children, 
                    i < headers.length - 1 ? headers[i + 1].index : null);
            }
        }
    }
};

// 文档拆分器
const DocumentSplitter = {
    // 主拆分函数
    split: async function() {
        console.log('开始拆分文档...');
        
        try {
            // 1. 读取并转换docx文件
            const markdown = await this.convertDocxToMarkdown();
            console.log('文档转换完成，总长度:', Utils.formatFileSize(Utils.getFileSize(markdown)));

            // 2. 解析标题结构
            const headerTree = HeaderParser.buildHeaderTree(markdown);
            console.log('解析到', headerTree.length, '个一级标题');

            // 3. 创建输出目录
            await fs.ensureDir(CONFIG.outputDir);

            // 4. 递归拆分
            await this.splitByHierarchy(headerTree, CONFIG.outputDir, []);

            // 5. 生成索引文件
            await this.generateIndex(headerTree, CONFIG.outputDir);

            console.log('文档拆分完成！');
            
        } catch (error) {
            console.error('拆分过程中出错:', error);
            throw error;
        }
    },

    // 转换docx到markdown
    convertDocxToMarkdown: async function() {
        const result = await mammoth.convertToMarkdown(fs.readFileSync(CONFIG.inputFile));
        return result.value;
    },

    // 按层级拆分
    splitByHierarchy: async function(headers, basePath, pathHierarchy) {
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const currentPath = [...pathHierarchy, Utils.generateFileName(i + 1, header.title)];
            
            if (header.level === 1) {
                // 一级标题：创建目录
                const dirPath = path.join(basePath, Utils.generateFileName(i + 1, header.title, ''));
                await fs.ensureDir(dirPath);
                
                // 创建目录README
                await this.createDirectoryReadme(header, dirPath, currentPath);
                
                // 处理子标题
                if (header.children.length > 0) {
                    await this.splitByHierarchy(header.children, dirPath, currentPath);
                }
                
            } else if (header.level === 2) {
                // 二级标题：创建子目录
                const dirPath = path.join(basePath, Utils.generateFileName(i + 1, header.title, ''));
                await fs.ensureDir(dirPath);
                
                // 创建子目录README
                await this.createDirectoryReadme(header, dirPath, currentPath);
                
                // 处理子标题
                if (header.children.length > 0) {
                    await this.splitByHierarchy(header.children, dirPath, currentPath);
                }
                
            } else {
                // 三级及以上标题：创建文件
                await this.createContentFile(header, basePath, i + 1, currentPath);
            }
        }
    },

    // 创建目录README文件
    createDirectoryReadme: async function(header, dirPath, currentPath) {
        const readmeContent = this.generateDirectoryReadme(header, currentPath);
        const readmePath = path.join(dirPath, 'README.md');
        await fs.writeFile(readmePath, readmeContent, CONFIG.encoding);
        
        console.log('创建目录README:', readmePath);
    },

    // 生成目录README内容
    generateDirectoryReadme: function(header, currentPath) {
        let content = `# ${header.title}\n\n`;
        
        if (header.content) {
            // 提取标题后的描述内容（去除子标题）
            const description = header.content.split('\n').filter(line => {
                return !line.match(/^#+\s/);
            }).join('\n').trim();
            
            if (description) {
                content += description + '\n\n';
            }
        }

        // 添加子文件/目录链接
        if (header.children.length > 0) {
            content += '## 子章节\n\n';
            
            header.children.forEach((child, index) => {
                const fileName = Utils.generateFileName(index + 1, child.title);
                if (child.level <= 2) {
                    content += `- [${child.title}](${fileName}/README.md)\n`;
                } else {
                    content += `- [${child.title}](${fileName}.md)\n`;
                }
            });
        }

        return content;
    },

    // 创建内容文件
    createContentFile: async function(header, basePath, index, currentPath) {
        let content = header.content;
        let fileName = Utils.generateFileName(index, header.title);
        let filePath = path.join(basePath, fileName);

        // 检查文件大小，如果超过限制则拆分
        if (Utils.getFileSize(content) > CONFIG.maxFileSize) {
            console.log(`文件 ${fileName} 超过大小限制 (${Utils.formatFileSize(Utils.getFileSize(content))})，进行二次拆分...`);
            
            const parts = await this.splitLargeContent(content, header.level);
            
            for (let i = 0; i < parts.length; i++) {
                const partFileName = Utils.generateFileName(index, header.title) + `-part${i + 1}.md`;
                const partFilePath = path.join(basePath, partFileName);
                
                await fs.writeFile(partFilePath, parts[i], CONFIG.encoding);
                console.log('创建拆分文件:', partFilePath, Utils.formatFileSize(Utils.getFileSize(parts[i])));
            }
        } else {
            await fs.writeFile(filePath, content, CONFIG.encoding);
            console.log('创建文件:', filePath, Utils.formatFileSize(Utils.getFileSize(content)));
        }
    },

    // 拆分大内容
    splitLargeContent: async function(content, currentLevel) {
        const parts = [];
        const nextLevel = currentLevel + 1;
        
        if (nextLevel <= 5) {
            // 尝试按下一级标题拆分
            const subHeaders = HeaderParser.extractHeaders(content, nextLevel);
            
            if (subHeaders.length > 1) {
                // 按子标题拆分
                for (let i = 0; i < subHeaders.length; i++) {
                    const header = subHeaders[i];
                    const startIndex = header.index;
                    const endIndex = i < subHeaders.length - 1 ? subHeaders[i + 1].index : content.length;
                    
                    let partContent = content.substring(startIndex, endIndex).trim();
                    
                    // 如果还是太大，继续递归拆分
                    if (Utils.getFileSize(partContent) > CONFIG.maxFileSize) {
                        const subParts = await this.splitLargeContent(partContent, nextLevel);
                        parts.push(...subParts);
                    } else {
                        parts.push(partContent);
                    }
                }
            } else {
                // 没有子标题，按段落拆分
                parts.push(...this.splitByParagraphs(content));
            }
        } else {
            // 已经是最低级别，按段落拆分
            parts.push(...this.splitByParagraphs(content));
        }
        
        return parts;
    },

    // 按段落拆分
    splitByParagraphs: function(content) {
        const paragraphs = content.split(/\n\s*\n/);
        const parts = [];
        let currentPart = '';
        
        for (const paragraph of paragraphs) {
            const testContent = currentPart + (currentPart ? '\n\n' : '') + paragraph;
            
            if (Utils.getFileSize(testContent) > CONFIG.maxFileSize && currentPart) {
                parts.push(currentPart.trim());
                currentPart = paragraph;
            } else {
                currentPart = testContent;
            }
        }
        
        if (currentPart) {
            parts.push(currentPart.trim());
        }
        
        return parts.length > 0 ? parts : [content];
    },

    // 生成主索引文件
    generateIndex: async function(headerTree, basePath) {
        let indexContent = '# 文档索引\n\n';
        indexContent += '本文档由 Scripting API.docx 自动拆分生成\n\n';
        indexContent += '## 文件结构\n\n';
        
        headerTree.forEach((header, index) => {
            const dirName = Utils.generateFileName(index + 1, header.title);
            indexContent += `- [${header.title}](${dirName}/README.md)\n`;
        });
        
        const indexPath = path.join(basePath, 'INDEX.md');
        await fs.writeFile(indexPath, indexContent, CONFIG.encoding);
        
        console.log('创建主索引文件:', indexPath);
    }
};

// 主执行函数
async function main() {
    try {
        await DocumentSplitter.split();
        console.log('\n✅ 拆分完成！请查看 output 目录');
    } catch (error) {
        console.error('❌ 拆分失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    DocumentSplitter,
    Utils,
    HeaderParser,
    CONFIG
};
