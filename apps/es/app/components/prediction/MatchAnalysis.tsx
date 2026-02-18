import Link from "next/link";
import type { Team, Match, H2HRecord } from "@repo/data/types";
import type { MatchPrediction, TeamPrediction } from "@repo/data/predictions";

interface MatchAnalysisProps {
  match: Match;
  home: Team;
  away: Team;
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
  match,
  home,
  away,
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
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Analisis del partido: {homeName} vs {awayName}
      </h2>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
        <p>
          Este partido de {stage.toLowerCase()}
          {match.group ? ` del Grupo ${match.group}` : ""} enfrentara a{" "}
          <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) contra{" "}
          <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) el{" "}
          {dateFormatted}
          {stadium ? ` en el ${stadium.name}` : ""}.
        </p>
        <p>
          Segun nuestro modelo de prediccion,{" "}
          {prediction.team1WinProb > prediction.team2WinProb
            ? `${homeName} es favorito con un ${Math.round(prediction.team1WinProb * 100)}% de probabilidades de victoria`
            : prediction.team2WinProb > prediction.team1WinProb
              ? `${awayName} es favorito con un ${Math.round(prediction.team2WinProb * 100)}% de probabilidades de victoria`
              : "ambas selecciones estan igualadas segun nuestras estimaciones"}
          . El resultado mas probable es{" "}
          <strong>{prediction.predictedScore}</strong>.
        </p>
        {predHome && predAway && (
          <p>
            En terminos de rating ELO, {homeName} cuenta con una puntuacion de{" "}
            <strong>{predHome.eloRating}</strong> frente a{" "}
            <strong>{predAway.eloRating}</strong> de {awayName},
            lo que supone una diferencia de{" "}
            {Math.abs(predHome.eloRating - predAway.eloRating)} puntos
            a favor de{" "}
            {predHome.eloRating >= predAway.eloRating
              ? homeName
              : awayName}
            .
          </p>
        )}
        {home.fifaRanking < away.fifaRanking ? (
          <p>
            En el ranking FIFA, {homeName} ocupa el puesto{" "}
            {home.fifaRanking}
            <sup>o</sup> del mundo, es decir,{" "}
            {away.fifaRanking - home.fifaRanking} posiciones por encima de{" "}
            {awayName} ({away.fifaRanking}
            <sup>o</sup>). Esta ventaja en la clasificacion se refleja en
            las probabilidades de nuestro modelo.
          </p>
        ) : home.fifaRanking > away.fifaRanking ? (
          <p>
            En el ranking FIFA, {awayName} ocupa el puesto{" "}
            {away.fifaRanking}
            <sup>o</sup> del mundo, es decir,{" "}
            {home.fifaRanking - away.fifaRanking} posiciones por encima de{" "}
            {homeName} ({home.fifaRanking}
            <sup>o</sup>). A pesar de ello, la ventaja de jugar como local podria
            favorecer a {homeName}.
          </p>
        ) : null}
        {match.stage === "group" && match.group && (
          <p>
            Este partido se disputa en el marco del{" "}
            <Link
              href={`/grupo/${match.group.toLowerCase()}`}
              className="text-accent hover:underline"
            >
              Grupo {match.group}
            </Link>{" "}
            de la Copa del Mundo 2026. El resultado de este encuentro
            sera determinante para la clasificacion a los dieciseisavos de final.
          </p>
        )}
        {h2h && h2h.totalMatches > 0 && (
          <p>
            Historicamente, estas dos selecciones se han enfrentado{" "}
            {h2h.totalMatches} veces con un balance de {h2h.team1Wins}{" "}
            victoria{h2h.team1Wins > 1 ? "s" : ""} para {homeName},{" "}
            {h2h.draws} empate{h2h.draws > 1 ? "s" : ""} y{" "}
            {h2h.team2Wins} victoria{h2h.team2Wins > 1 ? "s" : ""}{" "}
            para {awayName}.
          </p>
        )}
      </div>
    </section>
  );
}
