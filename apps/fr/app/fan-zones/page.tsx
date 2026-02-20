import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { PartyPopper, MapPin, Monitor, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Fan Zones CDM 2026 - Fan Fests par ville hôte | CDM 2026",
  description:
    "Fan zones et FIFA Fan Fests de la Coupe du Monde 2026 : emplacements par ville, écrans géants, capacité, activités et programme.",
  openGraph: {
    title: "Fan Zones CDM 2026 - Guide complet",
    description: "Toutes les fan zones et fan fests de la Coupe du Monde 2026 par ville hôte.",
    url: "https://cdm2026.fr/fan-zones",
  },
  alternates: { canonical: "https://cdm2026.fr/fan-zones" },
};

const fanZones = [
  {
    ville: "New York",
    drapeau: "🇺🇸",
    lieu: "Central Park / Times Square (pressentis)",
    capacite: "50 000+",
    activites: "Écrans géants, concerts, village gastronomique, activités interactives FIFA",
  },
  {
    ville: "Los Angeles",
    drapeau: "🇺🇸",
    lieu: "LA Live / Venice Beach (pressentis)",
    capacite: "40 000+",
    activites: "Diffusion en plein air, DJ sets, stands food trucks, mini-terrains",
  },
  {
    ville: "Miami",
    drapeau: "🇺🇸",
    lieu: "Bayfront Park (pressenti)",
    capacite: "30 000+",
    activites: "Écrans géants vue baie, musique latine, gastronomie locale",
  },
  {
    ville: "Dallas",
    drapeau: "🇺🇸",
    lieu: "AT&T Discovery District / Klyde Warren Park",
    capacite: "25 000+",
    activites: "Diffusion extérieure, BBQ texan, activités famille",
  },
  {
    ville: "Mexico",
    drapeau: "🇲🇽",
    lieu: "Zócalo / Reforma (pressentis)",
    capacite: "100 000+",
    activites: "La plus grande fan zone du tournoi, concerts, gastronomie mexicaine",
  },
  {
    ville: "Toronto",
    drapeau: "🇨🇦",
    lieu: "Maple Leaf Square / Nathan Phillips Square",
    capacite: "20 000+",
    activites: "Écrans géants, bières artisanales, ambiance multiculturelle",
  },
];

const faqItems = [
  {
    question: "Les fan zones CDM 2026 sont-elles gratuites ?",
    answer: "Oui, les FIFA Fan Fests sont traditionnellement en accès libre et gratuit. Certaines zones peuvent nécessiter une inscription préalable pour gérer la capacité, mais aucun billet payant n'est requis.",
  },
  {
    question: "Où trouver la liste officielle des fan zones ?",
    answer: "La FIFA publiera la liste officielle des Fan Fests et fan zones partenaires au printemps 2026. Nous mettrons à jour cette page dès l'annonce officielle.",
  },
  {
    question: "Peut-on regarder tous les matchs en fan zone ?",
    answer: "Oui, les FIFA Fan Fests diffusent l'intégralité des 104 matchs du tournoi sur écrans géants. Les fan zones municipales partenaires diffusent généralement les matchs principaux et ceux impliquant le pays hôte.",
  },
];

export default function FanZonesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Fan zones", url: "/fan-zones" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Fan zones CDM 2026" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <PartyPopper className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Guide pratique
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Fan Zones</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            FIFA Fan Fests, écrans géants et ambiance : vivez la Coupe du Monde
            même sans billet de match.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-5 flex gap-3">
          <Monitor className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Les emplacements ci-dessous sont basés sur les annonces préliminaires et les éditions précédentes.
            La liste officielle sera mise à jour dès confirmation par la FIFA.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Fan zones par ville hôte
          </h2>
          <div className="space-y-4">
            {fanZones.map((fz) => (
              <div
                key={fz.ville}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {fz.drapeau} {fz.ville}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{fz.capacite}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Lieu :</strong> {fz.lieu}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {fz.activites}
                </p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
