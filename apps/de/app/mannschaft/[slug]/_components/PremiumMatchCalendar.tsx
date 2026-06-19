import Link from "next/link";
import type { matches as matchesType } from "@repo/data/matches";
import { teamsById } from "../../../../lib/localized-data";
import { stadiumsById } from "../../../../lib/localized-data";
import { matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds, pmuTrackingUrl } from "@repo/data/affiliates";

type Match = (typeof matchesType)[number];

interface PremiumMatchCalendarProps {
  teamId: string;
  teamName: string;
  teamMatches: Match[];
  resultsMap?: Record<string, { homeScore: number; awayScore: number; status: string }>;
}

export function PremiumMatchCalendar({ teamId, teamName, teamMatches, resultsMap }: PremiumMatchCalendarProps) {
  const pmuUrl = pmuTrackingUrl("equipe-calendar");
  return (
    <section id="spielplan" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Spielplan — {teamName}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Gruppe {teamsById[teamId]?.group} · WM 2026 · Ortszeit (Berlin)
        </p>

        <div className="space-y-3">
          {teamMatches.map((match) => {
            const homeTeam = teamsById[match.homeTeamId];
            const awayTeam = teamsById[match.awayTeamId];
            const stadium = stadiumsById[match.stadiumId];
            const isHome = match.homeTeamId === teamId;

            const pred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
            const odds = pred
              ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb)
              : undefined;

            const teamWinOdds = isHome ? odds?.home : odds?.away;
            const hasAllOdds = odds && odds.home !== "—" && odds.draw !== "—" && odds.away !== "—";

            const result = resultsMap?.[match.slug];
            const isFinished = result?.status === "finished";

            const dateObj = new Date(`${match.date}T${match.time ?? "00:00"}+02:00`);
            const dateStr = dateObj.toLocaleDateString("de-DE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const timeStr = dateObj.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Berlin",
            });

            return (
              <div
                key={match.id}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="shrink-0 text-center hidden sm:block w-20">
                    <p className="text-xs text-gray-400 capitalize">
                      {dateObj.toLocaleDateString("de-DE", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-extrabold text-gray-900">
                      {dateObj.getDate()}.{dateObj.getMonth() + 1}.
                    </p>
                    <p className="text-xs text-primary">{timeStr}</p>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xl">{homeTeam?.flag ?? ""}</span>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        {homeTeam?.name ?? match.homeTeamId}
                      </span>
                      <span className="text-gray-400 font-bold">vs</span>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        {awayTeam?.name ?? match.awayTeamId}
                      </span>
                      <span className="text-xl">{awayTeam?.flag ?? ""}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {match.group && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                          Gruppe {match.group}
                        </span>
                      )}
                      {stadium && (
                        <span className="text-xs text-gray-500">
                          {stadium.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 sm:hidden">
                        {dateStr} · {timeStr}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isFinished ? (
                      <div>
                        <p className="text-xl font-extrabold text-gray-900">
                          {result.homeScore} - {result.awayScore}
                        </p>
                        <p className="text-[11px] text-gray-400">Beendet</p>
                      </div>
                    ) : (
                      <>
                        {teamWinOdds && teamWinOdds !== "—" && (
                          <div>
                            <p className="text-lg font-extrabold text-accent">{teamWinOdds}</p>
                            <p className="text-xs text-gray-500">Sieg</p>
                          </div>
                        )}
                        {hasAllOdds && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <a
                              href={pmuUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored nofollow"
                              className="inline-flex items-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-2 py-0.5 text-[10px] font-bold text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                            >
                              1&nbsp;{odds.home}
                            </a>
                            <a
                              href={pmuUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored nofollow"
                              className="inline-flex items-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-2 py-0.5 text-[10px] font-bold text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                            >
                              N&nbsp;{odds.draw}
                            </a>
                            <a
                              href={pmuUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored nofollow"
                              className="inline-flex items-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 px-2 py-0.5 text-[10px] font-bold text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                            >
                              2&nbsp;{odds.away}
                            </a>
                          </div>
                        )}
                      </>
                    )}
                    <Link
                      href={`/prognose-spiel/${match.slug}`}
                      className="mt-1 inline-flex text-xs text-primary font-medium group-hover:underline"
                    >
                      Prognose →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <Link href="/spiel/spielplan" className="text-sm text-primary hover:underline font-medium">
            Vollständigen Spielplan aller 104 Spiele anzeigen →
          </Link>
        </div>
      </div>
    </section>
  );
}
