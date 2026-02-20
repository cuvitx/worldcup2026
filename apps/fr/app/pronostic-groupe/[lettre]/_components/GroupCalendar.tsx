import Link from "next/link";
import { teamsById } from "@repo/data/teams";
import type { matches as matchesType } from "@repo/data/matches";

type Match = (typeof matchesType)[number];

interface GroupCalendarProps {
  groupLetter: string;
  groupMatches: Match[];
}

export function GroupCalendar({ groupLetter, groupMatches }: GroupCalendarProps) {
  if (groupMatches.length === 0) return null;

  return (
    <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calendrier du Groupe {groupLetter}</h2>
      <div className="space-y-2">
        {groupMatches.map((match) => {
          const home = teamsById[match.homeTeamId];
          const away = teamsById[match.awayTeamId];
          const dateStr = new Date(match.date).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" });
          return (
            <Link
              key={match.id}
              href={`/match/${match.slug}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-all hover:border-primary/30 hover:bg-primary/5 group"
            >
              <div className="text-xs text-gray-500 dark:text-gray-300 w-24 shrink-0">
                <div>{dateStr}</div>
                <div className="font-medium text-gray-700 dark:text-gray-300">{match.time} UTC</div>
              </div>
              <div className="flex flex-1 items-center gap-1 justify-center min-w-0">
                <span className="text-base shrink-0" aria-label={home?.name}>{home?.flag ?? ""}</span>
                <span className="font-semibold text-xs text-right flex-1 min-w-0 truncate">{home?.name ?? "TBD"}</span>
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 px-1.5 py-1 rounded font-mono shrink-0">vs</span>
                <span className="font-semibold text-xs flex-1 min-w-0 truncate">{away?.name ?? "TBD"}</span>
                <span className="text-base shrink-0" aria-label={away?.name}>{away?.flag ?? ""}</span>
              </div>
              <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Pronostic →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
