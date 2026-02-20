import type { MatchPrediction, Team } from "@repo/data";

interface WinProbabilityCardProps {
  prediction: MatchPrediction;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
}

export function WinProbabilityCard({
  prediction,
  home,
  away,
  homeName,
  awayName,
}: WinProbabilityCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="section-header mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-base">
          Probabilités de victoire
        </h2>
      </div>
      <div className="flex items-center justify-around mb-6">
        <div className="text-center">
          <span className="text-3xl">{home?.flag ?? "🏳️"}</span>
          <p className="text-sm font-bold mt-1">{homeName}</p>
          <p className="text-2xl font-extrabold text-primary mt-1">
            {Math.round(prediction.team1WinProb * 100)}%
          </p>
        </div>
        <div className="text-center px-4">
          <p className="text-xs text-gray-500 font-medium">Nul</p>
          <p className="text-xl font-bold text-gray-600 dark:text-gray-300 mt-1">
            {Math.round(prediction.drawProb * 100)}%
          </p>
        </div>
        <div className="text-center">
          <span className="text-3xl">{away?.flag ?? "🏳️"}</span>
          <p className="text-sm font-bold mt-1">{awayName}</p>
          <p className="text-2xl font-extrabold text-amber-500 dark:text-amber-400 mt-1">
            {Math.round(prediction.team2WinProb * 100)}%
          </p>
        </div>
      </div>
      {/* Visual stacked bar */}
      <div className="w-full h-4 rounded-full flex overflow-hidden gap-0.5 shadow-inner bg-gray-100 dark:bg-gray-700">
        <div
          className="h-full bg-primary rounded-l-full transition-all duration-700"
          style={{ width: `${Math.round(prediction.team1WinProb * 100)}%` }}
          title={`${homeName}: ${Math.round(prediction.team1WinProb * 100)}%`}
        />
        <div
          className="h-full bg-gray-400 dark:bg-gray-500 transition-all duration-700"
          style={{ width: `${Math.round(prediction.drawProb * 100)}%` }}
          title={`Nul: ${Math.round(prediction.drawProb * 100)}%`}
        />
        <div
          className="h-full bg-amber-400 rounded-r-full transition-all duration-700"
          style={{ width: `${Math.round(prediction.team2WinProb * 100)}%` }}
          title={`${awayName}: ${Math.round(prediction.team2WinProb * 100)}%`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        <span>{homeName}</span>
        <span>Nul</span>
        <span>{awayName}</span>
      </div>
    </div>
  );
}
