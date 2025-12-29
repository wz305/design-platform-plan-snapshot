$port = 8080
$baseUrl = "http://127.0.0.1:$port"

Write-Host "[one-click] starting mock server on $port"
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$PSScriptRoot\..`" && npm run mock" | Out-Null

Start-Sleep -Seconds 1
Start-Process $baseUrl + "/status" | Out-Null

Write-Host "[one-click] open $baseUrl/status"
