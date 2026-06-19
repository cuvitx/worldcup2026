import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Scale, ArrowRight, Info, CheckCircle, XCircle, MinusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Asian Handicap WM 2026 — Kompletter Ratgeber mit Beispielen",
  description:
    "Kompletter Ratgeber zum Asian Handicap für die WM 2026. Erklärung +0.5, -1.5, wann man es nutzt, konkrete Beispiele mit Berechnungen.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/handicap" },
  openGraph: {
    title: "Asian Handicap WM 2026 — Kompletter Ratgeber",
    description: "Meistern Sie das Asian Handicap für Ihre WM-2026-Wetten. Konkrete Beispiele.",
    url: "https://www.wm2026guide.de/sportwetten/handicap",
  },
};

interface Example {
  match: string;
  handicap: string;
  bet: string;
  result: string;
  outcome: "won" | "lost" | "push";
  explanation: string;
}

const examples: Example[] = [
  {
    match: "France vs Australie",
    handicap: "France -1.5",
    bet: "Quote 2,10",
    result: "Frankreich 3:1",
    outcome: "won",
    explanation: "Frankreich gewinnt mit 2 Toren Unterschied. Mit Handicap -1.5 ist der angepasste Spielstand 1.5:1. Wette gewonnen, da 1.5 > 1.",
  },
  {
    match: "Argentinien vs Saudi-Arabien",
    handicap: "Argentinien -1.5",
    bet: "Quote 1,85",
    result: "Argentinien 1:2",
    outcome: "lost",
    explanation: "Argentinien verliert! Angepasster Spielstand: -0.5:2. Wette deutlich verloren. Das Handicap verstärkt den Verlust.",
  },
  {
    match: "Brasilien vs Schweiz",
    handicap: "Brasilien -0.5",
    bet: "Quote 1,70",
    result: "Brasilien 1:0",
    outcome: "won",
    explanation: "Brasilien gewinnt mit 1 Tor. Angepasster Spielstand: 0.5:0. Das Handicap -0.5 eliminiert das Unentschieden — Sieg = Wette gewonnen.",
  },
  {
    match: "Spanien vs Japan",
    handicap: "Japan +1.5",
    bet: "Quote 1,55",
    result: "Spanien 1:0",
    outcome: "won",
    explanation: "Japan verliert mit 1 Tor. Mit +1.5 ist der angepasste Spielstand 0+1.5=1.5 vs 1. Japan 'gewinnt' mit dem Handicap.",
  },
  {
    match: "Deutschland vs Mexiko",
    handicap: "Deutschland -1.0",
    bet: "Quote 2,00",
    result: "Deutschland 1:0",
    outcome: "push",
    explanation: "Deutschland gewinnt mit genau 1 Tor. Mit -1.0 ist der angepasste Spielstand 0:0. Erstattung (Push).",
  },
];

const handicapTypes = [
  { value: "0", desc: "Eliminiert das Unentschieden. Bei Unentschieden → Erstattung (Push)." },
  { value: "-0.5", desc: "Eliminiert das Unentschieden. Die Mannschaft muss gewinnen, damit die Wette zählt." },
  { value: "-1.0", desc: "Die Mannschaft muss mit 2+ Toren gewinnen. Bei Sieg mit 1 Tor → Push." },
  { value: "-1.5", desc: "Die Mannschaft muss mit 2+ Toren gewinnen. Kein Push möglich." },
  { value: "-2.0", desc: "Die Mannschaft muss mit 3+ Toren gewinnen. Bei Sieg mit 2 Toren → Push." },
  { value: "+0.5", desc: "Die Mannschaft darf nicht verlieren. Unentschieden oder Sieg = Wette gewonnen." },
  { value: "+1.0", desc: "Die Mannschaft darf mit 1 Tor verlieren (Push) oder weniger." },
  { value: "+1.5", desc: "Die Mannschaft darf mit 1 Tor verlieren und die Wette ist gewonnen." },
];

export default function ParisHandicapPage() {
  const faqItems = [
    {
      question: "Was ist der Unterschied zwischen Asian Handicap und Europäischem Handicap?",
      answer: "Das Asian Handicap verwendet halbe Tore (0.5, 1.5) und bietet Erstattungen (Push) bei ganzzahligen Handicaps. Das Europäische Handicap schließt das Unentschieden als mögliches Ergebnis ein, was 3 statt 2 Ausgänge ergibt. Das Asiatische ist besser für Wetten mit 2 Ausgängen geeignet.",
    },
    {
      question: "Wann sollte man Handicap -0.5 verwenden?",
      answer: "Das Handicap -0.5 ist ideal, wenn Sie denken, dass eine Mannschaft gewinnt, aber die 1X2-Quote zu niedrig ist. Es eliminiert das Unentschieden: Sieg = gewonnen, Unentschieden oder Niederlage = verloren. Es entspricht einer klassischen 'Sieg'-Wette, aber oft mit besseren Quoten.",
    },
    {
      question: "Ist das Asian Handicap bei der WM 2026 profitabel?",
      answer: "Das Asian Handicap ist bei der WM besonders interessant, da die Leistungsunterschiede zwischen den 48 Mannschaften groß sind. Ein Favorit mit -1.5 bei 2,10 bietet oft mehr Value als ein einfacher Sieg bei 1,25.",
    },
  ];

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten-Ratgeber
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Asian Handicap WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Der komplette Ratgeber zum Asian Handicap: +0.5, -1.5, Push, konkrete Beispiele
            und wann man es während der WM 2026 einsetzt.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Tableau des handicaps */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Die verschiedenen Handicaps</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Handicap</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Bedeutung</th>
                </tr>
              </thead>
              <tbody>
                {handicapTypes.map((h, i) => (
                  <tr key={h.value} className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}>
                    <td className="py-3 px-4 font-mono font-bold text-accent">{h.value}</td>
                    <td className="py-3 px-4">{h.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exemples concrets */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Konkrete Beispiele</h2>
          </div>
          <div className="space-y-4">
            {examples.map((ex) => {
              const Icon = ex.outcome === "won" ? CheckCircle : ex.outcome === "lost" ? XCircle : MinusCircle;
              const color = ex.outcome === "won" ? "text-green-600" : ex.outcome === "lost" ? "text-red-600" : "text-yellow-600";
              const bg = ex.outcome === "won" ? "border-green-200" : ex.outcome === "lost" ? "border-red-200" : "border-yellow-200";
              return (
                <div key={ex.match} className={`rounded-xl border ${bg} p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">{ex.match}</span>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs mb-2">
                    <span className="bg-primary/10 px-2 py-1 rounded font-mono">{ex.handicap}</span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded">{ex.bet}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Ergebnis : {ex.result}</span>
                    <span className={`font-bold ${color} uppercase`}>
                      {ex.outcome === "won" ? "Gewonnen" : ex.outcome === "lost" ? "Verloren" : "Erstattet"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{ex.explanation}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="text-center">
          <Link href="/sportwetten/cashout" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Cashout-Ratgeber <ArrowRight className="h-4 w-4" />
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
