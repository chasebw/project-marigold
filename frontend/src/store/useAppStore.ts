import { create } from 'zustand'
import type { Insight, Profile, SuggestedChart, TableData } from '../types'

interface AppState {
  table?: TableData
  profile?: Profile
  suggestions: SuggestedChart[]
  insights?: Insight
  chat: { role: 'user' | 'assistant'; content: string }[]
  setTable: (table?: TableData) => void
  setProfile: (p?: Profile) => void
  setSuggestions: (s: SuggestedChart[]) => void
  addChat: (msg: { role: 'user' | 'assistant'; content: string }) => void
  setInsights: (i?: Insight) => void
}

export const useAppStore = create<AppState>((set) => ({
  table: undefined,
  profile: undefined,
  suggestions: [],
  insights: undefined,
  chat: [],
  setTable: (table) => set({ table }),
  setProfile: (profile) => set({ profile }),
  setSuggestions: (suggestions) => set({ suggestions }),
  addChat: (msg) => set((s) => ({ chat: [...s.chat, msg] })),
  setInsights: (insights) => set({ insights }),
}))
