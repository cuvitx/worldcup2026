import type { ApiFixtureEvent } from "@repo/api/football";

interface MatchEventsTimelineProps {
  events: ApiFixtureEvent[];
  homeTeamId: number;
  homeName: string;
  awayName: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMinute(time: ApiFixtureEvent["time"]): string {
  if (time.extra != null && time.extra > 0) {
    return `${time.elapsed}+${time.extra}`;
  }
  return String(time.elapsed);
}

function getEventIcon(type: string, detail: string): string {
  if (type === "Goal") {
    if (detail === "Own Goal") return "\u26BD";
    if (detail === "Missed Penalty") return "\u274C";
    return "\u26BD"; // Normal Goal, Penalty, etc.
  }
  if (type === "Card") {
    if (detail === "Yellow Card") return "\uD83D\uDFE8";
    if (detail === "Red Card") return "\uD83D\uDFE5";
    if (detail.includes("Yellow") && detail.includes("Red")) return "\uD83D\uDFE8\uD83D\uDFE5";
    // Second Yellow Card
    if (detail === "Second Yellow card") return "\uD83D\uDFE8\uD83D\uDFE5";
    return "\uD83D\uDFE8";
  }
  if (type === "subst") return "\uD83D\uDD04";
  return "\u25CF";
}

function getEventLabel(
  type: string,
  detail: string,
  playerName: string,
  assistName: string | null,
): { primary: string; secondary: string | null; tag: string | null } {
  if (type === "Goal") {
    if (detail === "Own Goal") {
      return { primary: playerName, secondary: assistName, tag: "(csc)" };
    }
    if (detail === "Penalty") {
      return { primary: playerName, secondary: null, tag: "(pen.)" };
    }
    if (detail === "Missed Penalty") {
      return { primary: playerName, secondary: null, tag: "pen. manqu\u00E9" };
    }
    return { primary: playerName, secondary: assistName, tag: null };
  }
  if (type === "subst") {
    return { primary: assistName ?? "", secondary: playerName, tag: null };
  }
  return { primary: playerName, secondary: null, tag: null };
}

function isGoal(event: ApiFixtureEvent): boolean {
  return (
    event.type === "Goal" &&
    event.detail !== "Missed Penalty"
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function EventContent({
  event,
  side,
  runningScore,
}: {
  event: ApiFixtureEvent;
  side: "home" | "away";
  runningScore: string | null;
}) {
  const icon = getEventIcon(event.type, event.detail);
  const label = getEventLabel(
    event.type,
    event.detail,
    event.player.name,
    event.assist.name,
  );

  const isOwnGoal = event.type === "Goal" && event.detail === "Own Goal";
  const isSub = event.type === "subst";

  return (
    <div
      className={`flex items-start gap-2 ${
        side === "home" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span className="text-base leading-none mt-0.5 shrink-0" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-tight">
          {label.primary}
          {label.tag && (
            <span className="ml-1 text-xs font-normal text-gray-500">
              {label.tag}
            </span>
          )}
        </p>
        {label.secondary && (
          <p className="text-xs text-gray-500 leading-tight mt-0.5">
            {isSub ? (
              <>
                <span className="text-red-400">\u2198</span> {label.secondary}
              </>
            ) : isOwnGoal ? null : (
              <>Pass. {label.secondary}</>
            )}
          </p>
        )}
        {runningScore && (
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {runningScore}
          </p>
        )}
      </div>
    </div>
  );
}

function HalftimeDivider() {
  return (
    <div className="bg-gray-100 text-xs text-gray-500 font-medium text-center py-1.5">
      Mi-temps
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MatchEventsTimeline({
  events,
  homeTeamId,
  homeName,
  awayName,
}: MatchEventsTimelineProps) {
  if (!events || events.length === 0) return null;

  // Sort by elapsed time, then extra time
  const sorted = [...events].sort((a, b) => {
    if (a.time.elapsed !== b.time.elapsed) return a.time.elapsed - b.time.elapsed;
    return (a.time.extra ?? 0) - (b.time.extra ?? 0);
  });

  // Pre-compute running scores
  let homeGoals = 0;
  let awayGoals = 0;
  const runningScores: (string | null)[] = sorted.map((evt) => {
    if (isGoal(evt)) {
      if (evt.detail === "Own Goal") {
        // Own goal counts for the opposite team
        if (evt.team.id === homeTeamId) {
          awayGoals++;
        } else {
          homeGoals++;
        }
      } else {
        if (evt.team.id === homeTeamId) {
          homeGoals++;
        } else {
          awayGoals++;
        }
      }
      return `${homeGoals} - ${awayGoals}`;
    }
    return null;
  });

  // Determine half-time insertion index
  let halftimeIndex = -1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1]!.time.elapsed <= 45 && sorted[i]!.time.elapsed > 45) {
      halftimeIndex = i;
      break;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
        <span className="text-gray-400 text-sm" aria-hidden>
          &#x1F551;
        </span>
        <h3 className="font-bold text-lg text-gray-900">
          \u00C9v\u00E9nements du match
        </h3>
      </div>

      {/* Team labels (desktop) */}
      <div className="hidden sm:flex items-center justify-between px-5 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span>{homeName}</span>
        <span>{awayName}</span>
      </div>

      {/* Events */}
      <div className="divide-y divide-gray-100">
        {sorted.map((event, idx) => {
          const isHome = event.team.id === homeTeamId;
          const side = isHome ? "home" : "away";
          const minute = formatMinute(event.time);
          const showHalftime = halftimeIndex === idx;

          return (
            <div key={`${event.time.elapsed}-${event.time.extra}-${event.player.id}-${event.type}-${idx}`}>
              {/* Half-time divider */}
              {showHalftime && <HalftimeDivider />}

              {/* Mobile layout (< sm) */}
              <div className="flex sm:hidden items-start gap-3 px-4 py-3">
                <span className="shrink-0 flex items-center justify-center bg-gray-100 rounded-full w-10 h-10 text-xs font-bold text-gray-700">
                  {minute}&apos;
                </span>
                <EventContent
                  event={event}
                  side={side}
                  runningScore={runningScores[idx] ?? null}
                />
              </div>

              {/* Desktop layout (sm+) */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] items-start gap-0 py-3 px-5">
                {/* Left (home) column */}
                <div className="flex justify-end pr-4">
                  {isHome && (
                    <EventContent
                      event={event}
                      side="home"
                      runningScore={runningScores[idx] ?? null}
                    />
                  )}
                </div>

                {/* Center minute circle + timeline */}
                <div className="relative flex flex-col items-center">
                  {/* Vertical line above */}
                  {idx > 0 && (
                    <div className="absolute bottom-1/2 w-px bg-gray-200 h-full" />
                  )}
                  {/* Vertical line below */}
                  {idx < sorted.length - 1 && (
                    <div className="absolute top-1/2 w-px bg-gray-200 h-full" />
                  )}
                  <span className="relative z-10 flex items-center justify-center bg-gray-100 rounded-full w-10 h-10 text-xs font-bold text-gray-700 border-2 border-white">
                    {minute}&apos;
                  </span>
                </div>

                {/* Right (away) column */}
                <div className="flex justify-start pl-4">
                  {!isHome && (
                    <EventContent
                      event={event}
                      side="away"
                      runningScore={runningScores[idx] ?? null}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
