import type { Metadata } from "next";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const metadata: Metadata = {
  title: "Calendrier CDM 2026 — Version imprimable",
  robots: { index: false, follow: false },
};

function teamName(id: string): string {
  return teamsById[id]?.name ?? id;
}

function stadiumName(id: string): string {
  return stadiumsById[id]?.name ?? id;
}

function stageLabel(stage: string, group?: string): string {
  if (stage === "group" && group) return `Groupe ${group}`;
  const labels: Record<string, string> = {
    round32: "32es de finale",
    round16: "8es de finale",
    quarter: "Quart de finale",
    semi: "Demi-finale",
    "third-place": "Petite finale",
    final: "Finale",
  };
  return labels[stage] ?? stage;
}

export default function CalendrierImprimerPage() {
  const matchesByDate = new Map<string, typeof matches>();
  for (const m of matches) {
    const list = matchesByDate.get(m.date) ?? [];
    list.push(m);
    matchesByDate.set(m.date, list);
  }
  const sortedDates = [...matchesByDate.keys()].sort();

  return (
    <div className="print-calendar mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-calendar, .print-calendar * { visibility: visible; }
          .print-calendar { position: absolute; left: 0; top: 0; width: 100%; font-size: 10px; }
          .no-print { display: none !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; }
          h2 { page-break-after: avoid; }
        }
        @media screen {
          .print-calendar table { width: 100%; border-collapse: collapse; }
          .print-calendar th, .print-calendar td { border: 1px solid #334155; padding: 4px 8px; text-align: left; }
          .print-calendar th { background: #1e293b; color: white; }
        }
      `}</style>

      <div className="no-print mb-6 flex gap-3">
        <button
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          id="print-btn"
        >
          🖨️ Imprimer
        </button>
        <a
          href="/match/calendrier"
          className="rounded-lg border border-gray-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          ← Retour au calendrier
        </a>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('print-btn')?.addEventListener('click',()=>window.print())`,
        }}
      />

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        🏆 Calendrier Coupe du Monde 2026
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        104 matchs · 11 juin – 19 juillet 2026 · USA / Mexique / Canada
      </p>

      {sortedDates.map((date) => {
        const dayMatches = matchesByDate.get(date)!;
        const formatted = new Date(date + "T12:00:00Z").toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white capitalize">
              {formatted}
            </h2>
            <div className="overflow-x-auto"><table>
              <thead>
                <tr>
                  <th className="w-16">Heure</th>
                  <th>Match</th>
                  <th className="w-32">Phase</th>
                  <th className="hidden sm:table-cell">Stade</th>
                </tr>
              </thead>
              <tbody>
                {dayMatches
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((m) => (
                    <tr key={m.id} className="text-gray-800 dark:text-gray-200">
                      <td className="font-mono text-xs">{m.time}</td>
                      <td className="font-semibold">
                        {teamName(m.homeTeamId)} vs {teamName(m.awayTeamId)}
                      </td>
                      <td className="text-xs">{stageLabel(m.stage, m.group)}</td>
                      <td className="hidden sm:table-cell text-xs text-gray-500 dark:text-gray-400">
                        {stadiumName(m.stadiumId)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table></div>
          </div>
        );
      })}
    </div>
  );
}
