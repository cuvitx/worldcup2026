import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur de budget CDM 2026 — Estimez vos dépenses",
  description:
    "Calculez votre budget pour la Coupe du Monde 2026 : vols, hôtels, billets, repas et transport selon votre profil. Outil gratuit et personnalisé.",
  alternates: { canonical: "https://cdm2026.fr/calculateur-budget" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
