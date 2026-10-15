import { useMemo, useState } from 'react'
import type { Character, House } from '../data/types.ts'
import { characters, getCharacter, getHouse, houses } from '../data/index.ts'
import HouseSigil from './HouseSigil.tsx'

interface TreeExplorerProps {
  activeHouseId: string | null
  spoilers: boolean
  onHouseSelect: (houseId: string | null) => void
}

interface FamilyBranch {
  id: string
  person: Character
  partner?: Character
  relationship?: 'marriage' | 'lover' | 'affair' | 'betrothal'
  children: string[]
}

const EXCLUDED_HOUSES = new Set([
  'essos', 'dothraki', 'frey', 'clegane', 'tarly', 'mormont', 'reed', 'umber', 'karstark', 'bolton',
])
const EMPTY_EXPANDED = new Set<string>()

function rootForHouse(houseId: string): Character | undefined {
  const members = characters.filter(character => character.houseId === houseId)
  return members
    .filter(character => !character.parents?.length)
    .sort((a, b) => Number(b.era === 'Background') - Number(a.era === 'Background'))[0]
}

function branchFor(personId: string): FamilyBranch | undefined {
  const person = getCharacter(personId)
  if (!person) return undefined

  const spouse = person.spouseIds?.map(getCharacter).find(Boolean)
  const nonBlood = person.nonBloodRelations?.find(relation =>
    ['marriage', 'lover', 'affair', 'betrothal'].includes(relation.kind),
  )
  const partner = spouse ?? (nonBlood ? getCharacter(nonBlood.to) : undefined)
  const relationship = spouse ? 'marriage' : nonBlood?.kind
  const children = new Set(person.children ?? [])
  for (const childId of partner?.children ?? []) children.add(childId)

  return { id: person.id, person, partner, relationship, children: [...children] }
}

function Branch({
  branch,
  expanded,
  onToggle,
  selectedId,
  onSelect,
  spoilers,
  ancestors,
}: {
  branch: FamilyBranch
  expanded: Set<string>
  onToggle: (id: string) => void
  selectedId: string | null
  onSelect: (personId: string) => void
  spoilers: boolean
  ancestors: Set<string>
}) {
  const house = getHouse(branch.person.houseId)
  const hasChildren = branch.children.length > 0
  const isExpanded = expanded.has(branch.id)

  return (
    <li className="lineage-branch">
      <div
        className={`lineage-union${branch.partner ? ' lineage-union--paired' : ''}${isExpanded ? ' is-expanded' : ''}${selectedId === branch.person.id ? ' is-selected' : ''}`}
        style={{ '--house-color': house?.color ?? 'var(--gold)' } as React.CSSProperties}
      >
        <button
          type="button"
          className="lineage-person"
          onClick={() => onSelect(branch.person.id)}
          aria-pressed={selectedId === branch.person.id}
          aria-label={`View ${branch.person.name}`}
          style={{ '--house-color': house?.color ?? 'var(--gold)' } as React.CSSProperties}
        >
          <span className="lineage-person__sigil"><HouseSigil houseId={house?.sigilId ?? 'shield'} size={32} /></span>
          <span className="lineage-person__copy">
            <span className="lineage-person__name">{branch.person.name}</span>
            <span className="lineage-person__house">{house?.name ?? 'Unknown house'}</span>
            {spoilers && branch.person.aliases?.[0] && <span className="lineage-person__alias">{branch.person.aliases[0]}</span>}
          </span>
          {!branch.person.living && <span className="lineage-person__death" aria-label="Deceased">†</span>}
        </button>
        {branch.partner && (
          <>
            <span className={`lineage-relationship lineage-relationship--${branch.relationship ?? 'marriage'}`} aria-label={branch.relationship ?? 'marriage'}>
              <i /><em>{branch.relationship === 'lover' ? 'secret bond' : branch.relationship}</em><i />
            </span>
            <button
              type="button"
              className="lineage-partner"
              onClick={() => onSelect(branch.partner!.id)}
              aria-pressed={selectedId === branch.partner.id}
              style={{ '--house-color': getHouse(branch.partner.houseId)?.color ?? 'var(--gold)' } as React.CSSProperties}
            >
              <HouseSigil houseId={getHouse(branch.partner.houseId)?.sigilId ?? 'shield'} size={24} />
              <span>{branch.partner.name}</span>
            </button>
          </>
        )}
        {hasChildren && (
          <button
            type="button"
            className="lineage-person__toggle"
            onClick={() => onToggle(branch.id)}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Reveal'} descendants of ${branch.person.name}`}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      {isExpanded && (
        <ul className="lineage-children" aria-label={`Children of ${branch.person.name}`}>
          {branch.children.map(childId => {
            if (ancestors.has(childId)) return null
            const child = branchFor(childId)
            return child ? (
              <Branch
                key={child.id}
                branch={child}
                expanded={expanded}
                onToggle={onToggle}
                selectedId={selectedId}
                onSelect={onSelect}
                spoilers={spoilers}
                ancestors={new Set([...ancestors, branch.id])}
              />
            ) : null
          })}
        </ul>
      )}
    </li>
  )
}

export default function TreeExplorer({ activeHouseId, spoilers, onHouseSelect }: TreeExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [expandedHouseId, setExpandedHouseId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const activeHouse = activeHouseId ? getHouse(activeHouseId) : undefined
  const root = activeHouseId ? rootForHouse(activeHouseId) : undefined
  const visibleExpanded = expandedHouseId === activeHouseId ? expanded : EMPTY_EXPANDED

  const availableHouses = useMemo(
    () => houses.filter(house => !EXCLUDED_HOUSES.has(house.id)),
    [],
  )

  const toggleBranch = (id: string) => {
    setExpanded(current => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setExpandedHouseId(activeHouseId)
  }

  const selectHouse = (houseId: string | null) => {
    setSelectedId(null)
    onHouseSelect(houseId)
  }

  if (!activeHouseId) {
    return (
      <div className="lineage-house-list" aria-label="Choose a house to explore">
        <header className="lineage-court">
          <p className="lineage-court__eyebrow">The Seven Kingdoms</p>
          <h2>Houses<br />of Westeros</h2>
          <span className="lineage-court__rule" aria-hidden="true"><i /><b>✦</b><i /></span>
          <p className="lineage-intro">Choose a sigil. Follow its bloodline.</p>
        </header>
        <ul className="lineage-house-grid">
          {availableHouses.map((house: House, index: number) => (
            <li
              key={house.id}
              style={{
                '--orbit-angle': `${index * (360 / availableHouses.length)}deg`,
              } as React.CSSProperties}
            >
              <button
                type="button"
                className="lineage-house"
                onClick={() => selectHouse(house.id)}
                style={{ '--house-color': house.color } as React.CSSProperties}
              >
                <span className="lineage-house__upright">
                  <span className="lineage-house__shield"><HouseSigil houseId={house.sigilId} size={38} /></span>
                  <span className="lineage-house__copy"><strong>{house.name.replace('House ', '')}</strong><small>{house.words ?? house.seat}</small><small className="lineage-house__seat">{house.seat}</small></span>
                  <span className="lineage-house__enter" aria-hidden="true">↗</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (!activeHouse) return <p className="lineage-empty">This house could not be found.</p>

  if (!root) {
    return (
      <div className="lineage-tree" style={{ '--house-color': activeHouse.color } as React.CSSProperties}>
        <div className="lineage-tree__header">
          <button type="button" className="lineage-back" onClick={() => selectHouse(null)}>← All houses</button>
          <p><strong>{activeHouse.name}</strong><span>{activeHouse.words}</span></p>
        </div>
        <p className="lineage-empty">This bloodline has not yet been charted.</p>
      </div>
    )
  }

  const rootBranch = branchFor(root.id)
  return (
    <div className="lineage-tree" style={{ '--house-color': activeHouse.color } as React.CSSProperties}>
      <div className="lineage-tree__header">
        <button type="button" className="lineage-back" onClick={() => selectHouse(null)}>← All houses</button>
        <p><strong>{activeHouse.name}</strong><span>{activeHouse.words}</span></p>
      </div>
      {rootBranch ? (
        <ul className="lineage-root" aria-label={`${activeHouse.name} family tree`}>
          <Branch branch={rootBranch} expanded={visibleExpanded} onToggle={toggleBranch} selectedId={selectedId} onSelect={setSelectedId} spoilers={spoilers} ancestors={new Set()} />
        </ul>
      ) : <p className="lineage-empty">No lineage data is available.</p>}
      {selectedId && getCharacter(selectedId) && <CharacterDossier character={getCharacter(selectedId)!} spoilers={spoilers} onClose={() => setSelectedId(null)} />}
    </div>
  )
}

function CharacterDossier({ character, spoilers, onClose }: { character: Character; spoilers: boolean; onClose: () => void }) {
  const house = getHouse(character.houseId)
  const description = spoilers ? character.bio : character.bioEarly

  return (
    <aside className="lineage-dossier" style={{ '--house-color': house?.color ?? 'var(--gold)' } as React.CSSProperties} aria-live="polite" aria-label={`${character.name} character details`}>
      <div className="lineage-dossier__seal" style={{ '--house-color': house?.color ?? 'var(--gold)' } as React.CSSProperties}>
        <HouseSigil houseId={house?.sigilId ?? 'shield'} size={42} />
      </div>
      <div className="lineage-dossier__body">
        <div className="lineage-dossier__eyebrow">{house?.name ?? 'Westeros'} · {character.living ? 'Living' : 'Fallen'}</div>
        <h3>{character.name}</h3>
        {character.titles?.length ? <p className="lineage-dossier__titles">{character.titles.join(' · ')}</p> : null}
        <p className="lineage-dossier__bio">{description ?? (spoilers ? character.bio : 'Their story is veiled while spoiler protection is on.')}</p>
        {spoilers && character.quotes?.[0] && <blockquote>“{character.quotes[0]}”</blockquote>}
        {spoilers && character.death?.summary && <p className="lineage-dossier__fate">{character.death.summary}</p>}
      </div>
      <button type="button" className="lineage-dossier__close" onClick={onClose} aria-label="Close character details">×</button>
    </aside>
  )
}
