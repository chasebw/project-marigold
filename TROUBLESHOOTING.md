# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### ❌ "npm install" fails

**Symptoms**: Errors during `npm install`

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete lock files and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

#### ❌ Node version mismatch

**Symptoms**: "Unsupported engine" error

**Solution**:
```bash
# Check your Node version
node --version

# Should be 18.x or higher
# If not, download from https://nodejs.org/
```

### Server Issues

#### ❌ Port 3000 already in use

**Symptoms**: "EADDRINUSE: address already in use :::3000"

**Solutions**:
```powershell
# Windows PowerShell - Find and kill process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change the port in frontend/vite.config.ts
# Change: port: 3000 → port: 3002
```

#### ❌ Port 3001 already in use

**Symptoms**: Backend fails to start

**Solutions**:
```powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process

# Or change PORT in backend/.env
PORT=3002
```

#### ❌ Backend won't start

**Symptoms**: "Cannot find module" errors

**Solutions**:
```bash
cd backend

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check .env file exists
ls .env  # Should exist

# If not, copy from example
cp .env.example .env
```

### File Upload Issues

#### ❌ "Failed to analyze CSV"

**Symptoms**: Error after uploading file

**Possible Causes & Solutions**:

1. **File too large**
   - Max size: 50MB
   - Solution: Split your CSV or increase limit in backend

2. **Invalid CSV format**
   - Check file has headers
   - Check for proper comma separation
   - Try opening in Excel/Google Sheets first

3. **Special characters**
   - CSV should be UTF-8 encoded
   - Avoid special characters in headers

4. **Empty file**
   - File must have at least 1 row of data
   - Headers don't count as data

#### ❌ Upload hangs/freezes

**Symptoms**: Upload never completes

**Solutions**:
```bash
# Check backend is running
# Should see: "🌼 Marigold backend running on port 3001"

# Check browser console for errors (F12)

# Try smaller file first (sample-data.csv)

# Restart both servers
```

### Chart Issues

#### ❌ Charts not displaying

**Symptoms**: Empty chart areas

**Solutions**:
1. Check browser console (F12) for errors
2. Ensure data has numeric columns for charts
3. Try refreshing the page
4. Check if data was properly analyzed (view Data tab)

#### ❌ "No charts available"

**Symptoms**: Message instead of charts

**Cause**: Data doesn't match chart requirements

**Solutions**:
- Ensure CSV has at least one numeric column
- Check data types in Insights tab
- Try sample-data.csv to verify app works

### AI/Chat Issues

#### ❌ Chat responses are generic

**Symptoms**: "I can help you analyze..." message

**Cause**: OpenAI API key not configured

**Solutions**:
```bash
# Add API key to backend/.env
OPENAI_API_KEY=sk-your-key-here

# Restart backend server
```

#### ❌ "Failed to process query"

**Symptoms**: Error in chat

**Solutions**:
1. Check backend logs for errors
2. Verify OpenAI API key is valid
3. Check OpenAI account has credits
4. Try simpler questions first

#### ❌ Insights are basic/statistical only

**Cause**: OpenAI API key not configured (this is normal)

**Solution**: App works without API key but gives statistical insights only. Add OPENAI_API_KEY for AI-enhanced insights.

### TypeScript/Build Issues

#### ❌ TypeScript errors in IDE

**Symptoms**: Red squiggly lines everywhere

**Solutions**:
```bash
# These are normal before installing dependencies
npm install

# Reload VS Code window
# Ctrl+Shift+P → "Reload Window"

# Check tsconfig.json exists
```

#### ❌ Build fails

**Symptoms**: `npm run build` errors

**Solutions**:
```bash
# Clear TypeScript cache
rm -rf dist/ *.tsbuildinfo

# Reinstall dependencies
rm -rf node_modules
npm install

# Try build again
npm run build
```

### Browser Issues

#### ❌ Blank page

**Symptoms**: Nothing shows up

**Solutions**:
1. Check browser console (F12)
2. Verify frontend is running on port 3000
3. Try different browser
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check for JavaScript errors

#### ❌ CORS errors

**Symptoms**: "Access-Control-Allow-Origin" errors

**Solutions**:
```bash
# Verify backend CORS is configured (it should be)
# Check backend/src/index.ts has: app.use(cors())

# Ensure using proxy in vite.config.ts (it is)

# Try accessing directly:
# http://localhost:3001/api/health
# Should return: {"status":"ok"}
```

### Data Issues

#### ❌ Missing values shown as "null"

**Cause**: This is expected behavior

**Info**: The app correctly identifies and displays missing values. Check Insights tab for missing value statistics.

#### ❌ Wrong data types detected

**Symptoms**: Numbers shown as text, etc.

**Solutions**:
- Check CSV formatting
- Ensure numeric columns don't have text
- Remove currency symbols ($, €, etc.)
- Remove commas from numbers (1,000 → 1000)
- Dates should be in standard format (YYYY-MM-DD)

### Performance Issues

#### ❌ Slow analysis

**Symptoms**: Takes > 10 seconds

**Possible Causes**:
1. **Large file**: 50MB files take longer
2. **Many columns**: 100+ columns slow down profiling
3. **OpenAI API**: Can add 2-3 seconds
4. **Slow internet**: Affects API calls

**Solutions**:
- Try smaller file first
- Reduce number of columns
- Check internet connection
- Disable OpenAI (remove API key) for faster results

#### ❌ Browser freezes

**Symptoms**: Page becomes unresponsive

**Solutions**:
- Reduce file size
- Close other browser tabs
- Use Chrome/Edge (better performance)
- Increase browser memory limit

### Environment Issues

#### ❌ .env file not working

**Symptoms**: API keys not recognized

**Solutions**:
```bash
# Ensure .env is in backend/ directory (not root)
cd backend
ls .env  # Should exist

# Check file format (no quotes needed)
PORT=3001
OPENAI_API_KEY=sk-abc123

# Restart backend after changing .env
```

#### ❌ Environment variables undefined

**Symptoms**: `process.env.X` is undefined

**Solutions**:
1. Check .env file location (backend/.env)
2. Restart server after editing .env
3. No spaces around = sign
4. No quotes around values

## Getting Help

### Check Logs

**Backend logs**:
- Look at terminal running `npm run dev` in backend/
- Should see requests and any errors

**Frontend logs**:
- Open browser console (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### Verify Setup

```bash
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 8+

# Check backend dependencies installed
ls backend/node_modules  # Should have many folders

# Check frontend dependencies installed
ls frontend/node_modules  # Should have many folders

# Check servers running
# Backend: http://localhost:3001/api/health
# Frontend: http://localhost:3000
```

### Test with Sample Data

```bash
# Always test with sample-data.csv first
# This verifies the app works correctly
# Then try your own data
```

### Clean Slate

If all else fails, start fresh:

```bash
# Stop all servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules package-lock.json dist
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json dist
npm install

# Restart servers
cd ../backend
npm run dev

# New terminal
cd frontend
npm run dev
```

## Still Having Issues?

1. Check all files were created correctly
2. Verify Node.js 18+ is installed
3. Try the sample-data.csv file
4. Check browser console for errors
5. Check backend terminal for errors
6. Ensure ports 3000 and 3001 are available

## Known Limitations

These are by design, not bugs:

- ✓ 50MB file size limit
- ✓ First 10 rows in preview
- ✓ Top 10 categories in charts
- ✓ 500 points max in scatter plots
- ✓ Statistical insights only without OpenAI
- ✓ No data persistence
- ✓ Single file upload only

---

If you encounter an issue not listed here, check the browser console and backend logs for specific error messages.
