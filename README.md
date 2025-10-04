# 🌼 Marigold - AI Data Analyst Assistant

Transform your CSV data into beautiful visualizations and actionable insights with the power of AI.

![Marigold](https://img.shields.io/badge/status-hackathon-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

> **📚 New here?** Check [INDEX.md](INDEX.md) for a complete documentation guide or [GET_STARTED.md](GET_STARTED.md) for a quick overview!

## Overview

Marigold is an AI-powered data analyst assistant that helps you quickly understand your data through:

- 📊 **Automatic Chart Generation** - Smart visualizations based on your data structure
- 🤖 **AI-Powered Insights** - Natural language summaries of trends, patterns, and anomalies
- 💬 **Interactive Chat** - Ask questions about your data in plain English
- 📈 **Data Profiling** - Automatic type detection, statistics, and quality checks
- 🎨 **Beautiful UI** - Modern, responsive interface built with React and Tailwind CSS

## Quick Start

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment (optional - works without API keys)
cd backend
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev

# Open http://localhost:3000
```

See [SETUP.md](SETUP.md) for detailed installation instructions.

## Features

### Core Functionality
- ✅ CSV upload via drag-and-drop or file picker
- ✅ Automatic data profiling (types, stats, missing values, cardinality)
- ✅ Smart chart recommendations (bar, line, scatter, histogram)
- ✅ AI-generated insights and summaries
- ✅ Interactive chat interface for data exploration
- ✅ Data preview with column details
- ✅ Export chart data

### Technical Highlights
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Data Processing**: PapaParse for CSV parsing, in-memory profiling
- **Charts**: Recharts for interactive visualizations
- **AI**: OpenAI GPT-3.5 for insights (optional)

## Usage

1. **Upload CSV**: Drag and drop your CSV file (up to 50MB)
2. **View Analysis**: Automatically generated charts and insights
3. **Explore**:
   - **Charts Tab**: Interactive visualizations
   - **Insights Tab**: AI analysis and column statistics
   - **Chat Tab**: Ask questions about your data
   - **Data Tab**: Preview raw data
4. **Export**: Download chart data as JSON

## Project Structure

```
project-marigold/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # React + TypeScript app
│   ├── src/
│   │   ├── App.tsx       # Main app component
│   │   ├── components/   # UI components
│   │   └── main.tsx      # Entry point
│   ├── package.json
│   └── vite.config.ts
├── docs/                 # Documentation
│   ├── plan.md          # Original project plan
│   └── tools.md         # External tools reference
├── SETUP.md             # Setup instructions
└── README.md            # This file
```

## API Endpoints

- `POST /api/analyze` - Upload and analyze CSV file
- `POST /api/chat` - Send chat queries about data
- `GET /api/health` - Health check

## Configuration

### Environment Variables (Backend)

```env
PORT=3001                          # Backend port
OPENAI_API_KEY=sk-...             # Optional: For AI insights
RUNWARE_API_KEY=...               # Optional: Future feature
ELEVENLABS_API_KEY=...            # Optional: Future feature
```

## Future Enhancements

- 🎨 **Runware AI**: Custom chart backgrounds, visual data summaries
- 🔊 **ElevenLabs**: Voice-narrated insights, audio briefings
- 📊 **Advanced Charts**: More chart types, custom styling
- 🔍 **Advanced Filtering**: Complex data transformations
- 💾 **Session Persistence**: Save and resume analysis sessions
- 🔐 **Authentication**: User accounts and data privacy

## Contributing

This is a hackathon project. Contributions are welcome!

## License

MIT License - see LICENSE file for details

## Acknowledgments

Built for a hackathon with focus on rapid development and user experience.

- React ecosystem for amazing developer tools
- OpenAI for powerful language models
- Recharts for beautiful visualizations
- Tailwind CSS for rapid UI development

---

Made with ❤️ and ☕
