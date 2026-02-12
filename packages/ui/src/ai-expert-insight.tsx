interface ValueBet {
  market: string;
  selection: string;
  bookmakerOdds: number;
  modelProbability: number;
  edge: number;
  confidence: number;
  reasoning: string;
}

interface AiExpertInsightProps {
  valueBets: ValueBet[];
  matchAnalysis: string;
  scorePrediction: string;
  keyInsight: string;
}

function ConfidenceStars({ count }: { count: number }) {
  return (
    <span className="text-gold">
      {"★".repeat(Math.min(count, 5))}
      {"☆".repeat(Math.max(0, 5 - count))}
    </span>
  );
}

export function AiExpertInsight({ valueBets, matchAnalysis, scorePrediction, keyInsight }: AiExpertInsightProps) {
  return (
    <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-bold text-accent">Analyse Expert</h2>
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          Claude IA
        </span>
      </div>

      {keyInsight && (
        <div className="mb-4 rounded-lg bg-white p-4 border border-accent/20">
          <p className="text-sm font-semibold text-accent mb-1">Insight cle</p>
          <p className="text-gray-700">{keyInsight}</p>
        </div>
      )}

      {matchAnalysis && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">{matchAnalysis}</p>
        </div>
      )}

      {scorePrediction && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">Score predit</p>
          <p className="text-3xl font-extrabold text-primary">{scorePrediction}</p>
        </div>
      )}

      {valueBets.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Value Bets detectes
          </h3>
          <div className="space-y-3">
            {valueBets.map((bet, i) => (
              <div key={i} className="rounded-lg bg-white p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">{bet.market}</span>
                    <p className="font-bold text-gray-900">{bet.selection}</p>
                  </div>
                  <ConfidenceStars count={bet.confidence} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                  <div>
                    <p className="text-gray-500">Cote</p>
                    <p className="font-mono font-bold">{bet.bookmakerOdds.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Proba modele</p>
                    <p className="font-mono font-bold">{Math.round(bet.modelProbability * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Edge</p>
                    <p className={`font-mono font-bold ${bet.edge > 0 ? "text-green-600" : "text-red-600"}`}>
                      {bet.edge > 0 ? "+" : ""}{Math.round(bet.edge * 100)}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{bet.reasoning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Analyse generee par IA. Ne constitue pas un conseil de paris. 18+. Jouez responsablement.
      </p>
    </div>
  );
}
