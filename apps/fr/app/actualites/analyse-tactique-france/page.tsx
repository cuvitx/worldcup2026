import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Analyse tactique France CDM 2026 — Système de jeu, forces et faiblesses",
  description:
    "Décryptage complet du système tactique de l'équipe de France pour la Coupe du Monde 2026. Forces, faiblesses, joueurs clés et schémas de jeu de Deschamps.",
  alternates: {
    canonical: "https://cdm2026.fr/actualites/analyse-tactique-france",
  },
  openGraph: {
    title: "Analyse tactique de la France — CDM 2026",
    description: "Système de jeu, forces, faiblesses et joueurs clés des Bleus pour le Mondial 2026.",
    type: "article",
    publishedTime: "2026-02-19",
  },
};

export default function AnalyseTactiqueFrance() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Analyse tactique de l'équipe de France — CDM 2026",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/analyse-tactique-france",
    image: "https://cdm2026.fr/og-default.jpg",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Actualités","url":"/actualites"},{"name":"Analyse tactique France","url":"/actualites/analyse-tactique-france"}]} baseUrl={domains.fr} />
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-300">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/actualites" className="text-primary dark:text-secondary hover:underline">Actualités</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Analyse tactique France</li>
          </ol>
        </nav>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-white">
              Analyse tactique
            </span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">
              19 février 2026
            </time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            🇫🇷 Analyse tactique de la France — Système de jeu, forces et faiblesses
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose">
            Finaliste en 2022, championne en 2018 : l&apos;équipe de France arrive à la CDM 2026 avec l&apos;ambition de décrocher une troisième étoile. Décryptage complet du projet tactique de Didier Deschamps.
          </p>

          <h2>Le système de jeu privilégié</h2>
          <p>
            Didier Deschamps a longtemps oscillé entre le 4-2-3-1 et le 4-3-3, mais c&apos;est bien un <strong>4-3-3 hybride</strong> qui s&apos;est imposé comme la base tactique des Bleus depuis la fin 2024. Ce dispositif permet d&apos;exploiter au maximum la vitesse de Kylian Mbappé tout en conservant une assise défensive solide.
          </p>
          <p>
            En phase de possession, le système se transforme souvent en 3-2-4-1, avec un latéral gauche (Theo Hernandez) qui monte très haut et un milieu relayeur qui décroche entre les centraux. Cette flexibilité tactique est devenue la marque de fabrique de cette équipe.
          </p>

          <h2>Les forces des Bleus</h2>

          <h3>Une attaque de classe mondiale</h3>
          <p>
            Avec Kylian Mbappé, Antoine Griezmann et Ousmane Dembélé (ou Randal Kolo Muani), la France possède l&apos;une des lignes offensives les plus redoutables du tournoi. Mbappé, désormais au Real Madrid, a encore franchi un palier en termes de maturité tactique. Son jeu de décrochage et sa capacité à accélérer dans les espaces en font le joueur le plus dangereux du Mondial.
          </p>
          <p>
            Griezmann, à 35 ans, reste un rouage essentiel. Son intelligence de placement, sa capacité à lier le jeu entre les lignes et son expérience des grands rendez-vous sont irremplaçables. Il sera crucial dans les matchs couperets.
          </p>

          <h3>Un milieu de terrain complet</h3>
          <p>
            Aurélien Tchouaméni s&apos;est imposé comme le patron du milieu de terrain. Sa capacité à couvrir le terrain, à récupérer des ballons et à relancer proprement fait de lui l&apos;un des meilleurs milieux défensifs du monde. À ses côtés, Eduardo Camavinga apporte sa puissance et sa verticalité, tandis qu&apos;un joueur comme Warren Zare-Emery peut apporter de la créativité.
          </p>

          <h3>L&apos;expérience des grands tournois</h3>
          <p>
            Finale en 2022, victoire en 2018, finale de l&apos;Euro 2016 : ce groupe sait ce que signifie jouer un grand tournoi. Cette expérience collective est un atout majeur, surtout dans les moments de tension. Deschamps lui-même est un tacticien de tournoi redoutable, capable d&apos;adapter son approche match après match.
          </p>

          <h2>Les faiblesses à surveiller</h2>

          <h3>La charnière centrale en question</h3>
          <p>
            La retraite internationale de Raphaël Varane et les pépins physiques récurrents de Dayot Upamecano posent un vrai problème. La charnière Saliba-Konaté est prometteuse mais manque encore d&apos;automatismes au plus haut niveau international. Sur un contre bien mené, cette défense peut être prise de vitesse.
          </p>

          <h3>La dépendance à Mbappé</h3>
          <p>
            Si Mbappé est stoppé, qui prend le relais ? C&apos;est la grande question. L&apos;équipe de France a parfois montré une dépendance excessive envers son capitaine. En cas de blessure ou de méforme, le plan B offensif reste flou. Deschamps devra trouver des solutions alternatives crédibles.
          </p>

          <h3>Les transitions défensives</h3>
          <p>
            Quand la France monte le bloc et perd le ballon haut, les espaces laissés dans le dos de la défense peuvent être exploités par des équipes rapides en transition. C&apos;est dans ces moments que les Bleus sont les plus vulnérables, comme l&apos;a montré la demi-finale de l&apos;Euro 2024 face à l&apos;Espagne.
          </p>

          <h2>Les joueurs clés</h2>

          <h3>Kylian Mbappé — Le leader technique</h3>
          <p>
            À 27 ans, Mbappé est dans la plénitude de son art. Capitaine des Bleus, meilleur buteur de l&apos;histoire de la sélection en vue, il porte sur ses épaules les espoirs de tout un pays. Sa première saison au Real Madrid lui a apporté une dimension supplémentaire : la gestion du tempo et le jeu sans ballon.
          </p>

          <h3>Aurélien Tchouaméni — Le métronome</h3>
          <p>
            Le milieu du Real Madrid est devenu indispensable. Son volume de jeu, sa qualité de relance longue et sa lecture du jeu font de lui le joueur le plus important de l&apos;équilibre de cette équipe. Si Tchouaméni performe, la France performe.
          </p>

          <h3>William Saliba — Le mur</h3>
          <p>
            Le défenseur d&apos;Arsenal a explosé au plus haut niveau. Sa sérénité balle au pied, sa vitesse de récupération et son sens du placement en font le défenseur central numéro un de cette sélection. Son association avec un partenaire fiable sera déterminante.
          </p>

          <h2>Le parcours probable</h2>
          <p>
            La France est tête de série du pot 1 et devrait hériter d&apos;un groupe abordable. L&apos;objectif minimal est les quarts de finale, mais l&apos;ambition affichée est claire : la victoire finale. Avec le format à 48 équipes et des matchs à élimination directe dès les huitièmes de finale, la marge d&apos;erreur est réduite.
          </p>
          <p>
            Les matchs de poule joués sur le sol américain offriront un avantage logistique, avec une importante diaspora française présente dans les stades. Si Deschamps parvient à maintenir la cohésion du groupe et à gérer la pression médiatique, cette équipe de France a tous les atouts pour aller au bout.
          </p>

          <h2>Verdict</h2>
          <p>
            <strong>Note tactique : 8.5/10.</strong> L&apos;équipe de France est l&apos;une des favorites logiques de cette Coupe du Monde 2026. Son effectif est l&apos;un des plus complets au monde, son sélectionneur connaît les tournois comme personne, et son leader (Mbappé) est dans la force de l&apos;ge. Les doutes se concentrent sur la défense centrale et la capacité à surprendre tactiquement des adversaires qui connaissent désormais parfaitement le jeu des Bleus.
          </p>
        </article>

        {/* Related */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyses tactiques liées</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/actualites/analyse-tactique-argentine" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇦🇷 Analyse tactique Argentine</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Messi dernière CDM ? Système Scaloni décrypté</p>
            </Link>
            <Link href="/actualites/analyse-tactique-espagne" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇪🇸 Analyse tactique Espagne</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Tiki-taka 2.0 et la jeune garde espagnole</p>
            </Link>
            <Link href="/actualites/analyse-tactique-angleterre" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Analyse tactique Angleterre</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Potentiel immense vs déception historique</p>
            </Link>
            <Link href="/actualites/analyse-tactique-bresil" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇧🇷 Analyse tactique Brésil</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Le Brésil de retour au sommet ?</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
