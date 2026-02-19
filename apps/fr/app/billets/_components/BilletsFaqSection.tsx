import { faqItems } from "./data";

export function BilletsFaqSection() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ❓ Questions fréquentes — Billets CDM 2026
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                  {item.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
