import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";
import { playersByTeamId } from "@repo/data/players";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ANJBanner } from "@repo/ui/anj-banner";
import type { Player } from "@repo/data/types";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((group) => ({ lettre: group.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre] ?? groupsBySlug[lettre.toLowerCase()];
  if (!group) return {};

  const groupTeams = group.teams.map((id) => teamsById[id]).filter((t): t is NonNullable<typeof t> => t != null);
  const teamNames = groupTeams.map((t) => t.name).join(", ");

  return {
    title: `Groupe ${group.letter} - Coupe du Monde 2026 | ${teamNames}`,
    description: `Analyse complete du Groupe ${group.letter} de la Coupe du Monde 2026 : ${teamNames}. Calendrier, pronostics, cotes et chances de qualification.`,
    alternates: getAlternates("group", lettre, "fr"),
    openGraph: {
      title: `Groupe ${group.letter} - CDM 2026`,
      description: `${teamNames} - Analyse, pronostics et cotes du Groupe ${group.letter}.`,
    },
  };
}

export default async function GroupPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre] ?? groupsBySlug[lettre.toLowerCase()];
  if (!group) notFound();

  const groupTeams = group.teams.map((id) => teamsById[id]).filter((t): t is NonNullable<typeof t> => t != null);
  const groupMatches = matchesByGroup[group.letter] ?? [];

  // Récupérer les joueurs vedettes du groupe (top 3-5 joueurs)
  const allGroupPlayers: Player[] = [];
  for (const team of groupTeams) {
    const teamPlayers = playersByTeamId[team.id] ?? [];
    allGroupPlayers.push(...teamPlayers);
  }

  // Trier les joueurs par popularité/impact (goals + caps comme heuristique)
  const topPlayers = allGroupPlayers
    .filter((p) => p.position !== "GK") // Exclure les gardiens pour plus de spectacle
    .sort((a, b) => {
      const scoreA = a.goals * 2 + a.caps / 10;
      const scoreB = b.goals * 2 + b.caps / 10;
      return scoreB - scoreA;
    })
    .slice(0, 5);

  // Récupérer les prédictions pour les équipes du groupe
  const teamPredictionsData = groupTeams.map((team) => ({
    team,
    prediction: predictionsByTeamId[team.id],
  })).filter((item) => item.prediction != null);

  // Trier les équipes par probabilité de qualification
  const sortedByQualification = [...teamPredictionsData].sort(
    (a, b) => (b.prediction?.groupStageProb ?? 0) - (a.prediction?.groupStageProb ?? 0)
  );

  // Générer un texte d'analyse enrichi basé sur les équipes du groupe
  const rankedTeams = [...groupTeams].sort((a, b) => a.fifaRanking - b.fifaRanking);
  const favorite = rankedTeams[0];
  const outsider = rankedTeams[rankedTeams.length - 1];

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Groupes",url:"/groupes"},{name:"Groupe "+group.letter,url:"/groupe/"+lettre}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/groupes" className="text-primary dark:text-secondary hover:underline">Groupes</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Groupe {group.letter}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Groupe {group.letter}</h1>
          <p className="mt-2 text-gray-200">
            Coupe du Monde 2026 &middot; Phase de groupes
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teams Table */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Équipes du Groupe {group.letter}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500">
                      <th className="pb-3 font-medium">Équipe</th>
                      <th className="pb-3 font-medium text-center">FIFA</th>
                      <th className="pb-3 font-medium text-center">Conf.</th>
                      <th className="pb-3 font-medium text-center">Participations CDM</th>
                      <th className="pb-3 font-medium">Meilleur résultat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {groupTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700/50 transition-colors">
                        <td className="py-3">
                          <Link
                            href={`/equipe/${team.slug}`}
                            className="flex items-center gap-2 font-medium hover:text-primary"
                          >
                            <span className="text-xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                            {team.name}
                            {team.isHost && (
                              <span className="rounded bg-secondary/10 px-1.5 py-0.5 text-xs text-secondary">
                                Hote
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="py-3 text-center">#{team.fifaRanking}</td>
                        <td className="py-3 text-center">{team.confederation}</td>
                        <td className="py-3 text-center">{team.wcAppearances}</td>
                        <td className="py-3">{team.bestResult}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Group Analysis - Enriched */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyse du Groupe {group.letter}</h2>
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  Le Groupe {group.letter} de la Coupe du Monde 2026 reunit{" "}
                  {groupTeams.map((t, i) => (
                    <span key={t.id}>
                      {i > 0 && (i === groupTeams.length - 1 ? " et " : ", ")}
                      <Link href={`/equipe/${t.slug}`} className="text-primary hover:underline font-medium">
                        {t.name}
                      </Link>
                      {" "}({t.confederation}, #{t.fifaRanking} FIFA)
                    </span>
                  ))}.
                </p>

                {/* Forces en présence */}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚡ Forces en présence</h3>
                  <p>
                    <strong className="text-secondary">{favorite?.name}</strong> (#{favorite?.fifaRanking} FIFA) part grand favori de ce groupe avec {favorite?.wcAppearances} participations en Coupe du monde. 
                    {rankedTeams[1] && (
                      <> <strong>{rankedTeams[1].name}</strong> (#{rankedTeams[1].fifaRanking}) devrait être le principal concurrent pour la première place.</>
                    )}
                    {" "}Le combat pour la qualification s'annonce intense entre toutes les équipes présentes.
                  </p>
                </div>

                {/* Outsiders */}
                {outsider && outsider.fifaRanking > 50 && (
                  <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 L'outsider à surveiller</h3>
                    <p>
                      <strong className="text-primary">{outsider.name}</strong> (#{outsider.fifaRanking} FIFA) arrive en tant qu'outsider, mais ne sous-estimez pas cette équipe qui a su se qualifier pour la phase finale. 
                      Avec {outsider.wcAppearances} participation{outsider.wcAppearances > 1 ? "s" : ""} en Coupe du monde, {outsider.name} pourrait créer la surprise.
                    </p>
                  </div>
                )}

                <p className="mt-4">
                  Les deux premiers du groupe se qualifient directement pour les
                  huitièmes de finale, tandis que les meilleurs troisièmes peuvent
                  également se qualifier. Chaque match sera crucial dans cette phase de groupes
                  où la moindre erreur peut être fatale.
                </p>
              </div>
            </section>

            {/* Joueurs à suivre */}
            {topPlayers.length > 0 && (
              <section className="py-8 px-6 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">⭐ Joueurs à suivre — Groupe {group.letter}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Les stars qui feront vibrer ce groupe lors de la Coupe du Monde 2026
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {topPlayers.map((player) => {
                    const playerTeam = teamsById[player.teamId];
                    if (!playerTeam) return null;
                    
                    const positionLabel = {
                      FW: "Attaquant",
                      MF: "Milieu",
                      DF: "Défenseur",
                      GK: "Gardien",
                    }[player.position] ?? player.position;

                    return (
                      <div
                        key={player.id}
                        className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl" role="img" aria-label={`Drapeau de ${playerTeam.name}`}>
                            {playerTeam.flag}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                              {player.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {playerTeam.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                            {positionLabel}
                          </span>
                          {player.number && (
                            <span className="text-xs text-gray-500">N°{player.number}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {player.club}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-secondary">{player.goals}</span> buts
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-primary">{player.caps}</span> sél.
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Pronostic du groupe */}
            {sortedByQualification.length > 0 && (
              <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg border border-slate-700">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    🔮 Notre pronostic pour le Groupe {group.letter}
                  </h2>
                  <p className="text-gray-300 text-sm mb-6">
                    Basé sur les côtes, le classement FIFA et l'historique des équipes
                  </p>

                  <div className="space-y-4">
                    {sortedByQualification.slice(0, 2).map((item, index) => {
                      const qualifProb = Math.round((item.prediction?.groupStageProb ?? 0) * 100);
                      return (
                        <div
                          key={item.team.id}
                          className="rounded-lg bg-white/10 backdrop-blur-sm p-4 border border-white/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-secondary font-bold text-sm">
                                {index + 1}
                              </span>
                              <span className="text-xl" role="img" aria-label={`Drapeau de ${item.team.name}`}>
                                {item.team.flag}
                              </span>
                              <Link
                                href={`/equipe/${item.team.slug}`}
                                className="font-bold text-white hover:text-secondary transition-colors"
                              >
                                {item.team.name}
                              </Link>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-secondary">
                                {qualifProb}%
                              </div>
                              <div className="text-xs text-gray-400">
                                de qualification
                              </div>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                              style={{ width: `${qualifProb}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {sortedByQualification.length > 2 && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-sm text-gray-300 mb-2">🤔 Équipes en lice pour la 3e place :</p>
                        <div className="flex flex-wrap gap-2">
                          {sortedByQualification.slice(2).map((item) => {
                            const qualifProb = Math.round((item.prediction?.groupStageProb ?? 0) * 100);
                            return (
                              <div
                                key={item.team.id}
                                className="rounded-full bg-white/10 px-3 py-1.5 text-sm border border-white/20 flex items-center gap-2"
                              >
                                <span role="img" aria-label={`Drapeau de ${item.team.name}`}>
                                  {item.team.flag}
                                </span>
                                <span className="text-white font-medium">{item.team.name}</span>
                                <span className="text-gray-400 text-xs">({qualifProb}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-gray-400 italic">
                    💡 Les meilleurs troisièmes peuvent également se qualifier pour les huitièmes de finale
                  </p>
                </div>
              </section>
            )}

            {/* Group Matches */}
            {groupMatches.length > 0 && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📅 Calendrier du Groupe {group.letter}</h2>
                <div className="space-y-3">
                  {groupMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-12 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-base shrink-0" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "🏳️"}</span>
                        <span className="font-medium flex-1 min-w-0 break-words text-sm">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500 shrink-0">vs</span>
                        <span className="font-medium flex-1 min-w-0 break-words text-right text-sm">{away?.name ?? "TBD"}</span>
                        <span className="text-base shrink-0" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "🏳️"}</span>
                        <span className="text-xs text-gray-500 w-10 text-right shrink-0">{match.time}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Head to Head Links */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confrontations directes</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {groupTeams.flatMap((team1, i) =>
                  groupTeams.slice(i + 1).map((team2) => (
                    <Link
                      key={`${team1.id}-${team2.id}`}
                      href={`/h2h/${team1.slug}-vs-${team2.slug}`}
                      className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <span className="text-xl" role="img" aria-label={`Drapeau de ${team1.name}`}>{team1.flag}</span>
                      <span className="font-semibold">{team1.name}</span>
                      <span className="text-gray-500">vs</span>
                      <span className="font-semibold">{team2.name}</span>
                      <span className="text-xl" role="img" aria-label={`Drapeau de ${team2.name}`}>{team2.flag}</span>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Group Navigation */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tous les groupes</h3>
              <div className="grid grid-cols-4 gap-2">
                {groups.map((g) => (
                  <Link
                    key={g.letter}
                    href={`/groupe/${g.slug}`}
                    className={`rounded-lg border p-2 text-center text-sm font-medium transition-colors ${
                      g.letter === group.letter
                        ? "border-primary/20 bg-primary text-white"
                        : "border-gray-200 dark:border-slate-700 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {g.letter}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pronostic Groupe CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pronostics Groupe {group.letter}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Qui se qualifiera dans le Groupe {group.letter} ? Découvrez notre analyse complète et les cotes.
              </p>
              <Link
                href={`/pronostic-groupe/${lettre}`}
                className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/80 transition-colors"
              >
                Voir le pronostic Groupe {group.letter} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `Coupe du Monde 2026 - Groupe ${group.letter}`,
            sport: "Football",
            competitor: groupTeams.map((t) => ({
              "@type": "SportsTeam",
              name: t.name,
            })),
          }),
        }}
      />
      <ANJBanner />
    </>
  );
}
