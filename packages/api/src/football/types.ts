// ============================================================================
// API-Football response types (v3)
// https://www.api-football.com/documentation-v3
// ============================================================================

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: Record<string, string>;
  results: number;
  response: T[];
}

export interface ApiTeamStats {
  team: { id: number; name: string; logo: string };
  form: string; // e.g. "WWDLW"
  fixtures: {
    played: { home: number; away: number; total: number };
    wins: { home: number; away: number; total: number };
    draws: { home: number; away: number; total: number };
    loses: { home: number; away: number; total: number };
  };
  goals: {
    for: { total: { home: number; away: number; total: number } };
    against: { total: { home: number; away: number; total: number } };
  };
  clean_sheet: { home: number; away: number; total: number };
}

export interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    timestamp: number;
    status: { long: string; short: string; elapsed: number | null };
  };
  league: { id: number; name: string; round: string };
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null };
    away: { id: number; name: string; logo: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
  };
}

export interface ApiInjury {
  player: { id: number; name: string; photo: string };
  team: { id: number; name: string; logo: string };
  fixture: { id: number; date: string };
  league: { id: number; name: string };
  type: string; // "Missing Fixture", "Questionable", etc.
  reason: string; // "Knee Injury", "Muscle Injury", etc.
}

export interface ApiLineup {
  team: { id: number; name: string; logo: string };
  formation: string; // e.g. "4-3-3"
  startXI: Array<{
    player: { id: number; name: string; number: number; pos: string };
  }>;
  substitutes: Array<{
    player: { id: number; name: string; number: number; pos: string };
  }>;
  coach: { id: number; name: string; photo: string };
}

export interface ApiFixtureEvent {
  time: { elapsed: number; extra: number | null };
  team: { id: number; name: string; logo: string };
  player: { id: number; name: string };
  assist: { id: number | null; name: string | null };
  type: string; // "Goal", "Card", "subst"
  detail: string; // "Normal Goal", "Yellow Card", etc.
}
