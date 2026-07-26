@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (
  echo Private local preview: http://localhost:8000
  echo Press Ctrl+C to stop.
  py -m http.server 8000 --bind 127.0.0.1
  exit /b
)
where python >nul 2>&1
if %errorlevel%==0 (
  echo Private local preview: http://localhost:8000
  echo Press Ctrl+C to stop.
  python -m http.server 8000 --bind 127.0.0.1
  exit /b
)
echo Python was not found. Install Python 3 or use VS Code Live Server.
pause
