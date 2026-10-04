@echo off
setlocal EnableExtensions
cd /d "%~dp0"
echo.
echo ========================================
echo       DEVQUEST WINDOWS SETUP
echo ========================================
echo.
where node >nul 2>nul || (echo ERROR: Node.js not found. Install Node.js, restart PowerShell, then run this again.& pause & exit /b 1)
where npm >nul 2>nul || (echo ERROR: npm not found. Restart PowerShell after installing Node.js.& pause & exit /b 1)
where docker >nul 2>nul || (echo ERROR: Docker not found. Install Docker Desktop, then run this again.& pause & exit /b 1)
echo Checking Docker engine...
docker info >nul 2>nul || (echo ERROR: Docker Desktop is not running. Open Docker Desktop and wait until it says Running.& pause & exit /b 1)
echo Installing backend dependencies...
call npm --prefix backend install || goto :fail
echo Installing frontend dependencies...
call npm --prefix frontend install || goto :fail
echo Installing desktop dependencies...
call npm --prefix desktop install || goto :fail
if not exist backend\.env (
  copy /Y backend\.env.example backend\.env >nul
  powershell -NoProfile -Command "$s=[Convert]::ToBase64String((1..48 | %% { Get-Random -Maximum 256 })); (Get-Content 'backend/.env') -replace 'replace-with-a-long-random-secret',$s | Set-Content 'backend/.env'"
)
echo Starting DEVQUEST PostgreSQL on port 5433...
call docker compose up -d || goto :fail
echo Generating Prisma client...
call npm --prefix backend exec -- prisma generate || goto :fail
echo Creating database tables...
call npm --prefix backend exec -- prisma migrate dev --name init || goto :fail
echo Loading starter data...
call npm --prefix backend run seed || goto :fail
echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo Demo login: demo@journey.app / Journey@12345
echo.
echo To start the browser version: Start-DevQuest.cmd
echo To start the desktop app: Start-DevQuest-Desktop.cmd
echo.
pause
exit /b 0
:fail
echo.
echo SETUP FAILED. The command above shows the reason.
pause
exit /b 1
