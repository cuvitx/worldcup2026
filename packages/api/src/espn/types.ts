// ESPN API types for World Cup 2026 commentary

export interface EspnScoreboardResponse {
  events: EspnEvent[];
}

export interface EspnEvent {
  id: string; // "760415"
  date: string; // "2026-06-11T19:00Z"
  name: string; // "South Africa at Mexico"
  shortName: string; // "RSA @ MEX"
  competitions: EspnCompetition[];
}

export interface EspnCompetition {
  id: string;
  date: string;
  status: {
    clock: number;
    displayClock: string;
    period: number;
    type: {
      state: "pre" | "in" | "post";
      completed: boolean;
      detail: string; // "FT", "HT", "1H", "2H"
    };
  };
  competitors: Array<{
    id: string;
    homeAway: "home" | "away";
    winner: boolean | null;
    score: string;
    team: {
      id: string;
      abbreviation: string;
      displayName: string;
      shortDisplayName: string;
      logo: string;
    };
  }>;
  details: EspnKeyEvent[];
}

export interface EspnKeyEvent {
  type: { id: string; text: string }; // "70"="Goal", "94"="Yellow Card", "93"="Red Card"
  clock: { value: number; displayValue: string }; // { value: 513, displayValue: "9'" }
  team: { id: string };
  scoreValue: number;
  scoringPlay: boolean;
  redCard: boolean;
  yellowCard: boolean;
  penaltyKick: boolean;
  ownGoal: boolean;
  athletesInvolved: Array<{
    id: string;
    displayName: string;
    shortName: string;
    jersey: string;
    team: { id: string };
  }>;
}

export interface EspnPlay {
  id: string;
  type: { id: string; text: string; type?: string };
  text: string; // Full natural-language commentary
  shortText: string;
  awayScore: number;
  homeScore: number;
  period: { number: number };
  clock: { value: number; displayValue: string };
  wallclock: string;
  scoringPlay: boolean;
  priority: boolean;
  substitution: boolean;
  redCard: boolean;
  yellowCard: boolean;
  penaltyKick: boolean;
  ownGoal: boolean;
}

export interface EspnPlaysResponse {
  items: EspnPlay[];
  count: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}
