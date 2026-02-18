import type { Metadata } from "next";
import Link from "next/link";
import { BracketSimulator } from "./components/BracketSimulator";

export const metadata: Metadata = {
  title: "Simulateur Coupe du Monde 2026 | Créez votre bracket",
  description:
    "Simulez le tableau final de la Coupe du Monde 2026. Choisissez les vainqueurs de chaque match et découvrez votre champion.",
  openGraph: {
    title: "Simulateur Coupe du Monde 2026 | Créez votre bracket",
    description:
      "Simulez le tableau final de la Coupe du Monde 2026. Choisissez les vainqueurs de chaque match et découvrez votre champion.",
  },
};

export default function SimulateurPage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Simulateur</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">
            🏆 Simulateur de Bracket CDM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            Choisissez les vainqueurs de chaque match et découvrez votre
            champion de la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      {/* Simulator */}
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <BracketSimulator />
      </section>

      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://www.coupe-du-monde-2026.fr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Simulateur",
                item: "https://www.coupe-du-monde-2026.fr/simulateur",
              },
            ],
          }),
        }}
      />
    </>
  );
}
