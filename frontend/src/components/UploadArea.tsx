import React, { useCallback, useRef, useState } from 'react'
import { parseCsv } from '../lib/csv'
import { profile as profileFn } from '../lib/profiling'
import { suggestCharts } from '../lib/charting'
import { useAppStore } from '../store/useAppStore'
import classNames from 'classnames'

export default function UploadArea() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const { setTable, setProfile, setSuggestions } = useAppStore()

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const table = await parseCsv(file)
    const prof = profileFn(table)
    const charts = suggestCharts(table, prof)
    setTable(table)
    setProfile(prof)
    setSuggestions(charts)
  }, [setProfile, setSuggestions, setTable])

  return (
    <div className="">
      <div
        className={classNames(
          'card-soft p-8 text-center cursor-pointer transition border-dashed',
          dragOver ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      >
        <p className="text-neutral-700">Drag & drop a CSV here, or click to select</p>
        <p className="text-sm muted mt-1">Max ~50MB, first rows will be previewed</p>
        <div className="mt-4">
          <button className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800">Choose file</button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  )
}
