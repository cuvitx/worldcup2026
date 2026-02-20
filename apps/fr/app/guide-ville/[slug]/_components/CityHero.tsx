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
            <p className="text-xs text-white/50 uppercase tracking-wide mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> Aéroport</p>
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
