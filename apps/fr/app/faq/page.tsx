import type { Metadata } from "next";
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
      url: "https://www.cdm2026.fr/faq",
    },
  };
}

const categoryEmojis: Record<string, string> = {
  tournament: "",
  betting: "",
  predictions: "",
  teams: "",
};

export default function FaqPage() {
  const categories = ["tournament", "betting", "predictions", "teams"] as const;

  const itemsByCategory = categories.map((cat) => ({
    key: cat,
    label: faqCategories[cat].fr,
    emoji: categoryEmojis[cat] || "",
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


      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Questions fréquentes</h1>
          <p className="mt-2 text-gray-300">
            Tout ce que vous devez savoir sur la Coupe du Monde FIFA 2026
          </p>
        </div>
      </section>

      {/* Category badges */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-0 z-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {itemsByCategory.map(({ key, label, emoji, items }) => (
              <a
                key={key}
                href={`#${key}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span>{emoji}</span>
                {label}
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ml-1">
                  {items.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        {itemsByCategory.map(({ key, label, emoji, items }) => (
          <section key={key} id={key}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>{emoji}</span> {label}
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="cursor-pointer px-6 py-4 font-medium text-gray-900 hover:text-primary transition-colors list-none flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">{item.question.fr}</h3>
                    <span className="faq-icon shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-content">
                    <div>
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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
