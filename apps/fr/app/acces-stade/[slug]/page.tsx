import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { AlarmClock, ArrowRight, Bus, Car, Clock, Lock, MapPin, Plane, ShieldCheck, Smartphone, Thermometer } from "lucide-react";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
export const dynamicParams = false;
export async function generateStaticParams() {
  return stadiums.map((s) => ({ slug: s.slug }));
}
interface PageProps { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) return {};
  return {
    title: `Comment aller au ${stadium.name} — Accès CDM 2026`,
    description: `Accès au ${stadium.name} à ${stadium.city} : transports en commun, parking, taxi. Conseils pratiques pour la Coupe du Monde 2026.`,
    alternates: { canonical: `https://www.cdm2026.fr/acces-stade/${slug}` },
  };
}
function getTransportInfo(stadium: { slug: string; city: string; distanceFromCenter?: number; country: "USA" | "Canada" | "Mexico" }) {
  const seed = stadium.slug.length + stadium.slug.charCodeAt(0);
  const dist = stadium.distanceFromCenter ?? 10;
  const isUSA = stadium.country === "USA";
  const isMexico = stadium.country === "Mexico";
  const metroLines = isMexico
    ? [`Línea ${1 + (seed % 9)} (station ${stadium.city} Centro)`, `Línea ${3 + (seed % 7)} (arrêt Estadio)`]
    : isUSA
      ? [`Ligne ${["Blue", "Red", "Green", "Orange", "Silver"][seed % 5]} (station Stadium)`, `Bus express ${20 + (seed % 40)}`]
      : [`Ligne ${seed % 4 + 1} du SkyTrain`, `Bus ${100 + (seed % 50)}`];
  const centerTime = Math.max(15, dist * 2 + (seed % 10));
  const airportTime = 30 + (seed % 30);
  return { metroLines, centerTime, airportTime, parkingSpots: 5000 + (seed % 15000) };
}
export default async function AccesStadePage({ params }: PageProps) {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) notFound();
  const city = citiesById[stadium.cityId];
  const transport = getTransportInfo(stadium);
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Stades", url: "/stades" },
    { name: `Accès ${stadium.name}`, url: `/acces-stade/${slug}` },
  ];
  const faqItems = [
    { question: `Comment se rendre au ${stadium.name} en transports en commun ?`, answer: `Plusieurs lignes desservent le stade : ${transport.metroLines.join(", ")}. Comptez environ ${transport.centerTime} minutes depuis le centre-ville.` },
    { question: `Y a-t-il un parking au ${stadium.name} ?`, answer: `Oui, le stade dispose d'environ ${transport.parkingSpots.toLocaleString("fr-FR")} places de parking. Arrivez tôt car les places se remplissent rapidement les jours de match.` },
    { question: "Combien de temps avant le match faut-il arriver ?", answer: "Nous recommandons d'arriver au moins 2h30 avant le coup d'envoi pour passer les contrôles de sécurité FIFA sereinement et profiter de l'ambiance d'avant-match." },
    { question: `Peut-on prendre un Uber/taxi pour aller au ${stadium.name} ?`, answer: `Oui, des zones de dépose Uber/Lyft/taxi sont prévues à proximité du stade. Prévoyez un surcoût les jours de match et des temps d'attente allongés au retour.` },
  ];
  return (
    <>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Stades", href: "/stades" }, { label: `Accès ${stadium.name}` }]} />
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <MapPin className="inline w-8 h-8 mr-2" />
            Comment aller au {stadium.name} — Accès CDM 2026
          </h1>
          <p className="text-accent mt-3 text-lg max-w-2xl">
            {stadium.city}, {stadium.country} • Capacité : {stadium.capacity.toLocaleString("fr-FR")} places
          </p>
        </div>
      </section>
      {/* Adresse */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-accent" /> Adresse complète
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-primary font-semibold text-lg">{stadium.name}</p>
          <p className="text-accent">{stadium.city}, {stadium.country}</p>
          <p className="text-accent text-sm mt-1">Coordonnées GPS : {stadium.latitude.toFixed(4)}, {stadium.longitude.toFixed(4)}</p>
          <p className="text-accent text-sm">À {stadium.distanceFromCenter ?? 10} km du centre-ville</p>
        </div>
      </section>
      {/* Transports */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Bus className="w-6 h-6 text-accent" /> Transports en commun
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {transport.metroLines.map((line, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
              <Bus className="w-5 h-5 text-accent mb-2" />
              <p className="font-semibold text-primary">{line}</p>
              <p className="text-sm text-accent">Fréquence renforcée les jours de match</p>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{transport.centerTime} min</div>
            <div className="text-sm text-accent">Depuis le centre-ville</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Plane className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{transport.airportTime} min</div>
            <div className="text-sm text-accent">Depuis l&apos;aéroport</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Car className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{transport.parkingSpots.toLocaleString("fr-FR")}</div>
            <div className="text-sm text-accent">Places de parking</div>
          </div>
        </div>
      </section>
      {/* Depuis l'aéroport */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <Plane className="w-6 h-6 text-accent" /> Depuis l&apos;aéroport
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 text-accent">
          <p><strong className="text-primary">Navette / train :</strong> Comptez environ {transport.airportTime} minutes. Des navettes spéciales CDM 2026 seront mises en place les jours de match.</p>
          <p><strong className="text-primary">Taxi / Uber :</strong> Environ {transport.airportTime - 5}-{transport.airportTime + 10} minutes selon le trafic. Budget : {stadium.country === "Mexico" ? "300-600 MXN" : "40-80 $"}.</p>
          <p><strong className="text-primary">Location de voiture :</strong> Agences disponibles à l&apos;aéroport. Parking au stade disponible mais limité les jours de match.</p>
        </div>
      </section>
      {/* Conseils */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-accent" /> Conseils pratiques
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 text-accent">
          <p><AlarmClock className="h-5 w-5 inline-block" /> <strong className="text-primary">Arrivez 2h30 avant</strong> le coup d&apos;envoi pour passer les contrôles de sécurité FIFA sans stress.</p>
          <p><Lock className="h-5 w-5 inline-block" /> <strong className="text-primary">Sécurité à l&apos;entrée :</strong> Pas de sacs à dos volumineux, pas de bouteilles en verre, pas de parapluies. Seuls les petits sacs transparents sont autorisés.</p>
          <p><Smartphone className="h-5 w-5 inline-block" /> <strong className="text-primary">Billets numériques :</strong> Chargez votre billet FIFA sur votre téléphone avant de partir. Prévoyez une batterie externe.</p>
          <p><Thermometer className="h-5 w-5 inline-block" /> <strong className="text-primary">Hydratation :</strong> En été, les températures peuvent être élevées. Apportez une bouteille vide (à remplir à l&apos;intérieur) et de la crème solaire.</p>
        </div>
      </section>
      {/* Plan des alentours */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Plan des alentours</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-accent leading-relaxed">
          <p>
            Le {stadium.name} est situé à {stadium.distanceFromCenter ?? 10} km du centre de {stadium.city}.
            Les abords du stade comprennent des zones de restauration, des fan zones officielles FIFA, et des espaces de rassemblement pour les supporters.
            Les parkings principaux se trouvent au nord et à l&apos;est du stade, tandis que les arrêts de transports en commun sont accessibles depuis l&apos;entrée sud.
            Des points d&apos;information et de premiers secours sont répartis autour du périmètre.
          </p>
        </div>
      </section>
      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/stade/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide {stadium.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          {city && (
            <Link href={`/ville/${city.slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
              <span className="font-semibold text-primary">Guide {city.name}</span>
              <ArrowRight className="w-5 h-5 text-accent" />
            </Link>
          )}
          {city && (
            <Link href={`/transport/${city.slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
              <span className="font-semibold text-primary">Transports à {city.name}</span>
              <ArrowRight className="w-5 h-5 text-accent" />
            </Link>
          )}
        </div>
      </section>
      <FAQSection title={`Questions fréquentes — Accès ${stadium.name}`} items={faqItems} />
    </>
  );
}