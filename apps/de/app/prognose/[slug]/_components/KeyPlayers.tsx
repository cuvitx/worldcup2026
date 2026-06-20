import Link from "next/link";
import type { playersByTeamId } from "@/lib/localized-data";

type Player = NonNullable<(typeof playersByTeamId)[string]>[number];

const positionLabels: Record<string, string> = {
  GK: "Torwart", DF: "Verteidiger", MF: "Mittelfeldspieler", FW: "Stürmer",
};

interface KeyPlayersProps {
  teamName: string;
  players: Player[];
}

export function KeyPlayers({ teamName, players }: KeyPlayersProps) {
  if (players.length === 0) return null;

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Schlüsselspieler von {teamName}</h2>
      <p className="mb-4 text-sm text-gray-600">Die Spieler, die bei der WM 2026 den Unterschied für {teamName} machen werden.</p>
      <div className="space-y-3">
        {players.map((player) => (
          <Link
            key={player.id}
            href={`/spieler/${player.slug}`}
            className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">{player.name}</p>
              <p className="text-sm text-gray-500 truncate">{positionLabels[player.position]} &middot; {player.club}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">{player.caps} Eins. / {player.goals} Tore</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
