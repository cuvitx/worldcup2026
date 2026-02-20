/**
 * MatchCard — Brand Book CDM2026
 * - border-radius 12px (var --radius-lg)
 * - border-left accent : live=#FF6B35, upcoming=#f5a623, finished=#8a8a9a
 * - score en JetBrains Mono 700
 * - badge LIVE avec dot pulsant
 */

import Link from "next/link";

type MatchStatus = "live" | "upcoming" | "finished";

/**
 * Props for the MatchCard component.
 * 
 * @param slug - URL slug for the match detail page (e.g., "france-bresil-2026-06-12")
 * @param homeName - Home team name
 * @param homeFlag - Home team flag emoji
 * @param awayName - Away team name
 * @param awayFlag - Away team flag emoji
 * @param date - Match date in ISO format (YYYY-MM-DD)
 * @param time - Optional match time (e.g., "21:00")
 * @param group - Optional group letter (e.g., "A", "B")
 * @param matchday - Optional matchday number
 * @param stage - Optional stage label (e.g., "Quarts de finale")
 * @param odds - Optional betting odds { home, draw, away }
 * @param scoreHome - Home team score (shown if live or finished)
 * @param scoreAway - Away team score (shown if live or finished)
 * @param minute - Current minute (shown if status is "live")
 * @param status - Match status: "live" | "upcoming" | "finished"
 * @param isHot - Display a 🔥 Hot badge
 * @param isTop - Display a ⭐ Top badge
 * @param compact - Reduce padding for compact layouts
 */
interface MatchCardProps {
  slug: string;
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  date: string;
  time?: string;
  group?: string;
  matchday?: number;
  stage?: string;
  odds?: { home: string; draw: string; away: string };
  /** Score home (si match en cours ou terminé) */
  scoreHome?: number;
  /** Score away (si match en cours ou terminé) */
  scoreAway?: number;
  /** Minute en cours (si live) */
  minute?: number;
  status?: MatchStatus;
  isHot?: boolean;
  isTop?: boolean;
  compact?: boolean;
}

function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/** Classe CSS border-left selon l'état du match */
function statusClass(status?: MatchStatus): string {
  switch (status) {
    case "live":     return "match-card--live";
    case "finished": return "match-card--finished";
    case "upcoming":
    default:         return "match-card--upcoming";
  }
}

/**
 * MatchCard component — Displays a match preview with teams, scores, odds, and status.
 * 
 * Design follows CDM2026 Brand Book:
 * - border-radius: 12px (--radius-lg)
 * - border-left accent color: live=#FF6B35, upcoming=#f5a623, finished=#8a8a9a
 * - Score displayed in JetBrains Mono 700
 * - LIVE badge with pulsating dot animation
 * 
 * @example
 * ```tsx
 * <MatchCard
 *   slug="france-bresil-2026-06-12"
 *   homeName="France"
 *   homeFlag="🇫🇷"
 *   awayName="Brésil"
 *   awayFlag="🇧🇷"
 *   date="2026-06-12"
 *   time="21:00"
 *   group="A"
 *   matchday={1}
 *   status="upcoming"
 *   odds={{ home: "2.10", draw: "3.20", away: "3.50" }}
 * />
 * ```
 */
export function MatchCard({
  slug,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  date,
  time,
  group,
  matchday,
  stage,
  odds,
  scoreHome,
  scoreAway,
  minute,
  status,
  isHot,
  isTop,
  compact = false,
}: MatchCardProps) {
  const isLive     = status === "live";
  const isFinished = status === "finished";
  const showScore  = isLive || isFinished;

  return (
    <Link
      href={`/pronostic-match/${slug}`}
      className={`match-card ${statusClass(status)} block`}
    >
      {/* ── Top bar : meta + badges ── */}
      <div
        className={`flex items-center justify-between ${
          compact ? "px-3 py-1.5" : "px-4 py-2"
        } border-b border-[var(--color-border)]`}
      >
        <span className="text-xs text-[#8a8a9a] truncate">
          {stage && stage !== "group"
            ? stage
            : group
            ? `Groupe ${group}${matchday ? ` · J${matchday}` : ""}`
            : matchday
            ? `Journée ${matchday}`
            : ""}
        </span>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {/* Badge LIVE */}
          {isLive && (
            <span className="badge-brand badge-live flex items-center gap-1">
              <span className="live-dot" aria-hidden="true" />
              LIVE
              {minute !== undefined && (
                <span className="font-normal normal-case tracking-normal opacity-90 ml-0.5">
                  {minute}&apos;
                </span>
              )}
            </span>
          )}

          {/* Badges hot / top */}
          {!isLive && isHot && <span className="badge-hot">🔥 Hot</span>}
          {!isLive && isTop && <span className="badge-top">⭐ Top</span>}

          {/* Date/heure */}
          {!isLive && (
            <span className="text-xs font-medium text-[#8a8a9a]">
              {formatDate(date)}
              {time && <span className="ml-1 opacity-75">{time}</span>}
            </span>
          )}
        </div>
      </div>

      {/* ── Équipes + score ── */}
      <div
        className={`flex items-center ${
          compact ? "px-3 py-2.5 gap-2" : "px-4 py-3.5 gap-3"
        }`}
      >
        {/* Équipe domicile */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
          <span
            className={`font-semibold break-words text-[var(--color-text)] ${
              compact ? "text-sm" : "text-base"
            } ${isFinished && scoreHome !== undefined && scoreAway !== undefined && scoreHome > scoreAway ? "font-bold" : ""}`}
          >
            {homeName}
          </span>
          <span
            className={compact ? "text-xl" : "text-2xl"}
            role="img"
            aria-label={`Drapeau ${homeName}`}
          >
            {homeFlag}
          </span>
        </div>

        {/* Score ou VS */}
        <div className="flex flex-col items-center shrink-0 min-w-[52px]">
          {showScore && scoreHome !== undefined && scoreAway !== undefined ? (
            <div
              className="score-display text-[var(--color-text)] flex items-center gap-1"
              aria-label={`Score : ${scoreHome} - ${scoreAway}`}
            >
              <span
                className={
                  scoreHome > scoreAway
                    ? "text-accent"
                    : scoreHome === scoreAway
                    ? ""
                    : "opacity-60"
                }
              >
                {scoreHome}
              </span>
              <span className="opacity-40 text-lg">-</span>
              <span
                className={
                  scoreAway > scoreHome
                    ? "text-accent"
                    : scoreHome === scoreAway
                    ? ""
                    : "opacity-60"
                }
              >
                {scoreAway}
              </span>
            </div>
          ) : (
            <span
              className={`font-bold text-accent ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              VS
            </span>
          )}
        </div>

        {/* Équipe extérieure */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span
            className={compact ? "text-xl" : "text-2xl"}
            role="img"
            aria-label={`Drapeau ${awayName}`}
          >
            {awayFlag}
          </span>
          <span
            className={`font-semibold break-words text-[var(--color-text)] ${
              compact ? "text-sm" : "text-base"
            } ${isFinished && scoreHome !== undefined && scoreAway !== undefined && scoreAway > scoreHome ? "font-bold" : ""}`}
          >
            {awayName}
          </span>
        </div>

        {/* Flèche */}
        <span className="text-accent text-sm shrink-0 ml-1" aria-hidden="true">
          ›
        </span>
      </div>

      {/* ── Cotes (optionnel) ── */}
      {odds && !showScore && (
        <div
          className={`flex items-center justify-center gap-2 ${
            compact ? "px-3 pb-2.5" : "px-4 pb-3.5"
          } border-t border-[var(--color-border)] pt-2`}
        >
          <OddPill label="1" value={odds.home} />
          <OddPill label="N" value={odds.draw} />
          <OddPill label="2" value={odds.away} />
          <span className="ml-auto text-xs text-[#8a8a9a]">Pronostic →</span>
        </div>
      )}
    </Link>
  );
}

function OddPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] text-[#8a8a9a] font-medium">{label}</span>
      <span className="odds-badge text-xs">{value}</span>
    </div>
  );
}
