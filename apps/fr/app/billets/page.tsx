import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

import { faqItems } from "./_components/data";
import { HeroSection } from "./_components/HeroSection";
import { QuickStats } from "./_components/QuickStats";
import { PricesByPhase } from "./_components/PricesByPhase";
import { HowToBuy } from "./_components/HowToBuy";
import { SalePhasesSection } from "./_components/SalePhasesSection";
import { TicketCategoriesSection } from "./_components/TicketCategoriesSection";
import { AntiScamSection } from "./_components/AntiScamSection";
import { BilletsFaqSection } from "./_components/BilletsFaqSection";
import { BilletsFinalCTA } from "./_components/BilletsFinalCTA";

export const metadata: Metadata = {
  title: "Billets CDM 2026 — Prix, dates et comment acheter | Coupe du Monde",
  description:
    "Billets CDM 2026 : prix officiels (60$–1500$+), dates de vente, arnaques à éviter. Guide complet pour acheter sur FIFA.com en toute sécurité.",
  openGraph: {
    title: "Billets CDM 2026 — Prix, dates et comment acheter",
    description:
      "Guide complet billets FIFA World Cup 2026 : tarifs officiels, calendrier des ventes, catégories Cat 1-4 et hospitalité. Tout pour assister à la CDM 2026.",
    url: "https://cdm2026.fr/billets",
  },
};

export default function BilletsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Billets CDM 2026", item: "https://cdm2026.fr/billets" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Billets CDM 2026", url: "/billets" },
        ]}
        baseUrl={domains.fr}
      />

      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Billets CDM 2026</li>
          </ol>
        </div>
      </nav>

      <HeroSection />

      <div className="bg-accent//10 dark:bg-accent//10 border-b border-accent//30 dark:border-accent//20">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-start gap-3">
          <span className="text-accent shrink-0 mt-0.5">⚠️</span>
          <p className="text-sm text-accent dark:text-accent">
            <strong>Important :</strong> Achetez uniquement sur{" "}
            <a href="https://www.fifa.com/en/tournaments/mens/worldcup/26/tickets" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
              fifa.com/tickets
            </a>{" "}
            — c&apos;est le seul canal officiel. Tout billet acheté sur un autre site peut être annulé.
          </p>
        </div>
      </div>

      <QuickStats />
      <PricesByPhase />
      <HowToBuy />
      <SalePhasesSection />
      <TicketCategoriesSection />
      <AntiScamSection />
      <BilletsFaqSection />
      <BilletsFinalCTA />
    </>
  );
}
