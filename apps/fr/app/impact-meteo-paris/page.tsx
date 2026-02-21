import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { CloudRain, Thermometer, Mountain, ArrowRight, BarChart3, Target, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Impact de la météo sur les paris CDM 2026 — Chaleur, altitude, pluie",
  description:
    "Analysez l'impact de la météo sur les matchs et paris CDM 2026 : chaleur à Houston/Dallas, altitude à Mexico (2240m), pluie, stats historiques et recommandations over/under.",
  openGraph: {
    title: "Météo & paris CDM 2026 — Analyse des conditions",
    description: "Chaleur, altitude, pluie : comment la météo influence les matchs et les paris sportifs.",
    url: "https://cdm2026.fr/impact-meteo-paris",
  },
  alternates: { canonical: "https://cdm2026.fr/impact-meteo-paris" },
};

const facteurs = [
  {
    icon: Thermometer,
    titre: "Chaleur extrême (Houston, Dallas, Miami)",
    description:
      "En juin-juillet, Houston et Dallas atteignent régulièrement 35-40°C avec une humidité élevée (70-90% à Houston). Ces conditions provoquent une fatigue musculaire accélérée, surtout en 2e mi-temps.",
    stats: [
      "CDM 1994 (USA) : +23% de buts marqués en 2e mi-temps par rapport à la moyenne mondiale",
      "CDM 2014 (Brésil, chaleur tropicale) : 56% des buts en 2e mi-temps",
      "CDM 2022 (Qatar, stades climatisés) : retour à 52% en 2e MT → la clim a normalisé",
      "Les équipes européennes souffrent davantage : -12% de distance parcourue au-dessus de 32°C",
    ],
    recommandation: "Privilégiez les paris Over 2.5 buts et les buts en 2e mi-temps pour les matchs joués à Houston, Dallas et Miami, surtout si une équipe nordique (Danemark, Suède, Écosse) affronte une équipe habituée à la chaleur.",
  },
  {
    icon: Mountain,
    titre: "Altitude à Mexico (2 240 m)",
    description:
      "L'Estadio Azteca est situé à 2 240 mètres d'altitude. L'air raréfié provoque une fatigue plus rapide (baisse d'oxygène de ~20%), des ballons qui voyagent plus vite et plus loin, et des frappes qui dévient davantage.",
    stats: [
      "Les équipes non-acclimatées perdent 8-15% de capacité aérobique en altitude",
      "CDM 1970 (Mexico) : moyenne de 2.97 buts/match (la plus haute depuis 1966)",
      "CDM 1986 (Mexico) : 2.54 buts/match avec des matchs très ouverts en fin de rencontre",
      "Les gardiens sont plus vulnérables : ballons plus rapides, trajectoires imprévisibles",
    ],
    recommandation: "Pour les matchs à Mexico : Over corners, Over buts en 2e mi-temps, et BTTS (les deux équipes marquent). Les frappes de loin sont plus dangereuses. Attention aux équipes d'Amérique du Sud habituées à l'altitude (Colombie, Équateur, Bolivie).",
  },
  {
    icon: CloudRain,
    titre: "Pluie et terrain gras",
    description:
      "Houston et Miami sont en saison des pluies en juin-juillet (averses tropicales courtes mais intenses). Mexico connaît aussi des pluies en fin de journée. Un terrain mouillé ralentit le jeu, favorise les glissades et rend les passes longues aléatoires.",
    stats: [
      "Les matchs sous la pluie affichent en moyenne 15% de fautes en plus",
      "Les buts sur coup de pied arrêté augmentent de ~20% sur terrain gras",
      "La moyenne de buts baisse légèrement sous forte pluie (-0.2 but/match)",
      "Les corners aboutissent plus souvent : gardiens moins à l'aise sur les sorties aériennes",
    ],
    recommandation: "En cas de pluie annoncée : Under 2.5 buts, Over fautes, Over corners. Les paris sur les buts de la tête / coup de pied arrêté prennent de la valeur. Vérifiez la météo 24h avant le match.",
  },
];

const statsHistoriques = [
  { edition: "USA 1994", temp: "28-35°C", buts: "2.71/match", particularite: "Chaleur + grands stades = 2e MT décisive" },
  { edition: "Brésil 2014", temp: "22-35°C", buts: "2.67/match", particularite: "7-1, matchs ouverts en chaleur" },
  { edition: "Russie 2018", temp: "18-28°C", buts: "2.64/match", particularite: "Climat tempéré = matchs équilibrés" },
  { edition: "Qatar 2022", temp: "24-32°C (clim)", buts: "2.56/match", particularite: "Stades climatisés = moins d'impact" },
  { edition: "Mexico 1970", temp: "20-28°C + altitude", buts: "2.97/match", particularite: "Record de buts, altitude facteur clé" },
  { edition: "Mexico 1986", temp: "18-26°C + altitude", buts: "2.54/match", particularite: "Matchs ouverts en fin de rencontre" },
];

const faqItems = [
  {
    question: "La chaleur favorise-t-elle les Over ou les Under ?",
    answer:
      "Statistiquement, la chaleur extrême favorise les Over buts en 2e mi-temps. Les joueurs fatiguent, les défenses se relâchent et les espaces s'ouvrent. Sur l'ensemble du match, l'impact est moins clair car la 1re mi-temps peut être verrouillée (économie d'énergie).",
  },
  {
    question: "L'altitude de Mexico impacte-t-elle vraiment les matchs ?",
    answer:
      "Oui, significativement. À 2 240m, l'oxygène disponible baisse de ~20%. Les équipes non-acclimatées souffrent dès la 60e minute. Les ballons voyagent plus vite et les tirs de loin sont plus dangereux. Les CDM 1970 et 1986 à Mexico ont produit parmi les moyennes de buts les plus élevées.",
  },
  {
    question: "Où trouver les prévisions météo fiables pour les matchs ?",
    answer:
      "Weather.com, AccuWeather et Windy.com offrent des prévisions à 10-14 jours. Pour les matchs en soirée, vérifiez les prévisions horaires. Les orages tropicaux à Houston/Miami arrivent souvent entre 15h et 18h locales.",
  },
  {
    question: "Les stades américains sont-ils couverts ?",
    answer:
      "Certains oui : NRG Stadium (Houston) et AT&T Stadium (Dallas) sont rétractables/couverts, ce qui annule l'effet pluie mais pas la chaleur (la clim modère mais ne supprime pas). SoFi Stadium (LA) est semi-ouvert. Les autres stades sont à ciel ouvert.",
  },
];

export default function ImpactMeteoParisPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Impact météo sur les paris" }];
  
  return (
    <>
<Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Impact de la météo sur les paris CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Chaleur, altitude, pluie : analysez comment les conditions climatiques influencent
            les matchs et affinez vos pronostics.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Facteurs */}
        {facteurs.map((f) => (
          <section key={f.titre}>
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
              <f.icon className="h-7 w-7 text-accent" /> {f.titre}
            </h2>
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{f.description}</p>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" /> Stats historiques
                </h3>
                <ul className="space-y-1">
                  {f.stats.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-accent">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-accent mb-1 flex items-center gap-2">
                  <Target className="h-5 w-5" /> Recommandation paris
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{f.recommandation}</p>
              </div>
            </div>
          </section>
        ))}

        {/* Tableau historique */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-accent" /> Stats historiques par édition
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Édition</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Température</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Buts/match</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Particularité</th>
                </tr>
              </thead>
              <tbody>
                {statsHistoriques.map((s) => (
                  <tr key={s.edition} className="border-b border-gray-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{s.edition}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{s.temp}</td>
                    <td className="py-3 px-4 text-accent font-semibold">{s.buts}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{s.particularite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Comparateur de cotes <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/paris-combines"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Guide paris combinés
          </Link>
        </div>

        {/* ANJ */}
        <p className="text-xs text-gray-400 text-center">
          <AlertTriangle className="inline h-3 w-3 mr-1" />
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur{" "}
          <a href="https://www.joueurs-info-service.fr" target="_blank" rel="noopener noreferrer" className="underline">
            joueurs-info-service.fr
          </a>{" "}
          (ANJ).
        </p>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
