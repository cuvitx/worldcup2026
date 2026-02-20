export function MatchInfoSection({ stadium, matchInfo }: { stadium: string; matchInfo: string }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
           Matchs prévus au {stadium}
        </h2>
        <div className="p-5 rounded-xl bg-gradient-to-r from-accent/5 to-transparent border border-accent/10">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{matchInfo}</p>
        </div>
      </div>
    </section>
  );
}
