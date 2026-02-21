import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { ANJBanner } from "@repo/ui/anj-banner";
import { Gift, ArrowRight, Star, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Bonus Paris Sportifs CDM 2026 | Codes Promo & Offres Bookmakers",
  description:
    "Tous les bonus et codes promo des bookmakers pour la Coupe du Monde 2026. Winamax, Betclic, Unibet, ParionsSport : jusqu'à 100€ offerts.",
  openGraph: {
    title: "Bonus Paris Sportifs CDM 2026 | Codes Promo & Offres",
    description:
      "Comparatif des bonus de bienvenue et codes promo pour parier sur la CDM 2026.",
    url: "https://cdm2026.fr/bonus",
  },
  alternates: { canonical: "https://cdm2026.fr/bonus" },
};

interface BonusOffer {
  name: string;
  slug: string;
  bonus: string;
  bonusDetail: string;
  codePromo: string;
  conditions: string;
  note: number;
  url: string;
  highlights: string[];
}

const offers: BonusOffer[] = [
  {
    name: "Winamax",
    slug: "winamax",
    bonus: "Jusqu'à 100€",
    bonusDetail: "1er pari remboursé en freebets si perdu",
    codePromo: "Aucun code nécessaire",
    conditions: "1er dépôt min. 10€, pari simple ou combiné",
    note: 9.2,
    url: "https://www.winamax.fr",
    highlights: ["Remboursement immédiat", "Aucun code requis", "Cotes boostées CDM 2026"],
  },
  {
    name: "Betclic",
    slug: "betclic",
    bonus: "Jusqu'à 100€",
    bonusDetail: "en freebets sans conditions de mise",
    codePromo: "Aucun code nécessaire",
    conditions: "1er dépôt min. 10€, freebets utilisables 7 jours",
    note: 9.0,
    url: "https://www.betclic.fr",
    highlights: ["Freebets sans conditions", "Valables 7 jours", "Streaming gratuit inclus"],
  },
  {
    name: "Unibet",
    slug: "unibet",
    bonus: "Jusqu'à 100€",
    bonusDetail: "remboursés en freebets sur 1er pari",
    codePromo: "Aucun code nécessaire",
    conditions: "1er pari perdant remboursé, min. 1€",
    note: 8.7,
    url: "https://www.unibet.fr",
    highlights: ["Remboursement si pari perdu", "Paris builder", "Statistiques détaillées"],
  },
  {
    name: "ParionsSport",
    slug: "parionssport",
    bonus: "Jusqu'à 90€",
    bonusDetail: "offerts en freebets",
    codePromo: "Aucun code nécessaire",
    conditions: "1er pari jusqu'à 90€ remboursé en freebets",
    note: 8.5,
    url: "https://www.enligne.parionssport.fdj.fr",
    highlights: ["Marque FDJ", "Points de vente physiques", "Cotes boostées événements"],
  },
];

export default function BonusHubPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Paris sportifs", href: "/paris-sportifs" },
          { label: "Bonus & Codes promo" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Bonus & Codes Promo CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Profitez des meilleures offres de bienvenue des bookmakers agréés ANJ pour parier sur la Coupe du Monde 2026. Jusqu&apos;à 100€ offerts sur chaque site.
          </p>
        </div>
      </section>

      <ANJBanner />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Introduction */}
        <section className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            La Coupe du Monde 2026 est l&apos;occasion idéale pour profiter des bonus de bienvenue des bookmakers. En vous inscrivant sur plusieurs sites, vous pouvez cumuler jusqu&apos;à <strong>390€ de freebets</strong> au total. Voici notre sélection des meilleures offres du moment, toutes vérifiées et issues de bookmakers agréés par l&apos;ANJ.
          </p>
        </section>

        {/* Cumul banner */}
        <div className="rounded-2xl bg-accent/10 border border-accent/20 p-6 mb-10 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Cumul des bonus disponibles</p>
          <p className="text-4xl font-extrabold text-accent">Jusqu&apos;à 390€</p>
          <p className="text-sm text-gray-500 mt-1">en vous inscrivant sur les 4 bookmakers</p>
        </div>

        {/* Offers grid */}
        <section className="grid gap-6 sm:grid-cols-2 mb-14">
          {offers.map((offer, i) => (
            <div
              key={offer.slug}
              className={`rounded-2xl border-2 bg-white dark:bg-slate-800 p-6 sm:p-8 relative ${
                i === 0 ? "border-accent" : "border-gray-200 dark:border-slate-700"
              }`}
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                  Meilleure offre
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-secondary" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{offer.name}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                    <span className="text-xs text-gray-500">{offer.note}/10</span>
                  </div>
                </div>
              </div>

              <p className="text-3xl font-extrabold text-accent mb-1">{offer.bonus}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{offer.bonusDetail}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Code promo : <strong>{offer.codePromo}</strong></span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <AlertTriangle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Conditions : {offer.conditions}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {offer.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {h}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-accent/90 transition-colors flex-1"
                >
                  Profiter du bonus <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href={`/bonus/${offer.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-primary/20 transition-colors"
                >
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Conseils */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conseils pour bien utiliser vos bonus</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Cumulez les offres</h3>
              <p>Inscrivez-vous sur les 4 bookmakers pour maximiser vos freebets. Chaque site propose son propre bonus de bienvenue, et il n&apos;y a aucune restriction à s&apos;inscrire sur plusieurs plateformes.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lisez les conditions</h3>
              <p>Chaque bonus a ses conditions : durée de validité des freebets, types de paris éligibles, cote minimum. Prenez le temps de les lire pour éviter les mauvaises surprises.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Utilisez vos freebets à bon escient</h3>
              <p>Les freebets sont idéaux pour tester des paris à cotes élevées (buteur, score exact) car vous ne risquez pas votre propre argent. Profitez-en sur les matchs de la CDM 2026.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fixez vos limites</h3>
              <p>Même avec des bonus, restez responsable. Définissez un budget maximum et utilisez les outils de jeu responsable (limites de dépôt, auto-exclusion) proposés par chaque bookmaker.</p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pages associées</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/meilleurs-bookmakers" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Meilleurs bookmakers
            </Link>
            <Link href="/guide-paris" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Guide des paris
            </Link>
            <Link href="/methodes-paiement" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Méthodes de paiement
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-gray-500 mb-6">
          18+ | Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).
        </p>
      </div>

      <FAQSection
        title="Questions sur les bonus CDM 2026"
        items={[
          {
            question: "Peut-on cumuler les bonus de plusieurs bookmakers ?",
            answer: "Oui, chaque bookmaker propose son propre bonus de bienvenue. Vous pouvez vous inscrire sur Winamax, Betclic, Unibet et ParionsSport pour cumuler jusqu'à 390€ de freebets.",
          },
          {
            question: "Les bonus sont-ils valables pour la CDM 2026 ?",
            answer: "Oui, les bonus de bienvenue sont utilisables sur tous les événements sportifs, y compris la Coupe du Monde 2026. Certains bookmakers proposeront des offres spéciales supplémentaires pendant le tournoi.",
          },
          {
            question: "Faut-il un code promo pour obtenir le bonus ?",
            answer: "Non, aucun code promo n'est nécessaire sur les 4 bookmakers présentés. Le bonus est automatiquement activé lors de votre inscription et premier dépôt.",
          },
          {
            question: "Combien de temps ai-je pour utiliser mes freebets ?",
            answer: "La durée varie selon les bookmakers : 7 jours chez Betclic, 14 jours chez Winamax et Unibet, 7 jours chez ParionsSport. Consultez les conditions de chaque offre pour plus de détails.",
          },
          {
            question: "Que se passe-t-il si mon premier pari est gagnant ?",
            answer: "Si votre premier pari est gagnant, vous remportez vos gains normalement. Le bonus (remboursement en freebets) ne s'active que si votre premier pari est perdant. C'est donc un filet de sécurité sans risque.",
          },
        ]}
      />
    </>
  );
}
