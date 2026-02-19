"use client";

import { useState } from "react";
import Link from "next/link";

interface Player {
  id: string;
  slug: string;
  name: string;
  position: string;
  club: string;
  caps: number;
  goals: number;
}

const positionLabels: Record<string, string> = {
  GK: "Gardien",
  DF: "Défenseur",
  MF: "Milieu",
  FW: "Attaquant",
};

const INITIAL_COUNT = 6;

function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/joueur/${player.slug}`}
      className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-accent hover:bg-accent/5"
    >
      <div>
        <p className="font-semibold">{player.name}</p>
        <p className="text-sm text-gray-500">
          {positionLabels[player.position] ?? player.position} &middot; {player.club}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-primary">
          {player.caps} sel. / {player.goals} buts
        </p>
      </div>
    </Link>
  );
}

export default function ExpandablePlayerList({ players }: { players: Player[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = players.length > INITIAL_COUNT;
  const visible = expanded ? players : players.slice(0, INITIAL_COUNT);

  return (
    <div className="space-y-3">
      {visible.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          {expanded
            ? "Masquer l\u2019effectif"
            : `Voir tout l\u2019effectif (${players.length} joueurs)`}
        </button>
      )}
    </div>
  );
}
