import Link from "next/link";
import type { Team, Match, MatchPrediction, TeamPrediction, H2HRecord } from "@repo/data";

interface MatchAnalysisProps {
  home: Team;
  away: Team;
  match: Match;
  prediction: MatchPrediction;
  predHome: TeamPrediction | undefined;
  predAway: TeamPrediction | undefined;
  h2h: H2HRecord | undefined;
  stage: string;
  homeName: string;
  awayName: string;
  dateFormatted: string;
  stadium: { name: string } | undefined;
}

export function MatchAnalysis({
  home,
  away,
  match,
  prediction,
  predHome,
  predAway,
  h2h,
  stage,
  homeName,
  awayName,
  dateFormatted,
  stadium,
}: MatchAnalysisProps) {
  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Spielanalyse: {homeName} vs {awayName}
      </h2>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
        <p>
          Dieses Spiel der {stage}
          {match.group ? ` in Gruppe ${match.group}` : ""} bringt{" "}
          <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) gegen{" "}
          <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) am{" "}
          {dateFormatted}
          {stadium ? ` im ${stadium.name}` : ""} zusammen.
        </p>
        <p>
          Laut unserem Prognosemodell{" "}
          {prediction.team1WinProb > prediction.team2WinProb
            ? `ist ${homeName} Favorit mit ${Math.round(prediction.team1WinProb * 100)}% Siegwahrscheinlichkeit`
            : prediction.team2WinProb > prediction.team1WinProb
              ? `ist ${awayName} Favorit mit ${Math.round(prediction.team2WinProb * 100)}% Siegwahrscheinlichkeit`
              : "neutralisieren sich beide Mannschaften laut unseren Schaetzungen"}
          . Das wahrscheinlichste Ergebnis ist{" "}
          <strong>{prediction.predictedScore}</strong>.
        </p>
        {predHome && predAway && (
          <p>
            Im ELO-Rating hat {homeName} einen Wert von{" "}
            <strong>{predHome.eloRating}</strong> gegenueber{" "}
            <strong>{predAway.eloRating}</strong> fuer {awayName},
            ein Unterschied von{" "}
            {Math.abs(predHome.eloRating - predAway.eloRating)} Punkten
            zugunsten von{" "}
            {predHome.eloRating >= predAway.eloRating
              ? homeName
              : awayName}
            .
          </p>
        )}
        {home.fifaRanking < away.fifaRanking ? (
          <p>
            In der FIFA-Weltrangliste belegt {homeName} den{" "}
            {home.fifaRanking}
            . Platz, also{" "}
            {away.fifaRanking - home.fifaRanking} Plaetze vor{" "}
            {awayName} ({away.fifaRanking}
            . Platz). Dieser Ranglistenvorteil spiegelt sich
            in den Wahrscheinlichkeiten unseres Modells wider.
          </p>
        ) : home.fifaRanking > away.fifaRanking ? (
          <p>
            In der FIFA-Weltrangliste belegt {awayName} den{" "}
            {away.fifaRanking}
            . Platz, also{" "}
            {home.fifaRanking - away.fifaRanking} Plaetze vor{" "}
            {homeName} ({home.fifaRanking}
            . Platz). Trotzdem koennte der Heimvorteil
            fuer {homeName} sprechen.
          </p>
        ) : null}
        {match.stage === "group" && match.group && (
          <p>
            Dieses Spiel findet im Rahmen der{" "}
            <Link
              href={`/gruppe/${match.group.toLowerCase()}`}
              className="text-primary hover:underline"
            >
              Gruppe {match.group}
            </Link>{" "}
            der WM 2026 statt. Das Ergebnis dieser Begegnung
            wird entscheidend fuer die Qualifikation zum Achtelfinale sein.
          </p>
        )}
        {h2h && h2h.totalMatches > 0 && (
          <p>
            Historisch gesehen haben sich diese beiden Mannschaften{" "}
            {h2h.totalMatches} Mal getroffen, mit einer Bilanz von {h2h.team1Wins}{" "}
            Sieg{h2h.team1Wins > 1 ? "en" : ""} fuer {homeName},{" "}
            {h2h.draws} Unentschieden und{" "}
            {h2h.team2Wins} Sieg{h2h.team2Wins > 1 ? "en" : ""}{" "}
            fuer {awayName}.
          </p>
        )}
      </div>
    </section>
  );
}
