@echo off
setlocal
title The Quiet Regular - Lore Repository

REM Always run from the folder this .bat lives in.
cd /d "%~dp0"

echo ============================================
echo   The Quiet Regular - building your app
echo ============================================
echo.

REM 1) Make sure Node.js is installed.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo.
  echo Please install the LTS version from https://nodejs.org
  echo then double-click this file again.
  echo.
  pause
  exit /b 1
)

REM 2) Install / update dependencies. npm install is a no-op when everything is
REM already present, and picks up new packages after the project is updated.
echo Checking dependencies (may take a minute the first time)...
echo.
call npm install
if errorlevel 1 (
  echo.
  echo Dependency install failed. Check your internet connection and try again.
  pause
  exit /b 1
)

REM 3) Build the single self-contained HTML file.
echo Building the app...
echo.
call npm run build:single
if errorlevel 1 (
  echo.
  echo Build failed.
  pause
  exit /b 1
)

REM 4) Open it in the default browser.
echo.
echo Done. Opening the app...
start "" "dist-single\index.html"

exit /b 0
