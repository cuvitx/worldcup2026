export type {
  Team,
  Group,
  Match,
  Stadium,
  City,
  Player,
  H2HRecord,
  Odds,
  Confederation,
} from "./types";

export { teams, teamsById, teamsBySlug } from "./teams";
export { groups, groupsByLetter, groupsBySlug } from "./groups";
export { stadiums, stadiumsById, stadiumsBySlug } from "./stadiums";
export { cities, citiesById, citiesBySlug } from "./cities";
export { players, playersById, playersBySlug, playersByTeamId } from "./players";
export { matches, matchesById, matchesBySlug, matchesByGroup, matchesByStadium } from "./matches";
export { h2hRecords, h2hByPair } from "./h2h";
export type { TeamPrediction, MatchPrediction } from "./predictions";
export { teamPredictions, predictionsByTeamId, matchPredictions, matchPredictionByPair } from "./predictions";
