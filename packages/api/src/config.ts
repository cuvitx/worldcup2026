// ============================================================================
// API Configuration — Centralized endpoints, keys, and rate limits
// ============================================================================

export const API_FOOTBALL = {
  baseUrl: "https://v3.football.api-sports.io",
  key: process.env.API_FOOTBALL_KEY ?? "",
  /** Free tier: 100 requests/day */
  rateLimitPerDay: 100,
  /** World Cup 2026 league ID in API-Football */
  worldCupLeagueId: 1,
  /** World Cup 2026 season */
  season: 2026,
} as const;

export const OPENWEATHER = {
  baseUrl: "https://api.openweathermap.org/data/3.0",
  key: process.env.OPENWEATHERMAP_KEY ?? "",
  /** Free tier: 1000 calls/day */
  rateLimitPerDay: 1000,
} as const;

export const ODDS_API = {
  baseUrl: "https://api.the-odds-api.com/v4",
  key: process.env.THE_ODDS_API_KEY ?? "",
  /** Free tier: 500 requests/month */
  rateLimitPerMonth: 500,
  sport: "soccer_fifa_world_cup",
} as const;
