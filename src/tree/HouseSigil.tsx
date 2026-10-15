/** 
 * The Lineage — HouseSigil component (spec §6.4).
 * 
 * Renders simplified hand-drawn SVG shields for each house. These are
 * stylized, decoupled from HBO's exact canon art, and serve as both the
 * fallback for characters without portraits and the visual accent for
 * house tabs and node badges.
 */

interface HouseSigilProps {
  houseId: string
  size?: number
  className?: string
}

// ---------------------------------------------------------------------------
// Sigil SVG paths — simplified heraldic shields
// ---------------------------------------------------------------------------

/** Stark direwolf head — simplified profile */
const direwolfPath = (
  <path
    d="M30 18C30 10 26 6 22 6C20 6 18 8 18 10C18 12 20 14 22 14C22 14 20 18 20 20C20 24 24 28 30 28C38 28 44 23 44 18Z"
    fill="currentColor"
    opacity="0.9"
  />
)
const direwolf = (
  <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 35L55 35L50 5L10 5Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M30 5L30 38"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.4"
    />
    {direwolfPath}
    {/* Eyes */}
    <circle cx="22" cy="14" r="1.5" fill="#000" opacity="0.7" />
    <circle cx="32" cy="14" r="1.5" fill="#000" opacity="0.7" />
    {/* Snout line */}
    <path
      d="M20 18C24 20 30 20 36 18"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />
  </svg>
)

/** Lannister lion — simplified rampant lion silhouette */
const lion = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 52L30 8"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.3"
    />
    {/* Lion body */}
    <path
      d="M30 48C30 48 22 44 20 36C18 28 24 20 28 16C30 14 32 14 34 16C38 20 44 28 42 36C40 44 30 48 30 48Z"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Head */}
    <circle cx="30" cy="14" r="6" fill="currentColor" opacity="0.9" />
    {/* Mane hint */}
    <circle cx="30" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* Legs */}
    <path d="M26 40L24 48M30 40L30 48M34 40L36 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    {/* Tail */}
    <path d="M40 32C44 28 46 24 44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
  </svg>
)

/** Targaryen three-headed dragon — simplified */
const dragon = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path
      d="M10 30C10 20 20 14 30 14C40 14 50 20 50 30C50 40 40 46 30 46C20 46 10 40 10 30Z"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Three heads */}
    <path d="M10 25C6 20 8 14 14 12C12 16 12 22 10 25Z" fill="currentColor" opacity="0.85" />
    <path d="M30 10C28 4 32 2 34 6C34 10 32 12 30 10Z" fill="currentColor" opacity="0.85" />
    <path d="M50 25C54 20 52 14 46 12C48 16 48 22 50 25Z" fill="currentColor" opacity="0.85" />
    {/* Wings hints */}
    <path d="M15 20C8 16 5 22 8 26" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M45 20C52 16 55 22 52 26" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
)

/** Baratheon stag — simplified stag head */
const stag = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body hint */}
    <ellipse cx="30" cy="40" rx="12" ry="8" fill="currentColor" opacity="0.2" />
    {/* Antlers */}
    <path d="M30 18L24 8M30 18L36 8M24 8L20 4M36 8L40 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />
    {/* Head */}
    <ellipse cx="30" cy="22" rx="8" ry="6" fill="currentColor" opacity="0.9" />
    {/* Eyes */}
    <circle cx="26" cy="20" r="1" fill="#000" opacity="0.7" />
    <circle cx="34" cy="20" r="1" fill="#000" opacity="0.7" />
    {/* Nose */}
    <path d="M30 26L28 28M30 26L32 28" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
)

/** Greyjoy kraken — simplified octopus/kraken */
const kraken = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central body */}
    <ellipse cx="30" cy="30" rx="10" ry="12" fill="currentColor" opacity="0.9" />
    {/* Tentacles */}
    <path d="M22 38C18 44 14 48 10 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M26 40C24 46 22 50 18 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M34 40C36 46 38 50 42 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M38 38C42 44 46 48 50 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
    {/* Eye */}
    <circle cx="28" cy="28" r="2" fill="#000" opacity="0.7" />
  </svg>
)

/** Tyrell rose — simplified rose bloom */
const rose = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer petals */}
    <circle cx="30" cy="30" r="16" fill="currentColor" opacity="0.2" />
    <path d="M30 14C22 20 22 30 30 30C38 30 38 20 30 14Z" fill="currentColor" opacity="0.7" />
    <path d="M30 30C22 30 22 40 30 46C38 40 38 30 30 30Z" fill="currentColor" opacity="0.7" />
    <path d="M14 30C20 22 30 22 30 30C30 38 20 38 14 30Z" fill="currentColor" opacity="0.7" />
    <path d="M30 14C30 22 30 30 30 30C30 38 30 46 30 46" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    {/* Center */}
    <circle cx="30" cy="30" r="6" fill="currentColor" opacity="0.9" />
  </svg>
)

/** Martell sun and spear — simplified */
const sunSpear = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sun */}
    <circle cx="30" cy="28" r="10" fill="currentColor" opacity="0.9" />
    {/* Sun rays */}
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2
      const x1 = 30 + Math.cos(a) * 12
      const y1 = 28 + Math.sin(a) * 12
      const x2 = 30 + Math.cos(a) * 16
      const y2 = 28 + Math.sin(a) * 16
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      )
    })}
    {/* Spear through center */}
    <line x1="15" y1="45" x2="45" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <circle cx="45" cy="15" r="3" fill="currentColor" opacity="0.9" />
  </svg>
)

/** Arryn falcon — simplified falcon in flight */
const falcon = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path d="M20 28C20 22 26 18 32 18C38 18 44 22 44 28C44 34 38 38 32 38C26 38 20 34 20 28Z" fill="currentColor" opacity="0.9" />
    {/* Wings */}
    <path d="M20 26C12 20 8 24 10 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M40 26C48 20 52 24 50 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
    {/* Head */}
    <circle cx="34" cy="20" r="3" fill="currentColor" opacity="0.9" />
    {/* Beak */}
    <path d="M37 20L42 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
)

/** Tully trout — simplified fish */
const trout = (
  <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="30" cy="20" rx="22" ry="10" fill="currentColor" opacity="0.9" />
    {/* Tail */}
    <path d="M48 20L58 10L58 30Z" fill="currentColor" opacity="0.8" />
    {/* Mouth */}
    <circle cx="8" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    {/* Eye */}
    <circle cx="14" cy="18" r="1.5" fill="#000" opacity="0.7" />
    {/* Spine line */}
    <path d="M10 20L50 20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
)

/** Generic shield fallback for minor houses */
const shield = (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 5L55 15V30C55 42 42 52 30 55C18 52 5 42 5 30V15L30 5Z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M30 8L52 16V30C52 40 42 49 30 51C18 49 8 40 8 30V16L30 8Z"
      fill="currentColor"
      opacity="0.7"
    />
    {/* Central cross */}
    <path d="M30 16L30 44M18 30L42 30" stroke="currentColor" strokeWidth="2" opacity="0.5" />
  </svg>
)

// ---------------------------------------------------------------------------
// Sigil lookup
// ---------------------------------------------------------------------------

const sigilMap: Record<string, React.ReactNode> = {
  direwolf,
  lion,
  dragon,
  stag,
  kraken,
  rose,
  'sun-spear': sunSpear,
  falcon,
  trout,
  shield,
}

import React from 'react'

export default function HouseSigil({ houseId, size = 24, className = '' }: HouseSigilProps) {
  const sigil = sigilMap[houseId] ?? shield
  return (
    <span
      className={className}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      aria-hidden="true"
    >
      {React.cloneElement(sigil as React.ReactElement<{ style?: React.CSSProperties }>, { style: { width: size, height: size } } as Partial<{ style?: React.CSSProperties }> & { children?: React.ReactNode })}
    </span>
  )
}
