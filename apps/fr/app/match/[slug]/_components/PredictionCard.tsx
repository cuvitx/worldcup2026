import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";
import type { Team } from "@repo/data/types";
import type { MatchPrediction } from "@repo/data/predictions";
import { estimatedMatchOdds, featuredBookmaker } from "@repo/data/affiliates";

interface PredictionCardProps {
  home: Team;
  away: Team;
  prediction: MatchPrediction | undefined;
  isCompleted: boolean;
  matchSlug: string;
}

export function PredictionCard({
  home,
  away,
  prediction,
  isCompleted,
  matchSlug,
}: PredictionCardProps) {
  if (!prediction) {
    return (
      <Card>
        <SectionHeading title={isCompleted ? "Resultat & Analyse" : "Pronostic"} />
        <p className="text-gray-600">
          Les pronostics détaillés seront disponibles prochainement.
        </p>
      </Card>
    );
  }

  const odds = estimatedMatchOdds(
    prediction.team1WinProb,
    prediction.drawProb,
    prediction.team2WinProb
  );

  return (
    <Card>
      <SectionHeading title={isCompleted ? "Resultat & Analyse" : "Pronostic"} />
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-field/10 p-3 text-center">
          <p className="text-xl font-bold text-field">
            {Math.round(prediction.team1WinProb * 100)}%
          </p>
          <p className="text-xs text-gray-500">{home.name}</p>
          <p className="text-sm font-medium text-primary mt-1">{odds.home}</p>
        </div>
        <div className="rounded-lg bg-gray-50slate-700 p-3 text-center">
          <p className="text-xl font-bold text-gray-600">
            {Math.round(prediction.drawProb * 100)}%
          </p>
          <p className="text-xs text-gray-500">Nul</p>
          <p className="text-sm font-medium text-primary mt-1">{odds.draw}</p>
        </div>
        <div className="rounded-lg bg-field/10 p-3 text-center">
          <p className="text-xl font-bold text-field">
            {Math.round(prediction.team2WinProb * 100)}%
          </p>
          <p className="text-xs text-gray-500">{away.name}</p>
          <p className="text-sm font-medium text-primary mt-1">{odds.away}</p>
        </div>
      </div>
      <div className="rounded-lg bg-primary/5 p-3 text-center mb-4">
        <p className="text-sm text-gray-500">Score predit</p>
        <p className="text-2xl font-extrabold text-primary">
          {prediction.predictedScore}
        </p>
      </div>
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-primary text-sm">
              {featuredBookmaker.name}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
            </p>
          </div>
          <Link
            href={`/pronostic-match/${matchSlug}`}
            className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent/90 transition-colors"
          >
            Pronostic →
          </Link>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Cotes estimees, susceptibles d&apos;evoluer. 18+
      </p>
    </Card>
  );
}
