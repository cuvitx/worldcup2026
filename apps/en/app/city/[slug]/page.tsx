import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};

  return {
    title: `${city.name} - Host City World Cup 2026 | Complete Guide`,
    description: `Complete guide to ${city.name} for the 2026 World Cup. Hotels, transport, stadiums and activities. ${city.description}`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const cityStadiums = city.stadiumIds
    .map((id) => stadiumsById[id])
    .filter((s): s is NonNullable<typeof s> => s != null);

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{city.name}</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">{city.name}</h1>
          <p className="mt-2 text-gray-300">
            {city.state}, {city.country} &middot; WC 2026 Host City
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{city.description}</p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                World Cup {cityStadiums.length > 1 ? "Stadiums" : "Stadium"}
              </h2>
              <div className="space-y-4">
                {cityStadiums.map((stadium) => (
                  <Link
                    key={stadium.id}
                    href={`/stadium/${stadium.slug}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <div>
                      <p className="font-semibold">{stadium.name}</p>
                      <p className="text-sm text-gray-500">
                        {stadium.capacity.toLocaleString("en-US")} seats &middot;
                        Roof {stadium.roofType === "retractable" ? "retractable" : stadium.roofType === "fixed" ? "fixed" : "open"}
                      </p>
                    </div>
                    <span className="text-accent">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Practical Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {(city.population / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-500">Metro Population</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{city.timezone.split("/").pop()?.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-500">Timezone</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">City Profile</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Country</dt>
                  <dd className="font-medium">{city.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">State/Province</dt>
                  <dd className="font-medium">{city.state}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Population</dt>
                  <dd className="font-medium">{city.population.toLocaleString("en-US")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Timezone</dt>
                  <dd className="font-medium">{city.timezone}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Other Host Cities</h3>
              <ul className="space-y-2 text-sm">
                {cities
                  .filter((c) => c.id !== city.id)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={`/city/${c.slug}`} className="hover:text-accent">
                        {c.name} ({c.country})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Hotels in {city.name}</h3>
              <p className="text-sm text-gray-600">
                Find the best hotels near the stadiums for the 2026 World Cup.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "City",
            name: city.name,
            containedInPlace: {
              "@type": "Country",
              name: city.country,
            },
          }),
        }}
      />
    </>
  );
}
