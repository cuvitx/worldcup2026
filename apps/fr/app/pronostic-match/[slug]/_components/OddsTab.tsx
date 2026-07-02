import type { MatchOddsResult } from "@repo/api/football/odds";
import Link from "next/link";
import CommunityVote from "../../../components/CommunityVote";
import { OddsTable } from "../components";

interface OddsTabProps {
  odds: { home: string; draw: string; away: string } | null;
  homeName: string;
  awayName: string;
  matchSlug: string;
  homeRanking: number;
  awayRanking: number;
  realOdds?: MatchOddsResult | null;
}

export function OddsTab({
  odds,
  homeName,
  awayName,
  matchSlug,
  homeRanking,
  awayRanking,
  realOdds,
}: OddsTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {odds ? (
            <OddsTable
              odds={odds}
              homeName={homeName}
              awayName={awayName}
              realOdds={realOdds}
              matchSlug={matchSlug}
            />
          ) : (
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Cotes à venir
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Cotes {homeName} vs {awayName}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Les cotes 1-N-2 seront affichées dès qu'un marché exploitable
                sera disponible pour cette affiche. En attendant, consultez la
                fiche match et le score exact pour préparer votre lecture du match.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/match/${matchSlug}`}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
                >
                  Fiche du match
                </Link>
                <Link
                  href={`/score-exact/${matchSlug}`}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary/40 hover:text-primary"
                >
                  Score exact
                </Link>
              </div>
            </section>
          )}
        </div>
        <div className="space-y-4">
          <CommunityVote
            slug={matchSlug}
            homeName={homeName}
            awayName={awayName}
            homeRanking={homeRanking}
            awayRanking={awayRanking}
          />
        </div>
      </div>
    </div>
  );
}
