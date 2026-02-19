export type Confederation = "UEFA" | "CONMEBOL" | "CAF" | "AFC" | "CONCACAF" | "OFC";

export interface Team {
  id: string;
  name: string;
  slug: string;
  code: string; // FIFA country code (3 letters)
  flag: string; // emoji flag
  confederation: Confederation;
  fifaRanking: number;
  group: string;
  isHost: boolean;
  wcAppearances: number;
  bestResult: string;
  description: string;
}

export interface Group {
  letter: string;
  slug: string;
  teams: string[]; // team ids
}

export interface Match {
  id: string;
  slug: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string; // ISO date
  time: string; // UTC time
  stadiumId: string;
  stage: "group" | "round-of-32" | "round-of-16" | "quarter-final" | "semi-final" | "third-place" | "final";
  group?: string;
  matchday?: number;
}

export interface Stadium {
  id: string;
  name: string;
  slug: string;
  city: string;
  cityId: string;
  country: "USA" | "Canada" | "Mexico";
  capacity: number;
  roofType: "open" | "retractable" | "fixed";
  latitude: number;
  longitude: number;
  description: string;
  /** Year the stadium was built / opened */
  yearBuilt?: number;
  /** Primary resident team(s) */
  homeTeam?: string;
  /** Approximate distance from city/downtown center in km */
  distanceFromCenter?: number;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  country: "USA" | "Canada" | "Mexico";
  state: string;
  population: number;
  timezone: string;
  description: string;
  stadiumIds: string[];
}

export interface Player {
  id: string;
  name: string;
  slug: string;
  teamId: string;
  position: "GK" | "DF" | "MF" | "FW";
  number?: number;
  age: number;
  club: string;
  goals: number;
  caps: number;
  description: string;
  lastUpdated?: string;
  clubUpdatedAt?: string;
}

export interface H2HRecord {
  team1Id: string;
  team2Id: string;
  totalMatches: number;
  team1Wins: number;
  draws: number;
  team2Wins: number;
  team1Goals: number;
  team2Goals: number;
  lastMatch?: string;
  lastMatchDate?: string;
}

export interface Odds {
  matchId: string;
  bookmaker: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  updatedAt: string;
}
