export function PalmaresHero() {
  return (
    <section className="hero-animated text-white py-12 sm:py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
          Coupe du Monde FIFA
        </p>
        <h1 className="text-2xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
          🏆 Palmarès Historique
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
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
