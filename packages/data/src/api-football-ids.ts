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
  "afrique-du-sud": 15,
  "coree-du-sud": 17,
  "barrage-uefa-d": 0, // TBD après barrage

  // Groupe B
  "canada": 5529,
  "suisse": 15,  // Switzerland
  "qatar": 1569,
  "barrage-uefa-a": 0, // TBD

  // Groupe C
  "bresil": 6,
  "maroc": 31,
  "ecosse": 1108,
  "haiti": 5555,

  // Groupe D
  "etats-unis": 2384,
  "paraguay": 29,
  "australie": 20,
  "barrage-uefa-c": 0, // TBD

  // Groupe E
  "allemagne": 25,
  "equateur": 2309,
  "cote-divoire": 2287,
  "curacao": 5531,

  // Groupe F
  "pays-bas": 1118,
  "japon": 12,
  "tunisie": 27,
  "barrage-uefa-b": 0, // TBD

  // Groupe G
  "belgique": 1,
  "iran": 22,
  "egypte": 13,
  "nouvelle-zelande": 1530,

  // Groupe H
  "espagne": 9,
  "uruguay": 7,
  "arabie-saoudite": 23,
  "cap-vert": 5563,

  // Groupe I
  "france": 2,
  "senegal": 28,
  "norvege": 1107,
  "barrage-interconf-2": 0, // TBD

  // Groupe J
  "argentine": 26,
  "autriche": 775,
  "algerie": 1530,
  "jordanie": 1558,

  // Groupe K
  "portugal": 27,
  "colombie": 2315,
  "ouzbekistan": 1555,
  "barrage-interconf-1": 0, // TBD

  // Groupe L
  "angleterre": 10,
  "croatie": 3,
  "ghana": 1533,
  "panama": 5538,
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
