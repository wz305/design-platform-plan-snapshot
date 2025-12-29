# NPM Documentation Fetcher

从 npm registry 获取指定包的最新文档和 README 的工具。

## 功能特点

- 📦 从 npm registry 获取包的元信息
- 📄 下载并格式化 README 文档
- 📝 支持指定版本获取
- 💾 自动保存为 Markdown 文件
- ⚡ 超时保护和错误处理
- 📊 显示包的详细信息（版本、描述、作者、许可证等）

## 使用方法

### 基本用法

获取最新版本的文档：

```bash
node npm-doc-fetcher.js <package-name>
```

示例：

```bash
node npm-doc-fetcher.js express
```

### 指定版本

获取特定版本的文档：

```bash
node npm-doc-fetcher.js <package-name> --version <version>
```

示例：

```bash
node npm-doc-fetcher.js lodash --version 4.17.21
```

### 指定输出文件

自定义输出文件路径：

```bash
node npm-doc-fetcher.js <package-name> --output <output-file>
```

示例：

```bash
node npm-doc-fetcher.js react --output my-react-doc.md
```

## 输出位置

默认情况下，文档会保存到 `docs/npm-docs/` 目录下，文件名为 `<package-name>.md` 或 `<package-name>-<version>.md`。

## 输出格式

生成的 Markdown 文件包含以下部分：

- **Package Information**：包的基本信息
  - 名称、版本、描述
  - 作者、许可证
  - 主页、仓库地址
  - 关键词

- **Available Versions**：可用的版本列表

- **README**：完整的 README 内容

## 示例输出

```bash
$ node npm-doc-fetcher.js express

[2024-01-15T10:30:00.000Z] [INFO] Starting documentation fetch...
[2024-01-15T10:30:00.500Z] [INFO] Fetching package info for: express
[2024-01-15T10:30:01.200Z] [SUCCESS] Package info fetched successfully
[2024-01-15T10:30:01.200Z] [INFO] Version: 4.18.2
[2024-01-15T10:30:01.200Z] [INFO] Description: Fast, unopinionated, minimalist web framework
[2024-01-15T10:30:01.300Z] [SUCCESS] Documentation saved to: docs/npm-docs/express.md
[2024-01-15T10:30:01.300Z] [INFO] Done!
```

## 配置

可以在脚本中修改 `CONFIG` 对象来调整配置：

```javascript
var CONFIG = {
  registryUrl: "registry.npmjs.org",  // npm registry 地址
  timeout: 30000,                      // 请求超时时间（毫秒）
  outputDir: "docs/npm-docs"           // 默认输出目录
};
```

## 依赖

- Node.js 内置模块：`https`、`fs`、`path`
- 无需安装额外的 npm 包

## 故障排除

### 网络错误

如果遇到网络错误，请检查：
- 网络连接是否正常
- 是否能访问 npm registry (https://registry.npmjs.org)
- 防火墙设置

### 超时错误

默认超时时间为 30 秒。如果需要更长时间，可以修改 `CONFIG.timeout` 配置。

### 包不存在

如果包不存在或名称错误，工具会显示相应的错误信息。

## 许可证

MIT
