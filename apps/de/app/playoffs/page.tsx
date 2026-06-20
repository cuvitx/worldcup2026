import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, MapPin, ArrowRight, Globe, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Playoffs WM 2026 — Interkontinentale Spiele, Termine, Mannschaften",
  description:
    "Alles über die Playoffs der WM 2026: interkontinentales Format, 6 verbleibende Plätze, teilnehmende Mannschaften, Termine (März 2026), Bedeutung und Prognosen.",
  alternates: { canonical: "https://www.wm2026guide.de/playoffs" },
  openGraph: {
    title: "Playoffs WM 2026 — Die letzten 6 Plätze",
    description:
      "Interkontinentales Format, Spielplan und Bedeutung der Playoff-Spiele für die WM 2026.",
    url: "https://www.wm2026guide.de/playoffs",
  },
};

const playoffSpiele = [
  {
    id: 1,
    team1: "4. AFC (Indonesien)",
    team2: "5. CAF (noch offen)",
    conf1: "Asien",
    conf2: "Afrika",
    date: "März 2026",
    venue: "Noch offen",
    place: "1 Platz",
  },
  {
    id: 2,
    team1: "5. CONMEBOL (noch offen)",
    team2: "5. AFC (noch offen)",
    conf1: "Südamerika",
    conf2: "Asien",
    date: "März 2026",
    venue: "Noch offen",
    place: "1 Platz",
  },
  {
    id: 3,
    team1: "6. CONCACAF (noch offen)",
    team2: "1. OFC (Neuseeland)",
    conf1: "Nordamerika",
    conf2: "Ozeanien",
    date: "März 2026",
    venue: "Noch offen",
    place: "1 Platz",
  },
  {
    id: 4,
    team1: "Sieger Playoff 1",
    team2: "Sieger Playoff 2",
    conf1: "Interkontinental",
    conf2: "Interkontinental",
    date: "März 2026",
    venue: "Noch offen",
    place: "1 Platz (Endrunde)",
  },
];

const plätzeProKonföderation = [
  { conf: "UEFA (Europa)", places: 16, direktePlätze: 16, playoffs: 0 },
  { conf: "CAF (Afrika)", places: "9 (+1)", direktePlätze: 9, playoffs: 1 },
  { conf: "AFC (Asien)", places: "8 (+2)", direktePlätze: 8, playoffs: 2 },
  { conf: "CONMEBOL (Südamerika)", places: "6 (+1)", direktePlätze: 6, playoffs: 1 },
  { conf: "CONCACAF (Nordamerika)", places: "6 (+1)", direktePlätze: 6, playoffs: 1 },
  { conf: "OFC (Ozeanien)", places: "1 (+1)", direktePlätze: 1, playoffs: 1 },
];

export default function PlayoffsPage() {
  const faqItems = [
    {
      question: "Wie viele Plätze werden über die Playoffs der WM 2026 vergeben?",
      answer:
        "6 Plätze stehen bei den interkontinentalen Playoffs im März 2026 auf dem Spiel. Diese Spiele stellen Mannschaften verschiedener Konföderationen gegeneinander um die letzten Tickets zur WM mit 48 Mannschaften.",
    },
    {
      question: "Welches Format haben die interkontinentalen Playoffs 2026?",
      answer:
        "Die Playoffs werden als Hin- und Rückspiele oder als zentralisiertes Turnier ausgetragen (Format wird von der FIFA bestätigt). Mannschaften aus verschiedenen Konföderationen treten gegeneinander an, um die letzten 6 Qualifikationsplätze zu sichern.",
    },
    {
      question: "Wann finden die Playoffs der WM 2026 statt?",
      answer:
        "Die interkontinentalen Playoffs sind für März 2026 geplant, etwa 3 Monate vor dem Turnierstart am 11. Juni 2026.",
    },
    {
      question: "Welche Mannschaften nehmen an den Playoffs teil?",
      answer:
        "Die teilnehmenden Mannschaften werden durch die Qualifikationswettbewerbe jeder Konföderation bestimmt. In der Regel sind es die Letztplatzierten jeder Zone: 4. und 5. aus Asien, 5. aus Afrika, 5. aus Südamerika, 6. der CONCACAF und der Sieger der OFC.",
    },
  ];

  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Qualifikation WM 2026
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Playoffs WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            6 verbleibende Plätze, spannende interkontinentale Spiele und WM-Träume
            auf dem Spiel. Alles über die Playoffs im März 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "6", label: "Plätze im Spiel" },
              { val: "4", label: "Spiele" },
              { val: "März", label: "2026" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-4xl font-black text-accent">{s.val}</span>
                <span className="text-xs uppercase tracking-wider text-gray-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Platzverteilung */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Verteilung der 48 Plätze nach Konföderation
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Konföderation</th>
                  <th className="py-3 px-4 text-center">Direkte Plätze</th>
                  <th className="py-3 px-4 text-center">Über Playoffs</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                {plätzeProKonföderation.map((c, i) => (
                  <tr
                    key={c.conf}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}
                  >
                    <td className="py-3 px-4 font-medium">{c.conf}</td>
                    <td className="py-3 px-4 text-center">{c.direktePlätze}</td>
                    <td className="py-3 px-4 text-center">{c.playoffs}</td>
                    <td className="py-3 px-4 text-center font-bold">{c.places}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Playoff-Spiele */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Swords className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Interkontinentale Playoff-Spiele
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {playoffSpiele.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Playoff {m.id}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                    {m.place}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span>{m.team1}</span>
                  <span className="text-gray-400 text-xs">VS</span>
                  <span className="text-right">{m.team2}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {m.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {m.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              Die Qualifikation ist abgeschlossen. Alle 48 Mannschaften stehen fest.
            </p>
          </div>
        </section>

        {/* Bedeutung */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Swords className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Bedeutung und Kontext
            </h2>
          </div>
          <div className="prose max-w-none">
            <p>
              Die interkontinentalen Playoffs stellen die letzte Chance für 6 Mannschaften dar,
              an der WM 2026 teilzunehmen. Mit der Erweiterung auf 48 Mannschaften hat sich die Anzahl der
              Playoff-Plätze erhöht, was den historisch weniger vertretenen Konföderationen
              mehr Möglichkeiten bietet.
            </p>
            <p>
              Das interkontinentale Format macht diese Spiele besonders unberechenbar: Die
              sehr unterschiedlichen Spielstile zwischen den Konföderationen schaffen einzigartige und oft
              spektakuläre Begegnungen. Für einige Nationen geht es um eine mögliche erste
              WM-Teilnahme überhaupt.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/mannschaft"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Alle 48 qualifizierten Mannschaften ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
