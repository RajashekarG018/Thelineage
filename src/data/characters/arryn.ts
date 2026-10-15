import type { Character } from '../types.ts'

/**
 * House Arryn — the Eyrie (spec §3.2). Connected to the Starks through
 * Lysa Tully; Jon Arryn's death opens the whole story.
 */
export const arrynCharacters: Character[] = [
  {
    id: 'jon-arryn',
    name: 'Jon Arryn',
    titles: ['Lord of the Eyrie', 'Hand of the King', 'Warden of the East'],
    houseId: 'arryn',
    spouseIds: ['lysa-tully'],
    children: ['robin-arryn'],
    living: false,
    death: {
      season: 1,
      cause: 'Poisoned by Lysa Arryn and Petyr Baelish',
      summary: 'His murder set the events of the story in motion.',
    },
    bio: 'Lord of the Eyrie and the Hand of the King who had fostered both Eddard Stark and Robert Baratheon. His death — first thought natural, then murder — drew Ned south into the game of thrones.',
    bioEarly:
      'Head of House Arryn, Warden of the East, and the man who raised Ned Stark and Robert Baratheon as boys.',
    era: 'Season 1',
  },
  {
    id: 'robin-arryn',
    name: 'Robin Arryn',
    aliases: ['Robert Arryn'],
    titles: ['Lord of the Eyrie', 'Warden of the East'],
    houseId: 'arryn',
    parents: ['jon-arryn', 'lysa-tully'],
    living: true,
    bio: 'The sickly, coddled son of Jon and Lysa, heir to the Eyrie. Under the tutelage of Lord Royce he grew, at last, into a steadier young lord.',
    era: 'Season 1–8',
  },
]
