import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparateur cotes Coupe du Monde 2026 | Meilleures cotes CDM",
  description:
    "Comparez les cotes de Betclic, Winamax, Parions Sport, Unibet et ZEbet pour tous les matchs de la phase de groupes de la Coupe du Monde 2026. Trouvez la meilleure cote.",
  openGraph: {
    title: "Comparateur de cotes – Coupe du Monde 2026",
    description: "Les meilleures cotes des bookmakers français pour le Mondial 2026.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
