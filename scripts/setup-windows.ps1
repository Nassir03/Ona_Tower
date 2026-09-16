$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "ONA Towers local setup" -ForegroundColor Cyan

function Find-CompatiblePython {
    foreach ($version in @("3.13", "3.12", "3.11", "3.10")) {
        & py "-$version" -c "import sys; print(sys.executable)" *> $null
        if ($LASTEXITCODE -eq 0) { return $version }
    }
    throw "Python 3.10-3.13 is required. Install Python 3.13, then run this script again."
}

$pythonVersion = Find-CompatiblePython
Write-Host "Using Python $pythonVersion"

$venvPython = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
$recreateVenv = $false

if (Test-Path $venvPython) {
    & $venvPython -c "import sys; raise SystemExit(0 if (3,10) <= sys.version_info[:2] < (3,14) else 1)" *> $null
    if ($LASTEXITCODE -ne 0) { $recreateVenv = $true }
}
elseif (Test-Path (Join-Path $ProjectRoot ".venv")) {
    $recreateVenv = $true
}

if ($recreateVenv) {
    Write-Host "Removing incompatible .venv..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force (Join-Path $ProjectRoot ".venv")
}

if (-not (Test-Path $venvPython)) {
    Write-Host "Creating .venv with Python $pythonVersion..."
    & py "-$pythonVersion" -m venv .venv
    if ($LASTEXITCODE -ne 0) { throw "Could not create .venv." }
}

& $venvPython -m pip install --upgrade pip
& $venvPython -m pip install -r requirements.txt
& $venvPython -c "import fastapi, pydantic_core, sqlalchemy; print('Backend Python dependencies OK')"

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example"
}

Write-Host "Checking database migrations..."
& $venvPython -m alembic upgrade head
if ($LASTEXITCODE -ne 0) { throw "Database migration failed." }

Write-Host "Installing frontend dependencies..."
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

Write-Host ""
Write-Host "Setup complete." -ForegroundColor Green
Write-Host "Run the whole project with: npm run run:windows"
