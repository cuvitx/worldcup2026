import type { Team, MatchPrediction } from "@repo/data";

interface PredictedScoreProps {
  prediction: MatchPrediction;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
}

export function PredictedScore({
  prediction,
  home,
  away,
  homeName,
  awayName,
}: PredictedScoreProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Score exact predit</h2>
      <div className="flex items-center justify-center gap-6 rounded-lg bg-primary/5 p-8">
        <div className="text-center">
          <span className="text-3xl" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
          <p className="mt-1 text-sm font-medium text-gray-600">
            {homeName}
          </p>
        </div>
        <p className="text-5xl font-extrabold text-primary tracking-wider">
          {prediction.predictedScore}
        </p>
        <div className="text-center">
          <span className="text-3xl" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
          <p className="mt-1 text-sm font-medium text-gray-600">
            {awayName}
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        Score le plus probable selon notre modele de prediction base sur les ratings ELO,
        les statistiques récentes et l&apos;historique des confrontations.
      </p>
    </section>
  );
}
