import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import dynamic from "next/dynamic";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { RelatedLinks } from "../components/RelatedLinks";

const Quiz = dynamic(() => import("./components/Quiz"), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Chargement du quiz...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Quiz Coupe du Monde 2026 | 200+ questions pour tester vos connaissances",
  description:
    "Quiz Coupe du Monde 2026 : 200+ questions sur l'histoire, les joueurs, les stades et les records. Testez-vous gratuitement !",
  alternates: {
    canonical: "https://www.cdm2026.fr/quiz",
  },
  openGraph: {
    title: "Quiz CDM 2026 | Êtes-vous vraiment incollable ?",
    description:
      "200+ questions sur l'histoire, les joueurs, les stades, les règles et les villes hôtes 2026. Prouvez que vous êtes un expert — et défiez vos amis !",
  },
};

export default function QuizPage() {
  const faqItems = [
    {
      question: "Combien de questions contient le quiz CDM 2026 ?",
      answer: "Le quiz Coupe du Monde 2026 contient plus de 200 questions réparties en 6 catégories : Histoire (1930-2022), Joueurs légendaires, Stades 2026, Records et statistiques, Règles du jeu, et Géographie des villes hôtes. Chaque session de quiz génère aléatoirement 20 questions parmi ce pool pour garantir une expérience unique à chaque tentative. Vous pouvez refaire le quiz autant de fois que vous le souhaitez."
    },
    {
      question: "Comment est calculé mon score au quiz ?",
      answer: "Le score est calculé simplement : 1 point par bonne réponse, 0 point par mauvaise réponse. Sur 20 questions, un score de 16+ vous classe comme 'Expert', 12-15 comme 'Connaisseur', 8-11 comme 'Amateur' et -8 comme 'Débutant'. Le quiz affiche également le temps total passé et votre taux de réussite en pourcentage. Vous pouvez partager votre score avec vos amis via un lien de partage automatique."
    },
    {
      question: "Les questions du quiz sont-elles basées sur de vraies données ?",
      answer: "Oui, toutes les questions sont vérifiées et basées sur des sources officielles : FIFA, archives historiques, classements FIFA, données des stades, biographies de joueurs et règlements officiels. Les réponses sont accompagnées d'explications pédagogiques pour apprendre tout en jouant. Le quiz est régulièrement mis à jour avec de nouvelles questions et des corrections si nécessaire."
    },
    {
      question: "Puis-je refaire le quiz plusieurs fois ?",
      answer: "Absolument ! Le quiz est conçu pour être rejoué à l'infini. À chaque nouvelle tentative, 20 questions sont tirées aléatoirement parmi le pool de 200+, garantissant une expérience différente à chaque fois. Vous pouvez ainsi tester vos connaissances, apprendre de vos erreurs et progresser. Le quiz sauvegarde automatiquement votre meilleur score dans votre navigateur (localStorage)."
    },
    {
      question: "Le quiz fonctionne-t-il sur mobile ?",
      answer: "Oui, le quiz est 100% responsive et optimisé pour les mobiles, tablettes et ordinateurs. L'interface s'adapte automatiquement à la taille de votre écran. Vous pouvez jouer depuis votre smartphone en déplacement, dans les transports ou pendant une pause. Le quiz ne nécessite aucune installation et fonctionne directement dans votre navigateur web."
    }
  ];

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
<Breadcrumb transparent items={[
          {
                    "label": "Accueil",
                    "href": "/"
          },
          {
                    "label": "Quiz"
          }
]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Quiz</li>
          </ol>
        </div>
      </nav>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Testez vos connaissances</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Êtes-vous vraiment incollable sur la CDM 2026 ?
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            200+ questions sur l&apos;histoire (1930-2022), les joueurs légendaires, les stades, les règles et les villes hôtes 2026.
            Prouvez que vous êtes un expert — et défiez vos amis !
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Quiz />

        <div className="mt-16">
          <RelatedLinks
            variant="compact"
            links={[
              {
                href: "/histoire",
                title: " Histoire de la CDM",
                description: "Timeline complète depuis 1930 pour réviser avant le quiz.",
                icon: ""
              },
              {
                href: "/simulateur",
                title: " Simulateur de tournoi",
                description: "Simulez votre propre bracket et prédisez le vainqueur.",
                icon: ""
              },
              {
                href: "/equipes",
                title: "Les 48 équipes",
                description: "Explorez toutes les équipes qualifiées avec stats et pronostics.",
                icon: ""
              }
            ]}
          />
          <FAQSection title="Questions sur le quiz" items={faqItems} />
        </div>
      </main>
    </>
  );
}
