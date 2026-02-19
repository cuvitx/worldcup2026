import type { Metadata } from "next";
import Link from "next/link";
import { faqItems, faqCategories } from "@repo/data/faq";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Questions fréquentes - Coupe du Monde 2026",
    description:
      "Retrouvez toutes les réponses à vos questions sur la Coupe du Monde 2026 : format du tournoi, équipes qualifiées, paris sportifs, pronostics et plus encore.",
    alternates: getStaticAlternates("faq", "fr"),
    openGraph: {
      title: "FAQ - Coupe du Monde 2026",
      description: "Réponses à toutes vos questions sur la CDM 2026 : format, équipes, paris et pronostics.",
      url: "https://cdm2026.fr/faq",
    },
  };
}

const categoryEmojis: Record<string, string> = {
  tournament: "🏆",
  betting: "🎯",
  predictions: "📊",
  teams: "⚽",
};

export default function FaqPage() {
  const categories = ["tournament", "betting", "predictions", "teams"] as const;

  const itemsByCategory = categories.map((cat) => ({
    key: cat,
    label: faqCategories[cat].fr,
    emoji: categoryEmojis[cat] || "📌",
    items: faqItems.filter((item) => item.category === cat),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question.fr,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.fr,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary">Accueil</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">FAQ</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Questions fréquentes</h1>
          <p className="mt-2 text-gray-300">
            Tout ce que vous devez savoir sur la Coupe du Monde FIFA 2026
          </p>
        </div>
      </section>

      {/* Category badges */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            {itemsByCategory.map(({ key, label, emoji, items }) => (
              <a
                key={key}
                href={`#${key}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-accent/10 hover:text-accent transition-colors"
              >
                <span>{emoji}</span>
                {label}
                <span className="ml-1 rounded-full bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs font-bold text-gray-500 dark:text-gray-400">
                  {items.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {itemsByCategory.map(({ key, label, emoji, items }) => (
          <section key={key} id={key}>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span>{emoji}</span> {label}
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="cursor-pointer px-6 py-4 font-medium text-gray-900 dark:text-gray-100 hover:text-accent transition-colors list-none flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold">{item.question.fr}</h3>
                    <span className="faq-icon shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-content">
                    <div>
                      <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                        {item.answer.fr}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
