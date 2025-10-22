// reducer.ts
// -----------------------------------------------------------------------------
// Domain reducer for the skill graph.
// Invariants enforced here (UI can be dumb):
// - node ids are unique
// - cannot add self-edges (source === target)
// - cannot add duplicate (source,target) edges
// - removing a node also removes its incident edges
// NOTE: cycle detection is intentionally NOT enforced for this assignment.
// -----------------------------------------------------------------------------

import type { Action, SkillState } from './types'
import { createsCycle } from './validators'
import { prereqsMet } from './selectors'

const id = () => Math.random().toString(36).slice(2, 10)

export const initialState: SkillState = {
  nodes: [
    { id: 'n1', label: 'HTML', unlocked: true,  x: 0,   y: 0 },
    { id: 'n2', label: 'CSS',  unlocked: false, x: 240, y: 0 },
    { id: 'n3', label: 'JS',   unlocked: false, x: 120, y: 150 }
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n3' },
    { id: 'e2', source: 'n2', target: 'n3' }
  ],
  selectedId: 'n3'
}

export function reducer(s: SkillState, a: Action): SkillState {
  switch (a.type) {
    case 'ADD_NODE': {
      if (s.nodes.some(n => n.label.toLowerCase() === a.payload.label.toLowerCase())) return s
      const node = { id: id(), label: a.payload.label.trim(), unlocked: false, x: a.payload.x ?? 100, y: a.payload.y ?? 100 }
      return { ...s, nodes: [...s.nodes, node], selectedId: node.id }
    }
    case 'ADD_EDGE': {
      const { source, target } = a.payload
      if (source === target || s.edges.some(e => e.source === source && e.target === target) || createsCycle(s, source, target)) return s
      return { ...s, edges: [...s.edges, { id: id(), source, target }] }
    }
    case 'MOVE_NODE': {
      return { ...s, nodes: s.nodes.map(n => n.id === a.payload.id ? { ...n, x: a.payload.x, y: a.payload.y } : n) }
    }
    case 'REMOVE_NODE': {
      return {
        ...s,
        nodes: s.nodes.filter(n => n.id !== a.payload.id),
        edges: s.edges.filter(e => e.source !== a.payload.id && e.target !== a.payload.id),
        selectedId: s.selectedId === a.payload.id ? undefined : s.selectedId
      }
    }
    case 'REMOVE_EDGE': return { ...s, edges: s.edges.filter(e => e.id !== a.payload.id) }
    case 'SELECT': return { ...s, selectedId: a.payload?.id }
    case 'TOGGLE_UNLOCK': {
      if (!prereqsMet(s, a.payload.id)) return s
      return { ...s, nodes: s.nodes.map(n => n.id === a.payload.id ? { ...n, unlocked: !n.unlocked } : n) }
    }
    case 'LOAD': return { ...a.payload }
    default: return s
  }
}
