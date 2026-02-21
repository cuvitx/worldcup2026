import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
export const metadata: Metadata = {
  title: "À propos de CDM 2026 | Coupe du Monde 2026",
  description:
    "À propos de CDM 2026 : votre guide complet pour la Coupe du Monde 2026. Pronostics, statistiques et analyses pour les 48 équipes.",
  alternates: {
    canonical: "https://www.cdm2026.fr/a-propos",
  },
  openGraph: {
    title: "À propos de CDM 2026",
    description: "Votre guide complet pour la Coupe du Monde 2026.",
  },
};

export default function AProposPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "À propos" },
        ]}
      />
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">À propos</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">À propos de CDM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Votre guide complet pour la première Coupe du Monde à 48 équipes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Notre mission
            </h2>
            <p>
              CDM 2026 est un site indépendant dédié à la Coupe du Monde FIFA
              2026 qui se déroulera du 11 juin au 19 juillet 2026 aux
              États-Unis, au Canada et au Mexique. Notre objectif est de fournir
              les informations les plus complètes et les analyses les plus
              pertinentes sur cet événement historique.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ce que nous proposons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Fiches équipes</h3>
                <p className="mt-1 text-sm">
                  Analyses détaillées des 48 équipes qualifiées, avec effectifs,
                  statistiques et historique en Coupe du Monde.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Pronostics</h3>
                <p className="mt-1 text-sm">
                  Pronostics basés sur les données statistiques et les
                  classements ELO pour chaque match et confrontation.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Comparaison de cotes</h3>
                <p className="mt-1 text-sm">
                  Comparaison des cotes des principaux bookmakers agréés pour
                  vous aider à trouver les meilleures valeurs.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900">Guide pratique</h3>
                <p className="mt-1 text-sm">
                  Guides des 16 villes hôtes et des stades, avec informations
                  pratiques pour les supporters.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Notre équipe d&apos;experts
            </h2>
            <p>
              CDM 2026 est rédigé par une équipe de 3 experts complémentaires :
              un analyste données sportives, une journaliste sportive expérimentée
              et un spécialiste des paris sportifs. Chaque article est relu et
              validé pour garantir la fiabilité de l&apos;information.
            </p>
            <p className="mt-2">
              <Link href="/equipe-editoriale" className="text-primary font-medium hover:underline">
                Découvrir notre équipe éditoriale →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Notre méthodologie
            </h2>
            <p>
              Nos analyses s&apos;appuient sur des données statistiques issues
              de sources officielles reconnues : classements FIFA, données des
              confédérations (UEFA, CONMEBOL, CAF, AFC, CONCACAF), et bases
              statistiques spécialisées. Nos pronostics utilisent un modèle
              algorithmique combinant les classements ELO, les statistiques
              avancées (xG, possession, forme récente) et l&apos;historique des
              confrontations directes.
            </p>
            <p className="mt-2">
              Nous nous efforçons d&apos;être transparents sur notre
              méthodologie et rappelons que tout pronostic comporte une part
              d&apos;incertitude. Nos prédictions ne constituent en aucun cas
              des conseils de paris. Consultez notre{" "}
              <Link href="/methodologie" className="text-primary hover:underline">
                page méthodologie
              </Link>{" "}
              pour plus de détails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Indépendance éditoriale
            </h2>
            <p>
              CDM 2026 est un site indépendant, non affilié à la FIFA ni à aucun
              opérateur de paris sportifs. Nos analyses et pronostics sont
              réalisés en toute indépendance. Les liens d&apos;affiliation
              présents sur le site n&apos;influencent pas notre contenu
              éditorial et sont clairement identifiés conformément à la
              réglementation ANJ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              La Coupe du Monde 2026 en chiffres
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Équipes" },
                { value: "104", label: "Matchs" },
                { value: "16", label: "Villes hôtes" },
                { value: "3", label: "Pays hôtes" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-gray-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Liens utiles</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/equipe-editoriale" className="text-primary hover:underline">
                  Notre équipe éditoriale
                </Link>
              </li>
              <li>
                <Link href="/methodologie" className="text-primary hover:underline">
                  Notre méthodologie
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-primary hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/jeu-responsable" className="text-primary hover:underline">
                  Jeu responsable
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
