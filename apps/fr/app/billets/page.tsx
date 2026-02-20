import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";

import { faqItems } from "./_components/data";
import { HeroSection } from "./_components/HeroSection";
import { QuickStats } from "./_components/QuickStats";
import { PricesByPhase } from "./_components/PricesByPhase";
import { HowToBuy } from "./_components/HowToBuy";
import { SalePhasesSection } from "./_components/SalePhasesSection";
import { TicketCategoriesSection } from "./_components/TicketCategoriesSection";
import { AntiScamSection } from "./_components/AntiScamSection";
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
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Billets CDM 2026" },
        ]}
      />

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
      <FAQSection 
        title="❓ Questions fréquentes — Billets CDM 2026"
        items={faqItems} 
      />
      <BilletsFinalCTA />
    </>
  );
}
