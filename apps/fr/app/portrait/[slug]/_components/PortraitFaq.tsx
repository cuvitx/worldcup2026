export function PortraitFaq({ faq }: { faq: { question: string; answer: string }[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          ❓ Questions fréquentes
        </h2>
        <div className="space-y-4">
          {faq.map((f, i) => (
            <details
              key={i}
              className="group p-5 rounded-xl bg-gray-50 dark:bg-gray-dark border border-gray-100 dark:border-white/5"
            >
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                <span>{f.question}</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
