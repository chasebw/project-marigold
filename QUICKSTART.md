# 🚀 Quick Start Guide

Get Marigold running in 3 minutes!

## Option 1: Automated Start (Windows)

```powershell
.\start.ps1
```

This script will:
- Check for Node.js
- Install dependencies if needed
- Create .env file from template
- Start both backend and frontend servers
- Open the app at http://localhost:3000

## Option 2: Manual Start

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure (Optional)

```bash
cd backend
cp .env.example .env
# Edit .env and add OPENAI_API_KEY if you have one
```

**Note:** App works without API keys, but AI insights will be limited.

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Open App

Navigate to: http://localhost:3000

## Test the App

1. Use the included `sample-data.csv` file
2. Drag and drop it into the upload area
3. Explore the generated charts and insights!

## What You'll See

- **Upload Screen**: Drag & drop interface with feature highlights
- **Dashboard**: 4 tabs with different views of your data
  - Charts: Auto-generated visualizations
  - Insights: AI analysis and statistics
  - Chat: Ask questions about your data
  - Data: Raw data preview

## Common Issues

### Port Already in Use

If you see "Port 3000 is already in use":
```bash
# Kill the process using the port
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change the port in frontend/vite.config.ts
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

These are normal during development. The app will still run. To fix:
```bash
# Make sure dependencies are installed
npm install
```

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed configuration
- Check [README.md](README.md) for full documentation
- Try different CSV files to see various chart types
- Add your OpenAI API key for enhanced AI insights

## Sample Data

The included `sample-data.csv` contains:
- 30 rows of sales data
- Multiple data types (dates, categories, numbers)
- Perfect for testing all chart types

## Need Help?

- Check the console for error messages
- Ensure Node.js 18+ is installed
- Make sure ports 3000 and 3001 are available
- See SETUP.md for troubleshooting

---

Happy analyzing! 🌼
