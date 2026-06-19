import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import { teams } from "../../lib/localized-data";
import Flag from "@repo/ui/flag";
import { TableOfContents } from "@repo/ui";
import { PmuBanner } from "../components/PmuBanner";

export const metadata: Metadata = {
  title: "FIFA-Rangliste 2026 – Ranking der 48 qualifizierten Mannschaften | WM 2026",
  description:
    "Vollständige FIFA-Rangliste der 48 qualifizierten Mannschaften für die WM 2026. Entdecken Sie das offizielle Ranking, die Bewegungen und die Entwicklung der Nationalmannschaften.",
  openGraph: {
    title: "FIFA-Rangliste 2026 – Ranking der 48 qualifizierten Mannschaften",
    description:
      "Offizielle FIFA-Rangliste der 48 qualifizierten Mannschaften für die WM 2026, mit Historie und Analyse.",
    url: "https://www.wm2026guide.de/fifa-ranking",
  },
  alternates: {
    canonical: "https://www.wm2026guide.de/fifa-ranking",
  },
};

// Mannschaften nach FIFA-Rangliste sortiert
const teamsRanked = [...teams]
  .filter((t) => t.fifaRanking > 0)
  .sort((a, b) => a.fifaRanking - b.fifaRanking);

const playoffTeams = teams.filter((t) => t.fifaRanking === 0);

const faqItems = [
  {
    question: "Wie funktioniert die FIFA-Rangliste?",
    answer: "Die FIFA-Rangliste wird anhand eines Punktesystems berechnet, das auf den Ergebnissen offizieller Spiele basiert (Wettbewerbe, Qualifikation und Freundschaftsspiele). Berücksichtigt werden das Spielergebnis, die Bedeutung des Wettbewerbs, die Stärke des Gegners und die Konföderation. Die Punkte werden über 4 Jahre gewichtet, wobei ältere Spiele weniger stark einfließen. Die Rangliste wird monatlich von der FIFA aktualisiert."
  },
  {
    question: "Welches Land ist 2026 auf Platz 1 der FIFA-Rangliste?",
    answer: "Argentinien belegt im Juni 2026 den ersten Platz der FIFA-Rangliste, gefolgt von Frankreich (#2) und Spanien (#3). Die Weltmeister von 2022 haben ihre Position dank ihres Sieges in Katar und konstanter Leistungen in der Qualifikation gefestigt."
  },
  {
    question: "Beeinflusst die FIFA-Rangliste die Gruppenauslosung?",
    answer: "Ja, die FIFA-Rangliste wird verwendet, um die Setzliste bei der WM-Auslosung zu bestimmen. Die 12 bestplatzierten Mannschaften werden in der Regel als Gruppenköpfe gesetzt, was die Gruppenzusammensetzung und damit die möglichen Turnierwege der Nationalmannschaften beeinflusst."
  },
  {
    question: "Welche ist die am niedrigsten platzierte qualifizierte Mannschaft für die WM 2026?",
    answer: "Unter den bereits qualifizierten Mannschaften (ohne Playoffs) ist Südafrika die am niedrigsten platzierte Mannschaft in der FIFA-Rangliste (#60). Die sechs verbleibenden Playoff-Plätze könnten von Mannschaften mit einem niedrigeren Ranking belegt werden."
  },
  {
    question: "Wie oft wird die FIFA-Rangliste aktualisiert?",
    answer: "Die FIFA-Rangliste wird monatlich aktualisiert, in der Regel am Donnerstag nach den internationalen Länderspielpausen. Die Aktualisierungen berücksichtigen alle ausgetragenen Länderspiele, gewichtet nach ihrer Bedeutung (WM, Qualifikation, Freundschaftsspiele usw.)."
  },
  {
    question: "Ist die FIFA-Rangliste zuverlässig für Ergebnisprognosen?",
    answer: "Die FIFA-Rangliste ist ein guter Indikator für die relative Stärke der Mannschaften, sagt aber nicht immer das Ergebnis eines einzelnen Spiels voraus. Faktoren wie die aktuelle Form, Verletzungen, Heimvorteil und Taktik können die Prognosen verändern. Statistisch gesehen haben jedoch besser platzierte Mannschaften größere Erfolgschancen."
  }
];

export default function RanglisteFifaPage() {
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Ranking FIFA 2026
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            FIFA-Rangliste der 48 Mannschaften
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Entdecken Sie die vollständige FIFA-Rangliste der qualifizierten Mannschaften für die WM 2026.
            Offizielles Ranking, Entwicklung und Analyse nach Konföderation.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "48", label: "Qualifizierte Mannschaften" },
              { val: "6", label: "Konföderationen" },
              { val: "ARG", label: "#1 Weltweit" },
              { val: "12", label: "Gruppenköpfe" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-200 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div>
          {/* Intro */}
          <div className="mb-10">
            <h2 id="introduction" className="text-2xl font-bold text-gray-900 mb-4">
              Die FIFA-Rangliste: weltweiter Maßstab
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Die FIFA-Weltrangliste ist der Referenzindikator zur Bewertung der Stärke der Nationalmannschaften.
              Seit 1993 monatlich aktualisiert, berücksichtigt sie die Ergebnisse offizieller Spiele, gewichtet nach deren Bedeutung,
              der Stärke des Gegners und der jeweiligen Konföderation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Für die WM 2026 spielte die FIFA-Rangliste eine entscheidende Rolle bei der Zusammensetzung der Lostöpfe.
              Die 12 bestplatzierten Mannschaften wurden als Gruppenköpfe in die 12 Gruppen eingeteilt,
              was die Turnierwege und möglichen Begegnungen direkt beeinflusste.
            </p>
          </div>

          {/* Tabelle FIFA-Rangliste */}
          <div className="mb-12">
            <h2 id="Rangliste-complet" className="text-2xl font-bold text-gray-900 mb-6">
              Vollständige FIFA-Rangliste (Juni 2026)
            </h2>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Rang FIFA
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Mannschaft
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Konföderation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Gruppe
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        WM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamsRanked.map((team, idx) => (
                      <tr
                        key={team.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`
                              font-bold text-sm
                              ${team.fifaRanking <= 12 ? "text-accent" : "text-gray-900"}
                            `}>
                              #{team.fifaRanking}
                            </span>
                            {team.fifaRanking <= 12 && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                                Gruppenkopf
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/mannschaft/${team.slug}`}
                            className="flex items-center gap-2 hover:text-accent transition-colors group"
                          >
                            <Flag lang="de" flag={team.flag} name={team.name} className="w-6 h-4" />
                            <span className="font-medium text-gray-900 group-hover:underline">
                              {team.name}
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {team.confederation}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            href={`/gruppe/${team.group.toLowerCase()}`}
                            className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors"
                          >
                            Gruppe {team.group}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {team.wcAppearances}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {playoffTeams.length > 0 && (
              <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Ausstehende Playoff-Plätze
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {playoffTeams.length} Plätze sind noch über die UEFA- und interkontinentalen Playoffs (März 2026) zu vergeben:
                </p>
                <ul className="space-y-1.5">
                  {playoffTeams.map((team) => (
                    <li key={team.id} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{team.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* PMU Banner */}
          <section className="py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <PmuBanner tracking="Rangliste-fifa" />
            </div>
          </section>

          {/* Analyse nach Konföderation */}
          <div className="mb-12">
            <h2 id="par-confederation" className="text-2xl font-bold text-gray-900 mb-6">
              Verteilung nach Konföderation
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["UEFA", "CONMEBOL", "AFC", "CAF", "CONCACAF", "OFC"].map((conf) => {
                const confTeams = teamsRanked.filter((t) => t.confederation === conf);
                const avgRank = confTeams.length > 0
                  ? (confTeams.reduce((sum, t) => sum + t.fifaRanking, 0) / confTeams.length).toFixed(1)
                  : "N/A";
                const bestRank = confTeams.length > 0 ? Math.min(...confTeams.map((t) => t.fifaRanking)) : null;

                return (
                  <div
                    key={conf}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{conf}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mannschaften</span>
                        <span className="text-sm font-bold text-gray-900">{confTeams.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bester Rang</span>
                        <span className="text-sm font-bold text-accent">#{bestRank || "—"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Durchschnittl. Rang</span>
                        <span className="text-sm font-bold text-gray-900">{avgRank}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 10 */}
          <div className="mb-12">
            <h2 id="top-10" className="text-2xl font-bold text-gray-900 mb-6">
              FIFA Top 10 weltweit
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {teamsRanked.slice(0, 10).map((team) => (
                <Link
                  key={team.id}
                  href={`/mannschaft/${team.slug}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group"
                >
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-extrabold text-accent">#{team.fifaRanking}</div>
                  </div>
                  <Flag lang="de" flag={team.flag} name={team.name} className="w-10 h-7 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                      {team.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {team.confederation} · Gruppe {team.group}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: "/mannschaft", label: "Alle Mannschaften", desc: "48 qualifizierte Mannschaften" },
              { href: "/gruppen", label: "Gruppenübersicht", desc: "12 Gruppen mit je 4 Mannschaften" },
              { href: "/statistiques", label: "WM-Statistiken", desc: "Rekorde und Analysen" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-accent/30 hover:shadow-md transition-all group text-center"
              >
                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {label}
                </div>
                <div className="text-xs text-gray-600">{desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <TableOfContents items={[
          { id: "introduction", label: "Einführung", level: 2 },
          { id: "Rangliste-complet", label: "Vollständige Rangliste", level: 2 },
          { id: "par-confederation", label: "Nach Konföderation", level: 2 },
          { id: "top-10", label: "Top 10 weltweit", level: 2 },
        ]} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/mannschaft", title: "48 qualifizierte Mannschaften", description: "Vollständige Steckbriefe der WM-2026-Mannschaften", icon: "" },
          { href: "/gruppen", title: "Die 12 Gruppen", description: "Zusammensetzung und Analyse jeder Gruppe", icon: "" },
          { href: "/prognose/sieger", title: "Siegerprognose", description: "Wer gewinnt die WM 2026?", icon: "" },
          { href: "/statistiques", title: "Statistiken", description: "Zahlen und Fakten zum Turnier", icon: "" },
          { href: "/turnierbaum", title: "Simulator", description: "Simulieren Sie den Weg Ihrer Mannschaft", icon: "" },
        ]} />
      </div>

      <FAQSection title="Fragen zur FIFA-Rangliste" items={faqItems} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FIFA-Rangliste 2026 – Ranking der 48 qualifizierten Mannschaften",
            description: "Vollständige FIFA-Rangliste der 48 qualifizierten Mannschaften für die WM 2026.",
            url: "https://www.wm2026guide.de/fifa-ranking",
            mainEntity: {
              "@type": "ItemList",
              name: "FIFA-Rangliste der qualifizierten Mannschaften WM 2026",
              numberOfItems: teamsRanked.length,
              itemListElement: teamsRanked.slice(0, 20).map((team, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: `${team.name} - #${team.fifaRanking} FIFA`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
