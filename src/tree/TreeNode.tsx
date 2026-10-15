/** 
 * The Lineage — TreeNode component (spec §4.1, §4.6).
 * Renders a character or couple node in the family tree.
 */

import * as R from 'react'
import { useMemo } from 'react'
import type { TreeNode } from './layout.ts'
import type { House } from '../data/types.ts'
import { getCharacter, getHouse } from '../data/index.ts'

interface TreeNodeProps {
  node: TreeNode
  house: House
  isHovered: boolean
  isHighlighted: boolean
  onClick: (node: TreeNode) => void
  onKeyDown: (e: React.KeyboardEvent, node: TreeNode) => void
  onHover: (nodeId: string | null) => void
  spoilers: boolean
}

const NODE_WIDTH = 120
const NODE_HEIGHT = 140

export default function TreeNodeComponent({
  node,
  house,
  isHovered,
  isHighlighted,
  onClick,
  onKeyDown,
  onHover,
  spoilers,
}: TreeNodeProps) {
  const character = useMemo(() => {
    if (node.type === 'singleton') return getCharacter(node.character)
    return null
  }, [node])

  const partnerA = useMemo(() => {
    if (node.type !== 'union') return null
    return getCharacter(node.partnerA)
  }, [node])

  const partnerB = useMemo(() => {
    if (node.type !== 'union') return null
    return node.partnerB ? getCharacter(node.partnerB) : null
  }, [node])

  const displayName = useMemo(() => {
    if (node.type === 'union') {
      const a = partnerA
      const b = partnerB
      if (a && b) return `${a.name} · ${b.name}`
      if (a) return a.name
    }
    if (character) return character.name
    return 'Unknown'
  }, [node, partnerA, partnerB, character])

  const aliases = useMemo(() => {
    if (node.type === 'union') {
      const a = partnerA
      const b = partnerB
      const aliasList: string[] = []
      if (a?.aliases) aliasList.push(...a.aliases)
      if (b?.aliases) aliasList.push(...b.aliases)
      return aliasList
    }
    return character?.aliases ?? []
  }, [node, partnerA, partnerB, character])

  const portraitUrl = useMemo(() => {
    if (node.type === 'union' && partnerA) {
      return partnerA.portrait
    }
    return character?.portrait
  }, [node, partnerA, character])

  const sigil = useMemo(() => {
    const h = node.type === 'union' && partnerA
      ? getHouse(partnerA.houseId)
      : house
    return h ?? null
  }, [node, partnerA, house])

  const hasChildren = node.type === 'union'
    ? node.children.length > 0
    : character?.children?.length !== undefined && character.children.length > 0

  const isAlive = useMemo(() => {
    if (node.type === 'union') {
      const a = partnerA
      const b = partnerB
      if (a && b) return a.living && b.living
      if (a) return a.living
    }
    return character?.living ?? true
  }, [node, partnerA, partnerB, character])

  return (
    <g
      className={`tree-node${isHovered ? ' is-hovered' : ''}${isHighlighted ? ' is-highlighted' : ''}`}
      transform={`translate(${node.position.x}, ${node.position.y})`}
    >
      <rect
        x="-8"
        y="-8"
        width={NODE_WIDTH + 16}
        height={NODE_HEIGHT + 16}
        fill="transparent"
        style={{ cursor: 'pointer', outline: 'none' }}
        tabIndex={0}
        role="button"
        aria-label={`${displayName}${!isAlive ? ' — deceased' : ''}, ${house.name}, open details`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick(node)
          }
          if (e.key === 'Escape') {
            onKeyDown(e, node)
          }
        }}
        onClick={() => onClick(node)}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
      >
        <title>{displayName}</title>
      </rect>

      <g className="tree-node__card" style={{ filter: isHovered ? 'brightness(1.1)' : undefined }}>
        <rect
          x="0"
          y="0"
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          rx="6"
          fill="var(--surface-2)"
          stroke={isHighlighted ? house.color : 'var(--border)'}
          strokeWidth={isHighlighted ? 2 : 1}
          style={{ transition: 'stroke 0.2s' }}
        />
        
        <rect
          x="1"
          y="1"
          width={NODE_WIDTH - 2}
          height={NODE_HEIGHT - 2}
          rx="5"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
        />

        {/* Portrait or sigil */}
        <g transform="translate(36, 14)">
          {portraitUrl ? (
            <image
              href={portraitUrl}
              x="-24"
              y="-24"
              width="48"
              height="48"
              preserveAspectRatio="xMidYMid slice"
              style={{ borderRadius: 4, border: '1px solid var(--border)' }}
              aria-hidden="true"
            />
          ) : sigil ? (
            <g transform="translate(-12, -12)">
              {R.isValidElement(sigil) ? (
                R.cloneElement(sigil as R.ReactElement<{ style?: R.CSSProperties }>, {
                  style: { width: 28, height: 28 },
                })
              ) : null}
            </g>
          ) : (
            <rect x="-20" y="-20" width="40" height="40" rx="4" fill="var(--surface)" stroke="var(--border)" />
          )}
        </g>

        {/* Death badge */}
        {!isAlive && spoilers && (
          <g transform="translate(104, 8)">
            <circle cx="5" cy="5" r="5" fill="var(--blood)" opacity="0.8" />
            <path d="M3 3L7 7M7 3L3 7" stroke="var(--surface)" strokeWidth="1" />
          </g>
        )}

        {/* Name label */}
        <text
          x={NODE_WIDTH / 2}
          y={NODE_HEIGHT - 14}
          textAnchor="middle"
          style={{
            fontSize: portraitUrl ? 11 : 12,
            fill: 'var(--text)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
          }}
        >
          {displayName.length > 20 ? displayName.slice(0, 18) + '…' : displayName}
        </text>

        {/* Aliases */}
        {aliases.length > 0 && !portraitUrl && (
          <text
            x={NODE_WIDTH / 2}
            y={NODE_HEIGHT - 26}
            textAnchor="middle"
            style={{
              fontSize: 9,
              fill: 'var(--text-dim)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {aliases.slice(0, 2).join(' · ')}
          </text>
        )}

        {/* Collapse control */}
        {hasChildren && (
          <g transform="translate(56, 128)">
            <circle cx="4" cy="4" r="8" fill="var(--surface)" stroke="var(--border)" />
            <path d="M4 1L7 4L4 7L1 4L4 1Z" fill="var(--text-dim)" />
          </g>
        )}
      </g>
    </g>
  )
}
