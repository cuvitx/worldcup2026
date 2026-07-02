import {
  affiliateLinkAttributes,
  affiliateTrackingUrl,
  bookmakers,
  type AffiliateTrackingInput,
} from "@repo/data/affiliates";

interface BookmakerOffersProps {
  /** Attribution de la page hote ; le placement final devient `offers-<bookmaker>`. */
  tracking: AffiliateTrackingInput;
  title?: string;
  subtitle?: string;
}

/**
 * Comparateur compact des offres de bienvenue des bookmakers partenaires.
 * Capture les visiteurs qui ont deja un compte chez l'un des operateurs :
 * une 2e offre transforme un clic perdu en CPA. Ne rend rien tant que moins
 * de deux programmes sont cables dans AFFILIATE_PROGRAMS.
 */
export function BookmakerOffers({ tracking, title, subtitle }: BookmakerOffersProps) {
  if (bookmakers.length < 2) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
        {title ?? "Comparez les offres de bienvenue"}
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        {subtitle ??
          "Bookmakers agréés ANJ — déjà un compte chez l'un d'eux ? Les autres offres restent valables."}
      </p>

      <div className="mt-4 divide-y divide-gray-100">
        {bookmakers.map((bookmaker) => {
          const offerTracking: AffiliateTrackingInput = {
            pageType: tracking.pageType,
            slug: tracking.slug,
            placement: `offers-${bookmaker.id}`,
          };
          const url = affiliateTrackingUrl(bookmaker.program, offerTracking);
          if (!url) return null;

          return (
            <div
              key={bookmaker.id}
              className="flex flex-wrap items-center gap-3 py-3 sm:flex-nowrap"
            >
              {bookmaker.logo ? (
                <img
                  src={bookmaker.logo}
                  alt={bookmaker.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-lg object-contain"
                />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-black text-primary">
                  {bookmaker.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  {bookmaker.name}
                  {bookmaker.highlight && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                      Top offre
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-gray-600">
                  <span className="font-semibold text-primary">{bookmaker.bonus}</span>{" "}
                  {bookmaker.bonusDetail}
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                {...affiliateLinkAttributes(offerTracking, undefined, bookmaker.program)}
                className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition hover:brightness-110"
              >
                Voir l&apos;offre →
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] leading-4 text-gray-400">
        18+ · Jouez responsablement · joueurs-info-service.fr · 09 74 75 13 13 (appel non
        surtaxé). Bonus soumis aux conditions de chaque opérateur.
      </p>
    </section>
  );
}
