"use client";

import { useState } from "react";

interface MatchData {
  id: string;
  slug: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  stadiumId: string;
  stage: string;
  group?: string;
}

interface TeamInfo {
  id: string;
  name: string;
  flag: string;
}

interface StadiumInfo {
  id: string;
  name: string;
}

interface Props {
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
  CalendarFilters: React.ComponentType<{
    matches: MatchData[];
    teamsById: Record<string, TeamInfo>;
    stadiumsById: Record<string, StadiumInfo>;
  }>;
  CalendarGrid: React.ComponentType<{
    matches: MatchData[];
    teamsById: Record<string, TeamInfo>;
    stadiumsById: Record<string, StadiumInfo>;
  }>;
}

export default function CalendarViewWrapper({
  matches,
  teamsById,
  stadiumsById,
  CalendarFilters,
  CalendarGrid,
}: Props) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <>
      {/* Toggle */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setView("list")}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  view === "list"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              Liste
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${
                  view === "calendar"
                    ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              Calendrier
            </button>
          </div>
        </div>
      </section>

      {/* Conditional rendering */}
      {view === "list" ? (
        <CalendarFilters
          matches={matches}
          teamsById={teamsById}
          stadiumsById={stadiumsById}
        />
      ) : (
        <CalendarGrid
          matches={matches}
          teamsById={teamsById}
          stadiumsById={stadiumsById}
        />
      )}
    </>
  );
}
