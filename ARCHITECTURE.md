# 🏗️ Marigold Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                    (Web Browser)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                   Port: 3000                                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ FileUpload   │  │  Dashboard   │  │   Header     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                           │                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  ChartGrid   │  │InsightsPanel │  │  ChatPanel   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                           │                                  │
│  ┌──────────────┐                                           │
│  │ DataPreview  │                                           │
│  └──────────────┘                                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Axios HTTP Requests
                         │ /api/analyze
                         │ /api/chat
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Express)                           │
│                   Port: 3001                                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Routes                             │  │
│  │  ┌──────────────┐         ┌──────────────┐          │  │
│  │  │   /analyze   │         │    /chat     │          │  │
│  │  └──────┬───────┘         └──────┬───────┘          │  │
│  └─────────┼────────────────────────┼──────────────────┘  │
│            │                        │                      │
│  ┌─────────▼────────────────────────▼──────────────────┐  │
│  │                   Services                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │ Profiler │  │  Charts  │  │ Insights │          │  │
│  │  └──────────┘  └──────────┘  └────┬─────┘          │  │
│  │                                    │                 │  │
│  │  ┌──────────┐                     │                 │  │
│  │  │   Chat   │─────────────────────┘                 │  │
│  │  └──────────┘                                        │  │
│  └───────────────────────────────────┬──────────────────┘  │
└────────────────────────────────────────┼───────────────────┘
                                         │
                                         │ API Calls
                                         ▼
                              ┌──────────────────┐
                              │   OpenAI API     │
                              │  (Optional)      │
                              └──────────────────┘
```

## Data Flow

### Upload & Analysis Flow

```
1. User uploads CSV
   │
   ├─► Frontend: FileUpload component
   │   └─► Validates file (type, size)
   │   └─► Parses with PapaParse
   │   └─► Sends to backend via FormData
   │
   ├─► Backend: POST /api/analyze
   │   └─► Multer receives file
   │   └─► PapaParse parses CSV
   │   │
   │   ├─► Profiler Service
   │   │   └─► Detects column types
   │   │   └─► Calculates statistics
   │   │   └─► Identifies missing values
   │   │   └─► Returns profile
   │   │
   │   ├─► Charts Service
   │   │   └─► Analyzes data structure
   │   │   └─► Selects chart types
   │   │   └─► Generates chart data
   │   │   └─► Returns chart specs
   │   │
   │   └─► Insights Service
   │       └─► Generates statistical summary
   │       └─► (Optional) Calls OpenAI
   │       └─► Returns insights text
   │
   └─► Frontend: Dashboard component
       └─► Displays results in tabs
       └─► Renders charts with Recharts
       └─► Shows insights and data
```

### Chat Flow

```
1. User types question
   │
   ├─► Frontend: ChatPanel component
   │   └─► Sends query + data + profile
   │
   ├─► Backend: POST /api/chat
   │   └─► Chat Service
   │       └─► Detects intent (filter/group/chart/general)
   │       │
   │       ├─► Filter intent
   │       │   └─► Filters data
   │       │   └─► Returns filtered results
   │       │
   │       ├─► Chart intent
   │       │   └─► Calls Charts Service
   │       │   └─► Returns new charts
   │       │
   │       └─► General intent
   │           └─► (Optional) Calls OpenAI
   │           └─► Returns answer
   │
   └─► Frontend: ChatPanel component
       └─► Displays response
       └─► Updates charts if provided
```

## Component Hierarchy

```
App
├── Header
│   └── Logo + Reset Button
│
└── Main Content
    │
    ├── FileUpload (initial state)
    │   ├── Dropzone
    │   ├── Upload Icon
    │   └── Feature Cards
    │
    └── Dashboard (after upload)
        ├── Stats Cards (4)
        │   ├── Total Rows
        │   ├── Columns
        │   ├── Charts Generated
        │   └── Data Quality
        │
        ├── Tab Navigation
        │   ├── Charts Tab
        │   ├── Insights Tab
        │   ├── Chat Tab
        │   └── Data Tab
        │
        └── Tab Content
            │
            ├── ChartGrid
            │   └── Chart Cards (3-4)
            │       ├── Title + Description
            │       ├── Recharts Component
            │       └── Export Button
            │
            ├── InsightsPanel
            │   ├── Key Insights Card
            │   ├── Column Analysis Grid
            │   ├── Data Quality Warnings
            │   └── Column Details Table
            │
            ├── ChatPanel
            │   ├── Message List
            │   │   └── Messages (user/assistant)
            │   ├── Suggestions (initial)
            │   └── Input + Send Button
            │
            └── DataPreview
                └── Data Table
                    ├── Headers
                    └── Rows (first 10)
```

## Backend Services

### Profiler Service

```typescript
Input: CSV data (array of objects)
       Column headers (array of strings)

Process:
1. For each column:
   - Count total values
   - Count missing values
   - Count unique values
   - Detect type (numeric/categorical/datetime/text)
   - Calculate statistics (if numeric)
   - Extract top values (if categorical)

Output: DataProfile
{
  columns: ColumnProfile[],
  totalRows: number
}
```

### Charts Service

```typescript
Input: CSV data, DataProfile

Process:
1. Identify column types
2. Apply chart selection rules:
   - Categorical + Numeric → Bar Chart
   - Datetime + Numeric → Line Chart
   - Numeric alone → Histogram
   - Two Numerics → Scatter Plot
3. Aggregate/transform data for each chart
4. Generate chart specifications

Output: ChartSuggestion[]
{
  id, type, title, xColumn, yColumn,
  data, description
}
```

### Insights Service

```typescript
Input: CSV data, DataProfile

Process:
1. Generate statistical insights:
   - Row/column counts
   - Numeric ranges and averages
   - Top categorical values
   - Missing value warnings
2. (Optional) Call OpenAI:
   - Format data summary
   - Request natural language insights
   - Parse response

Output: string (insights text)
```

### Chat Service

```typescript
Input: User query, CSV data, DataProfile

Process:
1. Detect intent from query:
   - Keywords: filter, group, sort, chart
2. Route to handler:
   - Filter → Apply filters
   - Group → Aggregate data
   - Chart → Call Charts Service
   - General → Call OpenAI or return help
3. Format response

Output: ChatResponse
{
  message: string,
  charts?: ChartSuggestion[],
  data?: any[]
}
```

## Technology Stack Details

### Frontend Stack

```
React 18.2.0
├── TypeScript 5.3.3 (type safety)
├── Vite 5.0.8 (build tool)
├── Tailwind CSS 3.3.6 (styling)
├── Recharts 2.10.3 (charts)
├── Lucide React 0.294.0 (icons)
├── Axios 1.6.2 (HTTP client)
├── React Dropzone 14.2.3 (file upload)
└── PapaParse 5.4.1 (CSV parsing)
```

### Backend Stack

```
Node.js + Express 4.18.2
├── TypeScript 5.3.3 (type safety)
├── Multer 1.4.5 (file uploads)
├── PapaParse 5.4.1 (CSV parsing)
├── OpenAI 4.20.1 (AI insights)
├── CORS 2.8.5 (cross-origin)
├── dotenv 16.3.1 (env vars)
└── Zod 3.22.4 (validation)
```

## API Contract

### POST /api/analyze

**Request:**
```
Content-Type: multipart/form-data
Body: { file: <CSV file> }
```

**Response:**
```json
{
  "profile": {
    "columns": [...],
    "totalRows": number
  },
  "charts": [...],
  "insights": "string",
  "preview": [...],
  "rowCount": number,
  "columnCount": number
}
```

### POST /api/chat

**Request:**
```json
{
  "query": "string",
  "data": [...],
  "profile": {...}
}
```

**Response:**
```json
{
  "message": "string",
  "charts": [...] (optional),
  "data": [...] (optional)
}
```

## Security Considerations

1. **File Upload**
   - Size limit: 50MB
   - Type validation: CSV only
   - Multer memory storage (no disk writes)

2. **Data Processing**
   - In-memory only (no persistence)
   - No data logging
   - Session-based (cleared on page refresh)

3. **API Keys**
   - Stored in .env (not committed)
   - Server-side only
   - Optional (app works without)

4. **CORS**
   - Enabled for local development
   - Configure for production domains

## Performance Optimizations

1. **Frontend**
   - Lazy loading components
   - Memoized chart data
   - Debounced chat input
   - Limited data preview (10 rows)

2. **Backend**
   - Streaming CSV parse
   - Limited chart data points (500 max)
   - Top-N aggregation (10 categories)
   - Async AI calls

3. **Charts**
   - Client-side rendering
   - Responsive containers
   - Efficient data structures

## Deployment Architecture

```
Production Setup:

Frontend (Static)          Backend (Node.js)
Vercel/Netlify            Railway/Render
     │                         │
     │                         │
     ├─────────────────────────┤
     │      HTTPS/WSS          │
     │                         │
     └─────────┬───────────────┘
               │
               ▼
         OpenAI API
      (Optional, External)
```

## Future Architecture

```
Planned Enhancements:

┌─────────────────────────────────────┐
│         Frontend (React)             │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Backend (Express)               │
├─────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐ │
│  │   Redis     │  │  PostgreSQL  │ │
│  │  (Cache)    │  │ (Sessions)   │ │
│  └─────────────┘  └──────────────┘ │
└────────┬────────────────────────────┘
         │
         ├──► OpenAI (Insights)
         ├──► Runware AI (Visuals)
         └──► ElevenLabs (Voice)
```

---

This architecture provides:
- ✅ Fast performance
- ✅ Scalable design
- ✅ Secure data handling
- ✅ Easy deployment
- ✅ Future extensibility
