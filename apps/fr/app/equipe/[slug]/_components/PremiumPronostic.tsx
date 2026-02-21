import type { Team } from "@repo/data";
import type { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers } from "@repo/data/affiliates";
import type { TeamEditorialContent } from "@repo/data/team-content";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface PremiumPronosticProps {
  team: Team;
  prediction: Prediction | undefined;
  content: TeamEditorialContent | undefined;
}

export function PremiumPronostic({ team, prediction, content }: PremiumPronosticProps) {
  const strengths = content?.strengths ?? [];
  const weaknesses = content?.weaknesses ?? [];

  return (
    <section className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pronostic {team.name} — Cotes &amp; Analyse
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bookmaker odds */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cotes vainqueur CDM 2026 — {team.name}
            </h3>
            <div className="space-y-2">
              {bookmakers.map((bm) => {
                const baseOdds = prediction ? prediction.winnerProb : null;
                const variations = [0.95, 1.0, 1.05, 0.9, 1.02];
                const idx = bookmakers.findIndex((b) => b.id === bm.id);
                const displayOdds = baseOdds
                  ? (baseOdds * variations[idx % variations.length]!).toFixed(2)
                  : "—";

                return (
                  <a
                    key={bm.id}
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50-700 px-4 py-2.5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    {bm.logo && <img src={bm.logo} alt={bm.name} className="w-6 h-6 rounded object-contain shrink-0" loading="lazy" />}
                    <span className="flex-1 font-medium text-sm text-gray-800 group-hover:text-primary transition-colors">
                      {bm.name}
                    </span>
                    <span className="text-xs text-accent font-semibold">{bm.bonus}</span>
                    <span className="odds-badge text-base font-extrabold">{displayOdds}</span>
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-400">
              * Cotes indicatives. Vérifiez en temps réel sur chaque site. 18+ · Jeu responsable.
            </p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="space-y-4">
            {strengths.length > 0 && (
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-5">
                <h3 className="text-lg font-semibold text-accent mb-3">
                  Forces
                </h3>
                <ul className="space-y-1.5">
                  {strengths.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-accent">
                      <span className="shrink-0 mt-0.5">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {weaknesses.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50red-900/15 p-5">
                <h3 className="text-lg font-semibold text-red-700 mb-3">
                  Points de vigilance
                </h3>
                <ul className="space-y-1.5">
                  {weaknesses.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <span className="shrink-0 mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
