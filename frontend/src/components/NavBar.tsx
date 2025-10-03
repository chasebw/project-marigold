export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-white/80 to-white/30 shadow-inner" />
            <span className="text-sm font-semibold tracking-wide text-white/80">Project Marigold</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="text-xs text-white/60 hover:text-white/90 transition">Docs</a>
            <a href="#" className="text-xs text-white/60 hover:text-white/90 transition">GitHub</a>
          </div>
        </div>
      </div>
    </header>
  )
}
