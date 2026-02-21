import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Plane, Globe, DollarSign, Shield, Smartphone, Users, ArrowRight, Clock, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide du supporter français aux États-Unis — CDM 2026",
  description:
    "Tout ce qu'un supporter français doit savoir pour la CDM 2026 aux USA : ESTA, décalage horaire, pourboires, budget, assurance, culture américaine et conseils pratiques.",
  openGraph: {
    title: "Guide du supporter français aux USA — CDM 2026",
    description: "ESTA, culture US, budget, pourboires : le guide complet pour les Français à la CDM 2026.",
    url: "https://cdm2026.fr/supporter-francais-usa",
  },
  alternates: { canonical: "https://cdm2026.fr/supporter-francais-usa" },
};

const rubriques = [
  {
    icon: Globe,
    titre: "Visa / ESTA",
    contenu:
      "Les ressortissants français bénéficient du programme d'exemption de visa (VWP). Vous devez obtenir une autorisation ESTA au moins 72 heures avant le départ. Coût : 21 $ (2025). Validité : 2 ans ou jusqu'à expiration du passeport. Votre passeport doit être biométrique. Aucun visa n'est nécessaire pour un séjour touristique de moins de 90 jours.",
  },
  {
    icon: Clock,
    titre: "Décalage horaire",
    contenu:
      "Les États-Unis couvrent 4 fuseaux horaires principaux. New York / Miami : -6h par rapport à Paris. Chicago / Houston / Dallas : -7h. Denver : -8h. Los Angeles / Seattle : -9h. Mexico : -7h. Un match à 18h locale à LA = 3h du matin à Paris. Prévoyez 2-3 jours d'adaptation au jetlag.",
  },
  {
    icon: DollarSign,
    titre: "Pourboires & paiement",
    contenu:
      "Le pourboire est quasi-obligatoire aux USA : 15-20% en restaurant, 1-2 $ par boisson au bar, 2-5 $ pour le taxi/Uber. La carte bancaire est acceptée partout (Visa/Mastercard), même pour de petits montants. Attention aux frais de change : privilégiez une carte sans frais à l'étranger (Revolut, N26, Boursorama Ultim).",
  },
  {
    icon: Coffee,
    titre: "Culture US & différences",
    contenu:
      "L'alcool est interdit en dessous de 21 ans (contrôles stricts, pièce d'identité demandée). Fumer est interdit dans la plupart des lieux publics. Les stades américains sont immenses (60 000-90 000 places) avec une ambiance familiale différente des ultras européens. Les matchs débutent pile à l'heure. Le tailgating (barbecue sur le parking avant le match) est une tradition à essayer.",
  },
  {
    icon: Shield,
    titre: "Assurance & santé",
    contenu:
      "Les frais médicaux aux USA sont extrêmement élevés (une simple consultation aux urgences peut dépasser 3 000 $). Une assurance voyage avec couverture médicale d'au moins 300 000 € est indispensable. Vérifiez que votre carte bancaire ne couvre pas déjà le voyage. Emportez vos ordonnances traduites en anglais si vous prenez des médicaments.",
  },
  {
    icon: Smartphone,
    titre: "Carte SIM & communication",
    contenu:
      "Votre forfait français peut inclure du roaming USA (vérifiez Free, SFR, Orange). Sinon, achetez une eSIM ou carte SIM prépayée T-Mobile/AT&T dès l'aéroport (30-50 $ pour 30 jours, data illimitée). Le WiFi gratuit est disponible dans la plupart des cafés, hôtels et stades FIFA.",
  },
];

const budgetTypes = [
  { profil: "Backpacker", duree: "10 jours / 2 matchs", montant: "1 800 – 2 500 €", couleur: "text-accent" },
  { profil: "Confort", duree: "14 jours / 3 matchs", montant: "3 500 – 5 500 €", couleur: "text-secondary" },
  { profil: "Premium", duree: "21 jours / 5+ matchs", montant: "8 000 – 15 000 €+", couleur: "text-red-500" },
];

const faqItems = [
  {
    question: "Faut-il un visa pour aller aux États-Unis en tant que Français ?",
    answer:
      "Non, les Français bénéficient du programme d'exemption de visa (VWP). Il suffit d'obtenir une autorisation ESTA en ligne (21 $, validité 2 ans) pour un séjour touristique de moins de 90 jours. Un passeport biométrique est obligatoire.",
  },
  {
    question: "Combien de pourboire laisser aux États-Unis ?",
    answer:
      "15-20 % en restaurant (calculé sur le montant avant taxes), 1-2 $ par boisson au bar, 2-5 $ pour le taxi. Ne pas laisser de pourboire est considéré comme très impoli aux USA car les serveurs dépendent largement des tips.",
  },
  {
    question: "Mon téléphone français fonctionnera-t-il aux USA ?",
    answer:
      "Oui, la plupart des smartphones récents sont compatibles avec les réseaux américains. Vérifiez votre forfait roaming (Free inclut 25 Go/mois aux USA). Sinon, achetez une eSIM Airalo ou Holafly avant le départ pour 20-40 € les 2 semaines.",
  },
  {
    question: "Y a-t-il une communauté française aux États-Unis pour la CDM ?",
    answer:
      "Oui ! Rejoignez les groupes Facebook « Français à [ville] », les associations France-Amérique, et les bars français dans les grandes villes (Café de Flore NYC, Petit Trois LA). Des fan zones françaises seront probablement organisées dans les villes hôtes.",
  },
  {
    question: "L'eau du robinet est-elle potable aux États-Unis ?",
    answer:
      "Oui, l'eau du robinet est potable dans toutes les grandes villes américaines et mexicaines (bien que le goût puisse varier). Les stades fourniront de l'eau gratuite aux fontaines. Emportez une gourde réutilisable pour éviter les bouteilles à 5 $.",
  },
];

export default function SupporterFrancaisUsaPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Guide supporter français USA" }];
  const schemaItems = [
    { name: "Accueil", url: "/" },
    { name: "Guide supporter français USA", url: "/supporter-francais-usa" },
  ];


  return (
    <>
      <BreadcrumbSchema items={schemaItems} baseUrl={domains.fr} />
      <Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Guide pratique
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Guide du supporter français aux États-Unis
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            ESTA, décalage horaire, pourboires, budget, assurance : tout ce qu&apos;il faut savoir avant
            de s&apos;envoler pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Rubriques */}
        {rubriques.map((r) => (
          <section key={r.titre}>
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
              <r.icon className="h-7 w-7 text-accent" /> {r.titre}
            </h2>
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{r.contenu}</p>
            </div>
          </section>
        ))}

        {/* Budget estimatif */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <DollarSign className="h-7 w-7 text-accent" /> Budget estimatif
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {budgetTypes.map((b) => (
              <div
                key={b.profil}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-center"
              >
                <p className="font-semibold text-gray-900 dark:text-white">{b.profil}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{b.duree}</p>
                <p className={`text-xl font-bold mt-2 ${b.couleur}`}>{b.montant}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Communauté française */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <Users className="h-7 w-7 text-accent" /> Communauté française aux USA
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 prose dark:prose-invert max-w-none">
            <p>
              Plus de 150 000 Français vivent aux États-Unis. Rejoignez les groupes Facebook
              &quot;Français à New York&quot;, &quot;Français à Los Angeles&quot;, &quot;Français à Miami&quot;
              pour trouver des compagnons de route, partager des bons plans logement et organiser
              des covoiturages vers les stades.
            </p>
            <p>
              Les associations comme <strong>France-Amérique</strong> et les consulats français organisent
              régulièrement des événements. Pendant la CDM, des fan zones françaises seront probablement
              mises en place dans les grandes villes. Suivez{" "}
              <strong>@FranceAux USA</strong> sur les réseaux sociaux.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/esta-usa"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Guide ESTA <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Budget détaillé
          </Link>
          <Link
            href="/securite"
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-xl py-3.5 px-6 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Sécurité aux USA
          </Link>
          <Link
            href="/pourboires-usa"
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-xl py-3.5 px-6 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Guide pourboires
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
