import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Billets CDM 2026 — Prix, dates et comment acheter | Coupe du Monde",
  description:
    "Tout sur les billets Coupe du Monde 2026 : prix par phase (poules 60-150€, finale 300-1500€+), comment acheter sur FIFA.com, phases de vente, catégories et conseils anti-arnaques.",
  openGraph: {
    title: "Billets CDM 2026 — Prix, dates et comment acheter",
    description:
      "Guide complet billets FIFA World Cup 2026 : tarifs officiels, calendrier des ventes, catégories Cat 1-4 et hospitalité. Tout pour assister à la CDM 2026.",
    url: "https://cdm2026.fr/billets",
  },
};

const ticketPhases = [
  {
    phase: "Phase de groupes",
    icon: "⚽",
    dates: "11 juin – 27 juin 2026",
    catPrices: [
      { cat: "Cat 1", price: "60 – 100 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "100 – 180 USD", desc: "Standard" },
      { cat: "Cat 3", price: "180 – 350 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Prix indicatifs pour les matchs de groupes les moins demandés.",
    color: "blue",
  },
  {
    phase: "Huitièmes de finale (Round of 32)",
    icon: "🏅",
    dates: "29 juin – 4 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "100 – 150 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "200 – 300 USD", desc: "Standard" },
      { cat: "Cat 3", price: "350 – 600 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Phase à élimination directe — prix plus élevés.",
    color: "green",
  },
  {
    phase: "Quarts de finale",
    icon: "🎯",
    dates: "6 – 8 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "150 – 250 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "300 – 500 USD", desc: "Standard" },
      { cat: "Cat 3", price: "600 – 1 000 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Matchs très demandés — disponibilité limitée.",
    color: "orange",
  },
  {
    phase: "Demi-finales",
    icon: "🔥",
    dates: "14 – 15 juillet 2026",
    catPrices: [
      { cat: "Cat 1", price: "200 – 400 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "500 – 800 USD", desc: "Standard" },
      { cat: "Cat 3", price: "900 – 1 500 USD", desc: "Premium" },
      { cat: "Cat 4", price: "Sur devis", desc: "Hospitalité" },
    ],
    note: "Disponibilité très limitée, réservez dès ouverture.",
    color: "purple",
  },
  {
    phase: "Finale",
    icon: "🏆",
    dates: "19 juillet 2026 — MetLife Stadium (NY/NJ)",
    catPrices: [
      { cat: "Cat 1", price: "300 – 500 USD", desc: "Supporters locaux" },
      { cat: "Cat 2", price: "700 – 1 100 USD", desc: "Standard" },
      { cat: "Cat 3", price: "1 200 – 2 500 USD", desc: "Premium" },
      { cat: "Cat 4", price: "10 000 USD+", desc: "Hospitalité VIP" },
    ],
    note: "La finale la plus disputée de l'histoire — achetez dès ouverture.",
    color: "gold",
  },
];

const salePhases = [
  {
    phase: "Phase 1 — Vente prioritaire",
    period: "Septembre – Novembre 2025",
    status: "Terminée",
    statusColor: "gray",
    desc: "Réservée aux titulaires de compte FIFA+ créés avant septembre 2025. Tirage au sort pour les matchs les plus demandés.",
  },
  {
    phase: "Phase 2 — Vente générale",
    period: "Décembre 2025 – Mars 2026",
    status: "En cours",
    statusColor: "green",
    desc: "Ouverte à tous sur FIFA.com. Premier arrivé, premier servi pour la majorité des matchs. Tirage pour les matchs à forte demande.",
  },
  {
    phase: "Phase 3 — Dernière chance",
    period: "Avril – Juin 2026",
    status: "À venir",
    statusColor: "blue",
    desc: "Billets restants mis en vente progressivement. Remises possibles sur matchs de groupes peu demandés.",
  },
  {
    phase: "Vente pendant le tournoi",
    period: "Juin – Juillet 2026",
    status: "À venir",
    statusColor: "blue",
    desc: "Billets récupérés (no-shows, retours) remis en vente avant chaque match. Disponibilité très limitée.",
  },
];

const ticketCategories = [
  {
    cat: "Catégorie 1",
    emoji: "🟢",
    target: "Supporters locaux (résidents du pays hôte)",
    desc: "Tarif le plus abordable, réservé aux résidents américains, canadiens et mexicains. Nécessite une preuve de résidence.",
    access: "Toutes zones du stade sauf VIP",
  },
  {
    cat: "Catégorie 2",
    emoji: "🔵",
    target: "Grand public international",
    desc: "La catégorie standard pour les supporters internationaux. Offre un bon rapport qualité-prix pour profiter de l'ambiance.",
    access: "Tribune principale et virages",
  },
  {
    cat: "Catégorie 3",
    emoji: "🟡",
    target: "Premium standard",
    desc: "Meilleures places en tribune latérale, meilleure visibilité sur le terrain. Plus cher mais expérience améliorée.",
    access: "Tribunes latérales premium",
  },
  {
    cat: "Catégorie 4 (Hospitalité)",
    emoji: "🔴",
    target: "Entreprises & VIP",
    desc: "Packages all-inclusive avec loges, restauration gastronomique, parking et accueil personnalisé. Via FIFA Corporate Hospitality.",
    access: "Loges VIP, suites privatives",
  },
];

const faqItems = [
  {
    question: "Où acheter des billets officiels pour la CDM 2026 ?",
    answer:
      "Les seuls billets officiels sont vendus sur FIFA.com (ticketing.fifa.com). Tout autre site est soit une arnaque soit de la revente non officielle. Créez un compte FIFA+ gratuitement pour accéder aux ventes.",
  },
  {
    question: "Combien coûtent les billets pour la Coupe du Monde 2026 ?",
    answer:
      "Les prix varient selon la phase et la catégorie : phase de groupes de 60 à 350 USD (Cat 1-3), huitièmes de 100 à 600 USD, demi-finales de 200 à 1 500 USD, finale de 300 à 2 500 USD (hors hospitalité). Les prix sont en USD pour tous les pays hôtes.",
  },
  {
    question: "Comment fonctionne le système de tirage au sort FIFA ?",
    answer:
      "Pour les matchs à forte demande (finales, demi-finales, matchs des grandes nations), la FIFA organise un tirage au sort parmi les demandes. Vous soumettez votre demande dans un délai défini, puis la FIFA tire au sort les heureux gagnants qui peuvent procéder au paiement.",
  },
  {
    question: "Peut-on revendre ses billets CDM 2026 officiellement ?",
    answer:
      "Oui, la FIFA propose une plateforme officielle de transfert de billets sur FIFA.com. C'est la seule méthode de revente autorisée. La revente non officielle est interdite par les conditions générales et peut entraîner l'annulation du billet.",
  },
  {
    question: "Les billets CDM 2026 sont-ils nominatifs ?",
    answer:
      "Oui, les billets sont nominatifs et liés à un compte FIFA+. Lors de l'entrée au stade, une pièce d'identité peut être demandée. Les transferts officiels via FIFA.com permettent de changer le nom du détenteur.",
  },
  {
    question: "Quels stades accueillent les matchs à fort intérêt ?",
    answer:
      "La finale aura lieu au MetLife Stadium (New York/NJ, 82 500 places). Les demi-finales au Rose Bowl (Pasadena) et au Azteca (Mexico). Les matchs de France à MetLife (New York), Lincoln Financial Field (Philadelphia) et Gillette Stadium (Boston).",
  },
  {
    question: "Y a-t-il des packages billets + hôtel + transport ?",
    answer:
      "Oui, la FIFA propose des packages officiels via ses agences de voyages partenaires (Tours Operators Program). Ces packages incluent billet, hôtel et parfois les transferts. Ils sont plus chers mais facilitent l'organisation.",
  },
  {
    question: "Comment éviter les arnaques de billets CDM 2026 ?",
    answer:
      "N'achetez que sur FIFA.com ou via les agences officielles TOP partenaires de la FIFA. Méfiez-vous des sites tiers, réseaux sociaux et particuliers. Les billets achetés hors circuits officiels peuvent être annulés par la FIFA.",
  },
  {
    question: "Les enfants ont-ils besoin d'un billet CDM 2026 ?",
    answer:
      "Les enfants de moins de 2 ans (sans siège attribué) peuvent entrer gratuitement. Les enfants de 3 à 16 ans bénéficient de tarifs réduits dans certaines catégories pour les matchs de groupes. Vérifiez les détails sur FIFA.com.",
  },
  {
    question: "Quand ouvrent les prochaines ventes de billets CDM 2026 ?",
    answer:
      "La Phase 3 de vente générale devrait ouvrir au printemps 2026. Inscrivez-vous à la newsletter FIFA pour être notifié en priorité. Des billets de dernière minute sont aussi disponibles juste avant les matchs sur FIFA.com.",
  },
  {
    question: "La CDM 2026 est-elle dans plusieurs villes différentes ?",
    answer:
      "Oui ! La CDM 2026 se déroule dans 16 villes réparties dans 3 pays : 11 villes aux États-Unis (Atlanta, Boston, Dallas, Kansas City, Los Angeles, Miami, New York/NJ, Philadelphia, San Francisco, Seattle, Toronto — ville canadienne désignée), 3 au Canada (Toronto, Vancouver, Calgary) et 3 au Mexique (Mexico, Guadalajara, Monterrey).",
  },
];

export default function BilletsPage() {
  const faqJsonLd = {
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Billets CDM 2026", item: "https://cdm2026.fr/billets" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Billets CDM 2026", url: "/billets" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb nav */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
            <li><Link href="/" className="hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Billets CDM 2026</li>
          </ol>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="bg-primary text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              🎟️ Guide officiel
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Billets Coupe du Monde 2026
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Prix, dates de vente et comment acheter vos billets pour la CDM 2026.
              Guide complet mis à jour en temps réel.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://ticketing.fifa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                🎟️ Acheter sur FIFA.com →
              </a>
              <a href="#prix" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-all">
                Voir les prix
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALERTE IMPORTANT ===== */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-start gap-3">
          <span className="text-amber-500 shrink-0 mt-0.5">⚠️</span>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Important :</strong> Achetez uniquement sur{" "}
            <a href="https://ticketing.fifa.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
              ticketing.fifa.com
            </a>{" "}
            — c&apos;est le seul canal officiel. Tout billet acheté sur un autre site peut être annulé.
          </p>
        </div>
      </div>

      {/* ===== STATS RAPIDES ===== */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "104", label: "Matchs CDM 2026", icon: "⚽" },
              { value: "16", label: "Stades dans 3 pays", icon: "🏟️" },
              { value: "5M+", label: "Billets disponibles", icon: "🎟️" },
              { value: "19/07", label: "Date de la finale", icon: "🏆" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-2">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-2xl font-extrabold text-primary dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRIX PAR PHASE ===== */}
      <section id="prix" className="bg-gray-50 dark:bg-slate-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            💰 Prix des billets par phase
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Tarifs officiels FIFA en USD (convertibles en EUR selon taux de change). Phase de groupes à la finale.
          </p>

          <div className="space-y-4">
            {ticketPhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
              >
                <div className={`flex items-center gap-3 px-5 py-4 ${
                  phase.color === "gold"
                    ? "bg-gradient-to-r from-yellow-900/80 to-yellow-700/80 text-white"
                    : phase.color === "purple"
                    ? "bg-gradient-to-r from-purple-900/80 to-purple-700/80 text-white"
                    : phase.color === "orange"
                    ? "bg-gradient-to-r from-orange-700/80 to-orange-600/80 text-white"
                    : phase.color === "green"
                    ? "bg-gradient-to-r from-green-800/80 to-green-700/80 text-white"
                    : "bg-gradient-to-r from-blue-800/80 to-blue-700/80 text-white"
                }`}>
                  <span className="text-2xl">{phase.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{phase.phase}</h3>
                    <p className="text-sm opacity-80">📅 {phase.dates}</p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {phase.catPrices.map((cat) => (
                      <div
                        key={cat.cat}
                        className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center"
                      >
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">{cat.cat}</p>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-white">{cat.price}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">ℹ️ {phase.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            * Prix indicatifs basés sur les annonces FIFA 2025. Les prix finaux seront confirmés sur ticketing.fifa.com.
            Taux de change USD/EUR fluctue — prévoir ~0.92 EUR par USD.
          </p>
        </div>
      </section>

      {/* ===== COMMENT ACHETER ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🛒 Comment acheter sur FIFA.com — Guide étape par étape
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                icon: "👤",
                title: "Créer un compte FIFA+",
                desc: "Rendez-vous sur FIFA.com et créez un compte FIFA+ gratuit. Renseignez vos informations exactes (elles seront vérifiées à l'entrée du stade).",
                tip: "Conseil : créez votre compte longtemps à l'avance pour bénéficier des accès prioritaires.",
              },
              {
                step: 2,
                icon: "🔔",
                title: "S'inscrire aux alertes",
                desc: "Activez les notifications e-mail et SMS pour être averti dès l'ouverture des nouvelles phases de vente. Les meilleures places partent en quelques minutes.",
                tip: "Alerte clé : phase 3 de vente générale prévue printemps 2026.",
              },
              {
                step: 3,
                icon: "🎯",
                title: "Choisir ses matchs",
                desc: "Parcourez le calendrier sur ticketing.fifa.com. Sélectionnez votre groupe de matchs (ticket package) ou des matchs individuels selon disponibilité.",
                tip: "Packages multi-matchs souvent disponibles à prix réduit.",
              },
              {
                step: 4,
                icon: "🎲",
                title: "Participer au tirage (si applicable)",
                desc: "Pour les matchs à forte demande, soumettez une demande dans la fenêtre de tirage. La FIFA sélectionne aléatoirement les acheteurs. Aucun avantage à soumettre tôt.",
                tip: "Le tirage est équitable — pas besoin de se ruer dès l'ouverture.",
              },
              {
                step: 5,
                icon: "💳",
                title: "Payer et confirmer",
                desc: "Si sélectionné (ou premier arrivé), finalisez le paiement par carte bancaire. Le billet sera associé à votre compte FIFA+. Délai de 48h pour payer.",
                tip: "Prévoyez une carte sans frais de change (USD).",
              },
              {
                step: 6,
                icon: "📱",
                title: "Accéder au stade",
                desc: "Vos billets sont dans l'application FIFA+. QR code à présenter à l'entrée avec une pièce d'identité valide correspondant au compte. Les billets papier ne sont pas disponibles.",
                tip: "Téléchargez l'app FIFA+ avant le jour du match.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-accent/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                    {step.step}
                  </div>
                  <span className="text-xl">{step.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{step.desc}</p>
                <div className="rounded-lg bg-accent/5 dark:bg-accent/10 border border-accent/20 p-2.5">
                  <p className="text-xs text-accent font-medium">💡 {step.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://ticketing.fifa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-bold text-white text-lg shadow-lg shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 transition-all"
            >
              🎟️ Aller sur ticketing.fifa.com →
            </a>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Lien officiel FIFA — Seul canal d&apos;achat garanti</p>
          </div>
        </div>
      </section>

      {/* ===== PHASES DE VENTE ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📅 Calendrier des phases de vente
          </h2>

          <div className="space-y-3">
            {salePhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex items-start gap-4"
              >
                <div className={`shrink-0 mt-1 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  phase.statusColor === "green"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : phase.statusColor === "blue"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 line-through"
                }`}>
                  {phase.status}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{phase.phase}</h3>
                  <p className="text-sm text-accent font-medium mb-1">📅 {phase.period}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎫 Les catégories de billets
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {ticketCategories.map((cat) => (
              <div
                key={cat.cat}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{cat.emoji}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white">{cat.cat}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">👥</span>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Public :</strong> {cat.target}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">📍</span>
                    <span className="text-gray-700 dark:text-gray-300"><strong>Accès :</strong> {cat.access}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSEILS ANTI-ARNAQUES ===== */}
      <section className="bg-red-50 dark:bg-red-900/10 py-12 border-t border-red-100 dark:border-red-900/30">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">
            🚨 Conseils pratiques — Éviter les arnaques
          </h2>
          <p className="text-sm text-red-700 dark:text-red-300/80 mb-6">
            La CDM 2026 sera la cible de nombreuses escroqueries. Voici comment vous protéger.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: "❌",
                title: "Sites non officiels",
                desc: "Méfiez-vous de TOUS les sites autres que ticketing.fifa.com. Des centaines de faux sites existent.",
              },
              {
                icon: "❌",
                title: "Réseaux sociaux",
                desc: "Les ventes de billets sur Facebook, Instagram, Twitter sont quasiment toutes des arnaques ou billets volés.",
              },
              {
                icon: "❌",
                title: "Revendeurs non officiels",
                desc: "StubHub, Viagogo et similaires ne sont PAS partenaires officiels FIFA. Les billets peuvent être invalidés.",
              },
              {
                icon: "✅",
                title: "Canal officiel unique",
                desc: "ticketing.fifa.com est le SEUL endroit où acheter. Bookmarkez cette URL exacte.",
              },
              {
                icon: "✅",
                title: "Revente officielle FIFA",
                desc: "Si vous devez revendre, utilisez la plateforme officielle de transfert FIFA. Les billets restent valides.",
              },
              {
                icon: "✅",
                title: "Vérifiez l'URL",
                desc: "Assurez-vous que l'URL commence par ticketing.fifa.com avec HTTPS. Pas de tirets, variantes ou sous-domaines suspects.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className={`rounded-xl border p-4 ${
                  tip.icon === "✅"
                    ? "border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/10"
                    : "border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{tip.icon}</span>
                  <h3 className={`font-bold text-sm ${
                    tip.icon === "✅" ? "text-green-800 dark:text-green-400" : "text-red-800 dark:text-red-400"
                  }`}>
                    {tip.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-red-300 dark:border-red-700/50 bg-white dark:bg-slate-800 p-5">
            <h3 className="font-bold text-red-800 dark:text-red-400 mb-2">
              🛡️ Que faire si vous avez été arnaqué ?
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Signalez immédiatement à votre banque pour bloquer le paiement (chargeback)</li>
              <li>• Déposez plainte auprès de votre service de police local</li>
              <li>• Signalez le site sur <a href="https://www.signal-spam.fr" target="_blank" rel="noopener noreferrer" className="text-accent underline">Signal-Spam</a> (France)</li>
              <li>• Contactez la FIFA via fifa.com/contact</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ❓ Questions fréquentes — Billets CDM 2026
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform">
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

      {/* ===== CTA FINAL ===== */}
      <section className="bg-white dark:bg-slate-900 py-10 border-t border-gray-100 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-primary to-primary-dark text-white p-8 text-center">
            <h2 className="text-2xl font-extrabold mb-3">
              🎟️ Prêt à vivre la CDM 2026 en direct ?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
              Ne manquez pas l&apos;événement sportif du siècle. Inscrivez-vous sur FIFA.com
              et soyez prêt pour les prochaines phases de vente.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://ticketing.fifa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-8 py-3 font-bold text-white hover:bg-accent/90 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Acheter sur FIFA.com →
              </a>
              <Link
                href="/stades"
                className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
              >
                🏟️ Découvrir les stades
              </Link>
              <Link
                href="/match/calendrier"
                className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-all"
              >
                📅 Calendrier des matchs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
