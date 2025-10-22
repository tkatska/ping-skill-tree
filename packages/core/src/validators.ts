import type { SkillState } from './types'

export function createsCycle(s: SkillState, source: string, target: string) {
  const adj = new Map<string, string[]>()
  for (const e of s.edges) {
    adj.set(e.source, [...(adj.get(e.source) ?? []), e.target])
  }
  adj.set(source, [...(adj.get(source) ?? []), target])

  const seen = new Set<string>()
  const stack = new Set<string>()

  const dfs = (n: string): boolean => {
    if (stack.has(n)) return true
    if (seen.has(n)) return false
    seen.add(n); stack.add(n)
    for (const nxt of adj.get(n) ?? []) if (dfs(nxt)) return true
    stack.delete(n)
    return false
  }

  for (const k of adj.keys()) if (dfs(k)) return true
  return false
}
