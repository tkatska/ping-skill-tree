// SkillCanvas.tsx
// -----------------------------------------------------------------------------
// Thin wrapper around React Flow that adapts our reducer state to RF's node/edge
// model and reports user intents (connect, move, remove) back to the parent.
// Notes:
// - This component is "controlled": the reducer-driven `state` prop is the
//   single source of truth. React Flow keeps a local mirror for responsiveness.
// - All validation (duplicate edges, self-edges, cycle prevention, etc.) is done
//   here before dispatching an action to the reducer.
// -----------------------------------------------------------------------------

import React, { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  OnConnect,
  EdgeChange,
  NodeChange,
  useEdgesState,
  useNodesState,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import 'reactflow/dist/style.css'
import clsx from 'clsx'
import type { SkillState } from '@core/types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Props = {
  state: SkillState
  onSelect: (id?: string) => void
  onConnectAttempt: (source: string, target: string) => void
  onMoveNode: (id: string, x: number, y: number) => void
  onRemoveEdge: (id: string) => void
  onRemoveNode: (id: string) => void
}

type EdgeLike = { source: string; target: string }

// -----------------------------------------------------------------------------
// Graph helpers — local, pure functions for validation & cycle prevention
// -----------------------------------------------------------------------------

/** Build adjacency list for the directed graph (including optional extra edge). */
function buildAdjacency(edges: EdgeLike[], add?: EdgeLike) {
  const g = new Map<string, string[]>()
  const push = (s: string, t: string) => {
    if (!g.has(s)) g.set(s, [])
    g.get(s)!.push(t)
  }
  for (const e of edges) push(e.source, e.target)
  if (add) push(add.source, add.target)
  return g
}

/** Simple DFS to check whether a path already exists from start → goal. */
function pathExists(g: Map<string, string[]>, start: string, goal: string) {
  const stack = [start]
  const seen = new Set<string>()
  while (stack.length) {
    const n = stack.pop()!
    if (n === goal) return true
    if (seen.has(n)) continue
    seen.add(n)
    for (const nb of g.get(n) ?? []) stack.push(nb)
  }
  return false
}

/** Determine if adding an edge would introduce a cycle. */
function wouldCreateCycle(edges: EdgeLike[], source: string, target: string) {
  const g = buildAdjacency(edges, { source, target }) // include proposed edge
  return pathExists(g, target, source)
}

/** Basic connection validation: missing endpoints, self-loop, duplicates. */
function isInvalidShape(edges: EdgeLike[], source?: string, target?: string) {
  if (!source || !target) return { invalid: true, reason: 'Missing endpoints' }
  if (source === target) return { invalid: true, reason: 'Self-loop not allowed' }
  if (edges.some(e => e.source === source && e.target === target)) {
    return { invalid: true, reason: 'This connection already exists' }
  }
  return { invalid: false as const, reason: '' }
}

/** Placeholder for UX feedback — swap for a toast/snackbar in real UI. */
function notify(msg: string) {
  alert(msg)
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function SkillCanvas({
  state,
  onSelect,
  onConnectAttempt,
  onMoveNode,
  onRemoveEdge,
  onRemoveNode,
}: Props) {
  // map domain → React Flow nodes/edges (initial only; syncs below)
  const initialNodes: Node[] = useMemo(
    () =>
      state.nodes.map(n => ({
        id: n.id,
        position: { x: n.x, y: n.y },
        data: { label: n.label, unlocked: n.unlocked },
        type: 'default',
        className: clsx(
          n.unlocked ? 'bg-emerald-50 border-emerald-500' : 'bg-zinc-50 border-zinc-400',
          'rounded-xl'
        ),
      })),
    // we deliberately keep this static; state sync happens via the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const initialEdges: Edge[] = useMemo(
    () => state.edges.map(e => ({ id: e.id, source: e.source, target: e.target })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // RF state hooks — local mirror that updates via effect.
  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState(initialEdges)

  // Keep RF state synced whenever the reducer state changes.
  React.useEffect(() => {
    setNodes(
      state.nodes.map(n => ({
        id: n.id,
        position: { x: n.x, y: n.y },
        data: { label: n.label, unlocked: n.unlocked },
        type: 'default',
        className: clsx(
          n.unlocked ? 'bg-emerald-50 border-emerald-500' : 'bg-zinc-50 border-zinc-400',
          'rounded-xl'
        ),
      }))
    )
    setEdges(state.edges.map(e => ({ id: e.id, source: e.source, target: e.target })))
  }, [state, setNodes, setEdges])

  // Handle new connection gesture from React Flow.
  const onConnect: OnConnect = useCallback(
    (c: Connection) => {
      const source = c.source ?? undefined
      const target = c.target ?? undefined
      const slim = edges.map(e => ({ source: e.source, target: e.target })) // for helpers

      // Basic shape checks
      const { invalid, reason } = isInvalidShape(slim, source, target)
      if (invalid) {
        notify(reason)
        return
      }
      // Cycle prevention
      if (wouldCreateCycle(slim, source!, target!)) {
        notify('Cannot create circular dependency. This connection would make a cycle.')
        return
      }

      // Delegate to reducer; UI syncs via updated `state`
      onConnectAttempt(source!, target!)
    },
    [edges, onConnectAttempt]
  )

  // Report final position after drag; parent persists new coordinates.
  const onNodeDragStop = useCallback(
    (_e: React.MouseEvent | MouseEvent, node: Node) => {
      onMoveNode(node.id, node.position.x, node.position.y)
    },
    [onMoveNode]
  )

  // Forward edge removals to reducer, then apply local RF state changes.
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      for (const ch of changes) if (ch.type === 'remove') onRemoveEdge(ch.id)
      setEdges(eds => applyEdgeChanges(changes, eds))
    },
    [onRemoveEdge, setEdges]
  )

  // Forward node removals to reducer, then apply local RF state changes.
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      for (const ch of changes) if (ch.type === 'remove') onRemoveNode(ch.id)
      setNodes(ns => applyNodeChanges(changes, ns))
    },
    [onRemoveNode, setNodes]
  )

  // Edge update handler (drag target end to new node).
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, c: Connection) => {
      const { source, target } = c
      const slim = edges
        .filter(e => e.id !== oldEdge.id) // consider graph without the old edge
        .map(e => ({ source: e.source, target: e.target }))

      if (!source || !target || source === target) {
        notify('Invalid connection.')
        return
      }
      if (slim.some(e => e.source === source && e.target === target)) {
        notify('This connection already exists.')
        return
      }
      if (wouldCreateCycle(slim, source, target)) {
        notify('Cannot create circular dependency. This connection would make a cycle.')
        return
      }

      // Update via reducer: remove old edge, then add new one
      onRemoveEdge(oldEdge.id)
      onConnectAttempt(source, target)
    },
    [edges, onRemoveEdge, onConnectAttempt]
  )

  return (
    <div className="rf-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={handleEdgesChange}
        onNodesChange={handleNodesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onNodeClick={(_, n) => onSelect(n.id)}
        onPaneClick={() => onSelect(undefined)}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
