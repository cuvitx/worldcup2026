import type { Team } from "@repo/data";

interface PremiumHistoryProps {
  team: Team;
}

export function PremiumHistory({ team }: PremiumHistoryProps) {
  // Generic history section based on team data
  return (
    <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📜 Historique en Coupe du Monde
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          {team.wcAppearances} {team.wcAppearances > 1 ? 'participations' : 'participation'}. Meilleur résultat : {team.bestResult}
        </p>

        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Participations
              </p>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {team.wcAppearances}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-2">
                Meilleur résultat
              </p>
              <p className="text-lg font-bold text-accent">
                {team.bestResult}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {team.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
