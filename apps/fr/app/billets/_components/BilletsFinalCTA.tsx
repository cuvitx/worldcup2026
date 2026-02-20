import { EXTERNAL_URLS } from "@repo/data/constants";
import Link from "next/link";

export function BilletsFinalCTA() {
  return (
    <section className="bg-white dark:bg-slate-900 py-10 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-primary to-primary-dark text-white p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            🎟️ Prêt à vivre la CDM 2026 en direct ?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
            Ne manquez pas l&apos;événement sportif du siècle. Inscrivez-vous sur FIFA.com
            et soyez prêt pour les prochaines phases de vente.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={EXTERNAL_URLS.FIFA_TICKETS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-8 py-3 font-bold text-white hover:bg-accent/80 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Acheter sur FIFA.com →
            </a>
            <Link
              href="/stades"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
            >
              🏟️ Découvrir les stades
            </Link>
            <Link
              href="/match/calendrier"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
            >
              📅 Calendrier des matchs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
