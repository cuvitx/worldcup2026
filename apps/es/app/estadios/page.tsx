import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";

export const metadata: Metadata = {
  title: "Los 16 estadios del Mundial 2026 | Capacidad, Ciudad & Partidos",
  description:
    "Guia completa de los 16 estadios de la Copa del Mundo 2026. Capacidad, ciudad, pais, partidos programados e informacion practica.",
};

export default function StadiumsPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "Estados Unidos",
    Canada: "Canada",
    Mexico: "Mexico",
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Estadios</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Los 16 estadios del Mundial 2026</h1>
          <p className="mt-2 text-gray-300">
            11 estadios en Estados Unidos, 3 en Mexico y 2 en Canada albergaran los 104 partidos.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{countryLabels[country]} ({countryStadiums.length} estadios)</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/estadio/${stadium.slug}`}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <p className="font-semibold">{stadium.name}</p>
                      <p className="text-sm text-gray-500">
                        {city?.name ?? stadium.city} &middot; {stadium.capacity.toLocaleString("es-ES")} plazas
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {stadium.roofType === "retractable" ? "Techo retractil" : stadium.roofType === "fixed" ? "Techo fijo" : "Al aire libre"}
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
