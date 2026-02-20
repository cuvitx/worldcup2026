export function SecuritySection({ security, visa }: { security: string; visa: string }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-deep">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
           Sécurité & Visa
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 rounded-xl bg-white dark:bg-gray-dark border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2"><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Sécurité</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{security}</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-gray-dark border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">🛂 Visa</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{visa}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
