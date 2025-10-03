# Project Marigold – Frontend

A sleek, Apple-inspired data analyst UI. Upload CSVs, preview rows, view a beautiful starter chart, and chat in a modern glass UI.

## Features
- Glassmorphism with soft gradients and subtle glow.
- CSV upload + in-browser parsing (PapaParse).
- Preview first rows.
- Starter Vega-Lite chart (auto sample until data is loaded).
- Chat + Insights panels (UI-only for now).

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```

3. Open the URL Vite prints (usually http://localhost:5173)

## Tech
- React + TypeScript + Vite
- Tailwind CSS
- Vega-Lite (via react-vega)
- PapaParse

## Notes
- No data leaves your browser in this UI.
- Hook up to the backend later by wiring chat actions and chart specs to your API.
