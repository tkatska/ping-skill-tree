// App.tsx
// -----------------------------------------------------------------------------
// Top-level composition for the Skill Tree Builder.
// Responsibilities:
// - hold canonical state in a reducer (so actions are explicit and testable)
// - persist state (debounced) to localStorage via @core/storage
// - global keyboard UX: Esc closes the "Add Skill" dialog
// - wire UI shell (header/toolbar/sidebar) to canvas + details panel
// -----------------------------------------------------------------------------

import { useCallback, useEffect, useReducer, useState } from 'react'
import Toolbar from './components/Toolbar'
import Legend from './components/Legend'
import AddNodeDialog from './components/AddNodeDialog'
import NodeCard from './components/NodeCard'
import SkillCanvas from './components/SkillCanvas'
import { initialState, reducer } from '@core/reducer'
import { createPersistence } from '@core/storage'

const persist = createPersistence()

export default function App() {
  // Reducer keeps all updates explicit (easy to test, reason about, and undo/redo later)
  const [state, dispatch] = useReducer(reducer, persist.load() ?? initialState)
  const [showAdd, setShowAdd] = useState(false)

  // Persist with a small debounce to avoid thrashing localStorage while dragging.
  useEffect(() => {
    const t = setTimeout(() => persist.save(state), 300)
    return () => clearTimeout(t)
  }, [state])

  // Global keyboard UX: Esc closes the Add Node dialog.
  // Use DOM KeyboardEvent (not React synthetic) because the listener is on document.
  useEffect(() => {
    if (!showAdd) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        setShowAdd(false)
      }
    }
    document.addEventListener('keydown', onKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', onKeyDown, { capture: true })
  }, [showAdd])

  // simple, stable callbacks for toolbar buttons
  const onAdd = useCallback(() => setShowAdd(true), [])
  const onFit = useCallback(() => {
    // React Flow already provides a Fit control. Clicking it avoids duplicating logic.
    ;(document.querySelector('[title="Fit view"]') as HTMLButtonElement | null)?.click()
  }, [])
  const onReset = useCallback(() => {
    dispatch({ type: 'LOAD', payload: initialState })
  }, [])

  const onAddSubmit = useCallback((label: string) => {
    dispatch({ type: 'ADD_NODE', payload: { label } })
  }, [])

  return (
    <div className="min-h-screen grid grid-rows-[var(--header-h)_1fr]">
      <header className="h-[var(--header-h)] px-4 flex items-center justify-between border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/40">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-zinc-900" aria-hidden />
          <h1 className="font-semibold">Skill Tree Builder</h1>
        </div>
        <div className="flex items-center gap-4">
          <Legend />
          <Toolbar onAdd={onAdd} onFit={onFit} onReset={onReset} />
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        <section className="min-h-0">
          <SkillCanvas
            state={state}
            onSelect={id => dispatch({ type: 'SELECT', payload: { id } })}
            onConnectAttempt={(source, target) =>
              dispatch({ type: 'ADD_EDGE', payload: { source, target } })
            }
            onMoveNode={(id, x, y) => dispatch({ type: 'MOVE_NODE', payload: { id, x, y } })}
            onRemoveEdge={id => dispatch({ type: 'REMOVE_EDGE', payload: { id } })}
            onRemoveNode={id => dispatch({ type: 'REMOVE_NODE', payload: { id } })}
          />
        </section>

        <section className="border-t lg:border-t-0 lg:border-l bg-white">
          <NodeCard
            state={state}
            onToggleUnlock={id => dispatch({ type: 'TOGGLE_UNLOCK', payload: { id } })}
            onRemove={id => dispatch({ type: 'REMOVE_NODE', payload: { id } })}
          />
        </section>
      </main>

      <AddNodeDialog open={showAdd} onClose={() => setShowAdd(false)} onSubmit={onAddSubmit} />
    </div>
  )
}
