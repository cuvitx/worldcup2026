import type { Group, Match } from "./types";
import { groups } from "./groups";

export type KnockoutSlotStatus = "official" | "provisional" | "placeholder";

export interface GroupStanding {
  teamId: string;
  rank: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface KnockoutSlotResolution {
  teamId: string | null;
  label: string;
  status: KnockoutSlotStatus;
}

export const knockoutSlotLabelsByMatchId: Record<string, [string, string]> = {
  m73: ["2e Groupe A", "2e Groupe B"],
  m74: ["1er Groupe C", "2e Groupe F"],
  m75: ["1er Groupe E", "Meilleur 3e ABCDF"],
  m76: ["1er Groupe F", "2e Groupe C"],
  m77: ["2e Groupe E", "2e Groupe I"],
  m78: ["1er Groupe I", "Meilleur 3e CDFGH"],
  m79: ["1er Groupe A", "Meilleur 3e CEFHI"],
  m80: ["1er Groupe L", "Meilleur 3e EHIJK"],
  m81: ["1er Groupe G", "Meilleur 3e AEHIJ"],
  m82: ["1er Groupe D", "Meilleur 3e BEFIJ"],
  m83: ["1er Groupe H", "2e Groupe J"],
  m84: ["2e Groupe K", "2e Groupe L"],
  m85: ["1er Groupe B", "Meilleur 3e EFGIJ"],
  m86: ["2e Groupe D", "2e Groupe G"],
  m87: ["1er Groupe J", "2e Groupe H"],
  m88: ["1er Groupe K", "2e Groupe L"],
  // The round of 16 follows the FIFA bracket match-number path, not the
  // chronological order used by our public `r32-match-*` slugs.
  m89: ["Vainqueur 16e 1", "Vainqueur 16e 4"],
  m90: ["Vainqueur 16e 3", "Vainqueur 16e 6"],
  m91: ["Vainqueur 16e 2", "Vainqueur 16e 5"],
  m92: ["Vainqueur 16e 7", "Vainqueur 16e 8"],
  m93: ["Vainqueur 16e 12", "Vainqueur 16e 11"],
  m94: ["Vainqueur 16e 10", "Vainqueur 16e 9"],
  m95: ["Vainqueur 16e 15", "Vainqueur 16e 14"],
  m96: ["Vainqueur 16e 13", "Vainqueur 16e 16"],
  m97: ["Vainqueur 8e 1", "Vainqueur 8e 2"],
  m98: ["Vainqueur 8e 3", "Vainqueur 8e 4"],
  m99: ["Vainqueur 8e 5", "Vainqueur 8e 6"],
  m100: ["Vainqueur 8e 7", "Vainqueur 8e 8"],
  m101: ["Vainqueur quart 1", "Vainqueur quart 2"],
  m102: ["Vainqueur quart 3", "Vainqueur quart 4"],
  m104: ["Vainqueur demi 1", "Vainqueur demi 2"],
};

function isPlaceholderTeam(teamId: string) {
  return teamId.startsWith("tbd-");
}

function isResolvedTeamId(teamId: string | undefined) {
  return Boolean(teamId && !isPlaceholderTeam(teamId));
}

function getGroupDefinition(groupLetter: string, groupList: Group[]) {
  return groupList.find((group) => group.letter === groupLetter);
}

function getFinishedGroupMatches(groupLetter: string, matchList: Match[]) {
  return matchList.filter(
    (match) =>
      match.group === groupLetter &&
      match.status === "finished" &&
      match.homeScore != null &&
      match.awayScore != null,
  );
}

export function isGroupComplete(groupLetter: string, matchList: Match[]) {
  return getFinishedGroupMatches(groupLetter, matchList).length >= 6;
}

export function computeGroupStandings(
  groupLetter: string,
  matchList: Match[],
  groupList: Group[] = groups,
): GroupStanding[] {
  const group = getGroupDefinition(groupLetter, groupList);
  if (!group) return [];

  const standingsMap = new Map<string, Omit<GroupStanding, "rank">>();
  for (const teamId of group.teams) {
    standingsMap.set(teamId, {
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  }

  for (const match of getFinishedGroupMatches(groupLetter, matchList)) {
    const home = standingsMap.get(match.homeTeamId);
    const away = standingsMap.get(match.awayTeamId);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore!;
    home.goalsAgainst += match.awayScore!;
    away.goalsFor += match.awayScore!;
    away.goalsAgainst += match.homeScore!;

    if (match.homeScore! > match.awayScore!) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.homeScore! < match.awayScore!) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points++;
      away.points++;
    }
  }

  return Array.from(standingsMap.values())
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const goalDiffA = a.goalsFor - a.goalsAgainst;
      const goalDiffB = b.goalsFor - b.goalsAgainst;
      if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.teamId.localeCompare(b.teamId);
    })
    .map((standing, index) => ({ ...standing, rank: index + 1 }));
}

export function resolveGroupPositionSlot(
  label: string,
  matchList: Match[],
  groupList: Group[] = groups,
): KnockoutSlotResolution | null {
  const match = label.match(/^(1er|2e) Groupe ([A-L])$/);
  if (!match) return null;

  const rank = match[1] === "1er" ? 1 : 2;
  const groupLetter = match[2]!;
  const standings = computeGroupStandings(groupLetter, matchList, groupList);
  const standing = standings[rank - 1];

  if (!standing || standing.played === 0) {
    return { teamId: null, label, status: "placeholder" };
  }

  return {
    teamId: standing.teamId,
    label,
    status: isGroupComplete(groupLetter, matchList)
      ? "official"
      : "provisional",
  };
}

function getWinnerSourceMatchId(label: string) {
  const roundOf32 = label.match(/^Vainqueur 16e (\d+)$/);
  if (roundOf32) return `m${72 + Number(roundOf32[1])}`;

  const roundOf16 = label.match(/^Vainqueur 8e (\d+)$/);
  if (roundOf16) return `m${88 + Number(roundOf16[1])}`;

  const quarter = label.match(/^Vainqueur quart (\d+)$/);
  if (quarter) return `m${96 + Number(quarter[1])}`;

  const semi = label.match(/^Vainqueur demi (\d+)$/);
  if (semi) return `m${100 + Number(semi[1])}`;

  return null;
}

function getFinishedWinnerTeamId(match: Match) {
  if (
    match.status !== "finished" ||
    typeof match.homeScore !== "number" ||
    typeof match.awayScore !== "number"
  ) {
    return null;
  }

  if (isResolvedTeamId(match.winnerTeamId)) {
    return match.winnerTeamId!;
  }

  if (match.homeScore === match.awayScore) {
    const winnerTeamId = match.winnerSide === "home"
      ? match.homeTeamId
      : match.winnerSide === "away"
        ? match.awayTeamId
        : null;

    return isResolvedTeamId(winnerTeamId ?? undefined) ? winnerTeamId : null;
  }

  return match.homeScore > match.awayScore
    ? match.homeTeamId
    : match.awayTeamId;
}

function resolveWinnerSlot(
  label: string,
  matchList: Match[],
): KnockoutSlotResolution | null {
  const sourceMatchId = getWinnerSourceMatchId(label);
  if (!sourceMatchId) return null;

  const sourceMatch = matchList.find((match) => match.id === sourceMatchId);
  if (!sourceMatch) return { teamId: null, label, status: "placeholder" };

  const winnerTeamId = getFinishedWinnerTeamId(sourceMatch);
  if (!winnerTeamId || isPlaceholderTeam(winnerTeamId)) {
    return { teamId: null, label, status: "placeholder" };
  }

  return {
    teamId: winnerTeamId,
    label,
    status: "official",
  };
}

export function resolveKnockoutTeamSlot(
  teamId: string,
  fallbackLabel: string,
  matchList: Match[],
  groupList: Group[] = groups,
): KnockoutSlotResolution {
  if (!isPlaceholderTeam(teamId)) {
    return { teamId, label: fallbackLabel, status: "official" };
  }

  const groupSlot = resolveGroupPositionSlot(
    fallbackLabel,
    matchList,
    groupList,
  );
  if (groupSlot) return groupSlot;

  const winnerSlot = resolveWinnerSlot(fallbackLabel, matchList);
  if (winnerSlot) return winnerSlot;

  return { teamId: null, label: fallbackLabel, status: "placeholder" };
}
