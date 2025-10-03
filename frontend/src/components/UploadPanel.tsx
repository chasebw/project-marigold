import { useRef } from 'react'
import { useCSV } from '../lib/useCSV'
import type { Row } from '../lib/types'
import { mockRows } from '../sample/mockRows'

export default function UploadPanel({ onParsed }: { onParsed: (rows: Row[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { parseFile, loading, error } = useCSV()

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    const rows = await parseFile(file)
    onParsed(rows)
  }

  return (
    <div>
      <h2 className="font-semibold tracking-tight mb-3">Upload CSV</h2>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        className="group cursor-pointer rounded-xl border border-dashed border-white/20 p-6 text-center hover:border-white/40 transition"
      >
        <div className="mx-auto mb-2 h-12 w-12 rounded-2xl bg-white/10 grid place-items-center group-hover:bg-white/20 transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-80">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-sm text-white/80">Drag & drop your CSV here or <span className="underline">browse</span></p>
        <p className="text-xs text-white/50 mt-1">We don't upload anywhere. Processed in-browser.</p>
        <input ref={inputRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="px-3 py-1.5 text-xs rounded-lg bg-white/20 hover:bg-white/30 transition border border-white/30"
          onClick={() => onParsed(mockRows)}
        >
          Load Sample Data
        </button>
      </div>
      {loading && <p className="mt-2 text-xs text-white/60">Parsing…</p>}
      {error && <p className="mt-2 text-xs text-red-300">{String(error)}</p>}
    </div>
  )
}
