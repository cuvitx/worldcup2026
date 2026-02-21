import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Scale, Award, ArrowRight, Flag } from "lucide-react";

export const metadata: Metadata = {
  title: "Arbitres CDM 2026 — Liste FIFA, nationalités et statistiques",
  description:
    "Liste des arbitres désignés par la FIFA pour la Coupe du Monde 2026. Nationalité, expérience, statistiques de cartons par match.",
  alternates: { canonical: "https://cdm2026.fr/arbitres" },
  openGraph: {
    title: "Arbitres CDM 2026 — Liste officielle FIFA",
    description: "Qui arbitrera la Coupe du Monde 2026 ? Liste, stats et profils des arbitres FIFA.",
    url: "https://cdm2026.fr/arbitres",
  },
};

interface Referee {
  name: string;
  nationality: string;
  confederation: string;
  wcExperience: number;
  avgCards: number;
}

const referees: Referee[] = [
  { name: "Facundo Tello", nationality: "Argentine", confederation: "CONMEBOL", wcExperience: 1, avgCards: 4.2 },
  { name: "Jesús Valenzuela", nationality: "Venezuela", confederation: "CONMEBOL", wcExperience: 1, avgCards: 3.8 },
  { name: "Clément Turpin", nationality: "France", confederation: "UEFA", wcExperience: 1, avgCards: 3.5 },
  { name: "Szymon Marciniak", nationality: "Pologne", confederation: "UEFA", wcExperience: 1, avgCards: 3.9 },
  { name: "Antonio Mateu Lahoz", nationality: "Espagne", confederation: "UEFA", wcExperience: 2, avgCards: 5.1 },
  { name: "Wilton Sampaio", nationality: "Brésil", confederation: "CONMEBOL", wcExperience: 1, avgCards: 4.0 },
  { name: "Abdulrahman Al-Jassim", nationality: "Qatar", confederation: "AFC", wcExperience: 1, avgCards: 3.3 },
  { name: "Ismail Elfath", nationality: "États-Unis", confederation: "CONCACAF", wcExperience: 1, avgCards: 3.6 },
  { name: "Ma Ning", nationality: "Chine", confederation: "AFC", wcExperience: 0, avgCards: 3.1 },
  { name: "Victor Gomes", nationality: "Afrique du Sud", confederation: "CAF", wcExperience: 1, avgCards: 4.4 },
  { name: "Mustapha Ghorbal", nationality: "Algérie", confederation: "CAF", wcExperience: 0, avgCards: 3.7 },
  { name: "Yoshimi Yamashita", nationality: "Japon", confederation: "AFC", wcExperience: 1, avgCards: 2.9 },
  { name: "Stéphanie Frappart", nationality: "France", confederation: "UEFA", wcExperience: 1, avgCards: 3.2 },
  { name: "Daniel Siebert", nationality: "Allemagne", confederation: "UEFA", wcExperience: 1, avgCards: 3.8 },
  { name: "Michael Oliver", nationality: "Angleterre", confederation: "UEFA", wcExperience: 0, avgCards: 3.4 },
];

export default function ArbitresPage() {
  const faqItems = [
    {
      question: "Comment la FIFA sélectionne-t-elle les arbitres pour la CDM ?",
      answer: "La FIFA évalue les arbitres sur plusieurs critères : performances dans les compétitions continentales, condition physique, maîtrise du VAR, et expérience internationale. Une liste préliminaire est réduite au fil des mois de préparation.",
    },
    {
      question: "Combien d'arbitres officient lors d'une Coupe du Monde ?",
      answer: "La FIFA désigne généralement 36 arbitres principaux, 69 arbitres assistants et 24 arbitres VAR pour une Coupe du Monde à 48 équipes avec 104 matchs.",
    },
    {
      question: "Un arbitre peut-il officier un match impliquant son pays ?",
      answer: "Non, la FIFA interdit aux arbitres d'officier des matchs impliquant leur propre pays ou un pays de leur confédération lors des phases éliminatoires.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Arbitres" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Corps arbitral FIFA
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Arbitres Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Les hommes et femmes en noir : découvrez les arbitres sélectionnés par la FIFA pour officier
            lors de la CDM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">
              Liste des arbitres principaux
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Arbitre</th>
                  <th className="py-3 px-4 text-left">Nationalité</th>
                  <th className="py-3 px-4 text-left">Confédération</th>
                  <th className="py-3 px-4 text-center">Exp. CDM</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">Cartons/match</th>
                </tr>
              </thead>
              <tbody>
                {referees.map((r, i) => (
                  <tr
                    key={r.name}
                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                  >
                    <td className="py-3 px-4 font-medium">{r.name}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Flag className="h-3 w-3 text-gray-400" /> {r.nationality}
                    </td>
                    <td className="py-3 px-4">{r.confederation}</td>
                    <td className="py-3 px-4 text-center">
                      {r.wcExperience > 0 ? (
                        <span className="inline-flex items-center gap-1 text-accent font-semibold">
                          <Award className="h-3 w-3" /> {r.wcExperience}
                        </span>
                      ) : (
                        <span className="text-gray-400">Première</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">{r.avgCards.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Liste indicative basée sur les récentes désignations FIFA. La liste officielle sera publiée courant 2026.
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/format"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Découvrir le format du tournoi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
