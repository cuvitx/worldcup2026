import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};

  const team = teamsById[player.teamId];
  const teamName = team?.name ?? player.teamId;

  return {
    title: `${player.name} - ${teamName} | Player Profile WC 2026`,
    description: `Profile of ${player.name} (${teamName}) for the 2026 World Cup. ${player.caps} caps, ${player.goals} goals. ${player.description}`,
    openGraph: {
      title: `${player.name} - ${teamName} WC 2026`,
      description: `${player.position} | ${player.club} | ${player.caps} caps | ${player.goals} goals`,
    },
  };
}

const positionLabels: Record<string, string> = {
  GK: "Goalkeeper",
  DF: "Defender",
  MF: "Midfielder",
  FW: "Forward",
};

export default async function PlayerPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const teammates = (playersByTeamId[player.teamId] ?? []).filter(
    (p) => p.id !== player.id
  );

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            {team && (
              <>
                <li>
                  <Link
                    href={`/team/${team.slug}`}
                    className="hover:text-primary"
                  >
                    {team.name}
                  </Link>
                </li>
                <li>/</li>
              </>
            )}
            <li className="text-gray-900 font-medium">{player.name}</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            {team && <span className="text-6xl">{team.flag}</span>}
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wide">
                {positionLabels[player.position] ?? player.position}
                {player.number ? ` | #${player.number}` : ""}
              </p>
              <h1 className="text-4xl font-extrabold">{player.name}</h1>
              <p className="mt-1 text-gray-300">
                {team?.name ?? player.teamId} &middot; {player.club}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Profile</h2>
              <p className="text-gray-700 leading-relaxed">
                {player.description}
              </p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                International Stats
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.caps}
                  </p>
                  <p className="text-sm text-gray-500">Caps</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.goals}
                  </p>
                  <p className="text-sm text-gray-500">Goals</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.age}
                  </p>
                  <p className="text-sm text-gray-500">Age</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {positionLabels[player.position]}
                  </p>
                  <p className="text-sm text-gray-500">Position</p>
                </div>
              </div>
            </section>

            {teammates.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Teammates
                </h2>
                <div className="space-y-3">
                  {teammates.map((mate) => (
                    <Link
                      key={mate.id}
                      href={`/player/${mate.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold">{mate.name}</p>
                        <p className="text-sm text-gray-500">
                          {positionLabels[mate.position]} &middot; {mate.club}
                        </p>
                      </div>
                      <span className="text-accent">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Technical Sheet</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Full Name</dt>
                  <dd className="font-medium">{player.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="font-medium">{player.age}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Position</dt>
                  <dd className="font-medium">
                    {positionLabels[player.position]}
                  </dd>
                </div>
                {player.number && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Number</dt>
                    <dd className="font-medium">#{player.number}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Caps</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Goals</dt>
                  <dd className="font-medium">{player.goals}</dd>
                </div>
              </dl>
            </div>

            {team && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Team</h3>
                <Link
                  href={`/team/${team.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <span className="text-2xl">{team.flag}</span>
                  <div>
                    <p className="font-semibold">{team.name}</p>
                    <p className="text-sm text-gray-500">
                      Group {team.group} &middot; #{team.fifaRanking} FIFA
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: player.name,
            jobTitle: "Football Player",
            memberOf: team
              ? {
                  "@type": "SportsTeam",
                  name: team.name,
                }
              : undefined,
            affiliation: {
              "@type": "SportsTeam",
              name: player.club,
            },
          }),
        }}
      />
    </>
  );
}
