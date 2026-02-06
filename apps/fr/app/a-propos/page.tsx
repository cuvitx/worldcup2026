import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A propos",
  description:
    "A propos de CDM 2026 : votre guide complet pour la Coupe du Monde 2026. Pronostics, statistiques et analyses pour les 48 equipes.",
};

export default function AProposPage() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">A propos</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold">A propos de CDM 2026</h1>
          <p className="mt-4 text-lg text-gray-300">
            Votre guide complet pour la premiere Coupe du Monde a 48 equipes.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Notre mission
            </h2>
            <p>
              CDM 2026 est un site independant dedie a la Coupe du Monde FIFA
              2026 qui se deroulera du 11 juin au 19 juillet 2026 aux
              Etats-Unis, au Canada et au Mexique. Notre objectif est de fournir
              les informations les plus completes et les analyses les plus
              pertinentes sur cet evenement historique.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Ce que nous proposons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Fiches equipes</h3>
                <p className="mt-1 text-sm">
                  Analyses detaillees des 48 equipes qualifiees, avec effectifs,
                  statistiques et historique en Coupe du Monde.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Pronostics</h3>
                <p className="mt-1 text-sm">
                  Pronostics bases sur les donnees statistiques et les
                  classements ELO pour chaque match et confrontation.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Comparaison de cotes</h3>
                <p className="mt-1 text-sm">
                  Comparaison des cotes des principaux bookmakers agrees pour
                  vous aider a trouver les meilleures valeurs.
                </p>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900">Guide pratique</h3>
                <p className="mt-1 text-sm">
                  Guides des 16 villes hotes et des stades, avec informations
                  pratiques pour les supporters.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Notre methodologie
            </h2>
            <p>
              Nos analyses s&apos;appuient sur des donnees statistiques issues
              de sources publiques reconnues. Nos pronostics utilisent un modele
              algorithmique combinant les classements ELO, les statistiques
              avancees (xG, possession, forme recente) et l&apos;historique des
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
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Independance editoriale
            </h2>
            <p>
              CDM 2026 est un site independant, non affilie a la FIFA ni a aucun
              operateur de paris sportifs. Nos analyses et pronostics sont
              realises en toute independance. Les liens d&apos;affiliation
              presents sur le site n&apos;influencent pas notre contenu
              editorial.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              La Coupe du Monde 2026 en chiffres
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "48", label: "Equipes" },
                { value: "104", label: "Matchs" },
                { value: "16", label: "Villes hotes" },
                { value: "3", label: "Pays hotes" },
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
            <h2 className="mb-3 text-xl font-bold text-gray-900">Liens utiles</h2>
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
