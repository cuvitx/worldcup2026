import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz drapeaux — Coupe du Monde 2026",
  description:
    "Reconnaissez-vous les drapeaux des 48 équipes de la Coupe du Monde 2026 ? Testez vos connaissances avec ce quiz interactif et gratuit.",
  alternates: { canonical: "https://www.cdm2026.fr/quiz/drapeaux" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
