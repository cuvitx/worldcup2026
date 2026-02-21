import type { Metadata } from "next";
import Link from "next/link";
import { Map, Users, Trophy, TrendingUp, Calendar, BookOpen, Landmark, Globe } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Plan du site - Coupe du Monde 2026",
    description:
      "Plan du site complet de cdm2026.fr : retrouvez toutes les pages matchs, equipes, pronostics, paris sportifs et guides pour la Coupe du Monde 2026.",
    openGraph: {
      title: "Plan du site - Coupe du Monde 2026",
      description: "Naviguer sur cdm2026.fr : toutes les pages du site en un clin d'oeil.",
      url: "https://www.cdm2026.fr/plan-du-site",
    },
    alternates: { canonical: "https://www.cdm2026.fr/plan-du-site" },
  };
}

const sitemapSections = [
  {
    title: "Matchs",
    href: "/plan-du-site/matchs",
    icon: Calendar,
    description: "Les 104 matchs de la Coupe du Monde 2026, de la phase de groupes a la finale.",
  },
  {
    title: "Equipes",
    href: "/plan-du-site/equipe",
    icon: Users,
    description: "Les 48 equipes qualifiees, organisees par groupe.",
  },
  {
    title: "Paris sportifs",
    href: "/plan-du-site/paris",
    icon: TrendingUp,
    description: "Bookmakers, bonus, guides de paris et player props.",
  },
];

const mainCategories = [
  { title: "Calendrier et resultats", links: [
    { label: "Calendrier des matchs", href: "/calendrier" },
    { label: "Resultats en direct", href: "/resultats" },
    { label: "Classement des groupes", href: "/classement" },
    { label: "Tableau final", href: "/tableau-final" },
  ]},
  { title: "Pronostics", links: [
    { label: "Pronostic vainqueur", href: "/pronostic/vainqueur" },
    { label: "Pronostic meilleur buteur", href: "/pronostic-meilleur-buteur" },
    { label: "Pronostics scores exacts", href: "/pronostic/scores-exacts" },
    { label: "Pronostic over/under", href: "/pronostic/over-under" },
    { label: "Simulateur", href: "/simulateur" },
    { label: "Dark horses", href: "/paris-sportifs/dark-horses" },
  ]},
  { title: "Equipes et joueurs", links: [
    { label: "Toutes les equipes", href: "/equipe" },
    { label: "Classement FIFA", href: "/classement-fifa" },
    { label: "Palmares", href: "/palmares" },
  ]},
  { title: "Lieux", links: [
    { label: "Stades", href: "/stades" },
    { label: "Villes hotes", href: "/villes" },
    { label: "Decalage horaire", href: "/voyage/decalage-horaire" },
    { label: "Ou regarder les matchs", href: "/ou-regarder" },
    { label: "Regarder la CDM au travail", href: "/regarder-cdm-au-travail" },
    { label: "ESTA USA", href: "/voyage/esta-visa-usa" },
  ]},
  { title: "Paris sportifs", links: [
    { label: "Comparateur de cotes", href: "/comparateur-cotes" },
    { label: "Guide des paris", href: "/paris-sportifs/guide" },
    { label: "Bankroll CDM", href: "/paris-sportifs/bankroll" },
    { label: "Lexique des paris", href: "/paris-sportifs/lexique" },
  ]},
  { title: "A propos", links: [
    { label: "Format du tournoi", href: "/format" },
    { label: "FAQ", href: "/faq" },
    { label: "Methodologie", href: "/methodologie" },
    { label: "Equipe editoriale", href: "/equipe-editoriale" },
    { label: "Mentions legales", href: "/mentions-legales" },
    { label: "Recherche", href: "/recherche" },
  ]},
];

export default function PlanDuSitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
<h1 className="mt-6 text-3xl font-bold text-foreground">Plan du site</h1>
      <p className="mt-2 text-gray-600">
        Retrouvez toutes les pages de cdm2026.fr organisees par categorie.
      </p>

      {/* Sub-sitemaps */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {sitemapSections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-gray-200 p-5 transition-colors hover:border-primary"
          >
            <s.icon className="mb-2 h-6 w-6 text-primary" />
            <h2 className="font-semibold text-foreground group-hover:text-primary">{s.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{s.description}</p>
          </Link>
        ))}
      </section>

      {/* All categories */}
      <section className="mt-12 space-y-8">
        {mainCategories.map((cat) => (
          <div key={cat.title}>
            <h2 className="text-xl font-semibold text-foreground">{cat.title}</h2>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
              {cat.links.map((link) => (
                <li key={link.href} className="py-1">
                  <Link href={link.href} className="text-primary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
