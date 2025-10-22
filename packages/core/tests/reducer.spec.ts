import { describe, it, expect } from 'vitest'
import { initialState, reducer } from '../src/reducer'

describe('reducer', () => {
  it('adds a node', () => {
    const n = reducer(initialState, { type: 'ADD_NODE', payload: { label: 'React' } })
    expect(n.nodes.some(x => x.label === 'React')).toBe(true)
  })
  it('prevents duplicates by label', () => {
    const n = reducer(initialState, { type: 'ADD_NODE', payload: { label: 'HTML' } })
    const count = n.nodes.filter(x => x.label.toLowerCase() === 'html').length
    expect(count).toBe(1)
  })
})
