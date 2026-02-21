import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
import { scorerOddsById, topScorerRanking } from "@repo/data/scorers";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ANJBanner } from "@repo/ui/anj-banner";

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players
    .filter((p) => p.position === "FW" || p.position === "MF")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  const team = teamsById[player.teamId];

  return {
    title: `Cote buteur ${player.name} CDM 2026 | Stats, buts & pronostic`,
    description: `Cote buteur ${player.name} (${team?.name}) pour la Coupe du Monde 2026. ${player.goals} buts en ${player.caps} sélections, cotes anytime scorer et Soulier d'Or.`,
    alternates: getAlternates("scorer", slug, "fr"),
    openGraph: {
      title: `${team?.flag ?? ""} Cote buteur ${player.name} - CDM 2026`,
      description: `Stats et cotes buteur de ${player.name} pour la CDM 2026.`,
    },
  };
}

export default async function ButeurPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player || (player.position !== "FW" && player.position !== "MF")) notFound();

  const team = teamsById[player.teamId];
  const scorer = scorerOddsById[player.id];
  const teamPred = team ? predictionsByTeamId[team.id] : undefined;
  const teammates = (team ? playersByTeamId[team.id] ?? [] : [])
    .filter((p) => p.id !== player.id && (p.position === "FW" || p.position === "MF"));

  const positionLabel = player.position === "FW" ? "Attaquant" : "Milieu";
  const goalsPerCap = player.caps > 0 ? (player.goals / player.caps).toFixed(3) : "0";

  // Find rank in top scorer ranking
  const topRank = topScorerRanking.findIndex((s) => s.playerId === player.id);

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team?.name ?? "Inconnu"}`}>{team?.flag ?? "\u26bd"}</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Cote buteur {player.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                {positionLabel} &middot; {player.club}
                {player.clubUpdatedAt && (
                  <span className="ml-2 text-sm text-gray-500">(club au {player.clubUpdatedAt})</span>
                )}
              </p>
              <p className="mt-1 text-gray-500">
                {team?.name} &middot; {player.caps} selections &middot; {player.goals} buts
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scoring Stats */}
            <section className="rounded-xl bg-whiteslate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques de buts</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.goals}</p>
                  <p className="text-xs text-gray-500 mt-1">Buts en sélection</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.caps}</p>
                  <p className="text-xs text-gray-500 mt-1">Selections</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{goalsPerCap}</p>
                  <p className="text-xs text-gray-500 mt-1">Buts/match</p>
                </div>
                <div className="rounded-lg bg-accent/10 p-4 text-center">
                  <p className="text-3xl font-extrabold text-accent">{scorer?.expectedGoals ?? "—"}</p>
                  <p className="text-xs text-gray-500 mt-1">Buts attendus CDM</p>
                </div>
              </div>
              {scorer && (
                <p className="mt-4 text-sm text-gray-600">
                  Avec un ratio de {goalsPerCap} but par match en sélection et une équipe susceptible de jouer
                  plusieurs tours, {player.name} a une esperance de <strong>{scorer.expectedGoals} buts</strong> durant
                  la Coupe du Monde 2026 selon notre modele de Poisson.
                </p>
              )}
              {player.lastUpdated && (
                <p className="mt-2 text-xs text-gray-500">Statistiques au {player.lastUpdated}</p>
              )}
            </section>

            {/* Odds Table */}
            {scorer && (
              <section className="rounded-xl bg-whiteslate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cotes buteur - {player.name}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="pb-3 font-medium text-gray-500">Marche</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Probabilite</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Cote estimee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50slate-700/50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">Buteur a tout moment (1+ but)</td>
                        <td className="py-3 text-right">{(scorer.anytimeScorerProb * 100).toFixed(1)}%</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over05GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50slate-700/50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">2+ buts dans le tournoi</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over15GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50slate-700/50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">3+ buts dans le tournoi</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over25GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50slate-700/50 text-xs uppercase text-gray-500 bg-accent/5">
                        <td className="py-3 font-bold">Meilleur buteur CDM 2026</td>
                        <td className="py-3 text-right">{(scorer.topScorerProb * 100).toFixed(2)}%</td>
                        <td className="py-3 text-right font-extrabold text-accent">{scorer.topScorerOdds}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Les cotes sont estimees par notre modele statistique (distribution de Poisson + rating ELO) avec
                  une marge bookmaker de ~8%. Elles sont indicatives.
                </p>
              </section>
            )}

            {/* Analysis Text */}
            <section className="rounded-xl bg-whiteslate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse : {player.name} buteur CDM 2026</h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                <p>
                  {player.name} ({player.age} ans) evolue au poste de {positionLabel.toLowerCase()} pour {player.club} et
                  compte {player.goals} buts en {player.caps} selections avec {team?.name ?? "sa sélection"}.
                </p>
                {team && teamPred && (
                  <p>
                    {team.name} est classee #{team.fifaRanking} au classement FIFA et a{" "}
                    {(teamPred.winnerProb * 100).toFixed(1)}% de chances de remporter le tournoi selon notre modele ELO.
                    Plus l&apos;équipe avance dans la compétition, plus {player.name} aura de matchs pour marquer.
                  </p>
                )}
                {scorer && scorer.expectedGoals >= 2 && (
                  <p>
                    Avec <strong>{scorer.expectedGoals} buts attendus</strong>, {player.name} fait partie des buteurs les plus
                    dangereux du tournoi. La cote buteur a tout moment de {scorer.anytimeScorerOdds} reflette une probabilite
                    elevee de marquer au moins un but durant la CDM.
                  </p>
                )}
                {scorer && scorer.expectedGoals < 2 && scorer.expectedGoals >= 0.5 && (
                  <p>
                    Avec {scorer.expectedGoals} buts attendus, {player.name} a un profil de buteur occasionnel durant
                    le tournoi. La cote de {scorer.anytimeScorerOdds} peut representer de la valeur si le joueur est en
                    forme au moment du tournoi.
                  </p>
                )}
                <p>
                  Pour parier sur {player.name} buteur, comparez les cotes sur les differents bookmakers agréés en
                  France. Les cotes réelles peuvent offrir de la valeur par rapport à nos estimations.
                </p>
              </div>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="rounded-xl bg-whiteslate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Autres buteurs de {team?.name}</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {teammates.map((tm) => {
                    const tmScorer = scorerOddsById[tm.id];
                    return (
                      <Link
                        key={tm.id}
                        href={`/buteur/${tm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <div>
                          <p className="font-semibold">{tm.name}</p>
                          <p className="text-xs text-gray-500">{tm.position === "FW" ? "Attaquant" : "Milieu"} &middot; {tm.club}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{tmScorer?.expectedGoals ?? "—"} buts att.</p>
                          <p className="text-xs text-gray-500">Cote {tmScorer?.anytimeScorerOdds ?? "—"}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Affiliate CTA */}
            <section className="rounded-xl bg-whiteslate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Parier sur {player.name} buteur
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Comparez les meilleurs sites de paris sportifs pour parier sur {player.name} buteurà la CDM 2026.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-accent bg-accent/5" : "border-gray-200 bg-whiteslate-800"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-accentaccent px-3 py-0.5 text-xs font-bold text-black">
                          Recommandé
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold">{bk.name}</p>
                        <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                        <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-accent hover:bg-accent/80" : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          Parier
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ANJBanner />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiche buteur</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Position</dt>
                  <dd className="font-medium">{positionLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="font-medium">{player.age} ans</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Selections</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Buts</dt>
                  <dd className="font-bold text-primary">{player.goals}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ratio buts/match</dt>
                  <dd className="font-bold text-primary">{goalsPerCap}</dd>
                </div>
                {scorer && (
                  <>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <dt className="text-gray-500">Buts attendus CDM</dt>
                      <dd className="font-bold text-accent">{scorer.expectedGoals}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Cote buteur</dt>
                      <dd className="font-bold text-field">{scorer.anytimeScorerOdds}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Cote top buteur</dt>
                      <dd className="font-bold text-accent">{scorer.topScorerOdds}</dd>
                    </div>
                  </>
                )}
                {topRank >= 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Classement buteur</dt>
                    <dd className="font-bold text-accent">#{topRank + 1}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 space-y-2">
                <Link
                  href={`/joueur/${player.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Fiche complete du joueur &rarr;
                </Link>
                {team && (
                  <Link
                    href={`/equipe/${team.slug}`}
                    className="block w-full text-center rounded-lg border border-primary py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span> Fiche {team.name} &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Parier sur {player.name}
              </h3>
              {scorer && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cote buteur</span>
                    <span className="font-bold text-field">{scorer.anytimeScorerOdds}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Buts attendus</span>
                    <span className="font-bold text-accent">{scorer.expectedGoals}</span>
                  </div>
                </div>
              )}
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center rounded-xl bg-accent py-3.5 text-sm font-bold text-white hover:bg-accent/80 transition-colors"
              >
                {featuredBookmaker.bonus} sur {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-500 text-center">
                {featuredBookmaker.bonusDetail}
              </p>
            </div>

            {/* Guide link */}
            <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guides paris buteurs</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guide/parier-buteurs" className="text-primary hover:underline">
                    Comment parier sur les buteurs CDM 2026 &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/guide/comment-parier-cdm-2026" className="text-primary hover:underline">
                    Guide complet pour parier sur la CDM &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: player.name,
            jobTitle: "Football Player",
            memberOf: {
              "@type": "SportsTeam",
              name: team?.name ?? "",
            },
            description: `Cote buteur ${player.name} pour la CDM 2026. ${player.goals} buts en ${player.caps} selections.`,
            url: `https://cdm2026.fr/buteur/${player.slug}`,
          }),
        }}
      />
    </>
  );
}
