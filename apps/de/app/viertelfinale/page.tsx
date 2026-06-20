import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, ArrowRight, Medal } from "lucide-react";

export const metadata: Metadata = {
  title: "Viertelfinale WM 2026 - Termine & Analyse | WM 2026",
  description:
    "Viertelfinale WM 2026: am 9. und 10. Juli 2026. Die 8 besten Mannschaften der Welt treffen aufeinander. Format, Stadien und Analyse.",
  openGraph: {
    title: "Viertelfinale WM 2026",
    description: "Alles über das Viertelfinale der WM 2026.",
    url: "https://www.wm2026guide.de/viertelfinale",
  },
  alternates: { canonical: "https://www.wm2026guide.de/viertelfinale" },
};

const faqItems = [
  {
    question: "Wann findet das Viertelfinale der WM 2026 statt?",
    answer: "Das Viertelfinale findet am 9. und 10. Juli 2026 statt. 4 Spiele sind auf 2 Tage verteilt.",
  },
  {
    question: "Wo findet das Viertelfinale statt?",
    answer: "Das Viertelfinale wird in 4 verschiedenen Stadien der 16 Turnierstätten ausgetragen. Die genauen Stadien werden von der FIFA im detaillierten Spielplan bestätigt.",
  },
  {
    question: "Welche Mannschaften sind Favoriten für das Viertelfinale?",
    answer: "Die üblichen Favoriten (Brasilien, Argentinien, Frankreich, Deutschland, England, Spanien) werden in dieser Runde erwartet, aber das erweiterte Format mit 48 Mannschaften kann Überraschungen durch aufstrebende Nationen bereithalten.",
  },
];

export default function ViertelfinaleSeite() {
  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Medal className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              K.-o.-Phase
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Viertelfinale</span> WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Die 8 besten Mannschaften der Welt. 4 entscheidende Spiele am 9. und 10. Juli 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "4", label: "Spiele" },
              { val: "8", label: "Mannschaften" },
              { val: "2", label: "Tage" },
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
            <Swords className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Die Runde der Großen</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Das Viertelfinale markiert den Eintritt in die &bdquo;erweiterten letzten Vier&ldquo;.
              In dieser Runde sind nur noch 8 Mannschaften übrig, und jedes Spiel kann zu einem Klassiker
              der Fußballgeschichte werden.
            </p>
            <p>
              Das Format bleibt gleich: 90 Minuten reguläre Spielzeit, Verlängerung
              und Elfmeterschießen bei Bedarf. Die Sieger ziehen ins Halbfinale ein.
            </p>
            <p>
              Historisch gesehen hat das Viertelfinale legendäre Spiele hervorgebracht:
              Frankreich-Brasilien 2006, Argentinien-England 1986, Brasilien-Deutschland 2014
              (im Halbfinale zwar, aber die Intensität des Viertelfinales ist vergleichbar).
            </p>
          </div>
        </section>

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
                  <th className="px-4 py-3 text-left">Spiele</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">9. Juli 2026</td>
                  <td className="px-4 py-3 text-gray-600">Viertelfinale 1 und 2</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">10. Juli 2026</td>
                  <td className="px-4 py-3 text-gray-600">Viertelfinale 3 und 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Medal className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Paarungen folgen
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Die Viertelfinale-Paarungen werden durch die Ergebnisse des Achtelfinales
              bestimmt. Testen Sie Ihre Prognosen mit unserem Simulator.
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

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
