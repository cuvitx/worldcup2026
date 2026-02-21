import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparateur d'équipes — Coupe du Monde 2026",
  description:
    "Comparez les équipes de la Coupe du Monde 2026 : classement FIFA, palmarès, statistiques et joueurs clés. Outil interactif gratuit.",
  alternates: { canonical: "https://www.cdm2026.fr/comparateur-equipes" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
