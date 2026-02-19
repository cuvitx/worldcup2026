import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { scorerOdds, topScorerRanking, scorersByTeam } from "@repo/data/scorers";
import { players, playersById } from "@repo/data/players";
import { teams, teamsById } from "@repo/data/teams";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { topScorerCandidates } from "@repo/data/predictions-2026";

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
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Buteurs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Cotes buteurs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            {scorerOdds.length} attaquants et milieux offensifs analyses. Cotes buteur, buts attendus et probabilites pour chaque joueur.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">

        {/* ── TOP 5 CANDIDATS (données prédictions-2026) ── */}
        <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🌟</span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top 5 candidats au Soulier d&apos;Or
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cotes réelles multi-bookmakers · Buts attendus (modèle ELO) · Fév. 2026
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {topScorerCandidates.map((candidate, idx) => {
              const team = teamsById[candidate.teamId];
              const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
              const podiumBg =
                idx === 0 ? "bg-gradient-to-r from-gold/5 to-amber-50/30 dark:from-gold/10 dark:to-amber-900/10" :
                idx === 1 ? "bg-gradient-to-r from-gray-50 to-slate-50/50 dark:from-slate-800/80 dark:to-slate-800/40" :
                idx === 2 ? "bg-gradient-to-r from-orange-50/50 to-amber-50/20 dark:from-orange-900/10 dark:to-amber-900/5" :
                "bg-white dark:bg-slate-800";
              const impliedPct = Math.round(candidate.impliedProbability * 100 * 10) / 10;
              const bestBookmakerOdds = Math.max(candidate.winamax, candidate.betclic, candidate.draftkings);

              return (
                <div key={candidate.playerId} className={`p-6 ${podiumBg}`}>
                  <div className="flex flex-wrap items-start gap-4">
                    {/* Medal + rank */}
                    <div className="shrink-0 text-3xl w-10 text-center">{medal}</div>

                    {/* Player info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        {team && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">{team.flag}</span>
                            <Link href={`/equipe/${team.slug}`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-accent transition-colors">
                              {team.name}
                            </Link>
                          </div>
                        )}
                        <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
                          {impliedPct}% de chances
                        </span>
                      </div>

                      {/* Buts stats */}
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-extrabold text-primary dark:text-blue-300">{candidate.expectedGoals}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Buts attendus</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-extrabold text-gold">{candidate.internationalGoals}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Buts sélection</p>
                        </div>
                        {/* Bar */}
                        <div className="flex-1 flex flex-col justify-center min-w-[100px]">
                          <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent to-gold rounded-full"
                              style={{ width: `${Math.min(impliedPct * 6, 100)}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1">Probabilité implicite</p>
                        </div>
                      </div>

                      {/* Strengths */}
                      <ul className="space-y-0.5">
                        {candidate.strengths.map((s, si) => (
                          <li key={si} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <span className="shrink-0 mt-0.5 text-green-500">✓</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bookmaker odds column */}
                    <div className="shrink-0 flex flex-col gap-2 min-w-[130px]">
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mb-1">
                        Cotes meilleur buteur
                      </p>
                      <div className={`flex items-center justify-between rounded-lg px-3 py-2 border ${candidate.winamax === bestBookmakerOdds ? "bg-gold/10 border-gold/30" : "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/30"}`}>
                        <span className="text-xs font-semibold text-orange-700 dark:text-orange-400">Winamax</span>
                        <span className={`text-sm font-bold ${candidate.winamax === bestBookmakerOdds ? "text-gold" : "text-orange-600 dark:text-orange-300"}`}>
                          {candidate.winamax.toFixed(2)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between rounded-lg px-3 py-2 border ${candidate.betclic === bestBookmakerOdds ? "bg-gold/10 border-gold/30" : "bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-800/30"}`}>
                        <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">Betclic</span>
                        <span className={`text-sm font-bold ${candidate.betclic === bestBookmakerOdds ? "text-gold" : "text-teal-600 dark:text-teal-300"}`}>
                          {candidate.betclic.toFixed(2)}
                        </span>
                      </div>
                      <div className={`flex items-center justify-between rounded-lg px-3 py-2 border ${candidate.draftkings === bestBookmakerOdds ? "bg-gold/10 border-gold/30" : "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"}`}>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400">DraftKings</span>
                        <span className={`text-sm font-bold ${candidate.draftkings === bestBookmakerOdds ? "text-gold" : "text-green-600 dark:text-green-300"}`}>
                          {candidate.draftkings.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-accent/5 border border-accent/15">
                        <span className="text-xs font-semibold text-accent">Moy.</span>
                        <span className="text-sm font-bold text-accent">{candidate.avgOdds.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700">
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              🟡 = Meilleure cote du moment · Buts attendus : modèle ELO × ratio buts/sélection × matchs attendus ·
              Sources : Winamax (football.fr), Betclic, DraftKings (nbcsports.com). Fév. 2026. 18+.
            </p>
          </div>
        </section>

        {/* Top Scorer Ranking */}
        <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Favoris pour le Soulier d&apos;Or</h2>
          <p className="mb-4 text-sm text-gray-600">
            Les 30 joueurs les plus susceptibles de terminer meilleur buteur de la Coupe du Monde 2026.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-left">
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
                    <tr key={so.playerId} className="hover:bg-gray-50 dark:bg-slate-700">
                      <td className="py-3 text-gray-500 font-medium">{i + 1}</td>
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
                            <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
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
        <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
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
                  className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-gray-500">
                      <span role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag}</span> {team?.name} &middot; {player.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{so.expectedGoals} buts att.</p>
                    <p className="text-xs text-gray-500">Cote {so.anytimeScorerOdds}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* By Team */}
        <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Buteurs par équipe</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => {
                const teamScorers = scorersByTeam[team.id];
                if (!teamScorers || teamScorers.length === 0) return null;
                return (
                  <div key={team.id} className="rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                    <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 mb-3 hover:text-accent">
                      <span className="text-xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
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
          <p className="mt-4 text-xs text-gray-500">
            18+. Les jeux d&apos;argent comportent des risques. Jouez responsablement.
          </p>
        </section>
      </div>
    </>
  );
}
