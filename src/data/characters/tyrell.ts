import type { Character } from '../types.ts'

/**
 * House Tyrell — Highgarden (spec §3.2). Margaery and Loras marry into and
 * love into the Baratheon brothers, drawing Highgarden into the royal wars.
 */
export const tyrellCharacters: Character[] = [
  {
    id: 'olenna-tyrell',
    name: 'Olenna Tyrell',
    aliases: ['The Queen of Thorns'],
    titles: ['Lady of Highgarden'],
    houseId: 'tyrell',
    children: ['mace-tyrell'],
    living: false,
    death: {
      season: 7,
      cause: 'Poisoned herself after the fall of Highgarden',
      summary: 'Drank her own poison to deny Cersei the pleasure of killing her.',
    },
    bio: 'Highgarden\'s razor-tongued matriarch, one of the sharpest political minds in the realm, who guarded her grandchildren with wit and, when needed, poison.',
    bioEarly:
      'Born a Redwyne of the Arbor, married into House Tyrell and became its true power behind the throne.',
    quotes: ['You don\'t need to be a virgin to know the difference between a sword and a plough.'],
    era: 'Season 3–7',
  },
  {
    id: 'mace-tyrell',
    name: 'Mace Tyrell',
    titles: ['Lord of Highgarden', 'Warden of the South', 'Hand of the King'],
    houseId: 'tyrell',
    parents: ['olenna-tyrell'],
    children: ['margaery-tyrell', 'loras-tyrell'],
    living: false,
    death: {
      season: 6,
      cause: 'Killed in the destruction of the Great Sept of Baelor',
    },
    bio: 'The pompous, well-fed Lord of Highgarden, forever steered by his mother\'s sharper mind and far prouder of his own titles than his deeds warranted.',
    era: 'Season 3–6',
  },
  {
    id: 'margaery-tyrell',
    name: 'Margaery Tyrell',
    titles: ['Queen of the Seven Kingdoms'],
    houseId: 'tyrell',
    parents: ['mace-tyrell'],
    siblingIds: ['loras-tyrell'],
    nonBloodRelations: [
      { kind: 'marriage', to: 'renly-baratheon', note: 'brief political marriage' },
      { kind: 'marriage', to: 'joffrey-baratheon', note: 'betrothed then widowed at the feast' },
      { kind: 'marriage', to: 'tommen-baratheon', note: 'crowned queen beside Tommen' },
    ],
    living: false,
    death: {
      season: 6,
      cause: 'Killed in the destruction of the Great Sept of Baelor',
    },
    bio: 'The charming, calculating rose of Highgarden who married three kings in turn and won the love of the people — until wildfire swallowed the sept and her with it.',
    bioEarly:
      'Mace Tyrell\'s daughter, schooled by her grandmother to charm a kingdom and guard her family\'s power.',
    era: 'Season 2–6',
  },
  {
    id: 'loras-tyrell',
    name: 'Loras Tyrell',
    aliases: ['The Knight of Flowers', 'The Knight of the Laughing Tree'],
    titles: ['Ser', 'Lord Commander of the Kingsguard'],
    houseId: 'tyrell',
    parents: ['mace-tyrell'],
    siblingIds: ['margaery-tyrell'],
    nonBloodRelations: [
      { kind: 'lover', to: 'renly-baratheon', note: 'his lover and king' },
    ],
    living: false,
    death: {
      season: 6,
      cause: 'Killed in the destruction of the Great Sept of Baelor',
    },
    bio: 'The celebrated Knight of Flowers, the realm\'s most glamorous tourney champion and Renly Baratheon\'s devoted lover, who took the white cloak and burned with the Faith.',
    era: 'Season 1–6',
  },
]
