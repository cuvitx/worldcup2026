import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analyse tactique Espagne CDM 2026 — Tiki-taka 2.0 et jeune garde",
  description:
    "Décryptage du système tactique de l'Espagne pour la Coupe du Monde 2026. Pedri, Yamal, Gavi : la Roja nouvelle génération de Luis de la Fuente.",
  openGraph: {
    title: "Analyse tactique Espagne — CDM 2026",
    description: "Tiki-taka 2.0 : comment la jeune garde espagnole veut conquérir le monde.",
    type: "article",
    publishedTime: "2026-02-19",
  },
};

export default function AnalyseTactiqueEspagne() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Analyse tactique de l'Espagne — CDM 2026",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/analyse-tactique-espagne",
    image: "https://cdm2026.fr/og-default.jpg",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-300">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/actualites" className="text-primary dark:text-secondary hover:underline">Actualités</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Analyse tactique Espagne</li>
          </ol>
        </nav>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-secondary">Analyse tactique</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            🇪🇸 Analyse tactique de l&apos;Espagne — Tiki-taka 2.0 et la jeune garde
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose">
            Championne d&apos;Europe 2024, l&apos;Espagne de Luis de la Fuente incarne le renouveau du football espagnol. Avec une génération dorée menée par Pedri, Lamine Yamal et Gavi, la Roja ambitionne de redevenir championne du monde.
          </p>

          <h2>Le renouveau tactique sous De la Fuente</h2>
          <p>
            Fini le tiki-taka stérile des années 2010. Luis de la Fuente a insufflé une <strong>verticalité nouvelle</strong> au jeu espagnol. Le <strong>4-3-3</strong> reste le système de base, mais avec une différence fondamentale : la possession n&apos;est plus une fin en soi, elle est au service de la profondeur. L&apos;Espagne joue désormais vers l&apos;avant avec une intention claire de marquer rapidement.
          </p>
          <p>
            Les ailiers ont un rôle central dans ce dispositif. Lamine Yamal à droite et Nico Williams à gauche apportent une vitesse et un un-contre-un que l&apos;Espagne n&apos;avait plus depuis des années. Ce duo explosif transforme chaque transition en danger immédiat.
          </p>

          <h2>Les forces de la Roja</h2>

          <h3>La jeunesse et l&apos;insouciance</h3>
          <p>
            L&apos;âge moyen de cette Espagne est l&apos;un des plus bas du tournoi. Yamal aura 18 ans, Gavi 21 ans, Pedri 23 ans. Cette jeunesse apporte une énergie débordante, une absence de complexes et une faim de victoires. L&apos;Euro 2024 a montré que ces joueurs n&apos;ont peur de personne.
          </p>

          <h3>La maîtrise technique collective</h3>
          <p>
            Du gardien au centre-avant, chaque joueur espagnol est à l&apos;aise avec le ballon. Cette qualité technique permet à la Roja de résister au pressing adverse, de sortir proprement de derrière et de construire des phases de jeu élaborées. Rodri, au cœur du dispositif, est le meilleur milieu de terrain du monde dans cet exercice.
          </p>

          <h3>La polyvalence du 4-3-3</h3>
          <p>
            De la Fuente peut transformer son 4-3-3 en 4-2-3-1 ou même en 3-4-3 en cours de match. Pedri peut jouer relayeur ou meneur, Dani Olmo peut évoluer en faux 9 ou en 10, Yamal peut permuter avec Williams. Cette flexibilité rend l&apos;Espagne imprévisible et difficile à préparer tactiquement.
          </p>

          <h2>Les faiblesses à corriger</h2>

          <h3>Le poste de numéro 9</h3>
          <p>
            C&apos;est le talon d&apos;Achille historique de cette Espagne. Álvaro Morata reste le titulaire par défaut, mais son manque de régularité devant le but est un problème récurrent. La solution du faux 9 (Olmo ou Pedri) fonctionne contre des équipes ouvertes mais peut s&apos;avérer limitée face à des blocs bas bien organisés.
          </p>

          <h3>La défense face aux équipes physiques</h3>
          <p>
            La finesse technique de l&apos;Espagne peut devenir un handicap face à des équipes très physiques qui imposent un jeu de duels et de deuxièmes ballons. Les centraux (Le Normand, Laporte) ne sont pas les plus athlétiques, et les latéraux offensifs (Cucurella, Carvajal) peuvent souffrir face à des ailiers puissants.
          </p>

          <h3>La gestion des temps forts adverses</h3>
          <p>
            Quand l&apos;adversaire met une intensité physique supérieure pendant 15-20 minutes, l&apos;Espagne peut perdre le contrôle du match. On l&apos;a vu lors de certaines périodes de l&apos;Euro 2024 où la Roja a subi avant de reprendre le dessus. Sur un Mondial, ces moments de flottement peuvent être fatals.
          </p>

          <h2>Les joueurs clés</h2>

          <h3>Pedri — Le cerveau</h3>
          <p>
            Le milieu du Barça est le joueur le plus important de cette Espagne. Sa capacité à dicter le tempo, à trouver les espaces entre les lignes et à résister au pressing fait de lui le successeur naturel de Xavi et Iniesta. Si Pedri est en forme, l&apos;Espagne peut battre n&apos;importe qui.
          </p>

          <h3>Lamine Yamal — Le prodige</h3>
          <p>
            À seulement 18 ans, Yamal est déjà l&apos;un des meilleurs ailiers du monde. Sa technique balle au pied, sa capacité à éliminer en un-contre-un et sa maturité déconcertante en font l&apos;attraction principale de ce Mondial. Il sera le joueur le plus surveillé du tournoi.
          </p>

          <h3>Rodri — Le métronome</h3>
          <p>
            Ballon d&apos;Or 2024, Rodri est le patron de ce milieu de terrain. Sa vision du jeu, sa qualité de passe longue et sa capacité à récupérer les ballons dans les zones stratégiques font de lui l&apos;un des joueurs les plus complets de la planète. Son absence éventuelle serait catastrophique.
          </p>

          <h2>Verdict</h2>
          <p>
            <strong>Note tactique : 9/10.</strong> L&apos;Espagne est probablement l&apos;équipe la plus séduisante sur le plan du jeu. Sa combinaison de jeunesse, de talent et de cohésion tactique en fait une favorite légitime. Le seul bémol reste le poste de numéro 9 et la capacité à résister physiquement sur un Mondial de six semaines. Mais si Pedri, Yamal et Rodri sont à leur meilleur, cette Roja peut tout gagner.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyses tactiques liées</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/actualites/analyse-tactique-france" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇫🇷 Analyse tactique France</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Le 4-3-3 de Deschamps décrypté</p>
            </Link>
            <Link href="/actualites/analyse-tactique-angleterre" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Analyse tactique Angleterre</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Potentiel immense vs déception historique</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
