import type { Stadium } from "./types";

export const stadiums: Stadium[] = [
  // ============================================================
  // USA (11 stadiums)
  // ============================================================
  {
    id: "metlife-stadium",
    name: "MetLife Stadium",
    slug: "metlife-stadium",
    city: "East Rutherford",
    cityId: "new-york-new-jersey",
    country: "USA",
    capacity: 82500,
    roofType: "open",
    latitude: 40.8128,
    longitude: -74.0742,
    description:
      "Situe dans le New Jersey, le MetLife Stadium accueillera la finale de la Coupe du Monde 2026. C'est le stade le plus grand des États-Unis par sa capacité en configuration football.",
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    slug: "att-stadium",
    city: "Arlington",
    cityId: "dallas-fort-worth",
    country: "USA",
    capacity: 80000,
    roofType: "rétractable",
    latitude: 32.7473,
    longitude: -97.0945,
    description:
      "Surnomme « Jerry World », l'AT&T Stadium est célèbre pour son écran video géant et son toit rétractable. Il est le domicile des Dallas Cowboys de la NFL.",
  },
  {
    id: "hard-rock-stadium",
    name: "Hard Rock Stadium",
    slug: "hard-rock-stadium",
    city: "Miami Gardens",
    cityId: "miami",
    country: "USA",
    capacity: 65326,
    roofType: "open",
    latitude: 25.958,
    longitude: -80.2389,
    description:
      "Le Hard Rock Stadium, domicile des Miami Dolphins, a accueilli de nombreux Super Bowls et événements majeurs. Son canopee partielle protège les spectateurs du soleil de Floride.",
  },
  {
    id: "mercedes-benz-stadium",
    name: "Mercedes-Benz Stadium",
    slug: "mercedes-benz-stadium",
    city: "Atlanta",
    cityId: "atlanta",
    country: "USA",
    capacity: 71000,
    roofType: "rétractable",
    latitude: 33.7553,
    longitude: -84.401,
    description:
      "Le Mercedes-Benz Stadium se distingue par son toit rétractable en forme de petales et son anneau video a 360 degrés. Il est le domicile d'Atlanta United en MLS.",
  },
  {
    id: "lumen-field",
    name: "Lumen Field",
    slug: "lumen-field",
    city: "Seattle",
    cityId: "seattle",
    country: "USA",
    capacity: 69000,
    roofType: "open",
    latitude: 47.5952,
    longitude: -122.3316,
    description:
      "Le Lumen Field est réputé pour l'ambiance électrique créée par ses supporters, les « 12th Man ». Il est le domicile des Seattle Sounders, champions de la MLS et de la Ligue des champions de la CONCACAF.",
  },
  {
    id: "nrg-stadium",
    name: "NRG Stadium",
    slug: "nrg-stadium",
    city: "Houston",
    cityId: "houston",
    country: "USA",
    capacity: 72220,
    roofType: "rétractable",
    latitude: 29.6847,
    longitude: -95.4107,
    description:
      "Le NRG Stadium a été le premier stade de la NFL équipe d'un toit rétractable. Il a accueilli plusieurs Super Bowls et des matchs du Mondial 1994 dans son ancienne version.",
  },
  {
    id: "lincoln-financial-field",
    name: "Lincoln Financial Field",
    slug: "lincoln-financial-field",
    city: "Philadelphia",
    cityId: "philadelphia",
    country: "USA",
    capacity: 69176,
    roofType: "open",
    latitude: 39.9008,
    longitude: -75.1675,
    description:
      "Le Lincoln Financial Field, domicile des Philadelphia Eagles, est situé dans le complexe sportif du sud de Philadelphie. Il est connu pour l'intensite de ses supporters.",
  },
  {
    id: "arrowhead-stadium",
    name: "Arrowhead Stadium",
    slug: "arrowhead-stadium",
    city: "Kansas City",
    cityId: "kansas-city",
    country: "USA",
    capacity: 76416,
    roofType: "open",
    latitude: 39.0489,
    longitude: -94.484,
    description:
      "L'Arrowhead Stadium détient le record du monde du stade le plus bruyant. Domicile des Kansas City Chiefs, il offre une atmosphere incomparable pour le football.",
  },
  {
    id: "gillette-stadium",
    name: "Gillette Stadium",
    slug: "gillette-stadium",
    city: "Foxborough",
    cityId: "boston",
    country: "USA",
    capacity: 65878,
    roofType: "open",
    latitude: 42.0909,
    longitude: -71.2643,
    description:
      "Le Gillette Stadium, domicile des New England Patriots et du New England Revolution, est situé a Foxborough dans la region de Boston. Il a accueilli des matchs internationaux majeurs.",
  },
  {
    id: "levis-stadium",
    name: "Levi's Stadium",
    slug: "levis-stadium",
    city: "Santa Clara",
    cityId: "san-francisco-bay-area",
    country: "USA",
    capacity: 68500,
    roofType: "open",
    latitude: 37.4033,
    longitude: -121.9694,
    description:
      "Le Levi's Stadium, inauguré en 2014, est une enceinte moderne située au cœur de la Silicon Valley. Il a accueilli le Super Bowl 50 et la finale de la Copa America Centenario 2016.",
  },
  {
    id: "sofi-stadium",
    name: "SoFi Stadium",
    slug: "sofi-stadium",
    city: "Inglewood",
    cityId: "los-angeles",
    country: "USA",
    capacity: 70240,
    roofType: "fixed",
    latitude: 33.9534,
    longitude: -118.3392,
    description:
      "Le SoFi Stadium est l'un des stades les plus modernes et coûteux au monde, avec son toit fixe translucide en ETFE. Il a accueilli le Super Bowl LVI en 2022.",
  },

  // ============================================================
  // Mexico (3 stadiums)
  // ============================================================
  {
    id: "estadio-azteca",
    name: "Estadio Azteca",
    slug: "estadio-azteca",
    city: "Mexico City",
    cityId: "mexico-city",
    country: "Mexico",
    capacity: 87523,
    roofType: "open",
    latitude: 19.3029,
    longitude: -99.1505,
    description:
      "L'Estadio Azteca est le premier stade a accueillir trois Coupes du Monde (1970, 1986 et 2026). Il accueillera le match d'ouverture du tournoi et reste l'un des temples du football mondial.",
  },
  {
    id: "estadio-akron",
    name: "Estadio Akron",
    slug: "estadio-akron",
    city: "Guadalajara",
    cityId: "guadalajara",
    country: "Mexico",
    capacity: 49850,
    roofType: "open",
    latitude: 20.6821,
    longitude: -103.4625,
    description:
      "L'Estadio Akron, aussi connu sous le nom de Chivas Stadium, est le domicile du CD Guadalajara. Son design en forme de volcan en fait l'un des stades les plus emblématiques du Mexique.",
  },
  {
    id: "estadio-bbva",
    name: "Estadio BBVA",
    slug: "estadio-bbva",
    city: "Monterrey",
    cityId: "monterrey",
    country: "Mexico",
    capacity: 53500,
    roofType: "open",
    latitude: 25.6699,
    longitude: -100.2436,
    description:
      "L'Estadio BBVA, inauguré en 2015, est considéré comme l'un des plus beaux stades d'Amérique latine. Domicile des Rayados de Monterrey, il offre une vue spectaculaire sur la Sierra Madre.",
  },

  // ============================================================
  // Canada (2 stadiums)
  // ============================================================
  {
    id: "bmo-field",
    name: "BMO Field",
    slug: "bmo-field",
    city: "Toronto",
    cityId: "toronto",
    country: "Canada",
    capacity: 45000,
    roofType: "open",
    latitude: 43.6332,
    longitude: -79.4186,
    description:
      "Le BMO Field, domicile du Toronto FC, sera agrandi pour atteindre 45 000 places a l'occasion de la Coupe du Monde 2026. Il est situé au bord du lac Ontario dans le parc des expositions.",
  },
  {
    id: "bc-place",
    name: "BC Place",
    slug: "bc-place",
    city: "Vancouver",
    cityId: "vancouver",
    country: "Canada",
    capacity: 54500,
    roofType: "rétractable",
    latitude: 49.2768,
    longitude: -123.112,
    description:
      "Le BC Place, avec son toit rétractable, est le plus grand stade du Canada. Il a accueilli la cérémonie d'ouverture des Jeux Olympiques d'hiver de 2010 a Vancouver.",
  },
];

/** Lookup map: stadium id -> Stadium */
export const stadiumsById: Record<string, Stadium> = Object.fromEntries(
  stadiums.map((s) => [s.id, s]),
);

/** Lookup map: stadium slug -> Stadium */
export const stadiumsBySlug: Record<string, Stadium> = Object.fromEntries(
  stadiums.map((s) => [s.slug, s]),
);
