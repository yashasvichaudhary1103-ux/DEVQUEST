@echo off
cd /d "%~dp0"
call npm --prefix frontend run build || (echo Frontend build failed.& pause & exit /b 1)
call npm --prefix desktop run start
