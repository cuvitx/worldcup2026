import type { CityGuide } from "./city-data";
import { UtensilsCrossed } from "lucide-react"

export function FoodSection({ food }: { food: CityGuide["food"] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          <UtensilsCrossed className="h-5 w-5 inline-block" /> Où manger
        </h2>
        <div className="space-y-4">
          {food.map((f, i) => (
            <div
              key={i}
              className="flex gap-4 items-start p-5 rounded-xl bg-gray-50gray-dark border border-gray-100"
            >
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{f.name}</h3>
                <p className="text-gray-600 text-sm">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
