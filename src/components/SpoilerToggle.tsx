interface SpoilerToggleProps {
  spoilers: boolean
  onToggle: () => void
}

/**
 * Spoiler mode switch (spec §3.3).
 * Default state is SAFE MODE and is never persisted — every fresh visit
 * requires a deliberate opt-in (locked decision #18).
 */
export default function SpoilerToggle({ spoilers, onToggle }: SpoilerToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={spoilers}
      onClick={onToggle}
      className={`spoiler-toggle${spoilers ? ' is-on' : ''}`}
      title="Reveal deaths, affairs, and plot details"
    >
      <span className="spoiler-toggle__icon" aria-hidden="true">
        ⚠
      </span>
      <span className="spoiler-toggle__label">{spoilers ? 'Spoilers on' : 'Safe mode'}</span>
      <span className="spoiler-toggle__track" aria-hidden="true">
        <span className="spoiler-toggle__thumb" />
      </span>
    </button>
  )
}
