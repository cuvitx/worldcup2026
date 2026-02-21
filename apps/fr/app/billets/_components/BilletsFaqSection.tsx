import { faqItems } from "./data";
import { HelpCircle } from "lucide-react"

export function BilletsFaqSection() {
  return (
    <section className="bg-gray-50slate-900/50 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <HelpCircle className="h-5 w-5 inline-block" /> Questions fréquentes — Billets CDM 2026
        </h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-whiteslate-800 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
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
    </section>
  );
}
