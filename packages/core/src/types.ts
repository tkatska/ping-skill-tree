export type SkillNode = { id: string; label: string; unlocked: boolean; x: number; y: number }
export type SkillEdge = { id: string; source: string; target: string }
export type SkillState = { nodes: SkillNode[]; edges: SkillEdge[]; selectedId?: string }

export type AddNode = { label: string; x?: number; y?: number }
export type AddEdge = { source: string; target: string }

export type Action =
  | { type: 'ADD_NODE'; payload: AddNode }
  | { type: 'ADD_EDGE'; payload: AddEdge }
  | { type: 'MOVE_NODE'; payload: { id: string; x: number; y: number } }
  | { type: 'REMOVE_NODE'; payload: { id: string } }
  | { type: 'REMOVE_EDGE'; payload: { id: string } }
  | { type: 'SELECT'; payload?: { id?: string } }
  | { type: 'TOGGLE_UNLOCK'; payload: { id: string } }
  | { type: 'LOAD'; payload: SkillState }
