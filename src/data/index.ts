import type { Character, House, TreeData } from './types.ts'
import { houses } from './houses.ts'
import { starkCharacters } from './characters/stark.ts'
import { tullyCharacters } from './characters/tully.ts'
import { arrynCharacters } from './characters/arryn.ts'
import { lannisterCharacters } from './characters/lannister.ts'
import { baratheonCharacters } from './characters/baratheon.ts'
import { targaryenCharacters } from './characters/targaryen.ts'
import { martellCharacters } from './characters/martell.ts'
import { tyrellCharacters } from './characters/tyrell.ts'
import { boltonCharacters } from './characters/bolton.ts'
import { minorCharacters } from './characters/minor.ts'

/**
 * All curated characters, in a deliberate house order (spec §7).
 * Milestone 2 ships the flagship lines (Stark, Lannister, Targaryen) plus the
 * houses they marry into; the remaining great houses arrive in milestone 7.
 */
export const characters: Character[] = [
  ...starkCharacters,
  ...tullyCharacters,
  ...arrynCharacters,
  ...lannisterCharacters,
  ...baratheonCharacters,
  ...targaryenCharacters,
  ...martellCharacters,
  ...tyrellCharacters,
  ...boltonCharacters,
  ...minorCharacters,
]

export const treeData: TreeData = { houses, characters }

/** id → Character lookup (built once; the tree is read-only data). */
export const charactersById: Map<string, Character> = new Map(
  characters.map((c) => [c.id, c]),
)

/** id → House lookup. */
export const housesById: Map<string, House> = new Map(houses.map((h) => [h.id, h]))

export function getCharacter(id: string): Character | undefined {
  return charactersById.get(id)
}

export function getHouse(id: string): House | undefined {
  return housesById.get(id)
}

export { houses }
export type { Character, House, TreeData }
