import type { SkillState } from './types'

export const findNode = (s: SkillState, id?: string) => s.nodes.find(n => n.id === id)

export const incomingOf = (s: SkillState, id: string) =>
  s.edges.filter(e => e.target === id).map(e => e.source)

export const prereqsMet = (s: SkillState, id: string) =>
  incomingOf(s, id).every(pid => s.nodes.find(n => n.id === pid)?.unlocked)