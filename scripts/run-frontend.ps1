$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (-not (Test-Path (Join-Path $ProjectRoot "node_modules"))) {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed." }
}

npm run dev
