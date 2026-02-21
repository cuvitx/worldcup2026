import Link from "next/link";
import type { playersByTeamId } from "@repo/data/players";

type Player = NonNullable<(typeof playersByTeamId)[string]>[number];

const positionLabels: Record<string, string> = {
  GK: "Gardien", DF: "Defenseur", MF: "Milieu", FW: "Attaquant",
};

interface KeyPlayersProps {
  teamName: string;
  players: Player[];
}

export function KeyPlayers({ teamName, players }: KeyPlayersProps) {
  if (players.length === 0) return null;

  return (
    <section className="rounded-lg bg-whiteslate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Joueurs cles de {teamName}</h2>
      <p className="mb-4 text-sm text-gray-600">Les joueurs qui feront la difference pour {teamName} lors de la Coupe du Monde 2026.</p>
      <div className="space-y-3">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/joueur/${player.slug}`}
            className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{player.name}</p>
              <p className="text-sm text-gray-500 truncate">{positionLabels[player.position]} &middot; {player.club}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">{player.caps} sel. / {player.goals} buts</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
