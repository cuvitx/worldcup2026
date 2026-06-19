import type { ApiFixturePlayer } from "@repo/api/football";
import { Star, User } from "lucide-react";

interface MatchPlayerRatingsProps {
  players: ApiFixturePlayer[];
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
}

function ratingColor(rating: number): string {
  if (rating >= 8.0) return "bg-emerald-100 text-emerald-700";
  if (rating >= 7.0) return "bg-blue-100 text-blue-700";
  if (rating >= 6.0) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

function ratingBorderColor(rating: number): string {
  if (rating >= 8.0) return "border-emerald-200";
  if (rating >= 7.0) return "border-blue-200";
  if (rating >= 6.0) return "border-yellow-200";
  return "border-red-200";
}

type PlayerEntry = ApiFixturePlayer["players"][number];
type PlayerStats = PlayerEntry["statistics"][0];

function getPlayerRating(p: PlayerEntry): number | null {
  const rating = p.statistics[0]?.games?.rating;
  if (!rating) return null;
  const parsed = parseFloat(rating);
  return isNaN(parsed) ? null : parsed;
}

function didPlay(p: PlayerEntry): boolean {
  const stats = p.statistics[0];
  if (!stats) return false;
  return (stats.games?.minutes ?? 0) > 0 || stats.games?.rating != null;
}

function isStarter(p: PlayerEntry): boolean {
  const stats = p.statistics[0];
  if (!stats) return false;
  const pos = stats.games?.position;
  // Substitutes typically have fewer minutes or position is "Sub"
  // But the API marks position as the actual position even for subs
  // Best heuristic: if minutes == match duration or if they started
  // We use the "substitute" field from games if available
  // Actually: in fixtures/players, there's no explicit starter flag.
  // Best approach: check if position !== "Sub" and minutes > 0
  return pos !== undefined && pos !== "Sub" && (stats.games?.minutes ?? 0) > 0;
}

function ManOfTheMatch({
  player,
  stats,
  teamName,
  rating,
}: {
  player: PlayerEntry["player"];
  stats: PlayerStats;
  teamName: string;
  rating: string;
}) {
  const numericRating = parseFloat(rating);
  const goals = stats.goals?.total ?? 0;
  const assists = stats.goals?.assists ?? 0;
  const passesTotal = stats.passes?.total ?? 0;
  const keyPasses = stats.passes?.key ?? 0;
  const duelsWon = stats.duels?.won ?? 0;
  const tackles = stats.tackles?.total ?? 0;

  const highlights: string[] = [];
  if (goals > 0) highlights.push(`${goals} but${goals > 1 ? "s" : ""}`);
  if (assists > 0) highlights.push(`${assists} passe${assists > 1 ? "s" : ""} dec.`);
  if (keyPasses > 0) highlights.push(`${keyPasses} passe${keyPasses > 1 ? "s" : ""} cle${keyPasses > 1 ? "s" : ""}`);
  if (passesTotal > 0) highlights.push(`${passesTotal} passes`);
  if (duelsWon > 0) highlights.push(`${duelsWon} duels gagnes`);
  if (tackles > 0) highlights.push(`${tackles} tacle${tackles > 1 ? "s" : ""}`);

  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-5">
      {/* Subtle decorative star */}
      <div className="absolute -top-4 -right-4 opacity-[0.06]">
        <Star className="h-28 w-28" fill="currentColor" />
      </div>

      <div className="relative flex items-start gap-4">
        {/* Player photo */}
        <div className="shrink-0">
          <div className="relative h-16 w-16">
            <div className="h-16 w-16 rounded-full border-2 border-amber-200 bg-gray-100 overflow-hidden">
              {player.photo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={player.photo}
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <User className="h-7 w-7 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 shadow-sm">
              <Star className="h-3.5 w-3.5 text-white" fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <Star className="h-4 w-4 text-amber-500 shrink-0" fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Homme du match
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 truncate">{player.name}</p>
          <p className="text-sm text-gray-500">{teamName}</p>

          {/* Key stats */}
          {highlights.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {highlights.slice(0, 4).map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/80 border border-amber-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="shrink-0 text-center">
          <div
            className={`rounded-xl border-2 ${ratingBorderColor(numericRating)} ${ratingColor(numericRating)} px-3 py-1.5`}
          >
            <span className="text-2xl font-extrabold leading-none">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamRatings({
  teamData,
  teamName,
  flag,
}: {
  teamData: ApiFixturePlayer;
  teamName: string;
  flag: string;
}) {
  const playedPlayers = teamData.players.filter(didPlay);

  const starters = playedPlayers
    .filter(isStarter)
    .sort((a, b) => (getPlayerRating(b) ?? 0) - (getPlayerRating(a) ?? 0));

  const subs = playedPlayers
    .filter((p) => !isStarter(p))
    .sort((a, b) => (getPlayerRating(b) ?? 0) - (getPlayerRating(a) ?? 0));

  return (
    <div className="flex-1 min-w-0 px-5 py-4">
      {/* Team header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{flag}</span>
        <span className="font-bold text-sm text-gray-900">{teamName}</span>
      </div>

      {/* Starters */}
      {starters.length > 0 && (
        <>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Titulaires
          </p>
          <ul className="space-y-1.5 mb-5">
            {starters.map((entry) => {
              const stats = entry.statistics[0];
              const rating = stats?.games?.rating;
              const num = stats?.games?.number;
              const numericRating = rating ? parseFloat(rating) : null;

              return (
                <li key={entry.player.id} className="flex items-center gap-2">
                  <span className="tabular-nums text-gray-400 w-6 text-right text-sm">
                    {num ?? ""}
                  </span>
                  <span className="font-medium text-sm text-gray-900 truncate flex-1 min-w-0">
                    {entry.player.name}
                  </span>
                  {rating && numericRating != null && (
                    <span
                      className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${ratingColor(numericRating)}`}
                    >
                      {rating}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Substitutes */}
      {subs.length > 0 && (
        <>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2">
            Remplacants
          </p>
          <ul className="space-y-1 mb-2">
            {subs.map((entry) => {
              const stats = entry.statistics[0];
              const rating = stats?.games?.rating;
              const num = stats?.games?.number;
              const numericRating = rating ? parseFloat(rating) : null;

              return (
                <li
                  key={entry.player.id}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <span className="tabular-nums w-6 text-right">{num ?? ""}</span>
                  <span className="truncate flex-1 min-w-0">{entry.player.name}</span>
                  {rating && numericRating != null && (
                    <span
                      className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${ratingColor(numericRating)}`}
                    >
                      {rating}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export function MatchPlayerRatings({
  players,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
}: MatchPlayerRatingsProps) {
  if (players.length < 2) return null;

  const homeTeam = players[0]!;
  const awayTeam = players[1]!;

  // Find the Man of the Match (highest rated player across both teams)
  let motm: {
    player: PlayerEntry["player"];
    stats: PlayerStats;
    teamName: string;
    rating: string;
    numericRating: number;
  } | null = null;

  for (const [teamData, teamName] of [
    [homeTeam, homeName],
    [awayTeam, awayName],
  ] as const) {
    for (const p of teamData.players) {
      const numericRating = getPlayerRating(p);
      if (numericRating == null) continue;
      const ratingStr = p.statistics[0]?.games?.rating;
      if (!ratingStr) continue;

      if (!motm || numericRating > motm.numericRating) {
        motm = {
          player: p.player,
          stats: p.statistics[0]!,
          teamName,
          rating: ratingStr,
          numericRating,
        };
      }
    }
  }

  // If no player has a rating at all, don't render
  if (!motm) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-900">Notes des joueurs</h2>
      </div>

      {/* Man of the Match */}
      <div className="px-5 pt-5 pb-2">
        <ManOfTheMatch
          player={motm.player}
          stats={motm.stats}
          teamName={motm.teamName}
          rating={motm.rating}
        />
      </div>

      {/* Two-column ratings */}
      <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200">
        <TeamRatings teamData={homeTeam} teamName={homeName} flag={homeFlag} />

        {/* Mobile divider */}
        <div className="border-t border-gray-200 sm:hidden" />

        <TeamRatings teamData={awayTeam} teamName={awayName} flag={awayFlag} />
      </div>
    </div>
  );
}
