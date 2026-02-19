const anecdotes = [
  {
    year: "1958",
    icon: "⚽",
    title: "Just Fontaine — Record éternel",
    desc: "Just Fontaine inscrit 13 buts en une seule édition de la Coupe du Monde, un record absolu qui tient depuis 66 ans et ne sera probablement jamais battu. La France finit 3e.",
  },
  {
    year: "1982",
    icon: "💔",
    title: "La tragédie de Séville",
    desc: "En demi-finale contre l'Allemagne, le gardien Schumacher assomme Battiston sans être sanctionné. La France, menée 3-1, remonte à 3-3 avant de perdre aux tirs au but. La plus grande injustice de l'histoire du football.",
  },
  {
    year: "1998",
    icon: "🏆",
    title: "1998 : L'été de tous les rêves",
    desc: "À domicile, les Bleus de Aimé Jacquet écrasent le Brésil 3-0 en finale. Zidane inscrit deux buts de la tête. Un pays tout entier sur les Champs-Élysées. La 1ère étoile.",
  },
  {
    year: "2006",
    icon: "🤯",
    title: "Zidane : Adieu en coup de tête",
    desc: "À 34 ans, Zizou sort de sa retraite internationale et mène la France jusqu'en finale. Un coup de tête sur Materazzi en finale le fait expulser. La France perd aux tirs au but contre l'Italie.",
  },
  {
    year: "2018",
    icon: "⭐",
    title: "2018 : La génération Mbappé",
    desc: "En Russie, les Bleus de Deschamps battent la Croatie 4-2. Mbappé (19 ans) marque et devient le 2e joueur après Pelé à inscrire un but en finale à son âge. La 2e étoile.",
  },
  {
    year: "2022",
    icon: "🎭",
    title: "2022 : La finale épique de tous les temps",
    desc: "Contre l'Argentine (2-0 à la 80e), la France remonte à 2-2 grâce à Mbappé (doublé) et force les prolongations. Mbappé égalise encore à 3-3 ! Finalement, l'Argentine gagne aux tirs au but. Mbappé : 8 buts en 1 CDM.",
  },
];

export function AnecdotesSection() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ✨ Les anecdotes marquantes de l&apos;histoire des Bleus
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {anecdotes.map((anecdote) => (
            <div
              key={anecdote.year}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{anecdote.icon}</span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {anecdote.year}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {anecdote.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {anecdote.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
