import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz : Quel pays vas-tu supporter à la CDM 2026 ?",
  description:
    "Réponds à 10 questions de personnalité et découvre quelle équipe de la Coupe du Monde 2026 est faite pour toi ! Quiz fun et gratuit.",
  openGraph: {
    title: "Quiz : Quel pays vas-tu supporter à la CDM 2026 ?",
    description: "10 questions pour trouver ton équipe idéale. Fais le quiz et partage ton résultat !",
    url: "https://cdm2026.fr/quiz/supporter",
  },
};

export default function QuizSupporterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
