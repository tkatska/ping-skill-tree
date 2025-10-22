export default function Legend() {
  return (
    <div aria-label="Legend" className="text-sm flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 border" aria-hidden />
        <span>Unlocked</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded-full bg-zinc-400 border" aria-hidden />
        <span>Locked</span>
      </div>
    </div>
  )
}
