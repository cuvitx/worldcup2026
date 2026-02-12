// ============================================================================
// @repo/api — Unified data service layer
// Fetches real-time data from external APIs and merges with static data.
// ============================================================================

// Football data
export {
  getTeamStats,
  getInjuries,
  getLineup,
  getLiveFixtures,
  getFixtureEvents,
  getWorldCupFixtures,
} from "./football/client";
export { enrichTeamFromApi, mapInjuries } from "./football/mappers";

// Weather
export { getWeatherForecast } from "./weather/client";
export { getWeatherImpact } from "./weather/match-weather";

// Odds
export { getMatchOdds, getOutrightOdds, getOddsForMatch } from "./odds/client";

// Multi-factor analysis
export { getAltitudeImpact, venueAltitudes } from "./factors/altitude";
export { getTravelFatigue, cityTimezones } from "./factors/travel";
export { getVenueContext, isWeatherProtected } from "./factors/venue-history";

// Cache utilities
export { cachedFetch, cacheGet, cacheSet, CACHE_TTL } from "./cache";

// Config
export { API_FOOTBALL, OPENWEATHER, ODDS_API } from "./config";
