$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root
$env:PYTHONPATH = "$Root\backend"

$Python = ".\.venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
    throw "Virtual environment not found. Run .\scripts\setup-windows.ps1 first."
}

& $Python -m pytest backend/tests -q
& $Python -m alembic -c database/alembic.ini current
Push-Location frontend
npm run check
Pop-Location
Write-Host "Verification complete."
