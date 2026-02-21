"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPlayerImagePath, getPlayerInitials, getAvatarColor } from "../../../lib/player-images";

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
  const imgPath = getPlayerImagePath(player.slug);
  const initials = getPlayerInitials(player.name);
  const avatarColor = getAvatarColor(player.name);

  return (
    <Link
      href={`/joueur/${player.slug}`}
      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      {/* 40×40 avatar */}
      {imgPath ? (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={imgPath}
            alt={player.name}
            fill
            className="object-cover object-top"
            sizes="40px"
          />
        </div>
      ) : (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor}`}
        >
          {initials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{player.name}</p>
        <p className="text-sm text-gray-500">
          {positionLabels[player.position] ?? player.position} &middot; {player.club}
        </p>
      </div>
      <div className="text-right shrink-0">
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
