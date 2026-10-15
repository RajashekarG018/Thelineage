import type { Character } from '../types.ts'

/**
 * House Martell — Sunspear (spec §3.2). Elia's marriage to Rhaegar ties
 * Dorne to the Targaryen line; Oberyn's death sets off the Dornish plot.
 * The bastard daughters (Sand Snakes) keep houseId 'martell'.
 */
export const martellCharacters: Character[] = [
  {
    id: 'doran-martell',
    name: 'Doran Martell',
    aliases: ['The Prince of Dorne'],
    titles: ['Prince of Dorne'],
    houseId: 'martell',
    children: ['trystane-martell'],
    siblingIds: ['elia-martell', 'oberyn-martell'],
    living: false,
    death: {
      season: 6,
      cause: 'Killed by Ellaria Sand and the Sand Snakes in the Water Gardens',
    },
    bio: 'The gouty, patient Prince of Dorne, who spent years nursing secret plans for vengeance and was undone by his own countrymen.',
    era: 'Season 5–6',
  },
  {
    id: 'elia-martell',
    name: 'Elia Martell',
    titles: ['Princess of Dorne'],
    houseId: 'martell',
    siblingIds: ['doran-martell', 'oberyn-martell'],
    spouseIds: ['rhaegar-targaryen'],
    children: ['rhaenys-targaryen', 'aegon-targaryen'],
    living: false,
    death: {
      cause: 'Murdered during the sack of King\'s Landing',
    },
    bio: 'Rhaegar Targaryen\'s first wife, set aside in all but name for Lyanna Stark. She and her children were butchered in the sack of the capital, a crime Dorne never forgot.',
    era: 'Background',
  },
  {
    id: 'oberyn-martell',
    name: 'Oberyn Martell',
    aliases: ['The Red Viper'],
    titles: ['Prince of Dorne'],
    houseId: 'martell',
    siblingIds: ['doran-martell', 'elia-martell'],
    nonBloodRelations: [
      { kind: 'lover', to: 'ellaria-sand', note: 'his paramour' },
    ],
    children: ['obara-sand', 'nymeria-sand', 'tyene-sand'],
    living: false,
    death: {
      season: 4,
      cause: 'Killed by Ser Gregor Clegane in trial by combat',
      summary: 'He had the Mountain beaten when a moment of fury cost him his life.',
    },
    bio: 'The Red Viper of Dorne — poisoner, duelist and loving father — who came to King\'s Landing to avenge his sister Elia and died within reach of it, undone by his own anger.',
    bioEarly:
      'Second son of Sunspear, famed across the realm for his temper and his skill with a spear.',
    era: 'Season 4',
  },
  {
    id: 'trystane-martell',
    name: 'Trystane Martell',
    titles: ['Prince of Dorne'],
    houseId: 'martell',
    parents: ['doran-martell'],
    living: false,
    death: {
      season: 5,
      cause: 'Killed by Ellaria Sand and the Sand Snakes',
    },
    bio: 'Doran\'s gentle heir, betrothed to Myrcella Baratheon and killed by the Sand Snakes when they seized Dorne for war.',
    era: 'Season 5',
  },
  {
    id: 'ellaria-sand',
    name: 'Ellaria Sand',
    houseId: 'martell',
    nonBloodRelations: [
      { kind: 'lover', to: 'oberyn-martell', note: 'her paramour' },
    ],
    children: ['tyene-sand'],
    living: false,
    death: {
      season: 7,
      cause: 'Left chained in the black cells to watch her daughter die',
    },
    bio: 'Oberyn\'s paramour and mother of several of his daughters. Grief for him curdled into vengeance, and she dragged Dorne into a war of her own making.',
    era: 'Season 4–7',
  },
  {
    id: 'obara-sand',
    name: 'Obara Sand',
    houseId: 'martell',
    parents: ['oberyn-martell'],
    siblingIds: ['nymeria-sand', 'tyene-sand'],
    living: false,
    death: { season: 7, cause: 'Killed by Euron Greyjoy\'s fleet in the Battle of the Narrow Sea' },
    bio: 'Oberyn\'s eldest bastard daughter, a warrior with a spear and a grudge, born of a Dornish peasant woman.',
    era: 'Season 5–7',
  },
  {
    id: 'nymeria-sand',
    name: 'Nymeria Sand',
    aliases: ['Lady Nym'],
    houseId: 'martell',
    parents: ['oberyn-martell'],
    siblingIds: ['obara-sand', 'tyene-sand'],
    living: false,
    death: { season: 7, cause: 'Killed by Euron Greyjoy\'s fleet in the Battle of the Narrow Sea' },
    bio: 'Oberyn\'s elegant, deadly second daughter, born of a noblewoman of Volantis, whose weapon was her wit as much as her whip.',
    era: 'Season 5–7',
  },
  {
    id: 'tyene-sand',
    name: 'Tyene Sand',
    houseId: 'martell',
    parents: ['oberyn-martell', 'ellaria-sand'],
    siblingIds: ['obara-sand', 'nymeria-sand'],
    living: false,
    death: { season: 7, cause: 'Hanged in the black cells by Cersei\'s order' },
    bio: 'Oberyn\'s gentle-looking daughter by Ellaria, a poisoner with a sweet smile and her father\'s taste for revenge.',
    era: 'Season 5–7',
  },
]
