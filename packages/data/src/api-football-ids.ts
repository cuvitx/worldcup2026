// ============================================================================
// API-Football IDs — Mapping des 48 équipes CDM 2026 vers API-Football v3
// Source: https://www.api-football.com/documentation-v3 (endpoint /teams)
//
// Les IDs "barrage-*" sont des placeholders — ils seront mis à jour une fois
// les barrages joués (mars 2026).
// ============================================================================

/** Mapping team slug (from @repo/data) → API-Football team ID */
export const teamApiIds: Record<string, number> = {
  // Groupe A
  "mexique": 16,
  "afrique-du-sud": 1531,
  "coree-du-sud": 17,
  "tchequie": 770, // Czech Republic (barrage UEFA D)
  "barrage-uefa-d": 770,

  // Groupe B
  "canada": 5529,
  "suisse": 15,  // Switzerland
  "qatar": 1569,
  "bosnie-herzegovine": 1113, // Bosnia & Herzegovina (barrage UEFA A)
  "barrage-uefa-a": 1113,

  // Groupe C
  "bresil": 6,
  "maroc": 31,
  "ecosse": 1108,
  "haiti": 2386,

  // Groupe D
  "etats-unis": 2384,
  "paraguay": 2380,
  "australie": 20,
  "turquie": 777, // Türkiye (barrage UEFA C)
  "barrage-uefa-c": 777,

  // Groupe E
  "allemagne": 25,
  "equateur": 2382,
  "cote-divoire": 1501,
  "curacao": 5530,

  // Groupe F
  "pays-bas": 1118,
  "japon": 12,
  "tunisie": 28,
  "suede": 5, // Sweden (barrage UEFA B)
  "barrage-uefa-b": 5,

  // Groupe G
  "belgique": 1,
  "iran": 22,
  "egypte": 32,
  "nouvelle-zelande": 4673,

  // Groupe H
  "espagne": 9,
  "uruguay": 7,
  "arabie-saoudite": 23,
  "cap-vert": 1533,

  // Groupe I
  "france": 2,
  "senegal": 13,
  "norvege": 1090,
  "irak": 1567, // Iraq (barrage intercontinental 2)
  "barrage-interconf-2": 1567,

  // Groupe J
  "argentine": 26,
  "autriche": 775,
  "algerie": 1532,
  "jordanie": 1548,

  // Groupe K
  "portugal": 27,
  "colombie": 8,
  "ouzbekistan": 1568,
  "rd-congo": 1508, // Congo DR (barrage intercontinental 1)
  "barrage-interconf-1": 1508,

  // Groupe L
  "angleterre": 10,
  "croatie": 3,
  "ghana": 1504,
  "panama": 11,
};

/** Mapping stadium slug → API-Football venue ID */
export const stadiumApiIds: Record<string, number> = {
  "metlife-stadium": 1006,
  "att-stadium": 1008,
  "hard-rock-stadium": 945,
  "sofi-stadium": 10505,
  "lincoln-financial-field": 1009,
  "mercedes-benz-stadium": 1007,
  "gillette-stadium": 946,
  "nrg-stadium": 944,
  "lumen-field": 948,
  "arrowhead-stadium": 943,
  "bc-place": 4711,
  "bmo-field": 4710,
  "estadio-azteca": 667,
  "estadio-akron": 668,
  "estadio-bbva": 669,
  "rose-bowl": 947,
};

/** Get API-Football team ID from our internal team slug */
export function getApiTeamId(teamSlug: string): number | null {
  const id = teamApiIds[teamSlug];
  return id && id > 0 ? id : null;
}

/** Get API-Football venue ID from our internal stadium slug */
export function getApiVenueId(stadiumSlug: string): number | null {
  return stadiumApiIds[stadiumSlug] ?? null;
}

/** Check if a team has a valid API mapping (not a TBD playoff team) */
export function hasApiMapping(teamSlug: string): boolean {
  const id = teamApiIds[teamSlug];
  return id !== undefined && id > 0;
}
