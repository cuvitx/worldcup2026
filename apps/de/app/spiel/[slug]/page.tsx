import { getAlternates, domains } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 300;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeLoc = home ? localizeTeam(home, "de") : null;
  const awayLoc = away ? localizeTeam(away, "de") : null;
  const stageLabels = stageLabelsI18n.de;
  const stage = stageLabels[match.stage] ?? match.stage;
  const homeName = homeLoc?.name ?? "TBD";
  const awayName = awayLoc?.name ?? "TBD";
  const dateStr = new Date(match.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    title: `${homeName} vs ${awayName} -- ${stage} | WM 2026`,
    description: `${homeName} gegen ${awayName}, ${stage} der WM 2026 am ${dateStr}. Aufstellung, Ergebnis und Statistiken.`,
    alternates: getAlternates("match", slug, "de"),
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} -- WM 2026`,
      description: `${stage} -- WM 2026 | ${match.date} ${match.time}`,
      url: `${domains.de}/spiel/${slug}`,
    },
  };
}

const stageLabels = stageLabelsI18n.de;

export default async function MatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeLoc = home ? localizeTeam(home, "de") : null;
  const awayLoc = away ? localizeTeam(away, "de") : null;
  const stadium = stadiumsById[match.stadiumId];
  const stage = stageLabels[match.stage] ?? match.stage;

  const dateFormatted = new Date(match.date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasScore =
    match.homeScore != null && match.awayScore != null;

  const sameDayMatches = matches.filter(
    (m) => m.date === match.date && m.slug !== match.slug
  );

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">
            {stage}
            {match.group ? ` -- Gruppe ${match.group}` : ""}
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
            <div className="text-center">
              <span className="text-3xl sm:text-5xl block mb-1">
                {home?.flag ?? ""}
              </span>
              <p className="font-bold text-sm sm:text-lg">
                {homeLoc?.name ?? "TBD"}
              </p>
            </div>
            {hasScore ? (
              <div className="text-3xl sm:text-5xl font-black">
                {match.homeScore} - {match.awayScore}
              </div>
            ) : (
              <div className="text-xl sm:text-2xl font-bold text-gray-300">
                vs
              </div>
            )}
            <div className="text-center">
              <span className="text-3xl sm:text-5xl block mb-1">
                {away?.flag ?? ""}
              </span>
              <p className="font-bold text-sm sm:text-lg">
                {awayLoc?.name ?? "TBD"}
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            {dateFormatted} &middot; {match.time} Uhr
          </p>
          {stadium && (
            <p className="text-gray-400 text-sm mt-1">
              {stadium.name}, {stadium.city}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Match info */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Spielinformationen
              </h2>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">Datum</dt>
                  <dd className="font-medium">{dateFormatted}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Anpfiff</dt>
                  <dd className="font-medium">{match.time} Uhr</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Runde</dt>
                  <dd className="font-medium">{stage}</dd>
                </div>
                {stadium && (
                  <div>
                    <dt className="text-gray-500">Stadion</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/stadion/${stadium.slug}`}
                        className="text-primary hover:underline"
                      >
                        {stadium.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.group && (
                  <div>
                    <dt className="text-gray-500">Gruppe</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/gruppe/${match.group.toLowerCase()}`}
                        className="text-primary hover:underline"
                      >
                        Gruppe {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {hasScore && (
                  <div>
                    <dt className="text-gray-500">Ergebnis</dt>
                    <dd className="font-bold text-lg">
                      {match.homeScore} - {match.awayScore}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Team links */}
            {home && away && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Mannschaften
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href={`/mannschaft/${home.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-2xl">{home.flag}</span>
                    <div>
                      <p className="font-semibold">{homeLoc?.name}</p>
                      <p className="text-sm text-gray-500">
                        FIFA #{home.fifaRanking}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`/mannschaft/${away.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-2xl">{away.flag}</span>
                    <div>
                      <p className="font-semibold">{awayLoc?.name}</p>
                      <p className="text-sm text-gray-500">
                        FIFA #{away.fifaRanking}
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {stadium && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Stadion
                </h3>
                <Link
                  href={`/stadion/${stadium.slug}`}
                  className="block hover:text-primary"
                >
                  <p className="font-medium">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.city}, {stadium.country} &middot;{" "}
                    {stadium.capacity.toLocaleString("de-DE")} Plaetze
                  </p>
                </Link>
              </div>
            )}

            {/* Same day matches */}
            {sameDayMatches.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Weitere Spiele am selben Tag
                </h3>
                <div className="space-y-2">
                  {sameDayMatches.slice(0, 4).map((m) => {
                    const h = teamsById[m.homeTeamId];
                    const a = teamsById[m.awayTeamId];
                    return (
                      <Link
                        key={m.id}
                        href={`/spiel/${m.slug}`}
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <span>{h?.flag}</span>
                        <span className="truncate">
                          {h ? localizeTeam(h, "de").name : "TBD"}
                        </span>
                        <span className="text-gray-400">vs</span>
                        <span className="truncate">
                          {a ? localizeTeam(a, "de").name : "TBD"}
                        </span>
                        <span>{a?.flag}</span>
                        <span className="ml-auto text-gray-400 shrink-0">
                          {m.time}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/spiel/spielplan"
                    className="text-primary hover:underline"
                  >
                    Spielplan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ergebnisse"
                    className="text-primary hover:underline"
                  >
                    Ergebnisse
                  </Link>
                </li>
                <li>
                  <Link href="/live" className="text-primary hover:underline">
                    Live-Ergebnisse
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
