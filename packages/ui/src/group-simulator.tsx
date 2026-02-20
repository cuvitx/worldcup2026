"use client";

import { useState, useMemo, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A team participating in the group.
 * 
 * @param id - Unique team identifier
 * @param name - Team display name
 * @param flag - Team flag emoji
 */
interface TeamInput {
  id: string;
  name: string;
  flag: string;
}

/**
 * A match between two teams in the group.
 * 
 * @param homeId - ID of the home team
 * @param awayId - ID of the away team
 * @param homeScore - Optional initial home score
 * @param awayScore - Optional initial away score
 */
interface MatchInput {
  homeId: string;
  awayId: string;
  homeScore?: number;
  awayScore?: number;
}

/**
 * Props for the GroupSimulator component.
 * 
 * @param teams - Array of teams in the group
 * @param matches - Array of matches (all combinations within the group)
 * @param locale - UI language: "fr" | "en" | "es" (default: "en")
 */
interface GroupSimulatorProps {
  teams: TeamInput[];
  matches: MatchInput[];
  locale?: "fr" | "en" | "es";
}

/**
 * Internal standing row for a team (computed from match results).
 */
interface Standing {
  teamId: string;
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// ---------------------------------------------------------------------------
// i18n labels
// ---------------------------------------------------------------------------

const labels = {
  fr: {
    title: "Simulateur de groupe",
    subtitle: "Entrez les scores pour simuler le classement du groupe",
    team: "Equipe",
    pts: "Pts",
    w: "V",
    d: "N",
    l: "D",
    gf: "BP",
    ga: "BC",
    gd: "Diff",
    played: "MJ",
    vs: "vs",
    qualified: "Qualifie",
    reset: "Reinitialiser",
    match: "Match",
  },
  en: {
    title: "Group Simulator",
    subtitle: "Enter match scores to simulate the group standings",
    team: "Team",
    pts: "Pts",
    w: "W",
    d: "D",
    l: "L",
    gf: "GF",
    ga: "GA",
    gd: "GD",
    played: "MP",
    vs: "vs",
    qualified: "Qualified",
    reset: "Reset",
    match: "Match",
  },
  es: {
    title: "Simulador de grupo",
    subtitle: "Introduce los resultados para simular la clasificacion del grupo",
    team: "Equipo",
    pts: "Pts",
    w: "G",
    d: "E",
    l: "P",
    gf: "GF",
    ga: "GC",
    gd: "DG",
    played: "PJ",
    vs: "vs",
    qualified: "Clasificado",
    reset: "Reiniciar",
    match: "Partido",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * GroupSimulator component — Interactive group stage standings calculator.
 * 
 * Users can enter match scores, and the component dynamically computes the group standings
 * based on points, goal difference, and goals scored.
 * 
 * Features:
 * - Real-time standings recalculation
 * - Highlights top 2 qualified teams
 * - Reset to initial scores
 * - Multilingual support (FR, EN, ES)
 * 
 * @example
 * ```tsx
 * <GroupSimulator
 *   teams={[
 *     { id: "fra", name: "France", flag: "🇫🇷" },
 *     { id: "bra", name: "Brésil", flag: "🇧🇷" },
 *     { id: "ger", name: "Allemagne", flag: "🇩🇪" },
 *     { id: "arg", name: "Argentine", flag: "🇦🇷" }
 *   ]}
 *   matches={[
 *     { homeId: "fra", awayId: "bra" },
 *     { homeId: "ger", awayId: "arg" },
 *     { homeId: "fra", awayId: "ger" },
 *     { homeId: "bra", awayId: "arg" },
 *     { homeId: "fra", awayId: "arg" },
 *     { homeId: "bra", awayId: "ger" }
 *   ]}
 *   locale="fr"
 * />
 * ```
 */
export function GroupSimulator({ teams, matches: initialMatches, locale = "en" }: GroupSimulatorProps) {
  const t = labels[locale];

  // Match scores state: array of { homeScore, awayScore } mirroring initialMatches
  const [scores, setScores] = useState<Array<{ homeScore: string; awayScore: string }>>(
    initialMatches.map((m) => ({
      homeScore: m.homeScore !== undefined ? String(m.homeScore) : "",
      awayScore: m.awayScore !== undefined ? String(m.awayScore) : "",
    }))
  );

  const handleScoreChange = useCallback(
    (matchIndex: number, side: "home" | "away", value: string) => {
      // Allow empty string or non-negative integers
      if (value !== "" && (!/^\d+$/.test(value) || parseInt(value) < 0)) return;
      setScores((prev) => {
        const next = [...prev];
        const entry = { ...next[matchIndex]! };
        if (side === "home") {
          entry.homeScore = value;
        } else {
          entry.awayScore = value;
        }
        next[matchIndex] = entry;
        return next;
      });
    },
    []
  );

  const handleReset = useCallback(() => {
    setScores(
      initialMatches.map((m) => ({
        homeScore: m.homeScore !== undefined ? String(m.homeScore) : "",
        awayScore: m.awayScore !== undefined ? String(m.awayScore) : "",
      }))
    );
  }, [initialMatches]);

  // Compute standings
  const standings = useMemo(() => {
    const standingsMap: Record<string, Standing> = {};

    // Initialize standings for all teams
    for (const team of teams) {
      standingsMap[team.id] = {
        teamId: team.id,
        name: team.name,
        flag: team.flag,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    // Process each match
    for (let i = 0; i < initialMatches.length; i++) {
      const match = initialMatches[i]!;
      const score = scores[i]!;

      const homeScore = score.homeScore !== "" ? parseInt(score.homeScore) : NaN;
      const awayScore = score.awayScore !== "" ? parseInt(score.awayScore) : NaN;

      if (isNaN(homeScore) || isNaN(awayScore)) continue;

      const homeStanding = standingsMap[match.homeId];
      const awayStanding = standingsMap[match.awayId];
      if (!homeStanding || !awayStanding) continue;

      homeStanding.played += 1;
      awayStanding.played += 1;
      homeStanding.goalsFor += homeScore;
      homeStanding.goalsAgainst += awayScore;
      awayStanding.goalsFor += awayScore;
      awayStanding.goalsAgainst += homeScore;

      if (homeScore > awayScore) {
        homeStanding.won += 1;
        homeStanding.points += 3;
        awayStanding.lost += 1;
      } else if (homeScore < awayScore) {
        awayStanding.won += 1;
        awayStanding.points += 3;
        homeStanding.lost += 1;
      } else {
        homeStanding.drawn += 1;
        awayStanding.drawn += 1;
        homeStanding.points += 1;
        awayStanding.points += 1;
      }
    }

    // Compute goal difference
    for (const standing of Object.values(standingsMap)) {
      standing.goalDifference = standing.goalsFor - standing.goalsAgainst;
    }

    // Sort: Points desc, then GD desc, then GF desc
    return Object.values(standingsMap).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }, [teams, initialMatches, scores]);

  // Team lookup
  const teamsMap = useMemo(() => {
    const map: Record<string, TeamInput> = {};
    for (const team of teams) {
      map[team.id] = team;
    }
    return map;
  }, [teams]);

  return (
    <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-6 py-4 text-white">
        <h3 className="text-lg font-bold">{t.title}</h3>
        <p className="text-sm text-gray-300 mt-0.5">{t.subtitle}</p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Match score inputs */}
        <div className="space-y-3">
          {initialMatches.map((match, index) => {
            const homeTeam = teamsMap[match.homeId];
            const awayTeam = teamsMap[match.awayId];
            const score = scores[index]!;

            return (
              <div
                key={`${match.homeId}-${match.awayId}`}
                className="flex items-center gap-2 sm:gap-3 rounded-lg bg-gray-50 p-3"
              >
                {/* Home team */}
                <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                  <span className="text-sm font-medium truncate hidden sm:inline">
                    {homeTeam?.name ?? "TBD"}
                  </span>
                  <span className="text-lg sm:text-xl">{homeTeam?.flag ?? "🏳️"}</span>
                </div>

                {/* Score inputs */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={score.homeScore}
                    onChange={(e) => handleScoreChange(index, "home", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-300 text-center text-lg font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="-"
                    aria-label={`${homeTeam?.name ?? "Home"} score`}
                  />
                  <span className="text-xs text-gray-400 font-medium">{t.vs}</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={score.awayScore}
                    onChange={(e) => handleScoreChange(index, "away", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-300 text-center text-lg font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="-"
                    aria-label={`${awayTeam?.name ?? "Away"} score`}
                  />
                </div>

                {/* Away team */}
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="text-lg sm:text-xl">{awayTeam?.flag ?? "🏳️"}</span>
                  <span className="text-sm font-medium truncate hidden sm:inline">
                    {awayTeam?.name ?? "TBD"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset button */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {t.reset}
          </button>
        </div>

        {/* Standings table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="pb-2 pr-2 font-semibold text-gray-500 w-6">#</th>
                <th className="pb-2 font-semibold text-gray-500">{t.team}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.played}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.w}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.d}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.l}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.gf}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-8">{t.ga}</th>
                <th className="pb-2 text-center font-semibold text-gray-500 w-10">{t.gd}</th>
                <th className="pb-2 text-center font-semibold text-gray-700 w-10">{t.pts}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {standings.map((s, idx) => {
                const isQualified = idx < 2;
                return (
                  <tr
                    key={s.teamId}
                    className={`transition-colors ${
                      isQualified
                        ? "bg-green-50 hover:bg-green-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-2.5 pr-2">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                          isQualified
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{s.flag}</span>
                        <span className={`font-medium ${isQualified ? "text-green-800" : "text-gray-700"}`}>
                          {s.name}
                        </span>
                        {isQualified && (
                          <span className="hidden sm:inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase tracking-wide">
                            {t.qualified}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 text-center text-gray-500">{s.played}</td>
                    <td className="py-2.5 text-center text-gray-600">{s.won}</td>
                    <td className="py-2.5 text-center text-gray-600">{s.drawn}</td>
                    <td className="py-2.5 text-center text-gray-600">{s.lost}</td>
                    <td className="py-2.5 text-center text-gray-600">{s.goalsFor}</td>
                    <td className="py-2.5 text-center text-gray-600">{s.goalsAgainst}</td>
                    <td className="py-2.5 text-center">
                      <span
                        className={`font-medium ${
                          s.goalDifference > 0
                            ? "text-green-600"
                            : s.goalDifference < 0
                              ? "text-red-600"
                              : "text-gray-500"
                        }`}
                      >
                        {s.goalDifference > 0 ? "+" : ""}
                        {s.goalDifference}
                      </span>
                    </td>
                    <td className="py-2.5 text-center">
                      <span className={`text-base font-extrabold ${isQualified ? "text-green-700" : "text-gray-800"}`}>
                        {s.points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
