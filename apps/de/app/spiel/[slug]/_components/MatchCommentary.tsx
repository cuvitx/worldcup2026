"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface CommentaryPlay {
  id: string;
  minute: string; // "9'", "45+2'"
  text: string; // Full ESPN commentary text
  type: "goal" | "yellow-card" | "red-card" | "substitution" | "shot" | "kickoff" | "halftime" | "fulltime" | "other";
  homeScore: number;
  awayScore: number;
  period: number;
}

interface MatchCommentaryProps {
  plays: CommentaryPlay[];
  homeName: string;
  awayName: string;
}

const TYPE_ICON: Record<CommentaryPlay["type"], string> = {
  goal: "\u26BD",
  "yellow-card": "\uD83D\uDFE8",
  "red-card": "\uD83D\uDFE5",
  substitution: "\uD83D\uDD04",
  shot: "\uD83E\uDD45",
  kickoff: "\uD83D\uDFE2",
  halftime: "\u23F8\uFE0F",
  fulltime: "\uD83C\uDFC1",
  other: "\u25CB",
};

const TYPE_BG: Record<CommentaryPlay["type"], string> = {
  goal: "bg-emerald-50 border-emerald-200",
  "yellow-card": "bg-yellow-50 border-yellow-200",
  "red-card": "bg-red-50 border-red-200",
  substitution: "bg-blue-50 border-blue-200",
  shot: "bg-gray-50 border-gray-200",
  kickoff: "bg-emerald-50/50 border-emerald-100",
  halftime: "bg-gray-100 border-gray-300",
  fulltime: "bg-gray-100 border-gray-300",
  other: "bg-white border-gray-100",
};

// Translate common English terms in ESPN commentary to French
function translateCommentary(text: string): string {
  return text
    .replace(/^Goal!/g, "But !")
    .replace(/^Goal -/g, "But -")
    .replace(/^Attempt saved\./g, "Tir arrêté.")
    .replace(/^Attempt missed\./g, "Tir non cadré.")
    .replace(/^Attempt blocked\./g, "Tir bloqué.")
    .replace(/^Corner,/g, "Corner,")
    .replace(/^Foul by/g, "Faute de")
    .replace(/^Offside,/g, "Hors-jeu,")
    .replace(/^Substitution,/g, "Remplacement,")
    .replace(/^Second Half begins/g, "Début de la seconde période")
    .replace(/^First Half ends/g, "Fin de la première période")
    .replace(/^Second Half ends/g, "Fin de la seconde période")
    .replace(/^Match ends/g, "Fin du match")
    .replace(/is shown the yellow card/g, "reçoit un carton jaune")
    .replace(/is shown the red card/g, "reçoit un carton rouge")
    .replace(/right footed shot/g, "frappe du pied droit")
    .replace(/left footed shot/g, "frappe du pied gauche")
    .replace(/header/g, "tête")
    .replace(/from the centre of the box/g, "du centre de la surface")
    .replace(/from outside the box/g, "de l'extérieur de la surface")
    .replace(/from the left side of the box/g, "du côté gauche de la surface")
    .replace(/from the right side of the box/g, "du côté droit de la surface")
    .replace(/to the bottom left corner/g, "en bas à gauche")
    .replace(/to the bottom right corner/g, "en bas à droite")
    .replace(/to the top left corner/g, "en haut à gauche")
    .replace(/to the top right corner/g, "en haut à droite")
    .replace(/to the centre of the goal/g, "au centre du but")
    .replace(/is saved in the/g, "est arrêté dans le")
    .replace(/Assisted by/g, "Passe décisive de")
    .replace(/replaces/g, "remplace")
    .replace(/for a bad foul/g, "pour une faute grossière")
    .replace(/wins a free kick/g, "obtient un coup franc")
    .replace(/in the defensive half/g, "dans la moitié défensive")
    .replace(/in the attacking half/g, "dans la moitié offensive")
    .replace(/Penalty saved!/g, "Penalty arrêté !")
    .replace(/Penalty conceded/g, "Penalty concédé")
    .replace(/Own Goal/g, "But contre son camp")
    .replace(/Hand ball/g, "Main");
}

export function MatchCommentary({
  plays,
  homeName,
  awayName,
}: MatchCommentaryProps) {
  const [expanded, setExpanded] = useState(false);

  if (plays.length === 0) return null;

  // Split plays: priority (goals, cards, subs, kickoff, halftime, fulltime) vs all
  const priorityPlays = plays.filter(
    (p) =>
      p.type === "goal" ||
      p.type === "yellow-card" ||
      p.type === "red-card" ||
      p.type === "substitution" ||
      p.type === "kickoff" ||
      p.type === "halftime" ||
      p.type === "fulltime",
  );

  const displayPlays = expanded ? plays : (priorityPlays.length > 0 ? priorityPlays : plays.slice(0, 15));

  // Group by period
  const periods = new Map<number, CommentaryPlay[]>();
  for (const play of displayPlays) {
    const period = play.period;
    if (!periods.has(period)) periods.set(period, []);
    periods.get(period)!.push(play);
  }

  // Sort periods and reverse plays within each (most recent first)
  const sortedPeriods = Array.from(periods.entries()).sort((a, b) => b[0] - a[0]);
  for (const [, periodPlays] of sortedPeriods) {
    periodPlays.reverse();
  }

  const periodLabels: Record<number, string> = {
    1: "1ère mi-temps",
    2: "2ème mi-temps",
    3: "Prolongations 1",
    4: "Prolongations 2",
    5: "Tirs au but",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-900">
          Fil du match
        </h2>
        <span className="text-xs text-gray-400 font-medium">
          {plays.length} événements
        </span>
      </div>

      {/* Score bar */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-center gap-3 text-sm min-w-0">
        <span className="font-semibold text-gray-900 truncate min-w-0">{homeName}</span>
        <span className="font-bold text-lg tabular-nums text-gray-800 shrink-0">
          {plays[plays.length - 1]?.homeScore ?? 0} - {plays[plays.length - 1]?.awayScore ?? 0}
        </span>
        <span className="font-semibold text-gray-900 truncate min-w-0">{awayName}</span>
      </div>

      {/* Timeline */}
      <div className="divide-y divide-gray-50">
        {sortedPeriods.map(([period, periodPlays]) => (
          <div key={period}>
            {/* Period label */}
            <div className="px-5 py-2 bg-gray-50/80 sticky top-0 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {periodLabels[period] ?? `Période ${period}`}
              </span>
            </div>

            {/* Plays */}
            <div className="divide-y divide-gray-50">
              {periodPlays.map((play) => (
                <div
                  key={play.id}
                  className={`px-5 py-3 flex gap-3 items-start border-l-2 ${TYPE_BG[play.type]}`}
                >
                  {/* Minute */}
                  <div className="shrink-0 w-12 text-right">
                    <span className="text-sm font-bold tabular-nums text-gray-600">
                      {play.minute}
                    </span>
                  </div>

                  {/* Icon */}
                  <span className="shrink-0 text-base leading-none mt-0.5">
                    {TYPE_ICON[play.type]}
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm leading-relaxed ${play.type === "goal" ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                      {translateCommentary(play.text)}
                    </p>
                    {play.type === "goal" && (
                      <p className="text-xs text-emerald-600 font-semibold mt-1 tabular-nums">
                        {play.homeScore} - {play.awayScore}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle button */}
      {plays.length > priorityPlays.length && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-3 border-t border-gray-100 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-gray-50/50 transition-colors"
        >
          {expanded
            ? "Voir les événements clés"
            : `Voir le fil complet (${plays.length} événements)`}
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}
