import type { Metadata } from "next";
import Link from "next/link";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

export const metadata: Metadata = {
  title: "210 jugadores clave de la Copa del Mundo 2026 | Plantillas & Estadisticas",
  description:
    "Los 210 jugadores clave de las 48 selecciones de la Copa del Mundo 2026. Estadisticas, clubes, convocatorias y goles de cada jugador.",
};

export default function PlayersPage() {
  const positionLabels: Record<string, string> = {
    GK: "Porteros",
    DF: "Defensas",
    MF: "Centrocampistas",
    FW: "Delanteros",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Jugadores</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Jugadores clave del Mundial 2026</h1>
          <p className="mt-2 text-gray-300">
            {players.length} jugadores clave de las 48 selecciones. Delanteros, centrocampistas, defensas y porteros.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Top Scorers */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Maximos goleadores internacionales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Jugador</th>
                  <th className="pb-3 font-medium text-gray-500">Seleccion</th>
                  <th className="pb-3 font-medium text-gray-500">Club</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Goles</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Int.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 20)
                  .map((player) => {
                    const team = teamsById[player.teamId];
                    return (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <Link href={`/jugador/${player.slug}`} className="font-medium hover:text-accent">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/equipo/${team.slug}`} className="flex items-center gap-1 hover:text-accent">
                              <span>{team.flag}</span>
                              <span className="text-gray-600">{team.name}</span>
                            </Link>
                          )}
                        </td>
                        <td className="py-3 text-gray-500">{player.club}</td>
                        <td className="py-3 text-right font-bold text-primary">{player.goals}</td>
                        <td className="py-3 text-right text-gray-500">{player.caps}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Position */}
        {positions.map((pos) => {
          const posPlayers = players
            .filter((p) => p.position === pos)
            .sort((a, b) => b.goals - a.goals || b.caps - a.caps);
          return (
            <section key={pos} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{positionLabels[pos]} ({posPlayers.length})</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posPlayers.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={player.id}
                      href={`/jugador/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          {team?.flag} {team?.name} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{player.goals} goles</p>
                        <p className="text-xs text-gray-400">{player.caps} int.</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
