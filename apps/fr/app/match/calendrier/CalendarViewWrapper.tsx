"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const CalendarFilters = dynamic(() => import("./CalendarFilters"), {
  loading: () => (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded-lg w-full" />
        <div className="h-64 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  ),
});

const CalendarGrid = dynamic(() => import("./CalendarGrid"), {
  loading: () => (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  ),
});

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
}

export default function CalendarViewWrapper({
  matches,
  teamsById,
  stadiumsById,
}: Props) {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <>
      <section className="border-b border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === "calendar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Calendrier
            </button>
          </div>
        </div>
      </section>

      {view === "list" ? (
        <CalendarFilters matches={matches} teamsById={teamsById} stadiumsById={stadiumsById} />
      ) : (
        <CalendarGrid matches={matches} teamsById={teamsById} stadiumsById={stadiumsById} />
      )}
    </>
  );
}
