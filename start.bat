@echo off
echo Launching LMS via PowerShell...
powershell -ExecutionPolicy Bypass -File start.ps1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [CRITICAL ERROR] Initial launch failed.
    echo Please make sure 'start.ps1' exists in this folder.
    pause
)
