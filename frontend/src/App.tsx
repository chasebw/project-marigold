import { useState } from 'react'
import { motion } from 'framer-motion'
import { VegaLite } from 'react-vega'
import type { VisualizationSpec } from 'react-vega'
import NavBar from './components/NavBar'
import GlassCard from './components/GlassCard'
import UploadPanel from './components/UploadPanel'
import DataPreview from './components/DataPreview'
import ChatPanel from './components/ChatPanel'
import InsightPanel from './components/InsightPanel'
import type { Row } from './lib/types'
import { mockRows } from './sample/mockRows'

export default function App() {
  const [rows, setRows] = useState<Row[]>(mockRows)
  const [chart, setChart] = useState<'bar' | 'line' | 'scatter' | 'hist' | 'box'>('bar')

  const sampleBar = [
    { category: 'A', value: 28 },
    { category: 'B', value: 55 },
    { category: 'C', value: 43 },
    { category: 'D', value: 91 },
    { category: 'E', value: 81 }
  ]

  const sampleLine = Array.from({ length: 24 }, (_, i) => ({ t: i, y: Math.round(50 + 25 * Math.sin(i / 2)) }))
  const sampleScatter = Array.from({ length: 100 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, g: Math.random() > 0.5 ? 'A' : 'B' }))
  const sampleHist = Array.from({ length: 200 }, () => ({ v: Math.round(50 + 15 * (Math.random() * 2 - 1)) }))
  const sampleBox = [
    ...Array.from({ length: 30 }, () => ({ group: 'X', val: Math.round(40 + Math.random() * 20) })),
    ...Array.from({ length: 30 }, () => ({ group: 'Y', val: Math.round(50 + Math.random() * 25) })),
    ...Array.from({ length: 30 }, () => ({ group: 'Z', val: Math.round(35 + Math.random() * 30) })),
  ]

  function getFirstNumericFields(data: Row[]): string[] {
    if (!data.length) return []
    const keys = Object.keys(data[0])
    const numeric: string[] = []
    for (const k of keys) {
      const v = data[0][k]
      if (typeof v === 'number') numeric.push(k)
    }
    return numeric
  }

  function getFirstCategoricalField(data: Row[]): string | undefined {
    if (!data.length) return undefined
    const keys = Object.keys(data[0])
    for (const k of keys) {
      const v = data[0][k]
      if (typeof v === 'string') return k
    }
    return keys[0]
  }

  function buildSpec(data: Row[], type: typeof chart): VisualizationSpec {
    switch (type) {
      case 'bar': {
        const values = data.length ? data : sampleBar
        const xField = data.length ? getFirstCategoricalField(values) ?? 'category' : 'category'
        const yField = data.length ? (getFirstNumericFields(values)[0] ?? 'value') : 'value'
        return {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          data: { values },
          mark: { type: 'bar', cornerRadius: 6, tooltip: true },
          encoding: {
            x: { field: xField, type: 'nominal', axis: { labelAngle: 0 } },
            y: { field: yField, type: 'quantitative' },
            color: { field: xField, type: 'nominal' },
          },
          width: 600,
          height: 340,
        }
      }
      case 'line': {
        const values = data.length ? data : sampleLine
        const nums = data.length ? getFirstNumericFields(values) : ['t', 'y']
        const x = nums[0] ?? 't'
        const y = nums[1] ?? nums[0] ?? 'y'
        return {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          data: { values },
          mark: { type: 'line', point: true, tooltip: true },
          encoding: {
            x: { field: x, type: 'quantitative' },
            y: { field: y, type: 'quantitative' },
            color: { value: '#8ab4ff' },
          },
          width: 600,
          height: 340,
        }
      }
      case 'scatter': {
        const values = data.length ? data : sampleScatter
        const nums = data.length ? getFirstNumericFields(values) : ['x', 'y']
        const x = nums[0] ?? 'x'
        const y = nums[1] ?? 'y'
        const colorField = data.length ? getFirstCategoricalField(values) : 'g'
        return {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          data: { values },
          mark: { type: 'point', tooltip: true },
          encoding: {
            x: { field: x, type: 'quantitative' },
            y: { field: y, type: 'quantitative' },
            color: colorField ? { field: colorField, type: 'nominal' } : { value: '#ffd166' },
          },
          width: 600,
          height: 340,
        }
      }
      case 'hist': {
        const values = data.length ? data : sampleHist
        const nums = data.length ? getFirstNumericFields(values) : ['v']
        const x = nums[0] ?? 'v'
        return {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          data: { values },
          mark: { type: 'bar', tooltip: true },
          encoding: {
            x: { field: x, type: 'quantitative', bin: { maxbins: 20 } },
            y: { aggregate: 'count', type: 'quantitative' },
            color: { value: '#ff7ab6' },
          },
          width: 600,
          height: 340,
        }
      }
      case 'box': {
        const values = data.length ? data : sampleBox
        const nums = data.length ? getFirstNumericFields(values) : ['val']
        const y = nums[0] ?? 'val'
        const group = data.length ? getFirstCategoricalField(values) : 'group'
        const encoding: any = {
          y: { field: y, type: 'quantitative' },
        }
        if (group) {
          encoding.x = { field: group, type: 'nominal' }
          encoding.color = { field: group, type: 'nominal' }
        } else {
          encoding.color = { value: '#a78bfa' }
        }
        return {
          $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
          data: { values },
          mark: { type: 'boxplot' },
          encoding,
          width: 600,
          height: 340,
        }
      }
    }
  }

  return (
    <div className="min-h-screen text-white">
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8"
        >
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-4">
              <UploadPanel onParsed={setRows} />
            </GlassCard>

            <GlassCard className="p-4 max-h-[340px] overflow-auto thin-scroll">
              <DataPreview rows={rows} />
            </GlassCard>
          </div>

          <GlassCard className="lg:col-span-5 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold tracking-tight">Chart</h2>
              <div className="flex gap-1 items-center">
                {([
                  ['bar', 'Bar'],
                  ['line', 'Line'],
                  ['scatter', 'Scatter'],
                  ['hist', 'Histogram'],
                  ['box', 'Box']
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setChart(key)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg transition border ${chart === key ? 'bg-white/30 border-white/40' : 'bg-white/15 border-white/20 hover:bg-white/25'}`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => setRows(mockRows)}
                  className="ml-2 px-2.5 py-1.5 text-xs rounded-lg bg-pink-400/70 hover:bg-pink-400/90 text-white transition border border-white/30"
                  title="Load sample data"
                >
                  Use Sample
                </button>
              </div>
            </div>
            <div className="h-[360px] w-full">
              {rows.length > 0 ? (
                <VegaLite spec={buildSpec(rows, chart)} actions={false} />
              ) : (
                <div className="flex items-center justify-center h-full text-white/60">
                  <p>No data loaded. Click "Load Sample Data" or upload a CSV.</p>
                </div>
              )}
            </div>
            <p className="text-xs text-white/50 mt-2">Loaded {rows.length} rows</p>
          </GlassCard>

          <div className="lg:col-span-3 space-y-6">
            <GlassCard className="p-4">
              <InsightPanel rows={rows} />
            </GlassCard>

            <GlassCard className="p-0 overflow-hidden">
              <ChatPanel />
            </GlassCard>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
