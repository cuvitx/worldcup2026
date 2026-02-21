import Link from "next/link";

interface TeamMatchesProps {
  teamMatches: Array<{
    id: string;
    slug: string;
    homeTeamId: string;
    awayTeamId: string;
    date: string;
    time?: string;
    matchday?: number;
  }>;
  team: {
    id: string;
    name: string;
  };
  teamsLookup: Record<string, { name: string; flag: string } | undefined>;
}

export function TeamMatches({ teamMatches, team, teamsLookup }: TeamMatchesProps) {
  if (teamMatches.length === 0) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Matchs de groupe</h2>
      <div className="space-y-3">
        {teamMatches.map((match) => {
          const opponent = teamsLookup[
            match.homeTeamId === team.id ? match.awayTeamId : match.homeTeamId
          ];
          const isHome = match.homeTeamId === team.id;
          return (
            <Link
              key={match.id}
              href={`/match/${match.slug}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="text-sm text-gray-500 w-20 shrink-0">
                {match.date.slice(5)}
              </span>
              <span className="text-lg" role="img" aria-label={`Drapeau de ${opponent?.name ?? "Inconnu"}`}>{opponent?.flag ?? ""}</span>
              <div className="flex-1">
                <p className="font-semibold">
                  {isHome ? "vs" : "@"} {opponent?.name ?? "A determiner"}
                </p>
                <p className="text-xs text-gray-500">
                  J{match.matchday} &middot; {match.time} UTC
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
