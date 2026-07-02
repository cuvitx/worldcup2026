import type { Metadata } from "next";
import { OfficialKnockoutRoundPage } from "../components/OfficialKnockoutPages";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quarts de finale Coupe du Monde 2026 : matchs et résultats",
  description:
    "Tous les quarts de finale de la Coupe du Monde 2026 : affiches, scores, dates, horaires, stades, fiches match et pronostics.",
  openGraph: {
    title: "Quarts de finale CDM 2026 : matchs et résultats",
    description:
      "Suivez les quarts de finale de la Coupe du Monde 2026 avec les vrais matchs, scores et stades.",
    url: "https://www.cdm2026.fr/quarts-de-finale",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/quarts-de-finale",
  },
};

export default function QuartsDeFinale() {
  return <OfficialKnockoutRoundPage stage="quarter-final" />;
}
