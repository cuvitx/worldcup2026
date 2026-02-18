// ============================================================================
// Match Preview Generator
// Orchestrates: API data → context building → AI generation → structured output
//
// Flow: Static data + API data → Gemini 3 Flash (standard) or Claude (expert)
// ============================================================================

import { teamsById, matchesBySlug, stadiumsById } from "@repo/data";
import { matchPredictionByPair, h2hByPair } from "@repo/data";
import { getApiTeamId } from "@repo/data/api-football-ids";
import { getTeamStats, getInjuries } from "@repo/api/football";
import { getWeatherForecast } from "@repo/api/weather";
import { getOddsForMatch } from "@repo/api/odds";
import { getAltitudeImpact } from "@repo/api/factors";
import { generateMatchPreview, generateExpertInsight, type ExpertInsight, type ParsedMatchPreview } from "../orchestrator";

export interface MatchPreviewData {
  /** Gemini-generated SEO preview (parsed JSON with structured fields) */
  preview: ParsedMatchPreview | null;
  /** Claude-generated expert analysis (value bets) — only for top matches */
  expert: ExpertInsight | null;
  /** Weather data for the match */
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  } | null;
  /** Real bookmaker odds */
  odds: Array<{
    bookmaker: string;
    home: number;
    draw: number;
    away: number;
  }>;
  /** Injury data for both teams */
  injuries: {
    home: Array<{ player: string; reason: string; type: string }>;
    away: Array<{ player: string; reason: string; type: string }>;
  };
  /** Data source flags */
  sources: {
    hasLiveOdds: boolean;
    hasWeather: boolean;
    hasInjuries: boolean;
    hasExpertAnalysis: boolean;
  };
}

/**
 * Generate a complete match preview combining API data and AI analysis.
 *
 * This is the main entry point for match pages. It:
 * 1. Fetches real-time data from APIs (odds, weather, injuries)
 * 2. Builds a rich context string
 * 3. Calls Gemini 3 Flash for SEO content (every match)
 * 4. Optionally calls Claude Opus 4.6 for expert analysis (top matches only)
 */
export async function generateFullMatchPreview(
  matchSlug: string,
  language: "fr" | "en" | "es",
  options?: { includeExpert?: boolean }
): Promise<MatchPreviewData> {
  const match = matchesBySlug[matchSlug];
  if (!match) return emptyPreview();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  if (!home || !away) return emptyPreview();

  // Fetch all API data in parallel
  const homeApiId = getApiTeamId(match.homeTeamId);
  const awayApiId = getApiTeamId(match.awayTeamId);

  const [
    homeStats,
    awayStats,
    homeInjuries,
    awayInjuries,
    weather,
    matchOdds,
  ] = await Promise.all([
    homeApiId ? getTeamStats(homeApiId) : Promise.resolve(null),
    awayApiId ? getTeamStats(awayApiId) : Promise.resolve(null),
    homeApiId ? getInjuries(homeApiId) : Promise.resolve([]),
    awayApiId ? getInjuries(awayApiId) : Promise.resolve([]),
    stadium ? getWeatherForecast(stadium.latitude, stadium.longitude, match.date) : Promise.resolve(null),
    getOddsForMatch(home.name, away.name),
  ]);

  // Map odds from MatchOdds to our flat format
  const odds = matchOdds?.bookmakers.map(b => ({
    bookmaker: b.name,
    home: b.homeWin,
    draw: b.draw,
    away: b.awayWin,
  })) ?? [];

  // Build static context
  const prediction = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
  const h2hKey = `${match.homeTeamId}:${match.awayTeamId}`;
  const h2h = h2hByPair[h2hKey];
  const altitude = stadium ? getAltitudeImpact(stadium.slug) : null;

  // Build rich context for AI
  const context = buildMatchContext({
    home, away, stadium, match,
    homeStats, awayStats,
    homeInjuries, awayInjuries,
    weather, odds, prediction, h2h: h2h ? {
      totalMatches: h2h.totalMatches, team1Wins: h2h.team1Wins, team2Wins: h2h.team2Wins, draws: h2h.draws,
    } : undefined, altitude,
  });

  // Generate SEO preview with Gemini (every match)
  const preview = await generateMatchPreview(matchSlug, context, language);

  // Generate expert analysis with Claude (only if requested — cost control)
  let expert: ExpertInsight | null = null;
  if (options?.includeExpert) {
    expert = await generateExpertInsight(matchSlug, {
      teams: `${home.name} vs ${away.name}`,
      elo: `${home.name}: ELO ${prediction?.team1WinProb ? Math.round(prediction.team1WinProb * 2000) : "N/A"} | ${away.name}: ELO ${prediction?.team2WinProb ? Math.round(prediction.team2WinProb * 2000) : "N/A"}`,
      h2h: h2h ? `${h2h.totalMatches} matchs joues. ${home.name}: ${h2h.team1Wins} victoires, ${away.name}: ${h2h.team2Wins} victoires, ${h2h.draws} nuls` : "Pas d'historique",
      weather: weather ? `${weather.temperature}°C, ${weather.condition}, Humidite: ${weather.humidity}%, Vent: ${weather.windSpeed} km/h` : "Non disponible",
      altitude: altitude ? `${altitude.altitude}m - ${altitude.description}` : "Niveau mer",
      travel: "A calculer selon les confederations",
      injuries: `${home.name}: ${homeInjuries.map(i => i.player.name).join(", ") || "Aucune"} | ${away.name}: ${awayInjuries.map(i => i.player.name).join(", ") || "Aucune"}`,
      odds: odds.length > 0 ? odds.map(o => `${o.bookmaker}: ${o.home}/${o.draw}/${o.away}`).join(" | ") : "Non disponible",
      form: `${home.name}: ${homeStats?.form ?? "N/A"} | ${away.name}: ${awayStats?.form ?? "N/A"}`,
    });
  }

  return {
    preview,
    expert,
    weather: weather ? {
      temperature: weather.temperature,
      condition: weather.condition,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
    } : null,
    odds,
    injuries: {
      home: homeInjuries.map(i => ({ player: i.player.name, reason: i.reason, type: i.type })),
      away: awayInjuries.map(i => ({ player: i.player.name, reason: i.reason, type: i.type })),
    },
    sources: {
      hasLiveOdds: odds.length > 0,
      hasWeather: weather !== null,
      hasInjuries: homeInjuries.length > 0 || awayInjuries.length > 0,
      hasExpertAnalysis: expert !== null,
    },
  };
}

function emptyPreview(): MatchPreviewData {
  return {
    preview: null, expert: null, weather: null,
    odds: [], injuries: { home: [], away: [] },
    sources: { hasLiveOdds: false, hasWeather: false, hasInjuries: false, hasExpertAnalysis: false },
  };
}

function buildMatchContext(data: {
  home: { name: string; fifaRanking: number; confederation: string; wcAppearances: number; bestResult: string };
  away: { name: string; fifaRanking: number; confederation: string; wcAppearances: number; bestResult: string };
  stadium: { name: string; city: string; capacity: number } | undefined;
  match: { date: string; time: string; stage: string; group?: string };
  homeStats: { form?: string; goals?: { for: { total: { total: number } } } } | null;
  awayStats: { form?: string; goals?: { for: { total: { total: number } } } } | null;
  homeInjuries: Array<{ player: { name: string }; reason: string }>;
  awayInjuries: Array<{ player: { name: string }; reason: string }>;
  weather: { temperature: number; condition: string } | null;
  odds: Array<{ bookmaker: string; home: number; draw: number; away: number }>;
  prediction: { team1WinProb: number; drawProb: number; team2WinProb: number; predictedScore: string } | undefined;
  h2h: { totalMatches: number; team1Wins: number; team2Wins: number; draws: number } | undefined;
  altitude: { altitude: number; description: string } | null;
}): string {
  const lines: string[] = [];

  lines.push(`Match: ${data.home.name} vs ${data.away.name}`);
  lines.push(`Date: ${data.match.date} ${data.match.time} UTC`);
  lines.push(`Stage: ${data.match.stage}${data.match.group ? ` (Group ${data.match.group})` : ""}`);
  if (data.stadium) lines.push(`Venue: ${data.stadium.name}, ${data.stadium.city} (${data.stadium.capacity} capacity)`);

  lines.push(`\n--- ${data.home.name} ---`);
  lines.push(`FIFA Ranking: #${data.home.fifaRanking} | Confederation: ${data.home.confederation}`);
  lines.push(`WC Appearances: ${data.home.wcAppearances} | Best: ${data.home.bestResult}`);
  if (data.homeStats?.form) lines.push(`Form: ${data.homeStats.form}`);
  if (data.homeInjuries.length > 0) lines.push(`Injuries: ${data.homeInjuries.map(i => `${i.player.name} (${i.reason})`).join(", ")}`);

  lines.push(`\n--- ${data.away.name} ---`);
  lines.push(`FIFA Ranking: #${data.away.fifaRanking} | Confederation: ${data.away.confederation}`);
  lines.push(`WC Appearances: ${data.away.wcAppearances} | Best: ${data.away.bestResult}`);
  if (data.awayStats?.form) lines.push(`Form: ${data.awayStats.form}`);
  if (data.awayInjuries.length > 0) lines.push(`Injuries: ${data.awayInjuries.map(i => `${i.player.name} (${i.reason})`).join(", ")}`);

  if (data.h2h) lines.push(`\nH2H: ${data.h2h.totalMatches} matches — ${data.home.name}: ${data.h2h.team1Wins}W, ${data.away.name}: ${data.h2h.team2Wins}W, ${data.h2h.draws}D`);
  if (data.prediction) lines.push(`Model: ${data.home.name} ${Math.round(data.prediction.team1WinProb * 100)}% | Draw ${Math.round(data.prediction.drawProb * 100)}% | ${data.away.name} ${Math.round(data.prediction.team2WinProb * 100)}% — Predicted: ${data.prediction.predictedScore}`);
  if (data.weather) lines.push(`Weather: ${data.weather.temperature}°C, ${data.weather.condition}`);
  if (data.altitude) lines.push(`Altitude: ${data.altitude.altitude}m — ${data.altitude.description}`);
  if (data.odds.length > 0) lines.push(`Odds: ${data.odds.slice(0, 3).map(o => `${o.bookmaker}: ${o.home}/${o.draw}/${o.away}`).join(" | ")}`);

  return lines.join("\n");
}
