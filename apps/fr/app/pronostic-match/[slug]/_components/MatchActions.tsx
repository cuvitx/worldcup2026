import { ShareButtons } from "@repo/ui/share-buttons";

interface MatchActionsProps {
  matchSlug: string;
  homeName: string;
  awayName: string;
  predictionText: string;
}

export function MatchActions({
  matchSlug,
  homeName,
  awayName,
  predictionText,
}: MatchActionsProps) {
  return (
    <>
      <div className="bg-whiteslate-900 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <ShareButtons
            url={`https://www.cdm2026.fr/pronostic-match/${matchSlug}`}
            text={predictionText}
            label="Partager ce pronostic"
          />
        </div>
      </div>
    </>
  );
}
