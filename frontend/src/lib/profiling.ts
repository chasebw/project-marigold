import type { ColumnType, Profile, TableData } from '../types'

function inferType(values: any[]): ColumnType {
  const nonNull = values.filter((v) => v !== null && v !== undefined && v !== '')
  if (nonNull.length === 0) return 'text'
  const isAllNumbers = nonNull.every((v) => typeof v === 'number' && isFinite(v))
  if (isAllNumbers) return 'numeric'
  const asDates = nonNull.map((v) => new Date(v))
  const isDates = asDates.every((d) => !isNaN(d.getTime()))
  if (isDates) return 'datetime'
  if (nonNull.every((v) => typeof v === 'string' && v.length < 64)) return 'categorical'
  return 'text'
}

export function profile(table: TableData): Profile {
  const columns: Profile['columns'] = {}
  for (const f of table.fields) {
    const col = table.rows.map((r) => r[f])
    const type = inferType(col)
    const missing = col.filter((v) => v === null || v === undefined || v === '').length
    let cardinality: number | undefined
    if (type === 'categorical' || type === 'text') {
      const set = new Set(col.filter((v) => v !== null && v !== undefined && v !== ''))
      cardinality = set.size
    }
    columns[f] = { type, missing, cardinality }
  }
  const sample = { fields: table.fields, rows: table.rows.slice(0, 20) }
  return { columns, sample }
}
