import { EXTERNAL_URLS } from "@repo/data/constants";
import Link from "next/link";
import { Ticket } from "lucide-react"

export function TicketsCtaFinal() {
  return (
    <section className="bg-white py-10 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-primary to-primary-dark text-white p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            <Ticket className="h-5 w-5 inline-block" /> Bereit, die WM 2026 live zu erleben?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
            Verpassen Sie nicht das Sportereignis des Jahrhunderts. Registrieren Sie sich auf FIFA.com
            und seien Sie bereit für die nächsten Verkaufsphasen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={EXTERNAL_URLS.FIFA_TICKETS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-accent px-8 py-3.5 font-bold text-white hover:bg-accent/80 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Auf FIFA.com kaufen →
            </a>
            <Link
              href="/stadien"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
            >
               Stadien entdecken
            </Link>
            <Link
              href="/spiel/spielplan"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
            >
               Spielplan anzeigen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
