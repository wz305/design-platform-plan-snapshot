@echo off
echo Starting AD21 JS Project Enhanced Build with Test...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM 执行增强构建脚本（包含测试验证）
echo Running enhanced build with test validation...
node scripts/build-integrator.js
set BUILD_EXIT_CODE=%errorlevel%

REM 检查构建结果
if %BUILD_EXIT_CODE% equ 0 (
    echo.
    echo Enhanced build completed successfully!
    echo.
    echo === Build Summary ===
    echo ✅ Dependencies validated
    echo ✅ Tests passed
    echo ✅ Production build completed
    echo ✅ Output validation passed
    echo.
    echo Output files are in the dist/ directory:
    echo   - main_utf8_test.js (Test version)
    echo   - main_utf8.js (UTF8 source)
    echo   - main.js (GB2312 encoded)
    echo   - main.dfm (UI form)
    echo   - Main.PrjScr (AD project file)
    echo   - build-report.json (build report)
    echo   - build-integration-report.json (integration report)
) else (
    echo.
    echo Enhanced build failed! Check the error messages above.
    echo Exit code: %BUILD_EXIT_CODE%
    echo.
    echo === Failed Stage Information ===
    echo Check the following reports for detailed error information:
    echo   - reports/dependency-build-report.json
    echo   - reports/test-runner-report.json
    echo   - reports/build-integration-report.json
)

echo.
pause
exit /b %BUILD_EXIT_CODE%
