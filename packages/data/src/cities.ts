import type { City } from "./types";

export const cities: City[] = [
  // ============================================================
  // USA (11 host cities)
  // ============================================================
  {
    id: "new-york-new-jersey",
    name: "New York / New Jersey",
    slug: "new-york-new-jersey",
    country: "USA",
    state: "New Jersey",
    population: 20140470,
    timezone: "America/New_York",
    description:
      "La region metropolitaine de New York-New Jersey est la plus grande agglomeration des Etats-Unis. Le MetLife Stadium, situe a East Rutherford, accueillera la finale de la Coupe du Monde 2026.",
    stadiumIds: ["metlife-stadium"],
  },
  {
    id: "dallas-fort-worth",
    name: "Dallas-Fort Worth",
    slug: "dallas-fort-worth",
    country: "USA",
    state: "Texas",
    population: 7637387,
    timezone: "America/Chicago",
    description:
      "Dallas-Fort Worth est la quatrieme plus grande metropole des Etats-Unis. L'AT&T Stadium, situe a Arlington entre les deux villes, est l'un des stades les plus impressionnants au monde.",
    stadiumIds: ["att-stadium"],
  },
  {
    id: "miami",
    name: "Miami",
    slug: "miami",
    country: "USA",
    state: "Florida",
    population: 6138333,
    timezone: "America/New_York",
    description:
      "Miami, porte d'entree vers l'Amerique latine, est une ville cosmopolite au climat tropical. Le Hard Rock Stadium a Miami Gardens sera un lieu central du tournoi.",
    stadiumIds: ["hard-rock-stadium"],
  },
  {
    id: "atlanta",
    name: "Atlanta",
    slug: "atlanta",
    country: "USA",
    state: "Georgia",
    population: 6144050,
    timezone: "America/New_York",
    description:
      "Atlanta, capitale de la Georgie, est un hub culturel et economique du sud-est des Etats-Unis. Le Mercedes-Benz Stadium, domicile d'Atlanta United, est un joyau architectural.",
    stadiumIds: ["mercedes-benz-stadium"],
  },
  {
    id: "seattle",
    name: "Seattle",
    slug: "seattle",
    country: "USA",
    state: "Washington",
    population: 3979845,
    timezone: "America/Los_Angeles",
    description:
      "Seattle, ville emblematique du nord-ouest pacifique, est reconnue pour sa culture du cafe et son industrie technologique. Le Lumen Field offre une atmosphere unique pour le football.",
    stadiumIds: ["lumen-field"],
  },
  {
    id: "houston",
    name: "Houston",
    slug: "houston",
    country: "USA",
    state: "Texas",
    population: 7122240,
    timezone: "America/Chicago",
    description:
      "Houston, quatrieme ville des Etats-Unis par sa population, est la capitale americaine de l'energie et de l'exploration spatiale. Le NRG Stadium garantit des conditions de jeu optimales grace a son toit retractable.",
    stadiumIds: ["nrg-stadium"],
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    slug: "philadelphia",
    country: "USA",
    state: "Pennsylvania",
    population: 6245051,
    timezone: "America/New_York",
    description:
      "Philadelphie, berceau de l'independance americaine, est une ville riche en histoire et en culture. Le Lincoln Financial Field sera un hote de choix pour les matchs de la Coupe du Monde.",
    stadiumIds: ["lincoln-financial-field"],
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    slug: "kansas-city",
    country: "USA",
    state: "Missouri",
    population: 2192035,
    timezone: "America/Chicago",
    description:
      "Kansas City, situee a la frontiere du Missouri et du Kansas, est celebre pour son barbecue et sa scene jazz. L'Arrowhead Stadium est considere comme l'un des stades les plus bruyants au monde.",
    stadiumIds: ["arrowhead-stadium"],
  },
  {
    id: "boston",
    name: "Boston",
    slug: "boston",
    country: "USA",
    state: "Massachusetts",
    population: 4941632,
    timezone: "America/New_York",
    description:
      "Boston, ville universitaire et historique de la Nouvelle-Angleterre, accueillera des matchs au Gillette Stadium de Foxborough. La region possede une riche tradition sportive.",
    stadiumIds: ["gillette-stadium"],
  },
  {
    id: "san-francisco-bay-area",
    name: "San Francisco Bay Area",
    slug: "san-francisco-bay-area",
    country: "USA",
    state: "California",
    population: 7750000,
    timezone: "America/Los_Angeles",
    description:
      "La region de la baie de San Francisco, coeur de la Silicon Valley, est un centre mondial de l'innovation technologique. Le Levi's Stadium de Santa Clara accueillera des matchs dans un cadre moderne.",
    stadiumIds: ["levis-stadium"],
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    slug: "los-angeles",
    country: "USA",
    state: "California",
    population: 13200998,
    timezone: "America/Los_Angeles",
    description:
      "Los Angeles, capitale du divertissement mondial, est la deuxieme plus grande ville des Etats-Unis. Le SoFi Stadium d'Inglewood est l'une des enceintes sportives les plus modernes de la planete.",
    stadiumIds: ["sofi-stadium"],
  },

  // ============================================================
  // Mexico (3 host cities)
  // ============================================================
  {
    id: "mexico-city",
    name: "Mexico City",
    slug: "mexico-city",
    country: "Mexico",
    state: "Ciudad de Mexico",
    population: 21804515,
    timezone: "America/Mexico_City",
    description:
      "Mexico, capitale du Mexique et l'une des plus grandes villes du monde, accueillera le match d'ouverture a l'Estadio Azteca. La ville a deja vibre pour deux finales de Coupe du Monde en 1970 et 1986.",
    stadiumIds: ["estadio-azteca"],
  },
  {
    id: "guadalajara",
    name: "Guadalajara",
    slug: "guadalajara",
    country: "Mexico",
    state: "Jalisco",
    population: 5268642,
    timezone: "America/Mexico_City",
    description:
      "Guadalajara, deuxieme ville du Mexique et berceau du mariachi et de la tequila, est une ville passionnee de football. L'Estadio Akron des Chivas accueillera les matchs dans un cadre spectaculaire.",
    stadiumIds: ["estadio-akron"],
  },
  {
    id: "monterrey",
    name: "Monterrey",
    slug: "monterrey",
    country: "Mexico",
    state: "Nuevo Leon",
    population: 5341171,
    timezone: "America/Monterrey",
    description:
      "Monterrey, capitale industrielle du Mexique, est une ville dynamique nichee au pied de la Sierra Madre. L'Estadio BBVA, l'un des plus beaux stades d'Amerique latine, offre un panorama montagneux unique.",
    stadiumIds: ["estadio-bbva"],
  },

  // ============================================================
  // Canada (2 host cities)
  // ============================================================
  {
    id: "toronto",
    name: "Toronto",
    slug: "toronto",
    country: "Canada",
    state: "Ontario",
    population: 6202225,
    timezone: "America/Toronto",
    description:
      "Toronto, plus grande ville du Canada et metropole multiculturelle, accueillera des matchs au BMO Field agrandi pour l'occasion. La ville est un centre majeur du football canadien.",
    stadiumIds: ["bmo-field"],
  },
  {
    id: "vancouver",
    name: "Vancouver",
    slug: "vancouver",
    country: "Canada",
    state: "British Columbia",
    population: 2642825,
    timezone: "America/Vancouver",
    description:
      "Vancouver, ville portuaire entouree de montagnes et d'ocean, est l'une des villes les plus agreables au monde. Le BC Place, avec son toit retractable, offrira des conditions ideales pour les matchs.",
    stadiumIds: ["bc-place"],
  },
];

/** Lookup map: city id -> City */
export const citiesById: Record<string, City> = Object.fromEntries(
  cities.map((c) => [c.id, c]),
);

/** Lookup map: city slug -> City */
export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((c) => [c.slug, c]),
);
