$ErrorActionPreference='Stop'
if (-not (Test-Path backend/.env)) { throw 'Run .\scripts\Setup-DevQuest.ps1 first.' }
docker compose up -d
Start-Process powershell -ArgumentList '-NoExit','-Command','npm --prefix backend run dev'
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList '-NoExit','-Command','npm --prefix frontend run dev'
Start-Sleep -Seconds 2
Start-Process 'http://localhost:5174'
