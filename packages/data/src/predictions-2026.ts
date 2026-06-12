// ============================================================================
// FIFA World Cup 2026 — Bookmaker Odds & Enriched Predictions
// Updated: June 12, 2026
//
// Sources bookmakers partenaires :
//   - PokerStars Sports (odds décimaux français)
//   - Betsson (odds décimaux européens)
//   - PMU Sport (odds décimaux français)
//   - Genybet (odds décimaux français)
//
// Cotes décimales des principaux bookmakers partenaires
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface FavoriteOdds {
  /** teamId correspondant à teams.ts */
  teamId: string;
  rank: number;
  /** Cotes décimales PokerStars Sports */
  pokerstarsSports: number;
  /** Cotes décimales Betsson */
  betsson: number;
  /** Cotes décimales PMU Sport */
  pmuSport: number;
  /** Cotes décimales Genybet */
  genybet: number;
  /** Moyenne des cotes des 4 bookmakers partenaires */
  avgOdds: number;
  /** Probabilité implicite (1 / avgOdds) */
  impliedProbability: number;
  /** Variation vs. cotes d'ouverture post-tirage (décembre 2025) */
  trend: "up" | "down" | "stable";
}

export interface GroupTeamPrediction {
  teamId: string;
  /** Probabilité de terminer 1er du groupe */
  firstProb: number;
  /** Probabilité de se qualifier (1er ou 2e) */
  qualifyProb: number;
  /** Points prévus après 3 matchs de groupe */
  predictedPoints: number;
  /** Différence de buts prévue */
  predictedGoalDiff: number;
  /** Classement prédit dans le groupe */
  rank: number;
}

export interface GroupPrediction {
  group: string;
  teams: GroupTeamPrediction[];
}

export interface TopScorerCandidate {
  /** playerId correspondant à players.ts */
  playerId: string;
  teamId: string;
  name: string;
  /** Cote PokerStars Sports (décimale) */
  pokerstarsSports: number;
  /** Cote Betsson (décimale) */
  betsson: number;
  /** Cote Genybet (décimale) */
  genybet: number;
  /** Moyenne des cotes */
  avgOdds: number;
  /** Probabilité implicite */
  impliedProbability: number;
  /** Buts attendus sur le tournoi (modèle ELO + statistiques) */
  expectedGoals: number;
  /** Buts en sélection (carrière) */
  internationalGoals: number;
  /** Raisons analytiques */
  strengths: string[];
}

export interface YoungPlayerCandidate {
  /** playerId correspondant à players.ts */
  playerId: string;
  teamId: string;
  name: string;
  dateOfBirth: string;
  ageAtWorldCup: number;
  position: "GK" | "DF" | "MF" | "FW";
  club: string;
  /** Score composite (0-100) : forme, stats, force de l'équipe, cote bookmakers */
  score: number;
  /** Cotes moyennes meilleur jeune joueur */
  avgOdds: number;
  /** Probabilité implicite */
  impliedProbability: number;
  strengths: string[];
}

// ============================================================================
// 1. TOP 10 FAVORIS — VAINQUEUR CDM 2026
// Données : PokerStars Sports, Betsson, PMU Sport, Genybet (juin 2026)
// ============================================================================

export const top10Favorites: FavoriteOdds[] = [
  {
    teamId: "espagne",
    rank: 1,
    pokerstarsSports: 5.50,
    betsson: 5.25,
    pmuSport: 5.40,
    genybet: 5.50,
    avgOdds: 5.41,
    impliedProbability: 0.185,
    trend: "stable",
  },
  {
    teamId: "angleterre",
    rank: 2,
    pokerstarsSports: 6.50,
    betsson: 6.25,
    pmuSport: 6.40,
    genybet: 6.50,
    avgOdds: 6.41,
    impliedProbability: 0.156,
    trend: "up",
  },
  {
    teamId: "france",
    rank: 3,
    pokerstarsSports: 9.00,
    betsson: 8.00,
    pmuSport: 8.50,
    genybet: 8.50,
    avgOdds: 8.50,
    impliedProbability: 0.118,
    trend: "stable",
  },
  {
    teamId: "bresil",
    rank: 4,
    pokerstarsSports: 9.00,
    betsson: 9.00,
    pmuSport: 9.00,
    genybet: 9.00,
    avgOdds: 9.00,
    impliedProbability: 0.111,
    trend: "stable",
  },
  {
    teamId: "argentine",
    rank: 5,
    pokerstarsSports: 9.00,
    betsson: 9.50,
    pmuSport: 9.25,
    genybet: 9.00,
    avgOdds: 9.19,
    impliedProbability: 0.109,
    trend: "down",
  },
  {
    teamId: "portugal",
    rank: 6,
    pokerstarsSports: 12.00,
    betsson: 11.00,
    pmuSport: 11.50,
    genybet: 11.00,
    avgOdds: 11.38,
    impliedProbability: 0.088,
    trend: "up",
  },
  {
    teamId: "allemagne",
    rank: 7,
    pokerstarsSports: 15.00,
    betsson: 13.00,
    pmuSport: 14.00,
    genybet: 13.00,
    avgOdds: 13.75,
    impliedProbability: 0.073,
    trend: "up",
  },
  {
    teamId: "pays-bas",
    rank: 8,
    pokerstarsSports: 21.00,
    betsson: 20.00,
    pmuSport: 21.00,
    genybet: 21.00,
    avgOdds: 20.75,
    impliedProbability: 0.048,
    trend: "stable",
  },
  {
    teamId: "norvege",
    rank: 9,
    pokerstarsSports: 26.00,
    betsson: 29.00,
    pmuSport: 26.00,
    genybet: 29.00,
    avgOdds: 27.50,
    impliedProbability: 0.036,
    trend: "up",
  },
  {
    teamId: "colombie",
    rank: 10,
    pokerstarsSports: 34.00,
    betsson: 51.00,
    pmuSport: 41.00,
    genybet: 51.00,
    avgOdds: 44.25,
    impliedProbability: 0.023,
    trend: "stable",
  },
];

// Lookup helper
export const favoritesByTeamId: Record<string, FavoriteOdds> = Object.fromEntries(
  top10Favorites.map((f) => [f.teamId, f])
);

// ============================================================================
// 2. PRONOSTICS PAR GROUPE — Classement prédit + probabilités
// Basé sur : cotes ELO (predictions.ts) + cotes bookmakers actualisées
// ============================================================================

export const groupPredictions: GroupPrediction[] = [
  // ---- GROUPE A : Mexique · Corée du Sud · Afrique du Sud · Barrage UEFA D ----
  {
    group: "A",
    teams: [
      {
        teamId: "coree-du-sud",
        rank: 1,
        firstProb: 0.38,
        qualifyProb: 0.72,
        predictedPoints: 7,
        predictedGoalDiff: 3,
      },
      {
        teamId: "mexique",
        rank: 2,
        firstProb: 0.36,
        qualifyProb: 0.68,
        predictedPoints: 6,
        predictedGoalDiff: 2,
      },
      {
        teamId: "barrage-uefa-d",
        rank: 3,
        firstProb: 0.18,
        qualifyProb: 0.38,
        predictedPoints: 3,
        predictedGoalDiff: -2,
      },
      {
        teamId: "afrique-du-sud",
        rank: 4,
        firstProb: 0.08,
        qualifyProb: 0.22,
        predictedPoints: 2,
        predictedGoalDiff: -3,
      },
    ],
  },

  // ---- GROUPE B : Canada · Suisse · Qatar · Barrage UEFA A ----
  {
    group: "B",
    teams: [
      {
        teamId: "suisse",
        rank: 1,
        firstProb: 0.42,
        qualifyProb: 0.76,
        predictedPoints: 7,
        predictedGoalDiff: 4,
      },
      {
        teamId: "canada",
        rank: 2,
        firstProb: 0.32,
        qualifyProb: 0.65,
        predictedPoints: 6,
        predictedGoalDiff: 2,
      },
      {
        teamId: "barrage-uefa-a",
        rank: 3,
        firstProb: 0.20,
        qualifyProb: 0.38,
        predictedPoints: 3,
        predictedGoalDiff: -1,
      },
      {
        teamId: "qatar",
        rank: 4,
        firstProb: 0.06,
        qualifyProb: 0.21,
        predictedPoints: 1,
        predictedGoalDiff: -5,
      },
    ],
  },

  // ---- GROUPE C : Brésil · Maroc · Écosse · Haïti ----
  {
    group: "C",
    teams: [
      {
        teamId: "bresil",
        rank: 1,
        firstProb: 0.75,
        qualifyProb: 0.94,
        predictedPoints: 9,
        predictedGoalDiff: 7,
      },
      {
        teamId: "maroc",
        rank: 2,
        firstProb: 0.17,
        qualifyProb: 0.72,
        predictedPoints: 6,
        predictedGoalDiff: 2,
      },
      {
        teamId: "ecosse",
        rank: 3,
        firstProb: 0.07,
        qualifyProb: 0.28,
        predictedPoints: 3,
        predictedGoalDiff: -3,
      },
      {
        teamId: "haiti",
        rank: 4,
        firstProb: 0.01,
        qualifyProb: 0.06,
        predictedPoints: 0,
        predictedGoalDiff: -6,
      },
    ],
  },

  // ---- GROUPE D : USA · Paraguay · Australie · Barrage UEFA C ----
  {
    group: "D",
    teams: [
      {
        teamId: "etats-unis",
        rank: 1,
        firstProb: 0.44,
        qualifyProb: 0.74,
        predictedPoints: 7,
        predictedGoalDiff: 3,
      },
      {
        teamId: "australie",
        rank: 2,
        firstProb: 0.24,
        qualifyProb: 0.56,
        predictedPoints: 5,
        predictedGoalDiff: 0,
      },
      {
        teamId: "paraguay",
        rank: 3,
        firstProb: 0.21,
        qualifyProb: 0.52,
        predictedPoints: 4,
        predictedGoalDiff: -1,
      },
      {
        teamId: "barrage-uefa-c",
        rank: 4,
        firstProb: 0.11,
        qualifyProb: 0.18,
        predictedPoints: 2,
        predictedGoalDiff: -2,
      },
    ],
  },

  // ---- GROUPE E : Allemagne · Équateur · Côte d'Ivoire · Curaçao ----
  {
    group: "E",
    teams: [
      {
        teamId: "allemagne",
        rank: 1,
        firstProb: 0.72,
        qualifyProb: 0.93,
        predictedPoints: 9,
        predictedGoalDiff: 8,
      },
      {
        teamId: "equateur",
        rank: 2,
        firstProb: 0.16,
        qualifyProb: 0.61,
        predictedPoints: 5,
        predictedGoalDiff: 1,
      },
      {
        teamId: "cote-divoire",
        rank: 3,
        firstProb: 0.10,
        qualifyProb: 0.38,
        predictedPoints: 3,
        predictedGoalDiff: -2,
      },
      {
        teamId: "curacao",
        rank: 4,
        firstProb: 0.02,
        qualifyProb: 0.08,
        predictedPoints: 1,
        predictedGoalDiff: -7,
      },
    ],
  },

  // ---- GROUPE F : Pays-Bas · Japon · Tunisie · Barrage UEFA B ----
  {
    group: "F",
    teams: [
      {
        teamId: "pays-bas",
        rank: 1,
        firstProb: 0.62,
        qualifyProb: 0.90,
        predictedPoints: 8,
        predictedGoalDiff: 6,
      },
      {
        teamId: "japon",
        rank: 2,
        firstProb: 0.22,
        qualifyProb: 0.65,
        predictedPoints: 6,
        predictedGoalDiff: 1,
      },
      {
        teamId: "barrage-uefa-b",
        rank: 3,
        firstProb: 0.12,
        qualifyProb: 0.35,
        predictedPoints: 3,
        predictedGoalDiff: -2,
      },
      {
        teamId: "tunisie",
        rank: 4,
        firstProb: 0.04,
        qualifyProb: 0.10,
        predictedPoints: 1,
        predictedGoalDiff: -5,
      },
    ],
  },

  // ---- GROUPE G : Belgique · Iran · Égypte · Nouvelle-Zélande ----
  {
    group: "G",
    teams: [
      {
        teamId: "belgique",
        rank: 1,
        firstProb: 0.65,
        qualifyProb: 0.89,
        predictedPoints: 9,
        predictedGoalDiff: 6,
      },
      {
        teamId: "egypte",
        rank: 2,
        firstProb: 0.18,
        qualifyProb: 0.58,
        predictedPoints: 5,
        predictedGoalDiff: 0,
      },
      {
        teamId: "iran",
        rank: 3,
        firstProb: 0.14,
        qualifyProb: 0.45,
        predictedPoints: 4,
        predictedGoalDiff: -1,
      },
      {
        teamId: "nouvelle-zelande",
        rank: 4,
        firstProb: 0.03,
        qualifyProb: 0.08,
        predictedPoints: 0,
        predictedGoalDiff: -5,
      },
    ],
  },

  // ---- GROUPE H : Espagne · Uruguay · Arabie Saoudite · Cap-Vert ----
  {
    group: "H",
    teams: [
      {
        teamId: "espagne",
        rank: 1,
        firstProb: 0.80,
        qualifyProb: 0.96,
        predictedPoints: 9,
        predictedGoalDiff: 8,
      },
      {
        teamId: "uruguay",
        rank: 2,
        firstProb: 0.13,
        qualifyProb: 0.72,
        predictedPoints: 6,
        predictedGoalDiff: 1,
      },
      {
        teamId: "cap-vert",
        rank: 3,
        firstProb: 0.05,
        qualifyProb: 0.24,
        predictedPoints: 3,
        predictedGoalDiff: -3,
      },
      {
        teamId: "arabie-saoudite",
        rank: 4,
        firstProb: 0.02,
        qualifyProb: 0.08,
        predictedPoints: 0,
        predictedGoalDiff: -6,
      },
    ],
  },

  // ---- GROUPE I : France · Sénégal · Norvège · Barrage interconf. 2 ----
  {
    group: "I",
    teams: [
      {
        teamId: "france",
        rank: 1,
        firstProb: 0.62,
        qualifyProb: 0.97,
        predictedPoints: 9,
        predictedGoalDiff: 7,
      },
      {
        teamId: "norvege",
        rank: 2,
        firstProb: 0.22,
        qualifyProb: 0.72,
        predictedPoints: 6,
        predictedGoalDiff: 2,
      },
      {
        teamId: "senegal",
        rank: 3,
        firstProb: 0.13,
        qualifyProb: 0.52,
        predictedPoints: 4,
        predictedGoalDiff: -1,
      },
      {
        teamId: "barrage-interconf-2",
        rank: 4,
        firstProb: 0.03,
        qualifyProb: 0.09,
        predictedPoints: 1,
        predictedGoalDiff: -8,
      },
    ],
  },

  // ---- GROUPE J : Argentine · Autriche · Algérie · Jordanie ----
  {
    group: "J",
    teams: [
      {
        teamId: "argentine",
        rank: 1,
        firstProb: 0.78,
        qualifyProb: 0.98,
        predictedPoints: 9,
        predictedGoalDiff: 9,
      },
      {
        teamId: "autriche",
        rank: 2,
        firstProb: 0.14,
        qualifyProb: 0.64,
        predictedPoints: 5,
        predictedGoalDiff: 0,
      },
      {
        teamId: "algerie",
        rank: 3,
        firstProb: 0.06,
        qualifyProb: 0.30,
        predictedPoints: 3,
        predictedGoalDiff: -2,
      },
      {
        teamId: "jordanie",
        rank: 4,
        firstProb: 0.02,
        qualifyProb: 0.08,
        predictedPoints: 1,
        predictedGoalDiff: -7,
      },
    ],
  },

  // ---- GROUPE K : Portugal · Colombie · Ouzbékistan · Barrage interconf. 1 ----
  {
    group: "K",
    teams: [
      {
        teamId: "portugal",
        rank: 1,
        firstProb: 0.60,
        qualifyProb: 0.92,
        predictedPoints: 8,
        predictedGoalDiff: 7,
      },
      {
        teamId: "colombie",
        rank: 2,
        firstProb: 0.30,
        qualifyProb: 0.78,
        predictedPoints: 7,
        predictedGoalDiff: 3,
      },
      {
        teamId: "ouzbekistan",
        rank: 3,
        firstProb: 0.07,
        qualifyProb: 0.24,
        predictedPoints: 2,
        predictedGoalDiff: -4,
      },
      {
        teamId: "barrage-interconf-1",
        rank: 4,
        firstProb: 0.03,
        qualifyProb: 0.06,
        predictedPoints: 0,
        predictedGoalDiff: -6,
      },
    ],
  },

  // ---- GROUPE L : Angleterre · Croatie · Ghana · Panama ----
  {
    group: "L",
    teams: [
      {
        teamId: "angleterre",
        rank: 1,
        firstProb: 0.74,
        qualifyProb: 0.95,
        predictedPoints: 9,
        predictedGoalDiff: 8,
      },
      {
        teamId: "croatie",
        rank: 2,
        firstProb: 0.16,
        qualifyProb: 0.68,
        predictedPoints: 6,
        predictedGoalDiff: 1,
      },
      {
        teamId: "ghana",
        rank: 3,
        firstProb: 0.08,
        qualifyProb: 0.30,
        predictedPoints: 3,
        predictedGoalDiff: -2,
      },
      {
        teamId: "panama",
        rank: 4,
        firstProb: 0.02,
        qualifyProb: 0.07,
        predictedPoints: 0,
        predictedGoalDiff: -7,
      },
    ],
  },
];

export const groupPredictionsByGroup: Record<string, GroupPrediction> = Object.fromEntries(
  groupPredictions.map((g) => [g.group, g])
);

// ============================================================================
// 3. TOP BUTEUR — 5 CANDIDATS AVEC COTES
// Sources : PokerStars Sports, Betsson, Genybet (juin 2026)
// Modèle ELO + ratio buts/sélections × matchs attendus
// ============================================================================

export const topScorerCandidates: TopScorerCandidate[] = [
  {
    playerId: "mbappe",
    teamId: "france",
    name: "Kylian Mbappé",
    pokerstarsSports: 6.50,
    betsson: 7.00,
    genybet: 7.00,
    avgOdds: 6.83,
    impliedProbability: 0.146,
    expectedGoals: 5.2,
    internationalGoals: 47,
    strengths: [
      "Meilleur buteur français de l'histoire, dépasse Platini et Zidane",
      "12 buts en Coupe du Monde (Qatar 2022 inclus), performance historique",
      "France dans un groupe très abordable (Sénégal, Norvège)",
      "Vitesse et dribble inégalés, redoutable dans les 1v1",
      "Motivation ultime : remporter la CdM après la finale perdue 2022",
    ],
  },
  {
    playerId: "kane",
    teamId: "angleterre",
    name: "Harry Kane",
    pokerstarsSports: 7.50,
    betsson: 7.50,
    genybet: 7.50,
    avgOdds: 7.50,
    impliedProbability: 0.133,
    expectedGoals: 4.8,
    internationalGoals: 68,
    strengths: [
      "Meilleur buteur de l'histoire d'Angleterre (68 buts)",
      "Technique irréprochable sur penalties et coups de pied arrêtés",
      "Angleterre favorite dans un groupe L très accessible",
      "Régularité absolue au Bayern Munich (55 buts en 51 matches en 2023-24)",
      "Leadership naturel, patron de l'attaque des Three Lions",
    ],
  },
  {
    playerId: "messi",
    teamId: "argentine",
    name: "Lionel Messi",
    pokerstarsSports: 13.00,
    betsson: 13.00,
    genybet: 13.00,
    avgOdds: 13.00,
    impliedProbability: 0.077,
    expectedGoals: 3.5,
    internationalGoals: 112,
    strengths: [
      "Champion du Monde en titre, 13 buts en 26 matches de CdM",
      "GOAT absolu : 112 buts en sélection, 8 Ballons d'Or",
      "Argentine dans le groupe le plus faible (Algérie, Jordanie, Autriche)",
      "Motivation maximale : probablement dernière Coupe du Monde",
      "Leadership qui transcende l'équipe entière",
    ],
  },
  {
    playerId: "haaland",
    teamId: "norvege",
    name: "Erling Haaland",
    pokerstarsSports: 15.00,
    betsson: 15.00,
    genybet: 15.00,
    avgOdds: 15.00,
    impliedProbability: 0.067,
    expectedGoals: 3.8,
    internationalGoals: 36,
    strengths: [
      "Machine à buts : 54 buts en 42 matches avec Man City en 2022-23",
      "Norvège dans le groupe I avec France et Sénégal — qualification possible en 2e",
      "Puissance physique hors normes, efficacité dans la surface",
      "Première grande compétition internationale à 25 ans — faim de victoire",
      "Ratio buts/sélection exceptionnel (36 buts en 36 sélections)",
    ],
  },
  {
    playerId: "vinicius",
    teamId: "bresil",
    name: "Vinicius Jr",
    pokerstarsSports: 26.00,
    betsson: 26.00,
    genybet: 26.00,
    avgOdds: 26.00,
    impliedProbability: 0.038,
    expectedGoals: 3.2,
    internationalGoals: 25,
    strengths: [
      "Meilleur joueur de La Liga avec le Real Madrid, finaliste Ballon d'Or 2024",
      "Dribbleur électrique, capable de créer du néant",
      "Brésil dans le groupe C avec Maroc, Écosse, Haïti — 9/9 envisageable",
      "23 ans à la CdM, âge parfait pour exploser sur la scène mondiale",
      "Soutenu par Ancelotti, nouvelle dimension en tant que numéro 9",
    ],
  },
];

export const topScorerById: Record<string, TopScorerCandidate> = Object.fromEntries(
  topScorerCandidates.map((s) => [s.playerId, s])
);

// ============================================================================
// 4. MEILLEUR JEUNE JOUEUR — 5 CANDIDATS
// Critère FIFA : généralement joueurs nés après le 1er janvier 2003
// (soit 23 ans maximum au 11 juin 2026)
// ============================================================================

export const youngPlayerCandidates: YoungPlayerCandidate[] = [
  {
    playerId: "yamal",
    teamId: "espagne",
    name: "Lamine Yamal",
    dateOfBirth: "2007-07-13",
    ageAtWorldCup: 18,
    position: "FW",
    club: "FC Barcelona",
    score: 96,
    avgOdds: 3.50,
    impliedProbability: 0.286,
    strengths: [
      "Favori absolu : élu meilleur jeune joueur de l'Euro 2024 à 17 ans",
      "Espagne championne d'Europe, favorite pour la CdM 2026",
      "Vitesse, dribble et vision de jeu prodigieux pour son âge",
      "Déjà 18 caps en sélection, leadership précoce",
      "Saison 2024-25 exceptionnelle au Barça (35 buts + passes décisives)",
    ],
  },
  {
    playerId: "endrick",
    teamId: "bresil",
    name: "Endrick",
    dateOfBirth: "2006-07-21",
    ageAtWorldCup: 19,
    position: "FW",
    club: "Real Madrid",
    score: 82,
    avgOdds: 7.00,
    impliedProbability: 0.143,
    strengths: [
      "19 ans au Mondial, poids d'une nation de 200M d'habitants",
      "Signé au Real Madrid à 17 ans, première grande scène internationale",
      "Instinct de buteur naturel, percussion et audace juvénile",
      "Brésil très fort collectivement, beaucoup d'occasions à saisir",
      "L'un des joueurs les plus prometteurs de sa génération mondiale",
    ],
  },
  {
    playerId: "zaire-emery",
    teamId: "france",
    name: "Warren Zaïre-Emery",
    dateOfBirth: "2006-06-08",
    ageAtWorldCup: 20,
    position: "MF",
    club: "Paris Saint-Germain",
    score: 79,
    avgOdds: 9.00,
    impliedProbability: 0.111,
    strengths: [
      "20 ans, titu-laire indiscutable au PSG et de plus en plus en équipe de France",
      "Milieu box-to-box : volume de jeu, duels, buts importants",
      "France dans un groupe abordable : beaucoup de minutes attendues",
      "Énergie et agressivité rarissimes pour son âge au plus haut niveau",
      "Successeur désigné de Pogba et Kanté dans l'entrejeu tricolore",
    ],
  },
  {
    playerId: "musiala",
    teamId: "allemagne",
    name: "Jamal Musiala",
    dateOfBirth: "2003-02-26",
    ageAtWorldCup: 23,
    position: "MF",
    club: "Bayern Munich",
    score: 76,
    avgOdds: 10.00,
    impliedProbability: 0.100,
    strengths: [
      "Technique et créativité extraordinaires au Bayern et en sélection",
      "L'un des meilleurs dribbleurs d'Europe, 23 ans à la CdM",
      "Allemagne dans un groupe E très favorable (Équateur, CdI, Curaçao)",
      "Élu joueur de la saison en Bundesliga (2023-24), Ballon d'Or top 5",
      "Candidat sérieux au Ballon d'Or si Allemagne va loin",
    ],
  },
  {
    playerId: "wirtz",
    teamId: "allemagne",
    name: "Florian Wirtz",
    dateOfBirth: "2003-05-03",
    ageAtWorldCup: 23,
    position: "MF",
    club: "Bayern Munich",
    score: 73,
    avgOdds: 11.00,
    impliedProbability: 0.091,
    strengths: [
      "Meilleur joueur du Bayer Leverkusen lors du titre historique en Bundesliga",
      "Génie technique comparable à Özil à son meilleur niveau",
      "Buts et passes décisives à profusion, lecture du jeu hors normes",
      "Complémentarité parfaite avec Musiala dans le 4-2-3-1 allemand",
      "Transfert au Real Madrid ou Bayern attendu — signature d'un statut mondial",
    ],
  },
];

export const youngPlayerById: Record<string, YoungPlayerCandidate> = Object.fromEntries(
  youngPlayerCandidates.map((y) => [y.playerId, y])
);

// ============================================================================
// 5. MÉTA-DONNÉES — Contexte & Confiance
// ============================================================================

export const predictionsMeta = {
  updatedAt: "2026-06-12",
  dataWindow: "Décembre 2025 – Juin 2026",
  sources: [
    "PokerStars Sports (juin 2026)",
    "Betsson (juin 2026)",
    "PMU Sport (juin 2026)",
    "Genybet (juin 2026)",
    "oddschecker.com (juin 2026)",
  ],
  modelNotes: [
    "Cotes décimales européennes (1.00 = mise récupérée sans gain)",
    "Probabilités implicites calculées sur la moyenne des bookmakers sans marge",
    "Buts attendus : modèle ELO × ratio buts/sélection × matchs attendus",
    "Groupes avec barrages : estimations conservatives (barrage UEFA ~niveau Écosse/Autriche)",
  ],
  confidence: {
    winnerOdds: "high",      // données live bookmakers
    groupPredictions: "medium", // ELO + draw post-tirage
    topScorer: "medium",     // odds live + modèle stats
    youngPlayer: "low",      // marché de niche, peu de cotes disponibles
  },
};
