import { getStaticAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Die 12 Gruppen der WM 2026 | Tabellen & Spielplaene",
  description:
    "Alle 12 Gruppen der Fussball-WM 2026 (A bis L). Mannschaften, Tabellen und Spielplaene fuer jede Gruppe.",
  alternates: getStaticAlternates("groups", "de"),
  openGraph: {
    title: "Die 12 Gruppen -- WM 2026",
    description:
      "Gruppen A bis L der WM 2026 mit Tabellen und Spielplaenen.",
  },
};

export default function GroupsPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Die 12 Gruppen der WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            48 Mannschaften in 12 Gruppen zu je 4. Die ersten 2 jeder Gruppe
            und die 8 besten Dritten qualifizieren sich.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const groupTeams = group.teams
              .map((id) => teamsById[id])
              .filter(Boolean);

            return (
              <Link
                key={group.letter}
                href={`/gruppe/${group.slug}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="hero-animated px-4 py-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-accent">
                    Gruppe {group.letter}
                  </h2>
                  <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                    Details &rarr;
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {groupTeams.map((team, idx) => {
                    if (!team) return null;
                    const loc = localizeTeam(team, "de");
                    return (
                      <div
                        key={team.id}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${
                          idx < 2 ? "bg-accent/5" : ""
                        }`}
                      >
                        <span className="w-5 text-center text-xs font-bold text-gray-600">
                          {idx + 1}
                        </span>
                        <span className="text-xl">{team.flag}</span>
                        <span
                          className={`flex-1 font-medium text-sm ${
                            idx < 2 ? "text-accent" : "text-gray-800"
                          }`}
                        >
                          {loc.name}
                        </span>
                        <span className="text-xs text-gray-500">
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

        <div className="mt-8 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-accent/10 border border-accent/30" />
            Qualifiziert (Top 2)
          </span>
        </div>
      </div>
    </>
  );
}
