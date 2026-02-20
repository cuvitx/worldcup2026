import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { CloudSun, Thermometer, Droplets, Wind, ArrowRight, Luggage } from "lucide-react";
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
    title: `Météo à ${city.name} en juin-juillet 2026 — CDM 2026`,
    description: `Prévisions météo à ${city.name} pour la Coupe du Monde 2026 : températures, pluie, humidité et impact sur les matchs.`,
    alternates: { canonical: `https://cdm2026.fr/meteo/${slug}` },
  };
}

interface WeatherData {
  tempJuneMin: number; tempJuneMax: number;
  tempJulyMin: number; tempJulyMax: number;
  rainJune: number; rainJuly: number;
  humidity: number; altitude: number;
  sunHours: number;
  highlights: string[];
  packingTips: string[];
  bettingImpact: string;
}

function getWeatherData(slug: string): WeatherData {
  const data: Record<string, WeatherData> = {
    "new-york-new-jersey": { tempJuneMin: 18, tempJuneMax: 29, tempJulyMin: 21, tempJulyMax: 32, rainJune: 112, rainJuly: 117, humidity: 65, altitude: 10, sunHours: 10, highlights: ["Étés chauds et humides", "Orages possibles en fin d'après-midi", "Soirées agréables"], packingTips: ["T-shirts et shorts", "Imperméable léger", "Crème solaire SPF 50", "Chapeau ou casquette"], bettingImpact: "La chaleur humide peut ralentir le rythme des matchs en 2e mi-temps, favorisant les under 2.5 buts." },
    "miami": { tempJuneMin: 24, tempJuneMax: 33, tempJulyMin: 25, tempJulyMax: 34, rainJune: 247, rainJuly: 165, humidity: 76, altitude: 2, sunHours: 9, highlights: ["Chaleur tropicale intense", "Averses quotidiennes en fin de journée", "Humidité très élevée"], packingTips: ["Vêtements légers et respirants", "Parapluie compact", "Crème solaire waterproof", "Bouteille d'eau réutilisable"], bettingImpact: "L'humidité extrême (76%) fatigue les joueurs rapidement. Les buts tardifs sont statistiquement plus rares dans ces conditions." },
    "mexico-city": { tempJuneMin: 12, tempJuneMax: 25, tempJulyMin: 12, tempJulyMax: 24, rainJune: 168, rainJuly: 178, humidity: 58, altitude: 2240, sunHours: 7, highlights: ["Altitude 2240m : impact sur l'endurance", "Saison des pluies (averses l'après-midi)", "Températures modérées grâce à l'altitude"], packingTips: ["Couches superposables (frais le soir)", "Imperméable", "Crème solaire (UV plus forts en altitude)", "Hydratation renforcée"], bettingImpact: "L'altitude de 2240m est un facteur majeur : les équipes non acclimatées souffrent physiquement, favorisant le Mexique et les équipes sud-américaines habituées." },
    "dallas-fort-worth": { tempJuneMin: 23, tempJuneMax: 36, tempJulyMin: 25, tempJulyMax: 38, rainJune: 97, rainJuly: 52, humidity: 55, altitude: 130, sunHours: 11, highlights: ["Chaleur intense (35°C+)", "Stade climatisé (toit rétractable)", "Peu de pluie en juillet"], packingTips: ["Vêtements très légers", "Lunettes de soleil", "Crème solaire", "Chapeau"], bettingImpact: "Le stade climatisé neutralise l'effet chaleur. Les conditions intérieures favorisent un jeu rapide et technique." },
    "houston": { tempJuneMin: 24, tempJuneMax: 35, tempJulyMin: 25, tempJulyMax: 36, rainJune: 173, rainJuly: 94, humidity: 75, altitude: 15, sunHours: 9, highlights: ["Chaleur + humidité = sensation 40°C+", "Stade couvert (NRG Stadium)", "Risque d'ouragans (faible en juin)"], packingTips: ["Vêtements ultra-légers", "Eau en permanence", "Anti-moustiques", "Parapluie"], bettingImpact: "Stade couvert et climatisé. L'humidité extérieure n'affecte pas le jeu mais peut fatiguer les supporters en déplacement." },
    "atlanta": { tempJuneMin: 20, tempJuneMax: 32, tempJulyMin: 22, tempJulyMax: 34, rainJune: 109, rainJuly: 132, humidity: 68, altitude: 320, sunHours: 10, highlights: ["Étés chauds et orageux", "Mercedes-Benz Stadium couvert", "Altitude modérée"], packingTips: ["Vêtements légers", "Imperméable", "Crème solaire", "Bouteille d'eau"], bettingImpact: "Stade couvert et climatisé : aucun impact météo direct sur le jeu. Conditions neutres et standardisées." },
    "seattle": { tempJuneMin: 12, tempJuneMax: 22, tempJulyMin: 14, tempJulyMax: 25, rainJune: 40, rainJuly: 18, humidity: 58, altitude: 56, sunHours: 11, highlights: ["Le plus frais des sites US", "Été sec et agréable", "Longues journées (16h de lumière)"], packingTips: ["Couches légères", "Veste pour le soir", "Lunettes de soleil", "Pas besoin de parapluie (été sec !)"], bettingImpact: "Les conditions fraîches (22-25°C) sont idéales pour un jeu rapide. Avantage aux équipes européennes habituées au climat tempéré." },
    "philadelphia": { tempJuneMin: 18, tempJuneMax: 30, tempJulyMin: 21, tempJulyMax: 32, rainJune: 98, rainJuly: 113, humidity: 64, altitude: 12, sunHours: 10, highlights: ["Étés chauds et humides", "Orages possibles", "Températures similaires à NYC"], packingTips: ["T-shirts légers", "Imperméable", "Crème solaire", "Casquette"], bettingImpact: "Conditions similaires à New York. La chaleur modérée ne devrait pas créer d'avantage significatif." },
    "kansas-city": { tempJuneMin: 19, tempJuneMax: 32, tempJulyMin: 21, tempJulyMax: 34, rainJune: 134, rainJuly: 104, humidity: 65, altitude: 277, sunHours: 10, highlights: ["Chaleur continentale", "Orages violents possibles", "Amplitude thermique jour/nuit"], packingTips: ["Vêtements légers le jour", "Veste légère pour le soir", "Imperméable", "Crème solaire"], bettingImpact: "La chaleur continentale peut surprendre les équipes non préparées. Favorise les équipes habituées aux climats chauds." },
    "boston": { tempJuneMin: 15, tempJuneMax: 27, tempJulyMin: 18, tempJulyMax: 30, rainJune: 93, rainJuly: 84, humidity: 62, altitude: 6, sunHours: 10, highlights: ["Étés agréables", "Brise maritime rafraîchissante", "Soirées douces"], packingTips: ["Vêtements légers + une veste", "Imperméable léger", "Crème solaire", "Chaussures confortables"], bettingImpact: "Conditions tempérées, parmi les plus neutres du tournoi. Aucun avantage climatique notable." },
    "san-francisco-bay-area": { tempJuneMin: 12, tempJuneMax: 21, tempJulyMin: 13, tempJulyMax: 22, rainJune: 3, rainJuly: 0, humidity: 70, altitude: 16, sunHours: 11, highlights: ["Frais pour la Californie !", "Brouillard matinal fréquent", "Très peu de pluie"], packingTips: ["Couches superposables obligatoires", "Veste coupe-vent", "Pas de parapluie nécessaire", "Lunettes de soleil"], bettingImpact: "Les températures fraîches (21-22°C max) sont inhabituelles pour les équipes tropicales. Avantage aux Nord-Européens." },
    "los-angeles": { tempJuneMin: 16, tempJuneMax: 27, tempJulyMin: 18, tempJulyMax: 30, rainJune: 1, rainJuly: 0, humidity: 55, altitude: 71, sunHours: 12, highlights: ["Soleil garanti", "Chaleur sèche et supportable", "Aucune pluie attendue"], packingTips: ["Vêtements légers", "Crème solaire SPF 50+", "Lunettes de soleil", "Casquette ou chapeau"], bettingImpact: "Conditions idéales : chaleur sèche modérée, pas de pluie. Terrain neutre du point de vue météo." },
    "guadalajara": { tempJuneMin: 17, tempJuneMax: 31, tempJulyMin: 17, tempJulyMax: 29, rainJune: 195, rainJuly: 265, humidity: 62, altitude: 1566, sunHours: 8, highlights: ["Saison des pluies en plein tournoi", "Averses intenses l'après-midi", "Altitude modérée (1566m)"], packingTips: ["Imperméable indispensable", "Chaussures imperméables", "Vêtements qui sèchent vite", "Crème solaire malgré les nuages"], bettingImpact: "La pluie et l'altitude modérée peuvent ralentir le jeu. Les terrains mouillés favorisent les passes au sol et le jeu technique." },
    "monterrey": { tempJuneMin: 23, tempJuneMax: 35, tempJulyMin: 24, tempJulyMax: 36, rainJune: 80, rainJuly: 47, humidity: 58, altitude: 540, sunHours: 10, highlights: ["Chaleur intense", "Moins de pluie que le centre du Mexique", "Encerclée par les montagnes"], packingTips: ["Vêtements ultra-légers", "Hydratation constante", "Crème solaire", "Chapeau obligatoire"], bettingImpact: "La chaleur de 35°C+ favorise les under goals et les équipes avec banc profond pour les rotations." },
    "toronto": { tempJuneMin: 14, tempJuneMax: 26, tempJulyMin: 17, tempJulyMax: 28, rainJune: 71, rainJuly: 74, humidity: 60, altitude: 76, sunHours: 10, highlights: ["Étés agréables et doux", "Proximité du lac Ontario (brise)", "Journées longues"], packingTips: ["Vêtements légers + une couche", "Imperméable léger", "Crème solaire", "Chaussures de marche"], bettingImpact: "Conditions tempérées et neutres. Le climat rappelle l'Europe occidentale, avantage aux équipes européennes." },
    "vancouver": { tempJuneMin: 12, tempJuneMax: 21, tempJulyMin: 14, tempJulyMax: 23, rainJune: 54, rainJuly: 36, humidity: 62, altitude: 0, sunHours: 10, highlights: ["Le plus frais du tournoi", "Pluie légère possible", "Cadre montagnard spectaculaire"], packingTips: ["Veste imperméable", "Couches superposables", "Pantalon long pour les soirées", "Parapluie compact"], bettingImpact: "Températures fraîches (21-23°C). Les équipes nordiques (Scandinavie, Angleterre) seront les plus à l'aise." },
  };
  return data[slug] ?? { tempJuneMin: 18, tempJuneMax: 28, tempJulyMin: 20, tempJulyMax: 30, rainJune: 80, rainJuly: 70, humidity: 60, altitude: 100, sunHours: 10, highlights: ["Été chaud", "Quelques averses possibles"], packingTips: ["Vêtements légers", "Crème solaire", "Imperméable"], bettingImpact: "Conditions standard sans impact majeur attendu sur le jeu." };
}

export default async function MeteoPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const weather = getWeatherData(slug);
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Villes", url: "/villes" },
    { name: `Météo ${city.name}`, url: `/meteo/${slug}` },
  ];

  const faqItems = [
    { question: `Quelle température fait-il à ${city.name} en juin-juillet ?`, answer: `En juin : ${weather.tempJuneMin}-${weather.tempJuneMax}°C. En juillet : ${weather.tempJulyMin}-${weather.tempJulyMax}°C. Humidité moyenne : ${weather.humidity}%.` },
    { question: `Pleut-il beaucoup à ${city.name} en été ?`, answer: `Précipitations moyennes : ${weather.rainJune}mm en juin et ${weather.rainJuly}mm en juillet. ${weather.rainJune > 150 ? "Prévoyez un imperméable, les averses sont fréquentes." : "Les pluies restent modérées."}` },
    { question: "La météo influence-t-elle les résultats de foot ?", answer: "Oui ! La chaleur, l'humidité et l'altitude affectent les performances physiques. Les études montrent que les matchs par forte chaleur produisent en moyenne moins de buts." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `Météo à ${city.name} en juin-juillet 2026`,
    description: `Prévisions météo à ${city.name} pour la Coupe du Monde 2026.`,
    url: `https://cdm2026.fr/meteo/${slug}`,
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema items={breadcrumbItems} baseUrl={domains.fr} />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Villes", href: "/villes" }, { label: `Météo ${city.name}` }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <CloudSun className="inline w-8 h-8 mr-2" />
            Météo à {city.name} en juin-juillet 2026
          </h1>
          <p className="text-secondary mt-3 text-lg">{city.country} • Prévisions pour la Coupe du Monde</p>
        </div>
      </section>

      {/* Températures */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Thermometer className="w-6 h-6 text-accent" /> Températures moyennes
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-primary mb-3">🌤️ Juin 2026</h3>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Min</span>
              <span className="text-2xl font-extrabold text-primary">{weather.tempJuneMin}°C</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-secondary">Max</span>
              <span className="text-2xl font-extrabold text-accent">{weather.tempJuneMax}°C</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-secondary">Précipitations</span>
              <span className="font-semibold text-primary">{weather.rainJune} mm</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-primary mb-3">☀️ Juillet 2026</h3>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Min</span>
              <span className="text-2xl font-extrabold text-primary">{weather.tempJulyMin}°C</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-secondary">Max</span>
              <span className="text-2xl font-extrabold text-accent">{weather.tempJulyMax}°C</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-secondary">Précipitations</span>
              <span className="font-semibold text-primary">{weather.rainJuly} mm</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{weather.humidity}%</div>
            <div className="text-sm text-secondary">Humidité moyenne</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Wind className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{weather.altitude}m</div>
            <div className="text-sm text-secondary">Altitude</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <CloudSun className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-primary">{weather.sunHours}h</div>
            <div className="text-sm text-secondary">Ensoleillement / jour</div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">Ce qu&apos;il faut savoir</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ul className="space-y-2">
            {weather.highlights.map((h, i) => (
              <li key={i} className="text-secondary flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Que mettre dans sa valise */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <Luggage className="w-6 h-6 text-accent" /> Que mettre dans sa valise
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid sm:grid-cols-2 gap-2">
            {weather.packingTips.map((tip, i) => (
              <div key={i} className="flex items-center gap-2 text-secondary">
                <span className="text-accent">✓</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact sur les paris */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4">🎲 Impact sur les paris</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-secondary leading-relaxed">
          <p>{weather.bettingImpact}</p>
        </div>
        <p className="text-xs text-gray-400 mt-3">18+ | Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).</p>
      </section>

      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/ville/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/guide-supporter/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide supporter {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/hebergement/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Hébergement {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>

      <FAQSection title={`Questions fréquentes — Météo ${city.name}`} items={faqItems} />
    </>
  );
}
