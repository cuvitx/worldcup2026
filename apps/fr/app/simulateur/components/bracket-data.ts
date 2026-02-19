import { teams as allTeams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import type { TeamInfo, MatchData, RoundName } from "./types";

const teamsMap = new Map(allTeams.map((t) => [t.id, t]));

export function getGroupTeamsSortedByRanking(groupLetter: string): TeamInfo[] {
  const group = groups.find((g) => g.letter === groupLetter);
  if (!group) return [];
  return group.teams
    .map((id) => teamsMap.get(id))
    .filter(Boolean)
    .sort((a, b) => {
      if (a!.fifaRanking === 0) return 1;
      if (b!.fifaRanking === 0) return -1;
      return a!.fifaRanking - b!.fifaRanking;
    })
    .map((t) => ({
      id: t!.id,
      name: t!.name,
      flag: t!.flag,
      code: t!.code,
      fifaRanking: t!.fifaRanking,
    }));
}

function getQualifiedTeams() {
  const firstByGroup: Record<string, TeamInfo> = {};
  const secondByGroup: Record<string, TeamInfo> = {};
  const thirds: TeamInfo[] = [];

  for (const g of groups) {
    const sorted = getGroupTeamsSortedByRanking(g.letter);
    if (sorted[0]) firstByGroup[g.letter] = sorted[0];
    if (sorted[1]) secondByGroup[g.letter] = sorted[1];
    if (sorted[2]) thirds.push(sorted[2]);
  }

  const bestThirds = thirds
    .sort((a, b) => {
      if (a.fifaRanking === 0) return 1;
      if (b.fifaRanking === 0) return -1;
      return a.fifaRanking - b.fifaRanking;
    })
    .slice(0, 8);

  return { firstByGroup, secondByGroup, bestThirds };
}

export function buildR32Matches(): MatchData[] {
  const { firstByGroup, secondByGroup, bestThirds } = getQualifiedTeams();

  const pairings: [string, string][] = [
    ["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"],
    ["I", "J"], ["K", "L"], ["B", "A"], ["D", "C"],
    ["F", "E"], ["H", "G"], ["J", "I"], ["L", "K"],
  ];

  const matches: MatchData[] = pairings.map(([g1, g2], i) => ({
    id: `R32-${i}`,
    team1: firstByGroup[g1] || null,
    team2: secondByGroup[g2] || null,
    winner: null,
  }));

  for (let i = 0; i < 4; i++) {
    matches.push({
      id: `R32-${12 + i}`,
      team1: bestThirds[i] || null,
      team2: bestThirds[7 - i] || null,
      winner: null,
    });
  }

  return matches;
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

const LS_KEY = "cdm2026-bracket-v2";

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
