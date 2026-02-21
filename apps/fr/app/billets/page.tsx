import type { Metadata } from "next";
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
import { BilletsToc } from "./_components/BilletsToc";
import { RelatedLinks } from "../components/RelatedLinks";

export const metadata: Metadata = {
  title: "Billets CDM 2026 — Prix, dates et comment acheter | Coupe du Monde",
  description:
    "Billets CDM 2026 : prix officiels (60$–1500$+), dates de vente, arnaques à éviter. Guide complet pour acheter sur FIFA.com en toute sécurité.",
  openGraph: {
    title: "Billets CDM 2026 — Prix, dates et comment acheter",
    description:
      "Guide complet billets FIFA World Cup 2026 : tarifs officiels, calendrier des ventes, catégories Cat 1-4 et hospitalité. Tout pour assister à la CDM 2026.",
    url: "https://www.cdm2026.fr/billets",
  },
  alternates: { canonical: "https://www.cdm2026.fr/billets" },
};

export default function BilletsPage() {
  return (
    <>
<BilletsToc />

      <HeroSection />

      <div className="bg-accent/10 border-b border-accent/30">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <p className="text-sm text-accent">
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
        title=" Questions fréquentes — Billets CDM 2026"
        items={faqItems} 
      />
      <RelatedLinks
        links={[
          {
            href: "/stades",
            title: " Les 16 stades de la CDM 2026",
            description: "Découvrez les stades qui accueilleront les matchs : capacités, villes hôtes et événements prévus.",
            icon: ""
          },
          {
            href: "/match/calendrier",
            title: " Calendrier complet des matchs",
            description: "104 matchs du 11 juin au 19 juillet 2026. Consultez les dates, horaires et stades.",
            icon: ""
          },
          {
            href: "/ou-regarder",
            title: " Où regarder les matchs",
            description: "Chaînes TV, streaming gratuit et payant pour suivre la Coupe du Monde 2026.",
            icon: ""
          }
        ]}
      />
      <BilletsFinalCTA />
    </>
  );
}
