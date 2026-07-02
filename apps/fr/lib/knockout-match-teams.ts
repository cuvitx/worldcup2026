import {
  knockoutSlotLabelsByMatchId,
  resolveKnockoutTeamSlot,
  type KnockoutSlotResolution,
} from "@repo/data";
import { teamsById } from "@repo/data/teams";
import type { Match, Team } from "@repo/data/types";
import { matches } from "@repo/data/matches";

function readableSlotLabel(label: string, fallback: string) {
  if (!label || label === "A determiner") return fallback;
  return label;
}

export interface ResolvedMatchTeams {
  home?: Team;
  away?: Team;
  homeSlot: KnockoutSlotResolution;
  awaySlot: KnockoutSlotResolution;
  homeTeamId: string;
  awayTeamId: string;
  homeName: string;
  awayName: string;
}

export function resolveMatchTeams(
  match: Match,
  sourceMatches: Match[],
  fallback = "À déterminer",
): ResolvedMatchTeams {
  const slotLabels = knockoutSlotLabelsByMatchId[match.id] ?? [
    fallback,
    fallback,
  ];
  const homeSlot = resolveKnockoutTeamSlot(
    match.homeTeamId,
    slotLabels[0],
    sourceMatches,
  );
  const awaySlot = resolveKnockoutTeamSlot(
    match.awayTeamId,
    slotLabels[1],
    sourceMatches,
  );
  const home = homeSlot.teamId
    ? teamsById[homeSlot.teamId]
    : teamsById[match.homeTeamId];
  const away = awaySlot.teamId
    ? teamsById[awaySlot.teamId]
    : teamsById[match.awayTeamId];

  return {
    home,
    away,
    homeSlot,
    awaySlot,
    homeTeamId: home?.id ?? match.homeTeamId,
    awayTeamId: away?.id ?? match.awayTeamId,
    homeName: home?.name ?? readableSlotLabel(homeSlot.label, fallback),
    awayName: away?.name ?? readableSlotLabel(awaySlot.label, fallback),
  };
}

export function needsKnockoutTeamResolution(match: Match) {
  return (
    match.stage !== "group" &&
    (match.homeTeamId.startsWith("tbd-") ||
      match.awayTeamId.startsWith("tbd-"))
  );
}

export function generateStaticResolvedMatchParams() {
  return matches
    .filter((match) => !needsKnockoutTeamResolution(match))
    .map((match) => ({ slug: match.slug }));
}
