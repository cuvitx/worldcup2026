import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { localizeTeam, localizeTeams } from "@repo/data/i18n";
import { getUpcomingMatches } from "@repo/utils";
import { DISPLAY_LIMITS } from "@repo/data/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "WM 2026 | Spielplan, Gruppen & Prognosen",
  description:
    "WM 2026: Spielplan aller 104 Spiele, 48 Mannschaften, 16 Stadien. Gruppen, Ergebnisse und Prognosen -- kostenlos.",
  alternates: getHomeAlternates("de"),
  openGraph: {
    title: "WM 2026 | Spielplan, Gruppen & Prognosen",
    description:
      "Alle 104 Spiele der Fussball-WM 2026. Spielplan, Gruppen, Mannschaften und Prognosen.",
    url: "https://www.wm2026guide.de",
  },
};

export default function HomePage() {
  const upcomingMatches = getUpcomingMatches(matches)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() -
        new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime()
    )
    .slice(0, DISPLAY_LIMITS.UPCOMING_MATCHES_HOME);

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            WM 2026 -- Alle 104 Spiele live
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            48 Mannschaften, 16 Stadien, 3 Gastgeberlaender. Spielplan,
            Gruppenphase, Ergebnisse und Prognosen zur Fussball-Weltmeisterschaft
            2026 in den USA, Kanada und Mexiko.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/gruppen"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent/80 transition-colors"
            >
              Alle Gruppen
            </Link>
            <Link
              href="/mannschaften"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
            >
              48 Mannschaften
            </Link>
            <Link
              href="/spiel/spielplan"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
            >
              Spielplan
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-6 sm:py-8 -mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "48", label: "Mannschaften" },
              { value: "104", label: "Spiele" },
              { value: "16", label: "Stadien" },
              { value: "3", label: "Gastgeber" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-center shadow-sm"
              >
                <p className="text-2xl sm:text-3xl font-black text-primary leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming matches */}
      {upcomingMatches.length > 0 && (
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Naechste Spiele
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                const stadium = stadiumsById[match.stadiumId];
                const homeLoc = home ? localizeTeam(home, "de") : null;
                const awayLoc = away ? localizeTeam(away, "de") : null;
                const dateStr = new Date(match.date).toLocaleDateString(
                  "de-DE",
                  { weekday: "short", day: "numeric", month: "short" }
                );
                return (
                  <Link
                    key={match.id}
                    href={`/spiel/${match.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-lg shrink-0">
                        {home?.flag ?? ""}
                      </span>
                      <span className="font-medium truncate text-sm">
                        {homeLoc?.name ?? "TBD"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">vs</span>
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="font-medium truncate text-sm text-right">
                        {awayLoc?.name ?? "TBD"}
                      </span>
                      <span className="text-lg shrink-0">
                        {away?.flag ?? ""}
                      </span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs text-gray-500">{dateStr}</p>
                      <p className="text-xs text-gray-400">{match.time}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/spiel/spielplan"
                className="text-primary font-semibold text-sm hover:underline"
              >
                Vollstaendiger Spielplan &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Groups overview */}
      <section className="bg-gray-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Die 12 Gruppen
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups.map((group) => {
              const groupTeams = group.teams
                .map((id) => teamsById[id])
                .filter(Boolean);
              return (
                <Link
                  key={group.letter}
                  href={`/gruppe/${group.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <h3 className="text-lg font-bold text-primary mb-2">
                    Gruppe {group.letter}
                  </h3>
                  <div className="space-y-1.5">
                    {groupTeams.map((team) => {
                      if (!team) return null;
                      const loc = localizeTeam(team, "de");
                      return (
                        <div
                          key={team.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-base">{team.flag}</span>
                          <span className="text-gray-800">{loc.name}</span>
                          <span className="ml-auto text-xs text-gray-400">
                            #{team.fifaRanking}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            WM 2026 entdecken
          </h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { href: "/mannschaften", label: "Alle Mannschaften" },
              { href: "/gruppen", label: "Alle Gruppen" },
              { href: "/spiel/spielplan", label: "Spielplan" },
              { href: "/stadien", label: "Stadien" },
              { href: "/staedte", label: "Austragungsorte" },
              { href: "/ergebnisse", label: "Ergebnisse" },
              { href: "/turnierbaum", label: "Turnierbaum" },
              { href: "/live", label: "Live-Ergebnisse" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:shadow-md hover:border-primary/30 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
