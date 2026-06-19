import { getAlternates, domains } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n, positionLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug, teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { groupsByLetter } from "@repo/data/groups";
import type { Team } from "@repo/data/types";

export const revalidate = 3600;
export const dynamicParams = true;

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
  const loc = localizeTeam(team, "de");

  return {
    title: `${loc.name} -- WM 2026 | Kader, Spielplan & Prognose`,
    description: `${loc.name} bei der WM 2026: Kader, Spielplan Gruppe ${team.group}, FIFA-Rang #${team.fifaRanking}. ${team.bestResult}.`,
    alternates: getAlternates("team", slug, "de"),
    openGraph: {
      title: `${team.flag} ${loc.name} -- WM 2026`,
      description: `${loc.name} bei der Fussball-WM 2026. Gruppe ${team.group}, FIFA #${team.fifaRanking}.`,
      url: `${domains.de}/mannschaft/${slug}`,
    },
  };
}

const stageLabels = stageLabelsI18n.de;
const positionLabels = positionLabelsI18n.de;

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const loc = localizeTeam(team, "de");
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );
  const groupData = groupsByLetter[team.group];
  const groupTeams = groupData
    ? groupData.teams
        .map((tid) => teamsById[tid])
        .filter((t): t is Team => t != null)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-6xl">{team.flag}</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                {loc.name}
              </h1>
              <p className="mt-1 text-gray-300">
                Gruppe {team.group} &middot; FIFA #{team.fifaRanking} &middot;{" "}
                {team.confederation}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Team info */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Steckbrief
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    #{team.fifaRanking}
                  </p>
                  <p className="text-sm text-gray-500">FIFA-Rang</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {team.wcAppearances}
                  </p>
                  <p className="text-sm text-gray-500">WM-Teilnahmen</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {team.bestResult}
                  </p>
                  <p className="text-sm text-gray-500">Bestes Ergebnis</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {team.confederation}
                  </p>
                  <p className="text-sm text-gray-500">Konföderation</p>
                </div>
              </div>
            </section>

            {/* Group */}
            {groupTeams.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Gruppe {team.group}
                </h2>
                <div className="space-y-2">
                  {groupTeams.map((gt) => {
                    const gtLoc = localizeTeam(gt, "de");
                    return (
                      <Link
                        key={gt.id}
                        href={`/mannschaft/${gt.slug}`}
                        className={`flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/30 ${
                          gt.id === team.id
                            ? "border-primary/20 bg-primary/5"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="text-lg">{gt.flag}</span>
                        <span className="font-medium flex-1">{gtLoc.name}</span>
                        <span className="text-xs text-gray-500">
                          #{gt.fifaRanking}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Matches */}
            {teamMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Spiele
                </h2>
                <div className="space-y-2">
                  {teamMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    const homeLoc = home ? localizeTeam(home, "de") : null;
                    const awayLoc = away ? localizeTeam(away, "de") : null;
                    const dateStr = new Date(match.date).toLocaleDateString(
                      "de-DE",
                      { day: "numeric", month: "short" }
                    );
                    return (
                      <Link
                        key={match.id}
                        href={`/spiel/${match.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-14 shrink-0">
                          {dateStr}
                        </span>
                        <span className="text-base shrink-0">
                          {home?.flag ?? ""}
                        </span>
                        <span className="font-medium flex-1 min-w-0 truncate text-sm">
                          {homeLoc?.name ?? "TBD"}
                        </span>
                        <span className="text-xs text-gray-500 shrink-0">
                          vs
                        </span>
                        <span className="font-medium flex-1 min-w-0 truncate text-right text-sm">
                          {awayLoc?.name ?? "TBD"}
                        </span>
                        <span className="text-base shrink-0">
                          {away?.flag ?? ""}
                        </span>
                        <span className="text-xs text-gray-400 shrink-0">
                          {match.time}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Squad */}
            {teamPlayers.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Kader ({teamPlayers.length} Spieler)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-gray-500">
                        <th className="pb-2 font-medium">#</th>
                        <th className="pb-2 font-medium">Name</th>
                        <th className="pb-2 font-medium">Position</th>
                        <th className="pb-2 font-medium hidden sm:table-cell">
                          Verein
                        </th>
                        <th className="pb-2 font-medium text-center">
                          Laenderspiele
                        </th>
                        <th className="pb-2 font-medium text-center">Tore</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teamPlayers.map((player) => (
                        <tr
                          key={player.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-2 text-gray-400">
                            {player.number ?? "-"}
                          </td>
                          <td className="py-2">
                            <Link
                              href={`/spieler/${player.slug}`}
                              className="font-medium hover:text-primary"
                            >
                              {player.name}
                            </Link>
                          </td>
                          <td className="py-2 text-gray-600">
                            {positionLabels[player.position] ?? player.position}
                          </td>
                          <td className="py-2 text-gray-500 hidden sm:table-cell">
                            {player.club}
                          </td>
                          <td className="py-2 text-center">{player.caps}</td>
                          <td className="py-2 text-center">{player.goals}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kurzinfo
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Mannschaft</dt>
                  <dd className="font-medium">{loc.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">FIFA-Rang</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Gruppe</dt>
                  <dd className="font-medium">
                    <Link
                      href={`/gruppe/${team.group.toLowerCase()}`}
                      className="text-primary hover:underline"
                    >
                      Gruppe {team.group}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Konföderation</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">WM-Teilnahmen</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bestes Ergebnis</dt>
                  <dd className="font-medium">{team.bestResult}</dd>
                </div>
                {team.isHost && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Gastgeber</dt>
                    <dd className="font-medium text-accent">Ja</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Entdecken
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={`/gruppe/${team.group.toLowerCase()}`}
                    className="text-primary hover:underline"
                  >
                    Gruppe {team.group} ansehen
                  </Link>
                </li>
                <li>
                  <Link href="/mannschaften" className="text-primary hover:underline">
                    Alle 48 Mannschaften
                  </Link>
                </li>
                <li>
                  <Link href="/spiel/spielplan" className="text-primary hover:underline">
                    Spielplan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
