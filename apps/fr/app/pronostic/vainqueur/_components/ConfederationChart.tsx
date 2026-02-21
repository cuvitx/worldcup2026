import { SectionHeading } from "@repo/ui/section-heading";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import type { Team } from "@repo/data/types";
import type { TeamPrediction } from "@repo/data/predictions";

interface TopTeam {
  pred: TeamPrediction;
  team: Team;
}

interface ConfederationChartProps {
  top10: TopTeam[];
}

// Confederation colors using design system tokens
const CONFEDERATION_COLORS: Record<
  string,
  { bg: string; border: string; label: string }
> = {
  UEFA: {
    bg: "bg-accent",
    border: "border-accent/60",
    label: "UEFA (Europe)",
  },
  CONMEBOL: {
    bg: "bg-primary",
    border: "border-primary/60",
    label: "CONMEBOL (Amérique du Sud)",
  },
  CONCACAF: {
    bg: "bg-accent",
    border: "border-accent/60",
    label: "CONCACAF (Amérique du Nord)",
  },
  CAF: {
    bg: "bg-primary/70",
    border: "border-primary/20",
    label: "CAF (Afrique)",
  },
  AFC: {
    bg: "bg-primary/70",
    border: "border-primary/60",
    label: "AFC (Asie)",
  },
  OFC: {
    bg: "bg-accent",
    border: "border-accent/60",
    label: "OFC (Océanie)",
  },
};

export function ConfederationChart({ top10 }: ConfederationChartProps) {
  return (
    <section
      id="graphique"
      className="bg-white py-12 border-t border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
         
          title="Chances de titre par confédération"
          subtitle="Barres proportionnelles aux probabilités — colorées par confédération"
        />

        {/* Légende confédérations */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(CONFEDERATION_COLORS).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <span className={`inline-block w-3 h-3 rounded-sm ${val.bg}`} />
              <span className="text-gray-600">{val.label}</span>
            </div>
          ))}
        </div>

        {/* Barres horizontales */}
        <div className="space-y-2.5">
          {top10.map(({ pred, team }, index) => {
            const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
            const barWidth = Math.min(pred.winnerProb * 100 * 7, 100);
            const conf =
              CONFEDERATION_COLORS[team.confederation] ??
              CONFEDERATION_COLORS["UEFA"]!;
            const approxOdds = estimatedOutrightOdds(pred.winnerProb);

            return (
              <div key={team.id} className="flex items-center gap-3">
                <span className="shrink-0 w-6 text-right text-xs font-bold text-gray-600">
                  {index + 1}
                </span>
                <div className="flex items-center gap-1.5 w-24 sm:w-36 shrink-0">
                  <span className="text-lg sm:text-xl shrink-0">{team.flag}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 break-words leading-tight">
                    {team.name}
                  </span>
                </div>
                <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full ${conf.bg} opacity-85 rounded-lg transition-all duration-700 flex items-center pl-3`}
                    style={{ width: `${barWidth}%` }}
                  >
                    <span className="text-[10px] font-bold text-white whitespace-nowrap">
                      {winPct < 1 ? "<1" : winPct}%
                    </span>
                  </div>
                </div>
                <span className="shrink-0 w-14 text-right text-sm font-bold text-accent">
                  {approxOdds}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-gray-600">
          * Largeur des barres proportionnelle à la probabilité de remporter le titre
          (modèle ELO). Les cotes sont indicatives.
        </div>
      </div>
    </section>
  );
}
