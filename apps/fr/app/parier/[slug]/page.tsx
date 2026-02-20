import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { playersByTeamId } from "@repo/data/players";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, estimatedOutrightOdds } from "@repo/data/affiliates";
import { Trophy, Calendar, Star, TrendingUp, ExternalLink, ShieldCheck } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};

  return {
    title: `Parier sur ${team.name} — CDM 2026 : Cotes, Pronostics et Bonus`,
    description: `Parier sur ${team.name} lors de la Coupe du Monde 2026 : meilleures cotes, pronostics, bonus bookmakers et analyse complète. Groupe ${team.group}, FIFA #${team.fifaRanking}.`,
    openGraph: {
      title: `${team.flag} Parier sur ${team.name} — CDM 2026`,
      description: `Cotes, pronostics et bonus pour parier sur ${team.name} à la Coupe du Monde 2026.`,
      url: `${domains.fr}/parier/${team.slug}`,
    },
  };
}

/** Generate indicative odds based on FIFA ranking */
function getIndicativeOdds(fifaRanking: number): { winamax: string; betclic: string; unibet: string } {
  let base: number;
  if (fifaRanking <= 3) base = 5.0;
  else if (fifaRanking <= 6) base = 7.0;
  else if (fifaRanking <= 10) base = 12.0;
  else if (fifaRanking <= 15) base = 20.0;
  else if (fifaRanking <= 25) base = 40.0;
  else if (fifaRanking <= 40) base = 80.0;
  else if (fifaRanking <= 60) base = 150.0;
  else base = 500.0;

  return {
    winamax: (base * 0.95).toFixed(2),
    betclic: base.toFixed(2),
    unibet: (base * 1.05).toFixed(2),
  };
}

export default async function ParierEquipePage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const prediction = predictionsByTeamId[team.id];
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );
  const groupMatches = teamMatches.filter((m) => m.stage === "group");

  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const odds = getIndicativeOdds(team.fifaRanking);

  // Key players: pick top 3 forwards/midfielders by caps
  const keyPlayers = teamPlayers
    .filter((p) => p.position === "FW" || p.position === "MF")
    .sort((a, b) => b.caps - a.caps)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Paris sportifs", href: "/paris-sportifs" },
    { label: `Parier sur ${team.name}` },
  ];

  const faqItems = [
    {
      question: `Comment parier sur ${team.name} pour la CDM 2026 ?`,
      answer: `Inscrivez-vous sur un bookmaker agréé ANJ (Betclic, Winamax, Unibet), profitez du bonus de bienvenue, puis recherchez "Coupe du Monde 2026" et sélectionnez ${team.name} dans les paris vainqueur, qualification de groupe ou matchs individuels.`,
    },
    {
      question: `Quelle est la cote de ${team.name} pour gagner la CDM 2026 ?`,
      answer: `La cote indicative de ${team.name} pour remporter la Coupe du Monde 2026 est d'environ ${odds.betclic} chez Betclic. Cette cote évolue selon les résultats et la forme de l'équipe.`,
    },
    {
      question: `${team.name} peut-elle se qualifier en phase à élimination directe ?`,
      answer: prediction
        ? `Selon nos modèles, ${team.name} a ${Math.round(prediction.groupStageProb * 100)}% de chances de passer la phase de groupes.`
        : `Les chances dépendront du tirage et de la forme de ${team.name} en 2026.`,
    },
    {
      question: `Quels sont les meilleurs paris sur ${team.name} ?`,
      answer: `Les paris les plus intéressants incluent : vainqueur du Groupe ${team.group}, qualification en phase finale, et les paris sur les matchs individuels de la phase de groupes.`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Paris sportifs", url: "/paris-sportifs" },
          { name: `Parier sur ${team.name}`, url: `/parier/${team.slug}` },
        ]}
        baseUrl={domains.fr}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team.name}`}>
              {team.flag}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Parier sur {team.name} — CDM 2026 : Cotes, Pronostics et Bonus
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Groupe {team.group} · FIFA #{team.fifaRanking} · Cote vainqueur : {winnerOdds}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Cote victoire finale */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Trophy className="h-6 w-6 text-secondary" />
                Cote victoire finale {team.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Winamax</p>
                  <p className="text-3xl font-extrabold text-primary">{odds.winamax}</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Betclic</p>
                  <p className="text-3xl font-extrabold text-primary">{odds.betclic}</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Unibet</p>
                  <p className="text-3xl font-extrabold text-primary">{odds.unibet}</p>
                </div>
              </div>
              {prediction && (
                <p className="mt-4 text-sm text-secondary">
                  Probabilité implicite : {Math.round((1 / parseFloat(odds.betclic)) * 100)}% · Notre estimation : {Math.round(prediction.winnerProb * 100)}%
                </p>
              )}
              <p className="mt-2 text-xs text-gray-400">
                Cotes indicatives basées sur le classement FIFA. Consultez les bookmakers pour les cotes en temps réel.
              </p>
            </section>

            {/* Calendrier des matchs */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Calendar className="h-6 w-6 text-secondary" />
                Calendrier des matchs — Groupe {team.group}
              </h2>
              {groupMatches.length > 0 ? (
                <div className="space-y-3">
                  {groupMatches.map((match) => {
                    const isHome = match.homeTeamId === team.id;
                    const opponentId = isHome ? match.awayTeamId : match.homeTeamId;
                    return (
                      <Link
                        key={match.id}
                        href={`/pronostic-match/${match.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {isHome ? team.name : opponentId} vs {isHome ? opponentId : team.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            J{match.matchday} · {new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Calendrier à venir.</p>
              )}
              <p className="mt-4 text-sm text-gray-500">
                <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-accent hover:underline">
                  Voir tout le Groupe {team.group} →
                </Link>
              </p>
            </section>

            {/* Meilleures cotes */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
                Meilleures cotes {team.name} CDM 2026
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">Bookmaker</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">Cote vainqueur</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">Bonus</th>
                      <th className="py-3 font-semibold text-gray-700 dark:text-gray-300"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookmakers.slice(0, 3).map((bk, i) => (
                      <tr key={bk.id} className="border-b border-gray-100 dark:border-slate-700/50">
                        <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{bk.name}</td>
                        <td className="py-3 pr-4 font-bold text-primary">
                          {i === 0 ? odds.winamax : i === 1 ? odds.betclic : odds.unibet}
                        </td>
                        <td className="py-3 pr-4 text-accent font-semibold">{bk.bonus}</td>
                        <td className="py-3">
                          <a
                            href={bk.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored nofollow"
                            className="inline-block bg-accent text-white rounded-xl py-2 px-4 text-xs font-bold hover:opacity-90 transition-opacity"
                          >
                            Parier
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Joueurs clés */}
            {keyPlayers.length > 0 && (
              <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  <Star className="h-6 w-6 text-secondary" />
                  Joueurs clés à suivre
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {keyPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/buteur/${player.slug}`}
                      className="rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <p className="font-bold text-gray-900 dark:text-white">{player.name}</p>
                      <p className="text-sm text-gray-500">{player.club}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {player.caps} sél. · {player.goals} buts
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Paris recommandés */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <ShieldCheck className="h-6 w-6 text-secondary" />
                Paris recommandés sur {team.name}
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white">🏆 Vainqueur Groupe {team.group}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {team.name} termine 1er de son groupe.
                    {prediction && ` Probabilité estimée : ${Math.round(prediction.groupStageProb * 100)}%.`}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white">✅ Qualification en phase à élimination directe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {team.name} passe la phase de groupes (top 2 ou meilleur 3e).
                  </p>
                </div>
                {keyPlayers[0] && (
                  <div className="rounded-lg bg-primary/5 p-4">
                    <p className="font-semibold text-gray-900 dark:text-white">⚽ Meilleur buteur de l&apos;équipe</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {keyPlayers[0].name} meilleur buteur de {team.name} dans le tournoi.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* CTA Bookmaker */}
            <section className="bg-accent rounded-xl py-3.5 px-6 text-center">
              <p className="text-white font-bold text-lg mb-2">
                Parier sur {team.name} — Jusqu&apos;à 100€ offerts
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {bookmakers.slice(0, 3).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="inline-block bg-white text-accent rounded-lg py-2 px-5 text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    {bk.name} — {bk.bonus}
                  </a>
                ))}
              </div>
              <p className="text-white/70 text-xs mt-3">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </section>

            {/* FAQ */}
            <FAQSection items={faqItems} title={`Questions fréquentes — Parier sur ${team.name}`} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick links */}
            <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/equipe/${team.slug}`} className="text-accent hover:underline">
                    Fiche complète {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/pronostic/${team.slug}`} className="text-accent hover:underline">
                    Pronostic {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/cote-champion/${team.slug}`} className="text-accent hover:underline">
                    Cote {team.name} championne du monde
                  </Link>
                </li>
                <li>
                  <Link href={`/effectif/${team.slug}`} className="text-accent hover:underline">
                    Effectif {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/scenarios-qualification-equipe/${team.slug}`} className="text-accent hover:underline">
                    Scénarios de qualification
                  </Link>
                </li>
                <li>
                  <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-accent hover:underline">
                    Groupe {team.group}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bookmaker sidebar */}
            <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Meilleurs bookmakers</h3>
              <div className="space-y-3">
                {bookmakers.slice(0, 4).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="block rounded-lg border border-gray-200 dark:border-slate-700 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{bk.name}</p>
                    <p className="text-accent text-xs font-bold">{bk.bonus} {bk.bonusDetail}</p>
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
