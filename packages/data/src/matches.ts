import type { Match } from "./types";

// ============================================================================
// FIFA World Cup 2026 — Full match schedule (104 matches)
// June 11 – July 19, 2026 · USA / Mexico / Canada
//
// Times are in Europe/Paris (CEST, UTC+2). Dates are ISO (YYYY-MM-DD).
// Sources: FIFA.com, NBC Sports, FOX Sports, Sky Sports, ESPN (Dec 2025 draw
// and updated schedule released by FIFA).
// ============================================================================

export const matches: Match[] = [
  // ============================================================
  //  GROUP STAGE — MATCHDAY 1  (June 11–17)
  // ============================================================

  // ---- June 11, 2026 ----
  // Group A: Mexico vs South Africa — Estadio Azteca, Mexico City — 21:00 CEST
  {
    id: "m01",
    slug: "mexique-vs-afrique-du-sud",
    homeTeamId: "mexique",
    awayTeamId: "afrique-du-sud",
    date: "2026-06-11",
    time: "21:00",
    stadiumId: "estadio-azteca",
    stage: "group",
    group: "A",
    matchday: 1,
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },
  // Group A: South Korea vs UEFA Playoff D — Estadio Akron, Guadalajara — 04:00 CEST
  {
    id: "m02",
    slug: "coree-du-sud-vs-barrage-uefa-d",
    homeTeamId: "coree-du-sud",
    awayTeamId: "tchequie",
    date: "2026-06-12",
    time: "04:00",
    stadiumId: "estadio-akron",
    stage: "group",
    group: "A",
    matchday: 1,
    homeScore: 2,
    awayScore: 1,
    status: "finished",
  },

  // ---- June 12, 2026 ----
  // Group B: Canada vs UEFA Playoff A — BMO Field, Toronto — 21:00 CEST
  {
    id: "m03",
    slug: "canada-vs-barrage-uefa-a",
    homeTeamId: "canada",
    awayTeamId: "bosnie-herzegovine",
    date: "2026-06-12",
    time: "21:00",
    stadiumId: "bmo-field",
    stage: "group",
    group: "B",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  // Group D: USA vs Paraguay — SoFi Stadium, Los Angeles — 03:00 CEST
  {
    id: "m04",
    slug: "etats-unis-vs-paraguay",
    homeTeamId: "etats-unis",
    awayTeamId: "paraguay",
    date: "2026-06-13",
    time: "03:00",
    stadiumId: "sofi-stadium",
    stage: "group",
    group: "D",
    matchday: 1,
    homeScore: 4,
    awayScore: 1,
    status: "finished",
  },

  // ---- June 13, 2026 ----
  // Group B: Qatar vs Switzerland — Levi's Stadium, San Francisco Bay Area — 21:00 CEST
  {
    id: "m05",
    slug: "qatar-vs-suisse",
    homeTeamId: "qatar",
    awayTeamId: "suisse",
    date: "2026-06-13",
    time: "21:00",
    stadiumId: "levis-stadium",
    stage: "group",
    group: "B",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  // Group C: Brazil vs Morocco — MetLife Stadium, New York/New Jersey — 00:00 CEST (+1 day)
  {
    id: "m06",
    slug: "bresil-vs-maroc",
    homeTeamId: "bresil",
    awayTeamId: "maroc",
    date: "2026-06-14",
    time: "00:00",
    stadiumId: "metlife-stadium",
    stage: "group",
    group: "C",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  // Group C: Haiti vs Scotland — Gillette Stadium, Boston — 03:00 CEST
  {
    id: "m07",
    slug: "haiti-vs-ecosse",
    homeTeamId: "haiti",
    awayTeamId: "ecosse",
    date: "2026-06-14",
    time: "03:00",
    stadiumId: "gillette-stadium",
    stage: "group",
    group: "C",
    matchday: 1,
    homeScore: 0,
    awayScore: 1,
    status: "finished",
  },
  // Group D: Australia vs UEFA Playoff C — BC Place, Vancouver — 06:00 CEST
  {
    id: "m08",
    slug: "australie-vs-barrage-uefa-c",
    homeTeamId: "australie",
    awayTeamId: "turquie",
    date: "2026-06-14",
    time: "06:00",
    stadiumId: "bc-place",
    stage: "group",
    group: "D",
    matchday: 1,
    homeScore: 2,
    awayScore: 0,
    status: "finished",
  },

  // ---- June 14, 2026 ----
  // Group E: Germany vs Curacao — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m09",
    slug: "allemagne-vs-curacao",
    homeTeamId: "allemagne",
    awayTeamId: "curacao",
    date: "2026-06-14",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "group",
    group: "E",
    matchday: 1,
    homeScore: 7,
    awayScore: 1,
    status: "finished",
  },
  // Group F: Netherlands vs Japan — AT&T Stadium, Dallas — 22:00 CEST
  {
    id: "m10",
    slug: "pays-bas-vs-japon",
    homeTeamId: "pays-bas",
    awayTeamId: "japon",
    date: "2026-06-14",
    time: "22:00",
    stadiumId: "att-stadium",
    stage: "group",
    group: "F",
    matchday: 1,
    homeScore: 2,
    awayScore: 2,
    status: "finished",
  },
  // Group E: Ivory Coast vs Ecuador — Lincoln Financial Field, Philadelphia — 01:00 CEST (+1 day)
  {
    id: "m11",
    slug: "cote-divoire-vs-equateur",
    homeTeamId: "cote-divoire",
    awayTeamId: "equateur",
    date: "2026-06-15",
    time: "01:00",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "E",
    matchday: 1,
    homeScore: 1,
    awayScore: 0,
    status: "finished",
  },
  // Group F: Tunisia vs UEFA Playoff B — Estadio BBVA, Monterrey — 04:00 CEST
  {
    id: "m12",
    slug: "tunisie-vs-barrage-uefa-b",
    homeTeamId: "tunisie",
    awayTeamId: "suede",
    date: "2026-06-15",
    time: "04:00",
    stadiumId: "estadio-bbva",
    stage: "group",
    group: "F",
    matchday: 1,
    homeScore: 1,
    awayScore: 5,
    status: "finished",
  },

  // ---- June 15, 2026 ----
  // Group H: Spain vs Cape Verde — Mercedes-Benz Stadium, Atlanta — 18:00 CEST
  {
    id: "m13",
    slug: "espagne-vs-cap-vert",
    homeTeamId: "espagne",
    awayTeamId: "cap-vert",
    date: "2026-06-15",
    time: "18:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "group",
    group: "H",
    matchday: 1,
    homeScore: 0,
    awayScore: 0,
    status: "finished",
  },
  // Group G: Belgium vs Egypt — Lumen Field, Seattle — 00:00 CEST (+1 day)
  {
    id: "m14",
    slug: "belgique-vs-egypte",
    homeTeamId: "belgique",
    awayTeamId: "egypte",
    date: "2026-06-16",
    time: "00:00",
    stadiumId: "lumen-field",
    stage: "group",
    group: "G",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  // Group H: Saudi Arabia vs Uruguay — Hard Rock Stadium, Miami — 00:00 CEST (+1 day)
  {
    id: "m15",
    slug: "arabie-saoudite-vs-uruguay",
    homeTeamId: "arabie-saoudite",
    awayTeamId: "uruguay",
    date: "2026-06-16",
    time: "00:00",
    stadiumId: "hard-rock-stadium",
    stage: "group",
    group: "H",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
  // Group G: Iran vs New Zealand — SoFi Stadium, Los Angeles — 03:00 CEST
  {
    id: "m16",
    slug: "iran-vs-nouvelle-zelande",
    homeTeamId: "iran",
    awayTeamId: "nouvelle-zelande",
    date: "2026-06-16",
    time: "03:00",
    stadiumId: "sofi-stadium",
    stage: "group",
    group: "G",
    matchday: 1,
    homeScore: 2,
    awayScore: 2,
    status: "finished",
  },

  // ---- June 16, 2026 ----
  // Group I: France vs Senegal — MetLife Stadium, New York/NJ — 21:00 CEST
  {
    id: "m17",
    slug: "france-vs-senegal",
    homeTeamId: "france",
    awayTeamId: "senegal",
    date: "2026-06-16",
    time: "21:00",
    stadiumId: "metlife-stadium",
    stage: "group",
    group: "I",
    matchday: 1,
    homeScore: 3,
    awayScore: 1,
    status: "finished",
  },
  // Group I: Intercontinental Playoff 2 vs Norway — Gillette Stadium, Boston — 00:00 CEST (+1 day)
  {
    id: "m18",
    slug: "barrage-interconf-2-vs-norvege",
    homeTeamId: "irak",
    awayTeamId: "norvege",
    date: "2026-06-17",
    time: "00:00",
    stadiumId: "gillette-stadium",
    stage: "group",
    group: "I",
    matchday: 1,
    homeScore: 1,
    awayScore: 4,
    status: "finished",
  },
  // Group J: Argentina vs Algeria — Arrowhead Stadium, Kansas City — 03:00 CEST
  {
    id: "m19",
    slug: "argentine-vs-algerie",
    homeTeamId: "argentine",
    awayTeamId: "algerie",
    date: "2026-06-17",
    time: "03:00",
    stadiumId: "arrowhead-stadium",
    stage: "group",
    group: "J",
    matchday: 1,
    homeScore: 3,
    awayScore: 0,
    status: "finished",
  },
  // Group J: Austria vs Jordan — Levi's Stadium, San Francisco — 06:00 CEST
  {
    id: "m20",
    slug: "autriche-vs-jordanie",
    homeTeamId: "autriche",
    awayTeamId: "jordanie",
    date: "2026-06-17",
    time: "06:00",
    stadiumId: "levis-stadium",
    stage: "group",
    group: "J",
    matchday: 1,
    homeScore: 3,
    awayScore: 1,
    status: "finished",
  },

  // ---- June 17, 2026 ----
  // Group K: Portugal vs Intercontinental Playoff 1 — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m21",
    slug: "portugal-vs-barrage-interconf-1",
    homeTeamId: "portugal",
    awayTeamId: "rd-congo",
    date: "2026-06-17",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "group",
    group: "K",
    matchday: 1,
    homeScore: 1,
    awayScore: 1,
    status: "finished" as const,
  },
  // Group L: England vs Croatia — AT&T Stadium, Dallas — 22:00 CEST
  {
    id: "m22",
    slug: "angleterre-vs-croatie",
    homeTeamId: "angleterre",
    awayTeamId: "croatie",
    date: "2026-06-17",
    time: "22:00",
    stadiumId: "att-stadium",
    stage: "group",
    group: "L",
    matchday: 1,
    homeScore: 4,
    awayScore: 2,
    status: "finished" as const,
  },
  // Group L: Ghana vs Panama — BMO Field, Toronto — 01:00 CEST (+1 day)
  {
    id: "m23",
    slug: "ghana-vs-panama",
    homeTeamId: "ghana",
    awayTeamId: "panama",
    date: "2026-06-18",
    time: "01:00",
    stadiumId: "bmo-field",
    stage: "group",
    group: "L",
    matchday: 1,
    homeScore: 1,
    awayScore: 0,
    status: "finished" as const,
  },
  // Group K: Uzbekistan vs Colombia — Estadio Azteca, Mexico City — 04:00 CEST
  {
    id: "m24",
    slug: "ouzbekistan-vs-colombie",
    homeTeamId: "ouzbekistan",
    awayTeamId: "colombie",
    date: "2026-06-18",
    time: "04:00",
    stadiumId: "estadio-azteca",
    stage: "group",
    group: "K",
    matchday: 1,
    homeScore: 1,
    awayScore: 3,
    status: "finished" as const,
  },

  // ============================================================
  //  GROUP STAGE — MATCHDAY 2  (June 18–23)
  // ============================================================

  // ---- June 18, 2026 ----
  // Group A: UEFA Playoff D vs South Africa — Mercedes-Benz Stadium, Atlanta — 18:00 CEST
  {
    id: "m25",
    slug: "barrage-uefa-d-vs-afrique-du-sud",
    homeTeamId: "tchequie",
    awayTeamId: "afrique-du-sud",
    date: "2026-06-18",
    time: "18:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "group",
    group: "A",
    matchday: 2,
    homeScore: 1,
    awayScore: 1,
    status: "finished" as const,
  },
  // Group B: Switzerland vs UEFA Playoff A — SoFi Stadium, Los Angeles — 21:00 CEST
  {
    id: "m26",
    slug: "suisse-vs-barrage-uefa-a",
    homeTeamId: "suisse",
    awayTeamId: "bosnie-herzegovine",
    date: "2026-06-18",
    time: "21:00",
    stadiumId: "sofi-stadium",
    stage: "group",
    group: "B",
    matchday: 2,
    homeScore: 4,
    awayScore: 1,
    status: "finished" as const,
  },
  // Group B: Canada vs Qatar — BC Place, Vancouver — 00:00 CEST (+1 day)
  {
    id: "m27",
    slug: "canada-vs-qatar",
    homeTeamId: "canada",
    awayTeamId: "qatar",
    date: "2026-06-19",
    time: "00:00",
    stadiumId: "bc-place",
    stage: "group",
    group: "B",
    matchday: 2,
    homeScore: 6,
    awayScore: 0,
    status: "finished" as const,
  },
  // Group A: Mexico vs South Korea — Estadio Akron, Guadalajara — 03:00 CEST
  {
    id: "m28",
    slug: "mexique-vs-coree-du-sud",
    homeTeamId: "mexique",
    awayTeamId: "coree-du-sud",
    date: "2026-06-19",
    time: "03:00",
    stadiumId: "estadio-akron",
    stage: "group",
    group: "A",
    matchday: 2,
    homeScore: 1,
    awayScore: 0,
    status: "finished" as const,
  },

  // ---- June 19, 2026 ----
  // Group D: USA vs Australia — Lumen Field, Seattle — 21:00 CEST (19:00 UTC)
  {
    id: "m29",
    slug: "etats-unis-vs-australie",
    homeTeamId: "etats-unis",
    awayTeamId: "australie",
    date: "2026-06-19",
    time: "21:00",
    stadiumId: "lumen-field",
    stage: "group",
    group: "D",
    matchday: 2,
    homeScore: 2,
    awayScore: 0,
    status: "finished" as const,
  },
  // Group C: Scotland vs Morocco — Gillette Stadium, Boston — 00:00 CEST (+1 day)
  {
    id: "m30",
    slug: "ecosse-vs-maroc",
    homeTeamId: "ecosse",
    awayTeamId: "maroc",
    date: "2026-06-20",
    time: "00:00",
    stadiumId: "gillette-stadium",
    stage: "group",
    group: "C",
    matchday: 2,
    homeScore: 0,
    awayScore: 1,
    status: "finished" as const,
  },
  // Group C: Brazil vs Haiti — Lincoln Financial Field, Philadelphia — 03:00 CEST
  {
    id: "m31",
    slug: "bresil-vs-haiti",
    homeTeamId: "bresil",
    awayTeamId: "haiti",
    date: "2026-06-20",
    time: "02:30",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "C",
    matchday: 2,
    homeScore: 3,
    awayScore: 0,
    status: "finished" as const,
  },
  // Group D: Türkiye vs Paraguay — Levi's Stadium, San Francisco — 05:00 CEST (03:00 UTC)
  {
    id: "m32",
    slug: "barrage-uefa-c-vs-paraguay",
    homeTeamId: "turquie",
    awayTeamId: "paraguay",
    date: "2026-06-20",
    time: "05:00",
    stadiumId: "levis-stadium",
    stage: "group",
    group: "D",
    matchday: 2,
    homeScore: 0,
    awayScore: 1,
    status: "finished" as const,
  },

  // ---- June 20, 2026 ----
  // Group E: Germany vs Ivory Coast — BMO Field, Toronto — 22:00 CEST
  {
    id: "m33",
    slug: "allemagne-vs-cote-divoire",
    homeTeamId: "allemagne",
    awayTeamId: "cote-divoire",
    date: "2026-06-20",
    time: "22:00",
    stadiumId: "bmo-field",
    stage: "group",
    group: "E",
    matchday: 2,
  },
  // Group F: Netherlands vs UEFA Playoff B — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m34",
    slug: "pays-bas-vs-barrage-uefa-b",
    homeTeamId: "pays-bas",
    awayTeamId: "suede",
    date: "2026-06-20",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "group",
    group: "F",
    matchday: 2,
  },
  // Group E: Ecuador vs Curacao — Arrowhead Stadium, Kansas City — 02:00 CEST
  {
    id: "m35",
    slug: "equateur-vs-curacao",
    homeTeamId: "equateur",
    awayTeamId: "curacao",
    date: "2026-06-21",
    time: "02:00",
    stadiumId: "arrowhead-stadium",
    stage: "group",
    group: "E",
    matchday: 2,
  },
  // Group F: Tunisia vs Japan — Estadio BBVA, Monterrey — 06:00 CEST
  {
    id: "m36",
    slug: "tunisie-vs-japon",
    homeTeamId: "tunisie",
    awayTeamId: "japon",
    date: "2026-06-21",
    time: "06:00",
    stadiumId: "estadio-bbva",
    stage: "group",
    group: "F",
    matchday: 2,
  },

  // ---- June 21, 2026 ----
  // Group H: Spain vs Saudi Arabia — Mercedes-Benz Stadium, Atlanta — 18:00 CEST
  {
    id: "m37",
    slug: "espagne-vs-arabie-saoudite",
    homeTeamId: "espagne",
    awayTeamId: "arabie-saoudite",
    date: "2026-06-21",
    time: "18:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "group",
    group: "H",
    matchday: 2,
  },
  // Group G: Belgium vs Iran — SoFi Stadium, Los Angeles — 21:00 CEST
  {
    id: "m38",
    slug: "belgique-vs-iran",
    homeTeamId: "belgique",
    awayTeamId: "iran",
    date: "2026-06-21",
    time: "21:00",
    stadiumId: "sofi-stadium",
    stage: "group",
    group: "G",
    matchday: 2,
  },
  // Group H: Uruguay vs Cape Verde — Hard Rock Stadium, Miami — 00:00 CEST (+1 day)
  {
    id: "m39",
    slug: "uruguay-vs-cap-vert",
    homeTeamId: "uruguay",
    awayTeamId: "cap-vert",
    date: "2026-06-22",
    time: "00:00",
    stadiumId: "hard-rock-stadium",
    stage: "group",
    group: "H",
    matchday: 2,
  },
  // Group G: New Zealand vs Egypt — BC Place, Vancouver — 03:00 CEST
  {
    id: "m40",
    slug: "nouvelle-zelande-vs-egypte",
    homeTeamId: "nouvelle-zelande",
    awayTeamId: "egypte",
    date: "2026-06-22",
    time: "03:00",
    stadiumId: "bc-place",
    stage: "group",
    group: "G",
    matchday: 2,
  },

  // ---- June 22, 2026 ----
  // Group I: France vs Iraq — Lincoln Financial Field, Philadelphia — 23:00 CEST (21:00 UTC)
  {
    id: "m41",
    slug: "france-vs-barrage-interconf-2",
    homeTeamId: "france",
    awayTeamId: "irak",
    date: "2026-06-22",
    time: "23:00",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "I",
    matchday: 2,
  },
  // Group J: Argentina vs Austria — AT&T Stadium, Dallas — 19:00 CEST
  {
    id: "m42",
    slug: "argentine-vs-autriche",
    homeTeamId: "argentine",
    awayTeamId: "autriche",
    date: "2026-06-22",
    time: "19:00",
    stadiumId: "att-stadium",
    stage: "group",
    group: "J",
    matchday: 2,
  },
  // Group I: Norway vs Senegal — BMO Field, Toronto — 02:00 CEST (00:00 UTC)
  {
    id: "m43",
    slug: "norvege-vs-senegal",
    homeTeamId: "norvege",
    awayTeamId: "senegal",
    date: "2026-06-23",
    time: "02:00",
    stadiumId: "bmo-field",
    stage: "group",
    group: "I",
    matchday: 2,
  },
  // Group J: Jordan vs Algeria — Levi's Stadium, San Francisco — 05:00 CEST (03:00 UTC)
  {
    id: "m44",
    slug: "jordanie-vs-algerie",
    homeTeamId: "jordanie",
    awayTeamId: "algerie",
    date: "2026-06-23",
    time: "05:00",
    stadiumId: "levis-stadium",
    stage: "group",
    group: "J",
    matchday: 2,
  },

  // ---- June 23, 2026 ----
  // Group K: Portugal vs Uzbekistan — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m45",
    slug: "portugal-vs-ouzbekistan",
    homeTeamId: "portugal",
    awayTeamId: "ouzbekistan",
    date: "2026-06-23",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "group",
    group: "K",
    matchday: 2,
  },
  // Group L: England vs Ghana — Gillette Stadium, Boston — 22:00 CEST (20:00 UTC)
  {
    id: "m46",
    slug: "angleterre-vs-ghana",
    homeTeamId: "angleterre",
    awayTeamId: "ghana",
    date: "2026-06-23",
    time: "22:00",
    stadiumId: "gillette-stadium",
    stage: "group",
    group: "L",
    matchday: 2,
  },
  // Group L: Panama vs Croatia — Lincoln Financial Field, Philadelphia — 01:00 CEST (23:00 UTC)
  {
    id: "m47",
    slug: "panama-vs-croatie",
    homeTeamId: "panama",
    awayTeamId: "croatie",
    date: "2026-06-24",
    time: "01:00",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "L",
    matchday: 2,
  },
  // Group K: Colombia vs Intercontinental Playoff 1 — Estadio Akron, Guadalajara — 04:00 CEST
  {
    id: "m48",
    slug: "colombie-vs-barrage-interconf-1",
    homeTeamId: "colombie",
    awayTeamId: "rd-congo",
    date: "2026-06-24",
    time: "04:00",
    stadiumId: "estadio-akron",
    stage: "group",
    group: "K",
    matchday: 2,
  },

  // ============================================================
  //  GROUP STAGE — MATCHDAY 3  (June 24–27)
  //  Simultaneous kick-offs for final group games
  // ============================================================

  // ---- June 24, 2026 ----
  // Group A (simultaneous): barrage-uefa-d vs Mexico — Estadio Azteca — 03:00 CEST
  {
    id: "m49",
    slug: "barrage-uefa-d-vs-mexique",
    homeTeamId: "tchequie",
    awayTeamId: "mexique",
    date: "2026-06-25",
    time: "03:00",
    stadiumId: "estadio-azteca",
    stage: "group",
    group: "A",
    matchday: 3,
  },
  // Group A (simultaneous): South Africa vs South Korea — Estadio BBVA, Monterrey — 03:00 CEST
  {
    id: "m50",
    slug: "afrique-du-sud-vs-coree-du-sud",
    homeTeamId: "afrique-du-sud",
    awayTeamId: "coree-du-sud",
    date: "2026-06-25",
    time: "03:00",
    stadiumId: "estadio-bbva",
    stage: "group",
    group: "A",
    matchday: 3,
  },
  // Group B (simultaneous): UEFA Playoff A vs Qatar — Lumen Field, Seattle — 21:00 CEST
  {
    id: "m51",
    slug: "barrage-uefa-a-vs-qatar",
    homeTeamId: "bosnie-herzegovine",
    awayTeamId: "qatar",
    date: "2026-06-24",
    time: "21:00",
    stadiumId: "lumen-field",
    stage: "group",
    group: "B",
    matchday: 3,
  },
  // Group B (simultaneous): Switzerland vs Canada — BC Place, Vancouver — 21:00 CEST
  {
    id: "m52",
    slug: "suisse-vs-canada",
    homeTeamId: "suisse",
    awayTeamId: "canada",
    date: "2026-06-24",
    time: "21:00",
    stadiumId: "bc-place",
    stage: "group",
    group: "B",
    matchday: 3,
  },
  // Group C (simultaneous): Scotland vs Brazil — Hard Rock Stadium, Miami — 00:00 CEST (+1 day)
  {
    id: "m53",
    slug: "ecosse-vs-bresil",
    homeTeamId: "ecosse",
    awayTeamId: "bresil",
    date: "2026-06-25",
    time: "00:00",
    stadiumId: "hard-rock-stadium",
    stage: "group",
    group: "C",
    matchday: 3,
  },
  // Group C (simultaneous): Morocco vs Haiti — Mercedes-Benz Stadium, Atlanta — 00:00 CEST (+1 day)
  {
    id: "m54",
    slug: "maroc-vs-haiti",
    homeTeamId: "maroc",
    awayTeamId: "haiti",
    date: "2026-06-25",
    time: "00:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "group",
    group: "C",
    matchday: 3,
  },
  // Group D (simultaneous): Türkiye vs USA — SoFi Stadium, Los Angeles — 04:00 CEST (02:00 UTC Jun 26)
  {
    id: "m55",
    slug: "barrage-uefa-c-vs-etats-unis",
    homeTeamId: "turquie",
    awayTeamId: "etats-unis",
    date: "2026-06-26",
    time: "04:00",
    stadiumId: "sofi-stadium",
    stage: "group",
    group: "D",
    matchday: 3,
  },
  // Group D (simultaneous): Paraguay vs Australia — Levi's Stadium — 04:00 CEST (02:00 UTC Jun 26)
  {
    id: "m56",
    slug: "paraguay-vs-australie",
    homeTeamId: "paraguay",
    awayTeamId: "australie",
    date: "2026-06-26",
    time: "04:00",
    stadiumId: "levis-stadium",
    stage: "group",
    group: "D",
    matchday: 3,
  },

  // ---- June 25, 2026 ----
  // Group E (simultaneous): Ecuador vs Germany — MetLife Stadium — 22:00 CEST
  {
    id: "m57",
    slug: "equateur-vs-allemagne",
    homeTeamId: "equateur",
    awayTeamId: "allemagne",
    date: "2026-06-25",
    time: "22:00",
    stadiumId: "metlife-stadium",
    stage: "group",
    group: "E",
    matchday: 3,
  },
  // Group E (simultaneous): Curacao vs Ivory Coast — Lincoln Financial Field, Philadelphia — 22:00 CEST
  {
    id: "m58",
    slug: "curacao-vs-cote-divoire",
    homeTeamId: "curacao",
    awayTeamId: "cote-divoire",
    date: "2026-06-25",
    time: "22:00",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "E",
    matchday: 3,
  },
  // Group F (simultaneous): Japan vs UEFA Playoff B — AT&T Stadium, Dallas — 01:00 CEST (+1 day)
  {
    id: "m59",
    slug: "japon-vs-barrage-uefa-b",
    homeTeamId: "japon",
    awayTeamId: "suede",
    date: "2026-06-26",
    time: "01:00",
    stadiumId: "att-stadium",
    stage: "group",
    group: "F",
    matchday: 3,
  },
  // Group F (simultaneous): Tunisia vs Netherlands — Arrowhead Stadium, Kansas City — 01:00 CEST (+1 day)
  {
    id: "m60",
    slug: "tunisie-vs-pays-bas",
    homeTeamId: "tunisie",
    awayTeamId: "pays-bas",
    date: "2026-06-26",
    time: "01:00",
    stadiumId: "arrowhead-stadium",
    stage: "group",
    group: "F",
    matchday: 3,
  },

  // ---- June 26, 2026 ----
  // Group G (simultaneous): Egypt vs Iran — Lumen Field, Seattle — 05:00 CEST
  {
    id: "m61",
    slug: "egypte-vs-iran",
    homeTeamId: "egypte",
    awayTeamId: "iran",
    date: "2026-06-27",
    time: "05:00",
    stadiumId: "lumen-field",
    stage: "group",
    group: "G",
    matchday: 3,
  },
  // Group G (simultaneous): New Zealand vs Belgium — BC Place, Vancouver — 05:00 CEST
  {
    id: "m62",
    slug: "nouvelle-zelande-vs-belgique",
    homeTeamId: "nouvelle-zelande",
    awayTeamId: "belgique",
    date: "2026-06-27",
    time: "05:00",
    stadiumId: "bc-place",
    stage: "group",
    group: "G",
    matchday: 3,
  },
  // Group H (simultaneous): Cape Verde vs Saudi Arabia — NRG Stadium, Houston — 02:00 CEST (00:00 UTC Jun 27)
  {
    id: "m63",
    slug: "cap-vert-vs-arabie-saoudite",
    homeTeamId: "cap-vert",
    awayTeamId: "arabie-saoudite",
    date: "2026-06-27",
    time: "02:00",
    stadiumId: "nrg-stadium",
    stage: "group",
    group: "H",
    matchday: 3,
  },
  // Group H (simultaneous): Uruguay vs Spain — Estadio Akron, Guadalajara — 02:00 CEST
  {
    id: "m64",
    slug: "uruguay-vs-espagne",
    homeTeamId: "uruguay",
    awayTeamId: "espagne",
    date: "2026-06-27",
    time: "02:00",
    stadiumId: "estadio-akron",
    stage: "group",
    group: "H",
    matchday: 3,
  },
  // Group I (simultaneous): Norway vs France — Gillette Stadium, Boston — 21:00 CEST
  {
    id: "m65",
    slug: "norvege-vs-france",
    homeTeamId: "norvege",
    awayTeamId: "france",
    date: "2026-06-26",
    time: "21:00",
    stadiumId: "gillette-stadium",
    stage: "group",
    group: "I",
    matchday: 3,
  },
  // Group I (simultaneous): Senegal vs Intercontinental Playoff 2 — Hard Rock Stadium, Miami — 21:00 CEST
  {
    id: "m66",
    slug: "senegal-vs-barrage-interconf-2",
    homeTeamId: "senegal",
    awayTeamId: "irak",
    date: "2026-06-26",
    time: "21:00",
    stadiumId: "hard-rock-stadium",
    stage: "group",
    group: "I",
    matchday: 3,
  },

  // ---- June 27, 2026 ----
  // Group J (simultaneous): Jordan vs Argentina — AT&T Stadium, Dallas — 04:00 CEST
  {
    id: "m67",
    slug: "jordanie-vs-argentine",
    homeTeamId: "jordanie",
    awayTeamId: "argentine",
    date: "2026-06-28",
    time: "04:00",
    stadiumId: "att-stadium",
    stage: "group",
    group: "J",
    matchday: 3,
  },
  // Group J (simultaneous): Algeria vs Austria — Arrowhead Stadium, Kansas City — 04:00 CEST
  {
    id: "m68",
    slug: "algerie-vs-autriche",
    homeTeamId: "algerie",
    awayTeamId: "autriche",
    date: "2026-06-28",
    time: "04:00",
    stadiumId: "arrowhead-stadium",
    stage: "group",
    group: "J",
    matchday: 3,
  },
  // Group K (simultaneous): Colombia vs Portugal — Hard Rock Stadium, Miami — 01:30 CEST (+1 day)
  {
    id: "m69",
    slug: "colombie-vs-portugal",
    homeTeamId: "colombie",
    awayTeamId: "portugal",
    date: "2026-06-28",
    time: "01:30",
    stadiumId: "hard-rock-stadium",
    stage: "group",
    group: "K",
    matchday: 3,
  },
  // Group K (simultaneous): Intercontinental Playoff 1 vs Uzbekistan — Mercedes-Benz Stadium, Atlanta — 01:30 CEST (+1 day)
  {
    id: "m70",
    slug: "barrage-interconf-1-vs-ouzbekistan",
    homeTeamId: "rd-congo",
    awayTeamId: "ouzbekistan",
    date: "2026-06-28",
    time: "01:30",
    stadiumId: "mercedes-benz-stadium",
    stage: "group",
    group: "K",
    matchday: 3,
  },
  // Group L (simultaneous): Panama vs England — MetLife Stadium, New York/NJ — 23:00 CEST
  {
    id: "m71",
    slug: "panama-vs-angleterre",
    homeTeamId: "panama",
    awayTeamId: "angleterre",
    date: "2026-06-27",
    time: "23:00",
    stadiumId: "metlife-stadium",
    stage: "group",
    group: "L",
    matchday: 3,
  },
  // Group L (simultaneous): Croatia vs Ghana — Lincoln Financial Field, Philadelphia — 23:00 CEST
  {
    id: "m72",
    slug: "croatie-vs-ghana",
    homeTeamId: "croatie",
    awayTeamId: "ghana",
    date: "2026-06-27",
    time: "23:00",
    stadiumId: "lincoln-financial-field",
    stage: "group",
    group: "L",
    matchday: 3,
  },

  // ============================================================
  //  ROUND OF 32  (June 28 – July 3)
  //  16 matches — Winners, runners-up & best 3rd-place advance
  // ============================================================

  // ---- June 28, 2026 ----
  // R32 Match 1: 2A vs 2B — SoFi Stadium, Los Angeles — 21:00 CEST
  {
    id: "m73",
    slug: "r32-match-1",
    homeTeamId: "tbd-r32-1-home",
    awayTeamId: "tbd-r32-1-away",
    date: "2026-06-28",
    time: "21:00",
    stadiumId: "sofi-stadium",
    stage: "round-of-32",
  },

  // ---- June 29, 2026 ----
  // R32 Match 2: 1C vs 2F — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m74",
    slug: "r32-match-2",
    homeTeamId: "tbd-r32-2-home",
    awayTeamId: "tbd-r32-2-away",
    date: "2026-06-29",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "round-of-32",
  },
  // R32 Match 3: 1E vs 3rd ABCDF — Gillette Stadium, Boston — 22:30 CEST
  {
    id: "m75",
    slug: "r32-match-3",
    homeTeamId: "tbd-r32-3-home",
    awayTeamId: "tbd-r32-3-away",
    date: "2026-06-29",
    time: "22:30",
    stadiumId: "gillette-stadium",
    stage: "round-of-32",
  },
  // R32 Match 4: 1F vs 2C — Estadio BBVA, Monterrey — 03:00 CEST
  {
    id: "m76",
    slug: "r32-match-4",
    homeTeamId: "tbd-r32-4-home",
    awayTeamId: "tbd-r32-4-away",
    date: "2026-06-30",
    time: "03:00",
    stadiumId: "estadio-bbva",
    stage: "round-of-32",
  },

  // ---- June 30, 2026 ----
  // R32 Match 5: 2E vs 2I — AT&T Stadium, Dallas — 19:00 CEST
  {
    id: "m77",
    slug: "r32-match-5",
    homeTeamId: "tbd-r32-5-home",
    awayTeamId: "tbd-r32-5-away",
    date: "2026-06-30",
    time: "19:00",
    stadiumId: "att-stadium",
    stage: "round-of-32",
  },
  // R32 Match 6: 1I vs 3rd CDFGH — MetLife Stadium, New York/NJ — 23:00 CEST
  {
    id: "m78",
    slug: "r32-match-6",
    homeTeamId: "tbd-r32-6-home",
    awayTeamId: "tbd-r32-6-away",
    date: "2026-06-30",
    time: "23:00",
    stadiumId: "metlife-stadium",
    stage: "round-of-32",
  },
  // R32 Match 7: 1A vs 3rd CEFHI — Estadio Azteca, Mexico City — 03:00 CEST
  {
    id: "m79",
    slug: "r32-match-7",
    homeTeamId: "tbd-r32-7-home",
    awayTeamId: "tbd-r32-7-away",
    date: "2026-07-01",
    time: "03:00",
    stadiumId: "estadio-azteca",
    stage: "round-of-32",
  },

  // ---- July 1, 2026 ----
  // R32 Match 8: 1L vs 3rd EHIJK — Mercedes-Benz Stadium, Atlanta — 18:00 CEST
  {
    id: "m80",
    slug: "r32-match-8",
    homeTeamId: "tbd-r32-8-home",
    awayTeamId: "tbd-r32-8-away",
    date: "2026-07-01",
    time: "18:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "round-of-32",
  },
  // R32 Match 9: 1G vs 3rd AEHIJ — Lumen Field, Seattle — 22:00 CEST
  {
    id: "m81",
    slug: "r32-match-9",
    homeTeamId: "tbd-r32-9-home",
    awayTeamId: "tbd-r32-9-away",
    date: "2026-07-01",
    time: "22:00",
    stadiumId: "lumen-field",
    stage: "round-of-32",
  },
  // R32 Match 10: 1D vs 3rd BEFIJ — Levi's Stadium — 02:00 CEST
  {
    id: "m82",
    slug: "r32-match-10",
    homeTeamId: "tbd-r32-10-home",
    awayTeamId: "tbd-r32-10-away",
    date: "2026-07-02",
    time: "02:00",
    stadiumId: "levis-stadium",
    stage: "round-of-32",
  },

  // ---- July 2, 2026 ----
  // R32 Match 11: 1H vs 2J — SoFi Stadium, Los Angeles — 21:00 CEST
  {
    id: "m83",
    slug: "r32-match-11",
    homeTeamId: "tbd-r32-11-home",
    awayTeamId: "tbd-r32-11-away",
    date: "2026-07-02",
    time: "21:00",
    stadiumId: "sofi-stadium",
    stage: "round-of-32",
  },
  // R32 Match 12: 2K vs 2L — BMO Field, Toronto — 01:00 CEST (+1 day)
  {
    id: "m84",
    slug: "r32-match-12",
    homeTeamId: "tbd-r32-12-home",
    awayTeamId: "tbd-r32-12-away",
    date: "2026-07-03",
    time: "01:00",
    stadiumId: "bmo-field",
    stage: "round-of-32",
  },
  // R32 Match 13: 1B vs 3rd EFGIJ — BC Place, Vancouver — 05:00 CEST
  {
    id: "m85",
    slug: "r32-match-13",
    homeTeamId: "tbd-r32-13-home",
    awayTeamId: "tbd-r32-13-away",
    date: "2026-07-03",
    time: "05:00",
    stadiumId: "bc-place",
    stage: "round-of-32",
  },

  // ---- July 3, 2026 ----
  // R32 Match 14: 2D vs 2G — AT&T Stadium, Dallas — 20:00 CEST
  {
    id: "m86",
    slug: "r32-match-14",
    homeTeamId: "tbd-r32-14-home",
    awayTeamId: "tbd-r32-14-away",
    date: "2026-07-03",
    time: "20:00",
    stadiumId: "att-stadium",
    stage: "round-of-32",
  },
  // R32 Match 15: 1J vs 2H — Hard Rock Stadium, Miami — 00:00 CEST (+1 day)
  {
    id: "m87",
    slug: "r32-match-15",
    homeTeamId: "tbd-r32-15-home",
    awayTeamId: "tbd-r32-15-away",
    date: "2026-07-04",
    time: "00:00",
    stadiumId: "hard-rock-stadium",
    stage: "round-of-32",
  },
  // R32 Match 16: 1K vs 2L or similar — Arrowhead Stadium, Kansas City — 03:30 CEST
  {
    id: "m88",
    slug: "r32-match-16",
    homeTeamId: "tbd-r32-16-home",
    awayTeamId: "tbd-r32-16-away",
    date: "2026-07-04",
    time: "03:30",
    stadiumId: "arrowhead-stadium",
    stage: "round-of-32",
  },

  // ============================================================
  //  ROUND OF 16  (July 4–7)
  //  8 matches
  // ============================================================

  // ---- July 4, 2026 ----
  // R16 Match 1 — NRG Stadium, Houston — 19:00 CEST
  {
    id: "m89",
    slug: "r16-match-1",
    homeTeamId: "tbd-r16-1-home",
    awayTeamId: "tbd-r16-1-away",
    date: "2026-07-04",
    time: "19:00",
    stadiumId: "nrg-stadium",
    stage: "round-of-16",
  },
  // R16 Match 2 — Lincoln Financial Field, Philadelphia — 23:00 CEST
  {
    id: "m90",
    slug: "r16-match-2",
    homeTeamId: "tbd-r16-2-home",
    awayTeamId: "tbd-r16-2-away",
    date: "2026-07-04",
    time: "23:00",
    stadiumId: "lincoln-financial-field",
    stage: "round-of-16",
  },

  // ---- July 5, 2026 ----
  // R16 Match 3 — MetLife Stadium, New York/NJ — 22:00 CEST
  {
    id: "m91",
    slug: "r16-match-3",
    homeTeamId: "tbd-r16-3-home",
    awayTeamId: "tbd-r16-3-away",
    date: "2026-07-05",
    time: "22:00",
    stadiumId: "metlife-stadium",
    stage: "round-of-16",
  },
  // R16 Match 4 — Estadio Azteca, Mexico City — 02:00 CEST
  {
    id: "m92",
    slug: "r16-match-4",
    homeTeamId: "tbd-r16-4-home",
    awayTeamId: "tbd-r16-4-away",
    date: "2026-07-06",
    time: "02:00",
    stadiumId: "estadio-azteca",
    stage: "round-of-16",
  },

  // ---- July 6, 2026 ----
  // R16 Match 5 — AT&T Stadium, Dallas — 21:00 CEST
  {
    id: "m93",
    slug: "r16-match-5",
    homeTeamId: "tbd-r16-5-home",
    awayTeamId: "tbd-r16-5-away",
    date: "2026-07-06",
    time: "21:00",
    stadiumId: "att-stadium",
    stage: "round-of-16",
  },
  // R16 Match 6 — Lumen Field, Seattle — 23:00 CEST
  {
    id: "m94",
    slug: "r16-match-6",
    homeTeamId: "tbd-r16-6-home",
    awayTeamId: "tbd-r16-6-away",
    date: "2026-07-06",
    time: "23:00",
    stadiumId: "lumen-field",
    stage: "round-of-16",
  },

  // ---- July 7, 2026 ----
  // R16 Match 7 — Mercedes-Benz Stadium, Atlanta — 18:00 CEST
  {
    id: "m95",
    slug: "r16-match-7",
    homeTeamId: "tbd-r16-7-home",
    awayTeamId: "tbd-r16-7-away",
    date: "2026-07-07",
    time: "18:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "round-of-16",
  },
  // R16 Match 8 — BC Place, Vancouver — 22:00 CEST
  {
    id: "m96",
    slug: "r16-match-8",
    homeTeamId: "tbd-r16-8-home",
    awayTeamId: "tbd-r16-8-away",
    date: "2026-07-07",
    time: "22:00",
    stadiumId: "bc-place",
    stage: "round-of-16",
  },

  // ============================================================
  //  QUARTER-FINALS  (July 9–11)
  //  4 matches
  // ============================================================

  // ---- July 9, 2026 ----
  // QF 1 — Gillette Stadium, Boston — 22:00 CEST
  {
    id: "m97",
    slug: "qf-1",
    homeTeamId: "tbd-qf-1-home",
    awayTeamId: "tbd-qf-1-away",
    date: "2026-07-09",
    time: "22:00",
    stadiumId: "gillette-stadium",
    stage: "quarter-final",
  },
  // QF 2 — SoFi Stadium, Los Angeles — 21:00 CEST (Jul 10)
  {
    id: "m98",
    slug: "qf-2",
    homeTeamId: "tbd-qf-2-home",
    awayTeamId: "tbd-qf-2-away",
    date: "2026-07-10",
    time: "21:00",
    stadiumId: "sofi-stadium",
    stage: "quarter-final",
  },

  // ---- July 11, 2026 ----
  // QF 3 — Hard Rock Stadium, Miami — 23:00 CEST
  {
    id: "m99",
    slug: "qf-3",
    homeTeamId: "tbd-qf-3-home",
    awayTeamId: "tbd-qf-3-away",
    date: "2026-07-11",
    time: "23:00",
    stadiumId: "hard-rock-stadium",
    stage: "quarter-final",
  },
  // QF 4 — Arrowhead Stadium, Kansas City — 03:00 CEST
  {
    id: "m100",
    slug: "qf-4",
    homeTeamId: "tbd-qf-4-home",
    awayTeamId: "tbd-qf-4-away",
    date: "2026-07-12",
    time: "03:00",
    stadiumId: "arrowhead-stadium",
    stage: "quarter-final",
  },

  // ============================================================
  //  SEMI-FINALS  (July 14–15)
  //  2 matches
  // ============================================================

  // SF 1 — AT&T Stadium, Dallas — 21:00 CEST
  {
    id: "m101",
    slug: "sf-1",
    homeTeamId: "tbd-sf-1-home",
    awayTeamId: "tbd-sf-1-away",
    date: "2026-07-14",
    time: "21:00",
    stadiumId: "att-stadium",
    stage: "semi-final",
  },
  // SF 2 — Mercedes-Benz Stadium, Atlanta — 21:00 CEST
  {
    id: "m102",
    slug: "sf-2",
    homeTeamId: "tbd-sf-2-home",
    awayTeamId: "tbd-sf-2-away",
    date: "2026-07-15",
    time: "21:00",
    stadiumId: "mercedes-benz-stadium",
    stage: "semi-final",
  },

  // ============================================================
  //  THIRD-PLACE PLAY-OFF  (July 18)
  // ============================================================

  // Third-place match — Hard Rock Stadium, Miami — 21:00 CEST
  {
    id: "m103",
    slug: "third-place",
    homeTeamId: "tbd-third-1",
    awayTeamId: "tbd-third-2",
    date: "2026-07-18",
    time: "21:00",
    stadiumId: "hard-rock-stadium",
    stage: "third-place",
  },

  // ============================================================
  //  FINAL  (July 19)
  // ============================================================

  // Final — MetLife Stadium, New York/New Jersey — 21:00 CEST
  {
    id: "m104",
    slug: "finale",
    homeTeamId: "tbd-final-1",
    awayTeamId: "tbd-final-2",
    date: "2026-07-19",
    time: "21:00",
    stadiumId: "metlife-stadium",
    stage: "final",
  },
];

// ============================================================
//  Lookup helpers
// ============================================================

export const matchesById: Record<string, Match> = Object.fromEntries(
  matches.map((m) => [m.id, m])
);
export const matchesBySlug: Record<string, Match> = Object.fromEntries(
  matches.map((m) => [m.slug, m])
);
export const matchesByGroup: Record<string, Match[]> = {};
for (const match of matches) {
  if (match.group) {
    if (!matchesByGroup[match.group]) {
      matchesByGroup[match.group] = [];
    }
    matchesByGroup[match.group]!.push(match);
  }
}
export const matchesByStadium: Record<string, Match[]> = {};
for (const match of matches) {
  if (!matchesByStadium[match.stadiumId]) {
    matchesByStadium[match.stadiumId] = [];
  }
  matchesByStadium[match.stadiumId]!.push(match);
}
