import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "./components/Quiz";

export const metadata: Metadata = {
  title: "Quiz Coupe du Monde 2026 | Testez vos connaissances",
  description:
    "Testez vos connaissances sur la Coupe du Monde 2026 avec notre quiz interactif. 60+ questions sur l'histoire, les joueurs et les stades.",
  openGraph: {
    title: "Quiz Coupe du Monde 2026 | Testez vos connaissances",
    description:
      "Testez vos connaissances sur la Coupe du Monde 2026 avec notre quiz interactif. 60+ questions sur l'histoire, les joueurs et les stades.",
  },
};

export default function QuizPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Quiz", item: "https://www.cdm2026.fr/quiz" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="bg-white/5 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-white font-medium">Quiz</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            ⚽ Quiz Coupe du Monde 2026
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Testez vos connaissances sur la Coupe du Monde avec plus de 60 questions sur l&apos;histoire,
            les joueurs, les stades et la CDM 2026.
          </p>
        </div>

        <Quiz />
      </main>
    </>
  );
}
