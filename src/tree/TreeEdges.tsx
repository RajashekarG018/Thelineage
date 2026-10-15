/** 
 * The Lineage — TreeEdges component (spec §4.1, §4.5).
 * 
 * Renders connector lines between tree nodes:
 *   - Blood edges: solid lines from parent to child
 *   - Marriage edges: distinctive connectors between spouses (dashed color)
 *   - Affair/lover edges: dashed blood-tinted lines (spoiler-gated)
 *   - Betrothal edges: dotted lines with distinct styling
 *
 * Hover lineage highlight: when a node is hovered, its bloodline edges
 * get an animated dash flow. Other edges dim.
 */

import { useMemo } from 'react'
import type { Edge, TreeNode } from './layout.ts'
import { getCharacter } from '../data/index.ts'

interface TreeEdgesProps {
  edges: Edge[]
  nodes: TreeNode[]
  hoveredNodeId: string | null
  spoilers: boolean
}

// ---------------------------------------------------------------------------
// Edge path generation
// ---------------------------------------------------------------------------

/** Generate a smooth bezier path between two points. */
function edgePath(from: { x: number; y: number }, to: { x: number; y: number }, kind: Edge['kind']): string {
  const dx = Math.abs(to.x - from.x)
  
  if (kind === 'blood') {
    // Blood: simple straight or gentle curve
    if (dx < 20) {
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    }
    const midY = (from.y + to.y) / 2
    return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`
  }
  
  if (kind === 'marriage') {
    // Marriage: horizontal connector with slight curve
    const midX = (from.x + to.x) / 2
    return `M ${from.x} ${from.y} Q ${midX} ${from.y + 10}, ${to.x} ${to.y}`
  }
  
  if (kind === 'affair' || kind === 'lover') {
    // Transgressive: distinctive swung line
    const midX = (from.x + to.x) / 2
    return `M ${from.x} ${from.y} Q ${midX} ${from.y - 20}, ${to.x} ${to.y}`
  }
  
  // Betrothal: shorter, dotted path
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
}

// ---------------------------------------------------------------------------
// Edge component
// ---------------------------------------------------------------------------

function EdgePath({
  edge,
  isHighlighted,
  isDimmed,
  spoilers,
}: {
  edge: Edge
  isHighlighted: boolean
  isDimmed: boolean
  spoilers: boolean
}) {
  // Skip transgressive edges in safe mode
  if (!spoilers && (edge.kind === 'affair' || edge.kind === 'lover')) {
    return null
  }

  const path = edgePath(edge.from, edge.to, edge.kind)
  const isTransgressive = edge.kind === 'affair' || edge.kind === 'lover'
  const isBlood = edge.kind === 'blood'
  const isMarriage = edge.kind === 'marriage'

  // Determine stroke style based on kind and state
  let strokeColor = 'var(--text-dim)'
  let strokeWidth = 1.5
  let strokeDash = undefined
  let opacity = 0.5

  if (isHighlighted) {
    strokeColor = 'var(--gold-bright)'
    strokeWidth = 2.5
    opacity = 1
  } else if (isDimmed) {
    opacity = 0.15
  } else {
    opacity = 0.6
  }

  if (isBlood && !isDimmed) {
    strokeColor = 'var(--gold)'
    strokeWidth = 1.8
    opacity = 0.7
  }

  if (isMarriage && !isDimmed) {
    strokeColor = 'var(--moonlight)'
    strokeWidth = 1.5
    strokeDash = '6 4'
    opacity = 0.6
  }

  if (isTransgressive && !isDimmed) {
    strokeColor = 'var(--blood)'
    strokeWidth = 1.5
    strokeDash = '4 3'
    opacity = 0.7
  }

  // Animation for highlighted lineage
  const animatedDash = isHighlighted ? '8 4' : undefined
  const dashOffset = isHighlighted ? 'animated' : undefined

  return (
    <g className="tree-edge">
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDash ?? animatedDash}
        strokeDashoffset={isHighlighted && dashOffset === 'animated' ? 0 : 0}
        opacity={opacity}
        className={`tree-edge__path${isHighlighted ? ' is-flowing' : ''}`}
        style={{
          transition: 'opacity 0.25s, stroke 0.2s',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      {/* Arrow head for marriage edges */}
      {isMarriage && !isDimmed && (
        <circle
          cx={edge.to.x}
          cy={edge.to.y}
          r="2"
          fill={strokeColor}
          opacity={0.7}
          style={{ transition: 'opacity 0.2s' }}
          aria-hidden="true"
        />
      )}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Main TreeEdges
// ---------------------------------------------------------------------------

export default function TreeEdgesComponent({
  edges,
  nodes,
  hoveredNodeId,
  spoilers,
}: TreeEdgesProps) {
  // Compute which edges are part of the hovered node's lineage
  const lineageEdgeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>()
    const hoveredNode = nodes.find(n => n.id === hoveredNodeId)
    if (!hoveredNode) return new Set<string>()

    const lineage = new Set<string>()

    // Find all edges connected to this node
    for (const edge of edges) {
      if (edge.fromId === hoveredNodeId || edge.toId === hoveredNodeId) {
        lineage.add(edge.id)
      }
    }

    // Also include edges to/from spouse
    const hoveredChar = getCharacter(hoveredNodeId)
    if (hoveredChar) {
      for (const spouseId of (hoveredChar.spouseIds ?? [])) {
        for (const edge of edges) {
          if (edge.fromId === spouseId || edge.toId === spouseId) {
            lineage.add(edge.id)
          }
        }
      }
      // Children edges
      for (const childId of (hoveredChar.children ?? [])) {
        for (const edge of edges) {
          if (edge.fromId === childId || edge.toId === childId) {
            lineage.add(edge.id)
          }
        }
      }
      // Parent edges
      for (const parentId of (hoveredChar.parents ?? [])) {
        for (const edge of edges) {
          if (edge.fromId === parentId || edge.toId === parentId) {
            lineage.add(edge.id)
          }
        }
      }
    }

    return lineage
  }, [hoveredNodeId, nodes, edges])

  // Determine which edges to dim (not part of lineage and not hovered)
  const hoveredConnectedIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>()
    const connected = new Set<string>()
    for (const edge of edges) {
      if (edge.fromId === hoveredNodeId || edge.toId === hoveredNodeId) {
        connected.add(edge.fromId)
        connected.add(edge.toId)
      }
    }
    return connected
  }, [hoveredNodeId, edges])

  return (
    <g className="tree-edges" aria-hidden="true">
      {edges.map((edge) => {
        const isHighlighted = lineageEdgeIds.has(edge.id)
        const isDimmed = hoveredNodeId !== null && !lineageEdgeIds.has(edge.id) && !hoveredConnectedIds.has(edge.fromId) && !hoveredConnectedIds.has(edge.toId)
        
        return (
          <EdgePath
            key={edge.id}
            edge={edge}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
            spoilers={spoilers}
          />
        )
      })}
      
      {/* Animated dash flow for highlighted edges (CSS animation) */}
      <style>{`
        .tree-edge__path.is-flowing {
          animation: edge-flow 1.2s linear infinite;
        }
        @keyframes edge-flow {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tree-edge__path.is-flowing {
            animation: none;
          }
        }
      `}</style>
    </g>
  )
}
