import type { CityGuide } from "./city-data";

export function FoodSection({ food }: { food: CityGuide["food"] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🍽️ Où manger
        </h2>
        <div className="space-y-4">
          {food.map((f, i) => (
            <div
              key={i}
              className="flex gap-4 items-start p-5 rounded-xl bg-gray-50 dark:bg-gray-dark border border-gray-100 dark:border-white/5"
            >
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{f.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
