import { useState } from 'react'

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Upload a CSV and ask me to suggest charts or summarize insights.' }
  ])
  const [text, setText] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', content: text.trim() }])
    setText('')
  }

  return (
    <div className="flex flex-col h-80">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="font-semibold tracking-tight">Chat</h2>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3 thin-scroll">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block max-w-[80%] px-3 py-2 rounded-2xl ${m.role === 'user' ? 'bg-white/20' : 'bg-white/10'}`}>
              <p className="text-sm text-white/90">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
          <input
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/50"
            placeholder="Ask e.g. ‘trend by month’ or ‘top categories’"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="px-3 py-1.5 text-sm rounded-lg bg-white/20 hover:bg-white/30 transition">Send</button>
        </div>
      </form>
    </div>
  )
}
