import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import { generateFullTeamAnalysis } from "@repo/ai/generators";
import type { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { teamWorldCupHistory } from "@repo/data/team-history";
import { getFlagPath, getISOCode } from "@repo/data/country-codes";
import { teamRatings } from "@repo/data/team-ratings";
import RadarChart from "../../components/RadarChart";
import { RelatedContent, type RelatedItem } from "../../components/RelatedContent";
import ExpandablePlayerList from "./ExpandablePlayerList";
import SquadTable from "./SquadTable";

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

  const iso = getISOCode(slug);
  const ogImages = iso
    ? [{ url: `https://flagcdn.com/w320/${iso}.png`, width: 320, height: 213, alt: `Drapeau de ${team.name}` }]
    : [{ url: "https://cdm2026.fr/images/og-default.png", width: 1200, height: 630, alt: "CDM 2026" }];

  return {
    title: `${team.name} - Coupe du Monde 2026 | Effectif, Stats & Pronostics`,
    description: `Tout sur ${team.name} à la Coupe du Monde 2026 : effectif, statistiques, historique, groupe ${team.group}, cotes et pronostics. ${team.description}`,
    alternates: getAlternates("team", slug, "fr"),
    openGraph: {
      title: `${team.flag} ${team.name} - CDM 2026`,
      description: `Fiche complete de ${team.name} pour la Coupe du Monde 2026. Groupe ${team.group}, classement FIFA #${team.fifaRanking}.`,
      images: ogImages,
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
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="hover:text-primary">Équipes</Link></li>
            <li>/</li>
            <li><Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary">Groupe {team.group}</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{team.name}</li>
          </ol>
        </div>
      </nav>

      {/* Team Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {/* Flag image — real SVG when available, emoji fallback */}
            {getFlagPath(team.slug) ? (
              <div className="relative h-24 w-36 sm:h-32 sm:w-48 overflow-hidden rounded-xl shadow-lg border-2 border-white/20 shrink-0">
                <Image
                  src={getFlagPath(team.slug)!}
                  alt={`Drapeau de ${team.name}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 144px, 192px"
                />
              </div>
            ) : (
              <span className="text-5xl sm:text-8xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            )}
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">{team.name}</h1>
              <p className="mt-2 text-gray-300">
                {team.confederation} &middot; Classement FIFA #{team.fifaRanking} &middot; Groupe {team.group}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
              {team.isHost && (
                <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold">
                  Pays hôte
                </span>
              )}
              <Link
                href={`/pronostic/${team.slug}`}
                className="inline-block rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Voir le pronostic &rarr;
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            {/* Description */}
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Présentation</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">{team.description}</p>
            </section>

            {/* Radar Chart */}
            {teamRatings[team.slug] && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Profil de l&apos;équipe</h2>
                <RadarChart rating={teamRatings[team.slug]!} color="#3b82f6" />
              </section>
            )}

            {/* AI Analysis */}
            {enriched?.analysis && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analyse</h2>
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">IA</span>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(enriched?.analysis.content ?? "") }} />
              </section>
            )}

            {/* World Cup History — enhanced */}
            {(() => {
              const history = teamWorldCupHistory[team.id];
              return (
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Historique en Coupe du Monde</h2>
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{history?.participations ?? team.wcAppearances}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Participations</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                      <p className="text-lg font-bold text-primary">{history?.bestResult ?? team.bestResult}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Meilleur résultat</p>
                    </div>
                  </div>

                  {/* Years participated */}
                  {history && history.yearsParticipated.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-sm text-gray-500 uppercase tracking-wide mb-2">Années de participation</h3>
                      <div className="flex flex-wrap gap-2">
                        {history.yearsParticipated.map((year) => (
                          <span
                            key={year}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20"
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notable results table */}
                  {history && history.notableResults.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-sm text-gray-500 uppercase tracking-wide mb-3">Résultats notables</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-left">
                              <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Année</th>
                              <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Stade</th>
                              <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Détail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {history.notableResults.map((result, idx) => (
                              <tr
                                key={result.year}
                                className={`border-b border-gray-100 dark:border-slate-700 ${idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-slate-700/30"}`}
                              >
                                <td className="px-3 py-2 font-bold text-primary">{result.year}</td>
                                <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{result.stage}</td>
                                <td className="px-3 py-2 text-gray-500 dark:text-gray-300 hidden sm:table-cell">{result.detail ?? "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </section>
              );
            })()}

            {/* Palmarès CDM */}
            {teamWorldCupHistory[team.id] && (() => {
              const history = teamWorldCupHistory[team.id]!;
              const titles = history.notableResults.filter((r) => r.stage.includes("Champion"));
              return titles.length > 0 ? (
                <section className="rounded-xl border border-gold/30 dark:border-gold/20 bg-gold/5 dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 dark: flex items-center gap-2">
                    <span>🏆</span> Palmarès en Coupe du Monde
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {titles.map((title) => (
                      <div
                        key={title.year}
                        className="flex flex-col items-center rounded-xl bg-gold/10 dark:bg-gold/20 border border-gold/40 dark:border-gold/30 px-5 py-4 min-w-[110px] text-center"
                      >
                        <span className="text-4xl mb-1">🏆</span>
                        <span className="text-2xl font-extrabold text-gold dark:text-gold">{title.year}</span>
                        {title.detail && (
                          <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-snug max-w-[120px]">{title.detail}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gold dark:text-gold">
                      {titles.length} titre{titles.length > 1 ? "s" : ""} mondial{titles.length > 1 ? "aux" : ""}
                    </span>{" "}
                    remporté{titles.length > 1 ? "s" : ""} en Coupe du Monde.
                  </p>
                </section>
              ) : null;
            })()}

            {/* Forces & Faiblesses */}
            {teamWorldCupHistory[team.id] && (() => {
              const history = teamWorldCupHistory[team.id]!;
              return (
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 dark:">Forces &amp; Faiblesses</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm text-green-700 dark:text-green-400 uppercase tracking-wide">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs">✓</span>
                        Forces
                      </h3>
                      <ul className="space-y-2">
                        {history.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 uppercase tracking-wide">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs">✗</span>
                        Faiblesses
                      </h3>
                      <ul className="space-y-2">
                        {history.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* Style de jeu */}
            {teamWorldCupHistory[team.id]?.playingStyle && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Style de jeu</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {teamWorldCupHistory[team.id]!.playingStyle}
                </p>
              </section>
            )}

            {/* Anecdotes */}
            {teamWorldCupHistory[team.id] && (() => {
              const history = teamWorldCupHistory[team.id]!;
              return history.anecdotes.length > 0 ? (
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 dark:">Anecdotes &amp; Moments inoubliables</h2>
                  <div className="space-y-4">
                    {history.anecdotes.map((anecdote, idx) => (
                      <div key={idx} className="flex gap-4 rounded-lg bg-gray-50 dark:bg-slate-700 p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{anecdote}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;
            })()}

            {/* Predictions */}
            {prediction && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pronostics CDM 2026</h2>
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
                    <div key={stage.label} className="rounded bg-gray-50 dark:bg-slate-700 p-2 text-center">
                      <p className="text-lg font-bold text-primary">{Math.round(stage.value * 100)}%</p>
                      <p className="text-xs text-gray-500">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Effectif probable */}
            {teamPlayers.length > 0 && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Effectif probable</h2>
                <p className="mb-4 text-sm text-gray-500">{teamPlayers.length} joueurs sélectionnés</p>
                <SquadTable players={teamPlayers} />
              </section>
            )}

            {/* Key Players */}
            {teamPlayers.length > 0 && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Joueurs clés</h2>
                <ExpandablePlayerList players={teamPlayers} />
              </section>
            )}

            {/* Group Matches */}
            {teamMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Matchs de groupe</h2>
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
                        className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <span className="text-sm text-gray-500 w-20 shrink-0">
                          {match.date.slice(5)}
                        </span>
                        <span className="text-lg" role="img" aria-label={`Drapeau de ${opponent?.name ?? "Inconnu"}`}>{opponent?.flag ?? "🏳️"}</span>
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
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary">
                  Groupe {team.group}
                </Link>
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Adversaires de {team.name} en phase de groupes :
              </p>
              <div className="space-y-3">
                {groupTeams.map((opponent) => (
                  <div
                    key={opponent.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3"
                  >
                    <span className="text-2xl" role="img" aria-label={`Drapeau de ${opponent.name}`}>{opponent.flag}</span>
                    <div className="flex-1 min-w-0">
                      <Link href={`/equipe/${opponent.slug}`} className="font-semibold hover:text-primary">
                        {opponent.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {opponent.confederation} &middot; #{opponent.fifaRanking} FIFA
                      </p>
                    </div>
                    <Link
                      href={`/h2h/${team.slug}-vs-${opponent.slug}`}
                      className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs text-primary font-medium hover:bg-primary/20"
                    >
                      H2H &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Stadiums where this team plays */}
            {(() => {
              const teamStadiums = [
                ...new Set(teamMatches.map((m) => m.stadiumId)),
              ]
                .map((id) => stadiumsById[id])
                .filter((s): s is NonNullable<typeof s> => s != null);
              if (teamStadiums.length === 0) return null;
              return (
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {teamStadiums.length > 1 ? "Stades" : "Stade"} de {team.name}
                  </h2>
                  <div className="space-y-3">
                    {teamStadiums.map((stadium) => (
                      <Link
                        key={stadium.id}
                        href={`/stade/${stadium.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <span className="text-2xl">🏟️</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{stadium.name}</p>
                          <p className="text-sm text-gray-500">
                            {stadium.city} &middot; {stadium.capacity.toLocaleString("fr-FR")} places
                          </p>
                        </div>
                        <span className="text-primary text-sm shrink-0">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forme récente (mocked static data) */}
            {(() => {
              const mockForms: Record<string, string[]> = {
                france: ["V", "V", "N", "V", "D"],
                brazil: ["V", "N", "V", "V", "V"],
                argentina: ["V", "V", "V", "N", "V"],
                germany: ["V", "D", "V", "N", "V"],
                spain: ["V", "V", "V", "V", "N"],
                england: ["V", "N", "V", "V", "D"],
                portugal: ["V", "V", "D", "V", "V"],
                netherlands: ["N", "V", "V", "D", "V"],
                belgium: ["V", "D", "N", "V", "V"],
                italy: ["V", "V", "N", "D", "V"],
              };
              const form = mockForms[team.slug] ?? ["V", "N", "D", "V", "N"];
              const colors: Record<string, string> = {
                V: "bg-green-500",
                N: "bg-gray-400",
                D: "bg-red-500",
              };
              const labels: Record<string, string> = {
                V: "Victoire",
                N: "Nul",
                D: "Défaite",
              };
              return (
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Forme récente</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">5 derniers matchs</p>
                  <div className="flex gap-2">
                    {form.map((r, i) => (
                      <span
                        key={i}
                        title={labels[r]}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${colors[r]}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-400">Données indicatives (qualifications)</p>
                </div>
              );
            })()}

            {/* Mini classement du groupe */}
            {group && (() => {
              const allGroupTeams = group.teams
                .map((id) => teams.find((t) => t.id === id))
                .filter((t): t is NonNullable<typeof t> => t != null);
              // Mock standings based on FIFA ranking (sorted)
              const standings = allGroupTeams
                .map((t, _i) => {
                  // Generate plausible mock data
                  const seed = t.fifaRanking;
                  const pts = seed <= 10 ? 7 : seed <= 25 ? 5 : seed <= 50 ? 3 : 1;
                  const gf = seed <= 10 ? 5 : seed <= 25 ? 3 : seed <= 50 ? 2 : 1;
                  const ga = seed <= 10 ? 1 : seed <= 25 ? 2 : seed <= 50 ? 3 : 5;
                  return { team: t, pts, gf, ga, gd: gf - ga };
                })
                .sort((a, b) => b.pts - a.pts || b.gd - a.gd);
              return (
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary">
                      Groupe {team.group}
                    </Link>
                  </h3>
                  <div className="overflow-x-auto"><table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-slate-800 text-gray-500 text-xs">
                        <th className="py-2 px-2 text-left">#</th>
                        <th className="py-2 px-2 text-left">Équipe</th>
                        <th className="py-2 px-2 text-center">Pts</th>
                        <th className="py-2 px-2 text-center">+/-</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((row, idx) => (
                        <tr
                          key={row.team.id}
                          className={`border-b border-gray-100 dark:border-gray-800 ${row.team.id === team.id ? "bg-primary/5 font-bold" : ""}`}
                        >
                          <td className="py-2">
                            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${idx < 2 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-500 dark:bg-slate-800"}`}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="py-2">
                            <Link href={`/equipe/${row.team.slug}`} className="hover:text-primary flex items-center gap-1">
                              <span>{row.team.flag}</span>
                              <span className="truncate">{row.team.code}</span>
                            </Link>
                          </td>
                          <td className="py-2 text-center font-bold">{row.pts}</td>
                          <td className="py-2 text-center">
                            <span className={row.gd > 0 ? "text-green-600" : row.gd < 0 ? "text-red-500" : "text-gray-500"}>
                              {row.gd > 0 ? "+" : ""}{row.gd}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table></div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                    Qualifié (top 2)
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Classement simulé (pré-tournoi)</p>
                </div>
              );
            })()}

            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fiche technique</h3>
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
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Forme actuelle</h3>
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
                    <div className="rounded bg-gray-50 dark:bg-slate-700 p-2">
                      <p className="text-lg font-bold text-field">{enriched?.goalStats.scored}</p>
                      <p className="text-xs text-gray-500">Buts marques</p>
                    </div>
                    <div className="rounded bg-gray-50 dark:bg-slate-700 p-2">
                      <p className="text-lg font-bold text-red-500">{enriched?.goalStats.conceded}</p>
                      <p className="text-xs text-gray-500">Buts encaisses</p>
                    </div>
                    <div className="rounded bg-gray-50 dark:bg-slate-700 p-2">
                      <p className="text-lg font-bold text-primary">{enriched?.goalStats.cleanSheets}</p>
                      <p className="text-xs text-gray-500">Clean sheets</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Injuries */}
            {(enriched?.injuries?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Blessures</h3>
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
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pronostic {team.name}</h3>
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

                        {/* Betting CTA */}
            <div className="rounded-lg bg-gradient-to-br from-primary to-secondary/90 p-6 shadow-md text-white">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parier sur {team.name} championne</h3>
              <p className="mb-4 text-sm text-white/80">
                Comparez les meilleurs sites agrees pour parier sur {team.name} à la Coupe du Monde 2026.
              </p>
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; Parier sur {team.name}
              </a>
              <div className="mt-3 space-y-2">
                {bookmakers
                  .filter((bk) => bk.id !== featuredBookmaker.id)
                  .map((bk) => (
                    <a
                      key={bk.id}
                      href={bk.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors text-sm"
                    >
                      <span className="flex items-center gap-2 font-semibold">{bk.logo && <img src={bk.logo} alt={bk.name} className="h-5 w-5 rounded object-contain" />}{bk.name} <span className="text-white/70">{bk.bonus}</span></span>
                      <span className="text-primary font-semibold">Parier sur {team.name} &rarr;</span>
                    </a>
                  ))}
              </div>
              <p className="mt-3 text-xs text-white/60">18+. Pariez responsablement.</p>
            </div>

            {/* Related Teams */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Équipes du groupe {team.group}</h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/equipe/${t.slug}`}
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <span role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span>
                      <span>{t.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
        <RelatedContent
          items={[
            ...groupTeams
              .filter((t) => t.slug !== team.slug)
              .slice(0, 3)
              .map((t): RelatedItem => ({
                href: `/equipe/${t.slug}`,
                emoji: t.flag,
                title: t.name,
                description: `Groupe ${team.group} · FIFA #${t.fifaRanking}`,
              })),
            {
              href: '/pronostic-vainqueur',
              emoji: '🏆',
              title: 'Pronostic vainqueur',
              description: 'Qui va remporter la CDM 2026 ?',
            },
          ]}
        />
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
