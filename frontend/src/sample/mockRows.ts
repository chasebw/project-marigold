import type { Row } from '../lib/types'

// A versatile mock dataset with categorical, numeric, grouping, and time-like fields
export const mockRows: Row[] = Array.from({ length: 40 }, (_, i) => {
  const category = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5]
  const group = ['X', 'Y', 'Z'][i % 3]
  const t = i // time index
  const value = Math.round(40 + 30 * Math.sin(i / 3) + (Math.random() * 10 - 5))
  const x = Math.round(10 + i + Math.random() * 15)
  const y = Math.round(20 + i * 1.2 + (Math.random() * 20 - 10))
  const v = Math.round(50 + 15 * (Math.random() * 2 - 1))
  const val = Math.round(30 + (group === 'X' ? 10 : group === 'Y' ? 20 : 25) + Math.random() * 15)
  return { category, group, t, value, x, y, v, val }
})
