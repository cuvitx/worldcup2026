import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { Hotel, MapPin, DollarSign, ArrowRight, ExternalLink, CalendarCheck } from "lucide-react";
import { cities, citiesBySlug } from "@repo/data/cities";
import { domains } from "@repo/data/route-mapping";

export const dynamicParams = false;

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};
  return {
    title: `Hébergement à ${city.name} — CDM 2026 : Hôtels et Airbnb`,
    description: `Où dormir à ${city.name} pendant la Coupe du Monde 2026 ? Hôtels, Airbnb, quartiers recommandés et fourchettes de prix.`,
    alternates: { canonical: `https://cdm2026.fr/hebergement/${slug}` },
  };
}

interface QuartierInfo { name: string; description: string; priceRange: string; }

function getQuartiers(slug: string): QuartierInfo[] {
  const quartiersByCity: Record<string, QuartierInfo[]> = {
    "new-york-new-jersey": [
      { name: "Midtown Manhattan", description: "Au cœur de l'action, Times Square et accès direct NJ Transit vers le stade", priceRange: "250-500€/nuit" },
      { name: "Jersey City", description: "Vue sur Manhattan, prix plus doux, 20 min du stade en transport", priceRange: "120-250€/nuit" },
      { name: "Hoboken", description: "Ambiance village, bars et restaurants, accès facile au stade", priceRange: "130-220€/nuit" },
      { name: "Brooklyn (Williamsburg)", description: "Quartier branché, vie nocturne, métro vers Penn Station", priceRange: "100-200€/nuit" },
    ],
    "miami": [
      { name: "South Beach", description: "Plage mythique, vie nocturne, ambiance festive garantie", priceRange: "200-450€/nuit" },
      { name: "Brickell", description: "Quartier d'affaires moderne, rooftops, proche Metrorail", priceRange: "150-300€/nuit" },
      { name: "Wynwood", description: "Art urbain, galeries, restaurants tendance", priceRange: "120-250€/nuit" },
      { name: "Coral Gables", description: "Résidentiel et verdoyant, calme, bonne base familiale", priceRange: "100-200€/nuit" },
    ],
    "mexico-city": [
      { name: "Condesa / Roma", description: "Quartiers branchés, cafés, architecture Art Déco", priceRange: "80-180€/nuit" },
      { name: "Polanco", description: "Quartier chic, musées, restaurants haut de gamme", priceRange: "150-350€/nuit" },
      { name: "Centro Histórico", description: "Au cœur de l'histoire, Zócalo, ambiance authentique", priceRange: "60-150€/nuit" },
      { name: "Coyoacán", description: "Bohème et culturel, maison de Frida Kahlo", priceRange: "70-140€/nuit" },
    ],
  };
  const defaultQuartiers: QuartierInfo[] = [
    { name: "Centre-ville", description: "Proche des transports et attractions principales", priceRange: "120-250€/nuit" },
    { name: "Quartier du stade", description: "À proximité immédiate du stade, idéal les jours de match", priceRange: "100-200€/nuit" },
    { name: "Quartier résidentiel", description: "Plus calme, bon rapport qualité-prix, accès transport", priceRange: "80-160€/nuit" },
    { name: "Zone aéroport", description: "Pratique pour les arrivées/départs, navettes disponibles", priceRange: "80-150€/nuit" },
  ];
  return quartiersByCity[slug] ?? defaultQuartiers;
}

export default async function HebergementPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const quartiers = getQuartiers(slug);
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Villes", url: "/villes" },
    { name: `Hébergement ${city.name}`, url: `/hebergement/${slug}` },
  ];

  const faqItems = [
    { question: `Quel budget prévoir pour se loger à ${city.name} pendant la CDM 2026 ?`, answer: `Comptez 80-120€/nuit en budget, 150-250€ en gamme moyenne, et 300-500€ pour du premium. Les prix augmenteront fortement à l'approche du tournoi.` },
    { question: "Vaut-il mieux un hôtel ou un Airbnb ?", answer: "Les hôtels offrent plus de services (room service, conciergerie) et de flexibilité d'annulation. Les Airbnb permettent plus d'espace et une cuisine, idéal pour les groupes et les séjours longs." },
    { question: "Quand réserver son hébergement ?", answer: "Le plus tôt possible ! Les hébergements à proximité des stades se remplissent très vite. Réservez maintenant avec annulation gratuite pour sécuriser votre place." },
    { question: `Quel quartier choisir à ${city.name} ?`, answer: `Cela dépend de vos priorités : proximité du stade, vie nocturne, budget. Consultez notre guide des quartiers ci-dessus pour trouver l'option idéale.` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `Hébergement à ${city.name} — Coupe du Monde 2026`,
    description: `Où dormir à ${city.name} pendant la Coupe du Monde 2026 ? Hôtels, Airbnb, quartiers recommandés et fourchettes de prix.`,
    url: `https://cdm2026.fr/hebergement/${slug}`,
    touristType: "Sports fan",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema items={breadcrumbItems} baseUrl={domains.fr} />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Villes", href: "/villes" }, { label: `Hébergement ${city.name}` }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Hotel className="inline w-8 h-8 mr-2" />
            Hébergement à {city.name} — CDM 2026 : Hôtels et Airbnb
          </h1>
          <p className="text-secondary mt-3 text-lg max-w-2xl">
            {city.country} • Trouvez le logement idéal pour la Coupe du Monde 2026
          </p>
        </div>
      </section>

      {/* Fourchettes de prix */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-accent" /> Fourchettes de prix
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm font-semibold text-accent uppercase mb-2">Budget</div>
            <div className="text-3xl font-extrabold text-primary">80-120€</div>
            <div className="text-sm text-secondary mt-1">/ nuit</div>
            <p className="text-xs text-secondary mt-3">Auberges, hôtels 2★, Airbnb partagé</p>
          </div>
          <div className="bg-white rounded-xl border-2 border-accent p-6 text-center">
            <div className="text-sm font-semibold text-accent uppercase mb-2">Moyen</div>
            <div className="text-3xl font-extrabold text-primary">150-250€</div>
            <div className="text-sm text-secondary mt-1">/ nuit</div>
            <p className="text-xs text-secondary mt-3">Hôtels 3-4★, Airbnb entier</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm font-semibold text-accent uppercase mb-2">Premium</div>
            <div className="text-3xl font-extrabold text-primary">300-500€</div>
            <div className="text-sm text-secondary mt-1">/ nuit</div>
            <p className="text-xs text-secondary mt-3">Hôtels 5★, suites, villas</p>
          </div>
        </div>
      </section>

      {/* Quartiers recommandés */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-accent" /> Quartiers recommandés
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quartiers.map((q) => (
            <div key={q.name} className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-primary text-lg">{q.name}</h3>
              <p className="text-secondary text-sm mt-1">{q.description}</p>
              <p className="text-accent font-semibold text-sm mt-2">{q.priceRange}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hôtel vs Airbnb */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Hôtel vs Airbnb : que choisir ?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-primary text-lg mb-3">🏨 Hôtel</h3>
            <ul className="space-y-2 text-secondary text-sm">
              <li>✅ Room service et conciergerie</li>
              <li>✅ Annulation flexible</li>
              <li>✅ Sécurité et réception 24h/24</li>
              <li>❌ Moins d&apos;espace</li>
              <li>❌ Pas de cuisine</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-primary text-lg mb-3">🏠 Airbnb</h3>
            <ul className="space-y-2 text-secondary text-sm">
              <li>✅ Plus d&apos;espace, cuisine équipée</li>
              <li>✅ Idéal pour les groupes</li>
              <li>✅ Ambiance locale authentique</li>
              <li>❌ Check-in parfois compliqué</li>
              <li>❌ Annulation moins flexible</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quand réserver */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-accent/10 rounded-2xl p-8 text-center">
          <CalendarCheck className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">Réservez maintenant !</h2>
          <p className="text-secondary max-w-xl mx-auto mb-6">
            Les hébergements à {city.name} pour la CDM 2026 partent très vite. Réservez dès maintenant avec annulation gratuite
            pour sécuriser les meilleurs tarifs et emplacements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city.name)}`} target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Booking.com <ExternalLink className="w-4 h-4" />
            </a>
            <a href={`https://www.airbnb.fr/s/${encodeURIComponent(city.name)}`} target="_blank" rel="noopener noreferrer sponsored nofollow" className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Airbnb <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/ville/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href="/budget" className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Budget CDM 2026</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/guide-supporter/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide supporter {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Hébergement à ${city.name}`} items={faqItems} />
    </>
  );
}
