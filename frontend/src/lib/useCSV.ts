import Papa from 'papaparse'
import type { Row } from './types'

export function useCSV() {
  const parseFile = (file: File) => new Promise<Row[]>((resolve, reject) => {
    Papa.parse<Row>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      worker: true,
      complete: (result: Papa.ParseResult<Row>) => resolve(result.data as Row[]),
      error: (err: unknown) => reject(err)
    })
  })

  return { parseFile, loading: false, error: null as unknown }
}
