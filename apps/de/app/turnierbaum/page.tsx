import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { teamsById } from "../../lib/localized-data";
import { champion } from "./_components/bracket-data";
import { DesktopBracket, MobileBracket } from "./_components/BracketView";
import { ProbabilitiesTable } from "./_components/ProbabilitiesTable";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Turnierbaum WM 2026 | Bracket und K.o.-Phase",
  description:
    "Turnierbaum der WM 2026: vollständiger Bracket der 32tel-, 16tel-, Viertel-, Halbfinale und Finale. Prognosen und Favoriten für jede Runde.",
  alternates: getStaticAlternates("bracket", "de"),
  openGraph: {
    title: "Turnierbaum - WM 2026",
    description: "Sehen Sie den vollständigen Bracket der K.o.-Phase der WM 2026.",
  },
};

export default function BracketPage() {
  const faqItems = [
    {
      question: "Wie funktioniert der Turnierbaum der WM 2026?",
      answer: "Der Turnierbaum (Bracket) der WM 2026 beginnt nach der Gruppenphase mit 32 qualifizierten Mannschaften (die 2 Ersten jeder Gruppe + die 8 besten Dritten). Die K.o.-Phase umfasst: 32tel-Finale (16 Spiele), Achtelfinale (8 Spiele), Viertelfinale (4 Spiele), Halbfinale (2 Spiele), Spiel um Platz 3 und das Finale. Jedes K.o.-Spiel wird in einem einzigen Spiel ausgetragen; bei Gleichstand nach 90 Minuten gibt es Verlängerung (2x15 Min.) und bei Bedarf Elfmeterschießen."
    },
    {
      question: "Wann beginnt das Achtelfinale der WM 2026?",
      answer: "Das 32tel-Finale (entspricht dem Achtelfinale im alten Format mit 32 Mannschaften) beginnt am 28. Juni 2026, einen Tag nach Ende der Gruppenphase. Die 16 Spiele der 32tel-Runde finden vom 28. Juni bis 2. Juli statt. Das Achtelfinale findet vom 4. bis 7. Juli statt, die Viertelfinals vom 9. bis 11. Juli, die Halbfinals am 14.-15. Juli, das Spiel um Platz 3 am 18. Juli und das Finale am 19. Juli 2026 im MetLife Stadium in New York."
    },
    {
      question: "Wer ist der Favorit auf den WM-Titel 2026 laut Turnierbaum?",
      answer: "Laut dem auf ELO-Ranglisten und statistischen Wahrscheinlichkeiten basierenden Bracket ist Frankreich der große Favorit auf den WM-Titel 2026. Mit einem herausragenden Kader unter Führung von Kylian Mbappe, einer soliden Defensive und Erfahrung bei großen Wettbewerben (Weltmeister 2018, Vizeweltmeister 2022) haben die Bleus die besten Chancen. Brasilien, England, Argentinien und Spanien sind ebenfalls ernsthafte Titelanwärter."
    },
    {
      question: "Wie werden die Paarungen des Turnierbaums bestimmt?",
      answer: "Die Paarungen des Turnierbaums werden durch die Platzierung in der Gruppenphase bestimmt. Die Gruppenersten treffen auf die Zweiten oder Dritten anderer Gruppen nach einem von der FIFA festgelegten Schema. Dieses Schema ist so konzipiert, dass sich zwei Mannschaften derselben Gruppe erst im Viertelfinale begegnen können. Die Spiele werden auch geografisch auf die 16 Stadien verteilt, um Reisen zu minimieren und sportliche Fairness zu fördern."
    },
    {
      question: "Kann man auf den Turnierbaum der WM 2026 wetten?",
      answer: "Ja, Betano bietet Wetten auf den Turnierbaum an: Sieger jedes K.o.-Spiels, exaktes Ergebnis, Qualifikation einer Mannschaft fürs Viertel-/Halb-/Finale, und natürlich den Turniersieger. Die Quoten ändern sich je nach den Ergebnissen der Gruppenphase. Kombinationswetten ermöglichen es, auf mehrere Spiele gleichzeitig zu wetten, für potenziell höhere Gewinne. 18+, verantwortungsvolles Spielen."
    }
  ];

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Turnierbaum WM 2026</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Vollständiger Bracket der K.o.-Phase: 32tel-Finale, Achtelfinale,
            Viertelfinale, Halbfinale und Finale. Prognosen basierend auf ELO-Ranglisten.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        {/* Champion prediction */}
        {champion && teamsById[champion] && (
          <section className="rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 text-center">
            <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">Vorhergesagter Weltmeister</p>
            <Link href={`/mannschaft/${teamsById[champion]!.slug}`} className="inline-flex items-center gap-3 hover:opacity-80">
              <span className="text-3xl sm:text-5xl" role="img" aria-label={`Flagge von ${teamsById[champion]!.name}`}>{teamsById[champion]!.flag}</span>
              <span className="text-3xl font-extrabold text-gray-900">{teamsById[champion]!.name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Basierend auf ELO-Ranglisten und Prognosen der Gruppenphase</p>
          </section>
        )}

        <DesktopBracket />
        <MobileBracket />
        <ProbabilitiesTable />

        {/* SEO text removed — covered by FAQ section below */}
      </div>

      <FAQSection title="Fragen zum Turnierbaum" items={faqItems} />
    </>
  );
}
