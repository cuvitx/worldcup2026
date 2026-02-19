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
    <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Analyse du match : {homeName} vs {awayName}
      </h2>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
        <p>
          Ce match de {stage.toLowerCase()}
          {match.group ? ` du Groupe ${match.group}` : ""} opposera{" "}
          <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) a{" "}
          <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) le{" "}
          {dateFormatted}
          {stadium ? ` au ${stadium.name}` : ""}.
        </p>
        <p>
          Selon notre modele de prediction,{" "}
          {prediction.team1WinProb > prediction.team2WinProb
            ? `${homeName} est favori avec ${Math.round(prediction.team1WinProb * 100)}% de chances de victoire`
            : prediction.team2WinProb > prediction.team1WinProb
              ? `${awayName} est favori avec ${Math.round(prediction.team2WinProb * 100)}% de chances de victoire`
              : "les deux équipes se neutralisent selon nos estimations"}
          . Le score le plus probable est de{" "}
          <strong>{prediction.predictedScore}</strong>.
        </p>
        {predHome && predAway && (
          <p>
            En termes de rating ELO, {homeName} affiche un score de{" "}
            <strong>{predHome.eloRating}</strong> contre{" "}
            <strong>{predAway.eloRating}</strong> pour {awayName},
            soit un ecart de{" "}
            {Math.abs(predHome.eloRating - predAway.eloRating)} points
            en faveur de{" "}
            {predHome.eloRating >= predAway.eloRating
              ? homeName
              : awayName}
            .
          </p>
        )}
        {home.fifaRanking < away.fifaRanking ? (
          <p>
            Au classement FIFA, {homeName} occupe la{" "}
            {home.fifaRanking}
            <sup>e</sup> place mondiale, soit{" "}
            {away.fifaRanking - home.fifaRanking} rangs au-dessus de{" "}
            {awayName} ({away.fifaRanking}
            <sup>e</sup>). Cet avantage au classement se reflete dans
            les probabilites de notre modele.
          </p>
        ) : home.fifaRanking > away.fifaRanking ? (
          <p>
            Au classement FIFA, {awayName} occupe la{" "}
            {away.fifaRanking}
            <sup>e</sup> place mondiale, soit{" "}
            {home.fifaRanking - away.fifaRanking} rangs au-dessus de{" "}
            {homeName} ({home.fifaRanking}
            <sup>e</sup>). Malgre cela, l&apos;avantage du terrain pourrait
            jouer un faveur de {homeName}.
          </p>
        ) : null}
        {match.stage === "group" && match.group && (
          <p>
            Ce match se déroule dans le cadre du{" "}
            <Link
              href={`/groupe/${match.group.toLowerCase()}`}
              className="text-primary hover:underline"
            >
              Groupe {match.group}
            </Link>{" "}
            de la Coupe du Monde 2026. Le résultat de cette rencontre
            sera determinant pour la qualification aux 32es de finale.
          </p>
        )}
        {h2h && h2h.totalMatches > 0 && (
          <p>
            Historiquement, ces deux équipes se sont affrontees{" "}
            {h2h.totalMatches} fois avec un bilan de {h2h.team1Wins}{" "}
            victoire{h2h.team1Wins > 1 ? "s" : ""} pour {homeName},{" "}
            {h2h.draws} nul{h2h.draws > 1 ? "s" : ""} et{" "}
            {h2h.team2Wins} victoire{h2h.team2Wins > 1 ? "s" : ""}{" "}
            pour {awayName}.
          </p>
        )}
      </div>
    </section>
  );
}
