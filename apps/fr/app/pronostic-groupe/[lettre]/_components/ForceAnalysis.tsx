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
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse des forces en présence</h2>
      <div className="space-y-4">
        {sortedTeams.map(({ team, pred }) => (
          <div key={team!.id} className="border-l-4 border-primary/20 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{team!.flag}</span>
              <Link href={`/equipe/${team!.slug}`} className="font-bold hover:text-primary transition-colors">{team!.name}</Link>
              <span className="text-xs text-gray-400">(#{team!.fifaRanking > 0 ? team!.fifaRanking : "—"} FIFA{pred ? `, ELO ${pred.eloRating}` : ""})</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {team!.description
                ? team!.description.slice(0, 250) + (team!.description.length > 250 ? "…" : "")
                : `${team!.name} disputera le Groupe ${groupLetter} avec l'objectif de se qualifier pour les huitièmes de finale.`}
            </p>
            {pred && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-primary/10secondary/20 border border-primary/20 px-2 py-1">Titre : {probToOdds(pred.winnerProb)}</span>
                <span className="rounded-full bg-primary/10primary/20 border border-primary/20 px-2 py-1"><Shirt className="h-5 w-5 inline-block" /> Finale : {Math.round(pred.finalProb * 100)}%</span>
                <span className="rounded-full bg-field/10field/20 border border-field/20 px-2 py-1">Groupe : {Math.round(pred.groupStageProb * 100)}%</span>
                <Link href={`/pronostic/${team!.slug}`} className="rounded-full bg-primary/10 border border-primary/20 px-2 py-1 text-primary hover:bg-primary/20 transition-colors">Voir pronostic complet →</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
