import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teams, teamsById, matchesByGroup, playersByTeamId } from "../../../lib/localized-data";
import { predictionsByTeamId } from "@repo/data/predictions";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import type { Player, Match } from "@repo/data/types";
import { PmuBanner } from "../../components/PmuBanner";

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
    title: `Gruppe ${group.letter} - WM 2026 | ${teamNames}`,
    description: `Komplette Analyse der Gruppe ${group.letter} der WM 2026: ${teamNames}. Spielplan, Prognosen, Quoten und Qualifikationschancen.`,
    alternates: getAlternates("group", lettre, "de"),
    openGraph: {
      title: `Gruppe ${group.letter} - WM 2026`,
      description: `${teamNames} - Analyse, Prognosen und Quoten der Gruppe ${group.letter}.`,
    },
  };
}

export default async function GroupPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre] ?? groupsBySlug[lettre.toLowerCase()];
  if (!group) notFound();

  const groupTeams = group.teams.map((id) => teamsById[id]).filter((t): t is NonNullable<typeof t> => t != null);
  const staticGroupMatches = matchesByGroup[group.letter] ?? [];

  // Build team name map for API matching
  const teamNameMap: Record<string, string> = {};
  for (const t of groupTeams) { teamNameMap[t.id] = t.name; }

  // Enrich with real API results (ISR-cached, auto-updates)
  const groupMatches: Match[] = await enrichMatchesWithResults(staticGroupMatches, teamNameMap);

  // Compute group standings from completed matches
  const hasResults = groupMatches.some((m) => m.status === "finished");

  interface Standing {
    teamId: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  }

  const standingsMap = new Map<string, Standing>();
  for (const team of groupTeams) {
    standingsMap.set(team.id, {
      teamId: team.id,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, points: 0,
    });
  }

  for (const match of groupMatches) {
    if (match.status !== "finished" || match.homeScore == null || match.awayScore == null) continue;
    const home = standingsMap.get(match.homeTeamId);
    const away = standingsMap.get(match.awayTeamId);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won++; home.points += 3;
      away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++; away.points += 3;
      home.lost++;
    } else {
      home.drawn++; home.points += 1;
      away.drawn++; away.points += 1;
    }
  }

  const standings = Array.from(standingsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return 0;
  });

  // Top-Spieler der Gruppe abrufen (Top 3-5 Spieler)
  const allGroupPlayers: Player[] = [];
  for (const team of groupTeams) {
    const teamPlayers = playersByTeamId[team.id] ?? [];
    allGroupPlayers.push(...teamPlayers);
  }

  // Spieler nach Popularität/Einfluss sortieren (Tore + Einsätze als Heuristik)
  const topPlayers = allGroupPlayers
    .filter((p) => p.position !== "GK") // Torhüter ausschließen für mehr Spektakel
    .sort((a, b) => {
      const scoreA = a.goals * 2 + a.caps / 10;
      const scoreB = b.goals * 2 + b.caps / 10;
      return scoreB - scoreA;
    })
    .slice(0, 5);

  // Prognosen für die Mannschaften der Gruppe abrufen
  const teamPredictionsData = groupTeams.map((team) => ({
    team,
    prediction: predictionsByTeamId[team.id],
  })).filter((item) => item.prediction != null);

  // Mannschaften nach Qualifikationswahrscheinlichkeit sortieren
  const sortedByQualification = [...teamPredictionsData].sort(
    (a, b) => (b.prediction?.groupStageProb ?? 0) - (a.prediction?.groupStageProb ?? 0)
  );

  // Erweiterten Analysetext basierend auf den Gruppenmannschaften generieren
  const rankedTeams = [...groupTeams].sort((a, b) => a.fifaRanking - b.fifaRanking);
  const favorite = rankedTeams[0];
  const outsider = rankedTeams[rankedTeams.length - 1];

  return (
    <>
{/* Breadcrumbs */}
{/* Header */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Gruppe {group.letter}</h1>
          <p className="mt-2 text-gray-200">
            WM 2026 &middot; Gruppenphase
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teams Table */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mannschaften der Gruppe {group.letter}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="pb-3 font-medium">Mannschaft</th>
                      <th className="pb-3 font-medium text-center">FIFA</th>
                      <th className="pb-3 font-medium text-center hidden sm:table-cell">Konf.</th>
                      <th className="pb-3 font-medium text-center"><span className="hidden sm:inline">Teilnahmen </span>WM</th>
                      <th className="pb-3 font-medium hidden sm:table-cell">Bestes Ergebnis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {groupTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                        <td className="py-3">
                          <Link
                            href={`/mannschaft/${team.slug}`}
                            className="flex items-center gap-2 font-medium hover:text-primary"
                          >
                            <span className="text-xl" role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                            {team.name}
                            {team.isHost && (
                              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                                Gastgeber
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="py-3 text-center">#{team.fifaRanking}</td>
                        <td className="py-3 text-center hidden sm:table-cell">{team.confederation}</td>
                        <td className="py-3 text-center">{team.wcAppearances}</td>
                        <td className="py-3 hidden sm:table-cell">{team.bestResult}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Group Standings */}
            {hasResults && (
              <section className="rounded-lg bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="h-6 w-6 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 16.5m0 0L12 12m4.5 4.5V7.5" /></svg>
                  Tabelle der Gruppe {group.letter}
                </h2>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="pb-2 pl-4 sm:pl-0 text-left font-semibold w-8">#</th>
                        <th className="pb-2 text-left font-semibold">Mannschaft</th>
                        <th className="pb-2 text-center font-semibold">Sp</th>
                        <th className="pb-2 text-center font-semibold">S</th>
                        <th className="pb-2 text-center font-semibold">U</th>
                        <th className="pb-2 text-center font-semibold">N</th>
                        <th className="pb-2 text-center font-semibold">T</th>
                        <th className="pb-2 text-center font-semibold">GT</th>
                        <th className="pb-2 text-center font-semibold">TD</th>
                        <th className="pb-2 pr-4 sm:pr-0 text-center font-semibold">Pkt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((s, idx) => {
                        const team = teamsById[s.teamId];
                        if (!team) return null;
                        const diff = s.goalsFor - s.goalsAgainst;
                        const isQualified = idx < 2;
                        return (
                          <tr
                            key={s.teamId}
                            className={`border-b border-gray-100 ${isQualified ? "bg-accent/5" : ""}`}
                          >
                            <td className="py-2.5 pl-4 sm:pl-0 font-bold text-gray-400">{idx + 1}</td>
                            <td className="py-2.5">
                              <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-2 font-medium hover:text-primary">
                                <span className="text-lg">{team.flag}</span>
                                <span className="hidden sm:inline">{team.name}</span>
                                <span className="sm:hidden">{team.code}</span>
                              </Link>
                            </td>
                            <td className="py-2.5 text-center">{s.played}</td>
                            <td className="py-2.5 text-center text-green-600 font-medium">{s.won}</td>
                            <td className="py-2.5 text-center text-gray-500">{s.drawn}</td>
                            <td className="py-2.5 text-center text-red-500">{s.lost}</td>
                            <td className="py-2.5 text-center">{s.goalsFor}</td>
                            <td className="py-2.5 text-center">{s.goalsAgainst}</td>
                            <td className="py-2.5 text-center font-medium">
                              <span className={diff > 0 ? "text-green-600" : diff < 0 ? "text-red-500" : "text-gray-500"}>
                                {diff > 0 ? `+${diff}` : diff}
                              </span>
                            </td>
                            <td className="py-2.5 pr-4 sm:pr-0 text-center font-bold text-lg text-[#022149]">{s.points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-sm bg-accent/20 shrink-0" />
                  Qualifikationszone (Top 2)
                </div>
              </section>
            )}

            {/* Group Analysis - Enriched */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse der Gruppe {group.letter}</h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <p>
                  Die Gruppe {group.letter} der WM 2026 vereint{" "}
                  {groupTeams.map((t, i) => (
                    <span key={t.id}>
                      {i > 0 && (i === groupTeams.length - 1 ? " und " : ", ")}
                      <Link href={`/mannschaft/${t.slug}`} className="text-primary hover:underline font-medium">
                        {t.name}
                      </Link>
                      {" "}({t.confederation}, #{t.fifaRanking} FIFA)
                    </span>
                  ))}.
                </p>

                {/* Kräfteverhältnisse */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-1.5"><svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg> Kräfteverhältnisse</h3>
                  <p>
                    <strong className="text-primary">{favorite?.name}</strong> (#{favorite?.fifaRanking} FIFA) geht als grosser Favorit in diese Gruppe mit {favorite?.wcAppearances} WM-Teilnahmen.
                    {rankedTeams[1] && (
                      <> <strong>{rankedTeams[1].name}</strong> (#{rankedTeams[1].fifaRanking}) dürfte der Hauptkonkurrent um den ersten Platz sein.</>
                    )}
                    {" "}Der Kampf um die Qualifikation verspricht zwischen allen teilnehmenden Mannschaften intensiv zu werden.
                  </p>
                </div>

                {/* Outsiders */}
                {outsider && outsider.fifaRanking > 50 && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-1.5"><svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> Der Aussenseiter im Blick</h3>
                    <p>
                      <strong className="text-primary">{outsider.name}</strong> (#{outsider.fifaRanking} FIFA) kommt als Aussenseiter, aber unterschätzen Sie diese Mannschaft nicht, die sich für die Endrunde qualifiziert hat.
                      Mit {outsider.wcAppearances} WM-Teilnahme{outsider.wcAppearances > 1 ? "n" : ""} könnte {outsider.name} für eine Überraschung sorgen.
                    </p>
                  </div>
                )}

                <p className="mt-4">
                  Die zwei Erstplatzierten der Gruppe qualifizieren sich direkt für das
                  Achtelfinale, während die besten Gruppendritten sich ebenfalls
                  qualifizieren können. Jedes Spiel wird in dieser Gruppenphase entscheidend sein,
                  in der der kleinste Fehler fatal sein kann.
                </p>
              </div>
            </section>

            {/* Spieler im Fokus */}
            {topPlayers.length > 0 && (
              <section className="py-8 px-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><svg className="h-6 w-6 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg> Spieler im Fokus — Gruppe {group.letter}</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Die Stars, die diese Gruppe bei der WM 2026 prägen werden
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {topPlayers.map((player) => {
                    const playerTeam = teamsById[player.teamId];
                    if (!playerTeam) return null;
                    
                    const positionLabel = {
                      FW: "Stürmer",
                      MF: "Mittelfeld",
                      DF: "Verteidiger",
                      GK: "Torwart",
                    }[player.position] ?? player.position;

                    return (
                      <div
                        key={player.id}
                        className="rounded-lg bg-white p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl" role="img" aria-label={`Flagge von ${playerTeam.name}`}>
                            {playerTeam.flag}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm leading-tight">
                              {player.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {playerTeam.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                            {positionLabel}
                          </span>
                          {player.number && (
                            <span className="text-xs text-gray-500">N{player.number}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {player.club}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-accent">{player.goals}</span> Tore
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-primary">{player.caps}</span> Eins.
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Prognose der Gruppe */}
            {sortedByQualification.length > 0 && (
              <section className="hero-animated rounded-lg p-6 shadow-lg">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-2">
                    <svg className="h-6 w-6 text-accent shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>
                    Unsere Prognose für Gruppe {group.letter}
                  </h2>
                  <p className="text-gray-200 text-sm mb-6">
                    Basierend auf den Quoten, der FIFA-Rangliste und der Historie der Mannschaften
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
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-sm">
                                {index + 1}
                              </span>
                              <span className="text-xl" role="img" aria-label={`Flagge von ${item.team.name}`}>
                                {item.team.flag}
                              </span>
                              <Link
                                href={`/mannschaft/${item.team.slug}`}
                                className="font-bold text-white text-lg hover:text-accent transition-colors"
                              >
                                {item.team.name}
                              </Link>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-black text-white">
                                {qualifProb}%
                              </div>
                              <div className="text-xs text-gray-300">
                                Qualifikation
                              </div>
                            </div>
                          </div>
                          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                              style={{ width: `${qualifProb}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {sortedByQualification.length > 2 && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-sm text-gray-300 mb-2">Mannschaften im Kampf um den 3. Platz:</p>
                        <div className="flex flex-wrap gap-2">
                          {sortedByQualification.slice(2).map((item) => {
                            const qualifProb = Math.round((item.prediction?.groupStageProb ?? 0) * 100);
                            return (
                              <div
                                key={item.team.id}
                                className="rounded-full bg-white/10 px-3 py-1.5 text-sm border border-white/20 flex items-center gap-2"
                              >
                                <span role="img" aria-label={`Flagge von ${item.team.name}`}>
                                  {item.team.flag}
                                </span>
                                <span className="text-white font-medium">{item.team.name}</span>
                                <span className="text-gray-300 text-xs">({qualifProb}%)</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-gray-400 italic">
                    Die besten Gruppendritten können sich ebenfalls für das Achtelfinale qualifizieren
                  </p>
                </div>
              </section>
            )}

            {/* Group Matches */}
            {groupMatches.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><svg className="h-6 w-6 text-primary shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg> Spielplan der Gruppe {group.letter}</h2>
                <div className="space-y-3">
                  {groupMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    const isFinished = match.status === "finished" && match.homeScore != null && match.awayScore != null;
                    return (
                      <Link
                        key={match.id}
                        href={`/spiel/${match.slug}`}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 rounded-lg border p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0 ${isFinished ? "border-gray-200 bg-gray-50/50" : "border-gray-200"}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0" role="img" aria-label={`Flagge von ${home?.name ?? "Unbekannt"}`}>{home?.flag ?? ""}</span>
                          <span className="font-medium shrink-0 text-sm">{home?.name ?? "TBD"}</span>
                          {isFinished ? (
                            <span className="text-sm font-bold text-gray-900 shrink-0 tabular-nums">{match.homeScore} - {match.awayScore}</span>
                          ) : (
                            <span className="text-xs text-gray-500 shrink-0">vs</span>
                          )}
                          <span className="font-medium shrink-0 text-right text-sm">{away?.name ?? "TBD"}</span>
                          <span className="text-base shrink-0" role="img" aria-label={`Flagge von ${away?.name ?? "Unbekannt"}`}>{away?.flag ?? ""}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 sm:ml-auto sm:shrink-0">
                          {isFinished && <span className="text-xs font-medium text-gray-400">Beendet</span>}
                          <span>{match.date.slice(5)}</span>
                          <span>·</span>
                          <span>{match.time}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Head to Head Links */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Direktvergleiche</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {groupTeams.flatMap((team1, i) =>
                  groupTeams.slice(i + 1).map((team2) => (
                    <Link
                      key={`${team1.id}-${team2.id}`}
                      href={`/h2h/${team1.slug}-vs-${team2.slug}`}
                      className="flex items-center justify-center gap-2 sm:gap-3 rounded-lg border border-gray-200 p-3 sm:p-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                    >
                      <span className="text-lg sm:text-xl shrink-0" role="img" aria-label={`Flagge von ${team1.name}`}>{team1.flag}</span>
                      <span className="font-semibold text-sm sm:text-base">{team1.name}</span>
                      <span className="text-gray-500 text-sm shrink-0">vs</span>
                      <span className="font-semibold text-sm sm:text-base">{team2.name}</span>
                      <span className="text-lg sm:text-xl shrink-0" role="img" aria-label={`Flagge von ${team2.name}`}>{team2.flag}</span>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Group Navigation */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alle Gruppen</h3>
              <div className="grid grid-cols-4 gap-2">
                {groups.map((g) => (
                  <Link
                    key={g.letter}
                    href={`/gruppe/${g.slug}`}
                    className={`rounded-lg border p-2 text-center text-sm font-medium transition-colors ${
                      g.letter === group.letter
                        ? "border-primary/20 bg-primary text-white"
                        : "border-gray-200 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {g.letter}
                  </Link>
                ))}
              </div>
            </div>

            {/* Prognose Gruppe CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prognose Gruppe {group.letter}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Wer qualifiziert sich in Gruppe {group.letter}? Entdecken Sie unsere komplette Analyse und die Quoten.
              </p>
              <Link
                href={`/prognose-gruppe/${lettre}`}
                className="inline-block rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/80 transition-colors"
              >
                Zur Prognose Gruppe {group.letter} &rarr;
              </Link>
            </div>

            {/* PMU Visual Banner */}
            <PmuBanner tracking="groupe" compact />
            <p className="text-[9px] text-gray-400 text-center mt-1">18+ | Es gelten die AGB</p>
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
            name: `WM 2026 - Gruppe ${group.letter}`,
            sport: "Fussball",
            competitor: groupTeams.map((t) => ({
              "@type": "SportsTeam",
              name: t.name,
            })),
          }),
        }}
      />
    </>
  );
}
