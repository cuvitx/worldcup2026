/**
 * Team editorial content — strengths, weaknesses, and anecdotes for each team.
 * Used by /equipe/[slug] template.
 */

export interface TeamAnecdote {
  year: string;
  icon: string;
  title: string;
  desc: string;
}

export interface TeamEditorialContent {
  strengths: string[];
  weaknesses: string[];
  anecdotes: TeamAnecdote[];
}

export const teamContent: Record<string, TeamEditorialContent> = {
  france: {
    strengths: [
      "Effectif le plus profond du monde — qualité à chaque poste",
      "Mbappé (27 ans) au sommet de son art au Real Madrid",
      "Doublé 1998-2018 + finale 2022 — ADN du gagnant",
      "Tchouaméni / Camavinga : milieu de classe mondiale",
      "Saliba / Upamecano : défense jeune et solide",
      "Faim de revanche après la défaite 2022 face à l'Argentine",
    ],
    weaknesses: [
      "Griezmann à 35 ans — forme physique sur toute la durée",
      "Pression médiatique écrasante sur Mbappé",
      "Syndrome de la 3e CDM consécutive à haut niveau",
      "Gestion de l'équilibre offensif/défensif selon Deschamps",
      "Risque de blessures clés en toute fin de saison (juin)",
    ],
    anecdotes: [
      { year: "1958", icon: "⚽", title: "Just Fontaine — Record éternel", desc: "Just Fontaine inscrit 13 buts en une seule édition de la Coupe du Monde, un record absolu qui tient depuis 66 ans et ne sera probablement jamais battu. La France finit 3e." },
      { year: "1982", icon: "💔", title: "La tragédie de Séville", desc: "En demi-finale contre l'Allemagne, le gardien Schumacher assomme Battiston sans être sanctionné. La France, menée 3-1, remonte à 3-3 avant de perdre aux tirs au but." },
      { year: "1998", icon: "🏆", title: "1998 : L'été de tous les rêves", desc: "À domicile, les Bleus de Aimé Jacquet écrasent le Brésil 3-0 en finale. Zidane inscrit deux buts de la tête. Un pays tout entier sur les Champs-Élysées. La 1ère étoile." },
      { year: "2006", icon: "🤯", title: "Zidane : Adieu en coup de tête", desc: "À 34 ans, Zizou sort de sa retraite internationale et mène la France jusqu'en finale. Un coup de tête sur Materazzi le fait expulser. La France perd aux tirs au but." },
      { year: "2018", icon: "⭐", title: "2018 : La génération Mbappé", desc: "En Russie, les Bleus de Deschamps battent la Croatie 4-2. Mbappé (19 ans) marque et devient le 2e joueur après Pelé à inscrire un but en finale à son âge. La 2e étoile." },
      { year: "2022", icon: "🎭", title: "La finale épique de tous les temps", desc: "Menée 2-0 à la 80e, la France remonte grâce à Mbappé (triplé). Score final 3-3, l'Argentine gagne aux tirs au but. La plus grande finale de l'histoire." },
    ],
  },
  // Other teams will be added by sub-agents
};
