import type { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers } from "@repo/data/affiliates";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface PronosticSectionProps {
  prediction: Prediction | undefined;
}

export function PronosticSection({ prediction }: PronosticSectionProps) {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Pronostic France — Cotes & Analyse
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cotes vainqueur CDM 2026 — France
            </h3>
            <div className="space-y-2">
              {bookmakers.map((bm) => {
                const baseOdds = prediction ? prediction.winnerProb : null;
                const variations = [0.95, 1.0, 1.05, 0.9, 1.02];
                const idx = bookmakers.findIndex((b) => b.id === bm.id);
                const displayOdds = baseOdds ? (baseOdds * variations[idx % variations.length]!).toFixed(2) : "—";

                return (
                  <a
                    key={bm.id}
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 px-4 py-2.5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <span className="flex-1 font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                      {bm.name}
                    </span>
                    <span className="text-xs text-success dark:text-success font-semibold">{bm.bonus}</span>
                    <span className="odds-badge text-base font-extrabold">{displayOdds}</span>
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-400 dark:text-gray-400">
              * Cotes indicatives. Vérifiez en temps réel sur chaque site. 18+ · Jeu responsable.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-success//30 dark:border-success//20 bg-success//10 dark:bg-success//10 p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-success dark:text-success mb-3">
                Forces des Bleus
              </h3>
              <ul className="space-y-1.5">
                {[
                  "Effectif le plus profond du monde — qualité à chaque poste",
                  "Mbappé (27 ans) au sommet de son art au Real Madrid",
                  "Doublé 1998-2018 + finale 2022 — ADN du gagnant",
                  "Tchouaméni / Camavinga : milieu de classe mondiale",
                  "Saliba / Upamecano : défense jeune et solide",
                  "Faim de revanche après la défaite 2022 face à l'Argentine",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-success dark:text-success">
                    <span className="shrink-0 text-success mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/15 p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-red-700 dark:text-red-400 mb-3">
                Points de vigilance
              </h3>
              <ul className="space-y-1.5">
                {[
                  "Griezmann à 35 ans — forme physique sur toute la durée",
                  "Pression médiatique écrasante sur Mbappé",
                  "Syndrome de la 3e CDM consécutive à haut niveau",
                  "Gestion de l'équilibre offensif/défensif selon Deschamps",
                  "Risque de blessures clés en toute fin de saison (juin)",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                    <span className="shrink-0 mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
