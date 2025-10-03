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
- **Backend**: Python with **Streamlit** for the UI framework and **Pydantic-AI** for agent orchestration. 
  - Data processing: Pandas/Polars
  - Reference implementation: [Building a Data Analyst Agent with Streamlit and Pydantic-AI](https://medium.com/data-science-collective/building-a-data-analyst-agent-with-streamlit-and-pydantic-ai-step-by-step-guide-part-1-6403fd2ec243)
- **Insight/LLM**: OpenAI-compatible API or local model via server; prompt templates; guardrails managed through Pydantic-AI.
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

## Creative Tool Integrations

### Runware AI (Image Generation)
- **Custom chart backgrounds & themes**: Generate branded or themed backgrounds for exported charts (e.g., corporate templates, seasonal themes).
- **Data story illustrations**: Create visual metaphors or infographics to accompany insights (e.g., "sales growth" → upward arrow illustration, "market saturation" → full funnel visual).
- **Presentation-ready slides**: Auto-generate slide deck covers and section dividers with data-driven imagery.
- **Icon generation**: Create custom icons for different data categories or metrics dynamically based on the dataset domain.
- **Visual data summaries**: Transform key metrics into visual "data cards" with generated imagery (e.g., a trophy for "top performer", warning signs for anomalies).
- **Report branding**: Generate custom headers, footers, and watermarks for exported reports based on user preferences or company branding.

### ElevenLabs (Voice/Audio)
- **Voice-narrated insights**: Convert written insights into natural-sounding audio summaries that users can listen to while multitasking.
- **Accessibility mode**: Provide audio descriptions of charts and data patterns for visually impaired users.
- **Data briefings**: Generate daily/weekly audio briefings summarizing key changes in recurring datasets.
- **Interactive voice assistant**: Allow users to ask questions verbally and receive spoken answers with chart updates.
- **Presentation mode**: Auto-generate voice narration for exported slide decks or reports.
- **Multi-language support**: Translate insights to other languages with native-sounding voice output.
- **Alert notifications**: Speak anomaly alerts or threshold breaches (e.g., "Revenue dropped 15% this week").
- **Guided tutorials**: Voice-guided onboarding and feature walkthroughs for new users.

### Combined Use Cases
- **Multimedia reports**: Export packages that include charts, AI-generated illustrations, and voice narration for executive presentations.
- **Accessibility-first design**: Combine voice descriptions (ElevenLabs) with visual alternatives (Runware) for inclusive data exploration.
- **Branded content creation**: Generate complete, branded data stories with custom visuals and professional voice-overs for marketing or investor materials.
- **Educational mode**: Create tutorial content with voice explanations and visual examples for learning data analysis concepts.

## Open Questions
- Do we need authentication/multi-session persistence now?
- Preferred charting lib (Vega-Lite vs Plotly)?
- Upper bound on CSV size and expected user data domains?
- Which Runware AI and ElevenLabs features should be prioritized for MVP vs post-MVP?
- API rate limits and cost considerations for Runware AI and ElevenLabs integrations?
