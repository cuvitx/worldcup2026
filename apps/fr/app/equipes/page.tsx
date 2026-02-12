import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";

export const metadata: Metadata = {
  title: "Les 48 equipes de la Coupe du Monde 2026 | Classement, Stats & Pronostics",
  description:
    "Liste complete des 48 equipes qualifiees pour la Coupe du Monde 2026. Classement FIFA, groupe, historique et pronostics pour chaque selection.",
  alternates: getStaticAlternates("teams", "fr"),
  openGraph: {
    title: "48 equipes - Coupe du Monde 2026",
    description: "Toutes les equipes qualifiees pour la CDM 2026 aux Etats-Unis, Canada et Mexique.",
  },
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);
  const confederations = ["UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Equipes</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Les 48 equipes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Classement FIFA, groupe, pronostics et fiche complete de chaque selection qualifiee.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Ranking Table */}
        <section className="rounded-lg bg-white p-6 shadow-sm mb-8">
          <h2 className="mb-4 text-xl font-bold">Classement FIFA des 48 equipes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">Equipe</th>
                  <th className="pb-3 font-medium text-gray-500">Conf.</th>
                  <th className="pb-3 font-medium text-gray-500">Groupe</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Chances CDM</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Pronostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((team) => {
                  const pred = predictionsByTeamId[team.id];
                  return (
                    <tr key={team.id} className="hover:bg-gray-50">
                      <td className="py-3 font-medium">{team.fifaRanking}</td>
                      <td className="py-3">
                        <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 hover:text-accent">
                          <span>{team.flag}</span>
                          <span className="font-medium">{team.name}</span>
                          {team.isHost && <span className="text-xs text-gold">(Hote)</span>}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500">{team.confederation}</td>
                      <td className="py-3">
                        <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-accent">{team.group}</Link>
                      </td>
                      <td className="py-3 text-right">
                        {pred ? (
                          <span className="font-bold text-primary">
                            {pred.winnerProb >= 0.01
                              ? `${(pred.winnerProb * 100).toFixed(1)}%`
                              : `${(pred.winnerProb * 100).toFixed(2)}%`}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <Link href={`/pronostic/${team.slug}`} className="text-accent hover:underline text-sm font-medium">
                          Pronostic &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Confederation */}
        <section className="space-y-8">
          <h2 className="text-xl font-bold">Equipes par confederation</h2>
          {confederations.map((conf) => {
            const confTeams = sorted.filter((t) => t.confederation === conf);
            if (confTeams.length === 0) return null;
            return (
              <div key={conf} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">{conf} ({confTeams.length} equipes)</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {confTeams.map((team) => (
                    <Link
                      key={team.id}
                      href={`/equipe/${team.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <span className="text-2xl">{team.flag}</span>
                      <div>
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-xs text-gray-500">#{team.fifaRanking} FIFA &middot; Groupe {team.group}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
