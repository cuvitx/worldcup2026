import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Clock, ArrowRight, AlertTriangle, BarChart3, Target, Zap, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Halbzeit-/Endstand-Wetten WM 2026 — Kompletter HT/FT-Ratgeber",
  description:
    "Kompletter Ratgeber zu Halbzeit-/Endstand-Wetten (HT/FT) für die WM 2026: Erklärung, Statistiken, typische Quoten, Strategien und beste Spiele für diesen Markt.",
  openGraph: {
    title: "Halbzeit-/Endstand-Wetten WM 2026",
    description: "Meistern Sie den HT/FT-Markt: WM-Statistiken, Quoten und Strategien.",
    url: "https://www.wm2026guide.de/sportwetten/halbzeit",
  },
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/halbzeit" },
};

const resultatsHtFt = [
  { combo: "1/1", description: "Mannschaft A führt zur HZ und gewinnt", frequence: "~28%", coteType: "1.80 – 2.50" },
  { combo: "X/1", description: "Unentschieden zur HZ, Mannschaft A gewinnt", frequence: "~14%", coteType: "3.50 – 5.00" },
  { combo: "2/1", description: "Mannschaft B führt zur HZ, A gewinnt (Aufholjagd)", frequence: "~3%", coteType: "12.00 – 25.00" },
  { combo: "1/X", description: "Mannschaft A führt zur HZ, Unentschieden am Ende", frequence: "~6%", coteType: "6.00 – 10.00" },
  { combo: "X/X", description: "Unentschieden zur HZ und am Ende", frequence: "~12%", coteType: "4.00 – 5.50" },
  { combo: "2/X", description: "Mannschaft B führt zur HZ, Unentschieden am Ende", frequence: "~5%", coteType: "8.00 – 14.00" },
  { combo: "1/2", description: "Mannschaft A führt zur HZ, B gewinnt (Aufholjagd)", frequence: "~3%", coteType: "12.00 – 25.00" },
  { combo: "X/2", description: "Unentschieden zur HZ, Mannschaft B gewinnt", frequence: "~13%", coteType: "3.80 – 5.50" },
  { combo: "2/2", description: "Mannschaft B führt zur HZ und gewinnt", frequence: "~16%", coteType: "2.50 – 4.00" },
];

const statsCDM = [
  { stat: "Spiele mit Toränderung in der 2. HZ", valeur: "~42%", detail: "Fast jedes 2. Spiel sieht nach der Pause eine Veränderung im Spielstand" },
  { stat: "Spiele mit 0:0 zur Halbzeit", valeur: "~38%", detail: "Die Mannschaften tasten sich in der 1. HZ der WM ab, besonders in der Gruppenphase" },
  { stat: "Aufholjagden (Rückstand HZ → Sieg)", valeur: "~6%", detail: "Selten, aber sehr lukrativ in Bezug auf Quoten" },
  { stat: "Tore in der 2. Halbzeit", valeur: "~56%", detail: "Die Mehrheit der Tore fällt nach der Pause (Ermüdung, Taktik, Druck)" },
  { stat: "Spiele mit anderem Ergebnis HZ vs. Ende", valeur: "~35%", detail: "Ein Drittel der Spiele ändert sich in der 2. Halbzeit grundlegend" },
];

const strategies = [
  {
    titre: "X/1 oder X/2 (Unentschieden zur HZ, Sieg am Ende)",
    description: "WM-Spiele beginnen oft vorsichtig. Suchen Sie große Favoriten, die dominieren, aber Zeit zum Toreschießen brauchen: Frankreich, Brasilien, Deutschland in der Gruppenphase gegen 'Kleine', die gut verteidigen.",
    coteType: "3.50 – 5.00",
    risque: "Mittel",
  },
  {
    titre: "1/1 bei großen Favoriten",
    description: "Mannschaften, die früh in Führung gehen (vor der 30. Minute), gewinnen bei der WM in 85 % der Fälle. Identifizieren Sie Favoriten, die schnell treffen: Daten mit der Statistik zum Zeitpunkt des 1. Tores abgleichen.",
    coteType: "1.80 – 2.50",
    risque: "Gering",
  },
  {
    titre: "Aufholjagd (2/1 oder 1/2) bei Derbys",
    description: "Historische Begegnungen (Argentinien-Brasilien, Frankreich-Deutschland) bringen mehr Wendungen hervor. Sehr hohe Quoten, mit kleinem Einsatz spielen.",
    coteType: "12.00 – 25.00",
    risque: "Sehr hoch",
  },
  {
    titre: "X/X in der Gruppenphase",
    description: "Unentschieden sind häufig am 1. Spieltag (Mannschaften wollen nicht verlieren) und am 3. Spieltag (bedeutungslose Spiele oder abgesprochene Ergebnisse). Quote ~4,50 für eine gute Rendite.",
    coteType: "4.00 – 5.50",
    risque: "Mittel",
  },
];

const faqItems = [
  {
    question: "Was ist eine Halbzeit-/Endstand-Wette (HT/FT)?",
    answer:
      "Es ist eine Wette auf das Ergebnis zur Halbzeit UND das Endergebnis des Spiels. Es gibt 9 mögliche Kombinationen (1/1, X/1, 2/1, 1/X, X/X, 2/X, 1/2, X/2, 2/2). Die Quoten sind höher als bei einer einfachen 1X2-Wette, da zwei Ergebnisse vorhergesagt werden müssen.",
  },
  {
    question: "Was ist die beste HT/FT-Wette bei der WM?",
    answer:
      "X/1 (Unentschieden zur Halbzeit, Favorit gewinnt) bietet das beste Wert-/Wahrscheinlichkeitsverhältnis bei der WM. Etwa 14 % der Spiele enden so, mit Quoten von 3,50-5,00. Favoriten treffen oft in der 2. Halbzeit, wenn der Gegner ermüdet.",
  },
  {
    question: "Sind Aufholjagden bei der WM häufig?",
    answer:
      "Nein, nur ~6 % der Spiele sehen die zur Halbzeit zurückliegende Mannschaft am Ende gewinnen. Es ist selten, aber unvergesslich (Deutschland-Schweden 2018: 0:1 HZ → 2:1 Ende). Die Quoten von 12-25 spiegeln diese geringe Wahrscheinlichkeit wider.",
  },
  {
    question: "Sollte man HT/FT live wetten?",
    answer:
      "Nein, die HT/FT-Wette wird vor dem Spiel platziert. Live passen sich die Quoten in Echtzeit an und verlieren ihren Wert. Der Reiz von HT/FT liegt gerade darin, das Spielszenario mit attraktiven Pre-Match-Quoten vorherzusagen.",
  },
];

export default function ParisMiTempsPage() {
return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Halbzeit-/Endstand-Wetten WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Meistern Sie den HT/FT-Markt: 9 Kombinationen, WM-Statistiken, typische Quoten und Strategien,
            um von Wendungen zu profitieren.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Explication */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Clock className="h-7 w-7 text-accent" /> Wie funktioniert es?
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 prose max-w-none">
            <p>
              Die <strong>Halbzeit-/Endstand-Wette (HT/FT)</strong> besteht darin, das Ergebnis
              zur Pause UND das Endergebnis vorherzusagen. Es gibt <strong>9 mögliche Kombinationen</strong> (3 Ergebnisse
              zur HZ × 3 Ergebnisse am Ende). Die Quoten sind höher als bei einer einfachen 1X2-Wette,
              da die doppelte Vorhersage schwieriger ist.
            </p>
            <p>
              <strong>Notation:</strong> 1 = Sieg Heimmannschaft / Favorit, X = Unentschieden, 2 = Sieg
              Auswärtsmannschaft / Außenseiter. Beispiel: <strong>X/1</strong> = Unentschieden zur Halbzeit, Sieg des Favoriten
              am Ende.
            </p>
          </div>
        </section>

        {/* Tableau des 9 combinaisons */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Die 9 HT/FT-Kombinationen
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900">HT/FT</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Beschreibung</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Häufigkeit WM</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Typische Quote</th>
                </tr>
              </thead>
              <tbody>
                {resultatsHtFt.map((r) => (
                  <tr key={r.combo} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-bold text-accent">{r.combo}</td>
                    <td className="py-3 px-4 text-gray-700">{r.description}</td>
                    <td className="py-3 px-4 text-gray-600">{r.frequence}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{r.coteType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stats CDM */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> WM-Statistiken
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statsCDM.map((s) => (
              <div key={s.stat} className="rounded-xl border border-gray-200 bg-white p-5 text-center">
                <p className="text-2xl font-extrabold text-accent">{s.valeur}</p>
                <p className="font-semibold text-gray-900 text-sm mt-1">{s.stat}</p>
                <p className="text-xs text-gray-500 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stratégies */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Target className="h-7 w-7 text-accent" /> HT/FT-Strategien für die WM 2026
          </h2>
          <div className="space-y-4">
            {strategies.map((s) => (
              <div key={s.titre} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{s.titre}</h3>
                <p className="text-sm text-gray-700 mt-1">{s.description}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-accent font-semibold">Quote: {s.coteType}</span>
                  <span className="text-gray-500">Risiko: {s.risque}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/sportwetten/kombiwetten"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Kombiwetten WM <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sportwetten/corners"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Ecken-Wetten
          </Link>
          <Link
            href="/quotenvergleich"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-xl py-3.5 px-6 font-semibold hover:bg-gray-50 transition-colors"
          >
            Quotenvergleich
          </Link>
        </div>

        {/* ANJ */}
        <p className="text-xs text-gray-400 text-center">
          <AlertTriangle className="inline h-3 w-3 mr-1" />
          Sportwetten bergen Risiken. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf{" "}
          <a href="https://www.bzga.de" target="_blank" rel="noopener noreferrer" className="underline">
            bzga.de
          </a>{" "}
          (BZgA).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
