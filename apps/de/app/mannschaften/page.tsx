import { getStaticAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Alle 48 Mannschaften der WM 2026 | Rangliste & Gruppen",
  description:
    "Alle 48 Mannschaften der Fussball-WM 2026. FIFA-Rangliste, Gruppenphase, Kader und Informationen zu jeder Nationalmannschaft.",
  alternates: getStaticAlternates("teams", "de"),
  openGraph: {
    title: "48 Mannschaften -- WM 2026",
    description:
      "Alle qualifizierten Mannschaften der WM 2026 in den USA, Kanada und Mexiko.",
  },
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Alle 48 Mannschaften der WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            FIFA-Rangliste, Gruppe und Informationen zu jeder Nationalmannschaft.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            FIFA-Rangliste der 48 Mannschaften
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">
                    Mannschaft
                  </th>
                  <th className="pb-3 font-medium text-gray-500 hidden sm:table-cell">
                    Konf.
                  </th>
                  <th className="pb-3 font-medium text-gray-500">Gr.</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((team) => {
                  const loc = localizeTeam(team, "de");
                  return (
                    <tr
                      key={team.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 font-medium text-gray-900">
                        {team.fifaRanking}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/mannschaft/${team.slug}`}
                          className="flex items-center gap-2 hover:text-primary min-w-0"
                        >
                          <span className="text-lg shrink-0">{team.flag}</span>
                          <span className="font-medium text-gray-900 truncate">
                            {loc.name}
                          </span>
                          {team.isHost && (
                            <span className="text-xs text-accent font-semibold">
                              (Gastgeber)
                            </span>
                          )}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500 hidden sm:table-cell">
                        {team.confederation}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/gruppe/${team.group.toLowerCase()}`}
                          className="hover:text-primary text-gray-700"
                        >
                          {team.group}
                        </Link>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/mannschaft/${team.slug}`}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Profil &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
