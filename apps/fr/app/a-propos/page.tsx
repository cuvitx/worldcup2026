import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de CDM 2026 | Coupe du Monde 2026",
  description:
    "À propos de CDM 2026 : votre guide complet pour la Coupe du Monde 2026. Pronostics, statistiques et analyses pour les 48 équipes.",
  alternates: {
    canonical: "https://cdm2026.fr/a-propos",
  },
  openGraph: {
    title: "À propos de CDM 2026",
    description: "Votre guide complet pour la Coupe du Monde 2026.",
  },
};

export default function AProposPage() {
  return (
    <>
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">À propos</li>
          </ol>
        </div>
      </nav>

      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">À propos de CDM 2026</h1>
          <p className="mt-4 text-lg text-gray-300">
            Votre guide complet pour la première Coupe du Monde à 48 équipes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Ce que nous proposons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fiches équipes</h3>
                <p className="mt-1 text-sm">
                  Analyses détaillées des 48 équipes qualifiées, avec effectifs,
                  statistiques et historique en Coupe du Monde.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pronostics</h3>
                <p className="mt-1 text-sm">
                  Pronostics basés sur les données statistiques et les
                  classements ELO pour chaque match et confrontation.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comparaison de cotes</h3>
                <p className="mt-1 text-sm">
                  Comparaison des cotes des principaux bookmakers agréés pour
                  vous aider à trouver les meilleures valeurs.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Guide pratique</h3>
                <p className="mt-1 text-sm">
                  Guides des 16 villes hôtes et des stades, avec informations
                  pratiques pour les supporters.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Notre méthodologie
            </h2>
            <p>
              Nos analyses s&apos;appuient sur des données statistiques issues
              de sources publiques reconnues. Nos pronostics utilisent un modele
              algorithmique combinant les classements ELO, les statistiques
              avancées (xG, possession, forme récente) et l&apos;historique des
              confrontations directes.
            </p>
            <p className="mt-2">
              Nous nous efforçons d&apos;être transparents sur notre
              méthodologie et rappelons que tout pronostic comporte une part
              d&apos;incertitude. Nos prédictions ne constituent en aucun cas
              des conseils de paris.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Indépendance éditoriale
            </h2>
            <p>
              CDM 2026 est un site indépendant, non affilié à la FIFA ni à aucun
              opérateur de paris sportifs. Nos analyses et pronostics sont
              réalisés en toute indépendance. Les liens d&apos;affiliation
              presents sur le site n&apos;influencent pas notre contenu
              éditorial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
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
                  className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center"
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Liens utiles</h2>
            <ul className="space-y-2">
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
