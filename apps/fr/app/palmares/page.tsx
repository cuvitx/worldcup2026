import { Breadcrumb } from "@repo/ui/breadcrumb";
import type { Metadata } from "next";

import { editions, countryRecords, records } from "./_components/palmares-data";
import { PalmaresHero } from "./_components/PalmaresHero";
import { PalmaresByCountry } from "./_components/PalmaresByCountry";
import { PalmaresTimeline } from "./_components/PalmaresTimeline";
import { FinalesTable } from "./_components/FinalesTable";
import { RecordsSection } from "./_components/RecordsSection";
import { PalmaresSection2026 } from "./_components/PalmaresSection2026";

export const metadata: Metadata = {
  title: "Palmarès Coupe du Monde FIFA | Historique 1930–2022",
  description:
    "Palmarès complet de la Coupe du Monde FIFA de 1930 à 2022. Tous les vainqueurs, finalistes, scores, records et statistiques historiques. Qui a le plus de titres ?",
  alternates: {
    canonical: "https://cdm2026.fr/palmares",
  },
  openGraph: {
    title: "Palmarès CDM FIFA 1930–2022",
    description:
      "Tous les champions du Monde depuis 1930 : Brésil 5 titres, Allemagne 4, Italie 4, Argentine 3…",
    url: "https://cdm2026.fr/palmares",
  },
};

export default function PalmaresPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Palmarès" },
        ]}
      />

      <PalmaresHero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        <PalmaresByCountry countryRecords={countryRecords} />
        <PalmaresTimeline editions={editions} />
        <FinalesTable editions={editions} />
        <RecordsSection records={records} />
        <PalmaresSection2026 />
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Palmarès Coupe du Monde FIFA 1930–2022",
            description: "Liste complète des vainqueurs de la Coupe du Monde FIFA",
            numberOfItems: editions.length,
            itemListElement: editions.map((ed, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: `CDM ${ed.year} — ${ed.winner} champion`,
            })),
          }),
        }}
      />
    </>
  );
}
