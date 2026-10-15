import type { Character } from '../types.ts'

/**
 * House Bolton — the Dreadfort (spec §3.2). The flayed-man house that
 * betrayed the Starks at the Red Wedding and took Winterfell for a season.
 */
export const boltonCharacters: Character[] = [
  {
    id: 'roose-bolton',
    name: 'Roose Bolton',
    aliases: ['The Leech Lord'],
    titles: ['Lord of the Dreadfort', 'Warden of the North'],
    houseId: 'bolton',
    children: ['ramsay-bolton'],
    living: false,
    death: {
      season: 6,
      cause: 'Stabbed by his son Ramsay after Ramsay poisoned his newborn half-brother',
    },
    bio: 'The soft-spoken, pale-eyed Lord of the Dreadfort who drove the knife into Robb Stark at the Red Wedding and was rewarded with the North — which his bastard son then took from him.',
    era: 'Season 2–6',
  },
  {
    id: 'ramsay-bolton',
    name: 'Ramsay Bolton',
    aliases: ['Ramsay Snow', 'The Bastard of Bolton'],
    titles: ['Lord of Winterfell', 'Warden of the North'],
    houseId: 'bolton',
    parents: ['roose-bolton'],
    nonBloodRelations: [
      { kind: 'marriage', to: 'sansa-stark', note: 'forced marriage; annulled by his death' },
    ],
    living: false,
    death: {
      season: 6,
      cause: 'Killed by his own hounds, set loose by Sansa Stark',
    },
    bio: 'Roose\'s sadistic bastard son, legitimised for his treachery, who tortured Theon, wed and brutalised Sansa, and died the way he lived — devoured by his own dogs.',
    era: 'Season 3–6',
  },
]
