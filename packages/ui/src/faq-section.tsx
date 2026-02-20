/**
 * A single FAQ item.
 * 
 * @param question - The question text
 * @param answer - The answer text (plain text or HTML-safe string)
 */
interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Props for the FAQSection component.
 * 
 * @param title - Optional custom title (default: "❓ Questions fréquentes")
 * @param items - Array of FAQ items with question/answer pairs
 */
interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

/**
 * FAQSection component — Renders an accordion-style FAQ list with JSON-LD schema.
 * 
 * Automatically generates schema.org FAQPage markup for SEO.
 * Uses native HTML `<details>` element for accessibility.
 * 
 * @example
 * ```tsx
 * <FAQSection
 *   title="Questions sur la Coupe du Monde 2026"
 *   items={[
 *     {
 *       question: "Combien d'équipes participeront ?",
 *       answer: "48 équipes participeront à la Coupe du Monde 2026."
 *     },
 *     {
 *       question: "Où se déroule la compétition ?",
 *       answer: "États-Unis, Canada et Mexique."
 *     }
 *   ]}
 * />
 * ```
 */
export function FAQSection({ title, items }: FAQSectionProps) {
  const defaultTitle = "❓ Questions fréquentes";

  // JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-slate-900/60 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {title || defaultTitle}
          </h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-slate-800/60 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-300 dark:text-gray-600 group-open:rotate-180 transition-transform duration-200 text-xs">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-700/40 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
