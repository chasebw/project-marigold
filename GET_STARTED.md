# 🚀 Get Started with Marigold

## Welcome!

You now have a complete AI data analyst assistant. Here's everything you need to know.

## 📁 What You Have

```
project-marigold/
├── 📚 Documentation
│   ├── README.md              ← Project overview
│   ├── QUICKSTART.md          ← 3-minute setup
│   ├── SETUP.md               ← Detailed setup guide
│   ├── TROUBLESHOOTING.md     ← Fix common issues
│   ├── HACKATHON.md           ← Hackathon notes & demo script
│   ├── PROJECT_SUMMARY.md     ← Complete feature list
│   └── GET_STARTED.md         ← This file
│
├── 💻 Application Code
│   ├── backend/               ← Node.js API server
│   ├── frontend/              ← React web app
│   └── docs/                  ← Original planning docs
│
├── 🧪 Testing
│   └── sample-data.csv        ← Sample dataset
│
└── 🛠️ Tools
    └── start.ps1              ← Quick start script (Windows)
```

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

### 2️⃣ Start Servers

**Option A: Automated (Windows)**
```powershell
.\start.ps1
```

**Option B: Manual**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3️⃣ Open & Test

1. Open http://localhost:3000
2. Upload `sample-data.csv`
3. Explore the results! 🎉

## 📖 Documentation Guide

### For First-Time Users
1. **QUICKSTART.md** - Get running in 3 minutes
2. **README.md** - Understand what Marigold does
3. Try the app with sample-data.csv

### For Developers
1. **SETUP.md** - Detailed installation & configuration
2. **PROJECT_SUMMARY.md** - Technical architecture
3. **TROUBLESHOOTING.md** - Fix issues

### For Hackathon Demo
1. **HACKATHON.md** - Demo script & talking points
2. **README.md** - Feature highlights
3. Practice with sample-data.csv

## 🎯 What Can You Do?

### Upload & Analyze
- Drag & drop any CSV file (up to 50MB)
- Get instant data profiling
- See auto-generated charts
- Read AI-powered insights

### Explore Your Data
- **Charts Tab**: Interactive visualizations
- **Insights Tab**: Statistics & analysis
- **Chat Tab**: Ask questions in plain English
- **Data Tab**: Browse raw data

### Export Results
- Download chart data as JSON
- Copy insights for reports
- Share visualizations

## 🔑 Optional: Add AI Features

For enhanced AI insights, add your OpenAI API key:

```bash
# 1. Create .env file
cd backend
cp .env.example .env

# 2. Edit .env and add your key
OPENAI_API_KEY=sk-your-key-here

# 3. Restart backend
npm run dev
```

**Note**: App works without API key, but insights will be statistical only.

## 🎨 Features Included

✅ **CSV Upload** - Drag & drop interface  
✅ **Data Profiling** - Auto type detection  
✅ **Smart Charts** - Bar, line, scatter, histogram  
✅ **AI Insights** - Trends, patterns, anomalies  
✅ **Chat Interface** - Natural language queries  
✅ **Data Preview** - Table view with stats  
✅ **Export** - Download chart data  
✅ **Beautiful UI** - Modern, responsive design  

## 🧪 Test with Sample Data

The included `sample-data.csv` contains:
- 30 rows of sales data
- 7 columns (dates, categories, numbers)
- Perfect for testing all features

**What you'll see:**
- Bar chart: Sales by product
- Line chart: Sales over time
- Histogram: Sales distribution
- Scatter plot: Sales vs units correlation

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling)
- Recharts (visualizations)
- Lucide Icons

**Backend**
- Node.js + Express
- TypeScript
- PapaParse (CSV parsing)
- OpenAI (optional AI)

## 📊 Example Workflow

```
1. Upload CSV
   ↓
2. Backend analyzes data
   ↓
3. Frontend shows:
   - 4 stat cards
   - 3-4 charts
   - AI insights
   - Data preview
   ↓
4. User explores via:
   - Tabs
   - Chat queries
   - Data export
```

## 🚀 Next Steps

### Immediate
- [ ] Run the app
- [ ] Test with sample-data.csv
- [ ] Try your own CSV files
- [ ] Explore all 4 tabs

### Optional
- [ ] Add OpenAI API key for AI features
- [ ] Customize UI colors (tailwind.config.js)
- [ ] Deploy to production
- [ ] Add more chart types

### Future
- [ ] Integrate Runware AI (visual enhancements)
- [ ] Add ElevenLabs (voice features)
- [ ] Implement advanced filtering
- [ ] Add user authentication

## 💡 Tips

1. **Start small**: Use sample-data.csv first
2. **Check logs**: Watch terminal output for errors
3. **Use chat**: Ask questions like "What are the trends?"
4. **Export data**: Download charts for presentations
5. **Read docs**: Check TROUBLESHOOTING.md if stuck

## 🐛 Having Issues?

1. **Won't start?** → See TROUBLESHOOTING.md
2. **Port in use?** → Change ports in configs
3. **No charts?** → Check data has numeric columns
4. **Chat not working?** → Add OpenAI API key (optional)

## 📚 Documentation Index

| File | Purpose | When to Read |
|------|---------|--------------|
| **GET_STARTED.md** | This file - overview | First time |
| **QUICKSTART.md** | 3-minute setup | Getting started |
| **README.md** | Project overview | Understanding features |
| **SETUP.md** | Detailed setup | Configuration |
| **TROUBLESHOOTING.md** | Fix issues | When stuck |
| **PROJECT_SUMMARY.md** | Technical details | Development |
| **HACKATHON.md** | Demo guide | Presenting |

## 🎓 Learning Path

### Beginner
1. Read this file (GET_STARTED.md)
2. Follow QUICKSTART.md
3. Test with sample-data.csv
4. Explore the UI

### Intermediate
1. Read README.md for features
2. Try your own CSV files
3. Add OpenAI API key
4. Use chat interface

### Advanced
1. Read PROJECT_SUMMARY.md
2. Explore the code
3. Customize features
4. Deploy to production

## 🎉 You're Ready!

Everything is set up and ready to go. Just run:

```bash
.\start.ps1
```

Or manually start backend and frontend, then visit http://localhost:3000

**Happy analyzing!** 🌼

---

## Quick Reference

**Start App**: `.\start.ps1` or manual start  
**Frontend**: http://localhost:3000  
**Backend**: http://localhost:3001  
**Sample Data**: `sample-data.csv`  
**Help**: TROUBLESHOOTING.md  

**Questions?** Check the docs or console logs!
