interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export function FAQSection({ faqItems }: FAQSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ❓ Questions fréquentes
      </h2>
      <div className="space-y-4">
        {faqItems.map((faq, i) => (
          <details
            key={i}
            className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
              <span>{faq.q}</span>
              <svg
                className="w-5 h-5 text-gray-400 shrink-0 ml-3 transition-transform group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
