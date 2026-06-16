import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Star, Smartphone, Zap, Gift, Shield, ExternalLink, Trophy, TrendingUp } from "lucide-react";
import { PmuCTA } from "../components/PmuCTA";

export const metadata: Metadata = {
  title: "Meilleurs Bookmakers CDM 2026 | PMU Sport — Paris Sportifs",
  description:
    "PMU Sport : le meilleur site de paris sportifs agréé ANJ pour la Coupe du Monde 2026. Bonus, cotes, application mobile et avis détaillé.",
  openGraph: {
    title: "Meilleurs Bookmakers CDM 2026 | PMU Sport",
    description:
      "PMU Sport : bonus, cotes, app mobile et live betting pour la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/meilleurs-bookmakers",
  },
  alternates: { canonical: "https://www.cdm2026.fr/meilleurs-bookmakers" },
};

interface Bookmaker {
  name: string;
  slug: string;
  bonus: string;
  bonusDetail: string;
  cotesMoyennes: string;
  appMobile: string;
  liveBetting: string;
  note: number;
  url: string;
  avantages: string[];
}

const bookmakers: Bookmaker[] = [
  {
    name: "PMU Sport",
    slug: "pmu-sport",
    bonus: "100€ offerts",
    bonusDetail: "en freebets sans condition",
    cotesMoyennes: "Bonnes (91-93%)",
    appMobile: "iOS & Android, complète",
    liveBetting: "Cash-out partiel disponible",
    note: 8.7,
    url: pmuTrackingUrl("comparateur"),
    avantages: ["Marque de confiance", "Cash-out partiel", "Statistiques intégrées", "Points de vente physiques"],
  },
];

function ReviewSchema({ bk }: { bk: Bookmaker }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: bk.name,
      url: bk.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: bk.note,
      bestRating: 10,
      worstRating: 0,
    },
    author: {
      "@type": "Organization",
      name: "CDM 2026",
      url: "https://www.cdm2026.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "CDM 2026",
      url: "https://www.cdm2026.fr",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function StarRating({ note }: { note: number }) {
  const full = Math.floor(note / 2);
  const half = note % 2 >= 1;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-secondary text-accent" />
      ))}
      {half && <Star className="w-4 h-4 fill-secondary/50 text-accent" />}
      <span className="ml-1 text-sm font-bold text-gray-900 ">{note}/10</span>
    </div>
  );
}

const faqItems = [
  {
    question: "Quel est le meilleur bookmaker pour la CDM 2026 ?",
    answer:
      "PMU Sport est notre choix recommandé pour la Coupe du Monde 2026 : marque de confiance agréée ANJ, application mobile complète, cash-out partiel disponible et statistiques intégrées. Un opérateur fiable pour suivre tous les matchs de la CDM 2026.",
  },
  {
    question: "PMU Sport est-il légal en France ?",
    answer:
      "Oui, PMU Sport est agréé par l'ANJ (Autorité Nationale des Jeux) et est parfaitement légal en France. C'est l'un des opérateurs historiques du marché français des paris sportifs.",
  },
  {
    question: "Quel bonus propose PMU Sport pour la CDM 2026 ?",
    answer:
      "PMU Sport propose 100€ de freebets sur votre premier pari perdant. Aucun code promo n'est nécessaire. Le bonus est automatiquement activé lors de votre inscription.",
  },
  {
    question: "Comment comparer les cotes entre bookmakers ?",
    answer:
      "Utilisez notre comparateur de cotes pour voir en un coup d'oeil quel bookmaker offre la meilleure cote sur chaque match de la CDM 2026. Les écarts peuvent atteindre 5 à 10% sur certains marchés.",
  },
  {
    question: "Faut-il vérifier son identité pour parier ?",
    answer:
      "Oui, la vérification d'identité (KYC) est obligatoire sur tous les sites agréés ANJ. Vous devez fournir une pièce d'identité et un justificatif de domicile. La procédure prend généralement 24 à 48h.",
  },
];

export default function MeilleursBookmakersPage() {
  return (
    <>
      {bookmakers.map((bk) => (
        <ReviewSchema key={bk.slug} bk={bk} />
      ))}


      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">
            Meilleurs Bookmakers CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            PMU Sport, le bookmaker agréé ANJ recommandé pour parier sur la Coupe du Monde 2026. Bonus, cotes, application mobile et avis détaillé.
          </p>
        </div>
      </section>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Introduction */}
        <section className="prose  max-w-none mb-12">
          <p className="text-lg text-gray-700  leading-relaxed">
            La Coupe du Monde 2026 s&apos;annonce comme l&apos;événement sportif le plus parié de l&apos;histoire avec ses 104 matchs répartis entre les États-Unis, le Canada et le Mexique. Pour en profiter pleinement, choisir le bon bookmaker est essentiel. PMU Sport est notre bookmaker recommandé : opérateur historique agréé ANJ, application mobile complète, cash-out et statistiques intégrées.
          </p>
        </section>

        {/* Tableau comparatif */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-accent" />
            Tableau comparatif des bookmakers
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 ">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Bookmaker</th>
                  <th className="px-4 py-3 text-center font-semibold">Bonus bienvenue</th>
                  <th className="px-4 py-3 text-center font-semibold">Cotes moyennes</th>
                  <th className="px-4 py-3 text-center font-semibold">App mobile</th>
                  <th className="px-4 py-3 text-center font-semibold">Live betting</th>
                  <th className="px-4 py-3 text-center font-semibold">Note /10</th>
                  <th className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  bg-white ">
                {bookmakers.map((bk, i) => (
                  <tr key={bk.slug} className={i === 0 ? "bg-accent/5" : ""}>
                    <td className="px-4 py-4 font-bold text-gray-900 ">
                      <div className="flex items-center gap-2">
                        {i === 0 && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">N°1</span>}
                        {bk.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-bold text-accent">{bk.bonus}</span>
                      <br />
                      <span className="text-xs text-gray-500">{bk.bonusDetail}</span>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-700 ">{bk.cotesMoyennes}</td>
                    <td className="px-4 py-4 text-center text-gray-700 ">
                      <div className="flex items-center justify-center gap-1">
                        <Smartphone className="w-4 h-4 text-primary" />
                        <span className="text-xs">{bk.appMobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-700 ">
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-xs">{bk.liveBetting}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StarRating note={bk.note} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <a
                        href={bk.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored nofollow"
                        className="inline-flex items-center gap-1 bg-accent text-white rounded-xl py-3.5 px-5 font-bold text-sm hover:bg-accent/90 transition-colors"
                      >
                        100€ offerts <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PMU CTA */}
        <section className="py-6 sm:py-8">
          <PmuCTA tracking="bookmakers" />
        </section>

        {/* Détails par bookmaker */}
        <section className="space-y-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900  flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            Avis détaillé par bookmaker
          </h2>
          {bookmakers.map((bk, i) => (
            <div
              key={bk.slug}
              className="rounded-2xl border border-gray-200  bg-white  p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900  flex items-center gap-2">
                    {i + 1}. {bk.name}
                    {i === 0 && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold">
                        Choix de la rédaction
                      </span>
                    )}
                  </h3>
                  <StarRating note={bk.note} />
                </div>
                <a
                  href={bk.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-accent/90 transition-colors self-start"
                >
                  <Gift className="w-4 h-4" />
                  {bk.bonus} — Rejoindre PMU Sport
                </a>
              </div>
              <p className="text-gray-600  mb-4">
                {bk.name} propose un bonus de bienvenue de <strong>{bk.bonus}</strong> ({bk.bonusDetail}) pour les nouveaux inscrits. Les cotes sont {bk.cotesMoyennes.toLowerCase()} avec un excellent service de {bk.liveBetting.toLowerCase()}. L&apos;application mobile est disponible sur {bk.appMobile.toLowerCase()}.
              </p>
              <div className="flex flex-wrap gap-2">
                {bk.avantages.map((av) => (
                  <span
                    key={av}
                    className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary   px-3 py-1.5 rounded-full font-medium"
                  >
                    <Shield className="w-3 h-3" />
                    {av}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href={`/bonus/${bk.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Voir le détail du bonus {bk.name} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Comment choisir */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Comment choisir son bookmaker pour la CDM 2026 ?</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700 ">
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Les cotes</h3>
              <p>Les cotes déterminent vos gains potentiels. Un bookmaker avec des cotes supérieures de 2-3% vous rapportera significativement plus sur le long terme. PMU Sport propose des cotes compétitives sur les marchés principaux de la CDM 2026.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Le bonus de bienvenue</h3>
              <p>Le bonus de bienvenue est un avantage ponctuel mais non négligeable. Privilégiez les offres en freebets sans conditions de mise complexes. Inscrivez-vous sur plusieurs sites pour cumuler les bonus.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">L&apos;application mobile</h3>
              <p>Pendant la CDM 2026, vous voudrez parier en mobilité. Testez l&apos;application avant de vous engager : fluidité, rapidité, facilité de navigation et notifications en temps réel sont essentielles.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900  mb-2">Le live betting</h3>
              <p>Les paris en direct représentent une part croissante des mises. Vérifiez la qualité du streaming, la variété des marchés live et la disponibilité du cash-out pour sécuriser vos gains en cours de match.</p>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-2xl bg-white  border border-gray-200  p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900  mb-4">Pages associées</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/bonus" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Tous les bonus CDM 2026
            </Link>
            <Link href="/paris-sportifs/guide" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Guide des paris
            </Link>
            <Link href="/methodes-paiement" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Méthodes de paiement
            </Link>
            <Link href="/comparateur-cotes" className="rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Comparateur de cotes
            </Link>
          </div>
        </section>
      </div>

      <FAQSection title="Questions sur les bookmakers CDM 2026" items={faqItems} />
    </>
  );
}
