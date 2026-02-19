import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lamine Yamal — 18 ans et déjà légende ? | CDM 2026",
  description:
    "Portrait de Lamine Yamal avant la Coupe du Monde 2026. Champion d'Europe à 17 ans, le prodige du Barça veut conquérir le monde.",
  openGraph: {
    title: "Lamine Yamal — 18 ans et déjà légende ?",
    description: "Champion d'Europe à 17 ans, Yamal arrive au Mondial 2026 avec l'ambition de marquer l'histoire.",
    type: "article",
    publishedTime: "2026-02-19",
    images: [{ url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630, alt: "Lamine Yamal CDM 2026" }],
  },
};

export default function PortraitYamal() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Lamine Yamal — 18 ans et déjà légende ?",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/portrait-yamal",
    image: { "@type": "ImageObject", url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/actualites" className="hover:text-blue-600 dark:hover:text-blue-400">Actualités</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Portrait Yamal</li>
          </ol>
        </nav>

        <div className="relative mb-8 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-red-600 via-yellow-400 to-red-600 overflow-hidden flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-8xl">🌟</span>
            <p className="mt-4 text-sm opacity-70">Image : Lamine Yamal — 1200×675px recommandé</p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">Portrait</span>
            <time className="text-sm text-gray-500 dark:text-gray-400" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            Lamine Yamal — 18 ans et déjà légende ?
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose leading-relaxed">
            Champion d&apos;Europe à 17 ans, plus jeune buteur de l&apos;histoire de l&apos;Euro, titulaire indiscutable au FC Barcelone : Lamine Yamal n&apos;a que 18 ans mais il a déjà vécu plus que la plupart des footballeurs en une carrière entière.
          </p>

          <h2>Rocafonda : l&apos;enfant de Mataró</h2>
          <p>
            Lamine Yamal Nasraoui Ebana naît le 13 juillet 2007 à Esplugues de Llobregat, près de Barcelone. Il grandit à Rocafonda, un quartier populaire de Mataró. Son père, d&apos;origine marocaine, et sa mère, d&apos;origine équato-guinéenne, lui transmettent la passion du football et les valeurs de la famille.
          </p>
          <p>
            À 7 ans, il intègre La Masia, le centre de formation légendaire du FC Barcelone. Très vite, les formateurs comprennent qu&apos;ils ont affaire à un talent hors normes. Sa technique balle au pied, sa vision du jeu et sa maturité sont celles d&apos;un joueur de 10 ans de plus.
          </p>

          <h2>La Masia : dans les pas de Messi</h2>
          <p>
            Les comparaisons avec Messi sont inévitables et, pour une fois, elles ne sont pas usurpées. Comme Messi, Yamal est un ailier droit au pied gauche dévastateur. Comme Messi, il possède cette capacité à accélérer en un instant et à éliminer les défenseurs avec une facilité déconcertante. Comme Messi, il a une vision du jeu qui semble surnaturelle.
          </p>
          <p>
            Mais Yamal est aussi profondément différent. Plus collectif, plus généreux dans l&apos;effort défensif, il est un produit de son époque : un ailier moderne qui combine la flair individuelle avec le travail pour l&apos;équipe.
          </p>

          <h2>L&apos;Euro 2024 : l&apos;explosion mondiale</h2>
          <p>
            L&apos;Allemagne, été 2024. Yamal a 16 ans quand le tournoi commence. Il en a 17 quand il se termine, champion d&apos;Europe, meilleur jeune joueur du tournoi. Son but en demi-finale contre la France — une frappe enroulée de l&apos;extérieur de la surface — est l&apos;un des plus beaux de l&apos;histoire de la compétition.
          </p>
          <p>
            Ce soir-là, le monde entier découvre ce que la Masia savait depuis des années : Lamine Yamal est un joueur d&apos;une autre dimension. Sa célébration — un geste de téléphone avec la main — devient virale. À 17 ans, il est une star planétaire.
          </p>

          <h2>Barcelone : le nouveau roi du Camp Nou</h2>
          <p>
            Au Barça, Yamal est devenu le joueur le plus important de l&apos;équipe. Ses statistiques défient l&apos;entendement pour un joueur de son âge : plus de 15 buts et 20 passes décisives en Liga à seulement 18 ans. Son entente avec Pedri et Raphinha forme l&apos;un des trios offensifs les plus excitants d&apos;Europe.
          </p>
          <p>
            Les supporters du Camp Nou l&apos;ont adopté comme le successeur naturel de Messi. Même pied gauche, même numéro 10 (qu&apos;il portera bientôt ?), même capacité à faire lever 90 000 personnes de leur siège.
          </p>

          <h2>CDM 2026 : le plus jeune roi du monde ?</h2>
          <p>
            À 18 ans, Yamal arrive au Mondial américain avec une fraîcheur et une insouciance qui peuvent faire la différence. Il n&apos;a aucun traumatisme lié aux échecs passés, aucun poids psychologique. Pour lui, chaque match est une fête, chaque dribble un plaisir.
          </p>
          <p>
            Si l&apos;Espagne va au bout, Yamal pourrait devenir le plus jeune champion du monde depuis Pelé en 1958. L&apos;histoire adore les parallèles, et celui-ci est trop beau pour être ignoré. Pelé avait 17 ans en Suède. Yamal en aura 18 aux États-Unis. Deux prodiges, deux continents, une même destinée ?
          </p>
          <p>
            Le football attend ses héros. Lamine Yamal est prêt à répondre à l&apos;appel.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Portraits liés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/actualites/portrait-mbappe" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 dark:text-white">🇫🇷 Mbappé, le destin d&apos;un roi</h3>
            </Link>
            <Link href="/actualites/portrait-messi" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 dark:text-white">🇦🇷 Messi : dernière danse ?</h3>
            </Link>
            <Link href="/actualites/analyse-tactique-espagne" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 dark:text-white">🇪🇸 Analyse tactique Espagne</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
