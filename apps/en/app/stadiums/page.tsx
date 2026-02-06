import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";

export const metadata: Metadata = {
  title: "All 16 World Cup 2026 Stadiums | Capacity, City & Matches",
  description:
    "Complete guide to the 16 stadiums of the 2026 World Cup. Capacity, city, country, scheduled matches and practical information.",
};

export default function StadiumsPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "United States",
    Canada: "Canada",
    Mexico: "Mexico",
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Stadiums</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">All 16 World Cup 2026 Stadiums</h1>
          <p className="mt-2 text-gray-300">
            11 stadiums in the United States, 3 in Mexico and 2 in Canada will host the 104 matches.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{countryLabels[country]} ({countryStadiums.length} stadiums)</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stadium/${stadium.slug}`}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <p className="font-semibold">{stadium.name}</p>
                      <p className="text-sm text-gray-500">
                        {city?.name ?? stadium.city} &middot; {stadium.capacity.toLocaleString("en-US")} seats
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {stadium.roofType === "retractable" ? "Retractable roof" : stadium.roofType === "fixed" ? "Fixed roof" : "Open air"}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
