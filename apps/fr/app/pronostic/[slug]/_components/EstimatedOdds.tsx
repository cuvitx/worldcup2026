import { estimatedOutrightOdds, probToOdds } from "@repo/data/affiliates";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

const formatProb = (p: number) =>
  p >= 0.01 ? `${(p * 100).toFixed(1)}%` : p >= 0.001 ? `${(p * 100).toFixed(2)}%` : `${(p * 100).toFixed(3)}%`;

interface EstimatedOddsProps {
  teamName: string;
  prediction: Prediction;
}

export function EstimatedOdds({ teamName, prediction }: EstimatedOddsProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Cotes estimees - {teamName} vainqueur CDM 2026</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Cote vainqueur CDM</p>
          <p className="text-2xl font-extrabold text-accent sm:text-4xl">{estimatedOutrightOdds(prediction.winnerProb)}</p>
          <p className="text-xs text-gray-500 mt-1">cote decimale estimee</p>
        </div>
        <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Probabilite de victoire</p>
          <p className="text-2xl font-extrabold text-primary sm:text-4xl">{formatProb(prediction.winnerProb)}</p>
          <p className="text-xs text-gray-500 mt-1">selon le modele ELO</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: "Passer les groupes", odds: probToOdds(prediction.groupStageProb) },
          { label: "Atteindre les 8e", odds: probToOdds(prediction.roundOf16Prob) },
          { label: "Atteindre la finale", odds: probToOdds(prediction.finalProb) },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-gray-50 p-3 text-center">
            <p className="text-lg font-bold text-primary">{item.odds}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">
        Les cotes sont calculées a partir du modele ELO avec une marge bookmaker integree (~8%). Elles sont indicatives et peuvent differer des cotes réelles proposees par les opérateurs.
      </p>
    </section>
  );
}
