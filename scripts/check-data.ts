/**
 * check-data — referential-integrity & asset validator (spec §9, §13 M2).
 *
 * Run with: npm run check-data
 * Exits non-zero on any broken reference so data rot fails loudly.
 * Missing portraits are reported as information (they arrive in milestone 7).
 */
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

import { houses, characters } from '../src/data/index.ts'
import type { Character } from '../src/data/types.ts'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(rootDir, 'public')

const errors: string[] = []
const warnings: string[] = []
const info: string[] = []

// — 1. Unique house ids —
const houseIds = new Set<string>()
for (const house of houses) {
  if (houseIds.has(house.id)) errors.push(`Duplicate house id: "${house.id}"`)
  houseIds.add(house.id)
}

// — 2. Unique character ids —
const characterIds = new Set<string>()
for (const c of characters) {
  if (characterIds.has(c.id)) errors.push(`Duplicate character id: "${c.id}"`)
  characterIds.add(c.id)
}

const refFields: (keyof Character)[] = ['parents', 'children', 'siblingIds', 'spouseIds']

// — 3. Per-character checks —
for (const c of characters) {
  const where = `character "${c.id}"`

  if (!houseIds.has(c.houseId)) {
    errors.push(`${where} references unknown house "${c.houseId}"`)
  }

  for (const field of refFields) {
    const ids = c[field] as string[] | undefined
    if (!ids) continue
    for (const ref of ids) {
      if (ref === c.id) errors.push(`${where} lists itself in ${field}`)
      else if (!characterIds.has(ref))
        errors.push(`${where} references unknown character "${ref}" in ${field}`)
    }
  }

  for (const rel of c.nonBloodRelations ?? []) {
    if (rel.to === c.id) errors.push(`${where} has a non-blood relation to itself`)
    else if (!characterIds.has(rel.to))
      errors.push(`${where} references unknown character "${rel.to}" in nonBloodRelations`)
  }

  if (!c.living && !c.death) errors.push(`${where} is not living but has no death detail`)
  if (c.living && c.death) warnings.push(`${where} is living but carries death detail`)

  if (!c.bio) warnings.push(`${where} has an empty bio`)

  if (c.portrait) {
    const file = join(publicDir, c.portrait.replace(/^\//, ''))
    if (!existsSync(file)) errors.push(`${where} portrait file not found: ${c.portrait}`)
  }
}

// — 4. Report only (informational) —
const missingPortraits = characters.filter((c) => !c.portrait).map((c) => c.id)
if (missingPortraits.length > 0) {
  info.push(`${missingPortraits.length} character(s) have no portrait yet (milestone 7)`)
}
const emptyHouses = houses.filter((h) => !characters.some((c) => c.houseId === h.id))
for (const h of emptyHouses) info.push(`House "${h.id}" has no characters yet`)

// — Report —
console.log('The Lineage — data check')
console.log(`  houses:     ${houses.length}`)
console.log(`  characters: ${characters.length}`)
console.log('')

for (const line of info) console.log(`  i  ${line}`)
for (const line of warnings) console.log(`  !  ${line}`)

if (errors.length > 0) {
  console.log('')
  for (const line of errors) console.error(`  x  ${line}`)
  console.error(`\ncheck-data FAILED with ${errors.length} error(s).`)
  process.exitCode = 1
} else {
  console.log(`\ncheck-data passed${warnings.length ? ` (with ${warnings.length} warning(s))` : ''}.`)
}
