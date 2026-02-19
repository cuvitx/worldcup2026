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
        Historique des confrontations
      </h2>
      {h2h && h2h.totalMatches > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-2 mb-6 sm:gap-4">
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team1Wins}
              </p>
              <p className="text-xs text-gray-500">
                Victoires {homeName}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-3xl font-bold text-gray-600">
                {h2h.draws}
              </p>
              <p className="text-xs text-gray-500">Nuls</p>
            </div>
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team2Wins}
              </p>
              <p className="text-xs text-gray-500">
                Victoires {awayName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.totalMatches}
              </p>
              <p className="text-xs text-gray-500">Matchs joues</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.team1Goals} - {h2h.team2Goals}
              </p>
              <p className="text-xs text-gray-500">Buts marques</p>
            </div>
          </div>
          {h2h.lastMatch && (
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Dernier match :</span>{" "}
              {h2h.lastMatch}
              {h2h.lastMatchDate &&
                ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                  "fr-FR",
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
              Voir l&apos;historique complet des confrontations &rarr;
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            {homeName} et {awayName} ne se sont jamais affrontés. La
            Coupe du Monde 2026 sera leur première confrontation
            historique.
          </p>
          <div className="text-center">
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              Voir la page de confrontation &rarr;
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
