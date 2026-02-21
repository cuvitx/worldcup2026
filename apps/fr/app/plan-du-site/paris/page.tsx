import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { bookmakers } from "@repo/data/affiliates";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Plan du site - Paris sportifs - Coupe du Monde 2026",
    description:
      "Toutes les pages paris sportifs pour la Coupe du Monde 2026 : bookmakers, bonus, guides, types de paris et player props sur cdm2026.fr.",
    openGraph: {
      title: "Plan du site - Paris sportifs CDM 2026",
      description: "Bookmakers, bonus, guides de paris et player props pour le Mondial 2026.",
      url: "https://www.cdm2026.fr/plan-du-site/paris",
    },
    alternates: { canonical: "https://www.cdm2026.fr/plan-du-site/paris" },
  };
}

const breadcrumbItems: { label: string; href?: string }[] = [
  { label: "Accueil", href: "/" },
  { label: "Plan du site", href: "/plan-du-site" },
  { label: "Paris sportifs" },
];

const sections = [
  {
    title: "Bookmakers",
    links: bookmakers.map((b) => ({
      label: `Avis ${b.name}`,
      href: `/bookmaker/${b.slug}`,
    })),
  },
  {
    title: "Bonus et offres",
    links: [
      { label: "Comparateur de bonus", href: "/bonus-paris-sportifs" },
      ...bookmakers.map((b) => ({
        label: `Bonus ${b.name} — ${b.bonus}`,
        href: `/bonus/${b.slug}`,
      })),
    ],
  },
  {
    title: "Guides de paris",
    links: [
      { label: "Guide des paris sportifs", href: "/paris-sportifs/guide" },
      { label: "Bankroll CDM 2026", href: "/paris-sportifs/bankroll" },
      { label: "Lexique des paris", href: "/paris-sportifs/lexique" },
      { label: "Comparateur de cotes", href: "/comparateur-cotes" },
    ],
  },
  {
    title: "Types de paris",
    links: [
      { label: "Paris 1X2", href: "/type-pari/1x2" },
      { label: "Paris over/under", href: "/type-pari/over-under" },
      { label: "Paris score exact", href: "/type-pari/score-exact" },
      { label: "Paris buteur", href: "/type-pari/buteur" },
      { label: "Paris mi-temps / fin de match", href: "/type-pari/mi-temps-fin-de-match" },
      { label: "Paris corners", href: "/type-pari/corners" },
      { label: "Paris cartons", href: "/type-pari/cartons" },
      { label: "Paris handicap", href: "/type-pari/handicap" },
      { label: "Paris combinés", href: "/type-pari/combines" },
    ],
  },
  {
    title: "Player props",
    links: [
      { label: "Pronostic meilleur buteur", href: "/pronostic-meilleur-buteur" },
      { label: "Pronostic meilleur joueur", href: "/pronostic-meilleur-joueur" },
      { label: "Pronostic meilleur gardien", href: "/pronostic-meilleur-gardien" },
      { label: "Pronostic meilleur jeune", href: "/pronostic-meilleur-jeune" },
    ],
  },
  {
    title: "Pronostics competition",
    links: [
      { label: "Pronostic vainqueur", href: "/pronostic/vainqueur" },
      { label: "Pronostic scores exacts", href: "/pronostic/scores-exacts" },
      { label: "Pronostic over/under", href: "/pronostic/over-under" },
    ],
  },
];

export default function PlanDuSiteParisPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
<h1 className="mt-6 text-3xl font-bold text-foreground">Plan du site — Paris sportifs</h1>
      <p className="mt-2 text-gray-600">
        Toutes les pages paris sportifs, bookmakers, bonus et guides.
      </p>

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
              {section.links.map((link) => (
                <li key={link.href} className="py-1">
                  <Link href={link.href} className="text-primary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
