import { teamsById } from "@repo/data/teams";
import type { TeamInfo, MatchData, RoundName } from "./types";

const officialR32TeamIds: Array<[string, string]> = [
  ["afrique-du-sud", "canada"],
  ["bresil", "japon"],
  ["allemagne", "paraguay"],
  ["pays-bas", "maroc"],
  ["cote-divoire", "norvege"],
  ["france", "suede"],
  ["mexique", "equateur"],
  ["angleterre", "rd-congo"],
  ["belgique", "senegal"],
  ["etats-unis", "bosnie-herzegovine"],
  ["espagne", "autriche"],
  ["portugal", "croatie"],
  ["suisse", "algerie"],
  ["australie", "egypte"],
  ["argentine", "cap-vert"],
  ["colombie", "ghana"],
];

function toTeamInfo(teamId: string): TeamInfo | null {
  const team = teamsById[teamId];
  if (!team) return null;

  return {
    id: team.id,
    name: team.name,
    flag: team.flag,
    code: team.code,
    fifaRanking: team.fifaRanking,
  };
}

export function buildR32Matches(): MatchData[] {
  return officialR32TeamIds.map(([team1Id, team2Id], i) => ({
    id: `R32-${i}`,
    team1: toTeamInfo(team1Id),
    team2: toTeamInfo(team2Id),
    winner: null,
  }));
}

export function buildEmptyMatches(round: RoundName, count: number): MatchData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${round}-${i}`,
    team1: null,
    team2: null,
    winner: null,
  }));
}

// ---------------------------------------------------------------------------
// LocalStorage
// ---------------------------------------------------------------------------

const LS_KEY = "cdm2026-bracket-v4";

interface SavedState {
  rounds: Record<RoundName, MatchData[]>;
}

export function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch {
    return null;
  }
}

export function saveState(state: SavedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch { /* quota */ }
}

export function clearState() {
  if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
}
