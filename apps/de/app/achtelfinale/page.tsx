import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, ArrowRight, Info, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Sechzehntelfinale WM 2026 - Spielplan & Termine | WM 2026",
  description:
    "Sechzehntelfinale der WM 2026: Format, Termine vom 28. Juni bis 2. Juli, Spielübersicht und neues Bracket mit 48 Mannschaften.",
  openGraph: {
    title: "Sechzehntelfinale WM 2026 - Vollständige Übersicht",
    description:
      "Entdecken Sie das Format des Sechzehntelfinales der WM 2026. Termine, mögliche Spiele und Bracket.",
    url: "https://www.wm2026guide.de/16emes-de-finale",
  },
  alternates: {
    canonical: "https://www.wm2026guide.de/16emes-de-finale",
  },
};

const faqItems = [
  {
    question: "Wie viele Spiele gibt es im Sechzehntelfinale der WM 2026?",
    answer:
      "Es gibt 16 Spiele im Sechzehntelfinale (Runde der 32). Dies ist eine neue Runde in der WM-Geschichte, die durch die Erweiterung auf 48 Mannschaften notwendig wurde. Die 32 qualifizierten Mannschaften treten in K.-o.-Spielen gegeneinander an.",
  },
  {
    question: "Wie werden die Sechzehntelfinale-Paarungen bestimmt?",
    answer:
      "Die Erst- und Zweitplatzierten jeder Gruppe (24 Mannschaften) sowie die 8 besten Gruppendritten qualifizieren sich. Das Bracket wird von der FIFA vorgegeben: Gruppensieger treffen auf die besten Dritten oder Zweite einer anderen Gruppe gemäß einer Kreuzungstabelle.",
  },
  {
    question: "Wann findet das Sechzehntelfinale der WM 2026 statt?",
    answer:
      "Das Sechzehntelfinale findet vom 28. Juni bis 2. Juli 2026 statt, direkt nach Ende der Gruppenphase. Die 16 Spiele werden auf 5 Tage verteilt.",
  },
  {
    question: "Gibt es Verlängerung im Sechzehntelfinale?",
    answer:
      "Ja. Ab dem Sechzehntelfinale gibt es bei Gleichstand nach der regulären Spielzeit (90 Minuten) eine Verlängerung von 30 Minuten (2 × 15 Min.). Steht es dann immer noch unentschieden, entscheidet ein Elfmeterschießen.",
  },
];

export default function SeiziemesDeFinale() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Swords className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              K.-o.-Phase
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Sechzehntelfinale</span> WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Runde der 32 — Eine neue Runde bei der ersten WM mit 48 Mannschaften.
            Vom 28. Juni bis 2. Juli 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "16", label: "Spiele" },
              { val: "32", label: "Mannschaften" },
              { val: "5", label: "Tage" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-accent">{s.val}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Format */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Wie funktioniert es?
            </h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Mit 48 Mannschaften in 12 Gruppen zu je 4 qualifizieren sich in der Gruppenphase
              <strong> 32 Mannschaften</strong> für das Sechzehntelfinale: die 12 Gruppensieger, die 12 Zweiten
              und die 8 besten Gruppendritten.
            </p>
            <p>
              Diese Runde, die es bei den bisherigen Weltmeisterschaften mit 32 Mannschaften nicht gab,
              ist die erste K.-o.-Runde. Sie wird in Einzelspielen mit Verlängerung
              und Elfmeterschießen bei Bedarf ausgetragen.
            </p>
            <p>
              Das Bracket wird von der FIFA vorab festgelegt. Gruppensieger haben einen
              günstigeren Weg, da sie auf qualifizierte Gruppendritte treffen, während
              die Zweiten gemäß dem offiziellen Spielschema auf andere Zweite oder Erste
              treffen.
            </p>
          </div>
        </section>

        {/* Termine */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Voraussichtlicher Spielplan
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Datum</th>
                  <th className="px-4 py-3 text-left">Spiele</th>
                  <th className="px-4 py-3 text-left">Anstoßzeiten (Ortszeit)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { date: "28. Juni 2026", matchs: "Spiele 1-4", heures: "13:00 / 16:00 / 19:00 / 22:00" },
                  { date: "29. Juni 2026", matchs: "Spiele 5-8", heures: "13:00 / 16:00 / 19:00 / 22:00" },
                  { date: "30. Juni 2026", matchs: "Spiele 9-12", heures: "13:00 / 16:00 / 19:00 / 22:00" },
                  { date: "1. Juli 2026", matchs: "Spiele 13-14", heures: "19:00 / 22:00" },
                  { date: "2. Juli 2026", matchs: "Spiele 15-16", heures: "19:00 / 22:00" },
                ].map((r) => (
                  <tr key={r.date} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.date}</td>
                    <td className="px-4 py-3 text-gray-600">{r.matchs}</td>
                    <td className="px-4 py-3 text-gray-600">{r.heures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bracket */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">
              Spielübersicht
            </h2>
          </div>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Swords className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Spielplan folgt
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Die vollständige Übersicht des Sechzehntelfinales wird nach der Auslosung
              bekannt gegeben und nach Abschluss der Gruppenphase bestätigt.
            </p>
            <Link
              href="/turnierbaum"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
            >
              Bracket simulieren
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
