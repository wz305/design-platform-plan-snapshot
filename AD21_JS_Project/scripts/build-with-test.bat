@echo off
echo 🚀 开始构建集成测试...

REM 调用构建集成器
node scripts/build-integrator.js

if %ERRORLEVEL% EQU 0 (
    echo ✅ 构建集成测试成功完成！
    exit /b 0
) else (
    echo ❌ 构建集成测试失败！
    exit /b 1
)
