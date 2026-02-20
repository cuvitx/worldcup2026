import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grille de pronostics CDM 2026 — Remplissez vos prédictions",
  description:
    "Remplissez votre grille de pronostics pour la Coupe du Monde 2026. Prédisez les scores des 104 matchs et partagez vos résultats avec vos amis.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
