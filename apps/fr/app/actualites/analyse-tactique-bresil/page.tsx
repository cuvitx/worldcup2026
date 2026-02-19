import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analyse tactique Brésil CDM 2026 — Retour au sommet ?",
  description:
    "Décryptage du système tactique du Brésil pour la Coupe du Monde 2026. Vinicius Jr, Rodrygo, Endrick : la Seleção peut-elle reconquérir le monde ?",
  openGraph: {
    title: "Analyse tactique Brésil — CDM 2026",
    description: "La Seleção de retour au sommet ? Analyse complète du système brésilien.",
    type: "article",
    publishedTime: "2026-02-19",
  },
};

export default function AnalyseTactiqueBresil() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Analyse tactique du Brésil — CDM 2026",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/analyse-tactique-bresil",
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
            <li className="text-gray-900 dark:text-white font-medium">Analyse tactique Brésil</li>
          </ol>
        </nav>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary dark:bg-secondary/20 dark:text-secondary">Analyse tactique</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            🇧🇷 Analyse tactique du Brésil — Retour au sommet ?
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose">
            Vingt-quatre ans sans titre mondial. Pour le pays aux cinq étoiles, l&apos;attente est devenue insoutenable. Avec Vinicius Jr en leader et une nouvelle génération dorée, la Seleção rêve de reconquérir le trophée qui lui échappe depuis 2002.
          </p>

          <h2>Un nouveau cycle tactique</h2>
          <p>
            Après les échecs cuisants de 2022 (quart de finale perdu face à la Croatie) et les turbulences en sélection, le Brésil a opéré un virage tactique significatif. Le <strong>4-2-3-1</strong> est devenu le système principal, avec Vinicius Jr en ailier gauche libre de ses mouvements et un milieu de terrain plus discipliné.
          </p>
          <p>
            L&apos;accent est mis sur les transitions rapides. Le Brésil ne cherche plus à monopoliser le ballon comme les grandes équipes européennes, mais à frapper vite et fort dès la récupération. La vitesse de Vinicius, Rodrygo et Raphinha permet des contre-attaques dévastatrices en quelques secondes.
          </p>

          <h2>Les forces de la Seleção</h2>

          <h3>Vinicius Jr, le meilleur joueur du monde</h3>
          <p>
            Ballon d&apos;Or 2025, Vinicius Jr est arrivé à maturité. Sa vitesse supersonique, ses dribbles dévastateurs et sa capacité à marquer dans les grands matchs en font le joueur le plus redouté du Mondial. Au Real Madrid, il a appris à gérer la pression des plus grands rendez-vous. Cette expérience sera précieuse.
          </p>

          <h3>La connexion Real Madrid</h3>
          <p>
            Vinicius, Rodrygo, Militão, Endrick : le contingent madrilène apporte des automatismes rodés au plus haut niveau. Ces joueurs se connaissent parfaitement et peuvent reproduire en sélection les combinaisons travaillées en club. C&apos;est un avantage considérable dans un tournoi où le temps de préparation est limité.
          </p>

          <h3>Le talent offensif brut</h3>
          <p>
            Avec Vinicius, Rodrygo, Raphinha, Endrick, Savinho et Antony en options offensives, le Brésil dispose d&apos;un arsenal offensif hallucinant. Chaque remplaçant peut changer le cours d&apos;un match. Cette richesse offensive permet de varier les plans de jeu et de s&apos;adapter à n&apos;importe quel adversaire.
          </p>

          <h2>Les faiblesses persistantes</h2>

          <h3>Le milieu de terrain en reconstruction</h3>
          <p>
            Depuis le déclin de Casemiro, le Brésil cherche son milieu défensif idéal. Bruno Guimarães (Newcastle) semble le mieux placé, mais il manque encore d&apos;expérience au plus haut niveau international. Le milieu créatif reste également un point d&apos;interrogation : Lucas Paquetá est talentueux mais irrégulier, et aucun remplaçant naturel ne s&apos;est imposé.
          </p>

          <h3>L&apos;instabilité en sélection</h3>
          <p>
            Le Brésil a changé plusieurs fois de sélectionneur ces dernières années, créant une instabilité préjudiciable. Les automatismes se construisent dans la durée, et ce manque de continuité a fragilisé l&apos;identité collective de l&apos;équipe. La cohésion de groupe n&apos;est pas au niveau de l&apos;Argentine ou de l&apos;Espagne.
          </p>

          <h3>La pression du pays</h3>
          <p>
            Au Brésil, le football est une religion. L&apos;attente de 24 ans sans titre mondial pèse sur chaque joueur. Le traumatisme du 7-1 face à l&apos;Allemagne en 2014 n&apos;est toujours pas digéré. Cette pression sociale et médiatique peut inhiber les joueurs dans les moments décisifs, comme on l&apos;a vu face à la Croatie en 2022.
          </p>

          <h2>Les joueurs clés</h2>

          <h3>Vinicius Jr — Le patron</h3>
          <p>
            Le numéro 7 du Real Madrid est le joueur autour duquel tout le projet brésilien est construit. Sa capacité à éliminer en un-contre-un, à provoquer des penaltys et à marquer des buts décisifs en fait la pièce maîtresse de cette Seleção. S&apos;il reproduit ses performances en Ligue des Champions, le Brésil ira loin.
          </p>

          <h3>Rodrygo — L&apos;ombre qui frappe</h3>
          <p>
            Souvent dans l&apos;ombre de Vinicius en club, Rodrygo prend une autre dimension en sélection. Plus libre dans ses déplacements, il apporte une intelligence de mouvement et une finition clinique qui complètent parfaitement l&apos;explosivité de Vinicius. Le duo est potentiellement le plus dangereux du tournoi.
          </p>

          <h3>Endrick — Le prodige</h3>
          <p>
            À 19 ans, Endrick représente l&apos;avenir du football brésilien. Sa puissance, son instinct de buteur et sa maturité impressionnante pour son âge en font une arme redoutable en sortie de banc. Comme un jeune Ronaldo, il peut changer un match en quelques minutes.
          </p>

          <h2>Verdict</h2>
          <p>
            <strong>Note tactique : 7.5/10.</strong> Le Brésil a le talent individuel pour remporter n&apos;importe quel match, mais les questions collectives demeurent. Le milieu de terrain, la stabilité défensive et la gestion mentale de la pression sont des zones d&apos;ombre. Si le sélectionneur parvient à créer une vraie identité collective autour du talent de Vinicius, cette Seleção peut surprendre. Mais en l&apos;état, elle reste un cran en dessous de la France, de l&apos;Espagne et de l&apos;Argentine en termes de maturité collective.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyses tactiques liées</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/actualites/analyse-tactique-argentine" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇦🇷 Analyse tactique Argentine</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Le champion en titre décrypté</p>
            </Link>
            <Link href="/actualites/analyse-tactique-france" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇫🇷 Analyse tactique France</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">L&apos;ambition de la troisième étoile</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
