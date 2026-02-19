export function BilletsHero() {
  return (
    <section className="bg-primary text-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
            🎟️ Guide officiel
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            🎟️ Billets CDM 2026 : prix, dates & arnaques à éviter
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            De 60 $ la phase de groupes à 1 500 $+ pour la finale. Tout pour
            acheter au bon prix, au bon moment — sans se faire arnaquer.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.fifa.com/en/tournaments/mens/worldcup/26/tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg w-full sm:w-auto"
            >
              🎟️ Acheter sur FIFA.com (officiel)
            </a>
            <a href="#prix" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-all w-full sm:w-auto">
              📊 Consulter les tarifs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
