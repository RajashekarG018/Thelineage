import type { House } from './types.ts'

/**
 * Houses & factions (spec §3.2, §6.2).
 *
 * The nine Great Houses, the notable cadet/minor houses touched by the major
 * plot, and two non-Westerosi factions (essos, dothraki) that carry key
 * marriages into the Targaryen line. Colors follow the light, flat accents
 * already used by the hero house chips (milestone 1) so the sigil plaques,
 * node badges and hero chips all agree.
 */
export const houses: House[] = [
  {
    id: 'stark',
    name: 'House Stark',
    words: 'Winter Is Coming',
    seat: 'Winterfell',
    color: '#7a8fa6',
    sigilId: 'direwolf',
  },
  {
    id: 'lannister',
    name: 'House Lannister',
    words: 'Hear Me Roar!',
    seat: 'Casterly Rock',
    color: '#d9b357',
    sigilId: 'lion',
  },
  {
    id: 'targaryen',
    name: 'House Targaryen',
    words: 'Fire and Blood',
    seat: 'Dragonstone',
    color: '#c05050',
    sigilId: 'dragon',
  },
  {
    id: 'baratheon',
    name: 'House Baratheon',
    words: 'Ours Is the Fury',
    seat: "Storm's End",
    color: '#d4a939',
    sigilId: 'stag',
  },
  {
    id: 'greyjoy',
    name: 'House Greyjoy',
    words: 'We Do Not Sow',
    seat: 'Pyke',
    color: '#5d8aa8',
    sigilId: 'kraken',
  },
  {
    id: 'tyrell',
    name: 'House Tyrell',
    words: 'Growing Strong',
    seat: 'Highgarden',
    color: '#7ba05b',
    sigilId: 'rose',
  },
  {
    id: 'martell',
    name: 'House Martell',
    words: 'Unbowed, Unbent, Unbroken',
    seat: 'Sunspear',
    color: '#d4652c',
    sigilId: 'sun-spear',
  },
  {
    id: 'arryn',
    name: 'House Arryn',
    words: 'As High as Honor',
    seat: 'The Eyrie',
    color: '#9ab5d0',
    sigilId: 'falcon',
  },
  {
    id: 'tully',
    name: 'House Tully',
    words: 'Family, Duty, Honor',
    seat: 'Riverrun',
    color: '#3f6f8f',
    sigilId: 'trout',
  },

  // — Cadet / minor houses (spec §3.2) —
  {
    id: 'bolton',
    name: 'House Bolton',
    words: 'Our Blades Are Sharp',
    seat: 'The Dreadfort',
    color: '#8a7f8d',
    sigilId: 'shield',
  },
  {
    id: 'frey',
    name: 'House Frey',
    words: 'We Stand Together',
    seat: 'The Twins',
    color: '#9c8db5',
    sigilId: 'shield',
  },
  {
    id: 'clegane',
    name: 'House Clegane',
    seat: "Clegane's Keep",
    color: '#8a8f96',
    sigilId: 'shield',
  },
  {
    id: 'tarly',
    name: 'House Tarly',
    words: 'First in Battle',
    seat: 'Horn Hill',
    color: '#6f8f5f',
    sigilId: 'shield',
  },
  {
    id: 'mormont',
    name: 'House Mormont',
    words: 'Here We Stand',
    seat: 'Bear Island',
    color: '#6b7f74',
    sigilId: 'shield',
  },
  {
    id: 'reed',
    name: 'House Reed',
    seat: 'Greywater Watch',
    color: '#6f7f6a',
    sigilId: 'shield',
  },
  {
    id: 'umber',
    name: 'House Umber',
    seat: 'Last Hearth',
    color: '#7a5a4a',
    sigilId: 'shield',
  },
  {
    id: 'karstark',
    name: 'House Karstark',
    words: 'The Sun of Winter',
    seat: 'Karhold',
    color: '#8fa6b0',
    sigilId: 'shield',
  },

  // — Non-Westerosi factions that marry into the great lines —
  {
    id: 'essos',
    name: 'Essos & the Free Cities',
    color: '#8a8f96',
    sigilId: 'shield',
  },
  {
    id: 'dothraki',
    name: 'The Dothraki',
    color: '#a06a3a',
    sigilId: 'shield',
  },
]
