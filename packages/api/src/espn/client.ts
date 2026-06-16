import type {
  EspnScoreboardResponse,
  EspnEvent,
  EspnPlay,
  EspnPlaysResponse,
} from "./types";
import { cachedFetch, CACHE_TTL } from "../cache";

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const ESPN_CORE = "https://sports.core.api.espn.com/v2/sports/soccer/leagues/fifa.world";

/**
 * Fetch ESPN scoreboard for a given date (YYYY-MM-DD format).
 * Returns all events for that day with key events (goals, cards).
 */
export async function getEspnScoreboard(date: string): Promise<EspnEvent[]> {
  const dateCompact = date.replace(/-/g, ""); // "20260611"
  return cachedFetch<EspnEvent[]>(
    `espn:scoreboard:${dateCompact}`,
    CACHE_TTL.INJURIES, // 1h cache
    async () => {
      const res = await fetch(`${ESPN_BASE}/scoreboard?dates=${dateCompact}`, {
        headers: { "User-Agent": "CDM2026/1.0" },
      } as RequestInit);
      if (!res.ok) return [];
      const data = (await res.json()) as EspnScoreboardResponse;
      return data.events ?? [];
    },
  );
}

/**
 * Resolve ESPN event ID for a match by date and team names.
 * Matches on competitor display names (fuzzy: contains check).
 * Also checks the previous day (ESPN uses UTC dates, our data uses Paris time,
 * so late-night US matches fall on the next day in Paris).
 */
export async function resolveEspnEventId(
  date: string,
  homeTeamName: string,
  awayTeamName: string,
): Promise<string | null> {
  if (process.env.NEXT_PHASE === "phase-production-build") return null;

  const homeLower = homeTeamName.toLowerCase();
  const awayLower = awayTeamName.toLowerCase();

  function matchInEvents(events: EspnEvent[]): string | null {
    for (const ev of events) {
      const comp = ev.competitions[0];
      if (!comp) continue;
      const teams = comp.competitors.map((c) => c.team.displayName.toLowerCase());
      if (
        teams.some((t) => t.includes(homeLower) || homeLower.includes(t)) &&
        teams.some((t) => t.includes(awayLower) || awayLower.includes(t))
      ) {
        return ev.id;
      }
    }
    return null;
  }

  // Try the given date first
  try {
    const events = await getEspnScoreboard(date);
    const found = matchInEvents(events);
    if (found) return found;
  } catch {
    // continue to fallback
  }

  // Fallback: check the previous day (UTC vs Paris timezone offset)
  try {
    const prev = new Date(date + "T00:00:00Z");
    prev.setUTCDate(prev.getUTCDate() - 1);
    const prevDate = prev.toISOString().slice(0, 10);
    const prevEvents = await getEspnScoreboard(prevDate);
    return matchInEvents(prevEvents);
  } catch {
    return null;
  }
}

/**
 * Fetch full play-by-play from the ESPN Core API.
 * Returns all plays across all pages, sorted chronologically.
 * Only fetches priority plays (goals, cards, shots, subs) to keep payload small.
 */
export async function getEspnPlayByPlay(eventId: string, live = false): Promise<EspnPlay[]> {
  return cachedFetch<EspnPlay[]>(
    `espn:plays:${eventId}`,
    live ? CACHE_TTL.LIVE_SCORES : CACHE_TTL.INJURIES, // 60s live, 1h finished
    async () => {
      const allPlays: EspnPlay[] = [];
      let page = 1;
      let pageCount = 1;

      while (page <= pageCount) {
        const url = `${ESPN_CORE}/events/${eventId}/competitions/${eventId}/plays?limit=300&page=${page}`;
        const res = await fetch(url, {
          headers: { "User-Agent": "CDM2026/1.0" },
        });
        if (!res.ok) break;

        const data = (await res.json()) as EspnPlaysResponse;
        pageCount = data.pageCount ?? 1;

        for (const play of data.items ?? []) {
          // Only keep meaningful plays (not every pass/touch)
          if (
            play.scoringPlay ||
            play.priority ||
            play.substitution ||
            play.redCard ||
            play.yellowCard ||
            play.penaltyKick ||
            play.type?.type === "kickoff" ||
            play.type?.type === "end-regular-time" ||
            play.type?.id === "83" || // End Regular Time
            play.type?.id === "80" || // Kickoff
            play.type?.id === "70" || // Goal
            play.type?.id === "93" || // Red Card
            play.type?.id === "94" || // Yellow Card
            play.type?.id === "106" // Shot On Target
          ) {
            allPlays.push(play);
          }
        }

        page++;
      }

      // Sort by period then clock value
      allPlays.sort((a, b) => {
        const periodDiff = (a.period?.number ?? 0) - (b.period?.number ?? 0);
        if (periodDiff !== 0) return periodDiff;
        return (a.clock?.value ?? 0) - (b.clock?.value ?? 0);
      });

      return allPlays;
    },
  );
}
