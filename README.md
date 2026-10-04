# DEVQUEST — Full-Stack Journey Tracker

A separate desktop-friendly full-stack app for turning your developer journey into a game: daily quests, XP, coins, streaks, roadmap, DSA, projects, internship target, and a daily developer journal.

## Important: separate from ProHours
DEVQUEST has its own folder, PostgreSQL container, database, ports, environment file, and codebase. It does not modify ProHours.

## Safer setup
Use **PowerShell as a normal user** from the project folder:

```powershell
.\scripts\Setup-DevQuest.ps1
```

The setup script checks Node/npm/Docker, waits for the Docker engine, installs dependencies, creates a local `.env` with a generated JWT secret, starts PostgreSQL on **5433** (so it does not collide with ProHours on 5432), runs Prisma, and seeds demo data.

## Start browser version
```powershell
.\Start-DevQuest.ps1
```
Open http://localhost:5174.

## Start PC desktop app
```powershell
.\Start-DevQuest-Desktop.ps1
```
This launches DEVQUEST in its own Electron window. Docker Desktop must be running because PostgreSQL is used as the app's database.

## Demo
Email: `demo@journey.app`
Password: `Journey@12345`

## Known reliability fixes
- Journal entries use a **per-user date key**, so one user's journal can never conflict with another user's entry.
- DSA XP is awarded only the first time a problem is solved, preventing XP farming by toggling it.
- API uses localhost by default instead of a machine-specific LAN IP.
- CORS is restricted to the app's local origins instead of being permanently open.
- ProHours uses port 5432; DEVQUEST uses 5433.
- `.env` is not shipped in the project ZIP and is ignored by Git.
- Setup is scripted so environment checks happen before the app is started.
- Electron desktop launcher starts the backend automatically and opens the built frontend in a dedicated window.

## GitHub
`.gitignore` excludes `node_modules`, `.env`, build output, and logs. Never commit secrets.
