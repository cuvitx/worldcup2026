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
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Vorhergesagtes Ergebnis</h2>
      <div className="flex items-center justify-center gap-4 sm:gap-6 rounded-lg bg-primary/5 p-4 sm:p-8">
        <div className="text-center min-w-0 flex-1">
          <span className="text-3xl" role="img" aria-label={`Flagge von ${home?.name ?? "Unbekannt"}`}>{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
          <p className="mt-1 text-xs sm:text-sm font-medium text-gray-600 truncate">
            {homeName}
          </p>
        </div>
        <p className="text-3xl font-extrabold text-primary tracking-wider sm:text-5xl shrink-0">
          {prediction.predictedScore}
        </p>
        <div className="text-center min-w-0 flex-1">
          <span className="text-3xl" role="img" aria-label={`Flagge von ${away?.name ?? "Unbekannt"}`}>{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
          <p className="mt-1 text-xs sm:text-sm font-medium text-gray-600 truncate">
            {awayName}
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        Wahrscheinlichstes Ergebnis laut unserem Prognosemodell, basierend auf ELO-Ratings,
        aktuellen Statistiken und dem Direktvergleich.
      </p>
    </section>
  );
}
