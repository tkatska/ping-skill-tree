// storage.ts
// -----------------------------------------------------------------------------
// Persistence adapter. Stores versioned JSON in localStorage so we can evolve
// the shape safely in the future with a small migration if needed.
// -----------------------------------------------------------------------------

import { migrate } from './schema'
import type { SkillState } from './types'

export interface StoragePort {
  get(): unknown | null
  set(data: unknown): void
}

export function createPersistence(key = 'skill-tree:v1', port?: StoragePort) {
  const backing = port ?? {
    get: () => (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),
    set: (data: unknown) => typeof localStorage !== 'undefined' && localStorage.setItem(key, JSON.stringify(data))
  }
  return {
    load(): SkillState | undefined {
      const raw = backing.get()
      if (!raw) return
      const json = typeof raw === 'string' ? JSON.parse(raw) : raw
      return migrate(json)
    },
    save(state: SkillState) {
      backing.set({ v: 1, ...state })
    }
  }
}