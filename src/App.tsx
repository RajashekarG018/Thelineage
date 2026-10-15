import { useState } from 'react'
import Hero from './components/Hero.tsx'
import SpoilerToggle from './components/SpoilerToggle.tsx'
import { treeData } from './data/index.ts'

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
 * Milestone-1 shell (spec §8): fixed nav with the spoiler toggle,
 * ambient cinematic layers, hero, and a placeholder for the
 * tree explorer (built in milestone 3).
 */
export default function App() {
  // Spoiler state lives here (spec §3.3) — SAFE MODE on every fresh
  // visit, never persisted to localStorage (locked decision #18).
  const [spoilers, setSpoilers] = useState(false)

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

        {/* Placeholder plate — replaced by the tree explorer in milestone 3 */}
        <section id="explorer" className="explorer" aria-label="Tree explorer placeholder">
          <div className="explorer__plate">
            <h2 className="gold-text">The tree of houses awaits</h2>
            <p>
              Stark, Lannister, Targaryen and more — every bloodline of the Seven Kingdoms will
              hang here. Hover a line to trace it, click any character for their story.
            </p>
            <span className="milestone-note">Tree explorer — milestone 3</span>
          </div>
        </section>
      </main>
    </>
  )
}
