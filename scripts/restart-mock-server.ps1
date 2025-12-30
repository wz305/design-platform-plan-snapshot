# Restart Mock Server (AD21 web-mock)
param(
    [string]$Port = "8080"
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Restart Mock Server" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = Join-Path $PSScriptRoot ".."
if (-not (Test-Path (Join-Path $projectRoot "package.json"))) {
    Write-Host "[ERROR] Project root not found: $projectRoot" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Port: $Port" -ForegroundColor Yellow
Write-Host "[INFO] Running: npm run mock-server:restart" -ForegroundColor Yellow
Write-Host ""

Set-Location $projectRoot
npm run mock-server:restart

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Mock server restart failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "DONE!" -ForegroundColor Green
Write-Host ""
