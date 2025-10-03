import { VegaLite } from 'react-vega'
import type { VisualizationSpec } from 'react-vega'
import type { Row } from '../lib/types'

export default function ChartPanel({ rows }: { rows: Row[] }) {
  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: rows },
    mark: { type: 'bar', cornerRadius: 6 },
    encoding: {
      x: { field: Object.keys(rows[0] ?? { category: 'category' })[0], type: 'nominal' },
      y: { field: Object.keys(rows[0] ?? { value: 'value' })[1], type: 'quantitative' }
    },
    width: 'container',
    height: 320
  }
  return <VegaLite spec={spec} actions={false} />
}
