import type { Row } from '../lib/types'

export default function InsightPanel({ rows }: { rows: Row[] }) {
  const hasData = rows.length > 0
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold tracking-tight">Insights</h2>
      </div>
      {!hasData && (
        <p className="text-sm text-white/70">Upload data to get instant, AI-style insights and suggested charts.</p>
      )}
      {hasData && (
        <ul className="text-sm text-white/85 list-disc pl-5 space-y-1">
          <li>Top category appears dominant; consider a breakdown by time.</li>
          <li>Check for outliers in numeric columns with a box plot.</li>
          <li>Try a monthly trend to spot seasonality.</li>
        </ul>
      )}
    </div>
  )
}
