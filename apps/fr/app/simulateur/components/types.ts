export interface TeamInfo {
  id: string;
  name: string;
  flag: string;
  code: string;
  fifaRanking: number;
}

export interface MatchData {
  id: string;
  team1: TeamInfo | null;
  team2: TeamInfo | null;
  winner: string | null;
}

export type RoundName = "R32" | "R16" | "QF" | "SF" | "F";

export const ROUND_LABELS: Record<RoundName, string> = {
  R32: "32e de finale",
  R16: "16e de finale",
  QF: "Quarts",
  SF: "Demis",
  F: "Finale",
};

export const ROUND_COLORS: Record<RoundName, string> = {
  R32: "bg-slate-500",
  R16: "bg-secondary",
  QF: "bg-primary",
  SF: "bg-primary",
  F: "bg-secondary",
};

export const ROUND_ORDER: RoundName[] = ["R32", "R16", "QF", "SF", "F"];
