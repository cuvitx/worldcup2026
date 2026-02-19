import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import CalendarFilters from "./CalendarFilters";

export const metadata: Metadata = {
  title: "Calendrier des matchs - Coupe du Monde 2026",
  description:
    "Calendrier complet des 104 matchs de la Coupe du Monde 2026. Phase de groupes, huitièmes, quarts, demi-finales et finale. Du 11 juin au 19 juillet 2026.",
  alternates: getStaticAlternates("matchSchedule", "fr"),
};

export default function CalendrierPage() {
  // Serialize data for client component
  const matchData = matches.map((m) => ({
    id: m.id,
    slug: m.slug,
    homeTeamId: m.homeTeamId,
    awayTeamId: m.awayTeamId,
    date: m.date,
    time: m.time,
    stadiumId: m.stadiumId,
    stage: m.stage,
    group: m.group,
  }));

  const teamData: Record<string, { id: string; name: string; flag: string }> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamData[id] = { id: t.id, name: t.name, flag: t.flag };
  }

  const stadiumData: Record<string, { id: string; name: string }> = {};
  for (const [id, s] of Object.entries(stadiumsById)) {
    if (s) stadiumData[id] = { id: s.id, name: s.name };
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Calendrier des matchs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Calendrier des matchs</h1>
          <p className="mt-2 text-gray-300">
            104 matchs du 11 juin au 19 juillet 2026
          </p>
        </div>
      </section>

      <CalendarFilters
        matches={matchData}
        teamsById={teamData}
        stadiumsById={stadiumData}
      />
    </>
  );
}
