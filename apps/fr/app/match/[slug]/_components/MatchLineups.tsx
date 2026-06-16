import type { ApiLineup } from "@repo/api/football";

interface MatchLineupsProps {
  lineups: ApiLineup[];
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  playerRatings?: Map<number, string>;
}

function ratingColor(rating: number): string {
  if (rating >= 8.0) return "bg-emerald-100 text-emerald-700";
  if (rating >= 7.0) return "bg-blue-100 text-blue-700";
  if (rating >= 6.0) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

const POS_ORDER: Record<string, number> = { G: 0, D: 1, M: 2, F: 3 };

const POS_LABEL_FR: Record<string, string> = {
  G: "G",
  D: "D",
  M: "M",
  F: "A",
};

function sortByPosition<
  T extends { player: { pos: string } },
>(players: T[]): T[] {
  return [...players].sort(
    (a, b) => (POS_ORDER[a.player.pos] ?? 9) - (POS_ORDER[b.player.pos] ?? 9)
  );
}

function TeamColumn({
  lineup,
  teamName,
  flag,
  playerRatings,
}: {
  lineup: ApiLineup;
  teamName: string;
  flag: string;
  playerRatings?: Map<number, string>;
}) {
  const starters = sortByPosition(lineup.startXI);
  const subs = sortByPosition(lineup.substitutes);

  return (
    <div className="flex-1 min-w-0 px-5 py-4">
      {/* Team header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{flag}</span>
        <span className="font-bold text-sm text-gray-900">{teamName}</span>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full px-2.5 py-0.5">
          {lineup.formation}
        </span>
      </div>

      {/* Titulaires */}
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
        Titulaires
      </p>
      <ul className="space-y-1.5 mb-5">
        {starters.map((entry) => {
          const rating = playerRatings?.get(entry.player.id);
          return (
            <li key={entry.player.id} className="flex items-center gap-2">
              <span className="tabular-nums text-gray-400 w-6 text-right text-sm">
                {entry.player.number}
              </span>
              <span className="font-medium text-sm text-gray-900 truncate">
                {entry.player.name}
              </span>
              {rating && (
                <span className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${ratingColor(parseFloat(rating))}`}>
                  {rating}
                </span>
              )}
              <span className={`text-[10px] uppercase text-gray-400 ${rating ? "" : "ml-auto"} shrink-0`}>
                {POS_LABEL_FR[entry.player.pos] ?? entry.player.pos}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Remplacants */}
      {subs.length > 0 && (
        <>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Remplacants
          </p>
          <ul className="space-y-1 mb-5">
            {subs.map((entry) => {
              const rating = playerRatings?.get(entry.player.id);
              return (
                <li
                  key={entry.player.id}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <span className="tabular-nums w-6 text-right">
                    {entry.player.number}
                  </span>
                  <span className="truncate">{entry.player.name}</span>
                  {rating && (
                    <span className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${ratingColor(parseFloat(rating))}`}>
                      {rating}
                    </span>
                  )}
                  <span className={`text-[10px] uppercase text-gray-400 ${rating ? "" : "ml-auto"} shrink-0`}>
                    {POS_LABEL_FR[entry.player.pos] ?? entry.player.pos}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Entraineur */}
      {lineup.coach && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
            Entraineur
          </p>
          <p className="text-sm text-gray-700 italic">{lineup.coach.name}</p>
        </div>
      )}
    </div>
  );
}

export function MatchLineups({
  lineups,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  playerRatings,
}: MatchLineupsProps) {
  if (lineups.length !== 2) return null;

  const home = lineups[0]!;
  const away = lineups[1]!;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Compositions</h2>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200">
        <TeamColumn lineup={home} teamName={homeName} flag={homeFlag} playerRatings={playerRatings} />

        {/* Mobile divider */}
        <div className="border-t border-gray-200 sm:hidden" />

        <TeamColumn lineup={away} teamName={awayName} flag={awayFlag} playerRatings={playerRatings} />
      </div>
    </div>
  );
}
