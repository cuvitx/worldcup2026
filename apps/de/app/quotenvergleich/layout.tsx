import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotenvergleich WM 2026 | Beste Quoten WM",
  description:
    "Vergleichen Sie die Quoten von PokerStars Sports, Betsson, Betano und Genybet für alle Gruppenspiele der WM 2026. Finden Sie die beste Quote.",
  openGraph: {
    title: "Quotenvergleich -- WM 2026",
    description: "Die besten Quoten der Wettanbieter für die WM 2026.",
  },
  alternates: { canonical: "https://www.wm2026guide.de/quotenvergleich" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
