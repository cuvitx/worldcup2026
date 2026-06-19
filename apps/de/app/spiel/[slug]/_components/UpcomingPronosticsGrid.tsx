import Link from "next/link";
import { pmuTrackingUrl } from "@repo/data/affiliates";

interface UpcomingPronosticsGridProps {
  matches: Array<{
    slug: string;
    date: string;
    time: string;
    homeName: string;
    homeFlag: string;
    awayName: string;
    awayFlag: string;
    prediction?: {
      team1WinProb: number;
      drawProb: number;
      team2WinProb: number;
    };
  }>;
}

export function UpcomingPronosticsGrid({
  matches,
}: UpcomingPronosticsGridProps) {
  if (matches.length === 0) return null;

  const displayedMatches = matches.slice(0, 4);

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        ✨ Prochains pronostics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedMatches.map((match, index) => {
          const formatted = new Date(
            `${match.date}T${match.time}:00`
          ).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "long",
          });
          const dateLabel = `${formatted} à ${match.time}`;

          let favoriteLabel: string | null = null;
          if (match.prediction) {
            const { team1WinProb, team2WinProb } = match.prediction;
            if (team1WinProb >= team2WinProb) {
              favoriteLabel = `${match.homeFlag} ${match.homeName} favori à ${Math.round(team1WinProb)}%`;
            } else {
              favoriteLabel = `${match.awayFlag} ${match.awayName} favori à ${Math.round(team2WinProb)}%`;
            }
          }

          const isLastCard = index === displayedMatches.length - 1 && displayedMatches.length === 4;

          return (
            <div
              key={match.slug}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all px-4 py-4"
            >
              <div className="text-sm font-semibold text-gray-900 flex items-center gap-1.5 min-w-0">
                <span className="shrink-0" role="img" aria-label={match.homeName}>
                  {match.homeFlag}
                </span>
                <span className="truncate min-w-0">{match.homeName}</span>
                <span className="text-gray-400 shrink-0">vs</span>
                <span className="shrink-0" role="img" aria-label={match.awayName}>
                  {match.awayFlag}
                </span>
                <span className="truncate min-w-0">{match.awayName}</span>
              </div>

              <p className="text-xs text-gray-500 mt-1.5">{dateLabel}</p>

              {favoriteLabel && (
                <p className="text-xs font-medium text-emerald-600 mt-1.5">
                  {favoriteLabel}
                </p>
              )}

              <div className="mt-3">
                <Link
                  href={`/prognose-spiel/${match.slug}`}
                  className="text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Prognose anzeigen →
                </Link>
              </div>

              {isLastCard && (
                <div className="border-t border-gray-100 mt-3 pt-3">
                  <a
                    href={pmuTrackingUrl("pronostics-grid")}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="text-xs font-bold text-[#d4af37] hover:text-[#b8941f]"
                  >
                    Wetten auf Betano →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
