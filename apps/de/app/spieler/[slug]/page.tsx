import { getAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { positionLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};

  const team = teamsById[player.teamId];
  const teamLoc = team ? localizeTeam(team, "de") : null;
  const teamName = teamLoc?.name ?? player.teamId;

  return {
    title: `${player.name} -- ${teamName} | Spielerprofil WM 2026`,
    description: `${player.name} (${teamName}) bei der WM 2026. ${player.caps} Laenderspiele, ${player.goals} Tore. Verein: ${player.club}.`,
    alternates: getAlternates("player", slug, "de"),
  };
}

const positionLabels = positionLabelsI18n.de;

export default async function PlayerPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const team = teamsById[player.teamId];
  const teamLoc = team ? localizeTeam(team, "de") : null;
  const teammates = (playersByTeamId[player.teamId] ?? []).filter(
    (p) => p.id !== player.id
  );

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {team && (
              <span className="text-3xl sm:text-5xl">{team.flag}</span>
            )}
            <div>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                {positionLabels[player.position] ?? player.position}
                {player.number ? ` | #${player.number}` : ""}
              </p>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                {player.name}
              </h1>
              <p className="mt-1 text-white/80">
                {teamLoc?.name ?? player.teamId} &middot; {player.club}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Profile */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Profil
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {player.description}
              </p>
            </section>

            {/* Stats */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Statistiken
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.caps}
                  </p>
                  <p className="text-sm text-gray-500">Laenderspiele</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.goals}
                  </p>
                  <p className="text-sm text-gray-500">Tore</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.age}
                  </p>
                  <p className="text-sm text-gray-500">Alter</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {positionLabels[player.position]}
                  </p>
                  <p className="text-sm text-gray-500">Position</p>
                </div>
              </div>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Mitspieler
                </h2>
                <div className="space-y-2">
                  {teammates.slice(0, 10).map((mate) => (
                    <Link
                      key={mate.id}
                      href={`/spieler/${mate.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{mate.name}</p>
                        <p className="text-sm text-gray-500">
                          {positionLabels[mate.position]} &middot; {mate.club}
                        </p>
                      </div>
                      <span className="text-primary shrink-0">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Steckbrief
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="font-medium">{player.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Alter</dt>
                  <dd className="font-medium">{player.age} Jahre</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Position</dt>
                  <dd className="font-medium">
                    {positionLabels[player.position]}
                  </dd>
                </div>
                {player.number && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Nummer</dt>
                    <dd className="font-medium">#{player.number}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Verein</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Laenderspiele</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tore</dt>
                  <dd className="font-medium">{player.goals}</dd>
                </div>
              </dl>
            </div>

            {team && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Mannschaft
                </h3>
                <Link
                  href={`/mannschaft/${team.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
                >
                  <span className="text-2xl">{team.flag}</span>
                  <div>
                    <p className="font-semibold">{teamLoc?.name}</p>
                    <p className="text-sm text-gray-500">
                      Gruppe {team.group} &middot; #{team.fifaRanking} FIFA
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
