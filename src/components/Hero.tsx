interface HeroProps {
  spoilers: boolean
}

/** Great-house accents, mirroring the per-house tokens defined in spec §6.2. */
const HOUSES = [
  { name: 'Stark', color: '#7a8fa6' },
  { name: 'Lannister', color: '#d9b357' },
  { name: 'Targaryen', color: '#c05050' },
  { name: 'Baratheon', color: '#d4a939' },
  { name: 'Greyjoy', color: '#5d8aa8' },
  { name: 'Tyrell', color: '#7ba05b' },
] as const

const TITLE = 'The Lineage'

/** Ambient dust field: cold moonlight specks + warm embers drifting up. */
function DustField() {
  return (
    <div className="dust" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => {
        const isEmber = i % 4 === 3
        return (
          <span
            key={i}
            className={`dust__speck dust__speck--${isEmber ? 'ember' : 'moon'}`}
            style={
              {
                left: `${(i * 6.1 + 4) % 96}vw`,
                width: `${2 + (i % 3) * 1.2}px`,
                height: `${2 + (i % 3) * 1.2}px`,
                filter: `blur(${i % 2 ? 1.5 : 0.4}px)`,
                '--delay': `${(i * 1.7) % 14}s`,
                '--dur': `${15 + (i % 5) * 3}s`,
                '--drift-x': `${(i % 2 === 0 ? 1 : -1) * (2 + (i % 3) * 2)}vw`,
                '--peak': isEmber ? 0.8 : 0.55,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

/** Concentric rune rings — dashed arcs rotating in opposite directions. */
function RuneRings() {
  return (
    <div className="hero__rings" aria-hidden="true">
      <svg viewBox="0 0 800 800">
        <g className="ring--slow" fill="none" style={{ transformOrigin: '400px 400px' }}>
          <circle
            cx="400"
            cy="400"
            r="386"
            stroke="rgba(160,185,230,0.14)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <circle
            cx="400"
            cy="400"
            r="330"
            stroke="rgba(217,179,87,0.18)"
            strokeWidth="1"
            strokeDasharray="1 14"
          />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2
            const x = 400 + Math.cos(a) * 358
            const y = 400 + Math.sin(a) * 358
            return (
              <path
                key={i}
                d={`M ${x} ${y + 6} l 5 9 l -10 0 z`}
                fill="rgba(217,179,87,0.3)"
              />
            )
          })}
        </g>
        <g className="ring--fast" fill="none" style={{ transformOrigin: '400px 400px' }}>
          <circle
            cx="400"
            cy="400"
            r="272"
            stroke="rgba(160,185,230,0.1)"
            strokeWidth="1"
            strokeDasharray="26 16 3 16"
          />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2
            const x1 = 400 + Math.cos(a) * 296
            const y1 = 400 + Math.sin(a) * 296
            const x2 = 400 + Math.cos(a) * 306
            const y2 = 400 + Math.sin(a) * 306
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(160,185,230,0.2)"
                strokeWidth="1"
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

/**
 * A serpentine dragon in flight, side profile facing right.
 * The body is one silhouette path; near and far wings are separate groups
 * rotating around the shoulder joint — CSS gives the flap.
 */
function DragonSvg() {
  return (
    <svg viewBox="0 0 400 260" fill="none" aria-hidden="true">
      {/* Far wing (behind the body, slightly raised above the near one) */}
      <g className="dragon__wing dragon__wing--far">
        <path
          fill="rgba(16,26,48,0.55)"
          d="M276 100 C282 82 292 62 300 42 L290 50 C286 62 278 70 271 66 L275 82 C266 90 258 88 258 96 L267 104 C270 102 273 101 276 100 Z"
        />
      </g>

      {/* Body: horns, arched neck, spiked spine of ridges, long serpentine tail */}
      <path
        fill="#111a2e"
        d="M356 88
           C350 84 344 84 340 88
           L334 78 L330 88 L326 80 L322 90
           C318 92 314 94 310 96
           C300 100 292 102 284 106
           L274 100 L270 110 L260 102 L256 112 L248 106 L244 116
           C214 112 194 118 172 114
           C152 110 144 128 124 130
           C108 132 102 142 88 144
           C74 146 68 152 58 150
           L48 142 L52 154 L40 148 L46 160 L34 152
           C44 146 54 144 66 142
           C88 138 96 128 112 126
           C132 122 140 112 158 110
           C180 106 206 100 234 100
           C246 100 256 106 264 112
           C272 116 280 110 288 104
           C298 100 308 98 316 96
           L334 90 L352 96
           C358 94 358 90 356 88 Z"
      />

      {/* Tucked legs + claws */}
      <path
        stroke="#111a2e"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M296 118 C298 128 292 134 282 134 M282 134 l-4 -2 m4 2 l-2 -5 m2 5 l1 -5
           M266 114 C266 124 258 128 250 128 M250 128 l-4 -2 m4 2 l-2 -5 m2 5 l1 -5"
      />

      {/* Near wing — flaps around the shoulder joint */}
      <g className="dragon__wing dragon__wing--near">
        <path
          fill="#16243f"
          d="M284 106
             C292 88 306 62 318 34
             L306 44
             C298 56 288 64 288 60
             L294 76
             C286 84 276 82 274 90
             L278 102
             C270 112 260 108 258 114
             L264 118
             C272 118 280 113 284 106 Z"
        />
      </g>
    </svg>
  )
}

/** Flight choreography — three dragons at different depths and altitudes. */
const DRAGONS = [
  { size: 340, alt: 14, dur: 34, delay: -8, op: 0.85, flap: '1.3s' },
  { size: 225, alt: 30, dur: 44, delay: -27, op: 0.55, flap: '1.7s' },
  { size: 150, alt: 46, dur: 56, delay: -44, op: 0.35, flap: '2.1s' },
] as const

function DragonFlight() {
  return (
    <div className="dragons" aria-hidden="true">
      {DRAGONS.map((d, i) => (
        <span
          key={i}
          className="dragon"
          style={
            {
              width: `${d.size}px`,
              top: `${d.alt}%`,
              opacity: d.op,
              '--dur': `${d.dur}s`,
              '--delay': `${d.delay}s`,
              '--flap': d.flap,
              'animation-delay': `${d.delay}s`,
            } as React.CSSProperties
          }
        >
          <span className="dragon__glider">
            <DragonSvg />
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Hero({ spoilers }: HeroProps) {
  return (
    <section className="hero" aria-label="The Lineage introduction">
      <RuneRings />
      <DustField />
      <DragonFlight />

      <div className="hero__content">
        <p className="hero__eyebrow">The bloodlines of Westeros</p>

        <h1 className="hero__title" aria-label={TITLE}>
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className="char"
              aria-hidden="true"
              style={{ '--i': String(i) } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p className="hero__tagline">
          Every house, every betrayal, every bond of blood — traced in one living tree.
        </p>

        <ul className="hero__houses" aria-label="Great houses on the tree">
          {HOUSES.map((house, i) => (
            <li
              key={house.name}
              className="house-chip"
              style={{ '--chip': house.color, '--i': String(i) } as React.CSSProperties}
            >
              <span className="house-chip__dot" aria-hidden="true" />
              {house.name}
            </li>
          ))}
        </ul>

        <div className="hero__cta-row">
          <a href="#explorer" className="cta cta--primary">
            Begin exploring
            <svg
              className="cta__arrow"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#explorer"
            className="cta cta--ghost"
            aria-label={spoilers ? 'Spoilers are enabled' : 'Enter with spoilers hidden'}
          >
            {spoilers ? 'Spoilers on' : 'Safe mode'}
          </a>
        </div>
      </div>

      <a href="#explorer" className="scroll-cue" aria-label="Scroll to the tree explorer">
        <span>Explore</span>
        <span className="scroll-cue__line" aria-hidden="true" />
      </a>
    </section>
  )
}
