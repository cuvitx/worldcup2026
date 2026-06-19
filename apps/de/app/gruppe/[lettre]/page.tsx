import { getAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((group) => ({ lettre: group.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre] ?? groupsBySlug[lettre.toLowerCase()];
  if (!group) return {};

  const groupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t) => t != null);
  const teamNames = groupTeams
    .map((t) => localizeTeam(t!, "de").name)
    .join(", ");

  return {
    title: `Gruppe ${group.letter} -- WM 2026 | ${teamNames}`,
    description: `Gruppe ${group.letter} der WM 2026: ${teamNames}. Spielplan, Tabelle und Analyse.`,
    alternates: getAlternates("group", lettre, "de"),
    openGraph: {
      title: `Gruppe ${group.letter} -- WM 2026`,
      description: `${teamNames} -- Gruppe ${group.letter} der Fussball-WM 2026.`,
    },
  };
}

const stageLabels = stageLabelsI18n.de;

export default async function GroupPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre] ?? groupsBySlug[lettre.toLowerCase()];
  if (!group) notFound();

  const groupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t) => t != null);
  const groupMatches = matchesByGroup[group.letter] ?? [];

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Gruppe {group.letter}
          </h1>
          <p className="mt-2 text-gray-200">
            Fussball-WM 2026 &middot; Gruppenphase
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teams table */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mannschaften der Gruppe {group.letter}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="pb-3 font-medium">Mannschaft</th>
                      <th className="pb-3 font-medium text-center">FIFA</th>
                      <th className="pb-3 font-medium text-center hidden sm:table-cell">
                        Konf.
                      </th>
                      <th className="pb-3 font-medium text-center">
                        WM-Teiln.
                      </th>
                      <th className="pb-3 font-medium hidden sm:table-cell">
                        Bestes Ergebnis
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {groupTeams.map((team) => {
                      if (!team) return null;
                      const loc = localizeTeam(team, "de");
                      return (
                        <tr
                          key={team.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3">
                            <Link
                              href={`/mannschaft/${team.slug}`}
                              className="flex items-center gap-2 font-medium hover:text-primary"
                            >
                              <span className="text-xl">{team.flag}</span>
                              {loc.name}
                              {team.isHost && (
                                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                                  Gastgeber
                                </span>
                              )}
                            </Link>
                          </td>
                          <td className="py-3 text-center">
                            #{team.fifaRanking}
                          </td>
                          <td className="py-3 text-center hidden sm:table-cell">
                            {team.confederation}
                          </td>
                          <td className="py-3 text-center">
                            {team.wcAppearances}
                          </td>
                          <td className="py-3 hidden sm:table-cell">
                            {team.bestResult}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Group matches */}
            {groupMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Spielplan Gruppe {group.letter}
                </h2>
                <div className="space-y-3">
                  {groupMatches.map((match) => {
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Alle Gruppen
              </h3>
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
          </div>
        </div>
      </div>
    </>
  );
}
