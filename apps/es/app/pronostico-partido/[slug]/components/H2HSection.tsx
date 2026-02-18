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
        Historial de enfrentamientos
      </h2>
      {h2h && h2h.totalMatches > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team1Wins}
              </p>
              <p className="text-xs text-gray-500">
                Victorias {homeName}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <p className="text-3xl font-bold text-gray-600">
                {h2h.draws}
              </p>
              <p className="text-xs text-gray-500">Empates</p>
            </div>
            <div className="rounded-lg bg-accent/5 p-4 text-center">
              <p className="text-3xl font-bold text-accent">
                {h2h.team2Wins}
              </p>
              <p className="text-xs text-gray-500">
                Victorias {awayName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.totalMatches}
              </p>
              <p className="text-xs text-gray-500">Partidos jugados</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-primary">
                {h2h.team1Goals} - {h2h.team2Goals}
              </p>
              <p className="text-xs text-gray-500">Goles anotados</p>
            </div>
          </div>
          {h2h.lastMatch && (
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Ultimo partido:</span>{" "}
              {h2h.lastMatch}
              {h2h.lastMatchDate &&
                ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                  "es-ES",
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
              Ver el historial completo de enfrentamientos &rarr;
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            {homeName} y {awayName} nunca se han enfrentado. La
            Copa del Mundo 2026 sera su primer enfrentamiento
            historico.
          </p>
          <div className="text-center">
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              Ver la pagina de enfrentamiento &rarr;
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
