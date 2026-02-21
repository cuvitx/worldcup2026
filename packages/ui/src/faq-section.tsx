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
 * @param title - Optional custom title (default: "Questions fréquentes")
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
  const defaultTitle = "Questions fréquentes";

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
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {title || defaultTitle}
          </h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold text-gray-900 hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-300 group-open:rotate-45 transition-transform duration-200 text-xs">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
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
