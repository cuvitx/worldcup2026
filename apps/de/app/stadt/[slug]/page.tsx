import { getAlternates } from "@repo/data/route-mapping";
import { localizeTeam, localizeCity } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};

  return {
    title: `${city.name} -- Austragungsort WM 2026 | Stadien & Infos`,
    description: `${city.name} als Austragungsort der WM 2026. Stadien, Anreise und praktische Informationen.`,
    alternates: getAlternates("city", slug, "de"),
  };
}

const stageLabels = stageLabelsI18n.de;

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();
  const loc = localizeCity(city, "de");

  const cityStadiums = city.stadiumIds
    .map((id) => stadiumsById[id])
    .filter((s) => s != null);

  const cityMatches = cityStadiums
    .flatMap((s) => matchesByStadium[s!.id] ?? [])
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">{city.name}</h1>
          <p className="mt-2 text-gray-300">
            {city.state}, {city.country} &middot; Austragungsort WM 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ueber {city.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {loc.description}
              </p>
            </section>

            {/* Stadiums */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {cityStadiums.length > 1 ? "Stadien" : "Stadion"}
              </h2>
              <div className="space-y-3">
                {cityStadiums.map((stadium) => {
                  if (!stadium) return null;
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stadion/${stadium.slug}`}
                      className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div>
                        <p className="font-semibold">{stadium.name}</p>
                        <p className="text-sm text-gray-500">
                          {stadium.capacity.toLocaleString("de-DE")} Plaetze
                        </p>
                      </div>
                      <span className="text-primary">&rarr;</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* City matches */}
            {cityMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Spiele in {city.name} ({cityMatches.length})
                </h2>
                <div className="space-y-2">
                  {cityMatches.map((match) => {
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
                        <span className="hidden sm:inline rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary shrink-0">
                          {stageLabels[match.stage] ?? match.stage}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Facts */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Praktische Infos
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {(city.population / 1_000_000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-500">Einwohner (Metro)</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">
                    {city.timezone.split("/").pop()?.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-500">Zeitzone</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Steckbrief
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Land</dt>
                  <dd className="font-medium">{city.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bundesstaat</dt>
                  <dd className="font-medium">{city.state}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Einwohner</dt>
                  <dd className="font-medium">
                    {city.population.toLocaleString("de-DE")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Zeitzone</dt>
                  <dd className="font-medium">{city.timezone}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Andere Austragungsorte
              </h3>
              <ul className="space-y-2 text-sm">
                {cities
                  .filter((c) => c.id !== city.id)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/stadt/${c.slug}`}
                        className="text-primary hover:underline"
                      >
                        {c.name} ({c.country})
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
