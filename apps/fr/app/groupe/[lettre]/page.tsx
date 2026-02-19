import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((group) => ({ lettre: group.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
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
  const group = groupsBySlug[lettre];
  if (!group) notFound();

  const groupTeams = group.teams.map((id) => teamsById[id]).filter((t): t is NonNullable<typeof t> => t != null);
  const groupMatches = matchesByGroup[group.letter] ?? [];

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Groupes",url:"/equipes"},{name:"Groupe "+group.letter,url:"/groupe/"+lettre}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Groupe {group.letter}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Groupe {group.letter}</h1>
          <p className="mt-2 text-gray-300">
            Coupe du Monde 2026 &middot; Phase de groupes
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teams Table */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Équipes du Groupe {group.letter}</h2>
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
                      <tr key={team.id} className="hover:bg-gray-50 dark:bg-slate-700">
                        <td className="py-3">
                          <Link
                            href={`/equipe/${team.slug}`}
                            className="flex items-center gap-2 font-medium hover:text-accent"
                          >
                            <span className="text-xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                            {team.name}
                            {team.isHost && (
                              <span className="rounded bg-gold/10 px-1.5 py-0.5 text-xs text-gold">
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

            {/* Group Analysis */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Analyse du Groupe {group.letter}</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>
                  Le Groupe {group.letter} de la Coupe du Monde 2026 reunit{" "}
                  {groupTeams.map((t, i) => (
                    <span key={t.id}>
                      {i > 0 && (i === groupTeams.length - 1 ? " et " : ", ")}
                      <Link href={`/equipe/${t.slug}`} className="text-accent hover:underline font-medium">
                        {t.name}
                      </Link>
                      {" "}({t.confederation}, #{t.fifaRanking})
                    </span>
                  ))}.
                </p>
                <p className="mt-4">
                  Les deux premiers du groupe se qualifiént directement pour les
                  huitièmes de finale, tandis que les meilleurs troisièmes peuvent
                  également se qualifier.
                </p>
              </div>
            </section>

            {/* Group Matches */}
            {groupMatches.length > 0 && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Calendrier du Groupe {group.letter}</h2>
                <div className="space-y-2">
                  {groupMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <span className="text-xs text-gray-500 w-16 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-lg" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "🏳️"}</span>
                        <span className="font-medium flex-1">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500">vs</span>
                        <span className="font-medium flex-1 text-right">{away?.name ?? "TBD"}</span>
                        <span className="text-lg" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "🏳️"}</span>
                        <span className="text-xs text-gray-500 w-12 text-right shrink-0">{match.time}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Head to Head Links */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Confrontations directes</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {groupTeams.flatMap((team1, i) =>
                  groupTeams.slice(i + 1).map((team2) => (
                    <Link
                      key={`${team1.id}-${team2.id}`}
                      href={`/h2h/${team1.slug}-vs-${team2.slug}`}
                      className="flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-center transition-colors hover:border-accent hover:bg-accent/5"
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
            <div className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Tous les groupes</h3>
              <div className="grid grid-cols-4 gap-2">
                {groups.map((g) => (
                  <Link
                    key={g.letter}
                    href={`/groupe/${g.slug}`}
                    className={`rounded-lg border p-2 text-center text-sm font-medium transition-colors ${
                      g.letter === group.letter
                        ? "border-accent bg-accent text-white"
                        : "border-gray-200 dark:border-slate-700 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {g.letter}
                  </Link>
                ))}
              </div>
            </div>

            {/* Betting CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Pronostics Groupe {group.letter}
              </h3>
              <p className="text-sm text-gray-600">
                Qui se qualifiera dans le Groupe {group.letter} ? Comparez les cotes des bookmakers.
              </p>
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
    </>
  );
}
