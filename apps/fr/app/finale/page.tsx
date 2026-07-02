import type { Metadata } from "next";
import { OfficialKnockoutRoundPage } from "../components/OfficialKnockoutPages";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Finale Coupe du Monde 2026 : match, score et résultat",
  description:
    "Finale de la Coupe du Monde 2026 : finalistes, score, date, horaire, MetLife Stadium, fiche match et pronostic.",
  openGraph: {
    title: "Finale CDM 2026 : match, score et résultat",
    description:
      "Suivez la finale de la Coupe du Monde 2026 avec les vrais finalistes, le score et le stade.",
    url: "https://www.cdm2026.fr/finale",
  },
  alternates: {
    canonical: "https://www.cdm2026.fr/finale",
  },
};

export default function FinalePage() {
  return <OfficialKnockoutRoundPage stage="final" />;
}
