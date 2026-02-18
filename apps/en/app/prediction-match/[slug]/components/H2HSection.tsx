import Link from "next/link";
import type { Team, H2HRecord } from "@repo/data";

interface H2HSectionProps {
  home: Team;
  away: Team;
  h2h: H2HRecord | undefined;
  homeName: string;
  awayName: string;
}

export function H2HSection({
  home,
  away,
  h2h,
  homeName,
  awayName,
}: H2HSectionProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        Head-to-Head History
      </h2>
      {h2h && h2h.totalMatches > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team1Wins}
              </p>
              <p className="text-xs text-gray-500">
                {homeName} wins
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-3xl font-bold text-gray-600">
                {h2h.draws}
              </p>
              <p className="text-xs text-gray-500">Draws</p>
            </div>
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team2Wins}
              </p>
              <p className="text-xs text-gray-500">
                {awayName} wins
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.totalMatches}
              </p>
              <p className="text-xs text-gray-500">Matches played</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.team1Goals} - {h2h.team2Goals}
              </p>
              <p className="text-xs text-gray-500">Goals scored</p>
            </div>
          </div>
          {h2h.lastMatch && (
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Last match:</span>{" "}
              {h2h.lastMatch}
              {h2h.lastMatchDate &&
                ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )})`}
            </p>
          )}
          <div className="text-center">
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              View full head-to-head history &rarr;
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            {homeName} and {awayName} have never met before. The
            2026 World Cup will be their first ever encounter.
          </p>
          <div className="text-center">
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              View head-to-head page &rarr;
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
