export type TableData = {
  fields: string[]
  rows: any[]
}

export type ColumnType = 'numeric' | 'categorical' | 'datetime' | 'text'

export type Profile = {
  columns: Record<string, {
    type: ColumnType
    missing: number
    cardinality?: number
  }>
  sample: TableData
}

export type SuggestedChart = {
  id: string
  title: string
  description?: string
  spec: any
}

export type Insight = {
  summary: string
}
