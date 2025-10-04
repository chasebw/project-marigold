import React from 'react'
import UploadArea from './components/UploadArea'
import DataPreview from './components/DataPreview'
import ChartCanvas from './components/ChartCanvas'
import ChatPanel from './components/ChatPanel'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-neutral-200/70">
        <div className="page-container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-neutral-900 text-white grid place-items-center text-sm">MG</div>
            <div>
              <div className="text-[15px] font-semibold text-neutral-900">Project Marigold</div>
              <div className="text-xs text-neutral-500">AI Data Analyst Assistant</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="badge">hackathon build</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="page-container">
          {/* hero */}
          <div className="relative py-10">
            <div className="absolute -z-10 -top-16 -right-10 h-56 w-56 rounded-full blur-3xl opacity-30" style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)'}} />
            <div className="absolute -z-10 -bottom-10 -left-10 h-56 w-56 rounded-full blur-3xl opacity-20" style={{ background: 'linear-gradient(135deg,#f59e0b,#06b6d4)'}} />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              <span className="gradient-text">Turn CSVs into vibes</span> and visuals.
            </h1>
            <p className="mt-2 text-neutral-600 max-w-2xl">Drop your data. Get smart charts and spicy insights in seconds. No manual wrangling. Just vibes.</p>
            <div className="mt-4 flex items-center gap-2">
              <button className="btn-primary">Upload CSV</button>
              <button className="btn-ghost">Try sample</button>
            </div>
          </div>

          <div className="py-2">
            <UploadArea />
            <DataPreview />
            <ChartCanvas />
          </div>
        </div>
      </main>

      <footer className="mt-auto sticky bottom-0 bg-white border-t border-neutral-200/70">
        <div className="page-container">
          <ChatPanel />
        </div>
      </footer>
    </div>
  )
}
