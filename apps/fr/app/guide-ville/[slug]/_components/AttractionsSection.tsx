import type { CityGuide } from "./city-data";

export function AttractionsSection({ attractions }: { attractions: CityGuide["attractions"] }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50deep">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
           Que voir & que faire
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {attractions.map((a, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-whitegray-dark border border-gray-100 shadow-sm"
            >
              <h3 className="font-bold text-gray-900 mb-2">{a.name}</h3>
              <p className="text-gray-600 text-sm">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
