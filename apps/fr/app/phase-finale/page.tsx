import type { Metadata } from "next";
import { OfficialKnockoutOverview } from "../components/OfficialKnockoutPages";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Phase finale Coupe du Monde 2026 : calendrier, tableau et résultats",
  description:
    "Phase finale de la Coupe du Monde 2026 : calendrier officiel, tableau, 16es, 8es, quarts, demi-finales, finale, vrais matchs, scores, horaires et stades.",
  openGraph: {
    title: "Phase finale CDM 2026 : calendrier, tableau et résultats",
    description:
      "Suivez la phase finale de la Coupe du Monde 2026 avec les vrais matchs, scores, stades et liens vers les pronostics.",
    url: "https://www.cdm2026.fr/phase-finale",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/phase-finale",
  },
};

export default function PhaseFinalePage() {
  return <OfficialKnockoutOverview />;
}
