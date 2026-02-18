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
        Match Analysis: {homeName} vs {awayName}
      </h2>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
        <p>
          This {stage.toLowerCase()} match
          {match.group ? ` in Group ${match.group}` : ""} will see{" "}
          <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) face{" "}
          <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) on{" "}
          {dateFormatted}
          {stadium ? ` at ${stadium.name}` : ""}.
        </p>
        <p>
          According to our prediction model,{" "}
          {prediction.team1WinProb > prediction.team2WinProb
            ? `${homeName} is the favourite with a ${Math.round(prediction.team1WinProb * 100)}% chance of winning`
            : prediction.team2WinProb > prediction.team1WinProb
              ? `${awayName} is the favourite with a ${Math.round(prediction.team2WinProb * 100)}% chance of winning`
              : "both teams are evenly matched according to our estimates"}
          . The most likely score is{" "}
          <strong>{prediction.predictedScore}</strong>.
        </p>
        {predHome && predAway && (
          <p>
            In terms of ELO rating, {homeName} has a score of{" "}
            <strong>{predHome.eloRating}</strong> compared to{" "}
            <strong>{predAway.eloRating}</strong> for {awayName},
            a gap of{" "}
            {Math.abs(predHome.eloRating - predAway.eloRating)} points
            in favour of{" "}
            {predHome.eloRating >= predAway.eloRating
              ? homeName
              : awayName}
            .
          </p>
        )}
        {home.fifaRanking < away.fifaRanking ? (
          <p>
            In the FIFA rankings, {homeName} sits at{" "}
            {home.fifaRanking}
            <sup>th</sup> in the world,{" "}
            {away.fifaRanking - home.fifaRanking} places above{" "}
            {awayName} ({away.fifaRanking}
            <sup>th</sup>). This ranking advantage is reflected in
            our model&apos;s probabilities.
          </p>
        ) : home.fifaRanking > away.fifaRanking ? (
          <p>
            In the FIFA rankings, {awayName} sits at{" "}
            {away.fifaRanking}
            <sup>th</sup> in the world,{" "}
            {home.fifaRanking - away.fifaRanking} places above{" "}
            {homeName} ({home.fifaRanking}
            <sup>th</sup>). However, home advantage could play
            in favour of {homeName}.
          </p>
        ) : null}
        {match.stage === "group" && match.group && (
          <p>
            This match takes place in{" "}
            <Link
              href={`/group/${match.group.toLowerCase()}`}
              className="text-accent hover:underline"
            >
              Group {match.group}
            </Link>{" "}
            of the 2026 World Cup. The result of this encounter
            will be decisive for qualification to the Round of 32.
          </p>
        )}
        {h2h && h2h.totalMatches > 0 && (
          <p>
            Historically, these two teams have met{" "}
            {h2h.totalMatches} times with a record of {h2h.team1Wins}{" "}
            win{h2h.team1Wins !== 1 ? "s" : ""} for {homeName},{" "}
            {h2h.draws} draw{h2h.draws !== 1 ? "s" : ""} and{" "}
            {h2h.team2Wins} win{h2h.team2Wins !== 1 ? "s" : ""}{" "}
            for {awayName}.
          </p>
        )}
      </div>
    </section>
  );
}
