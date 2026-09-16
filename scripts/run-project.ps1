$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

$python = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
if (-not (Test-Path $python)) {
    Write-Host "First run detected. Setting up the project..." -ForegroundColor Yellow
    & (Join-Path $PSScriptRoot "setup-windows.ps1")
}

Write-Host "Starting ONA Towers backend and frontend..." -ForegroundColor Cyan
Start-Process powershell.exe -WorkingDirectory $ProjectRoot -ArgumentList @(
    '-NoExit', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $PSScriptRoot 'run-backend.ps1')
)
Start-Sleep -Seconds 2
Start-Process powershell.exe -WorkingDirectory $ProjectRoot -ArgumentList @(
    '-NoExit', '-ExecutionPolicy', 'Bypass', '-File', (Join-Path $PSScriptRoot 'run-frontend.ps1')
)

Write-Host "Backend:  http://127.0.0.1:8400" -ForegroundColor Green
Write-Host "API docs: http://127.0.0.1:8400/docs" -ForegroundColor Green
Write-Host "Website:  http://127.0.0.1:3010" -ForegroundColor Green
Write-Host "Admin:    http://127.0.0.1:3010/admin" -ForegroundColor Green
