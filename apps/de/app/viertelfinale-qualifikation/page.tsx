import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Swords, Calendar, ArrowRight, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Achtelfinale WM 2026 - Termine & Format | WM 2026",
  description:
    "Achtelfinale WM 2026: vom 3. bis 6. Juli 2026. Format, Bracket-Analyse, wichtige Spiele und Prognosen für das Achtelfinale.",
  openGraph: {
    title: "Achtelfinale WM 2026",
    description: "Alles über das Achtelfinale der WM 2026: Termine, Format und Analyse.",
    url: "https://www.wm2026guide.de/viertelfinale-qualifikation",
  },
  alternates: { canonical: "https://www.wm2026guide.de/viertelfinale-qualifikation" },
};

const faqItems = [
  {
    question: "Wann findet das Achtelfinale der WM 2026 statt?",
    answer: "Das Achtelfinale findet vom 3. bis 6. Juli 2026 statt, mit 8 Spielen an 4 Tagen.",
  },
  {
    question: "Wie viele Mannschaften nehmen am Achtelfinale teil?",
    answer: "16 Mannschaften treten im Achtelfinale (Round of 16) gegeneinander an. Es handelt sich um die Sieger der 16 Spiele des Sechzehntelfinales.",
  },
  {
    question: "Wie ist der Bracket des Achtelfinales strukturiert?",
    answer: "Der Bracket ist vorbestimmt: Jede Hälfte des Turnierbaums führt zu einem Halbfinale. Die Sieger des Achtelfinales treffen im Viertelfinale aufeinander, gemäß einem von der FIFA festgelegten Schema.",
  },
];

export default function HuitiemesDeFinale() {
  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Swords className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              K.o.-Phase
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-accent">Achtelfinale</span> WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-6">
            Round of 16 — Vom 3. bis 6. Juli 2026. Die 16 besten Mannschaften
            kämpfen um einen Platz im Viertelfinale.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { val: "8", label: "Matchs" },
              { val: "16", label: "Mannschaften" },
              { val: "4", label: "Tage" },
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
            <Target className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Format & Bedeutung</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Im Achtelfinale treffen die 16 Sieger des Sechzehntelfinales aufeinander.
              Es ist die klassische K.o.-Runde der WM, die Fans gut kennen,
              aber mit einem erweiterten Bracket im Vorfeld.
            </p>
            <p>
              Jedes Spiel wird über 90 Minuten ausgetragen, mit Verlängerung (2 x 15 Min.) und Elfmeterschießen
              bei Gleichstand. Historisch gesehen bringt diese Runde einige der denkwürdigsten
              Spiele der Turniere hervor.
            </p>
            <p>
              Der Bracket ist in zwei Hälften unterteilt. Mannschaften in derselben
              Hälfte können erst im Finale aufeinandertreffen, was zu sogenannten
              "Todesgruppen" führt, wenn sich Favoriten auf derselben Seite befinden.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-gray-900">Geplanter Spielplan</h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Matchs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { date: "3. Juli 2026", matchs: "Spiele 1-2" },
                  { date: "4. Juli 2026", matchs: "Spiele 3-4" },
                  { date: "5. Juli 2026", matchs: "Spiele 5-6" },
                  { date: "6. Juli 2026", matchs: "Spiele 7-8" },
                ].map((r) => (
                  <tr key={r.date} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.date}</td>
                    <td className="px-4 py-3 text-gray-600">{r.matchs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="rounded-xl border-2 border-dashed border-accent/40 bg-accent/5 p-8 text-center">
            <Swords className="h-12 w-12 text-accent mx-auto mb-4 opacity-60" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Kommende Begegnungen
            </p>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Die Begegnungen des Achtelfinales stehen nach Abschluss des Sechzehntelfinales fest.
              Simulieren Sie jetzt die möglichen Spiele.
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
