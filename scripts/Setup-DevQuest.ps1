$ErrorActionPreference = 'Stop'
Write-Host "`n=== DEVQUEST SETUP ===`n" -ForegroundColor Cyan

function Need($cmd, $name) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    throw "$name is not installed or not on PATH. Install it, restart PowerShell, then run this script again."
  }
}
Need node "Node.js"
Need npm "npm"
Need docker "Docker Desktop"

Write-Host "Checking Docker Desktop..." -ForegroundColor Yellow
docker info | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Docker Desktop is installed but the Docker engine is not running. Open Docker Desktop, wait until it says Running, then retry." }

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm --prefix backend install
npm --prefix frontend install
npm --prefix desktop install

if (-not (Test-Path backend/.env)) {
  Copy-Item backend/.env.example backend/.env
  $secret = [Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
  (Get-Content backend/.env) -replace 'replace-with-a-long-random-secret', $secret | Set-Content backend/.env
}

Write-Host "Starting isolated PostgreSQL on port 5433..." -ForegroundColor Yellow
docker compose up -d

Write-Host "Preparing Prisma..." -ForegroundColor Yellow
npm --prefix backend exec -- prisma generate
npm --prefix backend exec -- prisma migrate dev --name init
npm --prefix backend run seed

Write-Host "`nSETUP COMPLETE!" -ForegroundColor Green
Write-Host "Run .\Start-DevQuest.ps1 to launch the browser version." -ForegroundColor Green
Write-Host "Run .\Start-DevQuest-Desktop.ps1 to launch the PC app window." -ForegroundColor Green
