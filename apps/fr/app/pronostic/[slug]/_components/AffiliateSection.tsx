import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";

interface AffiliateSectionProps {
  teamName: string;
}

export function AffiliateSection({ teamName }: AffiliateSectionProps) {
  return (
    <section className="rounded-lg bg-whiteslate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Parier sur {teamName}</h2>
      <p className="mb-6 text-sm text-gray-600">
        Comparez les meilleurs sites de paris sportifs agreees en France pour parier sur {teamName}à la Coupe du Monde 2026.
      </p>
      <div className="space-y-4">
        {bookmakers.map((bk) => {
          const isFeatured = bk.id === featuredBookmaker.id;
          return (
            <div
              key={bk.id}
              className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-4 transition-shadow hover:shadow-md ${
                isFeatured ? "border-primary bg-primary/5" : "border-gray-200 bg-whiteslate-800"
              }`}
            >
              {isFeatured && <span className="absolute -top-3 left-4 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">Recommande</span>}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-lg font-bold">{bk.name}</p>
                <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={bk.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${isFeatured ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"}`}
                >
                  Parier sur {teamName}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-gray-500 text-center">
        Les cotes sont estimees et susceptibles d&apos;evoluer. Pariez responsablement. 18+. Les jeux d&apos;argent et de hasard peuvent être dangereux : pertes d&apos;argent, conflits familiaux, addiction. Appelez le 09 74 75 13 13 (appel non surtaxe).
      </p>
    </section>
  );
}
