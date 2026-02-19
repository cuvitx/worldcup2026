import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de CDM 2026 | Coupe du Monde 2026",
  description:
    "À propos de CDM 2026 : votre guide complet pour la Coupe du Monde 2026. Pronostics, statistiques et analyses pour les 48 équipes.",
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
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">A propos</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">A propos de CDM 2026</h1>
          <p className="mt-4 text-lg text-gray-300">
            Votre guide complet pour la première Coupe du Monde à 48 équipes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Notre mission
            </h2>
            <p>
              CDM 2026 est un site indépendant dédiéà la Coupe du Monde FIFA
              2026 qui se déroulera du 11 juin au 19 juillet 2026 aux
              États-Unis, au Canada et au Mexique. Notre objectif est de fournir
              les informations les plus completes et les analyses les plus
              pertinentes sur cet événement historique.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Ce que nous proposons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Fiches équipes</h3>
                <p className="mt-1 text-sm">
                  Analyses détaillées des 48 équipes qualifiées, avec effectifs,
                  statistiques et historique en Coupe du Monde.
                </p>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Pronostics</h3>
                <p className="mt-1 text-sm">
                  Pronostics bases sur les donnees statistiques et les
                  classements ELO pour chaque match et confrontation.
                </p>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Comparaison de cotes</h3>
                <p className="mt-1 text-sm">
                  Comparaison des cotes des principaux bookmakers agréés pour
                  vous aider a trouver les meilleures valeurs.
                </p>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Guide pratique</h3>
                <p className="mt-1 text-sm">
                  Guides des 16 villes hôtes et des stades, avec informations
                  pratiques pour les supporters.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Notre methodologie
            </h2>
            <p>
              Nos analyses s&apos;appuient sur des donnees statistiques issues
              de sources publiques reconnues. Nos pronostics utilisent un modele
              algorithmique combinant les classements ELO, les statistiques
              avancées (xG, possession, forme récente) et l&apos;historique des
              confrontations directes.
            </p>
            <p className="mt-2">
              Nous nous efforcons d&apos;etre transparents sur notre
              methodologie et rappelons que tout pronostic comporte une part
              d&apos;incertitude. Nos predictions ne constituent en aucun cas
              des conseils de paris.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Independance editoriale
            </h2>
            <p>
              CDM 2026 est un site indépendant, non affiliéà la FIFA ni à aucun
              opérateur de paris sportifs. Nos analyses et pronostics sont
              realises en toute independance. Les liens d&apos;affiliation
              presents sur le site n&apos;influencent pas notre contenu
              editorial.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              La Coupe du Monde 2026 en chiffres
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Équipes" },
                { value: "104", label: "Matchs" },
                { value: "16", label: "Villes hotes" },
                { value: "3", label: "Pays hotes" },
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
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Liens utiles</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-accent hover:underline">
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link href="/jeu-responsable" className="text-accent hover:underline">
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
