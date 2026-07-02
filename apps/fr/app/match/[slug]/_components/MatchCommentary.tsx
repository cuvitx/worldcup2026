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

const TEAM_NAME_TRANSLATIONS: Record<string, string> = {
  Algeria: "Algérie",
  Argentina: "Argentine",
  Australia: "Australie",
  Austria: "Autriche",
  Belgium: "Belgique",
  "Bosnia and Herzegovina": "Bosnie-Herzégovine",
  Brazil: "Brésil",
  Canada: "Canada",
  "Cape Verde": "Cap-Vert",
  Colombia: "Colombie",
  "Congo DR": "RD Congo",
  Croatia: "Croatie",
  Curacao: "Curaçao",
  Czechia: "Tchéquie",
  Ecuador: "Équateur",
  Egypt: "Égypte",
  England: "Angleterre",
  France: "France",
  Germany: "Allemagne",
  Ghana: "Ghana",
  Haiti: "Haïti",
  Iran: "Iran",
  Iraq: "Irak",
  "Ivory Coast": "Côte d’Ivoire",
  Japan: "Japon",
  Jordan: "Jordanie",
  "Korea Republic": "Corée du Sud",
  Mexico: "Mexique",
  Morocco: "Maroc",
  Netherlands: "Pays-Bas",
  "New Zealand": "Nouvelle-Zélande",
  Norway: "Norvège",
  Panama: "Panama",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Arabie saoudite",
  Scotland: "Écosse",
  Senegal: "Sénégal",
  "South Africa": "Afrique du Sud",
  Spain: "Espagne",
  Sweden: "Suède",
  Switzerland: "Suisse",
  Tunisia: "Tunisie",
  Turkey: "Turquie",
  "United States": "États-Unis",
  Uruguay: "Uruguay",
  USA: "États-Unis",
  Uzbekistan: "Ouzbékistan",
};

const PLAIN_TEAM_TRANSLATIONS = Object.entries(TEAM_NAME_TRANSLATIONS)
  .filter(([englishName, frenchName]) => englishName !== frenchName)
  .sort(([a], [b]) => b.length - a.length);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translatePlainTeamReferences(text: string): string {
  return PLAIN_TEAM_TRANSLATIONS.reduce((translatedText, [englishName, frenchName]) => {
    const teamPattern = new RegExp(
      `\\b${escapeRegExp(englishName)}\\b(?=\\s+\\d|[.,:;!?)]|\\s*$)`,
      "g",
    );
    return translatedText.replace(teamPattern, frenchName);
  }, text);
}

function translateTeamReferences(text: string): string {
  const translatedParentheticalTeams = text.replace(/\(([^)]+)\)/g, (match, teamName: string) => {
    const translatedTeamName = TEAM_NAME_TRANSLATIONS[teamName.trim()];
    return translatedTeamName ? `(${translatedTeamName})` : match;
  });

  return translatePlainTeamReferences(translatedParentheticalTeams);
}

// Translate common English terms in ESPN commentary to French
function translateCommentary(text: string): string {
  const translated = text
    // Sentence starters
    .replace(/^Goal!/g, "But !")
    .replace(/^Goal -/g, "But -")
    .replace(/^Attempt saved\./g, "Tir arrêté.")
    .replace(/^Attempt missed\./g, "Tir non cadré.")
    .replace(/^Attempt blocked\./g, "Tir bloqué.")
    .replace(/^(.+?) Shot Off Target at ([0-9+']+)$/g, "Tir non cadré de $1 à $2.")
    .replace(/^(.+?) Shot On Target at ([0-9+']+)$/g, "Tir cadré de $1 à $2.")
    .replace(/^(.+?) Shot Blocked at ([0-9+']+)$/g, "Tir bloqué de $1 à $2.")
    .replace(/^Corner,/g, "Corner,")
    .replace(/^Foul by/g, "Faute de")
    .replace(/^Offside,/g, "Hors-jeu,")
    .replace(/^Substitution,/g, "Remplacement,")
    .replace(/^Second Half begins/g, "Début de la seconde période")
    .replace(/^First Half begins/g, "Début de la première période")
    .replace(/^First Half ends/g, "Fin de la première période")
    .replace(/^Second Half ends/g, "Fin de la seconde période")
    .replace(/^Match ends/g, "Fin du match")
    .replace(/^Delay in match/g, "Arrêt de jeu")
    .replace(/^Delay /g, "Arrêt de jeu ")
    .replace(/^VAR Decision:/g, "Décision VAR :")
    .replace(/^Video Review:/g, "Révision vidéo :")
    .replace(/^New attacking attempt/g, "Nouvelle tentative offensive")
    // Cards
    .replace(/is shown the yellow card/g, "reçoit un carton jaune")
    .replace(/is shown the red card/g, "reçoit un carton rouge")
    // Shots — order matters: "very close range" before "close range"
    .replace(/right footed shot/g, "frappe du pied droit")
    .replace(/left footed shot/g, "frappe du pied gauche")
    .replace(/header/g, "tête")
    // Shot origin — from X (order: longer matches first)
    .replace(/from a free kick/g, "sur coup franc")
    .replace(/from very close range/g, "de très courte distance")
    .replace(/from more than (\d+) yards/g, "de plus de $1 mètres")
    .replace(/from long range on the left/g, "de loin côté gauche")
    .replace(/from long range on the right/g, "de loin côté droit")
    .replace(/from the centre of the box/g, "du centre de la surface")
    .replace(/from outside the box/g, "de l'extérieur de la surface")
    .replace(/from the left side of the box/g, "du côté gauche de la surface")
    .replace(/from the right side of the box/g, "du côté droit de la surface")
    .replace(/from the right side of the six yard box/g, "du côté droit des six mètres")
    .replace(/from the left side of the six yard box/g, "du côté gauche des six mètres")
    .replace(/from the centre of the six yard box/g, "du centre des six mètres")
    .replace(/from a difficult angle on the left/g, "d'un angle fermé côté gauche")
    .replace(/from a difficult angle on the right/g, "d'un angle fermé côté droit")
    .replace(/close range/g, "courte distance")
    .replace(/long range/g, "longue distance")
    // Shot destination — to X
    .replace(/to the bottom left corner/g, "en bas à gauche")
    .replace(/to the bottom right corner/g, "en bas à droite")
    .replace(/to the top left corner/g, "en haut à gauche")
    .replace(/to the top right corner/g, "en haut à droite")
    .replace(/to the high centre of the goal/g, "en plein centre du but")
    .replace(/to the centre of the goal/g, "au centre du but")
    .replace(/to the bottom of the goal/g, "en bas du but")
    .replace(/to the top of the goal/g, "en haut du but")
    .replace(/to the high left/g, "en haut à gauche")
    .replace(/to the high right/g, "en haut à droite")
    // Shot result
    .replace(/is saved in the bottom left corner/g, "est arrêté dans le coin inférieur gauche")
    .replace(/is saved in the bottom right corner/g, "est arrêté dans le coin inférieur droit")
    .replace(/is saved in the top left corner/g, "est arrêté dans le coin supérieur gauche")
    .replace(/is saved in the top right corner/g, "est arrêté dans le coin supérieur droit")
    .replace(/is saved in the top centre of the goal/g, "est arrêté en haut au centre du but")
    .replace(/is saved in the top center of the goal/g, "est arrêté en haut au centre du but")
    .replace(/is saved in the centre of the goal/g, "est arrêté au centre du but")
    .replace(/top centre of the goal/g, "haut du centre du but")
    .replace(/top center of the goal/g, "haut du centre du but")
    .replace(/is saved in the/g, "est arrêté dans le")
    .replace(/is close, but misses to the right/g, "passe proche du but, mais à droite")
    .replace(/is close, but misses to the left/g, "passe proche du but, mais à gauche")
    .replace(/is close, but misses the top right corner/g, "passe proche du but, mais au-dessus à droite")
    .replace(/is close, but misses the top left corner/g, "passe proche du but, mais au-dessus à gauche")
    .replace(/is close, but misses/g, "passe proche, mais manque")
    .replace(/misses to the right/g, "manque à droite")
    .replace(/misses to the left/g, "manque à gauche")
    .replace(/misses to the/g, "manque du côté")
    .replace(/hits the (?:left |right )?post/g, "frappe le poteau")
    .replace(/hits the bar/g, "frappe la barre")
    .replace(/is blocked/g, "est contré")
    .replace(/is high and wide to the right/g, "passe nettement au-dessus à droite")
    .replace(/is high and wide to the left/g, "passe nettement au-dessus à gauche")
    .replace(/is high and wide/g, "passe nettement au-dessus")
    .replace(/is just a bit too high/g, "passe de peu au-dessus")
    .replace(/is too high/g, "passe au-dessus")
    // Assists
    .replace(/Assisted by/g, "Passe décisive de")
    .replace(/The assist was provided by/g, "La passe décisive vient de")
    .replace(/ by ([A-ZÀ-ÖØ-Ý][^.]+)\./g, " par $1.")
    .replace(/with a through ball/g, "avec une passe en profondeur")
    .replace(/with a cross/g, "avec un centre")
    .replace(/with a cross following a corner/g, "avec un centre après un corner")
    .replace(/with a cross after a corner/g, "avec un centre après un corner")
    .replace(/with a headed pass/g, "avec une tête")
    .replace(/with a lobbed pass/g, "avec une passe lobée")
    .replace(/following a corner/g, "après un corner")
    .replace(/following a set piece situation/g, "sur coup de pied arrêté")
    .replace(/following a fast break/g, "sur contre-attaque")
    // Substitutions
    .replace(/replaces/g, "remplace")
    .replace(/because of an injury/g, "en raison d'une blessure")
    // Fouls & free kicks
    .replace(/for a bad foul/g, "pour une faute grossière")
    .replace(/for dangerous play/g, "pour jeu dangereux")
    .replace(/wins a free kick/g, "obtient un coup franc")
    .replace(/conceded by/g, "commis par")
    .replace(/commits a foul/g, "commet une faute")
    .replace(/commits a hand ball/g, "commet une main")
    // Field position
    .replace(/in the defensive half/g, "dans sa moitié de terrain")
    .replace(/in the attacking half/g, "dans la moitié offensive")
    .replace(/on the left wing/g, "sur l'aile gauche")
    .replace(/on the right wing/g, "sur l'aile droite")
    // Penalties
    .replace(/Penalty saved!/g, "Penalty arrêté !")
    .replace(/Penalty conceded/g, "Penalty concédé")
    .replace(/Penalty - Loss/g, "Penalty manqué")
    .replace(/Penalty - Scored/g, "Penalty transformé")
    // VAR
    .replace(/Own Goal/g, "But contre son camp")
    .replace(/Hand ball/g, "Main")
    .replace(/Goal cancelled/g, "But annulé")
    .replace(/No goal/g, "Pas de but")
    .replace(/Goal awarded/g, "But accordé")
    .replace(/Referee Decision/g, "Décision de l'arbitre")
    // Misc
    .replace(/^The game resumes/g, "Le jeu reprend")
    .replace(/^The match has been suspended/g, "Le match est interrompu")
    .replace(/^Play has been resumed/g, "Le jeu a repris")
    .replace(/^The VAR reviews/g, "La VAR vérifie")
    .replace(/a possible goal/g, "un possible but")
    .replace(/a possible penalty/g, "un possible penalty")
    .replace(/the goal scored by/g, "le but marqué par")
    .replace(/the penalty awarded to/g, "le penalty accordé à");

  return translateTeamReferences(translated);
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
