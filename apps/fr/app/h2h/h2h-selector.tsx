"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Team {
  slug: string;
  name: string;
  flag: string;
}

export function H2HSelector({ teams }: { teams: Team[] }) {
  const router = useRouter();
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const handleCompare = () => {
    if (team1 && team2 && team1 !== team2) {
      router.push(`/h2h/${team1}-vs-${team2}`);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Choisissez deux équipes
      </h2>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <select
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:flex-1"
        >
          <option value="">🏳️ Équipe 1</option>
          {teams.map((t) => (
            <option key={t.slug} value={t.slug} disabled={t.slug === team2}>
              {t.flag} {t.name}
            </option>
          ))}
        </select>

        <span className="text-lg font-bold text-gray-400">VS</span>

        <select
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:flex-1"
        >
          <option value="">🏳️ Équipe 2</option>
          {teams.map((t) => (
            <option key={t.slug} value={t.slug} disabled={t.slug === team1}>
              {t.flag} {t.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          disabled={!team1 || !team2 || team1 === team2}
          className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          Comparer ⚔️
        </button>
      </div>
    </div>
  );
}
