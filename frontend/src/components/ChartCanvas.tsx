import React from 'react'
import { VegaLite } from 'react-vega'
import { useAppStore } from '../store/useAppStore'

export default function ChartCanvas() {
  const { suggestions } = useAppStore()
  if (!suggestions.length) return null

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {suggestions.map((c) => (
        <div key={c.id} className="card p-4">
          <h3 className="font-medium text-neutral-900 mb-3 text-sm">{c.title}</h3>
          <div className="overflow-hidden rounded-lg border border-neutral-200/60">
            <VegaLite spec={c.spec} actions={false} />
          </div>
        </div>
      ))}
    </div>
  )
}
