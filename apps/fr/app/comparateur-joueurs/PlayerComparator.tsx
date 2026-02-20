"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { playerStats, playerStatsByTeam } from "@repo/data/player-stats";
import { teams } from "@repo/data/teams";
import type { PlayerStats } from "@repo/data/player-stats";
import { getPlayerImagePath, getPlayerInitials, getAvatarColor } from "../../lib/player-images";

type StatKey = "goals" | "assists" | "appearances" | "minutesPlayed" | "passAccuracy" | "dribbleSuccess" | "aerialDuels" | "rating";

const STAT_LABELS: { key: StatKey; label: string; max: number }[] = [
  { key: "goals", label: "Buts", max: 50 },
  { key: "assists", label: "Passes décisives", max: 25 },
  { key: "appearances", label: "Matchs joués", max: 50 },
  { key: "minutesPlayed", label: "Minutes jouées", max: 4000 },
  { key: "passAccuracy", label: "Précision des passes (%)", max: 100 },
  { key: "dribbleSuccess", label: "Dribbles réussis (%)", max: 100 },
  { key: "aerialDuels", label: "Duels aériens (%)", max: 100 },
  { key: "rating", label: "Note globale", max: 10 },
];

const COLORS = ["#2EC4B6", "#f5a623", "#EF476F"]; // secondary, gold, error
const BEST_COLOR = "#06D6A0"; // success

const teamsWithPlayers = teams.filter((t) => playerStatsByTeam[t.id]?.length);

function PlayerSelector({
  index,
  selectedId,
  onChange,
  excludeIds,
}: {
  index: number;
  selectedId: string;
  onChange: (id: string) => void;
  excludeIds: string[];
}) {
  return (
    <select
      value={selectedId}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium shadow-sm transition dark:border-gray-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Sélectionner joueur ${index + 1}`}
    >
      <option value="">— Joueur {index + 1} —</option>
      {teamsWithPlayers.map((team) => {
        const teamPlayers = playerStatsByTeam[team.id]!.filter(
          (p) => !excludeIds.includes(p.id) || p.id === selectedId
        );
        if (!teamPlayers.length) return null;
        return (
          <optgroup key={team.id} label={`${team.flag} ${team.name}`}>
            {teamPlayers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.position})
              </option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
}

function AnimatedBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 50 + delay * 60);
    return () => clearTimeout(timer);
  }, [pct, delay]);

  return (
    <div
      ref={ref}
      className="h-full rounded-full transition-all duration-700 ease-out"
      style={{ width: `${width}%`, backgroundColor: color }}
    />
  );
}

export function PlayerComparator() {
  const [ids, setIds] = useState<string[]>(["mbappe", "haaland", ""]);

  const selected = useMemo(
    () => ids.map((id) => playerStats.find((p) => p.id === id)).filter(Boolean) as PlayerStats[],
    [ids]
  );

  const setPlayer = (index: number, id: string) => {
    setIds((prev) => {
      const next = [...prev];
      next[index] = id;
      return next;
    });
  };

  const excludeIds = ids.filter(Boolean);

  return (
    <div>
      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((i) => (
          <PlayerSelector
            key={i}
            index={i}
            selectedId={ids[i] ?? ""}
            onChange={(id) => setPlayer(i, id)}
            excludeIds={excludeIds}
          />
        ))}
      </div>

      {selected.length < 2 && (
        <p className="text-center text-gray-400 dark:text-gray-400 py-12">
          Sélectionnez au moins 2 joueurs pour lancer la comparaison.
        </p>
      )}

      {selected.length >= 2 && (
        <>
          {/* Player cards — stack vertically on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {selected.map((p, i) => {
              const imgPath = getPlayerImagePath(p.id);
              const initials = getPlayerInitials(p.name);
              const avatarColor = getAvatarColor(p.name);
              return (
              <div
                key={p.id}
                className="rounded-xl border-2 p-5 text-center bg-white dark:bg-slate-800 shadow-md transition-transform hover:scale-[1.02]"
                style={{ borderColor: COLORS[i] }}
              >
                {/* Player photo or initials */}
                {imgPath ? (
                  <div
                    className="mx-auto mb-3 relative h-20 w-20 overflow-hidden rounded-full"
                    style={{ boxShadow: `0 0 0 3px ${COLORS[i]}` }}
                  >
                    <Image
                      src={imgPath}
                      alt={p.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div
                    className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full text-white font-bold text-2xl shadow-lg ${avatarColor}`}
                    style={{ boxShadow: `0 0 0 3px ${COLORS[i]}` }}
                  >
                    {initials}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {p.club} · {p.position} · {p.age} ans
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                  {teams.find((t) => t.id === p.teamId)?.flag}{" "}
                  {teams.find((t) => t.id === p.teamId)?.name}
                </p>
              </div>
              );
            })}
          </div>

          {/* Stats bars — smooth animated */}
          <div className="space-y-6">
            {STAT_LABELS.map(({ key, label, max }, statIdx) => {
              const values = selected.map((p) => p[key] as number);
              const best = Math.max(...values);

              return (
                <div key={key} className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    {label}
                  </h4>
                  <div className="space-y-2">
                    {selected.map((p, i) => {
                      const val = p[key] as number;
                      const isBest = val === best;
                      const pct = Math.min((val / max) * 100, 100);
                      return (
                        <div key={p.id} className="flex items-center gap-3">
                          <span className="w-24 sm:w-28 text-xs truncate text-right text-gray-600 dark:text-gray-300 font-medium">
                            {p.name.split(" ").pop()}
                          </span>
                          <div className="flex-1 h-7 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                            <AnimatedBar
                              pct={pct}
                              color={isBest ? BEST_COLOR : COLORS[i]!}
                              delay={statIdx * selected.length + i}
                            />
                          </div>
                          <span
                            className="w-16 text-sm font-bold text-right tabular-nums"
                            style={{ color: isBest ? BEST_COLOR : COLORS[i] }}
                          >
                            {key === "rating" ? val.toFixed(1) : val.toLocaleString("fr-FR")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary table */}
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow mt-10 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-300">Statistique</th>
                  {selected.map((p, i) => (
                    <th key={p.id} className="py-3 px-4 text-center font-bold" style={{ color: COLORS[i] }}>
                      {p.name.split(" ").pop()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAT_LABELS.map(({ key, label }) => {
                  const values = selected.map((p) => p[key] as number);
                  const best = Math.max(...values);
                  return (
                    <tr key={key} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 px-4 text-gray-600 dark:text-gray-300">{label}</td>
                      {selected.map((p, i) => {
                        const val = p[key] as number;
                        const isBest = val === best;
                        return (
                          <td
                            key={p.id}
                            className="py-2.5 px-4 text-center font-semibold"
                            style={{ color: isBest ? BEST_COLOR : undefined }}
                          >
                            {key === "rating" ? val.toFixed(1) : val.toLocaleString("fr-FR")}
                            {isBest && " ✓"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
