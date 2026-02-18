// ============================================================================
// Scorer Odds — Estimated goal-scoring probabilities for the tournament
// Based on goals/caps ratio, position, and expected matches (minimum 3 group games)
// ============================================================================

import { players, playersByTeamId } from "./players";
import { teamsById } from "./teams";
import { predictionsByTeamId } from "./predictions";
import type { Player } from "./types";

export interface ScorerOdds {
  playerId: string;
  goalsPerCap: number;          // career ratio
  expectedGoals: number;        // expected goals in the tournament
  anytimeScorerProb: number;    // probability of scoring at least 1 goal
  anytimeScorerOdds: string;    // decimal odds
  topScorerProb: number;        // probability of being tournament top scorer
  topScorerOdds: string;        // decimal odds
  over05GoalsOdds: string;      // same as anytime scorer
  over15GoalsOdds: string;      // 2+ goals odds
  over25GoalsOdds: string;      // 3+ goals odds
}

// Position multiplier for goal expectation
const positionMultiplier: Record<string, number> = {
  FW: 1.0,
  MF: 0.55,
  DF: 0.15,
  GK: 0.02,
};

// Calculate expected matches based on team strength (ELO prediction)
function expectedMatches(teamId: string): number {
  const pred = predictionsByTeamId[teamId];
  if (!pred) return 3; // minimum: group stage

  // Weight each round by probability of reaching it × matches in that round
  const groupMatches = 3;
  const r32 = pred.roundOf32Prob * 1;
  const r16 = pred.roundOf16Prob * 1;
  const qf = pred.quarterFinalProb * 1;
  const sf = pred.semiFinalProb * 1;
  const fin = pred.finalProb * 1;

  return groupMatches + r32 + r16 + qf + sf + fin;
}

function oddsFromProb(prob: number): string {
  if (prob <= 0) return "—";
  const margin = 1.08;
  const odds = 1 / (prob / margin);
  return odds >= 500 ? "—" : odds.toFixed(2);
}

// Poisson probability of scoring k goals given expected rate lambda
function poissonProb(k: number, lambda: number): number {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function calculateScorerOdds(player: Player): ScorerOdds {
  const goalsPerCap = player.caps > 0 ? player.goals / player.caps : 0;
  const posMult = positionMultiplier[player.position] ?? 0.1;
  const expMatches = expectedMatches(player.teamId);

  // Expected goals = goals per cap * position multiplier * expected matches
  // For strikers, this is roughly goals/cap * matches
  // For midfielders, scaled down by ~45%
  const rawExpGoals = goalsPerCap * posMult * expMatches;

  // Clamp to reasonable range: min 0.05 for any FW/MF, max ~8
  const expectedGoals = Math.max(
    player.position === "FW" ? 0.3 : player.position === "MF" ? 0.1 : 0.05,
    Math.min(8, rawExpGoals)
  );

  // Anytime scorer: P(X >= 1) = 1 - P(X = 0) using Poisson
  const anytimeScorerProb = 1 - poissonProb(0, expectedGoals);

  // Over 1.5: P(X >= 2) = 1 - P(0) - P(1)
  const over15Prob = 1 - poissonProb(0, expectedGoals) - poissonProb(1, expectedGoals);

  // Over 2.5: P(X >= 3)
  const over25Prob = 1 - poissonProb(0, expectedGoals) - poissonProb(1, expectedGoals) - poissonProb(2, expectedGoals);

  // Top scorer probability: simplified estimate based on expected goals rank
  // Real calculation would require simulation, this is an approximation
  const topScorerProb = Math.pow(expectedGoals / 5, 2.5) * 0.15;
  const clampedTopScorer = Math.max(0.0001, Math.min(0.25, topScorerProb));

  return {
    playerId: player.id,
    goalsPerCap: Math.round(goalsPerCap * 1000) / 1000,
    expectedGoals: Math.round(expectedGoals * 100) / 100,
    anytimeScorerProb: Math.round(anytimeScorerProb * 1000) / 1000,
    anytimeScorerOdds: oddsFromProb(anytimeScorerProb),
    topScorerProb: Math.round(clampedTopScorer * 10000) / 10000,
    topScorerOdds: oddsFromProb(clampedTopScorer),
    over05GoalsOdds: oddsFromProb(anytimeScorerProb),
    over15GoalsOdds: oddsFromProb(over15Prob),
    over25GoalsOdds: oddsFromProb(over25Prob),
  };
}

// All scorer players (FW + MF only for betting relevance, but compute all)
export const scorerPlayers = players.filter(
  (p: Player) => p.position === "FW" || p.position === "MF"
);

// Computed scorer odds for all FW + MF players
export const scorerOdds: ScorerOdds[] = scorerPlayers
  .map(calculateScorerOdds)
  .sort((a: ScorerOdds, b: ScorerOdds) => b.expectedGoals - a.expectedGoals);

// Lookup maps
export const scorerOddsById: Record<string, ScorerOdds> = {};
for (const so of scorerOdds) {
  scorerOddsById[so.playerId] = so;
}

// Top scorer ranking (top 50)
export const topScorerRanking = [...scorerOdds]
  .sort((a, b) => b.topScorerProb - a.topScorerProb)
  .slice(0, 50);

// By team: all scorers grouped by team
export const scorersByTeam: Record<string, ScorerOdds[]> = {};
for (const so of scorerOdds) {
  const player = players.find((p: Player) => p.id === so.playerId);
  if (player) {
    if (!scorersByTeam[player.teamId]) {
      scorersByTeam[player.teamId] = [];
    }
    scorersByTeam[player.teamId]!.push(so);
  }
}
