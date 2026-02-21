import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Monitor, MapPin, Clock, Users, Beer, Sun, ArrowRight } from "lucide-react";

export const revalidate = 86400;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface FanZone {
  name: string;
  type: "fan-zone" | "bar" | "place-publique";
  address: string;
  capacity: string;
  ambiance: string;
}

interface CityScreenData {
  slug: string;
  name: string;
  fanZones: FanZone[];
  tips: string[];
}

const cityData: Record<string, CityScreenData> = {
  paris: {
    slug: "paris",
    name: "Paris",
    fanZones: [
      { name: "Fan Zone Tour Eiffel (Champ-de-Mars)", type: "fan-zone", address: "Champ-de-Mars, 75007", capacity: "80 000 personnes", ambiance: "Ambiance exceptionnelle avec la Tour Eiffel en fond. LA fan zone emblématique de la France depuis 2016." },
      { name: "La Bellevilloise", type: "bar", address: "19-21 rue Boyer, 75020", capacity: "1 000 personnes", ambiance: "Bar culturel avec terrasse et écran géant. Ambiance bohème et festive." },
      { name: "Hôtel de Ville — Parvis", type: "place-publique", address: "Place de l'Hôtel de Ville, 75004", capacity: "10 000 personnes", ambiance: "Écran géant installé par la Mairie de Paris. Accès gratuit, au cœur de la capitale." },
      { name: "Le Bombardier", type: "bar", address: "2 place du Panthéon, 75005", capacity: "200 personnes", ambiance: "Pub anglais historique face au Panthéon. Ambiance internationale." },
    ],
    tips: ["Arrivez 2h avant le coup d'envoi pour la fan zone Champ-de-Mars", "Métro Bir-Hakeim ou Trocadéro pour la fan zone", "Prévoyez de l'eau — la fan zone est en plein soleil"],
  },
  lyon: {
    slug: "lyon",
    name: "Lyon",
    fanZones: [
      { name: "Place Bellecour", type: "fan-zone", address: "Place Bellecour, 69002", capacity: "30 000 personnes", ambiance: "Plus grande place piétonne d'Europe. Fan zone monumentale au cœur de Lyon." },
      { name: "Ninkasi Gerland", type: "bar", address: "267 rue Marcel Mérieux, 69007", capacity: "800 personnes", ambiance: "Brasserie-bar avec multiples écrans. Bières artisanales et burgers." },
      { name: "The Wallace Bar", type: "bar", address: "2 rue Octavio Mey, 69005", capacity: "150 personnes", ambiance: "Pub irlandais dans le Vieux Lyon. Ambiance survoltée garantie." },
    ],
    tips: ["Bellecour est desservie par les métros A et D", "Les bouchons lyonnais diffusent rarement les matchs — privilégiez les bars sportifs", "Le Vieux Lyon sera bondé les soirs de match"],
  },
  marseille: {
    slug: "marseille",
    name: "Marseille",
    fanZones: [
      { name: "Fan Zone Vieux-Port", type: "fan-zone", address: "Quai du Port, 13002", capacity: "25 000 personnes", ambiance: "Face à Notre-Dame de la Garde. L'ambiance marseillaise dans toute sa splendeur." },
      { name: "O'Malley's", type: "bar", address: "6 quai de Rive Neuve, 13007", capacity: "300 personnes", ambiance: "Pub irlandais au bord du Vieux-Port. Institution des soirs de match à Marseille." },
      { name: "Plage du Prado", type: "place-publique", address: "Promenade Georges Pompidou, 13008", capacity: "15 000 personnes", ambiance: "Écran géant les pieds dans le sable. Ambiance unique, coucher de soleil inclus." },
    ],
    tips: ["L'ambiance au Vieux-Port est incomparable mais arrivez très tôt", "Prenez le métro — le stationnement est quasi impossible les soirs de match", "Fumigènes fréquents après les victoires — restez à bonne distance"],
  },
  toulouse: {
    slug: "toulouse",
    name: "Toulouse",
    fanZones: [
      { name: "Place du Capitole", type: "fan-zone", address: "Place du Capitole, 31000", capacity: "20 000 personnes", ambiance: "Écrin architectural magnifique. Ambiance festive typiquement toulousaine." },
      { name: "Le Melting Pot", type: "bar", address: "26 boulevard de Strasbourg, 31000", capacity: "250 personnes", ambiance: "Bar sportif de référence avec multiples écrans. Ambiance garantie." },
      { name: "Prairie des Filtres", type: "place-publique", address: "Allée Charles de Fitte, 31000", capacity: "10 000 personnes", ambiance: "Grand espace vert au bord de la Garonne. Ambiance pique-nique et foot." },
    ],
    tips: ["Métro Capitole (ligne A) pour le centre", "Les nuits d'été sont douces à Toulouse — profitez des terrasses", "La ville rugbystique sait aussi vibrer pour le foot"],
  },
  bordeaux: {
    slug: "bordeaux",
    name: "Bordeaux",
    fanZones: [
      { name: "Place des Quinconces", type: "fan-zone", address: "Place des Quinconces, 33000", capacity: "25 000 personnes", ambiance: "L'une des plus grandes places d'Europe. Fan zone spacieuse avec vue sur la Garonne." },
      { name: "Le Miroir d'Eau", type: "place-publique", address: "Place de la Bourse, 33000", capacity: "5 000 personnes", ambiance: "Écran géant à côté du célèbre miroir d'eau. Ambiance familiale et festive." },
      { name: "The Connemara", type: "bar", address: "18 cours d'Albret, 33000", capacity: "200 personnes", ambiance: "Pub irlandais historique. L'adresse des matchs depuis 20 ans à Bordeaux." },
    ],
    tips: ["Tram C pour les Quinconces", "Les quais de Bordeaux sont superbes pour un apéro d'avant-match", "Vin rouge et foot — la combinaison parfaite"],
  },
  nice: {
    slug: "nice",
    name: "Nice",
    fanZones: [
      { name: "Promenade du Paillon", type: "fan-zone", address: "Promenade du Paillon, 06000", capacity: "15 000 personnes", ambiance: "Coulée verte au cœur de Nice. Écran géant dans un cadre exceptionnel." },
      { name: "Ma Nolan's", type: "bar", address: "2 rue Saint-François de Paule, 06300", capacity: "200 personnes", ambiance: "Pub irlandais dans le Vieux-Nice. Ambiance cosmopolite." },
      { name: "Plage Castel", type: "place-publique", address: "Promenade des Anglais, 06000", capacity: "3 000 personnes", ambiance: "Regarder le foot sur la Prom'. Coucher de soleil méditerranéen en bonus." },
    ],
    tips: ["Le climat est idéal en juin-juillet — soirées douces garanties", "Tram 1 pour le centre-ville", "Les matchs en fin de journée offrent des couchers de soleil mémorables"],
  },
  nantes: {
    slug: "nantes",
    name: "Nantes",
    fanZones: [
      { name: "Esplanade des Machines de l'Île", type: "fan-zone", address: "Parc des Chantiers, 44200", capacity: "12 000 personnes", ambiance: "Cadre unique avec l'éléphant mécanique en toile de fond. Ambiance nantaise." },
      { name: "Le Lieu Unique", type: "bar", address: "2 rue de la Biscuiterie, 44000", capacity: "500 personnes", ambiance: "Centre culturel dans l'ancienne usine LU. Concerts et matchs." },
      { name: "Place du Commerce", type: "place-publique", address: "Place du Commerce, 44000", capacity: "8 000 personnes", ambiance: "Point de ralliement historique des supporters nantais." },
    ],
    tips: ["Tram 1 pour le centre et les Machines", "Les terrasses du Hangar à Bananes sur l'île de Nantes sont top", "Nantes est une ville de football — l'ambiance sera au rendez-vous"],
  },
  strasbourg: {
    slug: "strasbourg",
    name: "Strasbourg",
    fanZones: [
      { name: "Place Kléber", type: "fan-zone", address: "Place Kléber, 67000", capacity: "15 000 personnes", ambiance: "Cœur de Strasbourg. Ambiance alsacienne chaleureuse et festive." },
      { name: "Académie de la Bière", type: "bar", address: "18 rue Adolphe Seyboth, 67000", capacity: "200 personnes", ambiance: "Plus de 200 bières à la carte. Le temple du match et de la bière." },
      { name: "Parc de la Citadelle", type: "place-publique", address: "Rue de Boston, 67000", capacity: "5 000 personnes", ambiance: "Grand parc arboré. Ambiance pique-nique et décontractée." },
    ],
    tips: ["Tram A et D pour le centre", "La bière alsacienne coulera à flots — modération tout de même", "Les winstubs traditionnelles ne diffusent pas les matchs"],
  },
  montpellier: {
    slug: "montpellier",
    name: "Montpellier",
    fanZones: [
      { name: "Place de la Comédie", type: "fan-zone", address: "Place de la Comédie, 34000", capacity: "15 000 personnes", ambiance: "L'Œuf de Montpellier. Ambiance étudiante et survoltée." },
      { name: "O'Carolan's", type: "bar", address: "3 place Saint-Côme, 34000", capacity: "150 personnes", ambiance: "Pub irlandais en plein centre. Matchs sur grand écran." },
    ],
    tips: ["Tram 1 et 2 pour la Place de la Comédie", "Ville étudiante — ambiance jeune et festive", "Les soirées sont chaudes en été — prévoyez de l'eau"],
  },
  lille: {
    slug: "lille",
    name: "Lille",
    fanZones: [
      { name: "Grand Place", type: "fan-zone", address: "Grand Place, 59000", capacity: "20 000 personnes", ambiance: "Place emblématique du Nord. Ambiance ch'ti festive et passionnée." },
      { name: "Le Quartier Libre", type: "bar", address: "58 rue de Gand, 59000", capacity: "300 personnes", ambiance: "Grand bar avec terrasse et plusieurs écrans. Bières régionales." },
      { name: "Parc de la Citadelle", type: "place-publique", address: "Avenue du 43e Régiment d'Infanterie, 59000", capacity: "8 000 personnes", ambiance: "Poumon vert de Lille. Ambiance familiale." },
    ],
    tips: ["Métro 1 station Rihour pour la Grand Place", "Les bières du Nord sont fortes — prudence", "L'ambiance lilloise rivalise avec Marseille les soirs de victoire"],
  },
  rennes: {
    slug: "rennes",
    name: "Rennes",
    fanZones: [
      { name: "Esplanade Charles de Gaulle", type: "fan-zone", address: "Esplanade Charles de Gaulle, 35000", capacity: "12 000 personnes", ambiance: "Grande esplanade face au Parlement de Bretagne. Ambiance bretonne." },
      { name: "Rue de la Soif", type: "bar", address: "Rue Saint-Michel, 35000", capacity: "2 000+ personnes (rue entière)", ambiance: "LA rue des bars à Rennes. Chaque bar diffuse les matchs. Ambiance étudiante légendaire." },
    ],
    tips: ["La Rue de la Soif est une expérience en soi — mais modération", "Métro a pour le centre", "Rennes est l'une des villes les plus festives de France"],
  },
  "saint-etienne": {
    slug: "saint-etienne",
    name: "Saint-Étienne",
    fanZones: [
      { name: "Place Jean Jaurès", type: "fan-zone", address: "Place Jean Jaurès, 42000", capacity: "10 000 personnes", ambiance: "Cœur de la ville des Verts. Ambiance populaire et passionnée." },
      { name: "Le Soggy Bottom", type: "bar", address: "8 rue Gérentet, 42000", capacity: "150 personnes", ambiance: "Bar à bières craft avec écrans. Ambiance conviviale." },
    ],
    tips: ["Tram T1 pour le centre", "Ville de football par excellence — l'héritage des Verts se sent", "Les prix sont très accessibles comparés aux grandes métropoles"],
  },
  grenoble: {
    slug: "grenoble",
    name: "Grenoble",
    fanZones: [
      { name: "Jardin de Ville", type: "fan-zone", address: "Jardin de Ville, 38000", capacity: "8 000 personnes", ambiance: "Écran géant avec les montagnes en toile de fond. Cadre unique." },
      { name: "Le Tonneau de Diogène", type: "bar", address: "6 place Notre-Dame, 38000", capacity: "100 personnes", ambiance: "Bar historique face à la cathédrale. Ambiance montagnarde." },
    ],
    tips: ["Tram A et B pour le centre", "Les soirées restent fraîches même en été — prenez une veste", "Le téléphérique de la Bastille offre une vue imprenable"],
  },
  dijon: {
    slug: "dijon",
    name: "Dijon",
    fanZones: [
      { name: "Place de la Libération", type: "fan-zone", address: "Place de la Libération, 21000", capacity: "8 000 personnes", ambiance: "Devant le Palais des Ducs. Ambiance bourguignonne élégante." },
      { name: "Le Shanti", type: "bar", address: "27 rue Berbisey, 21000", capacity: "150 personnes", ambiance: "Bar alternatif avec terrasse. Matchs sur écran projecteur." },
    ],
    tips: ["Tram T1 et T2 pour le centre", "Profitez des terrasses — Dijon est magnifique en été", "La moutarde est en option, la passion foot est obligatoire"],
  },
  toulon: {
    slug: "toulon",
    name: "Toulon",
    fanZones: [
      { name: "Place de la Liberté", type: "fan-zone", address: "Place de la Liberté, 83000", capacity: "8 000 personnes", ambiance: "Grande place provençale. Ambiance méditerranéenne chaleureuse." },
      { name: "Le Bar à Thym", type: "bar", address: "32 boulevard de Strasbourg, 83000", capacity: "150 personnes", ambiance: "Bar sportif avec grand écran. Ambiance locale." },
    ],
    tips: ["Bus Mistral pour le centre-ville", "Toulon est une ville de rugby qui sait aussi vibrer pour le foot", "Les plages du Mourillon sont proches pour un after-match"],
  },
  angers: {
    slug: "angers",
    name: "Angers",
    fanZones: [
      { name: "Place du Ralliement", type: "fan-zone", address: "Place du Ralliement, 49000", capacity: "6 000 personnes", ambiance: "Cœur d'Angers. Ambiance familiale et conviviale." },
      { name: "Le Grand Méchant Loup", type: "bar", address: "62 rue Beaurepaire, 49000", capacity: "120 personnes", ambiance: "Bar à bières avec écrans. Ambiance étudiante." },
    ],
    tips: ["Tram A pour le centre", "Angers est une ville à taille humaine — tout se fait à pied", "Le château d'Angers illuminé fait un beau décor de soirée foot"],
  },
  brest: {
    slug: "brest",
    name: "Brest",
    fanZones: [
      { name: "Place de la Liberté", type: "fan-zone", address: "Place de la Liberté, 29200", capacity: "8 000 personnes", ambiance: "Cœur de Brest. Ambiance bretonne et maritime." },
      { name: "Les 4 Vents", type: "bar", address: "18 quai de la Douane, 29200", capacity: "200 personnes", ambiance: "Bar au bord du port. Vue sur la rade et matchs sur écran." },
    ],
    tips: ["Tram pour le centre-ville", "Le vent breton est fidèle au poste — même en été", "Le Stade Brestois est en Ligue 1 — la ville sait supporter"],
  },
  metz: {
    slug: "metz",
    name: "Metz",
    fanZones: [
      { name: "Place de la République", type: "fan-zone", address: "Place de la République, 57000", capacity: "10 000 personnes", ambiance: "Place majestueuse entre la gare et le centre. Ambiance lorraine." },
      { name: "Le Troquet des Kneckes", type: "bar", address: "18 rue du Pont des Morts, 57000", capacity: "100 personnes", ambiance: "Bar à bières local. Ambiance conviviale et décontractée." },
    ],
    tips: ["Mettis (bus BHNS) pour le centre", "La cathédrale Saint-Étienne illuminée la nuit — magnifique", "Metz est à 1h de Luxembourg — les frontaliers seront de la partie"],
  },
  reims: {
    slug: "reims",
    name: "Reims",
    fanZones: [
      { name: "Place d'Erlon", type: "fan-zone", address: "Place d'Erlon, 51100", capacity: "10 000 personnes", ambiance: "Place animée de Reims. Terrasses, champagne et football." },
      { name: "Le Coq Hardi", type: "bar", address: "Place d'Erlon, 51100", capacity: "150 personnes", ambiance: "Brasserie historique sur la place d'Erlon. Matchs diffusés sur écran." },
    ],
    tips: ["Tram A et B pour le centre", "Oui, on peut regarder le foot avec une coupe de champagne", "Reims est une ville de football — le Stade de Reims a une histoire glorieuse"],
  },
  "le-havre": {
    slug: "le-havre",
    name: "Le Havre",
    fanZones: [
      { name: "Plage du Havre", type: "fan-zone", address: "Boulevard Albert 1er, 76600", capacity: "10 000 personnes", ambiance: "Écran géant face à la mer. Coucher de soleil normand et football." },
      { name: "Le Grignot", type: "bar", address: "53 rue de Paris, 76600", capacity: "120 personnes", ambiance: "Bar à tapas avec écrans. Ambiance décontractée." },
    ],
    tips: ["Tram A et B pour le front de mer", "Le Havre est classé UNESCO — profitez de l'architecture Perret", "Le HAC est en Ligue 1 — la ville vit foot"],
  },
};

const slugs = [
  "paris", "lyon", "marseille", "toulouse", "bordeaux", "nice", "nantes", "strasbourg",
  "montpellier", "lille", "rennes", "saint-etienne", "grenoble", "dijon", "toulon",
  "angers", "brest", "metz", "reims", "le-havre",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = cityData[slug];
  if (!data) return {};

  return {
    title: `Écrans géants CDM 2026 à ${data.name} — Où voir les matchs`,
    description: `Où regarder la Coupe du Monde 2026 sur écran géant à ${data.name} ? Fan zones, bars, places publiques : les meilleurs spots.`,
    openGraph: {
      title: `Écrans géants à ${data.name} — CDM 2026`,
      description: `Fan zones, bars et places publiques pour voir les matchs de la CDM 2026 à ${data.name}.`,
      url: `${domains.fr}/ecrans-geants/${slug}`,
      },
    alternates: { canonical: `https://www.cdm2026.fr/ecrans-geants/${slug}` },
  };
}

const typeLabels: Record<string, string> = {
  "fan-zone": "Fan Zone officielle",
  bar: "Bar / Pub",
  "place-publique": "Place publique",
};

const typeColors: Record<string, string> = {
  "fan-zone": "bg-[#00B865] text-white",
  bar: "bg-[#D4AF37] text-white",
  "place-publique": "bg-[#022149] text-white",
};

export default async function EcransGeantsPage({ params }: PageProps) {
  const { slug } = await params;
  const data = cityData[slug];
  if (!data) notFound();

  const faqItems = [
    {
      question: `Les fan zones de ${data.name} sont-elles gratuites ?`,
      answer: `Oui, les fan zones officielles installées par les municipalités sont généralement gratuites et ouvertes à tous. L'accès peut être limité par la capacité maximale — arrivez tôt pour être sûr d'entrer.`,
    },
    {
      question: "Peut-on apporter de la nourriture et des boissons ?",
      answer: "Dans les fan zones officielles, les bouteilles en verre et les canettes sont généralement interdites pour des raisons de sécurité. Des points de restauration et des buvettes sont installés sur place. Dans les bars, consommation sur place obligatoire.",
    },
    {
      question: `Quels matchs seront diffusés à ${data.name} ?`,
      answer: "Tous les matchs de l'équipe de France seront diffusés dans les fan zones et la plupart des bars sportifs. Les matchs des autres équipes sont souvent disponibles dans les bars mais pas toujours dans les fan zones officielles, qui privilégient les matchs des Bleus et les phases finales.",
    },
  ];

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Écrans géants", href: "/ecrans-geants" },
          { label: data.name },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">France</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Où voir les matchs sur écran géant à {data.name}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Fan zones, bars et places publiques : les meilleurs spots pour vibrer pendant la Coupe du Monde 2026 à {data.name}.
          </p>
        </div>
      </section>

      {/* Fan zones */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-8">
          <Monitor className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Les meilleurs spots à {data.name}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {data.fanZones.map((fz) => (
            <div
              key={fz.name}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg">{fz.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${typeColors[fz.type]}`}>
                  {typeLabels[fz.type]}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4 text-[#00B865] shrink-0 mt-0.5" />
                  <span>{fz.address}</span>
                </div>
                <div className="flex gap-2">
                  <Users className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{fz.capacity}</span>
                </div>
                <div className="flex gap-2">
                  <Beer className="w-4 h-4 text-[#022149] shrink-0 mt-0.5" />
                  <span>{fz.ambiance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Sun className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Conseils pratiques
        </h2>
        <div className="space-y-3">
          {data.tips.map((tip) => (
            <div key={tip} className="flex gap-3 text-gray-700">
              <ArrowRight className="w-5 h-5 text-[#00B865] shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
          <div className="flex gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-[#00B865] shrink-0 mt-0.5" />
            <span>Les matchs de la CDM 2026 seront diffusés entre 14h et 3h du matin (heure de Paris) selon les fuseaux horaires USA/Canada/Mexique.</span>
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="font-bold text-lg mb-4">Autres villes</h3>
        <div className="flex flex-wrap gap-2">
          {slugs
            .filter((s) => s !== slug)
            .map((s) => (
              <a
                key={s}
                href={`/ecrans-geants/${s}`}
                className="text-sm bg-gray-100 px-3 py-1.5 rounded-full hover:bg-[#00B865] hover:text-white transition-colors"
              >
                {cityData[s]?.name ?? s}
              </a>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title={`FAQ — Écrans géants à ${data.name}`} items={faqItems} />
      </section>
    </>
  );
}
