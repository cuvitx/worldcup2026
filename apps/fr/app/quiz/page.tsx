import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("./components/Quiz"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Chargement du quiz...</p>
      </div>
    </div>
  ),
  ssr: false,
});

export const metadata: Metadata = {
  title: "Quiz Coupe du Monde 2026 | 200+ questions pour tester vos connaissances",
  description:
    "Quiz CDM 2026 : 200+ questions sur l'histoire (1930-2022), les joueurs légendaires, les stades, les records, les règles et la géographie des villes hôtes. Testez votre niveau et défiez vos amis — c'est gratuit !",
  alternates: {
    canonical: "https://cdm2026.fr/quiz",
  },
  openGraph: {
    title: "Quiz CDM 2026 | Êtes-vous vraiment incollable ?",
    description:
      "200+ questions sur l'histoire, les joueurs, les stades, les règles et les villes hôtes 2026. Prouvez que vous êtes un expert — et défiez vos amis !",
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

      <nav className="bg-white dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Quiz</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            ⚽ Êtes-vous vraiment incollable sur la CDM 2026 ?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            200+ questions sur l&apos;histoire (1930-2022), les joueurs légendaires, les stades, les règles et les villes hôtes 2026.
            Prouvez que vous êtes un expert — et défiez vos amis !
          </p>
        </div>

        <Quiz />
      </main>
    </>
  );
}
