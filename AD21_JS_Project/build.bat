@echo off
echo Starting AD21 JS Project Build...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM 执行构建脚本
echo Running build script...
node build\build.js
set BUILD_EXIT_CODE=%errorlevel%

REM 检查构建结果
if %BUILD_EXIT_CODE% equ 0 (
    echo.
    echo Build completed successfully!
    echo Output files are in the dist/ directory:
    echo   - main.js (GB2312 encoded)
    echo   - main_utf8.js (UTF8 source)
    echo   - main.dfm (UI form)
    echo   - Main.PrjScr (AD project file)
    echo   - build-report.json (build report)
) else (
    echo.
    echo Build failed! Check the error messages above.
    echo Exit code: %BUILD_EXIT_CODE%
)

echo.
//pause
exit /b %BUILD_EXIT_CODE%
