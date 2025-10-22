import { z } from 'zod'
import type { SkillState } from './types'

export const NodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(1).max(80),
  unlocked: z.boolean(),
  x: z.number().finite(),
  y: z.number().finite()
})

export const EdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1)
})

export const StateV1 = z.object({
  v: z.literal(1),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
  selectedId: z.string().optional()
})
export type PersistedV1 = z.infer<typeof StateV1>

export function migrate(raw: unknown): SkillState | undefined {
  const p = StateV1.safeParse(raw)
  if (!p.success) return
  const { nodes, edges, selectedId } = p.data
  return { nodes, edges, selectedId }
}