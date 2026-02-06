import type { H2HRecord } from "./types";

export const h2hRecords: H2HRecord[] = [
  // Group A: mexique, afrique-du-sud, coree-du-sud (skipping barrage-uefa-d)
  {
    team1Id: "mexique",
    team2Id: "afrique-du-sud",
    totalMatches: 3,
    team1Wins: 2,
    draws: 0,
    team2Wins: 1,
    team1Goals: 5,
    team2Goals: 3,
    lastMatch: "Victoire 2-1 du Mexique",
    lastMatchDate: "2018-06-13"
  },
  {
    team1Id: "mexique",
    team2Id: "coree-du-sud",
    totalMatches: 5,
    team1Wins: 3,
    draws: 1,
    team2Wins: 1,
    team1Goals: 7,
    team2Goals: 5,
    lastMatch: "Victoire 2-1 du Mexique",
    lastMatchDate: "2018-06-23"
  },
  {
    team1Id: "afrique-du-sud",
    team2Id: "coree-du-sud",
    totalMatches: 2,
    team1Wins: 0,
    draws: 1,
    team2Wins: 1,
    team1Goals: 1,
    team2Goals: 2,
    lastMatch: "Victoire 2-0 de la Corée du Sud",
    lastMatchDate: "2010-06-17"
  },

  // Group B: canada, suisse, qatar (skipping barrage-uefa-a)
  {
    team1Id: "canada",
    team2Id: "suisse",
    totalMatches: 2,
    team1Wins: 0,
    draws: 1,
    team2Wins: 1,
    team1Goals: 1,
    team2Goals: 2,
    lastMatch: "Victoire 1-0 de la Suisse",
    lastMatchDate: "2018-03-26"
  },
  {
    team1Id: "canada",
    team2Id: "qatar",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 0,
    lastMatch: "Victoire 2-0 du Canada",
    lastMatchDate: "2021-07-13"
  },
  {
    team1Id: "suisse",
    team2Id: "qatar",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 1,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 de la Suisse",
    lastMatchDate: "2022-11-25"
  },

  // Group C: bresil, maroc, ecosse, haiti
  {
    team1Id: "bresil",
    team2Id: "maroc",
    totalMatches: 4,
    team1Wins: 3,
    draws: 1,
    team2Wins: 0,
    team1Goals: 7,
    team2Goals: 2,
    lastMatch: "Victoire 2-1 du Brésil",
    lastMatchDate: "2022-12-03"
  },
  {
    team1Id: "bresil",
    team2Id: "ecosse",
    totalMatches: 9,
    team1Wins: 6,
    draws: 2,
    team2Wins: 1,
    team1Goals: 17,
    team2Goals: 6,
    lastMatch: "Match nul 1-1",
    lastMatchDate: "2011-03-27"
  },
  {
    team1Id: "bresil",
    team2Id: "haiti",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 3,
    team2Goals: 0,
    lastMatch: "Victoire 3-0 du Brésil",
    lastMatchDate: "1974-06-18"
  },
  {
    team1Id: "maroc",
    team2Id: "ecosse",
    totalMatches: 1,
    team1Wins: 0,
    draws: 0,
    team2Wins: 1,
    team1Goals: 0,
    team2Goals: 2,
    lastMatch: "Victoire 2-0 de l'Écosse",
    lastMatchDate: "1998-06-23"
  },
  {
    team1Id: "maroc",
    team2Id: "haiti",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },
  {
    team1Id: "ecosse",
    team2Id: "haiti",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },

  // Group D: etats-unis, paraguay, australie (skipping barrage-uefa-c)
  {
    team1Id: "etats-unis",
    team2Id: "paraguay",
    totalMatches: 7,
    team1Wins: 1,
    draws: 4,
    team2Wins: 2,
    team1Goals: 6,
    team2Goals: 8,
    lastMatch: "Victoire 1-0 du Paraguay",
    lastMatchDate: "2016-03-27"
  },
  {
    team1Id: "etats-unis",
    team2Id: "australie",
    totalMatches: 7,
    team1Wins: 4,
    draws: 2,
    team2Wins: 1,
    team1Goals: 13,
    team2Goals: 7,
    lastMatch: "Victoire 2-1 des États-Unis",
    lastMatchDate: "2022-09-27"
  },
  {
    team1Id: "paraguay",
    team2Id: "australie",
    totalMatches: 2,
    team1Wins: 1,
    draws: 0,
    team2Wins: 1,
    team1Goals: 1,
    team2Goals: 1,
    lastMatch: "Victoire 1-0 de l'Australie",
    lastMatchDate: "2022-06-10"
  },

  // Group E: allemagne, equateur, cote-divoire, curacao
  {
    team1Id: "allemagne",
    team2Id: "equateur",
    totalMatches: 3,
    team1Wins: 2,
    draws: 1,
    team2Wins: 0,
    team1Goals: 7,
    team2Goals: 3,
    lastMatch: "Victoire 4-2 de l'Allemagne",
    lastMatchDate: "2022-11-29"
  },
  {
    team1Id: "allemagne",
    team2Id: "cote-divoire",
    totalMatches: 3,
    team1Wins: 2,
    draws: 1,
    team2Wins: 0,
    team1Goals: 6,
    team2Goals: 2,
    lastMatch: "Victoire 2-1 de l'Allemagne",
    lastMatchDate: "2018-06-05"
  },
  {
    team1Id: "allemagne",
    team2Id: "curacao",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },
  {
    team1Id: "equateur",
    team2Id: "cote-divoire",
    totalMatches: 1,
    team1Wins: 0,
    draws: 0,
    team2Wins: 1,
    team1Goals: 0,
    team2Goals: 2,
    lastMatch: "Victoire 2-0 de la Côte d'Ivoire",
    lastMatchDate: "2018-06-04"
  },
  {
    team1Id: "equateur",
    team2Id: "curacao",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 3,
    team2Goals: 0,
    lastMatch: "Victoire 3-0 de l'Équateur",
    lastMatchDate: "2019-06-16"
  },
  {
    team1Id: "cote-divoire",
    team2Id: "curacao",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },

  // Group F: pays-bas, japon, tunisie (skipping barrage-uefa-b)
  {
    team1Id: "pays-bas",
    team2Id: "japon",
    totalMatches: 6,
    team1Wins: 4,
    draws: 1,
    team2Wins: 1,
    team1Goals: 10,
    team2Goals: 5,
    lastMatch: "Victoire 4-1 du Japon",
    lastMatchDate: "2022-11-21"
  },
  {
    team1Id: "pays-bas",
    team2Id: "tunisie",
    totalMatches: 2,
    team1Wins: 1,
    draws: 1,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 1,
    lastMatch: "Match nul 1-1",
    lastMatchDate: "2022-11-22"
  },
  {
    team1Id: "japon",
    team2Id: "tunisie",
    totalMatches: 3,
    team1Wins: 1,
    draws: 1,
    team2Wins: 1,
    team1Goals: 3,
    team2Goals: 3,
    lastMatch: "Victoire 2-0 du Japon",
    lastMatchDate: "2018-06-15"
  },

  // Group G: belgique, iran, egypte, nouvelle-zelande
  {
    team1Id: "belgique",
    team2Id: "iran",
    totalMatches: 2,
    team1Wins: 2,
    draws: 0,
    team2Wins: 0,
    team1Goals: 3,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 de la Belgique",
    lastMatchDate: "2018-06-06"
  },
  {
    team1Id: "belgique",
    team2Id: "egypte",
    totalMatches: 3,
    team1Wins: 3,
    draws: 0,
    team2Wins: 0,
    team1Goals: 9,
    team2Goals: 1,
    lastMatch: "Victoire 3-0 de la Belgique",
    lastMatchDate: "2022-11-18"
  },
  {
    team1Id: "belgique",
    team2Id: "nouvelle-zelande",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 1,
    lastMatch: "Victoire 2-1 de la Belgique",
    lastMatchDate: "2017-11-07"
  },
  {
    team1Id: "iran",
    team2Id: "egypte",
    totalMatches: 2,
    team1Wins: 1,
    draws: 0,
    team2Wins: 1,
    team1Goals: 2,
    team2Goals: 2,
    lastMatch: "Victoire 1-0 de l'Iran",
    lastMatchDate: "2019-01-16"
  },
  {
    team1Id: "iran",
    team2Id: "nouvelle-zelande",
    totalMatches: 2,
    team1Wins: 0,
    draws: 1,
    team2Wins: 1,
    team1Goals: 1,
    team2Goals: 2,
    lastMatch: "Victoire 1-0 de la Nouvelle-Zélande",
    lastMatchDate: "2022-09-27"
  },
  {
    team1Id: "egypte",
    team2Id: "nouvelle-zelande",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 0,
    lastMatch: "Victoire 2-0 de l'Égypte",
    lastMatchDate: "2021-07-24"
  },

  // Group H: espagne, uruguay, arabie-saoudite, cap-vert
  {
    team1Id: "espagne",
    team2Id: "uruguay",
    totalMatches: 16,
    team1Wins: 8,
    draws: 6,
    team2Wins: 2,
    team1Goals: 22,
    team2Goals: 13,
    lastMatch: "Victoire 1-0 de l'Espagne",
    lastMatchDate: "2013-02-06"
  },
  {
    team1Id: "espagne",
    team2Id: "arabie-saoudite",
    totalMatches: 2,
    team1Wins: 1,
    draws: 0,
    team2Wins: 1,
    team1Goals: 1,
    team2Goals: 3,
    lastMatch: "Victoire 2-1 de l'Arabie Saoudite",
    lastMatchDate: "2022-11-22"
  },
  {
    team1Id: "espagne",
    team2Id: "cap-vert",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 1,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 de l'Espagne",
    lastMatchDate: "2023-06-18"
  },
  {
    team1Id: "uruguay",
    team2Id: "arabie-saoudite",
    totalMatches: 3,
    team1Wins: 1,
    draws: 2,
    team2Wins: 0,
    team1Goals: 3,
    team2Goals: 1,
    lastMatch: "Victoire 1-0 de l'Uruguay",
    lastMatchDate: "2022-11-30"
  },
  {
    team1Id: "uruguay",
    team2Id: "cap-vert",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 1,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 de l'Uruguay",
    lastMatchDate: "2013-09-06"
  },
  {
    team1Id: "arabie-saoudite",
    team2Id: "cap-vert",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },

  // Group I: france, senegal, norvege (skipping barrage-intercontinental-2)
  {
    team1Id: "france",
    team2Id: "senegal",
    totalMatches: 3,
    team1Wins: 2,
    draws: 0,
    team2Wins: 1,
    team1Goals: 5,
    team2Goals: 2,
    lastMatch: "Victoire 2-0 de la France",
    lastMatchDate: "2022-11-25"
  },
  {
    team1Id: "france",
    team2Id: "norvege",
    totalMatches: 9,
    team1Wins: 4,
    draws: 3,
    team2Wins: 2,
    team1Goals: 14,
    team2Goals: 10,
    lastMatch: "Victoire 1-0 de la France",
    lastMatchDate: "2000-10-07"
  },
  {
    team1Id: "senegal",
    team2Id: "norvege",
    totalMatches: 2,
    team1Wins: 1,
    draws: 1,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 1,
    lastMatch: "Match nul 1-1",
    lastMatchDate: "2009-02-11"
  },

  // Group J: argentine, autriche, algerie, jordanie
  {
    team1Id: "argentine",
    team2Id: "autriche",
    totalMatches: 8,
    team1Wins: 4,
    draws: 3,
    team2Wins: 1,
    team1Goals: 13,
    team2Goals: 6,
    lastMatch: "Victoire 2-0 de l'Argentine",
    lastMatchDate: "2022-09-23"
  },
  {
    team1Id: "argentine",
    team2Id: "algerie",
    totalMatches: 5,
    team1Wins: 3,
    draws: 1,
    team2Wins: 1,
    team1Goals: 12,
    team2Goals: 6,
    lastMatch: "Victoire 1-0 de l'Argentine",
    lastMatchDate: "2014-06-26"
  },
  {
    team1Id: "argentine",
    team2Id: "jordanie",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 4,
    team2Goals: 1,
    lastMatch: "Victoire 4-1 de l'Argentine",
    lastMatchDate: "2014-05-30"
  },
  {
    team1Id: "autriche",
    team2Id: "algerie",
    totalMatches: 2,
    team1Wins: 1,
    draws: 1,
    team2Wins: 0,
    team1Goals: 3,
    team2Goals: 2,
    lastMatch: "Victoire 2-1 de l'Autriche",
    lastMatchDate: "2018-03-23"
  },
  {
    team1Id: "autriche",
    team2Id: "jordanie",
    totalMatches: 0,
    team1Wins: 0,
    draws: 0,
    team2Wins: 0,
    team1Goals: 0,
    team2Goals: 0
  },
  {
    team1Id: "algerie",
    team2Id: "jordanie",
    totalMatches: 3,
    team1Wins: 2,
    draws: 1,
    team2Wins: 0,
    team1Goals: 5,
    team2Goals: 1,
    lastMatch: "Victoire 2-0 de l'Algérie",
    lastMatchDate: "2019-01-10"
  },

  // Group K: portugal, colombie, ouzbekistan (skipping barrage-intercontinental-1)
  {
    team1Id: "portugal",
    team2Id: "colombie",
    totalMatches: 6,
    team1Wins: 3,
    draws: 2,
    team2Wins: 1,
    team1Goals: 9,
    team2Goals: 6,
    lastMatch: "Victoire 3-0 du Portugal",
    lastMatchDate: "2014-09-09"
  },
  {
    team1Id: "portugal",
    team2Id: "ouzbekistan",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 1,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 du Portugal",
    lastMatchDate: "2005-05-31"
  },
  {
    team1Id: "colombie",
    team2Id: "ouzbekistan",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 4,
    team2Goals: 0,
    lastMatch: "Victoire 4-0 de la Colombie",
    lastMatchDate: "2013-10-11"
  },

  // Group L: angleterre, croatie, ghana, panama
  {
    team1Id: "angleterre",
    team2Id: "croatie",
    totalMatches: 10,
    team1Wins: 5,
    draws: 3,
    team2Wins: 2,
    team1Goals: 15,
    team2Goals: 11,
    lastMatch: "Victoire 2-1 de la Croatie",
    lastMatchDate: "2018-07-11"
  },
  {
    team1Id: "angleterre",
    team2Id: "ghana",
    totalMatches: 6,
    team1Wins: 4,
    draws: 1,
    team2Wins: 1,
    team1Goals: 12,
    team2Goals: 5,
    lastMatch: "Match nul 0-0",
    lastMatchDate: "2022-09-27"
  },
  {
    team1Id: "angleterre",
    team2Id: "panama",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 6,
    team2Goals: 1,
    lastMatch: "Victoire 6-1 de l'Angleterre",
    lastMatchDate: "2018-06-24"
  },
  {
    team1Id: "croatie",
    team2Id: "ghana",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 1,
    lastMatch: "Victoire 2-1 de la Croatie",
    lastMatchDate: "2006-06-14"
  },
  {
    team1Id: "croatie",
    team2Id: "panama",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 2,
    team2Goals: 1,
    lastMatch: "Victoire 2-1 de la Croatie",
    lastMatchDate: "2014-11-18"
  },
  {
    team1Id: "ghana",
    team2Id: "panama",
    totalMatches: 1,
    team1Wins: 1,
    draws: 0,
    team2Wins: 0,
    team1Goals: 1,
    team2Goals: 0,
    lastMatch: "Victoire 1-0 du Ghana",
    lastMatchDate: "2006-05-30"
  },

  // ADDITIONAL POPULAR RIVALRIES AND MATCHUPS

  // France vs Brazil (Classic rivalry)
  {
    team1Id: "france",
    team2Id: "bresil",
    totalMatches: 27,
    team1Wins: 9,
    draws: 7,
    team2Wins: 11,
    team1Goals: 35,
    team2Goals: 40,
    lastMatch: "Victoire 1-0 de la France",
    lastMatchDate: "2021-09-09"
  },

  // Argentina vs Brazil (El Clásico)
  {
    team1Id: "argentine",
    team2Id: "bresil",
    totalMatches: 110,
    team1Wins: 41,
    draws: 26,
    team2Wins: 43,
    team1Goals: 165,
    team2Goals: 176,
    lastMatch: "Victoire 4-1 de l'Argentine",
    lastMatchDate: "2025-03-25"
  },

  // Argentina vs Germany (Historic World Cup rivalry)
  {
    team1Id: "argentine",
    team2Id: "allemagne",
    totalMatches: 23,
    team1Wins: 9,
    draws: 6,
    team2Wins: 8,
    team1Goals: 30,
    team2Goals: 30,
    lastMatch: "Victoire 1-0 de l'Allemagne",
    lastMatchDate: "2014-07-13"
  },

  // Spain vs Portugal (Iberian rivalry)
  {
    team1Id: "espagne",
    team2Id: "portugal",
    totalMatches: 41,
    team1Wins: 17,
    draws: 18,
    team2Wins: 6,
    team1Goals: 70,
    team2Goals: 42,
    lastMatch: "Victoire du Portugal aux tirs au but",
    lastMatchDate: "2025-06-08"
  },

  // England vs Germany (Historic rivalry)
  {
    team1Id: "angleterre",
    team2Id: "allemagne",
    totalMatches: 36,
    team1Wins: 16,
    draws: 5,
    team2Wins: 15,
    team1Goals: 65,
    team2Goals: 61,
    lastMatch: "Victoire 2-0 de l'Angleterre",
    lastMatchDate: "2021-06-29"
  },

  // France vs Germany (European powerhouses)
  {
    team1Id: "france",
    team2Id: "allemagne",
    totalMatches: 31,
    team1Wins: 14,
    draws: 7,
    team2Wins: 10,
    team1Goals: 53,
    team2Goals: 42,
    lastMatch: "Victoire 1-0 de la France",
    lastMatchDate: "2021-06-15"
  },

  // England vs France
  {
    team1Id: "angleterre",
    team2Id: "france",
    totalMatches: 32,
    team1Wins: 17,
    draws: 5,
    team2Wins: 10,
    team1Goals: 59,
    team2Goals: 42,
    lastMatch: "Victoire 2-1 de la France",
    lastMatchDate: "2022-12-10"
  },

  // Spain vs Germany
  {
    team1Id: "espagne",
    team2Id: "allemagne",
    totalMatches: 25,
    team1Wins: 9,
    draws: 8,
    team2Wins: 8,
    team1Goals: 35,
    team2Goals: 36,
    lastMatch: "Victoire 1-0 de l'Espagne",
    lastMatchDate: "2022-11-27"
  },

  // Brazil vs Germany (7-1 never forget)
  {
    team1Id: "bresil",
    team2Id: "allemagne",
    totalMatches: 22,
    team1Wins: 12,
    draws: 5,
    team2Wins: 5,
    team1Goals: 42,
    team2Goals: 30,
    lastMatch: "Victoire 7-1 de l'Allemagne",
    lastMatchDate: "2014-07-08"
  },

  // Netherlands vs Germany
  {
    team1Id: "pays-bas",
    team2Id: "allemagne",
    totalMatches: 45,
    team1Wins: 16,
    draws: 17,
    team2Wins: 12,
    team1Goals: 66,
    team2Goals: 59,
    lastMatch: "Victoire 1-0 de l'Allemagne",
    lastMatchDate: "2019-09-06"
  },

  // Italy would go here but not in these groups

  // Argentina vs France
  {
    team1Id: "argentine",
    team2Id: "france",
    totalMatches: 13,
    team1Wins: 6,
    draws: 3,
    team2Wins: 4,
    team1Goals: 21,
    team2Goals: 19,
    lastMatch: "Victoire de l'Argentine aux tirs au but",
    lastMatchDate: "2022-12-18"
  },

  // Brazil vs Spain
  {
    team1Id: "bresil",
    team2Id: "espagne",
    totalMatches: 40,
    team1Wins: 10,
    draws: 14,
    team2Wins: 16,
    team1Goals: 51,
    team2Goals: 62,
    lastMatch: "Victoire 1-0 du Brésil",
    lastMatchDate: "2013-06-30"
  },

  // England vs Brazil
  {
    team1Id: "angleterre",
    team2Id: "bresil",
    totalMatches: 26,
    team1Wins: 8,
    draws: 7,
    team2Wins: 11,
    team1Goals: 30,
    team2Goals: 37,
    lastMatch: "Match nul 0-0",
    lastMatchDate: "2017-11-14"
  },

  // Netherlands vs Argentina
  {
    team1Id: "pays-bas",
    team2Id: "argentine",
    totalMatches: 10,
    team1Wins: 3,
    draws: 4,
    team2Wins: 3,
    team1Goals: 11,
    team2Goals: 12,
    lastMatch: "Victoire de l'Argentine aux tirs au but",
    lastMatchDate: "2022-12-09"
  },

  // Spain vs Argentina
  {
    team1Id: "espagne",
    team2Id: "argentine",
    totalMatches: 14,
    team1Wins: 5,
    draws: 5,
    team2Wins: 4,
    team1Goals: 21,
    team2Goals: 18,
    lastMatch: "Victoire 6-1 de l'Espagne",
    lastMatchDate: "2018-03-27"
  },

  // Portugal vs France
  {
    team1Id: "portugal",
    team2Id: "france",
    totalMatches: 27,
    team1Wins: 6,
    draws: 5,
    team2Wins: 16,
    team1Goals: 27,
    team2Goals: 50,
    lastMatch: "Victoire 1-0 du Portugal",
    lastMatchDate: "2016-07-10"
  },

  // Belgium vs Brazil
  {
    team1Id: "belgique",
    team2Id: "bresil",
    totalMatches: 7,
    team1Wins: 1,
    draws: 2,
    team2Wins: 4,
    team1Goals: 7,
    team2Goals: 11,
    lastMatch: "Victoire 2-1 de la Belgique",
    lastMatchDate: "2018-07-06"
  },

  // Belgium vs France
  {
    team1Id: "belgique",
    team2Id: "france",
    totalMatches: 75,
    team1Wins: 30,
    draws: 19,
    team2Wins: 26,
    team1Goals: 105,
    team2Goals: 103,
    lastMatch: "Victoire 1-0 de la France",
    lastMatchDate: "2021-10-07"
  },

  // Croatia vs France
  {
    team1Id: "croatie",
    team2Id: "france",
    totalMatches: 7,
    team1Wins: 2,
    draws: 1,
    team2Wins: 4,
    team1Goals: 6,
    team2Goals: 9,
    lastMatch: "Victoire 4-2 de la France",
    lastMatchDate: "2018-07-15"
  },

  // Uruguay vs Portugal
  {
    team1Id: "uruguay",
    team2Id: "portugal",
    totalMatches: 8,
    team1Wins: 3,
    draws: 1,
    team2Wins: 4,
    team1Goals: 13,
    team2Goals: 13,
    lastMatch: "Victoire 2-1 du Portugal",
    lastMatchDate: "2018-06-30"
  },

  // Uruguay vs Argentina
  {
    team1Id: "uruguay",
    team2Id: "argentine",
    totalMatches: 197,
    team1Wins: 59,
    draws: 48,
    team2Wins: 90,
    team1Goals: 256,
    team2Goals: 353,
    lastMatch: "Victoire 1-0 de l'Argentine",
    lastMatchDate: "2024-11-15"
  },

  // Uruguay vs Brazil
  {
    team1Id: "uruguay",
    team2Id: "bresil",
    totalMatches: 81,
    team1Wins: 20,
    draws: 18,
    team2Wins: 43,
    team1Goals: 90,
    team2Goals: 158,
    lastMatch: "Match nul 1-1",
    lastMatchDate: "2023-10-17"
  },

  // Colombia vs Argentina
  {
    team1Id: "colombie",
    team2Id: "argentine",
    totalMatches: 42,
    team1Wins: 10,
    draws: 13,
    team2Wins: 19,
    team1Goals: 45,
    team2Goals: 69,
    lastMatch: "Victoire 2-1 de la Colombie",
    lastMatchDate: "2024-09-10"
  },

  // Colombia vs Brazil
  {
    team1Id: "colombie",
    team2Id: "bresil",
    totalMatches: 34,
    team1Wins: 5,
    draws: 9,
    team2Wins: 20,
    team1Goals: 28,
    team2Goals: 64,
    lastMatch: "Victoire 2-1 du Brésil",
    lastMatchDate: "2024-07-02"
  },

  // Mexico vs Brazil
  {
    team1Id: "mexique",
    team2Id: "bresil",
    totalMatches: 41,
    team1Wins: 3,
    draws: 14,
    team2Wins: 24,
    team1Goals: 25,
    team2Goals: 82,
    lastMatch: "Victoire 2-0 du Brésil",
    lastMatchDate: "2022-06-06"
  },

  // Mexico vs Argentina
  {
    team1Id: "mexique",
    team2Id: "argentine",
    totalMatches: 35,
    team1Wins: 4,
    draws: 16,
    team2Wins: 15,
    team1Goals: 30,
    team2Goals: 52,
    lastMatch: "Victoire 2-0 de l'Argentine",
    lastMatchDate: "2022-11-26"
  },

  // Netherlands vs Spain
  {
    team1Id: "pays-bas",
    team2Id: "espagne",
    totalMatches: 16,
    team1Wins: 6,
    draws: 4,
    team2Wins: 6,
    team1Goals: 23,
    team2Goals: 24,
    lastMatch: "Victoire 5-1 des Pays-Bas",
    lastMatchDate: "2014-06-13"
  },

  // Netherlands vs Brazil
  {
    team1Id: "pays-bas",
    team2Id: "bresil",
    totalMatches: 15,
    team1Wins: 5,
    draws: 5,
    team2Wins: 5,
    team1Goals: 19,
    team2Goals: 21,
    lastMatch: "Victoire 4-3 du Brésil aux tirs au but",
    lastMatchDate: "2022-12-09"
  },

  // Netherlands vs England
  {
    team1Id: "pays-bas",
    team2Id: "angleterre",
    totalMatches: 22,
    team1Wins: 7,
    draws: 10,
    team2Wins: 5,
    team1Goals: 29,
    team2Goals: 28,
    lastMatch: "Victoire 3-1 de l'Angleterre",
    lastMatchDate: "2019-06-06"
  },

  // Netherlands vs France
  {
    team1Id: "pays-bas",
    team2Id: "france",
    totalMatches: 31,
    team1Wins: 11,
    draws: 11,
    team2Wins: 9,
    team1Goals: 42,
    team2Goals: 40,
    lastMatch: "Victoire 4-0 de la France",
    lastMatchDate: "2023-03-24"
  },

  // England vs Spain
  {
    team1Id: "angleterre",
    team2Id: "espagne",
    totalMatches: 27,
    team1Wins: 14,
    draws: 4,
    team2Wins: 9,
    team1Goals: 51,
    team2Goals: 38,
    lastMatch: "Victoire 2-1 de l'Espagne",
    lastMatchDate: "2024-07-14"
  },

  // England vs Argentina
  {
    team1Id: "angleterre",
    team2Id: "argentine",
    totalMatches: 17,
    team1Wins: 7,
    draws: 5,
    team2Wins: 5,
    team1Goals: 24,
    team2Goals: 19,
    lastMatch: "Match nul 0-0",
    lastMatchDate: "2005-11-12"
  },

  // Portugal vs Germany
  {
    team1Id: "portugal",
    team2Id: "allemagne",
    totalMatches: 20,
    team1Wins: 3,
    draws: 4,
    team2Wins: 13,
    team1Goals: 19,
    team2Goals: 40,
    lastMatch: "Victoire 4-2 de l'Allemagne",
    lastMatchDate: "2021-06-19"
  },

  // Portugal vs Brazil
  {
    team1Id: "portugal",
    team2Id: "bresil",
    totalMatches: 6,
    team1Wins: 1,
    draws: 2,
    team2Wins: 3,
    team1Goals: 5,
    team2Goals: 9,
    lastMatch: "Match nul 0-0",
    lastMatchDate: "2022-11-17"
  },

  // Portugal vs Argentina
  {
    team1Id: "portugal",
    team2Id: "argentine",
    totalMatches: 6,
    team1Wins: 1,
    draws: 3,
    team2Wins: 2,
    team1Goals: 8,
    team2Goals: 9,
    lastMatch: "Victoire 1-0 de l'Argentine",
    lastMatchDate: "2014-11-18"
  },

  // Senegal vs Egypt (African rivalry)
  {
    team1Id: "senegal",
    team2Id: "egypte",
    totalMatches: 12,
    team1Wins: 5,
    draws: 4,
    team2Wins: 3,
    team1Goals: 13,
    team2Goals: 10,
    lastMatch: "Victoire du Sénégal aux tirs au but",
    lastMatchDate: "2022-03-29"
  },

  // Morocco vs Algeria (North African rivalry)
  {
    team1Id: "maroc",
    team2Id: "algerie",
    totalMatches: 28,
    team1Wins: 7,
    draws: 10,
    team2Wins: 11,
    team1Goals: 28,
    team2Goals: 37,
    lastMatch: "Victoire 3-0 de l'Algérie",
    lastMatchDate: "2019-06-27"
  },

  // Ghana vs Egypt (African powerhouses)
  {
    team1Id: "ghana",
    team2Id: "egypte",
    totalMatches: 22,
    team1Wins: 8,
    draws: 7,
    team2Wins: 7,
    team1Goals: 24,
    team2Goals: 23,
    lastMatch: "Victoire 2-0 du Ghana",
    lastMatchDate: "2017-01-25"
  },

  // Japan vs South Korea (Asian rivalry)
  {
    team1Id: "japon",
    team2Id: "coree-du-sud",
    totalMatches: 80,
    team1Wins: 15,
    draws: 24,
    team2Wins: 41,
    team1Goals: 70,
    team2Goals: 148,
    lastMatch: "Victoire 2-1 du Japon",
    lastMatchDate: "2024-03-26"
  },

  // Morocco vs Spain
  {
    team1Id: "maroc",
    team2Id: "espagne",
    totalMatches: 16,
    team1Wins: 3,
    draws: 5,
    team2Wins: 8,
    team1Goals: 16,
    team2Goals: 28,
    lastMatch: "Victoire du Maroc aux tirs au but",
    lastMatchDate: "2022-12-06"
  },

  // Australia vs Japan (Asian rivalry)
  {
    team1Id: "australie",
    team2Id: "japon",
    totalMatches: 25,
    team1Wins: 7,
    draws: 6,
    team2Wins: 12,
    team1Goals: 33,
    team2Goals: 42,
    lastMatch: "Victoire 2-0 de l'Australie",
    lastMatchDate: "2024-10-15"
  },

  // Switzerland vs France
  {
    team1Id: "suisse",
    team2Id: "france",
    totalMatches: 39,
    team1Wins: 14,
    draws: 10,
    team2Wins: 15,
    team1Goals: 57,
    team2Goals: 66,
    lastMatch: "Victoire de la Suisse aux tirs au but",
    lastMatchDate: "2021-06-28"
  },
];

export const h2hByPair: Record<string, H2HRecord> = {};
for (const record of h2hRecords) {
  h2hByPair[`${record.team1Id}:${record.team2Id}`] = record;
  h2hByPair[`${record.team2Id}:${record.team1Id}`] = {
    ...record,
    team1Id: record.team2Id,
    team2Id: record.team1Id,
    team1Wins: record.team2Wins,
    team2Wins: record.team1Wins,
    team1Goals: record.team2Goals,
    team2Goals: record.team1Goals,
  };
}
