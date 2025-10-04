import React from 'react'
import { useAppStore } from '../store/useAppStore'

export default function DataPreview() {
  const { table, profile } = useAppStore()
  if (!table || !profile) return null

  return (
    <div className="mt-8">
      <h2 className="text-base font-semibold mb-3">Data preview</h2>
      <div className="card overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              {table.fields.map((f) => (
                <th key={f} className="px-3 py-2 text-left font-medium text-neutral-700 whitespace-nowrap">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.slice(0, 10).map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-neutral-50/60">
                {table.fields.map((f) => (
                  <td key={f} className="px-3 py-2 text-neutral-800 whitespace-nowrap">
                    {String(row[f])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-xs muted">
        {Object.entries(profile.columns).map(([name, c]) => (
          <span key={name} className="mr-4">{name}: {c.type}{c.cardinality ? ` (${c.cardinality})` : ''}</span>
        ))}
      </div>
    </div>
  )
}
