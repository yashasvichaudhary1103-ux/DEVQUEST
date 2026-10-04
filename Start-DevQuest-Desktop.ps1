$ErrorActionPreference='Stop'
if (-not (Test-Path backend/.env)) { throw 'Run .\scripts\Setup-DevQuest.ps1 first.' }
docker compose up -d
npm --prefix frontend run build
npm --prefix desktop run start
