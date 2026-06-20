import type { Metadata } from "next";
import Link from "next/link";
import { RelatedLinks } from "../components/RelatedLinks";
import { teams, matches, teamsById } from "../../lib/localized-data";
import { H2HSelector } from "./h2h-selector";

export const metadata: Metadata = {
  title: "H2H-Direktvergleich — Zwei Mannschaften vergleichen | WM 2026",
  description:
    "Vergleichen Sie zwei Mannschaften der WM 2026: Konfrontationshistorie, Statistiken, FIFA-Rangliste und Prognose.",
  alternates: {
    canonical: "https://www.wm2026guide.de/h2h",
  },
  openGraph: {
    title: "H2H-Direktvergleich — WM 2026",
    description:
      "Historische Daten und Direktvergleich-Statistiken aller qualifizierten Mannschaften für die WM 2026.",
  },
};

// Popular matchups to feature
const popularMatchups = [
  ["frankreich", "deutschland"],
  ["brasilien", "argentinien"],
  ["spanien", "portugal"],
  ["frankreich", "brasilien"],
  ["england", "usa"],
  ["argentinien", "deutschland"],
  ["frankreich", "spanien"],
  ["brasilien", "deutschland"],
  ["niederlande", "argentinien"],
  ["frankreich", "england"],
  ["mexiko", "usa"],
  ["japan", "suedkorea"],
];

export default function H2HIndexPage() {
  // Build group matchups from actual match data
  const groupMatchups = matches
    .filter((m) => m.stage === "group" && m.homeTeamId && m.awayTeamId)
    .slice(0, 12)
    .map((m) => {
      const home = teamsById[m.homeTeamId];
      const away = teamsById[m.awayTeamId];
      if (!home || !away) return null;
      return { home, away, slug: `${home.slug}-vs-${away.slug}` };
    })
    .filter(Boolean);

  // Build popular matchup data
  const popularData = popularMatchups
    .map(([s1, s2]) => {
      const t1 = teams.find((t) => t.slug === s1);
      const t2 = teams.find((t) => t.slug === s2);
      if (!t1 || !t2) return null;
      return { home: t1, away: t2, slug: `${t1.slug}-vs-${t2.slug}` };
    })
    .filter(Boolean);

  const teamList = teams
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "de"))
    .map((t) => ({ slug: t.slug, name: t.name, flag: t.flag }));

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Vergleichende Analyse</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            H2H-Direktvergleich
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Vergleichen Sie beliebige Mannschaften der WM 2026:
            Historische Daten, Statistiken, FIFA-Rangliste und Prognose.
          </p>
        </div>
      </section>

      {/* Team Selector */}
      <section className="bg-gray-50 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4">
          <H2HSelector teams={teamList} />
        </div>
      </section>

      {/* Popular Matchups */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Beliebte Direktvergleiche
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularData.map(
              (m) =>
                m && (
                  <Link
                    key={m.slug}
                    href={`/h2h/${m.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.home.flag}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.home.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">VS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {m.away.name}
                      </span>
                      <span className="text-xl">{m.away.flag}</span>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Group Stage Matchups */}
      <section className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Spiele der Gruppenphase
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groupMatchups.map(
              (m) =>
                m && (
                  <Link
                    key={m.slug}
                    href={`/h2h/${m.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.home.flag}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {m.home.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">VS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {m.away.name}
                      </span>
                      <span className="text-xl">{m.away.flag}</span>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* All Teams Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Alle Mannschaften
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Klicken Sie auf eine Mannschaft, um alle möglichen Direktvergleiche zu sehen.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {teams
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name, "de"))
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/mannschaft/${t.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <span>{t.flag}</span>
                  <span className="truncate">{t.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/mannschaft", title: "Die 48 Mannschaften", description: "Vollständige Kaderübersicht jeder Mannschaft", icon: "" },
          { href: "/spiel/spielplan", title: "Spielplan", description: "Alle Spiele der WM 2026", icon: "" },
          { href: "/fifa-ranking", title: "FIFA-Rangliste", description: "Weltrangliste der 48 Mannschaften", icon: "" },
          { href: "/quotenvergleich", title: "Spielervergleich", description: "Vergleichen Sie die Stars der WM", icon: "" },
          { href: "/statistiken", title: "Statistiken", description: "Zahlen und Statistiken der WM 2026", icon: "" },
        ]} />
      </div>
    </>
  );
}
