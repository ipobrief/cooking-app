@echo off
cd /d "%~dp0"
echo Serving 요리앱 at http://localhost:8001
start "" chrome "http://localhost:8001"
python -m http.server 8001
