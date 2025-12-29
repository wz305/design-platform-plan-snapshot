# Def-Use 静态分析器检查流程

This workflow defines the comprehensive checking process for the Def-Use static analyzer to ensure code quality and AD environment compatibility.

## 🎯 检查流程概述

Def-Use静态分析器检查流程分为6个主要阶段，涵盖配置验证、环境准备、单文件分析、多文件分析、结果验证和集成验证。

---

## 🔍 **阶段一：配置验证**

### 1. 检查配置文件存在性
验证Def-Use分析器的配置文件是否正确存在和配置：

```bash
# 检查配置文件
node -e "
try {
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(__dirname, '../config/defuse-config.json');
  if (!fs.existsSync(configPath)) {
    console.error('❌ 配置文件不存在: ' + configPath);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('✅ 配置文件加载成功');
  console.log('📋 分析配置:', JSON.stringify(config.analysis, null, 2));
} catch (error) {
  console.error('❌ 配置文件错误:', error.message);
  process.exit(1);
}"
```

### 2. 验证目标文件路径
检查配置中定义的文件路径是否有效：

```bash
# 验证单文件目标
node -e "
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('config/defuse-config.json', 'utf8'));

const singleFiles = config.targets.singleFile.files;
console.log('🔍 检查单文件目标:');
singleFiles.forEach(file => {
  const fullPath = path.join(__dirname, '../', file);
  const exists = fs.existsSync(fullPath);
  console.log(exists ? '✅' : '⚠️', file + (exists ? '' : ' (构建后生成)'));
});
"
```

---

## 🔍 **阶段二：环境准备**

### 3. 文件读取安全限制
**⚠️ 重要安全约束：严格执行文件读取限制**

```bash
# 验证文件读取限制
node -e "
const fs = require('fs');
const path = require('path');

console.log('🔍 检查文件读取安全限制...');

// 检查配置中的目标文件是否符合限制
const configPath = path.join(__dirname, '../config/defuse-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// 严禁读取的文件列表
const prohibitedFiles = [
  'dist/main.js',
  'main.js',
  'build/main.js'
];

// 检查单文件目标
if (config.targets && config.targets.singleFile && config.targets.singleFile.files) {
  config.targets.singleFile.files.forEach(file => {
    const normalizedFile = path.normalize(file).replace(/\\\\/g, '/');
    const isProhibited = prohibitedFiles.some(prohibited => 
      normalizedFile.includes(prohibited) || prohibited.includes(normalizedFile)
    );
    
    if (isProhibited) {
      console.error('❌ 严禁读取文件:', file);
      console.error('   此文件被禁止直接读取，请使用其他验证方式');
      process.exit(1);
    } else {
      console.log('✅ 文件检查通过:', file);
    }
  });
}

// 检查多文件目标
if (config.targets && config.targets.multiFile && config.targets.multiFile.directories) {
  config.targets.multiFile.directories.forEach(dir => {
    const dirPath = path.join(__dirname, '../', dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => path.join(dir, dirent.name));
      
      files.forEach(file => {
        const fullPath = path.join(__dirname, '../', file);
        try {
          const stats = fs.statSync(fullPath);
          const fileSizeKB = stats.size / 1024;
          
          if (fileSizeKB > 50) {
            console.error('❌ 文件过大:', file);
            console.error('   大小:', fileSizeKB.toFixed(2), 'KB (限制: 50KB)');
            console.error('   严禁读取大于50KB的文件');
            process.exit(1);
          } else {
            console.log('✅ 文件大小检查通过:', file, '(' + fileSizeKB.toFixed(2) + 'KB)');
          }
        } catch (error) {
          console.warn('⚠️ 无法检查文件大小:', file, '-', error.message);
        }
      });
    }
  });
}

console.log('✅ 所有文件读取限制检查通过');
"
```

### 4. 依赖检查
验证所需的Node.js模块和版本：

```bash
# 检查依赖模块
node -e "
try {
  const acorn = require('acorn');
  const estraverse = require('estraverse');
  console.log('✅ acorn版本:', acorn.version);
  console.log('✅ estraverse版本:', estraverse.version);
  
  // 检查Node.js版本
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 14) {
    console.log('✅ Node.js版本兼容:', nodeVersion);
  } else {
    console.warn('⚠️ Node.js版本较低:', nodeVersion);
  }
} catch (error) {
  console.error('❌ 依赖检查失败:', error.message);
  process.exit(1);
}"
```

### 5. 输出目录准备
确保报告输出目录存在且可写：

```bash
# 准备输出目录
node -e "
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '../reports');
try {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
    console.log('✅ 创建报告目录:', reportsDir);
  } else {
    console.log('✅ 报告目录已存在:', reportsDir);
  }
  
  // 测试写入权限
  const testFile = path.join(reportsDir, 'permission-test.tmp');
  fs.writeFileSync(testFile, 'test');
  fs.unlinkSync(testFile);
  console.log('✅ 目录写入权限正常');
} catch (error) {
  console.error('❌ 目录准备失败:', error.message);
  process.exit(1);
}"
```

---

## 🔍 **阶段三：单文件分析**

### 6. 构建后文件分析
分析构建后的合并文件：

```bash
# 运行单文件分析
node scripts/defuse-runner.js single

# 检查分析结果
node -e "
const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../reports/defuse-single-file-report.json');
if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  console.log('✅ 单文件分析完成');
  console.log('📊 分析文件数:', report.files.length);
  console.log('🔍 发现问题:', report.summary.issues);
  
  // 显示关键问题
  if (report.issues.length > 0) {
    console.log('⚠️ 主要问题:');
    report.issues.slice(0, 5).forEach((issue, i) => {
      console.log('  ' + (i+1) + '. [' + issue.severity.toUpperCase() + '] ' + issue.message);
    });
  }
} else {
  console.error('❌ 单文件分析报告未生成');
  process.exit(1);
}"
```

### 7. 单文件问题检测
验证ES3语法兼容性和AD环境约束：

```bash
# 验证ES3语法合规性
node -e "
const fs = require('fs');
const path = require('path');

// 检查构建文件是否包含禁用语法
const distFile = path.join(__dirname, '../dist/main_utf8.js');
if (fs.existsSync(distFile)) {
  const content = fs.readFileSync(distFile, 'utf8');
  
  const prohibitedPatterns = [
    /const\s+\w+/g,           // const关键字
    /let\s+\w+/g,             // let关键字  
    /\(\s*\w+\s*\)\s*=>/g,    // 箭头函数
    /forEach\s*\(/g,          // forEach方法
    /\.then\s*\(/g,           // Promise
    /async\s+function/g,      // async函数
    /await\s+/g               // await
  ];
  
  let violations = 0;
  prohibitedPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      console.warn('⚠️ 发现禁用语法:', pattern.source, '(', matches.length, '次)');
      violations += matches.length;
    }
  });
  
  if (violations === 0) {
    console.log('✅ ES3语法合规性检查通过');
  } else {
    console.warn('⚠️ 发现', violations, '个ES3语法违规');
  }
} else {
  console.warn('⚠️ 构建文件不存在，跳过语法检查');
}"
```

---

## 🔍 **阶段四：多文件分析**

### 8. 源码模块分析
分析源码文件结构和模块关系：

```bash
# 运行多文件分析
node scripts/defuse-runner.js multi

# 检查文件覆盖范围
node -e "
const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../reports/defuse-multi-file-report.json');
if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  console.log('✅ 多文件分析完成');
  console.log('📊 分析文件数:', report.files.length);
  console.log('🔍 发现问题:', report.summary.issues);
  
  // 统计文件类型分布
  const fileTypes = {};
  report.files.forEach(file => {
    const ext = path.extname(file.path);
    fileTypes[ext] = (fileTypes[ext] || 0) + 1;
  });
  
  console.log('📁 文件类型分布:');
  Object.entries(fileTypes).forEach(([ext, count]) => {
    console.log('  ' + (ext || '无扩展名') + ': ' + count + ' 个文件');
  });
} else {
  console.error('❌ 多文件分析报告未生成');
  process.exit(1);
}"
```

### 9. 跨文件关系检查
验证模块间的依赖关系：

```bash
# 检查模块依赖关系
node -e "
const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../reports/defuse-multi-file-report.json');
if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  
  // 查找全局变量使用
  const globalVariables = new Set();
  const moduleExports = new Set();
  
  report.files.forEach(file => {
    file.variables && Object.entries(file.variables).forEach(([name, varInfo]) => {
      if (varInfo.definitions.length > 0) {
        moduleExports.add(name);
      }
      if (varInfo.usages.length > 0) {
        globalVariables.add(name);
      }
    });
  });
  
  console.log('🔍 模块关系分析:');
  console.log('  模块导出变量:', moduleExports.size);
  console.log('  全局使用变量:', globalVariables.size);
  
  // 检查可能的循环依赖
  const potentialIssues = [];
  report.files.forEach(file => {
    if (file.issues && file.issues.length > 0) {
      const undefinedVars = file.issues.filter(issue => issue.type === 'undefined-variable');
      if (undefinedVars.length > 0) {
        potentialIssues.push({
          file: path.basename(file.path),
          undefinedCount: undefinedVars.length
        });
      }
    }
  });
  
  if (potentialIssues.length > 0) {
    console.log('⚠️ 潜在依赖问题:');
    potentialIssues.forEach(issue => {
      console.log('  ' + issue.file + ': ' + issue.undefinedCount + ' 个未定义变量');
    });
  } else {
    console.log('✅ 模块依赖关系正常');
  }
}"
```

---

## 🔍 **阶段五：结果验证**

### 9. 报告生成验证
验证所有报告文件的生成和格式：

```bash
# 验证报告完整性
node -e "
const fs = require('fs');
const path = require('path');

const reports = [
  'defuse-single-file-report.json',
  'defuse-multi-file-report.json'
];

let allValid = true;

reports.forEach(reportName => {
  const reportPath = path.join(__dirname, '../reports', reportName);
  if (fs.existsSync(reportPath)) {
    try {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      
      // 验证报告结构
      const requiredFields = ['analysisType', 'timestamp', 'files', 'summary', 'issues'];
      const missingFields = requiredFields.filter(field => !report.hasOwnProperty(field));
      
      if (missingFields.length === 0) {
        console.log('✅ 报告格式正确:', reportName);
        console.log('  📊 文件数:', report.files.length);
        console.log('  🔍 问题数:', report.summary.issues);
      } else {
        console.error('❌ 报告格式错误:', reportName);
        console.log('  缺失字段:', missingFields.join(', '));
        allValid = false;
      }
    } catch (error) {
      console.error('❌ 报告解析失败:', reportName, '-', error.message);
      allValid = false;
    }
  } else {
    console.error('❌ 报告文件缺失:', reportName);
    allValid = false;
  }
});

if (allValid) {
  console.log('✅ 所有报告验证通过');
} else {
  console.error('❌ 报告验证失败');
  process.exit(1);
}"
```

### 10. 问题分类统计
详细统计和分析发现的问题：

```bash
# 生成问题统计报告
node -e "
const fs = require('fs');
const path = require('path');

function analyzeReport(reportPath, reportType) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  
  const stats = {
    totalIssues: report.summary.issues,
    byType: {},
    bySeverity: { error: 0, warning: 0 },
    byFile: {}
  };
  
  report.issues.forEach(issue => {
    // 按类型统计
    stats.byType[issue.type] = (stats.byType[issue.type] || 0) + 1;
    
    // 按严重程度统计
    stats.bySeverity[issue.severity] = (stats.bySeverity[issue.severity] || 0) + 1;
    
    // 按文件统计
    const fileName = issue.file || path.basename(reportPath, '.json');
    stats.byFile[fileName] = (stats.byFile[fileName] || 0) + 1;
  });
  
  console.log('\\n📊', reportType, '问题统计:');
  console.log('  总问题数:', stats.totalIssues);
  console.log('  错误级别:', stats.bySeverity.error);
  console.log('  警告级别:', stats.bySeverity.warning);
  
  console.log('  按类型分布:');
  Object.entries(stats.byType).forEach(([type, count]) => {
    console.log('    ' + type + ': ' + count);
  });
  
  return stats;
}

try {
  const singleStats = analyzeReport(
    path.join(__dirname, '../reports/defuse-single-file-report.json'),
    '单文件分析'
  );
  
  const multiStats = analyzeReport(
    path.join(__dirname, '../reports/defuse-multi-file-report.json'),
    '多文件分析'
  );
  
  const totalIssues = singleStats.totalIssues + multiStats.totalIssues;
  console.log('\\n🎯 总体统计:');
  console.log('  问题总数:', totalIssues);
  console.log('  严重错误:', singleStats.bySeverity.error + multiStats.bySeverity.error);
  console.log('  警告信息:', singleStats.bySeverity.warning + multiStats.bySeverity.warning);
  
  if (totalIssues === 0) {
    console.log('🎉 恭喜！未发现任何问题');
  } else if ((singleStats.bySeverity.error + multiStats.bySeverity.error) === 0) {
    console.log('✅ 无严重错误，仅', totalIssues, '个警告');
  } else {
    console.log('⚠️ 发现', (singleStats.bySeverity.error + multiStats.bySeverity.error), '个严重错误');
  }
  
} catch (error) {
  console.error('❌ 统计分析失败:', error.message);
  process.exit(1);
}"
```

---

## 🔍 **阶段六：集成验证**

### 11. 构建集成测试
验证Def-Use分析在构建流程中的集成：

```bash
# 测试构建集成
node scripts/build-integrator.js

# 检查集成报告
node -e "
const fs = require('fs');
const path = require('path');

const integrationReportPath = path.join(__dirname, '../reports/build-integration-report.json');
if (fs.existsSync(integrationReportPath)) {
  const report = JSON.parse(fs.readFileSync(integrationReportPath, 'utf8'));
  
  console.log('✅ 构建集成报告已生成');
  console.log('📊 集成统计:');
  console.log('  总耗时:', report.duration + 'ms');
  console.log('  通过阶段:', report.summary.passedStages + '/' + report.summary.totalStages);
  
  console.log('  各阶段状态:');
  Object.entries(report.stages).forEach(([key, stage]) => {
    const status = stage.success ? '✅' : '❌';
    console.log('    ' + status + ' ' + stage.name);
    if (stage.duration) {
      console.log('      耗时:', stage.duration + 'ms');
    }
  });
  
  if (report.stages.defuse) {
    console.log('  Def-Use分析状态:', report.stages.defuse.success ? '✅ 正常' : '❌ 失败');
    if (report.stages.defuse.issues) {
      console.log('  发现问题:', report.stages.defuse.issues + ' 个');
    }
  }
} else {
  console.warn('⚠️ 构建集成报告未生成');
}"
```

### 12. 失败条件检查
测试配置的失败条件是否正确触发：

```bash
# 测试失败条件
node -e "
const fs = require('fs');
const path = require('path');

// 读取配置
const configPath = path.join(__dirname, '../config/defuse-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('🔍 失败条件配置:');
console.log('  buildWithTest:', config.integration.buildWithTest);
console.log('  failOnError:', config.integration.failOnError);
console.log('  failOnWarning:', config.integration.failOnWarning);

// 检查当前问题数量
const singleReportPath = path.join(__dirname, '../reports/defuse-single-file-report.json');
const multiReportPath = path.join(__dirname, '../reports/defuse-multi-file-report.json');

let totalErrors = 0;
let totalWarnings = 0;

if (fs.existsSync(singleReportPath)) {
  const report = JSON.parse(fs.readFileSync(singleReportPath, 'utf8'));
  totalErrors += report.issues.filter(i => i.severity === 'error').length;
  totalWarnings += report.issues.filter(i => i.severity === 'warning').length;
}

if (fs.existsSync(multiReportPath)) {
  const report = JSON.parse(fs.readFileSync(multiReportPath, 'utf8'));
  totalErrors += report.issues.filter(i => i.severity === 'error').length;
  totalWarnings += report.issues.filter(i => i.severity === 'warning').length;
}

console.log('\\n📊 当前问题统计:');
console.log('  错误数:', totalErrors);
console.log('  警告数:', totalWarnings);

// 判断是否应该失败
const shouldFailOnError = config.integration.failOnError && totalErrors > 0;
const shouldFailOnWarning = config.integration.failOnWarning && totalWarnings > 0;
const shouldFail = shouldFailOnError || shouldFailOnWarning;

if (shouldFail) {
  console.log('❌ 根据配置，构建应该失败');
  if (shouldFailOnError) console.log('  原因: failOnError=true 且存在错误');
  if (shouldFailOnWarning) console.log('  原因: failOnWarning=true 且存在警告');
} else {
  console.log('✅ 根据配置，构建应该通过');
}

console.log('\\n🎯 建议:');
if (totalErrors > 0 && !config.integration.failOnError) {
  console.log('  考虑启用 failOnError=true 来确保错误被修复');
}
if (totalWarnings > 0 && !config.integration.failOnWarning) {
  console.log('  当前有警告但不会导致失败，可选择性启用 failOnWarning');
}
"
```

---

## 🎯 **质量标准和退出条件**

### ✅ **成功条件**
- 所有配置文件存在且格式正确
- 依赖模块正常加载
- 单文件和多文件分析成功执行
- 报告文件生成且格式正确
- 构建集成测试通过

### ⚠️ **警告条件**
- 发现警告级别问题但配置为不中断构建
- 部分文件分析跳过（如文件不存在）
- 非关键依赖缺失但有替代方案

### ❌ **失败条件**
- 配置文件缺失或格式错误
- 关键依赖模块无法加载
- 分析过程中出现异常
- 报告生成失败
- 构建集成测试失败（且配置要求失败时中断）

---

## 📋 **执行总结**

完成检查流程后，系统应输出完整的执行摘要：

```bash
echo "🎯 Def-Use静态分析器检查流程完成"
echo "=================================="
echo "✅ 配置验证: 通过"
echo "✅ 环境准备: 通过" 
echo "✅ 单文件分析: 完成"
echo "✅ 多文件分析: 完成"
echo "✅ 结果验证: 通过"
echo "✅ 集成验证: 通过"
echo ""
echo "📊 最终统计:"
echo "  分析文件数: [具体数字]"
echo "  发现问题数: [具体数字]"
echo "  严重错误: [具体数字]"
echo "  警告信息: [具体数字]"
echo ""
echo "🎉 检查流程执行成功！"
```

---

## 🔧 **使用方式**

### 完整检查流程
```bash
# 执行完整检查流程
node -e "
console.log('🚀 开始Def-Use静态分析器检查流程...');
console.log('');

// 这里会依次执行上述所有检查步骤
// 实际使用时可以将各阶段的脚本合并为一个完整的检查脚本

console.log('🎉 Def-Use静态分析器检查流程完成！');
"
```

### 快速检查模式
```bash
# 仅运行核心分析
node scripts/defuse-runner.js both
node scripts/build-integrator.js
```

### 单独阶段检查
```bash
# 仅检查配置
node -e "/* 配置验证脚本 */"

# 仅运行分析
node scripts/defuse-runner.js single
node scripts/defuse-runner.js multi

# 仅验证集成
node scripts/build-integrator.js
```

这个检查流程确保Def-Use静态分析器在AD环境中的可靠性和有效性，为代码质量提供保障。
