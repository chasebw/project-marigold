# Marigold Quick Start Script for Windows PowerShell

Write-Host "🌼 Starting Marigold..." -ForegroundColor Yellow

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js found: $(node --version)" -ForegroundColor Green

# Install backend dependencies if needed
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "`n📦 Installing backend dependencies..." -ForegroundColor Cyan
    Set-Location backend
    npm install
    Set-Location ..
}

# Install frontend dependencies if needed
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "`n📦 Installing frontend dependencies..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
}

# Check for .env file
if (-not (Test-Path "backend\.env")) {
    Write-Host "`n⚠️  No .env file found. Creating from template..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✓ Created backend\.env - Add your API keys if needed" -ForegroundColor Green
}

Write-Host "`n🚀 Starting servers..." -ForegroundColor Cyan
Write-Host "   Backend: http://localhost:3001" -ForegroundColor Gray
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host "`nPress Ctrl+C to stop both servers`n" -ForegroundColor Yellow

# Start backend in background
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -PassThru

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in background
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -PassThru

Write-Host "✓ Servers started!" -ForegroundColor Green
Write-Host "`nOpen http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host "Sample CSV file available: sample-data.csv`n" -ForegroundColor Gray

# Wait for user to press Ctrl+C
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "`n🛑 Stopping servers..." -ForegroundColor Yellow
    Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
    Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Servers stopped" -ForegroundColor Green
}
