"use client";

import { useState, useMemo } from "react";
import { MatchRow } from "@repo/ui/match-row";

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
const DAY_NAMES_MOBILE = ["L", "M", "M", "J", "V", "S", "D"];

function getPhaseColor(stage: string): string {
  if (stage === "group") return "bg-accent/10 border-accent/30 text-accent";
  if (stage === "round-of-32" || stage === "round-of-16" || stage === "quarter-final") {
    return "bg-primary/10 border-primary/30 text-primary";
  }
  return "bg-secondary/10 border-secondary/30 text-secondary";
}

export default function CalendarGrid({ matches, teamsById, stadiumsById }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    const map = new Map<string, MatchData[]>();
    matches.forEach((m) => {
      const existing = map.get(m.date) ?? [];
      existing.push(m);
      map.set(m.date, existing);
    });
    return map;
  }, [matches]);

  // Generate calendar days for a given month
  const getMonthDays = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week (0=Sunday, 1=Monday, ... 6=Saturday) - adjust to start Monday
    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Monday=0

    const days: Array<{ date: string; day: number; isCurrentMonth: boolean }> = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: "", day: 0, isCurrentMonth: false });
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({ date, day, isCurrentMonth: true });
    }

    return days;
  };

  const selectedDayMatches = useMemo(() => {
    if (!selectedDay) return [];
    return matchesByDate.get(selectedDay) ?? [];
  }, [selectedDay, matchesByDate]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      {MONTHS.map(({ year, month, label }) => {
        const days = getMonthDays(year, month);

        return (
          <section key={`${year}-${month}`}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {label}
            </h2>

            {/* Calendar grid */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
                {DAY_NAMES.map((name, i) => (
                  <div
                    key={i}
                    className="py-2 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 hidden sm:block"
                  >
                    {name}
                  </div>
                ))}
                {DAY_NAMES_MOBILE.map((name, i) => (
                  <div
                    key={i}
                    className="py-2 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 sm:hidden"
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
                        className="aspect-square sm:aspect-auto sm:min-h-[80px] border-r border-b border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30"
                      />
                    );
                  }

                  const dayMatches = matchesByDate.get(dayInfo.date) ?? [];
                  const hasMatches = dayMatches.length > 0;
                  const isSelected = selectedDay === dayInfo.date;

                  // Determine phase color based on first match's stage
                  const phaseColor = hasMatches && dayMatches[0] ? getPhaseColor(dayMatches[0].stage) : "";

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (hasMatches) {
                          setSelectedDay(isSelected ? null : dayInfo.date);
                        }
                      }}
                      disabled={!hasMatches}
                      className={`
                        aspect-square sm:aspect-auto sm:min-h-[80px] border-r border-b border-gray-100 dark:border-slate-800
                        ${hasMatches ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800/50" : "cursor-default"}
                        ${isSelected ? "ring-2 ring-primary ring-inset" : ""}
                        transition-colors
                      `}
                    >
                      <div className="p-1 sm:p-2 h-full flex flex-col items-start">
                        <div className={`text-xs sm:text-sm font-medium ${hasMatches ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"}`}>
                          {dayInfo.day}
                        </div>
                        {hasMatches && (
                          <div className={`mt-1 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium border ${phaseColor}`}>
                            {dayMatches.length} match{dayMatches.length > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Selected day details */}
      {selectedDay && selectedDayMatches.length > 0 && (
        <section className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {new Date(selectedDay).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Fermer ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedDayMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const stad = stadiumsById[match.stadiumId];

              return (
                <MatchRow
                  key={match.id}
                  href={`/match/${match.slug}`}
                  homeFlag={home?.flag ?? ""}
                  homeName={home?.name ?? "TBD"}
                  awayFlag={away?.flag ?? ""}
                  awayName={away?.name ?? "TBD"}
                  time={match.time}
                  group={match.group}
                  stadium={stad?.name}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
