import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { scorerOdds, topScorerRanking, scorersByTeam } from "@repo/data/scorers";
import { players, playersById } from "@repo/data/players";
import { teams, teamsById } from "@repo/data/teams";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Cotes buteurs CDM 2026 | Meilleur buteur, stats & pronostics",
  description:
    "Cotes buteurs de la Coupe du Monde 2026. Classement des meilleurs buteurs potentiels, probabilites de buts, cotes anytime scorer et pronostics pour chaque attaquant et milieu offensif.",
  alternates: getStaticAlternates("scorers", "fr"),
  openGraph: {
    title: "Cotes buteurs - Coupe du Monde 2026",
    description:
      "Tous les attaquants et milieux offensifs de la CDM 2026 avec leurs cotes buteur, stats et probabilites.",
  },
};

export default function ButeursPage() {
  const top30 = topScorerRanking.slice(0, 30);

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Buteurs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Cotes buteurs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            {scorerOdds.length} attaquants et milieux offensifs analyses. Cotes buteur, buts attendus et probabilites pour chaque joueur.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Top Scorer Ranking */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Favoris pour le Soulier d&apos;Or</h2>
          <p className="mb-4 text-sm text-gray-600">
            Les 30 joueurs les plus susceptibles de terminer meilleur buteur de la Coupe du Monde 2026.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">Joueur</th>
                  <th className="pb-3 font-medium text-gray-500">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Buts attendus</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Cote buteur</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Cote top buteur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {top30.map((so, i) => {
                  const player = playersById[so.playerId];
                  const team = player ? teamsById[player.teamId] : undefined;
                  return (
                    <tr key={so.playerId} className="hover:bg-gray-50">
                      <td className="py-3 text-gray-400 font-medium">{i + 1}</td>
                      <td className="py-3">
                        {player && (
                          <Link href={`/buteur/${player.slug}`} className="font-medium hover:text-accent">
                            {player.name}
                          </Link>
                        )}
                      </td>
                      <td className="py-3">
                        {team && (
                          <Link href={`/equipe/${team.slug}`} className="flex items-center gap-1 hover:text-accent">
                            <span>{team.flag}</span>
                            <span className="text-gray-600">{team.name}</span>
                          </Link>
                        )}
                      </td>
                      <td className="py-3 text-right font-bold text-primary">{so.expectedGoals}</td>
                      <td className="py-3 text-right font-medium text-field">{so.anytimeScorerOdds}</td>
                      <td className="py-3 text-right font-bold text-gold">{so.topScorerOdds}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* All scorers by expected goals */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Tous les buteurs potentiels</h2>
          <p className="mb-4 text-sm text-gray-600">
            Tous les attaquants et milieux offensifs avec leurs cotes buteur estimees.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {scorerOdds.slice(0, 90).map((so) => {
              const player = playersById[so.playerId];
              const team = player ? teamsById[player.teamId] : undefined;
              if (!player) return null;
              return (
                <Link
                  key={so.playerId}
                  href={`/buteur/${player.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-gray-500">
                      {team?.flag} {team?.name} &middot; {player.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{so.expectedGoals} buts att.</p>
                    <p className="text-xs text-gray-400">Cote {so.anytimeScorerOdds}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* By Team */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Buteurs par équipe</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => {
                const teamScorers = scorersByTeam[team.id];
                if (!teamScorers || teamScorers.length === 0) return null;
                return (
                  <div key={team.id} className="rounded-lg border border-gray-200 p-4">
                    <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 mb-3 hover:text-accent">
                      <span className="text-xl">{team.flag}</span>
                      <h3 className="font-bold">{team.name}</h3>
                    </Link>
                    <ul className="space-y-1">
                      {teamScorers.slice(0, 3).map((so) => {
                        const player = playersById[so.playerId];
                        if (!player) return null;
                        return (
                          <li key={so.playerId}>
                            <Link
                              href={`/buteur/${player.slug}`}
                              className="flex items-center justify-between text-sm hover:text-accent"
                            >
                              <span>{player.name}</span>
                              <span className="font-medium text-primary">{so.expectedGoals} buts</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-accent/5 border border-accent/20 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-accent">Parier sur les buteurs CDM 2026</h2>
          <p className="mb-4 text-sm text-gray-600">
            Comparez les cotes buteurs sur les meilleurs sites de paris sportifs agréés en France.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {bookmakers.slice(0, 3).map((bk) => (
              <a
                key={bk.id}
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                {bk.bonus} sur {bk.name}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            18+. Les jeux d&apos;argent comportent des risques. Jouez responsablement.
          </p>
        </section>
      </div>
    </>
  );
}
