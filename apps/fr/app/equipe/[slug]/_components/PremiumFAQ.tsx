import type { Team } from "@repo/data";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface FAQItem {
  question: string;
  answer: string;
}

interface PremiumFAQProps {
  team: Team;
  prediction?: Prediction;
  winnerOdds: string;
}

function generateFAQItems(team: Team, prediction?: Prediction, winnerOdds?: string): FAQItem[] {
  const items: FAQItem[] = [];

  // Question 1: Groupe
  items.push({
    question: `Dans quel groupe est ${team.name} à la CDM 2026 ?`,
    answer: `${team.name} est placée dans le Groupe ${team.group} de la Coupe du Monde 2026. L'équipe affrontera ses adversaires lors de la phase de groupes qui se déroule du 11 au 27 juin 2026.`,
  });

  // Question 2: Historique
  items.push({
    question: `Quel est le parcours historique de ${team.name} en Coupe du Monde ?`,
    answer: `${team.name} a participé à ${team.wcAppearances} ${team.wcAppearances > 1 ? 'éditions' : 'édition'} de la Coupe du Monde. Son meilleur résultat est : ${team.bestResult}. ${team.description.split('.')[0]}.`,
  });

  // Question 3: Chances de victoire (if prediction exists)
  if (prediction && winnerOdds) {
    const winPct = Math.round(prediction.winnerProb * 100 * 10) / 10;
    items.push({
      question: `Quelles sont les chances de ${team.name} de gagner la CDM 2026 ?`,
      answer: `Selon notre modèle ELO et les cotes des bookmakers, ${team.name} affiche une probabilité de victoire d'environ ${winPct}%, avec un rating ELO de ${prediction.eloRating}. Les cotes vainqueur tournent autour de ${winnerOdds} selon les bookmakers.`,
    });
  }

  // Question 4: Ranking FIFA
  items.push({
    question: `Quel est le classement FIFA de ${team.name} ?`,
    answer: `${team.name} occupe la ${team.fifaRanking}ᵉ place au classement FIFA (janvier 2026). L'équipe représente la confédération ${team.confederation}.`,
  });

  // Question 5: Host status
  if (team.isHost) {
    items.push({
      question: `${team.name} est-elle pays hôte de la CDM 2026 ?`,
      answer: `Oui, ${team.name} est l'un des trois pays hôtes de la Coupe du Monde 2026, organisée conjointement par les États-Unis, le Canada et le Mexique. C'est la première fois que trois pays co-organisent un Mondial.`,
    });
  }

  // Question 6: Confederation
  items.push({
    question: `Quelle confédération représente ${team.name} ?`,
    answer: `${team.name} représente la confédération ${team.confederation}. L'équipe a validé sa qualification lors des éliminatoires de sa zone continentale.`,
  });

  return items;
}

export function PremiumFAQ({ team, prediction, winnerOdds }: PremiumFAQProps) {
  const faqItems = generateFAQItems(team, prediction, winnerOdds);

  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ❓ Questions fréquentes — {team.name} CDM 2026
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-gray-400 dark:text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-3">
                  {item.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Generate JSON-LD schema for SEO
export function generateFAQSchema(team: Team, prediction?: Prediction, winnerOdds?: string) {
  const faqItems = generateFAQItems(team, prediction, winnerOdds);
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
