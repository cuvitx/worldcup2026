import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vinicius Jr — L'électron libre brésilien | CDM 2026",
  description:
    "Portrait de Vinicius Jr avant la Coupe du Monde 2026. Ballon d'Or 2025, le Brésilien veut offrir un sixième titre mondial à la Seleção.",
  alternates: {
    canonical: "https://cdm2026.fr/actualites/portrait-vinicius",
  },
  openGraph: {
    title: "Vinicius Jr — L'électron libre brésilien",
    description: "Du Ballon d'Or à la quête du titre mondial : Vinicius Jr, portrait d'un génie.",
    type: "article",
    publishedTime: "2026-02-19",
    images: [{ url: "https://cdm2026.fr/og-default.jpg", width: 1200, height: 630, alt: "Vinicius Jr CDM 2026" }],
  },
};

export default function PortraitVinicius() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Vinicius Jr — L'électron libre brésilien",
    description: metadata.description,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    mainEntityOfPage: "https://cdm2026.fr/actualites/portrait-vinicius",
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
            <li className="text-gray-900 dark:text-white font-medium">Portrait Vinicius Jr</li>
          </ol>
        </nav>

        <div className="relative mb-8 aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-green-500 via-yellow-400 to-blue-500 overflow-hidden flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-8xl">⚡</span>
            <p className="mt-4 text-sm opacity-70">Image : Vinicius Jr — 1200×675px recommandé</p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-secondary/20 dark:text-secondary">Portrait</span>
            <time className="text-sm text-gray-500 dark:text-gray-300" dateTime="2026-02-19">19 février 2026</time>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl mb-6">
            Vinicius Jr — L&apos;électron libre brésilien
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 not-prose leading-relaxed">
            Ballon d&apos;Or 2025, double vainqueur de la Ligue des Champions, Vinicius José Paixão de Oliveira Júnior est l&apos;incarnation du jogo bonito version XXIe siècle. À 25 ans, il veut offrir au Brésil ce qui lui manque depuis 2002 : la Coupe du Monde.
          </p>

          <h2>São Gonçalo : la favela et le rêve</h2>
          <p>
            Vinicius grandit à São Gonçalo, une banlieue défavorisée de Rio de Janeiro. Le football est son échappatoire, son espoir, sa survie. Sur les terrains de futsal, il développe cette technique de dribble qui fera sa renommée mondiale. Le Flamengo le repère à 10 ans. À 16 ans, il signe le plus gros contrat de l&apos;histoire pour un mineur : 45 millions d&apos;euros au Real Madrid.
          </p>
          <p>
            « Je n&apos;oublie jamais d&apos;où je viens, dit-il. Chaque fois que je touche le ballon, je pense aux gamins de São Gonçalo qui regardent le match en rêvant. Je joue pour eux. »
          </p>

          <h2>Madrid : la métamorphose</h2>
          <p>
            Les premières saisons au Real sont difficiles. On le critique pour son manque d&apos;efficacité, sa prise de décision, ses dribbles en trop. Les sifflets du Bernabéu sont impitoyables. Mais Vinicius ne lche rien. Match après match, saison après saison, il transforme ses faiblesses en forces.
          </p>
          <p>
            La finale de la Ligue des Champions 2022 contre Liverpool est son moment de bascule. Un but, le seul du match, qui offre la coupe au Real Madrid. Ce soir-là, le gamin de São Gonçalo devient un homme. Et un joueur de classe mondiale.
          </p>

          <h2>Le combat contre le racisme</h2>
          <p>
            Le parcours de Vinicius est aussi marqué par un combat qui dépasse le football. Victime d&apos;insultes racistes dans les stades espagnols, il refuse de se taire. Il dénonce, il parle, il agit. Sa prise de position publique a forcé la Liga et les autorités espagnoles à renforcer les sanctions.
          </p>
          <p>
            « Le racisme dans le football est inacceptable. Je ne baisserai jamais la tête. Si ma voix peut changer les choses, je continuerai à parler. » Ce courage hors du terrain fait de lui un personnage bien plus grand qu&apos;un simple footballeur.
          </p>

          <h2>Le Ballon d&apos;Or : la reconnaissance ultime</h2>
          <p>
            En 2025, après une saison hallucinante couronnée par un deuxième titre en Ligue des Champions et 30 buts toutes compétitions, Vinicius remporte le Ballon d&apos;Or. L&apos;émotion est immense. Sur la scène du Thétre du Chtelet à Paris, les larmes coulent. Le gamin qui jouait pieds nus dans les rues de São Gonçalo tient dans ses mains le trophée le plus prestigieux du football.
          </p>

          <h2>CDM 2026 : la quête du Graal</h2>
          <p>
            Le seul trophée qui manque à son palmarès est celui de la Coupe du Monde. Pour Vinicius, ce Mondial américain est l&apos;occasion de s&apos;inscrire dans la lignée des grands du football brésilien : Pelé, Garrincha, Ronaldo, Ronaldinho. Des hommes qui ont enchanté le monde balle au pied.
          </p>
          <p>
            Son style est fait pour les grands stades américains : spectaculaire, imprévisible, électrique. Chaque fois qu&apos;il touche le ballon, 80 000 personnes retiennent leur souffle. C&apos;est ça, le pouvoir de Vinicius Jr. C&apos;est ça, le jogo bonito version 2026.
          </p>
        </article>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Portraits liés</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/actualites/portrait-mbappe" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇫🇷 Mbappé, le destin d&apos;un roi</h3>
            </Link>
            <Link href="/actualites/portrait-bellingham" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Bellingham, le prodige</h3>
            </Link>
            <Link href="/actualites/analyse-tactique-bresil" className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🇧🇷 Analyse tactique Brésil</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
