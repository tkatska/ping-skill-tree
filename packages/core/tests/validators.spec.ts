import { describe, it, expect } from 'vitest'
import { createsCycle } from '../src/validators'
import type { SkillState } from '../src/types'

const base: SkillState = { nodes: [], edges: [] }

describe('createsCycle', () => {
  it('no cycle on A->B', () => {
    const s: SkillState = { ...base }
    expect(createsCycle(s, 'a', 'b')).toBe(false)
  })
  it('detects A->B then B->A', () => {
    const s: SkillState = { nodes: [], edges: [{ id: 'e1', source: 'a', target: 'b' }] }
    expect(createsCycle(s, 'b', 'a')).toBe(true)
  })
})
