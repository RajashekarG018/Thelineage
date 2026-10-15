/**
 * The Lineage — data schema (spec §7).
 *
 * These are the hand-curated TV-canon records. Components read them; the
 * owner edits them. Relationship direction is declared once (parents on the
 * child; spouseIds / nonBloodRelations on one party) and the renderer
 * derives the mirror (children, siblings) — see spec §7 authoring rule.
 */

export interface House {
  id: string // 'stark' | 'lannister' | …
  name: string // 'House Stark'
  words?: string // 'Winter Is Coming'
  seat?: string // 'Winterfell'
  color: string // house accent hex (spec §6.2)
  sigilId: string // key into the sigil SVG lookup
}

export type RelationKind = 'marriage' | 'affair' | 'betrothal' | 'lover'

export interface NonBloodRelation {
  kind: RelationKind
  to: string // character id
  note?: string // 'his twin sister', 'betrothed but never wed'
}

export interface Character {
  id: string // slug, e.g. 'eddard-stark'
  name: string
  aliases?: string[]
  titles?: string[]
  houseId: string // primary house
  // Blood relations (TV canon) — stated on the child
  parents?: string[]
  children?: string[]
  siblingIds?: string[] // optional explicit (usually derivable from parents)
  spouseIds?: string[]
  nonBloodRelations?: NonBloodRelation[]
  living: boolean
  death?: {
    // required when living === false
    season?: number
    episode?: number
    cause?: string
    summary?: string
  }
  bio: string // full (spoiler mode)
  bioEarly?: string // safe-mode abstract (early life only)
  quote?: string
  quotes?: string[]
  bookDivergence?: string // presence ⇒ 'book differs' badge
  portrait?: string // '/img/characters/<slug>.jpg' (added in milestone 7)
  era?: string // 'Season 1–8', 'Background'
}

export interface TreeData {
  houses: House[]
  characters: Character[]
}
