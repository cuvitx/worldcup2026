import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface ProbabilityStagesProps {
  teamName: string;
  prediction: Prediction;
}

const formatProb = (p: number) =>
  p >= 0.01 ? `${(p * 100).toFixed(1)}%` : p >= 0.001 ? `${(p * 100).toFixed(2)}%` : `${(p * 100).toFixed(3)}%`;

export function ProbabilityStages({ teamName, prediction }: ProbabilityStagesProps) {
  const stages = [
    { label: "Phase de groupes", key: "groupStageProb" as const, value: prediction.groupStageProb },
    { label: "32e de finale", key: "roundOf32Prob" as const, value: prediction.roundOf32Prob },
    { label: "8e de finale", key: "roundOf16Prob" as const, value: prediction.roundOf16Prob },
    { label: "Quart de finale", key: "quarterFinalProb" as const, value: prediction.quarterFinalProb },
    { label: "Demi-finale", key: "semiFinalProb" as const, value: prediction.semiFinalProb },
    { label: "Finale", key: "finalProb" as const, value: prediction.finalProb },
    { label: "Vainqueur", key: "winnerProb" as const, value: prediction.winnerProb },
  ];

  return (
    <section className="rounded-lg bg-whiteslate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Probabilites par tour - {teamName}</h2>
      <p className="mb-4 text-sm text-gray-600">
        Probabilites estimees de {teamName} d&apos;atteindre chaque tour de la Coupe du Monde 2026, basees sur le modele ELO.
      </p>
      <div className="space-y-3">
        {stages.map((stage) => (
          <div key={stage.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{stage.label}</span>
              <span className="text-sm font-bold text-primary">{formatProb(stage.value)}</span>
            </div>
            <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${stage.key === "winnerProb" ? "bg-secondary" : "bg-primary"}`}
                style={{ width: `${Math.max(1, stage.value * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-block h-3 w-3 rounded-full bg-primary" />
        <span>Tour intermediaire</span>
        <span className="ml-2 inline-block h-3 w-3 rounded-full bg-secondary" />
        <span>Victoire finale</span>
      </div>
    </section>
  );
}
