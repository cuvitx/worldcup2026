// ============================================================================
// The Odds API response types
// https://the-odds-api.com/liveapi/guides/v4/
// ============================================================================

export interface OddsApiResponse {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: OddsBookmaker[];
}

export interface OddsBookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: OddsMarket[];
}

export interface OddsMarket {
  key: string; // "h2h", "spreads", "totals"
  last_update: string;
  outcomes: OddsOutcome[];
}

export interface OddsOutcome {
  name: string; // team name or "Draw"
  price: number; // decimal odds
}

/** Simplified match odds for internal use */
export interface MatchOdds {
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  bookmakers: Array<{
    name: string;
    homeWin: number;
    draw: number;
    awayWin: number;
    lastUpdate: string;
  }>;
  /** Average odds across all bookmakers */
  average: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

/** Outright tournament winner odds */
export interface OutrightOdds {
  bookmaker: string;
  outcomes: Array<{
    team: string;
    odds: number;
  }>;
  lastUpdate: string;
}
