/** 
 * The Lineage — MiniMap component (spec §4.3).
 * 
 * A corner minimap showing a shrunk overview of the full tree with a
 * highlighted viewport rectangle. Clicking or dragging on the minimap
 * pans the main view. For mobile, includes expand/collapse gesture.
 *
 * The minimap is aria-hidden decoration since pan/zoom is a visual aid,
 * not essential for AT users (spec §8.4).
 */

import { useRef, useCallback, useEffect, useState } from 'react'

interface MiniMapProps {
  treeWidth: number
  treeHeight: number
  viewportX: number
  viewportY: number
  viewportWidth: number
  viewportHeight: number
  onPan: (dx: number, dy: number) => void
  onZoom: (delta: number) => void
  scale: number
  isExpanded: boolean
  onToggleExpand: () => void
}

const MINIMAP_SIZE = 140
const MINIMAP_PADDING = 12

export default function MiniMap({
  treeWidth,
  treeHeight,
  viewportX,
  viewportY,
  viewportWidth,
  viewportHeight,
  onPan,
  onZoom,
  scale,
  isExpanded,
  onToggleExpand,
}: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Calculate minimap scale (fit tree into minimap)
  const minimapScale = Math.min(
    (MINIMAP_SIZE - MINIMAP_PADDING * 2) / treeWidth,
    (MINIMAP_SIZE - MINIMAP_PADDING * 2) / treeHeight,
    1 // Don't upscale
  )

  // Viewport rect in minimap coordinates
  const viewportRect = {
    x: (viewportX) * minimapScale + MINIMAP_PADDING,
    y: (viewportY) * minimapScale + MINIMAP_PADDING,
    width: viewportWidth * minimapScale,
    height: viewportHeight * minimapScale,
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    
    // Convert minimap drag to tree pan (inverted)
    const panX = -dx / minimapScale
    const panY = -dy / minimapScale

    onPan(panX, panY)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [isDragging, dragStart, minimapScale, onPan])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Click to center on point
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isDragging) return
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const clickX = e.clientX - rect.left - MINIMAP_PADDING
    const clickY = e.clientY - rect.top - MINIMAP_PADDING

    // Convert to tree coordinates
    const treeX = clickX / minimapScale
    const treeY = clickY / minimapScale

    // Center viewport on this point
    onPan(-treeX + viewportWidth / 2, -treeY + viewportHeight / 2)
  }, [isDragging, minimapScale, viewportWidth, viewportHeight, onPan])

  // Wheel zoom on minimap
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    onZoom(-e.deltaY * 0.001)
  }, [onZoom])

  return (
    <div
      className="minimap"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onWheel={handleWheel}
      role="img"
      aria-label="Tree minimap - drag to pan, scroll to zoom"
      aria-hidden="false"
    >
      {/* Background */}
      <div className="minimap__bg" />

      {/* Tree overview */}
      <svg
        viewBox={`0 0 ${treeWidth} ${treeHeight}`}
        className="minimap__svg"
        style={{
          width: treeWidth * minimapScale,
          height: treeHeight * minimapScale,
          transform: `translate(${MINIMAP_PADDING}px, ${MINIMAP_PADDING}px)`,
        }}
        aria-hidden="true"
      >
        {/* Simplified node dots */}
        {Array.from({ length: Math.min(50, Math.floor(treeWidth / 100 * treeHeight / 100)) }).map((_, i) => {
          const x = ((i * 47 + 19) % 100) / 100 * treeWidth
          const y = ((i * 73 + 31) % 100) / 100 * treeHeight
          return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2}
            fill="var(--surface-2)"
            stroke="var(--border)"
            strokeWidth="0.5"
          />
          )
        })}

        {/* Viewport rectangle */}
        <rect
          x={viewportRect.x - MINIMAP_PADDING}
          y={viewportRect.y - MINIMAP_PADDING}
          width={viewportRect.width}
          height={viewportRect.height}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          rx="2"
          className="minimap__viewport"
          style={{
            transition: 'all 0.1s ease-out',
          }}
        />
        {/* Viewport corner handles */}
        <rect
          x={viewportRect.x - MINIMAP_PADDING - 1}
          y={viewportRect.y - MINIMAP_PADDING - 1}
          width="3"
          height="3"
          fill="var(--gold)"
          rx="0.5"
        />
        <rect
          x={viewportRect.x + viewportRect.width - MINIMAP_PADDING - 2}
          y={viewportRect.y - MINIMAP_PADDING - 1}
          width="3"
          height="3"
          fill="var(--gold)"
          rx="0.5"
        />
        <rect
          x={viewportRect.x - MINIMAP_PADDING - 1}
          y={viewportRect.y + viewportRect.height - MINIMAP_PADDING - 2}
          width="3"
          height="3"
          fill="var(--gold)"
          rx="0.5"
        />
        <rect
          x={viewportRect.x + viewportRect.width - MINIMAP_PADDING - 2}
          y={viewportRect.y + viewportRect.height - MINIMAP_PADDING - 2}
          width="3"
          height="3"
          fill="var(--gold)"
          rx="0.5"
        />
      </svg>

      {/* Zoom indicator */}
      <div className="minimap__zoom">
        <span className="minimap__zoom-label">{Math.round(scale * 100)}%</span>
      </div>

      {/* Expand/collapse toggle */}
      <button
        type="button"
        className="minimap__expand"
        onClick={(e) => {
          e.stopPropagation()
          onToggleExpand()
        }}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse minimap' : 'Expand minimap'}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M6 2L10 6L6 10L2 6L6 2Z" fill="currentColor" />
        </svg>
      </button>

      {/* Instructions (screen reader only) */}
      <span className="sr-only">
        {isDragging ? 'Dragging to pan' : 'Click to pan, drag for continuous pan, scroll to zoom'}
      </span>
    </div>
  )
}
