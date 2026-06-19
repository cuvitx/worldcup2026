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
    { label: "Gruppenphase", key: "groupStageProb" as const, value: prediction.groupStageProb },
    { label: "Sechzehntelfinale", key: "roundOf32Prob" as const, value: prediction.roundOf32Prob },
    { label: "Achtelfinale", key: "roundOf16Prob" as const, value: prediction.roundOf16Prob },
    { label: "Viertelfinale", key: "quarterFinalProb" as const, value: prediction.quarterFinalProb },
    { label: "Halbfinale", key: "semiFinalProb" as const, value: prediction.semiFinalProb },
    { label: "Finale", key: "finalProb" as const, value: prediction.finalProb },
    { label: "Sieger", key: "winnerProb" as const, value: prediction.winnerProb },
  ];

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Wahrscheinlichkeiten pro Runde — {teamName}</h2>
      <p className="mb-4 text-sm text-gray-600">
        Geschätzte Wahrscheinlichkeiten für {teamName}, jede Runde der WM 2026 zu erreichen, basierend auf dem ELO-Modell.
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
                className={`absolute inset-y-0 left-0 rounded-full ${stage.key === "winnerProb" ? "bg-accent" : "bg-primary"}`}
                style={{ width: `${Math.max(1, stage.value * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-block h-3 w-3 rounded-full bg-primary" />
        <span>Zwischenrunde</span>
        <span className="ml-2 inline-block h-3 w-3 rounded-full bg-accent" />
        <span>Turniersieg</span>
      </div>
    </section>
  );
}
