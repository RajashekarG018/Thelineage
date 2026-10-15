/** 
 * The Lineage — union-tree layout (spec §4.1, §7).
 * 
 * Genealogy trees need "union" nodes: a married couple is rendered as one
 * horizontal unit with children branching below.
 */

import type { Character } from '../data/types.ts'
import { charactersById } from '../data/index.ts'

export interface Position {
  x: number
  y: number
}

export interface UnionNode {
  id: string
  type: 'union'
  partnerA: string
  partnerB: string | null
  children: string[]
  position: Position
  houseId: string
  collapsed: boolean
  childCount: number
}

export interface SingletonNode {
  id: string
  type: 'singleton'
  character: string
  position: Position
  houseId: string
  collapsed: boolean
}

export type TreeNode = UnionNode | SingletonNode

export interface Edge {
  id: string
  from: Position
  to: Position
  kind: 'blood' | 'marriage' | 'affair' | 'betrothal' | 'lover'
  fromId: string
  toId: string
  note?: string
}

export interface TreeLayout {
  nodes: TreeNode[]
  edges: Edge[]
  width: number
  height: number
}

const NODE_WIDTH = 120
const NODE_HEIGHT = 140
const LAYER_SPACING = 110
const SIBLING_SPACING = 140

function getCharacter(id: string): Character | undefined {
  return charactersById.get(id)
}

function getUnionChildren(partnerA: string, partnerB: string | null): string[] {
  const a = getCharacter(partnerA)
  if (!a) return []
  const childSet = new Set<string>()
  for (const id of (a.children ?? [])) childSet.add(id)
  if (partnerB) {
    const b = getCharacter(partnerB)
    if (b) {
      for (const id of (b.children ?? [])) childSet.add(id)
    }
  }
  return [...childSet]
}

export function buildUnionTree(rootCharId: string): TreeNode[] {
  const allNodes: TreeNode[] = []
  const nodeMap = new Map<string, TreeNode>()
  const visited = new Set<string>()

  function addNode(node: TreeNode) {
    if (nodeMap.has(node.id)) return
    nodeMap.set(node.id, node)
    allNodes.push(node)
  }

  function buildFromChar(charId: string, x: number, y: number, houseId: string) {
    if (visited.has(charId)) return
    visited.add(charId)

    const c = getCharacter(charId)
    if (!c) {
      const node: SingletonNode = {
        id: charId,
        type: 'singleton',
        character: charId,
        position: { x, y },
        houseId,
        collapsed: false,
      }
      addNode(node)
      return
    }

    const spouseId = c.spouseIds?.[0] ?? null
    if (spouseId) {
      const spouse = getCharacter(spouseId)
      if (spouse && !visited.has(spouseId)) {
        const unionId = `union:${[charId, spouseId].sort().join(':')}`
        const childIds = getUnionChildren(charId, spouseId)
        const node: UnionNode = {
          id: unionId,
          type: 'union',
          partnerA: charId,
          partnerB: spouseId,
          children: childIds,
          position: { x, y },
          houseId: c.houseId,
          collapsed: false,
          childCount: childIds.length,
        }
        addNode(node)
        visited.add(spouseId)
        const childY = y + NODE_HEIGHT + LAYER_SPACING
        for (let i = 0; i < childIds.length; i++) {
          buildFromChar(childIds[i], x + (i - (childIds.length - 1) / 2) * SIBLING_SPACING, childY, getCharacter(childIds[i])?.houseId ?? houseId)
        }
        return
      }
    }

    const node: SingletonNode = {
      id: charId,
      type: 'singleton',
      character: charId,
      position: { x, y },
      houseId: c.houseId,
      collapsed: false,
    }
    addNode(node)

    const childIds = c.children ?? []
    const childY = y + NODE_HEIGHT + LAYER_SPACING
    for (let i = 0; i < childIds.length; i++) {
      const child = getCharacter(childIds[i])
      buildFromChar(childIds[i], x + (i - (childIds.length - 1) / 2) * SIBLING_SPACING, childY, child?.houseId ?? houseId)
    }
  }

  const root = getCharacter(rootCharId)
  if (root) {
    buildFromChar(rootCharId, 0, 0, root.houseId)
  }

  return allNodes
}

export function layoutTree(nodes: TreeNode[]): TreeLayout {
  const layers = new Map<number, TreeNode[]>()
  for (const node of nodes) {
    const layer = Math.round(node.position.y / LAYER_SPACING)
    if (!layers.has(layer)) layers.set(layer, [])
    layers.get(layer)!.push(node)
  }

  const sortedLayers = [...layers.entries()].sort((a, b) => a[0] - b[0])

  for (const [layerPosition, [, entries]] of sortedLayers.entries()) {
    const y = layerPosition * LAYER_SPACING
    for (const node of entries) {
      node.position.y = y
    }
  }

  const bottomUp = [...sortedLayers].reverse()
  for (const [layerPosition, [, layerEntries]] of bottomUp.entries()) {
    const parentPosition = sortedLayers.length - 1 - layerPosition
    if (parentPosition > 0) {
      const parentLayer = sortedLayers[parentPosition - 1][1]
      for (const parent of parentLayer) {
        if (parent.type === 'union') {
          for (const childId of parent.children) {
            const existing = layerEntries.find(n =>
              n.id === childId ||
              (n.type === 'singleton' && n.character === childId) ||
              (n.type === 'union' && (n.partnerA === childId || n.partnerB === childId)),
            )
            if (existing) {
              existing.position.x = parent.position.x + NODE_WIDTH / 2
            }
          }
        }
      }
    }

    if (layerEntries.length === 0) continue

    const totalWidth = (layerEntries.length - 1) * SIBLING_SPACING
    const startX = -totalWidth / 2
    for (let i = 0; i < layerEntries.length; i++) {
      layerEntries[i].position.x = startX + i * SIBLING_SPACING
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const node of nodes) {
    minX = Math.min(minX, node.position.x)
    maxX = Math.max(maxX, node.position.x + NODE_WIDTH)
    minY = Math.min(minY, node.position.y)
    maxY = Math.max(maxY, node.position.y + NODE_HEIGHT)
  }

  const edges: Edge[] = []

  for (const node of nodes) {
    if (node.type === 'union' && node.partnerB) {
      edges.push({
        id: `marriage-${node.id}`,
        from: { x: node.position.x, y: node.position.y + NODE_HEIGHT * 0.3 },
        to: { x: node.position.x + NODE_WIDTH, y: node.position.y + NODE_HEIGHT * 0.3 },
        kind: 'marriage',
        fromId: node.partnerA,
        toId: node.partnerB,
      })
    }
    if (node.type === 'union') {
      for (const childId of node.children) {
        const childNode = nodes.find(n => n.id === childId || (n.type === 'singleton' && n.character === childId))
        if (childNode) {
          edges.push({
            id: `blood-${node.id}-${childId}`,
            from: { x: node.position.x + NODE_WIDTH / 2, y: node.position.y + NODE_HEIGHT },
            to: { x: childNode.position.x + NODE_WIDTH / 2, y: childNode.position.y },
            kind: 'blood',
            fromId: node.id,
            toId: childId,
          })
        }
      }
    } else if (node.type === 'singleton') {
      const c = getCharacter(node.character)
      if (c) {
        for (const rel of (c.nonBloodRelations ?? [])) {
          const targetNode = nodes.find(n => n.id === rel.to || (n.type === 'singleton' && n.character === rel.to))
          if (targetNode) {
            edges.push({
              id: `nonblood-${node.id}-${rel.to}`,
              from: { x: node.position.x + NODE_WIDTH / 2, y: node.position.y + NODE_HEIGHT / 2 },
              to: { x: targetNode.position.x + NODE_WIDTH / 2, y: targetNode.position.y + NODE_HEIGHT / 2 },
              kind: rel.kind,
              fromId: node.character,
              toId: rel.to,
              note: rel.note,
            })
          }
        }
      }
    }
  }

  return {
    nodes,
    edges,
    width: Math.max(maxX - minX, NODE_WIDTH),
    height: maxY - minY,
  }
}

export function computeTreeLayout(rootCharId: string): TreeLayout {
  const nodes = buildUnionTree(rootCharId)
  return layoutTree(nodes)
}
