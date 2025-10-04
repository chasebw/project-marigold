import type { Profile, SuggestedChart, TableData } from '../types'
import { v4 as uuid } from 'uuid'

function pickTimeField(profile: Profile): string | undefined {
  return Object.entries(profile.columns).find(([_, c]) => c.type === 'datetime')?.[0]
}

function pickNumericField(profile: Profile): string | undefined {
  return Object.entries(profile.columns).find(([_, c]) => c.type === 'numeric')?.[0]
}

function pickCategoryField(profile: Profile): string | undefined {
  return Object.entries(profile.columns).find(([_, c]) => c.type === 'categorical')?.[0]
}

export function suggestCharts(table: TableData, profile: Profile): SuggestedChart[] {
  const charts: SuggestedChart[] = []
  const time = pickTimeField(profile)
  const num = pickNumericField(profile)
  const cat = pickCategoryField(profile)

  if (time && num) {
    charts.push({
      id: uuid(),
      title: `${num} over time`,
      spec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { values: table.rows },
        mark: { type: 'line' },
        encoding: {
          x: { field: time, type: 'temporal' },
          y: { field: num, type: 'quantitative' },
          tooltip: [{ field: time, type: 'temporal' }, { field: num, type: 'quantitative' }],
        },
      },
    })
  }

  if (cat && num) {
    charts.push({
      id: uuid(),
      title: `${num} by ${cat}`,
      spec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { values: table.rows },
        mark: { type: 'bar' },
        encoding: {
          x: { field: cat, type: 'nominal', sort: '-y' },
          y: { aggregate: 'mean', field: num, type: 'quantitative' },
          tooltip: [{ field: cat, type: 'nominal' }, { aggregate: 'mean', field: num, type: 'quantitative' }],
        },
      },
    })
  }

  if (num) {
    charts.push({
      id: uuid(),
      title: `${num} distribution`,
      spec: {
        $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
        data: { values: table.rows },
        mark: 'bar',
        encoding: {
          x: { bin: true, field: num, type: 'quantitative' },
          y: { aggregate: 'count', type: 'quantitative' },
        },
      },
    })
  }

  return charts
}
