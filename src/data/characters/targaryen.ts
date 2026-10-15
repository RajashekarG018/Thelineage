import type { Character } from '../types.ts'

/**
 * House Targaryen — the dragonlords (spec §3.2). Rhaegar's union with Lyanna
 * Stark produces Jon Snow (filed under Stark); his union with Elia Martell
 * (filed under Martell) produces the doomed Rhaenys and Aegon.
 */
export const targaryenCharacters: Character[] = [
  {
    id: 'aerys-ii-targaryen',
    name: 'Aerys II Targaryen',
    aliases: ['The Mad King'],
    titles: ['King of the Andals and the First Men'],
    houseId: 'targaryen',
    spouseIds: ['rhaella-targaryen'],
    children: ['rhaegar-targaryen', 'viserys-targaryen', 'daenerys-targaryen'],
    living: false,
    death: {
      cause: 'Slain by Jaime Lannister during the sack of King\'s Landing',
    },
    bio: 'The last Targaryen king to sit the Iron Throne before the dragons fell. His descent into paranoia and fire cost him his realm and gave Jaime Lannister the name Kingslayer.',
    bioEarly:
      'A promising young king who married his sister Rhaella and ruled the Seven Kingdoms before madness consumed him.',
    era: 'Background',
  },
  {
    id: 'rhaella-targaryen',
    name: 'Rhaella Targaryen',
    titles: ['Queen of the Seven Kingdoms'],
    houseId: 'targaryen',
    spouseIds: ['aerys-ii-targaryen'],
    children: ['rhaegar-targaryen', 'viserys-targaryen', 'daenerys-targaryen'],
    living: false,
    death: {
      cause: 'Died in childbirth on Dragonstone bearing Daenerys',
    },
    bio: 'Aerys\'s sister-wife, who endured his cruelty and died on Dragonstone giving life to the last Targaryen child.',
    era: 'Background',
  },
  {
    id: 'rhaegar-targaryen',
    name: 'Rhaegar Targaryen',
    titles: ['Prince of Dragonstone'],
    houseId: 'targaryen',
    parents: ['aerys-ii-targaryen', 'rhaella-targaryen'],
    siblingIds: ['viserys-targaryen', 'daenerys-targaryen'],
    spouseIds: ['elia-martell'],
    nonBloodRelations: [
      { kind: 'lover', to: 'lyanna-stark', note: 'eloped with her; secretly wed (revealed season 7)' },
    ],
    children: ['jon-snow'],
    living: false,
    death: {
      cause: 'Killed by Robert Baratheon at the Battle of the Trident',
    },
    bio: 'The beloved prince, singer and warrior, whose taking of Lyanna Stark ignited Robert\'s Rebellion. He died at the Trident, and his son by Lyanna grew up in the North believing himself a bastard.',
    bioEarly:
      'Heir to the Iron Throne, thought by many to be the prince that was promised.',
    era: 'Background',
  },
  {
    id: 'viserys-targaryen',
    name: 'Viserys Targaryen',
    aliases: ['The Beggar King'],
    titles: ['King of the Andals and the First Men'],
    houseId: 'targaryen',
    parents: ['aerys-ii-targaryen', 'rhaella-targaryen'],
    siblingIds: ['rhaegar-targaryen', 'daenerys-targaryen'],
    living: false,
    death: {
      season: 1,
      cause: 'Crowned with molten gold by Khal Drogo',
    },
    bio: 'The arrogant, cruel exile who sold his sister to a Dothraki khal in pursuit of an army, and was killed by the very khal he tried to command.',
    era: 'Season 1',
  },
  {
    id: 'daenerys-targaryen',
    name: 'Daenerys Targaryen',
    aliases: ['Dany', 'Daenerys Stormborn', 'Mother of Dragons', 'The Unburnt', 'Breaker of Chains'],
    titles: ['Queen of the Andals and the First Men', 'Khaleesi'],
    houseId: 'targaryen',
    parents: ['aerys-ii-targaryen', 'rhaella-targaryen'],
    siblingIds: ['rhaegar-targaryen', 'viserys-targaryen'],
    nonBloodRelations: [
      { kind: 'marriage', to: 'khal-drogo', note: 'sold to him as a bride; came to love him' },
      { kind: 'lover', to: 'daario-naharis', note: 'her captain and lover in Meereen' },
    ],
    living: false,
    death: {
      season: 8,
      cause: 'Stabbed by Jon Snow in the throne room of the Red Keep',
      summary: 'Killed to stop the slaughter she had begun at King\'s Landing.',
    },
    bio: 'The last dragon, born in exile and raised in poverty, who walked into fire and came out with dragons. She freed the enslaved, conquered cities, and at the end burned the capital she had come to save.',
    bioEarly:
      'The exiled Targaryen princess, sold into marriage by her brother and raised on stories of the homeland she had never seen.',
    quotes: [
      'I am not your little princess. I am Daenerys Stormborn.',
      'Dracarys.',
    ],
    bookDivergence:
      'The books leave Daenerys\'s end unresolved; her descent and death are a show-only conclusion.',
    era: 'Season 1–8',
  },
  {
    id: 'rhaenys-targaryen',
    name: 'Rhaenys Targaryen',
    houseId: 'targaryen',
    parents: ['rhaegar-targaryen', 'elia-martell'],
    siblingIds: [],
    living: false,
    death: {
      cause: 'Killed during the sack of King\'s Landing',
    },
    bio: 'The infant daughter of Rhaegar and Elia Martell, murdered when the Lannisters sacked King\'s Landing.',
    era: 'Background',
  },
  {
    id: 'aegon-targaryen',
    name: 'Aegon Targaryen',
    aliases: ['The infant Aegon'],
    houseId: 'targaryen',
    parents: ['rhaegar-targaryen', 'elia-martell'],
    siblingIds: ['rhaenys-targaryen'],
    living: false,
    death: {
      cause: 'Killed during the sack of King\'s Landing',
    },
    bio: 'Rhaegar\'s son by Elia Martell, an infant when he was murdered in the sack of the capital. (His name was later given to Jon Snow by Rhaegar himself.)',
    bookDivergence:
      'In the books a boy claiming to be Aegon survives and invades Westeros; the show omits that thread.',
    era: 'Background',
  },
]
