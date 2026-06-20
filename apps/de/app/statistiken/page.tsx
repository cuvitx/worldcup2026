import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import {
  GoalsChart,
  TopScorersSection,
  TitledCountriesSection,
  RecordsGrid,
  FunFactsSection,
} from "./_components";
import { TableOfContents } from "@repo/ui";
import {
  topScorers,
  titledCountries,
  goalsByEdition,
  records,
  funFacts,
} from "./_data/stats-data";
import { RelatedLinks } from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "WM-Statistiken - Rekorde und Schlüsselzahlen | WM 2026",
  description:
    "Statistiken zur FIFA-Weltmeisterschaft: Top-Torschützen aller Zeiten, erfolgreichste Länder, Tore pro Ausgabe und historische Rekorde von 1930 bis 2026.",
  openGraph: {
    title: "WM-Statistiken - Rekorde und Schlüsselzahlen",
    description:
      "Top-Torschützen, Titelträger, Tore pro Ausgabe und historische Rekorde der FIFA-WM seit 1930.",
    url: "https://www.wm2026.de/statistiken",
  },
  alternates: {
    canonical: "https://www.wm2026.de/statistiken",
  },
};

export default function StatistikenPage() {
  const maxGoals = Math.max(...goalsByEdition.map((e) => e.goals));

  const faqItems = [
    {
      question: "Welches Land hat die meisten Weltmeisterschaften gewonnen?",
      answer: "Brasilien hält den Rekord mit 5 WM-Titeln (1958, 1962, 1970, 1994, 2002). Deutschland und Italien folgen mit jeweils 4 Titeln. Argentinien hat 3 Titel (1978, 1986, 2022), während Frankreich und Uruguay jeweils 2 gewonnen haben. Brasilien ist die einzige Nation, die seit 1930 an jeder einzelnen Ausgabe der Weltmeisterschaft teilgenommen hat."
    },
    {
      question: "Wie viele Tore wurden im Durchschnitt pro Weltmeisterschaft erzielt?",
      answer: "Im Durchschnitt werden etwa 2,8 Tore pro Spiel bei einer WM erzielt. Die Ausgabe 1954 in der Schweiz hält den Rekord mit 5,38 Toren pro Spiel (140 Tore in 26 Spielen). Moderne Ausgaben tendieren aufgrund der taktischen Entwicklung des Fussballs zu 2,5 bis 3 Toren pro Spiel. Die WM 2022 in Katar sah 172 Tore in 64 Spielen, also 2,69 Tore/Spiel."
    },
    {
      question: "Was ist der Rekord für aufeinanderfolgende Siege bei einer WM?",
      answer: "Brasilien hält den Rekord mit 11 aufeinanderfolgenden Siegen zwischen 2002 und 2006. Diese aussergewöhnliche Serie umfasst die 7 Siege der Kampagne 2002 (Titelgewinn) und die ersten 4 Spiele 2006 vor dem Ausscheiden im Viertelfinale gegen Frankreich. Deutschland erzielte ebenfalls eine beeindruckende Serie von 10 Siegen zwischen 2014 und 2018."
    },
    {
      question: "Wie viele Spieler haben mehr als 10 Tore bei WM-Endrunden erzielt?",
      answer: "Nur 5 Spieler haben die Marke von 10 WM-Toren in ihrer Karriere überschritten: Miroslav Klose (16 Tore), Ronaldo Nazário (15), Gerd Müller (14), Just Fontaine (13) und Lionel Messi (13). Kylian Mbappé (12 Tore mit 25 Jahren) ist der jüngste noch aktive Spieler, der diesen exklusiven Kreis bei der WM 2026 erreichen könnte."
    },
    {
      question: "Was ist der höchste Sieg in der WM-Geschichte?",
      answer: "Der höchste Sieg in der WM-Geschichte ist das 10:1 von Ungarn gegen El Salvador bei der Ausgabe 1982 in Spanien. Weitere hohe Ergebnisse sind das 8:0 von Deutschland gegen Saudi-Arabien 2002 und das 7:1 von Deutschland gegen Brasilien im Halbfinale 2014. Dieses letzte Spiel, genannt 'Mineirazo', bleibt das traumatischste Erlebnis für den brasilianischen Fussball."
    },
    {
      question: "Wie viele Länder haben die Weltmeisterschaft bereits gewonnen?",
      answer: "Nur 8 Länder haben die WM seit ihrer Gründung 1930 gewonnen: Brasilien (5 Titel), Deutschland (4), Italien (4), Argentinien (3), Frankreich (2), Uruguay (2), England (1) und Spanien (1). Kein Land aus Asien, Afrika oder Nordamerika hat jemals den Pokal gewonnen. Die Niederlande halten den traurigen Rekord von 3 verlorenen Finalspielen ohne je zu gewinnen."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "WM-Statistiken - Rekorde und Schlüsselzahlen",
    description:
      "Alle historischen Statistiken der FIFA-WM seit 1930: Torschützen, Länder, Tore pro Ausgabe und Rekorde.",
    url: "https://www.wm2026.de/statistiken",
    mainEntity: {
      "@type": "Dataset",
      name: "Statistiken FIFA-WM 1930–2022",
      description: "Vollständige historische Daten der WM",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.wm2026.de" },
      {
        "@type": "ListItem",
        position: 2,
        name: "WM-Statistiken",
        item: "https://www.wm2026.de/statistiken",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
{/* Breadcrumb */}
{/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">FIFA-Weltmeisterschaft · 1930–2026</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
             Statistiken &amp; Rekorde
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            92 Jahre Weltfussball in Zahlen, Grafiken und einzigartigen Rekorden.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            {[
              { val: "22", label: "Ausgaben" },
              { val: "2 788", label: "Erzielte Tore" },
              { val: "16", label: "Tore Klose (Rekord)" },
              { val: "48", label: "Mannschaften 2026" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div className="space-y-16">
        {/* Top-Torschützen */}
        <TopScorersSection topScorers={topScorers} />

        {/* Titelträger */}
        <TitledCountriesSection titledCountries={titledCountries} />

        {/* Tore pro Ausgabe */}
        <section>
          <h2 id="tore-ausgabe" className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
             Erzielte Tore pro Ausgabe (1930–2022)
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Bewegen Sie die Maus über die Balken für Details. Ausgabe 1954: 5,38 Tore/Spiel — absoluter
            Rekord.
          </p>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
            <GoalsChart goalsByEdition={goalsByEdition} />
            {/* Kompakte Tabelle */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-center">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-100">
                    <th className="py-2 px-2 text-left">Ausgabe</th>
                    <th className="py-2 px-2">Mannschaften</th>
                    <th className="py-2 px-2">Spiele</th>
                    <th className="py-2 px-2">Tore</th>
                    <th className="py-2 px-2">Schnitt/Spiel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...goalsByEdition].reverse().map((ed) => (
                    <tr
                      key={ed.year}
                      className={`hover:bg-gray-50 transition-colors ${
                        ed.goals === maxGoals ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="py-1.5 px-2 font-bold text-primary text-left">
                        {ed.year}
                      </td>
                      <td className="py-1.5 px-2 text-gray-600">
                        {ed.teams}
                      </td>
                      <td className="py-1.5 px-2 text-gray-600">
                        {ed.matches}
                      </td>
                      <td className="py-1.5 px-2 font-bold text-gray-900">
                        {ed.goals}
                        {ed.goals === maxGoals && (
                          <span className="ml-1 text-primary text-[9px]">★</span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-gray-500">{ed.avg.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Rekorde */}
        <RecordsGrid records={records} />

        {/* Fun Facts */}
        <FunFactsSection funFacts={funFacts} />

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-primary to-primary text-white p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
             Entdecken Sie die ganze Geschichte
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Von Statistiken bis zu Prognosen — erfahren Sie alles, was Sie über die
            WM 2026 wissen müssen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/geschichte"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-gray-100 transition-colors"
            >
               Historische Zeitleiste
            </Link>
            <Link
              href="/palmares"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
               Vollständige Siegerliste
            </Link>
            <Link
              href="/prognose/sieger"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
               Prognose 2026
            </Link>
          </div>
        </section>
        </div>
        <TableOfContents items={[
          { id: "top-torschuetzen", label: "Top-Torschützen", level: 2 },
          { id: "laender-mit-titeln", label: "Erfolgreichste Länder", level: 2 },
          { id: "tore-ausgabe", label: "Tore pro Ausgabe", level: 2 },
          { id: "rekorde", label: "Rekorde", level: 2 },
          { id: "fun-facts", label: "Fun Facts", level: 2 },
        ]} />
      </div>

      <RelatedLinks
        links={[
          {
            href: "/geschichte",
            title: " Geschichte der WM",
            description: "Vollständige Zeitleiste aller 22 Ausgaben seit 1930 mit Highlights.",
            icon: ""
          },
          {
            href: "/palmares",
            title: "Vollständige Siegerliste",
            description: "Alle Gewinner, Finalisten und Rekorde pro Ausgabe.",
            icon: ""
          },
          {
            href: "/mannschaft",
            title: "WM-Mannschaften 2026",
            description: "Die 48 qualifizierten Mannschaften mit Statistiken und Leistungen.",
            icon: ""
          }
        ]}
      />

      <FAQSection title=" Fragen zu den WM-Statistiken" items={faqItems} />
    </>
  );
}
