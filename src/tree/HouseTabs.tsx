/** 
 * The Lineage — HouseTabs component (spec §4.4).
 * 
 * Primary navigation: a row of house tabs (plaque-style) at the top of the
 * tree area. Each tab is styled with the house sigil and accent color.
 *
 * Selecting a house focuses the tree to that house's genealogy. A "Great
 * Houses" default tab shows all house clusters as a launch board.
 */

import { useCallback } from 'react'
import type { House } from '../data/types.ts'
import HouseSigil from './HouseSigil.tsx'

interface HouseTabsProps {
  houses: House[]
  activeHouseId: string
  onHouseSelect: (houseId: string) => void
  onGreatHousesSelect: () => void
  greatHousesActive: boolean
}

export default function HouseTabs({
  houses,
  activeHouseId,
  onHouseSelect,
  onGreatHousesSelect,
  greatHousesActive,
}: HouseTabsProps) {
  const handleHouseClick = useCallback((houseId: string) => {
    onHouseSelect(houseId)
  }, [onHouseSelect])

  const handleGreatHousesClick = useCallback(() => {
    onGreatHousesSelect()
  }, [onGreatHousesSelect])

  // All great houses (exclude factions and minor houses for main tabs)
  const greatHouses = houses.filter(h => 
    !['essos', 'dothraki', 'frey', 'clegane', 'tarly', 'mormont', 'reed', 'umber', 'karstark', 'bolton'].includes(h.id)
  )

  return (
    <div className="house-tabs" role="tablist" aria-label="Select a house to explore">
      {/* Great Houses overview tab */}
      <button
        type="button"
        role="tab"
        aria-selected={greatHousesActive}
        aria-controls="tree-viewport"
        className={`house-tab${greatHousesActive ? ' is-active' : ''}`}
        onClick={handleGreatHousesClick}
        style={{
          '--tab-color': 'var(--gold)',
          '--tab-glow': 'rgba(217, 179, 87, 0.15)',
        } as React.CSSProperties}
      >
        <span className="house-tab__sigil" aria-hidden="true">
          <HouseSigil houseId="stark" size={16} />
        </span>
        <span className="house-tab__name">All Houses</span>
        {greatHousesActive && (
          <span className="house-tab__indicator" aria-hidden="true" />
        )}
      </button>

      {/* Individual house tabs */}
      {greatHouses.map((house) => (
        <button
          key={house.id}
          type="button"
          role="tab"
          aria-selected={activeHouseId === house.id}
          aria-controls="tree-viewport"
          className={`house-tab${activeHouseId === house.id ? ' is-active' : ''}`}
          onClick={() => handleHouseClick(house.id)}
          style={{
            '--tab-color': house.color,
            '--tab-glow': `${house.color}22`,
          } as React.CSSProperties}
        >
          <span className="house-tab__sigil" aria-hidden="true">
            <HouseSigil houseId={house.sigilId} size={14} />
          </span>
          <span className="house-tab__name">{house.name.replace('House ', '')}</span>
          {activeHouseId === house.id && (
            <span className="house-tab__indicator" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  )
}
