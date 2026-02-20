const faqItems = [
  {
    question: "Qui est le sélectionneur de l'équipe de France pour la CDM 2026 ?",
    answer:
      "Didier Deschamps reste sélectionneur de l'équipe de France pour la Coupe du Monde 2026. Il a prolongé son contrat après la finale de 2022 au Qatar. Avec deux finales (2018, 2022) et un titre mondial (2018), il est l'un des coaches les plus expérimentés de la compétition.",
  },
  {
    question: "Quels sont les joueurs clés de la France à la CDM 2026 ?",
    answer:
      "Les cadres incontournables des Bleus sont Kylian Mbappé (capitaine, attaquant du Real Madrid), Antoine Griezmann (meneur de jeu), Aurélien Tchouaméni (milieu défensif du Real Madrid), Mike Maignan (gardien, AC Milan) et Jules Koundé (défenseur, FC Barcelone). Mbappé reste la star mondiale du tournoi avec ses 8 buts en 2022.",
  },
  {
    question: "Dans quel groupe est l'équipe de France à la CDM 2026 ?",
    answer:
      "L'équipe de France est placée dans le Groupe I de la Coupe du Monde 2026. Elle affrontera notamment le Maroc, la Belgique et d'autres adversaires lors de la phase de groupes. Les matchs des Bleus se jouent dans des stades américains (New York, Philadelphie, Boston).",
  },
  {
    question: "Quel est le parcours historique de la France en Coupe du Monde ?",
    answer:
      "La France a remporté la Coupe du Monde à deux reprises : en 1998 à domicile (3-0 contre le Brésil) et en 2018 en Russie (4-2 contre la Croatie). Elle a également été finaliste en 2006 (défaite aux tirs au but contre l'Italie) et en 2022 (défaite aux tirs au but contre l'Argentine). Les Bleus visent une 3e étoile en 2026.",
  },
  {
    question: "Quelles sont les chances de la France de gagner la CDM 2026 ?",
    answer:
      "Selon notre modèle ELO et les cotes des bookmakers, la France affiche une probabilité de victoire d'environ 13%, ce qui en fait l'un des trois grands favoris avec l'Argentine (~15%) et l'Espagne (~12%). Les cotes vainqueur pour la France tournent autour de 7.00 à 8.00 selon les bookmakers.",
  },
  {
    question: "Quand joue la France à la CDM 2026 ?",
    answer:
      "L'équipe de France dispute ses matchs de Groupe I lors de la phase de groupes entre le 11 juin et le 27 juin 2026. Les Bleus jouent dans des stades américains : MetLife Stadium (New York/NJ), Lincoln Financial Field (Philadelphia) et Gillette Stadium (Boston). En cas de qualification, les matchs à élimination directe se poursuivent jusqu'à la finale du 19 juillet 2026 au MetLife Stadium.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Questions fréquentes — Équipe de France CDM 2026
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

export { faqItems };
