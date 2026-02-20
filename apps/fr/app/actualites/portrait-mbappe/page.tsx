import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kylian Mbappé — Le destin d'un roi | CDM 2026",
  description:
    "Portrait de Kylian Mbappé avant la Coupe du Monde 2026. De Bondy au Real Madrid, l'histoire d'un joueur qui veut marquer l'histoire du football mondial.",
  alternates: {
    canonical: "https://cdm2026.fr/actualites/portrait-mbappe",
  },
  openGraph: {
    title: "Kylian Mbappé — Le destin d'un roi",
    description: "Portrait exclusif de Mbappé avant le Mondial 2026. De Bondy au sommet du monde.",
    type: "article",
    publishedTime: "2026-02-19",
    images: [{ url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630, alt: "Kylian Mbappé CDM 2026" }],
  },
};

export default function PortraitMbappe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Kylian Mbappé — Le destin d'un roi",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/portrait-mbappe",
    image: { "@type": "ImageObject", url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630 },
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
            <li className="text-gray-900 dark:text-white font-medium">Portrait Mbappé</li>
          </ol>
        </nav>

        {/* Hero image placeholder */}
        <div className="relative mb-8 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-red-600 overflow-hidden flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-8xl"></span>
            <p className="mt-4 text-sm opacity-70">Image : Kylian Mbappé — 1200×675px recommandé</p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-secondary/20 dark:text-secondary">Portrait</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            Kylian Mbappé — Le destin d&apos;un roi
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose leading-relaxed">
            Il avait 19 ans quand il a soulevé la Coupe du Monde. À 27 ans, Kylian Mbappé revient sur la scène mondiale avec une mission : prouver qu&apos;il est le meilleur joueur de sa génération. Et peut-être de toutes les générations.
          </p>

          <h2>Bondy, là où tout a commencé</h2>
          <p>
            C&apos;est dans les rues de Bondy, en Seine-Saint-Denis, que l&apos;histoire commence. Un gamin qui court plus vite que les autres, qui dribble comme s&apos;il jouait à un jeu vidéo, qui marque des buts que personne ne voit venir. Les éducateurs de l&apos;AS Bondy le disent tous : « On savait. On savait qu&apos;il était différent. 
          </p>
          <p>
            À 14 ans, il rejoint Monaco. À 17 ans, il explose en Ligue des Champions, humiliant les défenses de Manchester City et de la Juventus avec une désinvolture presque insolente. Le monde du football retient son souffle : un nouveau roi est né.
          </p>

          <h2>2018 : l&apos;été qui a changé sa vie</h2>
          <p>
            Russie, été 2018. Mbappé a 19 ans et il dévore le Mondial. Son doublé en finale contre la Croatie le propulse dans la légende, au rang de Pelé, le seul autre adolescent à avoir marqué en finale de Coupe du Monde. Ce soir-là, sur la pelouse du stade Loujniki, un gamin de banlieue parisienne est devenu le prince du football mondial.
          </p>
          <p>
            Mais Mbappé ne voulait pas être prince. Il voulait être roi. Et pour cela, il savait qu&apos;il faudrait un jour quitter Paris.
          </p>

          <h2>Le Real Madrid : l&apos;appel du destin</h2>
          <p>
            L&apos;été 2024. Après sept ans au PSG, 256 buts et autant de controverses, Mbappé franchit enfin le pas. Le Real Madrid, le club de ses rêves d&apos;enfant, celui dont il avait les posters dans sa chambre. « C&apos;est ici que je devais être , dit-il lors de sa présentation devant 80 000 personnes au Bernabéu.
          </p>
          <p>
            La première saison est un apprentissage. Il faut s&apos;adapter à un nouveau championnat, à de nouveaux partenaires, à une culture footballistique différente. Il y a des hauts — un triplé contre le Barça au Clásico — et des bas — des matches de Ligue des Champions où il semble trop seul. Mais peu à peu, la machine Mbappé trouve ses repères.
          </p>

          <h2>Capitaine des Bleus : le poids de la couronne</h2>
          <p>
            Depuis qu&apos;il porte le brassard de l&apos;équipe de France, Mbappé a changé. Plus posé, plus vocal, plus leader. Il parle moins dans les médias mais plus dans le vestiaire. Il protège les jeunes, encourage les doutes, assume les défaites. La maturité est venue avec la responsabilité.
          </p>
          <p>
            « Je ne joue plus pour moi, dit-il. Je joue pour un pays, pour des millions de gamins qui regardent les matchs en rêvant de devenir footballeur. C&apos;est une responsabilité que j&apos;embrasse. 
          </p>

          <h2>CDM 2026 : la quête de l&apos;éternité</h2>
          <p>
            Mbappé arrive à ce Mondial dans la plénitude de son art. À 27 ans, il combine la vitesse supersonique de sa jeunesse avec une intelligence de jeu acquise au fil des années. Il est devenu un attaquant complet : buteur, passeur, capable de jouer en pointe, sur un côté ou en décrochage.
          </p>
          <p>
            Son objectif est clair : ramener une deuxième étoile personnelle et la troisième de la France. « La Coupe du Monde, c&apos;est le rêve ultime. Je l&apos;ai vécu une fois à 19 ans, mais je veux le revivre en étant le leader, celui qui porte l&apos;équipe. C&apos;est ça, le destin d&apos;un roi. 
          </p>
          <p>
            Sur le sol américain, devant des stades de 80 000 personnes, Kylian Mbappé écrira peut-être le prochain chapitre de la plus belle histoire du football français. Une histoire qui a commencé dans les rues de Bondy et qui pourrait se terminer au sommet du monde.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Portraits liés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/actualites/portrait-messi" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇦🇷 Messi : dernière danse ?</h3>
            </Link>
            <Link href="/actualites/portrait-bellingham" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Bellingham, le prodige</h3>
            </Link>
            <Link href="/actualites/portrait-vinicius" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇧🇷 Vinicius Jr, l&apos;électron libre</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
