Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   LMS Launcher - PowerShell Engine" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# 1. Check Java
Write-Host "[1/3] Checking Java..." -NoNewline
try {
    $javaVer = java -version 2>&1
    Write-Host " [OK]" -ForegroundColor Green
} catch {
    Write-Host " [FAILED]" -ForegroundColor Red
    Write-Host "ERROR: Java not found. Please install JDK 17."
    Read-Host "Press Enter to exit"
    exit
}

# 2. Check Node
Write-Host "[2/3] Checking Node.js..." -NoNewline
try {
    $nodeVer = node -v
    Write-Host " [OK]" -ForegroundColor Green
} catch {
    Write-Host " [FAILED]" -ForegroundColor Red
    Write-Host "ERROR: Node.js not found. Please install Node.js."
    Read-Host "Press Enter to exit"
    exit
}

# 3. Check Folders
Write-Host "[3/3] Checking Folders..." -NoNewline
if ((Test-Path "backend") -and (Test-Path "frontend")) {
    Write-Host " [OK]" -ForegroundColor Green
} else {
    Write-Host " [FAILED]" -ForegroundColor Red
    Write-Host "ERROR: Project folders (backend/frontend) missing in $(Get-Location)"
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "`nAll checks passed! Starting servers..." -ForegroundColor Cyan

# Start Backend
Write-Host "Starting Backend (Port 8080)..."
Start-Process cmd -ArgumentList "/k cd backend && mvnw spring-boot:run" -WindowStyle Normal

# Start Frontend
Write-Host "Starting Frontend (Port 5173)..."
Start-Process cmd -ArgumentList "/k cd frontend && npm run dev" -WindowStyle Normal

Write-Host "`nServers are launching in separate windows." -ForegroundColor Green
Write-Host " - Frontend: http://localhost:5173"
Write-Host " - Backend: http://localhost:8080"
Write-Host "`nYou can close this launcher window now."
Read-Host "Press Enter to exit"
