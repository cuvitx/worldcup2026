export function SecuritySection({ security, visa }: { security: string; visa: string }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🛡️ Sécurité & Visa
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">🔒 Sécurité</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{security}</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">🛂 Visa</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{visa}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
