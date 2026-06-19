import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, Calendar, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Halbfinale WM 2026 - Termine, Stadien & Analyse | WM 2026",
  description:
    "Halbfinale WM 2026: am 13. und 14. Juli 2026. Voraussichtliche Stadien, Format, Analyse und Prognosen für die letzten Vier.",
  openGraph: {
    title: "Halbfinale WM 2026",
    description: "Das Halbfinale der WM 2026: Termine, Stadien und Analyse.",
    url: "https://www.wm2026guide.de/demi-finales",
  },
  alternates: { canonical: "https://www.wm2026guide.de/demi-finales" },
};

const faqItems = [
  {
    question: "Wann findet das Halbfinale der WM 2026 statt?",
    answer: "Das Halbfinale ist für den 13. und 14. Juli 2026 geplant, ein Spiel pro Tag.",
  },
  {
    question: "In welchen Stadien wird das Halbfinale ausgetragen?",
    answer: "Die Halbfinal-Stadien gehören zu den größten Spielstätten des Turniers. Das AT&T Stadium (Dallas, 80.000 Plätze) und das MetLife Stadium (New York, 82.500 Plätze) sind vorgesehen.",
  },
  {
    question: "Gibt es 2026 ein Spiel um Platz 3?",
    answer: "Ja, die FIFA behält das Spiel um Platz 3 (kleines Finale) bei. Es findet am 18. Juli 2026 statt, einen Tag vor dem großen Finale, zwischen den beiden Halbfinal-Verlierern.",
  },
];

const stades = [
  {
    nom: "AT&T Stadium",
    ville: "Dallas / Arlington, Texas",
    capacite: "80.000",
    detail: "Einziehbares Dach, berühmter Riesenbildschirm",
  },
  {
    nom: "MetLife Stadium",
    ville: "East Rutherford, New Jersey (New York)",
    capacite: "82.500",
    detail: "Finalstadion, Open-Air",
  },
];

export default function DemiFinales() {
  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Die letzten Vier
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Halbfinale</span> WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Die 4 besten Mannschaften der Welt. 13. und 14. Juli 2026.
            Zwei Spiele um den Einzug ins Finale.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "2", label: "Spiele" },
              { val: "4", label: "Mannschaften" },
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
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Spielplan</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Datum</th>
                  <th className="px-4 py-3 text-left">Spiel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">13. Juli 2026</td>
                  <td className="px-4 py-3 text-gray-600">Halbfinale 1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">14. Juli 2026</td>
                  <td className="px-4 py-3 text-gray-600">Halbfinale 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Voraussichtliche Stadien</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stades.map((s) => (
              <div
                key={s.nom}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900">{s.nom}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.ville}</p>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="font-medium text-primary">{s.capacite} Plätze</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{s.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Trophy className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Paarungen folgen
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Das Halbfinale wird durch die Viertelfinalergebnisse bestimmt.
              Wer schafft es unter die letzten Vier?
            </p>
            <Link
              href="/simulateur"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
            >
              Bracket simulieren
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
