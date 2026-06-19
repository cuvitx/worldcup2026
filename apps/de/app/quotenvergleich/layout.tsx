import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparateur cotes WM 2026 | Meilleures cotes CDM",
  description:
    "Comparez les cotes de PokerStars Sports, Betsson, Betano et Genybet pour tous les matchs de la phase de groupes de la WM 2026. Trouvez la meilleure cote.",
  openGraph: {
    title: "Comparateur de cotes – WM 2026",
    description: "Les meilleures cotes des bookmakers français pour le Mondial 2026.",
  },
  alternates: { canonical: "https://www.wm2026guide.de/comparateur-cotes" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
