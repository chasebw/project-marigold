import Papa from 'papaparse'
import type { TableData } from '../types'

export async function parseCsv(file: File, previewRows = 200): Promise<TableData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      preview: previewRows,
      skipEmptyLines: true,
      worker: true,
      complete: (res) => {
        const rows = res.data as any[]
        const fields = res.meta.fields || (rows[0] ? Object.keys(rows[0]) : [])
        resolve({ fields, rows })
      },
      error: reject,
    })
  })
}
