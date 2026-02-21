import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
// Set of player slugs that have a photo in /public/images/players/
const PLAYER_PHOTO_SLUGS = new Set([
  "achraf-hakimi", "alisson-becker", "aurelien-tchouameni", "bukayo-saka",
  "cole-palmer", "cristiano-ronaldo", "eduardo-camavinga", "erling-haaland",
  "federico-valverde", "florian-wirtz", "gavi", "harry-kane", "jamal-musiala",
  "jude-bellingham", "kevin-de-bruyne", "kylian-mbappe", "lamine-yamal",
  "lionel-messi", "luka-modric", "manuel-neuer", "mohamed-salah", "pedri",
  "phil-foden", "robert-lewandowski", "rodri", "son-heung-min",
  "thibaut-courtois", "trent-alexander-arnold", "victor-osimhen", "vinicius-jr",
]);
import { getPlayerImagePath, getPlayerInitials, getAvatarColor } from "../../../lib/player-images";

export const revalidate = 3600;
export const dynamicParams = false;

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

  const hasPhoto = PLAYER_PHOTO_SLUGS.has(slug);
  const ogImages = hasPhoto
    ? [{ url: `https://cdm2026.fr/images/players/${slug}.jpg`, width: 800, height: 600, alt: `${player.name} — CDM 2026` }]
    : [{ url: "https://cdm2026.fr/images/og-default.png", width: 1200, height: 630, alt: "CDM 2026" }];

  return {
    title: `${player.name} - ${teamName} | Fiche joueur CDM 2026`,
    description: `Fiche de ${player.name} (${teamName}) pour la Coupe du Monde 2026. ${player.caps} selections, ${player.goals} buts. ${player.description}`,
    alternates: getAlternates("player", slug, "fr"),
    openGraph: {
      title: `${player.name} - ${teamName} CDM 2026`,
      description: `${player.position} | ${player.club} | ${player.caps} selections | ${player.goals} buts`,
      images: ogImages,
    },
  };
}

const positionLabels: Record<string, string> = {
  GK: "Gardien",
  DF: "Defenseur",
  MF: "Milieu",
  FW: "Attaquant",
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
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Player photo or initials fallback */}
            {(() => {
              const imgPath = getPlayerImagePath(player.slug);
              const initials = getPlayerInitials(player.name);
              const avatarColor = getAvatarColor(player.name);
              return imgPath ? (
                <div className="relative h-20 w-20 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-lg">
                  <Image
                    src={imgPath}
                    alt={player.name}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 80px, 112px"
                  />
                </div>
              ) : (
                <div
                  className={`flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-full border-2 border-white/30 shadow-lg text-2xl sm:text-3xl font-extrabold ${avatarColor}`}
                >
                  {initials}
                </div>
              );
            })()}
            {team && (
              <span className="text-2xl sm:text-4xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            )}
            <div>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                {positionLabels[player.position] ?? player.position}
                {player.number ? ` | #${player.number}` : ""}
              </p>
              <h1 className="text-2xl font-extrabold sm:text-4xl">{player.name}</h1>
              <p className="mt-1 text-white/80">
                {team?.name ?? player.teamId} &middot; {player.club}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profil</h2>
              <p className="text-gray-700 leading-relaxed break-words">
                {player.description}
              </p>
            </section>

            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Statistiques internationales
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.caps}
                  </p>
                  <p className="text-sm text-gray-500">Selections</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.goals}
                  </p>
                  <p className="text-sm text-gray-500">Buts</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {player.age}
                  </p>
                  <p className="text-sm text-gray-500">Age</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {positionLabels[player.position]}
                  </p>
                  <p className="text-sm text-gray-500">Poste</p>
                </div>
              </div>
            </section>

            {teammates.length > 0 && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Coequipiers en sélection
                </h2>
                <div className="space-y-3">
                  {teammates.map((mate) => {
                    const mateImg = getPlayerImagePath(mate.slug);
                    const mateInitials = getPlayerInitials(mate.name);
                    const mateColor = getAvatarColor(mate.name);
                    return (
                    <Link
                      key={mate.id}
                      href={`/joueur/${mate.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      {/* Mini avatar */}
                      {mateImg ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <Image src={mateImg} alt={mate.name} fill className="object-cover object-top" sizes="40px" />
                        </div>
                      ) : (
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${mateColor}`}>
                          {mateInitials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{mate.name}</p>
                        <p className="text-sm text-gray-500">
                          {positionLabels[mate.position]} &middot; {mate.club}
                        </p>
                      </div>
                      <span className="text-primary shrink-0">&rarr;</span>
                    </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fiche technique</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Nom complet</dt>
                  <dd className="font-medium">{player.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="font-medium">{player.age} ans</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Poste</dt>
                  <dd className="font-medium">
                    {positionLabels[player.position]}
                  </dd>
                </div>
                {player.number && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Numero</dt>
                    <dd className="font-medium">#{player.number}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Selections</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Buts</dt>
                  <dd className="font-medium">{player.goals}</dd>
                </div>
              </dl>
            </div>

            {team && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Équipe</h3>
                <Link
                  href={`/equipe/${team.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30"
                >
                  <span className="text-2xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                  <div>
                    <p className="font-semibold">{team.name}</p>
                    <p className="text-sm text-gray-500">
                      Groupe {team.group} &middot; #{team.fifaRanking} FIFA
                    </p>
                  </div>
                </Link>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Explorer</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/joueurs" className="text-primary dark:text-secondary hover:underline">
                    ⚽ Tous les joueurs clés
                  </Link>
                </li>
                <li>
                  <Link href="/buteurs" className="text-primary dark:text-secondary hover:underline">
                    🥅 Meilleurs buteurs
                  </Link>
                </li>
                <li>
                  <Link href="/comparateur-joueurs" className="text-primary dark:text-secondary hover:underline">
                    👥 Comparateur de joueurs
                  </Link>
                </li>
                {team && (
                  <li>
                    <Link href={`/pronostic/${team.slug}`} className="text-primary dark:text-secondary hover:underline">
                      🔮 Pronostic {team.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
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
