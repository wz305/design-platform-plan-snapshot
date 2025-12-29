# Stop Dev Server
param(
    [string]$Port = "5181"
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Stop Dev Server" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Find process on port
$portCheck = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | 
              Where-Object { $_.State -eq 'Listen' }

if ($portCheck) {
    $processId = $portCheck.OwningProcess
    $processName = (Get-Process -Id $processId -ErrorAction SilentlyContinue).ProcessName
    
    Write-Host "[INFO] Found process on port:" -ForegroundColor Yellow
    Write-Host "  Port: $Port" -ForegroundColor White
    Write-Host "  Process: $processName (PID: $processId)" -ForegroundColor White
    Write-Host ""
    
    try {
        Stop-Process -Id $processId -Force
        Write-Host "Process stopped successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to stop process: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[INFO] Port $Port is not in use" -ForegroundColor Gray
}

Write-Host ""
Write-Host "DONE!" -ForegroundColor Green
Write-Host ""
