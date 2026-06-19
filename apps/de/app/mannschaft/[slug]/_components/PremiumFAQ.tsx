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

  // Frage 1: Gruppe
  items.push({
    question: `In welcher Gruppe spielt ${team.name} bei der WM 2026?`,
    answer: `${team.name} wurde in die Gruppe ${team.group} der WM 2026 eingeteilt. Die Mannschaft trifft in der Gruppenphase vom 11. bis 27. Juni 2026 auf ihre Gegner.`,
  });

  // Frage 2: Geschichte
  items.push({
    question: `Wie ist die WM-Geschichte von ${team.name}?`,
    answer: `${team.name} hat an ${team.wcAppearances} WM-Endrunde${team.wcAppearances > 1 ? 'n' : ''} teilgenommen. Das beste Ergebnis ist: ${team.bestResult}. ${team.description.split('.')[0]}.`,
  });

  // Frage 3: Siegchancen
  if (prediction && winnerOdds) {
    const winPct = Math.round(prediction.winnerProb * 100 * 10) / 10;
    items.push({
      question: `Wie stehen die Chancen von ${team.name}, die WM 2026 zu gewinnen?`,
      answer: `Laut unserem ELO-Modell und den Wettquoten hat ${team.name} eine Siegwahrscheinlichkeit von etwa ${winPct}%, mit einem ELO-Rating von ${prediction.eloRating}. Die Siegerquoten liegen bei etwa ${winnerOdds} laut den Wettanbietern.`,
    });
  }

  // Frage 4: FIFA-Rangliste
  items.push({
    question: `Welchen Platz belegt ${team.name} in der FIFA-Rangliste?`,
    answer: `${team.name} belegt den ${team.fifaRanking}. Platz in der FIFA-Rangliste (Juni 2026). Die Mannschaft vertritt die Konföderation ${team.confederation}.`,
  });

  // Frage 5: Gastgeberstatus
  if (team.isHost) {
    items.push({
      question: `Ist ${team.name} Gastgeberland der WM 2026?`,
      answer: `Ja, ${team.name} ist eines der drei Gastgeberländer der WM 2026, die gemeinsam von den USA, Kanada und Mexiko ausgerichtet wird. Es ist das erste Mal, dass drei Länder gemeinsam eine WM veranstalten.`,
    });
  }

  // Frage 6: Konföderation
  items.push({
    question: `Welche Konföderation vertritt ${team.name}?`,
    answer: `${team.name} vertritt die Konföderation ${team.confederation}. Die Mannschaft hat sich über die Qualifikation ihrer Kontinentalzone qualifiziert.`,
  });

  return items;
}

export function PremiumFAQ({ team, prediction, winnerOdds }: PremiumFAQProps) {
  const faqItems = generateFAQItems(team, prediction, winnerOdds);

  return (
    <section className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Häufig gestellte Fragen — {team.name} WM 2026
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
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
