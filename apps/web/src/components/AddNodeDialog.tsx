// AddNodeDialog.tsx
// -----------------------------------------------------------------------------
// Accessible modal for adding a new skill.
// - Focus management: remember trigger, focus input on open, restore on close
// - Keyboard: Esc closes, Enter submits
// - A11y: role="dialog", aria-modal, aria-labelledby; backdrop click to close
// -----------------------------------------------------------------------------

import * as React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (label: string) => void
}

export default function AddNodeDialog({ open, onClose, onSubmit }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const lastActiveRef = React.useRef<HTMLElement | null>(null)
  const [label, setLabel] = React.useState('')

  // focus input + remember the element that opened the dialog
  React.useEffect(() => {
    if (!open) return
    lastActiveRef.current = (document.activeElement as HTMLElement) ?? null
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  // Esc anywhere while open closes the dialog (document-level listener)
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', onKeyDown, { capture: true })
  }, [open, onClose])

  // restore focus to the element that launched the dialog
  React.useEffect(() => {
    if (!open && lastActiveRef.current) {
      lastActiveRef.current.focus()
      lastActiveRef.current = null
    }
  }, [open])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = label.trim()
    if (!value) return
    onSubmit(value)
    setLabel('')
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
      data-testid="add-skill-overlay"
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Panel is the ARIA dialog surface */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-skill-title"
        className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl"
        tabIndex={-1}
        onKeyDown={e => {
          if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault()
            onClose()
          }
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="add-skill-title" className="mb-3 text-lg font-semibold">
          Add Skill
        </h2>

        <form onSubmit={submit} className="grid gap-3">
          <label htmlFor="skill-name" className="text-sm font-medium">
            Skill name
          </label>
          <input
            id="skill-name"
            ref={inputRef}
            value={label}
            onChange={e => setLabel(e.target.value)}
            // handle Esc when the input owns focus (belt & suspenders)
            onKeyDown={e => {
              if (e.key === 'Escape' || e.key === 'Esc') {
                e.preventDefault()
                onClose()
              }
            }}
            className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="e.g., React"
          />

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" className="rounded-lg border px-3 py-2" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-3 py-2 text-white disabled:opacity-50"
              disabled={!label.trim()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
