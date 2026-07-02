import { teams } from "@repo/data/teams";
import { teamPredictions, type TeamPrediction } from "@repo/data/predictions";
import type { Match, Team } from "@repo/data/types";
import { getResolvedCalendarMatches } from "../../../../lib/calendar-match-resolution";

export const faqItems = [
  {
    question: "Qui est favori pour gagner la Coupe du Monde 2026 ?",
    answer:
      "Le favori évolue avec les résultats. Notre forecast combine la force ELO pré-tournoi, le marché des cotes et l'état réel du tableau : une équipe éliminée passe à 0%, une équipe qualifiée au tour suivant voit sa probabilité recalculée.",
  },
  {
    question: "Quelles sont les meilleures cotes pour le vainqueur CDM 2026 ?",
    answer:
      "Les cotes vainqueur évoluent après chaque résultat important. La page affiche les cotes PMU Sport ou une estimation issue de la probabilité live quand la cote partenaire n'est pas encore disponible.",
  },
  {
    question: "L'équipe de France peut-elle gagner la CDM 2026 ?",
    answer:
      "Oui, tant que la France est encore dans le tableau, elle reste dans les équipes capables d'aller au bout. Sa probabilité live dépend à la fois de son niveau de départ, de ses résultats déjà obtenus et de la difficulté du chemin restant.",
  },
  {
    question: "Quel pays organisateur pourrait créer la surprise en 2026 ?",
    answer:
      "Les États-Unis, co-organisateurs avec le Canada et le Mexique, pourraient bénéficier de l'avantage du terrain pour créer une surprise. Le Mexique, avec l'Estadio Azteca comme théâtre, a aussi des arguments. Le Canada est la plus belle surprise potentielle avec Alphonso Davies.",
  },
  {
    question: "Quels sont les outsiders (dark horses) pour la CDM 2026 ?",
    answer:
      "Le Maroc (demi-finaliste 2022), le Japon (régulièrement surprenant), la Colombie (en plein essor) et la Croatie (finaliste 2018) sont les outsiders les plus intéressants à surveiller pour ce Mondial.",
  },
  {
    question: "Comment sont calculées les probabilités de victoire ?",
    answer:
      "Nos probabilités sont calculées via un modèle ELO adapté au football international, combiné à des simulations Monte Carlo de l'ensemble du tournoi. Consultez notre page Méthodologie pour le détail du modèle.",
  },
  {
    question: "Quelle équipe a le meilleur bilan en Coupe du Monde ?",
    answer:
      "Le Brésil domine avec 5 titres (1958, 1962, 1970, 1994, 2002), suivi de l'Allemagne et l'Italie (4 chacun), l'Argentine et la France (2 chacun). En 2026, une victoire de la France lui permettrait de devenir troisième nation la plus titrée.",
  },
  {
    question: "L'avantage à domicile joue-t-il un rôle en Coupe du Monde ?",
    answer:
      "Historiquement, l'avantage du pays hôte est réel mais pas déterminant : sur 22 éditions, seules 6 nations hôtes ont remporté le titre (Uruguay 1930, Italie 1934, Angleterre 1966, Allemagne 1974, Argentine 1978, France 1998), soit un taux de 27%. En 2026, les États-Unis, le Canada et le Mexique bénéficieront de cet avantage, mais les grands favoris (Argentine, France, Espagne) restent favoris malgré tout.",
  },
];

export const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

export const top10 = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(0, 10)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter(
    (x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } =>
      x.team != null
  );

export const darkHorses = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(10, 16)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter(
    (x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } =>
      x.team != null
  );

export type ForecastStatus = "active" | "eliminated" | "champion";

export type LiveForecastPrediction = TeamPrediction & {
  baseWinnerProb: number;
  liveWinnerProb: number;
  deltaWinnerProb: number;
  stageMultiplier: number;
};

export type LiveForecastTeam = {
  pred: LiveForecastPrediction;
  team: Team;
  status: ForecastStatus;
  currentStageRank: number;
  currentStageLabel: string;
  knockoutWins: number;
  latestMatch?: string;
  eliminatedBy?: string;
};

export type LiveWinnerForecast = {
  top10: LiveForecastTeam[];
  darkHorses: LiveForecastTeam[];
  activeTeams: LiveForecastTeam[];
  eliminatedTeams: LiveForecastTeam[];
  leader?: LiveForecastTeam;
  updatedAt: string;
  started: boolean;
};

type ForecastMatch = Match & {
  homeName?: string;
  awayName?: string;
};

const knockoutStageRank: Record<Match["stage"], number> = {
  group: 0,
  "round-of-32": 1,
  "round-of-16": 2,
  "quarter-final": 3,
  "semi-final": 4,
  final: 5,
  "third-place": 0,
};

const stageLabels: Record<number, string> = {
  0: "Phase de groupes",
  1: "16es de finale",
  2: "8es de finale",
  3: "Quarts de finale",
  4: "Demi-finales",
  5: "Finale",
  6: "Champion",
};

const stageMultipliers: Record<number, number> = {
  0: 0.7,
  1: 1,
  2: 1.35,
  3: 1.9,
  4: 2.8,
  5: 4.2,
  6: 1,
};

function isResolvedTeamId(teamId: string | undefined) {
  return Boolean(teamId && !teamId.startsWith("tbd-"));
}

function getWinnerTeamId(match: Match) {
  if (match.status !== "finished") return null;
  if (isResolvedTeamId(match.winnerTeamId)) return match.winnerTeamId!;
  if (match.homeScore == null || match.awayScore == null) return null;

  if (match.homeScore > match.awayScore) return match.homeTeamId;
  if (match.awayScore > match.homeScore) return match.awayTeamId;
  if (match.winnerSide === "home") return match.homeTeamId;
  if (match.winnerSide === "away") return match.awayTeamId;
  return null;
}

function opponentName(match: ForecastMatch, teamId: string) {
  if (match.homeTeamId === teamId) return match.awayName ?? match.awayTeamId;
  if (match.awayTeamId === teamId) return match.homeName ?? match.homeTeamId;
  return undefined;
}

function getScoreLabel(match: Match) {
  if (match.homeScore == null || match.awayScore == null) return "";
  const penalties =
    match.penaltyHomeScore != null && match.penaltyAwayScore != null
      ? `, tirs au but ${match.penaltyHomeScore}-${match.penaltyAwayScore}`
      : "";
  return `${match.homeScore}-${match.awayScore}${penalties}`;
}

function computeTeamState(teamId: string, knockoutMatches: ForecastMatch[]) {
  let currentStageRank = 0;
  let latestMatch: string | undefined;
  let eliminatedBy: string | undefined;
  let knockoutWins = 0;
  let resultBoost = 1;

  for (const match of knockoutMatches) {
    const participates = match.homeTeamId === teamId || match.awayTeamId === teamId;
    if (!participates) continue;

    const stageRank = knockoutStageRank[match.stage] ?? 0;
    currentStageRank = Math.max(currentStageRank, stageRank);

    const opponent = opponentName(match, teamId);
    const score = getScoreLabel(match);
    latestMatch = opponent
      ? `${match.status === "finished" ? "Terminé" : "À venir"} vs ${opponent}${score ? ` (${score})` : ""}`
      : latestMatch;

    const winnerTeamId = getWinnerTeamId(match);
    if (winnerTeamId === teamId) {
      knockoutWins += 1;
      currentStageRank = Math.max(currentStageRank, stageRank + 1);
      const margin =
        match.homeScore != null && match.awayScore != null
          ? Math.abs(match.homeScore - match.awayScore)
          : 0;
      const wonOnPenalties =
        match.penaltyHomeScore != null && match.penaltyAwayScore != null;
      resultBoost *= wonOnPenalties ? 1.03 : margin >= 2 ? 1.12 : 1.07;
    } else if (winnerTeamId && match.status === "finished") {
      eliminatedBy = opponent;
    }
  }

  return {
    currentStageRank,
    currentStageLabel: stageLabels[Math.min(currentStageRank, 6)] ?? "En course",
    latestMatch,
    eliminatedBy,
    knockoutWins,
    resultBoost,
  };
}

function estimateFinalProb(winnerProb: number, currentStageRank: number) {
  if (currentStageRank >= 5) return 1;
  if (currentStageRank >= 4) return Math.min(0.95, winnerProb * 1.75);
  if (currentStageRank >= 3) return Math.min(0.9, winnerProb * 2.15);
  if (currentStageRank >= 2) return Math.min(0.82, winnerProb * 2.65);
  return Math.min(0.75, winnerProb * 3.05);
}

function estimateStageProb(
  winnerProb: number,
  currentStageRank: number,
  targetStageRank: number,
  fallback: number,
) {
  if (currentStageRank >= targetStageRank) return 1;
  return Math.max(fallback, Math.min(0.95, winnerProb * (targetStageRank + 1.2)));
}

export async function getLiveWinnerForecast(): Promise<LiveWinnerForecast> {
  const resolvedMatches = await getResolvedCalendarMatches();
  const knockoutMatches: ForecastMatch[] = resolvedMatches.filter(
    (match) => match.stage !== "group" && match.stage !== "third-place",
  );
  const started = knockoutMatches.some(
    (match) => match.status === "finished" || match.status === "live",
  );
  const teamsSeenInBracket = new Set<string>();
  const eliminatedTeamIds = new Set<string>();

  for (const match of knockoutMatches) {
    if (isResolvedTeamId(match.homeTeamId)) teamsSeenInBracket.add(match.homeTeamId);
    if (isResolvedTeamId(match.awayTeamId)) teamsSeenInBracket.add(match.awayTeamId);

    const winnerTeamId = getWinnerTeamId(match);
    if (!winnerTeamId) continue;

    if (match.homeTeamId !== winnerTeamId && isResolvedTeamId(match.homeTeamId)) {
      eliminatedTeamIds.add(match.homeTeamId);
    }
    if (match.awayTeamId !== winnerTeamId && isResolvedTeamId(match.awayTeamId)) {
      eliminatedTeamIds.add(match.awayTeamId);
    }
  }

  const hasBracket = teamsSeenInBracket.size > 0;
  const activeTeamIds = new Set<string>(
    hasBracket
      ? Array.from(teamsSeenInBracket).filter((teamId) => !eliminatedTeamIds.has(teamId))
      : teamPredictions.map((prediction) => prediction.teamId),
  );

  const scoredRows = teamPredictions
    .map((prediction) => {
      const team = teamsById[prediction.teamId];
      if (!team) return null;

      const teamState = computeTeamState(team.id, knockoutMatches);
      const isActive = activeTeamIds.has(team.id) && !teamState.eliminatedBy;
      const status: ForecastStatus = isActive ? "active" : "eliminated";
      const stageMultiplier =
        status === "active"
          ? stageMultipliers[Math.min(Math.max(teamState.currentStageRank, 1), 5)] ?? 1
          : 0;
      const seedScore =
        status === "active"
          ? Math.max(prediction.winnerProb, 0.00015) *
            stageMultiplier *
            teamState.resultBoost
          : 0;

      return {
        prediction,
        team,
        status,
        seedScore,
        ...teamState,
        stageMultiplier,
      };
    })
    .filter((row): row is NonNullable<typeof row> => row != null);

  const totalScore = scoredRows.reduce((sum, row) => sum + row.seedScore, 0);

  const rows: LiveForecastTeam[] = scoredRows.map((row) => {
    const liveWinnerProb =
      row.status === "active" && totalScore > 0 ? row.seedScore / totalScore : 0;
    const currentStageRank =
      row.status === "active" ? Math.max(row.currentStageRank, 1) : row.currentStageRank;

    const pred: LiveForecastPrediction = {
      ...row.prediction,
      roundOf32Prob: row.status === "active" ? 1 : 0,
      roundOf16Prob:
        row.status === "active"
          ? estimateStageProb(
              liveWinnerProb,
              currentStageRank,
              2,
              row.prediction.roundOf16Prob,
            )
          : 0,
      quarterFinalProb:
        row.status === "active"
          ? estimateStageProb(
              liveWinnerProb,
              currentStageRank,
              3,
              row.prediction.quarterFinalProb,
            )
          : 0,
      semiFinalProb:
        row.status === "active"
          ? estimateStageProb(
              liveWinnerProb,
              currentStageRank,
              4,
              row.prediction.semiFinalProb,
            )
          : 0,
      finalProb:
        row.status === "active"
          ? estimateFinalProb(liveWinnerProb, currentStageRank)
          : 0,
      winnerProb: liveWinnerProb,
      baseWinnerProb: row.prediction.winnerProb,
      liveWinnerProb,
      deltaWinnerProb: liveWinnerProb - row.prediction.winnerProb,
      stageMultiplier: row.stageMultiplier,
    };

    return {
      pred,
      team: row.team,
      status: row.status,
      currentStageRank,
      currentStageLabel:
        row.status === "active"
          ? stageLabels[Math.min(currentStageRank, 6)] ?? "En course"
          : "Éliminé",
      knockoutWins: row.knockoutWins,
      latestMatch: row.latestMatch,
      eliminatedBy: row.eliminatedBy,
    };
  });

  const activeTeams = rows
    .filter((row) => row.status === "active")
    .sort((a, b) => b.pred.winnerProb - a.pred.winnerProb);
  const eliminatedTeams = rows
    .filter((row) => row.status === "eliminated")
    .sort((a, b) => b.pred.baseWinnerProb - a.pred.baseWinnerProb);

  return {
    top10: activeTeams.slice(0, 10),
    darkHorses: activeTeams.slice(10, 16),
    activeTeams,
    eliminatedTeams,
    leader: activeTeams[0],
    updatedAt: new Date().toISOString(),
    started,
  };
}

export const teamArguments: Record<
  string,
  { pros: string[]; cons: string[] }
> = {
  argentine: {
    pros: [
      "Championne du monde en titre (Qatar 2022)",
      "Messi + Lautaro Martinez = duo redoutable",
      "Cohésion collective exceptionnelle",
      "Expérience des grands tournois",
    ],
    cons: [
      "Messi à 38 ans — jusqu'où tiendra-t-il ?",
      "Fragilité défensive potentielle",
      "Pression du statut de favori",
    ],
  },
  france: {
    pros: [
      "Effectif le plus profond du monde",
      "Mbappé au sommet de son art (Real Madrid)",
      "Double championne du monde (1998, 2018)",
      "Finaliste 2022 — faim de revanche",
    ],
    cons: [
      "Syndrome de la 3e place à éviter",
      "Griezmann à 35 ans — forme physique",
      "Pression médiatique intense en France",
    ],
  },
  espagne: {
    pros: [
      "Championne d'Europe 2024 (EURO)",
      "Jeu positionnel dominant (Pedri, Yamal)",
      "Excellente génération U23",
      "Lamine Yamal : phénomène à 18 ans",
    ],
    cons: [
      "Manque de vrai n°9 de référence",
      "Première CDM sans Benzema/Ramos",
      "Pression après victoire Euro 2024",
    ],
  },
  angleterre: {
    pros: [
      "Génération dorée avec Bellingham, Saka, Foden",
      "Finaliste Euro 2021, 2024",
      "Premier League : club world-class tous les postes",
    ],
    cons: [
      "La malédiction anglaise toujours présente",
      "Dernière victoire en 1966 (domicile)",
      "Sous-performer dans les grands tournois",
    ],
  },
  bresil: {
    pros: [
      "5 fois champion du monde — ADN gagnant",
      "Vinicius Jr au sommet de sa carrière",
      "Richesse offensive incomparable",
    ],
    cons: [
      "Sans Neymar blessé — leader manquant",
      "Défense moins solide qu'auparavant",
      "Pression des supporters brésiliens immense",
    ],
  },
  allemagne: {
    pros: [
      "Organisation et rigueur tactique légendaires",
      "4 fois champion du monde",
      "Relance réussie sous Nagelsmann",
    ],
    cons: [
      "Hors du Mondial 2026 en 8e depuis 2018",
      "Manque de joueur X-factor",
      "Transition générationnelle pas terminée",
    ],
  },
  portugal: {
    pros: [
      "Ronaldo + Félix + Neto = attaque de feu",
      "Génération 2024 très prometteuse",
      "3e place CDM 2022",
    ],
    cons: [
      "Ronaldo à 41 ans — quel impact réel ?",
      "Dépendance historique à CR7",
      "Défense parfois fragile",
    ],
  },
  "pays-bas": {
    pros: [
      "Van Dijk leader défensif mondial",
      "Classe à mi-terrain avec de Jong",
      "Demi-finaliste 2022",
    ],
    cons: [
      "Manque de joueur décisif en attaque",
      "Résultats CDM décevants depuis 2014",
    ],
  },
  belgique: {
    pros: [
      "Nouvelle génération talentueuse (De Ketelaere, Trossard)",
      "Expérience internationale",
    ],
    cons: [
      "Génération dorée (Hazard/De Bruyne) sur le déclin",
      "Jamais gagné de grand tournoi",
      "Manque de régularité",
    ],
  },
  colombie: {
    pros: [
      "James Rodriguez en grande forme",
      "Finaliste Copa América 2024",
      "Style de jeu spectaculaire",
    ],
    cons: [
      "N'a jamais dépassé les quarts de CDM",
      "Fragilité défensive",
      "Pression post-Copa América",
    ],
  },
};

export const whyTheyCanWin: Record<
  string,
  {
    narrative: string;
    keyPlayer: string;
    keyPlayerDesc: string;
    tacticalEdge: string;
    xFactor: string;
    betOdds: string;
  }
> = {
  argentine: {
    narrative:
      "L'Argentine aborde ce Mondial avec la sérénité du champion en titre. Malgré l'approche de la fin de carrière de Messi (38 ans en 2026), les Albicelestes ont démontré au Qatar qu'ils savent gagner collectivement. Lautaro Martinez, Di Maria et les nouvelles générations portent désormais ce projet. L'équipe de Scaloni a remporté 3 titres consécutifs (Copa América 2021, 2024, CDM 2022) — un momentum unique dans l'histoire du football.",
    keyPlayer: "Lautaro Martinez",
    keyPlayerDesc:
      "Buteur de l'Inter Milan, véritable machine à buts. Avec ou sans Messi, il peut faire la différence.",
    tacticalEdge:
      "Système 4-4-2 diamant ultra-rodé. L'Argentine est la nation la plus expérimentée en phases finales.",
    xFactor:
      "L'ADN gagnant post-Qatar 2022. Cette équipe sait comment soulever un trophée mondial.",
    betOdds: "5.50",
  },
  france: {
    narrative:
      "La France possède probablement l'effectif le plus profond de toutes les 48 nations. Champions du monde 1998 et 2018, finalistes en 2022 après avoir remonté un déficit improbable en finale contre l'Argentine, les Bleus ont faim de revanche. Mbappé (27 ans) est au sommet absolu de sa carrière au Real Madrid. La machine est prête, le talent est là — il ne manque que la réussite dans les tirs au but.",
    keyPlayer: "Kylian Mbappé",
    keyPlayerDesc:
      "Meilleur joueur du monde, champion de Liga. À 27 ans en 2026, il sera dans sa fenêtre optimale pour décrocher un titre mondial.",
    tacticalEdge:
      "Profondeur de banc incomparable : même le 12e joueur français serait titulaire dans la plupart des autres sélections.",
    xFactor:
      "La revanche de 2022. Perdre aux tirs au but en finale crée une motivation qui dure des années.",
    betOdds: "6.00",
  },
  bresil: {
    narrative:
      "5 étoiles, mais pas de titre depuis 2002 — la seleção souffre depuis 24 ans. Vinicius Jr. est l'un des meilleurs joueurs de la planète, mais l'absence de Neymar, blessé longue durée, est une plaie ouverte. Le Brésil a le talent offensif pour gagner, mais manque encore de l'équilibre défensif qui caractérise les grandes équipes championnes. Rodrigo, Endrick, Savinho : la nouvelle génération est prometteuse et affamée.",
    keyPlayer: "Vinicius Jr.",
    keyPlayerDesc:
      "Deux fois finaliste de Ligue des Champions, vainqueur de la Coupe du Monde des clubs. L'ailier du Real Madrid peut gagner un match à lui seul.",
    tacticalEdge:
      "Le Brésil attaque en permanence avec 4-5 joueurs offensifs de classe mondiale. Difficile de défendre une telle densité.",
    xFactor:
      "L'humiliation du 7-1 face à l'Allemagne en 2014 est encore dans toutes les mémoires. La pression nationale est le moteur de ce projet.",
    betOdds: "6.50",
  },
  angleterre: {
    narrative:
      "It's coming home ? La génération Bellingham-Saka-Foden est peut-être la plus talentueuse depuis 1966. Finalistes de l'Euro 2021 et 2024, les Three Lions ont le mental des grandes occasions mais semblent bloqués dans les demi-finales depuis des années. En 2026, avec une expérience supplémentaire, le groupe de Southgate (ou son successeur) pourrait franchir le cap décisif. La Premier League offre aux joueurs anglais une intensité de jeu qui les prépare parfaitement aux tournois.",
    keyPlayer: "Jude Bellingham",
    keyPlayerDesc:
      "Milieu offensif du Real Madrid, Ballon d'Or potentiel. À 22 ans en 2026, il sera au sommet absolu de sa puissance physique.",
    tacticalEdge:
      "Bloc défensif solide + transitions rapides avec des ailiers de vitesse. L'Angleterre ne donne rien.",
    xFactor:
      "Briser 60 ans de disette serait l'événement footballistique du siècle en Angleterre. La motivation est absolue.",
    betOdds: "7.00",
  },
  allemagne: {
    narrative:
      "La Mannschaft est en reconstruction depuis l'humiliation du premier tour en 2018 et 2022. Sous Nagelsmann, le projet de relance est encourageant : nouveau style de jeu basculant entre pressing intensif et possession. L'Allemagne a retrouvé du mordant lors de l'Euro 2024 à domicile. Florian Wirtz (Bayer Leverkusen) est l'élément créatif qui manquait à cette équipe. 4 titres mondiaux en franchise — l'Allemagne a l'ADN pour un 5e.",
    keyPlayer: "Florian Wirtz",
    keyPlayerDesc:
      "Le meilleur numéro 10 de sa génération en Bundesliga. Technique, créatif, décisif. Le joueur qui redonne de la magie à l'Allemagne.",
    tacticalEdge:
      "Organisation collective sans failles, discipline tactique légendaire. L'Allemagne ne perd jamais par négligence.",
    xFactor:
      "L'effet rebond après deux premiers tours ratés. Les Allemands ont une culture de la résilience unique dans le football mondial.",
    betOdds: "8.00",
  },
};

export const cdmHomeStats = [
  {
    year: 1930,
    host: "Uruguay",
    winner: "Uruguay",
    hostWon: true,
    hostFlag: "🇺🇾",
    note: "Première CDM",
  },
  {
    year: 1934,
    host: "Italie",
    winner: "Italie",
    hostWon: true,
    hostFlag: "🇮🇹",
    note: "Organisation fasciste",
  },
  {
    year: 1938,
    host: "France",
    winner: "Italie",
    hostWon: false,
    hostFlag: "🇫🇷",
    note: "Italie bis répetita",
  },
  {
    year: 1950,
    host: "Brésil",
    winner: "Uruguay",
    hostWon: false,
    hostFlag: "🇧🇷",
    note: "Le Maracanazo, drame brésilien",
  },
  {
    year: 1954,
    host: "Suisse",
    winner: "Allemagne",
    hostWon: false,
    hostFlag: "🇨🇭",
    note: "Miracle de Berne",
  },
  {
    year: 1958,
    host: "Suède",
    winner: "Brésil",
    hostWon: false,
    hostFlag: "🇸🇪",
    note: "1er titre Brésil, 17 ans Pelé",
  },
  {
    year: 1962,
    host: "Chili",
    winner: "Brésil",
    hostWon: false,
    hostFlag: "🇨🇱",
    note: "Brésil confirme",
  },
  {
    year: 1966,
    host: "Angleterre",
    winner: "Angleterre",
    hostWon: true,
    hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    note: "Seul titre anglais",
  },
  {
    year: 1970,
    host: "Mexique",
    winner: "Brésil",
    hostWon: false,
    hostFlag: "🇲🇽",
    note: "Brésil légendaire de Pelé",
  },
  {
    year: 1974,
    host: "Allemagne",
    winner: "Allemagne",
    hostWon: true,
    hostFlag: "🇩🇪",
    note: "Beck­enbauer capitaine",
  },
  {
    year: 1978,
    host: "Argentine",
    winner: "Argentine",
    hostWon: true,
    hostFlag: "🇦🇷",
    note: "1er titre argentin",
  },
  {
    year: 1982,
    host: "Espagne",
    winner: "Italie",
    hostWon: false,
    hostFlag: "🇪🇸",
    note: "Rossi en feu",
  },
  {
    year: 1986,
    host: "Mexique",
    winner: "Argentine",
    hostWon: false,
    hostFlag: "🇲🇽",
    note: "La main de Dieu",
  },
  {
    year: 1990,
    host: "Italie",
    winner: "Allemagne",
    hostWon: false,
    hostFlag: "🇮🇹",
    note: "Nuit de Rome",
  },
  {
    year: 1994,
    host: "États-Unis",
    winner: "Brésil",
    hostWon: false,
    hostFlag: "🇺🇸",
    note: "Brésil aux pénaltys",
  },
  {
    year: 1998,
    host: "France",
    winner: "France",
    hostWon: true,
    hostFlag: "🇫🇷",
    note: "Zidane x2, fête nationale",
  },
  {
    year: 2002,
    host: "Japon/Corée",
    winner: "Brésil",
    hostWon: false,
    hostFlag: "🇯🇵🇰🇷",
    note: "Ronaldo ressuscite",
  },
  {
    year: 2006,
    host: "Allemagne",
    winner: "Italie",
    hostWon: false,
    hostFlag: "🇩🇪",
    note: "Zidane coup de boule",
  },
  {
    year: 2010,
    host: "Afrique du Sud",
    winner: "Espagne",
    hostWon: false,
    hostFlag: "🇿🇦",
    note: "Tiki-taka espagnol",
  },
  {
    year: 2014,
    host: "Brésil",
    winner: "Allemagne",
    hostWon: false,
    hostFlag: "🇧🇷",
    note: "Le 7-1, Mineirazo",
  },
  {
    year: 2018,
    host: "Russie",
    winner: "France",
    hostWon: false,
    hostFlag: "🇷🇺",
    note: "Mbappé explose au monde",
  },
  {
    year: 2022,
    host: "Qatar",
    winner: "Argentine",
    hostWon: false,
    hostFlag: "🇶🇦",
    note: "Messi sacré, finale épique",
  },
];

export const homeWins = cdmHomeStats.filter((s) => s.hostWon).length;
export const totalEditions = cdmHomeStats.length;
export const homeWinPct = Math.round((homeWins / totalEditions) * 100);
