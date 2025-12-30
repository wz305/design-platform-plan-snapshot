# 设计平台开发服务器管理脚本

这个文件夹包含了管理设计平台开发服务器的 PowerShell 脚本。

## 脚本列表

### 1. `cleanup-processes.ps1`
清理开发服务器相关的进程和端口占用。

**功能：**
- 清理占用端口 5173、5181、3000 的进程
- 清理所有 Vite 相关的 Node.js 进程
- 提供详细的清理报告

**用法：**
```powershell
.\scripts\cleanup-processes.ps1
```

### 2. `start-dev-server.ps1`
前台启动开发服务器。

**功能：**
- 自动清理端口占用
- 检查并安装依赖
- 启动开发服务器（前台运行，会占用终端）

**用法：**
```powershell
.\scripts\start-dev-server.ps1
```

**参数：**
- `-Port <端口>`: 指定端口号（默认 5181）
- `-Clean`: 启动前先清理进程

**示例：**
```powershell
# 使用默认端口
.\scripts\start-dev-server.ps1

# 使用端口 3000 并清理
.\scripts\start-dev-server.ps1 -Port 3000 -Clean
```

### 3. `start-dev-server-background.ps1`
后台启动开发服务器（推荐）。

**功能：**
- 自动清理端口占用
- 检查并安装依赖
- 后台启动服务器（不占用终端）
- 等待服务器启动并验证
- 提供 Job ID 用于管理

**用法：**
```powershell
.\scripts\start-dev-server-background.ps1
```

**参数：**
- `-Port <端口>`: 指定端口号（默认 5181）
- `-Clean`: 启动前先清理进程

**示例：**
```powershell
# 使用默认端口后台启动
.\scripts\start-dev-server-background.ps1

# 使用端口 3000 并清理
.\scripts\start-dev-server-background.ps1 -Port 3000 -Clean
```

### 4. `stop-dev-server.ps1`
停止所有开发服务器进程。

**功能：**
- 调用清理脚本停止所有相关进程
- 简化的停止接口

**用法：**
```powershell
.\scripts\stop-dev-server.ps1
```

---

## 新增脚本（推荐使用）

### 5. `start-server-background.ps1`
后台启动开发服务器（不阻塞终端）。

**功能：**
- 自动清理端口占用（可选 -Clean 参数）
- 检查并安装依赖
- 后台启动服务器，在最小化的 PowerShell 窗口中运行
- 等待服务器启动并验证
- 提供进程 ID 用于管理
- 不阻塞当前终端

**用法：**
```powershell
.\scripts\start-server-background.ps1
```

**参数：**
- `-Port <端口>`: 指定端口号（默认 5181）
- `-Clean`: 启动前先清理进程

**示例：**
```powershell
# 使用默认端口后台启动
.\scripts\start-server-background.ps1

# 使用端口 3000 并清理
.\scripts\start-server-background.ps1 -Port 3000 -Clean
```

### 6. `stop-server.ps1`
停止开发服务器进程。

**功能：**
- 停止占用指定端口的进程
- 清理残留的 vite/node 进程
- 提供详细的停止报告

**用法：**
```powershell
.\scripts\stop-server.ps1
```

### 7. `restart-mock-server.ps1`
一键重启 Mock Server（AD21 web-mock，默认端口 8080）。

**功能：**
- 调用根目录 `npm run mock-server:restart`
- 重启 `AD21_JS_Project/web-mock/mock-server-es3.js`

**用法：**
```powershell
.\scripts\restart-mock-server.ps1
```

### 8. `start-server.bat`（批处理脚本）
双击即可启动的后台启动脚本。

**功能：**
- 简单的双击启动方式
- 自动调用 PowerShell 脚本
- 不阻塞终端

**用法：**
```batch
# 双击运行或在命令行中执行
.\scripts\start-server.bat
```

### 9. `stop-server.bat`（批处理脚本）
双击即可停止的批处理脚本。

**功能：**
- 简单的双击停止方式
- 自动调用 PowerShell 脚本

**用法：**
```batch
# 双击运行或在命令行中执行
.\scripts\stop-server.bat
```

## 推荐工作流程

### 方式一：使用 PowerShell 脚本（推荐）

**启动服务器：**
```powershell
# 后台启动（推荐，不阻塞终端）
.\scripts\start-server-background.ps1 -Clean

# 服务器将在 http://localhost:5181 运行
# 可以继续使用终端进行其他操作
```

**停止服务器：**
```powershell
.\scripts\stop-server.ps1
```

### 方式二：使用批处理脚本（最简单）

**启动服务器：**
```batch
# 双击运行或在命令行中执行
.\scripts\start-server.bat
```

**停止服务器：**
```batch
# 双击运行或在命令行中执行
.\scripts\stop-server.bat
```

### 方式三：使用 NPM 脚本

**启动服务器：**
```bash
cd designer-platform
npm run start:bg:clean
```

**停止服务器：**
```bash
npm run stop:dev
```

### 查看后台服务器日志
```powershell
# 如果服务器 Job ID 是 7
Receive-Job -Id 7

# 或者查看所有后台作业
Get-Job

# 清理完成的作业
Remove-Job -Id 7
```

## 注意事项

1. **端口占用**：脚本会自动处理端口占用问题，但如果有其他程序占用指定端口，可能需要手动处理。

2. **PowerShell 执行策略**：如果遇到执行策略问题，可能需要以管理员身份运行：
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **网络访问**：默认启动时会监听所有网络接口（`--host`），可以通过修改脚本去掉此参数。

4. **依赖安装**：如果 `node_modules` 不存在，脚本会自动运行 `npm install`。

## 故障排除

### 服务器启动失败
1. 检查端口是否被其他程序占用
2. 确认 Node.js 和 npm 已正确安装
3. 查看错误日志：`Receive-Job -Id <JobId>`

### 清理不彻底
如果手动清理：
```powershell
# 查看所有 Node.js 进程
Get-Process -Name "node"

# 终止特定进程
Stop-Process -Id <PID> -Force
```
scripts/
├── README.md                          # 本文档
├── cleanup-processes.ps1              # 进程清理脚本
├── start-dev-server.ps1               # 前台启动脚本
├── start-dev-server-background.ps1    # 后台启动脚本
├── stop-dev-server.ps1                # 停止服务器脚本
├── start-server-background.ps1       # 新后台启动脚本（推荐）
├── stop-server.ps1                    # 新停止服务器脚本
├── restart-mock-server.ps1            # 一键重启 Mock Server
├── start-server.bat                   # 批处理启动脚本
└── stop-server.bat                    # 批处理停止脚本
```

## NPM 脚本快捷方式

为了更方便地使用这些 PowerShell 脚本，我们在 `package.json` 中添加了对应的 npm 脚本命令。

### 可用的 NPM 脚本

| 命令 | 对应的 PowerShell 脚本 | 功能描述 |
|------|------------------------|----------|
| `npm run start:dev` | `start-dev-server.ps1` | 前台启动开发服务器 |
| `npm run start:dev:bg` | `start-dev-server-background.ps1` | 后台启动开发服务器（推荐） |
| `npm run stop:dev` | `stop-dev-server.ps1` | 停止开发服务器 |
| `npm run cleanup` | `cleanup-processes.ps1` | 清理相关进程 |
| `npm run restart:dev` | 组合命令 | 重启开发服务器（停止后启动） |
| `npm run start:clean` | 组合命令 | 清理后前台启动服务器 |
| `npm run start:bg:clean` | 组合命令 | 清理后后台启动服务器（推荐） |

### 推荐的 NPM 使用方式

#### 日常开发启动
```bash
# 推荐：清理并后台启动
npm run start:bg:clean

# 或者简单后台启动
npm run start:dev:bg
```

#### 停止服务器
```bash
npm run stop:dev
```

#### 重启服务器
```bash
npm run restart:dev
```

#### 只清理进程
```bash
npm run cleanup
```

### NPM 脚本的优势

1. **跨终端兼容**：在 PowerShell、CMD、Git Bash 等终端中都能使用
2. **简短易记**：命令更简洁，不需要记住完整的 PowerShell 脚本路径
3. **组合命令**：提供了常用的组合操作（如清理后启动）
4. **标准化**：符合 npm 的标准使用方式

### 使用示例

```bash
# 在 designer-platform 目录下
cd designer-platform

# 清理并后台启动服务器
npm run start:bg:clean

# 服务器运行在 http://localhost:5181
# 可以继续使用终端进行其他操作

# 当需要停止时
npm run stop:dev
```

### 注意事项

1. **执行策略**：npm 脚本会自动处理 PowerShell 执行策略问题
2. **路径处理**：脚本会自动找到正确的文件路径
3. **错误处理**：npm 脚本会传递 PowerShell 脚本的退出代码
4. **平台限制**：这些脚本目前仅在 Windows 系统上可用
scripts/
├── README.md                          # 本文档
├── cleanup-processes.ps1              # 进程清理脚本
├── start-dev-server.ps1                # 前台启动脚本
├── start-dev-server-background.ps1     # 后台启动脚本（推荐）
└── stop-dev-server.ps1                 # 停止服务器脚本
