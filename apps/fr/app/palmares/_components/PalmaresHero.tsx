export function PalmaresHero() {
  return (
    <section className="hero-animated text-white py-14 sm:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Coupe du Monde FIFA</span>
        </div>
        <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
          🏆 Palmarès Historique
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          92 ans de football mondial · 22 éditions · 1930 → 2022
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-center">
          {[
            { val: "22", label: "Éditions" },
            { val: "8", label: "Champions différents" },
            { val: "5", label: "Titres Brésil (record)" },
            { val: "16", label: "Buts Klose (record)" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-xl bg-white/10 px-6 py-3">
              <div className="text-3xl font-extrabold text-white">{val}</div>
              <div className="text-xs text-gray-300 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
