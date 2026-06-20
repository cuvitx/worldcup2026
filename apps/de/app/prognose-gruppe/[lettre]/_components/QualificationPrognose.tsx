import Link from "next/link";
import type { teamsById } from "@/lib/localized-data";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Team = NonNullable<(typeof teamsById)[string]>;
type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface SortedTeam {
  team: Team | undefined;
  pred: Prediction | undefined;
  id: string;
}

interface QualificationPrognoseProps {
  sortedTeams: SortedTeam[];
}

export function QualificationPrognose({ sortedTeams }: QualificationPrognoseProps) {
  const qualified = sortedTeams.slice(0, 2);
  const maybeQualify = sortedTeams[2];
  const eliminated = sortedTeams[3];

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifikationsprognose</h2>
      <p className="text-gray-600 mb-5 text-sm leading-relaxed">
        Im Format der WM 2026 (48 Mannschaften, 12 Gruppen zu je 4){" "}
        <strong>qualifizieren sich die 2 Gruppenersten</strong> direkt für das Achtelfinale.{" "}
        <strong>Die 8 besten Gruppendritten</strong> (von 12) qualifizieren sich ebenfalls.
      </p>

      <div className="mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">Direkt qualifiziert für das Achtelfinale</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {qualified.map(({ team, pred }) => (
            <div key={team!.id} className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-3">
              <span className="text-2xl">{team!.flag}</span>
              <div>
                <Link href={`/prognose/${team!.slug}`} className="font-bold hover:text-primary transition-colors">{team!.name}</Link>
                {pred && <p className="text-xs text-gray-500">ELO {pred.eloRating} · {Math.round(pred.groupStageProb * 100)}% Qualifikation</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {maybeQualify?.team && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">Möglicher bester Gruppendritter</h3>
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <span className="text-2xl">{maybeQualify.team.flag}</span>
            <div>
              <Link href={`/prognose/${maybeQualify.team.slug}`} className="font-bold hover:text-primary transition-colors">{maybeQualify.team.name}</Link>
              {maybeQualify.pred && <p className="text-xs text-gray-500">{Math.round(maybeQualify.pred.groupStageProb * 100)}% Chance als bester Dritter · ELO {maybeQualify.pred.eloRating}</p>}
            </div>
          </div>
        </div>
      )}

      {eliminated?.team && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-red-500 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> In der Gruppenphase ausgeschieden</h3>
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <span className="text-2xl">{eliminated.team.flag}</span>
            <div>
              <span className="font-bold">{eliminated.team.name}</span>
              {eliminated.pred && <p className="text-xs text-gray-500">Nur {Math.round(eliminated.pred.groupStageProb * 100)}% Qualifikationschancen · ELO {eliminated.pred.eloRating}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
