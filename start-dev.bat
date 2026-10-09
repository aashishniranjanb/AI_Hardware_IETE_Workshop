@echo off
REM One-click: install dependencies (if needed) and start the dev server.
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js/npm not found. Install Node.js LTS from https://nodejs.org & pause & exit /b 1)
if not exist node_modules (
  echo Installing dependencies...
  call npm install || (echo npm install failed & pause & exit /b 1)
) else (
  echo Dependencies already installed. Delete node_modules to force a reinstall.
)
echo Starting dev server at http://localhost:3000 ...
start "" http://localhost:3000
call npm run dev
pause
