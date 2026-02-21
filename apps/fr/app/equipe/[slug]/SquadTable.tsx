"use client";

import { useState } from "react";
import Link from "next/link";

interface Player {
  id: string;
  slug: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  number?: number | null;
  age: number;
  club: string;
  goals: number;
  caps: number;
}

const POSITION_ORDER: Record<string, number> = { GK: 0, DF: 1, MF: 2, FW: 3 };
const POSITION_LABELS: Record<string, string> = {
  GK: "Gardien",
  DF: "Défenseur",
  MF: "Milieu",
  FW: "Attaquant",
};
const POSITION_COLORS: Record<string, string> = {
  GK: "bg-primary/10 text-primarysecondary/20",
  DF: "bg-primary/10 text-primarysecondary/20",
  MF: "bg-field/10 text-fieldfield/20",
  FW: "bg-primary/10 text-primaryprimary/20",
};

type SortKey = "position" | "name" | "age" | "club" | "caps" | "goals";

export default function SquadTable({ players }: { players: Player[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("position");
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(key === "position" || key === "name" || key === "club");
    }
  }

  const sorted = [...players].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "position") {
      cmp = (POSITION_ORDER[a.position] ?? 99) - (POSITION_ORDER[b.position] ?? 99);
      if (cmp === 0) cmp = a.name.localeCompare(b.name);
    } else if (sortKey === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortKey === "age") {
      cmp = a.age - b.age;
    } else if (sortKey === "club") {
      cmp = a.club.localeCompare(b.club);
    } else if (sortKey === "caps") {
      cmp = a.caps - b.caps;
    } else if (sortKey === "goals") {
      cmp = a.goals - b.goals;
    }
    return sortAsc ? cmp : -cmp;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-gray-500 ml-1">↕</span>;
    return <span className="text-primary ml-1">{sortAsc ? "↑" : "↓"}</span>;
  }

  const thClass =
    "px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-primary transition-colors";

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full text-sm min-w-[540px]">
        <thead>
          <tr className="bg-gray-50-700/50 text-xs uppercase text-gray-500border-b border-gray-200">
            <th className={thClass} onClick={() => handleSort("position")}>
              Poste <SortIcon col="position" />
            </th>
            <th className={thClass} onClick={() => handleSort("name")}>
              Joueur <SortIcon col="name" />
            </th>
            <th className={thClass} onClick={() => handleSort("age")}>
              Âge <SortIcon col="age" />
            </th>
            <th className={thClass} onClick={() => handleSort("club")}>
              Club <SortIcon col="club" />
            </th>
            <th className={thClass + " text-center"} onClick={() => handleSort("caps")}>
              Sél. <SortIcon col="caps" />
            </th>
            <th className={thClass + " text-center"} onClick={() => handleSort("goals")}>
              Buts <SortIcon col="goals" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((player, idx) => (
            <tr
              key={player.id}
              className={`border-b border-gray-100 transition-colors hover:bg-primary/5 ${
                idx % 2 === 0 ? "" : "bg-gray-50/50slate-700/20"
              }`}
            >
              <td className="px-3 py-2.5">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    POSITION_COLORS[player.position] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {player.position}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <Link
                  href={`/joueur/${player.slug}`}
                  className="font-semibold text-gray-900 hover:text-primary transition-colors"
                >
                  {player.name}
                </Link>
              </td>
              <td className="px-3 py-2.5 text-gray-600">{player.age} ans</td>
              <td className="px-3 py-2.5 text-gray-600 max-w-[140px] truncate">
                {player.club}
              </td>
              <td className="px-3 py-2.5 text-center font-medium text-primary">{player.caps}</td>
              <td className="px-3 py-2.5 text-center font-medium text-field">{player.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.entries(POSITION_LABELS) as [string, string][]).map(([pos, label]) => (
          <span key={pos} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${POSITION_COLORS[pos]}`}>
            <span className="font-bold">{pos}</span> — {label}
          </span>
        ))}
      </div>
    </div>
  );
}
