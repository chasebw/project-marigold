import React, { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function ChatPanel() {
  const { chat, addChat, table } = useAppStore()
  const [msg, setMsg] = useState('')

  const onSend = () => {
    if (!msg.trim()) return
    addChat({ role: 'user', content: msg })
    // For MVP: echo response or simple heuristic; backend can replace later
    if (table) {
      addChat({ role: 'assistant', content: 'Received. Try refining your columns or filters. (Backend integration pending)' })
    } else {
      addChat({ role: 'assistant', content: 'Please upload a CSV to begin.' })
    }
    setMsg('')
  }

  return (
    <div className="py-3 bg-white">
      <div className="max-h-60 overflow-auto space-y-2 mb-3 pr-1">
        {chat.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={m.role === 'user'
              ? 'inline-block bg-neutral-900 text-white px-3 py-1.5 rounded-xl'
              : 'inline-block bg-neutral-100 text-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-200'}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pb-3">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? onSend() : undefined}
          placeholder="Ask a question about your data..."
          className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
        <button onClick={onSend} className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900">Send</button>
      </div>
    </div>
  )
}
