import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { getAllArticles } from "../../lib/mdx";

export const metadata: Metadata = {
  title: "Nachrichten WM 2026 - Aktuelle News WM 2026",
  description:
    "Alle Nachrichten der WM 2026: Stadien, Qualifikationen, Tickets, Mannschaften, Sportwetten. Bleiben Sie über die WM informiert.",
  alternates: {
    canonical: "https://www.wm2026guide.de/nachrichten",
  },
  openGraph: {
    title: "Nachrichten WM 2026",
    description: "Aktuelle News und Infos zur WM 2026.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryLabels: Record<string, string> = {
  analyse: "Analyse",
  guide: "Guide",
  portrait: "Porträt",
  actualite: "Aktuelles",
  pronostic: "Prognose",
  Prognose: "Prognose",
  equipes: "Mannschaften",
  paris: "Wetten",
  transferts: "Transfers",
  stades: "Stadien",
  billets: "Tickets",
};

export default function ActualitesPage() {
  const articles = getAllArticles();

  const faqItems = [
    {
      question: "Wann beginnt die WM 2026?",
      answer: "Die WM 2026 beginnt am Donnerstag, den 11. Juni 2026, mit dem Eröffnungsspiel im Estadio Azteca in Mexiko-Stadt (Mexiko). Das Turnier endet am Sonntag, den 19. Juli 2026, mit dem Finale im MetLife Stadium in New York/New Jersey. Der Wettbewerb erstreckt sich über 39 Tage mit insgesamt 104 Spielen, gegenüber 64 Spielen bei früheren Ausgaben mit 32 Mannschaften."
    },
    {
      question: "Wo findet die WM 2026 statt?",
      answer: "Die WM 2026 findet in 3 Ländern statt: USA (11 Stadien), Kanada (2 Stadien) und Mexiko (3 Stadien). Es ist das erste Mal, dass eine WM in 3 Nationen ausgetragen wird und die erste in Nordamerika seit 1994. Die 16 Gastgeberstädte umfassen New York, Los Angeles, Mexiko-Stadt, Toronto, Vancouver, Dallas, Miami und viele weitere. Das Finale findet im MetLife Stadium (New York/NJ) statt."
    },
    {
      question: "Wie viele Mannschaften nehmen an der WM 2026 teil?",
      answer: "48 Mannschaften nehmen an der WM 2026 teil, gegenüber 32 bei früheren Ausgaben. Diese historische Erweiterung ermöglicht die Teilnahme von mehr Nationen und erhöht die Spielanzahl auf 104 (statt 64). Die 48 Mannschaften werden in 12 Gruppen zu je 4 eingeteilt, wobei sich 32 Mannschaften für die K.-o.-Phase qualifizieren (die ersten 2 jeder Gruppe + die 8 besten Gruppendritten)."
    },
    {
      question: "Hat sich Deutschland für die WM 2026 qualifiziert?",
      answer: "Ja, Deutschland hat sich für die WM 2026 qualifiziert, indem es die Gruppe in der europäischen Qualifikation als Erster abschloss. Die DFB-Elf, Weltmeister 2014, gehört zu den großen Favoriten des Turniers. Unter der Leitung von Julian Nagelsmann verfügt die Mannschaft über einen außergewöhnlichen Kader mit Florian Wirtz, Jamal Musiala und vielen weiteren Talenten."
    },
    {
      question: "Wann fand die Gruppenauslosung der WM 2026 statt?",
      answer: "Die Gruppenauslosung der WM 2026 fand im Dezember 2025 statt. Sie bestimmte die Zusammensetzung der 12 Gruppen mit je 4 Mannschaften und den Spielplan der Gruppenspiele. Die Auslosung erfolgte nach Lostöpfen basierend auf der FIFA-Weltrangliste und den Regeln zur geografischen Trennung (maximal 2 europäische Mannschaften pro Gruppe usw.)."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nachrichten WM 2026",
    url: "https://www.wm2026guide.de/nachrichten",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: article.date,
          url: `https://www.wm2026guide.de/nachrichten/${article.slug}`,
          publisher: { "@type": "Organization", name: "WM 2026" },
        },
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">Nachrichten WM 2026</h1>
          <p className="text-gray-300 max-w-2xl">
            Analysen, Guides und Artikel zur WM 2026.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Noch keine Artikel vorhanden.</p>
        ) : (
          <>
            {/* Featured article */}
            {articles[0] && (
              <Link
                href={`/nachrichten/${articles[0].slug}`}
                className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all mb-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-0">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-12">
                    <span className="text-4xl sm:text-8xl">{articles[0].imageEmoji ?? "📝"}</span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
                        {categoryLabels[articles[0].category] ?? articles[0].category}
                      </span>
                      <time className="text-xs text-gray-500" dateTime={articles[0].date}>
                        {formatDate(articles[0].date)}
                      </time>
                      {articles[0].readingTime && (
                        <span className="text-xs text-gray-400">{articles[0].readingTime} min</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 transition-colors mb-3">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {articles[0].description}
                    </p>
                    <span className="text-sm font-bold text-primary">Artikel lesen →</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of articles */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <Link
                  key={article.slug}
                  href={`/nachrichten/${article.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  {article.imageEmoji && <div className="mb-3 text-2xl sm:text-4xl">{article.imageEmoji}</div>}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {categoryLabels[article.category] ?? article.category}
                    </span>
                    <time className="text-xs text-gray-500" dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    {article.readingTime && (
                      <span className="text-xs text-gray-400">{article.readingTime} min</span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <FAQSection title="Häufig gestellte Fragen zur WM 2026" items={faqItems} />
    </div>
  );
}
