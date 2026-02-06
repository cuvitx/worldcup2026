import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";

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
    title: `${team.name} - World Cup 2026 | Squad, Stats & Predictions`,
    description: `Everything about ${team.name} at the 2026 World Cup: squad, statistics, history, Group ${team.group}, odds and predictions. ${team.description}`,
    openGraph: {
      title: `${team.flag} ${team.name} - WC 2026`,
      description: `Complete profile of ${team.name} for the 2026 World Cup. Group ${team.group}, FIFA ranking #${team.fifaRanking}.`,
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

  const positionLabels: Record<string, string> = {
    GK: "Goalkeeper",
    DF: "Defender",
    MF: "Midfielder",
    FW: "Forward",
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/teams" className="hover:text-primary">Teams</Link></li>
            <li>/</li>
            <li><Link href={`/group/${team.group.toLowerCase()}`} className="hover:text-primary">Group {team.group}</Link></li>
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
                {team.confederation} &middot; FIFA Ranking #{team.fifaRanking} &middot; Group {team.group}
              </p>
              {team.isHost && (
                <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold">
                  Host country
                </span>
              )}
              <Link
                href={`/prediction/${team.slug}`}
                className="mt-3 inline-block rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                View prediction &rarr;
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
              <h2 className="mb-4 text-xl font-bold">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{team.description}</p>
            </section>

            {/* World Cup History */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">World Cup History</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{team.wcAppearances}</p>
                  <p className="text-sm text-gray-500">Appearances</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{team.bestResult}</p>
                  <p className="text-sm text-gray-500">Best Result</p>
                </div>
              </div>
            </section>

            {/* Predictions */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">WC 2026 Predictions</h2>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/5 px-4 py-2">
                    <span className="text-sm text-gray-500">ELO Rating</span>
                    <p className="text-2xl font-extrabold text-primary">{prediction.eloRating}</p>
                  </div>
                  <div className="rounded-lg bg-gold/10 px-4 py-2">
                    <span className="text-sm text-gray-500">Win probability</span>
                    <p className="text-2xl font-extrabold text-gold">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {[
                    { label: "Group stage", value: prediction.groupStageProb },
                    { label: "Round of 32", value: prediction.roundOf32Prob },
                    { label: "Round of 16", value: prediction.roundOf16Prob },
                    { label: "Quarter-final", value: prediction.quarterFinalProb },
                    { label: "Semi-final", value: prediction.semiFinalProb },
                    { label: "Final", value: prediction.finalProb },
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
                <h2 className="mb-4 text-xl font-bold">Key Players</h2>
                <div className="space-y-3">
                  {teamPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/player/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-gray-500">
                          {positionLabels[player.position]} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {player.caps} caps / {player.goals} goals
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Group Matches */}
            {teamMatches.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Group Matches</h2>
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
                            {isHome ? "vs" : "@"} {opponent?.name ?? "TBD"}
                          </p>
                          <p className="text-xs text-gray-500">
                            MD{match.matchday} &middot; {match.time} UTC
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
                <Link href={`/group/${team.group.toLowerCase()}`} className="hover:text-accent">
                  Group {team.group}
                </Link>
              </h2>
              <p className="mb-4 text-gray-600">
                {team.name}&apos;s opponents in the group stage:
              </p>
              <div className="space-y-3">
                {groupTeams.map((opponent) => (
                  <Link
                    key={opponent.id}
                    href={`/team/${opponent.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <span className="text-2xl">{opponent.flag}</span>
                    <div>
                      <p className="font-semibold">{opponent.name}</p>
                      <p className="text-sm text-gray-500">
                        {opponent.confederation} &middot; #{opponent.fifaRanking} FIFA
                      </p>
                    </div>
                    <span className="ml-auto text-sm text-accent font-medium">
                      View H2H &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Technical Sheet</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">FIFA Code</dt>
                  <dd className="font-medium">{team.code}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Confederation</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">FIFA Ranking</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Group</dt>
                  <dd className="font-medium">{team.group}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">WC Appearances</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Best Result</dt>
                  <dd className="font-medium">{team.bestResult}</dd>
                </div>
              </dl>
            </div>

            {/* CTA Betting */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Prediction {team.name}</h3>
              {prediction ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ELO Rating</span>
                    <span className="font-bold text-primary">{prediction.eloRating}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pass group stage</span>
                    <span className="font-bold text-field">{Math.round(prediction.groupStageProb * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Win WC</span>
                    <span className="font-bold text-gold">{prediction.winnerProb >= 0.01 ? `${(prediction.winnerProb * 100).toFixed(1)}%` : `${(prediction.winnerProb * 100).toFixed(2)}%`}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Predictions will be available soon.
                </p>
              )}
            </div>

            {/* Related Teams */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Group {team.group} teams</h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/team/${t.slug}`}
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
            sport: "Football",
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
