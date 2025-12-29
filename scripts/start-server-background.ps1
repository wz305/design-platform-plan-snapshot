# Backend Start Dev Server (Non-blocking)
param(
    [string]$Port = "5181"
)

# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Designer Platform - Start Server" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Project path
$projectPath = Join-Path $PSScriptRoot "..\designer-platform"
if (-not (Test-Path $projectPath)) {
    Write-Host "[ERROR] Project directory not found: $projectPath" -ForegroundColor Red
    exit 1
}

# Step 1: Clean old process on port
Write-Host "[Step 1/3] Cleaning port $Port..." -ForegroundColor Yellow
$portCheck = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
              Where-Object { $_.State -eq 'Listen' }

if ($portCheck) {
    $processId = $portCheck.OwningProcess
    $processName = (Get-Process -Id $processId -ErrorAction SilentlyContinue).ProcessName
    Write-Host "  Found process: $processName (PID: $processId)" -ForegroundColor Red
    
    try {
        Stop-Process -Id $processId -Force
        Write-Host "  Process terminated" -ForegroundColor Green
        Start-Sleep -Seconds 1
    }
    catch {
        Write-Host "  Failed to terminate: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  Port is free" -ForegroundColor Green
}
Write-Host ""

# Step 2: Check dependencies
Write-Host "[Step 2/3] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path (Join-Path $projectPath "node_modules"))) {
    Write-Host "  Installing dependencies..." -ForegroundColor Gray
    Set-Location $projectPath
    npm install --silent
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  Dependency installation failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "  Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  Dependencies ready" -ForegroundColor Green
}
Write-Host ""

# Step 3: Start server in background
Write-Host "[Step 3/3] Starting dev server..." -ForegroundColor Yellow

# Create startup script
$startScript = @"
cd "$projectPath"
npm run dev -- --port $Port --host
"@

$scriptPath = Join-Path $env:TEMP "start-dev-$Port.ps1"
$startScript | Out-File -FilePath $scriptPath -Encoding UTF8

# Start in background (hidden window, non-blocking)
$process = Start-Process powershell.exe `
    -ArgumentList "-NoProfile", "-ExecutionPolicy Bypass", "-File", "`"$scriptPath`"" `
    -WindowStyle Hidden `
    -PassThru

if ($process) {
    # Brief wait for process to initialize
    Start-Sleep -Seconds 2
    
    Write-Host "  Server starting..." -ForegroundColor Green
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "  Server Information" -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "  Port: $Port" -ForegroundColor White
    Write-Host "  Local: http://localhost:$Port" -ForegroundColor Cyan
    
    # Get network IP
    $localIP = Get-NetIPAddress -AddressFamily IPv4 | 
               Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | 
               Select-Object -First 1 -ExpandProperty IPAddress
    if ($localIP) {
        Write-Host "  Network: http://${localIP}:$Port" -ForegroundColor Cyan
    }
    
    Write-Host ""
    Write-Host "  Process PID: $($process.Id)" -ForegroundColor Gray
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[INFO] Terminal is NOT blocked" -ForegroundColor Green
    Write-Host "[INFO] Stop server: .\scripts\stop-server.ps1" -ForegroundColor Gray
    Write-Host ""
    Write-Host "DONE - Server started in background!" -ForegroundColor Green
} else {
    Write-Host "  Failed to start" -ForegroundColor Red
    exit 1
}

Write-Host ""
