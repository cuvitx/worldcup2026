import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jude Bellingham — Le prodige anglais | CDM 2026",
  description:
    "Portrait de Jude Bellingham avant la Coupe du Monde 2026. À 22 ans, le milieu du Real Madrid incarne l'espoir de toute une nation.",
  alternates: {
    canonical: "https://cdm2026.fr/actualites/portrait-bellingham",
  },
  openGraph: {
    title: "Jude Bellingham — Le prodige anglais",
    description: "À 22 ans, Bellingham porte les espoirs d'une nation entière. Portrait d'un phénomène.",
    type: "article",
    publishedTime: "2026-02-19",
    images: [{ url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630, alt: "Jude Bellingham CDM 2026" }],
  },
};

export default function PortraitBellingham() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jude Bellingham — Le prodige anglais",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/portrait-bellingham",
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
            <li className="text-gray-900 dark:text-white font-medium">Portrait Bellingham</li>
          </ol>
        </nav>

        <div className="relative mb-8 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-white via-red-600 to-white overflow-hidden flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-8xl">🦁</span>
            <p className="mt-4 text-sm opacity-70">Image : Jude Bellingham — 1200×675px recommandé</p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-secondary/20 dark:text-secondary">Portrait</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            Jude Bellingham — Le prodige anglais
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose leading-relaxed">
            Il a quitté Birmingham à 17 ans pour conquérir le monde. À 22 ans, Jude Bellingham est déjà l&apos;un des meilleurs joueurs de la planète et le visage de la nouvelle Angleterre. Récit d&apos;une ascension fulgurante.
          </p>

          <h2>Stourbridge : les racines d&apos;un champion</h2>
          <p>
            Jude Victor William Bellingham naît le 29 juin 2003 à Stourbridge, dans les West Midlands anglais. Fils d&apos;un ancien joueur semi-professionnel, il grandit avec un ballon aux pieds et une détermination qui dépasse son ge. À 16 ans, il débute en Championship avec Birmingham City. À 16 ans et 38 jours, il devient le plus jeune joueur à marquer pour le club. Le phénomène est lancé.
          </p>

          <h2>Dortmund : l&apos;apprentissage allemand</h2>
          <p>
            En 2020, Bellingham fait un choix audacieux : quitter l&apos;Angleterre pour le Borussia Dortmund. À 17 ans, il choisit la Bundesliga plutôt que la Premier League, le développement plutôt que le confort. Ce choix dit tout de sa maturité.
          </p>
          <p>
            En trois saisons, il explose. Capitaine à 19 ans, leader technique et vocal d&apos;un vestiaire composé de joueurs bien plus expérimentés. Les supporters du Signal Iduna Park l&apos;adoptent immédiatement. Il apprend l&apos;allemand, s&apos;imprègne de la culture du club et devient un titulaire indiscutable en Ligue des Champions.
          </p>

          <h2>Le Real Madrid : la consécration</h2>
          <p>
            L&apos;été 2023, le Real Madrid débourse plus de 100 millions d&apos;euros pour s&apos;attacher ses services. La pression est immense, mais Bellingham la transforme en carburant. Ses premiers mois sont stratosphériques : des buts en cascade, des performances de gala, une adaptation express au football espagnol.
          </p>
          <p>
            Au Bernabéu, il trouve sa célébration signature — les bras croisés, le regard défiant — qui devient un symbole mondial. Bellingham n&apos;est pas seulement un grand joueur, il est un personnage, une marque, une icône. Et il n&apos;a que 22 ans.
          </p>

          <h2>L&apos;Angleterre : le sauveur attendu</h2>
          <p>
            Pour les supporters anglais, Bellingham est celui que l&apos;Angleterre attend depuis Bobby Moore et Bobby Charlton. Un joueur capable de porter une nation sur ses épaules, de décider des matchs par sa seule présence. Son but égalisateur en quart de finale de l&apos;Euro 2024 — une bicyclette à la dernière seconde — restera gravé dans les mémoires.
          </p>
          <p>
            Mais Bellingham veut plus qu&apos;être un héros d&apos;un instant. Il veut être le joueur qui ramène un trophée majeur en Angleterre, 60 ans après la Coupe du Monde 1966. « Ce pays mérite de gagner quelque chose. Et je ferai tout pour que ça arrive », dit-il avec cette assurance qui le caractérise.
          </p>

          <h2>CDM 2026 : l&apos;heure de la couronne</h2>
          <p>
            Le Mondial américain sera le premier grand tournoi où Bellingham arrive en tant que star incontestée de sa sélection. Plus de questionnements sur son rôle, plus de concurrence pour le brassard de leader technique. Il est le patron, le point focal, le joueur autour duquel tout s&apos;articule.
          </p>
          <p>
            Sa capacité à évoluer entre les lignes, à surgir dans la surface et à marquer des buts de classe mondiale fait de lui le joueur le plus complet de ce Mondial. S&apos;il est à son meilleur, aucune défense ne sera à l&apos;abri. Et l&apos;Angleterre pourrait enfin écrire une nouvelle page de son histoire.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Portraits liés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/actualites/portrait-mbappe" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇫🇷 Mbappé, le destin d&apos;un roi</h3>
            </Link>
            <Link href="/actualites/portrait-vinicius" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇧🇷 Vinicius Jr, l&apos;électron libre</h3>
            </Link>
            <Link href="/actualites/portrait-yamal" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇪🇸 Yamal, 18 ans et déjà légende ?</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
