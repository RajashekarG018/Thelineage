import { useState, useCallback } from 'react'
import Hero from './components/Hero.tsx'
import SpoilerToggle from './components/SpoilerToggle.tsx'
import { treeData, houses } from './data/index.ts'
import TreeExplorer from './tree/TreeExplorer.tsx'

/**
 * Data debug view (spec §13 milestone 2 exit criteria). Reached only with
 * `?data` in the URL so it never affects the normal hero/explorer visuals.
 * Dumps the curated dataset as raw JSON for a quick sanity read.
 */
function DataDebugView() {
  return (
    <pre className="data-debug" aria-label="Curated character and house data">
      {JSON.stringify(treeData, null, 2)}
    </pre>
  )
}

const showDataDebug =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('data')

/**
 * Milestone-3 shell (spec §8): fixed nav with the spoiler toggle,
 * ambient cinematic layers, hero, house tabs, and the interactive
 * family-tree explorer.
 */
export default function App() {
  // Spoiler state lives here (spec §3.3) — SAFE MODE on every fresh
  // visit, never persisted to localStorage (locked decision #18).
  const [spoilers, setSpoilers] = useState(false)
  const [activeHouseId, setActiveHouseId] = useState<string | null>(null)

  const handleHouseSelect = useCallback((houseId: string | null) => {
    setActiveHouseId(houseId)
  }, [])

  // Signature line for the active house
  const activeHouse = houses.find(h => h.id === activeHouseId)

  if (showDataDebug) return <DataDebugView />

  return (
    <>
      {/* Ambient scene layers */}
      <div className="fog" aria-hidden="true">
        <span className="fog__blob fog__blob--1" />
        <span className="fog__blob fog__blob--2" />
        <span className="fog__blob fog__blob--3" />
      </div>
      <div className="grain" aria-hidden="true" />

      <header className="site-nav">
        <div className="nav-inner">
          <a href="/" className="brand" aria-label="The Lineage — home">
            <span className="brand__sigil" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                {/* Simplified shield mark — placeholder for the house-sigil kit (spec §6.4) */}
                <path
                  d="M12 2.5 21 6v6.2c0 4.4-3.4 7.6-9 9.3-5.6-1.7-9-4.9-9-9.3V6l9-3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path d="M12 6.5v9M7.5 9.5h9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
            <span className="brand__stack">
              <span className="brand__name">The Lineage</span>
              <span className="brand__sub">Westeros</span>
            </span>
          </a>

          <SpoilerToggle spoilers={spoilers} onToggle={() => setSpoilers((s) => !s)} />
        </div>
      </header>

      <main className="main-content">
        <Hero spoilers={spoilers} />

        {/* Tree explorer section */}
        <section
          id="explorer"
          className="explorer"
          aria-label={`Family tree explorer${activeHouse ? ` — ${activeHouse.name}` : ''}`}
        >
          {/* Vertical lineage explorer */}
          <div id="tree-viewport" className="tree-viewport">
            <TreeExplorer
              activeHouseId={activeHouseId}
              spoilers={spoilers}
              onHouseSelect={handleHouseSelect}
            />
          </div>

          {/* House context footer */}
          {activeHouse && (
            <div className="tree-context" role="status" aria-live="polite">
              <span className="tree-context__sigil" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 60 60" fill="none">
                  <path
                    d="M30 5L55 15V30C55 42 42 52 30 55C18 52 5 42 5 30V15L30 5Z"
                    fill={activeHouse.color}
                    opacity="0.3"
                  />
                  <path
                    d="M30 8L52 16V30C52 40 42 49 30 51C18 49 8 40 8 30V16L30 8Z"
                    fill={activeHouse.color}
                    opacity="0.6"
                  />
                </svg>
              </span>
              <span className="tree-context__text">
                Exploring <strong>{activeHouse.name}</strong>{activeHouse.words ? ` — “${activeHouse.words}”` : ''}
              </span>
            </div>
          )}
        </section>
      </main>
    </>
  )
}

