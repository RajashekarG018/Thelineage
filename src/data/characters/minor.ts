import type { Character } from '../types.ts'

/**
 * Minor characters & crossovers (spec §10, minor.ts). Spouses and lovers who
 * carry a blood-or-bed link into one of the flagship lines but belong to no
 * great Westerosi house: the Essosi figures and the Frey bride of Riverrun.
 */
export const minorCharacters: Character[] = [
  {
    id: 'talisa-maegyr',
    name: 'Talisa Stark',
    aliases: ['Talisa Maegyr'],
    houseId: 'essos',
    spouseIds: ['robb-stark'],
    living: false,
    death: {
      season: 3,
      episode: 9,
      cause: 'Stabbed at the Red Wedding while pregnant with Robb\'s child',
    },
    bio: 'A noblewoman of Volantis who trained as a healer and crossed the narrow sea to tend the wounded. Robb Stark broke his vow to a Frey bride for love of her, and she died beside him at the Red Wedding.',
    bioEarly:
      'A highborn Volantene healer who turned her back on her family\'s slave-owning wealth.',
    era: 'Season 2–3',
  },
  {
    id: 'shae',
    name: 'Shae',
    houseId: 'essos',
    nonBloodRelations: [
      { kind: 'lover', to: 'tyrion-lannister', note: 'the whore he loved' },
    ],
    living: false,
    death: {
      season: 4,
      cause: 'Strangled by Tyrion in Tywin\'s bed',
    },
    bio: 'The camp follower Tyrion brought to King\'s Landing and loved against all sense. Betrayed and afraid, she testified against him at his trial and died in his father\'s bed.',
    era: 'Season 1–4',
  },
  {
    id: 'khal-drogo',
    name: 'Khal Drogo',
    aliases: ['The Great Khal'],
    houseId: 'dothraki',
    spouseIds: ['daenerys-targaryen'],
    living: false,
    death: {
      season: 1,
      cause: 'Smothered by Daenerys after a wound left him in a living death',
    },
    bio: 'The Dothraki warlord who took Daenerys Targaryen as his bride and, for love of her, vowed to sail to Westeros — until a festering wound and a witch\'s magic ended him.',
    era: 'Season 1',
  },
  {
    id: 'daario-naharis',
    name: 'Daario Naharis',
    houseId: 'essos',
    nonBloodRelations: [
      { kind: 'lover', to: 'daenerys-targaryen', note: 'her captain and lover in Meereen' },
    ],
    living: true,
    bio: 'A swaggering sellsword captain of the Second Sons, who won Daenerys\'s favour and her bed, and was left behind in Meereen when she sailed for Westeros.',
    era: 'Season 3–6',
  },
  {
    id: 'walder-frey',
    name: 'Walder Frey',
    aliases: ['The Late Lord Frey'],
    titles: ['Lord of the Crossing'],
    houseId: 'frey',
    children: ['roslin-frey'],
    living: false,
    death: {
      season: 7,
      cause: 'Throat slit by Arya Stark, who wore his face',
    },
    bio: 'The ancient, prolific and proud Lord of the Twins, who took his revenge on Robb Stark for breaking a marriage pact by slaughtering him under his own roof at the Red Wedding.',
    era: 'Season 1–7',
  },
  {
    id: 'roslin-frey',
    name: 'Roslin Frey',
    aliases: ['Roslin Tully'],
    houseId: 'frey',
    parents: ['walder-frey'],
    nonBloodRelations: [
      { kind: 'marriage', to: 'edmure-tully', note: 'wed at the Red Wedding' },
    ],
    living: true,
    bio: 'One of Walder Frey\'s daughters, given to Edmure Tully as the bait whose wedding became the Red Wedding. Gentle and frightened, she alone among the plotters was innocent of the slaughter.',
    era: 'Season 3',
  },
]
