import type { CityGuide } from "./city-data";

export function CityHero({ city }: { city: CityGuide }) {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-deep)] via-[var(--color-deep)] to-[var(--color-primary)] text-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
          {city.flag} {city.country} — Guide CDM 2026
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          {city.name}
        </h1>
        <p className="text-xl text-white/70 mb-6">
           {city.stadium} — {city.stadiumCapacity}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wide mb-1">☀ Climat</p>
            <p className="text-sm text-white/80">{city.climate}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wide mb-1">✈ Aéroport</p>
            <p className="text-sm text-white/80">{city.airport}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-white/50 uppercase tracking-wide mb-1">🚇 Transport</p>
            <p className="text-sm text-white/80">{city.metro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
