import { getAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stadiums.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) return {};

  return {
    title: `${stadium.name} -- WM-Stadion 2026 | ${stadium.city}`,
    description: `${stadium.name} in ${stadium.city}: Kapazitaet ${stadium.capacity.toLocaleString("de-DE")} Plaetze. Spiele, Anfahrt und Infos zur WM 2026.`,
    alternates: getAlternates("stadium", slug, "de"),
  };
}

const stageLabels = stageLabelsI18n.de;

export default async function StadiumPage({ params }: PageProps) {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) notFound();

  const city = citiesById[stadium.cityId];
  const stadiumMatches = matchesByStadium[stadium.id] ?? [];

  const roofLabel =
    stadium.roofType === "retractable"
      ? "Schiebedach"
      : stadium.roofType === "fixed"
        ? "Festes Dach"
        : "Offenes Dach";

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            {stadium.name}
          </h1>
          <p className="mt-2 text-gray-300">
            {stadium.city}, {stadium.country} &middot;{" "}
            {stadium.capacity.toLocaleString("de-DE")} Plaetze
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Beschreibung
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {stadium.description}
              </p>
            </section>

            {/* Key facts */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Eckdaten
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stadium.capacity.toLocaleString("de-DE")}
                  </p>
                  <p className="text-sm text-gray-500">Kapazitaet</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{roofLabel}</p>
                  <p className="text-sm text-gray-500">Dach</p>
                </div>
                {stadium.yearBuilt && (
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {stadium.yearBuilt}
                    </p>
                    <p className="text-sm text-gray-500">Baujahr</p>
                  </div>
                )}
              </div>
            </section>

            {/* Matches */}
            {stadiumMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Spiele im {stadium.name} ({stadiumMatches.length})
                </h2>
                <div className="space-y-2">
                  {stadiumMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    const homeLoc = home ? localizeTeam(home, "de") : null;
                    const awayLoc = away ? localizeTeam(away, "de") : null;
                    return (
                      <Link
                        key={match.id}
                        href={`/spiel/${match.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-12 shrink-0">
                          {match.date.slice(5)}
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
                        <span className="hidden sm:inline rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary shrink-0">
                          {stageLabels[match.stage] ?? match.stage}
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
                Infos
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Stadt</dt>
                  <dd className="font-medium">
                    {city ? (
                      <Link
                        href={`/stadt/${city.slug}`}
                        className="text-primary hover:underline"
                      >
                        {stadium.city}
                      </Link>
                    ) : (
                      stadium.city
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Land</dt>
                  <dd className="font-medium">{stadium.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Kapazitaet</dt>
                  <dd className="font-medium">
                    {stadium.capacity.toLocaleString("de-DE")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Dach</dt>
                  <dd className="font-medium">{roofLabel}</dd>
                </div>
                {stadium.yearBuilt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Baujahr</dt>
                    <dd className="font-medium">{stadium.yearBuilt}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Andere Stadien
              </h3>
              <ul className="space-y-2 text-sm">
                {stadiums
                  .filter((s) => s.id !== stadium.id)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/stadion/${s.slug}`}
                        className="text-primary hover:underline"
                      >
                        {s.name} ({s.city})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
