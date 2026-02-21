"use client";

import { useMemo } from "react";
import Link from "next/link";

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

const MONTHS = [
  { year: 2026, month: 6, label: "Juin 2026" },
  { year: 2026, month: 7, label: "Juillet 2026" },
];

const DAY_NAMES = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getPhaseColor(stage: string): string {
  if (stage === "group") return "bg-accent/10 text-accent";
  if (stage === "round-of-32" || stage === "round-of-16" || stage === "quarter-final") {
    return "bg-primary/10 text-primary";
  }
  return "bg-accent/10 text-accent";
}

function formatDateFr(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function CalendarGrid({ matches, teamsById, stadiumsById }: Props) {
  // Group matches by date
  const matchesByDate = useMemo(() => {
    const map = new Map<string, MatchData[]>();
    matches.forEach((m) => {
      const existing = map.get(m.date) ?? [];
      existing.push(m);
      map.set(m.date, existing);
    });
    // Sort each day's matches by time
    for (const [, dayMatches] of map) {
      dayMatches.sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [matches]);

  // Generate calendar days for a given month
  const getMonthDays = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const days: Array<{ date: string; day: number; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: "", day: 0, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({ date, day, isCurrentMonth: true });
    }

    return days;
  };

  // Days with matches for mobile view
  const daysWithMatches = useMemo(() => {
    const result: Array<{ date: string; matches: MatchData[] }> = [];
    const sortedDates = Array.from(matchesByDate.keys()).sort();
    for (const date of sortedDates) {
      const dayMatches = matchesByDate.get(date);
      if (dayMatches && dayMatches.length > 0) {
        result.push({ date, matches: dayMatches });
      }
    }
    return result;
  }, [matchesByDate]);

  const MAX_VISIBLE = 3;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      {/* ===== DESKTOP: Calendar grid ===== */}
      {MONTHS.map(({ year, month, label }) => {
        const days = getMonthDays(year, month);

        return (
          <section key={`${year}-${month}`} className="hidden sm:block">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {label}
            </h2>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-100">
                {DAY_NAMES.map((name, i) => (
                  <div
                    key={i}
                    className="py-2 text-center text-xs font-semibold text-gray-700"
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7">
                {days.map((dayInfo, idx) => {
                  if (!dayInfo.isCurrentMonth) {
                    return (
                      <div
                        key={idx}
                        className="min-h-[100px] border-r border-b border-gray-100 bg-gray-50/30"
                      />
                    );
                  }

                  const dayMatches = matchesByDate.get(dayInfo.date) ?? [];
                  const hasMatches = dayMatches.length > 0;
                  const visibleMatches = dayMatches.slice(0, MAX_VISIBLE);
                  const remaining = dayMatches.length - MAX_VISIBLE;

                  return (
                    <div
                      key={idx}
                      className="min-h-[100px] border-r border-b border-gray-100"
                    >
                      <div className="p-1.5 h-full flex flex-col">
                        <div className={`text-sm font-medium mb-1 ${hasMatches ? "text-gray-900" : "text-gray-400"}`}>
                          {dayInfo.day}
                        </div>
                        {hasMatches && (
                          <div className="flex flex-col gap-0.5">
                            {visibleMatches.map((match) => {
                              const home = teamsById[match.homeTeamId];
                              const away = teamsById[match.awayTeamId];
                              return (
                                <Link
                                  key={match.id}
                                  href={`/match/${match.slug}`}
                                  className={`group flex items-center gap-1 text-xs py-0.5 px-1 rounded hover:bg-primary/10 transition-colors ${getPhaseColor(match.stage)}`}
                                >
                                  <span className="text-[10px] text-gray-500 font-mono w-10 shrink-0">{match.time}</span>
                                  <span className="shrink-0">{home?.flag ?? "🏳️"}</span>
                                  <span className="truncate text-gray-700 group-hover:text-primary">{home?.name ?? "TBD"}</span>
                                  <span className="text-gray-400 text-[10px]">-</span>
                                  <span className="shrink-0">{away?.flag ?? "🏳️"}</span>
                                  <span className="truncate text-gray-700 group-hover:text-primary">{away?.name ?? "TBD"}</span>
                                </Link>
                              );
                            })}
                            {remaining > 0 && (
                              <Link
                                href={`/calendrier/jour-${dayInfo.day}`}
                                className="text-xs text-primary font-medium hover:underline px-1"
                              >
                                +{remaining} match{remaining > 1 ? "s" : ""} →
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== MOBILE: List by day ===== */}
      <div className="sm:hidden space-y-4">
        {daysWithMatches.map((day) => (
          <div key={day.date} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 font-semibold text-sm text-gray-900 capitalize">
              {formatDateFr(day.date)} — {day.matches.length} match{day.matches.length > 1 ? "s" : ""}
            </div>
            <div className="divide-y divide-gray-100">
              {day.matches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                return (
                  <Link
                    key={match.id}
                    href={`/match/${match.slug}`}
                    className="flex items-center px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="text-sm font-mono text-gray-500 w-12">{match.time}</span>
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <span>{home?.flag ?? "🏳️"}</span>
                      <span className="font-medium text-sm truncate">{home?.name ?? "TBD"}</span>
                    </span>
                    <span className="text-xs text-gray-400 mx-2">vs</span>
                    <span className="flex items-center gap-2 flex-1 justify-end min-w-0">
                      <span className="font-medium text-sm truncate">{away?.name ?? "TBD"}</span>
                      <span>{away?.flag ?? "🏳️"}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
