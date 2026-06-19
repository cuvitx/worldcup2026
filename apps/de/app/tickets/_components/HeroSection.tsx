import { EXTERNAL_URLS } from "@repo/data/constants";
import { Ticket } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-animated text-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
            <Ticket className="h-5 w-5 inline-block" /> Offizieller Guide
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            <Ticket className="h-5 w-5 inline-block" /> Tickets WM 2026: Preise, Termine & Betrug vermeiden
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Von 60 $ für die Gruppenphase bis 1.500 $+ für das Finale. Alles, um
            zum richtigen Preis, zum richtigen Zeitpunkt zu kaufen — ohne betrogen zu werden.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={EXTERNAL_URLS.FIFA_TICKETS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg w-full sm:w-auto"
            >
              <Ticket className="h-5 w-5 inline-block" /> Auf FIFA.com kaufen (offiziell)
            </a>
            <a href="#prix" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-all w-full sm:w-auto">
               Preise anzeigen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
