"use client";

import Link from "next/link";
import { useState } from "react";
import type { Confederation } from "@repo/data/types";

interface Team {
  id: string;
  name: string;
  slug: string;
  flag: string;
  confederation: Confederation;
  fifaRanking: number;
  group: string;
  isHost: boolean;
}

const confLabels: Record<string, string> = {
  ALL: "Toutes",
  UEFA: "Europe",
  CONMEBOL: "Amérique du Sud",
  CAF: "Afrique",
  AFC: "Asie",
  CONCACAF: "Amérique du Nord",
  OFC: "Océanie",
};

const confKeys = ["ALL", "UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"] as const;

export function ConfederationFilter({ teams }: { teams: Team[] }) {
  const [active, setActive] = useState<string>("ALL");

  const filtered = active === "ALL" ? teams : teams.filter((t) => t.confederation === active);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Équipes par confédération</h2>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {confKeys.map((key) => {
          const count = key === "ALL" ? teams.length : teams.filter((t) => t.confederation === key).length;
          if (count === 0 && key !== "ALL") return null;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                active === key
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {confLabels[key]} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((team) => (
          <Link
            key={team.id}
            href={`/equipe/${team.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-3 sm:p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200 shrink-0" role="img" aria-label={`Drapeau de ${team.name}`}>
              {team.flag}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">{team.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                #{team.fifaRanking} FIFA · Groupe {team.group}
              </p>
              {team.isHost && (
                <span className="inline-block mt-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  Pays hôte
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
