import type { Team } from "@repo/data";
import type { TeamEditorialContent } from "@repo/data/team-content";

interface PremiumAnecdotesProps {
  team: Team;
  content: TeamEditorialContent | undefined;
}

export function PremiumAnecdotes({ team, content }: PremiumAnecdotesProps) {
  const anecdotes = content?.anecdotes ?? [];
  if (anecdotes.length === 0) return null;

  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Les anecdotes marquantes — {team.name}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {anecdotes.map((anecdote) => (
            <div
              key={anecdote.year + anecdote.title}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{anecdote.icon}</span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {anecdote.year}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {anecdote.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {anecdote.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
