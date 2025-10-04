# Marigold Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (optional, for AI-powered insights)

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your API keys:
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
RUNWARE_API_KEY=your_runware_api_key_here  # Optional
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here  # Optional
```

**Note:** The app will work without API keys, but AI-powered insights will be limited to statistical analysis only.

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will start on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will start on http://localhost:3000

### 4. Open the App

Navigate to http://localhost:3000 in your browser.

## Usage

1. **Upload CSV**: Drag and drop a CSV file or click to browse
2. **View Analysis**: Automatically generated charts and insights appear
3. **Explore Tabs**:
   - **Charts**: Interactive visualizations
   - **Insights**: AI-generated analysis and column details
   - **Chat**: Ask questions about your data
   - **Data**: Preview your raw data
4. **Export**: Download chart data from the Charts tab

## Features

- ✅ Automatic data profiling (types, stats, missing values)
- ✅ Smart chart suggestions (bar, line, scatter, histogram)
- ✅ AI-powered insights (with OpenAI API key)
- ✅ Interactive chat interface
- ✅ Data preview and exploration
- ✅ Export functionality
- ✅ Beautiful, modern UI with Tailwind CSS
- ✅ Responsive design

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use, you can change them:
- Backend: Edit `PORT` in `backend/.env`
- Frontend: Edit `server.port` in `frontend/vite.config.ts`

### API Key Issues
- The app works without API keys but with limited AI features
- Make sure your OpenAI API key is valid and has credits
- Check that `.env` file is in the `backend` directory (not root)

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, PapaParse, OpenAI
- **Data Processing**: In-memory CSV parsing and profiling
- **Charts**: Recharts (React wrapper for D3)

## API Endpoints

- `POST /api/analyze` - Upload and analyze CSV file
- `POST /api/chat` - Send chat queries about data
- `GET /api/health` - Health check

## Security Notes

- Data is processed in-memory and not persisted by default
- No data is shared with third parties (except OpenAI for insights if configured)
- CSV files up to 50MB are supported
- CORS is enabled for local development

## Future Enhancements

- Runware AI integration for custom chart backgrounds and visual data summaries
- ElevenLabs integration for voice-narrated insights
- Advanced filtering and data transformation
- Multiple chart export formats (PNG, SVG)
- Session persistence and data caching
- User authentication
