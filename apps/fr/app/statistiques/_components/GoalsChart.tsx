"use client";

interface EditionData {
  year: number;
  goals: number;
  teams: number;
  matches: number;
  avg: number;
}

interface GoalsChartProps {
  goalsByEdition: EditionData[];
}

export function GoalsChart({ goalsByEdition }: GoalsChartProps) {
  const maxGoals = Math.max(...goalsByEdition.map((e) => e.goals));

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[600px]">
        {/* Barres verticales */}
        <div className="flex items-end gap-1.5 h-48 px-1">
          {goalsByEdition.map((ed) => {
            const heightPct = Math.round((ed.goals / maxGoals) * 100);
            const isRecord = ed.goals === maxGoals;
            return (
              <div key={ed.year} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="relative w-full rounded-t-sm transition-all duration-700 hover:opacity-90 cursor-default"
                  style={{
                    height: `${heightPct}%`,
                    background: isRecord
                      ? "linear-gradient(to top, var(--color-gold), #ffc933)"
                      : "linear-gradient(to top, var(--color-primary), var(--color-accent))",
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {ed.goals} buts · {ed.avg}/match
                  </div>
                </div>
                <span className="text-[10px] text-gray-600 rotate-45 origin-left translate-y-3 whitespace-nowrap">
                  {goalsByEdition.indexOf(ed) % 2 === 0 ? ed.year : ""}
                </span>
              </div>
            );
          })}
        </div>
        {/* Légende */}
        <div className="mt-6 flex items-center gap-4 justify-center text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
            Record (172 buts en 2022)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primaryprimary inline-block" />
            Autres éditions
          </span>
        </div>
      </div>
    </div>
  );
}
