import { SectionHeading } from "@repo/ui/section-heading";

interface WhyTheyCanWinAnalysis {
  narrative: string;
  keyPlayer: string;
  keyPlayerDesc: string;
  tacticalEdge: string;
  xFactor: string;
  betOdds: string;
}

interface WhyTheyCanWinProps {
  top10: Array<{
    pred: {
      winnerProb: number;
    };
    team: {
      id: string;
      name: string;
      flag: string;
      bestResult: string;
    };
  }>;
  whyTheyCanWin: Record<string, WhyTheyCanWinAnalysis>;
}

export function WhyTheyCanWin({ top10, whyTheyCanWin }: WhyTheyCanWinProps) {
  return (
    <section id="analyse-top5" className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Pourquoi ils peuvent gagner — Analyse top 5" subtitle="Décryptage en profondeur des 5 équipes les plus probables de soulever le trophée" />

        <div className="space-y-6">
          {top10.slice(0, 5).map(({ team, pred }, index) => {
            if (!team) return null;
            const analysis = whyTheyCanWin[team.id];
            if (!analysis) return null;
            const winPct = (pred.winnerProb * 100).toFixed(1);

            return (
              <div
                key={team.id}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg ${
                    index === 0 ? "bg-accent/20 text-accent border-2 border-accent/50" :
                    index === 1 ? "bg-gray-200 text-gray-700" :
                    index === 2 ? "bg-primary/10 text-primary" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-4xl">{team.flag}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-sm text-primary font-bold">{winPct}% de chance de titre</span>
                      <span className="text-sm text-accent font-bold">Cote {analysis.betOdds}</span>
                      <span className="text-xs text-gray-600">{team.bestResult}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  {/* Narrative */}
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Notre analyse
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {analysis.narrative}
                    </p>
                  </div>

                  {/* Key info */}
                  <div className="space-y-3">
                    <div className="rounded-xl bg-accent/5 border border-accent/10 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-accent mb-1">
                        Joueur clé
                      </p>
                      <p className="text-sm font-bold text-gray-900">{analysis.keyPlayer}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{analysis.keyPlayerDesc}</p>
                    </div>
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-primary mb-1">
                        Avantage tactique
                      </p>
                      <p className="text-xs text-gray-600">{analysis.tacticalEdge}</p>
                    </div>
                    <div className="rounded-xl bg-accent/5 border border-accent/20 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-accent mb-1">
                        Facteur X
                      </p>
                      <p className="text-xs text-gray-600">{analysis.xFactor}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
