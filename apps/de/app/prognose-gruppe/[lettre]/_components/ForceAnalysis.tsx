import Link from "next/link";
import { probToOdds } from "@repo/data/affiliates";
import type { teamsById } from "@repo/data/teams";
import type { predictionsByTeamId } from "@repo/data/predictions";
import { Shirt } from "lucide-react"

type Team = NonNullable<(typeof teamsById)[string]>;
type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface SortedTeam {
  team: Team | undefined;
  pred: Prediction | undefined;
  id: string;
}

interface ForceAnalysisProps {
  sortedTeams: SortedTeam[];
  groupLetter: string;
}

export function ForceAnalysis({ sortedTeams, groupLetter }: ForceAnalysisProps) {
  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse der Mannschaftsstärken</h2>
      <div className="space-y-4">
        {sortedTeams.map(({ team, pred }) => (
          <div key={team!.id} className="border-l-4 border-primary/20 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{team!.flag}</span>
              <Link href={`/mannschaft/${team!.slug}`} className="font-bold hover:text-primary transition-colors">{team!.name}</Link>
              <span className="text-xs text-gray-400">(#{team!.fifaRanking > 0 ? team!.fifaRanking : "—"} FIFA{pred ? `, ELO ${pred.eloRating}` : ""})</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {team!.description
                ? team!.description.slice(0, 250) + (team!.description.length > 250 ? "…" : "")
                : `${team!.name} bestreitet die Gruppe ${groupLetter} mit dem Ziel, sich für das Achtelfinale zu qualifizieren.`}
            </p>
            {pred && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-1">Titel: {probToOdds(pred.winnerProb)}</span>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-1"><Shirt className="h-5 w-5 inline-block" /> Finale: {Math.round(pred.finalProb * 100)}%</span>
                <span className="rounded-full bg-field/10 border border-field/20 px-2 py-1">Gruppe: {Math.round(pred.groupStageProb * 100)}%</span>
                <Link href={`/Prognose/${team!.slug}`} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-1 text-primary hover:bg-primary/20 transition-colors">Vollständige Prognose anzeigen →</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
