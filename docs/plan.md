# Project Marigold – Plan

## Original Notes
data analyst agent. consume a csv, generate chart based on the info provided 
users provide the csv
app that is an assistant, user gives csv, creates graphs and valuable insights.
have a frontend that is like a chatbot
 
---
 
## Vision
Build an AI data analyst assistant that accepts user-provided CSVs, converses in a chat-like UI, generates relevant charts automatically, and surfaces clear, actionable insights.

## Goals
- **Primary**: Rapidly transform tabular data into understandable visuals and narrative insights with minimal user effort.
- **Secondary**: Provide an iterative chat loop for refinement, filtering, and deeper exploration.

## Target Users
- **Business users/analysts** who have CSV exports from tools (CRM, finance, product analytics) and need quick visuals/insights.
- **Founders/PMs** needing fast, presentation-ready charts and summaries.

## Core User Stories
- As a user, I upload a CSV and receive suggested charts and a short insights summary.
- As a user, I ask follow-up questions in chat (e.g., “trend by month?”) and get updated charts/answers.
- As a user, I pick a column to group by or filter and regenerate visuals.
- As a user, I download charts and the insights summary.

## Functional Requirements
- **CSV ingestion**: drag-and-drop and file picker; validate schema and size; preview first N rows.
- **Data profiling**: auto-detect column types (numeric, categorical, datetime, text), missing values, cardinality, outliers.
- **Chart suggestions**: recommend chart types per column(s) and question intent (bar, line, scatter, histogram, box, pie if appropriate, heatmap).
- **Insight generation**: textual summary including trends, correlations, anomalies, top/bottom categories, seasonality.
- **Chat UI**: natural language queries to transform data (filter, group, aggregate, window) and to request new charts.
- **Export**: download images (PNG/SVG) and a markdown/HTML insight report.

## Non-Functional Requirements
- **Performance**: handle CSVs up to ~50MB in-browser or via streamed backend processing; initial suggestions < 8s.
- **Reliability**: graceful degradation for messy data; helpful error messages.
- **Security**: do not persist user data by default; optional ephemeral storage; clear data deletion on session end.
- **Privacy**: no data sharing with third parties without explicit consent.

## System Architecture
- **Frontend (chatbot UI)**: file upload, data preview, chat panel, chart canvas, insight panel.
- **Backend API**: endpoints for upload, profiling, chart recommendation, transformation, insight generation, export.
- **Processing layer**: data frame operations, stats, chart spec builder, LLM-assisted NL->transform intent parsing.
- **Rendering**: return Vega-Lite/Plotly specs and PNG/SVG renders.

### Sequence (happy path)
1. User uploads CSV in `frontend/`.
2. Backend parses and profiles data; returns schema, sample, and recommended charts.
3. Frontend renders charts and an insight summary; opens chat suggestions.
4. User asks a question; backend interprets intent, transforms data, returns new chart/answer.

## Tech Stack Options
- **Frontend**: React + TypeScript, Next.js or Vite; UI lib (Mantine/Chakra/Tailwind);
  charts: Vega-Lite (via react-vega) or Plotly.
- **Backend**: Python (FastAPI) or Node (Express/Nest). For data: Pandas/Polars (Python) or DuckDB/WASM.
- **Insight/LLM**: OpenAI-compatible API or local model via server; prompt templates; guardrails.
- **Storage (optional/ephemeral)**: In-memory or temp files; S3-like for larger files if needed.

## Data Handling & Security
- Process data in-memory where possible; encrypt at rest if persisted.
- Strip PII columns on request; never log raw data.
- Configurable retention: default no persistence; manual “Save session”.

## UX Flow
- **Upload** -> preview (schema + sample) -> “Generate suggestions”.
- **Suggestions**: 3–5 charts + short summary + quick actions.
- **Chat**: placeholder prompts (e.g., “Show month-over-month growth for revenue”).
- **Refine**: filter chips, group-by selectors, column pickers.
- **Export**: Download chart(s) + summary report.

## Chart Types & Selection Logic
- Numeric vs time: line or area for time series; histogram/box for distribution.
- Categorical + numeric: bar (top-N), stacked bar for proportions.
- Numeric vs numeric: scatter with trendline, correlation coefficient.
- High-cardinality categories: aggregate to top-N + “other”.
- Auto-handle missing values and outliers.

## Insight Generation (Outline)
- Descriptive stats: mean/median/std, min/max, missing %, top categories.
- trends: moving averages, WoW/MoM/YoY deltas if dates.
- Relationships: correlations, rank orders, category contributions.
- Anomalies: z-score or STL residual spikes for time series.
- Narrative: templated summary grounded in computed stats; LLM to polish wording only.

## MVP Scope
- Single CSV upload (<= 50MB), no auth.
- Automatic profiling + 3 suggested charts + 1-paragraph insights.
- Chat with a small set of intents: filter, group, aggregate, sort, time resample.
- Export PNG and markdown report.

## Milestones & Timeline
- M1: Skeleton app – upload, preview, simple chart render (1 week).
- M2: Profiling + chart recommendations (1–2 weeks).
- M3: Insight summary v1 (1 week).
- M4: Chat intents (filter/group/aggregate) (2 weeks).
- M5: Polishing: export, error states, empty states, docs (1 week).

## Risks & Mitigations
- Messy/large CSVs -> streaming parse, robust type inference, user override.
- Hallucinated insights -> compute-first, LLM only for phrasing; attach evidence (stats shown inline).
- Privacy concerns -> default no persistence; clear delete; optional local-only mode.

## Open Questions
- Do we need authentication/multi-session persistence now?
- Preferred charting lib (Vega-Lite vs Plotly)?
- Upper bound on CSV size and expected user data domains?
