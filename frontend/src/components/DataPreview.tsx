import type { Row } from '../lib/types'

export default function DataPreview({ rows }: { rows: Row[] }) {
  if (!rows.length) {
    return <p className="text-sm text-white/60">No data loaded yet. Upload a CSV to preview the first rows.</p>
  }

  const headers = Object.keys(rows[0] ?? {})
  const first = rows.slice(0, 10)

  return (
    <div>
      <h2 className="font-semibold tracking-tight mb-3">Preview</h2>
      <div className="overflow-auto thin-scroll">
        <table className="min-w-full text-left text-xs">
          <thead>
            <tr className="text-white/70">
              {headers.map((h) => (
                <th key={h} className="py-2 pr-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-white/80">
            {first.map((r, i) => (
              <tr key={i} className="border-t border-white/10">
                {headers.map((h) => (
                  <td key={h} className="py-2 pr-4 whitespace-nowrap">{String((r as any)[h])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
