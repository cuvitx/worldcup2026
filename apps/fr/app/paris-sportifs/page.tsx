import Image from "next/image";
import { getStaticAlternates } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import type { Metadata } from "next";
import Link from "next/link";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides, guidesByCategory } from "@repo/data/guides";
import { TableOfContents } from "@repo/ui";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BookmakerCTA } from "../components/BookmakerCTA";

export const metadata: Metadata = {
  title: "Paris sportifs CDM 2026 | Meilleurs bookmakers & guides",
  description:
    "Comparatif des meilleurs sites de paris sportifs pour la Coupe du Monde 2026. Avis, bonus, cotes et guides strategiques pour parier sur la CDM 2026.",
  alternates: getStaticAlternates("betting", "fr"),
  openGraph: {
    title: "Paris sportifs - Coupe du Monde 2026",
    description:
      "Meilleurs bookmakers, guides et stratégies pour parier sur la CDM 2026.",
  },
};

export default function ParisSportifsPage() {
  const faqItems = [
    {
      question: "Quel est le meilleur site de paris sportifs pour la CDM 2026 ?",
      answer: "Les meilleurs bookmakers pour la Coupe du Monde 2026 sont Winamax (interface fluide, cotes compétitives, bonus généreux), Betclic (large choix de marchés, streaming live gratuit) et ParionsSport (opérateur français de confiance, points de vente physiques). Tous sont agréés ANJ (Autorité Nationale des Jeux) et offrent des bonus de bienvenue attractifs pour les nouveaux inscrits. Comparez toujours les cotes avant de parier."
    },
    {
      question: "Comment parier sur la Coupe du Monde 2026 ?",
      answer: "Pour parier sur la CDM 2026 : 1) Inscrivez-vous sur un site agréé ANJ (Winamax, Betclic, ParionsSport...), 2) Validez votre compte avec une pièce d'identité, 3) Déposez de l'argent via carte bancaire ou virement, 4) Choisissez un match et un marché (vainqueur, score exact, buteur...), 5) Placez votre mise et validez. Jouez responsablement, fixez-vous des limites de dépôt et ne misez jamais plus que ce que vous pouvez perdre. 18+."
    },
    {
      question: "Quels types de paris sont disponibles pour la CDM 2026 ?",
      answer: "Les principaux marchés de paris sont : vainqueur final du tournoi, vainqueur d'un match (1N2), handicap asiatique, score exact, nombre de buts (plus/moins), mi-temps/fin de match, buteur (premier, dernier, anytime), corners, cartons, qualification d'une équipe, meilleur buteur du tournoi, et combinés (paris multiples). Les bookmakers proposent également des paris en direct pendant les matchs avec des cotes en temps réel."
    },
    {
      question: "Peut-on parier en direct pendant les matchs de la CDM 2026 ?",
      answer: "Oui, tous les bookmakers français proposent des paris en direct (live betting) sur les matchs de la Coupe du Monde. Les cotes évoluent en temps réel selon les événements du match (buts, cartons, occasions...). Winamax et Betclic offrent également le streaming vidéo gratuit des matchs pour les clients ayant un solde positif ou ayant parié sur le match. Le cash-out est aussi disponible pour clôturer un pari avant la fin du match."
    },
    {
      question: "Quels sont les favoris pour remporter la CDM 2026 selon les bookmakers ?",
      answer: "Selon les cotes des bookmakers (février 2026), les favoris pour remporter la Coupe du Monde 2026 sont : France (~5.50), Brésil (~6.00), Angleterre (~7.00), Argentine (~8.00) et Espagne (~9.00). La France est favorite en raison de son effectif exceptionnel (Mbappé, Griezmann, Tchouaméni) et de sa régularité en grandes compétitions. Les cotes évoluent constamment en fonction de la forme des équipes, des blessures et des résultats de préparation."
    },
    {
      question: "Les paris sportifs sur la CDM 2026 sont-ils légaux en France ?",
      answer: "Oui, les paris sportifs sont totalement légaux en France depuis 2010, à condition de parier sur un site agréé par l'ANJ (Autorité Nationale des Jeux). Seuls les opérateurs détenant une licence française peuvent proposer des paris en ligne. Winamax, Betclic, ParionsSport, Unibet et ZEbet font partie des bookmakers agréés. Parier sur des sites non agréés est illégal et vous expose à des risques (pas de protection légale, arnaques possibles)."
    }
  ];

  const categoryLabels: Record<string, string> = {
    cdm2026: "Coupe du Monde 2026",
    stratégie: "Strategies de paris",
    bookmaker: "Bookmakers",
    debutant: "Debutant",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Paris sportifs" },
        ]}
      />
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Paris sportifs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Comparatif des meilleurs bookmakers, guides de paris et stratégies pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div className="space-y-10">
        {/* Bookmaker Reviews */}
        <section className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-gray-200">
          <h2 id="bookmakers" className="text-2xl font-bold text-gray-900 mb-2">Meilleurs sites de paris sportifs 2026</h2>
          <p className="mb-6 text-sm text-gray-600">
            Nos avis détaillés sur les {bookmakerReviews.length} bookmakers agréés en France pour parier sur la CDM 2026.
          </p>
          <div className="space-y-4">
            {bookmakerReviews.map((bk, i) => {
              const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
              return (
                <Link
                  key={bk.id}
                  href={`/bookmaker/${bk.slug}`}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                    i === 0 ? "border-accent bg-accent/5" : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                      #1 Recommande
                    </span>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      {bk.logo && <Image src={bk.logo} alt={`Logo ${bk.name}`} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />}
                      <p className="text-xl font-bold">{bk.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{bk.tagline}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-accent">{"★".repeat(Math.round(avgRating))}</span>
                      <span className="text-xs text-gray-500">{avgRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-extrabold text-field">{bk.bonus}</p>
                    <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Cotes</p>
                      <p className="font-bold text-primary">{bk.ratings.odds}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">App</p>
                      <p className="font-bold text-primary">{bk.ratings.app}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Live</p>
                      <p className="font-bold text-primary">{bk.ratings.live}/5</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white">
                      Voir l&apos;avis &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Guides by category */}
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          return (
            <section key={cat} className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-gray-200">
              <h2 id={`guide-${cat}`} className="text-2xl font-bold text-gray-900 mb-4">{categoryLabels[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guide/${guide.slug}`}
                    className="block rounded-xl border border-gray-200 p-4 sm:p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.metaDescription}</p>
                    <p className="mt-2 text-xs font-medium text-primary">Lire le guide &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className="rounded-xl bg-primary/5 border border-primary/10 p-6 sm:p-8">
          <h2 id="voir-aussi" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Voir aussi</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/buteurs" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cotes buteurs CDM 2026
            </Link>
            <Link href="/pronostic/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostic France
            </Link>
            <Link href="/match/calendrier" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Calendrier des matchs
            </Link>
            <Link href="/equipes" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Toutes les équipes
            </Link>
          </div>
        </section>
        </div>
        <TableOfContents items={[
          { id: "bookmakers", label: "Meilleurs bookmakers", level: 2 },
          { id: "guide-cdm2026", label: "CDM 2026", level: 2 },
          { id: "guide-stratégie", label: "Stratégies", level: 2 },
          { id: "guide-bookmaker", label: "Bookmakers", level: 2 },
          { id: "guide-debutant", label: "Débutant", level: 2 },
          { id: "voir-aussi", label: "Voir aussi", level: 2 },
        ]} />
      </div>

      <BookmakerCTA />

      {/* Tous nos guides paris */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tous nos guides paris</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/paris-sportifs/corners", icon: "🚩", title: "Paris sur les corners", description: "Stratégies et conseils pour parier sur les corners" },
              { href: "/paris-sportifs/handicap", icon: "⚖️", title: "Paris handicap", description: "Comprendre et maîtriser les paris handicap" },
              { href: "/paris-sportifs/live", icon: "⚡", title: "Paris en live", description: "Techniques pour parier en direct pendant les matchs" },
              { href: "/paris-sportifs/mi-temps", icon: "⏸️", title: "Paris mi-temps", description: "Exploiter les opportunités à la mi-temps" },
              { href: "/paris-sportifs/combines", icon: "🔗", title: "Paris combinés", description: "Maximiser les gains avec les combinés" },
              { href: "/pronostic/btts", icon: "⚽", title: "BTTS (Les deux marquent)", description: "Pronostics sur les deux équipes qui marquent" },
              { href: "/pronostic/over-under", icon: "📊", title: "Over/Under", description: "Parier sur le nombre de buts dans un match" },
              { href: "/paris-sportifs/value-bets", icon: "💎", title: "Value bets", description: "Identifier les cotes sous-évaluées par les bookmakers" },
              { href: "/paris-sportifs/cashout", icon: "💰", title: "Guide cashout", description: "Quand et comment utiliser le cash-out" },
              { href: "/paris-sportifs/bankroll", icon: "🏦", title: "Gestion de bankroll", description: "Gérer votre budget paris pour la CDM 2026" },
              { href: "/paris-sportifs/strategie", icon: "🎯", title: "Stratégie paris groupes", description: "Stratégies spécifiques aux phases de groupes" },
              { href: "/paris-sportifs/guide", icon: "📖", title: "Guide complet des paris", description: "Le guide ultime pour parier sur le football" },
              { href: "/paris-sportifs/lexique", icon: "📚", title: "Lexique des paris", description: "Tous les termes des paris sportifs expliqués" },
              { href: "/paris-sportifs/meteo", icon: "🌦️", title: "Impact météo sur les paris", description: "Comment la météo influence les résultats" },
              { href: "/methodes-paiement", icon: "💳", title: "Méthodes de paiement", description: "Dépôts et retraits sur les sites de paris" },
              { href: "/meilleurs-bookmakers", icon: "🏆", title: "Meilleurs bookmakers", description: "Comparatif des meilleurs sites de paris" },
              { href: "/comparateur-cotes", icon: "📈", title: "Comparateur de cotes", description: "Comparez les cotes des bookmakers en temps réel" },
              { href: "/bonus", icon: "🎁", title: "Bonus bookmakers", description: "Tous les bonus et offres de bienvenue" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Questions sur les paris sportifs CDM 2026" items={faqItems} />
</>
  );
}
