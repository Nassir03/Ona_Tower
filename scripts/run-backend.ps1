$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
$python = Join-Path $ProjectRoot ".venv\Scripts\python.exe"

if (-not (Test-Path $python)) {
    Write-Host "Python environment is missing. Running setup first..." -ForegroundColor Yellow
    & (Join-Path $PSScriptRoot "setup-windows.ps1")
}

& $python -c "import pydantic_core" *> $null
if ($LASTEXITCODE -ne 0) {
    throw "The .venv is damaged or incompatible. Run: npm run setup:windows"
}

& $python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8400
