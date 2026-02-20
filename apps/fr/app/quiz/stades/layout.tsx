import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz stades — Coupe du Monde 2026",
  description:
    "Connaissez-vous les 16 stades de la Coupe du Monde 2026 ? Quiz interactif sur les enceintes aux USA, Canada et Mexique. Testez-vous !",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
