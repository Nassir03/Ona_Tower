$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "ONA Towers setup"

if (-not (Test-Path ".venv")) {
    py -3.13 -m venv .venv
}

& ".\.venv\Scripts\python.exe" -m pip install --upgrade pip
& ".\.venv\Scripts\python.exe" -m pip install -r ".\backend\requirements.txt"

Push-Location ".\frontend"
npm ci
Pop-Location

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example. Review it before using Supabase."
}

Write-Host "Setup complete. Database migrations are intentionally NOT run by setup."
Write-Host "Run migrations separately with: .\scripts\migrate-database.ps1"
