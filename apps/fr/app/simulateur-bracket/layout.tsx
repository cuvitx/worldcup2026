import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulateur de bracket CDM 2026 — Phase éliminatoire",
  description:
    "Simulez le tableau final de la Coupe du Monde 2026 : des 16èmes de finale à la grande finale. Créez votre bracket et partagez-le.",
  alternates: { canonical: "https://cdm2026.fr/simulateur-bracket" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
