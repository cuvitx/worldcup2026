import type { Metadata } from "next";
import { OfficialKnockoutRoundPage } from "../components/OfficialKnockoutPages";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Demi-finales Coupe du Monde 2026 : matchs et résultats",
  description:
    "Toutes les demi-finales de la Coupe du Monde 2026 : affiches, scores, dates, horaires, stades, fiches match et pronostics.",
  openGraph: {
    title: "Demi-finales CDM 2026 : matchs et résultats",
    description:
      "Suivez les demi-finales de la Coupe du Monde 2026 avec les vrais matchs, scores et stades.",
    url: "https://www.cdm2026.fr/demi-finales",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/demi-finales",
  },
};

export default function DemiFinales() {
  return <OfficialKnockoutRoundPage stage="semi-final" />;
}
