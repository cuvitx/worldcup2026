import type { Metadata } from "next";
import Link from "next/link";
import { faqItems, faqCategories } from "@repo/data/faq";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 86400; // 24 hours

export function generateMetadata(): Metadata {
  return {
    title: "Frequently Asked Questions - World Cup 2026",
    description:
      "Find answers to all your questions about the 2026 FIFA World Cup: tournament format, qualified teams, sports betting, predictions, and more.",
    alternates: getStaticAlternates("faq", "en"),
  };
}

export default function FaqPage() {
  const categories = ["tournament", "betting", "predictions", "teams"] as const;

  // Group FAQ items by category
  const itemsByCategory = categories.map((cat) => ({
    key: cat,
    label: faqCategories[cat].en,
    items: faqItems.filter((item) => item.category === cat),
  }));

  // Build JSON-LD FAQPage schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.en,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">FAQ</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Frequently Asked Questions</h1>
          <p className="mt-2 text-gray-300">
            Everything you need to know about the 2026 FIFA World Cup
          </p>
        </div>
      </section>

      {/* Category nav */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            {itemsByCategory.map(({ key, label, items }) => (
              <a
                key={key}
                href={`#${key}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {label} ({items.length})
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {itemsByCategory.map(({ key, label, items }) => (
          <section key={key} id={key}>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{label}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-lg border border-gray-200 bg-white"
                >
                  <summary className="cursor-pointer px-6 py-4 font-medium text-gray-900 hover:text-accent transition-colors list-none flex items-center justify-between">
                    <h3 className="text-base font-semibold pr-4">
                      {item.question.en}
                    </h3>
                    <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {item.answer.en}
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
