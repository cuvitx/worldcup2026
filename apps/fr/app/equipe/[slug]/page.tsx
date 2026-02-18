import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import { generateFullTeamAnalysis } from "@repo/ai/generators";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import ExpandablePlayerList from "./ExpandablePlayerList";

export const revalidate = 3600;

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
    title: `${team.name} - Coupe du Monde 2026 | Effectif, Stats & Pronostics`,
    description: `Tout sur ${team.name}à la Coupe du Monde 2026 : effectif, statistiques, historique, groupe ${team.group}, cotes et pronostics. ${team.description}`,
    alternates: getAlternates("team", slug, "fr"),
    openGraph: {
      title: `${team.flag} ${team.name} - CDM 2026`,
      description: `Fiche complete de ${team.name} pour la Coupe du Monde 2026. Groupe ${team.group}, classement FIFA #${team.fifaRanking}.`,
    },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const group = groupsByLetter[team.group];
  const groupTeams = group
    ? group.teams
        .map((id) => teams.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => t != null && t.id !== team.id)
    : [];

  const prediction = predictionsByTeamId[team.id];
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = (matchesByGroup[team.group] ?? []).filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  // Fetch AI-enriched data (gracefully returns nulls if APIs unavailable)
  let enriched: Awaited<ReturnType<typeof generateFullTeamAnalysis>> | null = null;
  try {
    enriched = await generateFullTeamAnalysis(team.id, "fr");
  } catch {
    // AI generation failed — page renders with static data only
  }

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"},{name:"Groupe "+team.group,url:"/groupe/"+team.group.toLowerCase()},{name:team.name,url:"/equipe/"+team.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="hover:text-primary">Équipes</Link></li>
            <li>/</li>
            <li><Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary">Groupe {team.group}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{team.name}</li>
          </ol>
        </div>
      </nav>

      {/* Team Header */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team.flag}</span>
            <div>
              <h1 className="text-4xl font-extrabold">{team.name}</h1>
              <p className="mt-2 text-gray-300">
                {team.confederation} &middot; Classement FIFA #{team.fifaRanking} &middot; Groupe {team.group}
              </p>
              {team.isHost && (
                <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold">
                  Pays hote
                </span>
              )}
              <Link
                href={`/pronostic/${team.slug}`}
                className="mt-3 inline-block rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Voir le pronostic &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Presentation</h2>
              <p className="text-gray-700 leading-relaxed">{team.description}</p>
            </section>

            {/* AI Analysis */}
            {enriched?.analysis && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-xl font-bold">Analyse</h2>
                  <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">IA</span>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: enriched?.analysis.content }} />
              </section>
            )}

            {/* World Cup History */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Historique en Coupe du Monde</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{team.wcAppearances}</p>
                  <p className="text-sm text-gray-500">Participations</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{team.bestResult}</p>
                  <p className="text-sm text-gray-500">Meilleur résultat</p>
                </div>
              </div>
            </section>

            {/* Predictions */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Pronostics CDM 2026</h2>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/5 px-4 py-2">
                    <span className="text-sm text-gray-500">Rating ELO</span>
                    <p className="text-2xl font-extrabold text-primary">{prediction.eloRating}</p>
                  </div>
                  <div className="rounded-lg bg-gold/10 px-4 py-2">
                    <span className="text-sm text-gray-500">Chances de victoire</span>
                    <p className="text-2xl font-extrabold text-gold">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {[
                    { label: "Phase de groupes", value: prediction.groupStageProb },
                    { label: "32e de finale", value: prediction.roundOf32Prob },
                    { label: "8e de finale", value: prediction.roundOf16Prob },
                    { label: "Quart de finale", value: prediction.quarterFinalProb },
                    { label: "Demi-finale", value: prediction.semiFinalProb },
                    { label: "Finale", value: prediction.finalProb },
                  ].map((stage) => (
                    <div key={stage.label} className="rounded bg-gray-50 p-2 text-center">
                      <p className="text-lg font-bold text-primary">{Math.round(stage.value * 100)}%</p>
                      <p className="text-xs text-gray-500">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Players */}
            {teamPlayers.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Joueurs clés</h2>
                <ExpandablePlayerList players={teamPlayers} />
              </section>
            )}

            {/* Group Matches */}
            {teamMatches.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Matchs de groupe</h2>
                <div className="space-y-3">
                  {teamMatches.map((match) => {
                    const opponent = teams.find(
                      (t) =>
                        t.id ===
                        (match.homeTeamId === team.id
                          ? match.awayTeamId
                          : match.homeTeamId)
                    );
                    const isHome = match.homeTeamId === team.id;
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <span className="text-sm text-gray-500 w-20 shrink-0">
                          {match.date.slice(5)}
                        </span>
                        <span className="text-lg">{opponent?.flag ?? "🏳️"}</span>
                        <div className="flex-1">
                          <p className="font-semibold">
                            {isHome ? "vs" : "@"} {opponent?.name ?? "A determiner"}
                          </p>
                          <p className="text-xs text-gray-500">
                            J{match.matchday} &middot; {match.time} UTC
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Group Stage */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-accent">
                  Groupe {team.group}
                </Link>
              </h2>
              <p className="mb-4 text-gray-600">
                Adversaires de {team.name} en phase de groupes :
              </p>
              <div className="space-y-3">
                {groupTeams.map((opponent) => (
                  <div
                    key={opponent.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                  >
                    <span className="text-2xl">{opponent.flag}</span>
                    <div className="flex-1 min-w-0">
                      <Link href={`/equipe/${opponent.slug}`} className="font-semibold hover:text-accent">
                        {opponent.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {opponent.confederation} &middot; #{opponent.fifaRanking} FIFA
                      </p>
                    </div>
                    <Link
                      href={`/h2h/${team.slug}-vs-${opponent.slug}`}
                      className="shrink-0 rounded bg-accent/10 px-2 py-1 text-xs text-accent font-medium hover:bg-accent/20"
                    >
                      H2H &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Fiche technique</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Code FIFA</dt>
                  <dd className="font-medium">{team.code}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Confederation</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Classement FIFA</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Groupe</dt>
                  <dd className="font-medium">{team.group}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Participations CDM</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Meilleur résultat</dt>
                  <dd className="font-medium">{team.bestResult}</dd>
                </div>
              </dl>
            </div>

            {/* Live Form & Stats */}
            {(enriched?.form || enriched?.goalStats) && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Forme actuelle</h3>
                {enriched?.form && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">5 derniers matchs</p>
                    <div className="flex gap-1">
                      {enriched?.form.split("").map((r, i) => (
                        <span
                          key={i}
                          className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white ${
                            r === "W" ? "bg-green-500" : r === "D" ? "bg-yellow-500" : r === "L" ? "bg-red-500" : "bg-gray-300"
                          }`}
                        >
                          {r === "W" ? "V" : r === "D" ? "N" : r === "L" ? "D" : r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {enriched?.goalStats && (
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded bg-gray-50 p-2">
                      <p className="text-lg font-bold text-field">{enriched?.goalStats.scored}</p>
                      <p className="text-xs text-gray-500">Buts marques</p>
                    </div>
                    <div className="rounded bg-gray-50 p-2">
                      <p className="text-lg font-bold text-red-500">{enriched?.goalStats.conceded}</p>
                      <p className="text-xs text-gray-500">Buts encaisses</p>
                    </div>
                    <div className="rounded bg-gray-50 p-2">
                      <p className="text-lg font-bold text-primary">{enriched?.goalStats.cleanSheets}</p>
                      <p className="text-xs text-gray-500">Clean sheets</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Injuries */}
            {(enriched?.injuries?.length ?? 0) > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold">Blessures</h3>
                <ul className="space-y-2">
                  {enriched?.injuries?.map((inj) => (
                    <li key={inj.player} className="flex items-center gap-2 text-sm">
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                        {inj.type === "Missing Fixture" ? "Absent" : inj.type}
                      </span>
                      <span className="font-medium">{inj.player}</span>
                      <span className="text-gray-500">— {inj.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Betting */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Pronostic {team.name}</h3>
              {prediction ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rating ELO</span>
                    <span className="font-bold text-primary">{prediction.eloRating}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Passer les groupes</span>
                    <span className="font-bold text-field">{Math.round(prediction.groupStageProb * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gagner la CDM</span>
                    <span className="font-bold text-gold">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Les pronostics seront disponibles prochainement.
                </p>
              )}
            </div>

            {/* Related Teams */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Équipes du groupe {team.group}</h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/equipe/${t.slug}`}
                      className="flex items-center gap-2 text-sm hover:text-accent"
                    >
                      <span>{t.flag}</span>
                      <span>{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: team.name,
            alternateName: team.code,
            sport: "Football",
            url: `${domains.fr}/equipe/${team.slug}`,
            description: team.description,
            memberOf: {
              "@type": "SportsOrganization",
              name: "FIFA World Cup 2026",
            },
          }),
        }}
      />
    </>
  );
}
