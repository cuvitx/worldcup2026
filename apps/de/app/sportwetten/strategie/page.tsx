import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Target, ArrowRight, TrendingUp, AlertTriangle, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Wettstrategie Gruppenphase WM 2026 — 48 Mannschaften, 12 Gruppen",
  description:
    "Wie wettet man auf die Gruppenphase der WM 2026 mit 48 Mannschaften: 12 Gruppen, beste Drittplatzierte, Spiele am 3. Spieltag, neue Dynamiken und Strategien.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/strategie" },
  openGraph: {
    title: "Wettstrategie — Gruppenphase WM 2026",
    description: "Nutzen Sie das neue 48-Mannschaften-Format für Ihre Wetten: 12 Gruppen, beste Drittplatzierte, bedeutungslose Spiele.",
    url: "https://www.wm2026guide.de/sportwetten/strategie",
  },
};

const strategies = [
  {
    icon: Users,
    title: "12 Gruppen = plus d'opportunités",
    content: "Mit 12 statt 8 Gruppen explodiert das Volumen der Gruppenspiele (36 → 48 Spiele). Mehr Spiele = mehr Value zu finden, besonders in Gruppen mit weniger bekannten Mannschaften, wo die Wettanbieter weniger Daten haben.",
  },
  {
    icon: TrendingUp,
    title: "Die besten Dritten: Der Schlüssel",
    content: "Nur 8 der 12 Drittplatzierten qualifizieren sich. Das schafft permanente Unsicherheit: Eine drittplatzierte Mannschaft mit +1 Tordifferenz kann sich qualifizieren, eine andere mit 0 nicht. Die Live-Quoten bewegen sich enorm beim 3. Gruppenspiel — dort liegt der Value.",
  },
  {
    icon: AlertTriangle,
    title: "Achtung bei 'bedeutungslosen' Spielen am 3. Spieltag",
    content: "Wenn zwei Mannschaften bereits vor dem 3. Spiel qualifiziert sind, kann das Spiel 'bedeutungslos' werden. Die Trainer rotieren, die Motivation sinkt. Wetten auf niedrige Ergebnisse (Under 2.5) oder Unentschieden in solchen Konstellationen. Aber Achtung: Manchmal ist der 1. Platz entscheidend für den Turnierplan.",
  },
  {
    icon: Lightbulb,
    title: "Die 'kleinen' Mannschaften am 1. Spieltag",
    content: "Historisch überperformen 'kleine' Mannschaften bei ihrem ersten WM-Spiel (Euphorie-Effekt, maximale Motivation, ultra-defensive Taktik). Suchen Sie nach Asian Handicaps und Unders bei diesen Spielen am 1. Spieltag.",
  },
  {
    icon: Target,
    title: "Live-Wetten am 3. Spieltag",
    content: "Der 3. Spieltag jeder Gruppe ist ein ideales Spielfeld für Live-Wetten. Die Szenarien ändern sich in Echtzeit je nach den Ergebnissen des parallelen Spiels. Beobachten Sie Situationen, in denen eine Mannschaft während des Spiels erfährt, dass sie ausgeschieden ist — der Zusammenbruch ist häufig.",
  },
];

export default function StrategieParisGruppenPage() {
  const faqItems = [
    {
      question: "Verändert das 48-Mannschaften-Format wirklich die Wetten?",
      answer: "Ja, grundlegend. Mehr Gruppen bedeutet mehr Spiele, mehr gruppenübergreifende Szenarien (beste Drittplatzierte) und Wettanbieter, die bei kleinen Auswahlen weniger erfahren sind. Value ist leichter zu finden als bei 32 Mannschaften.",
    },
    {
      question: "Sollte man in der Gruppenphase auf Favoriten wetten?",
      answer: "Favoriten gewinnen oft, aber zu niedrigen Quoten (1,20-1,40). Der Value liegt bei Handicaps, Over/Under und exakten Märkten. Brasilien -1.5 mit 2,10 ist oft interessanter als ein Brasilien-Sieg mit 1,25.",
    },
    {
      question: "Wie erkennt man ein 'bedeutungsloses' Spiel?",
      answer: "Analysieren Sie die Qualifikationsszenarien vor dem 3. Spieltag: Wenn beide Mannschaften unabhängig von den Ergebnissen qualifiziert sind, wird das Spiel wahrscheinlich wenig intensiv sein. Prüfen Sie auch die Bedeutung des 1. Platzes für den K.-o.-Rundenplan.",
    },
  ];

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten-Strategie
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Wetten auf die Gruppenphase WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            48 Mannschaften, 12 Gruppen, neue Dynamiken: So nutzen Sie das neuartige Format
            der WM 2026 für Ihre Sportwetten.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <div className="space-y-6">
          {strategies.map((s) => (
            <div key={s.title} className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/sportwetten/handicap" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Asian-Handicap-Ratgeber <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Sportwetten bergen Risiken. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf bzga.de (BZgA).
        </p>
      </div>
    </>
  );
}
