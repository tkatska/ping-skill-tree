// NodeCard.tsx
// -----------------------------------------------------------------------------
// Details panel for the currently selected node.
// - Shows lock state and provides actions (unlock/remove)
// - Emits pure intents up to App; reducer enforces business rules
// - Keeps DOM simple for screen readers; status line uses aria-live
// -----------------------------------------------------------------------------

import { prereqsMet } from '@core/selectors'
import type { SkillState } from '@core/types'

type Props = {
  state: SkillState
  onToggleUnlock: (id: string) => void
  onRemove: (id: string) => void
}
export default function NodeCard({ state, onToggleUnlock, onRemove }: Props) {
  const node = state.nodes.find(n => n.id === state.selectedId)
  if (!node)
    return <aside className="p-4 border-l hidden lg:block">Select a node to view details.</aside>

  const canUnlock = prereqsMet(state, node.id)

  return (
    <aside className="p-4 border-l min-h-[160px]">
      <h3 className="font-semibold text-lg mb-1">{node.label}</h3>
      <p className="text-sm mb-2">
        Status:{' '}
        <span className={node.unlocked ? 'text-emerald-600' : 'text-zinc-500'}>
          {node.unlocked ? 'Unlocked' : 'Locked'}
        </span>
      </p>

      <div className="flex gap-2 mt-2">
        <button
          className="px-3 py-1 rounded-xl border disabled:opacity-50"
          onClick={() => onToggleUnlock(node.id)}
          disabled={!canUnlock}
          aria-disabled={!canUnlock}
          aria-label={canUnlock ? 'Toggle unlock' : 'Unlock prerequisites not met'}
          title={!canUnlock ? 'Prerequisites not met' : 'Toggle unlock'}
        >
          {node.unlocked ? 'Lock' : 'Unlock'}
        </button>
        <button className="px-3 py-1 rounded-xl border" onClick={() => onRemove(node.id)}>
          Remove
        </button>
      </div>

      {!canUnlock && !node.unlocked && (
        <p className="text-xs mt-2 text-zinc-500">
          To unlock, complete all prerequisites (incoming connections).
        </p>
      )}
    </aside>
  )
}
