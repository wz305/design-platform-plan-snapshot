@echo off
setlocal

set PORT=8080
set BASE_URL=http://127.0.0.1:%PORT%

echo [one-click] starting mock server on %PORT%
start "AD21 Mock Server" cmd /k "cd /d %~dp0..\ && npm run mock"

timeout /t 1
start "" "%BASE_URL%/status"

echo [one-click] open %BASE_URL%/status
endlocal
