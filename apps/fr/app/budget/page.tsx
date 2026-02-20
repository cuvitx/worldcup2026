import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Wallet, Plane, Hotel, Ticket, Utensils, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Budget Coupe du Monde 2026 - Combien ça coûte ? | CDM 2026",
  description:
    "Estimez votre budget pour la CDM 2026 : vols (800-1500€), hôtels (150-400€/nuit), billets (70-1600$), transport et nourriture. 3 profils : budget, moyen, premium.",
  openGraph: {
    title: "Budget CDM 2026 - Guide complet des coûts",
    description: "Combien coûte un voyage pour la Coupe du Monde 2026 ? Estimations détaillées.",
    url: "https://cdm2026.fr/budget",
  },
  alternates: { canonical: "https://cdm2026.fr/budget" },
};

const postes = [
  {
    icon: Plane,
    titre: "Vols aller-retour",
    budget: "600 - 900 €",
    moyen: "900 - 1 300 €",
    premium: "1 500 - 4 000 €",
    detail: "Paris → côte Est US. Réservez 6-9 mois à l'avance. Les vols vers Mexico ou LA coûtent 100-300€ de plus.",
  },
  {
    icon: Hotel,
    titre: "Hébergement (par nuit)",
    budget: "80 - 150 €",
    moyen: "150 - 300 €",
    premium: "300 - 600 €+",
    detail: "Auberge/Airbnb partagé (budget), hôtel 3★ ou Airbnb entier (moyen), hôtel 4-5★ (premium). Prix majorés de 50-100% en période CDM.",
  },
  {
    icon: Ticket,
    titre: "Billets match (par match)",
    budget: "70 - 150 $",
    moyen: "150 - 500 $",
    premium: "500 - 1 600 $",
    detail: "Cat. 3 phase de groupes (budget) à Cat. 1 finale (premium). Vente via FIFA.com uniquement.",
  },
  {
    icon: Utensils,
    titre: "Nourriture (par jour)",
    budget: "25 - 40 €",
    moyen: "40 - 80 €",
    premium: "80 - 150 €+",
    detail: "Fast-food et street food (budget), restaurants mid-range (moyen), restaurants gastronomiques (premium).",
  },
];

const totaux = [
  { profil: "Budget", duree: "10 jours, 2 matchs", total: "1 800 - 2 500 €", couleur: "text-accent" },
  { profil: "Moyen", duree: "14 jours, 3 matchs", total: "3 500 - 5 500 €", couleur: "text-secondary" },
  { profil: "Premium", duree: "21 jours, 5+ matchs", total: "8 000 - 15 000 €+", couleur: "text-red-500" },
];

const faqItems = [
  {
    question: "Quel est le budget minimum pour aller à la CDM 2026 ?",
    answer: "Comptez environ 1 800 à 2 500€ pour un séjour budget de 10 jours avec 2 matchs : vol low-cost (600-900€), hébergement en auberge/Airbnb partagé (80-150€/nuit), nourriture street food (25-40€/jour) et billets catégorie 3 (70-150$/match).",
  },
  {
    question: "Quand acheter ses billets d'avion pour la CDM 2026 ?",
    answer: "Idéalement 6 à 9 mois avant le tournoi (fin 2025 / début 2026). Les prix augmentent fortement 3-4 mois avant. Utilisez des alertes de prix (Google Flights, Skyscanner) et privilégiez les vols avec escale pour économiser.",
  },
  {
    question: "Les billets de match sont-ils nominatifs ?",
    answer: "Oui, les billets FIFA sont nominatifs et liés à votre Fan ID. La revente n'est autorisée que via la plateforme officielle FIFA. Méfiez-vous des sites de revente non officiels qui pratiquent des prix gonflés sans garantie.",
  },
  {
    question: "Le Mexique est-il moins cher que les États-Unis ?",
    answer: "Oui, significativement. L'hébergement et la nourriture au Mexique (Mexico, Guadalajara, Monterrey) coûtent 30 à 50% moins cher qu'aux États-Unis. C'est une option intéressante pour les budgets serrés, surtout en phase de groupes.",
  },
];

export default function BudgetPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Budget", url: "/budget" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Budget CDM 2026" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Wallet className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Guide pratique
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Budget</span> Coupe du Monde 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Combien coûte un voyage pour la CDM 2026 ? Estimations détaillées par poste
            et par profil de voyageur.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Postes de dépenses */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Détail par poste de dépense
          </h2>
          <div className="space-y-4">
            {postes.map((p) => (
              <div
                key={p.titre}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <p.icon className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.titre}</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Budget</p>
                    <p className="font-bold text-accent">{p.budget}</p>
                  </div>
                  <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Moyen</p>
                    <p className="font-bold text-secondary">{p.moyen}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-center">
                    <p className="text-xs text-gray-500 uppercase">Premium</p>
                    <p className="font-bold text-red-500">{p.premium}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Totaux */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Budget total estimé
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {totaux.map((t) => (
              <div
                key={t.profil}
                className="rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.profil}</h3>
                <p className="text-xs text-gray-500 mb-3">{t.duree}</p>
                <p className={`text-2xl font-black ${t.couleur}`}>{t.total}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Estimations basées sur les prix moyens observés en 2024-2025. Les prix peuvent varier
            significativement selon la ville, les dates et la demande.
          </p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Conseils pour réduire les coûts
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex gap-2">
                <span className="text-accent font-bold">1.</span>
                <span>Réservez vos vols tôt (6-9 mois avant) et utilisez des alertes de prix.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">2.</span>
                <span>Privilégiez les villes mexicaines pour un séjour 30-50% moins cher.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>Logez en banlieue et utilisez les transports en commun (métro US à ~2.75$/trajet).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">4.</span>
                <span>Partagez un Airbnb à plusieurs pour diviser les frais d&apos;hébergement.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">5.</span>
                <span>Inscrivez-vous tôt sur FIFA.com pour les billets — les premiers tours de vente offrent les meilleurs prix.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/hebergement"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Guide hébergement
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/decalage-horaire"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Décalage horaire
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
