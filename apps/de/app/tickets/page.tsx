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
import { TicketsFinalCTA } from "./_components/TicketsFinalCTA";
import { TicketsToc } from "./_components/TicketsToc";
import { RelatedLinks } from "../components/RelatedLinks";
import { PmuBanner } from "../components/PmuBanner";

export const metadata: Metadata = {
  title: "Tickets WM 2026 — Preise, Termine und Kaufanleitung | WM",
  description:
    "Tickets WM 2026: offizielle Preise (60$-1500$+), Verkaufstermine, Betrug vermeiden. Vollständiger Guide zum sicheren Kauf auf FIFA.com.",
  openGraph: {
    title: "Tickets WM 2026 — Preise, Termine und Kaufanleitung",
    description:
      "Vollständiger Ticket-Guide FIFA WM 2026: offizielle Preise, Verkaufsphasen, Kategorien Cat 1-4 und Hospitality. Alles für die WM 2026.",
    url: "https://www.wm2026guide.de/Tickets",
  },
  alternates: { canonical: "https://www.wm2026guide.de/Tickets" },
};

export default function TicketsPage() {
  return (
    <>
<TicketsToc />

      <HeroSection />

      <div className="bg-accent/10 border-b border-accent/30">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <p className="text-sm text-accent">
            <strong>Wichtig:</strong> Kaufen Sie nur auf{" "}
            <a href="https://www.fifa.com/en/tournaments/mens/worldcup/26/tickets" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
              fifa.com/tickets
            </a>{" "}
            — das ist der einzige offizielle Kanal. Tickets, die auf anderen Seiten gekauft werden, können annulliert werden.
          </p>
        </div>
      </div>

      <QuickStats />
      <PricesByPhase />
      <HowToBuy />
      <SalePhasesSection />
      <TicketCategoriesSection />
      <AntiScamSection />

      {/* PMU Banner */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PmuBanner tracking="Tickets" />
        </div>
      </section>

      <FAQSection
        title=" Häufige Fragen — Tickets WM 2026"
        items={faqItems}
      />
      <RelatedLinks
        links={[
          {
            href: "/stadien",
            title: " Die 16 Stadien der WM 2026",
            description: "Entdecken Sie die Stadien, die die Spiele austragen werden: Kapazitäten, Austragungsorte und geplante Veranstaltungen.",
            icon: ""
          },
          {
            href: "/spiel/spielplan",
            title: " Vollständiger Spielplan",
            description: "104 Spiele vom 11. Juni bis 19. Juli 2026. Alle Termine, Anstoßzeiten und Stadien.",
            icon: ""
          },
          {
            href: "/wo-schauen",
            title: " Wo die Spiele anschauen",
            description: "TV-Sender, kostenloser und kostenpflichtiger Streaming für die WM 2026.",
            icon: ""
          }
        ]}
      />
      <TicketsFinalCTA />
    </>
  );
}
