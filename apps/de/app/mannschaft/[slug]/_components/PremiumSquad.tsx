import Link from "next/link";
import type { playersByTeamId } from "@repo/data/players";

type Player = NonNullable<(typeof playersByTeamId)[string]>[number];

const positionLabels: Record<string, string> = {
  GK: "Torhüter",
  DF: "Verteidiger",
  MF: "Mittelfeldspieler",
  FW: "Stürmer",
};

const positionOrder = ["GK", "DF", "MF", "FW"];

interface PremiumSquadProps {
  players: Player[];
  teamSlug: string;
  teamName: string;
}

export function PremiumSquad({ players, teamSlug, teamName }: PremiumSquadProps) {
  const playersByPosition: Record<string, Player[]> = {};
  for (const pos of positionOrder) {
    playersByPosition[pos] = players.filter((p) => p.position === pos);
  }

  return (
    <section id="kader" className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Offizieller Kader — {players.length} Spieler
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Offizieller Kader von {teamName} für die WM 2026. Aktualisiert im Juni 2026.
        </p>

        <div className="space-y-6">
          {positionOrder.map((pos) => {
            const posPlayers = playersByPosition[pos] ?? [];
            if (posPlayers.length === 0) return null;

            return (
              <div key={pos}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full inline-block" />
                  {positionLabels[pos]} ({posPlayers.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {posPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/spieler/${player.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-sm">
                        {player.number ?? "—"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors truncate">
                          {player.name}
                        </p>
                        <p className="text-xs text-gray-500">{player.club}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold text-gray-700">{player.caps} Sp.</p>
                        {player.goals > 0 && (
                          <p className="text-xs text-primary">{player.goals} Tore</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {players.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Der Kader ist noch nicht verfügbar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
