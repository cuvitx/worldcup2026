/**
 * Maps our team slug (French) → ESPN displayName (English).
 * Used by ESPN API client to match events to our matches.
 * Only includes teams where the name differs significantly from ESPN's.
 */
export const espnTeamNames: Record<string, string> = {
  "mexique": "Mexico",
  "afrique-du-sud": "South Africa",
  "coree-du-sud": "South Korea",
  "tchequie": "Czechia",
  "bosnie-herzegovine": "Bosnia-Herzegovina",
  "suisse": "Switzerland",
  "bresil": "Brazil",
  "maroc": "Morocco",
  "ecosse": "Scotland",
  "haiti": "Haiti",
  "etats-unis": "United States",
  "allemagne": "Germany",
  "equateur": "Ecuador",
  "cote-divoire": "Ivory Coast",
  "curacao": "Curaçao",
  "pays-bas": "Netherlands",
  "japon": "Japan",
  "tunisie": "Tunisia",
  "suede": "Sweden",
  "belgique": "Belgium",
  "iran": "Iran",
  "egypte": "Egypt",
  "nouvelle-zelande": "New Zealand",
  "espagne": "Spain",
  "arabie-saoudite": "Saudi Arabia",
  "cap-vert": "Cape Verde",
  "france": "France",
  "senegal": "Senegal",
  "norvege": "Norway",
  "irak": "Iraq",
  "argentine": "Argentina",
  "autriche": "Austria",
  "algerie": "Algeria",
  "jordanie": "Jordan",
  "portugal": "Portugal",
  "colombie": "Colombia",
  "ouzbekistan": "Uzbekistan",
  "rd-congo": "DR Congo",
  "angleterre": "England",
  "croatie": "Croatia",
  "ghana": "Ghana",
  "panama": "Panama",
  "canada": "Canada",
  "qatar": "Qatar",
  "paraguay": "Paraguay",
  "australie": "Australia",
  "turquie": "Türkiye",
  "uruguay": "Uruguay",
};

/** Get the ESPN English team name for a given team slug */
export function getEspnTeamName(slug: string): string {
  return espnTeamNames[slug] ?? slug;
}
