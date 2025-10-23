import { memo } from 'react'

type Props = { onAdd: () => void; onReset: () => void }

export default memo(function Toolbar({ onAdd, onReset }: Props) {
  return (
    <div className="flex gap-2">
      <button onClick={onAdd} className="px-3 py-1 rounded-2xl border hover:bg-zinc-50">
        Add Node
      </button>
      <button onClick={onReset} className="px-3 py-1 rounded-2xl border hover:bg-zinc-50">
        Reset
      </button>
    </div>
  )
})

