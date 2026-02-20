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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Moments marquants — {team.name}
        </h2>

        {/* Vertical timeline */}
        <div className="relative pl-8 md:pl-0 md:max-w-3xl md:mx-auto">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" />

          {anecdotes.map((anecdote, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={anecdote.year + anecdote.title}
                className={`relative mb-8 last:mb-0 md:flex md:items-start ${isLeft ? "md:flex-row-reverse" : ""}`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-accent border-2 border-white dark:border-slate-900 z-10" />

                {/* Content card */}
                <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"}`}>
                  <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent mb-2">
                      {anecdote.year}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5">
                      {anecdote.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {anecdote.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
