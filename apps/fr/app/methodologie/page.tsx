import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre méthodologie | Comment nous calculons nos pronostics CDM 2026",
  description:
    "Découvrez notre méthodologie de pronostics pour la Coupe du Monde 2026 : modèle ELO, pipeline IA triple-tier, facteurs d'analyse et transparence sur nos prédictions.",
  openGraph: {
    title: "Notre méthodologie | Pronostics CDM 2026",
    description:
      "Modèle ELO, intelligence artificielle et analyse statistique : comment nous calculons nos pronostics pour la Coupe du Monde 2026.",
  },
};

export default function MethodologiePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Méthodologie", url: "/methodologie" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Méthodologie</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Notre méthodologie</h1>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl">
            Comment nous calculons nos pronostics pour la Coupe du Monde 2026 :
            modèle ELO, intelligence artificielle et analyse multi-facteurs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12 space-y-8">
        {/* ELO Rating System */}
        <section className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            📊 Le modèle ELO
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Le système de classement ELO, initialement conçu pour les échecs par
            Arpad Elo, est adapté au football international pour évaluer la force
            relative de chaque équipe. Chaque nation possède un{" "}
            <strong>rating ELO</strong> qui évolue après chaque match en
            fonction du résultat et de la force de l&apos;adversaire.
          </p>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-5 mb-4">
            <h3 className="font-bold mb-2">Formule simplifiée</h3>
            <div className="font-mono text-sm bg-white dark:bg-gray-800 rounded p-3 border border-gray-200 dark:border-gray-600">
              <p>
                R<sub>new</sub> = R<sub>old</sub> + K × (S - E)
              </p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong>R</strong> = Rating ELO de l&apos;équipe
              </li>
              <li>
                <strong>K</strong> = Facteur K (poids du match : 60 pour la CDM,
                50 pour les qualifications, 30 pour les amicaux)
              </li>
              <li>
                <strong>S</strong> = Score réel (1 = victoire, 0.5 = nul, 0 =
                défaite)
              </li>
              <li>
                <strong>E</strong> = Score attendu (Expected Score)
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-5">
            <h3 className="font-bold mb-2">Score attendu (Expected Score)</h3>
            <div className="font-mono text-sm bg-white dark:bg-gray-800 rounded p-3 border border-gray-200 dark:border-gray-600">
              <p>
                E = 1 / (1 + 10<sup>(R<sub>adversaire</sub> - R<sub>équipe</sub>) / 400</sup>)
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Cette formule calcule la probabilité de victoire en fonction de la
              différence de rating entre les deux équipes. Plus l&apos;écart est
              grand, plus le favori a de chances de l&apos;emporter.
            </p>
          </div>
        </section>

        {/* AI Pipeline */}
        <section className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            🤖 Pipeline IA triple-tier
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Nos pronostics sont enrichis par un pipeline d&apos;intelligence
            artificielle à trois niveaux, chacun spécialisé dans un rôle précis.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Expert */}
            <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg text-white font-bold">
                  1
                </span>
                <div>
                  <p className="font-bold text-purple-900">Expert</p>
                  <p className="text-xs text-purple-600">Claude (Anthropic)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Analyse tactique approfondie, évaluation des forces et
                faiblesses, prédictions de score, identification des value bets
                et insights stratégiques.
              </p>
            </div>

            {/* Factuel */}
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg text-white font-bold">
                  2
                </span>
                <div>
                  <p className="font-bold text-blue-900">Factuel</p>
                  <p className="text-xs text-blue-600">Gemini (Google)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Fact-checking en temps réel, vérification des données, récupération
                des dernières actualités (blessures, suspensions, forme récente,
                météo).
              </p>
            </div>

            {/* Infra */}
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg text-white font-bold">
                  3
                </span>
                <div>
                  <p className="font-bold text-green-900">Infra</p>
                  <p className="text-xs text-green-600">GPT (OpenAI)</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Orchestration des meta-données, structuration du contenu,
                génération SEO et synthèse des résultats des deux autres tiers.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
            <p className="text-sm text-gray-600 text-center">
              <strong>Flux :</strong> Données brutes → Gemini (fact-check) →
              Claude (analyse experte) → GPT (structuration) → Pronostic final
            </p>
          </div>
        </section>

        {/* Factors */}
        <section className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            🔍 Facteurs d&apos;analyse
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Nos pronostics intègrent de multiples facteurs pour maximiser la
            précision des prédictions :
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: "📈",
                title: "Rating ELO",
                desc: "Force relative de chaque équipe basée sur l'historique des résultats",
              },
              {
                icon: "⚔️",
                title: "Confrontations directes (H2H)",
                desc: "Historique des résultats entre les deux équipes",
              },
              {
                icon: "🏔️",
                title: "Altitude",
                desc: "Impact de l'altitude du stade sur la performance (ex: Mexico à 2 240m)",
              },
              {
                icon: "🌦️",
                title: "Météo",
                desc: "Température, humidité et conditions météo le jour du match",
              },
              {
                icon: "✈️",
                title: "Fatigue voyage",
                desc: "Distance parcourue, décalage horaire et temps de récupération",
              },
              {
                icon: "🏥",
                title: "Blessures & suspensions",
                desc: "Joueurs clés absents et impact sur la composition",
              },
              {
                icon: "🔥",
                title: "Forme récente",
                desc: "Résultats des 5 derniers matchs et dynamique de l'équipe",
              },
              {
                icon: "🏟️",
                title: "Avantage domicile",
                desc: "Bonus pour les pays hôtes (USA, Canada, Mexique)",
              },
            ].map((factor) => (
              <div
                key={factor.title}
                className="flex gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <span className="text-2xl shrink-0">{factor.icon}</span>
                <div>
                  <p className="font-semibold dark:text-gray-100">{factor.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{factor.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How predictions work */}
        <section className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            🎯 Comment sont calculées les probabilités
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Pour chaque match, nous combinons le modèle ELO avec les facteurs
              contextuels pour obtenir un rating ajusté. Les probabilités de
              victoire, nul et défaite sont ensuite calculées via la formule
              Expected Score.
            </p>
            <p>
              Pour les pronostics de tournoi (chances de passer les groupes, de
              gagner la CDM), nous effectuons une{" "}
              <strong>simulation Monte-Carlo</strong> de 100 000 tournois
              complets. Chaque match est simulé en utilisant les probabilités
              ajustées, ce qui nous donne des estimations robustes pour chaque
              phase.
            </p>
            <p>
              Les cotes estimées sont dérivées des probabilités selon la formule :
            </p>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
              <div className="font-mono text-sm bg-white dark:bg-gray-800 rounded p-3 border border-gray-200 dark:border-gray-600 text-center">
                Cote = 1 / Probabilité
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Exemple : 40% de chances → cote de 2.50
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="rounded-lg border-2 border-gold/30 bg-gold/5 p-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            ⚠️ Transparence & limites
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <strong>
                Nos pronostics sont des estimations basées sur des modèles
                statistiques. Ils ne garantissent pas les résultats.
              </strong>
            </p>
            <p>
              Le football est un sport imprévisible. Aucun modèle ne peut
              prédire avec certitude l&apos;issue d&apos;un match. Nos analyses
              visent à fournir un éclairage statistique pour aider à la
              compréhension, pas à encourager les paris.
            </p>
            <p>
              Si vous choisissez de parier, faites-le de manière responsable.
              Consultez notre page{" "}
              <Link
                href="/jeu-responsable"
                className="text-accent hover:underline font-medium"
              >
                Jeu responsable
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg bg-primary text-white p-6 text-center">
          <h2 className="text-xl font-bold mb-3">
            Découvrez nos pronostics en action
          </h2>
          <p className="text-gray-300 mb-4">
            Consultez les pronostics détaillés pour chaque match de la Coupe du
            Monde 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/match/calendrier"
              className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent/90"
            >
              Calendrier des matchs
            </Link>
            <Link
              href="/equipes"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Les 48 équipes
            </Link>
            <Link
              href="/guides"
              className="rounded-lg bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Nos guides
            </Link>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Notre méthodologie | Comment nous calculons nos pronostics CDM 2026",
            description:
              "Découvrez notre méthodologie de pronostics pour la Coupe du Monde 2026 : modèle ELO, pipeline IA triple-tier et analyse multi-facteurs.",
            author: {
              "@type": "Organization",
              name: "Équipe CDM 2026",
            },
            publisher: {
              "@type": "Organization",
              name: "CDM 2026",
            },
            url: `${domains.fr}/methodologie`,
          }),
        }}
      />
    </>
  );
}
