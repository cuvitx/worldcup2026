import type { Team, H2HRecord } from "@repo/data";
import { H2HSection } from "../components";

interface H2HTabProps {
  home: Team | undefined;
  away: Team | undefined;
  h2h: H2HRecord | undefined;
  homeName: string;
  awayName: string;
}

export function H2HTab({ home, away, h2h, homeName, awayName }: H2HTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {home && away ? (
        <H2HSection
          home={home}
          away={away}
          h2h={h2h}
          homeName={homeName}
          awayName={awayName}
        />
      ) : (
        <div className="text-center py-12 text-gray-500">
          Historique non disponible pour ce match.
        </div>
      )}
    </div>
  );
}
