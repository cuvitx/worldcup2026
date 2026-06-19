import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "FAQ -- Haeufig gestellte Fragen zur WM 2026",
  description:
    "Antworten auf die wichtigsten Fragen zur Fussball-WM 2026. Termine, Format, Austragungsorte, Mannschaften und mehr.",
  alternates: getStaticAlternates("faq", "de"),
};

const faqItems = [
  {
    question: "Wann beginnt die WM 2026?",
    answer:
      "Die Fussball-Weltmeisterschaft 2026 beginnt am 11. Juni 2026 mit dem Eroeffnungsspiel im Estadio Azteca in Mexiko-Stadt. Das Finale findet am 19. Juli 2026 im MetLife Stadium in New York/New Jersey statt.",
  },
  {
    question: "Wie viele Mannschaften nehmen an der WM 2026 teil?",
    answer:
      "Erstmals nehmen 48 Mannschaften an einer Fussball-WM teil (bisher 32). Das Turnier umfasst 12 Gruppen mit je 4 Mannschaften und insgesamt 104 Spiele.",
  },
  {
    question: "Wo findet die WM 2026 statt?",
    answer:
      "Die WM 2026 wird gemeinsam von drei Laendern ausgerichtet: den USA (11 Austragungsorte), Kanada (2 Austragungsorte) und Mexiko (3 Austragungsorte). Es ist die erste WM mit drei Gastgeberlaendern.",
  },
  {
    question: "Wie funktioniert das neue WM-Format?",
    answer:
      "Die 48 Mannschaften werden in 12 Gruppen mit je 4 Teams aufgeteilt. Die zwei Erstplatzierten jeder Gruppe und die 8 besten Grupendritten qualifizieren sich fuer die K.o.-Runde. Die K.o.-Phase umfasst Zwischenrunde, Achtelfinale, Viertelfinale, Halbfinale und Finale.",
  },
  {
    question: "Wie viele Spiele gibt es bei der WM 2026?",
    answer:
      "Insgesamt werden 104 Spiele ausgetragen: 72 Gruppenspiele und 32 K.o.-Spiele. Das sind 40 Spiele mehr als bei den bisherigen 32er-Turnieren.",
  },
  {
    question: "In welchen Stadien wird gespielt?",
    answer:
      "Die 104 Spiele finden in 16 Stadien statt, verteilt auf 16 Staedte in den drei Gastgeberlaendern. Das groesste Stadion ist das MetLife Stadium in New York/New Jersey mit ca. 82.500 Plaetzen.",
  },
  {
    question: "Wo findet das Finale der WM 2026 statt?",
    answer:
      "Das Finale wird am 19. Juli 2026 im MetLife Stadium in East Rutherford, New Jersey (Grossraum New York) ausgetragen. Es ist eines der groessten und modernsten Stadien der Welt.",
  },
  {
    question: "Hat sich Deutschland fuer die WM 2026 qualifiziert?",
    answer:
      "Ja, Deutschland hat sich fuer die WM 2026 qualifiziert und gehoert zu den 48 teilnehmenden Mannschaften.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Haeufig gestellte Fragen
          </h1>
          <p className="mt-2 text-gray-300">
            Alles Wissenswerte zur Fussball-WM 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
