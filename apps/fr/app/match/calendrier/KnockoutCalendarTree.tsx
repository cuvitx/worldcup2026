"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import {
  knockoutSlotLabelsByMatchId,
  resolveKnockoutTeamSlot,
  type KnockoutSlotResolution,
} from "@repo/data";
import type { Match } from "@repo/data/types";
import { CalendarDays, GitBranch, List, Trophy } from "lucide-react";

interface MatchData extends Match {
  homeName?: string;
  awayName?: string;
}

interface TeamInfo {
  id: string;
  name: string;
  flag: string;
}

interface DisplaySlot extends KnockoutSlotResolution {
  sourceLabel?: string;
}

interface StadiumInfo {
  id: string;
  name: string;
  city?: string;
}

type ViewMode = "tree" | "list";

interface Props {
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}

const stageStyles: Record<string, { badge: string; card: string }> = {
  "round-of-32": {
    badge: "bg-primary text-white",
    card: "border-primary/20 bg-white",
  },
  "round-of-16": {
    badge: "bg-primary text-white",
    card: "border-primary/20 bg-white",
  },
  "quarter-final": {
    badge: "bg-primary text-white",
    card: "border-purple-200 bg-purple-50/30",
  },
  "semi-final": {
    badge: "bg-accent text-white",
    card: "border-accent/30 bg-accent/10",
  },
  final: {
    badge: "bg-accent text-white",
    card: "border-accent/30 bg-accent/10",
  },
};

const columns = [
  {
    title: "16es de finale",
    shortTitle: "16es",
    matchIds: Array.from({ length: 16 }, (_, index) => `m${73 + index}`),
    topClass: "pt-0",
    itemGapClass: "mb-3",
  },
  {
    title: "8es de finale",
    shortTitle: "8es",
    matchIds: Array.from({ length: 8 }, (_, index) => `m${89 + index}`),
    topClass: "pt-[42px]",
    itemGapClass: "mb-[66px]",
  },
  {
    title: "Quarts de finale",
    shortTitle: "Quarts",
    matchIds: Array.from({ length: 4 }, (_, index) => `m${97 + index}`),
    topClass: "pt-[136px]",
    itemGapClass: "mb-[210px]",
  },
  {
    title: "Demi-finales",
    shortTitle: "Demis",
    matchIds: ["m101", "m102"],
    topClass: "pt-[326px]",
    itemGapClass: "mb-[482px]",
  },
  {
    title: "Finale",
    shortTitle: "Finale",
    matchIds: ["m104"],
    topClass: "pt-[610px]",
    itemGapClass: "",
  },
] as const;

function formatDate(match: MatchData) {
  return new Date(`${match.date}T${match.time}:00+02:00`).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "short" },
  );
}

function formatTime(match: MatchData) {
  return match.time;
}

function hasVisibleScore(match: MatchData) {
  return (
    (match.status === "finished" || match.status === "live") &&
    typeof match.homeScore === "number" &&
    typeof match.awayScore === "number"
  );
}

function hasFinishedScore(match: MatchData) {
  return match.status === "finished" && hasVisibleScore(match);
}

function isResolvedTeamId(teamId: string | undefined) {
  return Boolean(teamId && !teamId.startsWith("tbd-"));
}

function hasPenaltyShootout(match: MatchData) {
  return (
    typeof match.penaltyHomeScore === "number" &&
    typeof match.penaltyAwayScore === "number"
  );
}

function getWinnerTeamId(match: MatchData) {
  const homeScore = match.homeScore;
  const awayScore = match.awayScore;

  if (
    !hasFinishedScore(match) ||
    typeof homeScore !== "number" ||
    typeof awayScore !== "number"
  ) {
    return null;
  }

  if (isResolvedTeamId(match.winnerTeamId)) {
    return match.winnerTeamId!;
  }

  if (homeScore === awayScore) {
    const winnerTeamId = match.winnerSide === "home"
      ? match.homeTeamId
      : match.winnerSide === "away"
        ? match.awayTeamId
        : null;

    return isResolvedTeamId(winnerTeamId ?? undefined) ? winnerTeamId : null;
  }

  return homeScore > awayScore ? match.homeTeamId : match.awayTeamId;
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

function getWinnerName(match: MatchData, winnerTeamId: string) {
  if (winnerTeamId === match.homeTeamId) return match.homeName;
  if (winnerTeamId === match.awayTeamId) return match.awayName;
  return null;
}

function getReadableTeamLabel(
  teamId: string,
  fallbackLabel: string,
  resolvedName: string | undefined,
  allMatches: MatchData[],
  teamsById: Record<string, TeamInfo>,
) {
  const directTeam = teamsById[teamId];
  if (directTeam) return directTeam.name;

  if (resolvedName && !resolvedName.startsWith("tbd-")) {
    return resolvedName;
  }

  const slot = resolveKnockoutTeamSlot(teamId, fallbackLabel, allMatches);
  const slotTeam = slot.teamId ? teamsById[slot.teamId] : null;

  return slotTeam?.name ?? slot.label;
}

function getSourceMatchLabel(
  match: MatchData,
  allMatches: MatchData[],
  teamsById: Record<string, TeamInfo>,
) {
  const sourceSlotLabels = knockoutSlotLabelsByMatchId[match.id] ?? [
    "A determiner",
    "A determiner",
  ];
  const homeLabel = getReadableTeamLabel(
    match.homeTeamId,
    sourceSlotLabels[0],
    match.homeName,
    allMatches,
    teamsById,
  );
  const awayLabel = getReadableTeamLabel(
    match.awayTeamId,
    sourceSlotLabels[1],
    match.awayName,
    allMatches,
    teamsById,
  );

  if (!homeLabel || !awayLabel) return null;

  return `${homeLabel} - ${awayLabel}`;
}

function resolveDisplaySlot(
  teamId: string,
  label: string,
  allMatches: MatchData[],
  teamsById: Record<string, TeamInfo>,
): DisplaySlot {
  const sourceMatchId = getWinnerSourceMatchId(label);
  const sourceMatch = sourceMatchId
    ? allMatches.find((candidate) => candidate.id === sourceMatchId)
    : null;
  const winnerTeamId = sourceMatch ? getWinnerTeamId(sourceMatch) : null;

  if (sourceMatch && winnerTeamId) {
    const winner = teamsById[winnerTeamId];
    return {
      teamId: winnerTeamId,
      label: winner?.name ?? getWinnerName(sourceMatch, winnerTeamId) ?? label,
      status: "official",
    };
  }

  if (sourceMatch) {
    const sourceLabel = getSourceMatchLabel(sourceMatch, allMatches, teamsById);

    if (sourceLabel && sourceLabel !== label) {
      return {
        teamId: null,
        label,
        sourceLabel,
        status: "placeholder",
      };
    }
  }

  return resolveKnockoutTeamSlot(teamId, label, allMatches);
}

function getDisplaySlots(
  match: MatchData,
  allMatches: MatchData[],
  teamsById: Record<string, TeamInfo>,
) {
  const slotLabels = knockoutSlotLabelsByMatchId[match.id] ?? [
    "A determiner",
    "A determiner",
  ];
  return {
    homeSlot: resolveDisplaySlot(
      match.homeTeamId,
      slotLabels[0],
      allMatches,
      teamsById,
    ),
    awaySlot: resolveDisplaySlot(
      match.awayTeamId,
      slotLabels[1],
      allMatches,
      teamsById,
    ),
  };
}

function slotName(slot: DisplaySlot, teamsById: Record<string, TeamInfo>) {
  const team = slot.teamId ? teamsById[slot.teamId] : null;
  return team?.name ?? slot.label;
}

function slotFlag(slot: DisplaySlot, teamsById: Record<string, TeamInfo>) {
  const team = slot.teamId ? teamsById[slot.teamId] : null;
  return team?.flag ?? "";
}

function sourceHelp(slot: DisplaySlot) {
  return slot.sourceLabel ? `${slot.label} vient de ${slot.sourceLabel}` : null;
}

function TeamLine({
  slot,
  teamsById,
  isWinner = false,
  matchFinished = false,
}: {
  slot: DisplaySlot;
  teamsById: Record<string, TeamInfo>;
  isWinner?: boolean;
  matchFinished?: boolean;
}) {
  const team = slot.teamId ? teamsById[slot.teamId] : null;
  const label = team?.name ?? slot.label;
  let statusLabel: string | null = null;
  if (isWinner) {
    statusLabel = "vainqueur";
  } else if (!matchFinished && slot.teamId && slot.status === "official") {
    statusLabel = "qualifie";
  } else if (!matchFinished && slot.status === "provisional") {
    statusLabel = "actuel";
  }
  const statusClass = isWinner
    ? "bg-emerald-600 text-white"
    : slot.status === "official"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div
      className={`flex min-w-0 items-center gap-2 px-3 py-2 text-sm ${
        isWinner ? "bg-emerald-50/80 text-primary" : "text-gray-800"
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-base">
        {team?.flag ?? ""}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate ${
            slot.teamId ? "font-semibold text-primary" : ""
          }`}
        >
          {label}
        </span>
        {slot.sourceLabel ? (
          <span className="mt-0.5 block truncate text-[11px] leading-none text-gray-500">
            {slot.sourceLabel}
          </span>
        ) : null}
      </span>
      {statusLabel ? (
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusClass}`}
        >
          {statusLabel}
        </span>
      ) : null}
    </div>
  );
}

function MatchScoreBadge({ match }: { match: MatchData }) {
  if (!hasVisibleScore(match)) return null;

  const live = match.status === "live";
  const penaltyShootout = hasPenaltyShootout(match);
  const liveLabel =
    match.statusShort === "BT"
      ? "Pause prolong."
      : match.statusShort === "ET"
        ? "Prolong."
        : match.statusShort === "P"
          ? "Tirs au but"
          : match.statusShort === "HT"
            ? "Mi-temps"
            : "En direct";

  return (
    <span className="inline-flex min-w-0 shrink-0 items-center gap-1.5">
      <span
        className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
          live ? "bg-emerald-600 text-white" : "bg-gray-900 text-white"
        }`}
      >
        {live ? liveLabel : "Termine"}
      </span>
      <span className="shrink-0 font-extrabold tabular-nums text-primary">
        {match.homeScore} - {match.awayScore}
      </span>
      {penaltyShootout ? (
        <span className="shrink-0 text-[10px] font-bold uppercase text-emerald-700 tabular-nums">
          tab {match.penaltyHomeScore} - {match.penaltyAwayScore}
        </span>
      ) : null}
    </span>
  );
}

function MatchNode({
  match,
  allMatches,
  teamsById,
  stadiumsById,
}: {
  match: MatchData;
  allMatches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}) {
  const stadium = stadiumsById[match.stadiumId];
  const styles = stageStyles[match.stage] ?? stageStyles["round-of-32"]!;
  const { homeSlot, awaySlot } = getDisplaySlots(match, allMatches, teamsById);
  const winnerTeamId = getWinnerTeamId(match);
  const matchFinished = hasFinishedScore(match);
  const homeWinner = Boolean(winnerTeamId) && winnerTeamId === homeSlot.teamId;
  const awayWinner = Boolean(winnerTeamId) && winnerTeamId === awaySlot.teamId;
  const matchup = `${slotName(homeSlot, teamsById)} - ${slotName(
    awaySlot,
    teamsById,
  )}`;
  const sourceLabels = [sourceHelp(homeSlot), sourceHelp(awaySlot)]
    .filter(Boolean)
    .join(". ");

  return (
    <Link
      href={`/match/${match.slug}`}
      title={
        sourceLabels
          ? `${matchup}. ${sourceLabels}`
          : `${matchup}. ${formatDate(match)} ${formatTime(match)}`
      }
      aria-label={`Voir ${matchup}, ${formatDate(match)} a ${formatTime(match)}`}
      className={`block w-full min-w-0 overflow-hidden rounded-lg border shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5 ${styles.card}`}
    >
      <div className="divide-y divide-gray-200">
        <TeamLine
          slot={homeSlot}
          teamsById={teamsById}
          isWinner={homeWinner}
          matchFinished={matchFinished}
        />
        <TeamLine
          slot={awaySlot}
          teamsById={teamsById}
          isWinner={awayWinner}
          matchFinished={matchFinished}
        />
      </div>
      <div className="grid min-w-0 grid-cols-[auto_auto_auto_1fr] items-center gap-x-2 border-t border-gray-200 bg-white/75 px-3 py-1.5 text-[11px] text-gray-500">
        <span className="shrink-0">{formatDate(match)}</span>
        <span className="shrink-0 font-semibold tabular-nums text-primary">
          {formatTime(match)}
        </span>
        <MatchScoreBadge match={match} />
        <span className="col-start-4 min-w-0 truncate text-right">
          {stadium?.name ?? match.slug}
          {stadium?.city ? `, ${stadium.city}` : ""}
        </span>
      </div>
    </Link>
  );
}

function ListMatchRow({
  match,
  allMatches,
  teamsById,
  stadiumsById,
}: {
  match: MatchData;
  allMatches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}) {
  const stadium = stadiumsById[match.stadiumId];
  const { homeSlot, awaySlot } = getDisplaySlots(match, allMatches, teamsById);
  const winnerTeamId = getWinnerTeamId(match);
  const homeWinner = Boolean(winnerTeamId) && winnerTeamId === homeSlot.teamId;
  const awayWinner = Boolean(winnerTeamId) && winnerTeamId === awaySlot.teamId;
  const sourceLabels = [sourceHelp(homeSlot), sourceHelp(awaySlot)].filter(
    Boolean,
  );

  return (
    <Link
      href={`/match/${match.slug}`}
      className="grid gap-3 border-t border-gray-100 px-4 py-4 transition-colors hover:bg-primary/5 md:grid-cols-[120px_1fr_130px] md:items-center"
    >
      <div className="flex items-center gap-3 text-sm md:block">
        <span className="font-semibold tabular-nums text-primary">
          {formatTime(match)}
        </span>
        <span className="text-gray-500 md:mt-1 md:block">
          {formatDate(match)}
        </span>
        <span className="hidden text-xs font-semibold uppercase tracking-wide text-gray-400 md:mt-1 md:block">
          N°{match.id.replace("m", "")}
        </span>
      </div>

      <div className="min-w-0">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div
            className={`min-w-0 text-right ${
              homeWinner ? "font-bold text-emerald-700" : "font-semibold text-primary"
            }`}
          >
            <span className="mr-2 inline-flex text-lg">
              {slotFlag(homeSlot, teamsById)}
            </span>
            <span className="truncate">{slotName(homeSlot, teamsById)}</span>
          </div>
          <div className="rounded-md bg-gray-100 px-3 py-2 text-center text-sm font-black tabular-nums text-gray-900">
            {hasVisibleScore(match)
              ? `${match.homeScore} - ${match.awayScore}${
                  hasPenaltyShootout(match)
                    ? ` tab ${match.penaltyHomeScore} - ${match.penaltyAwayScore}`
                    : ""
                }`
              : formatTime(match)}
          </div>
          <div
            className={`min-w-0 ${
              awayWinner ? "font-bold text-emerald-700" : "font-semibold text-primary"
            }`}
          >
            <span className="truncate">{slotName(awaySlot, teamsById)}</span>
            <span className="ml-2 inline-flex text-lg">
              {slotFlag(awaySlot, teamsById)}
            </span>
          </div>
        </div>

        {sourceLabels.length ? (
          <div className="mt-2 flex flex-wrap justify-center gap-1.5 text-[11px] text-gray-500">
            {sourceLabels.map((label) => (
              <span key={label} className="rounded-full bg-gray-100 px-2 py-1">
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="text-sm text-gray-500 md:text-right">
        <span className="block truncate font-medium text-gray-700">
          {stadium?.name ?? match.slug}
        </span>
        {stadium?.city ? <span className="block">{stadium.city}</span> : null}
      </div>
    </Link>
  );
}

function KnockoutListView({
  matchesById,
  matches,
  teamsById,
  stadiumsById,
}: {
  matchesById: Map<string, MatchData>;
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}) {
  return (
    <div className="mt-6 space-y-4">
      {columns.map((column) => {
        const roundMatches = column.matchIds
          .map((matchId) => matchesById.get(matchId))
          .filter((match): match is MatchData => Boolean(match));
        if (!roundMatches.length) return null;

        return (
          <div
            key={column.title}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 bg-primary px-4 py-3 text-white">
              <h3 className="text-sm font-black">{column.title}</h3>
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold">
                {roundMatches.length} match{roundMatches.length > 1 ? "s" : ""}
              </span>
            </div>
            {roundMatches.map((match) => (
              <ListMatchRow
                key={match.id}
                match={match}
                allMatches={matches}
                teamsById={teamsById}
                stadiumsById={stadiumsById}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function RoundColumn({
  column,
  matchesById,
  matches,
  teamsById,
  stadiumsById,
  compact = false,
}: {
  column: (typeof columns)[number];
  matchesById: Map<string, MatchData>;
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
  compact?: boolean;
}) {
  const firstMatch = matchesById.get(column.matchIds[0]);
  const badgeClass =
    stageStyles[firstMatch?.stage ?? "round-of-32"]?.badge ?? "bg-primary";

  return (
    <div
      className={
        compact
          ? "rounded-xl border border-gray-200 bg-white/70 p-3 shadow-sm"
          : `w-[220px] shrink-0 snap-start ${column.topClass}`
      }
    >
      <div className={compact ? "mb-3 text-left" : "mb-4 text-center"}>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${badgeClass}`}
        >
          {compact ? (
            column.title
          ) : (
            <>
              <span className="hidden sm:inline">{column.title}</span>
              <span className="sm:hidden">{column.shortTitle}</span>
            </>
          )}
        </span>
      </div>

      <div className={compact ? "space-y-3" : undefined}>
        {column.matchIds.map((matchId, index) => {
          const match = matchesById.get(matchId);
          if (!match) return null;
          const isLast = index === column.matchIds.length - 1;

          return (
            <div
              key={match.id}
              className={!compact && !isLast ? column.itemGapClass : undefined}
            >
              <MatchNode
                match={match}
                allMatches={matches}
                teamsById={teamsById}
                stadiumsById={stadiumsById}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColumnBadge({
  column,
  matchesById,
}: {
  column: (typeof columns)[number];
  matchesById: Map<string, MatchData>;
}) {
  const firstMatch = matchesById.get(column.matchIds[0]);
  const badgeClass =
    stageStyles[firstMatch?.stage ?? "round-of-32"]?.badge ?? "bg-primary";

  return (
    <div className="text-center">
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${badgeClass}`}
      >
        <span className="hidden sm:inline">{column.title}</span>
        <span className="sm:hidden">{column.shortTitle}</span>
      </span>
    </div>
  );
}

function getDesktopNodeStyle(
  columnIndex: number,
  matchIndex: number,
): CSSProperties {
  const rowSpan = 2 ** columnIndex;
  const rowStart = 1 + matchIndex * rowSpan;

  return {
    gridColumn: columnIndex + 1,
    gridRow: `${rowStart} / span ${rowSpan}`,
  };
}

function DesktopKnockoutGrid({
  matchesById,
  matches,
  teamsById,
  stadiumsById,
}: {
  matchesById: Map<string, MatchData>;
  matches: MatchData[];
  teamsById: Record<string, TeamInfo>;
  stadiumsById: Record<string, StadiumInfo>;
}) {
  return (
    <div className="mt-6 hidden overflow-x-auto overscroll-x-contain pb-3 md:block">
      <div className="min-w-[1280px]">
        <div className="grid grid-cols-[repeat(5,240px)] gap-x-5">
          {columns.map((column) => (
            <ColumnBadge
              key={column.title}
              column={column}
              matchesById={matchesById}
            />
          ))}
        </div>

        <div
          className="mt-4 grid grid-cols-[repeat(5,240px)] gap-x-5"
          style={{ gridTemplateRows: "repeat(16, 112px)" }}
        >
          {columns.flatMap((column, columnIndex) =>
            column.matchIds.map((matchId, matchIndex) => {
              const match = matchesById.get(matchId);
              if (!match) return null;

              return (
                <div
                  key={match.id}
                  className="flex min-w-0 items-center"
                  style={getDesktopNodeStyle(columnIndex, matchIndex)}
                >
                  <MatchNode
                    match={match}
                    allMatches={matches}
                    teamsById={teamsById}
                    stadiumsById={stadiumsById}
                  />
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

export default function KnockoutCalendarTree({
  matches,
  teamsById,
  stadiumsById,
}: Props) {
  const [view, setView] = useState<ViewMode>("tree");
  const matchesById = new Map(matches.map((match) => [match.id, match]));
  const hasKnockoutMatches = columns.some((column) =>
    column.matchIds.some((matchId) => matchesById.has(matchId)),
  );

  if (!hasKnockoutMatches) return null;

  return (
    <section className="border-b border-gray-200 bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Phase finale
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Arbre de la phase finale
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Lecture directe du parcours : 16es, 8es, quarts, demi-finales et
              finale. Les scores et les qualifies se mettent a jour au fil des
              resultats.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {[
                { value: "tree" as const, label: "Arbre", icon: GitBranch },
                { value: "list" as const, label: "Liste", icon: List },
              ].map((item) => {
                const Icon = item.icon;
                const active = view === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setView(item.value)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
            <Link
              href="/tableau"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
            >
              <GitBranch className="h-4 w-4" />
              Pronostic du tableau
            </Link>
            <Link
              href="/pronostic/vainqueur"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:border-primary/30 hover:text-primary"
            >
              <Trophy className="h-4 w-4" />
              Pronostic champion
            </Link>
          </div>
        </div>

        {view === "list" ? (
          <KnockoutListView
            matchesById={matchesById}
            matches={matches}
            teamsById={teamsById}
            stadiumsById={stadiumsById}
          />
        ) : (
          <>
            <div className="mt-6 space-y-5 md:hidden">
              {columns.map((column) => (
                <RoundColumn
                  key={column.title}
                  column={column}
                  matchesById={matchesById}
                  matches={matches}
                  teamsById={teamsById}
                  stadiumsById={stadiumsById}
                  compact
                />
              ))}
            </div>

            <DesktopKnockoutGrid
              matchesById={matchesById}
              matches={matches}
              teamsById={teamsById}
              stadiumsById={stadiumsById}
            />

            <div className="mt-2 hidden items-center gap-2 text-xs text-gray-500 md:flex">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>
                Faites defiler horizontalement pour suivre le parcours jusqu'a la
                finale. Passez en vue Liste pour lire les matchs par tour.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
