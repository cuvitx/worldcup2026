// ============================================================================
// Team Analysis Generator
// Enriches team pages with API data + AI-generated analysis
// ============================================================================

import { teamsById, playersByTeamId, predictionsByTeamId } from "@repo/data";
import { getApiTeamId } from "@repo/data/api-football-ids";
import { getTeamStats, getInjuries } from "@repo/api/football";
import { generateTeamAnalysis } from "../orchestrator";

export interface TeamAnalysisData {
  /** Gemini-generated team analysis */
  analysis: { content: string } | null;
  /** Live team form from API */
  form: string | null;
  /** Current injuries */
  injuries: Array<{ player: string; reason: string; type: string }>;
  /** Goal stats from API */
  goalStats: {
    scored: number;
    conceded: number;
    cleanSheets: number;
  } | null;
  sources: {
    hasLiveStats: boolean;
    hasInjuries: boolean;
    hasAiAnalysis: boolean;
  };
}

/**
 * Generate enriched team analysis combining static data, API stats, and AI.
 */
export async function generateFullTeamAnalysis(
  teamSlug: string,
  language: "fr" | "en" | "es"
): Promise<TeamAnalysisData> {
  const team = teamsById[teamSlug];
  if (!team) return emptyAnalysis();

  const apiId = getApiTeamId(teamSlug);
  const prediction = predictionsByTeamId[teamSlug];
  const players = playersByTeamId[teamSlug] ?? [];

  // Fetch API data
  const [stats, injuries] = await Promise.all([
    apiId ? getTeamStats(apiId) : Promise.resolve(null),
    apiId ? getInjuries(apiId) : Promise.resolve([]),
  ]);

  // Build context for AI
  const context = [
    `Team: ${team.name} (${team.code})`,
    `FIFA Ranking: #${team.fifaRanking} | ${team.confederation}`,
    `WC Appearances: ${team.wcAppearances} | Best: ${team.bestResult}`,
    `Group: ${team.group}`,
    stats?.form ? `Current Form: ${stats.form}` : "",
    prediction ? `Win probability: ${Math.round(prediction.winnerProb * 100)}%` : "",
    `Key players: ${players.slice(0, 5).map(p => `${p.name} (${p.position}, ${p.club})`).join(", ")}`,
    injuries.length > 0 ? `Injuries: ${injuries.map(i => `${i.player.name} - ${i.reason}`).join(", ")}` : "",
    team.description,
  ].filter(Boolean).join("\n");

  // Generate AI analysis with Gemini
  const analysis = await generateTeamAnalysis(teamSlug, context, language);

  return {
    analysis,
    form: stats?.form ?? null,
    injuries: injuries.map(i => ({ player: i.player.name, reason: i.reason, type: i.type })),
    goalStats: stats ? {
      scored: stats.goals.for.total.total,
      conceded: stats.goals.against.total.total,
      cleanSheets: stats.clean_sheet.total,
    } : null,
    sources: {
      hasLiveStats: stats !== null,
      hasInjuries: injuries.length > 0,
      hasAiAnalysis: analysis !== null,
    },
  };
}

function emptyAnalysis(): TeamAnalysisData {
  return {
    analysis: null, form: null, injuries: [], goalStats: null,
    sources: { hasLiveStats: false, hasInjuries: false, hasAiAnalysis: false },
  };
}
