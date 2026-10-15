import type { Character } from '../types.ts'

/**
 * House Lannister — Casterly Rock (spec §3.2). Cersei's children are styled
 * Baratheon (their legal name) and live in baratheon.ts; their true parents
 * (Jaime + Cersei) are recorded there as non-blood relations to keep the
 * incest topology explicit for the layout (spec §14 risk note).
 */
export const lannisterCharacters: Character[] = [
  {
    id: 'tywin-lannister',
    name: 'Tywin Lannister',
    aliases: ['The Great Lion'],
    titles: ['Lord of Casterly Rock', 'Warden of the West', 'Hand of the King'],
    houseId: 'lannister',
    spouseIds: ['joanna-lannister'],
    children: ['jaime-lannister', 'cersei-lannister', 'tyrion-lannister'],
    living: false,
    death: {
      season: 4,
      episode: 10,
      cause: 'Shot with a crossbow by his son Tyrion',
      summary: 'Killed on the privy after condemning Tyrion to death.',
    },
    bio: 'The cold, brilliant patriarch who restored House Lannister\'s name through ruthlessness and gold. He served as Hand to two kings and never forgave his youngest son for being born.',
    bioEarly:
      'Heir to Casterly Rock, who witnessed his father\'s weakness and resolved that his house would never again be laughed at.',
    quotes: ['Any man who must say, "I am the king", is no true king.'],
    era: 'Season 1–4',
  },
  {
    id: 'joanna-lannister',
    name: 'Joanna Lannister',
    titles: ['Lady of Casterly Rock'],
    houseId: 'lannister',
    spouseIds: ['tywin-lannister'],
    children: ['jaime-lannister', 'cersei-lannister', 'tyrion-lannister'],
    living: false,
    death: { cause: 'Died giving birth to Tyrion' },
    bio: 'Tywin\'s beloved wife and cousin. Her death in childbed left Tywin bereft and hardened him forever against the son who caused it.',
    era: 'Background',
  },
  {
    id: 'jaime-lannister',
    name: 'Jaime Lannister',
    aliases: ['The Kingslayer', 'Goldenhand the Just'],
    titles: ['Ser', 'Lord Commander of the Kingsguard'],
    houseId: 'lannister',
    parents: ['tywin-lannister', 'joanna-lannister'],
    siblingIds: ['cersei-lannister', 'tyrion-lannister'],
    nonBloodRelations: [
      { kind: 'lover', to: 'cersei-lannister', note: 'his twin sister' },
    ],
    living: false,
    death: {
      season: 8,
      cause: 'Crushed in the collapse of the Red Keep',
      summary: 'Died in his sister\'s arms beneath the falling stones.',
    },
    bio: 'The golden knight who slew the Mad King to save a city and was branded a traitor for it. Long defined by his love for his twin, he slowly sought to become the man he might have been.',
    bioEarly:
      'Eldest son of Tywin Lannister and heir to Casterly Rock until he took the white cloak of the Kingsguard.',
    quotes: ['The things I do for love.'],
    bookDivergence:
      'In the books Jaime survives longer and parts from Cersei to oppose her; the show reunites them in death.',
    era: 'Season 1–8',
  },
  {
    id: 'cersei-lannister',
    name: 'Cersei Lannister',
    aliases: ['The Queen Regent'],
    titles: ['Queen of the Seven Kingdoms', 'Protector of the Realm'],
    houseId: 'lannister',
    parents: ['tywin-lannister', 'joanna-lannister'],
    siblingIds: ['jaime-lannister', 'tyrion-lannister'],
    spouseIds: ['robert-baratheon'],
    nonBloodRelations: [
      { kind: 'lover', to: 'jaime-lannister', note: 'her twin brother' },
    ],
    living: false,
    death: {
      season: 8,
      cause: 'Crushed in the collapse of the Red Keep',
    },
    bio: 'Tywin\'s daughter and Robert\'s queen, who knew the game from her girlhood and played it with ruthless, self-defeating brilliance. She gambled her house\'s future on the certainty that she could not lose — and did.',
    bioEarly:
      'The only daughter of Tywin Lannister, raised to believe she would one day be queen.',
    quotes: [
      'Power is power.',
      'When you play the game of thrones, you win or you die.',
    ],
    era: 'Season 1–8',
  },
  {
    id: 'tyrion-lannister',
    name: 'Tyrion Lannister',
    aliases: ['The Imp', 'The Halfman', 'The Giant'],
    titles: ['Hand of the King', 'Hand of the Queen'],
    houseId: 'lannister',
    parents: ['tywin-lannister', 'joanna-lannister'],
    siblingIds: ['jaime-lannister', 'cersei-lannister'],
    nonBloodRelations: [
      { kind: 'marriage', to: 'sansa-stark', note: 'forced marriage, never consummated' },
      { kind: 'lover', to: 'shae', note: 'the whore he loved' },
    ],
    living: true,
    bio: 'The dwarf son Tywin wished he had drowned, who repaid a lifetime of contempt with an unmatched wit. He served as Hand to Joffrey, then Daenerys, and lived to help rebuild the realm.',
    bioEarly:
      'Youngest child of Tywin Lannister, raised in the shadow of his father\'s disgust and his siblings\' beauty.',
    quotes: [
      'I drink and I know things.',
      'Never forget what you are, the rest of the world will not. Wear it like armour and it can never be used to hurt you.',
    ],
    era: 'Season 1–8',
  },
  {
    id: 'kevan-lannister',
    name: 'Kevan Lannister',
    titles: ['Ser'],
    houseId: 'lannister',
    siblingIds: ['tywin-lannister'],
    children: ['lancel-lannister'],
    living: false,
    death: {
      season: 6,
      cause: 'Killed in the destruction of the Great Sept of Baelor',
    },
    bio: 'Tywin\'s steady younger brother and loyal hand, less brilliant and far more decent than his lord. He died with the Faith in Cersei\'s wildfire.',
    era: 'Season 1–6',
  },
  {
    id: 'lancel-lannister',
    name: 'Lancel Lannister',
    houseId: 'lannister',
    parents: ['kevan-lannister'],
    nonBloodRelations: [
      { kind: 'lover', to: 'cersei-lannister', note: 'her cousin and onetime lover' },
    ],
    living: false,
    death: {
      season: 6,
      cause: 'Killed in the destruction of the Great Sept of Baelor',
    },
    bio: 'Kevan\'s son, once Cersei\'s malleable tool for scheming against Robert, who remade himself as a zealous soldier of the Faith Militant and died a fanatic.',
    era: 'Season 1–6',
  },
]
