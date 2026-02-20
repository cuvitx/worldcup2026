import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Lionel Messi — Dernière danse mondiale ? | CDM 2026",
  description:
    "Portrait de Lionel Messi avant la Coupe du Monde 2026. À 38 ans, le champion du monde 2022 disputera-t-il son dernier Mondial ?",
  alternates: {
    canonical: "https://cdm2026.fr/actualites/portrait-messi",
  },
  openGraph: {
    title: "Lionel Messi — Dernière danse mondiale ?",
    description: "À 38 ans, Messi s'apprête à vivre son dernier Mondial. Récit d'une légende vivante.",
    type: "article",
    publishedTime: "2026-02-19",
    images: [{ url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630, alt: "Lionel Messi CDM 2026" }],
  },
};

export default function PortraitMessi() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Lionel Messi — Dernière danse mondiale ?",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/portrait-messi",
    image: { "@type": "ImageObject", url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630 },
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: "Lionel Messi" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-300">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/actualites" className="text-primary dark:text-secondary hover:underline">Actualités</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Portrait Messi</li>
          </ol>
        </nav>

        <div className="relative mb-8 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-sky-400 via-white to-sky-400 overflow-hidden flex items-center justify-center">
          <div className="text-center text-sky-900">
            <span className="text-8xl">🐐</span>
            <p className="mt-4 text-sm opacity-70">Image : Lionel Messi — 1200×675px recommandé</p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-secondary/20 dark:text-secondary">Portrait</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            Lionel Messi — Dernière danse mondiale ?
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose leading-relaxed">
            Il a tout gagné. Huit Ballons d&apos;Or, une Coupe du Monde, deux Copa América, quatre Ligues des Champions. À 38 ans, Lionel Messi s&apos;apprête à fouler une dernière fois la pelouse d&apos;un Mondial. L&apos;histoire d&apos;un homme qui a redéfini le football.
          </p>

          <h2>Rosario, le début de la légende</h2>
          <p>
            Tout commence à Rosario, en Argentine, dans la maison modeste de la famille Messi. Le petit Lionel, atteint d&apos;un déficit en hormone de croissance, doit quitter son pays à 13 ans pour rejoindre Barcelone, le seul club prêt à financer son traitement. Sur une serviette de table, un directeur sportif griffonne le contrat le plus important de l&apos;histoire du football.
          </p>
          <p>
            Le garçon trop petit pour jouer au football deviendra le plus grand joueur de tous les temps. L&apos;ironie est presque trop belle pour être vraie.
          </p>

          <h2>La quête de la Coupe du Monde</h2>
          <p>
            Pendant des années, c&apos;est le seul trophée qui manque à sa collection. Finale perdue en 2014, éliminations douloureuses en 2010 et 2018, fiasco en 2006. À chaque Mondial, Messi porte l&apos;Argentine sur ses épaules, mais le trophée refuse de se laisser saisir.
          </p>
          <p>
            Et puis, Qatar 2022. La finale la plus folle de l&apos;histoire. Messi contre Mbappé. L&apos;expérience contre la jeunesse. Deux buts pour l&apos;un, un triplé pour l&apos;autre. Les tirs au but. Et enfin, ENFIN, Messi soulève la Coupe du Monde. Les larmes coulent. Le petit garçon de Rosario a accompli son destin.
          </p>

          <h2>L&apos;Amérique : un nouveau chapitre</h2>
          <p>
            En 2023, Messi fait un choix surprenant : l&apos;Inter Miami, en MLS. Beaucoup y voient une retraite dorée. Mais Messi transforme tout ce qu&apos;il touche. La franchise de David Beckham devient un phénomène culturel. Chaque match est un événement. Et Messi continue de marquer, de créer, d&apos;émerveiller.
          </p>
          <p>
            Deux ans plus tard, il est toujours là. Moins explosif physiquement, certes, mais son pied gauche n&apos;a pas pris une ride. Ses passes lobées défient toujours les lois de la physique. Ses dribbles sont plus rares mais tout aussi dévastateurs.
          </p>

          <h2>CDM 2026 : pourquoi il y va</h2>
          <p>
            « Je veux donner un dernier Mondial à mon pays.  La phrase est simple, mais elle dit tout. Messi sait que son corps ne suivra plus longtemps. Il sait que les défenseurs sont plus jeunes, plus rapides, plus agressifs. Mais il sait aussi qu&apos;il possède quelque chose qu&apos;aucun d&apos;entre eux n&apos;aura jamais : la capacité de voir le football avant tout le monde.
          </p>
          <p>
            Son rôle a évolué. Il ne sera plus le joueur qui court 12 kilomètres par match. Il sera le maestro, celui qui orchestre depuis la zone de vérité, qui délivre la passe décisive au moment parfait, qui trouve la faille quand tout semble fermé. Scaloni le sait : même à 38 ans, Messi avec le ballon dans les pieds reste le joueur le plus dangereux de la planète.
          </p>

          <h2>L&apos;adieu annoncé</h2>
          <p>
            Si l&apos;Argentine va au bout, la finale du 19 juillet au MetLife Stadium sera probablement le dernier match de Messi en sélection. Imaginez la scène : 82 000 personnes debout, le stade qui scande son nom, et Messi qui soulève la Coupe du Monde une dernière fois.
          </p>
          <p>
            C&apos;est le scénario de rêve. L&apos;histoire du football mérite cette fin. Et Messi, plus que quiconque, mérite de choisir le moment de tirer sa révérence.
          </p>
          <p>
            Dernière danse ? Probablement. Mais avec Messi, on a appris une chose : ne jamais douter de sa capacité à réécrire l&apos;histoire.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Portraits liés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/actualites/portrait-mbappe" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇫🇷 Mbappé, le destin d&apos;un roi</h3>
            </Link>
            <Link href="/actualites/portrait-yamal" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇪🇸 Yamal, 18 ans et déjà légende ?</h3>
            </Link>
            <Link href="/actualites/analyse-tactique-argentine" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇦🇷 Analyse tactique Argentine</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
