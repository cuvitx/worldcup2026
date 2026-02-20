import Link from "next/link";
import type { Player } from "@repo/data";
import { positionLabels, positionOrder } from "./edf-data";

export function EffectifSection({ francePlayers }: { francePlayers: Player[] }) {
  const playersByPosition: Record<string, Player[]> = {};
  for (const pos of positionOrder) {
    playersByPosition[pos] = francePlayers.filter((p) => p.position === pos);
  }

  return (
    <section id="effectif" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Effectif probable — {francePlayers.length} joueurs
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Sélection probable pour la CDM 2026 selon notre analyse. Mis à jour en février 2026.
        </p>

        <div className="space-y-6">
          {positionOrder.map((pos) => {
            const posPlayers = playersByPosition[pos] ?? [];
            if (posPlayers.length === 0) return null;

            return (
              <div key={pos}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full inline-block" />
                  {positionLabels[pos]} ({posPlayers.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {posPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-sm">
                        {player.number ?? "—"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors truncate">
                          {player.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">{player.club}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{player.caps} sél.</p>
                        {player.goals > 0 && (
                          <p className="text-xs text-primary">{player.goals} buts</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <Link href="/equipe/france" className="text-sm text-primary hover:underline font-medium">
            Fiche complète de l&apos;équipe de France →
          </Link>
        </div>
      </div>
    </section>
  );
}
