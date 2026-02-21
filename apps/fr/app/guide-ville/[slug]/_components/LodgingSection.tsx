import type { CityGuide } from "./city-data";

export function LodgingSection({ lodging }: { lodging: CityGuide["lodging"] }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50deep">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/><path d="M10 22v-6.5m4 0V22"/></svg> Où loger
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {lodging.map((l, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-whitegray-dark border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{l.quartier}</h3>
                <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {l.budget}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{l.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
