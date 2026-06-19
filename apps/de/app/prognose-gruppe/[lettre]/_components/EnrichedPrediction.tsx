import Link from "next/link";
import { teamsById } from "../../../../lib/localized-data";

interface EnrichedTeamPrediction {
  teamId: string;
  predictedPoints: number;
  predictedGoalDiff: number;
  firstProb: number;
  qualifyProb: number;
  rank: number;
}

interface EnrichedPredictionProps {
  enrichedSorted: EnrichedTeamPrediction[];
}

export function EnrichedPrediction({ enrichedSorted }: EnrichedPredictionProps) {
  if (enrichedSorted.length === 0) return null;

  return (
    <section className="rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Detaillierte Prognose — Erwartete Punkte & Tore
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Vorhergesagte Rangliste nach 3 Gruppenspielen · ELO-Modell + Buchmacher-Quoten · Feb. 2026
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Vorherges. Rang</th>
              <th className="px-4 py-3 text-left">Mannschaft</th>
              <th className="px-4 py-3 text-center">Erw. Punkte</th>
              <th className="px-4 py-3 text-center">+/- Tore</th>
              <th className="px-4 py-3 text-center">Prob. 1.</th>
              <th className="px-4 py-3 text-center">Qual.-Prob.</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enrichedSorted.map((ep, idx) => {
              const team = teamsById[ep.teamId];
              const medal = idx === 0 ? "1." : idx === 1 ? "2." : idx === 2 ? "3." : "4.";
              const qualifyBg =
                idx < 2
                  ? "bg-accent/10"
                  : idx === 2
                  ? "bg-primary/5"
                  : "bg-red-50/50";
              const goalDiffStr = ep.predictedGoalDiff > 0 ? `+${ep.predictedGoalDiff}` : `${ep.predictedGoalDiff}`;
              const goalDiffColor =
                ep.predictedGoalDiff > 0 ? "text-accent" : ep.predictedGoalDiff < 0 ? "text-red-500" : "text-gray-500";
              return (
                <tr key={ep.teamId} className={`transition-colors hover:brightness-95 ${qualifyBg}`}>
                  <td className="px-4 py-3 text-center text-xl">{medal}</td>
                  <td className="px-4 py-3">
                    {team ? (
                      <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
                        <span className="text-xl">{team.flag}</span>
                        <span>{team.name}</span>
                      </Link>
                    ) : (
                      <span className="text-gray-500">{ep.teamId}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 font-extrabold text-primary text-base">{ep.predictedPoints}</span>
                  </td>
                  <td className={`px-4 py-3 text-center font-bold text-base ${goalDiffColor}`}>{goalDiffStr}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-gray-700">{Math.round(ep.firstProb * 100)}%</span>
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round(ep.firstProb * 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-xs font-bold ${idx < 2 ? "text-accent" : "text-gray-500"}`}>{Math.round(ep.qualifyProb * 100)}%</span>
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${idx < 2 ? "bg-accent" : idx === 2 ? "bg-accent" : "bg-red-400"}`} style={{ width: `${Math.round(ep.qualifyProb * 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {idx < 2 ? (
                      <span className="inline-block rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">Qualifiziert</span>
                    ) : idx === 2 ? (
                      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Bester 3.</span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Ausgeschieden</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          Erw. Punkte = Gesamtpunktzahl nach 3 Gruppenspielen · +/- Tore = erwartete Tordifferenz · Qual.-Prob. = Qualifikationswahrscheinlichkeit (1. oder 2. direkt + bester Dritter eingeschlossen)
        </p>
      </div>
    </section>
  );
}
