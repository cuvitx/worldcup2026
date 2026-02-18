import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { players } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

export const metadata: Metadata = {
  title: "210 joueurs cles de la Coupe du Monde 2026 | Effectifs & Stats",
  description:
    "Les 210 joueurs cles des 48 équipes de la Coupe du Monde 2026. Statistiques, clubs, selections et buts pour chaque joueur.",
  alternates: getStaticAlternates("players", "fr"),
};

export default function PlayersPage() {
  const positionLabels: Record<string, string> = {
    GK: "Gardiens",
    DF: "Defenseurs",
    MF: "Milieux",
    FW: "Attaquants",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Joueurs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Joueurs cles de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            {players.length} joueurs cles des 48 selections. Attaquants, milieux, defenseurs et gardiens.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Top Scorers */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Meilleurs buteurs en sélection</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Joueur</th>
                  <th className="pb-3 font-medium text-gray-500">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500">Club</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Buts</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Sel.</th>
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
                          <Link href={`/joueur/${player.slug}`} className="font-medium hover:text-accent">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/equipe/${team.slug}`} className="flex items-center gap-1 hover:text-accent">
                              <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
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
                      href={`/joueur/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span> {team?.name} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{player.goals} buts</p>
                        <p className="text-xs text-gray-500">{player.caps} sel.</p>
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
