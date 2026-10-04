@echo off
cd /d "%~dp0"
start "DEVQUEST Backend" cmd /k "npm --prefix backend run dev"
start "DEVQUEST Frontend" cmd /k "npm --prefix frontend run dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5174"
