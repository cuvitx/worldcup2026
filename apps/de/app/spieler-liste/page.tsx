import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { RelatedLinks } from "../components/RelatedLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { players } from "../../lib/localized-data";
import { teams, teamsById } from "../../lib/localized-data";
export const metadata: Metadata = {
  title: "210 Schlüsselspieler der WM 2026 | Kader & Statistiken",
  description:
    "Die 210 Schlüsselspieler der 48 Mannschaften der WM 2026. Statistiken, Vereine, Länderspiele und Tore für jeden Spieler.",
  alternates: getStaticAlternates("players", "de"),
  openGraph: {
    title: "210 Schlüsselspieler der WM 2026",
    description: "Statistiken, Vereine und Kader der 210 Schlüsselspieler der 48 Mannschaften der WM 2026.",
  },
};

export default function PlayersPage() {
  const faqItems = [
    {
      question: "Wie viele Spieler umfasst ein WM-Kader?",
      answer: "Jede Mannschaft kann 26 Spieler für die WM 2026 nominieren (zuvor 23). Diese Regel wurde von der FIFA 2022 eingeführt, um mehr Rotation zu ermöglichen und Verletzungen besser zu managen. Von diesen 26 Spielern müssen 3 Torhüter sein. Der Trainer kann je nach taktischen Bedürfnissen und körperlicher Verfassung auf alle Spieler der Liste zurückgreifen."
    },
    {
      question: "Wer sind die Favoriten für den Goldenen Ball der WM 2026?",
      answer: "Die Hauptkandidaten für den Goldenen Ball der WM 2026 sind Kylian Mbappé (Frankreich, bereits Goldener Ball 2022), Erling Haaland (Norwegen), Vinícius Júnior (Brasilien), Jude Bellingham (England) und Lamine Yamal (Spanien). Mbappé ist der große Favorit dank seines Status als bester Spieler der Welt, seinen 12 WM-Toren und der Stärke der französischen Mannschaft. Der Goldene Ball wird dem besten Spieler des Turniers verliehen, unabhängig vom Endsieger."
    },
    {
      question: "Welcher Spieler hat die meisten Länderspieltore erzielt?",
      answer: "Cristiano Ronaldo (Portugal) hält den absoluten Rekord mit 130 Länderspieltoren in 212 Spielen. Er liegt vor Lionel Messi (Argentinien, 106 Tore), Ali Daei (Iran, 109 Tore) und Sunil Chhetri (Indien, 94 Tore). In Deutschland ist Miroslav Klose der Rekordtorschütze mit 71 Toren, vor Gerd Müller (68 Tore) und Lukas Podolski (49 Tore). Kylian Mbappé (48 Tore mit 25 Jahren) dürfte bis 2026 zum französischen Rekordtorschützen aufsteigen."
    },
    {
      question: "Welche sind die teuersten Spieler der WM 2026?",
      answer: "Die teuersten Spieler nach Marktwert bei der WM 2026 sind: Kylian Mbappé (Frankreich, ~180 Mio. €), Erling Haaland (Norwegen, ~175 Mio. €), Vinícius Júnior (Brasilien, ~150 Mio. €), Jude Bellingham (England, ~150 Mio. €) und Jamal Musiala (Deutschland, ~130 Mio. €). Diese Bewertungen spiegeln Alter, Talent, aktuelle Leistung und kommerzielles Potenzial wider. Mbappé bleibt der wertvollste Spieler der Welt."
    },
    {
      question: "Wie alt sind die Spieler der WM 2026?",
      answer: "Das Durchschnittsalter der WM-Spieler liegt in der Regel bei 27-28 Jahren, dem Höhepunkt der physischen und technischen Leistungsfähigkeit. Die jüngsten Spieler sind 18-19 Jahre alt (wie Lamine Yamal, Spanien), während die erfahrensten bis zu 37-40 Jahre alt sein können (wie Cristiano Ronaldo, falls er sich qualifiziert). Die FIFA setzt keine Altersgrenze für die WM der Herren, im Gegensatz zu den Olympischen Spielen mit der U23-Regel."
    },
    {
      question: "Wie viele Auswechslungen sind bei der WM erlaubt?",
      answer: "Bei der WM 2026 sind 5 Auswechslungen erlaubt, in maximal 3 Auswechselfenstern (Halbzeit nicht mitgezählt). Diese Regel, die während COVID-19 eingeführt wurde, wurde von der FIFA beibehalten, um die Gesundheit der Spieler zu schützen und mehr Rotation zu ermöglichen. Bei einer Verlängerung ist eine zusätzliche 6. Auswechslung erlaubt. Torhüter können auch bei Verletzung ausgewechselt werden, selbst wenn alle 5 Wechsel bereits vorgenommen wurden."
    }
  ];

  const positionLabels: Record<string, string> = {
    GK: "Torhüter",
    DF: "Verteidiger",
    MF: "Mittelfeldspieler",
    FW: "Stürmer",
  };
  const positions = ["FW", "MF", "DF", "GK"] as const;

  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Kaders</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Schlüsselspieler der WM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {players.length} Schlüsselspieler der 48 Mannschaften. Stürmer, Mittelfeldspieler, Verteidiger und Torhüter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Verzeichnis */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nach Mannschaft durchsuchen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {teams.filter(t => players.some(p => p.teamId === t.id)).map((t) => (
              <Link key={t.slug} href={`/spieler-liste/mannschaft/${t.slug}`} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm font-medium text-gray-900">
                <span>{t.flag}</span> {t.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Top Scorers */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Beste Torschützen in der Nationalmannschaft</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Spieler</th>
                  <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
                  <th className="pb-3 font-medium text-gray-500">Club</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Tore</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Eins.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...players]
                  .sort((a, b) => b.goals - a.goals)
                  .slice(0, 20)
                  .map((player) => {
                    const team = teamsById[player.teamId];
                    return (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <Link href={`/spieler/${player.slug}`} className="font-medium hover:text-primary">
                            {player.name}
                          </Link>
                        </td>
                        <td className="py-3">
                          {team && (
                            <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-1 hover:text-primary">
                              <span role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                              <span className="text-gray-600">{team.name}</span>
                            </Link>
                          )}
                        </td>
                        <td className="py-3 text-gray-500">{player.club}</td>
                        <td className="py-3 text-right font-bold text-primary">{player.goals}</td>
                        <td className="py-3 text-right text-gray-500">{player.caps}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* By Position */}
        {positions.map((pos) => {
          const posPlayers = players
            .filter((p) => p.position === pos)
            .sort((a, b) => b.goals - a.goals || b.caps - a.caps);
          return (
            <section key={pos} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{positionLabels[pos]} ({posPlayers.length})</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {posPlayers.map((player) => {
                  const team = teamsById[player.teamId];
                  return (
                    <Link
                      key={player.id}
                      href={`/spieler/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          <span role="img" aria-label={`Flagge von ${team?.name ?? "Unbekannt"}`}>{team?.flag}</span> {team?.name} &middot; {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{player.goals} Tore</p>
                        <p className="text-xs text-gray-500">{player.caps} Eins.</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/torschuetzen", title: "Beste Torschützen", description: "Torschützenliste der WM 2026", icon: "" },
          { href: "/comparateur-Spielers", title: "Spielervergleich", description: "Vergleichen Sie die Statistiken von 2 Spielern", icon: "" },
          { href: "/mannschaft", title: "Die 48 Mannschaften", description: "Vollständige Kader pro Nationalmannschaft", icon: "" },
          { href: "/fifa-ranking", title: "FIFA-Rangliste", description: "Weltrangliste der Mannschaften", icon: "" },
        ]} />
      </div>

      <FAQSection title="Fragen zu den Spielern der WM 2026" items={faqItems} />
    </>
  );
}
